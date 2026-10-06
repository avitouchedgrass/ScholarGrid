import React from 'react';
import { Compass, Sparkles, PlusCircle, ExternalLink } from 'lucide-react';
import ScholarshipCard from './ScholarshipCard';

export default function ExplorePage({ savedScholarships, onSaveScholarship }) {
  const EXPLORE_SCHOLARSHIPS = [
    {
      id: "sch-exp-01",
      title: "Meta AI & Machine Learning Research Grant",
      provider: "Meta AI & Meta FAIR",
      amount: 20000,
      matchScore: 97,
      deadline: "2026-09-15",
      status: "Saved",
      effortLevel: "High",
      essayCount: 2,
      reqLetterCount: 2,
      tags: ["AI/ML", "Computer Science", "Research", "Undergraduate"],
      verifiedCriteria: [
        { label: "Major: Computer Science / Data Science", passed: true },
        { label: "Minimum GPA: 3.60 (Current: 3.82)", passed: true },
        { label: "Open Source / Portfolio Project Link", passed: true }
      ]
    },
    {
      id: "sch-exp-02",
      title: "Apple Scholars in Technology & Design",
      provider: "Apple Inc. Diversity Team",
      amount: 15000,
      matchScore: 93,
      deadline: "2026-10-01",
      status: "Saved",
      effortLevel: "Med",
      essayCount: 1,
      reqLetterCount: 1,
      tags: ["STEM", "Underrepresented", "Technology"],
      verifiedCriteria: [
        { label: "Major: Computer Engineering", passed: true },
        { label: "Underrepresented Minority in Tech", passed: true }
      ]
    }
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-sans">
          Explore Scholarships
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] mt-1">
          Recommended scholarships matching your background and intended major.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {EXPLORE_SCHOLARSHIPS.map((scholarship) => (
          <div key={scholarship.id} className="arch-panel p-6 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-sans text-base font-bold text-[var(--text-primary)] leading-snug">
                    {scholarship.title}
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-secondary)] mt-1">
                    {scholarship.provider}
                  </p>
                </div>
                <span className="arch-badge font-mono text-xs font-bold px-2.5 py-1 shrink-0">
                  {scholarship.matchScore}% MATCH
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-mono pt-3 border-t border-[var(--border)]">
                <span className="font-bold text-[var(--text-primary)] text-lg">
                  ${scholarship.amount.toLocaleString()}
                </span>
                <span className="text-[var(--text-secondary)]">
                  Deadline: {scholarship.deadline}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSaveScholarship(scholarship)}
              className="w-full bg-[var(--accent-primary)] hover:opacity-90 px-4 py-2.5 text-xs font-mono font-bold text-[var(--accent-text)] flex items-center justify-center gap-1.5 transition-opacity cursor-pointer arch-border"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Save to My Opportunities</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
