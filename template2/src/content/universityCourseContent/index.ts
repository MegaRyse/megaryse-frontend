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
        'The Vellore Institute of Technology (VIT) presents a two-year Online Master of Business Administration (MBA) programme crafted to provide a dynamic and career-enhancing learning experience. This programme is designed to deepen your understanding of business practices, sharpen your leadership capabilities, encourage innovative thinking, enable strategic decision-making, and equip you to capitalize on emerging growth opportunities.',
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
        'The Vellore Institute of Technology (VIT) presents a two-year Online Master of Computer Applications (MCA) programme designed to deliver a flexible, industry-focused, and career-advancing learning experience. The programme strengthens core computer science fundamentals, enhances expertise in software development and IT, fosters innovation, and prepares learners to excel in today’s rapidly evolving digital economy. Ideal for working professionals, it combines academic excellence with practical, industry-relevant exposure.',
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
        'The Vellore Institute of Technology (VIT) presents a two-year Online Master of Science in Data Science (M.Sc. Data Science) programme designed to equip professionals with in-demand data analytics and machine learning skills. The programme builds a strong foundation in data science concepts, enhances expertise through specialised electives such as marketing analytics, financial data analytics, and big data analytics, and develops the ability to analyse complex datasets for strategic decision-making. Ideal for working professionals, it combines industry-focused learning with flexible online delivery to boost career versatility, increase earning potential, and prepare learners for leadership roles in the rapidly expanding data-driven job market.',
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
        'Dr. D. Y. Patil Vidyapeeth, Pune offers a three-year Bachelor of Business Administration (BBA) programme designed to build a strong foundation in business and management. The programme equips students with knowledge in key areas such as marketing, finance, human resources, economics, and entrepreneurship, helping them understand the functioning of modern organizations. Structured across six semesters, the curriculum combines theoretical concepts with practical business insights to develop leadership, communication, analytical, and problem-solving skills. Through a technology-enabled learning environment that includes online lectures, study materials, webinars, and interactive sessions, students gain the knowledge and skills required to succeed in the dynamic corporate world.',
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
        'Dr. D. Y. Patil Vidyapeeth, Pune offers a two-year Master of Business Administration (MBA) programme designed to develop strong managerial, analytical, and leadership capabilities required in today’s dynamic business environment. The programme provides in-depth knowledge of core business areas such as marketing, finance, human resources, operations, and strategic management, helping students understand modern organizational practices and decision-making. Structured across four semesters, the curriculum combines theoretical learning with practical insights through case-based learning, industry interactions, and project work. Delivered through a technology-enabled online learning platform, students can access live lectures, recorded sessions, digital study materials, and interactive learning resources, enabling flexible learning for both fresh graduates and working professionals',
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
        'Dr. D. Y. Patil Vidyapeeth, Pune offers the MBA WX – MBA for Working Professionals, a 24-month postgraduate programme designed for professionals seeking to advance their careers while continuing to work. Delivered through a flexible online learning format, the programme develops skills in management, leadership, strategic decision-making, and emerging business technologies. Offered in collaboration with IFC France and Media School International, the programme provides dual international certification and global exposure, helping learners gain practical business insights and leadership capabilities for today’s global business environment.',
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
        'The Master of Computer Applications (MCA) at Dr. D. Y. Patil Vidyapeeth, Pune is a 2-year postgraduate programme designed for learners and working professionals who want to build advanced expertise in computer applications and emerging technologies. The programme focuses on software development, data science, cloud computing, artificial intelligence, and modern programming practices, combining theoretical knowledge with practical learning. Delivered through a flexible online learning model, it allows professionals to upgrade their technical skills while continuing their careers.',
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
        'The Certificate Programme in Digital Marketing (CPDM) at Dr. D. Y. Patil Vidyapeeth, Pune is a 6-month online certification programme designed to help learners build practical knowledge of modern digital marketing tools, strategies, and platforms. The programme provides a comprehensive understanding of key areas such as search engine optimization (SEO), social media marketing, integrated marketing communication, and emerging digital technologies. Through interactive online learning and practical assignments, learners gain the skills needed to plan, implement, and manage effective digital marketing campaigns for businesses and brands',
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
        'The Certificate Programme in Hospital & Health Care Management (CPHAHM) at Dr. D. Y. Patil Vidyapeeth, Pune is a 6-month online certification programme designed to build foundational knowledge in hospital administration and healthcare management. The programme focuses on key areas such as hospital operations, healthcare services marketing, quality management, and legal aspects of healthcare administration, enabling learners to understand the functioning of healthcare organizations. Through structured online learning, assignments, and assessments, the programme equips students with practical skills to manage hospital departments, support healthcare operations, and contribute effectively to the healthcare industry.',
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
        'Narsee Monjee Institute of Management Studies (NMIMS) Centre for Distance and Online Education (CDOE) offers a three-year Online Bachelor of Commerce (BCom) programme designed to build a strong foundation in commerce, finance, and business management. The programme combines theoretical knowledge with practical insights across key areas such as accounting, economics, management, and entrepreneurship. Delivered through a technology-enabled learning platform, it allows students to study anytime, anywhere while developing the analytical, financial, and business skills required to succeed in today’s dynamic business environment.',
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
        'Narsee Monjee Institute of Management Studies (NMIMS) Centre for Distance and Online Education (CDOE) presents the Bachelor of Business Administration (Marketing & Finance), a three-year undergraduate programme spread across six semesters, designed to build a strong foundation in business management, marketing, and financial management. The programme combines core management concepts with practical insights in areas such as accounting, economics, business communication, marketing strategy, and financial decision-making. Through a structured curriculum covering subjects from Principles of Management and Financial Accounting to Digital Marketing and Financial Analysis, students develop the analytical and strategic skills required to succeed in today’s competitive business environment.',
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
        'Narsee Monjee Institute of Management Studies (NMIMS) Centre for Distance and Online Education (CDOE) presents the Bachelor of Business Administration (Marketing, Finance & Business Analytics), a three-year undergraduate programme spread across six semesters, designed to build a strong foundation in business management, marketing, finance, and business analytics. The programme integrates core management concepts with practical insights across accounting, economics, business communication, marketing strategy, financial decision-making, and analytics. Through a structured curriculum covering subjects from Principles of Management and Financial Accounting to Digital Marketing, Financial Analysis, and Business Analytics, students develop the analytical, strategic, and data-driven skills required to thrive in today’s competitive business environment.',
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
        'Narsee Monjee Institute of Management Studies (NMIMS) Centre for Distance and Online Education (CDOE) offers a two-year Online Master of Business Administration (MBA) programme designed for working professionals and aspiring managers seeking to accelerate their career growth. The programme provides a strong foundation in core business disciplines while allowing learners to specialise in key management domains. Delivered through a flexible, technology-enabled learning platform, the programme enables students to study anytime and from anywhere with access to live sessions, recorded lectures, and digital study resources. The curriculum combines academic rigor with practical, case-based learning to help participants develop strategic thinking, leadership capabilities, and problem-solving skills required in today’s evolving corporate landscape. With guidance from experienced faculty, industry experts, and access to NMIMS’ extensive academic ecosystem, the programme supports professionals in advancing their careers without interrupting their work commitments.',
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
        'Narsee Monjee Institute of Management Studies (NMIMS) Centre for Distance and Online Education (CDOE) one-year online diploma programmes are designed for working professionals seeking to gain specialised, industry-ready skills within a short, focused timeframe. Crafted to accommodate busy schedules, these programmes offer self-paced learning, enabling participants to effectively balance work commitments with studies. Offered in Finance Management, Marketing Management, Business Management, Operations Management, and Human Resource Management, these programmes provide practical, industry-relevant knowledge from one of the nation’s leading online learning institutes, equipping learners to enhance their careers and stay competitive in today’s dynamic professional environment.',
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
        'Narsee Monjee Institute of Management Studies (NMIMS) Centre for Distance and Online Education (CDOE) offers a six-month Certificate in Business Management, designed for working professionals seeking a strong foundation in management principles and practices within a short, focused timeframe. Crafted for busy schedules, the programme provides self-paced learning, allowing participants to balance work commitments with studies while gaining practical, industry-relevant skills. The curriculum offers a well-rounded introduction to core business concepts, equipping students to analyse business challenges and implement effective management strategies.',
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
        'Manipal University Jaipur offers a three-year Online Bachelor of Commerce (B.Com) programme designed to build a strong foundation in commerce, finance, and business management. The programme integrates theoretical knowledge with practical skills across key areas such as accounting, economics, marketing, taxation, and entrepreneurship. Delivered through a technology-enabled digital learning platform, it enables students to learn anytime, anywhere while developing the analytical, financial, and managerial competencies required to succeed in today’s dynamic business environmen',
      highlights: [
        'Flexible online learning with 24/7 access to live and recorded lectures, allowing students to study anytime and anywhere',
        'Comprehensive three-year programme structured across six semesters covering core commerce and business subjects',
        'Curriculum designed to build strong foundations in accounting, finance, management, taxation, and entrepreneurship',
        'The B.Com programme offers electives in Banking & FinTech, Business Accounting & Taxation, Accounting with AI, Economics, Business Analytics, Financial Analytics, E-Commerce, and Digital Marketing with AI',
        'Technology-enabled learning through an advanced Learning Management System with video lectures, interactive materials, virtual classrooms, and discussion forums',
        'Access to industry expert sessions, webinars, projects, and career-oriented learning resources',
        'Placement assistance including resume building, mock interviews, skill assessments, and an AI-powered placement portal',
        'Access to digital learning resources including e-books, journals, and Coursera courses to support skill development',
        'Opportunity to gain alumni status from Manipal University Jaipur upon successful completion of the programme',
      ],
      specializations: [
        'Banking & FinTech',
        'Business Accounting & Taxation',
        'Accounting with AI',
        'Economics',
        'Business Analytics',
        'Financial Analytics',
        'E-Commerce',
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
        'Manipal University Jaipur offers a three-year Online Bachelor of Business Administration (BBA) programme designed to build a strong foundation in business, management, and entrepreneurship. The programme combines theoretical knowledge with practical and industry-relevant skills across key areas such as marketing, finance, human resource management, business analytics, and operations management. Delivered through a technology-enabled digital learning platform, it enables students to study anytime, anywhere while developing managerial, analytical, and strategic competencies required to succeed in today’s dynamic business environment.',
      highlights: [
        'Flexible online learning with 24/7 access to live and recorded lectures through an advanced digital learning platform ',
        'Comprehensive three-year programme structured across six semesters covering core business and management subjects ',
        'Curriculum designed to build strong foundations in marketing, finance, human resource management, operations, and business analytics',
        'Specialization options include Human Resource Management, Marketing, Finance & Accounting, Entrepreneurship Management & Family Business, Data Analytics, Retail & E-Commerce, and Digital Marketing',
        'Additional electives available in Cloud Computing, Data Science & Analytics, and Cyber Security',
        'Technology-enabled learning through a Learning Management System with video lectures, virtual classrooms, interactive materials, and discussion forums',
        'Access to industry expert sessions, webinars, projects, and Coursera courses for additional skill development ',
        'Placement assistance including resume building, mock interviews, skill assessments, and an AI-powered placement portal',
        'Opportunity to interact with industry professionals and build networks through webinars and expert sessions',
        'Alumni status from Manipal University Jaipur upon successful completion of the programme',
      ],
      specializations: [
        'Human Resource Management',
        'Marketing',
        'Finance & Accounting',
        'Entrepreneurship Management & Family Business',
        'Data Analytics',
        'Retail & E-Commerce',
        'Digital Marketing',
        'Cloud Computing',
        'Data Science & Analytics',
        'Cyber Security',
      ],
      eligibility: [
        'Candidates must have completed 10+2 or 10th + 3-year diploma to be eligible to apply for MUJ.',
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: '₹1,35,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students',
      ],
    },
    bca: {
      heroTitle: 'Bachelor of Computer Applications',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Manipal University Jaipur offers a three-year Online Bachelor of Computer Applications (BCA) programme designed to build strong foundations in computer science and modern technology. The programme includes specialisations such as Data Analytics, Cloud Computing, Cybersecurity, and Full Stack Development, helping students develop industry-relevant technical skills. Delivered through a flexible online learning platform, students can access live classes, recorded lectures, and digital learning resources from anywhere. The curriculum combines core computing concepts with practical labs and projects to prepare learners for careers in software development, IT services, and emerging technology sectors.',
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
        'Manipal University Jaipur offers a two-year Online Master of Commerce (MCom) programme designed for graduates seeking advanced knowledge in commerce, finance, and business management. The programme focuses on key areas such as Finance, Accounting, International Business, and Analytics, helping learners build strong analytical and managerial skills for modern business environments. Delivered through a flexible online learning platform, students can access live classes, recorded lectures, and digital study resources from anywhere. The curriculum combines advanced commerce concepts with practical insights to prepare learners for careers in finance, accounting, banking, and global business.',
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
        'Candidates must have completed 10+2 and graduation. Applicants from outside India must submit a Certificate of Equivalence issued by the Association of Indian Universities (AIU).',
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
        'Manipal University Jaipur offers a two-year Online Master of Business Administration (MBA) programme designed to develop managerial, analytical, and leadership skills required in today’s dynamic business environment. The programme provides a strong foundation in core management disciplines while allowing learners to specialise in career-focused domains. Delivered through a flexible online learning platform, students can attend live classes and access recorded lectures and digital study resources from anywhere. The curriculum combines business fundamentals with practical learning through projects and industry interactions to prepare learners for leadership roles across industries',
      highlights: [
        'Flexible Online Learning: Access live and recorded lectures anytime through the digital platform.',
        'Industry-Relevant Curriculum: Focus on practical business knowledge and managerial skills.',
        '2-Year Programme Structure: Four semesters with flexible completion up to four years.',
        'Multiple Specialisations: Options include Finance, Marketing, Human Resource Management, Analytics & Data Science, IT & FinTech, Operations Management, International Business, Information System Management, Project Management, Supply Chain Management, Banking, Financial Services & Insurance (BFSI), Digital Marketing, and Retail Management.',
        'Expert Faculty & Industry Sessions: Learn through webinars, projects, and industry interactions.',
        'Career Support: Resume building, mock interviews, and placement assistance.',
        'Learning Resources: Access to digital libraries, journals, and Coursera content.',
        'Scholarships & Alumni Network: Financial support options and access to the Manipal alumni network.',
      ],
      specializations: [
        'Finance',
        'Marketing',
        'Human Resource Management',
        'Analytics & Data Science',
        'IT & FinTech',
        'Operations Management',
        'International Business',
        'Information System Management',
        'Project Management',
        'Supply Chain Management',
        'Banking, Financial Services & Insurance (BFSI)',
        'Digital Marketing',
        'Retail Management',
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
        'Manipal University Jaipur offers a two-year Online Master of Computer Applications (MCA) programme designed to build advanced knowledge in computer science, software development, and emerging digital technologies. The programme develops strong foundations in programming, data management, and cloud computing while introducing learners to modern computing domains. Delivered through a fully online learning platform, students can access lectures, study materials, and interactive learning resources through a dedicated Learning Management System. The curriculum combines theoretical knowledge with practical learning through virtual labs, projects, and digital tools.',
      highlights: [
        'Flexible Online Learning: Study anytime through video lectures, virtual classrooms, and digital resources',
        '2-Year Programme Structure: Four semesters with flexible completion up to four years.',
        'Advanced Technology Curriculum: Covers areas such as machine learning, data analytics, cloud computing, and cybersecurity.',
        'Bridge Courses: Non-IT graduates can complete foundation courses in computer fundamentals and mathematics.',
        'Hands-On Learning: Virtual labs, projects, and practical exercises.',
        'Specialisations Offered: AI & Data Science, Cloud Computing, Cybersecurity, Comprehensive Emerging Technologies, and AI & Machine Learning (AI & ML).',
        'Career Support: Placement assistance and career guidance for roles in the IT and technology sector.',
      ],
      specializations: [
        'AI & Data Science',
        'Cloud Computing',
        'Cybersecurity',
        'Comprehensive Emerging Technologies',
        'AI & Machine Learning (AI & ML)',
      ],
      eligibility: [
        "Applicants must have a 10+2+3-year bachelor's degree in Computer Applications, Computer Science, or Information Technology from a recognised university or an equivalent qualification recognised by the Association of Indian Universities (AIU). Graduates from other streams such as Science, Business Administration, Business Management, Arts & Humanities, or Commerce are also eligible but must complete bridge courses in Computer Fundamentals/IT and Mathematics (if not studied earlier) during Semester 1. Applicants must have at least 50% aggregate marks in graduation (45% for reserved categories)",
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
        'Manipal University Jaipur offers a two-year Online Master of Science (MSc) in Mathematics programme designed to develop advanced knowledge in pure and applied mathematics. The programme strengthens analytical, problem-solving, and research skills through subjects such as linear algebra, differential equations, topology, and optimization, along with electives in emerging interdisciplinary areas. Delivered through a flexible online learning platform, students can access video lectures, virtual classrooms, and interactive study materials. The programme is structured across four semesters with a maximum completion period of four years and includes seminars, electives, and a final project to provide practical and research experience',
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
        'Manipal University Jaipur offers a two-year online Master of Arts in Economics designed to blend advanced economic theory with practical, real-world applications. The programme focuses on building robust analytical and decision-making skills suitable for a data-driven world, with specialized curriculum paths in Applied and Financial Economics. It is ideal for those seeking impactful careers in research, policy-making, and finance. The programme is delivered through a sophisticated digital learning platform that provides 24x7 access to various educational resources. Structured over four semesters, the curriculum includes core subjects like Microeconomics, Macroeconomics, and Econometrics, along with a final dissertation and diverse elective choices',
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
        'The Manipal University Jaipur Online Master of Arts in Journalism & Mass Communication (MA JMC) is a two-year postgraduate program designed to provide a future-ready blend of journalism, digital media, public relations (PR), and communication. It is ideal for individuals looking to lead in the fast-evolving media landscape, offering specializations in key media fields to equip students with practical skills and strategic insights for careers in news, content, and corporate communication',
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
    bcom: {
      heroTitle: 'Bachelor of Commerce (BCOM)',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Sikkim Manipal University offers a three-year Online Bachelor of Commerce (B.Com) programme designed to build a strong academic foundation in commerce, finance, and business management. The programme blends core theoretical concepts with practical application across key domains such as accounting, marketing, corporate governance, taxation, financial management, and entrepreneurship. Structured across six semesters, it progressively develops learners’ analytical, financial, and managerial capabilities. Delivered through a robust, technology-enabled learning platform, the programme ensures seamless, flexible learning while preparing students to thrive in a dynamic and evolving business environment.',
      highlights: [
        'Flexible online learning with 24/7 access to high-quality study material, enabling uninterrupted learning anytime, anywhere',
        'UGC-entitled online programme ensuring credibility and recognition',
        'Comprehensive curriculum structured across six semesters covering accounting, finance, management, taxation, auditing, and business research',
        'Strong foundation in core subjects including financial accounting, corporate accounting, cost accounting, and management accounting',
        'Exposure to emerging and applied areas such as e-business, entrepreneurship development, financial markets, and international finance',
        'Industry-relevant subjects like GST, auditing practices, financial reporting standards, and strategic financial management',
        'Integrated skill development through courses in communication, personality development, leadership, and digital fluency',
        'Access to expert faculty, mentors, and industry-led sessions including webinars and practical projects',
        'Scholarships for deserving candidates to support academic aspirations',
        'Emphasis on practical learning through project work and research methodology in the final semester',
        'Foundation courses and structured progression to support learners from diverse academic backgrounds',
      ],
      eligibility: [
        'Candidates who have completed 10+2 education or graduate level education outside India must produce a certificate of equivalence issued by the Association of Indian Universities.',
      ],
      fees: {
        applicationFee: 'INR 500',
        totalFee: 'Indian & Nepalese Nationals: INR 75,000 | Other Nationals: USD 1,020',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.'
      ],
    },
    ba: {
      heroTitle: 'Bachelor of Arts',
      duration: '3 Years',
      mode: 'Online',
      overview:
        'Sikkim Manipal University (SMU) offers a three-year Online Bachelor of Arts (BA) programme designed to provide a strong foundation in humanities and social sciences. The programme integrates key subjects from English, Political Science, and Sociology, helping students develop an understanding of literature, society, governance, and human behaviour. Delivered through a technology-enabled online learning platform, students can access video lectures, digital study materials, and virtual classrooms through the Learning Management System (LMS). Structured across six semesters, the programme helps learners build communication, analytical, and critical thinking skills for careers in media, education, research, public policy, and related fields.',
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
        'Candidates must have completed 10+2 or a diploma with at least 40% aggregate marks (35% for reserved categories), and applicants who completed their education outside India must provide an equivalence certificate from the Association of Indian Universities (AIU).'
      ],
      fees: {
        applicationFee: '₹500',
        totalFee: '₹75,000',
        paymentModes: 'No-cost EMI available',
      },
      scholarships: [
        'We offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.'
      ],
    },
    mcom: {
      heroTitle: 'Master of Commerce',
      duration: '2 Years',
      mode: 'Online',
      overview:
        'Sikkim Manipal University (SMU) offers a two-year Online Master of Commerce (M.Com) programme designed to strengthen advanced knowledge in commerce, finance, accounting, and business management. The programme integrates theoretical concepts with practical insights across areas such as corporate accounting, financial management, marketing, business laws, and strategic management. Delivered through a technology-enabled digital learning platform, it enables learners to study flexibly while developing analytical, managerial, and research skills required for leadership roles in business, finance, and academia.',
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
        'The Sikkim Manipal University (SMU) Online MBA is a two-year postgraduate programme designed to develop managerial, analytical, and leadership skills required in today’s dynamic business environment. Structured across four semesters, the programme covers core management areas such as marketing, finance, human resources, operations, and strategy. Learners build strong business fundamentals in the first two semesters and progress to advanced subjects, electives, and a project in the later semesters. With a total of 102 credits, the curriculum blends theoretical knowledge with practical application to prepare professionals for leadership roles across industries.',
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
        'The Online Master of Computer Applications (MCA) from Sikkim Manipal University (SMU) is a two-year postgraduate programme designed to develop skilled IT professionals with expertise in programming, software development, and emerging technologies. Structured across four semesters and 80 credits, the programme covers core areas such as Java and Python programming, database management, operating systems, computer networks, and software engineering, along with hands-on labs and a final project. Delivered through a 100% online learning platform with live and recorded classes, the programme allows learners to study flexibly while building practical technical skills relevant to modern IT careers.',
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
        'The Online MA in English offered by Sikkim Manipal University (SMU) is a two-year postgraduate program designed to develop advanced knowledge of English literature, critical theory, and research skills. The curriculum covers major literary forms such as drama, poetry, and fiction, along with specialized areas including American Literature, Indian English Literature, Post-Colonial Literature, and World Literature. Delivered through a technology-enabled learning platform, the program combines academic rigor with flexible online learning. Students benefit from expert faculty guidance, interactive webinars, and research-focused coursework, culminating in a dissertation in the final semester.',
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
        'The Online MA in Political Science offered by Sikkim Manipal University (SMU) is a two-year postgraduate program designed to provide a comprehensive understanding of political theory, governance, and global political dynamics. The curriculum explores key areas such as Indian government and politics, Western political thought, international relations, public policy, and political sociology. Delivered through a flexible online learning platform, the program combines academic rigor with practical insights through expert faculty guidance, interactive sessions, and research-based learning, culminating in a dissertation and viva voce in the final semester.',
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
        'The MA in Sociology at Sikkim Manipal University (SMU) is a two-year postgraduate programme that provides a comprehensive understanding of social structures, institutions, and contemporary societal issues. The programme explores key areas such as sociological theories, Indian society, culture, globalization, development, and social movements. Structured across four semesters with 80 credits, it also includes research methodology and a dissertation in the final semester, enabling students to develop strong analytical and research skills through a flexible, technology-enabled learning platform.',
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
        'The Bachelor of Business Administration (BBA) is a 3-year (6 semesters) UGC-entitled online degree program designed to provide a foundational understanding of business operations, management theories, and strategic decision-making. The program is structured to equip students with the essential knowledge and practical skills required to excel in various corporate and organizational roles, blending theoretical academic learning with professional skill development.',
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
        'The Bachelor of Commerce (B.Com) is a 3-year (6 semesters) UGC-entitled online degree program designed to build strong knowledge in commerce, accounting, finance, and business management. The program helps students develop practical skills required to manage financial operations, understand business environments, and make strategic financial decisions. The curriculum combines accounting, finance, management, and economics along with skill enhancement courses, research projects, and analytical tools to prepare students for careers in areas such as auditing, financial analysis, consulting, and corporate finance.',
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
        'The Bachelor of Computer Applications (BCA) is a 3-year (6 semesters) UGC-entitled online degree program designed to build a strong foundation in computer applications, programming, and modern information technology. The program combines core computer science principles with specialized electives so students can gain expertise in emerging technology domains. Through the program, learners study subjects such as programming, algorithms, operating systems, databases, networking, and web technologies, along with industry-relevant technologies. The curriculum is designed to help students develop analytical thinking, problem-solving ability, and technical proficiency, while gaining practical exposure through applied learning projects and real-world problem analysis. The program is delivered through live sessions, self-learning materials, discussion forums, and online exams.',
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
        'The Master of Commerce (M.Com) is a 2-year (4 semesters) UGC-entitled online degree program designed to provide advanced knowledge in accounting, finance, and business management. The program helps learners develop strong analytical, financial, and decision-making skills through subjects related to financial reporting, taxation, financial management, and corporate laws. It prepares students for roles in accounting, financial advisory, consulting, financial management, and financial analysis.',
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
        'The Master of Business Administration (MBA) is a 2-year UGC-entitled online degree program designed to provide advanced knowledge in business management, strategic leadership, and specialized functional areas. The program aims to develop professional skills in decision-making, analytical thinking, and operational efficiency to prepare students for leadership roles in a global business environment. The curriculum combines core management subjects—such as organizational behavior, quantitative techniques, and business law—with research projects, thesis work, and industry-focused electives to provide both theoretical foundations and practical applications.',
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
        'The Master of Computer Applications (MCA) is a 2-year (4 semesters) UGC-entitled online degree program designed to provide advanced knowledge in computer science, software development, and emerging digital technologies. The program helps learners develop strong programming, analytical, and problem-solving skills through subjects related to software engineering, data management, application development, and modern computing technologies. It prepares students for roles in software development, IT consulting, system analysis, data analytics, cybersecurity, and technology management.',
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
