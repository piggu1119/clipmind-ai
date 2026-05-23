"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Key, User, CreditCard, Sparkles, HelpCircle, Save, Check } from 'lucide-react';

export default function SettingsPage() {
  const { subscription } = useApp();
  const [profileName, setProfileName] = useState('Creator Pro');
  const [openRouterKey, setOpenRouterKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [defaultNiche, setDefaultNiche] = useState('podcast');
  const [showRouterKey, setShowRouterKey] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);

  // Load keys from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOpenRouterKey(localStorage.getItem('openrouter_api_key') || '');
      setGeminiKey(localStorage.getItem('gemini_api_key') || '');
      setDefaultNiche(localStorage.getItem('default_creator_mode') || 'podcast');
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('openrouter_api_key', openRouterKey);
      localStorage.setItem('gemini_api_key', geminiKey);
      localStorage.setItem('default_creator_mode', defaultNiche);
      
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black text-white mb-2">Creator Workspace Settings</h1>
      <p className="text-zinc-500 text-xs mb-8">
        Manage presets, API integrations, billing portals, and customized templates.
      </p>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: API Config */}
        <div className="glass-panel border border-white/5 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Key className="h-4.5 w-4.5 text-primary-light" />
            AI Key Integrations (Custom Engine)
          </h3>
          <p className="text-xs text-zinc-400">
            By default, ClipMind AI works offline in sandbox demo mode. To connect custom high-speed models, paste your keys below.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-2 flex items-center justify-between">
                <span>OpenRouter API Key (Optional)</span>
                <button 
                  type="button" 
                  onClick={() => setShowRouterKey(!showRouterKey)}
                  className="text-primary-light hover:underline text-[9px]"
                >
                  {showRouterKey ? 'Hide' : 'Reveal'}
                </button>
              </label>
              <input
                type={showRouterKey ? 'text' : 'password'}
                value={openRouterKey}
                onChange={(e) => setOpenRouterKey(e.target.value)}
                placeholder="sk-or-v1-..."
                className="w-full px-3 py-2 text-xs glass-input font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-2 flex items-center justify-between">
                <span>Gemini API Key (Optional)</span>
                <button 
                  type="button" 
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                  className="text-primary-light hover:underline text-[9px]"
                >
                  {showGeminiKey ? 'Hide' : 'Reveal'}
                </button>
              </label>
              <input
                type={showGeminiKey ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 text-xs glass-input font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Creator Presets */}
        <div className="glass-panel border border-white/5 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Sparkles className="h-4.5 w-4.5 text-secondary-light" />
            Default Creator Presets
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-2">
                Default Workspace Niche Mode
              </label>
              <select
                value={defaultNiche}
                onChange={(e) => setDefaultNiche(e.target.value)}
                className="w-full px-3 py-2 text-xs glass-input focus:bg-zinc-950"
              >
                <option value="football">Football Mode</option>
                <option value="gaming">Gaming Mode</option>
                <option value="podcast">Podcast Mode</option>
                <option value="anime">Anime Mode</option>
                <option value="motivational">Motivational Mode</option>
                <option value="streamer">Streamer Mode</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-2">
                Custom Pre-roll Branding Template
              </label>
              <input
                type="text"
                placeholder="None (Standard ClipMind template)"
                className="w-full px-3 py-2 text-xs glass-input"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Section 3: Billing Info */}
        <div className="glass-panel border border-white/5 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <CreditCard className="h-4.5 w-4.5 text-accent-pink" />
            Billing & Stripe Portal
          </h3>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-zinc-200 font-bold">
                Subscription Plan: <span className="text-primary-light capitalize">{subscription.tier}</span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">
                {subscription.tier === 'Free' 
                  ? 'Limit: 3 analyses/day. Watermark enabled.'
                  : 'Unlimited analyses active. Stripe token verified.'}
              </p>
            </div>

            <button
              type="button"
              className="text-xs font-bold bg-white/5 border border-white/5 hover:border-white/10 px-4 py-2.5 rounded-lg text-white"
              onClick={() => alert("This opens your custom Stripe Customer Billing Portal.")}
            >
              Stripe Customer Portal
            </button>
          </div>
        </div>

        {/* Form Action Submit */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-3 rounded-lg shadow-neon-purple transition-all"
          >
            {savedStatus ? (
              <>
                <Check className="h-4 w-4" />
                Settings Saved!
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
