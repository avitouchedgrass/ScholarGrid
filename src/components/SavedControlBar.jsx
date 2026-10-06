import React from 'react';
import { Search, Filter, LayoutGrid, Table, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function SavedControlBar({
  searchQuery,
  setSearchQuery,
  selectedEffort,
  setSelectedEffort,
  minMatchScore,
  setMinMatchScore,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy
}) {
  return (
    <div className="glass-panel p-4 mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 shadow-xl">
      
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search scholarships, providers, or tags (e.g. 'STEM', 'NVIDIA')..."
          className="w-full glass-input pl-10 pr-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)]"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Effort Selector */}
        <div className="flex items-center gap-2 glass-input px-3 py-2">
          <Filter className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          <span className="text-xs font-medium text-[var(--text-muted)] hidden sm:inline">Effort:</span>
          <select
            value={selectedEffort}
            onChange={(e) => setSelectedEffort(e.target.value)}
            className="bg-transparent text-xs font-semibold text-[var(--text-primary)] focus:outline-none cursor-pointer"
          >
            <option value="All">All Load</option>
            <option value="Low">Low Effort (0 essays)</option>
            <option value="Med">Med Effort (1 essay)</option>
            <option value="High">High Effort (2+ essays)</option>
          </select>
        </div>

        {/* Min Match Slider */}
        <div className="flex items-center gap-2.5 glass-input px-3 py-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Match &ge; {minMatchScore}%</span>
          <input
            type="range"
            min="50"
            max="95"
            step="5"
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(Number(e.target.value))}
            className="w-20 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 glass-input px-3 py-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-xs font-semibold text-[var(--text-primary)] focus:outline-none cursor-pointer"
          >
            <option value="match">Sort by Match %</option>
            <option value="amount">Sort by Award $</option>
            <option value="deadline">Sort by Deadline</option>
          </select>
        </div>

        {/* View Mode Toggle Pills */}
        <div className="flex items-center glass-pill p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'grid'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'table'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            title="Table View"
          >
            <Table className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Table</span>
          </button>

          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'kanban'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            title="Kanban Pipeline"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 inline-block" />
            <span className="hidden sm:inline">Kanban</span>
          </button>
        </div>

      </div>

    </div>
  );
}
