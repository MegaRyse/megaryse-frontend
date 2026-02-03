import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect, useMemo, useCallback, memo } from 'react'
import HeroImg2 from '../assets/images/Hero_Img2.png'
import careerCounsellingImg from '../assets/images/career_counselling.png'
import admissionProcessImg from '../assets/images/admission_process.png'
import programsImg from '../assets/images/programs.png'
import WhatsAppFloat from '../components/WhatsAppFloat'

// Shared transition configs (avoid new object refs every render)
const TRANSITION_SMOOTH = { duration: 0.32, ease: [0.22, 0.5, 0.35, 0.98] as const }
const STAT_CARD_HOVER = {
  y: -10,
  scale: 1.05,
  backgroundColor: '#F5F2EA',
  borderColor: '#000080',
  borderWidth: '1px',
  transition: { duration: 0.3 },
}

function parseStatNumber(numStr: string): { value: number; suffix: string } {
  if (numStr.includes('k+')) {
    const num = parseInt(numStr.replace('k+', ''), 10)
    return { value: num * 1000, suffix: 'k+' }
  }
  if (numStr.includes('+')) {
    const num = parseInt(numStr.replace('+', ''), 10)
    return { value: num, suffix: '+' }
  }
  if (numStr.includes('%')) {
    const num = parseInt(numStr.replace('%', ''), 10)
    return { value: num, suffix: '%' }
  }
  return { value: 0, suffix: '' }
}

function formatStatNumber(num: number, suffix: string): string {
  if (suffix === 'k+') return `${Math.floor(num / 1000)}${suffix}`
  return `${num}${suffix}`
}

const AnimatedStatCard = memo(function AnimatedStatCard({
  stat,
  idx,
}: {
  stat: { number: string; label: string; icon: string }
  idx: number
}) {
  const { value, suffix } = useMemo(() => parseStatNumber(stat.number), [stat.number])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps
    let currentStep = 0
    let intervalId: ReturnType<typeof setInterval> | null = null

    const timer = setTimeout(() => {
      intervalId = setInterval(() => {
        currentStep++
        if (currentStep <= steps) {
          setCount(Math.min(Math.floor(increment * currentStep), value))
        } else {
          setCount(value)
          if (intervalId) clearInterval(intervalId)
        }
      }, stepDuration)
    }, idx * 100 + 600)

    return () => {
      clearTimeout(timer)
      if (intervalId) clearInterval(intervalId)
    }
  }, [value, idx])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      whileHover={STAT_CARD_HOVER}
      style={{ backgroundColor: '#050B23' }}
      className="rounded-2xl p-6 shadow-lg text-center group relative overflow-hidden w-full max-w-xs"
    >
      <div className="relative">
        <div className="text-3xl mb-3">{stat.icon}</div>
        <div className="text-4xl font-bold mb-2 text-white group-hover:text-navy transition-colors duration-300">
          {formatStatNumber(count, suffix)}
        </div>
        <div className="font-medium text-sm text-white/90 group-hover:text-navy transition-colors duration-300">
          {stat.label}
        </div>
      </div>
    </motion.div>
  )
})

// Static data outside component to avoid re-creating on every render
const FEATURES_DATA = [
  { title: 'Expert Career Counseling', description: 'Our experienced counselors provide personalized guidance tailored to your career aspirations and goals.', icon: '🎯', link: '/courses', linkText: 'Career Counseling Services' },
  { title: 'Wide Range of Programs', description: 'Choose from hundreds of programs across management, technology, arts, and sciences from top universities.', icon: '📚', link: '/courses', linkText: 'Explore Programs' },
  { title: 'Seamless Admission Process', description: 'We handle all the paperwork and documentation, making your admission process smooth and hassle-free.', icon: '✅', link: '/contact', linkText: 'Get Started' },
] as const

// Right visual images: [initial, feature0 career, feature1 programs, feature2 admission]
const RIGHT_VISUAL_IMAGES = [
  careerCounsellingImg,
  careerCounsellingImg,
  programsImg,
  admissionProcessImg,
] as const

