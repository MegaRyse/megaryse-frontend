import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  getUniversityBySlug,
  getUniversitiesOfferingCourse,
  TAB_TO_CATEGORY_TYPES,
} from '../data/universities'
import type { University } from '../data/universities'
import { coursesMasterData, getCoursesByIds, TAB_TO_CATEGORIES } from '../data/courses'
import type { CourseMaster } from '../data/courses'
import {
  Landmark,
  Briefcase,
  Code2,
  BookOpenText,
  GraduationCap,
  Terminal,
  Microscope,
  FileText,
  Stethoscope,
  Cpu,
  CloudCog,
  BarChart3,
  Database,
} from 'lucide-react'

/** Map CourseMaster to the shape UniversityDetail expects */
function toCourseState(c: CourseMaster) {
  return {
    title: `${c.fullName} (${c.shortName})`,
    desc: c.description,
    careers: c.careerPaths,
    icon: c.icon,
    specializations: c.specializations,
  }
}

const COURSE_ICON_CLASS = 'w-10 h-10 sm:w-12 sm:h-12'

const COURSE_ICONS: Record<number, JSX.Element> = {
  1: <Landmark className={COURSE_ICON_CLASS} />,
  2: <Briefcase className={COURSE_ICON_CLASS} />,
  3: <Code2 className={COURSE_ICON_CLASS} />,
  4: <BookOpenText className={COURSE_ICON_CLASS} />,
  5: <GraduationCap className={COURSE_ICON_CLASS} />,
  6: <Terminal className={COURSE_ICON_CLASS} />,
  7: <Microscope className={COURSE_ICON_CLASS} />,
  8: <FileText className={COURSE_ICON_CLASS} />,
  9: <Stethoscope className={COURSE_ICON_CLASS} />,
  10: <Cpu className={COURSE_ICON_CLASS} />,
  11: <CloudCog className={COURSE_ICON_CLASS} />,
  12: <BarChart3 className={COURSE_ICON_CLASS} />,
  13: <Database className={COURSE_ICON_CLASS} />,
}

function renderCourseIcon(courseId: number, fallback: string) {
  const icon = COURSE_ICONS[courseId]
  if (icon) return icon
  return <span className="text-4xl sm:text-5xl md:text-6xl">{fallback}</span>
}

