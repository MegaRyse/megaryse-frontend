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

const NMIMS_BBA_GENERAL_HIGHLIGHTS = [
  '3-year undergraduate programme structured across 6 semesters',
  'Comprehensive curriculum covering core areas like Management, Finance, Marketing, Economics, and Business Analytics',
  'Strong foundation through subjects such as Principles of Management, Financial Accounting, and Business Communication',
  'Progressive learning with advanced topics like Strategic Management, Project Management, and Digital Marketing',
  'Industry-relevant curriculum aligned with current business trends and practices',
  'Skill-based learning focus including critical thinking, problem-solving, and decision-making',
  'Emphasis on employability through soft skills, design thinking, and entrepreneurial exposure',
  'Exposure to real-world business challenges and practical applications',
  'Modern IT-enabled learning environment to support academic and professional growth',
  'Elective options include Marketing and Finance, along with Business Analytics.',
]

const getHighlightRows = (items: string[]): string[][] => {
  const rows: string[][] = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2))
  }
  return rows
}

const deriveDurationFromText = (text: string): string | undefined => {
  const normalized = text.toLowerCase()
  const yearsMatch = normalized.match(/\b(one|two|three|four|five|six|\d+)\s*[- ]?\s*year\b/)
  if (yearsMatch?.[1]) {
    const token = yearsMatch[1]
    const wordToNumber: Record<string, string> = {
      one: '1',
      two: '2',
      three: '3',
      four: '4',
      five: '5',
      six: '6',
    }
    const value = wordToNumber[token] ?? token
    return `${value} Years`
  }
  const monthsMatch = normalized.match(/\b(\d+)\s*[- ]?\s*month\b/)
  if (monthsMatch?.[1]) return `${monthsMatch[1]} Months`
  return undefined
}

const deriveModeFromText = (text: string): string | undefined => {
  if (/\bonline\b/i.test(text)) return 'Online'
  if (/\bdistance\b/i.test(text)) return 'Distance'
  return undefined
}

const SMU_MBA_SPECIALIZATIONS = [
  'Marketing',
  'Finance',
  'Human Resource Management',
  'Systems',
  'Operations & Supply Chain Management',
  'Healthcare',
]

const SMU_MCA_SPECIALIZATIONS = [
  'Cloud Computing',
  'Data Warehousing & Data Mining',
  'Machine Learning',
  'Distributed Systems & Grid Computing',
]

const MUJ_BCA_SPECIALIZATIONS = [
  'Cloud Computing',
  'Data Science & Analytics',
  'Cyber Security',
]

const splitHeadingAndContent = (value: string): { heading: string; content: string } => {
  const [heading, ...rest] = value.split(':')
  return {
    heading: heading.trim(),
    content: rest.join(':').trim(),
  }
}

