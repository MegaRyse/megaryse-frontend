export type CourseMaster = {
  id: number
  shortName: string
  fullName: string
  category: string
  icon: string
  description: string
  specializations: string[]
  careerPaths: string[]
}

export const coursesMasterData: CourseMaster[] = [
  // ================= UNDERGRADUATE =================
  {
    id: 1,
    shortName: "B.Com",
    fullName: "Bachelor of Commerce",
    category: "Undergraduate Programs",
    icon: "💰",
    description:
      "BACHELOR OF COMMERCE (BCOM) PROGRAMME OVERVIEW\n\nThe Online Bachelor of Commerce (BCom) offered by NMIMS CDOE is a three-year programme designed to build a strong foundation in commerce, finance, and business management. The curriculum combines theoretical concepts with practical insights in areas such as accounting, economics, management, and entrepreneurship, while allowing students to study anytime and anywhere through a technology-enabled learning platform.\n\nProgramme Highlights\n\n- Flexible online learning with 24/7 access to live and recorded lectures across multiple devices\n- Industry-relevant curriculum designed by experienced academicians and experts\n- Three-year programme across six semesters covering core and advanced commerce subjects\n- Exposure to advanced topics such as Corporate Finance, Strategic Management, Financial Modelling, Investment Analysis, and Entrepreneurship\n- Mobile-app-based learning management system for a seamless learning experience\n- Development of practical financial and employability skills\n- NMIMS CDOE alumni status and access to the global NMIMS alumni network after completion.\n\nEligibility\n\nHSC (10+2) in any discipline from a recognized Board with minimum 50% (45% for SC/ST/OBC/PwD).\n\nProgramme Fee\n\n- Application Fee: 11,200\n- Total Programme Fee: 108,000\n\nNo-Cost EMI Option Available\n\nBenefit from our no-cost EMI facility, designed to make financing your education simple and manageable.\n\nScholarships Available\n\nWe offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.",
    specializations: ["Accounting", "Finance", "Banking", "Taxation", "Auditing"],
    careerPaths: [
      "Chartered Accountant (CA)",
      "Financial Analyst",
      "Banker",
      "Investment Consultant"
    ]
  },
  {
    id: 2,
    shortName: "BBA",
    fullName: "Bachelor of Business Administration",
    category: "Undergraduate Programs",
    icon: "📊",
    description:
      "Focused on building managerial, leadership, and entrepreneurial skills.",
    specializations: [
      "Marketing",
      "Finance",
      "Human Resources",
      "Operations",
      "International Business"
    ],
    careerPaths: [
      "Business Manager",
      "Marketing Executive",
      "HR Executive",
      "Entrepreneur"
    ]
  },
  {
    id: 3,
    shortName: "BCA",
    fullName: "Bachelor of Computer Applications",
    category: "Undergraduate Programs",
    icon: "💻",
    description:
      "Designed for students interested in software development and IT management.",
    specializations: [
      "Software Development",
      "Web Development",
      "Cyber Security",
      "Data Analytics"
    ],
    careerPaths: [
      "Software Developer",
      "Web Developer",
      "System Analyst",
      "IT Consultant"
    ]
  },
  {
    id: 4,
    shortName: "BA",
    fullName: "Bachelor of Arts",
    category: "Undergraduate Programs",
    icon: "📚",
    description:
      "Offers a wide range of humanities and social science disciplines.",
    specializations: [
      "Economics",
      "Psychology",
      "Political Science",
      "English Literature"
    ],
    careerPaths: [
      "Civil Services",
      "Content Writer",
      "Teacher",
      "Social Worker"
    ]
  },

  // ================= POSTGRADUATE =================
  {
    id: 5,
    shortName: "MBA",
    fullName: "Master of Business Administration",
    category: "Postgraduate Programs",
    icon: "🎓",
    description:
      "Globally recognized program to develop leadership and advanced business skills.",
    specializations: [
      "Marketing",
      "Finance",
      "Human Resources",
      "Operations",
      "Business Analytics"
    ],
    careerPaths: [
      "Business Consultant",
      "Marketing Manager",
      "Finance Manager",
      "Operations Head"
    ]
  },
  {
    id: 6,
    shortName: "MCA",
    fullName: "Master of Computer Applications",
    category: "Postgraduate Programs",
    icon: "🖥️",
    description:
      "Advanced program focused on software development and computer science.",
    specializations: [
      "Software Engineering",
      "Cloud Computing",
      "AI & ML",
      "Cyber Security"
    ],
    careerPaths: [
      "Senior Software Developer",
      "System Architect",
      "Data Engineer",
      "IT Manager"
    ]
  },
  {
    id: 7,
    shortName: "MSc",
    fullName: "Master of Science",
    category: "Postgraduate Programs",
    icon: "🔬",
    description:
      "Specialized program focusing on analytical and scientific disciplines.",
    specializations: [
      "Data Science",
      "Mathematics",
      "Computer Science",
      "Physics"
    ],
    careerPaths: [
      "Data Scientist",
      "Research Analyst",
      "Professor",
      "Scientific Officer"
    ]
  },

  // ================= DIPLOMA =================
  {
    id: 8,
    shortName: "Diploma in Management",
    fullName: "Diploma in Business and Management Studies",
    category: "Diploma Programs",
    icon: "📘",
    description:
      "Short-term program focused on practical management knowledge.",
    specializations: ["Business Management", "Leadership", "Organizational Skills"],
    careerPaths: ["Management Executive", "Team Leader"]
  },
  {
    id: 9,
    shortName: "PG Diploma in Healthcare Management",
    fullName: "Post Graduate Diploma in Healthcare Management",
    category: "Diploma Programs",
    icon: "🏥",
    description:
      "Specialized diploma focusing on hospital and healthcare administration.",
    specializations: [
      "Hospital Administration",
      "Healthcare Operations",
      "Medical Records Management"
    ],
    careerPaths: [
      "Healthcare Administrator",
      "Hospital Manager",
      "Medical Operations Executive"
    ]
  },

  // ================= PROFESSIONAL =================
  {
    id: 10,
    shortName: "AI & ML",
    fullName: "Artificial Intelligence and Machine Learning",
    category: "Professional & Certificate Courses",
    icon: "🤖",
    description:
      "Future-ready program focused on intelligent systems and automation.",
    specializations: [
      "Deep Learning",
      "Neural Networks",
      "Computer Vision",
      "NLP"
    ],
    careerPaths: ["AI Engineer", "ML Engineer", "Data Scientist"]
  },
  {
    id: 11,
    shortName: "Cloud Security",
    fullName: "Cloud Computing and Security Management",
    category: "Professional & Certificate Courses",
    icon: "☁️",
    description:
      "Certification program focused on securing cloud infrastructure.",
    specializations: [
      "Cloud Architecture",
      "Cyber Security",
      "Risk Management"
    ],
    careerPaths: ["Cloud Security Engineer", "Cyber Security Analyst"]
  },
  {
    id: 12,
    shortName: "Business Analytics",
    fullName: "Professional Certification in Business Analytics",
    category: "Professional & Certificate Courses",
    icon: "📈",
    description:
      "Program designed to analyze data and drive business decisions.",
    specializations: [
      "Data Visualization",
      "Predictive Analytics",
      "Business Intelligence"
    ],
    careerPaths: ["Business Analyst", "Data Analyst", "Strategy Consultant"]
  },
  {
    id: 13,
    shortName: "Data Science",
    fullName: "Advanced Certification in Data Science",
    category: "Professional & Certificate Courses",
    icon: "📊",
    description:
      "Comprehensive program covering statistics, machine learning, and big data.",
    specializations: [
      "Machine Learning",
      "Big Data",
      "Data Engineering"
    ],
    careerPaths: ["Data Scientist", "Data Engineer", "Analytics Consultant"]
  },
  {
    id: 14,
    shortName: "MBA WX",
    fullName: "MBA for Working Professionals",
    category: "Postgraduate Programs",
    icon: "🧑‍💼",
    description:
      "Dr. D. Y. Patil Vidyapeeth, Pune offers the MBA WX – MBA for Working Professionals, a 24-month postgraduate programme designed for professionals seeking to advance their careers while continuing to work. Delivered through a flexible online learning format, the programme develops skills in management, leadership, strategic decision-making, and emerging business technologies. Offered in collaboration with IFC France and Media School International, the programme provides dual international certification and global exposure, helping learners gain practical business insights and leadership capabilities for today’s global business environment.",
    specializations: [
      "Marketing",
      "HR",
      "FinTech",
      "AI & Machine Learning",
      "Business Analytics",
      "Digital Marketing",
      "Supply Chain Management"
    ],
    careerPaths: []
  },
  {
    id: 15,
    shortName: "CPDM",
    fullName: "Certificate Programme in Digital Marketing",
    category: "Professional & Certificate Courses",
    icon: "📣",
    description:
      "The Certificate Programme in Digital Marketing (CPDM) at Dr. D. Y. Patil Vidyapeeth, Pune is a 6-month online certification programme designed to help learners build practical knowledge of modern digital marketing tools, strategies, and platforms. The programme provides a comprehensive understanding of key areas such as search engine optimization (SEO), social media marketing, integrated marketing communication, and emerging digital technologies. Through interactive online learning and practical assignments, learners gain the skills needed to plan, implement, and manage effective digital marketing campaigns for businesses and brands",
    specializations: ["SEO", "Social Media Marketing", "Digital Strategies"],
    careerPaths: [
      "Digital Marketing Executive",
      "SEO Specialist",
      "Social Media Manager",
      "Performance Marketer"
    ]
  },
  {
    id: 16,
    shortName: "CPHAHM",
    fullName: "Certificate Programme in Hospital & Healthcare Management",
    category: "Professional & Certificate Courses",
    icon: "🏨",
    description:
      "The Certificate Programme in Hospital & Health Care Management (CPHAHM) at Dr. D. Y. Patil Vidyapeeth, Pune is a 6-month online certification programme designed to build foundational knowledge in hospital administration and healthcare management. The programme focuses on key areas such as hospital operations, healthcare services marketing, quality management, and legal aspects of healthcare administration, enabling learners to understand the functioning of healthcare organizations. Through structured online learning, assignments, and assessments, the programme equips students with practical skills to manage hospital departments, support healthcare operations, and contribute effectively to the healthcare industry.",
    specializations: [
      "Hospital Administration",
      "Healthcare Operations",
      "Healthcare Management"
    ],
    careerPaths: []
  },
  {
    id: 17,
    shortName: "BBA_MF",
    fullName: "BBA (Marketing & Finance)",
    category: "Undergraduate Programs",
    icon: "📊",
    description:
      "BACHELOR OF BUSINESS ADMINISTRATION (BBA) - PROGRAMME OVERVIEW\n\nThe Bachelor of Business Administration (BBA) is a three-year undergraduate programme spread across six semesters designed to build a strong foundation in business management and its core functional areas. The programme integrates key concepts from management, finance, marketing, and economics to provide students with a comprehensive understanding of the business landscape. Through a structured curriculum that progresses from foundational subjects such as Principles of Management, Business Communication, Financial Accounting, and Microeconomics to advanced areas like Strategic Management, Project Management, and Business Analytics, students develop critical thinking, analytical, and decision-making skills. With the inclusion of contemporary subjects such as Digital Marketing, Integrated Marketing Communication, and Time Series Forecasting, the programme ensures students are well-equipped to meet evolving industry demands and excel in dynamic business environments.\n\nElectives Offered\n\n1. Marketing & Finance\n\nThis specialization focuses on building expertise in marketing strategy, financial management, and business decision-making, helping students develop strong analytical and managerial capabilities.\n\nHighlights:\n- Strong foundation in core business subjects such as Principles of Management, Business Communication, Financial Accounting, and Microeconomics\n- Exposure to advanced subjects including Strategic Management, Project Management, Operations & Supply Chain Management, and Retail Management\n- Industry-relevant topics such as Digital Marketing, Integrated Marketing Communication, Financial Analysis, and Time Series Forecasting\n- Emphasis on critical thinking, problem-solving, and real-world business application\n- Focus on ethical, sustainable, and socially responsible business practices\n- Prepares students for roles in marketing, finance, consulting, and general management\n\n2. Business Analytics\n\nThis specialization integrates business management with analytical and data-driven approaches, enabling students to make informed business decisions in a technology-driven environment.\n\nHighlights:\n- Specialised learning in Business Analytics and data-driven decision-making\n- Exposure to topics such as Digital Marketing, Integrated Marketing Communication, Financial Analysis, and analytics tools\n- Strong focus on developing analytical, critical thinking, and strategic problem-solving skills\n- Application of data interpretation and forecasting techniques to solve real-world business challenges\n- Curriculum aligned with current industry trends and technological advancements\n- Prepares students for careers in analytics, consulting, IT, and business strategy roles\n\nEligibility\n\nCandidates must have completed 10+2 (or equivalent) from a recognized board. Applicants who have completed a 3-year Diploma after 10th or hold a Bachelor's Degree are also eligible to apply. Candidates must have secured a minimum of 50% marks for General category and 45% marks for reserved categories (SC/ST/OBC/PwD).\n\nProgramme Fee\n- Application Fee: 11,200\n- Total Programme Fee:\n  - BBA (Marketing & Finance): INR 150,000\n  - BBA (Business Analytics): INR 180,000\n\nNo-Cost EMI Option Available\n\nBenefit from our no-cost EMI facility, designed to make financing your education simple and manageable.\n\nScholarships Available\n\nWe offer special scholarship benefits for defence personnel, government employees, differently-abled individuals, and academically outstanding students.",
    specializations: ["Marketing & Finance", "Business Analytics"],
    careerPaths: [
      "Marketing Executive",
      "Financial Analyst",
      "Business Analyst",
      "Consultant",
      "Business Strategy Associate",
      "General Management Trainee"
    ]
  },
  {
    id: 19,
    shortName: "DIPLOMA",
    fullName: "Online Diploma Programmes",
    category: "Professional & Certificate Courses",
    icon: "📘",
    description:
      "Narsee Monjee Institute of Management Studies (NMIMS) Centre for Distance and Online Education (CDOE) one-year online diploma programmes are designed for working professionals seeking to gain specialised, industry-ready skills within a short, focused timeframe. Crafted to accommodate busy schedules, these programmes offer self-paced learning, enabling participants to effectively balance work commitments with studies. Offered in Finance Management, Marketing Management, Business Management, Operations Management, and Human Resource Management, these programmes provide practical, industry-relevant knowledge from one of the nation’s leading online learning institutes, equipping learners to enhance their careers and stay competitive in today’s dynamic professional environment.",
    specializations: [
      "Diploma in Finance Management",
      "Diploma in Marketing Management",
      "Diploma in Business Management",
      "Diploma in Operations Management",
      "Diploma in Human Resource Management"
    ],
    careerPaths: [
      "Financial Auditor",
      "Financial Planning Analyst",
      "Financial Planner",
      "Product Manager",
      "Brand Manager",
      "Business Strategy Manager",
      "Business Development Manager",
      "Account Manager",
      "Operations Manager",
      "Supply Chain Analyst",
      "Process Improvement Manager",
      "Talent Acquisition Manager",
      "Employee Relations Manager",
      "HR Operations Manager"
    ]
  },
  {
    id: 20,
    shortName: "CERTIFICATION",
    fullName: "Certificate in Business Management",
    category: "Professional & Certificate Courses",
    icon: "📜",
    description:
      "Narsee Monjee Institute of Management Studies (NMIMS) Centre for Distance and Online Education (CDOE) offers a six-month Certificate in Business Management, designed for working professionals seeking a strong foundation in management principles and practices within a short, focused timeframe. Crafted for busy schedules, the programme provides self-paced learning, allowing participants to balance work commitments with studies while gaining practical, industry-relevant skills. The curriculum offers a well-rounded introduction to core business concepts, equipping students to analyse business challenges and implement effective management strategies.",
    specializations: ["Business Management"],
    careerPaths: [
      "Business Development Manager",
      "Business Strategy Manager"
    ]
  },
  {
    id: 21,
    shortName: "MSC_DS",
    fullName: "M.Sc Data Science",
    category: "Postgraduate Programs",
    icon: "📊",
    description:
      "The Vellore Institute of Technology (VIT) presents a two-year Online Master of Science in Data Science (M.Sc. Data Science) programme designed to equip professionals with in-demand data analytics and machine learning skills. The programme builds a strong foundation in data science concepts, enhances expertise through specialised electives such as marketing analytics, financial data analytics, and big data analytics, and develops the ability to analyse complex datasets for strategic decision-making. Ideal for working professionals, it combines industry-focused learning with flexible online delivery to boost career versatility, increase earning potential, and prepare learners for leadership roles in the rapidly expanding data-driven job market.",
    specializations: [
      "Data Analytics",
      "Machine Learning",
      "Big Data Analytics",
      "Statistical Analysis"
    ],
    careerPaths: []
  },
  {
    id: 22,
    shortName: "MCOM",
    fullName: "Master of Commerce",
    category: "Postgraduate Programs",
    icon: "📚",
    description:
      "Manipal University Jaipur offers a two-year Online Master of Commerce (MCom) programme designed for graduates seeking advanced knowledge in commerce, finance, and business management. The programme focuses on key areas such as Finance, Accounting, International Business, and Analytics, helping learners build strong analytical and managerial skills for modern business environments. Delivered through a flexible online learning platform, students can access live classes, recorded lectures, and digital study resources from anywhere. The curriculum combines advanced commerce concepts with practical insights to prepare learners for careers in finance, accounting, banking, and global business.",
    specializations: [],
    careerPaths: []
  },
  {
    id: 23,
    shortName: "MSC_MATHS",
    fullName: "M.Sc Mathematics",
    category: "Postgraduate Programs",
    icon: "🧮",
    description:
      "Manipal University Jaipur offers a two-year Online Master of Science (MSc) in Mathematics programme designed to develop advanced knowledge in pure and applied mathematics. The programme strengthens analytical, problem-solving, and research skills through subjects such as linear algebra, differential equations, topology, and optimization, along with electives in emerging interdisciplinary areas. Delivered through a flexible online learning platform, students can access video lectures, virtual classrooms, and interactive study materials. The programme is structured across four semesters with a maximum completion period of four years and includes seminars, electives, and a final project to provide practical and research experience",
    specializations: [
      "Data Science",
      "Computational Science",
      "Econometrics"
    ],
    careerPaths: []
  },
  {
    id: 24,
    shortName: "MA_ECONOMICS",
    fullName: "Master of Arts in Economics",
    category: "Postgraduate Programs",
    icon: "📈",
    description:
      "Manipal University Jaipur offers a two-year online Master of Arts in Economics designed to blend advanced economic theory with practical, real-world applications. The programme focuses on building robust analytical and decision-making skills suitable for a data-driven world, with specialized curriculum paths in Applied and Financial Economics. It is ideal for those seeking impactful careers in research, policy-making, and finance. The programme is delivered through a sophisticated digital learning platform that provides 24x7 access to various educational resources. Structured over four semesters, the curriculum includes core subjects like Microeconomics, Macroeconomics, and Econometrics, along with a final dissertation and diverse elective choices",
    specializations: [
      "Applied Economics",
      "Financial Economics"
    ],
    careerPaths: []
  },
  {
    id: 25,
    shortName: "MAJMC",
    fullName: "MA Journalism & Mass Communication",
    category: "Postgraduate Programs",
    icon: "📰",
    description:
      "The Manipal University Jaipur Online Master of Arts in Journalism & Mass Communication (MA JMC) is a two-year postgraduate program designed to provide a future-ready blend of journalism, digital media, public relations (PR), and communication. It is ideal for individuals looking to lead in the fast-evolving media landscape, offering specializations in key media fields to equip students with practical skills and strategic insights for careers in news, content, and corporate communication",
    specializations: [],
    careerPaths: []
  },
  {
    id: 26,
    shortName: "MA_ENGLISH",
    fullName: "Master of Arts in English",
    category: "Postgraduate Programs",
    icon: "📖",
    description:
      "The Online MA in English offered by Sikkim Manipal University (SMU) is a two-year postgraduate program designed to develop advanced knowledge of English literature, critical theory, and research skills. The curriculum covers major literary forms such as drama, poetry, and fiction, along with specialized areas including American Literature, Indian English Literature, Post-Colonial Literature, and World Literature. Delivered through a technology-enabled learning platform, the program combines academic rigor with flexible online learning. Students benefit from expert faculty guidance, interactive webinars, and research-focused coursework, culminating in a dissertation in the final semester.",
    specializations: [
      "American Literature",
      "Indian Literature",
      "Post-Colonial Literature",
      "World Literature"
    ],
    careerPaths: []
  },
  {
    id: 27,
    shortName: "MA_POLITICAL_SCIENCE",
    fullName: "Master of Arts in Political Science",
    category: "Postgraduate Programs",
    icon: "🏛️",
    description:
      "The Online MA in Political Science offered by Sikkim Manipal University (SMU) is a two-year postgraduate program designed to provide a comprehensive understanding of political theory, governance, and global political dynamics. The curriculum explores key areas such as Indian government and politics, Western political thought, international relations, public policy, and political sociology. Delivered through a flexible online learning platform, the program combines academic rigor with practical insights through expert faculty guidance, interactive sessions, and research-based learning, culminating in a dissertation and viva voce in the final semester.",
    specializations: [
      "Indian Politics",
      "Western Political Thought",
      "International Relations",
      "Public Policy"
    ],
    careerPaths: []
  },
  {
    id: 28,
    shortName: "MA_SOCIOLOGY",
    fullName: "Master of Arts in Sociology",
    category: "Postgraduate Programs",
    icon: "🌐",
    description:
      "The MA in Sociology at Sikkim Manipal University (SMU) is a two-year postgraduate programme that provides a comprehensive understanding of social structures, institutions, and contemporary societal issues. The programme explores key areas such as sociological theories, Indian society, culture, globalization, development, and social movements. Structured across four semesters with 80 credits, it also includes research methodology and a dissertation in the final semester, enabling students to develop strong analytical and research skills through a flexible, technology-enabled learning platform.",
    specializations: [
      "Sociological Theories",
      "Indian Society",
      "Globalization",
      "Social Movements"
    ],
    careerPaths: []
  },
  {
    id: 29,
    shortName: "MA",
    fullName: "Master of Arts",
    category: "Postgraduate Programs",
    icon: "🎓",
    description:
      "The Master of Arts (MA) is a postgraduate academic degree programme designed to provide advanced knowledge and specialised understanding in fields such as psychology, media studies, and public policy. These programmes are structured to bridge theoretical academic frameworks with practical, industry-oriented applications, catering to both fresh graduates and working professionals. By offering flexible, UGC-entitled online learning environments, the MA programme equips students with the critical thinking, research, and professional skills necessary to navigate complex societal issues and excel in their respective careers.",
    specializations: [
      "Journalism & Mass Communication",
      "Psychology",
      "Public Policy & Governance"
    ],
    careerPaths: []
  }
]

const COURSE_BY_ID = new Map(coursesMasterData.map((c) => [c.id, c]))

export function getCourseById(id: number): CourseMaster | undefined {
  return COURSE_BY_ID.get(id)
}

export function getCoursesByIds(ids: number[]): CourseMaster[] {
  return ids
    .map((id) => COURSE_BY_ID.get(id))
    .filter((c): c is CourseMaster => c != null)
}

export function getCoursesByCategory(category: string): CourseMaster[] {
  return coursesMasterData.filter((c) => c.category === category)
}

export const TAB_TO_CATEGORIES: Record<string, string[]> = {
  undergraduate: ["Undergraduate Programs"],
  postgraduate: ["Postgraduate Programs", "Diploma Programs"],
  professional: ["Professional & Certificate Courses"],
}
