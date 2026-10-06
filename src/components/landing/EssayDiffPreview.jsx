import React, { useState, useEffect, useMemo } from 'react';
import { Copy, GitCompare, Check, Layers, Cpu } from 'lucide-react';
import RollingOdometer from './RollingOdometer';

const ESSAY_MODULES = [
  {
    id: 'sop',
    title: 'Statement of Purpose (Core)',
    category: 'Academic Trajectory',
    wordCount: 420,
    paragraphs: [
      'My research investigates fault-tolerant distributed memory architectures capable of handling asynchronous tensor computations under variable network latency.',
      'During my undergraduate laboratory tenure, I led the benchmarking of memory-coherent cache topologies, reducing redundant serialization passes by 34%.',
      'Securing this endowment provides non-dilutive capital to complete experimental silicon profiling, eliminating financial friction while accelerating our peer-reviewed open publication pipeline.'
    ]
  },
  {
    id: 'need',
    title: 'Financial Need & Resource Constraints',
    category: 'Circumstances',
    wordCount: 310,
    paragraphs: [
      'As a first-generation student funding tuition through split work-study rotations and evening lab shifts, time allocation represents my primary structural bottleneck.',
      'This scholarship directly offsets mandatory institutional research credit fees, allowing me to convert 20 hours per week of non-academic employment directly into primary thesis investigation.'
    ]
  },
  {
    id: 'impact',
    title: 'Community & Peer Mentorship',
    category: 'Leadership',
    wordCount: 360,
    paragraphs: [
      'I established an open-access weekly seminar for introductory systems programming, mentoring 45 underclassmen through low-level debugging and Linux kernel interfaces.',
      'Technical excellence is incomplete without lowering barriers for the subsequent cohort. My commitment is to operationalize mentorship alongside rigorous engineering.'
    ]
  }
];

const TARGET_PROMPTS = [
  {
    id: 'prompt-1',
    scholarship: 'Systems Research Fellowship',
    maxWords: 500,
    promptText: 'Explain your proposed technical investigation, past empirical achievements, and how funding will accelerate your academic output.',
    adaptedModules: ['sop'],
    customBridge: 'Specifically tailored for hardware-software co-design review committees.',
    targetWordCount: 445,
    matchFit: '98%'
  },
  {
    id: 'prompt-2',
    scholarship: 'First-Generation STEM Leadership Grant',
    maxWords: 600,
    promptText: 'Detail how your personal background and leadership initiatives empower others in computing, alongside your financial plan for degree completion.',
    adaptedModules: ['need', 'impact'],
    customBridge: 'Cross-stitched financial barrier mitigation with peer lab seminar mentorship.',
    targetWordCount: 540,
    matchFit: '95%'
  },
  {
    id: 'prompt-3',
    scholarship: 'Undergraduate Innovation Award',
    maxWords: 400,
    promptText: 'Briefly describe your most impactful academic breakthrough and future trajectory.',
    adaptedModules: ['sop'],
    customBridge: 'Condensed technical thesis extracting the silicon profiling benchmark.',
    targetWordCount: 380,
    matchFit: '99%'
  }
];

