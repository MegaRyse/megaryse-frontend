import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../assets/images/logo_1.png'
import LogoWebp from '../assets/images/logo_1.webp'
import { OptimizedImage } from './OptimizedImage'
import { useEnquireModal } from '../context/EnquireModalContext'

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

/** === Control mobile navbar (screens < 768px) === */
/** Navbar bar min-height in rem (1rem = 16px). e.g. 4.25 = 68px. */
const MOBILE_NAVBAR_MIN_HEIGHT_REM = 5.25
/** Top/bottom padding of navbar container in rem. */
const MOBILE_NAVBAR_PADDING_TOP_REM = 0.5
const MOBILE_NAVBAR_PADDING_BOTTOM_REM = 0.125
/** Horizontal padding of navbar container in rem. */
const MOBILE_NAVBAR_PADDING_X_REM = 0.75

/** On mobile/tablet: show navbar gradient + blur only after user has scrolled past this (px) */
const SCROLL_THRESHOLD_FOR_NAV_BG = 16
const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/universities', label: 'Universities' },
  { path: '/courses', label: 'Courses' },
  { path: '/careers', label: 'Careers' },
  { path: '/contact', label: 'Contact' },
]
const MOBILE_NAV_GRADIENT =
  'linear-gradient(to bottom, #F5F2EA 0%, #F5F2EA 30%, rgba(245,242,234,0.97) 55%, rgba(245,242,234,0.5) 80%, transparent 100%)'

function useMobileScrollCollapse() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT)
  const [scrolledForNavBg, setScrolledForNavBg] = useState(false)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const mobile = w < MOBILE_BREAKPOINT
      const mobileOrTablet = w < TABLET_BREAKPOINT
      setIsMobile(mobile)

      const scrollY = window.scrollY
      setScrolledForNavBg(mobileOrTablet && scrollY > SCROLL_THRESHOLD_FOR_NAV_BG)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return {
    isMobile,
    progress: 0,
    scrolledForNavBg,
  }
}

