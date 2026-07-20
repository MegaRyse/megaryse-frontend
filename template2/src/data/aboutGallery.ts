/**
 * About page — Life at MegaRyse gallery.
 *
 * Drop additional images into: `src/assets/images/gallery/`
 * Supported: .png .jpg .jpeg .webp .PNG .JPG .JPEG .WEBP
 *
 * All images in that folder appear in the preview grid and lightbox.
 */

export type GalleryImage = {
  id: string
  src: string
  webpSrc?: string
  alt: string
  width?: number
  height?: number
  /** Short teamwork / culture line shown on the marquee card */
  caption?: string
}

/** Team-focused copy aligned to gallery order (01–09). */
const LIFE_AT_CAPTIONS: string[] = [
  'One team, one mission',
  'Collaboration at every desk',
  'Ideas that grow together',
  'Focused minds, shared goals',
  'Mentorship in every conversation',
  'Celebrating wins as a team',
  'Support that never stops',
  'Building futures side by side',
  'Culture of ambition & care',
]

/** Native dimensions — keeps preview tiles aligned to each asset. */
const GALLERY_DIMENSIONS: Record<string, { width: number; height: number }> = {
  '01-life-at.png': { width: 1024, height: 576 },
  '02-life-at.png': { width: 1024, height: 576 },
  '03-life-at.png': { width: 1024, height: 768 },
  '04-life-at.png': { width: 768, height: 1024 },
  '05-life-at.png': { width: 768, height: 1024 },
  '06-life-at.png': { width: 1024, height: 768 },
  '07-life-at.png': { width: 768, height: 1024 },
  '08-life-at.png': { width: 768, height: 1024 },
  '09-life-at.png': { width: 1024, height: 768 },
}

const galleryModules = import.meta.glob<{ default: string }>(
  '../assets/images/gallery/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true }
)

function fileNameFromPath(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 1] ?? path
}

function fromGlob(): GalleryImage[] {
  return Object.entries(galleryModules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, mod], index) => {
      const fileName = fileNameFromPath(path)
      const dims = GALLERY_DIMENSIONS[fileName]
      return {
        id: `gallery-${index + 1}`,
        src: mod.default,
        alt: `Life at MegaRyse ${index + 1}`,
        width: dims?.width,
        height: dims?.height,
        caption: LIFE_AT_CAPTIONS[index] ?? 'Teamwork at MegaRyse',
      }
    })
}

export const ABOUT_GALLERY_IMAGES: GalleryImage[] = fromGlob()

export const ABOUT_GALLERY_PREVIEWS: GalleryImage[] = ABOUT_GALLERY_IMAGES

export const GALLERY_PREVIEW_COUNT = ABOUT_GALLERY_PREVIEWS.length
