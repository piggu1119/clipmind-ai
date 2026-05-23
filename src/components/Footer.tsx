import React from 'react';
import Link from 'next/link';
import { Sparkles, Github, Twitter, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/80 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Column */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold bg-neon-gradient -webkit-background-clip-text text-transparent bg-clip-text">
                ClipMind AI
              </span>
            </Link>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              Find viral moments faster, generate high-retention titles, and construct viral scripts in seconds.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-zinc-200 text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/analyzer" className="hover:text-primary-light transition-colors">Clip Analyzer</Link></li>
              <li><Link href="/pricing" className="hover:text-primary-light transition-colors">Pricing Tiers</Link></li>
              <li><Link href="/saved" className="hover:text-primary-light transition-colors">Saved Scripts</Link></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Creator Presets</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-zinc-200 text-sm font-semibold mb-4">Community</h4>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-500 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
            <p className="text-zinc-600 text-xs mt-4">
              Designed for professional video clippers and content agencies.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} ClipMind AI. All rights reserved. Not affiliated with TikTok or ByteDance.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
