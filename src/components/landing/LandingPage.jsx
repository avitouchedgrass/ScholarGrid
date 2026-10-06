import React, { useState } from 'react';
import {
  Moon,
  Sun,
  ArrowRight,
  Sliders,
  ChevronDown,
  Check,
  X,
  Clock,
  ShieldCheck
} from 'lucide-react';
import MatchSimulator from './MatchSimulator';
import EssayDiffPreview from './EssayDiffPreview';
import QuickMatchModal from './QuickMatchModal';
import RollingOdometer from './RollingOdometer';
import VoxelCapGuide from './VoxelCapGuide';
import VoxelCapLogo from '../VoxelCapLogo';

export default function LandingPage({ theme, toggleTheme, onEnterApp }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activePillarTags, setActivePillarTags] = useState(['#FirstGen', '#UndergradSTEM', '#NeedBased', '#PeerMentorship']);

  const togglePillarTag = (tag) => {
    setActivePillarTags(prev =>
      prev.includes(tag) ? (prev.length > 1 ? prev.filter(t => t !== tag) : prev) : [...prev, tag]
    );
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(prev => (prev === index ? -1 : index));
  };

  const handleModalComplete = (profileData) => {
    setIsModalOpen(false);
    onEnterApp(profileData);
  };

  const scrollToSimulator = () => {
    const el = document.getElementById('simulator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full arch-grid-bg text-[var(--text-primary)] transition-colors relative">
      
      {/* 3D Voxel Graduation Cap Interactive Guide */}
      <VoxelCapGuide theme={theme} />

      {/* 1. Ultra-Minimalist Architectural Header */}
      <header className="sticky top-0 z-40 w-full bg-[var(--canvas-bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo + Glyph on Left */}
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 arch-panel flex items-center justify-center bg-[var(--surface-elevated)] border border-[var(--border)] shadow-sm hover:border-[var(--border-hover)] transition-all cursor-pointer overflow-hidden p-0.5">
              <VoxelCapLogo className="w-full h-full" theme={theme} />
            </div>
            <span className="font-mono font-bold text-lg sm:text-xl tracking-tight text-[var(--text-primary)]">
              ScholarGrid
            </span>
          </div>

          {/* Right: Theme Toggle + 'Start Matching' CTA */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 arch-panel bg-[var(--surface-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold px-4 py-2.5 bg-[var(--accent-primary)] text-[var(--accent-text)] hover:opacity-90 transition-opacity"
            >
              <span>Start Matching</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      <main id="landing-content" className="relative z-20">
      {/* 2. Hero — Asymmetric Left-Heavy Layout */}
      <section className="relative pt-14 pb-16 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* LEFT COLUMN — 7/12: Value proposition */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Pre-headline label */}
            <div>
              <span className="section-label mb-2">— ScholarGrid</span>
              <h1 className="hero-headline">
                Apply to scholarships<br className="hidden sm:block" />
                you can actually win.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
              Match on GPA, major, and background. Stop applying blind.
            </p>

            {/* CTAs — primary solid + inline ghost */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2.5 text-xs font-mono font-bold px-7 py-3.5 bg-[var(--accent-primary)] text-[var(--accent-text)] hover:opacity-90 transition-opacity"
              >
                <span>Find Matching Scholarships</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={scrollToSimulator}
                className="cta-ghost py-1"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Try the Interactive Matcher</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Stats strip — left-aligned 2×2 */}
            <div className="pt-8 mt-2 border-t border-[var(--border)] grid grid-cols-2 gap-x-10 gap-y-6">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--text-primary)]">
                  <RollingOdometer value="100" suffix="%" />
                </div>
                <div className="text-xs font-mono text-[var(--text-primary)] uppercase tracking-wider font-semibold">Clear Criteria</div>
                <p className="text-xs text-[var(--text-secondary)]">Exact requirements for every scholarship</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--text-primary)]">
                  <RollingOdometer value="0" />
                </div>
                <div className="text-xs font-mono text-[var(--text-primary)] uppercase tracking-wider font-semibold">Guesswork</div>
                <p className="text-xs text-[var(--text-secondary)]">Never waste hours on awards you can't receive</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--text-primary)]">
                  <RollingOdometer value="4.2" suffix="X" />
                </div>
                <div className="text-xs font-mono text-[var(--text-primary)] uppercase tracking-wider font-semibold">Faster Drafting</div>
                <p className="text-xs text-[var(--text-secondary)]">Write core stories once and adapt them easily</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--text-primary)]">
                  <RollingOdometer value="14" suffix="-Day" />
                </div>
                <div className="text-xs font-mono text-[var(--text-primary)] uppercase tracking-wider font-semibold">Deadline Alerts</div>
                <p className="text-xs text-[var(--text-secondary)]">Timeline reminders so you submit on time</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — 5/12: Staggered scholarship cards (floating anchor) */}
          <div className="lg:col-span-5 flex flex-col gap-3 lg:pt-8">

            {/* Label */}
            <div className="flex items-center justify-between mb-1">
              <span className="section-label mb-0">Top Matches for Your Profile</span>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">Live Preview</span>
            </div>

            {/* FEATURED card — 100% Fit: full width, taller, glowing */}
            <div className="card-featured p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-mono text-[var(--text-secondary)] leading-snug">Knight-Hennessy Scholars</span>
                  <span className="text-[10px] font-mono text-[var(--text-secondary)]">Stanford University · Full-Degree</span>
                </div>
                <span className="fit-badge fit-badge-top">100% Fit</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xl font-mono font-bold text-[var(--text-primary)] leading-none">$85,000</div>
                  <div className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">Full Tuition + Living</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-[10px] font-mono font-semibold px-3 py-1.5 bg-[var(--accent-primary)] text-[var(--accent-text)] hover:opacity-90 transition-opacity"
                >
                  View Match
                </button>
              </div>
              {/* Eligibility micro-bar */}
              <div className="w-full h-1 bg-[var(--surface-elevated)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--emerald-accent)] rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            {/* Secondary cards — receded, smaller */}
            <div className="grid grid-cols-2 gap-3">
              <div className="card-secondary p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-1">
                  <span className="text-[11px] font-mono text-[var(--text-secondary)] leading-snug truncate">Gates Cambridge</span>
                  <span className="fit-badge fit-badge-high">98%</span>
                </div>
                <div>
                  <div className="text-base font-mono font-bold text-[var(--text-primary)] leading-none">Full Ride</div>
                  <div className="text-[10px] font-mono text-[var(--text-secondary)] mt-0.5">Intl Stipend</div>
                </div>
                <div className="w-full h-0.5 bg-[var(--surface-elevated)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--indigo-accent)] rounded-full" style={{ width: '98%' }} />
                </div>
              </div>

              <div className="card-secondary p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-1">
                  <span className="text-[11px] font-mono text-[var(--text-secondary)] leading-snug truncate">NSF GRFP</span>
                  <span className="fit-badge fit-badge-mid">96%</span>
                </div>
                <div>
                  <div className="text-base font-mono font-bold text-[var(--text-primary)] leading-none">$37K/yr</div>
                  <div className="text-[10px] font-mono text-[var(--text-secondary)] mt-0.5">3-Year Fellowship</div>
                </div>
                <div className="w-full h-0.5 bg-[var(--surface-elevated)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--text-muted)] rounded-full" style={{ width: '96%' }} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Live 3-Parameter Match Simulator — below hero, full width */}
        <div id="simulator-section" className="scroll-mt-24 w-full mt-16 md:mt-24">
          <MatchSimulator onOpenQuickMatch={() => setIsModalOpen(true)} />
        </div>
      </section>

      {/* 3. Key Benefits Ticker — removed (merged into hero stats strip) */}

      {/* 4. Core Features (Bento Grid) */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-14">
          <span className="section-label">— Core Features</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] max-w-2xl">
            Know your odds before you write a word.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Feature 1: Clear Eligibility Breakdown (7 cols) — emerald accent */}
          <div className="lg:col-span-7 arch-panel bento-emerald p-7 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Clear Eligibility Breakdown
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed font-sans">
                Every match score breaks down into inspectable criteria — GPA cutoff, degree alignment, and demographic eligibility. No mystery numbers.
              </p>
            </div>

            {/* Visual Stacked Composite Breakdown Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--text-secondary)]">Your Eligibility Score:</span>
                <span className="text-[var(--text-primary)] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                  <span>95% Match</span>
                </span>
              </div>
              
              {/* Composite Progress Bar */}
              <div className="w-full h-2.5 bg-[var(--surface-bg)] arch-border flex overflow-hidden p-0.5 gap-0.5">
                <div className="h-full bg-[var(--accent-primary)] transition-all" style={{ width: '40%' }} title="GPA Cutoff (+40%)" />
                <div className="h-full bg-[var(--text-secondary)] transition-all" style={{ width: '35%' }} title="Major Alignment (+35%)" />
                <div className="h-full bg-[var(--text-muted)] transition-all" style={{ width: '20%' }} title="Residency & Cohort (+20%)" />
                <div className="h-full bg-[var(--surface-elevated)] transition-all" style={{ width: '5%' }} title="Gap (5%)" />
              </div>

              <div className="p-4 bg-[var(--surface-elevated)] arch-border font-mono text-xs space-y-2.5">
                <div className="flex justify-between items-center text-xs font-medium text-[var(--text-secondary)] pb-2 border-b border-[var(--border)]">
                  <span>Requirement</span>
                  <span>Status</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-xs bg-[var(--accent-primary)]" />
                    <span>Minimum 3.50 Cumulative GPA</span>
                  </span>
                  <span className="text-[var(--text-primary)] font-semibold font-mono">ELIGIBLE (+40%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-xs bg-[var(--text-secondary)]" />
                    <span>Declared Engineering/Computing Major</span>
                  </span>
                  <span className="text-[var(--text-primary)] font-semibold font-mono">ELIGIBLE (+35%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-xs bg-[var(--text-muted)]" />
                    <span>Residency Verification in Target Region</span>
                  </span>
                  <span className="text-[var(--text-primary)] font-semibold font-mono">ELIGIBLE (+20%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Filter by Exact Requirements (5 cols) — indigo accent */}
          <div className="lg:col-span-5 arch-panel bento-indigo p-7 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Filter by Exact Requirements
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed font-sans">
                Filter on GPA, field of study, and demographic criteria. Scholarships that don't fit your profile disappear immediately.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                <span>Active Profile Filters</span>
                <span className="text-[var(--text-primary)] font-medium font-mono">{activePillarTags.length} Selected</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                {[
                  { tag: '#FirstGen', label: 'First-Gen College' },
                  { tag: '#UndergradSTEM', label: 'STEM Undergrad' },
                  { tag: '#NeedBased', label: 'Pell Grant Eligible' },
                  { tag: '#PeerMentorship', label: 'Peer Mentor' },
                  { tag: '#ResearchFellow', label: 'Lab Researcher' }
                ].map(({ tag }) => {
                  const isActive = activePillarTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => togglePillarTag(tag)}
                      className={`px-3 py-1.5 text-xs transition-all arch-border ${
                        isActive
                          ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] font-semibold'
                          : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <div className="p-3 bg-[var(--surface-elevated)] arch-border flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--text-secondary)]">Requirement Check:</span>
                <span className="text-[var(--text-primary)] font-bold">100% Verified Fit</span>
              </div>
            </div>
          </div>

          {/* Feature 3: Reusable Essay Library (5 cols) — amber accent */}
          <div className="lg:col-span-5 arch-panel bento-amber p-7 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Reusable Essay Library
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed font-sans">
                Write your personal statement, leadership story, or research summary once. Adapt it to any prompt and word count without starting over.
              </p>
            </div>

            {/* Essay Slotting Flowchart */}
            <div className="p-4 bg-[var(--surface-elevated)] arch-border font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] pb-2 border-b border-[var(--border)]">
                <span>Story Adaptation Flow</span>
                <span className="text-[var(--text-primary)] font-medium">Reused 4+ Times</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-2.5 bg-[var(--surface-bg)] arch-border text-center">
                  <span className="text-xs text-[var(--text-secondary)] block uppercase">Saved Story</span>
                  <span className="text-xs font-bold text-[var(--text-primary)]">Personal Statement</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0" />
                <div className="flex-1 p-2.5 bg-[var(--surface-bg)] arch-border text-center">
                  <span className="text-xs text-[var(--text-secondary)] block uppercase">Adaptation</span>
                  <span className="text-xs font-bold text-[var(--text-primary)]">Word Count Fit</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0" />
                <div className="flex-1 p-2.5 bg-[var(--surface-bg)] arch-border text-center">
                  <span className="text-xs text-[var(--text-secondary)] block uppercase">New Prompt</span>
                  <span className="text-xs font-bold text-[var(--text-primary)]">500w Draft</span>
                </div>
              </div>
            </div>
          </div>
           {/* Feature 4: Deadline & Progress Tracker (7 cols) — neutral */}
          <div className="lg:col-span-7 arch-panel bento-neutral p-7 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Deadline &amp; Progress Tracker
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed font-sans">
                Track every application from first read to submission — stages, deadlines, and documents in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 bg-[var(--surface-elevated)] arch-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--text-secondary)]">Stage: To Review</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                </div>
                <div className="text-base font-bold text-[var(--text-primary)]">2 Awards</div>
                <div className="text-xs text-[var(--text-secondary)]">Checking requirements</div>
              </div>

              <div className="p-3.5 bg-[var(--surface-elevated)] arch-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--text-primary)]">In Progress</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--indigo-accent)]" />
                </div>
                <div className="text-base font-bold text-[var(--text-primary)]">Knight-Hennessy</div>
                <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[var(--text-secondary)]" />
                  <span>18 days remaining</span>
                </div>
              </div>

              <div className="p-3.5 bg-[var(--surface-elevated)] arch-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--text-primary)]">Submitted</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--emerald-accent)]" />
                </div>
                <div className="text-base font-bold text-[var(--text-primary)]">NSF Fellowship</div>
                <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[var(--text-secondary)]" />
                  <span>Application Sent</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Live Interactive Demonstration: Essay Diff Preview */}
      <section id="essay-preview-section" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
        <div className="mb-14">
          <span className="section-label">— Essay Library</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] max-w-2xl">
            Write once. Apply everywhere.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-3 leading-relaxed max-w-lg text-pretty">
            Your best stories adapt to any prompt — without rewriting from a blank page.
          </p>
        </div>

        <EssayDiffPreview />
      </section>

      {/* 6. High-Stakes Comparison Matrix */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-14">
          <span className="section-label">— Comparison</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] max-w-2xl">
            Traditional Search Portals vs. ScholarGrid
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-3 leading-relaxed max-w-lg text-pretty">
            What you actually get vs. what every other portal gives you.
          </p>
        </div>

        <div className="arch-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-elevated)] font-mono text-[var(--text-secondary)]">
                  <th className="py-4 px-6 w-1/4">Comparison</th>
                  <th className="py-4 px-6 w-3/8 text-[var(--text-secondary)]">Traditional Search Portals</th>
                  <th className="py-4 px-6 w-3/8 text-[var(--text-primary)] font-bold bg-[var(--surface-bg)] border-l border-[var(--border)]">
                    ScholarGrid
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] font-sans">
                
                <tr>
                  <td className="py-4 px-6 font-mono font-medium text-[var(--text-secondary)]">
                    Search Results
                  </td>
                  <td className="py-4 px-6 text-[var(--text-secondary)]">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-[var(--text-secondary)] shrink-0 mt-0.5" />
                      <span>Fuzzy keywords filled with sponsored ads and sweepstakes</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[var(--text-primary)] font-medium bg-[var(--surface-bg)] border-l border-[var(--border)]">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[var(--text-primary)] shrink-0 mt-0.5" />
                      <span>Direct filtering by GPA, field of study, and background</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-mono font-medium text-[var(--text-secondary)]">
                    Requirement Transparency
                  </td>
                  <td className="py-4 px-6 text-[var(--text-secondary)]">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-[var(--text-secondary)] shrink-0 mt-0.5" />
                      <span>Vague match scores with no explanation of required cut-offs</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[var(--text-primary)] font-medium bg-[var(--surface-bg)] border-l border-[var(--border)]">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[var(--text-primary)] shrink-0 mt-0.5" />
                      <span>Clear checklist showing every requirement upfront</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-mono font-medium text-[var(--text-secondary)]">
                    Writing Support
                  </td>
                  <td className="py-4 px-6 text-[var(--text-secondary)]">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-[var(--text-secondary)] shrink-0 mt-0.5" />
                      <span>Blank text boxes forcing you to write from scratch every time</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[var(--text-primary)] font-medium bg-[var(--surface-bg)] border-l border-[var(--border)]">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[var(--text-primary)] shrink-0 mt-0.5" />
                      <span>Essay library to adapt your best stories to new prompts</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-mono font-medium text-[var(--text-secondary)]">
                    Application Tracking
                  </td>
                  <td className="py-4 px-6 text-[var(--text-secondary)]">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-[var(--text-secondary)] shrink-0 mt-0.5" />
                      <span>Lost bookmarks, messy spreadsheets, and missed deadlines</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[var(--text-primary)] font-medium bg-[var(--surface-bg)] border-l border-[var(--border)]">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[var(--text-primary)] shrink-0 mt-0.5" />
                      <span>Simple stage tracker with automated deadline countdowns</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-mono font-medium text-[var(--text-secondary)]">
                    Time Investment
                  </td>
                  <td className="py-4 px-6 text-[var(--text-secondary)]">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-[var(--text-secondary)] shrink-0 mt-0.5" />
                      <span>Dozens of applications sent with high hidden-disqualification rates</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[var(--text-primary)] font-bold bg-[var(--surface-bg)] border-l border-[var(--border)]">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[var(--text-primary)] shrink-0 mt-0.5" />
                      <span>Targeted applications to awards where you meet every requirement</span>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (Accordion) */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-14">
          <span className="section-label">— FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3.5">
          {[
            {
              q: "How does ScholarGrid guarantee I won't waste time on scholarships I can't receive?",
              a: "ScholarGrid checks your actual GPA, major, and background against official donor rules. If you don't meet a requirement, we tell you right away so you don't waste hours drafting an essay for an award you cannot receive."
            },
            {
              q: "How does the reusable Essay Library help with word counts?",
              a: "You can write your main stories—like your background, research, or leadership experiences—once in your library. When a new scholarship asks for a 500-word essay, you can combine your existing stories and adjust them to fit the prompt and word count without starting from a blank page."
            },
            {
              q: "Where does ScholarGrid find scholarships?",
              a: "We source scholarships directly from official university, foundation, and government programs. Every scholarship includes verified criteria so you never encounter expired listings, lead-gen sweepstakes, or spam."
            },
            {
              q: "Can I manage deadlines and application stages directly inside the app?",
              a: "Yes. ScholarGrid includes a simple dashboard tracking your applications across To Review, In Progress, and Submitted states, complete with countdowns and task checklists."
            },
            {
              q: "Does ScholarGrid sell my academic profile data to lenders or third parties?",
              a: "Never. Your profile information and essay drafts stay private to your local browser session. We do not monetize student data, sell leads, or display student loan advertisements."
            }
          ].map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="arch-panel overflow-hidden transition-all">
                <button
                  type="button"
                  id={`faq-header-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full text-left p-6 flex items-center justify-between text-base font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors"
                >
                  <span className="font-mono">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-header-${idx}`}
                  className={`grid transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] bg-[var(--surface-elevated)]/40 font-sans">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Final Call-to-Action Command Panel */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="arch-panel p-10 md:p-16 text-center bg-[var(--surface-bg)] border border-[var(--border-active)] relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Stop guessing. Start applying.
            </h2>
            
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed text-pretty">
              Every scholarship matched to your exact profile. No sponsored noise, no hidden disqualifiers.
            </p>

            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-xs font-mono font-bold px-8 py-3.5 bg-[var(--accent-primary)] text-[var(--accent-text)] hover:opacity-90 transition-opacity"
              >
                <span>Start Matching Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>
      </main>

      {/* 9. Architectural Minimalist Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface-bg)] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-secondary)]">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 arch-panel flex items-center justify-center bg-[var(--surface-elevated)] border border-[var(--border)] overflow-hidden p-0.5">
              <VoxelCapLogo className="w-full h-full" theme={theme} />
            </div>
            <div>
              <span className="font-bold text-sm text-[var(--text-primary)] font-mono">ScholarGrid</span>
              <span className="text-xs text-[var(--text-secondary)] ml-2 font-mono">— Transparent Scholarship Matching</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span>Verified Requirements</span>
            <span>•</span>
            <span>Zero Spam</span>
            <span>•</span>
            <span>Student First</span>
          </div>

        </div>
      </footer>

      {/* 3-Step Quick Match Modal */}
      <QuickMatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCompleteToApp={handleModalComplete}
      />

    </div>
  );
}
