import React from 'react';

export default function SavedMetricsBar({ scholarships }) {
  const totalValue = scholarships.reduce((sum, s) => sum + s.amount, 0);
  
  const now = new Date("2026-08-13");
  const urgentCount = scholarships.filter(s => {
    if (s.status === 'Awarded' || s.status === 'Submitted') return false;
    const deadlineDate = new Date(s.deadline);
    const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).length;

  const inProgressCount = scholarships.filter(s => s.status === 'In Progress').length;
  const submittedCount = scholarships.filter(s => s.status === 'Submitted').length;
  const awardedCount = scholarships.filter(s => s.status === 'Awarded').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 text-left">
      
      <div className="p-5 sm:p-6 arch-panel bg-[var(--surface-bg)]">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-2">Total Funding Value</span>
        <div className="text-3xl font-bold font-mono tracking-tight text-[var(--text-primary)]">
          ${totalValue.toLocaleString()}
        </div>
        <p className="mt-2 text-xs text-[var(--text-secondary)] font-sans">Across {scholarships.length} active scholarships</p>
      </div>

      <div className="p-5 sm:p-6 arch-panel bg-[var(--surface-bg)]">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-2">Approaching Deadlines</span>
        <div className="text-3xl font-bold font-mono tracking-tight text-[var(--text-primary)]">
          {urgentCount} <span className="text-base font-normal text-[var(--text-secondary)]">Due in &le; 7 days</span>
        </div>
        <p className="mt-2 text-xs text-[var(--text-secondary)] font-sans">Action required for open applications</p>
      </div>

      <div className="p-5 sm:p-6 arch-panel bg-[var(--surface-bg)]">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-2">Active Applications</span>
        <div className="text-3xl font-bold font-mono tracking-tight text-[var(--text-primary)]">
          {inProgressCount} <span className="text-base font-normal text-[var(--text-secondary)]">In progress</span>
        </div>
        <p className="mt-2 text-xs text-[var(--text-secondary)] font-sans">{submittedCount} Submitted &bull; {awardedCount} Awarded</p>
      </div>

      <div className="p-5 sm:p-6 arch-panel bg-[var(--surface-bg)]">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-2">Average Match Score</span>
        <div className="text-3xl font-bold font-mono tracking-tight text-[var(--text-primary)]">
          94.3%
        </div>
        <p className="mt-2 text-xs text-[var(--text-secondary)] font-sans">Based on your current profile</p>
      </div>

    </div>
  );
}
