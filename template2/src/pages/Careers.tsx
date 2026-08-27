import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import { Lightbulb, TrendingUp, Users } from 'lucide-react'
import { CareersFormModal } from '../components/careersFormModal'
import ShinyText from '../animatedComponents/ShinyText'
import { OptimizedImage } from '../components/OptimizedImage'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import whyWorkWithUsBg from '../assets/images/careers/why-work-with-us-bg.jpg'

type BenefitIconKey = 'culture' | 'growth' | 'collaborative'

interface Benefit {
  title: string
  description: string
  iconKey: BenefitIconKey
}

interface Position {
  title: string
  description: string
  department: string
  location: string
  type: string
}

const POSITIONS: Position[] = [
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

const BENEFITS: Benefit[] = [
  {
    title: 'Innovative Work Culture',
    description: 'Be part of a team that is transforming education and making a real impact.',
    iconKey: 'culture',
  },
  {
    title: 'Career Growth & Learning',
    description: 'Upskill, evolve, and grow with every opportunity.',
    iconKey: 'growth',
  },
  {
    title: 'Collaborative Environment',
    description: 'Work alongside motivated, passionate professionals who support each other.',
    iconKey: 'collaborative',
  },
]

const BENEFIT_ICONS: Record<
  BenefitIconKey,
  typeof Lightbulb
> = {
  culture: Lightbulb,
  growth: TrendingUp,
  collaborative: Users,
}

function BenefitAnimatedIcon({
  iconKey,
  isHovered,
  reduceMotion,
}: {
  iconKey: BenefitIconKey
  isHovered: boolean
  reduceMotion: boolean
}) {
  const Icon = BENEFIT_ICONS[iconKey]

  const iconMotion =
    iconKey === 'culture'
      ? { opacity: isHovered ? 1 : [0.85, 1, 0.85], scale: isHovered ? 1.1 : [1, 1.06, 1] }
      : iconKey === 'growth'
        ? { y: isHovered ? -4 : [0, -5, 0], scale: isHovered ? 1.08 : 1 }
        : { scale: isHovered ? 1.12 : [1, 1.05, 1] }

  return (
    <motion.div
      className={`mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-md ring-1 ring-white/40 ${
        isHovered
          ? 'bg-gradient-to-br from-gold-bright to-gold'
          : 'bg-gradient-to-br from-gold to-gold-bright'
      }`}
      animate={reduceMotion ? undefined : isHovered ? { scale: 1.06, rotate: 2 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      <motion.div
        animate={reduceMotion ? undefined : iconMotion}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: iconKey === 'growth' ? 1.6 : 2.4,
                repeat: isHovered ? 0 : Infinity,
                ease: 'easeInOut',
              }
        }
      >
        <Icon className="h-7 w-7 text-[#0F162D]" strokeWidth={2.25} aria-hidden />
      </motion.div>
    </motion.div>
  )
}

const BenefitCard = ({ benefit, idx }: { benefit: Benefit; idx: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const reduceMotion = usePrefersReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`flex h-full min-h-0 cursor-pointer flex-col items-center rounded-2xl border p-5 text-center shadow-lg backdrop-blur-md transition-all duration-300 sm:p-6 md:p-7 ${
        isHovered
          ? 'border-gold/50 bg-[#00275E]/92 shadow-xl'
          : 'border-white/35 bg-white/75 hover:border-white/50 hover:bg-white/85'
      }`}
    >
      <BenefitAnimatedIcon
        iconKey={benefit.iconKey}
        isHovered={isHovered}
        reduceMotion={reduceMotion}
      />
      <h3
        className={`mb-3 text-lg font-bold leading-snug transition-colors duration-300 sm:text-xl ${
          isHovered ? 'text-white' : 'text-gray-900'
        }`}
      >
        {benefit.title}
      </h3>
      <p
        className={`max-w-[18rem] flex-1 text-sm leading-relaxed transition-colors duration-300 sm:text-base ${
          isHovered ? 'text-white/90' : 'text-gray-600'
        }`}
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
  const closeApplyModal = useCallback(() => {
    setApplyModalOpen(false)
    setApplyPositionTitle(undefined)
  }, [])

  return (
    <div className="w-full bg-offwhite">
      {/* Hero + Why Work With Us — fills first viewport (below sticky nav) on md+ */}
      <div className="flex flex-col max-md:min-h-0 md:min-h-[calc(100svh-6rem)] lg:min-h-[calc(100svh-7rem)]">
      {/* Hero Section */}
      <section className="relative shrink-0 overflow-hidden bg-offwhite pb-0 pt-0">
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
              className="mx-auto max-w-2xl px-2 text-sm leading-relaxed text-gray-600 sm:text-[0.9375rem] md:max-w-3xl md:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              At MegaRyse EduCntr, we’re driven by one mission empowering students and professionals to achieve their career aspirations. If you’re seeking a fast growing, purpose driven workplace where your ideas matter and your impact is visible, you’ll feel right at home with us.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="relative flex min-h-0 flex-1 flex-col px-4 pb-4 pt-2 sm:px-6 sm:pb-5 sm:pt-3 lg:px-8 lg:pb-6">
        <div className="relative mx-auto flex h-full min-h-0 w-full max-w-container flex-1 flex-col overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10 sm:rounded-3xl">
          <OptimizedImage
            src={whyWorkWithUsBg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <div className="relative flex h-full min-h-0 flex-1 flex-col px-4 py-5 sm:px-6 sm:py-6 md:py-7 lg:px-8 lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4 shrink-0 text-center sm:mb-5 md:mb-6"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">Why Work With Us?</h2>
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto px-1">
                Join a team that's making a difference in education
              </p>
            </motion.div>

            <div className="grid flex-1 grid-cols-1 content-center items-stretch gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
              {BENEFITS.map((benefit, idx) => (
                <BenefitCard key={idx} benefit={benefit} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>

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
            {POSITIONS.map((position, idx) => (
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

