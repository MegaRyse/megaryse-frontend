import type { UniversityCourseContent } from '../../types/universityCourseContent'

const AMITY_SCHOLARSHIPS = [
  'Defence personnel',
  'Government employees',
  'Differently-abled individuals',
  'Academically outstanding students',
] as const

const AMITY_PAYMENT_MODES = 'No-cost EMI available'

/** Per-course content for Amity University Online — keys match `toCourseSlug(course.shortName)` */
export const amityUniversityCourseContent: Record<string, UniversityCourseContent> = {
  'b-com': {
    duration: '3 Years',
    mode: 'Online',
    overview:
      'Commerce programme covering business, finance, and economics with professional skill development.',
    highlights: [
      'UGC-entitled programme',
      'Flexible online learning',
      'Project-based learning',
      'Industry-designed curriculum',
      'Global learning environment',
    ],
    specializations: ['General', 'Honours', 'International Finance & Accounting'],
    eligibility: ['Qualification: 10+2 or equivalent'],
    fees: {
      applicationFee: '₹1,100',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [...AMITY_SCHOLARSHIPS],
  },
  bba: {
    duration: '3 Years',
    mode: 'Online',
    overview:
      'Undergraduate programme focused on business management, leadership, and entrepreneurship with industry exposure.',
    highlights: [
      'UGC-entitled degree',
      'Industry partnerships (HCLTech, KPMG)',
      'Live & recorded sessions',
      'Placement support',
      'Leadership & analytics skill development',
    ],
    specializations: [
      'General',
      'Travel & Tourism Management',
      'Data Analytics (HCLTech)',
      'Business Analytics (KPMG)',
    ],
    eligibility: [
      'Qualification: 10+2 (Indian) or O/A Levels (International)',
      'Note: Diploma not accepted for foreign students',
    ],
    fees: {
      applicationFee: '₹1,100',
      totalFee: '₹1,65,000',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [...AMITY_SCHOLARSHIPS],
  },
  bca: {
    duration: '3 Years',
    mode: 'Online',
    overview:
      'Computer science programme focusing on software development, data, and emerging technologies.',
    highlights: [
      'Industry-aligned curriculum',
      'AI-powered learning support',
      'Global accreditations',
      'Placement assistance',
      'Hands-on projects',
    ],
    specializations: [
      'General',
      'Data Analytics (TCS iON)',
      'Cloud & Security (TCS iON)',
      'Software Engineering (HCLTech)',
      'Applied Data Engineering (KPMG)',
      'Data Engineering (HCLTech)',
    ],
    eligibility: ['Qualification: 10+2 or equivalent'],
    fees: {
      applicationFee: '₹1,100',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [...AMITY_SCHOLARSHIPS],
  },
  ba: {
    duration: '3 Years',
    mode: 'Online',
    overview:
      'Humanities programme focusing on society, culture, communication, and research.',
    highlights: [
      'Global accreditation',
      'Flexible LMS',
      'Career support',
      'Web-proctored exams',
      'Strong alumni network',
    ],
    specializations: [
      'General',
      'Hindi Medium',
      'Journalism & Mass Communication',
      'English',
      'Sociology',
      'Political Science',
      'Regional Languages',
    ],
    eligibility: ['Qualification: 10+2 or equivalent'],
    fees: {
      applicationFee: '₹1,100',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [...AMITY_SCHOLARSHIPS],
  },
  mba: {
    duration: '2 Years',
    mode: 'Online',
    overview:
      'Postgraduate programme focused on leadership, strategy, and business management.',
    highlights: [
      'Global accreditation',
      'Flexible LMS',
      'Industry-oriented curriculum',
      'Placement support',
      'Career services',
    ],
    specializations: [
      'General',
      'Healthcare Management',
      'International Finance (ACCA)',
      'International Business',
      'Hospitality & Tourism',
      'Retail Management',
      'Operations',
      'Petroleum & Gas',
      'Marketing',
      'Insurance',
      'HR',
      'HR Analytics',
      'Finance & Accounting',
      'Digital Marketing',
      'Entrepreneurship',
      'Data Science',
      'IT Management',
      'Business Analytics',
      'Dual Specialization',
    ],
    eligibility: [
      'Qualification: Bachelor’s degree',
      'Minimum marks: 40%',
      'Note: Below 40% requires qualifying test',
    ],
    fees: {
      applicationFee: '₹1,100',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [...AMITY_SCHOLARSHIPS],
  },
  mca: {
    duration: '2 Years',
    mode: 'Online',
    overview:
      'Advanced IT programme focusing on software, AI, and emerging technologies.',
    highlights: [
      'Industry-aligned curriculum',
      'Global recognition',
      'Placement assistance',
      'Flexible LMS',
      'Corporate interaction',
    ],
    specializations: [
      'General',
      'Blockchain',
      'AR/VR',
      'Machine Learning',
      'AI & ML',
      'Cyber Security (HCLTech)',
      'Software Engineering (HCLTech)',
    ],
    eligibility: ['Qualification: Bachelor’s degree', 'Minimum marks: 40%'],
    fees: {
      applicationFee: '₹1,100',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [...AMITY_SCHOLARSHIPS],
  },
  ma: {
    duration: '2 Years',
    mode: 'Online',
    overview:
      'Postgraduate programme focusing on humanities, media, and public policy.',
    highlights: [
      'UGC-entitled degree',
      'Flexible LMS',
      'AI-powered support',
      'Global accreditation',
    ],
    specializations: [
      'Journalism & Mass Communication',
      'Psychology',
      'Public Policy & Governance',
    ],
    eligibility: ['Qualification: Bachelor’s degree', 'Minimum marks: 40%'],
    fees: {
      applicationFee: '₹1,100',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [...AMITY_SCHOLARSHIPS],
  },
  mcom: {
    duration: '2 Years',
    mode: 'Online',
    overview:
      'Advanced commerce programme focusing on finance, banking, and financial management.',
    highlights: [
      'Industry-aligned curriculum',
      'Flexible learning',
      'Placement support',
      'Global recognition',
    ],
    specializations: ['Financial Management', 'FinTech'],
    eligibility: ['Qualification: Bachelor’s degree', 'Minimum marks: 40%'],
    fees: {
      applicationFee: '₹1,100',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [...AMITY_SCHOLARSHIPS],
  },
  'msc-ds': {
    duration: '2 Years',
    mode: 'Online',
    overview:
      'Programme focused on data analytics, machine learning, and business intelligence.',
    highlights: [
      'AI-powered learning support',
      'NAAC A+ accredited',
      'Placement assistance',
      '500+ hiring partners',
      'Industry mentorship',
    ],
    keyTopics: [
      'Data Analysis',
      'Machine Learning',
      'Statistical Modeling',
      'Business Intelligence',
    ],
    eligibility: ['Qualification: Bachelor’s degree', 'Minimum marks: 40%'],
    fees: {
      applicationFee: '₹1,100',
      paymentModes: AMITY_PAYMENT_MODES,
    },
    scholarships: [...AMITY_SCHOLARSHIPS],
  },
}
