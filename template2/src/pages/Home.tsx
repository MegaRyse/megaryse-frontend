import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="w-full bg-offwhite">
      {/* Hero Section - Centered Layout */}
      <section className="relative py-32 md:py-40 bg-offwhite overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-offwhite via-offwhite/95 to-offwhite"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-bright/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-bright/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-8 leading-tight">
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
            <p className="text-2xl text-black mb-12 leading-relaxed max-w-3xl mx-auto">
              Join thousands of successful professionals who chose MegaRyse for their career transformation journey
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

          {/* Floating Stats Cards */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '12+', label: 'Years Experience', icon: '📅' },
              { number: '10k+', label: 'Students', icon: '👥' },
              { number: '50+', label: 'Universities', icon: '🏛️' },
              { number: '95%', label: 'Success Rate', icon: '⭐' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-navy rounded-2xl p-6 shadow-lg text-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/90 font-medium text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Zigzag Layout */}
      <section className="py-24 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Why Choose <span className="relative">
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

          <div className="space-y-16">
            {[
              {
                title: 'Expert Career Counseling',
                description: 'Our experienced counselors provide personalized guidance tailored to your career aspirations and goals.',
                icon: '🎯',
                image: 'left',
              },
              {
                title: 'Wide Range of Programs',
                description: 'Choose from hundreds of programs across management, technology, arts, and sciences from top universities.',
                icon: '📚',
                image: 'right',
              },
              {
                title: 'Seamless Admission Process',
                description: 'We handle all the paperwork and documentation, making your admission process smooth and hassle-free.',
                icon: '✅',
                image: 'left',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: feature.image === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  feature.image === 'right' ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={feature.image === 'right' ? 'lg:order-2' : ''}>
                  <div className="bg-navy rounded-3xl p-12 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative text-center">
                      <div className="text-7xl mb-6">{feature.icon}</div>
                      <div className="w-24 h-24 bg-gold rounded-full mx-auto flex items-center justify-center text-4xl">
                        ✨
                      </div>
                    </div>
                  </div>
                </div>
                <div className={feature.image === 'right' ? 'lg:order-1' : ''}>
                  <h3 className="text-4xl font-bold text-black mb-4">{feature.title}</h3>
                  <p className="text-lg text-black leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section - Masonry Style */}
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
              Discover Your <span className="relative">
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

      {/* Testimonials - Carousel Style */}
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
              Success <span className="relative">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-navy rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-gold-bright transition-all group"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-gold-bright text-xl">★</span>
                  ))}
                </div>
                <p className="text-white/90 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-sm text-white/80">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Split Design */}
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
