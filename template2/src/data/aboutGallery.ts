/**
 * About page gallery.
 *
 * Drop all images (~50) into: `src/assets/images/gallery/`
 * Supported: .png .jpg .jpeg .webp .PNG .JPG .JPEG .WEBP
 *
 * First 10 become the preview grid (no labels).
 * Click any preview → lightbox shows ALL images with auto-scroll + zoom.
 */

export type GalleryImage = {
  id: string
  src: string
  webpSrc?: string
  alt: string
}

const PREVIEW_COUNT = 10

/** Eager-load every file dropped into the gallery folder. */
const galleryModules = import.meta.glob<{ default: string }>(
  '../assets/images/gallery/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true }
)

function fromGlob(): GalleryImage[] {
  return Object.entries(galleryModules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, mod], index) => ({
      id: `gallery-${index + 1}`,
      src: mod.default,
      alt: `MegaRyse gallery ${index + 1}`,
    }))
}

/**
 * Temporary fallbacks so the UI works before you upload the full set.
 * Replaced automatically once any file exists in `gallery/`.
 */
import trustedEducation from '../assets/images/trustededucation.png'
import trustedEducationWebp from '../assets/images/trustededucation.webp'
import careerFocused from '../assets/images/careerfocused.png'
import careerFocusedWebp from '../assets/images/careerfocused.webp'
import success from '../assets/images/sucess.png'
import successWebp from '../assets/images/sucess.webp'
import valueDriven from '../assets/images/valuedriven.png'
import valueDrivenWebp from '../assets/images/valuedriven.webp'
import support from '../assets/images/support.png'
import supportWebp from '../assets/images/support.webp'
import personalized from '../assets/images/personalized.png'
import personalizedWebp from '../assets/images/personalized.webp'
import easyApply from '../assets/images/easyapply.png'
import easyApplyWebp from '../assets/images/easyapply.webp'
import globalEducation from '../assets/images/globaleducation.png'
import globalEducationWebp from '../assets/images/globaleducation.webp'
import expertCareer from '../assets/images/expert_career_counselling.png'
import expertCareerWebp from '../assets/images/expert_career_counselling.webp'
import widePrograms from '../assets/images/wide_range_of_programs.png'
import wideProgramsWebp from '../assets/images/wide_range_of_programs.webp'
import seamlessAdmission from '../assets/images/seamless_admission_process.png'
import seamlessAdmissionWebp from '../assets/images/seamless_admission_process.webp'
import hero from '../assets/images/hero3.webp'

const FALLBACK_IMAGES: GalleryImage[] = [
  { id: 'fb-1', src: trustedEducation, webpSrc: trustedEducationWebp, alt: 'MegaRyse gallery 1' },
  { id: 'fb-2', src: careerFocused, webpSrc: careerFocusedWebp, alt: 'MegaRyse gallery 2' },
  { id: 'fb-3', src: success, webpSrc: successWebp, alt: 'MegaRyse gallery 3' },
  { id: 'fb-4', src: valueDriven, webpSrc: valueDrivenWebp, alt: 'MegaRyse gallery 4' },
  { id: 'fb-5', src: support, webpSrc: supportWebp, alt: 'MegaRyse gallery 5' },
  { id: 'fb-6', src: personalized, webpSrc: personalizedWebp, alt: 'MegaRyse gallery 6' },
  { id: 'fb-7', src: easyApply, webpSrc: easyApplyWebp, alt: 'MegaRyse gallery 7' },
  { id: 'fb-8', src: globalEducation, webpSrc: globalEducationWebp, alt: 'MegaRyse gallery 8' },
  { id: 'fb-9', src: expertCareer, webpSrc: expertCareerWebp, alt: 'MegaRyse gallery 9' },
  { id: 'fb-10', src: widePrograms, webpSrc: wideProgramsWebp, alt: 'MegaRyse gallery 10' },
  { id: 'fb-11', src: seamlessAdmission, webpSrc: seamlessAdmissionWebp, alt: 'MegaRyse gallery 11' },
  { id: 'fb-12', src: hero, alt: 'MegaRyse gallery 12' },
]

const loaded = fromGlob()

/** Full gallery set (up to ~50). Prefer files from `gallery/`. */
export const ABOUT_GALLERY_IMAGES: GalleryImage[] =
  loaded.length > 0 ? loaded : FALLBACK_IMAGES

/** First 10 shown on the About page preview grid. */
export const ABOUT_GALLERY_PREVIEWS: GalleryImage[] = ABOUT_GALLERY_IMAGES.slice(
  0,
  PREVIEW_COUNT
)

export const GALLERY_PREVIEW_COUNT = PREVIEW_COUNT
