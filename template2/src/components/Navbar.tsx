import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../assets/images/logo_1.png'

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024
/** Scroll range: animation target reaches 1 when user has scrolled this fraction of viewport height */
const SCROLL_RANGE_VH = 0.2
/** Lerp factor for slow, visible animation (0.02–0.04 = slow catch-up even when scrolling fast) */
const ANIM_LERP = 0.028
const LEAVE_LERP = 0.06
/** On mobile/tablet: show navbar gradient + blur only after user has scrolled past this (px) */
const SCROLL_THRESHOLD_FOR_NAV_BG = 16

function useMobileScrollCollapse() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(() => typeof window !== 'undefined' && window.innerWidth < TABLET_BREAKPOINT)
  const [scrolledForNavBg, setScrolledForNavBg] = useState(false)
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const [animatedLeaveProgress, setAnimatedLeaveProgress] = useState(0)
  const progressRef = useRef(0)
  const leaveProgressRef = useRef(0)
  const animatedRef = useRef(0)
  const animatedLeaveRef = useRef(0)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const mobile = w < MOBILE_BREAKPOINT
      const mobileOrTablet = w < TABLET_BREAKPOINT
      setIsMobile(mobile)
      setIsMobileOrTablet(mobileOrTablet)

      const H = window.innerHeight
      const maxScroll = SCROLL_RANGE_VH * H
      const scrollY = window.scrollY

      if (mobileOrTablet) {
        setScrolledForNavBg(scrollY > SCROLL_THRESHOLD_FOR_NAV_BG)
        if (mobile) {
          const p = maxScroll <= 0 ? 0 : Math.min(1, scrollY / maxScroll)
          progressRef.current = p
        } else {
          progressRef.current = 0
        }
        leaveProgressRef.current = 0
      } else {
        setScrolledForNavBg(false)
        progressRef.current = 0
        leaveProgressRef.current = 0
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    animatedRef.current = animatedProgress
  }, [animatedProgress])
  useEffect(() => {
    animatedLeaveRef.current = animatedLeaveProgress
  }, [animatedLeaveProgress])

  useEffect(() => {
    if (!isMobile) {
      setAnimatedProgress(0)
      animatedRef.current = 0
    }
    if (!isMobileOrTablet) {
      setAnimatedLeaveProgress(0)
      animatedLeaveRef.current = 0
    }
    let rafId: number
    const tick = () => {
      if (isMobile) {
        const target = progressRef.current
        const current = animatedRef.current
        const diff = target - current
        if (Math.abs(diff) < 0.001) {
          if (current !== target) {
            animatedRef.current = target
            setAnimatedProgress(target)
          }
        } else {
          const next = current + diff * ANIM_LERP
          animatedRef.current = next
          setAnimatedProgress(next)
        }
      }
      if (isMobileOrTablet) {
        const leaveTarget = leaveProgressRef.current
        const leaveCurrent = animatedLeaveRef.current
        const leaveDiff = leaveTarget - leaveCurrent
        if (Math.abs(leaveDiff) < 0.002) {
          if (leaveCurrent !== leaveTarget) {
            animatedLeaveRef.current = leaveTarget
            setAnimatedLeaveProgress(leaveTarget)
          }
        } else {
          const nextLeave = leaveCurrent + leaveDiff * LEAVE_LERP
          animatedLeaveRef.current = nextLeave
          setAnimatedLeaveProgress(nextLeave)
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isMobile, isMobileOrTablet])

  // On mobile/tablet: no scroll animations (progress and leaveProgress stay 0). scrolledForNavBg = show gradient+blur after scroll.
  return {
    isMobile,
    isMobileOrTablet,
    progress: isMobileOrTablet ? 0 : animatedProgress,
    leaveProgress: isMobileOrTablet ? 0 : animatedLeaveProgress,
    scrolledForNavBg,
  }
}

/** Final values when scroll progress = 1 (at 50vh) */
const MENU_X_END = -32
const PHONE_X_END = 32
const LOGO_SCALE_END = 0.42

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile, isMobileOrTablet, progress, leaveProgress, scrolledForNavBg } = useMobileScrollCollapse()

  // Hover state for navigation items
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  
  // Debounced hover state to prevent flickering during rapid mouse movements
  const [debouncedHoveredItem, setDebouncedHoveredItem] = useState<string | null>(null)
  
  // Get current route location for active state detection
  const location = useLocation()

  // NAVIGATION DATA
  const navItems = useMemo(() => [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/universities', label: 'Universities' },
    { path: '/courses', label: 'Courses' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
  ], [])

  // DEBOUNCED HOVER EFFECT
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedHoveredItem(hoveredItem)
    }, 50) // 50ms delay balances responsiveness and smoothness
    
    return () => clearTimeout(timer)
  }, [hoveredItem])

  const isActive = useCallback((path: string): boolean => {
    return location.pathname === path
  }, [location.pathname])

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  // STYLING CONSTANTS
  const textColorClass = 'text-navy font-bold'
  const activeTextColorClass = 'text-navy font-extrabold'
  const hoverTextColorClass = 'text-navy font-bold'

  // EVENT HANDLERS
  
  const handleHoverStart = useCallback((path: string) => {
    setHoveredItem(path)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setHoveredItem(null)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  // RENDER FUNCTIONS
  const renderDesktopNavItems = () => {
    return navItems.map((item) => {
      const isItemHovered = debouncedHoveredItem === item.path
      const isItemActive = isActive(item.path)
      
      return (
        <Link
          key={item.path}
          to={item.path}
          onMouseEnter={() => handleHoverStart(item.path)}
          onMouseLeave={handleHoverEnd}
          className="relative px-3.5 py-1.5 rounded-full group whitespace-nowrap flex-shrink-0"
          aria-label={`Navigate to ${item.label}`}
        >
          {/* Permanent glossy background for each nav item */}
          <div 
            className="absolute inset-0 rounded-full bg-white/40 backdrop-blur-sm shadow-md"
            style={{ 
              transform: 'translateZ(0)', 
              backfaceVisibility: 'hidden', // Prevent flickering
              willChange: 'opacity, transform' // Performance hint
            }}
          />
          
          {/* Enhanced gradient background on hover/active */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/20 via-gold-bright/30 to-gold/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isItemHovered || isItemActive ? 1 : 0,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ 
              transform: 'translateZ(0)', 
              backfaceVisibility: 'hidden',
              willChange: 'opacity'
            }}
          />
          
          {/* Navigation item text */}
          <span 
            className={`relative z-10 text-sm font-bold transition-all duration-200 whitespace-nowrap inline-block md:text-xs lg:text-sm ${
              isItemActive
                ? activeTextColorClass
                : isItemHovered
                ? hoverTextColorClass
                : textColorClass
            }`}
            style={{ fontWeight: 700 }}
          >
            {item.label}
          </span>
          
          {/* Active route indicator with animated glow */}
          {isItemActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute -bottom-1 left-2 right-2 h-1 bg-gradient-to-r from-gold via-gold-bright to-gold rounded-b-full z-20"
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
          
          {/* Shine effect on hover - smooth left-to-right animation */}
          {isItemHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full pointer-events-none"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ 
                transform: 'translateZ(0)', 
                backfaceVisibility: 'hidden'
              }}
            />
          )}
        </Link>
      )
    })
  }

  const renderMobileNavItems = () => {
    return navItems.map((item, idx) => (
      <motion.div
        key={item.path}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.1 }}
      >
        <Link
          to={item.path}
          onClick={closeMobileMenu}
          className={`block relative px-4 py-3 rounded-lg text-base font-medium transition-all ${
            isActive(item.path)
              ? 'text-navy font-bold bg-gradient-to-r from-gold/20 to-gold-bright/20'
              : 'text-navy hover:bg-gradient-to-r hover:from-gold/10 hover:to-gold-bright/10'
          }`}
          aria-label={`Navigate to ${item.label}`}
        >
          {item.label}
          {/* Active indicator for mobile */}
          {isActive(item.path) && (
            <motion.div
              layoutId="mobileActiveTab"
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-gold-bright to-gold rounded-r"
              initial={false}
            />
          )}
        </Link>
      </motion.div>
    ))
  }

  return (
    <motion.nav
      className={`sticky z-50 max-lg:-top-2 lg:top-0 transition-[background] duration-300 ${scrolledForNavBg ? 'max-lg:bg-gradient-to-b max-lg:from-offwhite max-lg:via-offwhite/80 max-lg:to-transparent' : ''}`}
    >
      {/* Small screens: blur layer with gradient mask — high blur at top, fully faded before bottom (no edge) */}
      {scrolledForNavBg && (
        <div
          className="max-lg:absolute max-lg:inset-0 max-lg:pointer-events-none max-lg:z-0"
          style={{
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 70%)',
          }}
          aria-hidden
        />
      )}
      {/* Main Navigation Bar Container — mobile/tablet: reduced padding and height; desktop: default */}
      {/* Navbar height on mobile/tablet: max-lg:min-h-[2.25rem] (edit both). Logo size: max-lg:w-10 max-lg:h-10 (40px). Desktop: full logo w-[10rem] h-[10rem]. */}
      <div className="relative z-10 w-full px-3 max-md:pt-2 max-md:pb-0.5 md:px-4 md:py-0 lg:px-6 xl:px-8">
        <motion.div
          className="max-md:min-h-[4.25rem] max-md:-mt-5 min-h-[3.5rem] md:min-h-0"
          animate={{
            opacity: isMobileOrTablet ? 1 - leaveProgress : 1,
            y: isMobileOrTablet ? -20 * leaveProgress : 0,
          }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ willChange: isMobileOrTablet ? 'opacity, transform' : 'auto' }}
        >
          <div className="relative flex flex-row md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between md:justify-items-stretch max-md:min-h-[4.25rem] max-md:h-auto min-h-[3.5rem] md:h-24 md:min-h-0 md:gap-4 lg:h-28 lg:gap-6 xl:h-30 xl:gap-8">
            {/* MOBILE: menu icon (left) — animates toward left when user scrolls down */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden order-1 flex-shrink-0 focus:outline-none z-50 p-2 -ml-1 transition-colors duration-300 text-navy"
            aria-label="Toggle menu"
            {...(isOpen && { 'aria-expanded': true })}
          >
            <motion.div
              animate={{
                rotate: isOpen ? 180 : 0,
                x: isMobile ? progress * MENU_X_END : 0,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
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

          {/* LOGO SECTION — mobile: center, shrinks when user scrolls; desktop: left */}
          <div className="order-2 flex-1 flex justify-center md:order-none md:flex-initial md:justify-start flex-shrink-0 py-0 md:py-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: isMobile ? 1 + (LOGO_SCALE_END - 1) * progress : 1,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center justify-center md:justify-start gap-3 origin-center"
            >
              <Link to="/" className="relative inline-flex items-center gap-3" aria-label="Home">
                <img 
                  src={Logo} 
                  alt="MegaRyse Logo" 
                  className="max-md:w-10 max-md:h-10 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-[10rem] xl:h-[10rem] object-contain"
                  loading="lazy" 
                />
                {/* Logo glow effect on hover */}
                <motion.span
                  className="absolute -inset-2 bg-gradient-to-r from-gold/20 to-gold-bright/20 rounded-lg blur-sm -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>

          {/* DESKTOP NAVIGATION ITEMS — visible from 768px, proportional scaling */}
          <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg justify-evenly flex-nowrap overflow-hidden mx-auto relative flex-1 min-w-0 max-w-2xl md:px-2 md:py-1.5 md:-top-4 lg:px-4 lg:py-2 lg:-top-5 xl:-top-6">
            {renderDesktopNavItems()}
          </div>

          {/* Until 767px: phone icon; from 768px: Enquire Now button only */}
          <div className="order-3 flex-shrink-0 flex justify-end items-center gap-2 md:gap-4 py-0 md:py-0">
            <motion.div
              className="md:hidden"
              animate={{ x: isMobile ? progress * PHONE_X_END : 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Link
                to="/contact"
                className="p-2 text-gold hover:text-gold-bright transition-colors duration-300 -mr-1 block"
                aria-label="Contact us"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8V5z" />
                </svg>
              </Link>
            </motion.div>
            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="relative inline-block bg-gold text-white whitespace-nowrap rounded-lg font-semibold overflow-hidden group md:px-4 md:py-2 md:text-xs lg:px-5 lg:py-2.5 lg:text-sm xl:px-6 xl:text-sm"
                aria-label="Contact us"
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
          </div>
        </motion.div>
      </div>
      
      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-8 py-6 space-y-2">
              {/* Mobile navigation items */}
              {renderMobileNavItems()}
              
              {/* Mobile CTA button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="pt-4"
              >
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="block w-full text-center bg-gold text-white px-6 py-3 rounded-lg font-semibold text-base"
                  aria-label="Contact us"
                >
                  ENQUIRE NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
