import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

export default function QuickMatchModal({ isOpen, onClose, onCompleteToApp }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    stream: 'Engineering & Computing',
    gpa: '3.85',
    demographics: ['STEM Priority', 'First-Gen College'],
    targetGoal: '$30,000+',
    timeline: 'Within 60 Days'
  });

  // Handle escape key to close and lock body scroll while modal is active
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleDemoTag = (tag) => {
    setProfile(prev => ({
      ...prev,
      demographics: prev.demographics.includes(tag)
        ? prev.demographics.filter(t => t !== tag)
        : [...prev.demographics, tag]
    }));
  };

  const handleFinish = () => {
    onCompleteToApp(profile);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-match-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs modal-backdrop-animate"
    >
      <div className="w-full max-w-xl arch-panel bg-[var(--surface-bg)] border border-[var(--border-active)] shadow-2xl p-6 sm:p-7 relative modal-panel-animate">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 bg-[var(--badge-bg)] border border-[var(--border)] text-[var(--text-primary)]">
                STEP {step} OF 3
              </span>
              <h3 id="quick-match-title" className="text-sm font-semibold tracking-wide uppercase font-mono text-[var(--text-primary)]">
                Quick Profile Setup
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans">
              Set your academic background to find matching scholarships
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="w-full grid grid-cols-3 gap-2 mb-6">
          <div className={`h-1 transition-all ${step >= 1 ? 'bg-[var(--text-primary)]' : 'bg-[var(--border)]'}`} />
          <div className={`h-1 transition-all ${step >= 2 ? 'bg-[var(--text-primary)]' : 'bg-[var(--border)]'}`} />
          <div className={`h-1 transition-all ${step >= 3 ? 'bg-[var(--text-primary)]' : 'bg-[var(--border)]'}`} />
        </div>

        {/* Step 1: Academics */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-[var(--text-primary)] font-sans">
              1. Academic Background
            </h4>
            <div className="space-y-1.5">
              <label htmlFor="modal-stream" className="text-xs font-mono text-[var(--text-secondary)] uppercase">
                Field of Study / Major
              </label>
              <select
                id="modal-stream"
                value={profile.stream}
                onChange={(e) => setProfile({ ...profile, stream: e.target.value })}
                className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm px-3.5 py-2.5 outline-none focus:border-[var(--border-active)] cursor-pointer"
              >
                <option value="Engineering & Computing">Engineering & Computing</option>
                <option value="Medical & Life Sciences">Medical & Life Sciences</option>
                <option value="Commerce & Economics">Commerce & Economics</option>
                <option value="Physical & Natural Sciences">Physical & Natural Sciences</option>
                <option value="Humanities & Social Sciences">Humanities & Social Sciences</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="modal-gpa" className="text-xs font-mono text-[var(--text-secondary)] uppercase">
                Cumulative GPA (4.0 Scale)
              </label>
              <input
                id="modal-gpa"
                type="text"
                value={profile.gpa}
                onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                placeholder="e.g. 3.85"
                className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm px-3.5 py-2.5 font-mono outline-none focus:border-[var(--border-active)]"
              />
              <p className="text-[11px] font-mono text-[var(--text-secondary)]">
                Used to match you with scholarships that have GPA requirements.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Demographic & Criteria Tags */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-[var(--text-primary)] font-sans">
              2. Background & Eligibility
            </h4>
            <p className="text-xs text-[var(--text-secondary)] font-sans">
              Select all that apply to you. These help unlock scholarships reserved for specific student communities.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                'STEM Priority',
                'First-Gen College',
                'Need-Based Priority',
                'Underrepresented Cohort',
                'Regional / In-State',
                'Research Published',
                'Community Leadership',
                'Military Dependent'
              ].map((tag) => {
                const active = profile.demographics.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleDemoTag(tag)}
                    aria-pressed={active}
                    className={`p-2.5 text-xs text-left border font-mono transition-all cursor-pointer ${
                      active
                        ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] border-[var(--accent-primary)] font-semibold'
                        : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-hover)]'
                    }`}
                  >
                    {active ? '✓ ' : '+ '} {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Funding Goals & Horizon */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-[var(--text-primary)] font-sans">
              3. Goals & Timeline
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="modal-target-goal" className="text-xs font-mono text-[var(--text-secondary)] uppercase">
                  Target Funding
                </label>
                <select
                  id="modal-target-goal"
                  value={profile.targetGoal}
                  onChange={(e) => setProfile({ ...profile, targetGoal: e.target.value })}
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm px-3 py-2 outline-none cursor-pointer"
                >
                  <option value="$10,000+">$10,000+</option>
                  <option value="$25,000+">$25,000+</option>
                  <option value="$50,000+">$50,000+</option>
                  <option value="Max Available">Max Available</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="modal-timeline" className="text-xs font-mono text-[var(--text-secondary)] uppercase">
                  Deadline Window
                </label>
                <select
                  id="modal-timeline"
                  value={profile.timeline}
                  onChange={(e) => setProfile({ ...profile, timeline: e.target.value })}
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm px-3 py-2 outline-none cursor-pointer"
                >
                  <option value="Within 30 Days">Within 30 Days</option>
                  <option value="Within 60 Days">Within 60 Days</option>
                  <option value="Next Semester">Next Semester</option>
                </select>
              </div>
            </div>

            {/* Match Summary Card */}
            <div className="p-4 bg-[var(--surface-elevated)] border border-[var(--border)] mt-4">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[var(--text-secondary)] uppercase">Match Summary</span>
                <span className="text-[var(--text-primary)] font-semibold">Ready to Apply</span>
              </div>
              <div className="text-2xl font-mono font-bold text-[var(--text-primary)]">
                6 Matching Scholarships Found
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans">
                Estimated total available funding: <span className="font-mono font-semibold text-[var(--text-primary)]">$48,500</span>
              </p>
            </div>
          </div>
        )}

        {/* Modal Action Controls */}
        <div className="flex items-center justify-between pt-5 mt-6 border-t border-[var(--border)]">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-2 bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              className="inline-flex items-center gap-1.5 text-xs font-mono px-4 py-2 bg-[var(--accent-primary)] text-[var(--accent-text)] font-semibold hover:opacity-90"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 bg-[var(--accent-primary)] text-[var(--accent-text)] font-bold hover:opacity-90"
            >
              <span>Enter Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
