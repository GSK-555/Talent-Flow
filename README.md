# 🌟 TalentFlow

A modern applicant tracking and talent management dashboard built with **React 18**, **Vite**, and **Material-UI (MUI v5)**.

TalentFlow streamlines personal recruitment workflows—from job requisition management and an interactive drag-and-drop Kanban pipeline to candidate evaluations and assessments.

---

## 🚀 Quick Start

Follow these steps to run the project locally:

### Prerequisites

* **Node.js** (v18 or newer recommended)
* **npm**

### Setup & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GSK-555/Talent-Flow.git
   cd Talent-Flow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open **`http://localhost:5173`** in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) | Core UI library |
| **Build Tool** | [Vite](https://vitejs.dev/) | Development server & production bundler |
| **UI Library** | [Material UI (MUI v5)](https://mui.com/) + Emotion | Design system & component styling |
| **Routing** | [React Router v6](https://reactrouter.com/) | Client-side page navigation |
| **State & Storage** | React Context + [Dexie.js](https://dexie.com/) | Centralized store with IndexedDB client-side persistence |
| **Interactions** | [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) | Drag-and-drop Kanban board |
| **List Performance** | [react-window](https://github.com/bvaughn/react-window) | Virtualized list rendering for candidates |
| **API Mocking** | [Mock Service Worker (MSW)](https://mswjs.io/) | In-browser network mocking |

---

## ✨ Features

### 1. 💼 Jobs Management
* Filter jobs by status (`Active`, `Archived`), department, location, or keyword.
* Real-time metrics showing applicant progression through each hiring stage.
* Create new job postings with custom tags, hiring lead, and job descriptions.
* Archive, reactivate, or delete jobs.

### 2. 👥 Candidates & Kanban Pipeline
* **Interactive Kanban Board**: Move candidates across stages (`Applied` ➔ `Screening` ➔ `Interview` ➔ `Offer` ➔ `Hired`).
* **List & Card Views**: Switch between a compact table/list and a visual card view.
* **Search & Filters**: Filter by candidate name, target role, stage, rating, and tags.
* **Detailed Profile View**: Candidate activity timeline, notes, contact details, and assessment records.

### 3. 📝 Assessments & Evaluations
* Configure role-specific assessments with timed durations and pass criteria.
* Create custom assessments with multiple question types (Multiple Choice, Code, System Design).
* Review candidate responses and provide reviewer feedback.

---

## 📁 Project Structure

```
Talent-Flow/
├── public/
│   └── mockServiceWorker.js     # MSW service worker for API mocking
├── src/
│   ├── context/
│   │   └── TalentContext.jsx    # Centralized state provider
│   ├── db/
│   │   └── index.js             # Dexie.js IndexedDB schema
│   ├── mocks/
│   │   ├── browser.js           # MSW worker initialization
│   │   └── handlers.js          # REST API mock handlers
│   ├── pages/
│   │   ├── Jobs.jsx             # Job listings and filters
│   │   ├── JobDetail.jsx        # Single job view with candidate stage breakdown
│   │   ├── Candidates.jsx       # Candidate directory & Kanban board
│   │   ├── CandidateDetail.jsx  # Profile, notes, and assessment history
│   │   └── Assessments.jsx      # Assessment dashboard and builder
│   ├── App.jsx                  # Main application component & routes
│   ├── main.jsx                 # App bootstrap
│   ├── styles.css               # Global styling
│   └── theme.js                 # Custom Material UI theme configuration
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite configuration
└── .gitignore                   # Ignored files
```
