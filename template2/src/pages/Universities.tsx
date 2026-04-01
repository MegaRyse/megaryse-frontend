import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUniversitiesByTab, type University } from '../data/universities'

const LOGOS = ['🏛️', '🎓', '📚', '🌟', '💎', '🏆', '💻', '🌍']
const UNIVERSITY_TABS = [
  { id: 'undergraduate', label: 'Undergraduate Programs' },
  { id: 'postgraduate', label: 'Postgraduate Programs' },
  { id: 'professional', label: 'Professional & Certification Courses' },
] as const

// Animation variants matching Courses.tsx
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

// Unique card entrance animation - stacking effect
const CARD_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.8,
    rotateX: -15
  },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: idx * 0.15,
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  })
}

const Universities = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'undergraduate' | 'postgraduate' | 'professional'>('undergraduate')
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredButton, setHoveredButton] = useState<number | null>(null)

  const currentUniversities = useMemo(() => getUniversitiesByTab(activeTab), [activeTab])

  const handleUniversitySelect = useCallback((uni: University) => {
    navigate('/courses', {
      state: {
        universityName: uni.name,
        universitySlug: uni.slug,
        selectedTab: activeTab,
      },
    })
  }, [navigate, activeTab])

  return (
    <div className="w-full bg-offwhite">
      {/* Hero Section */}
      <section className="relative pt-0 pb-0 sm:pt-0 sm:pb-0 md:pt-0 md:pb-0 bg-offwhite overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold-bright/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="text-center"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Our Associated Universities
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-gray-600 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Partner with top-tier institutions worldwide
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="pt-6 pb-2 sm:pt-8 sm:pb-3 md:pt-10 md:pb-4 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            {UNIVERSITY_TABS.map((tab) => (
              <motion.div
                key={tab.id}
                variants={ITEM_VARIANTS}
                className={`relative rounded-lg p-[2px] overflow-hidden w-full sm:w-auto ${
                  activeTab === tab.id ? 'bg-gradient-gold' : ''
                }`}
                onHoverStart={() => setHoveredTab(tab.id)}
                onHoverEnd={() => setHoveredTab(null)}
              >
                {/* Animated glowing border with movement on hover */}
                {activeTab !== tab.id && (
                  <>
                    {/* Base gradient border */}
                    <motion.div
                      className="absolute inset-0 z-0 rounded-lg bg-gradient-gold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredTab === tab.id ? 1 : 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.5
                      }}
                    />
                    {/* Animated moving gradient overlay */}
                    <motion.div
                      className="absolute inset-0 z-0 rounded-lg"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #D5AD36, #E8C547, #FAF0E0, transparent)',
                        backgroundSize: '200% 100%',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredTab === tab.id ? 1 : 0,
                        backgroundPosition: hoveredTab === tab.id ? ['-200% 0', '200% 0'] : '-200% 0',
                      }}
                      transition={{
                        opacity: { 
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          mass: 0.5
                        },
                        backgroundPosition: {
                          duration: 2.5,
                          repeat: hoveredTab === tab.id ? Infinity : 0,
                          ease: [0.4, 0, 0.6, 1],
                        },
                      }}
                    />
                    {/* Pulsing glow effect */}
                    <motion.div
                      className="absolute inset-0 z-0 rounded-lg"
                      style={{
                        boxShadow: '0 0 20px rgba(213, 173, 54, 0.6), 0 0 40px rgba(213, 173, 54, 0.4)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredTab === tab.id ? 1 : 0,
                        boxShadow: hoveredTab === tab.id ? [
                          '0 0 20px rgba(213, 173, 54, 0.6), 0 0 40px rgba(213, 173, 54, 0.4)',
                          '0 0 30px rgba(213, 173, 54, 0.8), 0 0 60px rgba(213, 173, 54, 0.6)',
                          '0 0 20px rgba(213, 173, 54, 0.6), 0 0 40px rgba(213, 173, 54, 0.4)',
                        ] : '0 0 20px rgba(213, 173, 54, 0.6), 0 0 40px rgba(213, 173, 54, 0.4)',
                      }}
                      transition={{
                        opacity: { 
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          mass: 0.5
                        },
                        boxShadow: {
                          duration: 2.5,
                          repeat: hoveredTab === tab.id ? Infinity : 0,
                          ease: [0.42, 0, 0.58, 1],
                        },
                      }}
                    />
                  </>
                )}
                <motion.button
                  onClick={() => setActiveTab(tab.id as 'undergraduate' | 'postgraduate' | 'professional')}
                  className={`relative w-full px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 z-10 ${
                    activeTab === tab.id
                      ? 'bg-gradient-gold text-black shadow-lg'
                      : 'bg-white text-[#00275E]'
                  }`}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {tab.label}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Universities Grid - With stacking animation on load */}
      <section className="pt-2 pb-12 sm:pt-3 sm:pb-16 md:pt-4 md:pb-20 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentUniversities.map((uni, idx) => (
              <motion.div
                    key={`${activeTab}-${uni.id}`}
                    custom={idx}
                    variants={CARD_VARIANTS}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { 
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }
                    }}
                    onHoverStart={() => setHoveredCard(idx)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative overflow-hidden group"
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    {/* Animated background gradient on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold-bright/10 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === idx ? 1 : 0 }}
                      transition={{ 
                        duration: 0.25,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      style={{ 
                        willChange: hoveredCard === idx ? 'opacity' : 'auto',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                      }}
                    />

                    {/* Logo */}
                    <div className="text-5xl mb-4 text-center">
                      {LOGOS[uni.id % LOGOS.length]}
                    </div>

                    {/* University Name */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">
                      {uni.name}
                    </h3>

                    {/* Description - from data (location + program count) */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">
                      Based in {uni.location}. Offering {uni.courseIds.length} programs
                      across undergraduate, postgraduate and professional streams.
                    </p>

                    {/* Unique Know More Button Animation - Different from Courses */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUniversitySelect(uni)
                      }}
                      onHoverStart={() => setHoveredButton(idx)}
                      onHoverEnd={() => setHoveredButton(null)}
                      className="relative w-full bg-[#00275E] text-white px-6 py-3 rounded-lg font-semibold overflow-hidden group/btn"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 10px 25px rgba(0, 39, 94, 0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400,
                        damping: 20
                      }}
                    >
                      {/* Button text */}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span className="relative">
                  Know More
                          {/* Gold underline on button hover */}
                          <motion.span
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: hoveredButton === idx ? 1 : 0 }}
                            transition={{ 
                              duration: 0.3,
                              ease: "easeOut"
                            }}
                            style={{
                              transform: 'translateZ(0)',
                              backfaceVisibility: 'hidden'
                            }}
                          />
                        </span>
                        {/* Arrow symbol - static (no rotation) */}
                        <span className="inline-block">
                          →
                        </span>
                      </span>

                      {/* Dual shimmer effect - diagonal sweep with equal gaps */}
                      {hoveredCard === idx && (
                        <>
                          {/* First shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ 
                              x: '-100%',
                              y: '-100%',
                              rotate: 45
                            }}
                            animate={{ 
                              x: '200%',
                              y: '200%',
                              rotate: 45
                            }}
                            transition={{ 
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            style={{
                              width: '200%',
                              height: '200%',
                              transform: 'translateZ(0)',
                              backfaceVisibility: 'hidden'
                            }}
                          />
                          {/* Second shimmer effect - offset by 1.5s for equal gaps */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ 
                              x: '-100%',
                              y: '-100%',
                              rotate: 45
                            }}
                            animate={{ 
                              x: '200%',
                              y: '200%',
                              rotate: 45
                            }}
                            transition={{ 
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                              delay: 1.5
                            }}
                            style={{
                              width: '200%',
                              height: '200%',
                              transform: 'translateZ(0)',
                              backfaceVisibility: 'hidden'
                            }}
                          />
                        </>
                      )}

                      {/* Pulsing glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        animate={hoveredCard === idx ? {
                          opacity: [0.3, 0.6, 0.3],
                          scale: [1, 1.05, 1]
                        } : {
                          opacity: 0,
                          scale: 1
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: hoveredCard === idx ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                        style={{
                          backgroundColor: '#00275E',
                          filter: 'blur(10px)',
                          zIndex: -1
                        }}
                      />
                    </motion.button>
              </motion.div>
            ))}
          </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default Universities
