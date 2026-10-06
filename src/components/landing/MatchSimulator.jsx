import React, { useState, useMemo } from 'react';
import { Sliders, CheckCircle2, XCircle, ArrowUpRight, ShieldCheck, Clock, Award, ChevronDown } from 'lucide-react';
import RollingOdometer from './RollingOdometer';

const STREAMS = [
  { id: 'engineering', label: 'Engineering & Computing', baseFunding: 35000, primarySpecimen: 'Advanced Computational Systems Fellowship', provider: 'Association for Computing Systems' },
  { id: 'medical', label: 'Medical & Life Sciences', baseFunding: 42000, primarySpecimen: 'Biomedical Discovery & Clinical Grant', provider: 'Foundation for Medical Research' },
  { id: 'commerce', label: 'Commerce & Economics', baseFunding: 28000, primarySpecimen: 'Global Economic Strategy Scholar Award', provider: 'Economic Policy Institute' },
  { id: 'sciences', label: 'Physical & Natural Sciences', baseFunding: 31000, primarySpecimen: 'Pure Mathematics & Physics Endowment', provider: 'National Mathematical Society' },
  { id: 'arts', label: 'Humanities & Social Sciences', baseFunding: 24000, primarySpecimen: 'Archival Research & Public Policy Fellowship', provider: 'Humanities Research Council' },
];

const CATEGORIES = [
  { id: 'merit', label: 'Academic Merit', bonus: 6000 },
  { id: 'stem', label: 'STEM Major', bonus: 12500 },
  { id: 'firstgen', label: 'First-Generation College', bonus: 9000 },
  { id: 'need', label: 'Financial Need', bonus: 8500 },
  { id: 'resident', label: 'In-State Resident', bonus: 5000 },
];

const PRESETS = [
  { label: 'STEM Undergrad (3.85)', stream: 'engineering', cgpa: 3.85, categories: ['merit', 'stem'] },
  { label: 'First-Gen Pre-Med (3.92)', stream: 'medical', cgpa: 3.92, categories: ['firstgen', 'need', 'stem'] },
  { label: 'Humanities Fellow (3.65)', stream: 'arts', cgpa: 3.65, categories: ['merit', 'resident'] },
];

