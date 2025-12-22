import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// POST chat with AI about blogs - Streaming enabled
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message?.trim()) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDatabase();

    // Search for relevant blogs based on the user's message
    let relevantBlogs = [];

    try {
      // Try text search first
      relevantBlogs = await Blog.find(
        { $text: { $search: message } },
        { score: { $meta: 'textScore' } }
      )
        .sort({ score: { $meta: 'textScore' } })
        .limit(5)
        .select('title summary topic topicCategory content')
        .lean();
    } catch {
      // If text search fails, fall back to regex search
      const searchRegex = new RegExp(message.split(' ').join('|'), 'i');
      relevantBlogs = await Blog.find({
        $or: [
          { title: searchRegex },
          { summary: searchRegex },
          { topic: searchRegex },
          { topicCategory: searchRegex },
        ],
      })
        .limit(5)
        .select('title summary topic topicCategory content')
        .lean();
    }

    // Get some stats about the blog collection
    const [totalBlogs, topCategories] = await Promise.all([
      Blog.countDocuments(),
      Blog.aggregate([
        { $group: { _id: '$topicCategory', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
    ]);

    // Build context for SEASHA - the AI assistant with a warm, friendly female tone
    let context = `You are SEASHA (Smart, Empathetic Assistant for Search and Help with Articles), a friendly and knowledgeable AI assistant for ASI Blogger™. You have a warm, approachable female personality - think of yourself as a helpful friend who's genuinely excited to help users discover and learn about content.

YOUR PERSONALITY:
- Warm and welcoming - greet users kindly and make them feel comfortable
- Enthusiastic but not over the top - show genuine interest in helping
- Professional yet friendly - balance expertise with approachability
- Encouraging - motivate users to explore and create content
- Use occasional friendly expressions like "I'd love to help!", "Great question!", "Let me find that for you, dear"

COLLECTION STATS:
- Total blogs in collection: ${totalBlogs}
- Top categories: ${topCategories.map((c: { _id: string; count: number }) => `${c._id} (${c.count} blogs)`).join(', ') || 'None yet'}

`;

    if (relevantBlogs.length > 0) {
      context += `RELEVANT BLOGS FOUND FOR USER'S QUERY:
${relevantBlogs.map((blog, i) => `
${i + 1}. "${blog.title}"
   Topic: ${blog.topic} (${blog.topicCategory})
   Summary: ${blog.summary}
   Content Preview: ${blog.content.substring(0, 500)}...
`).join('\n')}

Based on the above blogs, answer the user's question. Reference the relevant blogs by title using **bold** formatting.`;
    } else {
      context += `No blogs found matching the user's query directly. Provide a helpful response based on general knowledge about the platform's capabilities. The platform has over 1000+ topics across science, technology, arts, business, and more.`;
    }

    context += `

FORMATTING GUIDELINES:
- Use **bold** for blog titles and important terms
- Use *italics* for emphasis
- Use bullet points (- ) for lists
- Use numbered lists (1. 2. 3.) for steps
- Keep responses concise but warm and informative
- Always be helpful and encouraging`;

    // Create streaming response
    const stream = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      stream: true,
      system: context,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              const text = event.delta.text;
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in chat:', error);
    return new Response(JSON.stringify({ error: 'Failed to process message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
