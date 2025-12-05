import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import { useLocalStorage } from './hooks/useLocalStorage';

/**
 * Root application component for the Notes app.
 * Manages:
 * - theme (persisted to localStorage 'theme.v1' if available)
 * - notes CRUD lifecycle with persistence in localStorage under 'notes.v1'
 * - editing state
 *
 * PUBLIC_INTERFACE
 */
function App() {
  // Theme management with persistence
  const [themeLS, setThemeLS] = useLocalStorage('theme.v1', 'light');
  const [theme, setTheme] = useState(themeLS || 'light');

  useEffect(() => {
    setThemeLS(theme);
  }, [theme, setThemeLS]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  // Notes state persisted to localStorage
  const [notes, setNotes] = useLocalStorage('notes.v1', []);
  const [editingId, setEditingId] = useState(null);

  const editingNote = useMemo(
    () => notes.find((n) => n.id === editingId) || null,
    [notes, editingId]
  );

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const handleSaveNote = (partial) => {
    const now = Date.now();
    // If editing: update existing
    if (partial.id) {
      setNotes((prev) =>
        prev
          .map((n) => (n.id === partial.id ? { ...n, title: partial.title, content: partial.content, updatedAt: now } : n))
          .sort((a, b) => b.updatedAt - a.updatedAt)
      );
      setEditingId(null);
      return;
    }
    // Create new
    const id = `${now}-${Math.random().toString(36).slice(2, 8)}`;
    const newNote = {
      id,
      title: partial.title,
      content: partial.content,
      updatedAt: now,
    };
    setNotes((prev) => [newNote, ...prev].sort((a, b) => b.updatedAt - a.updatedAt));
  };

  // PUBLIC_INTERFACE
  const handleCancel = () => {
    setEditingId(null);
  };

  // PUBLIC_INTERFACE
  const handleEdit = (id) => {
    setEditingId(id);
    // Scroll to form for better UX on small screens
    const formSection = document.querySelector('.note-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // PUBLIC_INTERFACE
  const handleDelete = (id) => {
    const note = notes.find((n) => n.id === id);
    const name = note?.title || 'this note';
    if (window.confirm(`Delete ${name}? This action cannot be undone.`)) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  return (
    <div className="App">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="container" role="main">
        <NoteForm initialNote={editingNote} onSave={handleSaveNote} onCancel={handleCancel} />

        <NotesList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      <footer className="app-footer" role="contentinfo" aria-label="Footer">
        <small>Browser-only Notes • Data stored locally in your browser</small>
      </footer>
    </div>
  );
}

export default App;
