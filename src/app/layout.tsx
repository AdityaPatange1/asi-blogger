import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatAgent from "@/components/ChatAgent";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASI Blogger | AI-Powered Blog Generation Platform",
  description: "Create professional, engaging blog content across 1000+ topics using advanced AI technology. Powered by Anthropic Claude.",
  keywords: ["blog generator", "AI writing", "content creation", "Anthropic", "Claude AI"],
  authors: [{ name: "ASI Blogger" }],
  openGraph: {
    title: "ASI Blogger | AI-Powered Blog Generation Platform",
    description: "Create professional, engaging blog content across 1000+ topics using advanced AI technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ChatAgent />
      </body>
    </html>
  );
}