const Courses = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const universityState = location.state as { universityName?: string; universitySlug?: string } | null
  const universityName = universityState?.universityName
  const universitySlug = universityState?.universitySlug
  const selectedUniversity = universitySlug ? getUniversityBySlug(universitySlug) : undefined

  const [activeTab, setActiveTab] = useState<'undergraduate' | 'postgraduate' | 'professional'>('undergraduate')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [courseForUniversitiesModal, setCourseForUniversitiesModal] = useState<CourseMaster | null>(null)

  const categoriesForTab = TAB_TO_CATEGORIES[activeTab] ?? []
  const currentCourses: CourseMaster[] = selectedUniversity
    ? getCoursesByIds(selectedUniversity.courseIds).filter((c) =>
        categoriesForTab.includes(c.category)
      )
    : coursesMasterData.filter((c) => categoriesForTab.includes(c.category))

  const handleKnowMore = (course: CourseMaster) => {
    if (selectedUniversity && universityName && universitySlug) {
      navigate(`/universities/${universitySlug}`, {
        state: { name: universityName, course: toCourseState(course) },
      })
    } else {
      setCourseForUniversitiesModal(course)
    }
  }

  const handleSelectUniversityForCourse = (uni: University, course: CourseMaster) => {
    setCourseForUniversitiesModal(null)
    navigate(`/universities/${uni.slug}`, {
      state: { name: uni.name, course: toCourseState(course) },
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
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


  return (
    <div className="w-full bg-offwhite">
      {/* Hero Section */}
      <section className="relative pt-0 pb-0 sm:pt-0 sm:pb-0 md:pt-0 md:pb-0 bg-offwhite overflow-hidden">
        {/* Animated background elements - Responsive sizes */}
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
              {selectedUniversity
                ? `Courses at ${selectedUniversity.name}`
                : 'Find the Perfect Course for Your Growth'}
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-gray-600 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {selectedUniversity
                ? `${selectedUniversity.location} • Programs offered by this university`
                : 'Explore our comprehensive range of programs'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="pt-6 pb-2 sm:pt-8 sm:pb-3 md:pt-10 md:pb-4 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { id: 'undergraduate', label: 'Undergraduate Programs' },
              { id: 'postgraduate', label: 'Postgraduate Programs' },
              { id: 'professional', label: 'Professional & Certification Courses' },
            ].map((tab) => (
              <motion.div
                key={tab.id}
                variants={itemVariants}
                className={`relative rounded-lg p-[2px] overflow-hidden w-full sm:w-auto ${
                  activeTab === tab.id ? 'bg-gradient-gold' : ''
                }`}
                onHoverStart={() => setHoveredTab(tab.id)}
                onHoverEnd={() => setHoveredTab(null)}
              >
                {/* Animated glowing border with movement on hover - Only for hover-capable devices */}
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

      {/* Courses Grid */}
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
            {currentCourses.map((course, idx) => (
              <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    duration: 0.6,
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -12,
                    transition: { 
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 0.7
                    }
                  }}
                  onHoverStart={() => setHoveredCard(idx)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-100 relative overflow-hidden group mb-6"
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

                  {/* Shimmer on hover */}
                  {hoveredCard === idx && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                      initial={{ transform: 'translateX(-100%) translateZ(0)' }}
                      animate={{ transform: 'translateX(200%) translateZ(0)' }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], repeat: 1, repeatDelay: 0.3 }}
                      style={{ willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                    />
                  )}

                  {/* Card layout: icon left, content right (match screenshot) */}
                  <div className="flex flex-row items-start gap-4 sm:gap-6 relative z-10">
                    <div
                      className="flex-shrink-0 text-navy flex items-center justify-center"
                      aria-hidden
                    >
                      {renderCourseIcon(course.id, course.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {course.fullName} ({course.shortName})
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                        {course.description}
                      </p>
                      <div className="mb-4">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-2">
                          {course.specializations.map((spec) => (
                            <span
                              key={spec}
                              className="px-3 py-1 rounded-md text-xs font-medium bg-gold/10 text-gold border border-gold/20 transition-colors duration-200 hover:bg-blue-custom hover:text-white"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Career Paths:</p>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {course.careerPaths.join(', ')}
                        </p>
                      </div>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleKnowMore(course)
                        }}
                        className="text-sm sm:text-base font-semibold text-gold"
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.span
                          className="inline-flex items-center"
                          animate={hoveredCard === idx ? { scale: 1.08 } : { scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <span>Know More</span>
                          <motion.span
                            className="inline-block ml-2"
                            animate={{
                              x: hoveredCard === idx ? [0, 5, 0] : 0,
                              scale: hoveredCard === idx ? 1.08 : 1,
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: hoveredCard === idx ? Infinity : 0,
                              ease: 'easeInOut',
                            }}
                          >
                            →
                          </motion.span>
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
            ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Modal: Universities offering this course (when visiting Courses directly) */}
      <AnimatePresence>
        {courseForUniversitiesModal && (
          <motion.div
            key="universities-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setCourseForUniversitiesModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-[#00275E]">
                  Universities offering this course
                </h3>
                <p className="text-gray-600 text-sm mt-1 truncate" title={courseForUniversitiesModal.fullName}>
                  {courseForUniversitiesModal.fullName} ({courseForUniversitiesModal.shortName})
                </p>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                {getUniversitiesOfferingCourse(courseForUniversitiesModal.id).length === 0 ? (
                  <p className="text-gray-500 text-sm">No universities found for this course.</p>
                ) : (
                  <ul className="space-y-2">
                    {getUniversitiesOfferingCourse(courseForUniversitiesModal.id).map((uni) => (
                      <li key={uni.id}>
                        <motion.button
                          type="button"
                          onClick={() => handleSelectUniversityForCourse(uni, courseForUniversitiesModal)}
                          className="w-full text-left px-4 py-3 rounded-xl bg-gold/10 hover:bg-gold/20 text-[#00275E] font-medium transition-colors border border-gold/20 flex items-center justify-between gap-2"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{uni.name}</span>
                          <span className="text-gold">→</span>
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="p-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCourseForUniversitiesModal(null)}
                  className="w-full py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Courses
