import { useEffect } from 'react'
import { motion } from 'framer-motion'
import ShinyText from '../animatedComponents/ShinyText'
import trustedEducationImg from '../assets/images/trustededucation.png'
import trustedEducationWebp from '../assets/images/trustededucation.webp'
import careerFocusedImg from '../assets/images/careerfocused.png'
import careerFocusedWebp from '../assets/images/careerfocused.webp'
import successImg from '../assets/images/sucess.png'
import successWebp from '../assets/images/sucess.webp'
import valueDrivenImg from '../assets/images/valuedriven.png'
import valueDrivenWebp from '../assets/images/valuedriven.webp'
import supportImg from '../assets/images/support.png'
import supportWebp from '../assets/images/support.webp'
import personalizedImg from '../assets/images/personalized.png'
import personalizedWebp from '../assets/images/personalized.webp'
import easyApplyImg from '../assets/images/easyapply.png'
import easyApplyWebp from '../assets/images/easyapply.webp'
import globalEducationImg from '../assets/images/globaleducation.png'
import globalEducationWebp from '../assets/images/globaleducation.webp'
import experienceTeamImg from '../assets/images/about/experience-team.png'
import directorImg from '../assets/images/about/director.png'
import directorWebp from '../assets/images/about/director.webp'
import { OptimizedImage } from '../components/OptimizedImage'
import { AnimatedImageGallery } from '../components/about/AnimatedImageGallery'

