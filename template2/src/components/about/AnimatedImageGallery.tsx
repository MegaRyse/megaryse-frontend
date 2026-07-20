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
const ZOOM_LEVELS = [1, 1.55, 2.1] as const

type AnimatedImageGalleryProps = {
  previews?: GalleryImage[]
  allImages?: GalleryImage[]
  title?: string
}

function PreviewTile({
  image,
  index,
  reduceMotion,
  onOpen,
}: {
  image: GalleryImage
  index: number
  reduceMotion: boolean
  onOpen: (startIndex: number) => void
}) {
  return (
    <motion.button
      type="button"
      aria-label={`Open gallery at image ${index + 1}`}
      onClick={() => onOpen(index)}
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px', amount: 0.2 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay: Math.min(index * 0.06, 0.36), ease: EASE }
      }
      whileHover={
        reduceMotion
          ? undefined
          : { y: -6, scale: 1.03, boxShadow: '0 20px 40px rgba(0, 39, 94, 0.16)' }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-navy/10 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A55E] focus-visible:ring-offset-2"
    >
      <motion.div
        className="absolute inset-0"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
        initial="rest"
        whileHover="hover"
        transition={{ duration: 0.45, ease: EASE }}
      >
        <OptimizedImage
          src={image.src}
          webpSrc={image.webpSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#00275E]/25 to-transparent opacity-60"
        aria-hidden
      />
    </motion.button>
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
      className="fixed inset-0 z-[90] flex flex-col bg-[#0F162D]/92"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.28 }}
    >
      <button
        type="button"
        aria-label="Close gallery"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

        // Top bar — counter + close only
      <div className="relative z-20 flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <p className="text-sm font-medium text-white/80 tabular-nums">
          {activeIndex + 1} / {images.length}
        </p>
        <motion.button
          type="button"
          aria-label="Close"
          onClick={onClose}
          whileHover={reduceMotion ? undefined : { scale: 1.05, y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          transition={SPRING}
          className="rounded-full bg-[#C9A55E] px-4 py-1.5 text-xs font-semibold text-[#0F162D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Close
        </motion.button>
      </div>

      {/* Main stage — zoom in on open */}
      <div
        className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-3 sm:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
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
            className="relative flex max-h-[min(68vh,720px)] w-full max-w-5xl cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
            transition={reduceMotion ? { duration: 0 } : SPRING}
            onClick={(e) => {
              e.stopPropagation()
              cycleZoom()
            }}
          >
            <motion.div
              className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/30"
              animate={{ scale: zoom }}
              transition={SPRING}
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
      </div>

      {/* Auto-scrolling strip of ALL images */}
      <div
        className="relative z-20 overflow-hidden border-t border-white/10 py-4"
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
      </div>
    </motion.div>
  )
}

/**
 * About gallery: 10 unlabeled previews → click opens Framer Motion lightbox
 * with all images, auto-scroll, and zoom.
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
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 md:gap-5">
          {previews.slice(0, 10).map((image, index) => (
            <PreviewTile
              key={image.id}
              image={image}
              index={index}
              reduceMotion={reduceMotion}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </div>

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
