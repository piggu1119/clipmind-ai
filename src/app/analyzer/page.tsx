"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { CREATOR_MODES } from '@/lib/constants';
import { saveClip, getSavedClips } from '@/lib/dbMock';
import { callLLMAnalysis, AnalysisResult } from '@/lib/aiHelper';
import { 
  Sparkles, 
  Search, 
  Clock, 
  Flame, 
  Volume2, 
  Copy, 
  FileDown, 
  Play, 
  Heart,
  CheckCircle,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function AnalyzerPage() {
  const { subscription, refreshData } = useApp();
  const [videoUrl, setVideoUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [activeMode, setActiveMode] = useState('football');
  
  // States for analysis run
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedMomentIdx, setSelectedMomentIdx] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const selectedNiche = CREATOR_MODES.find(m => m.id === activeMode) || CREATOR_MODES[0];

  const loadingSteps = [
    "Fetching video transcript data...",
    "Scanning emotional peaks and pitch patterns...",
    "Computing retention score via viral benchmarks...",
    "Generating high-attention opening hook combinations...",
    "Structuring zoom timing and sound cues..."
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      timer = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= loadingSteps.length - 1) {
            return prev; // Hold on final step
          }
          return prev + 1;
        });
      }, 700);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl && !transcript) {
      alert("Please enter a video link or copy transcript dialogue.");
      return;
    }

    if (subscription.tier === 'Free' && subscription.analysesLeftToday <= 0) {
      alert("You have reached your daily limit of 3 free analyses. Please upgrade in the Pricing tab!");
      return;
    }

    setResult(null);
    setLoading(true);
    setIsSaved(false);

    try {
      const apiKey = localStorage.getItem('openrouter_api_key') || undefined;
      const data = await callLLMAnalysis(videoUrl || transcript, activeMode, apiKey);
      setResult(data);
      setSelectedMomentIdx(0);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze content. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBlueprint = () => {
    if (!result) return;
    const moment = result.moments[selectedMomentIdx];
    if (!moment) return;

    saveClip({
      url: videoUrl || 'Raw Transcript',
      title: moment.title,
      transcript: transcript || 'Extracting from URL...',
      viralScore: moment.viralScore,
      hooks: [moment.hook, ...selectedNiche.hooks.slice(1)],
      editingSuggestions: moment.edits,
      subtitleStyle: moment.subtitlePreview,
      mode: selectedNiche.name.split(' ')[0]
    });

    setIsSaved(true);
    refreshData();
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const handleDownload = (format: 'txt' | 'json') => {
    if (!result) return;
    const moment = result.moments[selectedMomentIdx];
    if (!moment) return;

    let content = '';
    let mimeType = 'text/plain';
    let filename = `clipmind-blueprint.${format}`;

    if (format === 'txt') {
      content = `=== CLIPMIND AI BLUEPRINT ===\n`;
      content += `Moment: ${moment.title}\n`;
      content += `Viral Score: ${moment.viralScore}/100\n`;
      content += `Timestamp: ${moment.timestamp}\n\n`;
      content += `Recommended Hook: "${moment.hook}"\n\n`;
      content += `--- EDITING SUGGESTIONS ---\n`;
      moment.edits.forEach(e => {
        content += `[${e.time}] ${e.action}: ${e.description}\n`;
      });
    } else {
      content = JSON.stringify(moment, null, 2);
      mimeType = 'application/json';
      filename = `clipmind-blueprint.json`;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Header Grid */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary-light" />
            AI Clip Blueprint Workspace
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            Identify viral minutes and get precise editing timelines, audio cues, and zoom scripts.
          </p>
        </div>

        {subscription.tier === 'Free' && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs">
            <AlertCircle className="h-4.5 w-4.5" />
            <span>Daily limits left: <strong className="text-white">{subscription.analysesLeftToday}/3</strong> runs. Upgrade for unlimited runs.</span>
          </div>
        )}
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* Left Side: Inputs Pane (span-2) */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleAnalyze} className="glass-panel border border-white/5 rounded-2xl p-6 space-y-6 shadow-glass">
            
            {/* Field 1: Paste Link */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Paste Video Link (YouTube / TikTok / Reels)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full pl-10 pr-4 py-3 text-xs glass-input"
                />
              </div>
            </div>

            {/* Field 2: Paste Dialogue */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Or Paste Transcript Dialogue</span>
                <span className="text-[9px] text-zinc-500">Fast analysis</span>
              </label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste podcast dialogue, anime quotes, or football commentary transcript here..."
                rows={5}
                className="w-full p-3 text-xs glass-input font-mono"
              />
            </div>

            {/* Field 3: Specialized Mode Selectors */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Specialized Creator Presets Niche
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CREATOR_MODES.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = mode.id === activeMode;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setActiveMode(mode.id)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-[10px] font-semibold transition-all duration-300 gap-1.5 ${
                        isActive 
                          ? 'bg-zinc-900 text-white border-primary shadow-neon-purple scale-105' 
                          : 'bg-zinc-900/40 text-zinc-400 border-white/5 hover:border-white/10 hover:text-zinc-200'
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-primary-light' : 'text-zinc-500'}`} />
                      <span>{mode.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold py-3.5 rounded-xl shadow-neon-purple transition-all duration-300 disabled:opacity-70"
            >
              <Sparkles className="h-4.5 w-4.5 animate-pulse" />
              {loading ? 'Processing analysis...' : 'Analyze & Suggest edits'}
            </button>
          </form>

          {/* Tips Box */}
          <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/60 text-[10px] text-zinc-500 leading-normal">
            <h5 className="font-bold text-zinc-400 mb-1">PRO-TIP FOR VIRAL HOOKS</h5>
            By default, ClipMind analyzes the transcript text structure. To increase results accuracy, configure custom OpenAI, Gemini, or OpenRouter keys in Settings.
          </div>
        </div>

        {/* Right Side: Outputs Pane (span-3) */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="glass-panel border border-white/5 rounded-2xl p-16 text-center space-y-6 min-h-[450px] flex flex-col items-center justify-center">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <Sparkles className="h-6 w-6 text-primary absolute top-5 left-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2">Analyzing Video Dialogue</h3>
                <p className="text-xs text-primary-light font-mono animate-pulse">{loadingSteps[loadingStep]}</p>
              </div>
            </div>
          ) : result ? (
            <div className="glass-panel border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
              
              {/* Moments Header Toggles */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="flex gap-2">
                  {result.moments.map((mom, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedMomentIdx(idx);
                        setIsSaved(false);
                      }}
                      className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                        selectedMomentIdx === idx
                          ? 'bg-zinc-800 text-white border-primary/50'
                          : 'bg-zinc-900/40 text-zinc-400 border-white/5 hover:border-white/10'
                      }`}
                    >
                      Clip {idx + 1} ({mom.duration})
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {/* Save to History Button */}
                  <button
                    onClick={handleSaveBlueprint}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                      isSaved 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/5'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isSaved ? 'fill-emerald-400 text-emerald-400' : 'text-zinc-400'}`} />
                    {isSaved ? 'Saved to Dashboard' : 'Save Blueprint'}
                  </button>

                  <button
                    onClick={() => handleDownload('txt')}
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg border border-white/5"
                    title="Export TXT Outline"
                  >
                    <FileDown className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Moment details */}
              {result.moments[selectedMomentIdx] && (() => {
                const moment = result.moments[selectedMomentIdx];
                return (
                  <div className="space-y-6">
                    {/* Header stats */}
                    <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-4">
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider">Timestamps</span>
                        <span className="text-sm font-black text-white font-mono">{moment.timestamp}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider">Clip Duration</span>
                        <span className="text-sm font-black text-zinc-200">{moment.duration}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wider">Viral Probability</span>
                        <span className="text-sm font-black text-primary-light flex items-center gap-0.5">
                          <Flame className="h-4 w-4 fill-primary-light" />
                          {moment.viralScore}%
                        </span>
                      </div>
                    </div>

                    {/* Logic rationale */}
                    <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs leading-relaxed text-zinc-300">
                      <strong className="text-zinc-200 block mb-1">Viral Rationale:</strong>
                      {moment.rationale}
                    </div>

                    {/* Blueprint breakdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      
                      {/* Left: subtitle styled mockup preview */}
                      <div className="md:col-span-2 space-y-4">
                        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Subtitle preview design</h4>
                        
                        <div className="aspect-[9/16] rounded-xl bg-zinc-950/90 border border-white/5 flex flex-col justify-end p-4 relative overflow-hidden min-h-[220px]">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex items-center justify-center">
                            <Play className="h-8 w-8 text-white/30" />
                          </div>
                          
                          {/* Styled text based on niche */}
                          <div className="relative text-center z-10 w-full mb-6">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">{selectedNiche.name.split(' ')[0]} Preset style</p>
                            <p className={`text-sm font-black ${selectedNiche.subtitleStyle.color} ${selectedNiche.subtitleStyle.case} tracking-wide drop-shadow-md`}>
                              {moment.subtitlePreview}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Hook text & suggestions checklist */}
                      <div className="md:col-span-3 space-y-4">
                        
                        {/* Hooks title copy */}
                        <div>
                          <div className="flex justify-between items-center text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-2">
                            <span>TikTok Opening Hook</span>
                            <button
                              onClick={() => handleCopyText(moment.hook, 'hook')}
                              className="text-zinc-500 hover:text-white flex items-center gap-1 lowercase"
                            >
                              <Copy className="h-3 w-3" />
                              {copySuccess === 'hook' ? 'copied!' : 'copy hook'}
                            </button>
                          </div>
                          <div className="text-xs bg-zinc-900 border border-white/5 rounded-lg px-3.5 py-2.5 text-zinc-200 font-medium">
                            "{moment.hook}"
                          </div>
                        </div>

                        {/* Zoom script checklist */}
                        <div>
                          <div className="flex justify-between items-center text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-2">
                            <span>Editing Timeline Outline</span>
                            <button
                              onClick={() => {
                                const editString = moment.edits.map(e => `[${e.time}] ${e.action}: ${e.description}`).join('\n');
                                handleCopyText(editString, 'edits');
                              }}
                              className="text-zinc-500 hover:text-white flex items-center gap-1 lowercase"
                            >
                              <Copy className="h-3 w-3" />
                              {copySuccess === 'edits' ? 'copied!' : 'copy blueprint'}
                            </button>
                          </div>
                          <div className="space-y-2">
                            {moment.edits.map((e, idx) => (
                              <div key={idx} className="flex gap-2.5 text-[11px] bg-zinc-900/40 border border-white/5 rounded-lg p-2.5 leading-relaxed">
                                <span className="font-mono text-secondary-light font-bold">{e.time}</span>
                                <div>
                                  <strong className="text-zinc-300 block">{e.action}</strong>
                                  <span className="text-zinc-500 text-[10px] block mt-0.5">{e.description}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sound suggestions */}
                        <div>
                          <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Suggested SFX Audio Drops</h5>
                          <div className="flex flex-wrap gap-2">
                            {moment.sounds.map((sound, i) => (
                              <span key={i} className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 text-primary-light text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                <Volume2 className="h-3.5 w-3.5" />
                                {sound}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })()}

            </div>
          ) : (
            <div className="glass-panel border border-white/5 rounded-2xl p-16 text-center space-y-4 min-h-[450px] flex flex-col items-center justify-center">
              <Search className="h-10 w-10 text-zinc-700 mx-auto" />
              <h3 className="text-base font-bold text-zinc-400">Workspace Empty</h3>
              <p className="text-zinc-500 text-xs max-w-xs mx-auto">
                Paste a public video URL or draft dialogue on the left panel, choose your niche mode, and hit "Analyze" to inspect viral triggers.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
