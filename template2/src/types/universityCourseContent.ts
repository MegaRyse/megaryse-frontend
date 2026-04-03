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
  cta?: CtaConfig
}

export type UniversityCourseContentMap = Record<
  string,
  Record<string, UniversityCourseContent>
>
