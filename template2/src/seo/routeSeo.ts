export type RouteSeo = {
  title: string
  description: string
  /** Path patterns use :param for dynamic segments */
  pathPattern: string
}

export const DEFAULT_SEO = {
  title: 'MegaRyse - MBA Education Consultancy',
  description:
    'MegaRyse helps students discover accredited online MBA and degree programs from top universities. Expert counselling, transparent fees, and end-to-end admission support.',
  siteName: 'MegaRyse',
  siteUrl: 'https://megaryse.com',
}

const STATIC_ROUTES: Record<string, Omit<RouteSeo, 'pathPattern'>> = {
  '/': {
    title: 'MegaRyse - Transform Your Future with World-Class Education',
    description:
      'Trusted MBA and online degree consultancy. Compare programs from NMIMS, VIT, Manipal, Amity and more. Free counselling and admission guidance.',
  },
  '/about': {
    title: 'About MegaRyse | Online Education Consultancy',
    description:
      'Learn how MegaRyse connects learners with accredited online programs, career-focused counselling, and transparent admission support.',
  },
  '/universities': {
    title: 'Partner Universities | MegaRyse',
    description:
      'Explore accredited partner universities for online MBA, BBA, B.Com, MCA and more. Compare programs and apply with MegaRyse.',
  },
  '/courses': {
    title: 'Online Courses & Programs | MegaRyse',
    description:
      'Browse online MBA, BBA, B.Com, MCA and professional programs from leading universities. Filter by university and specialization.',
  },
  '/careers': {
    title: 'Careers at MegaRyse',
    description:
      'Join MegaRyse and help students access quality online education. View open roles and apply today.',
  },
  '/contact': {
    title: 'Contact MegaRyse | Get Free Counselling',
    description:
      'Reach MegaRyse for program counselling, admissions support, and university guidance. We respond quickly to every enquiry.',
  },
}

function matchPattern(pattern: string, pathname: string): boolean {
  const patternParts = pattern.split('/').filter(Boolean)
  const pathParts = pathname.split('/').filter(Boolean)
  if (patternParts.length !== pathParts.length) return false
  return patternParts.every((part, i) => part.startsWith(':') || part === pathParts[i])
}

export function getSeoForPath(pathname: string): { title: string; description: string } {
  if (STATIC_ROUTES[pathname]) {
    return STATIC_ROUTES[pathname]
  }

  if (matchPattern('/universities/:slug/courses/:courseSlug', pathname)) {
    return {
      title: 'Course Details | MegaRyse',
      description:
        'Program overview, eligibility, fees, and specializations for this online degree. Apply with MegaRyse counselling support.',
    }
  }

  if (matchPattern('/universities/:slug', pathname)) {
    return {
      title: 'University Programs | MegaRyse',
      description:
        'View online programs, eligibility, and admission details for this partner university. Expert guidance from MegaRyse.',
    }
  }

  return {
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
  }
}
