import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const Courses = () => {
  const [activeTab, setActiveTab] = useState('undergraduate')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null)
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null)

  const handleKnowMore = (courseTitle: string) => {
    // You can add navigation or modal logic here
    console.log(`Know more about: ${courseTitle}`)
    // Example: navigate to detailed course page or open modal
  }

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }


  return (
    <div className="w-full bg-offwhite">
      {/* Hero Section */}
      <section className="relative pt-0 pb-0 sm:pt-0 sm:pb-0 md:pt-0 md:pb-0 bg-offwhite overflow-hidden">
        {/* Animated background elements - Responsive sizes */}
        <motion.div
          className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold-bright/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="text-center"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Find the Perfect Course for Your Growth
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Explore our comprehensive range of programs
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="pt-6 pb-2 sm:pt-8 sm:pb-3 md:pt-10 md:pb-4 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { id: 'undergraduate', label: 'Undergraduate Programs' },
              { id: 'postgraduate', label: 'Postgraduate Programs' },
              { id: 'professional', label: 'Professional & Certification Courses' },
            ].map((tab) => (
              <motion.div
                key={tab.id}
                variants={itemVariants}
                className={`relative rounded-lg p-[2px] overflow-hidden w-full sm:w-auto ${
                  activeTab === tab.id ? 'bg-gradient-gold' : ''
                }`}
                onHoverStart={() => setHoveredTab(tab.id)}
                onHoverEnd={() => setHoveredTab(null)}
              >
                {/* Animated glowing border with movement on hover - Only for hover-capable devices */}
                {activeTab !== tab.id && (
                  <>
                    {/* Base gradient border */}
                    <motion.div
                      className="absolute inset-0 z-0 rounded-lg bg-gradient-gold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredTab === tab.id ? 1 : 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.5
                      }}
                    />
                    {/* Animated moving gradient overlay */}
                    <motion.div
                      className="absolute inset-0 z-0 rounded-lg"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #D5AD36, #E8C547, #FAF0E0, transparent)',
                        backgroundSize: '200% 100%',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredTab === tab.id ? 1 : 0,
                        backgroundPosition: hoveredTab === tab.id ? ['-200% 0', '200% 0'] : '-200% 0',
                      }}
                      transition={{
                        opacity: { 
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          mass: 0.5
                        },
                        backgroundPosition: {
                          duration: 2.5,
                          repeat: hoveredTab === tab.id ? Infinity : 0,
                          ease: [0.4, 0, 0.6, 1],
                        },
                      }}
                    />
                    {/* Pulsing glow effect */}
                    <motion.div
                      className="absolute inset-0 z-0 rounded-lg"
                      style={{
                        boxShadow: '0 0 20px rgba(213, 173, 54, 0.6), 0 0 40px rgba(213, 173, 54, 0.4)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredTab === tab.id ? 1 : 0,
                        boxShadow: hoveredTab === tab.id ? [
                          '0 0 20px rgba(213, 173, 54, 0.6), 0 0 40px rgba(213, 173, 54, 0.4)',
                          '0 0 30px rgba(213, 173, 54, 0.8), 0 0 60px rgba(213, 173, 54, 0.6)',
                          '0 0 20px rgba(213, 173, 54, 0.6), 0 0 40px rgba(213, 173, 54, 0.4)',
                        ] : '0 0 20px rgba(213, 173, 54, 0.6), 0 0 40px rgba(213, 173, 54, 0.4)',
                      }}
                      transition={{
                        opacity: { 
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          mass: 0.5
                        },
                        boxShadow: {
                          duration: 2.5,
                          repeat: hoveredTab === tab.id ? Infinity : 0,
                          ease: [0.42, 0, 0.58, 1],
                        },
                      }}
                    />
                  </>
                )}
                <motion.button
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative w-full px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 z-10 ${
                    activeTab === tab.id
                      ? 'bg-gradient-gold text-black shadow-lg'
                      : 'bg-white text-[#00275E]'
                  }`}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {tab.label}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pt-2 pb-12 sm:pt-3 sm:pb-16 md:pt-4 md:pb-20 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
            {currentCourses.map((course, idx) => (
              <motion.div
                  key={`${activeTab}-${idx}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    duration: 0.6,
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -12,
                    transition: { 
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 0.7
                    }
                  }}
                  onHoverStart={() => setHoveredCard(idx)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-100 cursor-pointer relative overflow-hidden group mb-6"
                  onClick={() => handleKnowMore(course.title)}
                >
                  {/* Animated background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold-bright/10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === idx ? 1 : 0 }}
                    transition={{ 
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{ 
                      willChange: hoveredCard === idx ? 'opacity' : 'auto',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  />

                  {/* Shimmer effect on hover - Optimized with GPU acceleration */}
                  {hoveredCard === idx && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                      initial={{ transform: 'translateX(-100%) translateZ(0)' }}
                      animate={{ transform: 'translateX(200%) translateZ(0)' }}
                      transition={{ 
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1],
                        repeat: 1,
                        repeatDelay: 0.3
                      }}
                      style={{ 
                        willChange: 'transform',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                      }}
                    />
                  )}
                  
                  {/* Icon - Static */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 relative z-10">
                    <div className="text-4xl sm:text-5xl md:text-6xl flex-shrink-0">
                      {course.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                        {course.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                        {course.desc}
                      </p>
                      
                    {('specializations' in course) && (
                        <div className="mb-3 sm:mb-4">
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">Specializations:</p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {course.specializations.map((spec, i) => {
                            const specKey = `${activeTab}-${idx}-spec-${i}`
                            const isHovered = hoveredSpec === specKey
                            return (
                              <motion.span
                                key={specKey}
                                className="text-gold px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-[10px] sm:text-xs font-medium cursor-pointer relative overflow-hidden"
                                whileHover={{ 
                                  scale: 1.12, 
                                  y: -2,
                                }}
                                onHoverStart={() => setHoveredSpec(specKey)}
                                onHoverEnd={() => setHoveredSpec(null)}
                                transition={{ 
                                  type: "spring", 
                                  stiffness: 400,
                                  damping: 30,
                                  mass: 0.6
                                }}
                                style={{ 
                                  willChange: 'transform',
                                  transform: 'translateZ(0)',
                                  backfaceVisibility: 'hidden',
                                  WebkitBackfaceVisibility: 'hidden'
                                }}
                              >
                                {/* Base gradient background - always visible */}
                                <motion.span
                                  className="absolute inset-0 rounded-md bg-gradient-gold-soft pointer-events-none"
                                  style={{
                                    zIndex: 0,
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden'
                                  }}
                                  animate={{ 
                                    opacity: isHovered ? 0 : 1
                                  }}
                                  transition={{ 
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1]
                                  }}
                                />
                                {/* Hover blue background */}
                                <motion.span
                                  className="absolute inset-0 rounded-md pointer-events-none"
                                  style={{
                                    backgroundColor: '#00275E',
                                    zIndex: 0,
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden'
                                  }}
                                  animate={{ 
                                    opacity: isHovered ? 1 : 0,
                                    scale: isHovered ? 1 : 0.95,
                                    boxShadow: isHovered ? '0 4px 12px rgba(5, 11, 35, 0.3)' : 'none'
                                  }}
                                  transition={{ 
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1]
                                  }}
                                />
                                {/* Text content */}
                                <motion.span
                                  className="relative z-10 block pointer-events-none"
                                  animate={{ 
                                    color: isHovered ? '#ffffff' : '#C9A978'
                                  }}
                                  transition={{ 
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1]
                                  }}
                                  style={{
                                    willChange: 'color',
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden'
                                  }}
                                >
                              {spec}
                                </motion.span>
                              </motion.span>
                            )
                          })}
                        </div>
                      </div>
                    )}
                      
                    {('topics' in course) && (
                        <div className="mb-3 sm:mb-4">
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">Key Topics:</p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {course.topics.map((topic, i) => {
                            const topicKey = `${activeTab}-${idx}-topic-${i}`
                            const isHovered = hoveredTopic === topicKey
                            return (
                              <motion.span
                                key={topicKey}
                                className="text-gold px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-[10px] sm:text-xs font-medium cursor-pointer relative overflow-hidden"
                                whileHover={{ 
                                  scale: 1.12, 
                                  y: -2,
                                }}
                                onHoverStart={() => setHoveredTopic(topicKey)}
                                onHoverEnd={() => setHoveredTopic(null)}
                                transition={{ 
                                  type: "spring", 
                                  stiffness: 400,
                                  damping: 30,
                                  mass: 0.6
                                }}
                                style={{ 
                                  willChange: 'transform',
                                  transform: 'translateZ(0)',
                                  backfaceVisibility: 'hidden',
                                  WebkitBackfaceVisibility: 'hidden'
                                }}
                              >
                                {/* Base gradient background - always visible */}
                                <motion.span
                                  className="absolute inset-0 rounded-md bg-gradient-gold-soft pointer-events-none"
                                  style={{
                                    zIndex: 0,
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden'
                                  }}
                                  animate={{ 
                                    opacity: isHovered ? 0 : 1
                                  }}
                                  transition={{ 
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1]
                                  }}
                                />
                                {/* Hover blue background */}
                                <motion.span
                                  className="absolute inset-0 rounded-md pointer-events-none"
                                  style={{
                                    backgroundColor: '#00275E',
                                    zIndex: 0,
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden'
                                  }}
                                  animate={{ 
                                    opacity: isHovered ? 1 : 0,
                                    scale: isHovered ? 1 : 0.95,
                                    boxShadow: isHovered ? '0 4px 12px rgba(5, 11, 35, 0.3)' : 'none'
                                  }}
                                  transition={{ 
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1]
                                  }}
                                />
                                {/* Text content */}
                                <motion.span
                                  className="relative z-10 block pointer-events-none"
                                  animate={{ 
                                    color: isHovered ? '#ffffff' : '#C9A978'
                                  }}
                                  transition={{ 
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1]
                                  }}
                                  style={{
                                    willChange: 'color',
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden'
                                  }}
                                >
                              {topic}
                                </motion.span>
                              </motion.span>
                            )
                          })}
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-4 sm:mb-6">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">Career Paths:</p>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{course.careers.join(', ')}</p>
                      </div>
                      
                      {/* Know More Button with Enhanced Animation */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleKnowMore(course.title)
                        }}
                        className="relative px-0 py-0 text-sm sm:text-base font-semibold text-gold inline-flex items-center gap-1.5 sm:gap-2 bg-transparent hover:bg-transparent group/btn"
                        whileHover={{ scale: 1.08, x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 500,
                          damping: 25,
                          mass: 0.6
                        }}
                        style={{ willChange: 'transform' }}
                      >
                        {/* Button text with underline */}
                        <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                          <motion.span 
                            className="relative text-sm sm:text-base group-hover/btn:text-base sm:group-hover/btn:text-lg group-hover/btn:font-bold transition-all duration-300 text-gold"
                            animate={hoveredCard === idx ? { 
                              color: '#C9A978',
                              fontWeight: 700
                            } : {}}
                          >
                            Know More
                            {/* Animated blue underline */}
                            <motion.span
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00275E] origin-left"
                              initial={{ scaleX: 0 }}
                              animate={hoveredCard === idx ? { scaleX: 1 } : { scaleX: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                            />
                          </motion.span>
                          <motion.span
                            className="text-gold inline-block text-base sm:text-lg"
                            animate={hoveredCard === idx ? { 
                              x: [0, 8, 0, -4, 0],
                              scale: [1, 1.2, 1, 1.1, 1]
                            } : { 
                              x: 0,
                              scale: 1
                            }}
                            transition={{ 
                              duration: 1.5,
                              repeat: Infinity,
                              ease: [0.4, 0, 0.6, 1]
                            }}
                            style={{ 
                              willChange: 'transform',
                              transform: 'translateZ(0)'
                            }}
                          >
                            →
                          </motion.span>
                        </span>
                      </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default Courses
