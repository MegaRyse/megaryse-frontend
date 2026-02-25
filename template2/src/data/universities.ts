import { TAB_TO_CATEGORIES } from './courses'
import { coursesMasterData } from './courses'

export type University = {
  id: number
  name: string
  fullName: string
  slug: string
  location: string
  courseIds: number[]
  /** Logo image URL or path (e.g. /logos/vit-online.png) */
  logo: string
}

export const universitiesData: University[] = [
  {
    id: 1,
    name: "VIT Online",
    fullName: "Vellore Institute of Technology Online",
    slug: "vit-online",
    location: "India",
    courseIds: [1, 2, 3, 5, 6, 7, 10, 11, 13],
    logo: "https://ui-avatars.com/api/?name=VIT&size=128&background=00275E&color=fff&bold=true"
  },
  {
    id: 2,
    name: "NMIMS University",
    fullName: "Narsee Monjee Institute of Management Studies",
    slug: "nmims-university",
    location: "India",
    courseIds: [1, 2, 5, 8, 12, 13],
    logo: "https://ui-avatars.com/api/?name=NMIMS&size=128&background=00275E&color=fff&bold=true"
  },
  {
    id: 3,
    name: "Manipal University Jaipur",
    fullName: "Manipal University Jaipur (Online Programs)",
    slug: "manipal-university-jaipur",
    location: "India",
    courseIds: [2, 3, 4, 5, 6, 10, 12],
    logo: "https://ui-avatars.com/api/?name=MUJ&size=128&background=00275E&color=fff&bold=true"
  },
  {
    id: 4,
    name: "Sikkim Manipal University",
    fullName: "Sikkim Manipal University",
    slug: "sikkim-manipal-university",
    location: "India",
    courseIds: [1, 4, 5, 6, 8],
    logo: "https://ui-avatars.com/api/?name=SMU&size=128&background=00275E&color=fff&bold=true"
  },
  {
    id: 5,
    name: "Amity University",
    fullName: "Amity University Online",
    slug: "amity-university",
    location: "India",
    courseIds: [2, 3, 4, 5, 6, 7, 10, 11, 13],
    logo: "https://ui-avatars.com/api/?name=Amity&size=128&background=00275E&color=fff&bold=true"
  },
  {
    id: 6,
    name: "DY Patil Pune",
    fullName: "Dr. D. Y. Patil Vidyapeeth, Pune",
    slug: "dy-patil-pune",
    location: "India",
    courseIds: [1, 2, 5, 7, 9],
    logo: "https://ui-avatars.com/api/?name=DYP&size=128&background=00275E&color=fff&bold=true"
  },
  {
    id: 7,
    name: "UMASS Global",
    fullName: "University of Massachusetts Global",
    slug: "umass-global",
    location: "United States",
    courseIds: [2, 4, 5, 7, 12, 11],
    logo: "https://ui-avatars.com/api/?name=UMASS&size=128&background=00275E&color=fff&bold=true"
  },
  {
    id: 8,
    name: "Jain University",
    fullName: "Jain (Deemed-to-be University), Online Programs",
    slug: "jain-university",
    location: "India",
    courseIds: [1, 2, 3, 5, 6, 7, 10, 12, 13],
    logo: "https://ui-avatars.com/api/?name=Jain&size=128&background=00275E&color=fff&bold=true"
  }
]

export const TAB_TO_CATEGORY_TYPES: Record<string, string[]> = {
  undergraduate: ["Undergraduate Programs"],
  postgraduate: ["Postgraduate Programs", "Diploma Programs"],
  professional: ["Professional & Certificate Courses"],
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
  return universitiesData.filter((u) => u.courseIds.includes(courseId))
}
