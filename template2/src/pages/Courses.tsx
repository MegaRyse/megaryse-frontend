import { motion } from 'framer-motion'
import { useState } from 'react'

const Courses = () => {
  const [activeTab, setActiveTab] = useState('undergraduate')

  const courses = {
    undergraduate: [
      {
        title: 'Bachelor of Commerce (B.Com)',
        desc: 'Designed for students aiming for careers in finance, banking, accounting, and taxation.',
        specializations: ['Accounting', 'Finance', 'Banking', 'Taxation', 'Auditing'],
        careers: ['Chartered Accountant (CA)', 'Financial Analyst', 'Banker', 'Investment Consultant'],
        icon: '💰',
      },
      {
        title: 'Bachelor of Business Administration (BBA)',
        desc: 'Comprehensive business management program with leadership, marketing, finance, and HR skills.',
        specializations: ['Marketing', 'HR', 'Finance', 'International Business'],
        careers: ['Business Analyst', 'Marketing Manager', 'HR Executive', 'Entrepreneur'],
        icon: '📊',
      },
      {
        title: 'Bachelor of Computer Applications (BCA)',
        desc: 'Ideal for tech-savvy students building a career in IT.',
        specializations: ['AI & Machine Learning', 'Cybersecurity', 'Data Science', 'Cloud Computing'],
        careers: ['Software Developer', 'Data Scientist', 'IT Consultant', 'Web Developer'],
        icon: '💻',
      },
      {
        title: 'Bachelor of Arts (BA)',
        desc: 'Versatile degree providing in-depth knowledge in humanities and communication.',
        specializations: ['English', 'Political Science', 'Sociology', 'Psychology', 'Journalism'],
        careers: ['Content Writer', 'Journalist', 'Public Relations Officer', 'Civil Services'],
        icon: '📖',
      },
    ],
    postgraduate: [
      {
        title: 'Master of Business Administration (MBA)',
        desc: 'Highly sought-after degree for professionals looking to step into leadership roles.',
        specializations: ['Marketing', 'Finance', 'HR', 'Operations', 'International Business'],
        careers: ['Business Consultant', 'Marketing Director', 'Financial Manager', 'CEO'],
        icon: '💼',
      },
      {
        title: 'Master of Computer Applications (MCA)',
        desc: 'Designed for IT professionals who want to deepen their knowledge in advanced computing.',
        specializations: ['AI & ML', 'Full Stack Development', 'Cloud Computing', 'Cybersecurity'],
        careers: ['Software Engineer', 'AI Developer', 'System Analyst', 'IT Project Manager'],
        icon: '⌨️',
      },
      {
        title: 'Master of Arts (MA)',
        desc: 'Advanced degree for individuals interested in research, teaching, or government services.',
        specializations: ['English Literature', 'Political Science', 'Sociology', 'History', 'Psychology'],
        careers: ['Lecturer', 'Research Analyst', 'Public Policy Advisor', 'Editor'],
        icon: '📚',
      },
      {
        title: 'Master of Science (MSC)',
        desc: 'Program focused on research and technical expertise in various scientific domains.',
        specializations: ['Biotechnology', 'Environmental Science', 'IT', 'Physics', 'Chemistry'],
        careers: ['Research Scientist', 'Data Analyst', 'Lab Technician', 'Environmental Consultant'],
        icon: '🔬',
      },
    ],
    professional: [
      {
        title: 'Executive MBA',
        desc: 'Tailored for mid-career professionals aiming for leadership and managerial roles.',
        topics: ['Strategic Management', 'Financial Planning', 'Business Operations'],
        careers: ['Business Director', 'Senior Manager', 'Entrepreneur', 'CEO'],
        icon: '🎯',
      },
      {
        title: 'Data Science & Analytics',
        desc: 'Cutting-edge course covering big data, machine learning, and AI-driven decision-making.',
        topics: ['Python', 'R', 'SQL', 'Data Visualization', 'Machine Learning'],
        careers: ['Data Scientist', 'AI Engineer', 'Business Intelligence Analyst'],
        icon: '📈',
      },
      {
        title: 'Digital Marketing',
        desc: 'Learn the latest trends in SEO, social media, content marketing, and online advertising.',
        topics: ['SEO', 'Social Media Ads', 'PPC', 'Email Marketing', 'E-commerce Strategies'],
        careers: ['Digital Marketing Manager', 'SEO Specialist', 'Content Strategist'],
        icon: '📱',
      },
      {
        title: 'Project Management',
        desc: 'Essential for professionals managing projects across industries.',
        topics: ['Agile & Scrum', 'Risk Management', 'Leadership', 'Time Management'],
        careers: ['Project Manager', 'Scrum Master', 'Product Owner', 'Operations Manager'],
        icon: '✅',
      },
    ],
  }

  const currentCourses = courses[activeTab as keyof typeof courses]

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold-bright/5"></div>
        <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Find the Perfect Course for Your Growth</h1>
            <p className="text-xl text-gray-600">Explore our comprehensive range of programs</p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'undergraduate', label: 'Undergraduate Programs' },
              { id: 'postgraduate', label: 'Postgraduate Programs' },
              { id: 'professional', label: 'Professional & Certification Courses' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-gold text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {currentCourses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex items-start gap-6">
                  <div className="text-6xl">{course.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{course.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{course.desc}</p>
                    {('specializations' in course) && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-900 mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-2">
                          {course.specializations.map((spec, i) => (
                            <span key={i} className="bg-gradient-gold-soft text-gold px-3 py-1 rounded-md text-xs font-medium">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {('topics' in course) && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-900 mb-2">Key Topics:</p>
                        <div className="flex flex-wrap gap-2">
                          {course.topics.map((topic, i) => (
                            <span key={i} className="bg-gradient-gold-soft text-gold px-3 py-1 rounded-md text-xs font-medium">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">Career Paths:</p>
                      <p className="text-gray-600 text-sm">{course.careers.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Courses

