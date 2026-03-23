import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import { CareersFormModal } from '../components/careersFormModal'
import ShinyText from '../animatedComponents/ShinyText'

interface Benefit {
  title: string
  description: string
  icon: string
}

const BenefitCard = ({ benefit, idx }: { benefit: Benefit; idx: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="rounded-xl p-5 sm:p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
      style={{
        backgroundColor: isHovered ? '#00275E' : '#ffffff'
      }}
    >
      <div className="text-5xl mb-4">{benefit.icon}</div>
      <h3 
        className="text-xl sm:text-2xl font-bold mb-3 transition-colors duration-300"
        style={{ color: isHovered ? '#ffffff' : '#111827' }}
      >
        {benefit.title}
      </h3>
      <p 
        className="leading-relaxed transition-colors duration-300"
        style={{ color: isHovered ? '#E5E7EB' : '#4B5563' }}
      >
        {benefit.description}
      </p>
    </motion.div>
  )
}

const Careers = () => {
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [applyPositionTitle, setApplyPositionTitle] = useState<string | undefined>(undefined)

  const openApplyModal = useCallback((positionTitle?: string) => {
    setApplyPositionTitle(positionTitle)
    setApplyModalOpen(true)
  }, [])
  const closeApplyModal = useCallback(() => setApplyModalOpen(false), [])

  const positions = [
    {
      title: 'Education Counselor',
      description: 'Help learners choose the right career paths and programs',
      department: 'Student Services',
      location: 'Remote / Hybrid',
      type: 'Full-time',
    },
    {
      title: 'Digital Marketing Executive',
      description: 'Plan and execute impactful digital campaigns.',
      department: 'Marketing',
      location: 'Bangalore',
      type: 'Full-time',
    },
    {
      title: 'Business Development Manager',
      description: 'Build partnerships and drive business growth.',
      department: 'Business Development',
      location: 'Mumbai',
      type: 'Full-time',
    },
    {
      title: 'Student Support Executive',
      description: 'Assist students with admissions and ongoing support.',
      department: 'Student Services',
      location: 'Remote',
      type: 'Full-time',
    },
  ]

  const benefits = [
    {
      title: 'Innovative Work Culture',
      description: 'Be part of a team that is transforming education and making a real impact.',
      icon: '💡',
    },
    {
      title: 'Career Growth & Learning',
      description: 'Upskill, evolve, and grow with every opportunity.',
      icon: '📈',
    },
    {
      title: 'Collaborative Environment',
      description: 'Work alongside motivated, passionate professionals who support each other.',
      icon: '🤝',
    },
  ]

  return (
    <div className="w-full bg-offwhite">
      {/* Hero Section */}
      <section className="relative pt-0 pb-0 sm:pt-0 sm:pb-0 md:pt-0 md:pb-0 bg-offwhite overflow-hidden">
        {/* Animated background elements */}
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
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 max-md:whitespace-normal md:whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >Build Your Career with <span className="relative inline-block">
              <ShinyText
                text="MegaRyse EduCntr"
                speed={2}
                delay={0}
                color="#D9B23A"
                shineColor="#E8C547"
                spread={35}
                direction="right"
                yoyo
                pauseOnHover={false}
                disabled={false}
              />
            </span></motion.h1>
            <motion.p
              className="text-base sm:text-lg text-gray-600 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              At MegaRyse EduCntr, we’re driven by one mission—empowering students and professionals to achieve their career aspirations. If you’re seeking a fast-growing, purpose-driven workplace where your ideas matter and your impact is visible, you’ll feel right at home with us.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="pt-6 pb-8 sm:pt-8 sm:pb-10 md:pt-10 md:pb-12 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Why Work With Us?</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Join a team that's making a difference in education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
            {benefits.map((benefit, idx) => (
              <BenefitCard key={idx} benefit={benefit} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Current Openings</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Explore opportunities to join our growing team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {positions.map((position, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{position.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{position.description}</p>
                <div className="space-y-2 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{position.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🏢</span>
                    <span>{position.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⏰</span>
                    <span>{position.type}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openApplyModal(position.title)}
                  className="inline-block bg-gradient-gold text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 sm:mt-10 md:mt-12 bg-gradient-gold-soft rounded-xl p-6 sm:p-8 text-center"
          >
            <div className="text-4xl mb-4">💡</div>
            <p className="text-lg text-gray-700 mb-4">
              Don't see a role that fits? We're always looking for talented individuals!
            </p>
            <p className="text-gray-600 mb-6">
              Send us your resume, and we'll get in touch.
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Apply Now:</strong> hr@megaryse.com</p>
              <p><strong>Call Us:</strong> +918431867374</p>
            </div>
          </motion.div>
        </div>
      </section>

      <CareersFormModal
        isOpen={applyModalOpen}
        onClose={closeApplyModal}
        positionTitle={applyPositionTitle}
      />
    </div>
  )
}

export default Careers

