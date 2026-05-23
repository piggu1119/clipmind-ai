import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ClipMind AI - Viral Video Clip Blueprint Assistant',
  description: 'Turn long videos into highly engaging viral shorts. Find emotional moments, generate custom subtitle designs, hooks, and editing outlines in seconds.',
  metadataBase: new URL('https://clipmind.ai'),
  openGraph: {
    title: 'ClipMind AI',
    description: 'AI-powered viral clip assistant for TikTok, Shorts, and Reels.',
    images: '/og-image.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-zinc-100 min-h-screen flex flex-col relative">
        <AppProvider>
          {/* Neon Background Glows */}
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] glow-bg glow-purple" />
          <div className="absolute top-1/3 right-1/4 h-[600px] w-[600px] glow-bg glow-cyan" />
          <div className="absolute bottom-10 left-10 h-[400px] w-[400px] glow-bg glow-pink" />

          {/* Main Layout */}
          <Navbar />
          <main className="flex-1 w-full relative z-10 flex flex-col">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
