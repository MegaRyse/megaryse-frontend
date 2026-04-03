import { useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getUniversityBySlug } from '../data/universities'
import { getCoursesByIds } from '../data/courses'
import { useEnquireModal } from '../context/EnquireModalContext'
import { toCourseSlug } from '../utils/courseSlug'
import { getUniversityCourseContent } from '../content/universityCourseContent'

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
  const { slug, universitySlug: universitySlugParam, courseSlug } = useParams<{
    slug?: string
    universitySlug?: string
    courseSlug?: string
  }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { openEnquireModal } = useEnquireModal()
  const universitySlug = universitySlugParam ?? slug
  const state = location.state as { name?: string; course?: CourseState } | null
  const universityFromData = universitySlug ? getUniversityBySlug(universitySlug) : undefined
  const courseFromRoute = useMemo(() => {
    if (!universityFromData || !courseSlug) return undefined
    return getCoursesByIds(universityFromData.courseIds).find(
      (courseItem) => toCourseSlug(courseItem.shortName) === courseSlug
    )
  }, [universityFromData, courseSlug])
  const courseFromRouteState = useMemo<CourseState | undefined>(() => {
    if (!courseFromRoute) return undefined
    return {
      title: `${courseFromRoute.fullName} (${courseFromRoute.shortName})`,
      desc: courseFromRoute.description,
      careers: courseFromRoute.careerPaths,
      icon: courseFromRoute.icon,
      specializations: courseFromRoute.specializations,
    }
  }, [courseFromRoute])
  const courseContent = useMemo(() => {
    if (!universitySlug || !courseSlug) return null
    return getUniversityCourseContent(universitySlug, courseSlug)
  }, [universitySlug, courseSlug])
  const universityName =
    state?.name ?? universityFromData?.name ?? (universitySlug ? slugToName(universitySlug) : 'University')
  const course = state?.course ?? courseFromRouteState
  const highlights = courseContent?.highlights ?? []
  const highlightRows = useMemo(() => getHighlightRows(highlights), [highlights])
  const courseSpecializations = useMemo(() => {
    if (!course) return [] as string[]
    if (courseContent?.specializations?.length) return courseContent.specializations
    return course.specializations ?? []
  }, [course, courseContent])
  const programsByCategory = useMemo(() => {
    if (!universityFromData) return []
    const courses = getCoursesByIds(universityFromData.courseIds)
    const grouped = courses.reduce<Record<string, typeof courses>>((acc, c) => {
      if (!acc[c.category]) acc[c.category] = []
      acc[c.category].push(c)
      return acc
    }, {})
    return Object.entries(grouped)
  }, [universityFromData])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [universitySlug, courseSlug])

  const handleBack = useCallback(() => {
    if (course && universitySlug) {
      navigate('/courses', {
        state: { universityName, universitySlug },
      })
    } else {
      navigate('/universities')
    }
  }, [course, universitySlug, navigate, universityName])

  const handleViewAllCourses = useCallback(() => {
    if (!universityFromData) return
    navigate('/courses', {
      state: {
        universityName: universityFromData.name,
        universitySlug: universityFromData.slug,
      },
    })
  }, [navigate, universityFromData])

  if (course) {
    return (
      <motion.div
        className="w-full bg-offwhite min-h-screen overflow-x-hidden"
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
            <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-4 text-center">
              Programe Overview
            </h2>
            <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start min-w-0 max-md:items-center max-md:justify-items-center">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-md:text-center max-md:mx-auto">
                {courseContent?.overview ?? ''}
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
                    <dd className="text-right">{courseContent?.mode ?? 'N/A'}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium">Duration</dt>
                    <dd className="text-right">{courseContent?.duration ?? 'N/A'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </motion.section>

          {highlights.length > 0 && (
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

            <div className="md:hidden">
              <ul className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
                {highlights.map((item, index) => (
                  <li
                    key={index}
                    className="rounded-xl bg-offwhite/90 border border-gold/20 shadow-sm px-4 py-3 sm:px-5 sm:py-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gold" />
                      <p className="text-sm sm:text-base font-medium text-gray-800 leading-relaxed break-words">
                        {item}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block relative max-w-4xl mx-auto">
              <div className="space-y-8 sm:space-y-10">
                {highlightRows.map((row, rowIndex, allRows) => {
                  const [leftItem, rightItem] = row
                  const singleItem = leftItem ?? rightItem
                  const isLastRow = rowIndex === allRows.length - 1
                  const hasBothCards = Boolean(leftItem && rightItem)
                  const hasSingleCard = Boolean(singleItem && !hasBothCards)

                  return (
                    <div
                      key={rowIndex}
                      className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-12 sm:gap-x-16 gap-y-0 items-stretch"
                    >
                      {!isLastRow && (
                        <div
                          aria-hidden
                          className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-full h-8 sm:h-10 border-l-2 border-dotted border-blue-custom/50"
                        />
                      )}
                      {hasBothCards && (
                        <div
                          aria-hidden
                          className="absolute left-[6%] right-[6%] top-1/2 -translate-y-1/2 hidden sm:block border-t-2 border-dotted border-blue-custom/50 pointer-events-none z-0"
                        />
                      )}
                      <div className="flex justify-end relative z-10">
                        {hasBothCards && leftItem && (
                          <div className="max-w-md rounded-xl bg-offwhite/90 border border-gold/20 shadow-md px-4 py-3 sm:px-5 sm:py-4">
                            <p className="text-base sm:text-[1.02rem] font-medium text-gray-800 leading-relaxed break-words">
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
                        {hasSingleCard && (
                          <span
                            aria-hidden
                            className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-[calc(50%+0.375rem)] h-[calc(50%+2.25rem)] border-l-2 border-dotted border-blue-custom/50"
                          />
                        )}
                      </div>
                      <div className="flex justify-start relative z-10">
                        {hasBothCards && rightItem && (
                          <div className="max-w-md rounded-xl bg-offwhite/90 border border-gold/20 shadow-md px-4 py-3 sm:px-5 sm:py-4">
                            <p className="text-base sm:text-[1.02rem] font-medium text-gray-800 leading-relaxed break-words">
                              {rightItem}
                            </p>
                          </div>
                        )}
                      </div>
                      {hasSingleCard && (
                        <div className="col-span-3 flex flex-col items-center relative z-30">
                          <div className="w-full max-w-[26rem] rounded-xl bg-offwhite/90 border border-gold/20 shadow-md px-4 py-3 sm:px-5 sm:py-4">
                            <p className="text-base sm:text-[1.02rem] font-medium text-gray-800 leading-relaxed break-words text-center">
                              {singleItem}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            </motion.section>
          )}

          {courseSpecializations.length > 0 && (
            <motion.section
              variants={SECTION_VARIANTS}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-4">
                Specializations
              </h2>
              <div className="flex flex-wrap gap-2">
                {courseSpecializations.map((s, i) => (
                  <span
                    key={`${s}-${i}`}
                    className="px-3 py-1.5 rounded-lg bg-gold/10 text-gold font-medium text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.section>
          )}

          {courseContent?.keyTopics && courseContent.keyTopics.length > 0 ? (
            <motion.section
              variants={SECTION_VARIANTS}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-4">
                Key Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {courseContent.keyTopics.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-gold/10 text-gold font-medium text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.section>
          ) : null}

          {/* Programme Structure for selected course */}
          {(courseContent?.eligibility?.length ||
            courseContent?.fees ||
            courseContent?.scholarships?.length) && (
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
                  Duration: {courseContent?.duration ?? 'N/A'}
                </span>
                <span className="inline-flex items-center rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white border border-white/25">
                  Mode: {courseContent?.mode ?? 'N/A'}
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
                  {(courseContent?.eligibility ?? []).map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 sm:p-8 bg-white">
                <h3 className="text-base font-semibold text-[#00275E] mb-4 pb-2 border-b border-gold/30">
                  Application & Programme Fee
                </h3>
                <dl className="space-y-3 text-sm">
                  {courseContent?.fees?.applicationFee && (
                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 border-b border-gray-100">
                      <dt className="font-medium text-gray-700">Application Fee</dt>
                      <dd className="text-right font-semibold text-[#00275E]">
                        {courseContent.fees.applicationFee}
                      </dd>
                    </div>
                  )}
                  {courseContent?.fees?.totalFee && (
                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 border-b border-gray-100">
                      <dt className="font-medium text-gray-700">Total Programme Fee</dt>
                      <dd className="text-right font-semibold text-[#00275E]">
                        {courseContent.fees.totalFee}
                      </dd>
                    </div>
                  )}
                  {courseContent?.fees?.examAndOtherCharges && (
                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 border-b border-gray-100">
                      <dt className="font-medium text-gray-700">Exam & Other Charges</dt>
                      <dd className="text-right text-gray-600 text-xs">
                        {courseContent.fees.examAndOtherCharges}
                      </dd>
                    </div>
                  )}
                  {courseContent?.fees?.paymentModes && (
                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 pt-2">
                      <dt className="font-medium text-gray-700">Payment Modes</dt>
                      <dd className="text-right text-gray-600">
                        {courseContent.fees.paymentModes}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {/* Row 3: Scholarships & Finance highlight */}
            {!!courseContent?.scholarships?.length && (
              <div className="px-6 py-5 sm:px-8 sm:py-6 bg-[#00275E] text-white border-t border-gold-bright/20">
                <h3 className="text-base font-semibold text-gold-bright mb-4 text-center">
                  Scholarships & Finance
                </h3>
                <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/90 max-w-3xl mx-auto">
                  {courseContent.scholarships.map((item) => (
                    <li key={item} className="flex gap-2 items-center">
                      <span className="text-gold-bright shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
          )}


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
            <p className="text-gray-600 text-sm mb-4">
              {universityFromData.location}
            </p>
            {universityFromData.admissionStatus && (
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                  Admissions {universityFromData.admissionStatus}
                </span>
                {universityFromData.benefits?.emi && (
                  <span className="inline-flex items-center rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-[#00275E]">
                    {universityFromData.benefits.emi}
                  </span>
                )}
              </div>
            )}
            {universityFromData.benefits?.scholarships &&
              universityFromData.benefits.scholarships.length > 0 && (
                <div className="mb-6 rounded-xl border border-gold/20 bg-offwhite/80 p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#00275E] mb-2">
                    Scholarships
                  </p>
                  <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-700">
                    {universityFromData.benefits.scholarships.map((s) => (
                      <li key={s} className="flex items-center gap-1">
                        <span className="text-gold">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            <div className="space-y-6">
              {programsByCategory.map(([category, list]) => (
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
              ))}
            </div>
            <motion.button
              onClick={handleViewAllCourses}
              className="mt-6 inline-block bg-[#00275E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00275E]/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Courses
            </motion.button>
          </motion.section>
        )}

        {!universityFromData && (
          <motion.section
            variants={SECTION_VARIANTS}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-2">No data available</h2>
            <p className="text-gray-600 text-sm">
              Content for this university is not added yet.
            </p>
          </motion.section>
        )}
      </div>
    </motion.div>
  )
}

export default UniversityDetail
