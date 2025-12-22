'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  MessageCircle,
  Eye,
  Calendar,
  User,
  Mail,
  ArrowLeft,
  Share2,
  Loader2,
  Send,
  Tag
} from 'lucide-react';
import { formatDate, formatDistanceToNow, generateVisitorId } from '@/lib/utils';

interface Blog {
  _id: string;
  title: string;
  content: string;
  summary: string;
  authorName: string;
  authorEmail: string;
  topic: string;
  topicCategory: string;
  tags: string[];
  likes: number;
  views: number;
  createdAt: string;
  commentsCount: number;
}

interface Comment {
  _id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
}

export default function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Like state
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  // Comment form
  const [commentForm, setCommentForm] = useState({
    authorName: '',
    authorEmail: '',
    content: '',
  });
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState('');

  // Fetch blog and comments
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [blogRes, commentsRes] = await Promise.all([
          fetch(`/api/blogs/${id}`),
          fetch(`/api/comments?blogId=${id}`),
        ]);

        if (!blogRes.ok) {
          if (blogRes.status === 404) {
            router.push('/blogs');
            return;
          }
          throw new Error('Failed to fetch blog');
        }

        const blogData = await blogRes.json();
        const commentsData = await commentsRes.json();

        setBlog(blogData.blog);
        setLikesCount(blogData.blog.likes);
        setComments(commentsData.comments || []);

        // Check like status
        const visitorId = generateVisitorId();
        if (visitorId) {
          const likeRes = await fetch(`/api/likes?blogId=${id}&visitorId=${visitorId}`);
          if (likeRes.ok) {
            const likeData = await likeRes.json();
            setIsLiked(likeData.liked);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  // Handle like
  const handleLike = async () => {
    if (isLiking) return;

    const visitorId = generateVisitorId();
    if (!visitorId) return;

    setIsLiking(true);
    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId: id, visitorId }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsLiked(data.liked);
        setLikesCount(data.likes);
      }
    } catch (err) {
      console.error('Failed to like:', err);
    } finally {
      setIsLiking(false);
    }
  };

  // Handle comment submit
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentError('');

    if (!commentForm.authorName.trim()) {
      setCommentError('Please enter your name');
      return;
    }
    if (!commentForm.authorEmail.trim() || !/^\S+@\S+\.\S+$/.test(commentForm.authorEmail)) {
      setCommentError('Please enter a valid email');
      return;
    }
    if (!commentForm.content.trim()) {
      setCommentError('Please enter a comment');
      return;
    }

    setIsSubmittingComment(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogId: id,
          ...commentForm,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to post comment');
      }

      const data = await res.json();
      setComments((prev) => [data.comment, ...prev]);
      setCommentForm({ authorName: '', authorEmail: '', content: '' });
    } catch (err) {
      setCommentError(err instanceof Error ? err.message : 'Failed to post comment');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Handle share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.summary,
          url: window.location.href,
        });
      } catch {
        // Share cancelled or failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={40} className="animate-spin" style={{ color: '#f97316' }} />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#ef4444', marginBottom: '16px' }}>{error || 'Blog not found'}</p>
          <Link href="/blogs" className="btn-primary">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '24px' }}>
          <Link
            href="/blogs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#525252',
              marginBottom: '24px',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
          >
            <ArrowLeft size={20} />
            Back to Collection
          </Link>

          {/* Category & Topic */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              backgroundColor: '#fff7ed',
              color: '#c2410c',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 500,
              border: '1px solid #fed7aa'
            }}>
              {blog.topicCategory}
            </span>
            <span style={{ color: '#a3a3a3' }}>&bull;</span>
            <span style={{ color: '#525252' }}>{blog.topic}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#171717', marginBottom: '16px', lineHeight: 1.3 }}>
            {blog.title}
          </h1>

          {/* Meta */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#737373' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} />
              <span>{blog.authorName}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} />
              <span>{formatDate(new Date(blog.createdAt))}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={16} />
              <span>{blog.views} views</span>
            </div>
          </div>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    backgroundColor: '#f5f5f5',
                    color: '#525252',
                    borderRadius: '9999px',
                    fontSize: '12px'
                  }}
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <article style={{ maxWidth: '896px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e5e5',
          padding: '32px'
        }}>
          {/* Summary */}
          <div style={{
            backgroundColor: '#fff7ed',
            borderLeft: '4px solid #f97316',
            padding: '16px',
            marginBottom: '32px',
            borderRadius: '0 8px 8px 0'
          }}>
            <p style={{ color: '#525252', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>{blog.summary}</p>
          </div>

          {/* Blog Content */}
          <div
            className="prose"
            style={{ maxWidth: 'none' }}
            dangerouslySetInnerHTML={{
              __html: blog.content
                .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/^(.+)$/gm, (match) => {
                  if (match.startsWith('<h') || match.startsWith('<p') || match.startsWith('</')) {
                    return match;
                  }
                  return `<p>${match}</p>`;
                })
            }}
          />
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e5e5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={handleLike}
              disabled={isLiking}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: isLiked ? '1px solid #fecaca' : '1px solid #e5e5e5',
                backgroundColor: isLiked ? '#fef2f2' : '#fafafa',
                color: isLiked ? '#ef4444' : '#525252',
                cursor: isLiking ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{likesCount}</span>
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#fafafa',
              borderRadius: '8px',
              color: '#525252'
            }}>
              <MessageCircle size={20} />
              <span>{comments.length}</span>
            </div>
          </div>

          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#fafafa',
              borderRadius: '8px',
              color: '#525252',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>

        {/* Comments Section */}
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#171717', marginBottom: '24px' }}>
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e5e5e5',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '16px', color: '#171717' }}>Leave a Comment</h3>

            {commentError && (
              <div style={{
                marginBottom: '16px',
                padding: '12px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '14px'
              }}>
                {commentError}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#404040', marginBottom: '4px' }}>
                  <User size={14} />
                  Name
                </label>
                <input
                  type="text"
                  value={commentForm.authorName}
                  onChange={(e) => setCommentForm((prev) => ({ ...prev, authorName: e.target.value }))}
                  placeholder="Your name"
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#404040', marginBottom: '4px' }}>
                  <Mail size={14} />
                  Email
                </label>
                <input
                  type="email"
                  value={commentForm.authorEmail}
                  onChange={(e) => setCommentForm((prev) => ({ ...prev, authorEmail: e.target.value }))}
                  placeholder="your@email.com"
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#404040', marginBottom: '4px' }}>
                <MessageCircle size={14} />
                Comment
              </label>
              <textarea
                value={commentForm.content}
                onChange={(e) => setCommentForm((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Write your comment..."
                rows={4}
                className="input-field"
                style={{ resize: 'none' }}
                maxLength={2000}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingComment}
              className="btn-primary"
            >
              {isSubmittingComment ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Post Comment
                </>
              )}
            </button>
          </form>

          {/* Comments List */}
          {comments.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e5e5'
            }}>
              <MessageCircle size={40} style={{ color: '#d4d4d4', margin: '0 auto 12px' }} />
              <p style={{ color: '#737373' }}>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {comments.map((comment) => (
                <div key={comment._id} style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#fff7ed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: '#ea580c', fontWeight: 600 }}>
                          {comment.authorName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p style={{ fontWeight: 500, color: '#171717', margin: 0 }}>{comment.authorName}</p>
                        <p style={{ fontSize: '12px', color: '#a3a3a3', margin: 0 }}>
                          {formatDistanceToNow(new Date(comment.createdAt))}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p style={{ color: '#525252', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.6 }}>{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