const splitFocusOutcomeLines = (content: string): string[] => {
  if (!content) return []
  return content
    .replace(/\s+(Focus:)/g, '\n$1')
    .replace(/\s+(Outcome:)/g, '\n$1')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

type ParsedElective = {
  title: string
  summary: string
  highlights: string[]
}

type ParsedStructuredDescription = {
  overview: string
  highlights: string[]
  electives: ParsedElective[]
  eligibility: string[]
  fees?: {
    applicationFee?: string
    totalFee?: string
  }
  noCostEmi?: string
  scholarships: string[]
}

const cleanSectionText = (value: string): string =>
  value
    .replace(/\r\n/g, '\n')
    .replace(/\u2022/g, '-')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

const extractSection = (source: string, startHeading: RegExp, endHeading?: RegExp): string => {
  const start = source.match(startHeading)
  if (!start || start.index === undefined) return ''
  const fromStart = source.slice(start.index + start[0].length).trim()
  if (!endHeading) return fromStart
  const end = fromStart.match(endHeading)
  if (!end?.index && end?.index !== 0) return fromStart
  return fromStart.slice(0, end.index).trim()
}

const parseStructuredCourseDescription = (rawDescription: string): ParsedStructuredDescription => {
  const normalized = cleanSectionText(rawDescription)
  if (!normalized) {
    return { overview: '', highlights: [], electives: [], eligibility: [], scholarships: [] }
  }

  const overview = normalized
    .split(/\n\s*(Electives Offered|Programme Highlights|Diploma Programme Highlights)\s*\n/i)[0]
    .replace(/^[A-Z][A-Z\s()./&-]*\s+[–-]?\s*PROGRAMME OVERVIEW\s*/i, '')
    .trim()

  const highlightsBlock = extractSection(
    normalized,
    /\n\s*(Programme Highlights|Diploma Programme Highlights)\s*\n/i,
    /\n\s*(Electives Offered|Eligibility)\s*\n/i
  )
  const parsedHighlights = highlightsBlock
    .split('\n')
    .map((line) => line.trim())
    .map((line) => line.replace(/^[-*•]\s*/, '').trim())
    .filter(Boolean)

  const electivesBlock = extractSection(normalized, /\n\s*Electives Offered\s*\n/i, /\n\s*Eligibility\s*\n/i)
  const electives: ParsedElective[] = []
  const electiveRegex = /(?:^|\n)(\d+)\.\s+([^\n]+)\n+([\s\S]*?)(?=(?:\n\d+\.\s+[^\n]+)|$)/g
  let electiveMatch: RegExpExecArray | null
  while ((electiveMatch = electiveRegex.exec(electivesBlock)) !== null) {
    const title = electiveMatch[2].trim()
    const body = electiveMatch[3].trim()
    const [summaryPart = ''] = body.split(/\n\s*Highlights:\s*\n/i)
    const highlightsPart = body.split(/\n\s*Highlights:\s*\n/i)[1] ?? ''
    const highlights = highlightsPart
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('-'))
      .map((line) => line.replace(/^-+\s*/, '').trim())
      .filter(Boolean)

    electives.push({
      title,
      summary: summaryPart.trim(),
      highlights,
    })
  }

  const eligibilityBlocks = normalized.match(
    /(?:^|\n)\s*Eligibility\s*\n([\s\S]*?)(?=\n\s*Programme Fee\s*\n|$)/gi
  )
  const eligibility = Array.from(
    new Set(
      (eligibilityBlocks ?? [])
        .map((block) => block.replace(/^(?:^|\n)\s*Eligibility\s*\n/i, '').trim())
        .map((block) => block.replace(/\s+/g, ' ').trim())
        .filter(Boolean)
    )
  )

  const programmeFeeBlocks = normalized.match(
    /(?:^|\n)\s*Programme Fee\s*\n([\s\S]*?)(?=\n\s*No-Cost EMI Option Available\s*\n|$)/gi
  )
  const applicationFees = new Set<string>()
  const totalFeeValues = new Set<string>()
  for (const feeBlockWithHeading of programmeFeeBlocks ?? []) {
    const feeBlock = feeBlockWithHeading.replace(/^(?:^|\n)\s*Programme Fee\s*\n/i, '').trim()
    const applicationFeeMatch = feeBlock.match(/Application Fee:\s*([^\n]+)/i)
    if (applicationFeeMatch?.[1]?.trim()) applicationFees.add(applicationFeeMatch[1].trim())
    const totalFeeMatch = feeBlock.match(/Total Programme Fee:\s*([^\n]+)/i)
    if (totalFeeMatch?.[1]?.trim()) totalFeeValues.add(totalFeeMatch[1].trim())
    const totalFeeLines = feeBlock
      .split('\n')
      .map((line) => line.trim())
      .map((line) => line.replace(/^[-*•]\s*/, '').trim())
      .filter((line) => !/^Application Fee\s*:/i.test(line))
      .filter((line) => !/^Total Programme Fee\s*:/i.test(line))
      .filter((line) => /^[A-Za-z][A-Za-z0-9\s()./&+-]*\s*[-:]\s*[A-Za-z0-9₹$,\s]+$/i.test(line))
      .map((line) => line.replace(/\s*-\s*/g, ': ').trim())
    for (const line of totalFeeLines) totalFeeValues.add(line)
  }
  const applicationFeeValue = Array.from(applicationFees)[0]
  const totalFeeValue = Array.from(totalFeeValues).join(' | ')

  const noCostEmiBlocks = normalized.match(
    /(?:^|\n)\s*No-Cost EMI Option Available\s*\n([\s\S]*?)(?=\n\s*Scholarships Available\s*\n|$)/gi
  )
  const noCostEmi = Array.from(
    new Set(
      (noCostEmiBlocks ?? [])
        .map((block) => block.replace(/^(?:^|\n)\s*No-Cost EMI Option Available\s*\n/i, '').trim())
        .map((block) => block.replace(/\s+/g, ' ').trim())
        .filter(Boolean)
    )
  ).join(' ')

  const scholarshipsBlocks = normalized.match(
    /(?:^|\n)\s*Scholarships Available\s*\n([\s\S]*?)(?=\n\s*Eligibility\s*\n|$)/gi
  )
  const scholarships = Array.from(
    new Set(
      (scholarshipsBlocks ?? [])
        .map((block) => block.replace(/^(?:^|\n)\s*Scholarships Available\s*\n/i, '').trim())
        .map((block) => block.replace(/\s+/g, ' ').trim())
        .filter(Boolean)
    )
  )

  return {
    overview,
    highlights: parsedHighlights,
    electives,
    eligibility,
    fees:
      applicationFeeValue || totalFeeValue
        ? {
            applicationFee: applicationFeeValue,
            totalFee: totalFeeValue,
          }
        : undefined,
    noCostEmi,
    scholarships,
  }
}

