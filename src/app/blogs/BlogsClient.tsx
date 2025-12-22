'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Loader2,
  BookOpen,
  RefreshCw
} from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import { getAllCategories } from '@/data/topics';
import { debounce } from '@/lib/utils';

interface Blog {
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
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const sortOptions = [
  { value: 'createdAt-desc', label: 'Newest First' },
  { value: 'createdAt-asc', label: 'Oldest First' },
  { value: 'likes-desc', label: 'Most Liked' },
  { value: 'views-desc', label: 'Most Viewed' },
  { value: 'title-asc', label: 'Title A-Z' },
  { value: 'title-desc', label: 'Title Z-A' },
];

export default function BlogsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'createdAt-desc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = getAllCategories();

  const fetchBlogs = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError('');

    try {
      const [sortField, sortOrder] = sortBy.split('-');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        sortBy: sortField,
        sortOrder: sortOrder,
      });

      if (searchQuery.trim()) {
        params.set('search', searchQuery.trim());
      }
      if (selectedCategory) {
        params.set('category', selectedCategory);
      }

      const response = await fetch(`/api/blogs?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch blogs');

      const data = await response.json();
      setBlogs(data.blogs);
      setPagination(data.pagination);

      const newParams = new URLSearchParams();
      if (searchQuery.trim()) newParams.set('search', searchQuery.trim());
      if (selectedCategory) newParams.set('category', selectedCategory);
      if (sortBy !== 'createdAt-desc') newParams.set('sort', sortBy);
      if (page > 1) newParams.set('page', page.toString());

      const newUrl = newParams.toString() ? `?${newParams.toString()}` : '/blogs';
      window.history.replaceState({}, '', newUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCategory, sortBy]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce(() => fetchBlogs(1), 500),
    [fetchBlogs]
  );

  useEffect(() => {
    debouncedFetch();
  }, [searchQuery, selectedCategory, sortBy, debouncedFetch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setIsFilterOpen(false);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handlePageChange = (page: number) => {
    fetchBlogs(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('createdAt-desc');
    router.replace('/blogs');
  };

  const hasActiveFilters = searchQuery || selectedCategory || sortBy !== 'createdAt-desc';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#171717', marginBottom: '4px' }}>
                Blog Collection
              </h1>
              <p style={{ color: '#525252' }}>
                {pagination.total} blog{pagination.total !== 1 ? 's' : ''} published
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#737373',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <RefreshCw size={16} />
                Clear Filters
              </button>
            )}
          </div>

          {/* Search and Filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {/* Search */}
              <div style={{ position: 'relative', flex: '1 1 300px' }}>
                <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#a3a3a3' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search blogs by title, content, or topic..."
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 48px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#a3a3a3'
                    }}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    border: selectedCategory ? '1px solid #f97316' : '1px solid #e5e5e5',
                    borderRadius: '8px',
                    backgroundColor: selectedCategory ? '#fff7ed' : '#ffffff',
                    color: selectedCategory ? '#c2410c' : '#171717',
                    cursor: 'pointer',
                    minWidth: '200px',
                    justifyContent: 'space-between',
                    fontSize: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Filter size={18} />
                    <span>{selectedCategory || 'All Categories'}</span>
                  </div>
                  <ChevronDown size={18} style={{ transform: isFilterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {isFilterOpen && (
                  <>
                    <div
                      style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                      onClick={() => setIsFilterOpen(false)}
                    />
                    <div style={{
                      position: 'absolute',
                      zIndex: 50,
                      top: '100%',
                      left: 0,
                      marginTop: '8px',
                      width: '280px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      maxHeight: '384px',
                      overflowY: 'auto'
                    }}>
                      <button
                        onClick={() => handleCategoryChange('')}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px 16px',
                          border: 'none',
                          backgroundColor: !selectedCategory ? '#fff7ed' : 'transparent',
                          color: !selectedCategory ? '#c2410c' : '#171717',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        All Categories
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '12px 16px',
                            border: 'none',
                            backgroundColor: selectedCategory === category ? '#fff7ed' : 'transparent',
                            color: selectedCategory === category ? '#c2410c' : '#171717',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  fontSize: '16px',
                  minWidth: '160px',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Filters */}
            {(selectedCategory || searchQuery) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedCategory && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 12px',
                    backgroundColor: '#fff7ed',
                    color: '#c2410c',
                    borderRadius: '9999px',
                    fontSize: '14px'
                  }}>
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex' }}
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 12px',
                    backgroundColor: '#f5f5f5',
                    color: '#404040',
                    borderRadius: '9999px',
                    fontSize: '14px'
                  }}>
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex' }}
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        {error ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</p>
            <button onClick={() => fetchBlogs(1)} className="btn-primary">
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
            <Loader2 size={40} className="animate-spin" style={{ color: '#f97316' }} />
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <BookOpen size={64} style={{ color: '#d4d4d4', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '8px' }}>
              No blogs found
            </h3>
            <p style={{ color: '#525252', marginBottom: '24px' }}>
              {searchQuery || selectedCategory
                ? 'Try adjusting your filters or search terms'
                : 'Be the first to create a blog post!'}
            </p>
            <a href="/create" className="btn-primary">
              Create a Blog
            </a>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '48px' }}>
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    cursor: pagination.page === 1 ? 'not-allowed' : 'pointer',
                    opacity: pagination.page === 1 ? 0.5 : 1
                  }}
                >
                  Previous
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.page <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.page >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          fontWeight: 500,
                          border: 'none',
                          backgroundColor: pagination.page === pageNum ? '#f97316' : 'transparent',
                          color: pagination.page === pageNum ? '#ffffff' : '#171717',
                          cursor: 'pointer'
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    cursor: pagination.page === pagination.totalPages ? 'not-allowed' : 'pointer',
                    opacity: pagination.page === pagination.totalPages ? 0.5 : 1
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
