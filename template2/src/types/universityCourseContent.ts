export type FeeDetails = {
  applicationFee?: string
  totalFee?: string
  examAndOtherCharges?: string
  paymentModes?: string
}

export type CtaConfig = {
  label: string
  action: 'enquire' | 'apply' | 'external'
  url?: string
}

/** Credential artwork / sample degree certificate for the programme detail page */
export type CourseCertificate = {
  id: string
  title: string
  /** Resolved asset URL (e.g. Vite-imported image) */
  image: string
  /** Optional slug linking this certificate to a specialisation track */
  specializationSlug?: string
  caption?: string
}

export type UniversityCourseContent = {
  heroTitle?: string
  overview: string
  highlights: string[]
  mode?: string
  duration?: string
  /** When set, course list cards can prefer this over CourseMaster.specializations */
  specializations?: string[]
  keyTopics?: string[]
  eligibility?: string[]
  fees?: FeeDetails
  scholarships?: string[]
  careers?: string[]
  /** One or more certificates (degree samples, partner certs, etc.) */
  certificates?: CourseCertificate[]
  cta?: CtaConfig
}

export type UniversityCourseContentMap = Record<
  string,
  Record<string, UniversityCourseContent>
>
