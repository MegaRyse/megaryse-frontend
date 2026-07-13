import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { OptimizedImage } from '../OptimizedImage'
import ShinyText from '../../animatedComponents/ShinyText'
import {
  FEATURES_DATA,
  RIGHT_VISUAL_IMAGES,
  featureVisualImageClass,
} from './featureVisuals'

const TRANSITION_SMOOTH = { duration: 0.4, ease: [0.22, 0.5, 0.35, 0.98] as const }

const SHRINK_START = 0.2
const SHRINK_END = 0.8
const HIGHLIGHT_START = SHRINK_END
const HOLD_EXTRA_VH = 60
const END_HOLD_VH = 40
const VISUAL_MIN_WIDTH_RATIO = 0.6
const VISUAL_MIN_WIDTH = `${VISUAL_MIN_WIDTH_RATIO * 100}%`
const LEFT_SECTION_WIDTH = `${(1 - VISUAL_MIN_WIDTH_RATIO) * 100}%`
const FIXED_HEIGHT = '62vh'
const LEFT_CARD_MIN_HEIGHT = '18vh'
const WIDTH_SETTLE_END = SHRINK_START + 0.16
const REVEAL_END = SHRINK_START + 0.52
const CARD_SLIDE_START = 0.03
const CARD_SLIDE_DURATION = 0.26
const CARD_SLIDE_OFFSET = 0.13
const FEATURES_SECTION_HEIGHT = `${(FEATURES_DATA.length + 1) * 55 + HOLD_EXTRA_VH + END_HOLD_VH}vh`

const HIGHLIGHT_RANGE = 1 - HIGHLIGHT_START
const VISUAL_SEGMENT = HIGHLIGHT_RANGE / FEATURES_DATA.length
const VISUAL_CROSSFADE = Math.min(VISUAL_SEGMENT * 0.5, 0.045)

const BLOCK_REVEAL = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 0.5, 0.35, 0.98] } },
}

type DesktopFeaturesScrollProps = {
  onOpenEnquireModal: () => void
  reduceMotion: boolean
  shinyTextPaused: boolean
}

