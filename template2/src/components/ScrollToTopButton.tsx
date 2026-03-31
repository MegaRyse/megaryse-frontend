import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SCROLL_THRESHOLD_PX = 200
const IDLE_TIMEOUT_MS = 3000

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const checkScroll = useCallback(() => {
    setVisible(window.scrollY > SCROLL_THRESHOLD_PX)
  }, [])

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false)
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true)
    }, IDLE_TIMEOUT_MS)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      checkScroll()
      resetIdleTimer()
    }
    checkScroll()
    resetIdleTimer()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [checkScroll, resetIdleTimer])

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart']
    events.forEach((ev) => {
      window.addEventListener(ev, resetIdleTimer, { passive: true })
    })
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetIdleTimer))
    }
  }, [resetIdleTimer])

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
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
