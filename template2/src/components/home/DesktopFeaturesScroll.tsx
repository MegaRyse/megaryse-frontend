import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ShinyText from '../../animatedComponents/ShinyText'
import {
  FEATURES_DATA,
  RIGHT_VISUAL_IMAGES,
} from './featureVisuals'

const SHRINK_START = 0.2
const HOLD_EXTRA_VH = 120
const END_HOLD_VH = 70
const VISUAL_MIN_WIDTH_RATIO = 0.6
const LEFT_WIDTH_RATIO = 1 - VISUAL_MIN_WIDTH_RATIO
const VISUAL_MIN_WIDTH = `${VISUAL_MIN_WIDTH_RATIO * 100}%`
const LEFT_SECTION_WIDTH = `${LEFT_WIDTH_RATIO * 100}%`
const PANEL_HEIGHT_VH = 62
const TABLET_MAX_WIDTH_PX = 1366
const FIRST_FEATURE_IMAGE_RATIO = 768 / 1024
const TABLET_HEADER_RESERVE_PX = 196
const TABLET_IMAGE_BOTTOM_GAP_PX = 52

function getTabletPanelHeightPx(frameWidth: number) {
  const fromRatio = Math.round(frameWidth * FIRST_FEATURE_IMAGE_RATIO)
  const maxInViewport = Math.round(
    window.innerHeight - TABLET_HEADER_RESERVE_PX - TABLET_IMAGE_BOTTOM_GAP_PX
  )
  return Math.max(320, Math.min(fromRatio, maxInViewport))
}
const FEATURE_CARD_HEIGHT_PX = 172
const DESKTOP_PIN_MEDIA = '(min-width: 1440px) and (hover: hover) and (pointer: fine)'

function useShouldPinFeaturesSection() {
  const [shouldPin, setShouldPin] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_PIN_MEDIA).matches : true
  )
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_PIN_MEDIA)
    const update = () => setShouldPin(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return shouldPin
}

const WIDTH_SETTLE_END = SHRINK_START + 0.16
const HOLD_AFTER_LAYOUT = 0.08
const SELECTION_START = WIDTH_SETTLE_END + HOLD_AFTER_LAYOUT
/** Re-enter / exit thresholds so card reveal can replay when scrolling through the section again */
const REVEAL_ENTER_PROGRESS = WIDTH_SETTLE_END
const REVEAL_EXIT_PROGRESS = WIDTH_SETTLE_END - 0.04
const FEATURES_SECTION_HEIGHT = `${(FEATURES_DATA.length + 1) * 80 + HOLD_EXTRA_VH + END_HOLD_VH}vh`
const TABLET_FEATURES_SECTION_HEIGHT = `${FEATURES_DATA.length * 55 + 90}vh`

const FEATURE_TO_VISUAL = [0, 2, 3] as const

const CARD_EXPAND_TRANSITION = {
  duration: 0.32,
  ease: [0.33, 1, 0.68, 1] as const,
}

const PANEL_HEIGHT_CSS_TRANSITION = 'height 0.32s cubic-bezier(0.33, 1, 0.68, 1)'

const LEFT_LIST_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
}

const LEFT_CARD_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 0.5, 0.35, 0.98] },
  },
}

type FeatureItem = (typeof FEATURES_DATA)[number]

type FeatureCardProps = {
  feature: FeatureItem
  index: number
  isActive: boolean
  isExpanded: boolean
  measureKey: number
  onToggleExpand: (index: number) => void
  onOpenEnquireModal: () => void
  onCardHeightSettled: () => void
  linkClassName: string
  reduceMotion: boolean
}

