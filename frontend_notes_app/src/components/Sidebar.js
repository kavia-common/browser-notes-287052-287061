import React from 'react';

/**
 * Sidebar provides navigation and quick actions.
 *
 * Props:
 * - collapsed: boolean - whether the sidebar is collapsed (mobile)
 * - onToggleCollapse: () => void
 * - onAddNote: () => void
 * - filters: {
 *     active: 'all' | 'favorites',
 *     onSet: (filterKey: 'all' | 'favorites') => void
 *   }
 * - tags: string[] optional list of tags (not functional if none)
 *
 * PUBLIC_INTERFACE
 */
export default function Sidebar({
  collapsed,
  onToggleCollapse,
  onAddNote,
  filters,
  tags = [],
}) {
  const hasTags = Array.isArray(tags) && tags.length > 0;

  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      aria-label="Side navigation"
    >
      <div className="sidebar-header">
        <button
          className="btn btn-outline btn-small collapse-btn"
          onClick={onToggleCollapse}
          aria-expanded={!collapsed}
          aria-controls="sidebar-sections"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '☰' : '✕'}
        </button>
        <div className="sidebar-brand" role="img" aria-label="Notes logo">
          <span className="logo-circle" aria-hidden="true">📝</span>
          {!collapsed && <span className="brand-text">Notes</span>}
        </div>
      </div>

      <nav id="sidebar-sections" className="sidebar-content">
        {/* Actions */}
        <div className="sidebar-section">
          {!collapsed && <p className="sidebar-section-title">Actions</p>}
          <button
            className="btn btn-primary sidebar-action"
            onClick={onAddNote}
            aria-label="Add a new note"
            title="Add Note"
          >
            + Add Note
          </button>
        </div>

        {/* Filters */}
        <div className="sidebar-section" role="group" aria-label="Filters">
          {!collapsed && <p className="sidebar-section-title">Filters</p>}
          <button
            className={`btn btn-outline sidebar-filter ${filters.active === 'all' ? 'active' : ''}`}
            onClick={() => filters.onSet('all')}
            aria-pressed={filters.active === 'all'}
          >
            All Notes
          </button>
          <button
            className={`btn btn-outline sidebar-filter ${filters.active === 'favorites' ? 'active' : ''}`}
            onClick={() => filters.onSet('favorites')}
            aria-pressed={filters.active === 'favorites'}
            disabled
            title="Favorites not available yet"
          >
            Favorites
          </button>
        </div>

        {/* Tags (optional) */}
        {hasTags && (
          <div className="sidebar-section" role="group" aria-label="Tags">
            {!collapsed && <p className="sidebar-section-title">Tags</p>}
            <div className="tags-list">
              {tags.map((t) => (
                <span key={t} className="tag-chip" aria-label={`Tag ${t}`}>
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}
