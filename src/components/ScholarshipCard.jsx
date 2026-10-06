import React from 'react';
import { Calendar, ShieldCheck, Trash2, ArrowUpRight } from 'lucide-react';

export default function ScholarshipCard({
  scholarship,
  onOpenBreakdown,
  onOpenWorkspace,
  onRemove
}) {
  const now = new Date("2026-08-13");
  const deadlineDate = new Date(scholarship.deadline);
  const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
  
  const isUrgent = diffDays >= 0 && diffDays <= 3;
  const isPast = diffDays < 0;

  return (
    <div className="arch-panel p-6 sm:p-7 flex flex-col justify-between text-left group relative transition-colors">
      
      {/* Top Section */}
      <div>
        {/* Provider & Match Fit Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="inline-flex items-center arch-badge px-2.5 py-1 font-mono uppercase tracking-wider">
            {scholarship.provider}
          </span>

          <button
            type="button"
            onClick={() => onOpenBreakdown(scholarship)}
            className="inline-flex items-center gap-1.5 arch-badge px-2.5 py-1 text-xs font-mono font-bold text-[var(--text-primary)] hover:border-[var(--border-active)] transition-colors cursor-pointer"
            title="Click to view Match Breakdown"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{scholarship.matchScore}% Match Fit</span>
          </button>
        </div>

        {/* Big Bold Title */}
        <h3 
          onClick={() => onOpenWorkspace(scholarship)}
          className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors tracking-tight leading-snug cursor-pointer mb-3 font-sans"
        >
          {scholarship.title}
        </h3>

        {/* Spaced Metadata Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs font-mono text-[var(--text-secondary)]">
          {scholarship.tags.map((tag, idx) => (
            <React.Fragment key={idx}>
              <span className="bg-[var(--surface-elevated)] arch-border px-2 py-0.5">{tag}</span>
              {idx < scholarship.tags.length - 1 && <span>&bull;</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom Section: Amount, Deadline, & Action Buttons */}
      <div className="pt-5 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        
        {/* Left: Award Amount & Deadline */}
        <div className="flex items-center gap-6 sm:gap-8">
          <div>
            <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider block mb-0.5">
              Award Amount
            </span>
            <span className="text-2xl font-mono font-bold text-[var(--text-primary)] tracking-tight">
              ${scholarship.amount.toLocaleString()}
            </span>
          </div>

          <div className="h-8 w-px bg-[var(--border)] hidden sm:block" />

          <div>
            <span className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider block mb-0.5">
              Application Deadline
            </span>
            {isPast ? (
              <span className="text-xs font-mono text-[var(--text-secondary)] line-through">
                {scholarship.deadline}
              </span>
            ) : isUrgent ? (
              <span className="text-xs font-mono font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                <span>{diffDays === 0 ? 'Due Today' : `${diffDays}d remaining`}</span>
              </span>
            ) : (
              <span className="text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                <span>{scholarship.deadline} ({diffDays}d)</span>
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onOpenWorkspace(scholarship)}
            className="flex items-center gap-2 bg-[var(--accent-primary)] text-[var(--accent-text)] px-4 py-2 text-xs font-mono font-bold hover:opacity-90 transition-opacity cursor-pointer arch-border"
          >
            <span>Open Workspace</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onRemove(scholarship.id)}
            className="p-2 arch-border bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-pointer"
            title="Remove opportunity"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
