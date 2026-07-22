import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { OptimizedImage } from '../OptimizedImage'
import ShinyText from '../../animatedComponents/ShinyText'
import {
  FEATURES_DATA,
  RIGHT_VISUAL_IMAGES,
  featureVisualImageClass,
} from './featureVisuals'

const SHRINK_START = 0.2
const HOLD_EXTRA_VH = 120
const END_HOLD_VH = 70
const VISUAL_MIN_WIDTH_RATIO = 0.6
const LEFT_WIDTH_RATIO = 1 - VISUAL_MIN_WIDTH_RATIO
const VISUAL_MIN_WIDTH = `${VISUAL_MIN_WIDTH_RATIO * 100}%`
const LEFT_SECTION_WIDTH = `${LEFT_WIDTH_RATIO * 100}%`
const WIDTH_SETTLE_END = SHRINK_START + 0.16
const HOLD_AFTER_LAYOUT = 0.08
const SELECTION_START = WIDTH_SETTLE_END + HOLD_AFTER_LAYOUT
const REVEAL_ENTER_PROGRESS = WIDTH_SETTLE_END
const REVEAL_EXIT_PROGRESS = WIDTH_SETTLE_END - 0.04
const REVEAL_SCROLL_UP_BAND = SELECTION_START + 0.14
const FEATURES_SECTION_HEIGHT = `${(FEATURES_DATA.length + 1) * 80 + HOLD_EXTRA_VH + END_HOLD_VH}vh`
/** Fallback card height before first measure */
const DEFAULT_CARD_HEIGHT = 140
const CARD_GAP_PX = 10
const FEATURE_COUNT = FEATURES_DATA.length

const FEATURE_TO_VISUAL = [0, 2, 3] as const

const CARD_EXPAND_TRANSITION = {
  duration: 0.28,
  ease: [0.33, 1, 0.68, 1] as const,
}

const LEFT_LIST_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
}

const LEFT_CARD_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.22, 0.5, 0.35, 0.98] },
  },
}

type FeatureItem = (typeof FEATURES_DATA)[number]

type FeatureCardProps = {
  feature: FeatureItem
  index: number
  isActive: boolean
  isExpanded: boolean
  collapsedHeight: number
  measureKey: number
  onToggleExpand: (index: number) => void
  onOpenEnquireModal: () => void
  linkClassName: string
  reduceMotion: boolean
  compact: boolean
}

