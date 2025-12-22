import Link from 'next/link';
import { ArrowLeft, Cookie, Settings } from 'lucide-react';

export default function CookiePolicy() {
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
              <Cookie size={24} style={{ color: '#ea580c' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#171717', margin: 0 }}>
                Cookie Policy
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
                1. What Are Cookies.
              </h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when
                you visit a website. They are widely used to make websites work more efficiently and
                provide information to the owners of the site. Cookies help us remember your preferences,
                understand how you use our Service, and improve your experience.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                2. Types of Cookies We Use.
              </h2>

              {/* Cookie Type Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#166534', marginBottom: '8px' }}>
                    Essential Cookies (Required).
                  </h3>
                  <p style={{ margin: 0, color: '#166534' }}>
                    These cookies are necessary for the website to function properly. They enable basic
                    functions like page navigation and access to secure areas. The website cannot function
                    properly without these cookies.
                  </p>
                </div>

                <div style={{
                  backgroundColor: '#fefce8',
                  border: '1px solid #fef08a',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#854d0e', marginBottom: '8px' }}>
                    Functional Cookies (Optional).
                  </h3>
                  <p style={{ margin: 0, color: '#854d0e' }}>
                    These cookies enable enhanced functionality and personalization. They may be set by us
                    or by third-party providers whose services we have added to our pages. If you do not
                    allow these cookies, some or all of these services may not function properly.
                  </p>
                </div>

                <div style={{
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e40af', marginBottom: '8px' }}>
                    Analytics Cookies (Optional).
                  </h3>
                  <p style={{ margin: 0, color: '#1e40af' }}>
                    These cookies help us understand how visitors interact with our website by collecting
                    and reporting information anonymously. This helps us improve the website and your
                    experience.
                  </p>
                </div>
              </div>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                3. Specific Cookies We Use.
              </h2>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>Cookie Name.</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>Purpose.</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>Duration.</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e5e5' }}>Type.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>asi_visitor_id.</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>Unique identifier for like tracking.</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>1 year.</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>Essential.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>asi_cookie_consent.</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>Stores your cookie preferences.</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>1 year.</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>Essential.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>asi_analytics.</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>Anonymous usage analytics.</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>30 days.</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5' }}>Analytics.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                4. Managing Your Cookie Preferences.
              </h2>
              <p style={{ marginBottom: '16px' }}>
                You can manage your cookie preferences at any time. When you first visit our website,
                you will be presented with a cookie consent banner where you can choose which types
                of cookies to accept.
              </p>
              <div style={{
                backgroundColor: '#fff7ed',
                border: '1px solid #fed7aa',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Settings size={24} style={{ color: '#ea580c' }} />
                <p style={{ margin: 0, color: '#9a3412' }}>
                  You can also control cookies through your browser settings. Most browsers allow you
                  to refuse or accept cookies, delete cookies, and set preferences for specific websites.
                </p>
              </div>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                5. Browser Cookie Settings.
              </h2>
              <p style={{ marginBottom: '12px' }}>
                Here are links to manage cookies in popular browsers:
              </p>
              <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Chrome: Settings → Privacy and Security → Cookies.</li>
                <li style={{ marginBottom: '8px' }}>Firefox: Settings → Privacy & Security → Cookies.</li>
                <li style={{ marginBottom: '8px' }}>Safari: Preferences → Privacy → Cookies.</li>
                <li style={{ marginBottom: '8px' }}>Edge: Settings → Cookies and site permissions.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                6. Third-Party Cookies.
              </h2>
              <p>
                We may use third-party services that set their own cookies. These third parties have
                their own privacy policies. We recommend reviewing their policies for more information
                about how they handle cookies and personal data.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '16px' }}>
                7. Updates to This Policy.
              </h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices
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
