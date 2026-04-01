import type {
  UniversityCourseContent,
  UniversityCourseContentMap,
} from '../../types/universityCourseContent'

/**
 * Fill this map as you share content university-by-university and course-by-course.
 * Shape:
 * {
 *   "university-slug": {
 *     "course-slug": { ...content }
 *   }
 * }
 */
export const universityCourseContent: UniversityCourseContentMap = {
  'vit-online': {
    mba: {
      heroTitle: 'Master of Business Administration',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Career-focused MBA programme designed to enhance leadership, strategic thinking, and business decision-making skills.',
      highlights: [
        'Live and recorded online classes',
        'Interview preparation modules',
        'VIT alumni access',
        'Industry-relevant curriculum',
        'Postgraduate equivalent degree',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree (minimum 3 years)',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹1,200',
        totalFee: '₹1,80,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mca: {
      heroTitle: 'Master of Computer Applications',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Advanced IT programme focusing on software development, AI, cybersecurity, and modern technologies.',
      highlights: [
        'UGC-entitled & AICTE-approved',
        'Industry-focused curriculum',
        'Covers AI, ML, Blockchain, Cybersecurity',
        'Flexible learning for professionals',
        'Equivalent to on-campus MCA',
      ],
      keyTopics: [
        'Python',
        'Java',
        'Artificial Intelligence',
        'Machine Learning',
        'Cyber Security',
        'Big Data',
        'Blockchain',
        'Mobile App Development',
      ],
      eligibility: [
        'Qualification: BCA / B.Sc / Engineering / any degree with Maths',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹1,200',
        totalFee: '₹1,60,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    'msc-ds': {
      heroTitle: 'M.Sc Data Science',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Programme designed to build expertise in data analytics, machine learning, and data-driven decision making.',
      highlights: [
        'Industry-focused data science curriculum',
        'Electives in marketing, finance, big data',
        'Flexible online learning',
        'Alumni status from VIT',
        'High career growth potential',
      ],
      keyTopics: [
        'Data Analytics',
        'Machine Learning',
        'Big Data Analytics',
        'Statistical Analysis',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree (Maths/Stats/CS/Engineering)',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹1,200',
        totalFee: '₹1,70,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
  },
  'dy-patil-pune': {
    bba: {
      heroTitle: 'Bachelor of Business Administration (BBA)',
      duration: '3 Years (4 Years Honours available)',
      mode: 'Online / Flexible Learning',
      overview:
        'Foundation in business and management including marketing, finance, HR, economics, and entrepreneurship.',
      highlights: [
        'Flexible online learning with recorded lectures',
        'Interactive webinars and sessions',
        'Case-based and industry learning',
        'Skill development in leadership and communication',
        'Career readiness for business roles',
      ],
      eligibility: [
        'Qualification: 10+2 or equivalent',
        'Stream: Any',
        'Mandatory Subject: English',
      ],
      fees: {
        applicationFee: 'None',
        totalFee:
          'Indian (3 Years): ₹1,45,400 | Indian (4 Years): ₹1,92,400 | International (3 Years): $2,800 | International (4 Years): $3,700',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mba: {
      heroTitle: 'Master of Business Administration (MBA)',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Advanced management programme covering marketing, finance, HR, operations, and strategy.',
      highlights: [
        'Flexible learning with LMS',
        'Case-based and industry learning',
        'E-library and digital resources',
        'Placement assistance and career guidance',
        'UGC approved, NAAC A++',
      ],
      keyTopics: [
        'Marketing',
        'Finance',
        'HR',
        'IT',
        'Business Analytics',
        'Digital Marketing',
        'Fintech',
        'AI & Machine Learning',
        'Logistics & Supply Chain',
        'Hospital & Healthcare Management',
      ],
      eligibility: [
        "Qualification: Bachelor's degree",
        'Minimum Marks: 50% (45% for reserved)',
      ],
      fees: {
        applicationFee: 'None',
        totalFee: 'Indian: ₹1,89,400 | International: $3,600',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    'mba-wx': {
      heroTitle: 'MBA WX (MBA for Working Professionals)',
      duration: '24 Months',
      mode: 'Online',
      overview:
        'Designed for working professionals with global exposure and leadership focus.',
      highlights: [
        'Flexible learning for professionals',
        'Dual certification (IFC France, Media School International)',
        'Global faculty exposure',
        'Industry-focused curriculum',
        'Multiple specializations',
      ],
      eligibility: [
        "Qualification: Bachelor's degree",
        'Minimum Marks: 50% (45% reserved)',
        'Experience: Minimum 3 years',
        'Selection: Personal interview',
      ],
      fees: {
        applicationFee: 'None',
        totalFee: 'Indian: ₹2,50,000 | International: $4,780',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mca: {
      heroTitle: 'Master of Computer Applications (MCA)',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Advanced programme in software development, AI, cloud computing, and data science.',
      highlights: [
        'Industry-aligned curriculum',
        'Hands-on coding and projects',
        'AI-driven LMS platform',
        'Global certifications (Harvard, MIT, etc.)',
        'Career support and placement assistance',
      ],
      eligibility: [
        "Qualification: Bachelor's degree",
        'Preferred: Mathematics',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: 'None',
        totalFee: 'Indian: ₹1,40,000 | International: $2,700',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    cpdm: {
      heroTitle: 'Certificate Programme in Digital Marketing (CPDM)',
      duration: '6 Months',
      mode: 'Online',
      overview:
        'Covers SEO, social media marketing, and digital strategies.',
      highlights: [
        '300 hours learning',
        '20 academic credits',
        'Practical assignments',
        'Career-focused training',
      ],
      careers: [
        'Digital Marketing Executive',
        'SEO Specialist',
        'Social Media Manager',
        'Performance Marketer',
      ],
      eligibility: [
        'Qualification: Graduate or Diploma',
      ],
      fees: {
        applicationFee: 'None',
        totalFee: 'Indian: ₹28,000 | International: $625',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    cphahm: {
      heroTitle: 'Certificate Programme in Hospital and Healthcare Management (CPHAHM)',
      duration: '6 Months',
      mode: 'Online',
      overview:
        'Focus on hospital administration, healthcare operations, and management.',
      highlights: [
        'Healthcare-focused curriculum',
        'Administrative skill development',
        'Continuous assessment model',
        'Career-focused training',
      ],
      eligibility: [
        'Qualification: Graduate or Diploma',
      ],
      fees: {
        applicationFee: 'None',
        totalFee: 'Indian: ₹28,000 | International: $625',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
  },
  'nmims-university': {
    'b-com': {
      heroTitle: 'Bachelor of Commerce (BCOM)',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Foundation in commerce, finance, and business management including accounting, economics, and entrepreneurship.',
      highlights: [
        'Flexible 24/7 online learning',
        'Industry-designed curriculum',
        'Advanced commerce topics',
        'Mobile LMS access',
        'Alumni network access',
      ],
      eligibility: [
        'Qualification: 10+2',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹11,200',
        totalFee: '₹1,08,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    'bba-mf': {
      heroTitle: 'BBA (Marketing & Finance)',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Focused programme in marketing and financial management with strong business foundation.',
      highlights: [
        'Specialization in Marketing & Finance',
        'Core business fundamentals',
        'Industry-relevant subjects',
        '144 credits programme',
        'Career-ready skills',
      ],
      eligibility: [
        'Qualification: 10+2',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹11,200',
        totalFee: '₹1,50,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    'bba-ba': {
      heroTitle: 'BBA (Business Analytics Elective)',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Business programme integrating marketing, finance, and analytics for data-driven decision making.',
      highlights: [
        'Business analytics specialization',
        'Data-driven decision making',
        'Analytics tools & forecasting',
        'Industry-focused curriculum',
        '144 credits programme',
      ],
      eligibility: [
        'Qualification: 10+2',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹11,200',
        totalFee: '₹1,80,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mba: {
      heroTitle: 'Master of Business Administration (MBA)',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Advanced management programme designed for working professionals with flexible learning.',
      highlights: [
        'Flexible online learning',
        'Case-based learning',
        '140+ expert faculty',
        'Career support services',
        'Strong alumni network',
      ],
      keyTopics: [
        'Business Management',
        'Finance',
        'Marketing',
        'Operations & Data Science',
        'Human Resource Management',
      ],
      eligibility: [
        "Qualification: Bachelor's degree",
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹11,200',
        totalFee: '₹2,20,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    diploma: {
      heroTitle: 'Online Diploma Programmes',
      duration: '1 Year',
      mode: 'Online',
      overview:
        'Short-term diploma programmes for working professionals with industry-focused skills.',
      highlights: [
        'Self-paced learning',
        'Industry-relevant curriculum',
        'Career-oriented skills',
        'Specialized programmes',
      ],
      keyTopics: [
        'Finance Management',
        'Marketing Management',
        'Business Management',
        'Operations Management',
        'Human Resource Management',
      ],
      eligibility: [
        'Qualification: 10+2',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹11,200',
        totalFee: '₹1,10,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    certification: {
      heroTitle: 'Certificate in Business Management',
      duration: '6 Months',
      mode: 'Online',
      overview:
        'Short-term programme covering core business and management principles.',
      highlights: [
        'Self-paced flexible learning',
        'Core management curriculum',
        'Practical business application',
        'Career-focused skills',
      ],
      careers: [
        'Business Development Manager',
        'Business Strategy Manager',
      ],
      eligibility: [
        'Qualification: 10+2',
      ],
      fees: {
        applicationFee: '₹11,200',
        totalFee: '₹55,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
  },
  'manipal-university-jaipur': {
    'b-com': {
      heroTitle: 'Bachelor of Commerce',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Foundation in commerce, finance, accounting, taxation, and business management.',
      highlights: [
        'Flexible online learning',
        'Industry expert sessions',
        'Placement assistance',
        'Coursera access',
        'Alumni status',
      ],
      keyTopics: [
        'Banking & FinTech',
        'Accounting with AI',
        'Business Analytics',
        'E-Commerce',
        'Business Accounting & Taxation',
        'Economics',
        'Financial Analytics',
        'Digital Marketing with AI',
      ],
      eligibility: [
        'Qualification: 10+2 or diploma',
        'Minimum Marks: 40% (35% reserved)',
      ],
      fees: {
        applicationFee: '₹500 (India/Nepal), Free for others',
        totalFee:
          'Indian: ₹99,000 | International - Africa: $1,278 | NRI: $1,458 | Others: $1,698',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    bba: {
      heroTitle: 'Bachelor of Business Administration',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Business and management programme focusing on marketing, finance, HR, and analytics.',
      highlights: [
        'Flexible LMS-based learning',
        'Industry interaction',
        'Placement support',
        'Coursera courses',
        'Alumni status',
      ],
      keyTopics: [
        'Entrepreneurship & Family Business',
        'Data Analytics',
        'Retail & E-Commerce',
        'Digital Marketing',
        'Human Resource Management',
        'Marketing',
        'Finance & Accounting',
      ],
      eligibility: [
        'Qualification: 10+2 or diploma',
        'Minimum Marks: 40% (35% reserved)',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: '₹1,35,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    bca: {
      heroTitle: 'Bachelor of Computer Applications',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Computer science programme with focus on development, analytics, and emerging technologies.',
      highlights: [
        'Hands-on labs and projects',
        'Industry-focused curriculum',
        'Flexible learning',
        'Placement assistance',
        'Expert faculty sessions',
      ],
      keyTopics: [
        'Cloud Computing',
        'Data Science & Analytics',
        'Cybersecurity',
        'Full Stack Development',
      ],
      eligibility: [
        'Qualification: 10+2 or diploma',
        'Minimum Marks: 40% (35% reserved)',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee:
          'Indian: ₹45,000 | International - Africa: $640 | NRI: $732 | Others: $852',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mcom: {
      heroTitle: 'Master of Commerce',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Advanced commerce programme focusing on finance, accounting, and analytics.',
      highlights: [
        'Industry-relevant curriculum',
        'Flexible online learning',
        'Career support',
        'Coursera access',
        'Alumni network',
      ],
      eligibility: [
        'Qualification: Graduate',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee:
          'Indian: ₹80,000 | International - Africa: $1,020 | NRI: $1,160 | Others: $1,340',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mba: {
      heroTitle: 'Master of Business Administration',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Management programme designed to develop leadership and business decision-making skills.',
      highlights: [
        'Flexible online learning',
        'Industry-focused curriculum',
        'Placement assistance',
        'Coursera access',
        'Alumni network',
      ],
      keyTopics: [
        'Finance',
        'Marketing',
        'HRM',
        'Analytics & Data Science',
        'IT & FinTech',
        'Operations',
        'International Business',
        'Digital Marketing',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: '₹1,75,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mca: {
      heroTitle: 'Master of Computer Applications',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Advanced IT programme covering programming, cloud computing, and AI technologies.',
      highlights: [
        'Hands-on labs and projects',
        'Bridge courses for non-IT students',
        'Flexible LMS learning',
        'Career support',
      ],
      keyTopics: [
        'Cloud Computing',
        'Cybersecurity',
        'AI & ML',
        'AI & Data Science',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: '₹1,58,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    'msc-maths': {
      heroTitle: 'M.Sc Mathematics',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Advanced mathematics programme covering pure and applied mathematics with research focus.',
      highlights: [
        'Research-based learning',
        'Project and seminar exposure',
        'Flexible learning',
        'Career support',
      ],
      keyTopics: [
        'Data Science',
        'Computational Science',
        'Econometrics',
      ],
      eligibility: [
        'Qualification: BSc with Mathematics',
        'Requirement: Mathematics compulsory',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee:
          'Indian: ₹80,000 | International - Africa: $510 | NRI: $580 | Others: $670',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    'ma-economics': {
      heroTitle: 'Master of Arts in Economics',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Economics programme focusing on applied and financial economics with research and analytics.',
      highlights: [
        'Data-driven curriculum',
        'Research dissertation',
        'Flexible LMS',
        'Career support',
      ],
      keyTopics: [
        'Applied Economics',
        'Financial Economics',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee:
          'Indian: ₹80,000 | International - Africa: $1,020 | NRI: $1,160 | Others: $1,340',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    majmc: {
      heroTitle: 'MA Journalism & Mass Communication',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Media and communication programme focusing on journalism, digital media, and PR.',
      highlights: [
        'Hands-on media training',
        'Internship and project work',
        'Flexible learning',
        'Career support',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee:
          'Indian: ₹80,000 | International - Africa: $1,060 | NRI: $1,200 | Others: $1,400',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
  },
  'sikkim-manipal-university': {
    ba: {
      heroTitle: 'Bachelor of Arts',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Programme covering humanities and social sciences including English, Political Science, and Sociology.',
      highlights: [
        'Flexible LMS-based learning',
        'Interdisciplinary curriculum',
        'Skill development in communication and analytics',
        'Industry interaction and webinars',
      ],
      keyTopics: [
        'English',
        'Political Science',
        'Sociology',
      ],
      eligibility: [
        'Qualification: 10+2 or diploma',
        'Minimum Marks: 40% (35% reserved)',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: '₹75,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mcom: {
      heroTitle: 'Master of Commerce',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Advanced commerce programme focusing on finance, accounting, and business management.',
      highlights: [
        'Research-focused learning',
        'Advanced commerce curriculum',
        'Flexible online learning',
        'Industry-oriented sessions',
      ],
      keyTopics: [
        'Finance',
        'Marketing',
      ],
      eligibility: [
        'Qualification: Graduate',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: '₹75,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mba: {
      heroTitle: 'Master of Business Administration',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Management programme designed to build leadership, analytical, and strategic skills.',
      highlights: [
        'Dual specialization option',
        'Industry-focused curriculum',
        'Flexible online learning',
        'Career-focused skill development',
      ],
      keyTopics: [
        'Marketing',
        'Finance',
        'Human Resource Management',
        'Systems',
        'Operations & Supply Chain',
        'Healthcare',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: '₹1,10,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mca: {
      heroTitle: 'Master of Computer Applications',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'IT programme focusing on programming, software development, and emerging technologies.',
      highlights: [
        'Hands-on labs and projects',
        'Industry-relevant curriculum',
        'Flexible LMS learning',
        'Bridge courses for non-IT students',
      ],
      keyTopics: [
        'Cloud Computing',
        'Data Mining',
        'Machine Learning',
        'Distributed Systems',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree (IT/CS or equivalent)',
        'Minimum Marks: 50% (45% reserved)',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: '₹98,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    'ma-english': {
      heroTitle: 'Master of Arts in English',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Programme focused on literature, critical theory, and research.',
      highlights: [
        'Research-focused dissertation',
        'Interdisciplinary approach',
        'Expert faculty guidance',
        'Flexible LMS learning',
      ],
      keyTopics: [
        'American Literature',
        'Indian Literature',
        'Post-Colonial Literature',
        'World Literature',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: 'Indian: ₹75,000 | International: $980',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    'ma-political-science': {
      heroTitle: 'Master of Arts in Political Science',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Programme covering political theory, governance, and global politics.',
      highlights: [
        'Research-based learning',
        'Contemporary political topics',
        'Flexible online learning',
        'Expert faculty mentorship',
      ],
      keyTopics: [
        'Indian Politics',
        'Western Political Thought',
        'International Relations',
        'Public Policy',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: 'Indian: ₹75,000 | International: $980',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    'ma-sociology': {
      heroTitle: 'Master of Arts in Sociology',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Programme focusing on social structures, globalization, and societal issues.',
      highlights: [
        'Research-oriented learning',
        'Interdisciplinary approach',
        'Flexible LMS platform',
        'Career support',
      ],
      keyTopics: [
        'Sociological Theories',
        'Indian Society',
        'Globalization',
        'Social Movements',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: 'Indian: ₹75,000 | International: $980',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
  },
  'jain-university': {
    bba: {
      heroTitle: 'Bachelor of Business Administration',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Business management programme focusing on operations, strategy, and leadership skills.',
      highlights: [
        'UGC-entitled degree',
        'Flexible online learning',
        'Industry-designed curriculum',
        'Global learning exposure',
        'LinkedIn Learning access',
        'Project-based learning',
      ],
      keyTopics: [
        'Marketing',
        'Human Resource Management',
        'Finance',
      ],
      eligibility: [
        'Qualification: 10+2',
        'Status: Appearing students also eligible',
      ],
      fees: {
        applicationFee: 'Domestic: ₹2,500 | International: $150',
        totalFee:
          'Marketing: ₹1,50,000 | Finance: ₹1,50,000 | HRM: Domestic ₹1,50,000 | HRM: International $2,700',
        examAndOtherCharges:
          'Exam Fee - Domestic: ₹9,000 (3 years) | International: $150',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    'b-com': {
      heroTitle: 'Bachelor of Commerce',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Commerce programme focusing on accounting, finance, and business management.',
      highlights: [
        'UGC-entitled degree',
        'Industry-relevant curriculum',
        'Research and analytics focus',
        'LinkedIn Learning access',
        'Global exposure',
      ],
      keyTopics: [
        'Accounting and Finance',
        'International Finance and Accounting (ACCA)',
      ],
      eligibility: [
        'Qualification: 10+2',
        'Status: Appearing students eligible',
      ],
      fees: {
        applicationFee: 'Domestic: ₹2,500 | International: $150',
        totalFee:
          'Accounting and Finance - Domestic: ₹1,20,000 | International: $1,950 | International Finance - Domestic: ₹1,20,000 + affiliation fee | International Finance - International: $3,150 + affiliation fee',
        examAndOtherCharges:
          'Exam Fee - Domestic: ₹9,000 | International: $150 | Affiliation Fee - Domestic: ₹36,000 | International: $650',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    bca: {
      heroTitle: 'Bachelor of Computer Applications',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Computer science programme focusing on programming, analytics, and emerging technologies.',
      highlights: [
        'Hands-on project-based learning',
        'Industry-relevant curriculum',
        'Exposure to modern technologies',
        'Flexible online learning',
        'Technical skill development',
      ],
      keyTopics: [
        'Cloud Computing',
        'Data Science & Analytics',
        'Cyber Security',
        'Computer Science & IT',
        'Artificial Intelligence',
      ],
      eligibility: [
        'Qualification: 10+2',
        'Status: Appearing students eligible',
      ],
      fees: {
        applicationFee: 'Domestic: ₹2,500 | International: $150',
        totalFee:
          'CS & IT - Domestic: ₹1,35,000 | International: $2,400 | Data Science: Domestic ₹1,65,000 / International $3,000 | Cyber Security: Domestic ₹1,65,000 / International $3,000 | AI: Domestic ₹1,65,000 / International $3,000 | Cloud: Domestic ₹1,65,000 / International $3,000',
        examAndOtherCharges:
          'Exam Fee - Domestic: ₹9,000 | International: $150',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mcom: {
      heroTitle: 'Master of Commerce',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Advanced commerce programme focusing on accounting, finance, and business strategy.',
      highlights: [
        'Global faculty and curriculum',
        'LinkedIn Learning access',
        'Flexible online learning',
        'Career advancement support',
      ],
      keyTopics: [
        'Accounting and Finance',
        'International Finance (ACCA)',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree',
        'Status: Final year students eligible',
      ],
      fees: {
        applicationFee: 'Domestic: ₹2,500 | International: $150',
        totalFee:
          'Accounting and Finance - Domestic: ₹1,10,000 | International: $2,000 | International Finance - Domestic: ₹1,20,000 + affiliation fee | International: $2,100 + affiliation fee',
        examAndOtherCharges:
          'Exam Fee - Domestic: ₹6,000 | International: $100 | Affiliation Fee - Domestic: ₹30,500 | International: $525',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mba: {
      heroTitle: 'Master of Business Administration',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Advanced business programme focusing on leadership, analytics, and strategic decision-making.',
      highlights: [
        'UGC-entitled degree',
        'Industry-aligned curriculum',
        'Generative AI integration',
        'Global learning exposure',
        'Career advancement support',
        'Research-based learning',
      ],
      keyTopics: [
        'Supply Chain & Operations',
        'Retail & Quick Commerce',
        'Marketing & Business Analytics',
        'HR & Business Analytics',
        'Finance & Business Analytics',
        'Entrepreneurship',
        'Project Management',
        'Marketing',
        'HRM',
        'International Finance (ACCA)',
        'IT Management',
        'General Management',
        'Business Intelligence & Analytics',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree',
        'Status: Final year students eligible',
      ],
      fees: {
        applicationFee: 'Domestic: ₹2,500 | International: $150',
        totalFee:
          'General: ₹1,96,000 | International Finance: ₹2,08,000 + affiliation fee',
        examAndOtherCharges:
          'Exam Fee - Domestic: ₹6,000 | International: $100 | Affiliation Fee - Domestic: ₹45,000 | International: $800',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
    mca: {
      heroTitle: 'Master of Computer Applications',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Advanced IT programme focusing on software development, analytics, and emerging technologies.',
      highlights: [
        'Industry-relevant curriculum',
        'Emerging tech exposure',
        'Flexible online learning',
        'Career advancement support',
      ],
      keyTopics: [
        'Computer Science & IT',
        'Data Analytics',
        'Cyber Security',
        'DevOps',
        'NLP & LLM Development',
      ],
      eligibility: [
        'Qualification: Bachelor’s degree',
        'Requirement: Mathematics required',
      ],
      fees: {
        applicationFee: 'Domestic: ₹2,500 | International: $150',
        totalFee: 'Domestic: ₹1,60,000 | International: $2,800',
        examAndOtherCharges:
          'Exam Fee - Domestic: ₹6,000 | International: $100',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'Defence personnel',
        'Government employees',
        'Differently-abled individuals',
        'Academically outstanding students',
      ],
    },
  },
}

export function getUniversityCourseContent(
  universitySlug: string,
  courseSlug: string
): UniversityCourseContent | null {
  return universityCourseContent[universitySlug]?.[courseSlug] ?? null
}
