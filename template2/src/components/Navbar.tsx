import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../assets/images/logo_1.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  
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
            className={`relative z-10 text-sm font-bold transition-all duration-200 whitespace-nowrap inline-block ${
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

  // MAIN RENDER  
  return (
    <nav className="sticky top-0 z-50">
      {/* Main Navigation Bar Container */}
      <div className="w-full px-8">
        <div className="relative flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between md:justify-items-stretch h-30 md:gap-8">
          {/* LOGO SECTION */}
          <div className="flex-shrink-0 flex justify-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <Link to="/" className="relative inline-flex items-center gap-3" aria-label="Home">
                <img 
                  src={Logo} 
                  alt="MegaRyse Logo" 
                  className="w-[10rem] h-[10rem] object-contain"
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
          {/* DESKTOP NAVIGATION ITEMS */}
          <div className="hidden min-w-[800px] md:flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-lg justify-evenly flex-nowrap overflow-hidden mx-auto relative -top-6">
            {renderDesktopNavItems()}
          </div>

          <div className="flex-shrink-0 flex justify-end">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="relative inline-block bg-gold text-white px-6 py-2.5 rounded-lg font-semibold text-sm overflow-hidden group"
                aria-label="Contact us"
              >
                <span className="relative z-10">ENQUIRE NOW</span>
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold to-gold-bright"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden focus:outline-none absolute right-8 z-50 transition-colors duration-300 text-navy"
            aria-label="Toggle menu"
            {...(isOpen && { 'aria-expanded': true })}
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
    </nav>
  )
}

export default Navbar
