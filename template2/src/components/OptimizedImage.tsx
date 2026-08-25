import type { ImgHTMLAttributes } from 'react'

export type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** LCP / above-the-fold images */
  priority?: boolean
  /** Optional WebP source (same asset, .webp sibling) */
  webpSrc?: string
}

/**
 * Performance-friendly img wrapper: lazy loading, async decode, optional WebP via <picture>.
 * Visual output matches a plain <img> when webpSrc is omitted.
 */
export function OptimizedImage({
  priority = false,
  webpSrc,
  src,
  alt = '',
  loading,
  decoding,
  fetchPriority,
  ...rest
}: OptimizedImageProps) {
  const imgProps: ImgHTMLAttributes<HTMLImageElement> = {
    src,
    alt,
    loading: priority ? 'eager' : (loading ?? 'lazy'),
    decoding: decoding ?? 'async',
    fetchPriority: priority ? 'high' : fetchPriority,
    ...rest,
  }

  if (!webpSrc) {
    return <img {...imgProps} />
  }

  const { className, ...imgRest } = imgProps
  const fillsContainer = Boolean(className?.includes('absolute inset-0'))

  return (
    <picture className={fillsContainer ? 'absolute inset-0 block h-full w-full' : 'block max-w-full max-h-full'}>
      <source srcSet={webpSrc} type="image/webp" />
      <img {...imgRest} className={className} />
    </picture>
  )
}
