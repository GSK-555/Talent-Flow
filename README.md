# 🌟 TalentFlow Prototype

A modern, high-performance frontend prototype for **TalentFlow**, a hiring management tool. Built with **Vite** and **React**, this prototype features a robust component library (**Material UI**), client-side routing, advanced UI interactions (drag-and-drop, virtualization), and browser-based data persistence via **IndexedDB**.

## 🚀 Quick Start

Follow these simple steps to get the TalentFlow prototype running on your local machine.

### Prerequisites

Ensure you have the following installed:

* **Node.js** (v18+)
* **npm**

### Setup Instructions

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the app in development mode:**
    The app will typically run on **`http://localhost:5173`**.
    ```bash
    npm run dev
    ```

### Production Commands

| Command | Description |
| :--- | :--- |
| `npm run build` | Builds the app for production to the `dist` folder. |
| `npm run preview` | Serves the production build locally for testing. |

---

## 🛠️ Architecture and Stack

The prototype leverages a modern, performance-focused stack to deliver a fast and scalable user experience.

| Category | Tool / Library | Purpose |
| :--- | :--- | :--- |
| **Framework** | **React** (v18) | Core UI library for building dynamic user interfaces. |
| **Build/Tooling** | **Vite** | Fast development server and build tool with quick HMR (Hot Module Replacement). |
| **UI/Styling** | **Material UI (MUI)** | Comprehensive component library and design system for rapid UI development. |
| **Styling Engine** | **Emotion** | High-performance CSS-in-JS library. |
| **Routing** | **React Router** (v6) | Handles declarative client-side navigation. |
| **Data Persistence** | **Dexie.js** (IndexedDB) | Scalable, browser-based data storage for offline/local persistence. |
| **API Mocking** | **Mock Service Worker (MSW)** | Intercepts network requests to mock API responses client-side. |

### Key Technical Decisions

* **Vite + React:** Chosen over alternatives like CRA for superior **startup time** and lightning-fast **HMR**, streamlining the development loop.
* **Material UI:** Enables **rapid prototyping** with a vast library of prebuilt, customizable components and a familiar, professional design language.
* **IndexedDB (Dexie.js):** Provides **scalable client-side persistence**, making it ideal for prototypes that need robust local storage capabilities and potential offline interactions.
* **MSW for API Mocking:** Decouples frontend and backend development, allowing the team to iterate quickly on the UI independently and facilitating robust **unit/integration testing**.

---

## ✨ Features

This prototype includes several advanced features to demonstrate a rich user experience:

* **Interactive Drag-and-Drop:** Implemented using `react-beautiful-dnd` for managing candidates/jobs across stages.
* **High-Performance Views:** **Virtualized lists/views** powered by `react-window` ensure smooth rendering and interaction even with large datasets.
* **State Management:** Utilizes a standard React approach combined with persistence hooks.
* **Unique IDs:** Uses the `uuid` library for reliable, unique resource identification.
* **Client-Side Mocking:** All API requests are intercepted and handled client-side via MSW.

---

## ⚠️ Known Issues and Warnings

Please be aware of the following limitations inherent to the prototype environment:

* **No Backend Dependency:** Data persistence is strictly limited to **browser storage (IndexedDB)**. **Refreshing or resetting the browser may lead to data loss** depending on the Dexie configuration.
* **API Mocking Setup:** Proper functioning of API mocks relies on the correct **service worker registration** in development. Production environments would require a different, dedicated backend solution.
* **Browser Compatibility:** IndexedDB support and performance can vary across **older or less-common browsers**.
* **Port Conflicts:** The default Vite development port is **`5173`**. If this port is occupied, you may need to update the configuration in `vite.config.js`.
