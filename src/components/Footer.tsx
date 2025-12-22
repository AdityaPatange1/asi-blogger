import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, label: 'Twitter' },
    { icon: Github, label: 'GitHub' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Mail, label: 'Email' },
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
          <div style={{ gridColumn: 'span 1' }}>
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
              </div>
            </Link>
            <p style={{ color: '#a3a3a3', maxWidth: '320px', lineHeight: 1.6 }}>
              AI-powered blog generation platform. Create professional, engaging content
              across 1000+ topics in seconds. Powered by advanced language models.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '16px', color: '#ffffff' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/blogs', label: 'Blog Collection' },
                { href: '/create', label: 'Create Blog' },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: '8px' }}>
                  <Link href={link.href} style={{ color: '#a3a3a3', textDecoration: 'none', transition: 'color 0.2s' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '16px', color: '#ffffff' }}>Connect</h3>
            <div style={{ display: 'flex', gap: '16px' }}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href="#"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#262626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#a3a3a3',
                      transition: 'all 0.2s'
                    }}
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #262626',
          marginTop: '48px',
          paddingTop: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px'
        }}>
          <p style={{ color: '#a3a3a3', fontSize: '14px' }}>
            &copy; {currentYear} ASI Blogger. All rights reserved.
          </p>
          <p style={{ color: '#525252', fontSize: '14px' }}>
            Powered by Anthropic Claude AI
          </p>
        </div>
      </div>
    </footer>
  );
}
