'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, User, Loader2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Simple markdown renderer for chat messages
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const processInlineMarkdown = (line: string): React.ReactNode => {
    // Process bold, italic, and inline code
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      // Bold: **text**
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Italic: *text*
      const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
      // Inline code: `code`
      const codeMatch = remaining.match(/`(.+?)`/);

      // Find the earliest match
      const matches = [
        boldMatch ? { type: 'bold', match: boldMatch, index: boldMatch.index! } : null,
        italicMatch ? { type: 'italic', match: italicMatch, index: italicMatch.index! } : null,
        codeMatch ? { type: 'code', match: codeMatch, index: codeMatch.index! } : null,
      ].filter(Boolean).sort((a, b) => a!.index - b!.index);

      if (matches.length === 0) {
        parts.push(remaining);
        break;
      }

      const firstMatch = matches[0]!;

      // Add text before match
      if (firstMatch.index > 0) {
        parts.push(remaining.substring(0, firstMatch.index));
      }

      // Add formatted element
      if (firstMatch.type === 'bold') {
        parts.push(
          <strong key={key++} style={{ fontWeight: 600 }}>
            {firstMatch.match[1]}
          </strong>
        );
        remaining = remaining.substring(firstMatch.index + firstMatch.match[0].length);
      } else if (firstMatch.type === 'italic') {
        parts.push(
          <em key={key++} style={{ fontStyle: 'italic' }}>
            {firstMatch.match[1]}
          </em>
        );
        remaining = remaining.substring(firstMatch.index + firstMatch.match[0].length);
      } else if (firstMatch.type === 'code') {
        parts.push(
          <code key={key++} style={{
            backgroundColor: '#f0f0f0',
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            {firstMatch.match[1]}
          </code>
        );
        remaining = remaining.substring(firstMatch.index + firstMatch.match[0].length);
      }
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>;
  };

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      const ListTag = listType;
      elements.push(
        <ListTag key={elements.length} style={{
          margin: '8px 0',
          paddingLeft: '20px',
          listStyleType: listType === 'ul' ? 'disc' : 'decimal'
        }}>
          {listItems.map((item, i) => (
            <li key={i} style={{ marginBottom: '4px' }}>{processInlineMarkdown(item)}</li>
          ))}
        </ListTag>
      );
      listItems = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    // Unordered list item
    if (line.match(/^[-*]\s+/)) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      listItems.push(line.replace(/^[-*]\s+/, ''));
      return;
    }

    // Ordered list item
    if (line.match(/^\d+\.\s+/)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      listItems.push(line.replace(/^\d+\.\s+/, ''));
      return;
    }

    // Flush any pending list
    flushList();

    // Empty line
    if (line.trim() === '') {
      elements.push(<br key={index} />);
      return;
    }

    // Regular paragraph
    elements.push(
      <p key={index} style={{ margin: '4px 0' }}>
        {processInlineMarkdown(line)}
      </p>
    );
  });

  // Flush any remaining list
  flushList();

  return <>{elements}</>;
}

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi there! I\'m **SEASHA**, your friendly AI assistant for ASI Blogger™. I\'d love to help you explore and discover amazing content in our blog collection! Feel free to ask me anything about topics, articles, or how to find exactly what you\'re looking for. 💫',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamingContent('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim() }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                // Stream complete
                break;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  fullContent += parsed.text;
                  setStreamingContent(fullContent);
                }
              } catch {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }

      // Add the complete message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fullContent || 'I apologize, but I couldn\'t generate a response. Please try again!',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingContent('');
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Oh dear, I encountered a little hiccup! Could you please try again? I\'m here to help! 💫',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setStreamingContent('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {/* Chat Panel */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: 0,
          width: '400px',
          maxWidth: 'calc(100vw - 48px)',
          height: '520px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #e5e5e5',
          animation: 'fadeIn 0.3s ease'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={20} style={{ color: '#ffffff' }} />
              </div>
              <div>
                <h3 style={{ fontWeight: 600, color: '#ffffff', fontSize: '15px', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  SEASHA
                  <span style={{
                    fontSize: '10px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 500
                  }}>AI</span>
                </h3>
                <p style={{ color: '#fed7aa', fontSize: '11px', margin: 0 }}>Smart, Empathetic Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.8)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex'
              }}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  backgroundColor: message.role === 'user' ? '#171717' : '#fff7ed'
                }}>
                  {message.role === 'user' ? (
                    <User size={16} style={{ color: '#ffffff' }} />
                  ) : (
                    <Sparkles size={16} style={{ color: '#ea580c' }} />
                  )}
                </div>
                <div style={{
                  maxWidth: '75%',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  backgroundColor: message.role === 'user' ? '#171717' : '#f5f5f5',
                  color: message.role === 'user' ? '#ffffff' : '#171717',
                  borderBottomRightRadius: message.role === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: message.role === 'user' ? '16px' : '4px'
                }}>
                  <div style={{ fontSize: '14px', lineHeight: 1.5 }}>
                    {message.role === 'assistant' ? renderMarkdown(message.content) : message.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Streaming message */}
            {isLoading && streamingContent && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#fff7ed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Sparkles size={16} style={{ color: '#ea580c' }} />
                </div>
                <div style={{
                  maxWidth: '75%',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '16px',
                  borderBottomLeftRadius: '4px',
                  padding: '10px 14px'
                }}>
                  <div style={{ fontSize: '14px', lineHeight: 1.5 }}>
                    {renderMarkdown(streamingContent)}
                  </div>
                </div>
              </div>
            )}

            {/* Loading indicator (shown before stream starts) */}
            {isLoading && !streamingContent && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#fff7ed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Sparkles size={16} style={{ color: '#ea580c' }} />
                </div>
                <div style={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '16px',
                  borderBottomLeftRadius: '4px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Loader2 size={16} className="animate-spin" style={{ color: '#f97316' }} />
                  <span style={{ fontSize: '13px', color: '#737373' }}>SEASHA is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} style={{ padding: '16px', borderTop: '1px solid #e5e5e5' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask SEASHA anything..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '9999px',
                  border: '1px solid #e5e5e5',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer',
                  opacity: !input.trim() || isLoading ? 0.5 : 1
                }}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4)',
          transition: 'all 0.3s ease'
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X size={24} style={{ color: '#ffffff' }} />
        ) : (
          <MessageCircle size={24} style={{ color: '#ffffff' }} />
        )}
      </button>
    </div>
  );
}
