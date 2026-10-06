import React, { useState, useMemo } from 'react';
import SavedMetricsBar from './SavedMetricsBar';
import ScholarshipCard from './ScholarshipCard';
import MatchBreakdownDrawer from './MatchBreakdownDrawer';
import ApplicationWorkspaceModal from './ApplicationWorkspaceModal';
import { SlidersHorizontal, Plus } from 'lucide-react';

export default function SavedPage({
  scholarships,
  setScholarships,
  searchQuery,
  selectedEffort,
  minMatchScore,
  sortBy,
  onOpenFilters
}) {
  const [selectedBreakdown, setSelectedBreakdown] = useState(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const handleRemove = (id) => {
    setScholarships(prev => prev.filter(s => s.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setScholarships(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleSaveWorkspace = (id, workspaceData) => {
    setScholarships(prev => prev.map(s => s.id === id ? { ...s, workspace: { ...s.workspace, ...workspaceData } } : s));
  };

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((s) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        s.title.toLowerCase().includes(query) ||
        s.provider.toLowerCase().includes(query) ||
        s.tags.some(t => t.toLowerCase().includes(query));
      const matchesEffort = selectedEffort === 'All' || s.effortLevel === selectedEffort;
      const matchesMatchScore = s.matchScore >= minMatchScore;

      return matchesSearch && matchesEffort && matchesMatchScore;
    }).sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
      return 0;
    });
  }, [scholarships, searchQuery, selectedEffort, minMatchScore, sortBy]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 text-left">
      
      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-secondary)] block mb-1">
            Application Pipeline
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight font-sans">
            Saved Opportunities
          </h1>
          <p className="text-sm font-medium text-[var(--text-secondary)] mt-2 font-sans">
            Keep track of deadlines, application progress, and requirements in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenFilters}
          className="flex items-center gap-2 arch-border bg-[var(--surface-bg)] px-4 py-3 text-xs font-mono font-bold text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors self-start md:self-auto cursor-pointer"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters & Search</span>
          {(searchQuery || selectedEffort !== 'All' || minMatchScore > 50) && (
            <span className="h-2 w-2 bg-[var(--accent-primary)]" />
          )}
        </button>
      </div>

      {/* 1. Left-aligned Metrics Cards Row */}
      <SavedMetricsBar scholarships={scholarships} />

      {/* Active Filter Pill Status if active */}
      {(searchQuery || selectedEffort !== 'All' || minMatchScore > 50) && (
        <div className="mb-6 p-4 arch-border bg-[var(--surface-bg)] flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 font-medium text-[var(--text-secondary)]">
            <span>Active Filters:</span>
            {searchQuery && <span className="text-[var(--text-primary)]">"{searchQuery}"</span>}
            {selectedEffort !== 'All' && <span className="text-[var(--text-primary)]">&bull; {selectedEffort} Effort</span>}
            {minMatchScore > 50 && <span className="text-[var(--text-primary)]">&bull; &ge; {minMatchScore}% Match</span>}
          </div>
          <button
            type="button"
            onClick={onOpenFilters}
            className="text-xs font-mono font-bold text-[var(--text-primary)] underline cursor-pointer"
          >
            Edit Filters
          </button>
        </div>
      )}

      {/* 2. Main List View (Single-column, Spacious) */}
      {filteredScholarships.length === 0 ? (
        <div className="p-16 arch-panel bg-[var(--surface-bg)] text-center my-8">
          <p className="text-base font-semibold text-[var(--text-secondary)] mb-4 font-sans">
            No saved scholarships match your current search or filter criteria.
          </p>
          <button
            type="button"
            onClick={onOpenFilters}
            className="px-6 py-3 arch-border bg-[var(--accent-primary)] text-[var(--accent-text)] font-bold font-mono text-xs cursor-pointer hover:opacity-90 transition-opacity"
          >
            Adjust Filter Settings
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onOpenBreakdown={setSelectedBreakdown}
              onOpenWorkspace={setSelectedWorkspace}
              onRemove={handleRemove}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* 3. Match Breakdown Slide-Over Panel */}
      <MatchBreakdownDrawer
        scholarship={selectedBreakdown}
        onClose={() => setSelectedBreakdown(null)}
        onOpenWorkspace={setSelectedWorkspace}
      />

      {/* 4. Application Workspace Modal */}
      <ApplicationWorkspaceModal
        scholarship={selectedWorkspace}
        onClose={() => setSelectedWorkspace(null)}
        onSaveWorkspace={handleSaveWorkspace}
      />

    </div>
  );
}
