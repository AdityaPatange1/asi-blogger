import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Comment from '@/models/Comment';
import Blog from '@/models/Blog';

// GET comments for a blog
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blogId = searchParams.get('blogId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ error: 'Valid blog ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      Comment.find({ blogId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Comment.countDocuments({ blogId }),
    ]);

    return NextResponse.json({
      comments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST create new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogId, authorName, authorEmail, content } = body;

    // Validation
    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ error: 'Valid blog ID is required' }, { status: 400 });
    }
    if (!authorName?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!authorEmail?.trim() || !/^\S+@\S+\.\S+$/.test(authorEmail)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!content?.trim() || content.length < 2) {
      return NextResponse.json({ error: 'Comment content is required' }, { status: 400 });
    }
    if (content.length > 2000) {
      return NextResponse.json({ error: 'Comment cannot exceed 2000 characters' }, { status: 400 });
    }

    await connectToDatabase();

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Create comment
    const comment = await Comment.create({
      blogId: new mongoose.Types.ObjectId(blogId),
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim().toLowerCase(),
      content: content.trim(),
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