export default function MatchSimulator({ onOpenQuickMatch }) {
  const [stream, setStream] = useState('engineering');
  const [cgpa, setCgpa] = useState(3.85);
  const [selectedCategories, setSelectedCategories] = useState(['merit', 'stem']);
  const [expandedCriterion, setExpandedCriterion] = useState(null);

  const toggleCategory = (catId) => {
    setSelectedCategories(prev => 
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const selectedStreamObj = useMemo(() => {
    return STREAMS.find(s => s.id === stream) || STREAMS[0];
  }, [stream]);

  const { totalFunding, matchPercent, criteriaList, activeScholarship } = useMemo(() => {
    const streamBase = selectedStreamObj.baseFunding;
    const catBonus = selectedCategories.reduce((acc, catId) => {
      const match = CATEGORIES.find(c => c.id === catId);
      return acc + (match ? match.bonus : 0);
    }, 0);

    const gpaFactor = Math.max(0.65, (cgpa - 2.0) / 2.0);
    const calculatedFunding = Math.round((streamBase + catBonus) * gpaFactor / 500) * 500;

    const gpaScore = Math.min(100, Math.round((cgpa / 4.0) * 100));
    const streamScore = 96;
    const tagBonusScore = Math.min(24, selectedCategories.length * 8);
    const calculatedMatch = Math.min(99, Math.round(gpaScore * 0.52 + streamScore * 0.28 + tagBonusScore));

    const criteria = [
      {
        id: 'gpa',
        label: 'Minimum GPA Requirement',
        passed: cgpa >= 3.2,
        shortReason: cgpa >= 3.2 ? `GPA ${cgpa.toFixed(2)} meets the 3.20 minimum` : `GPA ${cgpa.toFixed(2)} is below the 3.20 minimum`,
        diagnostic: cgpa >= 3.2 
          ? `Your cumulative GPA of ${cgpa.toFixed(2)} satisfies the 3.20 minimum requirement for this scholarship.`
          : `This scholarship requires a cumulative GPA of at least 3.20.`,
      },
      {
        id: 'stream',
        label: 'Field of Study',
        passed: true,
        shortReason: `${selectedStreamObj.label} is eligible for this award`,
        diagnostic: `This scholarship specifically supports students enrolled in ${selectedStreamObj.label}.`,
      },
      {
        id: 'category',
        label: 'Student Background & Cohort',
        passed: selectedCategories.length > 0,
        shortReason: selectedCategories.length > 0 
          ? `${selectedCategories.length} matching background categories selected`
          : 'General applicant pool (no special background tags selected)',
        diagnostic: selectedCategories.length > 0 
          ? `Your selected categories (${selectedCategories.map(c => CATEGORIES.find(x => x.id === c)?.label).join(', ')}) match dedicated preferences for this award.`
          : 'Selecting specific student background categories helps match scholarships reserved for particular student communities.',
      },
      {
        id: 'window',
        label: 'Application Timeline',
        passed: true,
        shortReason: 'Applications open (deadline in 42 days)',
        diagnostic: 'Submissions are currently accepted until November 15, 2026.',
      },
    ];

    const specimen = {
      title: selectedStreamObj.primarySpecimen,
      provider: selectedStreamObj.provider,
      amount: Math.round(calculatedFunding * 0.48 / 500) * 500,
      deadline: 'November 15, 2026',
      effort: cgpa > 3.6 ? 'Low (1 Core Essay + Transcript)' : 'Medium (2 Essays + 1 Letter)',
      matchScore: calculatedMatch,
    };

    return {
      totalFunding: calculatedFunding,
      matchPercent: calculatedMatch,
      criteriaList: criteria,
      activeScholarship: specimen,
    };
  }, [selectedStreamObj, cgpa, selectedCategories]);

  return (
    <div className="w-full arch-panel p-6 sm:p-8 lg:p-10 transition-colors">
      
      {/* Stage Header with Presets & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[var(--border)] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] font-sans">
              Scholarship Match Estimator
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-2xl text-pretty leading-relaxed">
            Adjust your major, GPA, and categories to see which criteria you meet and estimate your total available funding.
          </p>
        </div>

        {/* Live Match Gauge with Rolling Odometer */}
        <div className="flex items-center gap-3 bg-[var(--surface-elevated)] arch-border px-4 py-2 self-start sm:self-auto">
          <div className="text-right">
            <div className="text-xs font-mono font-medium text-[var(--text-secondary)]">Match Confidence</div>
            <div className="text-lg font-mono font-bold text-[var(--text-primary)] leading-tight">
              <RollingOdometer value={matchPercent} suffix="%" />
            </div>
          </div>
          <div className="w-9 h-9 arch-border flex items-center justify-center font-mono font-bold text-xs bg-[var(--surface-bg)] text-[var(--text-primary)]">
            FIT
          </div>
        </div>
      </div>

      {/* Student Profile Quick Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 p-3.5 bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[var(--text-secondary)] font-medium">Presets:</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setStream(p.stream);
                setCgpa(p.cgpa);
                setSelectedCategories(p.categories);
              }}
              className="px-2.5 py-1 bg-[var(--surface-bg)] border border-[var(--border)] hover:border-emerald-500/50 hover:text-emerald-400 text-[var(--text-secondary)] transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setStream('engineering');
            setCgpa(3.85);
            setSelectedCategories(['merit', 'stem']);
          }}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4"
        >
          Reset Defaults
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left Column: 3-Parameter Selector Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Parameter 1: Course / Stream Dropdown */}
          <div className="space-y-2">
            <label htmlFor="simulator-stream" className="block text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
              1. Field of Study / Major
            </label>
            <select
              id="simulator-stream"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm px-4 py-3 outline-none focus:border-[var(--border-active)] transition-colors cursor-pointer"
            >
              {STREAMS.map((s) => (
                <option key={s.id} value={s.id} className="bg-[var(--surface-bg)] text-[var(--text-primary)]">
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Parameter 2: Marks / CGPA Slider & Numerical Display */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="simulator-cgpa" className="font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                2. Cumulative GPA (4.0 Scale)
              </label>
              <span className="font-mono font-bold text-sm px-2.5 py-1 bg-[var(--surface-elevated)] arch-border text-[var(--text-primary)] transition-colors">
                {cgpa.toFixed(2)}
              </span>
            </div>
            
            <input
              id="simulator-cgpa"
              type="range"
              min="2.5"
              max="4.0"
              step="0.05"
              value={cgpa}
              onChange={(e) => setCgpa(parseFloat(e.target.value))}
              aria-label="Cumulative GPA"
              aria-valuemin={2.5}
              aria-valuemax={4.0}
              aria-valuenow={cgpa}
              className="w-full cursor-pointer"
            />
            
            <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)]">
              <span>2.50 Minimum</span>
              <span>3.25 Average</span>
              <span>4.00 Top</span>
            </div>
          </div>

          {/* Parameter 3: State & Category Tags */}
          <div className="space-y-2.5">
            <label className="block text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">
              3. Student Categories & Background
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const active = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    aria-pressed={active}
                    className={`text-xs px-3 py-2 border transition-all text-left font-mono ${
                      active
                        ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] border-[var(--accent-primary)] font-semibold'
                        : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-hover)]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Total Calculated Funding Banner with Rolling Odometer */}
          <div className="p-5 bg-[var(--surface-elevated)] arch-border mt-auto space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
              Estimated Total Available Funding
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-[var(--text-primary)] tracking-tight">
              <RollingOdometer value={totalFunding.toLocaleString()} prefix="$" />
            </div>
            <p className="text-xs text-[var(--text-secondary)] pt-1 flex items-center gap-1.5 font-sans">
              <ShieldCheck className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
              <span>Based on scholarships matching your current academic profile and categories</span>
            </p>
          </div>

        </div>

        {/* Right Column: Decomposed Criteria & Live Opportunity Card (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Decomposed Criteria Checklist */}
          <div className="p-5 sm:p-6 bg-[var(--surface-elevated)] arch-border relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-3.5 border-b border-[var(--border)] gap-2">
              <div>
                <h3 className="text-sm font-mono font-semibold text-[var(--text-primary)]">
                  Eligibility Requirements
                </h3>
                <div className="text-xs font-mono text-[var(--text-secondary)] mt-1 flex flex-wrap items-center gap-2">
                  <span>{criteriaList.filter(c => c.passed).length} of {criteriaList.length} requirements met</span>
                </div>
              </div>
              <span className="text-xs font-mono text-[var(--text-secondary)]">
                Click criterion for details
              </span>
            </div>

            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {criteriaList.map((crit) => {
                const isExpanded = expandedCriterion === crit.id;

                return (
                  <div
                    key={crit.id}
                    className="transition-colors duration-150 hover:bg-[var(--surface-hover)]/60"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedCriterion(isExpanded ? null : crit.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`diagnostic-${crit.id}`}
                      className="w-full text-left py-3.5 px-2 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        {crit.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-[var(--text-primary)] shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[var(--text-secondary)] shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className={`text-xs sm:text-sm font-medium ${crit.passed ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                            {crit.label}
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-sans leading-relaxed">
                            {crit.shortReason}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className={`font-mono text-xs px-2 py-0.5 arch-border ${
                          crit.passed 
                            ? 'text-[var(--text-primary)] font-semibold bg-[var(--surface-bg)] criteria-badge-flip' 
                            : 'text-[var(--text-secondary)] bg-[var(--surface-bg)] criteria-badge-flip'
                        }`}>
                          {crit.passed ? 'Eligible' : 'Ineligible'}
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-secondary)] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    <div
                      id={`diagnostic-${crit.id}`}
                      className={`grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3.5 pb-3.5 pt-2 text-xs text-[var(--text-secondary)] leading-relaxed bg-[var(--surface-bg)]/80 border-t border-[var(--border-subtle)] font-sans">
                          {crit.diagnostic}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Live Scholarship Opportunity */}
          <div className="p-5 sm:p-6 bg-[var(--surface-bg)] arch-border border-[var(--border-active)]">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono mb-3">
              <span className="font-medium text-[var(--text-secondary)]">
                Top Matching Scholarship
              </span>
              <span className="text-[var(--text-primary)] font-semibold flex items-center gap-1">
                <RollingOdometer value={matchPercent} suffix="%" /> Compatibility
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] tracking-tight">
                  {activeScholarship.title}
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  {activeScholarship.provider}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xl sm:text-2xl font-mono font-bold text-[var(--text-primary)]">
                  <RollingOdometer value={activeScholarship.amount.toLocaleString()} prefix="$" />
                </div>
                <div className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">
                  Direct Award
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-[var(--border)] text-xs font-mono">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <Award className="w-4 h-4 text-[var(--text-primary)]" />
                <span>Effort: {activeScholarship.effort.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <Clock className="w-4 h-4 text-[var(--text-primary)]" />
                <span>Deadline: Nov 15</span>
              </div>
              <div className="flex justify-start sm:justify-end">
                <button
                  type="button"
                  onClick={onOpenQuickMatch}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold px-4 py-2 bg-[var(--accent-primary)] text-[var(--accent-text)] hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
