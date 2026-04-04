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
      'The Bachelor of Commerce (B.Com) and Bachelor of Commerce (Honours) are designed to provide students with a strong foundational understanding of business, economics, and commercial practices. These programs are structured to equip students with essential knowledge for roles in the corporate, financial, and organizational sectors, blending theoretical academic learning with professional skill development to prepare graduates for various career paths in the global marketplace.',
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
      'The Bachelor of Business Administration (BBA) is a 3-year undergraduate programme designed to build a strong foundation in business management, leadership, and entrepreneurship. The programme combines core business subjects such as management, marketing, finance, and operations with industry-oriented learning to develop practical business skills. Through case studies, live sessions, projects, and industry exposure, learners gain the knowledge required to pursue careers in corporate management, entrepreneurship, consulting, and emerging business domains. Students can choose from multiple specialization pathways, including industry-integrated programmes developed with leading organizations such as HCLTech and KPMG, or domain-focused programmes like Travel & Tourism Management, depending on their career goals.',
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
      'The Bachelor of Computer Applications (BCA) is a 3-year (6 semesters) UGC-entitled online degree program designed to provide a strong foundational understanding of computer science and its various business applications. The program is structured to bridge the gap between theoretical academic learning and practical industry requirements, equipping students with the essential technical and professional skills needed to excel in the global IT and software development sectors.',
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
      'The Bachelor of Arts (BA) is a comprehensive undergraduate program designed for students who are creatively inclined and seeking to develop a deep understanding of human society, culture, and communication. The program emphasizes critical thinking, extensive research, and the development of unique perspectives through academic rigor and professional guidance. It is structured to provide students with the patience and hard work required to excel in fields ranging from journalism to social sciences.',
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
      'The Master of Business Administration (MBA) is a 2-year UGC-entitled online degree program designed to provide advanced knowledge in business management, strategic leadership, and specialized functional areas. The program aims to develop professional skills in decision-making, analytical thinking, and operational efficiency to prepare students for leadership roles in a global business environment. The programme also empowers students with industry-centric skills, leadership capabilities, and a deep understanding of core business management principles, bridging academic learning with real-world corporate demands through a flexible "Anytime, Anywhere" learning experience suitable for both fresh graduates and working professionals.',
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
      'The Master of Computer Applications (MCA) is a UGC-entitled online degree programme designed to provide a comprehensive understanding of advanced computer science concepts and their practical applications in the industry. It is structured to suit both graduate students and working professionals, offering an "anytime, anywhere" education experience through intensive corporate interaction and industry-oriented teaching delivered by eminent corporate experts and world-class faculty.',
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
      'The Master of Arts (MA) is a postgraduate academic degree programme designed to provide advanced knowledge and specialised understanding in fields such as psychology, media studies, and public policy. These programmes are structured to bridge theoretical academic frameworks with practical, industry-oriented applications, catering to both fresh graduates and working professionals. By offering flexible, UGC-entitled online learning environments, the MA programme equips students with the critical thinking, research, and professional skills necessary to navigate complex societal issues and excel in their respective careers.',
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
      'The Master of Commerce (M.Com) is a postgraduate degree programme designed to provide students with an in-depth understanding of advanced commerce, finance, and management principles. The programme is structured to bridge the gap between theoretical financial knowledge and practical, real-world application, equipping students with the essential analytical and professional skills needed to excel in sectors such as corporate finance, banking, and capital markets.',
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
      'The Master of Science (M.Sc) is a postgraduate degree programme designed to provide advanced knowledge and specialised expertise in technical and analytical fields. The programme is structured to build a strong foundation for analytical and leadership roles, bridging the gap between theoretical research and practical industry application to equip students with the essential skills needed to excel in various sectors. This programme is specifically designed to prepare students for a career in high-demand analytical and leadership roles across various industries. The curriculum focuses on equipping students with advanced skills in data analysis, statistical modeling, and machine learning techniques to derive actionable insights from complex datasets. It prepares graduates for professional roles in data science and analytics, ensuring they are capable of driving data-informed business decisions.',
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
