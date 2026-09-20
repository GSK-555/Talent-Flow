# 🌟 TalentFlow

A modern, high-performance applicant tracking and talent management web application built with **React 18**, **Vite**, and **Material-UI (MUI v5)**.

TalentFlow streamlines the modern recruitment lifecycle—from job requisition management and interactive Kanban candidate pipelines to customizable structured hiring assessments.

---

## 🚀 Quick Start

Follow these steps to run TalentFlow locally on your machine.

### Prerequisites

Ensure you have installed:
* **Node.js** (v18 or newer recommended)
* **npm** (comes packaged with Node.js)

### Installation & Development

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
   Open your browser and navigate to **`http://localhost:5173`**.

### Production Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite dev server with Hot Module Replacement (HMR). |
| `npm run build` | Bundles and minifies the application for production into `dist/`. |
| `npm run preview` | Locally serves and previews the production build output. |

---

## 🛠️ Architecture & Tech Stack

TalentFlow uses a modular, component-driven architecture designed for responsive UI, seamless data flow, and fast client-side navigation.

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) | Core UI library for declarative, reactive interfaces. |
| **Build & Tooling** | [Vite](https://vitejs.dev/) | High-speed frontend build tool and HMR dev server. |
| **Design System & UI** | [Material UI (MUI v5)](https://mui.com/) + Emotion | Design system, layout components, and custom design tokens. |
| **Routing** | [React Router v6](https://reactrouter.com/) | Client-side declarative routing and URL parameter management. |
| **Data Architecture** | React Context API + LocalStorage + [Dexie.js](https://dexie.com/) | Centralized talent store with IndexedDB client-side persistence. |
| **Drag & Drop** | [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) | Drag-and-drop Kanban pipeline boards. |
| **List Virtualization** | [react-window](https://github.com/bvaughn/react-window) | Virtualized window rendering for candidate lists. |
| **API Mocking** | [Mock Service Worker (MSW)](https://mswjs.io/) | Client-side service worker intercepting mock endpoints. |
| **Utility** | [uuid](https://github.com/uuidjs/uuid) | Secure, collision-resistant unique ID generation. |

---

## ✨ Core Application Features

### 1. 💼 Jobs Management
* **Job Directory**: Filter jobs by status (`Active`, `Archived`), department, location, or search keyword.
* **Pipeline Metrics**: Visual breakdown of candidate progression across hiring stages for each role.
* **Job Requisition Creation**: Modal dialog for creating new job postings with custom tags, hiring leads, and descriptions.
* **Archive / Reactivate / Delete**: Complete lifecycle management for job requisitions.

### 2. 👥 Candidate Management & Pipeline
* **Kanban Pipeline Board**: Visual drag-and-drop board across key stages:
  * `Applied` ➔ `Screening` ➔ `Interview` ➔ `Offer` ➔ `Hired` (or `Archived`)
* **List & Grid Views**: Toggle between high-density list and visual card grid views with status chips and rating indicators.
* **Deep Filtering & Search**: Instant real-time filtering by candidate name, target role, stage, rating, and tags.
* **Candidate Detail Profiles**: Timeline logs, assessment submissions, interviewer feedback notes, and contact details.

### 3. 📝 Structured Assessments & Evaluations
* **Role-Based Assessments**: Configurable assessments per job role with timed durations, pass criteria, and difficulty levels.
* **Assessment Builder**: Create custom assessments with multiple question types (Multiple Choice, Code Challenge, System Design).
* **Candidate Submissions & Grading**: Review submitted evaluations, verify passing scores, and leave reviewer feedback.

### 4. 🎨 Design & Experience
* **Custom Enterprise Theme**: Tailored typography (Inter font family), modern gradients, glassmorphism app bar, and responsive layout.
* **Persistent State**: Seamless browser persistence for mock records so changes persist across page reloads.

---

## 📁 Project Structure

```
Talent-Flow/
├── public/
│   └── mockServiceWorker.js     # MSW service worker for API mocking
├── src/
│   ├── context/
│   │   └── TalentContext.jsx    # Centralized state provider for jobs, candidates & assessments
│   ├── db/
│   │   └── index.js             # Dexie.js IndexedDB schema and client-side database
│   ├── mocks/
│   │   ├── browser.js           # MSW worker initialization
│   │   └── handlers.js          # REST API request handlers & endpoints
│   ├── pages/
│   │   ├── Jobs.jsx             # Job listings, search, filter, and creation
│   │   ├── JobDetail.jsx        # Detailed job view and candidate stage breakdown
│   │   ├── Candidates.jsx       # Candidate directory and Kanban board
│   │   ├── CandidateDetail.jsx  # Candidate profile, notes, and assessment history
│   │   └── Assessments.jsx      # Assessment dashboard, creation, and submissions
│   ├── App.jsx                  # Main application component, navigation, and router
│   ├── main.jsx                 # Application root with service worker bootstrap
│   ├── styles.css               # Global CSS resets and custom scrollbars
│   └── theme.js                 # Custom Material UI theme configuration
├── index.html                   # HTML template
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite bundler configuration
└── .gitignore                   # Git ignore patterns for dependencies, builds, and logs
```

---

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m "Add some AmazingFeature"`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
