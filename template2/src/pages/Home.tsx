import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect, useMemo, useCallback, memo } from 'react'
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
import HeroImg3 from '../assets/images/hero3.PNG'
import HeroImg3Webp from '../assets/images/hero3.webp'
import { OptimizedImage } from '../components/OptimizedImage'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { coursesMasterData } from '../data/courses'
import { universitiesData } from '../data/universities'
import VariableProximity from '../animatedComponents/VariableProximity'
import ShinyText from '../animatedComponents/ShinyText'
import { useEnquireModal } from '../context/EnquireModalContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useIntersectionVisible } from '../hooks/useIntersectionVisible'
import { DesktopFeaturesScroll } from '../components/home/DesktopFeaturesScroll'
import {
  FEATURES_DATA,
  RIGHT_VISUAL_IMAGES,
  featureVisualImageClass,
} from '../components/home/featureVisuals'

const FEATURE_ANIMATION_BREAKPOINT_PX = 1024

function useIsTabletOrDesktop() {
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= FEATURE_ANIMATION_BREAKPOINT_PX : true
  )
  useEffect(() => {
    const m = window.matchMedia(`(min-width: ${FEATURE_ANIMATION_BREAKPOINT_PX}px)`)
    const update = () => setIsTabletOrDesktop(m.matches)
    update()
    m.addEventListener('change', update)
    return () => m.removeEventListener('change', update)
  }, [])
  return isTabletOrDesktop
}

const COURSE_ICON_CLASS = 'w-8 h-8 sm:w-10 sm:h-10'

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
  return <span className="text-3xl sm:text-4xl">{fallback}</span>
}

// Shared transition configs (avoid new object refs every render)
const STAT_CARD_HOVER = {
  y: -10,
  scale: 1.05,
  backgroundColor: '#F5F2EA',
  borderColor: '#000080',
  borderWidth: '1px',
  transition: { duration: 0.3 },
}

function parseStatNumber(numStr: string): { value: number; suffix: string } {
  if (/^\d+\/\d+$/.test(numStr.trim())) {
    const [valuePart, totalPart] = numStr.trim().split('/')
    const num = parseInt(valuePart, 10)
    return { value: Number.isNaN(num) ? 0 : num, suffix: `/${totalPart}` }
  }
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
  reduceMotion,
}: {
  stat: { number: string; label: string; icon: string }
  idx: number
  reduceMotion: boolean
}) {
  const { value, suffix } = useMemo(() => parseStatNumber(stat.number), [stat.number])
  const [count, setCount] = useState(() => (reduceMotion ? value : 0))

  useEffect(() => {
    if (reduceMotion) {
      setCount(value)
      return
    }

    let frameId = 0
    const delayMs = idx * 100 + 600
    const durationMs = 2000
    let startTime: number | null = null

    const timeoutId = window.setTimeout(() => {
      const tick = (time: number) => {
        if (startTime === null) startTime = time
        const elapsed = time - startTime
        const progress = Math.min(elapsed / durationMs, 1)
        setCount(Math.floor(value * progress))
        if (progress < 1) frameId = requestAnimationFrame(tick)
        else setCount(value)
      }
      frameId = requestAnimationFrame(tick)
    }, delayMs)

    return () => {
      window.clearTimeout(timeoutId)
      cancelAnimationFrame(frameId)
    }
  }, [value, idx, reduceMotion])

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : idx * 0.1 }}
      whileHover={reduceMotion ? undefined : STAT_CARD_HOVER}
      style={{ backgroundColor: '#00275E' }}
      className="rounded-2xl p-4 sm:p-6 shadow-lg text-center group relative overflow-hidden w-full max-w-xs"
    >
      <div className="relative">
        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{stat.icon}</div>
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-white group-hover:text-navy transition-colors duration-300">
          {formatStatNumber(count, suffix)}
        </div>
        <div className="font-medium text-xs sm:text-sm text-white/90 group-hover:text-navy transition-colors duration-300">
          {stat.label}
        </div>
      </div>
    </motion.div>
  )
})

