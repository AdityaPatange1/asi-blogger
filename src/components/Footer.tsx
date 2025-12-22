import Link from 'next/link';
import { Mail, Shield, Cookie, Users, Scale } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { href: '/terms', label: 'Terms of Service', icon: Scale },
    { href: '/privacy', label: 'Privacy Policy', icon: Shield },
    { href: '/cookies', label: 'Cookie Policy', icon: Cookie },
    { href: '/about', label: 'About Us', icon: Users },
  ];

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/blogs', label: 'Blog Collection' },
    { href: '/create', label: 'Create Blog' },
  ];

  return (
    <footer style={{ backgroundColor: '#171717', color: '#ffffff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px'
        }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textDecoration: 'none' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.25rem' }}>A</span>
              </div>
              <div>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#ffffff' }}>ASI</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#f97316' }}>Blogger</span>
                <sup style={{ fontSize: '0.6rem', color: '#a3a3a3' }}>&trade;</sup>
              </div>
            </Link>
            <p style={{ color: '#a3a3a3', maxWidth: '280px', lineHeight: 1.6, fontSize: '14px' }}>
              AI-powered blog generation platform. Create professional, engaging content
              across 1000+ topics in seconds.
            </p>
            <p style={{ color: '#737373', fontSize: '12px', marginTop: '16px' }}>
              Powered by Anthropic Claude AI&reg;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '16px', color: '#ffffff' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.href} style={{ marginBottom: '10px' }}>
                  <Link href={link.href} style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '16px', color: '#ffffff' }}>Legal</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {legalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href} style={{ marginBottom: '10px' }}>
                    <Link
                      href={link.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#a3a3a3',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.2s'
                      }}
                    >
                      <Icon size={14} />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '16px', color: '#ffffff' }}>Connect</h3>
            <a
              href="mailto:hello@asi-blogger.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#a3a3a3',
                textDecoration: 'none',
                fontSize: '14px',
                marginBottom: '16px'
              }}
            >
              <Mail size={16} />
              hello@asi-blogger.com
            </a>
            <p style={{ color: '#737373', fontSize: '12px', lineHeight: 1.6 }}>
              Co-owned by<br />
              <span style={{ color: '#a3a3a3' }}>Ekta Bhatia</span> &{' '}
              <span style={{ color: '#a3a3a3' }}>Aditya Patange</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #262626',
          marginTop: '40px',
          paddingTop: '24px'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div>
              <p style={{ color: '#a3a3a3', fontSize: '13px', margin: 0 }}>
                &copy; {currentYear} ASI Blogger&trade;. All Rights Reserved.
              </p>
              <p style={{ color: '#525252', fontSize: '11px', marginTop: '4px' }}>
                ASI Blogger&trade; and the ASI Blogger logo are trademarks of ASI Blogger.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/terms" style={{ color: '#737373', fontSize: '12px', textDecoration: 'none' }}>
                Terms
              </Link>
              <span style={{ color: '#404040' }}>|</span>
              <Link href="/privacy" style={{ color: '#737373', fontSize: '12px', textDecoration: 'none' }}>
                Privacy
              </Link>
              <span style={{ color: '#404040' }}>|</span>
              <Link href="/cookies" style={{ color: '#737373', fontSize: '12px', textDecoration: 'none' }}>
                Cookies
              </Link>
            </div>
          </div>

          {/* Additional Legal Notice */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #262626'
          }}>
            <p style={{ color: '#525252', fontSize: '11px', lineHeight: 1.6, margin: 0, textAlign: 'center' }}>
              <strong style={{ color: '#737373' }}>Legal Notice:</strong> The content generated by this platform is created using
              artificial intelligence and is provided for informational purposes only. ASI Blogger&trade;, its collaborators,
              and affiliates make no warranties regarding the accuracy, completeness, or reliability of AI-generated content.
              Users are responsible for reviewing and verifying all content before use. All trademarks, registered trademarks,
              and service marks mentioned herein are the property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
