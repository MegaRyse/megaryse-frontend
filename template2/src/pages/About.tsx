import { motion } from 'framer-motion'
import trustedEducationImg from '../assets/images/trustededucation.png'
import careerFocusedImg from '../assets/images/careerfocused.png'
import successImg from '../assets/images/sucess.png'
import valueDrivenImg from '../assets/images/valuedriven.png'
import supportImg from '../assets/images/support.png'
import personalizedImg from '../assets/images/personalized.png'
import easyApplyImg from '../assets/images/easyapply.png'
import globalEducationImg from '../assets/images/globaleducation.png'

const EDGE_PLACEHOLDERS = [trustedEducationImg, careerFocusedImg, successImg, valueDrivenImg, supportImg, personalizedImg, easyApplyImg, globalEducationImg]

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

const About = () => {
  return (
    <div className="w-full bg-offwhite">
      {/* Hero Section */}
      <section className="relative py-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold-bright/5"></div>
        <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-gold bg-clip-text text-transparent">MegaRyse</span>
            </h1>
            <p className="text-xl text-gray-600">
              Leading MBA education consultancy dedicated to transforming careers through world-class business education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 h-full flex flex-col justify-between"
            >
              <div className="bg-gradient-gold-soft rounded-3xl p-8 mb-6">
                <div className="text-6xl font-bold bg-gradient-gold bg-clip-text text-transparent text-center mb-2">
                  12+
                </div>
                <div className="text-gray-700 font-semibold text-center text-lg">
                  Years Of Experience
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-gradient-gold-soft rounded-2xl p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-gold rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                    👨‍🎓
                  </div>
                </div>
                <div className="bg-gradient-gold-soft rounded-2xl p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-gold rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                    👩‍🎓
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                MegaRyse EduCntr is a next-generation EdTech startup committed to redefining higher education through accredited online degree and certification programs designed for today's fast-evolving career landscape. We understand the needs of modern learners—balancing work, personal commitments, and career growth—and create learning pathways that are flexible, accessible, and outcome-driven.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                By partnering with leading universities and institutions, MegaRyse EduCntr delivers high-quality, industry-relevant programs that combine academic excellence with real-world applicability. Our offerings are structured to be affordable without compromising on credibility, ensuring learners gain recognized qualifications that add real value to their professional journey.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From personalized counseling and seamless enrollment to continuous learner support, we guide students at every stage of their educational journey. At MegaRyse EduCntr, our mission is simple: to empower working professionals and aspiring learners with the right education, skills, and confidence to rise higher in their careers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MegaRyse Edge – card grid with images */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold text-gray-900 text-center mb-4"
          >
            MegaRyse <span className="bg-gradient-gold bg-clip-text text-transparent">Edge</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-gray-600 max-w-2xl mx-auto mb-16"
          >
            What sets us apart in your journey to career growth
          </motion.p>
          <div className="space-y-16 md:space-y-24">
            {MEGA_RYSE_EDGE.map((item, idx) => {
              const cardImage = (item as { image?: string }).image ?? EDGE_PLACEHOLDERS[idx]
              const imageLeft = idx % 2 === 0
              const imageFrom = imageLeft ? -48 : 48
              const contentFrom = imageLeft ? 48 : -48
              return (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-80px', amount: 0.2 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  {/* Image block – slides in from side */}
                  <motion.div
                    initial={{ opacity: 0, x: imageFrom, scale: 0.96 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-60px', amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-gold/20 to-gold-bright/20 shadow-md ${imageLeft ? 'md:order-1' : 'md:order-2'}`}
                  >
                    <motion.img
                      src={cardImage}
                      alt=""
                      initial={{ scale: 1.08 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <motion.span
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.35, type: 'spring', stiffness: 200, damping: 18 }}
                      className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-white font-bold shadow-md"
                    >
                      {idx + 1}
                    </motion.span>
                  </motion.div>
                  {/* Content block – slides in from opposite side, title then description */}
                  <motion.div
                    initial={{ opacity: 0, x: contentFrom }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px', amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={imageLeft ? 'md:order-2' : 'md:order-1'}
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="font-bold text-gray-900 mb-4 text-xl md:text-2xl leading-snug"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-gray-600 leading-relaxed"
                    >
                      {item.description}
                    </motion.p>
                  </motion.div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10k+', label: 'Students Enrolled' },
              { number: '4k+', label: 'Active Students' },
              { number: '50+', label: 'Partner Universities' },
              { number: '95%', label: 'Success Rate' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-8 text-center shadow-md"
              >
                <div className="text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

