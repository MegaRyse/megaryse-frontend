import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getUniversityBySlug } from '../data/universities'
import { getCoursesByIds } from '../data/courses'
import { useEnquireModal } from '../context/EnquireModalContext'

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

const PROGRAMME_HIGHLIGHTS: string[] = [
  `Access to exclusive VIT alumni gatherings and valuable networking platforms.`,
  `Dedicated recorded modules focused on interview readiness and career preparation.`,
  `Interactive live online classes delivered by VIT’s distinguished management faculty, with the flexibility of recorded session access.`,
  `Receive an MBA qualification equivalent to a postgraduate degree earned through conventional classroom learning.`,
  `A competitively priced and highly regarded MBA that enhances career prospects.`,
  `Official VIT alumni recognition upon successful completion of the programme.`,
]

const getHighlightRows = (items: string[]): string[][] => {
  const rows: string[][] = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2))
  }
  return rows
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
  const { openEnquireModal } = useEnquireModal()
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
              Programme Overview
            </h2>
            <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {course.desc}{' '}
                This specialised programme at {universityName} is designed to strengthen your
                managerial foundation while sharpening analytical, leadership, and communication
                skills that modern organisations expect from future-ready business professionals.
              </p>
              <div className="bg-offwhite rounded-xl border border-gold/30 p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-[#00275E] mb-3">
                  At a Glance
                </h3>
                <dl className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium">University</dt>
                    <dd className="text-right">{universityName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium">Programme</dt>
                    <dd className="text-right">{course.title}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium">Mode</dt>
                    <dd className="text-right">Online with structured live sessions</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium">Duration</dt>
                    <dd className="text-right">Approx. 2 years, modular semesters</dd>
                  </div>
                </dl>
              </div>
            </div>
          </motion.section>

          {/* Programme Highlights for selected course */}
          <motion.section
            variants={SECTION_VARIANTS}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-3 text-center">
              Programme Highlights
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 text-center max-w-2xl mx-auto mb-6">
              Key reasons why this programme stands out and adds tangible value to your academic and career journey.
            </p>

            <div className="relative max-w-4xl mx-auto">
              <div className="space-y-8 sm:space-y-10">
                {getHighlightRows(PROGRAMME_HIGHLIGHTS).map((row, rowIndex, allRows) => {
                  const [leftItem, rightItem] = row
                  const isLastRow = rowIndex === allRows.length - 1
                  const hasCards = Boolean(leftItem || rightItem)

                  return (
                    <div
                      key={rowIndex}
                      className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-12 sm:gap-16 items-stretch"
                    >
                      {!isLastRow && (
                        <div
                          aria-hidden
                          className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-full h-8 sm:h-10 border-l-2 border-dotted border-blue-custom/50"
                        />
                      )}
                      {hasCards && (
                        <div
                          aria-hidden
                          className="absolute left-[6%] right-[6%] top-1/2 -translate-y-1/2 hidden sm:block border-t-2 border-dotted border-blue-custom/50 pointer-events-none z-0"
                        />
                      )}
                      <div className="flex justify-end relative z-10">
                        {leftItem && (
                          <div className="max-w-md rounded-xl bg-offwhite/90 border border-gold/20 shadow-md px-4 py-3 sm:px-5 sm:py-4">
                            <p className="text-base sm:text-[1.02rem] font-medium text-gray-800 leading-relaxed">
                              {leftItem}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="relative flex items-center justify-center z-20">
                        {rowIndex > 0 && (
                          <span
                            aria-hidden
                            className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 h-[calc(50%-0.375rem)] border-l-2 border-dotted border-blue-custom/50"
                          />
                        )}
                        <span className="h-3 w-3 rounded-full border-2 border-gold bg-offwhite shadow-[0_0_0_3px_rgba(201,169,120,0.25)]" />
                        {!isLastRow && (
                          <span
                            aria-hidden
                            className="hidden sm:block absolute left-1/2 -translate-x-1/2 bottom-0 h-[calc(50%-0.375rem)] border-l-2 border-dotted border-blue-custom/50"
                          />
                        )}
                      </div>
                      <div className="flex justify-start relative z-10">
                        {rightItem && (
                          <div className="max-w-md rounded-xl bg-offwhite/90 border border-gold/20 shadow-md px-4 py-3 sm:px-5 sm:py-4">
                            <p className="text-base sm:text-[1.02rem] font-medium text-gray-800 leading-relaxed">
                              {rightItem}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.section>

          {/* {course.specializations && course.specializations.length > 0 && (
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
          )} */}

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

          {/* Programme Structure for selected course */}
          <motion.section
            variants={SECTION_VARIANTS}
            className="rounded-2xl shadow-lg border border-gold/25 overflow-hidden bg-white"
          >
            {/* Header row - centered */}
            <div className="bg-gradient-to-r from-[#00275E] to-[#00275E]/95 px-6 py-5 sm:px-8 sm:py-6 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Programme Structure & Admissions
              </h2>
              <p className="text-sm text-white/85 max-w-2xl mx-auto">
                Understand how this programme is structured and the steps to secure your seat.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="inline-flex items-center rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white border border-white/25">
                  Duration: 2 years
                </span>
                <span className="inline-flex items-center rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white border border-white/25">
                  Mode: Online + Live Sessions
                </span>
              </div>
            </div>

            {/* Row 2: Two columns - Eligibility | Fees */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gold/20">
              <div className="p-6 sm:p-8 bg-offwhite/50">
                <h3 className="text-base font-semibold text-[#00275E] mb-4 pb-2 border-b border-gold/30">
                  Eligibility Criteria
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-semibold">1</span>
                    Bachelor&apos;s degree of at least three years&apos; duration from a recognised university in any discipline.
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-semibold">2</span>
                    Minimum aggregate of 50% marks; a moderated threshold may apply for specified categories.
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-semibold">3</span>
                    Prior work experience is preferred but not mandatory for most specialisations.
                  </li>
                </ul>
              </div>
              <div className="p-6 sm:p-8 bg-white">
                <h3 className="text-base font-semibold text-[#00275E] mb-4 pb-2 border-b border-gold/30">
                  Application & Programme Fee
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 border-b border-gray-100">
                    <dt className="font-medium text-gray-700">Application Fee</dt>
                    <dd className="text-right font-semibold text-[#00275E]">INR 1,200</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 border-b border-gray-100">
                    <dt className="font-medium text-gray-700">Total Programme Fee</dt>
                    <dd className="text-right font-semibold text-[#00275E]">INR 1,80,000</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 border-b border-gray-100">
                    <dt className="font-medium text-gray-700">Exam & Other Charges</dt>
                    <dd className="text-right text-gray-600 text-xs">As per university norms</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 pt-2">
                    <dt className="font-medium text-gray-700">Payment Modes</dt>
                    <dd className="text-right text-gray-600">One-time, semester-wise, EMI</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Row 3: Scholarships & Finance highlight */}
            <div className="px-6 py-5 sm:px-8 sm:py-6 bg-[#00275E] text-white border-t border-gold-bright/20">
              <h3 className="text-base font-semibold text-gold-bright mb-4 text-center">
                Scholarships & Finance
              </h3>
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/90 max-w-3xl mx-auto">
                <li className="flex gap-2 items-center">
                  <span className="text-gold-bright shrink-0">•</span>
                  Merit and profile-based scholarships for eligible applicants.
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-gold-bright shrink-0">•</span>
                  Special consideration for defence, government, and differently-abled candidates.
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-gold-bright shrink-0">•</span>
                  No-cost EMI through partner banks for easy instalments.
                </li>
              </ul>
            </div>

            {/* Row 4: Apply Now button - centered */}
            <div className="p-6 sm:p-8 bg-offwhite/30 flex justify-center">
              <motion.button
                type="button"
                onClick={openEnquireModal}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-[#050B23] px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold shadow-lg hover:bg-gold-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Now
                <span className="text-lg" aria-hidden>→</span>
              </motion.button>
            </div>
          </motion.section>

          <motion.section
            variants={SECTION_VARIANTS}
            className="bg-gradient-to-br from-[#00275E] to-[#00275E]/90 rounded-2xl shadow-lg border border-gold-bright/20 p-6 sm:p-8 text-white mb-8"
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
        {/* Programme Overview */}
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
          <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-3 text-center">
            Programme Highlights
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 text-center max-w-2xl mx-auto mb-6">
            An at-a-glance summary of how this university delivers a structured, supportive and outcomes-focused learning experience for management aspirants.
          </p>

          <div className="relative max-w-4xl mx-auto">
            <div className="space-y-8 sm:space-y-10">
              {getHighlightRows(PROGRAMME_HIGHLIGHTS).map((row, rowIndex, allRows) => {
                const [leftItem, rightItem] = row
                const isLastRow = rowIndex === allRows.length - 1
                const hasCards = Boolean(leftItem || rightItem)

                return (
                  <div
                    key={rowIndex}
                    className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-12 sm:gap-16 items-stretch"
                  >
                    {!isLastRow && (
                      <div
                        aria-hidden
                        className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-full h-8 sm:h-10 border-l-2 border-dotted border-blue-custom/50"
                      />
                    )}
                    {hasCards && (
                      <div
                        aria-hidden
                        className="absolute left-[6%] right-[6%] top-1/2 -translate-y-1/2 hidden sm:block border-t-2 border-dotted border-blue-custom/50 pointer-events-none z-0"
                      />
                    )}
                    <div className="flex justify-end relative z-10">
                      {leftItem && (
                        <div className="max-w-md rounded-xl bg-offwhite/90 border border-gold/20 shadow-md px-4 py-3 sm:px-5 sm:py-4">
                          <p className="text-base sm:text-[1.02rem] font-medium text-gray-800 leading-relaxed">
                            {leftItem}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="relative flex items-center justify-center z-20">
                      {rowIndex > 0 && (
                        <span
                          aria-hidden
                          className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 h-[calc(50%-0.375rem)] border-l-2 border-dotted border-blue-custom/50"
                        />
                      )}
                      <span className="h-3 w-3 rounded-full border-2 border-gold bg-offwhite shadow-[0_0_0_3px_rgba(201,169,120,0.25)]" />
                      {!isLastRow && (
                        <span
                          aria-hidden
                          className="hidden sm:block absolute left-1/2 -translate-x-1/2 bottom-0 h-[calc(50%-0.375rem)] border-l-2 border-dotted border-blue-custom/50"
                        />
                      )}
                    </div>
                    <div className="flex justify-start relative z-10">
                      {rightItem && (
                        <div className="max-w-md rounded-xl bg-offwhite/90 border border-gold/20 shadow-md px-4 py-3 sm:px-5 sm:py-4">
                          <p className="text-base sm:text-[1.02rem] font-medium text-gray-800 leading-relaxed">
                            {rightItem}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Programme Structure, Eligibility & Fees */}
        <motion.section
          variants={SECTION_VARIANTS}
          className="rounded-2xl shadow-lg border border-gold/25 overflow-hidden bg-white mb-8"
        >
          {/* Header row - centered */}
          <div className="bg-gradient-to-r from-[#00275E] to-[#00275E]/95 px-6 py-5 sm:px-8 sm:py-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Programme Structure & Admissions
            </h2>
            <p className="text-sm text-white/85 max-w-2xl mx-auto">
              Review key eligibility, fee details, and the support available before you submit your application.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="inline-flex items-center rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white border border-white/25">
                Duration: 2 years
              </span>
              <span className="inline-flex items-center rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white border border-white/25">
                Mode: Online + Live Sessions
              </span>
              <span className="inline-flex items-center rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white border border-white/25">
                Flexible EMI
              </span>
            </div>
          </div>

          {/* Row 2: Two columns - Eligibility | Fees */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gold/20">
            <div className="p-6 sm:p-8 bg-offwhite/50">
              <h3 className="text-base font-semibold text-[#00275E] mb-4 pb-2 border-b border-gold/30">
                Eligibility Criteria
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-semibold">1</span>
                  Bachelor&apos;s degree of at least three years&apos; duration from a recognised university in any discipline.
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-semibold">2</span>
                  Minimum aggregate of 50% marks; a moderated threshold may apply for specified categories.
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-semibold">3</span>
                  Prior work experience is preferred but not mandatory for most specialisations.
                </li>
              </ul>
            </div>
            <div className="p-6 sm:p-8 bg-white">
              <h3 className="text-base font-semibold text-[#00275E] mb-4 pb-2 border-b border-gold/30">
                Application & Programme Fee
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 border-b border-gray-100">
                  <dt className="font-medium text-gray-700">Application Fee</dt>
                  <dd className="text-right font-semibold text-[#00275E]">INR 1,200</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 border-b border-gray-100">
                  <dt className="font-medium text-gray-700">Total Programme Fee</dt>
                  <dd className="text-right font-semibold text-[#00275E]">INR 1,80,000</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 border-b border-gray-100">
                  <dt className="font-medium text-gray-700">Exam & Other Charges</dt>
                  <dd className="text-right text-gray-600 text-xs">As per university norms</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 pt-2">
                  <dt className="font-medium text-gray-700">Payment Modes</dt>
                  <dd className="text-right text-gray-600">One-time, semester-wise, EMI</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Row 3: Scholarships & Finance highlight */}
          <div className="px-6 py-5 sm:px-8 sm:py-6 bg-[#00275E] text-white border-t border-gold-bright/20">
            <h3 className="text-base font-semibold text-gold-bright mb-4 text-center">
              Scholarships & Finance
            </h3>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/90 max-w-3xl mx-auto">
              <li className="flex gap-2 items-center">
                <span className="text-gold-bright shrink-0">•</span>
                Merit and profile-based scholarships for eligible applicants.
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-gold-bright shrink-0">•</span>
                Special consideration for defence, government, and differently-abled candidates.
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-gold-bright shrink-0">•</span>
                No-cost EMI through partner banks for easy instalments.
              </li>
            </ul>
          </div>

          {/* Row 4: Apply Now button - centered */}
          <div className="p-6 sm:p-8 bg-offwhite/30 flex justify-center">
            <motion.button
              type="button"
              onClick={openEnquireModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-[#050B23] px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-base font-semibold shadow-lg hover:bg-gold-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Apply Now
              <span className="text-lg" aria-hidden>→</span>
            </motion.button>
          </div>
        </motion.section>

        {/* Scholarships / Support Summary */}
        <motion.section
          variants={SECTION_VARIANTS}
          className="bg-gradient-to-br from-[#00275E] to-[#00275E]/90 rounded-2xl shadow-lg border border-gold-bright/20 p-6 sm:p-8 text-white mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gold-bright mb-4">
            Support Throughout Your Journey
          </h2>
          <p className="text-white/90 leading-relaxed text-sm sm:text-base">
            From application counselling and documentation guidance to academic support and
            career-readiness inputs, you are accompanied throughout the lifecycle of the programme.
            Financial planning assistance and curated learning resources further enhance your experience.
          </p>
        </motion.section>
      </div>
    </motion.div>
  )
}

export default UniversityDetail