const TESTIMONIALS_DATA = [
  { name: 'Heena', role: 'MBA Graduate', text: "MegaRyse helped me choose the perfect MBA program that aligned with my career goals. The expert guidance and seamless admission process made everything so easy. Today, I'm in a leadership role, thanks to their support!", rating: 5 },
  { name: 'Smirthi', role: 'BCA Student', text: 'I was confused about which course to pursue, but the counselors at MegaRyse made it simple. They guided me through the BCA program selection and enrollment process effortlessly. Highly recommended!', rating: 5 },
  { name: 'Ashok', role: 'Executive MBA', text: 'As a working professional, I needed a course that fit my schedule and career goals. MegaRyse recommended an Executive MBA, and it has truly boosted my career. Thank you for making my upskilling journey smooth!', rating: 5 },
] as const

const DUPLICATED_TESTIMONIALS = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA]

const TESTIMONIAL_CARD_IN_VIEW = { opacity: 1, y: 0 }
const TESTIMONIAL_CARD_INITIAL = { opacity: 0, y: 12 }
const TESTIMONIAL_CARD_VIEWPORT = { once: true, margin: '-50px' }
const TESTIMONIAL_CARD_TRANSITION = { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
const STARS = [1, 2, 3, 4, 5] as const

type TestimonialItem = (typeof TESTIMONIALS_DATA)[number]

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  index,
  reduceMotion,
}: {
  testimonial: TestimonialItem
  index: number
  reduceMotion: boolean
}) {
  const delay = Math.min(index * 0.06, 0.2)
  return (
    <motion.div
      initial={reduceMotion ? false : TESTIMONIAL_CARD_INITIAL}
      whileInView={TESTIMONIAL_CARD_IN_VIEW}
      viewport={TESTIMONIAL_CARD_VIEWPORT}
      transition={{ ...TESTIMONIAL_CARD_TRANSITION, delay: reduceMotion ? 0 : delay }}
      className="border border-navy/10 bg-white shadow-[0_2px_16px_rgba(0,39,94,0.08)] rounded-3xl p-4 sm:p-6 md:p-8 flex-shrink-0 w-[85vw] max-md:min-w-[240px] min-w-[280px] max-w-sm transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-gold/30 hover:shadow-[0_8px_24px_rgba(0,39,94,0.12)]"
    >
      <div className="flex items-center gap-1 mb-4">
        {STARS.slice(0, testimonial.rating).map((_, i) => (
          <span key={i} className="text-gold-bright text-xl">
            ★
          </span>
        ))}
      </div>
      <p className="text-navy/90 mb-6 leading-relaxed italic text-sm">"{testimonial.text}"</p>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-navy/10 border border-navy/10 rounded-full flex items-center justify-center text-navy font-bold text-lg flex-shrink-0">
          {testimonial.name[0]}
        </div>
        <div>
          <div className="font-bold text-navy text-lg">{testimonial.name}</div>
          <div className="text-sm text-yellow-600/90">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  )
})

