"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PRICING_PLANS } from '@/lib/constants';
import { CheckCircle2, Sparkles, AlertCircle, CreditCard, ShieldCheck } from 'lucide-react';

export default function PricingPage() {
  const { subscription, upgradeTier } = useApp();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpenCheckout = (plan: any) => {
    if (plan.id === 'free') {
      upgradeTier('Free');
      return;
    }
    setSelectedPlan(plan);
    setShowCheckoutModal(true);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate Stripe payment processing
    setTimeout(() => {
      upgradeTier(selectedPlan.id === 'pro' ? 'Pro' : 'Agency');
      setIsProcessing(false);
      setShowCheckoutModal(false);
      setSelectedPlan(null);
    }, 2000);
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1 bg-secondary/15 text-secondary-light text-xs font-semibold px-3 py-1 rounded-full border border-secondary/20 mb-4 animate-pulse">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Unlock Ultimate Retention Tools</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          Flexible Plans for <span className="bg-neon-gradient -webkit-background-clip-text text-transparent bg-clip-text">Every Niche</span>
        </h1>
        <p className="mt-4 text-zinc-400 text-base max-w-md mx-auto">
          Start for free, scale to agency workflows when you need volume.
        </p>

        {/* Monthly/Yearly Toggle */}
        <div className="mt-8 inline-flex items-center gap-2 bg-zinc-900 border border-white/5 p-1 rounded-xl">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              billingPeriod === 'monthly' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`relative px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              billingPeriod === 'yearly' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Yearly Billing
            <span className="absolute -top-3 -right-2 bg-gradient-to-r from-accent-pink to-primary text-white text-[9px] font-black px-1.5 py-0.5 rounded-full scale-90">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isCurrent = subscription.tier.toLowerCase() === plan.id;
          const planPriceNumeric = plan.price === '$0' ? 0 : parseInt(plan.price.replace('$', ''));
          const finalPrice = billingPeriod === 'yearly' 
            ? `$${Math.floor(planPriceNumeric * 0.8)}` 
            : plan.price;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-8 rounded-2xl border bg-zinc-900/40 backdrop-blur-md ${
                plan.popular 
                  ? 'border-primary shadow-neon-purple md:scale-105 z-10' 
                  : 'border-white/5'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-neon-purple">
                  RECOMMENDED
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {plan.name}
                  {isCurrent && (
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] uppercase font-black px-2 py-0.5 rounded">
                      Current
                    </span>
                  )}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{finalPrice}</span>
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
                <button
                  onClick={() => handleOpenCheckout(plan)}
                  disabled={isCurrent && plan.id === 'free'}
                  className={`block text-center text-xs font-bold w-full py-3 rounded-lg transition-all duration-300 ${
                    isCurrent
                      ? 'bg-zinc-800 border border-zinc-700 text-zinc-400 cursor-default'
                      : plan.popular
                      ? 'bg-gradient-to-r from-primary to-accent-pink text-white hover:opacity-90 shadow-neon-pink'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/5 hover:border-white/10'
                  }`}
                >
                  {isCurrent ? 'Active Plan' : plan.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stripe checkout simulation modal */}
      {showCheckoutModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary-light" />
              Secure Checkout via Stripe
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              You are subscribing to <span className="font-bold text-white">{selectedPlan.name}</span> ({billingPeriod === 'monthly' ? 'Monthly' : 'Yearly'}).
            </p>

            <form onSubmit={handleCheckoutSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Cardholder Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-3 py-2 text-xs glass-input"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Card Details</label>
                <input
                  type="text"
                  required
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs glass-input font-mono"
                />
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 text-xs glass-input font-mono text-center"
                  />
                  <input
                    type="password"
                    required
                    placeholder="CVC"
                    maxLength={4}
                    className="w-full px-3 py-2 text-xs glass-input font-mono text-center"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-900 text-[10px] text-zinc-500">
                <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>256-bit SSL encryption. This is a sandbox testing environment, no actual funds will be charged.</span>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => {
                    setShowCheckoutModal(false);
                    setSelectedPlan(null);
                  }}
                  className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2 text-xs bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-neon-purple disabled:opacity-50"
                >
                  {isProcessing ? 'Authorizing...' : 'Pay & Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
