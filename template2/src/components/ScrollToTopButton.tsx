import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SCROLL_THRESHOLD_PX = 200
const IDLE_TIMEOUT_MS = 3000
const IDLE_CHECK_INTERVAL_MS = 400

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const lastActivityRef = useRef(Date.now())

  const checkScroll = useCallback(() => {
    setVisible(window.scrollY > SCROLL_THRESHOLD_PX)
  }, [])

  const markActive = useCallback(() => {
    lastActivityRef.current = Date.now()
    setIsIdle(false)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      checkScroll()
      markActive()
    }
    checkScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [checkScroll, markActive])

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    events.forEach((ev) => {
      window.addEventListener(ev, markActive, { passive: true })
    })
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, markActive))
    }
  }, [markActive])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastActivityRef.current >= IDLE_TIMEOUT_MS) {
        setIsIdle(true)
      }
    }, IDLE_CHECK_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const showButton = visible && !isIdle

  const button = (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed left-4 sm:left-6 bottom-6 sm:bottom-8 z-50 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#C9A978] text-navy shadow-lg border border-gold/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )

  return createPortal(button, document.body)
}