const TESTIMONIALS_DATA = [
  { name: 'Heena', role: 'MBA Graduate', text: "MegaRyse helped me choose the perfect MBA program that aligned with my career goals. The expert guidance and seamless admission process made everything so easy. Today, I'm in a leadership role, thanks to their support!", rating: 5 },
  { name: 'Smirthi', role: 'BCA Student', text: 'I was confused about which course to pursue, but the counselors at MegaRyse made it simple. They guided me through the BCA program selection and enrollment process effortlessly. Highly recommended!', rating: 5 },
  { name: 'Ashok', role: 'Executive MBA', text: 'As a working professional, I needed a course that fit my schedule and career goals. MegaRyse recommended an Executive MBA, and it has truly boosted my career. Thank you for making my upskilling journey smooth!', rating: 5 },
] as const

const DUPLICATED_TESTIMONIALS = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA]

const PROGRAMS_LIST = [
  { title: 'MBA', desc: 'Master of Business Administration', icon: '💼' },
  { title: 'MSC', desc: 'Master of Science', icon: '🔬' },
  { title: 'MCA', desc: 'Master of Computer Applications', icon: '💻' },
  { title: 'BBA', desc: 'Bachelor of Business Administration', icon: '📊' },
  { title: 'B.Com', desc: 'Bachelor of Commerce', icon: '💰' },
  { title: 'BCA', desc: 'Bachelor of Computer Applications', icon: '⌨️' },
] as const

// Feature section scroll constants (stable refs) — taller section + stretched ranges so user scrolls more
const SHRINK_START = 0.2
const SHRINK_END = 0.8
const HIGHLIGHT_START = SHRINK_END
const HOLD_EXTRA_VH = 180
const END_HOLD_VH = 140
const VISUAL_MIN_WIDTH_RATIO = 0.6
const VISUAL_MIN_WIDTH = `${VISUAL_MIN_WIDTH_RATIO * 100}%`
const LEFT_MAX_WIDTH = `${(1 - VISUAL_MIN_WIDTH_RATIO) * 100}%`
const FIXED_HEIGHT = '62vh'
const LEFT_CARD_MIN_HEIGHT = '16vh'
const LEFT_SECTION_WIDTH = LEFT_MAX_WIDTH
const WIDTH_SETTLE_END = SHRINK_START + 0.16
const REVEAL_END = SHRINK_START + 0.52
const CARD_SLIDE_START = 0.03
const CARD_SLIDE_DURATION = 0.26
const CARD_SLIDE_OFFSET = 0.13
const FEATURES_SECTION_HEIGHT = `${(FEATURES_DATA.length + 1) * 95 + HOLD_EXTRA_VH + END_HOLD_VH}vh`

// Reusable animation variants (stable refs for Features section)
const TITLE_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.032, delayChildren: 0.01 } },
}
const WORD_HIDDEN = { opacity: 0, y: 8, filter: 'blur(2px)' as const }
const WORD_VISIBLE = { opacity: 1, y: 0, filter: 'blur(0px)' as const, transition: { duration: 0.28, ease: [0.22, 0.5, 0.35, 0.98] } }
const DESC_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.022, delayChildren: 0.08 } },
}
const DESC_WORD_HIDDEN = { opacity: 0, y: 5 }
const DESC_WORD_VISIBLE = { opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.22, 0.5, 0.35, 0.98] } }
const LINK_ARROW_VARIANTS = { rest: { x: 0, scale: 1 }, hover: { x: 16, scale: 1.35 } }

// Testimonial card animation config (transform-only for smooth GPU animation; visual hover via CSS)
const TESTIMONIAL_CARD_IN_VIEW = { opacity: 1, scale: 1 }
const TESTIMONIAL_CARD_INITIAL = { opacity: 0, scale: 0.96 }
const TESTIMONIAL_CARD_VIEWPORT = { once: true, margin: '-50px' }
const TESTIMONIAL_CARD_TRANSITION = { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
const TESTIMONIAL_CARD_WHILE_HOVER = { y: -6, scale: 1.02, zIndex: 10 }
const TESTIMONIAL_CARD_HOVER_TRANSITION = { type: 'spring' as const, stiffness: 400, damping: 28 }
const STARS = [1, 2, 3, 4, 5] as const

type TestimonialItem = (typeof TESTIMONIALS_DATA)[number]

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: TestimonialItem
  index: number
}) {
  const delay = Math.min(index * 0.08, 0.24)
  return (
    <motion.div
      initial={TESTIMONIAL_CARD_INITIAL}
      whileInView={TESTIMONIAL_CARD_IN_VIEW}
      viewport={TESTIMONIAL_CARD_VIEWPORT}
      whileHover={TESTIMONIAL_CARD_WHILE_HOVER}
      transition={{
        opacity: { ...TESTIMONIAL_CARD_TRANSITION, delay },
        scale: { ...TESTIMONIAL_CARD_TRANSITION, delay },
        y: TESTIMONIAL_CARD_HOVER_TRANSITION,
      }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_2px_22px_2px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.1)] rounded-3xl p-8 flex-shrink-0 w-full max-w-sm transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out hover:bg-gold/10 hover:border-gold/30 hover:shadow-xl"
    >
      <div className="flex items-center gap-1 mb-4">
        {STARS.slice(0, testimonial.rating).map((_, i) => (
          <span key={i} className="text-gold-bright text-xl">
            ★
          </span>
        ))}
      </div>
      <p className="text-navy/95 mb-6 leading-relaxed italic text-sm drop-shadow-lg">
        "{testimonial.text}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {testimonial.name[0]}
        </div>
        <div>
          <div className="font-bold text-navy text-lg drop-shadow-md">{testimonial.name}</div>
          <div className="text-sm text-yellow-500/80 drop-shadow-sm">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  )
})

