import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// POST chat with AI about blogs
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
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

    // Build context for the AI
    let context = `You are a helpful AI assistant for ASI Blogger, an AI-powered blog generation platform. You help users explore and understand the blog collection.

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

Based on the above blogs, answer the user's question. If the user asks about specific content, reference the relevant blogs by title.`;
    } else {
      context += `No blogs found matching the user's query directly. Provide a helpful response based on general knowledge about the platform's capabilities. The platform has over 1000+ topics across science, technology, arts, business, and more.`;
    }

    context += `

GUIDELINES:
- Be helpful and conversational
- Reference specific blogs when relevant
- If no relevant blogs exist, explain what topics are available
- Encourage users to create blogs or explore the collection
- Keep responses concise but informative`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: context,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
