import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
const ZOOM_LEVELS = [1, 1.55, 2.1] as const

type AnimatedImageGalleryProps = {
  previews?: GalleryImage[]
  allImages?: GalleryImage[]
  title?: string
}

const MARQUEE_SPEED = 0.04

function MarqueeCard({
  image,
  reduceMotion,
  onOpen,
}: {
  image: GalleryImage
  reduceMotion: boolean
  onOpen: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={image.alt}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative aspect-[4/3] w-[min(82vw,20rem)] flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200/90 bg-gray-100 shadow-sm ring-1 ring-black/[0.04] transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:w-[20rem] md:w-[22rem]"
    >
      <OptimizedImage
        src={image.src}
        webpSrc={image.webpSrc}
        alt={image.alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startValue: number
    moved: boolean
  } | null>(null)
  const suppressClickRef = useRef(false)
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const paused = hovered || dragging

  const loop = images.length > 0 ? [...images, ...images] : []

  const wrapX = useCallback((value: number) => {
    const half = halfWidthRef.current
    if (half <= 0) return value
    let wrapped = value
    while (wrapped <= -half) wrapped += half
    while (wrapped > 0) wrapped -= half
    return wrapped
  }, [])

  const finishDrag = useCallback((target: HTMLDivElement, pointerId: number) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== pointerId) return
    suppressClickRef.current = drag.moved
    dragRef.current = null
    setDragging(false)
    if (target.hasPointerCapture(pointerId)) target.releasePointerCapture(pointerId)
  }, [])

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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="cursor-grab touch-pan-y select-none overflow-hidden py-2 active:cursor-grabbing sm:py-3"
        onPointerDown={(event) => {
          if (event.button !== 0) return
          dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startValue: x.get(),
            moved: false,
          }
          suppressClickRef.current = false
          setDragging(true)
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current
          if (!drag || drag.pointerId !== event.pointerId) return
          const delta = event.clientX - drag.startX
          if (Math.abs(delta) > 6 && !drag.moved) {
            drag.moved = true
            event.currentTarget.setPointerCapture(event.pointerId)
          }
          x.set(wrapX(drag.startValue + delta))
        }}
        onPointerUp={(event) => finishDrag(event.currentTarget, event.pointerId)}
        onPointerCancel={(event) => finishDrag(event.currentTarget, event.pointerId)}
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return
          event.preventDefault()
          event.stopPropagation()
          suppressClickRef.current = false
        }}
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
        }}
      >
        <motion.div
          ref={trackRef}
          className="flex w-max items-stretch gap-4 will-change-transform sm:gap-5"
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
  const imagePointerStartRef = useRef<number | null>(null)

  const active = images[activeIndex] ?? images[0]
  const zoom = ZOOM_LEVELS[zoomStep] ?? 1

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

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Keyboard
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

  // Auto-advance slides
  useEffect(() => {
    if (paused || reduceMotion || images.length < 2) return
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length)
      setZoomStep(0)
    }, AUTO_SCROLL_MS)
    return () => window.clearInterval(id)
  }, [paused, reduceMotion, images.length])

  // Measure strip for continuous marquee of thumbnails
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
    const speed = 0.045
    let next = stripX.get() - delta * speed
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
        className="relative z-30 shrink-0 border-b border-white/10 bg-gradient-to-b from-black/40 to-transparent px-4 py-3 sm:px-6 sm:py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mx-auto flex w-full max-w-6xl items-center gap-4"
        >
          <motion.div
            key={activeIndex}
            initial={reduceMotion ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs">
              Life at MegaRyse
            </span>
            <span className="hidden h-4 w-px shrink-0 bg-white/25 sm:block" aria-hidden />
            <p className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold tabular-nums text-white shadow-sm backdrop-blur-md">
              <span className="text-gold-bright">{activeIndex + 1}</span>
              <span className="mx-1.5 font-normal text-white/45">/</span>
              <span className="text-white/90">{images.length}</span>
            </p>
          </motion.div>
        </motion.div>
      </header>

      <motion.div
        role="presentation"
        className="relative z-10 flex min-h-0 flex-1 cursor-pointer items-center justify-center px-3 py-4 sm:px-8"
      >
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
          className="absolute left-2 z-20 hidden h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur-sm sm:flex sm:left-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A55E]"
        >
          ‹
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="presentation"
            className="relative flex max-h-[min(68vh,720px)] w-full max-w-5xl cursor-default items-center justify-center overflow-hidden rounded-2xl bg-transparent"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            transition={reduceMotion ? { duration: 0 } : SPRING}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="relative aspect-[16/10] w-full touch-none cursor-zoom-in overflow-hidden rounded-2xl bg-transparent"
              animate={{ scale: zoom }}
              transition={SPRING}
              onPointerDown={(e) => {
                e.stopPropagation()
                imagePointerStartRef.current = e.clientX
                e.currentTarget.setPointerCapture(e.pointerId)
              }}
              onPointerUp={(e) => {
                e.stopPropagation()
                const startX = imagePointerStartRef.current
                imagePointerStartRef.current = null
                if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                  e.currentTarget.releasePointerCapture(e.pointerId)
                }
                if (startX === null) return
                const delta = e.clientX - startX
                if (Math.abs(delta) >= 45) {
                  if (delta > 0) goPrev()
                  else goNext()
                  return
                }
                cycleZoom()
              }}
              onPointerCancel={() => {
                imagePointerStartRef.current = null
              }}
            >
              <OptimizedImage
                src={active.src}
                webpSrc={active.webpSrc}
                alt={active.alt}
                priority
                className="absolute inset-0 h-full w-full object-contain"
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
          className="absolute right-2 z-20 hidden h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur-sm sm:flex sm:right-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A55E]"
        >
          ›
        </motion.button>
      </motion.div>

      <motion.div
        className="relative z-30 shrink-0 overflow-hidden border-t border-white/10 bg-black/25 py-4 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          ref={stripRef}
          className="flex w-max gap-3 px-4 will-change-transform"
          style={{ x: stripX }}
        >
          {duplicated.map((img, idx) => {
            const realIndex = idx % images.length
            const isActive = realIndex === activeIndex
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
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.06 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                transition={SPRING}
                animate={{
                  borderColor: isActive ? 'rgba(201, 165, 94, 0.95)' : 'rgba(255,255,255,0.15)',
                  opacity: isActive ? 1 : 0.7,
                }}
                className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-white/5 sm:h-20 sm:w-28"
              >
                <OptimizedImage
                  src={img.src}
                  webpSrc={img.webpSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.button>
            )
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/**
 * About gallery (Life at MegaRyse): unlabeled previews → click opens
 * Framer Motion lightbox with all images, auto-scroll, and zoom.
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
        className="mx-auto w-full max-w-container overflow-hidden px-4 sm:px-6 lg:px-8"
      >
        <LifeAtMarquee images={previews} reduceMotion={reduceMotion} onOpen={handleOpen} />
      </motion.div>

      {typeof document !== 'undefined'
        ? createPortal(
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
            </AnimatePresence>,
            document.body
          )
        : null}
    </section>
  )
}

export default AnimatedImageGallery