/** Native asset dimensions — container aspect ratio matches each image to avoid letterboxing. */
const EDGE_IMAGES = [
  { src: trustedEducationImg, webp: trustedEducationWebp, width: 1280, height: 826 },
  { src: careerFocusedImg, webp: careerFocusedWebp, width: 1280, height: 1165 },
  { src: successImg, webp: successWebp, width: 1280, height: 990 },
  { src: valueDrivenImg, webp: valueDrivenWebp, width: 1280, height: 1008 },
  { src: supportImg, webp: supportWebp, width: 1280, height: 871 },
  { src: personalizedImg, webp: personalizedWebp, width: 1280, height: 910 },
  { src: easyApplyImg, webp: easyApplyWebp, width: 1280, height: 894 },
  { src: globalEducationImg, webp: globalEducationWebp, width: 1280, height: 844 },
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

const ABOUT_INTRO_IMAGE = { width: 1024, height: 768 } as const

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
      {/* Hero — title, full-width image, then description */}
      <section className="relative bg-offwhite overflow-visible pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px', amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8 overflow-visible text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-1 px-4 sm:px-6 pt-0 pb-1 tracking-tight leading-[1.6] [word-spacing:0.08em] overflow-visible"
            style={{ minHeight: '1.6em' }}
          >
            <span className="inline-block overflow-visible pb-[0.15em]">
              About{' '}
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
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 px-2 mb-0"
          >
            Igniting MBA careers with elite global programs.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px', amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 w-full px-4 sm:mt-8 sm:px-6 md:mt-10 lg:px-8"
        >
          <div
            className="relative mx-auto w-full max-w-container overflow-hidden bg-gray-100 shadow-lg rounded-xl sm:rounded-2xl"
            style={{
              aspectRatio: `${ABOUT_INTRO_IMAGE.width} / ${ABOUT_INTRO_IMAGE.height}`,
              maxHeight: 'min(52vh, 560px)',
            }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <OptimizedImage
                src={experienceTeamImg}
                alt="MegaRyse team at work"
                width={ABOUT_INTRO_IMAGE.width}
                height={ABOUT_INTRO_IMAGE.height}
                priority
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </motion.div>
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#00275E]/35 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px', amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-container mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 md:mt-14 min-w-0 text-center"
        >
          <motion.div className="w-full space-y-6 sm:space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-gray-600 leading-relaxed"
            >
              MegaRyse EduCntr is a next-generation EdTech startup committed to redefining higher education through accredited online degree and certification programs designed for today's fast-evolving career landscape. We understand the needs of modern learners balancing work, personal commitments, and career growth and create learning pathways that are flexible, accessible, and outcome driven.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 leading-relaxed"
            >
              By partnering with leading universities and institutions, MegaRyse EduCntr delivers high-quality, industry-relevant programs that combine academic excellence with real-world applicability. Our offerings are structured to be affordable without compromising on credibility, ensuring learners gain recognized qualifications that add real value to their professional journey.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-600 leading-relaxed"
            >
              From personalized counseling and seamless enrollment to continuous learner support, we guide students at every stage of their educational journey. At MegaRyse EduCntr, our mission is simple: to empower working professionals and aspiring learners with the right education, skills, and confidence to rise higher in their careers.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Director */}
      <section className="bg-offwhite py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px', amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-sm md:max-w-md"
            >
              <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-gold/25 via-gold-bright/10 to-blue-custom/10 blur-sm" />
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100 shadow-xl ring-1 ring-black/5">
                <OptimizedImage
                  src={directorImg}
                  webpSrc={directorWebp}
                  alt="Director of MegaRyse EduCntr"
                  width={768}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#00275E]/35 to-transparent"
                  aria-hidden
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px', amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 text-center md:text-left"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-gold sm:text-sm">
                Leadership with purpose
              </p>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Our <span className="bg-gradient-gold bg-clip-text text-transparent">Director</span>
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
                <p>
                  At the heart of MegaRyse EduCntr is a clear belief: every learner deserves access
                  to credible education, honest guidance, and opportunities that create meaningful
                  career growth.
                </p>
                <p>
                  Our Director leads this vision with empathy, integrity, and a strong commitment
                  to student success. Her learner-first approach shapes everything we do—from
                  building trusted university partnerships to creating flexible learning pathways
                  and ensuring every student receives personal support throughout their journey.
                </p>
              </div>
              <blockquote className="mt-7 rounded-2xl border-l-4 border-gold bg-offwhite px-5 py-4 text-left text-sm font-medium italic leading-relaxed text-navy shadow-sm sm:text-base">
                “Education should do more than award a qualification, it should give every learner
                the confidence and opportunity to rise.”
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MegaRyse Edge — same section padding as Home; min-w-0 on text column */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-offwhite">
        <div className="max-w-container mx-auto w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px', amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              MegaRyse <span className="bg-gradient-gold bg-clip-text text-transparent">Edge</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto px-2">
              What sets us apart in your journey to career growth
            </p>
          </motion.div>
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {MEGA_RYSE_EDGE.map((item, idx) => {
              const visual = EDGE_IMAGES[idx]
              const imageLeft = idx % 2 === 0
              return (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, x: imageLeft ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px', amount: 0.15 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center min-w-0 ${!imageLeft ? 'md:grid-flow-dense' : ''}`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`relative w-full rounded-2xl overflow-hidden bg-gray-100 shadow-md min-w-0 ${!imageLeft ? 'md:col-start-2' : ''}`}
                    style={{ aspectRatio: `${visual.width} / ${visual.height}` }}
                  >
                    <OptimizedImage
                      src={visual.src}
                      webpSrc={visual.webp}
                      alt=""
                      width={visual.width}
                      height={visual.height}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <span className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gold text-white font-bold flex items-center justify-center text-sm shadow">
                      {idx + 1}
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className={`min-w-0 ${!imageLeft ? 'md:col-start-1 md:row-start-1' : ''}`}
                  >
                    <h3 className="font-bold text-gray-900 mb-3 text-xl md:text-2xl leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Life at MegaRyse — team photos from assets/images/gallery */}
      <AnimatedImageGallery />

      {/* Stats — same section padding and container as other pages */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-offwhite">
        <div className="max-w-container mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 min-w-0">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px', amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-md border border-gray-100 min-w-0"
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-1">
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
