import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Like from '@/models/Like';
import Blog from '@/models/Blog';

// GET check if user liked a blog
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const blogId = searchParams.get('blogId');
    const visitorId = searchParams.get('visitorId');

    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ error: 'Valid blog ID is required' }, { status: 400 });
    }
    if (!visitorId) {
      return NextResponse.json({ error: 'Visitor ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const like = await Like.findOne({ blogId, visitorId });

    return NextResponse.json({ liked: !!like });
  } catch (error) {
    console.error('Error checking like:', error);
    return NextResponse.json(
      { error: 'Failed to check like status' },
      { status: 500 }
    );
  }
}

// POST toggle like
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blogId, visitorId } = body;

    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ error: 'Valid blog ID is required' }, { status: 400 });
    }
    if (!visitorId) {
      return NextResponse.json({ error: 'Visitor ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Check if already liked
    const existingLike = await Like.findOne({ blogId, visitorId });

    if (existingLike) {
      // Unlike
      await Like.deleteOne({ _id: existingLike._id });
      await Blog.findByIdAndUpdate(blogId, { $inc: { likes: -1 } });

      const updatedBlog = await Blog.findById(blogId);
      return NextResponse.json({
        liked: false,
        likes: updatedBlog?.likes || 0
      });
    } else {
      // Like
      await Like.create({
        blogId: new mongoose.Types.ObjectId(blogId),
        visitorId,
      });
      await Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } });

      const updatedBlog = await Blog.findById(blogId);
      return NextResponse.json({
        liked: true,
        likes: updatedBlog?.likes || 0
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}
