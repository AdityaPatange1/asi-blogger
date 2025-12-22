import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatAgent from "@/components/ChatAgent";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASI Blogger™ | AI-Powered Blog Generation Platform",
  description: "Create professional, engaging blog content across 1000+ topics using advanced AI technology. Powered by Anthropic Claude AI®. Co-owned by Ekta Bhatia & Aditya Patange.",
  keywords: ["blog generator", "AI writing", "content creation", "Anthropic", "Claude AI", "ASI Blogger"],
  authors: [
    { name: "Ekta Bhatia" },
    { name: "Aditya Patange" },
    { name: "ASI Blogger" }
  ],
  creator: "ASI Blogger",
  publisher: "ASI Blogger",
  openGraph: {
    title: "ASI Blogger™ | AI-Powered Blog Generation Platform",
    description: "Create professional, engaging blog content across 1000+ topics using advanced AI technology. Powered by Anthropic Claude AI®.",
    type: "website",
    siteName: "ASI Blogger",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASI Blogger™ | AI-Powered Blog Generation Platform",
    description: "Create professional, engaging blog content across 1000+ topics using advanced AI technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "copyright": "© 2025 ASI Blogger™. All Rights Reserved.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        <ChatAgent />
        <CookieConsent />
      </body>
    </html>
  );
}
