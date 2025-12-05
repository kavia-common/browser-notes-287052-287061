import React, { useEffect, useState } from 'react';

/**
 * A form for creating or editing a note.
 *
 * Props:
 * - initialNote: { id?: string, title: string, content: string } | null
 * - onSave: (note: { id?: string, title: string, content: string }) => void
 * - onCancel: () => void
 *
 * PUBLIC_INTERFACE
 */
export default function NoteForm({ initialNote, onSave, onCancel }) {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');

  useEffect(() => {
    setTitle(initialNote?.title || '');
    setContent(initialNote?.content || '');
  }, [initialNote]);

  const isEditing = Boolean(initialNote?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle && !trimmedContent) {
      // Nothing to save
      return;
    }
    onSave({
      ...(initialNote?.id ? { id: initialNote.id } : {}),
      title: trimmedTitle,
      content: trimmedContent,
    });
    setTitle('');
    setContent('');
  };

  return (
    <section className="note-form-section" aria-label="Note editor">
      <form className="note-form card" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="note-title" className="label">
            Title
          </label>
          <input
            id="note-title"
            className="input"
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Note title"
          />
        </div>
        <div className="form-field">
          <label htmlFor="note-content" className="label">
            Content
          </label>
          <textarea
            id="note-content"
            className="textarea"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            aria-label="Note content"
          />
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-primary" aria-label={isEditing ? 'Update note' : 'Save note'}>
            {isEditing ? 'Update' : 'Save'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setTitle('');
              setContent('');
              onCancel();
            }}
            aria-label="Cancel editing"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
