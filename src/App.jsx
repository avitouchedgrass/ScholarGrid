import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SavedPage from './components/SavedPage';
import ProfilePage from './components/ProfilePage';
import ExplorePage from './components/ExplorePage';
import FilterTab from './components/FilterTab';
import LandingPage from './components/landing/LandingPage';
import { INITIAL_SAVED_SCHOLARSHIPS } from './data/mockData';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'app'
  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'filters' | 'profile' | 'explore'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('scholargrid_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });
  const [scholarships, setScholarships] = useState(INITIAL_SAVED_SCHOLARSHIPS);

  // Filter state lift
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEffort, setSelectedEffort] = useState('All');
  const [minMatchScore, setMinMatchScore] = useState(50);
  const [sortBy, setSortBy] = useState('match');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('scholargrid_theme', theme);
    } catch {
      // ignore storage access restriction in private browsing
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleSaveScholarship = (newScholarship) => {
    if (!scholarships.some(s => s.id === newScholarship.id)) {
      setScholarships(prev => [newScholarship, ...prev]);
    }
    setActiveTab('saved');
  };

  const handleEnterApp = (customProfile) => {
    if (customProfile) {
      // Transition with custom profile criteria
      if (customProfile.gpa) {
        const parsedGpa = parseFloat(customProfile.gpa);
        if (!isNaN(parsedGpa)) {
          setMinMatchScore(Math.min(90, Math.max(50, Math.round(parsedGpa * 22))));
        }
      }
    }
    setViewMode('app');
    setActiveTab('explore');
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage
        theme={theme}
        toggleTheme={toggleTheme}
        onEnterApp={handleEnterApp}
      />
    );
  }

  return (
    <div className="min-h-screen arch-grid-bg text-[var(--text-primary)] transition-colors duration-200">
      
      {/* Return to Landing Page banner */}
      <div className="bg-[var(--surface-bg)] border-b border-[var(--border)] px-4 py-2 flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
        <button
          type="button"
          onClick={() => setViewMode('landing')}
          className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>
      </div>

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        totalValue={scholarships.reduce((sum, s) => sum + s.amount, 0)}
      />

      <main>
        {activeTab === 'saved' && (
          <SavedPage
            scholarships={scholarships}
            setScholarships={setScholarships}
            searchQuery={searchQuery}
            selectedEffort={selectedEffort}
            minMatchScore={minMatchScore}
            sortBy={sortBy}
            onOpenFilters={() => setActiveTab('filters')}
          />
        )}

        {activeTab === 'filters' && (
          <FilterTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedEffort={selectedEffort}
            setSelectedEffort={setSelectedEffort}
            minMatchScore={minMatchScore}
            setMinMatchScore={setMinMatchScore}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onApplyAndGoToList={() => setActiveTab('saved')}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage readinessScore={85} />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            savedScholarships={scholarships}
            onSaveScholarship={handleSaveScholarship}
          />
        )}
      </main>

    </div>
  );
}