export function DesktopFeaturesScroll({
  onOpenEnquireModal,
  reduceMotion,
  shinyTextPaused,
}: DesktopFeaturesScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const [leftItemTextRevealed, setLeftItemTextRevealed] = useState<boolean[]>([false, false, false])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const visualWidth = useTransform(
    scrollYProgress,
    [0, SHRINK_START, WIDTH_SETTLE_END],
    ['100%', '100%', VISUAL_MIN_WIDTH]
  )

  const leftWidth = useTransform(
    scrollYProgress,
    [SHRINK_START, WIDTH_SETTLE_END],
    ['0%', LEFT_SECTION_WIDTH]
  )

  const leftOpacity = useTransform(
    scrollYProgress,
    [SHRINK_START, SHRINK_START + 0.24, REVEAL_END],
    [0, 0.65, 1]
  )

  const leftX = useTransform(
    scrollYProgress,
    [SHRINK_START, SHRINK_START + 0.24, REVEAL_END],
    [-28, -10, 0]
  )

  const leftItem0Opacity = useTransform(
    scrollYProgress,
    [SHRINK_START + CARD_SLIDE_START, SHRINK_START + CARD_SLIDE_START + CARD_SLIDE_DURATION],
    [0, 1]
  )
  const leftItem1Opacity = useTransform(
    scrollYProgress,
    [
      SHRINK_START + CARD_SLIDE_OFFSET + CARD_SLIDE_START,
      SHRINK_START + CARD_SLIDE_OFFSET + CARD_SLIDE_START + CARD_SLIDE_DURATION,
    ],
    [0, 1]
  )
  const leftItem2Opacity = useTransform(
    scrollYProgress,
    [
      SHRINK_START + 2 * CARD_SLIDE_OFFSET + CARD_SLIDE_START,
      SHRINK_START + 2 * CARD_SLIDE_OFFSET + CARD_SLIDE_START + CARD_SLIDE_DURATION,
    ],
    [0, 1]
  )
  const leftItem0X = useTransform(
    scrollYProgress,
    [SHRINK_START + CARD_SLIDE_START, SHRINK_START + CARD_SLIDE_START + CARD_SLIDE_DURATION],
    [120, 0]
  )
  const leftItem1X = useTransform(
    scrollYProgress,
    [
      SHRINK_START + CARD_SLIDE_OFFSET + CARD_SLIDE_START,
      SHRINK_START + CARD_SLIDE_OFFSET + CARD_SLIDE_START + CARD_SLIDE_DURATION,
    ],
    [120, 0]
  )
  const leftItem2X = useTransform(
    scrollYProgress,
    [
      SHRINK_START + 2 * CARD_SLIDE_OFFSET + CARD_SLIDE_START,
      SHRINK_START + 2 * CARD_SLIDE_OFFSET + CARD_SLIDE_START + CARD_SLIDE_DURATION,
    ],
    [120, 0]
  )

  const visualOpacity0 = useTransform(
    scrollYProgress,
    [0, HIGHLIGHT_START, HIGHLIGHT_START + VISUAL_CROSSFADE],
    [1, 1, 0]
  )
  const visualOpacity1 = useTransform(
    scrollYProgress,
    [
      HIGHLIGHT_START + VISUAL_CROSSFADE * 0.5,
      HIGHLIGHT_START + VISUAL_CROSSFADE,
      HIGHLIGHT_START + VISUAL_SEGMENT,
      HIGHLIGHT_START + VISUAL_SEGMENT + VISUAL_CROSSFADE,
    ],
    [0, 1, 1, 0]
  )
  const visualOpacity2 = useTransform(
    scrollYProgress,
    [
      HIGHLIGHT_START + VISUAL_SEGMENT + VISUAL_CROSSFADE * 0.5,
      HIGHLIGHT_START + VISUAL_SEGMENT + VISUAL_CROSSFADE,
      HIGHLIGHT_START + VISUAL_SEGMENT * 2,
      HIGHLIGHT_START + VISUAL_SEGMENT * 2 + VISUAL_CROSSFADE,
    ],
    [0, 1, 1, 0]
  )
  const visualOpacity3 = useTransform(
    scrollYProgress,
    [
      HIGHLIGHT_START + VISUAL_SEGMENT * 2 + VISUAL_CROSSFADE * 0.5,
      HIGHLIGHT_START + VISUAL_SEGMENT * 2 + VISUAL_CROSSFADE,
      1,
    ],
    [0, 1, 1]
  )

  const visualOpacities = useMemo(
    () => [visualOpacity0, visualOpacity1, visualOpacity2, visualOpacity3],
    [visualOpacity0, visualOpacity1, visualOpacity2, visualOpacity3]
  )

  const leftItemOpacities = useMemo(
    () => [leftItem0Opacity, leftItem1Opacity, leftItem2Opacity],
    [leftItem0Opacity, leftItem1Opacity, leftItem2Opacity]
  )
  const leftItemXs = useMemo(
    () => [leftItem0X, leftItem1X, leftItem2X],
    [leftItem0X, leftItem1X, leftItem2X]
  )

  const highlightIndex = useTransform(scrollYProgress, [HIGHLIGHT_START, 1], [0, 3])

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

  const linkClassName =
    'group inline-flex items-center gap-2 font-semibold text-gold hover:text-gold-bright transition-colors duration-200 cursor-pointer'

  return (
    <div ref={sectionRef} className="relative" style={{ height: FEATURES_SECTION_HEIGHT }}>
      <motion.div
        style={{ position: 'sticky', top: 0, height: '100vh' }}
        className="relative flex flex-col gap-10 pt-32"
      >
        <div className="px-6 sm:px-8 lg:px-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
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
                  disabled={shinyTextPaused}
                />
              )}
            </span>
            ?
          </h2>
          <p className="text-center text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Your trusted partner in achieving academic and career excellence
          </p>
        </div>

        <div className="flex items-center relative flex-1 w-full min-w-0">
          <motion.div
            style={{
              width: leftWidth,
              opacity: leftOpacity,
              x: leftX,
              height: FIXED_HEIGHT,
              minWidth: 0,
            }}
            className="flex flex-col justify-start gap-6 h-full origin-left overflow-hidden transform-gpu flex-shrink-0"
          >
            <div className="pl-6 sm:pl-8 lg:pl-10 pr-6 sm:pr-4 lg:pr-4 flex flex-col justify-start gap-6 flex-1 min-h-0">
              {FEATURES_DATA.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="w-full min-w-full flex-shrink-0 relative pl-6 border-l-2 border-transparent overflow-visible transform-gpu"
                  style={{
                    minHeight: LEFT_CARD_MIN_HEIGHT,
                    width: '100%',
                    opacity: leftItemOpacities[i],
                    x: leftItemXs[i],
                  }}
                >
                  <motion.div
                    className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full ${i === activeFeature ? 'bg-gold' : 'bg-transparent'}`}
                    initial={false}
                    animate={{
                      scaleY: i === activeFeature ? 1 : 0.3,
                      opacity: i === activeFeature ? 1 : 0,
                    }}
                    transition={TRANSITION_SMOOTH}
                  />
                  <div className="flex flex-col justify-start py-2 w-full max-w-full min-w-0">
                    <motion.h3
                      className="text-xl font-bold mb-1.5 text-navy break-words"
                      variants={BLOCK_REVEAL}
                      initial="hidden"
                      animate={leftItemTextRevealed[i] ? 'visible' : 'hidden'}
                    >
                      {f.icon} {f.title}
                    </motion.h3>
                    <motion.p
                      className={`text-sm leading-relaxed mb-1.5 break-words ${i === activeFeature ? 'text-navy' : 'text-text'}`}
                      variants={BLOCK_REVEAL}
                      initial="hidden"
                      animate={leftItemTextRevealed[i] ? 'visible' : 'hidden'}
                    >
                      {f.description}
                    </motion.p>
                    <motion.span className="inline-block mt-1.5 text-sm" style={{ opacity: leftItemOpacities[i] }}>
                      {f.link === '/contact' ? (
                        <button type="button" onClick={onOpenEnquireModal} className={linkClassName}>
                          <span className="underline decoration-2 underline-offset-2 decoration-gold/80 group-hover:decoration-gold-bright">
                            {f.linkText}
                          </span>
                          <span
                            className="inline-block no-underline transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden
                          >
                            →
                          </span>
                        </button>
                      ) : (
                        <Link to={f.link} className={linkClassName}>
                          <span className="underline decoration-2 underline-offset-2 decoration-gold/80 group-hover:decoration-gold-bright">
                            {f.linkText}
                          </span>
                          <span
                            className="inline-block no-underline transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden
                          >
                            →
                          </span>
                        </Link>
                      )}
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{
              width: visualWidth,
              height: FIXED_HEIGHT,
              minWidth: 0,
            }}
            className="flex items-center justify-center flex-shrink-0 min-w-0 box-border"
          >
            <div className="bg-offwhite rounded-3xl w-full h-full relative overflow-hidden min-w-0 transform-gpu">
              {RIGHT_VISUAL_IMAGES.map((visual, idx) => (
                <motion.div
                  key={visual.alt + idx}
                  className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none will-change-[opacity]"
                  style={{ opacity: visualOpacities[idx] }}
                >
                  <OptimizedImage
                    src={visual.src}
                    webpSrc={visual.webp}
                    alt={visual.alt}
                    className={featureVisualImageClass(visual.objectFit, true)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
