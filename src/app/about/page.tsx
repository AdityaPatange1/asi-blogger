import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Shield,
  Sparkles,
  Music,
  Mic,
  Brain,
  Heart,
  Linkedin,
} from "lucide-react";

const collaborators = [
  {
    name: "Ekta Bhatia",
    role: "Security Engineer",
    gender: "F",
    avatar: "EB",
    linkedIn: "https://www.linkedin.com/in/bhatia-ekta",
    expertise: [
      {
        icon: Music,
        label: "Elite Dancer",
        description: "Expert in multiple dance disciplines and choreography.",
      },
      {
        icon: Mic,
        label: "Elite Rapper",
        description: "Innovative word assassin with powerful delivery.",
      },
      {
        icon: Shield,
        label: "Highest League Security Engineer",
        description:
          "Specialist in threat analysis, reconaissance,security research, and vulnerability assessment.",
      },
      {
        icon: Brain,
        label: "Para SF Meditator",
        description:
          "Advanced practitioner of mindfulness and focus techniques.",
      },
    ],
    bio: "A dynamic security engineer who seamlessly blends creative artistry with cutting-edge security expertise. Ekta's exemplary approach to problem-solving brings innovation to every project.",
  },
  {
    name: "Aditya Patange",
    role: "Security Engineer",
    gender: "M",
    avatar: "AP",
    linkedIn: "https://www.linkedin.com/in/adityapatange1/",
    expertise: [
      {
        icon: Music,
        label: "Elite Dancer",
        description: "Mastery in Tandav.",
      },
      {
        icon: Mic,
        label: "Elite Rapper",
        description: "Does both fast rap, slow rap, medium rap and poetry.",
      },
      {
        icon: Shield,
        label: "Highest League Security Engineer",
        description:
          "Expert in application security, penetration testing, and secure architecture. Also a expert in threat intelligence and threat hunting.",
      },
      {
        icon: Brain,
        label: "Para SF Meditator",
        description:
          "Advanced Buddhist Meditation Practitioner with special forces-level mental discipline with Shiva Yogi sense of calmness and peace.",
      },
    ],
    bio: "A multifaceted security professional combining technical excellence with artistic expression. Aditya brings a unique perspective to cybersecurity through his diverse skill set spanning the arts and technology.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#171717", color: "#ffffff" }}>
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#a3a3a3",
              marginBottom: "32px",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <div
            style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(249, 115, 22, 0.2)",
                color: "#fb923c",
                padding: "8px 16px",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: 500,
                marginBottom: "24px",
              }}
            >
              <Users size={16} />
              <span>Meet the Team</span>
            </div>

            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              About <span style={{ color: "#f97316" }}>ASI Blogger</span>&trade;
            </h1>

            <p
              style={{
                fontSize: "1.125rem",
                color: "#a3a3a3",
                lineHeight: 1.8,
              }}
            >
              ASI Blogger&trade; is co-owned by Ekta Bhatia & Aditya Patange,
              bringing together elite talent in security engineering, artistic
              expression, and mindful innovation. Our platform represents the
              convergence of technical excellence and creative vision. Our
              mission is to democratize content creation through cutting-edge AI
              technology while maintaining the highest standards of security,
              privacy, and user experience. We believe in empowering creators
              with tools that are both powerful and accessible.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}
        >
          <div
            style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
          >
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#171717",
                marginBottom: "16px",
              }}
            >
              Our Mission
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#525252",
                lineHeight: 1.8,
              }}
            >
              To democratize content creation through cutting-edge AI technology
              while maintaining the highest standards of security, privacy, and
              user experience. We believe in empowering creators with tools that
              are both powerful and accessible. We aim to create a platform that
              is not only secure and private but also easy to use and navigate.
              Our focus is on uplifting people's creativity and giving them a
              platform to express themselves.
            </p>
          </div>
        </div>
      </div>

      {/* Collaborators Section */}
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#171717",
              marginBottom: "8px",
            }}
          >
            The Co-Owners
          </h2>
          <p style={{ color: "#525252" }}>
            Security Engineers | Artists | Innovators | Mindful Inventors
          </p>
          <p style={{ color: "#525252" }}>
            We simplify aspects of Life via Zen Principles and Yogic Science.
            Powered by The Tripe OG Sadhguru, Shinzen Young and Bhante
            Gunaratana we lead a team of enlightened people who are dedicated to
            enhancing both, the financial and wellbeing aspects of Life.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "32px",
          }}
        >
          {collaborators.map((person) => (
            <div
              key={person.name}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "24px",
                border: "1px solid #e5e5e5",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              {/* Profile Header */}
              <div
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  padding: "32px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#ea580c",
                  }}
                >
                  {person.avatar}
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  {person.name}
                </h3>
                <p style={{ color: "#fed7aa", marginTop: "4px" }}>
                  {person.role} ({person.gender})
                </p>
              </div>

              {/* Content */}
              <div style={{ padding: "24px" }}>
                {/* Bio */}
                <p
                  style={{
                    color: "#525252",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  {person.bio}
                </p>

                {/* Expertise */}
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#171717",
                    marginBottom: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Areas of Excellence
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {person.expertise.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.label}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          padding: "12px",
                          backgroundColor: "#fafafa",
                          borderRadius: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            backgroundColor: "#fff7ed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={20} style={{ color: "#ea580c" }} />
                        </div>
                        <div>
                          <p
                            style={{
                              fontWeight: 600,
                              color: "#171717",
                              margin: 0,
                              fontSize: "14px",
                            }}
                          >
                            {skill.label}
                          </p>
                          <p
                            style={{
                              color: "#737373",
                              margin: 0,
                              fontSize: "13px",
                              marginTop: "2px",
                            }}
                          >
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* LinkedIn Link */}
                <div style={{ marginTop: "24px", textAlign: "center" }}>
                  <a
                    href={person.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      backgroundColor: "#0a66c2",
                      color: "#ffffff",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 500,
                      fontSize: "14px",
                      transition: "background-color 0.2s",
                    }}
                  >
                    <Linkedin size={18} />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div style={{ backgroundColor: "#171717", color: "#ffffff" }}>
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}
        >
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              Our Core Values
            </h2>
            <p style={{ color: "#a3a3a3" }}>
              The principles that guide everything we do.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                icon: Shield,
                title: "Security First",
                description:
                  "Military-grade security practices in every line of code.",
              },
              {
                icon: Sparkles,
                title: "Innovation",
                description:
                  "Pushing boundaries with cutting-edge AI technology.",
              },
              {
                icon: Heart,
                title: "User-Centric",
                description:
                  "Designing with empathy and user experience at the core.",
              },
              {
                icon: Brain,
                title: "Mindful Development",
                description:
                  "Thoughtful, intentional approach to building technology.",
              },
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  style={{
                    backgroundColor: "#262626",
                    borderRadius: "16px",
                    padding: "24px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(249, 115, 22, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <Icon size={24} style={{ color: "#f97316" }} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      marginBottom: "8px",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p style={{ color: "#a3a3a3", fontSize: "14px", margin: 0 }}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ backgroundColor: "#ffffff" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "48px 24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#171717",
              marginBottom: "16px",
            }}
          >
            Ready to Create Amazing Content?
          </h2>
          <p style={{ color: "#525252", marginBottom: "24px" }}>
            Join thousands of users who trust ASI Blogger&trade; for their
            content needs.
          </p>
          <Link
            href="/create"
            className="btn-primary"
            style={{ fontSize: "1rem", padding: "14px 28px" }}
          >
            <Sparkles size={18} />
            Start Creating Now
          </Link>
        </div>
      </div>

      {/* Copyright Footer */}
      <div
        style={{
          backgroundColor: "#fafafa",
          borderTop: "1px solid #e5e5e5",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#737373", fontSize: "14px", margin: 0 }}>
          &copy; 2025 ASI Blogger&trade;. All Rights Reserved.
        </p>
        <p style={{ color: "#a3a3a3", fontSize: "12px", marginTop: "8px" }}>
          Co-owned by Ekta Bhatia & Aditya Patange.
        </p>
      </div>
    </div>
  );
}
