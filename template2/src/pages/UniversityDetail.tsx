import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getUniversityBySlug } from '../data/universities'
import { getCoursesByIds } from '../data/courses'

// Slug to display name fallback (e.g. "amity-university" -> "Amity University")
function slugToName(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

const PAGE_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3 },
  },
}

const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

type CourseState = {
  title: string
  desc: string
  careers: string[]
  icon: string
  specializations?: string[]
  topics?: string[]
}

const UniversityDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { name?: string; course?: CourseState } | null
  const universityFromData = slug ? getUniversityBySlug(slug) : undefined
  const universityName =
    state?.name ?? universityFromData?.name ?? (slug ? slugToName(slug) : 'University')
  const course = state?.course

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [slug])

  const handleBack = () => {
    if (course && slug) {
      navigate('/courses', {
        state: { universityName, universitySlug: slug },
      })
    } else {
      navigate('/universities')
    }
  }

  if (course) {
    return (
      <motion.div
        className="w-full bg-offwhite min-h-screen"
        variants={PAGE_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold-bright/5 rounded-full blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold/5 rounded-full blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
        </div>

        <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <motion.div variants={SECTION_VARIANTS} className="mb-6 sm:mb-8">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-[#00275E] hover:text-gold font-semibold transition-colors"
            >
              <span>←</span> Back to Courses
            </button>
          </motion.div>

          <motion.header
            variants={SECTION_VARIANTS}
            className="text-center mb-10 sm:mb-14"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {course.title}
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {universityName}
            </motion.p>
            <motion.div
              className="h-1 w-24 sm:w-32 mx-auto bg-gradient-gold rounded-full mt-3"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            />
          </motion.header>

          <motion.section
            variants={SECTION_VARIANTS}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-4">
              Overview
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{course.desc}</p>
          </motion.section>

          {course.specializations && course.specializations.length > 0 && (
            <motion.section
              variants={SECTION_VARIANTS}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-4">
                Specializations
              </h2>
              <div className="flex flex-wrap gap-2">
                {course.specializations.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-gold/10 text-gold font-medium text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.section>
          )}

          {course.topics && course.topics.length > 0 && (
            <motion.section
              variants={SECTION_VARIANTS}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-4">
                Key Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {course.topics.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-gold/10 text-gold font-medium text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.section>
          )}

          <motion.section
            variants={SECTION_VARIANTS}
            className="bg-gradient-to-br from-[#00275E] to-[#00275E]/90 rounded-2xl shadow-lg border border-gold-bright/20 p-6 sm:p-8 text-white"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gold-bright mb-4">
              Career Paths
            </h2>
            <p className="text-white/90 leading-relaxed">
              {course.careers.join(', ')}
            </p>
          </motion.section>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="w-full bg-offwhite min-h-screen"
      variants={PAGE_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Soft background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold-bright/5 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold/5 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
      </div>

      <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Back button */}
        <motion.div variants={SECTION_VARIANTS} className="mb-6 sm:mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-[#00275E] hover:text-gold font-semibold transition-colors"
          >
            <span>←</span> {course ? 'Back to Courses' : 'Back to Universities'}
          </button>
        </motion.div>

        {/* Header */}
        <motion.header
          variants={SECTION_VARIANTS}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {universityName}
          </motion.h1>
          <motion.div
            className="h-1 w-24 sm:w-32 mx-auto bg-gradient-gold rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          />
        </motion.header>

        {/* Programs Offered - from data */}
        {universityFromData && (
          <motion.section
            id="programs-offered"
            variants={SECTION_VARIANTS}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-2">
              Programs Offered
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              {universityFromData.location}
            </p>
            <div className="space-y-6">
              {(() => {
                const courses = getCoursesByIds(universityFromData.courseIds)
                const byCategory = courses.reduce<Record<string, typeof courses>>((acc, c) => {
                  if (!acc[c.category]) acc[c.category] = []
                  acc[c.category].push(c)
                  return acc
                }, {})
                return Object.entries(byCategory).map(([category, list]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {list.map((course) => (
                        <span
                          key={course.id}
                          className="px-3 py-1.5 rounded-lg bg-gold/10 text-gold font-medium text-sm"
                          title={course.fullName}
                        >
                          {course.fullName} ({course.shortName})
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              })()}
            </div>
            <motion.button
              onClick={() =>
                navigate('/courses', {
                  state: {
                    universityName: universityFromData.name,
                    universitySlug: universityFromData.slug,
                  },
                })
              }
              className="mt-6 inline-block bg-[#00275E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00275E]/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Courses
            </motion.button>
          </motion.section>
        )}

        {/* Admission Open + Programmes - when no data, show static */}
        {!universityFromData && (
        <motion.section
          variants={SECTION_VARIANTS}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-4">
            Admission Open
          </h2>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>
              <a
                href="#programme-overview"
                className="text-gold hover:text-gold-bright font-medium transition-colors underline decoration-gold/60 underline-offset-2"
              >
                MBA
              </a>
            </li>
            <li>
              <a
                href="#programme-overview"
                className="text-gold hover:text-gold-bright font-medium transition-colors underline decoration-gold/60 underline-offset-2"
              >
                MCA
              </a>
            </li>
            <li>
              <a
                href="#programme-overview"
                className="text-gold hover:text-gold-bright font-medium transition-colors underline decoration-gold/60 underline-offset-2"
              >
                M.Sc Data Science
              </a>
            </li>
          </ul>
          <motion.a
            href="#programme-overview"
            className="inline-block bg-[#00275E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00275E]/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Programme
          </motion.a>
        </motion.section>
        )}

        {/* Programme Overview */}
        <motion.section
          id="programme-overview"
          variants={SECTION_VARIANTS}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-4">
            Master of Business Administration – Programme Overview
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The programme presents a two-year Online Master of Business
            Administration (MBA) crafted to provide a dynamic and
            career-enhancing learning experience. It is designed to deepen your
            understanding of business practices, sharpen your leadership
            capabilities, encourage innovative thinking, enable strategic
            decision-making, and equip you to capitalize on emerging growth
            opportunities.
          </p>
        </motion.section>

        {/* Programme Highlights */}
        <motion.section
          variants={SECTION_VARIANTS}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-5">
            Programme Highlights
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span className="text-gold-bright shrink-0 mt-0.5">•</span>
              <span>
                Access to exclusive alumni gatherings and valuable networking
                platforms
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold-bright shrink-0 mt-0.5">•</span>
              <span>
                Dedicated recorded modules focused on interview readiness and
                career preparation
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold-bright shrink-0 mt-0.5">•</span>
              <span>
                Interactive live online classes delivered by distinguished
                management faculty, with the flexibility of recorded session
                access
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold-bright shrink-0 mt-0.5">•</span>
              <span>
                Receive an MBA qualification equivalent to a postgraduate degree
                earned through conventional classroom learning
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold-bright shrink-0 mt-0.5">•</span>
              <span>
                A competitively priced and highly regarded MBA that enhances
                career prospects
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold-bright shrink-0 mt-0.5">•</span>
              <span>
                Official alumni recognition upon successful completion of the
                programme
              </span>
            </li>
          </ul>
        </motion.section>

        {/* Eligibility */}
        <motion.section
          variants={SECTION_VARIANTS}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-4">
            Eligibility
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Applicants must hold a Bachelor's degree with a minimum duration of
            three years from a recognized institution, securing at least 50%
            aggregate marks (45% for candidates belonging to reserved
            categories).
          </p>
        </motion.section>

        {/* Programme Fee */}
        <motion.section
          variants={SECTION_VARIANTS}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-4">
            Programme Fee
          </h2>
          <ul className="space-y-2 text-gray-600 mb-4">
            <li>Application Fee: INR 1,200</li>
            <li>Total Programme Fee: INR 1,80,000</li>
          </ul>
          <p className="text-gold font-semibold">No-Cost EMI Option Available</p>
          <p className="text-gray-600 mt-1 text-sm">
            Benefit from our no-cost EMI facility, designed to make financing
            your education simple and manageable.
          </p>
        </motion.section>

        {/* Scholarships */}
        <motion.section
          variants={SECTION_VARIANTS}
          className="bg-gradient-to-br from-[#00275E] to-[#00275E]/90 rounded-2xl shadow-lg border border-gold-bright/20 p-6 sm:p-8 text-white"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gold-bright mb-4">
            Scholarships Available
          </h2>
          <p className="text-white/90 leading-relaxed">
            We offer special scholarship benefits for defence personnel,
            government employees, differently-abled individuals, and
            academically outstanding students.
          </p>
        </motion.section>
      </div>
    </motion.div>
  )
}

export default UniversityDetail
