import {
  forwardRef,
  useMemo,
  useRef,
  useEffect,
  MutableRefObject,
  CSSProperties,
  HTMLAttributes,
} from 'react'

function useAnimationFrame(callback: () => void, enabled: boolean) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  useEffect(() => {
    if (!enabled) return
    let frameId: number
    const loop = () => {
      callbackRef.current()
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [enabled])
}

function useMousePositionRef(
  containerRef: MutableRefObject<HTMLElement | null>,
  hasPointerMovedRef: MutableRefObject<boolean>,
  enabled: boolean
) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return

    const updatePosition = (x: number, y: number) => {
      hasPointerMovedRef.current = true
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = { x: x - rect.left, y: y - rect.top }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY)
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0]
      if (touch) updatePosition(touch.clientX, touch.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [containerRef, hasPointerMovedRef, enabled])

  return positionRef
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string
  fromFontVariationSettings: string
  toFontVariationSettings: string
  containerRef: MutableRefObject<HTMLElement | null>
  radius?: number
  falloff?: 'linear' | 'exponential' | 'gaussian'
  className?: string
  disabled?: boolean
  paused?: boolean
  onClick?: () => void
  style?: CSSProperties
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    disabled = false,
    paused = false,
    onClick,
    style,
    ...restProps
  } = props

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const hasPointerMovedRef = useRef(false)
  const animationEnabled = !disabled && !paused
  const mousePositionRef = useMousePositionRef(containerRef, hasPointerMovedRef, animationEnabled)
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const letterCentersRef = useRef<Array<{ x: number; y: number } | null>>([])

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr
          .split(',')
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(' ')
            return [name.replace(/['"]/g, ''), parseFloat(value)]
          })
      )

    const fromSettings = parseSettings(fromFontVariationSettings)
    const toSettings = parseSettings(toFontVariationSettings)

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }))
  }, [fromFontVariationSettings, toFontVariationSettings])

  useEffect(() => {
    const container = containerRef.current
    if (!container || disabled) return
    let cancelled = false

    const measureLetters = () => {
      if (cancelled) return
      const containerRect = container.getBoundingClientRect()
      letterCentersRef.current = letterRefs.current.map((letterRef) => {
        if (!letterRef) return null
        const rect = letterRef.getBoundingClientRect()
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        }
      })
    }

    const frameId = requestAnimationFrame(measureLetters)
    const observer = new ResizeObserver(measureLetters)
    observer.observe(container)
    void document.fonts?.ready.then(measureLetters)

    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [containerRef, disabled, label])

  useEffect(() => {
    if (animationEnabled) return
    letterRefs.current.forEach((letterRef) => {
      if (letterRef) letterRef.style.fontVariationSettings = fromFontVariationSettings
    })
    hasPointerMovedRef.current = false
    lastPositionRef.current = { x: null, y: null }
  }, [animationEnabled, fromFontVariationSettings])

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

  const calculateFalloff = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1)
    switch (falloff) {
      case 'exponential':
        return norm ** 2
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2)
      case 'linear':
      default:
        return norm
    }
  }

  useAnimationFrame(() => {
    if (!animationEnabled || !containerRef?.current) return

    if (!hasPointerMovedRef.current) return

    const { x, y } = mousePositionRef.current
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return
    lastPositionRef.current = { x, y }

    letterRefs.current.forEach((letterRef, index) => {
      const center = letterCentersRef.current[index]
      if (!letterRef || !center) return

      const distance = calculateDistance(x, y, center.x, center.y)

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings
        return
      }

      const falloffValue = calculateFalloff(distance)
      letterRef.style.fontVariationSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue
          return `'${axis}' ${interpolatedValue}`
        })
        .join(', ')
    })
  }, animationEnabled)

  if (disabled) {
    return (
      <span ref={ref} className={className} style={style} {...restProps}>
        {label}
      </span>
    )
  }

  const words = label.split(' ')
  let letterIndex = 0

  return (
    <span
      ref={ref}
      onClick={onClick}
      style={{
        display: 'inline',
        fontFamily: '"Roboto Flex", sans-serif',
        ...style,
      }}
      className={className}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((letter) => {
            const currentLetterIndex = letterIndex++
            return (
              <span
                key={currentLetterIndex}
                ref={(el) => {
                  letterRefs.current[currentLetterIndex] = el
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: fromFontVariationSettings,
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            )
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
})

VariableProximity.displayName = 'VariableProximity'
export default VariableProximity
