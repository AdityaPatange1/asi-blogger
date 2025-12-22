'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Check, Settings } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, can't be changed
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('asi_cookie_consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
    };
    savePreferences(allAccepted);
  };

  const handleAcceptEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      functional: false,
      analytics: false,
    };
    savePreferences(essentialOnly);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('asi_cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('asi_cookie_consent_date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      padding: '16px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden'
      }}>
        {/* Main Banner */}
        {!showSettings ? (
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#fff7ed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Cookie size={24} style={{ color: '#ea580c' }} />
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#171717', marginBottom: '8px' }}>
                  We Value Your Privacy
                </h3>
                <p style={{ color: '#525252', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                  By clicking &quot;Accept All&quot;, you consent to our use of cookies as described in our{' '}
                  <Link href="/cookies" style={{ color: '#ea580c', textDecoration: 'underline' }}>
                    Cookie Policy
                  </Link>.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <button
                    onClick={handleAcceptAll}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      background: 'linear-gradient(135deg, #f97316, #ea580c)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <Check size={16} />
                    Accept All
                  </button>

                  <button
                    onClick={handleAcceptEssential}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      backgroundColor: '#f5f5f5',
                      color: '#525252',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Essential Only
                  </button>

                  <button
                    onClick={() => setShowSettings(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      backgroundColor: 'transparent',
                      color: '#737373',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <Settings size={16} />
                    Customize
                  </button>
                </div>
              </div>

              <button
                onClick={handleAcceptEssential}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#a3a3a3',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
          /* Settings Panel */
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#171717', margin: 0 }}>
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#a3a3a3',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {/* Essential Cookies */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                border: '1px solid #bbf7d0'
              }}>
                <div>
                  <p style={{ fontWeight: 600, color: '#166534', margin: 0 }}>Essential Cookies</p>
                  <p style={{ color: '#16a34a', fontSize: '13px', margin: '4px 0 0' }}>
                    Required for the website to function properly
                  </p>
                </div>
                <div style={{
                  padding: '6px 12px',
                  backgroundColor: '#166534',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 500
                }}>
                  Always On
                </div>
              </div>

              {/* Functional Cookies */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#fafafa',
                borderRadius: '12px',
                border: '1px solid #e5e5e5'
              }}>
                <div>
                  <p style={{ fontWeight: 600, color: '#171717', margin: 0 }}>Functional Cookies</p>
                  <p style={{ color: '#737373', fontSize: '13px', margin: '4px 0 0' }}>
                    Enable enhanced functionality and personalization
                  </p>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px' }}>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences(prev => ({ ...prev, functional: e.target.checked }))}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: preferences.functional ? '#f97316' : '#d4d4d4',
                    borderRadius: '26px',
                    transition: 'all 0.3s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '20px',
                      width: '20px',
                      left: preferences.functional ? '25px' : '3px',
                      bottom: '3px',
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      transition: 'all 0.3s'
                    }} />
                  </span>
                </label>
              </div>

              {/* Analytics Cookies */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#fafafa',
                borderRadius: '12px',
                border: '1px solid #e5e5e5'
              }}>
                <div>
                  <p style={{ fontWeight: 600, color: '#171717', margin: 0 }}>Analytics Cookies</p>
                  <p style={{ color: '#737373', fontSize: '13px', margin: '4px 0 0' }}>
                    Help us understand how visitors use our website
                  </p>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px' }}>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: preferences.analytics ? '#f97316' : '#d4d4d4',
                    borderRadius: '26px',
                    transition: 'all 0.3s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '20px',
                      width: '20px',
                      left: preferences.analytics ? '25px' : '3px',
                      bottom: '3px',
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      transition: 'all 0.3s'
                    }} />
                  </span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSavePreferences}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <Check size={16} />
                Save Preferences
              </button>

              <button
                onClick={() => setShowSettings(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f5f5f5',
                  color: '#525252',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
