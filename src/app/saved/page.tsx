"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { getSavedClips, deleteSavedClip, SavedClip } from '@/lib/dbMock';
import { CREATOR_MODES } from '@/lib/constants';
import { 
  FolderHeart, 
  Trash2, 
  Copy, 
  FileDown, 
  Flame, 
  Clock, 
  Play, 
  Sparkles, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';

export default function SavedClipsPage() {
  const { savedClips, refreshData } = useApp();
  const [selectedClip, setSelectedClip] = useState<SavedClip | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  // Update default selected clip
  useEffect(() => {
    if (savedClips.length > 0 && !selectedClip) {
      setSelectedClip(savedClips[0]);
    }
  }, [savedClips]);

  const handleDelete = (id: string) => {
    deleteSavedClip(id);
    refreshData();
    if (selectedClip?.id === id) {
      setSelectedClip(null);
    }
  };

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const handleExportFile = (clip: SavedClip, format: 'txt' | 'json') => {
    let content = '';
    let mimeType = 'text/plain';
    let filename = `clipmind-blueprint-${clip.id}.${format}`;

    if (format === 'txt') {
      content = `=== CLIPMIND AI BLUEPRINT ===\n`;
      content += `Title: ${clip.title}\n`;
      content += `Niche Mode: ${clip.mode}\n`;
      content += `Viral Score: ${clip.viralScore}/100\n`;
      content += `URL: ${clip.url}\n\n`;
      content += `--- SAVED HOOKS ---\n`;
      clip.hooks.forEach((h, i) => { content += `${i+1}. "${h}"\n`; });
      content += `\n--- EDITING SCRIPTS ---\n`;
      clip.editingSuggestions.forEach(e => {
        content += `[${e.time}] ${e.action}: ${e.description}\n`;
      });
    } else {
      content = JSON.stringify(clip, null, 2);
      mimeType = 'application/json';
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
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {/* Left Column: Clips List */}
      <div className="md:col-span-1 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FolderHeart className="h-5 w-5 text-accent-pink" />
          Saved Blueprints ({savedClips.length})
        </h2>

        {savedClips.length === 0 ? (
          <div className="glass-panel border border-white/5 rounded-xl p-8 text-center space-y-4">
            <p className="text-zinc-500 text-xs">You haven't saved any viral clip plans yet.</p>
            <a
              href="/analyzer"
              className="inline-flex items-center gap-1 bg-white/5 border border-white/10 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Analyze a Video
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {savedClips.map((clip) => {
              const activeMode = CREATOR_MODES.find(m => m.id === clip.mode.toLowerCase()) || CREATOR_MODES[0];
              const isSelected = selectedClip?.id === clip.id;
              
              return (
                <div
                  key={clip.id}
                  onClick={() => setSelectedClip(clip)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-zinc-900 border-primary shadow-neon-purple scale-[1.01]' 
                      : 'bg-zinc-900/40 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {clip.mode} Mode
                    </span>
                    <span className="flex items-center gap-0.5 text-primary-light text-xs font-black">
                      <Flame className="h-3 w-3 fill-primary-light" />
                      {clip.viralScore}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-zinc-200 line-clamp-1">{clip.title}</h4>
                  
                  {clip.url && (
                    <div className="flex items-center gap-1 text-[10px] text-zinc-500 mt-1.5 truncate">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(clip.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-white/5 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(clip.id);
                      }}
                      className="text-zinc-600 hover:text-red-400 transition-colors p-1"
                      title="Delete Clip"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Right Column: Active Blueprint Showcase */}
      <div className="md:col-span-2 space-y-6">
        {selectedClip ? (
          <div className="glass-panel border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
            
            {/* Header section */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <span className="text-[10px] uppercase font-black text-secondary-light tracking-widest block mb-1">
                  CLIPMIND BLUEPRINT
                </span>
                <h3 className="text-lg font-black text-white">{selectedClip.title}</h3>
                {selectedClip.url && (
                  <a 
                    href={selectedClip.url}
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white mt-1 hover:underline font-mono"
                  >
                    {selectedClip.url}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportFile(selectedClip, 'txt')}
                  className="flex items-center gap-1 bg-white/5 border border-white/5 hover:border-white/10 text-white text-xs font-semibold px-3 py-2 rounded-lg"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  Export TXT
                </button>
                <button
                  onClick={() => handleExportFile(selectedClip, 'json')}
                  className="flex items-center gap-1 bg-white/5 border border-white/5 hover:border-white/10 text-white text-xs font-semibold px-3 py-2 rounded-lg"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  Export JSON
                </button>
              </div>
            </div>

            {/* Layout details */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              
              {/* Left pane: preview and style */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Live Subtitle Mockup</h4>
                  {/* Style box */}
                  <div className="aspect-[9/16] rounded-xl bg-zinc-950/80 border border-white/5 flex flex-col justify-end p-4 relative overflow-hidden group min-h-[250px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex items-center justify-center">
                      <Play className="h-8 w-8 text-white/40" />
                    </div>
                    {/* Simulated live subtitle style */}
                    <div className="relative text-center z-10 w-full mb-6">
                      <p className="text-xs text-zinc-400 font-bold uppercase mb-1">Preview Format</p>
                      <p className="text-sm font-black text-yellow-400 uppercase tracking-wider drop-shadow-lg">
                        {selectedClip.subtitleStyle || 'AWESOME CLIP!'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right pane: hooks and script timeline */}
              <div className="md:col-span-3 space-y-6">
                {/* Hooks list */}
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Viral Hooks</span>
                    <button
                      onClick={() => handleCopyText(selectedClip.hooks.join('\n'), 'hooks')}
                      className="text-zinc-500 hover:text-white text-[9px] flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      {copySuccess === 'hooks' ? 'Copied!' : 'Copy All'}
                    </button>
                  </h4>
                  <div className="space-y-2">
                    {selectedClip.hooks.map((h, i) => (
                      <div key={i} className="text-xs bg-zinc-900 border border-white/5 rounded-lg px-3 py-2.5 text-zinc-200">
                        "{h}"
                      </div>
                    ))}
                  </div>
                </div>

                {/* Edits Suggestion */}
                <div>
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Editing Plan Timeline</span>
                    <button
                      onClick={() => {
                        const editString = selectedClip.editingSuggestions.map(e => `[${e.time}] ${e.action}: ${e.description}`).join('\n');
                        handleCopyText(editString, 'timeline');
                      }}
                      className="text-zinc-500 hover:text-white text-[9px] flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      {copySuccess === 'timeline' ? 'Copied!' : 'Copy Plan'}
                    </button>
                  </h4>
                  <div className="space-y-2">
                    {selectedClip.editingSuggestions.map((e, idx) => (
                      <div key={idx} className="flex gap-2.5 text-xs bg-zinc-900/40 border border-white/5 rounded-lg p-3">
                        <span className="font-mono text-secondary-light font-bold">{e.time}</span>
                        <div>
                          <strong className="text-zinc-300 block">{e.action}</strong>
                          <span className="text-zinc-500 text-[11px] block mt-0.5">{e.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="glass-panel border border-white/5 rounded-2xl p-16 text-center space-y-4">
            <FolderHeart className="h-10 w-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-zinc-300">No Blueprint Selected</h3>
            <p className="text-zinc-500 text-xs max-w-xs mx-auto">Select a saved analysis plan from the left sidebar to view its details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
