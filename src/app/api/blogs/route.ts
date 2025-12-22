import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// GET all blogs with optional filters
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const topic = searchParams.get('topic') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.topicCategory = category;
    }

    if (topic) {
      query.topic = topic;
    }

    // Build sort
    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    // Execute query
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(query),
    ]);

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST create new blog with AI generation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { authorName, authorEmail, description, topic, topicCategory, tags } = body;

    // Validation
    if (!authorName?.trim()) {
      return NextResponse.json({ error: 'Author name is required' }, { status: 400 });
    }
    if (!authorEmail?.trim() || !/^\S+@\S+\.\S+$/.test(authorEmail)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!description?.trim() || description.length < 20) {
      return NextResponse.json({ error: 'Description must be at least 20 characters' }, { status: 400 });
    }
    if (!topic?.trim() || !topicCategory?.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    // Generate blog content using Claude
    const prompt = `You are an expert blog writer. Create a comprehensive, engaging, and well-structured blog post based on the following details:

Topic: ${topic}
Category: ${topicCategory}
Author's Description: ${description}
Tags: ${tags?.join(', ') || 'None specified'}

Requirements:
1. Create a compelling title that captures the essence of the topic
2. Write a brief summary (2-3 sentences, max 400 characters)
3. Write the full blog content with:
   - An engaging introduction
   - Well-organized sections with clear headings (use ## for main sections, ### for subsections)
   - Detailed explanations with examples where appropriate
   - A thoughtful conclusion
   - The content should be between 1000-2000 words
4. Use markdown formatting for better readability
5. Be informative, accurate, and engaging
6. Include relevant insights and practical information

Respond in the following JSON format exactly:
{
  "title": "Your compelling blog title here",
  "summary": "A 2-3 sentence summary of the blog post",
  "content": "The full markdown-formatted blog content here"
}

Important: Return ONLY valid JSON, no additional text or markdown code blocks.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Parse the response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    let parsedContent;
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Response was:', responseText);
      return NextResponse.json(
        { error: 'Failed to generate blog content. Please try again.' },
        { status: 500 }
      );
    }

    // Connect to database and create blog
    await connectToDatabase();

    const blog = await Blog.create({
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim().toLowerCase(),
      description: description.trim(),
      topic: topic.trim(),
      topicCategory: topicCategory.trim(),
      tags: Array.isArray(tags) ? tags.slice(0, 10) : [],
      title: parsedContent.title,
      content: parsedContent.content,
      summary: parsedContent.summary?.substring(0, 500) || '',
      likes: 0,
      views: 0,
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog. Please try again.' },
      { status: 500 }
    );
  }
}
