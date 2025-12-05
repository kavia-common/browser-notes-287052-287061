import React from 'react';

/**
 * Renders a list of note cards in a responsive grid.
 *
 * Props:
 * - notes: Array<{ id: string, title: string, content: string, updatedAt: number }>
 * - onEdit: (id: string) => void
 * - onDelete: (id: string) => void
 *
 * PUBLIC_INTERFACE
 */
export default function NotesList({ notes, onEdit, onDelete }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <div className="empty-card card">
          <p className="empty-title">No notes yet</p>
          <p className="empty-subtitle">Create your first note using the form above.</p>
        </div>
      </div>
    );
  }

  const formatDate = (ts) => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(ts));
    } catch {
      return new Date(ts).toLocaleString();
    }
  };

  return (
    <section className="notes-list" aria-label="Your notes">
      <div className="grid">
        {notes.map((n) => (
          <article key={n.id} className="note-card card" aria-label={`Note: ${n.title || 'Untitled'}`}>
            <header className="note-card-header">
              <h3 className="note-title">{n.title || 'Untitled'}</h3>
            </header>
            <div className="note-content">
              <p>{n.content || ''}</p>
            </div>
            <footer className="note-footer">
              <span className="note-updated" aria-label="Last updated">
                Last updated: {formatDate(n.updatedAt)}
              </span>
              <div className="note-actions">
                <button className="btn btn-small btn-outline" onClick={() => onEdit(n.id)} aria-label={`Edit ${n.title || 'note'}`}>
                  Edit
                </button>
                <button
                  className="btn btn-small btn-danger"
                  onClick={() => onDelete(n.id)}
                  aria-label={`Delete ${n.title || 'note'}`}
                >
                  Delete
                </button>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
