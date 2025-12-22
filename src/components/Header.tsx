"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenLine, BookOpen, Home } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/blogs", label: "Blog Collection", icon: BookOpen },
    { href: "/create", label: "Create Blog", icon: PenLine },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(249, 115, 22, 0.3)",
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                }}
              >
                A
              </span>
            </div>
            <div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "#171717",
                }}
              >
                ASI
              </span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "#f97316",
                }}
              >
                Blogger
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                    backgroundColor: isActive ? "#fff7ed" : "transparent",
                    color: isActive ? "#ea580c" : "#525252",
                    border: isActive
                      ? "1px solid #fed7aa"
                      : "1px solid transparent",
                  }}
                >
                  <Icon size={18} />
                  <span
                    style={
                      {
                        display: "none",
                        "@media (minWidth: 768px)": { display: "inline" },
                      } as React.CSSProperties
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