/** Long overviews become multiple paragraphs; explicit blank lines in content are always respected. */
const splitOverviewIntoParagraphs = (overview: string): string[] => {
  const normalized = overview.replace(/\r\n/g, '\n').trim()
  if (!normalized) return []

  const explicit = normalized
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
  if (explicit.length > 1) return explicit

  const text = explicit[0] ?? normalized.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
  const longThreshold = 380
  if (text.length < longThreshold) return [text]

  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
  if (sentences.length <= 1) return [text]

  const paragraphs: string[] = []
  let chunk: string[] = []
  let chunkLen = 0
  const targetLen = 300
  for (const sentence of sentences) {
    if (chunk.length === 0) {
      chunk.push(sentence)
      chunkLen = sentence.length
      continue
    }
    const joinedLen = chunkLen + sentence.length + 1
    if (joinedLen >= targetLen || chunk.length >= 2) {
      paragraphs.push(chunk.join(' '))
      chunk = [sentence]
      chunkLen = sentence.length
    } else {
      chunk.push(sentence)
      chunkLen = joinedLen
    }
  }
  if (chunk.length) paragraphs.push(chunk.join(' '))
  return paragraphs.length ? paragraphs : [text]
}

const splitEligibilityIntoPoints = (items: string[]): string[] => {
  return items
    .flatMap((item) =>
      item
        .split('.')
        .map((part) => part.trim())
        .filter(Boolean)
    )
    .map((point) => `${point}.`)
}

/** Splits strings like "Indian: ₹99,000 | NRI: $1,458" into rows for layout. */
const parseFeePipeSegments = (raw: string): { label: string; value: string }[] => {
  const trimmed = raw.trim()
  if (!trimmed) return []
  const chunks = trimmed.split(/\s*\|\s*/)
  const seen = new Set<string>()
  const rows: { label: string; value: string }[] = []
  const normalizeFeeText = (text: string): string =>
    text
      .replace(/^[-*•–]+\s*/, '')
      .replace(/\s+/g, ' ')
      .trim()

  for (const chunk of chunks) {
    const c = chunk.trim()
    if (!c) continue
    const i = c.indexOf(':')
    if (i > 0 && i < c.length - 1) {
      const label = normalizeFeeText(c.slice(0, i))
      const value = normalizeFeeText(c.slice(i + 1))
      const key = `${label}::${value}`.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      rows.push({ label, value })
    } else {
      const value = normalizeFeeText(c)
      const key = `::${value}`.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      rows.push({ label: '', value })
    }
  }
  return rows
}

