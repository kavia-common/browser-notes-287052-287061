import React from 'react';

/**
 * Header displays the app title and provides a theme toggle button.
 *
 * Props:
 * - theme: 'light' | 'dark'
 * - onToggleTheme: () => void
 *
 * PUBLIC_INTERFACE
 */
export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="app-header-bar" role="banner">
      <h1 className="app-title">Notes</h1>
      <button
        className="btn btn-primary theme-toggle-btn"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
}
