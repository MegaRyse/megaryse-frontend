import expertCareerCounsellingImg from '../../assets/images/expert_career_counselling.png'
import expertCareerCounsellingWebp from '../../assets/images/expert_career_counselling.webp'
import seamlessAdmissionProcessImg from '../../assets/images/seamless_admission_process.png'
import seamlessAdmissionProcessWebp from '../../assets/images/seamless_admission_process.webp'
import wideRangeProgramsImg from '../../assets/images/wide_range_of_programs.png'
import wideRangeProgramsWebp from '../../assets/images/wide_range_of_programs.webp'

export type FeatureVisualImage = {
  src: string
  webp: string
  alt: string
  objectFit?: 'cover' | 'contain'
}

export const FEATURES_DATA = [
  {
    title: 'Expert Career Counseling',
    description:
      'Our experienced counselors provide personalized guidance tailored to your career aspirations and goals.',
    link: '/courses',
    linkText: 'Career Counseling Services',
  },
  {
    title: 'Wide Range of Programs',
    description:
      'Choose from hundreds of programs across management, technology, arts, and sciences from top universities.',
    link: '/courses',
    linkText: 'Explore Programs',
  },
  {
    title: 'Seamless Admission Process',
    description:
      'We handle all the paperwork and documentation, making your admission process smooth and hassle-free.',
    link: '/contact',
    linkText: 'Get Started',
  },
] as const

/** [initial, feature0, feature1, feature2] */
export const RIGHT_VISUAL_IMAGES: readonly FeatureVisualImage[] = [
  {
    src: expertCareerCounsellingImg,
    webp: expertCareerCounsellingWebp,
    alt: 'Career counselor guiding a student with university options',
  },
  {
    src: expertCareerCounsellingImg,
    webp: expertCareerCounsellingWebp,
    alt: 'Career counselor guiding a student with university options',
  },
  {
    src: wideRangeProgramsImg,
    webp: wideRangeProgramsWebp,
    alt: 'Students exploring diverse academic programs in a classroom',
  },
  {
    src: seamlessAdmissionProcessImg,
    webp: seamlessAdmissionProcessWebp,
    alt: 'Admission consultation with documents and enrollment support',
  },
] as const

export function featureVisualImageClass(objectFit: 'cover' | 'contain' = 'cover', rounded = false) {
  const roundedClass = rounded ? ' rounded-3xl' : ''
  if (objectFit === 'contain') {
    return `absolute inset-0 w-full h-full object-contain object-center${roundedClass}`
  }
  return `absolute inset-0 w-full h-full object-cover object-center scale-[1.04]${roundedClass}`
}