const Home = () => {
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const heroProximityRef = useRef<HTMLDivElement | null>(null)
  const featuresMobileRef = useRef<HTMLDivElement | null>(null)
  const isTabletOrDesktop = useIsTabletOrDesktop()
  const reduceMotion = usePrefersReducedMotion()
  const { openEnquireModal } = useEnquireModal()

  const heroVisible = useIntersectionVisible(heroSectionRef, { rootMargin: '100px' })
  const featuresMobileVisible = useIntersectionVisible(featuresMobileRef, { rootMargin: '80px' })

  const statsForSection = useMemo(() => {
    const establishmentDate = new Date('2010-09-04')
    const now = new Date()
    let years = now.getFullYear() - establishmentDate.getFullYear()
    const months = now.getMonth() - establishmentDate.getMonth()
    const days = now.getDate() - establishmentDate.getDate()
    if (months < 0 || (months === 0 && days < 0)) years -= 1
    if (years < 0) years = 0
    return [
      { number: `${years}+`, label: 'Years Experience', icon: '' },
      { number: '20000+', label: 'Live Hours Delivered', icon: '' },
      { number: '10000+', label: 'Professionals Upskilled', icon: '' },
      { number: '8/10', label: 'Learners Saw Positive Career Growth', icon: '' },
    ]
  }, [])
  const homepageCourses = useMemo(() => coursesMasterData.slice(0, 6), [])
  const partnerUniversitiesMarquee = useMemo(
    () => [...universitiesData, ...universitiesData],
    []
  )

  const handleOpenEnquireModal = useCallback(() => openEnquireModal(), [openEnquireModal])

  return (
    <div className="w-full bg-offwhite">
      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative pt-0 bg-offwhite overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-offwhite via-offwhite/95 to-offwhite"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-bright/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-bright/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Image: on mobile only, show first (above text + buttons); tablet/desktop unchanged */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8 }}
              className="flex justify-center lg:justify-start relative order-1 lg:order-1"
            >
              <div className="relative w-full max-w-[231px] sm:max-w-[294px] md:max-w-[336px] lg:max-w-[357px]">
                <OptimizedImage
                  src={HeroImg3}
                  webpSrc={HeroImg3Webp}
                  alt="Student celebrating academic success with MegaRyse"
                  priority
                  className="w-full h-auto object-contain relative z-10 drop-shadow-[0_16px_32px_rgba(0,39,94,0.22)]"
                />
                <div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-navy/20 blur-2xl rounded-full"
                  aria-hidden
                />
              </div>
            </motion.div>

            {/* Text + CTAs: on mobile only, show below image; tablet/desktop unchanged */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8 }}
              className="text-center lg:text-center max-w-4xl mx-auto order-2 lg:order-2"
            >
              <motion.div
                initial={reduceMotion ? false : { scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.2 }}
                className="inline-block mb-4 sm:mb-6"
              >
                <span className="bg-[#00275E] text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold">
                  Trusted by 10,000+ Students
                </span>
              </motion.div>
              <div
                ref={heroProximityRef}
                className="relative text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight text-center"
              >
                <VariableProximity
                  label="Transform Your Future with World-Class Education"
                  className="variable-proximity-demo"
                  fromFontVariationSettings="'wght' 650, 'opsz' 12"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={heroProximityRef}
                  radius={300}
                  falloff="exponential"
                  disabled={reduceMotion}
                  paused={!heroVisible}
                />
              </div>
              <p className="text-base sm:text-lg text-black mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                Join thousands of successful professionals who chose MegaRyse for their career
                transformation journey
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto inline-block text-center bg-gold text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-gold hover:to-gold-bright"
                >
                  Explore Programs
                </Link>
                <button
                  type="button"
                  onClick={handleOpenEnquireModal}
                  className="w-full sm:w-auto inline-block text-center border-2 border-gold-bright text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:bg-[#00275E] hover:text-white hover:border-navy transition-all duration-300"
                >
                  Schedule Consultation
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
              {statsForSection.map((stat, idx) =>
                stat.label === 'Universities' ? (
                  <Link
                    key={idx}
                    to="/universities"
                    state={{ from: 'home' }}
                    className="block w-full max-w-xs"
                  >
                    <AnimatedStatCard stat={stat} idx={idx} reduceMotion={reduceMotion} />
                  </Link>
                ) : (
                  <AnimatedStatCard key={idx} stat={stat} idx={idx} reduceMotion={reduceMotion} />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION — list on mobile, scroll animations on desktop only ========== */}
      <section className="pb-16 md:pb-32">
        <div className="max-w-container mx-auto w-full px-4 sm:px-6 lg:px-8">
          {!isTabletOrDesktop || reduceMotion ? (
            <div
              ref={featuresMobileRef}
              className="relative pt-12 sm:pt-14 md:pt-16 flex flex-col items-center"
            >
              <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="text-center mb-10 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy">
                    Why Choose{' '}
                    <span className="relative inline-block">
                      {reduceMotion ? (
                        <span className="text-[#D9B23A]">MegaRyse</span>
                      ) : (
                        <ShinyText
                          text="MegaRyse"
                          speed={2}
                          delay={0}
                          color="#D9B23A"
                          shineColor="#E8C547"
                          spread={35}
                          direction="right"
                          yoyo
                          pauseOnHover={false}
                          disabled={false}
                          paused={!featuresMobileVisible}
                        />
                      )}
                    </span>
                    ?
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 mt-3 max-w-xl mx-auto">
                    Your trusted partner in achieving academic and career excellence
                  </p>
                </div>
                <ul className="space-y-6 sm:space-y-8 w-full list-none p-0 m-0">
                  {FEATURES_DATA.map((f, i) => (
                    <li key={f.title} className="w-full flex flex-col items-stretch">
                      <div className="relative pl-5 sm:pl-6 border-l-2 border-gold/40 bg-white/60 rounded-2xl p-4 sm:p-5 shadow-sm w-full box-border">
                        <div className="flex flex-col gap-3 w-full min-w-0">
                          <h3 className="text-xl sm:text-2xl font-bold text-navy">
                            {f.title}
                          </h3>
                          <p className="text-base sm:text-lg leading-relaxed text-text">
                            {f.description}
                          </p>
                          {f.link === '/contact' ? (
                            <button
                              type="button"
                              onClick={handleOpenEnquireModal}
                              className="inline-flex items-center gap-2 font-semibold text-gold hover:text-gold-bright transition-colors duration-300 w-fit"
                            >
                              <span className="underline decoration-2 underline-offset-2 decoration-gold/80 hover:decoration-gold-bright">
                                {f.linkText}
                              </span>
                              <span aria-hidden>→</span>
                            </button>
                          ) : (
                            <Link
                              to={f.link}
                              className="inline-flex items-center gap-2 font-semibold text-gold hover:text-gold-bright transition-colors duration-300 w-fit"
                            >
                              <span className="underline decoration-2 underline-offset-2 decoration-gold/80 hover:decoration-gold-bright">
                                {f.linkText}
                              </span>
                              <span aria-hidden>→</span>
                            </Link>
                          )}
                        </div>
                        <div className="mt-4 rounded-xl overflow-hidden aspect-video max-h-40 sm:max-h-48 w-full relative bg-offwhite">
                          <OptimizedImage
                            src={RIGHT_VISUAL_IMAGES[i + 1].src}
                            webpSrc={RIGHT_VISUAL_IMAGES[i + 1].webp}
                            alt={RIGHT_VISUAL_IMAGES[i + 1].alt}
                            className={featureVisualImageClass(RIGHT_VISUAL_IMAGES[i + 1].objectFit)}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <DesktopFeaturesScroll
              onOpenEnquireModal={handleOpenEnquireModal}
              reduceMotion={reduceMotion}
              shinyTextPaused={false}
            />
          )}
        </div>
      </section>

      {/* Programs Section — tighter bottom padding so Our Universities sits closer to Success Stories */}
      <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-6 sm:pb-8 md:pb-10 lg:pb-10 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">
              Discover Your{' '}
              <span className="relative">
                <span className="text-black">Perfect Program</span>
                {!reduceMotion && (
                  <motion.span
                    className="absolute bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold-bright/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                )}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-black max-w-2xl mx-auto px-2">
              Explore our comprehensive range of courses designed to boost your career
            </p>
          </motion.div>

          {/* Programs from coursesMasterData - show 6 courses + View All */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {homepageCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : idx * 0.05 }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -6,
                        scale: 1.02,
                        boxShadow:
                          '0 20px 40px -12px rgba(0, 39, 94, 0.35), 0 0 0 1px rgba(255, 212, 71, 0.2)',
                        transition: { duration: 0.25, ease: [0.22, 0.5, 0.35, 0.98] },
                      }
                }
                className="bg-[#00275E] rounded-xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-shadow relative overflow-hidden group cursor-default"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-bright/15 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="mb-2 sm:mb-3 text-gold-bright flex items-center">
                    {renderCourseIcon(course.id, course.icon)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1 leading-tight">
                    {course.fullName}
                  </h3>
                  <p className="text-white/70 text-sm mb-2 sm:mb-3">({course.shortName})</p>
                  <p className="text-white/90 text-sm line-clamp-2 leading-snug">
                    {course.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 sm:mt-10 text-center"
          >
            <Link
              to="/courses"
              className="group inline-flex items-center gap-1.5 text-gold font-semibold hover:text-gold-bright transition-colors"
            >
              View All Courses
              <span className="transition-colors group-hover:text-gold-bright">→</span>
            </Link>
          </motion.div>

          {/* Partner Universities — full container width + large logos (mobile → desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 sm:mt-20 w-full min-w-0"
          >
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4">
              Our{' '}
              <span className="relative inline-block">
                <span className="text-black">Universities</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold-bright/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </h2>
            <p className="mx-auto mb-6 max-w-2xl px-2 text-center text-base text-black sm:mb-8 sm:text-lg">
              Leading institutions we work with to offer accredited online programmes tailored to your
              goals.
            </p>
            <div className="w-full min-w-0 overflow-hidden py-2 sm:py-3">
              <div className="flex w-max gap-6 sm:gap-8 md:gap-10 lg:gap-12 will-change-transform transform-gpu motion-safe:animate-partner-scroll-fast md:motion-safe:animate-partner-scroll motion-reduce:animate-none">
                {partnerUniversitiesMarquee.map((uni, idx) => (
                  <Link
                    key={`${uni.id}-${idx}`}
                    to="/courses"
                    state={{ universityName: uni.name, universitySlug: uni.slug }}
                    className="flex shrink-0 flex-col items-center text-center group"
                  >
                    <div className="mb-1 flex h-[108px] w-[168px] shrink-0 items-center justify-center sm:mb-2 sm:h-[124px] sm:w-[196px] md:h-[140px] md:w-[220px] lg:h-[156px] lg:w-[248px]">
                      <OptimizedImage
                        src={uni.logo}
                        webpSrc={uni.logoWebp}
                        alt={uni.name}
                        className="block h-full w-full object-contain object-center [max-width:none]"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-offwhite overflow-hidden"
        aria-label="Success stories"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            className="text-center mb-6 sm:mb-8 md:mb-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">
              Success{' '}
              <span className="relative">
                <span className="text-black">Stories</span>
                {!reduceMotion && (
                  <motion.span
                    className="absolute bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold-bright/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                )}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-black px-2">
              Real experiences from our students and professionals
            </p>
          </motion.div>

          <div
            className="overflow-hidden py-4 max-md:pl-4 max-md:sm:pl-6"
            role="region"
            aria-roledescription="carousel"
            aria-label="Student testimonials"
          >
            <div
              className={`flex w-max gap-4 max-md:gap-5 sm:max-md:gap-6 md:gap-6 lg:gap-8 transform-gpu ${
                reduceMotion
                  ? 'flex-wrap justify-center max-w-full w-full'
                  : 'will-change-transform motion-safe:animate-testimonial-scroll hover:[animation-play-state:paused] motion-reduce:animate-none'
              }`}
            >
              {DUPLICATED_TESTIMONIALS.map((testimonial, idx) => (
                <TestimonialCard
                  key={`${testimonial.name}-${idx}`}
                  testimonial={testimonial}
                  index={idx}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-offwhite via-offwhite to-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#00275E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-16 shadow-2xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00275E] via-[#00275E] to-gold/10"></div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
                Join thousands of successful professionals. Let's build your future together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <button
                  type="button"
                  onClick={handleOpenEnquireModal}
                  className="w-full sm:w-auto inline-block text-center bg-gold text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-gold hover:to-gold-bright"
                >
                  Get Started Today
                </button>
                <Link
                  to="/courses"
                  className="w-full sm:w-auto inline-block text-center border-2 border-gold-bright text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:bg-gold-bright hover:text-navy transition-all duration-300"
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
