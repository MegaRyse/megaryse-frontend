import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
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
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-gold-soft rounded-3xl p-8 mb-6">
                <div className="text-6xl font-bold bg-gradient-gold bg-clip-text text-transparent text-center mb-2">
                  12+
                </div>
                <div className="text-gray-700 font-semibold text-center text-lg">
                  Years Of Experience
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome To MegaRyse</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At MegaRyse, we believe that the right education can transform careers and open doors to new opportunities. As one of India's top education advisory platforms, we specialize in guiding students and professionals toward the best management and professional courses that align with their career goals.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our mission is to bridge the gap between education and career success by providing personalized guidance and access to top-quality programs for students and working professionals.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🎯', title: 'Expert Career Guidance' },
                  { icon: '📚', title: 'Wide Range of Programs' },
                  { icon: '💼', title: 'Career-Focused Approach' },
                  { icon: '🤝', title: 'Personalized support' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-gold-soft rounded-xl p-6">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
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

