import React from 'react';

/**
 * Header displays the app title and provides a theme toggle button and search input.
 *
 * Props:
 * - theme: 'light' | 'dark'
 * - onToggleTheme: () => void
 * - search: string
 * - onSearchChange: (value: string) => void
 *
 * PUBLIC_INTERFACE
 */
export default function Header({ theme, onToggleTheme, search = '', onSearchChange = () => {} }) {
  return (
    <header className="app-header-bar" role="banner">
      <div className="header-left">
        <h1 className="app-title">Notes</h1>
      </div>
      <div className="header-center" role="search">
        <label htmlFor="search-notes" className="visually-hidden">
          Search notes
        </label>
        <input
          id="search-notes"
          className="input search-input"
          type="search"
          placeholder="Search notes…"
          aria-label="Search notes"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="header-right">
        <button
          className="btn btn-primary theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}
