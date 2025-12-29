import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Prevent browser from restoring scroll position on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// Scroll to top on initial load
window.addEventListener('load', () => {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
})

// Scroll to top immediately
window.scrollTo(0, 0)
document.documentElement.scrollTop = 0
document.body.scrollTop = 0

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