function FeatureCard({
  feature,
  index,
  isActive,
  isExpanded,
  measureKey,
  onToggleExpand,
  onOpenEnquireModal,
  onCardHeightSettled,
  linkClassName,
  reduceMotion,
}: FeatureCardProps) {
  const articleRef = useRef<HTMLElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [needsReadMore, setNeedsReadMore] = useState(false)
  const [cardHeight, setCardHeight] = useState(FEATURE_CARD_HEIGHT_PX)

  useLayoutEffect(() => {
    const article = articleRef.current
    if (!article) return

    if (isExpanded) {
      article.style.height = 'auto'
      const measured = Math.ceil(article.getBoundingClientRect().height)
      article.style.height = `${FEATURE_CARD_HEIGHT_PX}px`
      void article.offsetHeight
      setCardHeight(Math.max(measured, FEATURE_CARD_HEIGHT_PX))
      return
    }

    setCardHeight(FEATURE_CARD_HEIGHT_PX)
  }, [isExpanded, measureKey])

  useEffect(() => {
    if (isExpanded) return
    const id = requestAnimationFrame(() => {
      const body = bodyRef.current
      const desc = descRef.current
      const title = titleRef.current
      const bodyOverflow = !!body && body.scrollHeight > FEATURE_CARD_HEIGHT_PX - 40
      const descOverflow = !!desc && desc.scrollHeight > desc.clientHeight + 1
      const titleOverflow = !!title && title.scrollWidth > title.clientWidth + 1
      setNeedsReadMore(bodyOverflow || descOverflow || titleOverflow)
    })
    return () => cancelAnimationFrame(id)
  }, [feature.description, feature.title, isExpanded, measureKey])

  return (
    <motion.div variants={LEFT_CARD_VARIANTS} className="w-full flex-shrink-0">
      <motion.article
        ref={articleRef}
        className="relative w-full box-border rounded-2xl transition-colors duration-300 transform-gpu bg-transparent py-3.5 sm:py-4 px-4 sm:px-5 pl-5 sm:pl-6 flex flex-col"
        style={{ width: '100%', overflow: 'hidden' }}
        initial={false}
        animate={{ height: cardHeight }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : CARD_EXPAND_TRANSITION
        }
        onAnimationComplete={onCardHeightSettled}
      >
        <div
          className={`absolute left-0 top-4 bottom-4 w-1 rounded-full transition-colors duration-300 ${
            isActive ? 'bg-gold' : 'bg-transparent'
          }`}
          aria-hidden
        />
        <div
          ref={bodyRef}
          className={`flex flex-col gap-2 w-full min-w-0 pl-3 sm:pl-3.5 justify-start ${
            isExpanded ? '' : 'h-full'
          }`}
        >
          <h3
            ref={titleRef}
            className={`text-[15px] lg:text-base font-bold text-navy leading-tight shrink-0 ${
              isExpanded ? 'break-words' : 'line-clamp-2'
            }`}
          >
            {feature.title}
          </h3>
          <p
            ref={descRef}
            className={`text-sm leading-snug shrink-0 ${
              isExpanded ? 'break-words leading-relaxed' : 'line-clamp-2'
            } ${isActive ? 'text-navy/90' : 'text-text'}`}
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
                className="text-left text-xs sm:text-sm font-semibold text-gold hover:text-gold-bright transition-colors w-fit shrink-0 -mt-0.5"
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

          <div className="mt-auto pt-1 shrink-0">
            {feature.link === '/contact' ? (
              <button
                type="button"
                onClick={onOpenEnquireModal}
                className={`${linkClassName} text-xs sm:text-sm pt-2`}
              >
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
              <Link to={feature.link} className={`${linkClassName} text-xs sm:text-sm pt-2 inline-flex`}>
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

export function DesktopFeaturesScroll({
  onOpenEnquireModal,
  reduceMotion,
  shinyTextPaused,
}: DesktopFeaturesScrollProps) {
  const isDesktopPin = useShouldPinFeaturesSection()
  const sectionRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const leftStackRef = useRef<HTMLDivElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const [leftCardsVisible, setLeftCardsVisible] = useState(false)
  const [leftColPx, setLeftColPx] = useState(0)
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)
  const [panelHeightPx, setPanelHeightPx] = useState(() => {
    if (typeof window === 'undefined') return 500
    if (window.innerWidth <= TABLET_MAX_WIDTH_PX) {
      return getTabletPanelHeightPx(window.innerWidth)
    }
    return Math.round(window.innerHeight * (PANEL_HEIGHT_VH / 100))
  })
  const [sectionExtraPx, setSectionExtraPx] = useState(0)
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

  const getBasePanelPx = useCallback(
    () => Math.round(window.innerHeight * (PANEL_HEIGHT_VH / 100)),
    []
  )

  const syncTabletImageHeight = useCallback(() => {
    const row = rowRef.current
    if (!row || window.innerWidth > TABLET_MAX_WIDTH_PX) return
    const nextHeight = getTabletPanelHeightPx(row.clientWidth)
    setPanelHeightPx((prev) => (prev === nextHeight ? prev : nextHeight))
    setSectionExtraPx(0)
  }, [])

  const syncPanelHeight = useCallback(() => {
    if (window.innerWidth <= TABLET_MAX_WIDTH_PX) {
      syncTabletImageHeight()
      return
    }
    const base = getBasePanelPx()
    const stackH = leftStackRef.current?.scrollHeight ?? base
    const nextPanel = Math.max(base, stackH)
    setPanelHeightPx(nextPanel)
    setSectionExtraPx(Math.max(0, nextPanel - base))
  }, [getBasePanelPx, syncTabletImageHeight])

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const update = () => {
      setLeftColPx(Math.max(0, Math.round(el.clientWidth * LEFT_WIDTH_RATIO)))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const ro = new ResizeObserver(() => {
      if (window.innerWidth > TABLET_MAX_WIDTH_PX) return
      syncTabletImageHeight()
    })
    ro.observe(row)
    syncTabletImageHeight()
    return () => ro.disconnect()
  }, [syncTabletImageHeight])

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
        requestAnimationFrame(() => {
          setLeftCardsVisible(true)
        })
      }

      const hideReveal = () => {
        wasInRevealZoneRef.current = false
        setLeftCardsVisible(false)
        setExpandedFeature(null)
      }

      const prev = prevScrollProgressRef.current
      if (prev === null) {
        prevScrollProgressRef.current = v
        if (v >= REVEAL_ENTER_PROGRESS) {
          triggerReveal()
        } else {
          hideReveal()
        }
        return
      }

      const scrollingDown = v > prev + 0.0005
      prevScrollProgressRef.current = v

      if (v < REVEAL_EXIT_PROGRESS) {
        hideReveal()
        return
      }

      if (scrollingDown && prev < REVEAL_ENTER_PROGRESS && v >= REVEAL_ENTER_PROGRESS) {
        triggerReveal()
      }
    },
    [reduceMotion]
  )

  useEffect(() => {
    applyRevealFromProgress(scrollYProgress.get())
    const unsub = scrollYProgress.on('change', applyRevealFromProgress)
    return unsub
  }, [scrollYProgress, applyRevealFromProgress])

  // Sync panel/section height when expand state changes (not on every ResizeObserver tick during animation)
  useLayoutEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= TABLET_MAX_WIDTH_PX) return
    syncPanelHeight()
  }, [expandedFeature, leftCardsVisible, leftColPx, syncPanelHeight])

  useEffect(() => {
    const onResize = () => syncPanelHeight()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [syncPanelHeight])

  const handleCardHeightSettled = useCallback(() => {
    syncPanelHeight()
  }, [syncPanelHeight])

  const highlightIndex = useTransform(
    scrollYProgress,
    [0, SELECTION_START, 1],
    [0, 0, 3]
  )
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

  const handleToggleExpand = useCallback((index: number) => {
    setExpandedFeature((prev) => (prev === index ? null : index))
  }, [])

  const activeVisualIndex = FEATURE_TO_VISUAL[activeFeature] ?? 0

  const linkClassName =
    'group inline-flex items-center gap-2 font-semibold text-gold hover:text-gold-bright transition-colors duration-200 cursor-pointer'

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{
        height:
          sectionExtraPx > 0
            ? `calc(${isDesktopPin ? FEATURES_SECTION_HEIGHT : TABLET_FEATURES_SECTION_HEIGHT} + ${sectionExtraPx}px)`
            : isDesktopPin
              ? FEATURES_SECTION_HEIGHT
              : TABLET_FEATURES_SECTION_HEIGHT,
        overflowAnchor: 'none',
        transition: reduceMotion || !isDesktopPin ? undefined : PANEL_HEIGHT_CSS_TRANSITION,
      }}
    >
      <div
        className={`relative flex flex-col gap-10 pt-32 ${
          isDesktopPin ? 'min-h-screen' : 'min-h-0 gap-4 pt-16 sm:pt-20 md:pt-24'
        }`}
        style={{ position: 'sticky', top: 0 }}
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

        <div ref={rowRef} className="flex items-start relative flex-1 w-full min-w-0 pb-8">
          <motion.div
            style={{
              width: leftWidth,
              minWidth: 0,
              height: panelHeightPx,
              transition: reduceMotion || !isDesktopPin ? undefined : PANEL_HEIGHT_CSS_TRANSITION,
            }}
            className="relative overflow-hidden flex-shrink-0 transform-gpu"
          >
            {leftColPx > 0 ? (
              <motion.div
                ref={leftStackRef}
                className="box-border pl-6 sm:pl-8 lg:pl-10 pr-4 lg:pr-5 flex flex-col justify-start gap-3.5 py-1"
                style={{ width: leftColPx }}
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
                    measureKey={leftColPx}
                    onToggleExpand={handleToggleExpand}
                    onOpenEnquireModal={onOpenEnquireModal}
                    onCardHeightSettled={handleCardHeightSettled}
                    linkClassName={linkClassName}
                    reduceMotion={reduceMotion}
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
              transition: reduceMotion || !isDesktopPin ? undefined : PANEL_HEIGHT_CSS_TRANSITION,
            }}
            className="flex items-center justify-center flex-shrink-0 min-w-0 box-border"
          >
            <div className="bg-offwhite rounded-3xl w-full h-full min-h-[280px] relative overflow-hidden min-w-0 transform-gpu max-[1366px]:min-h-0 max-[1366px]:rounded-2xl">
              {RIGHT_VISUAL_IMAGES.map((visual, idx) => (
                <div
                  key={visual.alt + idx}
                  className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none max-[1366px]:rounded-2xl"
                  style={{
                    opacity: idx === activeVisualIndex ? 1 : 0,
                  }}
                  aria-hidden={idx !== activeVisualIndex}
                >
                  <picture className="absolute inset-0 block h-full w-full">
                    <source srcSet={visual.webp} type="image/webp" />
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full rounded-3xl object-center ${
                        visual.objectFit === 'contain'
                          ? 'object-contain'
                          : 'object-cover scale-[1.04]'
                      } max-[1366px]:scale-100 max-[1366px]:rounded-2xl max-[1366px]:object-cover`}
                    />
                  </picture>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
