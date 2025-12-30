import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Advanced text search scoring
function scoreMatch(text: string, query: string): number {
  if (!text) return 0;
  const lowerText = text.toLowerCase();
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  let score = 0;

  for (const word of queryWords) {
    if (lowerText.includes(word)) {
      score += 1;
      // Bonus for exact word boundary match
      try {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(text)) {
          score += 0.5;
        }
      } catch {
        // Ignore regex errors
      }
      // Bonus for word appearing multiple times
      const matches = lowerText.match(new RegExp(word, 'gi'));
      if (matches && matches.length > 1) {
        score += Math.min(matches.length * 0.2, 1);
      }
    }
  }

  return score;
}

// Extract key sentences from content
function extractKeySentences(content: string, maxSentences: number = 5): string[] {
  const sentences = content
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.trim().length > 30 && s.trim().length < 500)
    .map(s => s.trim());

  const importantWords = ['important', 'key', 'significant', 'essential', 'critical',
    'fundamental', 'primary', 'main', 'crucial', 'notably', 'specifically'];

  const scored = sentences.map(sentence => {
    let score = 0;
    const lower = sentence.toLowerCase();
    importantWords.forEach(word => {
      if (lower.includes(word)) score += 2;
    });
    if (lower.includes(' is ') || lower.includes(' are ')) score += 1;
    if (sentence.length > 100) score += 1;
    return { sentence, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .map(s => s.sentence);
}

// POST - Chat with ASI using knowledge base
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = body as { message: string; history: ChatMessage[] };

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Search for relevant blogs
    let relevantBlogs: Array<{
      _id: unknown;
      title: string;
      summary: string;
      content: string;
      topic: string;
      topicCategory: string;
      tags: string[];
      views: number;
      likes: number;
    }> = [];

    try {
      // Try text search first
      relevantBlogs = await Blog.find(
        { $text: { $search: message } },
        { score: { $meta: 'textScore' } }
      )
        .sort({ score: { $meta: 'textScore' } })
        .limit(10)
        .select('title summary content topic topicCategory tags views likes')
        .lean();
    } catch {
      // Fall back to regex search
      const words = message.split(' ').filter(w => w.length > 2);
      if (words.length > 0) {
        const searchRegex = new RegExp(words.join('|'), 'i');
        relevantBlogs = await Blog.find({
          $or: [
            { title: searchRegex },
            { summary: searchRegex },
            { topic: searchRegex },
            { topicCategory: searchRegex },
            { tags: searchRegex },
            { content: searchRegex },
          ],
        })
          .limit(15)
          .select('title summary content topic topicCategory tags views likes')
          .lean();
      }
    }

    // Score and sort blogs by relevance
    const scoredBlogs = relevantBlogs.map(blog => ({
      ...blog,
      relevanceScore: scoreMatch(blog.title, message) * 5 +
        scoreMatch(blog.summary, message) * 3 +
        scoreMatch(blog.topic, message) * 4 +
        scoreMatch(blog.topicCategory, message) * 2 +
        scoreMatch(blog.tags?.join(' ') || '', message) * 3 +
        scoreMatch(blog.content.substring(0, 3000), message) * 1
    })).sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 6);

    // Get collection stats
    const [totalBlogs, topCategories] = await Promise.all([
      Blog.countDocuments(),
      Blog.aggregate([
        { $group: { _id: '$topicCategory', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
    ]);

    // Build comprehensive context
    let context = `You are ASI Chat (EB), an intelligent knowledge assistant for ASI Blogger. You are powered by Bhairava Kali Consciousness Technology (BKCT).

CRITICAL FORMATTING RULES - YOU MUST FOLLOW THESE EXACTLY:
1. NEVER use any markdown formatting (no **, no *, no #, no -, no numbered lists with periods)
2. NEVER use bullet points, dashes, or any special characters for lists
3. NEVER use bold, italic, or any text styling
4. Write everything in plain, natural sentences and paragraphs
5. If listing items, write them as a flowing sentence (e.g., "The main topics include quantum computing, machine learning, and neural networks.")
6. Use simple punctuation only: periods, commas, colons, and question marks
7. Write in a conversational, friendly tone
8. Keep responses clear, concise, and easy to read
9. DO NOT start responses with greetings or pleasantries - get straight to the answer
10. Provide comprehensive, detailed answers drawing from all available knowledge
11. ALWAYS end every sentence with a full stop (period). Every single sentence must have proper punctuation
12. ALWAYS end your entire response with a full stop (period)

PLATFORM KNOWLEDGE:
Total blogs in collection: ${totalBlogs}
Top categories: ${topCategories.map((c: { _id: string; count: number }) => `${c._id} (${c.count})`).join(', ') || 'Various categories'}

`;

    // Add blog content to context
    if (scoredBlogs.length > 0) {
      context += `RELEVANT KNOWLEDGE FROM ASI BLOGGER COLLECTION:

`;
      scoredBlogs.forEach((blog, i) => {
        const keyPoints = extractKeySentences(blog.content, 5);

        context += `=== BLOG ${i + 1}: "${blog.title}" ===
Category: ${blog.topicCategory}
Topic: ${blog.topic}
Tags: ${blog.tags?.join(', ') || 'None'}

Summary: ${blog.summary}

Key Points:
${keyPoints.join('\n')}

Full Content:
${blog.content}

`;
      });

      context += `INSTRUCTIONS: Use ALL the above knowledge to provide a comprehensive, accurate answer. Draw from multiple blogs if relevant. Include specific details, concepts, and insights from the blogs. If the user is asking about a topic covered in the blogs, synthesize the information to give them the best possible answer.`;

    } else {
      context += `No blogs directly match this query. Provide a helpful response based on your general knowledge. The ASI Blogger platform covers over 1000 topics across science, technology, arts, business, health, and more. You can suggest that the user explore the blog collection or ask about specific topics.`;
    }

    // Build messages array with history
    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

    // Add conversation history (last 8 messages for better context)
    const recentHistory = history.slice(-8);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    // Call Claude API without streaming
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: context,
      messages: messages,
    });

    // Extract text content
    let responseText = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        responseText += block.text;
      }
    }

    // Clean up any remaining markdown that might slip through
    responseText = responseText
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^#+\s*/gm, '')
      .replace(/^[-•]\s*/gm, '')
      .replace(/^\d+\.\s*/gm, '')
      .replace(/`/g, '')
      .trim();

    // Ensure response ends with proper punctuation
    if (responseText && !/[.!?]$/.test(responseText)) {
      responseText += '.';
    }

    // Prepare sources
    const sources = scoredBlogs.map(b => ({
      title: b.title,
      topic: b.topic,
      category: b.topicCategory
    }));

    return NextResponse.json({
      response: responseText,
      sourcesCount: sources.length,
      sources
    });

  } catch (error) {
    console.error('Error in ASI Chat:', error);
    return NextResponse.json(
      { error: 'Failed to process your question. Please try again.' },
      { status: 500 }
    );
  }
}
