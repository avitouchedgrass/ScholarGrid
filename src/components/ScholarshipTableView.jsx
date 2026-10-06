import React from 'react';
import { ShieldCheck, FileText, Trash2 } from 'lucide-react';

export default function ScholarshipTableView({ scholarships, onOpenBreakdown, onOpenWorkspace, onRemove, onStatusChange }) {
  const now = new Date("2026-08-13");

  return (
    <div className="glass-panel overflow-hidden p-2 shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              <th className="py-4 px-6">Match Fit</th>
              <th className="py-4 px-6">Opportunity & Provider</th>
              <th className="py-4 px-6">Award Amount</th>
              <th className="py-4 px-6">Deadline</th>
              <th className="py-4 px-6">Status Pipeline</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs font-medium">
            {scholarships.map((s) => {
              const deadlineDate = new Date(s.deadline);
              const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
              const isUrgent = diffDays >= 0 && diffDays <= 3;

              return (
                <tr key={s.id} className="gsap-table-row hover:bg-white/5 transition-colors group">
                  
                  {/* Match % */}
                  <td className="py-4 px-6">
                    <button
                      onClick={() => onOpenBreakdown(s)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-400 hover:scale-105 transition-transform cursor-pointer"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{s.matchScore}%</span>
                    </button>
                  </td>

                  {/* Title & Provider */}
                  <td className="py-4 px-6">
                    <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-indigo-400 transition-colors">
                      {s.title}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                      {s.provider}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-6 font-extrabold text-amber-400 text-sm">
                    ${s.amount.toLocaleString()}
                  </td>

                  {/* Deadline */}
                  <td className="py-4 px-6">
                    {isUrgent ? (
                      <span className="inline-flex items-center rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 text-xs font-bold text-rose-400">
                        {diffDays === 0 ? 'Today!' : `${diffDays} days left`}
                      </span>
                    ) : (
                      <span className="text-[var(--text-secondary)] font-medium">
                        {s.deadline} ({diffDays}d left)
                      </span>
                    )}
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-4 px-6">
                    <select
                      value={s.status}
                      onChange={(e) => onStatusChange(s.id, e.target.value)}
                      className="glass-input px-3 py-1.5 text-xs font-semibold cursor-pointer focus:outline-none"
                    >
                      <option value="Saved">Saved</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Awarded">Awarded</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onOpenWorkspace(s)}
                        className="rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white px-3 py-1.5 text-xs font-bold transition-all shadow-md"
                      >
                        Workspace
                      </button>
                      <button
                        onClick={() => onRemove(s.id)}
                        className="rounded-xl glass-panel hover:bg-rose-500/20 p-2 text-[var(--text-muted)] hover:text-rose-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
