import { useEffect, useState, type RefObject } from 'react'

type UseIntersectionVisibleOptions = {
  rootMargin?: string
  threshold?: number
}

/** True when the ref element intersects the viewport (for pausing off-screen animations). */
export function useIntersectionVisible(
  ref: RefObject<Element | null>,
  { rootMargin = '0px', threshold = 0.05 }: UseIntersectionVisibleOptions = {}
): boolean {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin, threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, rootMargin, threshold])

  return visible
}
