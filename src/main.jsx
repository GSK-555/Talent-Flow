import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import { worker } from './mocks/browser'
import { initDB } from './db'

async function start() {
  // Initialize local DB and seed if needed
  await initDB()
  // Start MSW
  if (import.meta.env.MODE !== 'production') {
    await worker.start({quiet: true})
  }
  const root = createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}
start()
