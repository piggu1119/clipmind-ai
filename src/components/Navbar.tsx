"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Flame, Sparkles, User, LogOut, Settings as SettingsIcon } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { subscription, user } = useApp();

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Analyzer Workspace', href: '/analyzer' },
    { name: 'Saved Clips', href: '/saved' },
    { name: 'Pricing Plans', href: '/pricing' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-secondary p-[1px] shadow-neon-purple transition-all duration-300 group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-black">
                  <Sparkles className="h-4.5 w-4.5 text-primary-light" />
                </div>
              </div>
              <span className="text-xl font-bold bg-neon-gradient -webkit-background-clip-text text-transparent bg-clip-text">
                ClipMind <span className="text-foreground">AI</span>
              </span>
            </Link>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    isActive ? 'text-primary-light font-semibold' : 'text-zinc-400'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Status */}
          <div className="flex items-center gap-4">
            {/* Streak Widget */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold shadow-neon-pink">
              <Flame className="h-4 w-4 fill-orange-500 text-orange-500 animate-pulse" />
              <span>{subscription.streakDays} Day Streak</span>
            </div>

            {/* Plan Badge */}
            <span className={`hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
              subscription.tier === 'Free' 
                ? 'bg-zinc-800 text-zinc-400 border border-zinc-700' 
                : subscription.tier === 'Pro'
                ? 'bg-primary/20 text-primary-light border border-primary/30'
                : 'bg-secondary/20 text-secondary-light border border-secondary/30'
            }`}>
              {subscription.tier} Plan
            </span>

            {/* Upgrade CTA */}
            {subscription.tier === 'Free' && (
              <Link 
                href="/pricing"
                className="hidden lg:flex items-center gap-1 bg-gradient-to-r from-primary to-accent-pink hover:from-primary-dark hover:to-accent-pink text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-neon-purple transition-all duration-300 hover:scale-[1.02]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Go Pro ($9)
              </Link>
            )}

            {/* Settings & Profile */}
            <Link 
              href="/settings" 
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Settings & Presets"
            >
              <SettingsIcon className="h-4 w-4" />
            </Link>

            <Link
              href="/login"
              className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
              title="User Account"
            >
              <User className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
