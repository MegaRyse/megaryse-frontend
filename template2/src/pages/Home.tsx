import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, useAnimationFrame } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import HeroImg2 from '../assets/images/Hero_Img2.png'

// Component for animated stat card (unchanged)
const AnimatedStatCard = ({
  stat,
  idx,
}: {
  stat: { number: string; label: string; icon: string }
  idx: number
}) => {
  const parseNumber = (numStr: string) => {
    if (numStr.includes('k+')) {
      const num = parseInt(numStr.replace('k+', ''))
      return { value: num * 1000, suffix: 'k+' }
    } else if (numStr.includes('+')) {
      const num = parseInt(numStr.replace('+', ''))
      return { value: num, suffix: '+' }
    } else if (numStr.includes('%')) {
      const num = parseInt(numStr.replace('%', ''))
      return { value: num, suffix: '%' }
    }
    return { value: 0, suffix: '' }
  }

  const { value, suffix } = parseNumber(stat.number)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps

    let currentStep = 0
    let intervalId: ReturnType<typeof setInterval> | null = null

    const timer = setTimeout(() => {
      intervalId = setInterval(() => {
        currentStep++
        if (currentStep <= steps) {
          setCount(Math.min(Math.floor(increment * currentStep), value))
        } else {
          setCount(value)
          if (intervalId) clearInterval(intervalId)
        }
      }, stepDuration)
    }, idx * 100 + 600)

    return () => {
      clearTimeout(timer)
      if (intervalId) clearInterval(intervalId)
    }
  }, [value, idx])

  const formatNumber = (num: number) => {
    if (suffix === 'k+') {
      return `${Math.floor(num / 1000)}${suffix}`
    }
    return `${num}${suffix}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      whileHover={{
        y: -10,
        scale: 1.05,
        backgroundColor: '#F5F2EA',
        borderColor: '#000080',
        borderWidth: '1px',
        transition: { duration: 0.3 },
      }}
      style={{ backgroundColor: '#050B23' }}
      className="rounded-2xl p-6 shadow-lg text-center group relative overflow-hidden w-full max-w-xs"
    >
      <div className="relative">
        <div className="text-3xl mb-3">{stat.icon}</div>
        <div className="text-4xl font-bold mb-2 text-white group-hover:text-navy transition-colors duration-300">
          {formatNumber(count)}
        </div>
        <div className="font-medium text-sm text-white/90 group-hover:text-navy transition-colors duration-300">
          {stat.label}
        </div>
      </div>
    </motion.div>
  )
}

const Home = () => {
  const featuresRef = useRef<HTMLDivElement | null>(null)

  // Scroll progress for Features section
  const { scrollYProgress } = useScroll({
    target: featuresRef,
    offset: ['start start', 'end end'],
  })

  const SHRINK_START = 0.2
  const SHRINK_END = 0.8

  // 🎯 FIXED HEIGHTS - No more dynamic vh calculations
  const FIXED_FULL_HEIGHT = '80vh'  // Full height before shrink
  const FIXED_SHRUNK_HEIGHT = '50vh'  // Shrunk height after animation

  // Right visual shrinks smoothly (WIDTH)
  const visualWidth = useTransform(
    scrollYProgress,
    [0, SHRINK_START, SHRINK_END],
    ['100%', '100%', '50%'],
  )

  // Right HEIGHT - Fixed values only
  const rightHeightAnim = useTransform(
    scrollYProgress,
    [0, SHRINK_START, SHRINK_END, 1],
    [FIXED_FULL_HEIGHT, FIXED_FULL_HEIGHT, FIXED_SHRUNK_HEIGHT, FIXED_SHRUNK_HEIGHT]
  )

  // Left width grows as right shrinks
  const leftWidth = useTransform(
    scrollYProgress,
    [SHRINK_START, SHRINK_END],
    ['0%', '50%'],
  )

  // Left HEIGHT - Fixed values matching right
  const leftHeightAnim = useTransform(
    scrollYProgress,
    [0, SHRINK_START, SHRINK_END],
    [FIXED_FULL_HEIGHT, FIXED_FULL_HEIGHT, FIXED_SHRUNK_HEIGHT]
  )

  // Left opacity reveal
  const leftOpacity = useTransform(
    scrollYProgress,
    [SHRINK_START + 0.1, SHRINK_START + 0.3],
    [0, 1],
  )

  // LEFT SIDE SLIDE-IN
  const leftX = useTransform(
    scrollYProgress,
    [SHRINK_START, SHRINK_START + 0.2],
    ['-100%', '0%'],
  )

  const features = [
    {
      title: 'Expert Career Counseling',
      description:
        'Our experienced counselors provide personalized guidance tailored to your career aspirations and goals.',
      icon: '🎯',
      link: '/courses',
      linkText: 'Career Counseling Services',
    },
    {
      title: 'Wide Range of Programs',
      description:
        'Choose from hundreds of programs across management, technology, arts, and sciences from top universities.',
      icon: '📚',
      link: '/courses',
      linkText: 'Explore Programs',
    },
    {
      title: 'Seamless Admission Process',
      description:
        'We handle all the paperwork and documentation, making your admission process smooth and hassle-free.',
      icon: '✅',
      link: '/contact',
      linkText: 'Get Started',
    },
  ]

  // Testimonial auto-scroll state
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)

  const testimonials = [
    {
      name: 'Heena',
      role: 'MBA Graduate',
      text: "MegaRyse helped me choose the perfect MBA program that aligned with my career goals. The expert guidance and seamless admission process made everything so easy. Today, I'm in a leadership role, thanks to their support!",
      rating: 5,
    },
    {
      name: 'Smirthi',
      role: 'BCA Student',
      text: 'I was confused about which course to pursue, but the counselors at MegaRyse made it simple. They guided me through the BCA program selection and enrollment process effortlessly. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Ashok',
      role: 'Executive MBA',
      text: 'As a working professional, I needed a course that fit my schedule and career goals. MegaRyse recommended an Executive MBA, and it has truly boosted my career. Thank you for making my upskilling journey smooth!',
      rating: 5,
    },
  ]

  const duplicatedTestimonials = [...testimonials, ...testimonials]

  useAnimationFrame((time, delta) => {
    if (!isHovered) {
      const speed = 0.1
      x.set(x.get() - delta * speed)
      if (x.get() <= -(testimonials.length * 400)) {
        x.set(0)
      }
    }
  })

  return (
    <div className="w-full bg-offwhite">
      {/* Hero Section - unchanged */}
      <section className="relative pt-0 pb-32 md:pt-0 md:pb-40 bg-offwhite overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-offwhite via-offwhite/95 to-offwhite"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-bright/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-bright/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-start relative"
            >
              <div className="relative">
                <img
                  src={HeroImg2}
                  alt="Hero"
                  className="w-full max-w-lg h-auto object-contain relative z-10"
                />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/15 blur-xl rounded-4xl"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <span className="bg-navy text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Trusted by 10,000+ Students
                </span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
                Transform Your Future with
                <span className="block mt-4 relative">
                  <span className="text-black">World-Class Education</span>
                  <motion.span
                    className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-gold-bright/40 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>
              </h1>
              <p className="text-xl text-black mb-12 leading-relaxed max-w-3xl mx-auto">
                Join thousands of successful professionals who chose MegaRyse for their career
                transformation journey
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/courses"
                  className="inline-block bg-gold text-white px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-gold hover:to-gold-bright"
                >
                  Explore Programs
                </Link>
                <Link
                  to="/contact"
                  className="inline-block border-2 border-gold-bright text-black px-10 py-5 rounded-full font-semibold text-lg hover:bg-navy hover:text-white hover:border-navy transition-all duration-300"
                >
                  Schedule Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats - unchanged */}
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {(() => {
                const establishmentDate = new Date('2024-11-04')
                const currentDate = new Date()
                const yearsDiff = currentDate.getFullYear() - establishmentDate.getFullYear()
                const monthsDiff = currentDate.getMonth() - establishmentDate.getMonth()
                const daysDiff = currentDate.getDate() - establishmentDate.getDate()

                let yearsOfExperience = yearsDiff
                if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
                  yearsOfExperience = yearsDiff - 1
                }
                if (yearsOfExperience < 0) {
                  yearsOfExperience = 0
                }

                return [
                  { number: `${yearsOfExperience}+`, label: 'Years Experience', icon: '📅' },
                  { number: '10k+', label: 'Students', icon: '👥' },
                  { number: '50+', label: 'Universities', icon: '🏛️' },
                  { number: '95%', label: 'Success Rate', icon: '⭐' },
                ]
              })().map((stat, idx) => (
                <AnimatedStatCard key={idx} stat={stat} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION - FIXED HEIGHTS ========== */}
      <section ref={featuresRef} className="py-32 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Why Choose{' '}
              <span className="relative">
                <span className="text-black">MegaRyse?</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold-bright/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Your trusted partner in achieving academic and career excellence
            </p>
          </motion.div>

          {/* Fixed height container for pinning */}
          <div className="relative h-[200vh]">
            <motion.div
              style={{ 
                position: 'sticky', 
                top: 0, 
                height: FIXED_FULL_HEIGHT  // 🎯 FIXED STICKY HEIGHT
              }}
              className="w-full h-full flex items-center relative overflow-hidden"
            >
              {/* LEFT SIDE: Fixed height container */}
              <div className="w-1/2 h-full flex items-center overflow-hidden pr-10">
                <motion.div
                  style={{
                    width: '100%',
                    opacity: leftOpacity,
                    x: leftX,
                    height: leftHeightAnim,  // 🎯 FIXED ANIMATED HEIGHT
                  }}
                  className="space-y-8 w-full flex flex-col justify-center px-4"  // 🎯 Fixed content positioning
                >
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all flex-shrink-0 max-w-sm mx-auto"  // 🎯 Fixed card sizing
                    >
                      <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                        <span className="text-xl">{feature.icon}</span>
                        {feature.title}
                      </h3>
                      <p className="text-lg leading-relaxed mb-6">{feature.description}</p>
                      <Link
                        to={feature.link}
                        className="inline-flex items-center gap-2 text-gold-bright font-semibold hover:gap-4 transition-all"
                      >
                        {feature.linkText}
                        <span className="text-gold-bright transition-transform hover:translate-x-1">→</span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT VISUAL: Fixed height container */}
              <motion.div
                style={{ 
                  width: visualWidth,
                  height: rightHeightAnim,  // 🎯 FIXED ANIMATED HEIGHT
                }}
                className="ml-auto flex items-center justify-center flex-shrink-0"
              >
                <div 
                  className="bg-navy rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden flex flex-col justify-center items-center w-full h-full max-w-2xl"
                  style={{ height: '100%' }}  // 🎯 Fill exact parent height
                >
                  <div className="text-6xl lg:text-7xl mb-6 animate-pulse">🎓</div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 px-4">Your Success Journey</h3>
                  <p className="text-white/90 text-base lg:text-lg px-4 leading-relaxed">Transforming dreams into reality</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section - unchanged */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Discover Your{' '}
              <span className="relative">
                <span className="text-black">Perfect Program</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold-bright/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Explore our comprehensive range of courses designed to boost your career
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'MBA', desc: 'Master of Business Administration', icon: '💼' },
              { title: 'MSC', desc: 'Master of Science', icon: '🔬' },
              { title: 'MCA', desc: 'Master of Computer Applications', icon: '💻' },
              { title: 'BBA', desc: 'Bachelor of Business Administration', icon: '📊' },
              { title: 'B.Com', desc: 'Bachelor of Commerce', icon: '💰' },
              { title: 'BCA', desc: 'Bachelor of Computer Applications', icon: '⌨️' },
            ].map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-navy rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-bright/20 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">{program.icon}</div>
                  <h3 className="text-3xl font-bold text-white mb-3">{program.title}</h3>
                  <p className="text-white/90 mb-6">{program.desc}</p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 text-gold-bright font-semibold hover:gap-4 transition-all group-hover:underline decoration-gold-bright"
                  >
                    Learn More
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - unchanged */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Success{' '}
              <span className="relative">
                <span className="text-black">Stories</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold-bright/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </h2>
            <p className="text-xl text-black">
              Real experiences from our students and professionals
            </p>
          </motion.div>

          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div 
              className="flex gap-8 py-4"
              style={{ 
                x,
                display: 'flex',
              }}
            >
              {duplicatedTestimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: Math.min(idx * 0.1, 0.3) }}
                  whileHover={{ 
                    y: -5,
                    scale: 1.02,
                    zIndex: 10
                  }}
                  className="bg-navy rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-gold-bright transition-all flex-shrink-0 w-full max-w-sm hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-gold-bright text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-white/90 mb-6 leading-relaxed italic text-sm">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{testimonial.name}</div>
                      <div className="text-sm text-white/80">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - unchanged */}
      <section className="py-24 bg-gradient-to-r from-offwhite via-offwhite to-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-navy rounded-3xl p-12 md:p-16 shadow-2xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-gold/10"></div>
            <div className="relative">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join thousands of successful professionals. Let's build your future together!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="inline-block bg-gold text-white px-12 py-5 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-gold hover:to-gold-bright"
                >
                  Get Started Today
                </Link>
                <Link
                  to="/courses"
                  className="inline-block border-2 border-gold-bright text-white px-12 py-5 rounded-full font-semibold text-lg hover:bg-gold-bright hover:text-navy transition-all duration-300"
                >
                  Browse Programs
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
