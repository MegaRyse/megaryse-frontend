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
      "Designed for students aiming for careers in finance, banking, accounting, and taxation.",
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
