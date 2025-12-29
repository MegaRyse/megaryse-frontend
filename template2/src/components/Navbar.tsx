import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isDarkBackground, setIsDarkBackground] = useState(false) // Start with false (black text)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/universities', label: 'Universities' },
    { path: '/courses', label: 'Courses' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  // Detect if navbar is over dark background
  useEffect(() => {
    // Always start with black text on initial load - set immediately
    setIsDarkBackground(false)
    
    let isInitialized = false
    let checkTimeout: NodeJS.Timeout | null = null
    
    const checkBackground = () => {
      const navbar = document.querySelector('nav')
      if (!navbar) return false

      const navbarRect = navbar.getBoundingClientRect()
      
      // Check multiple points below the navbar
      const checkPoints = [
        { x: window.innerWidth / 2, y: navbarRect.bottom + 5 },
        { x: window.innerWidth / 4, y: navbarRect.bottom + 5 },
        { x: (window.innerWidth * 3) / 4, y: navbarRect.bottom + 5 },
      ]
      
      let hasDarkBackground = false
      
      for (const point of checkPoints) {
        const element = document.elementFromPoint(point.x, point.y)
        if (!element) continue
        
        // Walk up the DOM tree to find the section
        let currentElement: Element | null = element
        let depth = 0
        while (currentElement && depth < 10) {
          const bgColor = window.getComputedStyle(currentElement).backgroundColor
          const bgClass = currentElement.className || ''
          const tagName = currentElement.tagName.toLowerCase()
          
          // Check for dark background classes
          if (
            bgClass.includes('bg-navy') ||
            bgClass.includes('bg-black') ||
            bgClass.includes('bg-[#050B23]') ||
            bgClass.includes('bg-navy/')
          ) {
            hasDarkBackground = true
            break
          }
          
          // Check computed background color
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            const rgb = bgColor.match(/\d+/g)
            if (rgb && rgb.length >= 3) {
              const r = parseInt(rgb[0])
              const g = parseInt(rgb[1])
              const b = parseInt(rgb[2])
              // Check if it's a dark color (low brightness)
              const brightness = (r * 299 + g * 587 + b * 114) / 1000
              if (brightness < 50) {
                hasDarkBackground = true
                break
              }
            }
          }
          
          // Check if it's a section with dark background
          if (tagName === 'section' || tagName === 'div') {
            const sectionClass = currentElement.className || ''
            if (sectionClass.includes('bg-navy') || sectionClass.includes('bg-black')) {
              hasDarkBackground = true
              break
            }
          }
          
          currentElement = currentElement.parentElement
          depth++
        }
        
        if (hasDarkBackground) break
      }
      
      return hasDarkBackground
    }

    const handleScroll = () => {
      // Only check after initialization to prevent initial flicker
      if (!isInitialized) return
      
      // Clear any pending timeout
      if (checkTimeout) {
        clearTimeout(checkTimeout)
      }
      
      // Debounce the check to prevent too many state updates
      checkTimeout = setTimeout(() => {
        const hasDark = checkBackground()
        setIsDarkBackground(hasDark)
      }, 50)
    }

    // Initialize after page is fully loaded and rendered
    const initialize = () => {
      const doInit = () => {
        // Small delay to ensure all styles are applied and DOM is ready
        setTimeout(() => {
          isInitialized = true
          // Now check the background
          const hasDark = checkBackground()
          setIsDarkBackground(hasDark)
        }, 300)
      }
      
      // Wait for everything to be ready
      if (document.readyState === 'complete') {
        doInit()
      } else {
        window.addEventListener('load', doInit, { once: true })
        // Also check if DOM is already loaded
        if (document.readyState === 'interactive') {
          doInit()
        }
      }
    }

    // Start initialization after a brief delay to ensure React has rendered
    const initTimeout = setTimeout(initialize, 100)
    
    // Store timeout for cleanup
    let initTimeoutId = initTimeout

    // Check on scroll and resize (only after initialization)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    // Use Intersection Observer for better detection
    const observer = new IntersectionObserver(
      (entries) => {
        // Only observe after initialization
        if (!isInitialized) return
        
        let hasDark = false
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const bgClass = target.className || ''
            const bgColor = window.getComputedStyle(target).backgroundColor
            
            if (
              bgClass.includes('bg-navy') ||
              bgClass.includes('bg-black') ||
              (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent')
            ) {
              const rgb = bgColor.match(/\d+/g)
              if (rgb && rgb.length >= 3) {
                const r = parseInt(rgb[0])
                const g = parseInt(rgb[1])
                const b = parseInt(rgb[2])
                const brightness = (r * 299 + g * 587 + b * 114) / 1000
                if (brightness < 50 || bgClass.includes('bg-navy') || bgClass.includes('bg-black')) {
                  hasDark = true
                }
              }
            }
          }
        })
        if (hasDark) {
          setIsDarkBackground(true)
        } else {
          // Re-check when not intersecting to reset state
          handleScroll()
        }
      },
      {
        root: null,
        rootMargin: '-80px 0px 0px 0px', // Offset for navbar height
        threshold: 0.1,
      }
    )

    // Observe all sections after initialization
    const setupObserver = () => {
      if (isInitialized) {
        const sections = document.querySelectorAll('section, [class*="bg-navy"], [class*="bg-black"]')
        sections.forEach((section) => observer.observe(section))
      } else {
        setTimeout(setupObserver, 200)
      }
    }
    
    // Start observer setup after a delay
    setTimeout(setupObserver, 500)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('load', handleScroll)
      if (checkTimeout) {
        clearTimeout(checkTimeout)
      }
      if (initTimeoutId) {
        clearTimeout(initTimeoutId)
      }
      observer.disconnect()
    }
  }, [location])

  // Determine text colors based on background
  // Always ensure text is visible - default to black if state is undefined
  const textColorClass = isDarkBackground 
    ? 'text-white' 
    : 'text-black'
  
  const activeTextColorClass = isDarkBackground
    ? 'text-white font-bold'
    : 'text-navy font-bold'
  
  const hoverTextColorClass = isDarkBackground
    ? 'text-white font-semibold'
    : 'text-navy font-semibold'

  return (
    <nav className="sticky top-0 z-50 bg-offwhite/98 backdrop-blur-md shadow-lg border-b-2 border-gold-bright/30">
      {/* Main Navigation Bar */}
      <div className="w-full px-8">
        <div className="relative flex items-center justify-between h-20">
          {/* Container 1: Logo/Company Name - Left Side */}
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <Link to="/" className="relative inline-flex items-center gap-3">
                {/* Logo Circle - Placeholder for future image */}
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-bright rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">M</span>
                </div>
                <div className="flex flex-col">
                  <span className={`text-2xl font-bold leading-tight transition-colors duration-300 ${
                    isDarkBackground ? 'text-white' : 'text-navy'
                  }`}>
                    MegaRyse
                  </span>
                  <span className={`text-xs font-medium transition-colors duration-300 ${
                    isDarkBackground ? 'text-white/80' : 'text-black/70'
                  }`}>
                    If You Can Dream It, You Can Do It
                  </span>
                </div>
                <motion.span
                  className="absolute -inset-2 bg-gradient-to-r from-gold/20 to-gold-bright/20 rounded-lg blur-sm -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Container 2: Navigation Items - Centered on Screen */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative px-4 py-2 rounded-lg overflow-hidden group"
              >
                {/* Background animation on hover */}
                <motion.div
                  className={`absolute inset-0 rounded-lg transition-colors ${
                    isDarkBackground
                      ? 'bg-gradient-to-r from-gold/20 via-gold-bright/30 to-gold/20'
                      : 'bg-gradient-to-r from-gold/10 via-gold-bright/20 to-gold/10'
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: hoveredItem === item.path ? 1 : 0,
                    opacity: hoveredItem === item.path ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                
                {/* Border animation */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-lg"
                  animate={{
                    borderColor: hoveredItem === item.path 
                      ? 'rgba(255, 212, 71, 0.5)' 
                      : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Text - Adapts to background */}
                <span className={`relative z-10 text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? activeTextColorClass
                    : hoveredItem === item.path
                    ? hoverTextColorClass
                    : textColorClass
                }`}>
                  {item.label}
                </span>
                
                {/* Bottom underline animation */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-bright to-gold origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: hoveredItem === item.path || isActive(item.path) ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
                
                {/* Active indicator with glow */}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-bright to-gold"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gold-bright blur-sm"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                )}
                
                {/* Shine effect on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                    isDarkBackground ? 'via-white/10' : 'via-white/20'
                  } to-transparent`}
                  initial={{ x: '-100%' }}
                  animate={{
                    x: hoveredItem === item.path ? '100%' : '-100%',
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </Link>
            ))}
          </div>

          {/* Container 3: CTA Button - Right Side */}
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="relative inline-block bg-gold text-white px-6 py-2.5 rounded-lg font-semibold text-sm overflow-hidden group"
              >
                <span className="relative z-10">ENQUIRE NOW</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold to-gold-bright"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden focus:outline-none relative z-50 transition-colors duration-300 ${
              isDarkBackground ? 'text-white' : 'text-black'
            }`}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-offwhite border-t-2 border-gold-bright/30 overflow-hidden"
          >
            <div className="px-8 py-6 space-y-2">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block relative px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      isActive(item.path)
                        ? isDarkBackground
                          ? 'text-white font-bold bg-gradient-to-r from-gold/30 to-gold-bright/30'
                          : 'text-navy font-bold bg-gradient-to-r from-gold/20 to-gold-bright/20'
                        : isDarkBackground
                        ? 'text-white/90 hover:bg-gradient-to-r hover:from-gold/20 hover:to-gold-bright/20'
                        : 'text-black hover:bg-gradient-to-r hover:from-gold/10 hover:to-gold-bright/10'
                    }`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="mobileActiveTab"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-gold-bright to-gold rounded-r"
                        initial={false}
                      />
                    )}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-gold-bright to-gold rounded-r"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="pt-4"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-gold text-white px-6 py-3 rounded-lg font-semibold text-base"
                >
                  ENQUIRE NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
