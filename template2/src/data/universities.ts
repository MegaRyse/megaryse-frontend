import { TAB_TO_CATEGORIES } from './courses'
import { coursesMasterData } from './courses'

import VITLogo from '../assets/images/VIT.png'
import VITLogoWebp from '../assets/images/VIT.webp'
import NMIMSLogo from '../assets/images/NMIMS.png'
import NMIMSLogoWebp from '../assets/images/NMIMS.webp'
import ManipalLogo from '../assets/images/Manipal.png'
import ManipalLogoWebp from '../assets/images/Manipal.webp'
import SMULogo from '../assets/images/SMU.png'
import SMULogoWebp from '../assets/images/SMU.webp'
import AmityLogo from '../assets/images/Amity.png'
import AmityLogoWebp from '../assets/images/Amity.webp'
import DYPatilLogo from '../assets/images/DYPatil.png'
import DYPatilLogoWebp from '../assets/images/DYPatil.webp'
import BennetLogo from '../assets/images/Bennet.png'
import BennetLogoWebp from '../assets/images/Bennet.webp'

export type UniversityBenefits = {
  emi?: string
  scholarships?: string[]
}

export type University = {
  id: number
  name: string
  fullName: string
  slug: string
  location: string
  courseIds: number[]
  /** Logo image URL or path (e.g. /logos/vit-online.png) */
  logo: string
  logoWebp?: string
  admissionStatus?: string
  benefits?: UniversityBenefits
}

export const universitiesData: University[] = [
  {
    id: 1,
    name: "Vellore Institute of Technology (VIT)",
    fullName: "Vellore Institute of Technology (VIT)",
    slug: "vit-online",
    location: "India",
    courseIds: [5, 6, 21],
    logo: VITLogo,
    logoWebp: VITLogoWebp,
  },
  {
    id: 2,
    name: "NMIMS",
    fullName: "Narsee Monjee Institute of Management Studies (NMIMS)",
    slug: "nmims-university",
    location: "India",
    courseIds: [1, 2, 5, 19, 20],
    logo: NMIMSLogo,
    logoWebp: NMIMSLogoWebp,
  },
  {
    id: 3,
    name: "Manipal University Jaipur (MUJ)",
    fullName: "Manipal University Jaipur (MUJ)",
    slug: "manipal-university-jaipur",
    location: "India",
    courseIds: [1, 2, 3, 22, 5, 6, 23, 24, 25],
    logo: ManipalLogo,
    logoWebp: ManipalLogoWebp,
  },
  {
    id: 4,
    name: "Sikkim Manipal University (SMU)",
    fullName: "Sikkim Manipal University (SMU)",
    slug: "sikkim-manipal-university",
    location: "India",
    courseIds: [4, 1, 22, 5, 6, 26, 27, 28],
    logo: SMULogo,
    logoWebp: SMULogoWebp,
  },
  {
    id: 5,
    name: "Amity University",
    fullName: "Amity University Online",
    slug: "amity-university",
    location: "India",
    courseIds: [1, 2, 3, 4, 5, 6, 21, 22, 29],
    logo: AmityLogo,
    logoWebp: AmityLogoWebp,
    admissionStatus: "Open",
    benefits: {
      emi: "No-cost EMI available",
      scholarships: [
        "Defence personnel",
        "Government employees",
        "Differently-abled individuals",
        "Academically outstanding students"
      ]
    }
  },
  {
    id: 6,
    name: "Dr. D. Y. Patil Vidyapeeth, Pune",
    fullName: "Dr. D. Y. Patil Vidyapeeth, Pune",
    slug: "dy-patil-pune",
    location: "India",
    courseIds: [2, 5, 14, 6, 15, 16],
    logo: DYPatilLogo,
    logoWebp: DYPatilLogoWebp,
  },
  {
    id: 7,
    name: "Bennet University",
    fullName: "Bennet University",
    slug: "bennet-university",
    location: "India",
    courseIds: [2, 5],
    logo: BennetLogo,
    logoWebp: BennetLogoWebp,
  }
]

/**
 * Optional explicit provider mapping for specific course IDs.
 * If a course ID is present here, these university slugs are treated as the source of truth.
 * Otherwise, providers are derived from `universitiesData[].courseIds`.
 */
export const COURSE_PROVIDER_OVERRIDES: Record<number, string[]> = {}

export const TAB_TO_CATEGORY_TYPES: Record<string, string[]> = {
  undergraduate: ["Undergraduate Programs"],
  postgraduate: ["Postgraduate Programs"],
  professional: ["Professional & Certificate Courses", "Diploma Programs"],
}

/** Universities that offer at least one course in the given tab's categories */
export function getUniversitiesByTab(
  tabId: keyof typeof TAB_TO_CATEGORY_TYPES
): University[] {
  const categories = TAB_TO_CATEGORIES[tabId] ?? TAB_TO_CATEGORY_TYPES[tabId] ?? []
  const courseIdsInTab = new Set(
    coursesMasterData.filter((c) => categories.includes(c.category)).map((c) => c.id)
  )
  return universitiesData.filter((u) =>
    u.courseIds.some((id) => courseIdsInTab.has(id))
  )
}

export function getUniversityBySlug(slug: string): University | undefined {
  return universitiesData.find((u) => u.slug === slug)
}

export function getUniversityByName(name: string): University | undefined {
  return universitiesData.find(
    (u) => u.name.toLowerCase() === name.toLowerCase()
  )
}

/** Universities that offer the course with the given id */
export function getUniversitiesOfferingCourse(courseId: number): University[] {
  const overrideSlugs = COURSE_PROVIDER_OVERRIDES[courseId]
  if (overrideSlugs?.length) {
    const slugSet = new Set(overrideSlugs)
    return universitiesData.filter((u) => slugSet.has(u.slug))
  }
  return universitiesData.filter((u) => u.courseIds.includes(courseId))
}
