import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { profile } from './data/links.js'

const MIN_SHOW_MS = 900 // long enough to read, short enough not to feel slow
const MAX_WAIT_MS = 2500 // never block the page on a slow font or image

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = src
  })

async function start() {
  // Hold the preloader until fonts and the avatar are ready, so the page
  // appears complete instead of popping in piece by piece.
  const assets = Promise.all([document.fonts?.ready, preloadImage(profile.avatar)])
  await Promise.all([Promise.race([assets, wait(MAX_WAIT_MS)]), wait(MIN_SHOW_MS - performance.now())])

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )

  const preloader = document.getElementById('preloader')
  if (!preloader) return
  requestAnimationFrame(() => preloader.classList.add('done'))
  preloader.addEventListener('transitionend', () => preloader.remove(), { once: true })
  setTimeout(() => preloader.remove(), 1000) // fallback if transitionend never fires
}

start()
