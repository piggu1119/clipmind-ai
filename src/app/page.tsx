"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Trophy, 
  Tv2, 
  Mic2, 
  Eye, 
  Clock, 
  Flame, 
  Volume2, 
  Copy, 
  HelpCircle, 
  Plus, 
  Minus 
} from 'lucide-react';
import { CREATOR_MODES, PRICING_PLANS, FAQS } from '@/lib/constants';

export default function LandingPage() {
  const [activeDemoMode, setActiveDemoMode] = useState('football');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedMode = CREATOR_MODES.find(m => m.id === activeDemoMode) || CREATOR_MODES[0];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-between overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Glow badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs text-primary-light font-semibold animate-pulse mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Announcing ClipMind v2.0 - Gaming & Sports Presets Live</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl leading-tight">
          Turn Long Videos Into <span className="bg-neon-gradient -webkit-background-clip-text text-transparent bg-clip-text">Viral Shorts</span> Using AI
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Find viral moments, generate high-retention hooks, and get exact frame-by-frame editing blueprints in seconds.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/analyzer"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-bold px-8 py-4 rounded-xl shadow-neon-purple transition-all duration-300 hover:scale-105"
          >
            Start Analyzing Free
            <ArrowRight className="h-4.5 w-4.5" />
          </Link>
          <a
            href="#demo"
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
          >
            <Play className="h-4 w-4 fill-white" />
            Watch Demo
          </a>
        </div>

        {/* Social Proof Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-white/5 py-8 w-full max-w-4xl text-center">
          <div>
            <div className="text-3xl font-black text-white">4.8M+</div>
            <div className="text-xs text-zinc-500 font-semibold uppercase mt-1">Clips Generated</div>
          </div>
          <div>
            <div className="text-3xl font-black text-primary-light">72%</div>
            <div className="text-xs text-zinc-500 font-semibold uppercase mt-1">Retention Boost</div>
          </div>
          <div>
            <div className="text-3xl font-black text-secondary-light">10x</div>
            <div className="text-xs text-zinc-500 font-semibold uppercase mt-1">Faster Editing</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">12,500+</div>
            <div className="text-xs text-zinc-500 font-semibold uppercase mt-1">Active Creators</div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTERACTIVE DEMO */}
      <section id="demo" className="w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            See the Blueprint in Action
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl">
            Toggle your creator niche below to see what ClipMind AI suggests for high retention.
          </p>
        </div>

        {/* Mode Toggles */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 w-full max-w-3xl">
          {CREATOR_MODES.map((mode) => {
            const Icon = mode.icon;
            const isActive = mode.id === activeDemoMode;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveDemoMode(mode.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-zinc-800 text-white border-primary/50 shadow-neon-purple scale-105'
                    : 'bg-zinc-900/60 text-zinc-400 border-white/5 hover:border-white/10 hover:text-zinc-200'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-primary-light' : 'text-zinc-400'}`} />
                {mode.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Demo Workspace Mockup */}
        <div className="w-full max-w-4xl glass-panel rounded-2xl p-6 md:p-8 border border-white/10 shadow-glass flex flex-col md:grid md:grid-cols-5 gap-8">
          
          {/* Subtitle / Preview Pane */}
          <div className="col-span-2 flex flex-col justify-between bg-zinc-950/80 rounded-xl p-5 border border-white/5 min-h-[300px]">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                <span className="font-mono">PREVIEW PANEL</span>
                <span className="flex items-center gap-1 text-primary-light uppercase font-bold">
                  <Flame className="h-3.5 w-3.5" />
                  Viral Score: 94/100
                </span>
              </div>
              <div className="aspect-[9/16] max-w-[180px] mx-auto rounded-lg bg-zinc-900 border border-white/10 relative flex flex-col justify-end p-4 shadow-2xl overflow-hidden group">
                {/* Mock Video Graphic */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 flex items-center justify-center">
                  <Play className="h-10 w-10 text-white/55 group-hover:scale-110 transition-transform cursor-pointer" />
                </div>
                {/* Styled Subtitle preview based on mode */}
                <div className="relative text-center z-10 w-full mb-6">
                  <p className={`text-base font-black ${selectedMode.subtitleStyle.color} ${selectedMode.subtitleStyle.case} tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,1)] uppercase animate-pulse`}>
                    {selectedMode.subtitleStyle.example}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-zinc-500">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 26s duration</span>
              <span className="capitalize">{selectedMode.id} Presets loaded</span>
            </div>
          </div>

          {/* AI Outputs Blueprint Pane */}
          <div className="col-span-3 space-y-6">
            {/* Hooks */}
            <div>
              <h4 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-2">High Retention Hooks</h4>
              <div className="space-y-2">
                {selectedMode.hooks.map((hook, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm text-zinc-200">
                    <span className="line-clamp-1">"{hook}"</span>
                    <button className="text-zinc-500 hover:text-white" title="Copy to clipboard">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Editing Timeline Cues */}
            <div>
              <h4 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-2">Editing Blueprint Suggestions</h4>
              <div className="space-y-2.5">
                {selectedMode.edits.map((edit, i) => (
                  <div key={i} className="flex gap-3 bg-zinc-900/60 border border-white/5 rounded-lg p-3 text-xs leading-relaxed">
                    <span className="font-mono text-secondary-light font-bold">{edit.time}</span>
                    <div>
                      <span className="font-bold text-zinc-300 block">{edit.action}</span>
                      <span className="text-zinc-500 mt-0.5 block">{edit.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Suggestions */}
            <div>
              <h4 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-2">Meme Sound FX suggestions</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMode.sounds.map((sound, i) => (
                  <span key={i} className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 text-primary-light text-xs font-medium px-2.5 py-1 rounded-full">
                    <Volume2 className="h-3.5 w-3.5" />
                    {sound}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section className="w-full bg-zinc-950/60 border-t border-b border-white/5 py-20 flex flex-col items-center">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white">How ClipMind AI Works</h2>
            <p className="mt-3 text-zinc-400 max-w-md mx-auto">Get ready-to-render shorts plans in three easy steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative group p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary-light text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-lg font-bold text-zinc-200">Paste Link or Dialogue</h3>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                Paste your long YouTube link, audio transcripts, or raw script dialogue directly into the workspace.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative group p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20 text-secondary-light text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-lg font-bold text-zinc-200">AI Analyzes & Generates</h3>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                Our content engine extracts viral moments, rates hook values, structures zoom timing, and aligns templates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative group p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-pink/20 text-accent-pink text-xl font-bold mb-6 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-lg font-bold text-zinc-200">Export & Assemble</h3>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                Export text outlines, open your favorite video editor, and render high-retention shorts in record time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — CREATOR TESTIMONIALS */}
      <section className="w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-white mb-12">Loved by 12,000+ Clippers & Editors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          <div className="p-6 rounded-xl bg-zinc-900/60 border border-white/5 text-left">
            <p className="text-zinc-300 italic text-sm leading-relaxed">
              "ClipMind AI completely changed my football clipping channel. I went from spending 4 hours finding moments to posting 3 shorts a day. Hits 100K views easily now."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs">RM</div>
              <div>
                <h4 className="text-xs font-bold text-white">Ronaldo_Edits_99</h4>
                <p className="text-[10px] text-zinc-500">TikTok Editor (450K followers)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/60 border border-white/5 text-left">
            <p className="text-zinc-300 italic text-sm leading-relaxed">
              "The anime presets tell me exactly where to add speed-warps and swoosh sound effects. My average watch time went from 45% to 82% in two weeks."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center font-bold text-xs">AE</div>
              <div>
                <h4 className="text-xs font-bold text-white">Anime_Clutch_Clips</h4>
                <p className="text-[10px] text-zinc-500">Shorts Creator (1.2M Subscriber)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/60 border border-white/5 text-left">
            <p className="text-zinc-300 italic text-sm leading-relaxed">
              "Our podcast clipping agency now manages 15 client accounts with just 2 editors. The bulk export scripts fit straight into our editing workflows."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs">SC</div>
              <div>
                <h4 className="text-xs font-bold text-white">SocialScale Agency</h4>
                <p className="text-[10px] text-zinc-500">Clipping Agency Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — PRICING */}
      <section className="w-full bg-zinc-950/60 border-t border-white/5 py-20 flex flex-col items-center">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Pricing Plans Built For Scale</h2>
            <p className="mt-3 text-zinc-400 max-w-sm mx-auto">Maximize your reach. Cancel or upgrade anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
            {PRICING_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`relative flex flex-col justify-between p-8 rounded-2xl border bg-zinc-900/80 ${
                  plan.popular ? 'border-primary shadow-neon-purple md:scale-105 z-10' : 'border-white/5'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-neon-purple">
                    MOST POPULAR
                  </span>
                )}
                
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-zinc-500 text-sm">/{plan.period}</span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500 leading-normal">{plan.description}</p>
                  
                  <ul className="mt-6 space-y-3.5 text-xs text-zinc-300">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-secondary-light flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href={plan.id === 'free' ? '/analyzer' : '/pricing'}
                    className={`block text-center text-xs font-bold w-full py-3 rounded-lg transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary to-accent-pink text-white hover:opacity-90 shadow-neon-pink' 
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/5 hover:border-white/10'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — FAQ */}
      <section className="w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-white mb-10 text-center">Frequently Asked Questions</h2>
        <div className="w-full space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="border border-white/5 rounded-xl bg-zinc-900/60 overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-zinc-200 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary-light" />
                    {faq.question}
                  </span>
                  {isOpen ? <Minus className="h-4 w-4 text-zinc-500" /> : <Plus className="h-4 w-4 text-zinc-500" />}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 border-t border-white/5 text-xs text-zinc-400 leading-relaxed bg-zinc-950/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full border-t border-white/5 bg-gradient-to-t from-zinc-950 to-black py-20 text-center flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Go Viral?</h2>
        <p className="mt-3 text-zinc-500 text-sm max-w-sm">No credit card required. Get 3 free analyses immediately.</p>
        <Link
          href="/analyzer"
          className="mt-8 flex items-center gap-2 bg-neon-gradient text-white font-bold px-8 py-4 rounded-xl shadow-neon-cyan hover:opacity-90 transition-all duration-300 hover:scale-105"
        >
          Get Started Free
          <ArrowRight className="h-4.5 w-4.5" />
        </Link>
      </section>
    </div>
  );
}
