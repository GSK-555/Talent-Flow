TalentFlow Prototype
A frontend prototype for TalentFlow, built with Vite and React, leveraging Material UI, React Router, state management, drag-and-drop, and browser-based data persistence.

Setup Instructions
Prerequisites: Make sure Node.js (v18+) and npm are installed.

Install dependencies:
npm install

Run the app in development mode:
npm run dev

Build for production:
npm run build

Preview the production build:
npm run preview

The app runs by default on port 5173.

Entry point: src/main.jsx, with HTML root at public/index.html.

Architecture
Framework and Tooling

Uses React (v18) as the core UI library.

Vite is the build tool and development server for fast HMR.

Material UI (MUI) for components and design system.

React Router (v6) for client-side routing.

Emotion for CSS-in-JS styling.

Dexie.js enables IndexedDB-powered browser persistence for local storage use cases.

Features

Drag-and-drop capability via react-beautiful-dnd.

Virtualized lists/views with react-window for high performance.

Unique ID generation using uuid.

Mocked API requests are handled client-side via Mock Service Worker (msw).

File Structure

Main React code under src/ (components like Jobs.jsx, Candidates.jsx, etc.).

Styling in styles.css.

Service worker and Vite config in project root.

Technical Decisions
Vite + React: Chosen for fast startup, HMR, simplicity over alternatives like CRA.

Material UI: Rapid prototyping with extensive prebuilt components and a familiar design language.

IndexedDB (Dexie.js): Enables scalable client-side persistence, suitable for prototypes and offline interactions.

MSW for API mocking: Allows rapid front-end development independently of backend readiness, and quick unit/integration tests.

React Beautiful DnD & React Window: Provide interactive UX and scalable rendering for large datasets without performance lag.

Known Issues / Warnings
Mock service worker setup: Proper functioning of API mocks depends on correct service worker registration in development; production environments may need different solutions.

No backend: Data persistence is limited to browser storage – refreshing/resetting browser may lose data depending on Dexie config.

Port conflicts: Default Vite port 5173 may require changes in vite.config.js if occupied by other apps.

Browser compatibility: Features like IndexedDB may have varying levels of support in older browsers.