const FeeCard = ({
  title,
  value,
  variant = 'primary',
}: {
  title: string
  value: string
  variant?: 'primary' | 'muted'
}) => {
  const segments = parseFeePipeSegments(value)
  const useSplitRows = segments.length > 1 || (segments.length === 1 && Boolean(segments[0].label))
  const valuePrimary = variant === 'primary'

  return (
    <div className="rounded-xl border border-gold/18 bg-gradient-to-b from-[#faf8f5] to-white px-4 py-3.5 shadow-sm sm:px-5 sm:py-4">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#00275E]/50">{title}</p>
      {useSplitRows ? (
        <ul className="mt-3 divide-y divide-gray-200/80">
          {segments.map((row, idx) => (
            <li key={idx} className="py-2.5 first:pt-0 last:pb-0">
              {row.label ? (
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-x-4">
                  <span className="min-w-0 text-sm font-medium leading-snug text-gray-700">{row.label}</span>
                  <span
                    className={`min-w-0 shrink-0 text-sm leading-snug sm:max-w-[58%] sm:text-right ${
                      valuePrimary ? 'font-semibold tabular-nums text-[#00275E]' : 'text-gray-600'
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ) : (
                <p
                  className={`text-sm leading-relaxed ${
                    valuePrimary ? 'font-semibold text-[#00275E]' : 'text-gray-600'
                  }`}
                >
                  {row.value}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p
          className={`mt-2 text-sm leading-relaxed ${
            valuePrimary ? 'font-semibold text-[#00275E]' : 'text-gray-600'
          }`}
        >
          {value}
        </p>
      )}
    </div>
  )
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
  const effectiveCourseDescription = courseFromRoute?.description ?? course?.desc ?? ''
  const isProfessionalOrCertificateCourse = Boolean(
    courseFromRoute?.category && /professional|certificate/i.test(courseFromRoute.category)
  )
  const isMujBCom =
    universitySlug === 'manipal-university-jaipur' && courseSlug === 'b-com'
  const isDyPatilCourse = universitySlug === 'dy-patil-pune'
  const isDyPatilMca = universitySlug === 'dy-patil-pune' && courseFromRoute?.id === 6
  const isVitMcaOrMscDs = universitySlug === 'vit-online' && [6, 21].includes(courseFromRoute?.id ?? -1)
  const isBennetCourse = universitySlug === 'bennet-university'
  const highlights = courseContent?.highlights ?? []
  const parsedDescription = useMemo(
    () => parseStructuredCourseDescription(effectiveCourseDescription),
    [effectiveCourseDescription]
  )
  const effectiveDuration = useMemo(() => {
    const fromContent = courseContent?.duration?.trim()
    if (fromContent) return fromContent
    return deriveDurationFromText(effectiveCourseDescription) ?? 'N/A'
  }, [courseContent?.duration, effectiveCourseDescription])
  const effectiveMode = useMemo(() => {
    const fromContent = courseContent?.mode?.trim()
    if (fromContent) return fromContent
    if (universitySlug === 'nmims-university' && courseFromRoute?.id === 17) return 'Online'
    return deriveModeFromText(effectiveCourseDescription) ?? 'N/A'
  }, [courseContent?.mode, universitySlug, courseFromRoute?.id, effectiveCourseDescription])
  const effectiveOverview = useMemo(() => {
    // Match Courses.tsx getCourseListDescription: university overview, else CourseMaster.description
    const fromCoursesPage =
      universitySlug && courseFromRoute
        ? courseContent?.overview ?? courseFromRoute.description
        : courseFromRoute?.description ?? course?.desc ?? ''
    const trimmed = (fromCoursesPage ?? '').trim()
    if (trimmed) {
      // `courseContent.overview` can include extra blocks like "Electives Offered".
      // Those blocks are rendered separately on the page, so we only return the overview portion.
      const parsedForDisplay = parseStructuredCourseDescription(trimmed)
      return parsedForDisplay.overview || trimmed
    }
    if (parsedDescription.overview) return parsedDescription.overview
    return ''
  }, [
    universitySlug,
    courseFromRoute,
    courseContent?.overview,
    course?.desc,
    parsedDescription.overview,
  ])
  const effectiveEligibility = useMemo(() => {
    if (isBennetCourse && courseContent?.eligibility?.length) return courseContent.eligibility
    return parsedDescription.eligibility.length ? parsedDescription.eligibility : courseContent?.eligibility ?? []
  }, [isBennetCourse, parsedDescription.eligibility, courseContent?.eligibility])
  const courseSectionOverrides = useMemo(() => {
    if (universitySlug === 'dy-patil-pune' && courseFromRoute?.id === 2) {
      return {
        eligibility: [
          'Candidates must have completed HSC (10+2) or an equivalent examination from a recognized board in any stream, with English as one of the subjects.',
        ],
      }
    }
    if (universitySlug === 'dy-patil-pune' && courseFromRoute?.id === 14) {
      return {
        eligibility: [
          'Candidates must have a Bachelor’s degree from a recognized university with a minimum of 50% aggregate marks (45% for reserved categories), along with at least 3 years of work experience. Selection is based on a personal interview.',
        ],
      }
    }
    if (universitySlug === 'dy-patil-pune' && courseFromRoute?.id === 6) {
      return {
        eligibility: [
          'Candidates must have a Bachelor’s degree in any discipline (B.E., B.Tech., B.Sc., B.Com., B.A., B.Voc., BCA, etc.), preferably with Mathematics at the 10+2 level or at graduation, with a minimum of 50% aggregate marks (45% for reserved categories)',
        ],
      }
    }
    if (universitySlug === 'dy-patil-pune' && courseFromRoute?.id === 15) {
      return {
        eligibility: [
          'Candidates must have a Bachelor’s degree, or be a graduate in any discipline, or hold a diploma from a recognized/approved board or university.',
        ],
      }
    }
    if (universitySlug === 'dy-patil-pune' && courseFromRoute?.id === 16) {
      return {
        eligibility: [
          'Candidates must have a Bachelor’s degree, or be a graduate in any discipline, or hold a diploma from a recognized/approved board or university.',
        ],
      }
    }
    if (universitySlug === 'manipal-university-jaipur' && courseFromRoute?.id === 3) {
      return {
        eligibility: [
          'Applicants must have completed 10+2 education from a recognized national or state board or hold a 10+3 diploma from a recognized national or state institute. Applicants must have secured a minimum of 40% aggregate marks in 10+2 or diploma (35% for reserved categories). Applicants who have completed 10+2 or graduate-level education outside India must submit a certificate of equivalence issued by the Association of Indian Universities (AIU).',
        ],
      }
    }
    if (universitySlug === 'sikkim-manipal-university' && courseFromRoute?.id === 22) {
      return {
        eligibility: [
          'Applicants who have completed 10+2 and graduate-level education with an aggregated of 50% and 45% for reserved categories. The applicants from outside India must submit a certificate of equivalence issued by the Association of Indian Universities (AIU).',
        ],
      }
    }
    if (universitySlug === 'sikkim-manipal-university' && courseFromRoute?.id === 6) {
      return {
        eligibility: [
          'Candidates must have completed a 10+2+3-year bachelor’s degree in Computer Applications, Computer Science, Information Technology, or an equivalent qualification from a recognized university with at least 50% marks (45% for reserved categories). Graduates from other streams such as Science, Business Administration, Business Management, Arts & Humanities, or Commerce are also eligible; however, they must complete a compulsory bridge course in Fundamentals of Computer and IT during the first semester. Additionally, candidates who have not studied Mathematics at the 10+2 or bachelor’s level will be required to complete a bridge course in Mathematics alongside their Semester 1 courses.',
        ],
      }
    }
    if (universitySlug === 'sikkim-manipal-university' && courseFromRoute?.id === 26) {
      return {
        eligibility: [
          'Candidates must have completed a 10+2+3-year bachelor’s degree from a recognized university or institution, or possess an equivalent qualification recognized by the Association of Indian Universities (AIU). Applicants who have completed their 10+2 or undergraduate education outside India are required to submit a certificate of equivalence issued by the Association of Indian Universities to be eligible for admission.',
        ],
      }
    }
    if (universitySlug === 'sikkim-manipal-university' && courseFromRoute?.id === 27) {
      return {
        eligibility: [
          'Candidates must have completed a 10+2+3-year bachelor’s degree from a recognized university or institution, or possess an equivalent qualification recognized by the Association of Indian Universities (AIU). Applicants who have completed their 10+2 or undergraduate education outside India are required to submit a Certificate of Equivalence issued by the Association of Indian Universities (AIU) at the time of admission.',
        ],
      }
    }
    if (universitySlug === 'sikkim-manipal-university' && courseFromRoute?.id === 28) {
      return {
        eligibility: [
          'Candidates must have completed a 10+2+3-year bachelor’s degree from a recognized university or institution, or possess an equivalent qualification recognized by the Association of Indian Universities (AIU). Applicants who have completed their 10+2 or undergraduate education outside India are required to submit a Certificate of Equivalence issued by the Association of Indian Universities (AIU) at the time of admission.',
        ],
      }
    }
    if (universitySlug === 'manipal-university-jaipur' && courseFromRoute?.id === 23) {
      return {
        eligibility: [
          'Candidates must have a BSc degree or a $10+2+3/4$ years equivalent bachelor\'s degree with Mathematics as a compulsory subject. The degree must be from a university or institution recognized by the Association of Indian Universities (AIU) or another competent body. Candidates with $10+2$ or graduate-level education from outside India must provide a certificate of equivalence from the AIU.',
        ],
      }
    }
    if (universitySlug === 'manipal-university-jaipur' && courseFromRoute?.id === 24) {
      return {
        eligibility: [
          'Candidates must have successfully completed a three-year bachelor\'s degree ($10+2+3$) from a recognized university or institution. Alternatively, they may hold an equivalent qualification that is recognized by the Association of Indian Universities (AIU). Furthermore, any applicants who have completed their 10+2 or graduate-level education outside of India are required to provide a certificate of equivalence issued specifically by the AIU to confirm their eligibility.',
        ],
      }
    }
    if (universitySlug === 'manipal-university-jaipur' && courseFromRoute?.id === 25) {
      return {
        eligibility: [
          'Applicants must have completed a three-year bachelor\'s degree (10+2+3) from a recognized university or institution, or hold an equivalent qualification recognized by the Association of Indian Universities (AIU). Additionally, candidates who have completed their 10+2 or graduate-level education outside of India are required to produce a certificate of equivalence issued by the AIU to confirm their eligibility.',
        ],
      }
    }
    if (universitySlug === 'vit-online' && courseFromRoute?.id === 21) {
      return {
        eligibility: [
          'Applicants must hold a bachelor’s degree of at least three years’ duration in statistics, mathematics, computer science, engineering, technology, or a related discipline from a recognized university or institution, with a minimum of two years of coursework in mathematics or statistics, and must have achieved an aggregate grade of at least 50% (45% for reserved categories).',
        ],
      }
    }
    if (universitySlug === 'vit-online' && courseFromRoute?.id === 6) {
      return {
        eligibility: [
          'Applicants must have completed a BCA, B.Sc. (Computer Science/IT), or a Bachelor’s degree in Computer Science/Engineering/IT (or equivalent) with at least 50% marks (45% for reserved categories). Alternatively, applicants with any bachelor’s degree of minimum three years’ duration from a recognized university are eligible, provided they have secured at least 50% marks (45% for reserved categories) and studied Mathematics at the 10+2 or graduation level.',
        ],
      }
    }
    if (courseFromRoute?.id !== 19) return null
    return {
      eligibility: [
        "Applicants must have completed 10+2 (higher secondary education) from a recognised board, with a minimum of 50% aggregate marks for General category and 45% aggregate marks for Reserved categories (SC/ST/OBC/PwD).",
      ],
      fees: {
        applicationFee: "11,200",
        totalFee: "110,000",
        paymentModes:
          "Benefit from our no-cost EMI facility, designed to make financing your education simple and manageable.",
      },
      scholarships: [
        "We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.",
      ],
    }
  }, [courseFromRoute?.id, universitySlug])
  const effectiveFees = useMemo(() => {
    if (courseSectionOverrides?.fees) {
      return {
        applicationFee: courseSectionOverrides.fees.applicationFee,
        totalFee: courseSectionOverrides.fees.totalFee,
        examAndOtherCharges: undefined,
        paymentModes: courseSectionOverrides.fees.paymentModes,
      }
    }
    // Amity B.Com/BBA/BCA/BA/MBA/MCA/M.Com/M.Sc DS/MA should always use the curated university-course content fees.
    if (universitySlug === 'amity-university' && [1, 2, 3, 4, 5, 6, 21, 22, 29].includes(courseFromRoute?.id ?? -1) && courseContent?.fees) {
      return courseContent.fees
    }
    if (universitySlug === 'manipal-university-jaipur' && courseFromRoute?.id === 5) {
      return {
        applicationFee: courseContent?.fees?.applicationFee,
        totalFee: '180,000',
        examAndOtherCharges: undefined,
        paymentModes: courseContent?.fees?.paymentModes,
      }
    }
    // Bennett courses should always use curated university-course content fees.
    if (isBennetCourse && courseContent?.fees) {
      return courseContent.fees
    }
    if (parsedDescription.fees?.applicationFee || parsedDescription.fees?.totalFee) {
      return {
        applicationFee: parsedDescription.fees?.applicationFee,
        totalFee: parsedDescription.fees?.totalFee,
        examAndOtherCharges: undefined,
        paymentModes: parsedDescription.noCostEmi || courseContent?.fees?.paymentModes,
      }
    }
    return courseContent?.fees
  }, [
    courseSectionOverrides?.fees,
    isBennetCourse,
    universitySlug,
    courseFromRoute?.id,
    courseContent?.fees,
    parsedDescription.fees,
    parsedDescription.noCostEmi,
  ])
  const effectiveEligibilityResolved = useMemo(
    () => courseSectionOverrides?.eligibility ?? effectiveEligibility,
    [courseSectionOverrides?.eligibility, effectiveEligibility]
  )
  const eligibilityPointsResolved = useMemo(
    () =>
      isDyPatilMca || isVitMcaOrMscDs
        ? effectiveEligibilityResolved
        : splitEligibilityIntoPoints(effectiveEligibilityResolved),
    [effectiveEligibilityResolved, isDyPatilMca, isVitMcaOrMscDs]
  )
  const effectiveScholarships = useMemo(
    () => {
      if (courseSectionOverrides?.scholarships) return courseSectionOverrides.scholarships
      if (isBennetCourse && courseContent?.scholarships?.length) return courseContent.scholarships
      return (
      parsedDescription.scholarships.length
        ? parsedDescription.scholarships
        : courseContent?.scholarships ?? []
      )
    },
    [courseSectionOverrides?.scholarships, isBennetCourse, parsedDescription.scholarships, courseContent?.scholarships]
  )
  const isNmimsBba = universitySlug === 'nmims-university' && courseFromRoute?.id === 17
  const isAmityBbaBcomOrBca =
    universitySlug === 'amity-university' && [1, 2, 3, 4, 5, 6, 22, 29].includes(courseFromRoute?.id ?? -1)
  const effectiveHighlights = useMemo(
    () =>
      isNmimsBba
        ? NMIMS_BBA_GENERAL_HIGHLIGHTS
        : highlights.length > 0
        ? highlights
        : parsedDescription.electives.length > 0
          ? parsedDescription.electives.flatMap((e) => e.highlights)
          : parsedDescription.highlights,
    [isNmimsBba, highlights, parsedDescription.electives, parsedDescription.highlights]
  )
  const effectiveHighlightRows = useMemo(() => getHighlightRows(effectiveHighlights), [effectiveHighlights])
  const courseSpecializations = useMemo(() => {
    if (!course) return [] as string[]
    if (universitySlug === 'sikkim-manipal-university' && courseFromRoute?.id === 5) {
      return SMU_MBA_SPECIALIZATIONS
    }
    if (universitySlug === 'sikkim-manipal-university' && courseFromRoute?.id === 6) {
      return SMU_MCA_SPECIALIZATIONS
    }
    if (universitySlug === 'manipal-university-jaipur' && courseFromRoute?.id === 3) {
      return MUJ_BCA_SPECIALIZATIONS
    }
    if (courseContent?.specializations?.length) return courseContent.specializations
    if (parsedDescription.electives.length) return parsedDescription.electives.map((e) => e.title)
    return course.specializations ?? []
  }, [course, courseContent, parsedDescription.electives, universitySlug, courseFromRoute?.id])
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
            <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-center min-w-0 max-md:justify-items-center">
              <div className="space-y-4 max-md:text-center max-md:mx-auto min-w-0">
                {(isDyPatilCourse
                  ? [effectiveOverview.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim()]
                  : splitOverviewIntoParagraphs(effectiveOverview)
                ).map((para, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base text-gray-600 leading-relaxed max-md:mx-auto"
                  >
                    {para}
                  </p>
                ))}
              </div>
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
                    <dd className="text-right">{effectiveMode}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium">Duration</dt>
                    <dd className="text-right">{effectiveDuration}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </motion.section>

          {effectiveHighlights.length > 0 && (
            <motion.section
              variants={SECTION_VARIANTS}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
            >
            <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-3 text-center">
              {universitySlug === 'nmims-university' && courseFromRoute?.id === 19
                ? 'Specializations'
                : 'Programme Highlights'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 text-center max-w-2xl mx-auto mb-6">
            </p>

            <div className="md:hidden">
              <ul className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
                {effectiveHighlights.map((item, index) => (
                  (() => {
                    const { heading, content } = splitHeadingAndContent(item)
                    return (
                  <li
                    key={index}
                    className="w-full rounded-xl bg-offwhite border border-gold/20 shadow-sm px-4 py-3 sm:px-5 sm:py-4 min-h-[112px] flex items-center"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gold" />
                      <div className="text-sm sm:text-base text-gray-800 leading-relaxed break-words">
                        <p className="font-semibold">{heading}</p>
                        {content ? <p className="mt-1 text-gray-700">{content}</p> : null}
                      </div>
                    </div>
                  </li>
                    )
                  })()
                ))}
              </ul>
            </div>
            <div className="hidden md:block relative max-w-4xl mx-auto">
              <div className="space-y-8 sm:space-y-10">
                {effectiveHighlightRows.map((row, rowIndex, allRows) => {
                  const [leftItem, rightItem] = row
                  const singleItem = leftItem ?? rightItem
                  const leftSplit = leftItem ? splitHeadingAndContent(leftItem) : null
                  const rightSplit = rightItem ? splitHeadingAndContent(rightItem) : null
                  const singleSplit = singleItem ? splitHeadingAndContent(singleItem) : null
                  const isLastRow = rowIndex === allRows.length - 1
                  const hasBothCards = Boolean(leftItem && rightItem)
                  const hasSingleCard = Boolean(singleItem && !hasBothCards)

                  return (
                    <div
                      key={rowIndex}
                      className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-4 sm:gap-x-6 gap-y-0 items-stretch"
                    >
                      {!isLastRow && (
                        <div
                          aria-hidden
                          className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-full h-8 sm:h-10 border-l-2 border-dotted border-blue-custom/50"
                        />
                      )}
                      <div className="relative z-20 min-w-0 flex w-full min-h-[3rem] justify-end items-center">
                        {hasBothCards && leftItem && (
                          <div className="w-full max-w-[26rem] rounded-xl bg-offwhite border border-gold/20 shadow-md px-4 py-3 sm:px-5 sm:py-4 min-h-[140px] flex items-center">
                            <div className="text-base sm:text-[1.02rem] text-gray-800 leading-relaxed break-words">
                              <p className="font-semibold">{leftSplit?.heading}</p>
                              {leftSplit?.content ? <p className="mt-1 text-gray-700">{leftSplit.content}</p> : null}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="relative z-0 flex items-center justify-center min-w-[0.75rem]">
                        {rowIndex > 0 && (
                          <span
                            aria-hidden
                            className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 h-[calc(50%-0.375rem)] border-l-2 border-dotted border-blue-custom/50"
                          />
                        )}
                        <span className="relative inline-block h-3 w-3 shrink-0">
                          {hasBothCards && (
                            <>
                              <span
                                aria-hidden
                                className="pointer-events-none absolute right-1/2 top-1/2 z-0 hidden h-0 w-[5.5rem] -translate-y-1/2 border-t-2 border-dotted border-blue-custom/50 sm:block sm:w-[7.5rem]"
                              />
                              <span
                                aria-hidden
                                className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-0 w-[5.5rem] -translate-y-1/2 border-t-2 border-dotted border-blue-custom/50 sm:block sm:w-[7.5rem]"
                              />
                            </>
                          )}
                          <span className="relative z-10 block h-3 w-3 rounded-full border-2 border-gold bg-offwhite shadow-[0_0_0_3px_rgba(201,169,120,0.25)]" />
                        </span>
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
                      <div className="relative z-20 min-w-0 flex w-full min-h-[3rem] justify-start items-center">
                        {hasBothCards && rightItem && (
                          <div className="w-full max-w-[26rem] rounded-xl bg-offwhite border border-gold/20 shadow-md px-4 py-3 sm:px-5 sm:py-4 min-h-[140px] flex items-center">
                            <div className="text-base sm:text-[1.02rem] text-gray-800 leading-relaxed break-words">
                              <p className="font-semibold">{rightSplit?.heading}</p>
                              {rightSplit?.content ? <p className="mt-1 text-gray-700">{rightSplit.content}</p> : null}
                            </div>
                          </div>
                        )}
                      </div>
                      {hasSingleCard && (
                        <div className="col-span-3 flex flex-col items-center relative z-30">
                          <div className="w-full max-w-[26rem] rounded-xl bg-offwhite border border-gold/20 shadow-md px-4 py-3 sm:px-5 sm:py-4 min-h-[140px] flex items-center">
                            <div className="text-base sm:text-[1.02rem] text-gray-800 leading-relaxed break-words text-center">
                              <p className="font-semibold">{singleSplit?.heading}</p>
                              {singleSplit?.content ? <p className="mt-1 text-gray-700">{singleSplit.content}</p> : null}
                            </div>
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

          {parsedDescription.electives.length > 0 && (
            <motion.section
              variants={SECTION_VARIANTS}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-5">Electives Offered</h2>
              <div className="space-y-5">
                {parsedDescription.electives.map((elective, index) => (
                  <div key={`${elective.title}-${index}`} className="rounded-xl border border-gold/20 bg-offwhite/60 p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-[#00275E] mb-2">{elective.title}</h3>
                    {elective.summary ? (
                      <p className="text-sm text-gray-700 leading-relaxed mb-3">{elective.summary}</p>
                    ) : null}
                    {elective.highlights.length > 0 ? (
                      <ul className="space-y-2">
                        {elective.highlights.map((point, pointIndex) => (
                          <li key={`${point}-${pointIndex}`} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                            <span className="mt-1 h-2 w-2 rounded-full bg-gold shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {!isProfessionalOrCertificateCourse &&
          parsedDescription.electives.length === 0 &&
          courseSpecializations.length > 0 &&
          universitySlug !== 'dy-patil-pune' &&
          !(
            (universitySlug === 'sikkim-manipal-university' && [4, 26, 27, 28].includes(courseFromRoute?.id ?? -1)) ||
            (universitySlug === 'manipal-university-jaipur' && [23, 24].includes(courseFromRoute?.id ?? -1)) ||
            (universitySlug === 'bennet-university' && courseFromRoute?.id === 2)
          ) && (
            <motion.section
              variants={SECTION_VARIANTS}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#00275E] mb-4">
                {isMujBCom ? 'Electives' : 'Specializations'}
              </h2>
              {isAmityBbaBcomOrBca ? (
                <ul className="space-y-4">
                  {courseSpecializations.map((s, i) => {
                    const { heading, content } = splitHeadingAndContent(s)
                    return (
                      <li
                        key={`${s}-${i}`}
                        className="rounded-xl border border-gold/20 bg-offwhite/60 p-4 sm:p-5"
                      >
                        <h3 className="text-base sm:text-lg font-semibold text-gold mb-2">
                          {heading}
                        </h3>
                        {content ? (
                          <div className="space-y-1 text-sm text-gray-700 leading-relaxed">
                            {splitFocusOutcomeLines(content).map((line, idx) => (
                              <p key={`${heading}-${idx}`}>{line}</p>
                            ))}
                          </div>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              ) : (
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
              )}
            </motion.section>
          )}

          {/* Programme Structure for selected course */}
          {(eligibilityPointsResolved.length || effectiveFees || effectiveScholarships.length) && (
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
                  Duration: {effectiveDuration}
                </span>
                <span className="inline-flex items-center rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white border border-white/25">
                  Mode: {effectiveMode}
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
                  {eligibilityPointsResolved.map((item, index) => (
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
                <h3 className="mb-4 border-b border-gold/30 pb-2 text-base font-semibold text-[#00275E]">
                  Application & Programme Fee
                </h3>
                <div className="space-y-3">
                  {effectiveFees?.applicationFee && (
                    <FeeCard title="Application Fee" value={effectiveFees.applicationFee} />
                  )}
                  {effectiveFees?.totalFee && (
                    <FeeCard title="Total Programme Fee" value={effectiveFees.totalFee} />
                  )}
                  {effectiveFees?.examAndOtherCharges && (
                    <FeeCard
                      title="Exam & Other Charges"
                      value={effectiveFees.examAndOtherCharges}
                      variant="muted"
                    />
                  )}
                  {effectiveFees?.paymentModes && (
                    <FeeCard title="Payment Modes" value={effectiveFees.paymentModes} variant="muted" />
                  )}
                </div>
              </div>
            </div>

            {/* Row 3: Scholarships & Finance highlight */}
            {!!effectiveScholarships.length && (
              <div className="px-6 py-5 sm:px-8 sm:py-6 bg-[#00275E] text-white border-t border-gold-bright/20">
                <h3 className="text-base font-semibold text-gold-bright mb-4 text-center">
                  Scholarships & Finance
                </h3>
                <ul
                  className={`text-sm text-white/90 max-w-3xl mx-auto ${
                    effectiveScholarships.length === 1
                      ? 'flex justify-center'
                      : 'flex flex-wrap justify-center gap-x-8 gap-y-2'
                  }`}
                >
                  {effectiveScholarships.map((item) => (
                    <li
                      key={item}
                      className={
                        effectiveScholarships.length === 1
                          ? 'w-full text-center'
                          : 'flex gap-2 items-center'
                      }
                    >
                      {effectiveScholarships.length > 1 && (
                        <span className="text-gold-bright shrink-0">•</span>
                      )}
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
