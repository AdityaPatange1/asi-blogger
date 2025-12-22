import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '24px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#525252',
              marginBottom: '24px',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#fff7ed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Scale size={24} style={{ color: '#ea580c' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#171717', margin: 0 }}>
                Terms of Service
              </h1>
              <p style={{ color: '#737373', margin: 0, fontSize: '14px' }}>
                Last updated: December 22, 2025.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e5e5e5',
          padding: '32px'
        }}>
          <div style={{ lineHeight: 1.8, color: '#404040' }}>
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                1. Acceptance of Terms.
              </h2>
              <p>
                By accessing and using ASI Blogger&trade; (&quot;the Service&quot;), you accept and agree to be bound by
                these Terms of Service. If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                2. Description of Service.
              </h2>
              <p>
                ASI Blogger&trade; is an AI-powered blog generation platform that allows users to create,
                publish, and interact with blog content. The Service utilizes advanced artificial
                intelligence technology provided by Anthropic Claude AI&reg;.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                3. User Responsibilities.
              </h2>
              <p style={{ marginBottom: '12px' }}>You agree to:</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Provide accurate information when creating blog posts.</li>
                <li style={{ marginBottom: '8px' }}>Not use the Service for any unlawful purposes.</li>
                <li style={{ marginBottom: '8px' }}>Not attempt to interfere with the proper functioning of the Service.</li>
                <li style={{ marginBottom: '8px' }}>Respect the intellectual property rights of others.</li>
                <li style={{ marginBottom: '8px' }}>Not post content that is defamatory, obscene, or harmful.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                4. Intellectual Property.
              </h2>
              <p>
                The ASI Blogger&trade; name, logo, and all related names, logos, product and service names,
                designs, and slogans are trademarks of ASI Blogger or its affiliates. You may not use
                such marks without prior written permission. Content generated through our AI service
                is provided for your use, but the underlying technology remains our intellectual property.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                5. Content Ownership.
              </h2>
              <p>
                You retain ownership of the content you create using our Service. However, by publishing
                content on ASI Blogger&trade;, you grant us a non-exclusive, worldwide, royalty-free license
                to display, distribute, and promote your content within our platform.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                6. AI-Generated Content Disclaimer.
              </h2>
              <p>
                Content generated by our AI system is provided &quot;as is&quot; without warranties of any kind.
                While we strive for accuracy, AI-generated content may contain errors or inaccuracies.
                Users are responsible for reviewing and verifying all generated content before publication.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                7. Limitation of Liability.
              </h2>
              <p>
                To the maximum extent permitted by law, ASI Blogger&trade; shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, or any loss of
                profits or revenues, whether incurred directly or indirectly, or any loss of data,
                use, goodwill, or other intangible losses.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                8. Modifications to Terms.
              </h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will notify
                users of any material changes by posting the new Terms on this page with an updated
                revision date. Your continued use of the Service after such modifications constitutes
                acceptance of the updated Terms.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                9. Governing Law.
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable laws,
                without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                10. Contact Information.
              </h2>
              <p>
                For questions about these Terms of Service, please contact us through our platform
                or visit the <Link href="/about" style={{ color: '#ea580c' }}>About</Link> page.
              </p>
            </section>
          </div>

          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e5e5',
            textAlign: 'center',
            color: '#737373',
            fontSize: '14px'
          }}>
            <p>&copy; 2025 ASI Blogger&trade;. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
