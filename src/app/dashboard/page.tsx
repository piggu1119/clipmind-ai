"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { getSavedClips } from '@/lib/dbMock';
import { TRENDING_SOUNDS, DAILY_VIRAL_TIPS } from '@/lib/constants';
import { 
  Flame, 
  Sparkles, 
  TrendingUp, 
  Volume2, 
  Compass, 
  FolderHeart,
  Grid, 
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function DashboardPage() {
  const { subscription, savedClips, refreshData } = useApp();
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    refreshData();
    // Select a random viral tip
    const randomIndex = Math.floor(Math.random() * DAILY_VIRAL_TIPS.length);
    setCurrentTip(DAILY_VIRAL_TIPS[randomIndex] || DAILY_VIRAL_TIPS[0]);
  }, []);

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Streaks */}
        <div className="glass-panel border border-white/5 rounded-2xl p-6 bg-gradient-to-br from-zinc-900/60 to-orange-950/20 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-4 right-4 h-16 w-16 glow-bg glow-pink opacity-20" />
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-500 fill-orange-500 animate-pulse" />
            <h3 className="text-sm font-bold text-zinc-300">Creator Streak Active</h3>
          </div>
          <div className="my-4">
            <span className="text-4xl font-black text-white">{subscription.streakDays} Days</span>
            <p className="text-[10px] text-zinc-500 mt-1 font-semibold">Keep analyzing clips daily to double your Pro multiplier!</p>
          </div>
          <div className="w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-accent-pink h-full" style={{ width: `${Math.min(100, (subscription.streakDays / 10) * 100)}%` }} />
          </div>
        </div>

        {/* Card 2: Analyses Left */}
        <div className="glass-panel border border-white/5 rounded-2xl p-6 bg-gradient-to-br from-zinc-900/60 to-purple-950/20 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-4 right-4 h-16 w-16 glow-bg glow-purple opacity-20" />
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary-light" />
            <h3 className="text-sm font-bold text-zinc-300">Daily Free Credits</h3>
          </div>
          <div className="my-3">
            <span className="text-3xl font-black text-white">
              {subscription.tier === 'Free' ? `${subscription.analysesLeftToday}/3` : 'UNLIMITED'}
            </span>
            <p className="text-[10px] text-zinc-500 mt-1 font-semibold">Resets every 24 hours.</p>
          </div>
          {subscription.tier === 'Free' ? (
            <Link 
              href="/pricing"
              className="text-[10px] font-bold text-primary-light hover:underline flex items-center gap-1"
            >
              Get Unlimited analyses for $9/mo
              <ArrowRight className="h-3 w-3" />
            </Link>
          ) : (
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Pro Creator Tier Active</span>
          )}
        </div>

        {/* Card 3: Saved clips count */}
        <div className="glass-panel border border-white/5 rounded-2xl p-6 bg-gradient-to-br from-zinc-900/60 to-cyan-950/20 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-4 right-4 h-16 w-16 glow-bg glow-cyan opacity-20" />
          <div className="flex items-center gap-2">
            <FolderHeart className="h-5 w-5 text-secondary-light" />
            <h3 className="text-sm font-bold text-zinc-300">Saved Blueprints</h3>
          </div>
          <div className="my-3">
            <span className="text-4xl font-black text-white">{savedClips.length}</span>
            <p className="text-[10px] text-zinc-500 mt-1 font-semibold">Ready-to-use video scripts.</p>
          </div>
          <Link 
            href="/saved"
            className="text-[10px] font-bold text-secondary-light hover:underline flex items-center gap-1"
          >
            Open Saved Workspace
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Tips + Sounds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left/Middle Column (span-2) */}
        <div className="md:col-span-2 space-y-6">
          {/* Daily Retention Tip */}
          <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/40 relative">
            <h4 className="text-xs font-black text-secondary-light uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Compass className="h-4 w-4" />
              Daily Retention Blueprint Rule
            </h4>
            <p className="text-sm text-zinc-200 leading-relaxed font-medium">
              "{currentTip}"
            </p>
          </div>

          {/* Previous History list */}
          <div className="glass-panel border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Grid className="h-4.5 w-4.5 text-primary-light" />
                Recent Workspace Runs
              </h3>
              <Link href="/analyzer" className="text-xs font-semibold text-primary-light hover:underline">
                Analyze New Video
              </Link>
            </div>

            {savedClips.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs text-zinc-500">No previous runs. Try entering a URL in the Clip Analyzer page.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {savedClips.slice(0, 4).map((clip) => (
                  <div key={clip.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <h4 className="font-bold text-zinc-200 line-clamp-1">{clip.title}</h4>
                      <span className="text-[10px] text-zinc-500 mt-0.5 block">{clip.mode} Preset loaded • {new Date(clip.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Link
                      href="/saved"
                      className="text-[11px] font-bold text-primary-light hover:underline flex-shrink-0"
                    >
                      View Outline
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Revenue Marketplace / Creator Store */}
          <div className="glass-panel border border-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Sparkles className="h-4.5 w-4.5 text-accent-pink" />
              Creator Preset Packs & Affiliate Tools (Revenue)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="#" 
                className="p-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-white/10 group flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-zinc-200 flex justify-between items-center">
                    <span>Gaming Zoom Preset Pack</span>
                    <span className="text-[9px] bg-primary/20 text-primary-light px-2 py-0.5 rounded font-black">$4.99</span>
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-1 leading-normal">
                    Preloaded zoom settings and Premiere overlays.
                  </p>
                </div>
                <span className="text-[9px] font-black text-primary-light uppercase mt-4 flex items-center gap-1 group-hover:underline">
                  Browse Store <ExternalLink className="h-2.5 w-2.5" />
                </span>
              </a>

              <a 
                href="#" 
                className="p-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-white/10 group flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-zinc-200 flex justify-between items-center">
                    <span>Hostinger Creator Hosting</span>
                    <span className="text-[9px] text-secondary-light font-black">Affiliate Link</span>
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-1 leading-normal">
                    Get 75% off standard WordPress hosting using code 'CLIPMIND'.
                  </p>
                </div>
                <span className="text-[9px] font-black text-secondary-light uppercase mt-4 flex items-center gap-1 group-hover:underline">
                  Visit Partner <ExternalLink className="h-2.5 w-2.5" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (span-1): Trends & Sound Alert Feed */}
        <div className="md:col-span-1 space-y-6">
          
          {/* Trending sound alert */}
          <div className="glass-panel border border-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Volume2 className="h-4.5 w-4.5 text-primary-light" />
              TikTok Trending Sounds
            </h3>
            
            <div className="space-y-4">
              {TRENDING_SOUNDS.map((sound, i) => (
                <div key={i} className="text-xs flex items-center justify-between gap-3 bg-zinc-900/40 p-2.5 rounded-lg border border-white/5">
                  <div>
                    <span className="font-bold text-zinc-200 block">{sound.name}</span>
                    <span className="text-[10px] text-zinc-500 mt-0.5 block">{sound.count}</span>
                  </div>
                  <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded badge-neon">
                    {sound.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Referral promo Widget */}
          <div className="glass-panel border border-white/5 rounded-2xl p-6 bg-gradient-to-br from-zinc-900 to-indigo-950/20 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary" />
              Invite Friends & Get Pro
            </h4>
            <p className="text-[10px] text-zinc-400 leading-normal">
              Share your referral code and get 7 days of Pro plan credits for each active user that signs up!
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value="clipmind.ai/ref=creator1"
                className="w-full px-2 py-1.5 text-[10px] glass-input text-center select-all font-mono"
              />
              <button 
                onClick={() => alert("Copied referral link!")}
                className="px-2.5 py-1.5 bg-primary hover:bg-primary-dark text-white text-[10px] font-bold rounded-lg"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
