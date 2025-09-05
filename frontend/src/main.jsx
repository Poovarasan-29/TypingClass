import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import KeyboardGuard from './components/KeyboardGuard.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <KeyboardGuard>
    <App />
  </KeyboardGuard>
  // <Timer />
  // </StrictMode>,
)
