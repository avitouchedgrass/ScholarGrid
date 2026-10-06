import React, { useState } from 'react';
import { Database, Zap, Sparkles, CheckCircle2, Award, Sliders, Copy, Plus, FileText, Check } from 'lucide-react';
import { MOCK_ESSAYS } from '../data/mockData';

export default function ProfilePage({ readinessScore = 85 }) {
  const [copiedId, setCopiedId] = useState(null);
  const [gpa, setGpa] = useState('3.82');
  const [satScore, setSatScore] = useState('1520');
  const [selectedMajor, setSelectedMajor] = useState('Computer Science');
  
  // Tag Matrix active state
  const [activeTags, setActiveTags] = useState([
    'First-Gen Student',
    'California Resident',
    'STEM Focus',
    'Low-Income Bracket (<$60k)',
    'Open Source Contributor'
  ]);

  const toggleTag = (tag) => {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleCopyEssay = (essay) => {
    navigator.clipboard.writeText(essay.snippet);
    setCopiedId(essay.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const DEMO_TAG_CATEGORIES = [
    {
      category: "Demographics & Family",
      tags: ["First-Gen Student", "Underrepresented Minority", "Low-Income Bracket (<$60k)", "Military/Veteran Family", "Single Parent Household"]
    },
    {
      category: "State & Residency",
      tags: ["California Resident", "Out-of-State", "International Student", "Bay Area Native"]
    },
    {
      category: "Academic & Field Focus",
      tags: ["STEM Focus", "Computer Science", "Open Source Contributor", "Honors / AP Scholar", "Research Assistant"]
    }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      
      {/* Profile Strength Header */}
      <div className="arch-panel p-6 mb-8 bg-[var(--surface-bg)] border border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="arch-badge px-2.5 py-0.5 text-xs font-mono font-bold flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[var(--text-primary)]" />
                {readinessScore}% Profile Strength
              </span>
            </div>
            <h2 className="font-sans text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              Profile Status: Ready for Matching
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] mt-1">
              Adding a personal essay will help match you with 12 additional scholarships.
            </p>
          </div>

          <div className="w-full md:w-64">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[var(--text-secondary)]">Profile Completeness</span>
              <span className="text-[var(--text-primary)] font-bold">{readinessScore}%</span>
            </div>
            <div className="h-2.5 bg-[var(--surface-elevated)] arch-border overflow-hidden p-0.5">
              <div className="h-full bg-[var(--accent-primary)] transition-all duration-300" style={{ width: `${readinessScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Column A: Academic Background & Categories (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Academic Background */}
          <div className="arch-panel p-6 bg-[var(--surface-bg)] space-y-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2 pb-3 border-b border-[var(--border)]">
              <Database className="h-4 w-4 text-[var(--text-primary)]" />
              Academic Background
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[var(--surface-elevated)] arch-border p-3.5 space-y-1">
                <span className="text-xs font-mono text-[var(--text-secondary)] uppercase block">Cumulative GPA</span>
                <input
                  type="text"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  className="w-full bg-transparent font-mono text-xl font-bold text-[var(--text-primary)] focus:outline-none"
                />
              </div>

              <div className="bg-[var(--surface-elevated)] arch-border p-3.5 space-y-1">
                <span className="text-xs font-mono text-[var(--text-secondary)] uppercase block">SAT / ACT Score</span>
                <input
                  type="text"
                  value={satScore}
                  onChange={(e) => setSatScore(e.target.value)}
                  className="w-full bg-transparent font-mono text-xl font-bold text-[var(--text-primary)] focus:outline-none"
                />
              </div>

              <div className="bg-[var(--surface-elevated)] arch-border p-3.5 space-y-1">
                <span className="text-xs font-mono text-[var(--text-secondary)] uppercase block">Intended Major</span>
                <input
                  type="text"
                  value={selectedMajor}
                  onChange={(e) => setSelectedMajor(e.target.value)}
                  className="w-full bg-transparent font-mono text-sm font-bold text-[var(--text-primary)] focus:outline-none mt-1"
                />
              </div>
            </div>

            {/* Target Colleges */}
            <div className="pt-2">
              <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider block mb-2">Target Institutions</span>
              <div className="flex flex-wrap gap-2">
                {["Stanford University", "UC Berkeley", "MIT", "CMU"].map((college, idx) => (
                  <span key={idx} className="arch-border bg-[var(--surface-elevated)] px-3 py-1 text-xs font-mono text-[var(--text-primary)]">
                    {college}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Demographics & Background Categories */}
          <div className="arch-panel p-6 bg-[var(--surface-bg)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--text-primary)]" />
                Background & Demographics
              </h3>
              <span className="text-xs font-mono text-[var(--text-primary)] font-semibold">{activeTags.length} Categories Selected</span>
            </div>

            <div className="space-y-4 pt-1">
              {DEMO_TAG_CATEGORIES.map((cat, idx) => (
                <div key={idx}>
                  <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider block mb-2">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.tags.map((tag) => {
                      const isActive = activeTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 text-xs font-mono arch-border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] font-semibold'
                              : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]'
                          }`}
                        >
                          {isActive ? '✓ ' : '+ '} {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Column B: Matching Preferences & Saved Essays (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Matching Preferences */}
          <div className="arch-panel p-6 bg-[var(--surface-bg)] space-y-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2 pb-3 border-b border-[var(--border)]">
              <Sliders className="h-4 w-4 text-[var(--text-primary)]" />
              Matching Preferences
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[var(--text-secondary)]">Merit vs. Need Priority</span>
                  <span className="text-[var(--text-primary)] font-bold">70% Merit / 30% Need</span>
                </div>
                <input type="range" min="0" max="100" defaultValue="70" className="w-full cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[var(--text-secondary)]">Minimum Award Amount</span>
                  <span className="text-[var(--text-primary)] font-bold">$2,500</span>
                </div>
                <input type="range" min="500" max="25000" step="500" defaultValue="2500" className="w-full cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Saved Essays */}
          <div className="arch-panel p-6 bg-[var(--surface-bg)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                <FileText className="h-4 w-4 text-[var(--text-primary)]" />
                Saved Essays
              </h3>
              <button
                type="button"
                className="arch-border bg-[var(--surface-elevated)] px-2.5 py-1 text-xs font-mono text-[var(--text-primary)] flex items-center gap-1 cursor-pointer hover:border-[var(--border-hover)]"
              >
                <Plus className="h-3 w-3" />
                <span>Add Story</span>
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_ESSAYS.map((essay) => (
                <div key={essay.id} className="bg-[var(--surface-elevated)] arch-border p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-sans text-xs font-bold text-[var(--text-primary)]">{essay.title}</h4>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">{essay.wordCount} words</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyEssay(essay)}
                      className="arch-border bg-[var(--surface-bg)] px-2 py-1 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 cursor-pointer"
                      title="Copy Essay Content"
                    >
                      {copiedId === essay.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === essay.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 font-sans italic leading-relaxed">
                    "{essay.snippet}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
