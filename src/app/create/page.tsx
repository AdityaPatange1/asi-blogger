'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  PenLine,
  User,
  Mail,
  FileText,
  Tag,
  ChevronDown,
  Search,
  X,
  Loader2,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { topicCategories, searchTopics } from '@/data/topics';

interface FormData {
  authorName: string;
  authorEmail: string;
  description: string;
  topic: string;
  topicCategory: string;
  tags: string[];
}

export default function CreateBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    authorName: '',
    authorEmail: '',
    description: '',
    topic: '',
    topicCategory: '',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const [topicSearch, setTopicSearch] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const filteredTopics = useMemo(() => {
    if (!topicSearch.trim()) return [];
    return searchTopics(topicSearch).slice(0, 20);
  }, [topicSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleTopicSelect = (topic: string, category: string) => {
    setFormData((prev) => ({ ...prev, topic, topicCategory: category }));
    setIsTopicDropdownOpen(false);
    setTopicSearch('');
    setError('');
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.authorName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!formData.authorEmail.trim() || !/^\S+@\S+\.\S+$/.test(formData.authorEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.description.trim() || formData.description.length < 20) {
      setError('Please enter a description (at least 20 characters)');
      return;
    }
    if (!formData.topic) {
      setError('Please select a topic');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create blog');
      }

      const data = await response.json();
      router.push(`/blogs/${data.blog._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', padding: '48px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#fff7ed',
            color: '#c2410c',
            padding: '8px 16px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '16px',
            border: '1px solid #fed7aa'
          }}>
            <Sparkles size={16} />
            <span>AI-Powered Blog Generation</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#171717', marginBottom: '12px' }}>
            Create Your Blog
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#525252' }}>
            Fill in the details below and let our AI generate a professional blog post for you
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e5e5',
          padding: '32px'
        }}>
          {/* Error Message */}
          {error && (
            <div style={{
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#dc2626',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Author Name */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#404040', marginBottom: '8px' }}>
              <User size={16} />
              Your Name
            </label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="input-field"
              maxLength={100}
            />
          </div>

          {/* Author Email */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#404040', marginBottom: '8px' }}>
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              name="authorEmail"
              value={formData.authorEmail}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className="input-field"
            />
          </div>

          {/* Topic Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#404040', marginBottom: '8px' }}>
              <FileText size={16} />
              Select Topic
            </label>
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                className="input-field"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', cursor: 'pointer' }}
              >
                {formData.topic ? (
                  <span>
                    <span style={{ color: '#171717' }}>{formData.topic}</span>
                    <span style={{ color: '#a3a3a3', marginLeft: '8px' }}>({formData.topicCategory})</span>
                  </span>
                ) : (
                  <span style={{ color: '#a3a3a3' }}>Choose from 1014+ topics...</span>
                )}
                <ChevronDown size={20} style={{ color: '#a3a3a3', transform: isTopicDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {/* Topic Dropdown */}
              {isTopicDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  zIndex: 50,
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '8px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                  maxHeight: '384px',
                  overflow: 'hidden'
                }}>
                  {/* Search */}
                  <div style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>
                    <div style={{ position: 'relative' }}>
                      <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a3a3a3' }} />
                      <input
                        type="text"
                        placeholder="Search topics..."
                        value={topicSearch}
                        onChange={(e) => setTopicSearch(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 16px 8px 40px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                  </div>

                  {/* Topics List */}
                  <div style={{ maxHeight: '288px', overflowY: 'auto' }}>
                    {topicSearch.trim() ? (
                      filteredTopics.length > 0 ? (
                        <div style={{ padding: '8px' }}>
                          {filteredTopics.map((item) => (
                            <button
                              key={`${item.category}-${item.topic}`}
                              type="button"
                              onClick={() => handleTopicSelect(item.topic, item.category)}
                              style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                                fontSize: '14px'
                              }}
                            >
                              <span style={{ color: '#171717' }}>{item.topic}</span>
                              <span style={{ color: '#a3a3a3', marginLeft: '8px', fontSize: '12px' }}>({item.category})</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div style={{ padding: '16px', textAlign: 'center', color: '#737373' }}>No topics found</div>
                      )
                    ) : (
                      <div style={{ padding: '8px' }}>
                        {topicCategories.map((category) => (
                          <div key={category.name} style={{ marginBottom: '4px' }}>
                            <button
                              type="button"
                              onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                                fontWeight: 500,
                                color: '#404040',
                                fontSize: '14px'
                              }}
                            >
                              <span>{category.name}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '12px', color: '#a3a3a3' }}>{category.topics.length} topics</span>
                                <ChevronDown size={16} style={{ transform: expandedCategory === category.name ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                              </div>
                            </button>
                            {expandedCategory === category.name && (
                              <div style={{ marginLeft: '16px', marginTop: '4px' }}>
                                {category.topics.map((topic) => (
                                  <button
                                    key={topic}
                                    type="button"
                                    onClick={() => handleTopicSelect(topic, category.name)}
                                    style={{
                                      width: '100%',
                                      textAlign: 'left',
                                      padding: '6px 12px',
                                      borderRadius: '8px',
                                      border: 'none',
                                      backgroundColor: 'transparent',
                                      cursor: 'pointer',
                                      fontSize: '13px',
                                      color: '#525252'
                                    }}
                                  >
                                    {topic}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {formData.topic && (
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} style={{ color: '#22c55e' }} />
                <span style={{ fontSize: '14px', color: '#16a34a' }}>Topic selected: {formData.topic}</span>
              </div>
            )}
          </div>

          {/* Blog Description */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#404040', marginBottom: '8px' }}>
              <PenLine size={16} />
              Describe Your Blog
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what you want to write about. Be specific about the angle, focus areas, or any particular aspects you want covered..."
              rows={5}
              className="input-field"
              style={{ resize: 'none' }}
              maxLength={1000}
            />
            <div style={{ marginTop: '4px', fontSize: '12px', color: '#a3a3a3', textAlign: 'right' }}>
              {formData.description.length}/1000 characters
            </div>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#404040', marginBottom: '8px' }}>
              <Tag size={16} />
              Tags (Optional)
            </label>
            <div className="input-field" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '48px', alignItems: 'center' }}>
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 12px',
                    backgroundColor: '#fff7ed',
                    color: '#c2410c',
                    borderRadius: '9999px',
                    fontSize: '14px'
                  }}
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex' }}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder={formData.tags.length < 10 ? "Type and press Enter..." : "Max 10 tags"}
                disabled={formData.tags.length >= 10}
                style={{
                  flex: '1 1 150px',
                  minWidth: '150px',
                  outline: 'none',
                  border: 'none',
                  fontSize: '14px',
                  backgroundColor: 'transparent'
                }}
              />
            </div>
            <div style={{ marginTop: '4px', fontSize: '12px', color: '#a3a3a3' }}>
              Press Enter or comma to add tags ({formData.tags.length}/10)
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ width: '100%', padding: '16px', fontSize: '1.125rem' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generating Your Blog...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Blog with AI
              </>
            )}
          </button>

          <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px', color: '#737373' }}>
            Your blog will be generated using Anthropic Claude AI and published to our collection
          </p>
        </form>
      </div>

      {/* Click outside to close dropdown */}
      {isTopicDropdownOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          onClick={() => setIsTopicDropdownOpen(false)}
        />
      )}
    </div>
  );
}