const Home = () => {
  const featuresRef = useRef<HTMLDivElement | null>(null)

  // Active feature highlight state (-1 means "none highlighted yet")
  const [activeFeature, setActiveFeature] = useState<number>(-1)

  // When each left item's text should play inner animations (word/line stagger)
  const [leftItemTextRevealed, setLeftItemTextRevealed] = useState<boolean[]>([false, false, false])

  // Scroll progress for Features section (0 → 1 across full section)
  const { scrollYProgress } = useScroll({
    target: featuresRef,
    offset: ['start start', 'end end'],
  })

  // Right visual: 100% until shrink, then shrink to 60% as left appears; then stay 60%
  const visualWidth = useTransform(
    scrollYProgress,
    [0, SHRINK_START, WIDTH_SETTLE_END],
    ['100%', '100%', VISUAL_MIN_WIDTH],
  )

  // Left column: as soon as shrink starts, go to max width (40%) and stay there
  const leftWidth = useTransform(
    scrollYProgress,
    [SHRINK_START, WIDTH_SETTLE_END],
    ['0%', LEFT_SECTION_WIDTH],
  )

  // Left opacity: ease-out feel via midpoint (0 → 0.6 → 1) over longer scroll range
  const leftOpacity = useTransform(
    scrollYProgress,
    [SHRINK_START, SHRINK_START + 0.24, REVEAL_END],
    [0, 0.65, 1],
  )

  // Left slide-in: same range, smoother over more scroll distance
  const leftX = useTransform(
    scrollYProgress,
    [SHRINK_START, SHRINK_START + 0.24, REVEAL_END],
    [-50, -20, 0],
  )

  // Left blur: reduced max (12px) for better perf; stretched range so sharp over more scroll
  const leftBlur = useTransform(
    scrollYProgress,
    [SHRINK_START, SHRINK_START + 0.28],
    [12, 0],
  )

  // Subtle scale: gentle zoom over same reveal range
  const leftScale = useTransform(
    scrollYProgress,
    [SHRINK_START, REVEAL_END],
    [0.97, 1],
  )

  const leftItem0Opacity = useTransform(
    scrollYProgress,
    [SHRINK_START + CARD_SLIDE_START, SHRINK_START + CARD_SLIDE_START + CARD_SLIDE_DURATION],
    [0, 1],
  )
  const leftItem1Opacity = useTransform(
    scrollYProgress,
    [SHRINK_START + CARD_SLIDE_OFFSET + CARD_SLIDE_START, SHRINK_START + CARD_SLIDE_OFFSET + CARD_SLIDE_START + CARD_SLIDE_DURATION],
    [0, 1],
  )
  const leftItem2Opacity = useTransform(
    scrollYProgress,
    [SHRINK_START + 2 * CARD_SLIDE_OFFSET + CARD_SLIDE_START, SHRINK_START + 2 * CARD_SLIDE_OFFSET + CARD_SLIDE_START + CARD_SLIDE_DURATION],
    [0, 1],
  )
  const leftItem0X = useTransform(
    scrollYProgress,
    [SHRINK_START + CARD_SLIDE_START, SHRINK_START + CARD_SLIDE_START + CARD_SLIDE_DURATION],
    [240, 0],
  )
  const leftItem1X = useTransform(
    scrollYProgress,
    [SHRINK_START + CARD_SLIDE_OFFSET + CARD_SLIDE_START, SHRINK_START + CARD_SLIDE_OFFSET + CARD_SLIDE_START + CARD_SLIDE_DURATION],
    [240, 0],
  )
  const leftItem2X = useTransform(
    scrollYProgress,
    [SHRINK_START + 2 * CARD_SLIDE_OFFSET + CARD_SLIDE_START, SHRINK_START + 2 * CARD_SLIDE_OFFSET + CARD_SLIDE_START + CARD_SLIDE_DURATION],
    [240, 0],
  )

  const leftItemOpacities = useMemo(
    () => [leftItem0Opacity, leftItem1Opacity, leftItem2Opacity],
    [leftItem0Opacity, leftItem1Opacity, leftItem2Opacity],
  )
  const leftItemXs = useMemo(
    () => [leftItem0X, leftItem1X, leftItem2X],
    [leftItem0X, leftItem1X, leftItem2X],
  )

  // Transform scroll progress (highlight phase) to feature index: 0 → first, 1 → second, 2 → third
  const highlightIndex = useTransform(scrollYProgress, [HIGHLIGHT_START, 1], [0, 3])

  // Sync activeFeature (left highlight + right visual) with scroll; only setState when index changes to reduce re-renders
  const prevHighlightRef = useRef(-1)
  useEffect(() => {
    const updateFromScroll = (latest: number) => {
      const clamped = Math.min(2, Math.max(0, Math.floor(latest)))
      if (clamped !== prevHighlightRef.current) {
        prevHighlightRef.current = clamped
        setActiveFeature(clamped)
      }
    }
    prevHighlightRef.current = Math.min(2, Math.max(0, Math.floor(highlightIndex.get())))
    setActiveFeature(prevHighlightRef.current)
    const unsubscribe = highlightIndex.on('change', updateFromScroll)
    return unsubscribe
  }, [highlightIndex])

  // When left item opacity crosses threshold, allow inner text animations (word/line stagger)
  useEffect(() => {
    const check = (opacity: number, idx: number) => {
      setLeftItemTextRevealed((prev) => {
        if (prev[idx] || opacity < 0.75) return prev
        const next = [...prev]
        next[idx] = true
        return next
      })
    }
    const unsub0 = leftItem0Opacity.on('change', (v) => check(v, 0))
    const unsub1 = leftItem1Opacity.on('change', (v) => check(v, 1))
    const unsub2 = leftItem2Opacity.on('change', (v) => check(v, 2))
    return () => {
      unsub0()
      unsub1()
      unsub2()
    }
  }, [leftItem0Opacity, leftItem1Opacity, leftItem2Opacity])

  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)

  const TESTIMONIALS_LEN = TESTIMONIALS_DATA.length
  const TESTIMONIALS_SCROLL_RESET = -(TESTIMONIALS_LEN * 400)
  useAnimationFrame((_time, delta) => {
    if (!isHovered) {
      const speed = 0.1
      x.set(x.get() - delta * speed)
      if (x.get() <= TESTIMONIALS_SCROLL_RESET) x.set(0)
    }
  })

  const statsForSection = useMemo(() => {
    const establishmentDate = new Date('2024-11-04')
    const now = new Date()
    let years = now.getFullYear() - establishmentDate.getFullYear()
    const months = now.getMonth() - establishmentDate.getMonth()
    const days = now.getDate() - establishmentDate.getDate()
    if (months < 0 || (months === 0 && days < 0)) years -= 1
    if (years < 0) years = 0
    return [
      { number: `${years}+`, label: 'Years Experience', icon: '📅' },
      { number: '10k+', label: 'Students', icon: '👥' },
      { number: '50+', label: 'Universities', icon: '🏛️' },
      { number: '95%', label: 'Success Rate', icon: '⭐' },
    ]
  }, [])

  const featuresSectionStyle = useMemo(() => ({ height: FEATURES_SECTION_HEIGHT }), [])
  const testimonialTrackStyle = useMemo(() => ({ x, display: 'flex' as const }), [x])
  const handleTestimonialMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleTestimonialMouseLeave = useCallback(() => setIsHovered(false), [])

  return (
    <div className="w-full bg-offwhite">
      {/* Hero Section - unchanged */}
      <section className="relative pt-0 md:pt-0  bg-offwhite overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-offwhite via-offwhite/95 to-offwhite"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-bright/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-bright/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-start relative"
            >
              <div className="relative">
                <img
                  src={HeroImg2}
                  alt="Hero"
                  className="w-full max-w-lg h-auto object-contain relative z-10"
                />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/15 blur-xl rounded-4xl"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <span className="bg-navy text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Trusted by 10,000+ Students
                </span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
                Transform Your Future with
                <span className="block mt-4 relative">
                  <span className="text-black">World-Class Education</span>
                  <motion.span
                    className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-gold-bright/40 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>
              </h1>
              <p className="text-xl text-black mb-12 leading-relaxed max-w-3xl mx-auto">
                Join thousands of successful professionals who chose MegaRyse for their career
                transformation journey
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/courses"
                  className="inline-block bg-gold text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-gold hover:to-gold-bright"
                >
                  Explore Programs
                </Link>
                <Link
                  to="/contact"
                  className="inline-block border-2 border-gold-bright text-black px-10 py-5 rounded-full font-semibold text-lg hover:bg-navy hover:text-white hover:border-navy transition-all duration-300"
                >
                  Schedule Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats - unchanged */}
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {statsForSection.map((stat, idx) => (
                <AnimatedStatCard key={idx} stat={stat} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION - Full-width visual when initial; no section padding on row ========== */}
      <section ref={featuresRef} className="pb-32">
        <div className="max-w-container mx-auto w-full">
          <div className="relative" style={featuresSectionStyle}>
            <motion.div
              style={{ position: 'sticky', top: 0, height: '100vh' }}
              className="relative flex flex-col gap-10 pt-32"
            >
              <div className="px-6 sm:px-8 lg:px-10">
                <h2 className="text-5xl font-bold text-center">
                  Why Choose{' '}
                  <span className="relative">
                    <span className="text-black">MegaRyse</span>
                    <motion.span
                      className="absolute bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold-bright/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </span>
                  ?
                </h2>
                <p className="text-center text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
                  Your trusted partner in achieving academic and career excellence
                </p>
              </div>

              <div className="flex items-center relative flex-1 w-full min-w-0">
                {/* LEFT CONTENT - No padding on wrapper so when width 0% it takes zero space (visual stays centered) */}
                <motion.div
                  style={{
                    width: leftWidth,
                    opacity: leftOpacity,
                    x: leftX,
                    scale: leftScale,
                    filter: `blur(${leftBlur}px)`,
                    height: FIXED_HEIGHT,
                    minWidth: 0,
                  }}
                  className="flex flex-col justify-start gap-6 h-full origin-left overflow-y-auto overflow-x-hidden transform-gpu flex-shrink-0"
                >
                  <div className="pl-6 sm:pl-8 lg:pl-10 pr-6 sm:pr-4 lg:pr-4 flex flex-col justify-start gap-6 flex-1 min-h-0">
                  {FEATURES_DATA.map((f, i) => (
                    <motion.div
                      key={i}
                      className="w-full min-w-full flex-shrink-0 relative pl-6 border-l-2 border-transparent overflow-visible transform-gpu"
                      style={{
                        minHeight: LEFT_CARD_MIN_HEIGHT,
                        width: '100%',
                        opacity: leftItemOpacities[i],
                        x: leftItemXs[i],
                      }}
                    >
                      {/* Active accent: left border */}
                      <motion.div
                        className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full ${i === activeFeature ? 'bg-gold' : 'bg-transparent'}`}
                        initial={false}
                        animate={{
                          scaleY: i === activeFeature ? 1 : 0.3,
                          opacity: i === activeFeature ? 1 : 0,
                        }}
                        transition={TRANSITION_SMOOTH}
                      />
                      <div className="flex flex-col justify-start py-2 w-full max-w-full">
                        {/* Title: word stagger with fade + slide; lighter blur for perf */}
                        <motion.h3
                          className="text-2xl font-bold mb-2 text-navy transition-colors duration-300"
                          variants={TITLE_VARIANTS}
                          initial="hidden"
                          animate={leftItemTextRevealed[i] ? 'visible' : 'hidden'}
                          whileHover={{ x: 4 }}
                        >
                          {`${f.icon} ${f.title}`.split(/\s+/).map((word, wi) => (
                            <motion.span
                              key={wi}
                              className="inline-block mr-1.5 align-baseline will-change-transform"
                              variants={{ hidden: WORD_HIDDEN, visible: WORD_VISIBLE }}
                            >
                              {word}
                            </motion.span>
                          ))}
                        </motion.h3>
                        {/* Description: word stagger; transform-only for smoothness */}
                        <motion.p
                          className={`text-base leading-relaxed mb-2 transition-colors duration-300 ${i === activeFeature ? 'text-navy' : 'text-text'}`}
                          variants={DESC_VARIANTS}
                          initial="hidden"
                          animate={leftItemTextRevealed[i] ? 'visible' : 'hidden'}
                        >
                          {f.description.split(/\s+/).map((word, wi) => (
                            <motion.span
                              key={wi}
                              className="inline-block mr-1.5 align-baseline will-change-transform"
                              variants={{ hidden: DESC_WORD_HIDDEN, visible: DESC_WORD_VISIBLE }}
                            >
                              {word}{' '}
                            </motion.span>
                          ))}
                        </motion.p>
                        {/* Link: visibility tied to card opacity; gold theme; arrow animates when link hovered */}
                        <motion.span
                          className="inline-block mt-2"
                          style={{ opacity: leftItemOpacities[i] }}
                          initial="rest"
                          whileHover="hover"
                        >
                          <Link to={f.link} className="inline-flex items-center gap-2 font-semibold text-gold hover:text-gold-bright transition-colors duration-300 cursor-pointer">
                            <span className="underline decoration-2 underline-offset-2 decoration-gold/80 hover:decoration-gold-bright">
                              {f.linkText}
                            </span>
                            <motion.span
                              className="inline-block no-underline"
                              aria-hidden
                              variants={LINK_ARROW_VARIANTS}
                              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                            >
                              →
                            </motion.span>
                          </Link>
                        </motion.span>
                      </div>
                    </motion.div>
                  ))}
                  </div>
                </motion.div>

                {/* RIGHT VISUAL - Full width of container when initial; equal space both sides = centered */}
                <motion.div
                  style={{
                    width: visualWidth,
                    height: FIXED_HEIGHT,
                    minWidth: 0,
                  }}
                  className="flex items-center justify-center flex-shrink-0 min-w-0 box-border"
                >
                  <div className="bg-navy rounded-3xl w-full h-full flex flex-col items-center justify-center relative overflow-hidden min-w-0">
                    {RIGHT_VISUAL_IMAGES.map((imgSrc, idx) => {
                      const isActive = idx === activeFeature + 1
                      return (
                        <motion.div
                          key={idx}
                          className="absolute inset-0 flex items-center justify-center will-change-transform rounded-3xl overflow-hidden"
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            scale: isActive ? 1 : 0.97,
                          }}
                          transition={TRANSITION_SMOOTH}
                        >
                          <img
                            src={imgSrc}
                            alt=""
                            className="w-full h-full object-cover rounded-3xl"
                          />
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section - unchanged */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Discover Your{' '}
              <span className="relative">
                <span className="text-black">Perfect Program</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold-bright/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Explore our comprehensive range of courses designed to boost your career
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS_LIST.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-navy rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-bright/20 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">{program.icon}</div>
                  <h3 className="text-3xl font-bold text-white mb-3">{program.title}</h3>
                  <p className="text-white/90 mb-6">{program.desc}</p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 text-gold-bright font-semibold hover:gap-4 transition-all group-hover:underline decoration-gold-bright"
                  >
                    Learn More
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - unchanged */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Success{' '}
              <span className="relative">
                <span className="text-black">Stories</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold-bright/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </h2>
            <p className="text-xl text-black">
              Real experiences from our students and professionals
            </p>
          </motion.div>

          <div
            className="overflow-hidden"
            onMouseEnter={handleTestimonialMouseEnter}
            onMouseLeave={handleTestimonialMouseLeave}
          >
            <motion.div
              className="flex gap-8 py-4 will-change-transform"
              style={testimonialTrackStyle}
            >
              {DUPLICATED_TESTIMONIALS.map((testimonial, idx) => (
                <TestimonialCard key={idx} testimonial={testimonial} index={idx} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - unchanged */}
      <section className="py-24 bg-gradient-to-r from-offwhite via-offwhite to-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-navy rounded-3xl p-12 md:p-16 shadow-2xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-gold/10"></div>
            <div className="relative">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join thousands of successful professionals. Let's build your future together!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="inline-block bg-gold text-white px-12 py-5 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-gold hover:to-gold-bright"
                >
                  Get Started Today
                </Link>
                <Link
                  to="/courses"
                  className="inline-block border-2 border-gold-bright text-white px-12 py-5 rounded-full font-semibold text-lg hover:bg-gold-bright hover:text-navy transition-all duration-300"
                >
                  Browse Programs
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <WhatsAppFloat />
    </div>
  )
}

export default Home
