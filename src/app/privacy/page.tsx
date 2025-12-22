import Link from 'next/link';
import { ArrowLeft, Shield, Lock } from 'lucide-react';

export default function PrivacyPolicy() {
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
              <Shield size={24} style={{ color: '#ea580c' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#171717', margin: 0 }}>
                Privacy Policy
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
          {/* Privacy Commitment Banner */}
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Lock size={24} style={{ color: '#16a34a' }} />
            <p style={{ margin: 0, color: '#166534' }}>
              <strong>Your privacy is important to us.</strong> We are committed to protecting your
              personal information and being transparent about what data we collect.
            </p>
          </div>

          <div style={{ lineHeight: 1.8, color: '#404040' }}>
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                1. Information We Collect.
              </h2>
              <p style={{ marginBottom: '16px' }}>We collect the following types of information:</p>

              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#171717', marginBottom: '8px' }}>
                1.1 Information You Provide.
              </h3>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Name and email address when creating blog posts.</li>
                <li style={{ marginBottom: '8px' }}>Blog content and descriptions you submit.</li>
                <li style={{ marginBottom: '8px' }}>Comments you post on blogs.</li>
              </ul>

              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#171717', marginBottom: '8px' }}>
                1.2 Automatically Collected Information.
              </h3>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Browser type and version.</li>
                <li style={{ marginBottom: '8px' }}>Device information.</li>
                <li style={{ marginBottom: '8px' }}>Pages visited and time spent on pages.</li>
                <li style={{ marginBottom: '8px' }}>Referring website addresses.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                2. How We Use Your Information.
              </h2>
              <p style={{ marginBottom: '12px' }}>We use the collected information to:</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Provide and maintain our Service.</li>
                <li style={{ marginBottom: '8px' }}>Generate AI-powered blog content based on your descriptions.</li>
                <li style={{ marginBottom: '8px' }}>Display author attribution on published blogs.</li>
                <li style={{ marginBottom: '8px' }}>Enable community features like comments and likes.</li>
                <li style={{ marginBottom: '8px' }}>Improve and optimize our Service.</li>
                <li style={{ marginBottom: '8px' }}>Analyze usage patterns to enhance user experience.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                3. Data Storage and Security.
              </h2>
              <p>
                Your data is stored securely using industry-standard encryption and security measures.
                We use MongoDB Atlas for database storage, which provides enterprise-grade security
                features including encryption at rest and in transit. We implement appropriate technical
                and organizational measures to protect your personal data against unauthorized access,
                alteration, disclosure, or destruction.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                4. Third-Party Services.
              </h2>
              <p style={{ marginBottom: '12px' }}>We use the following third-party services:</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Anthropic Claude AI&reg;:</strong> For generating blog content. Your blog descriptions
                  are sent to Anthropic&apos;s API for content generation.
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>MongoDB Atlas:</strong> For secure data storage.
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>Vercel:</strong> For hosting and deployment (if applicable).
                </li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                5. Cookies.
              </h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience.
                For detailed information about the cookies we use, please see our{' '}
                <Link href="/cookies" style={{ color: '#ea580c' }}>Cookie Policy</Link>.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                6. Your Rights.
              </h2>
              <p style={{ marginBottom: '12px' }}>You have the right to:</p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Access the personal data we hold about you.</li>
                <li style={{ marginBottom: '8px' }}>Request correction of inaccurate data.</li>
                <li style={{ marginBottom: '8px' }}>Request deletion of your data.</li>
                <li style={{ marginBottom: '8px' }}>Object to processing of your data.</li>
                <li style={{ marginBottom: '8px' }}>Request data portability.</li>
                <li style={{ marginBottom: '8px' }}>Withdraw consent at any time.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                7. Data Retention.
              </h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes
                for which it was collected, including to satisfy any legal, accounting, or reporting
                requirements. Blog content and comments are retained indefinitely unless you request
                deletion.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                8. Children&apos;s Privacy.
              </h2>
              <p>
                Our Service is not intended for children under 13 years of age. We do not knowingly
                collect personal information from children under 13. If you are a parent or guardian
                and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                9. International Data Transfers.
              </h2>
              <p>
                Your information may be transferred to and maintained on servers located outside
                your country of residence. We ensure appropriate safeguards are in place to protect
                your data in accordance with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                10. Changes to This Policy.
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices
                or for other operational, legal, or regulatory reasons. Please revisit this page
                periodically to stay informed about our use of cookies.
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
