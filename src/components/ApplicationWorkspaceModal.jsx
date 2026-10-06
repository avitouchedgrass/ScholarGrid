import React, { useState, useEffect } from 'react';
import { X, CheckSquare, Square, Save, Paperclip, MessageSquare } from 'lucide-react';
import { MOCK_ESSAYS } from '../data/mockData';

export default function ApplicationWorkspaceModal({ scholarship, onClose, onSaveWorkspace }) {
  if (!scholarship) return null;

  const [checklists, setChecklists] = useState(scholarship.workspace?.checklists || []);
  const [notes, setNotes] = useState(scholarship.workspace?.notes || '');
  const [attachedEssayId, setAttachedEssayId] = useState(scholarship.workspace?.attachedEssayId || '');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const toggleChecklist = (id) => {
    setChecklists(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleSave = () => {
    onSaveWorkspace(scholarship.id, {
      checklists,
      notes,
      attachedEssayId
    });
    onClose();
  };

  const completedCount = checklists.filter(c => c.completed).length;
  const progressPercent = checklists.length > 0 ? Math.round((completedCount / checklists.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs modal-backdrop-animate">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="workspace-title"
        className="relative w-full max-w-2xl arch-panel bg-[var(--surface-bg)] border border-[var(--border-active)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] modal-panel-animate"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[var(--border)] bg-[var(--surface-elevated)] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="arch-badge px-2 py-0.5 font-bold">
                {scholarship.matchScore}% MATCH
              </span>
              <span className="text-xs font-mono text-[var(--text-secondary)] uppercase">
                Application Workspace
              </span>
            </div>
            <h2 id="workspace-title" className="text-lg font-bold text-[var(--text-primary)] mt-1 font-sans">
              {scholarship.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close workspace"
            className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] arch-border bg-[var(--surface-bg)] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-5 py-3 bg-[var(--surface-bg)] border-b border-[var(--border)] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-secondary)]">Checklist Progress:</span>
            <span className="text-[var(--text-primary)] font-bold">{completedCount}/{checklists.length} Tasks ({progressPercent}%)</span>
          </div>
          <div className="w-36 h-2 bg-[var(--surface-elevated)] arch-border overflow-hidden">
            <div 
              className="h-full bg-[var(--accent-primary)] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Checklist Tasks */}
          <div>
            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
              <CheckSquare className="h-4 w-4 text-[var(--text-primary)]" />
              Required Steps & Attachments
            </h3>

            <div className="space-y-2">
              {checklists.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleChecklist(task.id)}
                  role="checkbox"
                  aria-checked={task.completed}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') toggleChecklist(task.id);
                  }}
                  className={`flex items-center gap-3 p-3 arch-border text-xs font-mono cursor-pointer transition-all duration-150 ${
                    task.completed
                      ? 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] line-through opacity-75'
                      : 'bg-[var(--surface-bg)] text-[var(--text-primary)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  {task.completed ? (
                    <CheckSquare className="h-4 w-4 text-[var(--text-primary)] flex-shrink-0" />
                  ) : (
                    <Square className="h-4 w-4 text-[var(--text-secondary)] flex-shrink-0" />
                  )}
                  <span>{task.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Essay Library Linking */}
          <div>
            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
              <Paperclip className="h-4 w-4 text-[var(--text-primary)]" />
              Attach Essay from Library
            </h3>

            <select
              value={attachedEssayId}
              onChange={(e) => setAttachedEssayId(e.target.value)}
              className="w-full bg-[var(--surface-elevated)] arch-border px-3 py-2 text-xs font-mono text-[var(--text-primary)] focus:border-[var(--border-active)] outline-none cursor-pointer"
            >
              <option value="">-- No Essay Attached --</option>
              {MOCK_ESSAYS.map((essay) => (
                <option key={essay.id} value={essay.id} className="bg-[var(--surface-bg)] text-[var(--text-primary)]">
                  {essay.title} ({essay.wordCount} words)
                </option>
              ))}
            </select>
          </div>

          {/* Application Notes */}
          <div>
            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
              <MessageSquare className="h-4 w-4 text-[var(--text-primary)]" />
              Application Notes & Reminders
            </h3>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add personal notes, follow-up dates, professor email threads..."
              className="w-full bg-[var(--surface-elevated)] arch-border p-3 text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--border-active)] outline-none resize-none"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-elevated)] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="arch-border bg-[var(--surface-bg)] px-4 py-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-[var(--accent-primary)] hover:opacity-90 px-4 py-2 text-xs font-mono font-bold text-[var(--accent-text)] flex items-center gap-1.5 transition-opacity"
          >
            <Save className="h-4 w-4" />
            <span>Save Workspace Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
}
