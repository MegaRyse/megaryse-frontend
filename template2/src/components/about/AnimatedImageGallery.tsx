import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { OptimizedImage } from '../OptimizedImage'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { GalleryImage } from '../../data/aboutGallery'
import {
  ABOUT_GALLERY_IMAGES,
  ABOUT_GALLERY_PREVIEWS,
} from '../../data/aboutGallery'

const SPRING = { type: 'spring' as const, stiffness: 360, damping: 24 }
const EASE = [0.22, 1, 0.36, 1] as const
const AUTO_SCROLL_MS = 3200
const ZOOM_LEVELS = [1, 1.45, 1.9] as const
const MARQUEE_SPEED = 0.04
const DEFAULT_ASPECT = 4 / 3

type AnimatedImageGalleryProps = {
  previews?: GalleryImage[]
  allImages?: GalleryImage[]
  title?: string
}

function getAspect(image: GalleryImage): number {
  if (image.width && image.height && image.height > 0) {
    return image.width / image.height
  }
  return DEFAULT_ASPECT
}

function MarqueeCard({
  image,
  reduceMotion,
  onOpen,
}: {
  image: GalleryImage
  reduceMotion: boolean
  onOpen: () => void
}) {
  const aspect = getAspect(image)

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={image.alt}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative h-[clamp(10.5rem,28vw,17.5rem)] flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200/90 bg-gray-50 shadow-sm ring-1 ring-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      style={{ aspectRatio: `${aspect}`, width: 'auto' }}
    >
      <OptimizedImage
        src={image.src}
        webpSrc={image.webpSrc}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="absolute inset-0 h-full w-full object-contain object-center p-1 sm:p-1.5"
      />
    </motion.button>
  )
}

