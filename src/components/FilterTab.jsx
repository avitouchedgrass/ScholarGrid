import React from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, RefreshCw } from 'lucide-react';

export default function FilterTab({
  searchQuery,
  setSearchQuery,
  selectedEffort,
  setSelectedEffort,
  minMatchScore,
  setMinMatchScore,
  sortBy,
  setSortBy,
  onApplyAndGoToList
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 text-left">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] mb-2 font-sans">
          Filters & Search
        </h1>
        <p className="text-sm font-medium text-[var(--text-secondary)] font-sans">
          Filter scholarships by keywords, match percentage, effort, or deadline.
        </p>
      </div>

      <div className="space-y-8 arch-panel bg-[var(--surface-bg)] p-8">
        
        {/* 1. Keyword Search */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
            Search Keywords
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, organization, or tags (e.g. 'STEM', 'NVIDIA')..."
              className="w-full pl-11 pr-4 py-3 text-sm arch-border bg-[var(--surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--border-active)]"
            />
          </div>
        </div>

        {/* 2. Minimum Match Score Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Minimum Match Score
            </label>
            <span className="text-sm font-bold font-mono text-[var(--text-primary)]">
              {minMatchScore}% Match & Above
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="95"
            step="5"
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)] mt-2">
            <span>50% (Broad)</span>
            <span>70% (Recommended)</span>
            <span>95% (Best Fit)</span>
          </div>
        </div>

        {/* 3. Effort Level & Sort Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
              Application Effort
            </label>
            <select
              value={selectedEffort}
              onChange={(e) => setSelectedEffort(e.target.value)}
              className="w-full py-3 px-4 text-xs font-mono arch-border bg-[var(--surface-elevated)] text-[var(--text-primary)] cursor-pointer outline-none focus:border-[var(--border-active)]"
            >
              <option value="All">All Effort Levels</option>
              <option value="Low">Low Effort (0 Essays)</option>
              <option value="Med">Medium Effort (1 Essay)</option>
              <option value="High">High Effort (2+ Essays)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-3 px-4 text-xs font-mono arch-border bg-[var(--surface-elevated)] text-[var(--text-primary)] cursor-pointer outline-none focus:border-[var(--border-active)]"
            >
              <option value="match">Highest Match Score</option>
              <option value="amount">Highest Award Amount</option>
              <option value="deadline">Nearest Deadline</option>
            </select>
          </div>
        </div>

        {/* Reset & Apply Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[var(--border)] gap-4">
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedEffort('All');
              setMinMatchScore(50);
              setSortBy('match');
            }}
            className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>

          <button
            type="button"
            onClick={onApplyAndGoToList}
            className="px-6 py-2.5 arch-border bg-[var(--accent-primary)] text-[var(--accent-text)] font-mono font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            Apply Filters & View Scholarships
          </button>
        </div>

      </div>
    </div>
  );
}
