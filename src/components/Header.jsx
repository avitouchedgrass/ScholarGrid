import React from 'react';
import { Database, ListFilter, SlidersHorizontal, Compass, Sun, Moon } from 'lucide-react';
import VoxelCapLogo from './VoxelCapLogo';

export default function Header({ activeTab, setActiveTab, theme, toggleTheme }) {
  return (
    <header className="w-full border-b border-[var(--border)] bg-[var(--canvas-bg)]/90 backdrop-blur-md transition-colors sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center arch-panel bg-[var(--surface-elevated)] border border-[var(--border)] shadow-sm hover:border-[var(--border-hover)] transition-all cursor-pointer overflow-hidden p-0.5">
            <VoxelCapLogo className="w-full h-full" theme={theme} />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] font-mono">
              ScholarGrid
            </h1>
          </div>
        </div>

        {/* Center/Right: Clean Navigation & Theme Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-3 font-mono text-xs">
          <nav className="flex items-center gap-1 arch-panel p-1">
            {[
              { id: 'profile', label: 'Profile', icon: Database },
              { id: 'saved', label: 'Opportunities', icon: ListFilter },
              { id: 'filters', label: 'Filters', icon: SlidersHorizontal },
              { id: 'explore', label: 'Explore', icon: Compass },
            ].map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 transition-all ${
                    isActive
                      ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] font-semibold arch-border'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center arch-panel text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
