'use client';

import Link from 'next/link';
import { Heart, MessageCircle, Eye, Calendar, User } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';

interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    summary: string;
    authorName: string;
    topic: string;
    topicCategory: string;
    tags: string[];
    likes: number;
    views: number;
    createdAt: string;
    commentsCount?: number;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog._id}`} style={{ textDecoration: 'none' }}>
      <article style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e5e5',
        borderRadius: '16px',
        padding: '24px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Category Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
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
          <span style={{ color: '#a3a3a3', fontSize: '14px' }}>&bull;</span>
          <span style={{ color: '#737373', fontSize: '14px' }}>{blog.topic}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontWeight: 700,
          fontSize: '1.125rem',
          color: '#171717',
          marginBottom: '8px',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {blog.title}
        </h3>

        {/* Summary */}
        <p style={{
          color: '#525252',
          fontSize: '14px',
          marginBottom: '16px',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.6
        }}>
          {blog.summary}
        </p>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '2px 8px',
                  backgroundColor: '#f5f5f5',
                  color: '#525252',
                  fontSize: '12px',
                  borderRadius: '9999px'
                }}
              >
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span style={{ padding: '2px 8px', color: '#a3a3a3', fontSize: '12px' }}>
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px solid #f5f5f5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#737373' }}>
            <User size={14} />
            <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {blog.authorName}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#a3a3a3' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Heart size={14} />
              <span>{blog.likes}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MessageCircle size={14} />
              <span>{blog.commentsCount || 0}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={14} />
              <span>{blog.views}</span>
            </div>
          </div>
        </div>

        {/* Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '12px', color: '#a3a3a3' }}>
          <Calendar size={12} />
          <span>{formatDistanceToNow(new Date(blog.createdAt))}</span>
        </div>
      </article>
    </Link>
  );
}