/** Final values when scroll progress = 1 (at 50vh) */
const MENU_X_END = -32
const PHONE_X_END = 32
const LOGO_SCALE_END = 0.42

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile, progress, scrolledForNavBg } = useMobileScrollCollapse()
  const { openEnquireModal } = useEnquireModal()

  // Hover state for navigation items
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  
  // Debounced hover state to prevent flickering during rapid mouse movements
  const [debouncedHoveredItem, setDebouncedHoveredItem] = useState<string | null>(null)
  
  // Get current route location for active state detection
  const location = useLocation()

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
    return NAV_ITEMS.map((item) => {
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
          {/* Soft gold pill — only on hover / active */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gold/15"
            initial={false}
            animate={{
              opacity: isItemHovered || isItemActive ? 1 : 0,
              scale: isItemHovered || isItemActive ? 1 : 0.92,
            }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          />

          <span
            className={`relative z-10 text-sm font-bold transition-colors duration-200 whitespace-nowrap inline-block md:text-xs lg:text-sm ${
              isItemActive
                ? activeTextColorClass
                : isItemHovered
                  ? 'text-navy font-extrabold'
                  : textColorClass
            }`}
            style={{ fontWeight: 700 }}
          >
            {item.label}
          </span>

          {/* Gold underline — slides in on hover; stays for active route */}
          <motion.span
            className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-gold via-gold-bright to-gold"
            initial={false}
            animate={{
              width: isItemActive || isItemHovered ? '70%' : '0%',
              opacity: isItemActive || isItemHovered ? 1 : 0,
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        </Link>
      )
    })
  }

  const renderMobileNavItems = () => {
    return NAV_ITEMS.map((item, idx) => {
      const active = isActive(item.path)
      return (
        <motion.div
          key={item.path}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Link
            to={item.path}
            onClick={closeMobileMenu}
            className={`group relative block overflow-hidden rounded-xl px-3 py-2.5 text-base font-medium transition-colors duration-200 sm:px-4 ${
              active
                ? 'bg-gold/20 font-bold text-navy'
                : 'text-navy hover:bg-gold/10 active:bg-gold/15'
            }`}
            aria-label={`Navigate to ${item.label}`}
          >
            <span className="relative z-10">{item.label}</span>
            {/* Gold accent bar — left edge */}
            <span
              className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-gold to-gold-bright transition-opacity duration-200 ${
                active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
              aria-hidden
            />
          </Link>
        </motion.div>
      )
    })
  }

  return (
    <motion.nav className="sticky z-50 top-0 transition-[background] duration-300">
      {/* Mobile (< 768px) when scrolled: linear gradient only — opaque at top, transparent at bottom (no blur) */}
      {scrolledForNavBg && (
        <div
          className="max-md:absolute max-md:inset-0 max-md:pointer-events-none max-md:z-0"
          style={{
            background: MOBILE_NAV_GRADIENT,
          }}
          aria-hidden
        />
      )}
      {/* Main Navigation Bar Container — lift above mobile menu overlay while open (z-60 > menu z-40) */}
      <div
        className={`relative w-full md:px-4 md:py-0 lg:px-6 xl:px-8 ${isOpen ? 'z-[60]' : 'z-10'}`}
        style={
          isMobile
            ? {
                paddingLeft: `${MOBILE_NAVBAR_PADDING_X_REM}rem`,
                paddingRight: `${MOBILE_NAVBAR_PADDING_X_REM}rem`,
                paddingTop: `${MOBILE_NAVBAR_PADDING_TOP_REM}rem`,
                paddingBottom: `${MOBILE_NAVBAR_PADDING_BOTTOM_REM}rem`,
              }
            : undefined
        }
      >
        <motion.div
          className="min-h-[3.5rem] md:min-h-0"
          style={{
            ...(isMobile ? { minHeight: `${MOBILE_NAVBAR_MIN_HEIGHT_REM}rem` } : {}),
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="relative flex flex-row md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between md:justify-items-stretch max-md:h-auto min-h-[3.5rem] md:h-24 md:min-h-0 md:gap-4 lg:h-28 lg:gap-6 xl:h-30 xl:gap-8"
            style={
              isMobile
                ? { minHeight: `${MOBILE_NAVBAR_MIN_HEIGHT_REM}rem` }
                : undefined
            }
          >
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
          {/* When mobile menu is open, disable logo pointer events so the oversized logo
              cannot intercept taps on the first menu item (Home). */}
          <div
            className={`order-2 flex-1 flex justify-center md:order-none md:flex-initial md:justify-start flex-shrink-0 py-0 md:py-0 ${
              isOpen ? 'max-md:pointer-events-none' : ''
            }`}
          >
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
                <OptimizedImage
                  src={Logo}
                  webpSrc={LogoWebp}
                  alt="MegaRyse Logo"
                  priority
                  className="w-[150px] h-[150px] md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-[10rem] xl:h-[10rem] object-contain"
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

          {/* DESKTOP NAV — Apple-style Liquid Glass (glossy specular, not frosted blur) */}
          <div
            className="relative mx-auto hidden min-w-0 max-w-2xl flex-1 items-center justify-evenly self-center overflow-hidden rounded-full md:flex md:gap-2 md:px-2 md:py-1.5 lg:gap-4 lg:px-4 lg:py-2 xl:gap-6"
            style={{
              // Clearer glass body — light tint, not heavy frost
              background:
                'linear-gradient(165deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.38) 28%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0.32) 78%, rgba(255,255,255,0.48) 100%)',
              // Light blur only — Apple Liquid Glass stays optically clear
              backdropFilter: 'blur(8px) saturate(180%) brightness(1.08)',
              WebkitBackdropFilter: 'blur(8px) saturate(180%) brightness(1.08)',
              border: '1px solid rgba(255,255,255,0.75)',
              boxShadow: [
                // Outer lift + soft ambient (glass floating above surface)
                '0 10px 32px rgba(5,11,35,0.12)',
                '0 2px 8px rgba(5,11,35,0.06)',
                // Crisp specular rim (top edge catch-light)
                'inset 0 1.5px 0 rgba(255,255,255,0.95)',
                'inset 0 -1px 0 rgba(255,255,255,0.35)',
                // Soft inner depth
                'inset 0 0 0 0.5px rgba(255,255,255,0.55)',
                'inset 0 -8px 20px rgba(5,11,35,0.04)',
              ].join(', '),
            }}
          >
            {/* Primary specular — bright liquid sheen across the crown */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[55%] rounded-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 35%, rgba(255,255,255,0.12) 70%, transparent 100%)',
                mixBlendMode: 'soft-light',
              }}
            />
            {/* Diagonal gloss streak — Apple-like reflective flash */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-1/4 top-[-20%] h-[140%] w-[55%] -rotate-[18deg] rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 42%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.4) 58%, transparent 100%)',
                opacity: 0.55,
                filter: 'blur(1px)',
              }}
            />
            {/* Bottom caustic edge — subtle warm refraction */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-4 bottom-0 h-[38%] rounded-full"
              style={{
                background:
                  'linear-gradient(0deg, rgba(201,169,120,0.18) 0%, rgba(255,255,255,0.1) 45%, transparent 100%)',
              }}
            />
            {/* Hairline rim light */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.45)',
              }}
            />
            <div className="relative z-10 flex w-full min-w-0 flex-nowrap items-center justify-evenly md:gap-2 lg:gap-4 xl:gap-6">
              {renderDesktopNavItems()}
            </div>
          </div>

          {/* Until 767px: phone icon; from 768px: Enquire Now button only */}
          <div className="order-3 flex-shrink-0 flex justify-end items-center gap-2 md:gap-4 py-0 md:py-0">
            <motion.div
              className="md:hidden"
              animate={{ x: isMobile ? progress * PHONE_X_END : 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <button
                type="button"
                onClick={() => openEnquireModal()}
                className="p-2 text-gold hover:text-gold-bright transition-colors duration-300 -mr-1 block"
                aria-label="Enquire now"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8V5z" />
                </svg>
              </button>
            </motion.div>
            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="button"
                onClick={() => openEnquireModal()}
                className="relative inline-block bg-gold text-white whitespace-nowrap rounded-lg font-semibold overflow-hidden group md:px-4 md:py-2 md:text-xs lg:px-5 lg:py-2.5 lg:text-sm xl:px-6 xl:text-sm"
                aria-label="Enquire now"
              >
                <span className="relative z-10">ENQUIRE NOW</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold to-gold-bright"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </motion.div>
          </div>
          </div>
        </motion.div>
      </div>
      
      {/* MOBILE MENU — 80vw width, height from content (max viewport), arrow under menu / X control (< 768px) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              key="mobile-menu-backdrop"
              aria-label="Close menu"
              className="fixed inset-0 z-[55] bg-[#050B23]/40 backdrop-blur-[4px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeMobileMenu}
            />
            <motion.div
              key="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="fixed left-3 top-[6.85rem] z-[70] flex w-[80vw] max-w-[80vw] flex-col md:hidden sm:left-4"
            >
              {/* Arrow tip centered under menu / X (≈ padding + p-2 + half icon from panel left) */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-[11px] left-5 z-10 block h-3 w-[22px] -translate-x-1/2"
              >
                <span className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-x-[11px] border-b-[12px] border-x-transparent border-b-gold/40" />
                <span className="absolute left-1/2 top-[2px] h-0 w-0 -translate-x-1/2 border-x-[9px] border-b-[10px] border-x-transparent border-b-offwhite" />
              </span>
              <div className="flex max-h-[calc(100dvh-7.25rem)] flex-col overflow-hidden rounded-2xl bg-offwhite shadow-[0_24px_48px_-12px_rgba(5,11,35,0.35)]">
                <nav className="max-h-[calc(100dvh-8.5rem)] overflow-y-auto overscroll-contain px-4 pb-3 pt-1.5 sm:px-5 sm:pb-3.5 sm:pt-2">
                  <div className="space-y-0.5">{renderMobileNavItems()}</div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
