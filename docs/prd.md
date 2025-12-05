# Browser Notes App - Product Requirements Document (PRD)

## Overview
Browser Notes is a lightweight, frontend-only React application that lets users create, edit, and delete personal notes. All data is stored locally in the browser using localStorage. The app is designed to be fast, responsive, and privacy-friendly, requiring no backend or user authentication. The visual style follows a light theme with modern accents using the primary color #3b82f6 and complementary accent #06b6d4.

## Goals
- Provide a frictionless notes experience fully in the browser with local persistence.
- Keep the UI simple and responsive with an accessible baseline.
- Maintain fast load times by using minimal dependencies and a small bundle.
- Support basic theming (light/dark) and persist the theme preference locally.

## Non-Goals
- Multi-device sync, cloud backup, or server-side storage.
- User authentication, roles, or sharing.
- Real-time collaboration or presence indicators.
- Advanced note features such as attachments, reminders, tags, or rich text editing.

## User Stories and Acceptance Criteria

### 1) Create a note
- As a user, I can type a title and content in the form and save a new note.
- Acceptance criteria:
  - The “Save” button is enabled when there is a non-empty title or content.
  - On save, the note is added to the list and the form clears.
  - The note shows an “updated at” timestamp and appears at the top of the list.

### 2) Edit a note
- As a user, I can edit an existing note’s title and content.
- Acceptance criteria:
  - Clicking “Edit” for a note populates the form with its data.
  - Submitting updates persists changes and reorders the note to the top by “updated at”.
  - “Cancel” exits edit mode and clears the form.

### 3) Delete a note
- As a user, I can delete a note I no longer need.
- Acceptance criteria:
  - Clicking “Delete” prompts the user to confirm.
  - Confirming removes the note from the list and storage.
  - If the note was being edited, editing mode is exited.

### 4) Local persistence
- As a user, I want my notes to remain after closing and reopening the browser.
- Acceptance criteria:
  - Notes are stored via localStorage under a stable storage key (e.g., `notes.v1`).
  - Data persists across page reloads and browser restarts (subject to browser policies).
  - Theme preference (light/dark) persists under `theme.v1`.

### 5) Responsive UI
- As a user on any device, I want the interface to work comfortably.
- Acceptance criteria:
  - The layout adapts from single-column on small screens to a responsive grid on larger screens.
  - Buttons and inputs are comfortably tappable on mobile.

### 6) Basic theming
- As a user, I can switch between light and dark mode.
- Acceptance criteria:
  - A theme toggle in the header switches theme and updates the `data-theme` attribute on the document.
  - The preference persists locally.

### 7) (Optional) Search notes (Future)
- As a user, I want to quickly filter notes by text.
- Acceptance criteria:
  - A search input filters the notes list by title/content in real time.
  - No backend queries are involved.

## Constraints and Assumptions
- No backend of any kind; all data remains on the client.
- Offline-first: The app functions without network connectivity.
- localStorage size is limited (~5–10MB depending on browser).
- Data is unencrypted and stored in plain text in the browser; privacy is limited to the local device and user environment.
- Supported environment variables are currently not required for core functionality.

## Out of Scope
- Cross-device syncing.
- Authentication and user accounts.
- Collaboration or presence indicators.
- Attachments or media uploads.
- Server-rendered pages or hybrid SSR.

## Success Metrics
- Functional:
  - Create, edit, delete flows work reliably.
  - Notes persist across sessions.
- Performance:
  - Initial load is fast (bundle minimal; no heavy dependencies).
- Accessibility:
  - Proper ARIA roles/labels on headers, forms, and lists.
  - Keyboard navigability for core actions.
- Reliability:
  - Graceful handling of localStorage errors (quota, JSON parse).

## Release Plan
- v1.0 (MVP):
  - Notes CRUD with localStorage persistence.
  - Light/dark theme toggle and persistence.
  - Responsive grid layout.
  - Basic unit tests for storage and core components.
- v1.1 (Enhancements - Future Work):
  - Optional search/filter.
  - Import/export notes as JSON.
  - Non-blocking UI polish and accessibility improvements.

## Risks and Mitigations
- localStorage quota exceeded:
  - Mitigation: Catch and ignore write errors; inform users via non-blocking messaging (future enhancement).
- Data loss due to manual storage clearing or private browsing:
  - Mitigation: Document limitations; offer optional export (future).
- Privacy exposure on shared machines:
  - Mitigation: Make it clear that data is local and unencrypted; advise user precautions.
- Browser compatibility differences:
  - Mitigation: Stick to modern APIs with fallbacks where sensible; use defensive JSON parsing.

## Visual Style and Layout
- Theme: Light by default with optional dark mode.
- Colors:
  - Primary: #3b82f6
  - Accent/Success: #06b6d4
  - Error: #EF4444
  - Background: #f9fafb
  - Surface: #ffffff
  - Text: #111827
- Layout:
  - Sticky header with app title and theme toggle.
  - Input form card.
  - Responsive notes grid, 1 column on small screens, up to 3 columns on large screens.

## Dependencies and Environment
- React 18, react-scripts build tooling.
- No backend dependencies.
- The following environment variables may exist but are not required for v1 functionality:
  - REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL, REACT_APP_WS_URL,
    REACT_APP_NODE_ENV, REACT_APP_NEXT_TELEMETRY_DISABLED, REACT_APP_ENABLE_SOURCE_MAPS,
    REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL, REACT_APP_HEALTHCHECK_PATH,
    REACT_APP_FEATURE_FLAGS, REACT_APP_EXPERIMENTS_ENABLED.

## References (Implementation Awareness)
- State and persistence:
  - App: notes state and theme with useLocalStorage (`notes.v1`, `theme.v1`).
  - Storage hook: JSON-safe, error-tolerant localStorage wrapper.
- UI components:
  - Header: title and theme toggle.
  - NoteForm: create/edit, save/cancel.
  - NotesList: responsive grid with edit/delete.

---
Sources:
- frontend_notes_app/src/App.js
- frontend_notes_app/src/components/Header.js
- frontend_notes_app/src/components/NoteForm.js
- frontend_notes_app/src/components/NotesList.js
- frontend_notes_app/src/hooks/useLocalStorage.js
- frontend_notes_app/src/App.css
