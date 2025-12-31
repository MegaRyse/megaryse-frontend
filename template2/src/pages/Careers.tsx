import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Careers = () => {
  const positions = [
    {
      title: 'Education Counselor',
      description: 'Guide students in choosing the right courses and provide expert career guidance.',
      department: 'Student Services',
      location: 'Remote / Hybrid',
      type: 'Full-time',
    },
    {
      title: 'Digital Marketing Executive',
      description: 'Develop and implement online marketing strategies to reach prospective students.',
      department: 'Marketing',
      location: 'Bangalore',
      type: 'Full-time',
    },
    {
      title: 'Business Development Manager',
      description: 'Drive partnerships with universities and expand our reach to new markets.',
      department: 'Business Development',
      location: 'Mumbai',
      type: 'Full-time',
    },
    {
      title: 'Student Support Executive',
      description: 'Assist students with enrollment, inquiries, and provide ongoing support throughout their journey.',
      department: 'Student Services',
      location: 'Remote',
      type: 'Full-time',
    },
  ]

  const benefits = [
    {
      title: 'Innovative Work Environment',
      description: 'Be part of a team that is transforming education and making a real impact.',
      icon: '💡',
    },
    {
      title: 'Career Growth Opportunities',
      description: 'Learn, grow, and take your career to new heights with continuous development programs.',
      icon: '📈',
    },
    {
      title: 'Collaborative Culture',
      description: 'Work with passionate and driven professionals who share your commitment to excellence.',
      icon: '🤝',
    },
  ]

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
              Build Your Career with <span className="bg-gradient-gold bg-clip-text text-transparent">MegaRyse</span>
            </h1>
            <p className="text-xl text-gray-600">
              At MegaRyse, we are passionate about helping students and professionals achieve their career goals. If you're looking for a dynamic, growth-oriented workplace, we'd love to have you on board!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join a team that's making a difference in education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore opportunities to join our growing team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{position.title}</h3>
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
                <Link
                  to="/contact"
                  className="inline-block bg-gradient-gold text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Apply Now
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-gradient-gold-soft rounded-xl p-8 text-center"
          >
            <div className="text-4xl mb-4">💡</div>
            <p className="text-lg text-gray-700 mb-4">
              Don't see a role that fits? We're always looking for talented individuals!
            </p>
            <p className="text-gray-600 mb-6">
              Send us your resume, and we'll get in touch.
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Apply Now:</strong> careers@megaryse.com</p>
              <p><strong>Call Us:</strong> +1 (555) 123-4567</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Careers

