import React from 'react';
import ScholarshipCard from './ScholarshipCard';
import { ChevronRight, ChevronLeft, CheckCircle2, Clock, Bookmark, Award } from 'lucide-react';

const KANBAN_COLUMNS = [
  { id: 'Saved', title: 'Saved', color: 'text-[var(--text-secondary)]', icon: Bookmark },
  { id: 'In Progress', title: 'In Progress', color: 'text-indigo-400', icon: Clock },
  { id: 'Submitted', title: 'Submitted', color: 'text-cyan-400', icon: CheckCircle2 },
  { id: 'Awarded', title: 'Awarded', color: 'text-emerald-400', icon: Award }
];

export default function ScholarshipKanbanView({
  scholarships,
  onOpenBreakdown,
  onOpenWorkspace,
  onRemove,
  onStatusChange
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {KANBAN_COLUMNS.map((col) => {
        const colScholarships = scholarships.filter((s) => s.status === col.id);
        const colTotalSum = colScholarships.reduce((sum, s) => sum + s.amount, 0);
        const IconComp = col.icon;

        return (
          <div key={col.id} className="glass-panel p-5 flex flex-col min-h-[550px] shadow-2xl">
            
            {/* Column Header */}
            <div className="pb-4 mb-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconComp className={`h-4 w-4 ${col.color}`} />
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  {col.title}
                </h4>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold text-[var(--text-secondary)]">
                  {colScholarships.length}
                </span>
              </div>

              <span className="text-xs font-extrabold text-amber-400">
                ${colTotalSum.toLocaleString()}
              </span>
            </div>

            {/* Cards List */}
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[700px] pr-1">
              {colScholarships.length === 0 ? (
                <div className="h-36 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center p-4">
                  <p className="text-xs text-[var(--text-muted)]">No applications in {col.title}</p>
                </div>
              ) : (
                colScholarships.map((scholarship) => (
                  <div key={scholarship.id} className="relative group">
                    <ScholarshipCard
                      scholarship={scholarship}
                      onOpenBreakdown={onOpenBreakdown}
                      onOpenWorkspace={onOpenWorkspace}
                      onRemove={onRemove}
                      onStatusChange={onStatusChange}
                    />

                    {/* Stage shift controls */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity glass-pill p-1 shadow-lg">
                      {col.id !== 'Saved' && (
                        <button
                          onClick={() => {
                            const prevStatus = col.id === 'In Progress' ? 'Saved' : col.id === 'Submitted' ? 'In Progress' : 'Submitted';
                            onStatusChange(scholarship.id, prevStatus);
                          }}
                          className="p-1 hover:text-indigo-400 text-[var(--text-muted)]"
                          title="Move to Previous Stage"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                        </button>
                      )}

                      {col.id !== 'Awarded' && (
                        <button
                          onClick={() => {
                            const nextStatus = col.id === 'Saved' ? 'In Progress' : col.id === 'In Progress' ? 'Submitted' : 'Awarded';
                            onStatusChange(scholarship.id, nextStatus);
                          }}
                          className="p-1 hover:text-indigo-400 text-[var(--text-muted)]"
                          title="Move to Next Stage"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}
