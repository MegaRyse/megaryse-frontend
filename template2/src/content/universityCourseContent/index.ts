import type {
  UniversityCourseContent,
  UniversityCourseContentMap,
} from '../../types/universityCourseContent'
import { amityUniversityCourseContent } from './amity'

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
        'Access to exclusive VIT alumni gatherings and valuable networking platforms',
        'Dedicated recorded modules focused on interview readiness and career preparation',
        'Interactive live online classes delivered by VIT’s distinguished management faculty, with the flexibility of recorded session access',
        'Receive an MBA qualification equivalent to a postgraduate degree earned through conventional classroom learning',
        'A competitively priced and highly regarded MBA that enhances career prospects',
        'Official VIT alumni recognition upon successful completion of the programme',
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
        'UGC-entitled and AICTE-approved postgraduate degree',
        'Flexible online format suited for working professionals',
        'Comprehensive curriculum covering computer science fundamentals, advanced IT, and software engineering',
        'Exposure to cutting-edge tools and technologies including Python, Java, Artificial Intelligence (AI), Machine Learning (ML), Cyber Security, Cyber Forensics, Big Data Analytics, Data Mining, Blockchain, Computer Networks, Database Systems, VR/AR, and Mobile Application Development',
        'Prestigious and cost-effective qualification equivalent to an on-campus MCA degree',
        'Designed to prepare graduates for high-growth roles in IT, multinational corporations, and start-ups',
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
        'An online M.Sc. Data Science programme that is easily accessible',
        'A degree comparable to a postgraduate programme earned through traditional classroom learning',
        'A comprehensive curriculum with a choice of electives to integrate knowledge from multiple domains',
        'Live online learning from VIT’s distinguished faculty, with access to recorded sessions',
        'Official alumni status from Vellore Institute of Technology',
        'A well-priced, esteemed programme that unlocks diverse career opportunities',
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
        '3-Year Programme: Structured across six semesters with a comprehensive management curriculum. 4-Year Honours Programme: Extends the programme to eight semesters with advanced specialization courses, along with a project work, report submission, evaluation and viva',
        'Flexible Learning Model: Access to recorded lectures, online study materials, presentations, and virtual classrooms',
        'Interactive Learning: Faculty webinars and discussions to enhance engagement and understanding',
        'Skill Development: Focus on leadership, communication, strategic thinking, and analytical skills for business environments',
        'Practical Exposure: Case-based learning and industry interactions to connect theory with real-world business applications',
        'Career Opportunities: Prepares graduates for roles in marketing, sales, human resources, business development, and management',
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
        '2-Year MBA Programme: Structured across four semesters with a credit-based curriculum',
        'Wide Range of Specializations: The MBA programme offers multiple specializations including Marketing, Operations, Finance, IT, Human Resource Management, International Business, Digital Marketing, Business Analytics, Fintech, Agribusiness, Project Management, Blockchain, Artificial Intelligence & Machine Learning, Logistics & Supply Chain Management, and Hospital & Healthcare Management',
        'Flexible Online Learning: Access to live virtual classes, recorded lectures, and online study materials through a Learning Management System',
        'Industry-Relevant Curriculum: Case-based learning, expert sessions, and real-world business applications',
        'Digital Learning Resources: Access to e-library, presentations, and interactive course content',
        'Career Support: Includes placement assistance, career guidance, and networking opportunities with industry professionals',
        'Recognized Degree: Offered by a UGC-approved and NAAC A++ accredited university'
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
        'Designed for Working Professionals: Flexible online learning to balance work and study',
        'Dual International Certification: Offered in collaboration with IFC France and Media School International',
        'Global Learning Experience: Learn from international faculty with global business insights',
        'Industry-Focused Curriculum: Includes real-world case studies and leadership-driven learning',
        'Multiple Specializations: Options such as Marketing, HR, FinTech, AI & Machine Learning, Business Analytics, Digital Marketing, and Supply Chain Management',
        'Interactive Online Learning: Access to live sessions, recorded lectures, and digital learning resources'
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
        'Industry-Aligned Curriculum: Modules designed in consultation with technology industry experts',
        'Flexible Online Learning: 100% online programme suitable for working professionals',
        'Practical & Hands-On Learning: Coding assignments, projects, simulations, and virtual labs',
        'Expert-Led Sessions & Webinars: Learn from experienced faculty and industry practitioners',
        'AI-Driven Learning Platform: Access to a digital LMS with learning tools and cloud services',
        'Career Support: Resume building, mock interviews, and placement assistance',
        'Global Certification Opportunities: Gain access to online certification courses through edX, enabling learners to earn additional credentials from leading global institutions such as Harvard University, Columbia University, New York University, University of Washington, and MIT, with no additional charges',
        'Exposure to Emerging Technologies: Areas such as AI/ML, Cloud Computing, Data Science, and Cybersecurity',
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
        'Flexible Online Learning: Fully online programme designed for students and working professionals',
        'Industry-Relevant Curriculum: Covers key areas such as SEO, Social Media Marketing, Integrated Marketing Communication, and Digital Marketing fundamentals',
        'Practical Skill Development: Focus on real-world digital marketing tools, strategies, and campaign planning',
        'Short-Term Professional Certification: A 6-month course with 20 academic credits and approximately 300 hours of learning',
        'Career-Focused Learning: Prepares learners for roles such as Digital Marketing Executive, Social Media Manager, SEO Specialist, and Performance Marketer',
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
        'Flexible Online Learning: Fully online programme designed for students and working professionals',
        'Short-Term Professional Certification: A 6-month programme with 20 academic credits focused on healthcare administration',
        'Continuous assessment modelIndustry-Relevant Curriculum: Covers hospital administration, healthcare services marketing, quality management, and legal aspects of hospital operations',
        'Practical & Career-Focused Learning: Develop skills required for administrative roles in hospitals, clinics, and healthcare organizations',
        'Continuous Assessment Approach: Includes assignments, formative assessments, and a term-end examination for overall evaluation',
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
        'Flexible online learning with 24/7 access to live and recorded lectures across multiple devices and platforms',
        'Curriculum designed by experienced academicians and industry experts to ensure academic excellence and industry relevance',
        'Comprehensive three-year programme structured across six semesters with a balanced mix of foundational and advanced commerce subjects',
        'Advanced topics such as Corporate Finance, Strategic Management, Financial Modelling, Investment Analysis, and Entrepreneurship Management',
        'Technology-enabled learning through a mobile-app-based learning management system for seamless study experience',
        'Opportunity to develop employability skills and practical financial knowledge relevant to modern business environments',
        'Official NMIMS CDOE alumni status and access to the global NMIMS alumni network upon successful programme completion',
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
        'Flexible three-year programme structured across six semesters with a comprehensive curriculum focused on marketing and finance',
        'Specialised learning in Marketing and Finance, enabling students to build expertise in marketing strategy, financial management, and business decision-making',
        'Strong foundation in core business subjects including Principles of Management, Business Communication, Financial Accounting, and Microeconomics',
        'Advanced subjects such as Strategic Management, Project Management, Operations & Supply Chain Management, and Retail Management',
        'Industry-relevant topics including Digital Marketing, Integrated Marketing Communication, Time Series Forecasting, and Financial Analysis',
        'Structured academic framework with six subjects per semester and a total of 144 programme credits designed to ensure comprehensive learning',
        'Curriculum designed to develop analytical thinking and problem-solving skills for real-world marketing and financial business challenges',
        'Focus on ethical, sustainable, and responsible business practices in modern organisations',
        'Opportunity to build employability skills and gain practical knowledge for careers in marketing, sales, banking, financial services, consulting, and corporate management',
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
        'Flexible three-year programme structured across six semesters with a comprehensive curriculum focused on marketing, finance, and business analytics',
        'Specialised learning in Marketing, Finance, and Business Analytics, enabling students to build expertise in marketing strategy, financial management, business decision-making, and data-driven insights',
        'Strong foundation in core business subjects including Principles of Management, Business Communication, Financial Accounting, and Microeconomics',
        'Advanced subjects such as Strategic Management, Project Management, Operations & Supply Chain Management, and Retail Management',
        'Business Analytics electives offered in the 2nd and 3rd year, covering data analysis, forecasting, and analytics applications for business decision-making',
        'Industry-relevant topics including Digital Marketing, Integrated Marketing Communication, Time Series Forecasting, Financial Analysis, and Analytics Tools',
        'Structured academic framework with six subjects per semester and a total of 144 programme credits ensuring comprehensive learning',
        'Curriculum designed to develop analytical thinking, problem-solving, and data-driven decision-making skills for real-world business challenges',
        'Emphasis on ethical, sustainable, and responsible business practices in modern organisations',
        'Opportunity to build employability skills and gain practical knowledge for careers in marketing, sales, banking, financial services, consulting, analytics, and corporate management',
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
        'Flexible Online Learning: Study anytime, anywhere with 24/7 access to live and recorded lectures, session recordings, and digital learning materials through an advanced learning platform',
        'Industry-Relevant Curriculum: Designed by experienced academicians and industry professionals to balance theoretical knowledge with practical business applications',
        '2-Year Programme Structure: Structured across four semesters with programme validity of up to four years, enabling working professionals to balance work, study, and personal commitments',
        'Expert Faculty & Academic Excellence: Learn from 140+ renowned faculty, including 90+ PhD holders, with extensive academic and industry experience',
        'Expert Faculty & Academic Excellence: Learn from 140+ renowned faculty, including 90+ PhD holders, with extensive academic and industry experience',
        'Case-Based and Application-Oriented Learning: Assessment approach focused on analysing real-world business problems and applying strategic solutions',
        'Comprehensive Digital Learning Ecosystem: Access to recorded videos, study portals, session podcasts, case discussions, masterclasses, and a digital library of scholarly resources',
        'Career Support Services: Career guidance and mentoring support designed to help professionals enhance leadership capabilities and advance their careers',
        'Strong Alumni Network: Become part of the NMIMS CDOE global alumni network working across leading corporate firms, startups, and multinational organizations',
        'Multiple Career-Focused Specialisations: Students can choose from Business Management, Finance, Marketing, Operations & Data Sciences, and Human Resource Management, enabling them to build expertise in their preferred management domain and align their studies with specific career goals.',
        'Dedicated Student Support: Multi-channel support system including call, ticket, and chat support along with faculty interaction through discussion forums and recorded sessions',
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
        'Diploma in Finance Management: Gain in-depth knowledge in Corporate Finance, Cost & Management Accounting, and Capital Market & Portfolio Management.',
        'Diploma in Marketing Management: Learn essential marketing skills in Sales Management, Brand Management, and Consumer Behaviour.',
        'Diploma in Business Management: Strengthen business acumen through strategic thinking, business frameworks, and managerial decision-making.',
        'Diploma in Operations Management: Practical insights in Supply Chain Management, Project Management, and Operations Management.',
        'Diploma in Human Resource Management: Develop expertise in compensation, employee policies, organisational behaviour, manpower planning, recruitment & selection, and performance management.',
      ],
      keyTopics: ['Finance Management', 'Marketing Management', 'Business Management', 'Operations Management', 'Human Resource Management'],
      careers: [
        'Financial Auditor',
        'Financial Planning Analyst',
        'Financial Planner',
        'Product Manager',
        'Brand Manager',
        'Business Strategy Manager',
        'Business Development Manager',
        'Account Manager',
        'Operations Manager',
        'Supply Chain Analyst',
        'Process Improvement Manager',
        'Talent Acquisition Manager',
        'Employee Relations Manager',
        'HR Operations Manager',
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
        'Duration: Six months, designed for working professionals seeking a short-term, skill-oriented programme',
        'Core Curriculum: Covers Business Communication, Financial Accounting, Human Resource Management, Micro & Macro Economics, and Marketing Management',
        'Practical Application: Develop the ability to analyse business challenges, apply management principles, and implement strategies to enhance organisational performance',
        'Career Opportunities: Prepares students for roles such as Business Development Manager and Business Strategy Manager',
        'Flexible Learning: Self-paced online learning allowing participants to study anytime, anywhere',
        'Industry-Relevant Skills: Focus on practical knowledge and managerial competencies to enhance career growth in diverse business environments',
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
        'Flexible online learning with 24/7 access to live and recorded lectures, allowing students to study anytime and anywhere',
        'Comprehensive three-year programme structured across six semesters covering core commerce and business subjects',
        'Curriculum designed to build strong foundations in accounting, finance, management, taxation, and entrepreneurship',
        'The B.Com programme offers specialisations in Banking & FinTech, Accounting with AI, Business Analytics, E-Commerce, Business Accounting & Taxation, Economics, Financial Analytics and Digital Marketing with AI',
        'Technology-enabled learning through an advanced Learning Management System with video lectures, interactive materials, virtual classrooms, and discussion forums',
        'Access to industry expert sessions, webinars, projects, and career-oriented learning resources',
        'Placement assistance including resume building, mock interviews, skill assessments, and an AI-powered placement portal',
        'Access to digital learning resources including e-books, journals, and Coursera courses to support skill development',
        'Opportunity to gain alumni status from Manipal University Jaipur upon successful completion of the programme',
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
        'Flexible online learning with 24/7 access to live and recorded lectures through an advanced digital learning platform ',
        'Comprehensive three-year programme structured across six semesters covering core business and management subjects ',
        'Curriculum designed to build strong foundations in marketing, finance, human resource management, operations, and business analytics',
        'Multiple specialization options including Entrepreneurship Management & Family Business, Data Analytics, Retail and E-Commerce, Digital Marketing, Human Resource Management, Marketing, and Finance & Accounting',
        'Technology-enabled learning through a Learning Management System with video lectures, virtual classrooms, interactive materials, and discussion forums',
        'Access to industry expert sessions, webinars, projects, and Coursera courses for additional skill development ',
        'Placement assistance including resume building, mock interviews, skill assessments, and an AI-powered placement portal',
        'Opportunity to interact with industry professionals and build networks through webinars and expert sessions',
        'Alumni status from Manipal University Jaipur upon successful completion of the programme',
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
        'Flexible Online Learning: Study anytime with access to live classes, recorded lectures, and digital study resources.',
        'Industry-Relevant Curriculum: Covers core computing along with domains like Data Analytics, Cloud Computing, Cybersecurity, and Full Stack Development',
        '3-Year Programme Structure: Six semesters with flexible completion up to six years.',
        'Hands-On Learning: Practical labs, programming exercises, and project-based learning.',
        'Expert Faculty & Industry Sessions: Learn from experienced faculty with industry interaction opportunities.',
        'Advanced eLearning Platform: Access video lectures, virtual classrooms, and interactive learning materials.',
        'Career Support: Placement assistance, resume building, and mock interviews.',
        'Specialisation Options: Electives in Cloud Computing, Data Science & Analytics, and Cyber Security.',
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
        'Flexible Online Learning: Access live and recorded lectures through the digital learning platform.',
        'Industry-Relevant Curriculum: Focus on finance, accounting, international business, and analytics.',
        '2-Year Programme Structure: Four semesters with flexible completion up to four years.',
        'Expert Faculty & Industry Sessions: Learn from experienced faculty and industry experts.',
        'Advanced eLearning Platform: LMS with video lectures, virtual classrooms, and interactive study materials.',
        'Career Support: Resume building, mock interviews, and placement assistance.',
        'Learning Resources: Access to digital libraries, journals, and Coursera content.',
        'Scholarships & Alumni Network: Financial support options and access to the Manipal alumni network.',
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
        'Flexible Online Learning: Access live and recorded lectures anytime through the digital platform.',
        'Industry-Relevant Curriculum: Focus on practical business knowledge and managerial skills.',
        '2-Year Programme Structure: Four semesters with flexible completion up to four years.',
        'Multiple Specialisations: Options including Finance, Marketing, HRM, Analytics & Data Science, IT & FinTech, Operations, International Business, and Digital Marketing.',
        'Expert Faculty & Industry Sessions: Learn through webinars, projects, and industry interactions.',
        'Career Support: Resume building, mock interviews, and placement assistance.',
        'Learning Resources: Access to digital libraries, journals, and Coursera content.',
        'Scholarships & Alumni Network: Financial support options and access to the Manipal alumni network.',
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
        'Flexible Online Learning: Study anytime through video lectures, virtual classrooms, and digital resources',
        '2-Year Programme Structure: Four semesters with flexible completion up to four years.',
        'Advanced Technology Curriculum: Covers areas such as machine learning, data analytics, cloud computing, and cybersecurity.',
        'Bridge Courses: Non-IT graduates can complete foundation courses in computer fundamentals and mathematics.',
        'Hands-On Learning: Virtual labs, projects, and practical exercises.',
        'Specialisations Offered: Cloud Computing, Cybersecurity, Emerging Technologies, AI & ML, and AI & Data Science.',
        'Career Support: Placement assistance and career guidance for roles in the IT and technology sector.',
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
        'Flexible Online Learning: Access lectures, virtual classrooms, and digital study resources anytime.',
        '2-Year Programme Structure: Four semesters with flexible completion up to four years.',
        'Advanced Mathematics Curriculum: Covers areas such as linear algebra, complex analysis, topology, and differential equations.',
        'Elective Specialisations: Options including Data Science, Computational Science, and Econometrics.',
        'Project & Research Exposure: Seminars and a final project for practical application of concepts.',
        'Digital Learning Ecosystem: LMS with video lectures, simulations, and discussion forums.',
        'Career Support: Placement assistance, mock interviews, and skill development support.',
        'Learning Resources: Access to e-library, journals, and Coursera content.',
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
        'Flexible Online Learning: Engage with a next-gen pedagogy featuring live classes, recorded lectures, and e-learning content accessible anytime.',
        '2-Year Programme Structure: A minimum duration of two years divided into four semesters, with a maximum completion time of four years.',
        'Specialized Curriculum: Focuses on advanced economic theory with specific specializations available in Applied and Financial Economics.',
        'Diverse Elective Options: Students can choose from various electives such as Health Economics, Behavioral Economics, Labor Economics, and Agriculture Economics.',
        'Research & Practical Application: Includes a dedicated dissertation in the fourth semester to provide practical research experience.',
        'Digital Learning Ecosystem: A four-quadrant LMS approach offering video lectures, virtual classrooms, simulations, and discussion forums.',
        'Career Support Services: Extensive placement assistance including AI-powered portals, mock interviews, resume building, and skill assessments.',
        'Learning Resources: Access to an exhaustive e-library with over 1,80,000 e-books, journals, and free access to paid content on Coursera.',
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
        'Flexible Online Learning: Engage with a next-gen pedagogy featuring live classes, recorded lectures, and e-learning content accessible anywhere, anytime, through an advanced digital platform.',
        '2-Year Programme Structure: A minimum two-year duration divided into four semesters, with a maximum completion period of four years.',
        'Comprehensive Curriculum: Covers diverse subjects including media theories, digital publishing, broadcast journalism, and scriptwriting, with options for specializations and electives.',
        'Research & Practical Exposure: Includes practical components such as internship evaluations, a final project, and a dissertation to ensure hands-on experience.',
        'Digital Learning Ecosystem: Utilizes a four-quadrant Learning Management System (LMS) approach, offering video lectures, virtual classrooms, simulations, interactive materials, and discussion forums.',
        'Career Support Services: Enhances employability through placement assistance, including AI-powered portals, resume building, mock interviews, and skill assessments.',
        'Extensive Learning Resources: Provides access to an exhaustive e-library containing over 1,80,000 e-books and journals, along with free access to paid Coursera content and additional skill enhancement modules.',
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
        'Flexible Online Learning: Access video lectures, digital materials, and virtual classrooms anytime through the LMS.',
        'Comprehensive Humanities Curriculum: Covers key areas from English, Political Science, and Sociology.',
        '3-Year Programme Structure: Six semesters with a credit-based curriculum.',
        'Interdisciplinary Learning: Includes subjects such as literature, political systems, society, environmental studies, and digital fluency.',
        'Skill Development: Focus on communication, analytical thinking, and critical reasoning.',
        'Technology-Enabled Learning: Interactive resources, discussion forums, and digital learning tools',
        'Industry Interaction: Webinars, expert sessions, and project-based learning opportunities.',
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
        'Flexible online learning with access to video lectures, virtual classrooms, simulations, and discussion forums through a Learning Management System',
        'Two-year programme structured across four semesters with a total of 80 credits',
        'Curriculum covering advanced topics such as corporate accounting, strategic management, business ethics, and management accounting',
        'Elective options in Finance and Marketing with subjects like portfolio management, international marketing, corporate tax planning, and consumer behaviour',
        'Research-focused learning through research methodology, statistical analysis, and a project work component',
        'Industry-oriented learning with expert sessions, webinars, and academic mentoring',
        '24×7 digital learning resources including eText materials and interactive content',
        'UGC-entitled online programme delivered by experienced faculty and mentors',
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
        'Comprehensive curriculum: Covers key functional areas such as management, finance, marketing, operations, analytics, and strategy.',
        'Industry-relevant learning: Includes research methodology, project work, and practical business applications.',
        'Flexible online learning: Designed for working professionals with live and recorded classes and digital learning support.',
        'Career-focused skill development: Builds leadership, analytical thinking, communication, and strategic decision-making abilities.',
        'Dual specialization option: Learners can choose two specializations from Marketing, Finance, Human Resource Management, Systems, Operations & Supply Chain Management, and Healthcare to gain expertise in multiple business domains.',
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
        'Industry-relevant curriculum covering programming, data structures, software engineering, and emerging technologies.',
        'Hands-on learning approach with programming labs and a final project to build practical IT skills',
        'Flexible online learning model with live classes, recorded lectures, and digital learning resources.',
        'Elective specialization options, allowing learners to choose from areas such as Cloud Computing, Data Warehousing & Data Mining, Machine Learning, or Distributed Systems & Grid Computing.',
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
        'UGC-entitled postgraduate degree from Sikkim Manipal University',
        'AI-enabled Learning Management System (LMS) for interactive digital learning',
        'Comprehensive curriculum covering global literatures including American, Indian, Diaspora, and World Literature',
        'Strong foundation in literary theory, criticism, and research methodology',
        'Interdisciplinary approach with subjects such as Gender Studies and Environmental Humanities',
        'Expert faculty guidance and mentorship for academic and research development',
        'Industry and academic expert sessions, webinars, and projects',
        'Research-focused dissertation in the final semester',
        '24×7 access to learning resources and academic support',
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
        'UGC-entitled online master’s degree from Sikkim Manipal University',
        'Comprehensive curriculum covering political theory, governance, international relations, and public policy',
        'Flexible online learning with 24×7 access to digital study materials and recorded sessions',
        'AI-enabled Learning Management System (LMS) for an interactive and seamless learning experience',
        'Expert faculty and academic mentors guiding students throughout the programme',
        'Industry sessions, webinars, and practical discussions with domain experts',
        'Strong research focus with research methodology training and a final semester dissertation',
        'Exposure to contemporary political issues such as Indo-Pacific geopolitics, gender and politics, and international political economy',
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
        'UGC-entitled online postgraduate degree from Sikkim Manipal University',
        'Comprehensive curriculum covering classical and contemporary sociological theories',
        'In-depth study of Indian society including social stratification, family, religion, and development',
        'Focus on contemporary social issues such as globalization, ethnicity, nationalism, and social movements',
        'Research-oriented learning with research methodology and a final semester dissertation',
        'Interdisciplinary perspective including environment, health, gender, and culture studies',
        'Expert faculty mentorship and academic guidance',
        'Interactive learning through webinars, projects, and expert sessions',
        'AI-enabled Learning Management System (LMS) for flexible digital learning',
        '24×7 access to learning resources and academic support',
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
        'UGC-entitled online degree program with a duration of 3 years (6 semesters).',
        'Flexible learning through live sessions, self-learning materials, discussion forums, and online exams.',
        'Industry-designed curriculum that delivers technical excellence and supplements professional skills',
        'Includes a host of skill enhancement and ability enhancement courses alongside core subjects.',
        'Incorporates project work that allows students to analyse problems and propose actions for real-world situations.',
        'Global learning environment with diversity from 43+ countries and access to over 20,000 LinkedIn Learning courses.',
        'Innovative learning methodology with dedicated program managers and additional live sessions for career success.',
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
        'UGC-entitled online degree program with a duration of 3 years (6 semesters)',
        'Live sessions, self-learning material, discussion forums, and online exams',
        'Industry-designed curriculum focused on accounting, finance, and management skills',
        'Skill enhancement and ability enhancement courses along with core subjects',
        'Research methodology, business analytics, and project-based learning',
        'Global learning opportunities and access to LinkedIn Learning courses',
        'Innovative learning methodology with additional live sessions for skill development',
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
        'UGC-entitled online degree program',
        '3-year duration with 6 semesters',
        'Live sessions, self-learning materials, discussion forums, and online exams',
        'Industry-relevant curriculum designed by experts',
        'Exposure to modern technologies and programming languages',
        'Applied learning projects to analyze real-world situations',
        'Opportunities to develop technical, analytical, and problem-solving skills',
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
        'UGC-entitled online degree program',
        'Global faculty and industry-relevant curriculum',
        'Access to LinkedIn Learning courses',
        'Additional live sessions to build key professional skills',
        'Flexible online learning from anywhere',
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
        'UGC-entitled online degree program with a duration of 2 years.',
        'Flexible learning through live sessions, self-learning materials, discussion forums, and online exams',
        'Industry-aligned curriculum that integrates modern tools, including Generative AI for online learners',
        'Extensive support through dedicated program managers and career advancement services.',
        'Access to a global learning network with students from over 43 countries and 20,000+ LinkedIn Learning courses.',
        'Research-oriented approach with master thesis or project components included in the curriculum.',
        'Professional-grade specializations with international accreditations from bodies like ACCA (UK) and the Institute of Analytics (IoA, UK).',
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
        'UGC-entitled online degree program',
        'Industry-relevant curriculum designed by academic and technology experts',
        'Flexible online learning accessible from anywhere',
        'Exposure to emerging technologies and modern computing practices',
        'Focus on practical application and problem-solving skills',
        'Opportunities for career advancement in the IT and technology sector',
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
  'amity-university': amityUniversityCourseContent,
}

export function getUniversityCourseContent(
  universitySlug: string,
  courseSlug: string
): UniversityCourseContent | null {
  return universityCourseContent[universitySlug]?.[courseSlug] ?? null
}