function LifeAtMarquee({
  images,
  reduceMotion,
  onOpen,
}: {
  images: GalleryImage[]
  reduceMotion: boolean
  onOpen: (index: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const halfWidthRef = useRef(0)
  const [paused, setPaused] = useState(false)

  const loop = images.length > 0 ? [...images, ...images] : []

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const measure = () => {
      halfWidthRef.current = el.scrollWidth / 2
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [images])

  useAnimationFrame((_t, delta) => {
    if (paused || reduceMotion || images.length < 2) return
    const half = halfWidthRef.current
    if (half <= 0) return
    let next = x.get() - delta * MARQUEE_SPEED
    if (next <= -half) next += half
    x.set(next)
  })

  if (images.length === 0) return null

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="overflow-hidden py-2 sm:py-3"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
        }}
      >
        <motion.div
          ref={trackRef}
          className="flex w-max items-center gap-3 will-change-transform sm:gap-4 md:gap-5"
          style={{ x }}
        >
          {loop.map((image, idx) => {
            const realIndex = idx % images.length
            return (
              <MarqueeCard
                key={`${image.id}-marquee-${idx}`}
                image={image}
                reduceMotion={reduceMotion}
                onOpen={() => onOpen(realIndex)}
              />
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

function GalleryLightbox({
  images,
  startIndex,
  onClose,
  reduceMotion,
}: {
  images: GalleryImage[]
  startIndex: number
  onClose: () => void
  reduceMotion: boolean
}) {
  const [activeIndex, setActiveIndex] = useState(startIndex)
  const [zoomStep, setZoomStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)
  const stripX = useMotionValue(0)
  const stripWidthRef = useRef(0)

  const active = images[activeIndex] ?? images[0]
  const zoom = ZOOM_LEVELS[zoomStep] ?? 1
  const activeAspect = getAspect(active)

  const goTo = useCallback(
    (next: number) => {
      const len = images.length
      if (len === 0) return
      setActiveIndex(((next % len) + len) % len)
      setZoomStep(0)
    },
    [images.length]
  )

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  const cycleZoom = useCallback(() => {
    setZoomStep((z) => (z + 1) % ZOOM_LEVELS.length)
  }, [])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        cycleZoom()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, goNext, goPrev, cycleZoom])

  useEffect(() => {
    if (paused || reduceMotion || images.length < 2) return
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length)
      setZoomStep(0)
    }, AUTO_SCROLL_MS)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion, images.length])

  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    const measure = () => {
      stripWidthRef.current = el.scrollWidth / 2
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [images])

  useAnimationFrame((_t, delta) => {
    if (paused || reduceMotion || images.length < 2) return
    const half = stripWidthRef.current
    if (half <= 0) return
    let next = stripX.get() - delta * 0.045
    if (next <= -half) next += half
    stripX.set(next)
  })

  const duplicated = images.length > 0 ? [...images, ...images] : []

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      className="fixed inset-0 z-[90] flex flex-col bg-[#0F162D]/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.28 }}
      onClick={onClose}
    >
      <header
        className="relative z-30 shrink-0 border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <p className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold tabular-nums text-white">
            <span className="text-gold-bright">{activeIndex + 1}</span>
            <span className="mx-1.5 font-normal text-white/45">/</span>
            <span className="text-white/90">{images.length}</span>
          </p>
          <motion.button
            type="button"
            aria-label="Close gallery"
            onClick={onClose}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            transition={SPRING}
            className="rounded-full bg-[#C9A55E] px-4 py-1.5 text-xs font-semibold text-[#0F162D]"
          >
            Close
          </motion.button>
        </div>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-3 py-3 sm:px-8 sm:py-4">
        <motion.button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          whileHover={reduceMotion ? undefined : { scale: 1.08, x: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          transition={SPRING}
          className="absolute left-2 z-20 hidden h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white sm:flex sm:left-4"
        >
          ‹
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="relative flex h-full max-h-full w-full max-w-5xl cursor-zoom-in items-center justify-center"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
            transition={reduceMotion ? { duration: 0 } : SPRING}
            onClick={(e) => {
              e.stopPropagation()
              cycleZoom()
            }}
          >
            <motion.div
              className="relative max-h-[min(62vh,640px)] w-full max-w-full overflow-hidden rounded-2xl bg-black/20"
              style={{ aspectRatio: `${activeAspect}` }}
              animate={{ scale: zoom }}
              transition={SPRING}
            >
              <OptimizedImage
                src={active.src}
                webpSrc={active.webpSrc}
                alt={active.alt}
                width={active.width}
                height={active.height}
                priority
                className="absolute inset-0 h-full w-full object-contain object-center"
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          whileHover={reduceMotion ? undefined : { scale: 1.08, x: 2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          transition={SPRING}
          className="absolute right-2 z-20 hidden h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white sm:flex sm:right-4"
        >
          ›
        </motion.button>
      </div>

      <div
        className="relative z-30 shrink-0 overflow-hidden border-t border-white/10 bg-black/25 py-3 sm:py-4"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          ref={stripRef}
          className="flex w-max items-center gap-2.5 px-4 will-change-transform sm:gap-3"
          style={{ x: stripX }}
        >
          {duplicated.map((img, idx) => {
            const realIndex = idx % images.length
            const isActive = realIndex === activeIndex
            const thumbAspect = getAspect(img)
            return (
              <motion.button
                key={`${img.id}-strip-${idx}`}
                type="button"
                aria-label={`Show image ${realIndex + 1}`}
                aria-current={isActive}
                onClick={(e) => {
                  e.stopPropagation()
                  goTo(realIndex)
                }}
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.04 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={SPRING}
                animate={{
                  borderColor: isActive ? 'rgba(201, 165, 94, 0.95)' : 'rgba(255,255,255,0.15)',
                  opacity: isActive ? 1 : 0.72,
                }}
                className="relative h-14 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-white/5 sm:h-16 md:h-[4.5rem]"
                style={{ aspectRatio: `${thumbAspect}`, width: 'auto' }}
              >
                <OptimizedImage
                  src={img.src}
                  webpSrc={img.webpSrc}
                  alt=""
                  width={img.width}
                  height={img.height}
                  className="absolute inset-0 h-full w-full object-contain object-center"
                />
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}

/**
 * About gallery: native-aspect previews → lightbox with all images, auto-scroll, zoom.
 */
export function AnimatedImageGallery({
  previews = ABOUT_GALLERY_PREVIEWS,
  allImages = ABOUT_GALLERY_IMAGES,
  title = 'Life at MegaRyse',
}: AnimatedImageGalleryProps) {
  const reduceMotion = usePrefersReducedMotion()
  const [open, setOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  const handleOpen = useCallback((index: number) => {
    setStartIndex(index)
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const titleParts = title.trim().split(/\s+/)
  const titleLead = titleParts.slice(0, -1).join(' ')
  const titleAccent = titleParts[titleParts.length - 1] ?? ''

  return (
    <section
      className="overflow-hidden bg-offwhite py-12 sm:py-16 md:py-20 lg:py-24"
      aria-labelledby="about-gallery-heading"
    >
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
          className="mb-8 text-center sm:mb-10 md:mb-12"
        >
          <h2
            id="about-gallery-heading"
            className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
          >
            {titleLead ? `${titleLead} ` : ''}
            <span className="bg-gradient-gold bg-clip-text text-transparent">{titleAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-gray-600 sm:text-base md:text-lg">
            Behind every learner success is a passionate team—counselling, onboarding, and supporting
            students with teamwork, care, and relentless effort every day.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
        className="mx-auto w-full max-w-[100vw] overflow-hidden px-2 sm:px-4 md:px-6 lg:px-8"
      >
        <LifeAtMarquee images={previews} reduceMotion={reduceMotion} onOpen={handleOpen} />
      </motion.div>

      <AnimatePresence>
        {open && allImages.length > 0 ? (
          <GalleryLightbox
            key="gallery-lightbox"
            images={allImages}
            startIndex={startIndex}
            onClose={handleClose}
            reduceMotion={reduceMotion}
          />
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export default AnimatedImageGallery