function FeatureCard({
  feature,
  index,
  isActive,
  isExpanded,
  collapsedHeight,
  measureKey,
  onToggleExpand,
  onOpenEnquireModal,
  linkClassName,
  reduceMotion,
  compact,
}: FeatureCardProps) {
  const articleRef = useRef<HTMLElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [needsReadMore, setNeedsReadMore] = useState(false)
  const [cardHeight, setCardHeight] = useState(collapsedHeight)

  useLayoutEffect(() => {
    const article = articleRef.current
    if (!article) return

    if (isExpanded) {
      article.style.height = 'auto'
      const measured = Math.ceil(article.getBoundingClientRect().height)
      article.style.height = `${collapsedHeight}px`
      void article.offsetHeight
      setCardHeight(Math.max(measured, collapsedHeight))
      return
    }

    setCardHeight(collapsedHeight)
  }, [isExpanded, measureKey, collapsedHeight])

  useEffect(() => {
    if (isExpanded) return
    const id = requestAnimationFrame(() => {
      const body = bodyRef.current
      const desc = descRef.current
      const title = titleRef.current
      const bodyOverflow = !!body && body.scrollHeight > collapsedHeight - 36
      const descOverflow = !!desc && desc.scrollHeight > desc.clientHeight + 1
      const titleOverflow = !!title && title.scrollWidth > title.clientWidth + 1
      setNeedsReadMore(bodyOverflow || descOverflow || titleOverflow)
    })
    return () => cancelAnimationFrame(id)
  }, [feature.description, feature.title, isExpanded, measureKey, collapsedHeight])

  return (
    <motion.div variants={LEFT_CARD_VARIANTS} className="w-full flex-shrink-0">
      <motion.article
        ref={articleRef}
        className="relative w-full box-border rounded-2xl transition-colors duration-300 transform-gpu bg-transparent flex flex-col"
        style={{
          width: '100%',
          overflow: 'hidden',
          padding: compact ? '0.5rem 0.85rem 0.5rem 1rem' : '0.75rem 1rem 0.75rem 1.15rem',
        }}
        initial={false}
        animate={{ height: cardHeight }}
        transition={reduceMotion ? { duration: 0 } : CARD_EXPAND_TRANSITION}
      >
        <div
          className={`absolute left-0 top-2 bottom-2 w-1 rounded-full transition-colors duration-300 ${
            isActive ? 'bg-gold' : 'bg-transparent'
          }`}
          aria-hidden
        />
        <div
          ref={bodyRef}
          className={`flex flex-col gap-1 w-full min-w-0 pl-2.5 justify-start ${
            isExpanded ? '' : 'h-full'
          }`}
        >
          <h3
            ref={titleRef}
            className={`font-bold text-navy leading-tight shrink-0 ${
              compact ? 'text-[13px] lg:text-sm' : 'text-[15px] lg:text-base'
            } ${isExpanded ? 'break-words' : 'line-clamp-2'}`}
          >
            {feature.title}
          </h3>
          <p
            ref={descRef}
            className={`leading-snug shrink-0 ${
              compact ? 'text-[11px] lg:text-xs' : 'text-sm'
            } ${isExpanded ? 'break-words leading-relaxed' : 'line-clamp-2'} ${
              isActive ? 'text-navy/90' : 'text-text'
            }`}
          >
            {feature.description}
          </p>

          <AnimatePresence initial={false}>
            {(needsReadMore || isExpanded) && (
              <motion.button
                type="button"
                key="read-more"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-left text-[11px] sm:text-xs font-semibold text-gold hover:text-gold-bright transition-colors w-fit shrink-0"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onToggleExpand(index)
                }}
                aria-expanded={isExpanded}
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </motion.button>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-0.5 shrink-0">
            {feature.link === '/contact' ? (
              <button type="button" onClick={onOpenEnquireModal} className={`${linkClassName} text-[11px] sm:text-xs`}>
                <span className="underline decoration-2 underline-offset-2 decoration-gold/80 group-hover:decoration-gold-bright">
                  {feature.linkText}
                </span>
                <span
                  className="inline-block no-underline transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </button>
            ) : (
              <Link to={feature.link} className={`${linkClassName} text-[11px] sm:text-xs inline-flex`}>
                <span className="underline decoration-2 underline-offset-2 decoration-gold/80 group-hover:decoration-gold-bright">
                  {feature.linkText}
                </span>
                <span
                  className="inline-block no-underline transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            )}
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

type DesktopFeaturesScrollProps = {
  onOpenEnquireModal: () => void
  reduceMotion: boolean
  shinyTextPaused: boolean
}

/**
 * Sticky Why Choose section sized to the visible viewport under the navbar.
 * Short laptop heights (e.g. 673px) shrink heading, cards, and image together.
 */
export function DesktopFeaturesScroll({
  onOpenEnquireModal,
  reduceMotion,
  shinyTextPaused,
}: DesktopFeaturesScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const [leftCardsVisible, setLeftCardsVisible] = useState(false)
  const [leftColPx, setLeftColPx] = useState(0)
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)
  const [panelHeightPx, setPanelHeightPx] = useState(DEFAULT_CARD_HEIGHT * FEATURE_COUNT)
  const [collapsedCardHeight, setCollapsedCardHeight] = useState(DEFAULT_CARD_HEIGHT)
  const [compact, setCompact] = useState(false)
  const wasInRevealZoneRef = useRef(false)
  const prevScrollProgressRef = useRef<number | null>(null)

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

  const measureLayout = useCallback(() => {
    const sticky = stickyRef.current
    const header = headerRef.current
    const row = rowRef.current
    if (!sticky) return

    const stickyH = sticky.clientHeight
    const headerH = header?.offsetHeight ?? 72
    const available = Math.max(240, stickyH - headerH - 12)
    const gaps = CARD_GAP_PX * (FEATURE_COUNT - 1)
    const cardH = Math.max(96, Math.floor((available - gaps) / FEATURE_COUNT))

    setPanelHeightPx(available)
    setCollapsedCardHeight(cardH)
    setCompact(stickyH < 720)
    if (row) {
      setLeftColPx(Math.max(0, Math.round(row.clientWidth * LEFT_WIDTH_RATIO)))
    }
  }, [])

  useLayoutEffect(() => {
    measureLayout()
    const sticky = stickyRef.current
    if (!sticky) return
    const ro = new ResizeObserver(() => measureLayout())
    ro.observe(sticky)
    if (rowRef.current) ro.observe(rowRef.current)
    window.addEventListener('resize', measureLayout)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measureLayout)
    }
  }, [measureLayout])

  const applyRevealFromProgress = useCallback(
    (v: number) => {
      if (reduceMotion) {
        setLeftCardsVisible(true)
        wasInRevealZoneRef.current = true
        prevScrollProgressRef.current = v
        return
      }

      const triggerReveal = () => {
        wasInRevealZoneRef.current = true
        setLeftCardsVisible(false)
        requestAnimationFrame(() => setLeftCardsVisible(true))
      }

      const hideReveal = () => {
        wasInRevealZoneRef.current = false
        setLeftCardsVisible(false)
        setExpandedFeature(null)
      }

      const prev = prevScrollProgressRef.current
      if (prev === null) {
        prevScrollProgressRef.current = v
        if (v >= REVEAL_ENTER_PROGRESS) triggerReveal()
        else hideReveal()
        return
      }

      const scrollingUp = v < prev - 0.0005
      const scrollingDown = v > prev + 0.0005
      prevScrollProgressRef.current = v

      if (v < REVEAL_EXIT_PROGRESS) {
        hideReveal()
        return
      }

      if (scrollingDown && prev < REVEAL_ENTER_PROGRESS && v >= REVEAL_ENTER_PROGRESS) {
        triggerReveal()
        return
      }

      if (
        scrollingUp &&
        prev > REVEAL_SCROLL_UP_BAND &&
        v <= REVEAL_SCROLL_UP_BAND &&
        v >= REVEAL_ENTER_PROGRESS
      ) {
        triggerReveal()
      }
    },
    [reduceMotion]
  )

  useEffect(() => {
    applyRevealFromProgress(scrollYProgress.get())
    return scrollYProgress.on('change', applyRevealFromProgress)
  }, [scrollYProgress, applyRevealFromProgress])

  const highlightIndex = useTransform(scrollYProgress, [0, SELECTION_START, 1], [0, 0, 3])

  useEffect(() => {
    const updateFromScroll = (latest: number) => {
      setActiveFeature(Math.min(2, Math.max(0, Math.floor(latest))))
    }
    updateFromScroll(highlightIndex.get())
    return highlightIndex.on('change', updateFromScroll)
  }, [highlightIndex])

  const handleToggleExpand = useCallback((index: number) => {
    setExpandedFeature((prev) => (prev === index ? null : index))
  }, [])

  const activeVisualIndex = FEATURE_TO_VISUAL[activeFeature] ?? 0

  const linkClassName =
    'group inline-flex items-center gap-1.5 font-semibold text-gold hover:text-gold-bright transition-colors duration-200 cursor-pointer'

  return (
    <div ref={sectionRef} className="relative" style={{ height: FEATURES_SECTION_HEIGHT }}>
      {/* Single-viewport sticky frame: sits under navbar, never taller than remaining screen */}
      <div
        ref={stickyRef}
        className="sticky top-14 md:top-24 lg:top-28 xl:top-[7.5rem] flex h-[calc(100svh-3.5rem)] md:h-[calc(100svh-6rem)] lg:h-[calc(100svh-7rem)] xl:h-[calc(100svh-7.5rem)] flex-col overflow-hidden"
      >
        <div
          ref={headerRef}
          className={`shrink-0 px-4 sm:px-6 lg:px-8 ${compact ? 'pt-1 pb-1.5' : 'pt-2 pb-3 md:pt-3 md:pb-4'}`}
        >
          <h2
            className={`font-bold text-center leading-tight ${
              compact ? 'text-xl md:text-2xl lg:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'
            }`}
          >
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
          <p
            className={`text-center text-gray-600 max-w-2xl mx-auto ${
              compact ? 'mt-0.5 text-xs md:text-sm' : 'mt-2 text-sm md:text-base lg:text-lg'
            }`}
          >
            Your trusted partner in achieving academic and career excellence
          </p>
        </div>

        <div
          ref={rowRef}
          className="relative flex min-h-0 flex-1 w-full items-stretch px-3 sm:px-5 lg:px-6 pb-2 md:pb-3"
        >
          <motion.div
            style={{
              width: leftWidth,
              minWidth: 0,
              height: panelHeightPx,
            }}
            className={`relative flex-shrink-0 transform-gpu ${
              expandedFeature !== null ? 'overflow-y-auto overscroll-contain' : 'overflow-hidden'
            }`}
          >
            {leftColPx > 0 ? (
              <motion.div
                className="box-border flex h-full flex-col justify-start pl-2 sm:pl-4 lg:pl-6 pr-2 lg:pr-4"
                style={{ width: leftColPx, gap: CARD_GAP_PX }}
                variants={LEFT_LIST_VARIANTS}
                initial={reduceMotion ? 'visible' : 'hidden'}
                animate={leftCardsVisible || reduceMotion ? 'visible' : 'hidden'}
              >
                {FEATURES_DATA.map((f, i) => (
                  <FeatureCard
                    key={f.title}
                    feature={f}
                    index={i}
                    isActive={i === activeFeature}
                    isExpanded={expandedFeature === i}
                    collapsedHeight={collapsedCardHeight}
                    measureKey={leftColPx + collapsedCardHeight}
                    onToggleExpand={handleToggleExpand}
                    onOpenEnquireModal={onOpenEnquireModal}
                    linkClassName={linkClassName}
                    reduceMotion={reduceMotion}
                    compact={compact}
                  />
                ))}
              </motion.div>
            ) : null}
          </motion.div>

          <motion.div
            style={{
              width: visualWidth,
              minWidth: 0,
              height: panelHeightPx,
            }}
            className="flex min-w-0 flex-shrink-0 items-stretch box-border"
          >
            <div className="relative h-full w-full min-h-0 overflow-hidden rounded-2xl bg-offwhite transform-gpu md:rounded-3xl">
              {RIGHT_VISUAL_IMAGES.map((visual, idx) => (
                <div
                  key={visual.alt + idx}
                  className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none md:rounded-3xl"
                  style={{ opacity: idx === activeVisualIndex ? 1 : 0 }}
                  aria-hidden={idx !== activeVisualIndex}
                >
                  <OptimizedImage
                    src={visual.src}
                    webpSrc={visual.webp}
                    alt={visual.alt}
                    className={featureVisualImageClass(visual.objectFit ?? 'contain', true)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
