import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function MatchBreakdownDrawer({ scholarship, onClose, onOpenWorkspace }) {
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!scholarship) return;

    // Smooth Backdrop and Drawer Entrance
    gsap.fromTo(backdropRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.2, ease: 'power2.out' }
    );

    gsap.fromTo(drawerRef.current, 
      { x: '100%' }, 
      { x: '0%', duration: 0.3, ease: 'power3.out' }
    );
  }, [scholarship]);

  const handleClose = () => {
    gsap.to(drawerRef.current, {
      x: '100%',
      duration: 0.22,
      ease: 'power3.in',
      onComplete: onClose
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.18
    });
  };

  if (!scholarship) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          ref={drawerRef}
          className="w-screen max-w-lg arch-panel bg-[var(--surface-bg)] border-l border-[var(--border)] shadow-2xl flex flex-col justify-between"
        >
          
          {/* Top Header */}
          <div className="p-6 border-b border-[var(--border)] bg-[var(--surface-elevated)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="arch-badge flex items-center gap-1 px-2.5 py-1 font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{scholarship.matchScore}% MATCH</span>
                </span>
                <span className="text-xs font-mono text-[var(--text-secondary)] font-semibold">Eligibility Breakdown</span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close drawer"
                className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] arch-border bg-[var(--surface-bg)] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <h2 className="font-sans text-xl font-bold text-[var(--text-primary)] mt-4 leading-snug tracking-tight">
              {scholarship.title}
            </h2>
            <p className="text-xs font-mono text-[var(--text-secondary)] mt-1">
              Provided by {scholarship.provider}
            </p>

            {/* Quick Specs Grid */}
            <div className="mt-4 grid grid-cols-3 gap-2 bg-[var(--surface-bg)] arch-border p-3 text-xs font-mono">
              <div>
                <span className="text-[var(--text-secondary)] block text-xs uppercase">Award Amount</span>
                <span className="font-bold text-[var(--text-primary)] text-sm">${scholarship.amount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[var(--text-secondary)] block text-xs uppercase">Effort Level</span>
                <span className="text-[var(--text-secondary)] font-medium">{scholarship.effortLevel}</span>
              </div>
              <div>
                <span className="text-[var(--text-secondary)] block text-xs uppercase">Deadline</span>
                <span className="text-[var(--text-secondary)] font-medium">{scholarship.deadline}</span>
              </div>
            </div>
          </div>

          {/* Body Content: Verification List with Point Weights */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-sans text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--text-primary)]" />
                  Eligibility Requirements
                </h3>
                <span className="text-xs font-mono text-[var(--text-primary)] font-semibold">
                  {scholarship.verifiedCriteria.filter(c => c.passed).length} / {scholarship.verifiedCriteria.length} Met
                </span>
              </div>

              <div className="space-y-3">
                {scholarship.verifiedCriteria.map((item, idx) => {
                  const weight = idx === 0 ? '+35% Major' : idx === 1 ? '+25% GPA' : idx === 2 ? '+20% Category' : '+20% Open Status';

                  return (
                    <div 
                      key={idx}
                      className={`p-3.5 arch-border text-xs font-mono transition-colors ${
                        item.passed
                          ? 'bg-[var(--surface-bg)] text-[var(--text-primary)]'
                          : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          {item.passed ? (
                            <CheckCircle2 className="h-4 w-4 text-[var(--text-primary)] flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-[var(--text-secondary)] flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="font-semibold text-[var(--text-primary)]">{item.label}</div>
                            {item.note && (
                              <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans">
                                {item.note}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Weight Badge */}
                        <span className="text-xs font-mono px-2 py-0.5 arch-badge flex-shrink-0">
                          {weight}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Target Tags Alignment */}
            <div>
              <h3 className="font-sans text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2 font-mono">
                Demographic & Academic Tag Alignment
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {scholarship.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[var(--surface-elevated)] arch-border px-2.5 py-1 text-xs font-mono text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Call to Action */}
          <div className="p-6 border-t border-[var(--border)] bg-[var(--surface-elevated)] flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                handleClose();
                onOpenWorkspace(scholarship);
              }}
              className="flex-1 bg-[var(--accent-primary)] hover:opacity-90 px-4 py-2.5 text-xs font-mono font-bold text-[var(--accent-text)] transition-opacity flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Open Application Workspace</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
