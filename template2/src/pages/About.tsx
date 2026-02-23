import { useEffect } from 'react'
import { motion } from 'framer-motion'
import trustedEducationImg from '../assets/images/trustededucation.png'
import careerFocusedImg from '../assets/images/careerfocused.png'
import successImg from '../assets/images/sucess.png'
import valueDrivenImg from '../assets/images/valuedriven.png'
import supportImg from '../assets/images/support.png'
import personalizedImg from '../assets/images/personalized.png'
import easyApplyImg from '../assets/images/easyapply.png'
import globalEducationImg from '../assets/images/globaleducation.png'

const EDGE_IMAGES = [
  trustedEducationImg,
  careerFocusedImg,
  successImg,
  valueDrivenImg,
  supportImg,
  personalizedImg,
  easyApplyImg,
  globalEducationImg,
]

const MEGA_RYSE_EDGE = [
  { title: 'Education Backed by Credibility', description: "We don't just offer courses—we connect you with accredited programs from reputed universities, ensuring your qualification carries real academic and professional recognition.", image: trustedEducationImg },
  { title: 'Built for Real Careers, Not Just Certificates', description: 'Every program is curated to match current industry expectations, helping you gain skills that translate directly into career growth and better opportunities.', image: careerFocusedImg },
  { title: 'Designed Around Your Work Life', description: 'Our flexible learning model fits seamlessly into your schedule, allowing you to study without stepping away from your job or personal commitments.', image: successImg },
  { title: 'Honest Pricing, Maximum Value', description: 'No hidden costs, no fine print. We offer affordable programs with complete fee transparency so you can plan your education with confidence.', image: valueDrivenImg },
  { title: 'Support That Goes Beyond Admission', description: "Our relationship doesn't end at enrollment. From counselling to onboarding and continuous academic coordination, we stay with you at every step.", image: supportImg },
  { title: 'Guidance Tailored to You', description: 'We take time to understand your background and ambitions, helping you choose a program that truly aligns with your long-term career goals.', image: personalizedImg },
  { title: 'Simple, Stress-Free Admissions', description: "We handle the complexities so you don't have to—making the entire admission process smooth, fast, and hassle-free.", image: easyApplyImg },
  { title: 'Learn Without Boundaries', description: 'With our digital-first approach, you can access quality education anytime, anywhere, and progress at a pace that suits you.', image: globalEducationImg },
]

const STATS = [
  { number: '10k+', label: 'Students Enrolled' },
  { number: '4k+', label: 'Active Students' },
  { number: '50+', label: 'Partner Universities' },
  { number: '95%', label: 'Success Rate' },
]

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  return (
    <div className="w-full bg-offwhite">
      {/* Hero — off-white background, viewport-triggered animation */}
      <section className="relative bg-offwhite pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px', amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4"
            >
              About <span className="bg-gradient-gold bg-clip-text text-transparent">MegaRyse</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600"
            >
              Leading MBA education consultancy dedicated to transforming careers through world-class business education.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Intro + Experience — two-column on large, stacked on small */}
      <section className="py-12 sm:py-16 md:py-20 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <motion.aside
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px', amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="bg-gradient-to-br from-gold to-gold-bright rounded-2xl p-8 text-center shadow-lg border border-gold-bright/30">
                <div className="text-5xl sm:text-6xl font-bold text-white mb-1 drop-shadow-sm">12+</div>
                <div className="text-white/95 font-semibold text-lg">Years Of Experience</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/20 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">👨‍🎓</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/20 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">👩‍🎓</div>
                </div>
              </div>
            </motion.aside>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px', amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8"
            >
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  MegaRyse EduCntr is a next-generation EdTech startup committed to redefining higher education through accredited online degree and certification programs designed for today's fast-evolving career landscape. We understand the needs of modern learners—balancing work, personal commitments, and career growth—and create learning pathways that are flexible, accessible, and outcome-driven.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  By partnering with leading universities and institutions, MegaRyse EduCntr delivers high-quality, industry-relevant programs that combine academic excellence with real-world applicability. Our offerings are structured to be affordable without compromising on credibility, ensuring learners gain recognized qualifications that add real value to their professional journey.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  From personalized counseling and seamless enrollment to continuous learner support, we guide students at every stage of their educational journey. At MegaRyse EduCntr, our mission is simple: to empower working professionals and aspiring learners with the right education, skills, and confidence to rise higher in their careers.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MegaRyse Edge — list layout: odd = image left / text right, even = image right / text left */}
      <section className="py-12 sm:py-16 md:py-20 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px', amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              MegaRyse <span className="bg-gradient-gold bg-clip-text text-transparent">Edge</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              What sets us apart in your journey to career growth
            </p>
          </motion.div>
          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            {MEGA_RYSE_EDGE.map((item, idx) => {
              const img = (item as { image?: string }).image ?? EDGE_IMAGES[idx]
              const imageLeft = idx % 2 === 0
              return (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, x: imageLeft ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px', amount: 0.15 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${!imageLeft ? 'md:grid-flow-dense' : ''}`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md ${!imageLeft ? 'md:col-start-2' : ''}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gold text-white font-bold flex items-center justify-center text-sm shadow">
                      {idx + 1}
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className={!imageLeft ? 'md:col-start-1 md:row-start-1' : ''}
                  >
                    <h3 className="font-bold text-gray-900 mb-3 text-xl md:text-2xl leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 md:py-20 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px', amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-md border border-gray-100"
              >
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
