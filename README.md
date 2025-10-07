# TalentFlow - Mini Hiring Platform (Prototype)

This is a front-end only React + Vite prototype implementing core flows:
- Jobs (list, create, archive)
- Candidates (virtualized list, profile + timeline)
- Assessments (builder + preview)
- MSW simulates a REST API; persistence is via IndexedDB using Dexie.

How to run (Windows / VS Code):
1. Extract the zip.
2. Open folder in VS Code / terminal.
3. Run:
   ```
   npm install
   npm run dev
   ```
4. Open http://localhost:5173

Notes:
- MSW is started automatically in dev mode. All data is persisted in your browser's IndexedDB.
