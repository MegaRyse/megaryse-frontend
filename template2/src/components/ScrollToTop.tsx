import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    })
    
    // Also ensure document is scrolled to top
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  // Scroll to top on page reload/initial load
  useEffect(() => {
    // Scroll immediately on mount
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Also handle page reload
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return null
}

export default ScrollToTop

