"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { getAuthClient } from '@/lib/supabase';
import { Sparkles, Mail, Lock, ArrowRight, Github } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { refreshData } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const auth = getAuthClient();

    try {
      if (isSignUp) {
        const { data, error: signUpErr } = await auth.signUp({ email, password });
        if (signUpErr) throw signUpErr;
      } else {
        const { data, error: signInErr } = await auth.signInWithPassword({ email, password });
        if (signInErr) throw signInErr;
      }
      refreshData();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20 relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] glow-bg glow-purple opacity-20" />

      <div className="w-full max-w-md glass-panel border border-white/5 rounded-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary p-[1px] mb-4">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-black">
              <Sparkles className="h-5 w-5 text-primary-light" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white">
            {isSignUp ? 'Create your ClipMind account' : 'Welcome back, Creator'}
          </h2>
          <p className="text-xs text-zinc-500 mt-2">
            Get started with 3 free analyses per day.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@clipmind.ai"
                className="w-full pl-10 pr-4 py-3 text-sm glass-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 text-sm glass-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold py-3 rounded-xl shadow-neon-purple transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-white/5" />
          <span className="relative bg-zinc-950/90 px-3 text-[10px] uppercase font-bold tracking-widest text-zinc-600">
            OR CONTINUE WITH
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            // Mock social login
            setEmail('agency@clipmind.ai');
            setPassword('password123');
            setIsSignUp(false);
          }}
          className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-3 border border-white/5 hover:border-white/10 rounded-xl transition-all"
        >
          <Github className="h-4 w-4" />
          Sign in with GitHub (Demo Autofill)
        </button>

        <p className="text-center text-xs text-zinc-500 mt-6">
          {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary-light hover:underline font-semibold"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
