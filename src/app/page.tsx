import Link from 'next/link';
import {
  PenLine,
  Sparkles,
  BookOpen,
  Zap,
  Brain,
  Globe,
  Shield,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Generation',
    description: 'Advanced Claude AI creates professional, engaging content tailored to your specifications.',
  },
  {
    icon: Globe,
    title: '1000+ Topics',
    description: 'Choose from over 1000 topics spanning science, technology, arts, business, and more.',
  },
  {
    icon: Zap,
    title: 'Instant Creation',
    description: 'Generate comprehensive blog posts in seconds, not hours. Save time and boost productivity.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Every blog is crafted with proper structure, citations, and engaging narratives.',
  },
  {
    icon: MessageCircle,
    title: 'Interactive Chat',
    description: 'Ask questions about any blog in our collection using the AI-powered chat assistant.',
  },
  {
    icon: Users,
    title: 'Community Engagement',
    description: 'Like, comment, and interact with blogs without the need for account creation.',
  },
];

const stats = [
  { value: '1014+', label: 'Topics Available' },
  { value: '50+', label: 'Categories' },
  { value: 'Instant', label: 'Generation' },
  { value: 'Free', label: 'To Use' },
];

const categories = [
  'Artificial Intelligence',
  'Physics',
  'Chemistry',
  'Biology',
  'Medicine',
  'Computer Science',
  'Cybersecurity',
  'Data Science',
  'Mathematics',
  'Astronomy',
  'Environmental Science',
  'Economics',
];

export default function Home() {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom right, #fff7ed, #ffffff, #fafafa)'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(249, 115, 22, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            {/* Badge */}
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
              marginBottom: '24px',
              border: '1px solid #fed7aa'
            }}>
              <Sparkles size={16} />
              <span>Powered by Anthropic Claude AI</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 700,
              color: '#171717',
              marginBottom: '24px',
              lineHeight: 1.1
            }}>
              Generate Professional Blogs
              <span className="gradient-text" style={{ display: 'block' }}>In Seconds, Not Hours</span>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: '1.25rem',
              color: '#525252',
              marginBottom: '32px',
              maxWidth: '640px',
              margin: '0 auto 32px'
            }}>
              Create high-quality, engaging blog content across 1000+ topics using advanced AI technology.
              Simply describe your idea and let our AI do the rest.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <Link href="/create" className="btn-primary" style={{ fontSize: '1.125rem', padding: '16px 32px' }}>
                <PenLine size={20} />
                Create Your Blog
              </Link>
              <Link href="/blogs" className="btn-outline" style={{ fontSize: '1.125rem', padding: '16px 32px' }}>
                <BookOpen size={20} />
                Browse Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '64px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '32px'
          }}>
            {stats.map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f97316', marginBottom: '8px' }}>
                  {stat.value}
                </div>
                <div style={{ color: '#525252' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#171717', marginBottom: '16px' }}>
              Everything You Need to Create
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#525252', maxWidth: '640px', margin: '0 auto' }}>
              Our platform combines cutting-edge AI technology with intuitive design to deliver
              the best blog generation experience.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #e5e5e5',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: '#fff7ed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <Icon size={24} style={{ color: '#ea580c' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '8px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#525252' }}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#171717', marginBottom: '16px' }}>
              How It Works
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#525252', maxWidth: '640px', margin: '0 auto' }}>
              Create your professional blog in three simple steps
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                step: '01',
                title: 'Describe Your Blog',
                description: 'Enter your name, email, and describe what you want to write about. Select from 1000+ topics.',
                icon: FileText,
              },
              {
                step: '02',
                title: 'AI Generates Content',
                description: 'Our advanced Claude AI creates a comprehensive, well-structured blog post based on your description.',
                icon: Sparkles,
              },
              {
                step: '03',
                title: 'Share & Engage',
                description: 'Your blog is published to the collection. Others can read, like, and comment on your content.',
                icon: TrendingUp,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '-16px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#f97316',
                    color: '#ffffff',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.125rem',
                    zIndex: 10
                  }}>
                    {item.step}
                  </div>
                  <div style={{
                    backgroundColor: '#fafafa',
                    borderRadius: '16px',
                    padding: '48px 32px 32px',
                    height: '100%',
                    border: '1px solid #e5e5e5'
                  }}>
                    <Icon size={32} style={{ color: '#f97316', marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#171717', marginBottom: '8px' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#525252' }}>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section style={{ padding: '80px 24px', backgroundColor: '#171717', color: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '16px' }}>
              Explore 1000+ Topics
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#a3a3a3', maxWidth: '640px', margin: '0 auto' }}>
              From cutting-edge technology to timeless philosophy, we cover it all
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px'
          }}>
            {categories.map((category) => (
              <span
                key={category}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#262626',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  color: '#d4d4d4',
                  transition: 'all 0.2s ease'
                }}
              >
                {category}
              </span>
            ))}
            <span style={{
              padding: '8px 16px',
              backgroundColor: '#f97316',
              borderRadius: '9999px',
              fontSize: '14px',
              color: '#ffffff',
              fontWeight: 500
            }}>
              +40 more categories
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              href="/create"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#fb923c',
                fontWeight: 500,
                fontSize: '1.125rem',
                transition: 'color 0.2s ease'
              }}
            >
              Start Creating Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#171717', marginBottom: '24px' }}>
                Why Choose ASI Blogger?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Enterprise-grade AI technology from Anthropic',
                  'No account required for commenting and liking',
                  'Instant blog generation with professional formatting',
                  'AI chat assistant to explore blog content',
                  'Advanced search and filtering capabilities',
                  'Completely free to use',
                ].map((benefit) => (
                  <div key={benefit} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <CheckCircle2 size={24} style={{ color: '#f97316', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: '#404040', fontSize: '1.125rem' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              borderRadius: '24px',
              padding: '32px',
              color: '#ffffff'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Ready to Create?</h3>
              <p style={{ color: '#fed7aa', marginBottom: '24px' }}>
                Join thousands of users who are already creating amazing content with ASI Blogger.
                No sign-up required. Start writing in seconds.
              </p>
              <Link href="/create" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#ffffff',
                color: '#ea580c',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}>
                <PenLine size={20} />
                Create Your First Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#171717', marginBottom: '16px' }}>
            Start Creating Amazing Content Today
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#525252', marginBottom: '32px' }}>
            No credit card required. No sign-up needed. Just start creating.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <Link href="/create" className="btn-primary" style={{ fontSize: '1.125rem', padding: '16px 32px' }}>
              <Sparkles size={20} />
              Generate Your Blog
            </Link>
            <Link href="/blogs" className="btn-secondary" style={{ fontSize: '1.125rem', padding: '16px 32px' }}>
              <BookOpen size={20} />
              Explore Blogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
