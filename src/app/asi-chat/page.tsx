'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, User, Loader2, Sparkles, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Array<{ title: string; topic: string; category: string }>;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const STORAGE_KEY = 'asi_chat_history';
const KB_STORAGE_KEY = 'asi_kb_cache';
const KB_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function ASIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [kbLoaded, setKbLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load chat histories from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setChatHistories(parsed.map((h: ChatHistory) => ({
          ...h,
          createdAt: new Date(h.createdAt),
          messages: h.messages.map((m: Message) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }))
        })));
      } catch (e) {
        console.error('Failed to parse chat history:', e);
      }
    }
  }, []);

  // Cache knowledge base in browser
  useEffect(() => {
    const cacheKB = async () => {
      try {
        const cached = localStorage.getItem(KB_STORAGE_KEY);
        if (cached) {
          const { timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < KB_CACHE_DURATION) {
            setKbLoaded(true);
            return;
          }
        }

        const response = await fetch('/api/asi-kb');
        if (response.ok) {
          const kb = await response.json();
          localStorage.setItem(KB_STORAGE_KEY, JSON.stringify({
            data: kb,
            timestamp: Date.now()
          }));
          setKbLoaded(true);
        }
      } catch (e) {
        console.error('Failed to cache KB:', e);
        setKbLoaded(true); // Continue anyway
      }
    };

    cacheKB();
  }, []);

  // Save chat histories to localStorage
  useEffect(() => {
    if (chatHistories.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistories));
    }
  }, [chatHistories]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const generateChatTitle = (firstMessage: string): string => {
    const words = firstMessage.split(' ').slice(0, 5).join(' ');
    return words.length > 30 ? words.substring(0, 30) + '...' : words;
  };

  const startNewChat = () => {
    // Save current chat if it has messages
    if (messages.length > 0 && currentChatId) {
      const existingIndex = chatHistories.findIndex(h => h.id === currentChatId);
      if (existingIndex >= 0) {
        const updated = [...chatHistories];
        updated[existingIndex] = { ...updated[existingIndex], messages };
        setChatHistories(updated);
      }
    }

    setMessages([]);
    setCurrentChatId(null);
    setShowHistory(false);
  };

  const loadChat = (history: ChatHistory) => {
    setMessages(history.messages);
    setCurrentChatId(history.id);
    setShowHistory(false);
  };

  const deleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatHistories(prev => prev.filter(h => h.id !== id));
    if (currentChatId === id) {
      setMessages([]);
      setCurrentChatId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API
      const historyForAPI = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/asi-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          history: historyForAPI
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'I could not generate a response. Please try again.',
        timestamp: new Date(),
        sources: data.sources
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);

      // Save or update chat history
      if (currentChatId) {
        setChatHistories(prev => {
          const index = prev.findIndex(h => h.id === currentChatId);
          if (index >= 0) {
            const updated = [...prev];
            updated[index] = { ...updated[index], messages: updatedMessages };
            return updated;
          }
          return prev;
        });
      } else {
        // Create new chat history
        const newChatId = Date.now().toString();
        const newHistory: ChatHistory = {
          id: newChatId,
          title: generateChatTitle(userMessage.content),
          messages: updatedMessages,
          createdAt: new Date()
        };
        setChatHistories(prev => [newHistory, ...prev].slice(0, 20)); // Keep last 20 chats
        setCurrentChatId(newChatId);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I encountered an error while processing your question. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e5e5',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#525252', textDecoration: 'none' }}>
              <ArrowLeft size={20} />
              <span>Back</span>
            </Link>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#e5e5e5' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={20} style={{ color: '#ffffff' }} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#171717', margin: 0 }}>
                  ASI Chat <span style={{ color: '#f97316' }}>(EB)</span>
                </h1>
                <p style={{ fontSize: '11px', color: '#737373', margin: 0 }}>
                  Powered by Bhairava Kali Consciousness Technology (BKCT)
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setShowHistory(!showHistory)}
              style={{
                padding: '8px 16px',
                backgroundColor: showHistory ? '#fff7ed' : '#f5f5f5',
                border: showHistory ? '1px solid #fed7aa' : '1px solid #e5e5e5',
                borderRadius: '8px',
                color: showHistory ? '#ea580c' : '#525252',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              History ({chatHistories.length})
            </button>
            <button
              onClick={startNewChat}
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              New Chat
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* History Sidebar */}
        {showHistory && (
          <aside style={{
            width: '280px',
            borderRight: '1px solid #e5e5e5',
            padding: '16px',
            overflowY: 'auto',
            backgroundColor: '#fafafa'
          }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#525252', marginBottom: '16px' }}>
              Chat History
            </h2>
            {chatHistories.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#737373' }}>No chat history yet</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {chatHistories.map(history => (
                  <div
                    key={history.id}
                    onClick={() => loadChat(history)}
                    style={{
                      padding: '12px',
                      backgroundColor: currentChatId === history.id ? '#fff7ed' : '#ffffff',
                      border: currentChatId === history.id ? '1px solid #fed7aa' : '1px solid #e5e5e5',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#171717',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {history.title}
                      </p>
                      <p style={{ fontSize: '11px', color: '#737373', margin: '4px 0 0 0' }}>
                        {history.messages.length} messages
                      </p>
                    </div>
                    <button
                      onClick={(e) => deleteChat(history.id, e)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '4px',
                        cursor: 'pointer',
                        color: '#a3a3a3',
                        flexShrink: 0
                      }}
                      aria-label="Delete chat"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </aside>
        )}

        {/* Chat Area */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {messages.length === 0 ? (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '48px 24px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <Sparkles size={40} style={{ color: '#ffffff' }} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#171717', marginBottom: '12px' }}>
                  Welcome to ASI Chat (EB)
                </h2>
                <p style={{ fontSize: '1rem', color: '#525252', maxWidth: '500px', marginBottom: '8px' }}>
                  Ask me anything about the topics in our blog collection. I can help you explore AI, science, technology, business, and over 1000 other topics.
                </p>
                <p style={{ fontSize: '12px', color: '#a3a3a3' }}>
                  Powered by Bhairava Kali Consciousness Technology (BKCT)
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                    maxWidth: '800px',
                    margin: message.role === 'user' ? '0 0 0 auto' : '0 auto 0 0'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: message.role === 'user' ? '#171717' : '#fff7ed',
                    border: message.role === 'user' ? 'none' : '1px solid #fed7aa'
                  }}>
                    {message.role === 'user' ? (
                      <User size={20} style={{ color: '#ffffff' }} />
                    ) : (
                      <Sparkles size={20} style={{ color: '#ea580c' }} />
                    )}
                  </div>
                  <div style={{
                    maxWidth: 'calc(100% - 56px)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    backgroundColor: message.role === 'user' ? '#171717' : '#f5f5f5',
                    color: message.role === 'user' ? '#ffffff' : '#171717',
                    borderTopRightRadius: message.role === 'user' ? '4px' : '16px',
                    borderTopLeftRadius: message.role === 'user' ? '16px' : '4px'
                  }}>
                    <p style={{
                      fontSize: '15px',
                      lineHeight: 1.7,
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}>
                      {message.content}
                    </p>
                    {message.sources && message.sources.length > 0 && (
                      <div style={{
                        marginTop: '12px',
                        paddingTop: '12px',
                        borderTop: '1px solid #e5e5e5',
                        fontSize: '12px',
                        color: '#737373'
                      }}>
                        Based on {message.sources.length} blog{message.sources.length > 1 ? 's' : ''} in the collection
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div style={{
                display: 'flex',
                gap: '16px',
                maxWidth: '800px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#fff7ed',
                  border: '1px solid #fed7aa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Sparkles size={20} style={{ color: '#ea580c' }} />
                </div>
                <div style={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '16px',
                  borderTopLeftRadius: '4px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Loader2 size={20} className="animate-spin" style={{ color: '#f97316' }} />
                  <span style={{ fontSize: '14px', color: '#525252' }}>ASI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '16px 24px 24px',
            borderTop: '1px solid #e5e5e5',
            backgroundColor: '#ffffff'
          }}>
            <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-end',
                backgroundColor: '#f5f5f5',
                borderRadius: '16px',
                padding: '12px 16px',
                border: '1px solid #e5e5e5'
              }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask ASI anything..."
                  disabled={isLoading}
                  rows={1}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '15px',
                    resize: 'none',
                    minHeight: '24px',
                    maxHeight: '120px',
                    lineHeight: 1.5,
                    fontFamily: 'inherit'
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: !input.trim() || isLoading ? '#e5e5e5' : 'linear-gradient(135deg, #f97316, #ea580c)',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer',
                    flexShrink: 0
                  }}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
              <p style={{
                fontSize: '11px',
                color: '#a3a3a3',
                textAlign: 'center',
                marginTop: '12px'
              }}>
                ASI Chat (EB) uses the ASI Blogger knowledge base to provide accurate answers.
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
