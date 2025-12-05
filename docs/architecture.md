# Browser Notes App - Architecture

## System Overview
Browser Notes is a single-page React application that runs entirely on the client. There is no backend or database; all data is persisted using the browser’s localStorage. The app is optimized for simplicity, fast load times, and a modern, responsive UI.

- Platform: Web
- Framework: React 18 with react-scripts
- Data persistence: localStorage
- Routing: Single-route (no react-router)
- Theming: Light by default with a dark mode toggle persisted in localStorage

## Component Architecture
- App (root)
  - Responsibilities: global theme control, notes CRUD, wiring child components.
  - Children:
    - Header: app title and theme toggle.
    - NoteForm: create/edit notes form.
    - NotesList: list/grid of notes with edit/delete actions.

- Header
  - Displays the application title.
  - Theme toggle button that switches between light/dark modes.

- NoteForm
  - Controlled inputs for title and content.
  - Save to create new or update the currently edited note.
  - Cancel to clear the form and exit edit mode.

- NotesList
  - Renders notes in a responsive grid.
  - Provides edit and delete actions for each note.

### Modal/Edit Patterns
- The application uses an inline editing pattern through NoteForm, populated with the selected note. There is no modal; instead, the form scrolls into view on edit to improve UX on small screens.

## State Management Strategy
- React state/hooks are used throughout, avoiding external state libraries.
- The useLocalStorage hook provides resilient read/write to localStorage and JSON serialization.

Example usage in App:
```javascript
const [notes, setNotes] = useLocalStorage('notes.v1', []);
const [themeLS, setThemeLS] = useLocalStorage('theme.v1', 'light');
```

## Data Model
- Note
  - id: string (e.g., `${timestamp}-${randomSuffix}`)
  - title: string
  - content: string
  - updatedAt: number (epoch ms)

- Keys
  - Notes: `notes.v1`
  - Theme: `theme.v1`

- Versioning
  - The `.v1` suffix allows future migrations. A separate version key (e.g., `notes.version`) can be added later if schema changes require migration steps.

## Persistence Layer Abstraction
A lightweight adapter exists as a React hook: `src/hooks/useLocalStorage.js`. It handles:
- JSON serialization/deserialization.
- SSR-safe checks for `window`.
- Parse error fallback to initial values.
- Silent handling of write failures (e.g., quota exceeded).

Example read/write wrapper:
```javascript
export function useLocalStorage(key, initialValue) {
  const readValue = () => {
    if (typeof window === 'undefined') return getInitial();
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return getInitial();
      return JSON.parse(item);
    } catch {
      return getInitial();
    }
  };
  const getInitial = () => (typeof initialValue === 'function' ? initialValue() : initialValue);
  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore quota/storage errors
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
```

## Error Handling
- JSON parse errors: fall back to the provided initial value.
- QuotaExceededError or storage unavailability: writes are wrapped in try/catch and ignored; app continues functioning with in-memory state (until reload).
- Date formatting failures: NotesList gracefully falls back to `toLocaleString()` if Intl fails.

## Theming and Styling
- Light theme with optional dark mode via `data-theme` attribute on `document.documentElement`.
- CSS variables defined in `src/App.css`:
  - Primary: `#3b82f6`
  - Accent/Success: `#06b6d4`
  - Error: `#EF4444`
  - Background: `#f9fafb`
  - Surface: `#ffffff`
  - Text: `#111827`
- Dark mode overrides background/surface/text while retaining brand colors.

## Routing
- Single-route approach with no client-side router.
- All features are available on the root path.

## Performance Considerations
- Minimal dependencies keep bundle size small.
- Avoided heavy UI libraries; pure CSS for styling.
- Sorting and rendering are efficient for small/medium lists.
- Debouncing saves is not currently required since writes occur on explicit actions (Submit). If a live autosave is introduced, debounce/throttle should be added.

## Security and Privacy
- All data is stored locally on the user’s device; nothing is transmitted over the network.
- Data is unencrypted in localStorage and may be visible to anyone with access to the device/browser profile.
- Recommend users avoid storing sensitive PII or secrets.

## Testing Strategy Outline
- Unit tests:
  - useLocalStorage hook: read/write behavior, parse fallback.
  - App interactions: render baseline elements, form submission adds a note.
  - Components: Header renders and toggles theme; NoteForm handles controlled inputs; NotesList renders and triggers callbacks.
- Integration/E2E (future):
  - Add/edit/delete flows persist across reloads.
  - Theme persistence across reloads.
  - Optional: accessibility checks (axe) for key screens.

## Environment Variables Usage
- Current usage: None required for core functionality.
- Available variables (not used in v1):
  - REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL, REACT_APP_WS_URL,
    REACT_APP_NODE_ENV, REACT_APP_NEXT_TELEMETRY_DISABLED, REACT_APP_ENABLE_SOURCE_MAPS,
    REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL, REACT_APP_HEALTHCHECK_PATH,
    REACT_APP_FEATURE_FLAGS, REACT_APP_EXPERIMENTS_ENABLED
- Future potential:
  - Feature flags (e.g., enabling search or import/export).
  - Logging verbosity.
  - Build-time options like source maps.

## Future Work and Recommendations
- Add optional search/filter bar.
- Export/import notes as JSON to mitigate localStorage limitations and data loss.
- Add soft validation and non-blocking toast notifications for storage errors.
- Consider a storage version key to enable smooth migrations if the data model evolves.

---
Sources:
- frontend_notes_app/src/App.js
- frontend_notes_app/src/components/Header.js
- frontend_notes_app/src/components/NoteForm.js
- frontend_notes_app/src/components/NotesList.js
- frontend_notes_app/src/hooks/useLocalStorage.js
- frontend_notes_app/src/App.css