export default function EssayDiffPreview() {
  const [selectedModuleId, setSelectedModuleId] = useState('sop');
  const [selectedPromptId, setSelectedPromptId] = useState('prompt-1');
  const [copied, setCopied] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [hoveredModuleId, setHoveredModuleId] = useState(null);

  const currentModule = ESSAY_MODULES.find(m => m.id === selectedModuleId) || ESSAY_MODULES[0];
  const currentPrompt = TARGET_PROMPTS.find(p => p.id === selectedPromptId) || TARGET_PROMPTS[0];

  const capacityPercent = useMemo(() => {
    return Math.round((currentPrompt.targetWordCount / currentPrompt.maxWords) * 100);
  }, [currentPrompt]);

  const activeSegments = useMemo(() => {
    return Math.round((capacityPercent / 100) * 20);
  }, [capacityPercent]);

  // Micro-compilation pulse on prompt or module switch
  useEffect(() => {
    setIsCompiling(true);
    const timer = setTimeout(() => setIsCompiling(false), 90);
    return () => clearTimeout(timer);
  }, [selectedPromptId, selectedModuleId]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full arch-panel p-6 sm:p-8 lg:p-10 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[var(--border)] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--text-primary)]" />
            <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-sans">
              Essay Library: Reusable Personal Stories
            </h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 font-sans max-w-2xl text-pretty leading-relaxed">
            Write your core personal stories once. See how your background and experiences adapt cleanly to different scholarship prompts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="arch-badge px-3 py-1 font-mono text-xs">
            Reused across multiple applications
          </span>
        </div>
      </div>

      {/* Target Prompt Selection Bar */}
      <div className="mb-8 p-4 sm:p-5 bg-[var(--surface-elevated)] arch-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-medium text-[var(--text-secondary)]">
            Select a scholarship prompt:
          </span>
          <span className="text-xs font-mono text-[var(--text-primary)] font-medium">
            Prompt Match: {currentPrompt.matchFit}
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TARGET_PROMPTS.map((prompt) => {
            const isSelected = prompt.id === selectedPromptId;
            return (
              <button
                key={prompt.id}
                type="button"
                onClick={() => setSelectedPromptId(prompt.id)}
                aria-pressed={isSelected}
                className={`text-left p-3.5 arch-border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--surface-bg)] border-[var(--border-active)] text-[var(--text-primary)]'
                    : 'bg-[var(--surface-bg)]/60 text-[var(--text-secondary)] hover:border-[var(--border-hover)]'
                }`}
              >
                <div className="text-xs font-semibold truncate font-sans">
                  {prompt.scholarship}
                </div>
                <div className="flex items-center justify-between text-xs font-mono mt-1.5 text-[var(--text-secondary)]">
                  <span>Limit: {prompt.maxWords}w</span>
                  <span className="text-[var(--text-primary)] font-medium">
                    {prompt.matchFit}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Split-Pane: Left Source Vault, Right Synthesized Prompt Diff */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Pane: Modular Source Blocks (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border)]">
            <span className="text-xs font-mono font-medium text-[var(--text-secondary)]">
              Your Saved Stories
            </span>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              3 Saved Stories
            </span>
          </div>

          <div className="space-y-2.5">
            {ESSAY_MODULES.map((mod) => {
              const active = mod.id === selectedModuleId;
              const isUsedInPrompt = currentPrompt.adaptedModules.includes(mod.id);
              const isHovered = hoveredModuleId === mod.id;

              return (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  onMouseEnter={() => setHoveredModuleId(mod.id)}
                  onMouseLeave={() => setHoveredModuleId(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedModuleId(mod.id);
                    }
                  }}
                  className={`p-3.5 arch-border cursor-pointer transition-all duration-150 ${
                    isHovered || active
                      ? 'bg-[var(--surface-elevated)] border-[var(--border-active)] -translate-y-0.5'
                      : 'bg-[var(--surface-bg)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold font-sans text-[var(--text-primary)]">
                      {mod.title}
                    </span>
                    {isUsedInPrompt && (
                      <span className="text-xs font-mono px-2 py-0.5 arch-badge">
                        Included in Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                    <span>{mod.category}</span>
                    <span>{mod.wordCount} words</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Vault Block Preview */}
          <div className="p-4 sm:p-5 bg-[var(--surface-elevated)] arch-border mt-2">
            <div className="text-xs font-mono text-[var(--text-secondary)] mb-3 flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <span className="font-medium text-[var(--text-primary)]">Original Story: {currentModule.title}</span>
              <span>{currentModule.wordCount} words</span>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
              {currentModule.paragraphs.map((p, idx) => (
                <p key={idx}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane: Real-Time Synthesized Diff Highlight (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-[var(--text-primary)]" />
              <span className="text-xs font-mono font-medium text-[var(--text-secondary)]">
                Draft for Selected Scholarship
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 bg-[var(--surface-elevated)] arch-border text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[var(--text-primary)]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Draft'}</span>
            </button>
          </div>

          {/* Prompt Header */}
          <div className="p-4 sm:p-5 bg-[var(--surface-elevated)] arch-border text-xs">
            <div className="text-xs font-mono text-[var(--text-secondary)] mb-1.5">
              Scholarship Essay Prompt:
            </div>
            <p className="text-[var(--text-primary)] italic font-serif leading-relaxed text-base sm:text-lg">
              "{currentPrompt.promptText}"
            </p>
          </div>

          {/* Synthesized Output with Segmented Word Count Meter */}
          <div className="p-5 sm:p-6 bg-[var(--surface-bg)] arch-border flex-1 space-y-4 relative overflow-hidden">
            {/* Segmented Word Count */}
            <div className="space-y-2 pb-3 border-b border-[var(--border)]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--text-secondary)]">
                  Word Count & Length Limit:
                </span>
                <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                  <RollingOdometer value={currentPrompt.targetWordCount} /> / {currentPrompt.maxWords} Words (
                  <RollingOdometer value={capacityPercent} suffix="%" />)
                </span>
              </div>

              {/* 20-Segment Discrete Capacity Bar */}
              <div className="flex gap-1 h-3 p-0.5 bg-[var(--surface-elevated)] arch-border items-stretch">
                {Array.from({ length: 20 }).map((_, i) => {
                  const isFilled = i < activeSegments;
                  return (
                    <div
                      key={i}
                      style={{ transitionDelay: `${i * 12}ms` }}
                      className={`flex-1 transition-all duration-180 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isFilled
                          ? 'bg-[var(--accent-primary)]'
                          : 'bg-[var(--border)]/30'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] pt-1">
                <span>Matches prompt requirements</span>
                <span className="text-[var(--text-secondary)] font-medium">+{currentPrompt.maxWords - currentPrompt.targetWordCount} words remaining</span>
              </div>
            </div>

            {/* Dynamic Synthesis Output with Modular Cards */}
            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[var(--text-primary)] pt-1 font-sans">
              <div
                onMouseEnter={() => setHoveredModuleId('sop')}
                onMouseLeave={() => setHoveredModuleId(null)}
                className={`p-3.5 arch-border transition-all duration-150 space-y-1.5 ${
                  hoveredModuleId === 'sop'
                    ? 'bg-[var(--surface-elevated)] border-[var(--border-active)] -translate-y-0.5'
                    : 'bg-[var(--surface-bg)]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                  <span>From your saved stories &bull; Academic Focus</span>
                  <span className="text-[var(--text-primary)] font-medium">Saved story</span>
                </div>
                <p className="text-[var(--text-primary)] font-sans leading-relaxed">
                  "My research investigates fault-tolerant distributed memory architectures capable of handling asynchronous tensor computations under variable network latency. During laboratory tenure, our benchmarking reduced redundant serialization passes by 34%."
                </p>
              </div>

              <div className="p-3.5 arch-border bg-[var(--surface-elevated)] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                  <span>Tailored paragraph</span>
                  <span className="text-[var(--text-primary)] font-medium">Customized</span>
                </div>
                <p className="text-[var(--text-primary)] font-sans leading-relaxed">
                  {currentPrompt.customBridge} "This application aligns directly with the {currentPrompt.scholarship} evaluation criteria, verifying our benchmark methodology under targeted deployment."
                </p>
              </div>

              {currentPrompt.adaptedModules.includes('need') && (
                <div
                  onMouseEnter={() => setHoveredModuleId('need')}
                  onMouseLeave={() => setHoveredModuleId(null)}
                  className={`p-3.5 arch-border transition-all duration-150 space-y-1.5 ${
                    hoveredModuleId === 'need'
                      ? 'bg-[var(--surface-elevated)] border-[var(--border-active)] -translate-y-0.5'
                      : 'bg-[var(--surface-bg)]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                    <span>From your saved stories &bull; Financial Need</span>
                    <span className="text-[var(--text-primary)] font-medium">Saved story</span>
                  </div>
                  <p className="text-[var(--text-primary)] font-sans leading-relaxed">
                    "Non-dilutive funding directly converts 20 weekly hours of non-academic employment into uninterrupted silicon profiling and lab thesis synthesis."
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] px-1">
            <span>Fits within word count limit</span>
            <span className="text-[var(--text-primary)] font-medium">
              Ready to submit
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
