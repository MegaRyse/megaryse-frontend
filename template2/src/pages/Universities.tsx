import { motion } from 'framer-motion'
import { useState } from 'react'

const Universities = () => {
  const [activeTab, setActiveTab] = useState('undergraduate')

  const universities = {
    undergraduate: [
      { name: 'Amity University', desc: 'One of India\'s leading private institutions, renowned for world-class education', logo: '🏛️' },
      { name: 'Manipal University Jaipur', desc: 'NAAC \'A+\' accredited institution offering top-tier UG & PG programs', logo: '🎓' },
      { name: 'Sikkim Manipal University', desc: 'Leading private university offering UGC-recognized programs', logo: '📚' },
      { name: 'NMIMS University', desc: 'Wide range of undergraduate and postgraduate courses', logo: '🌟' },
      { name: 'Jain University', desc: 'Renowned for academic excellence and industry-driven curriculum', logo: '💎' },
      { name: 'Chandigarh University', desc: 'Prestigious institution known for excellence in education', logo: '🏆' },
    ],
    postgraduate: [
      { name: 'Amity University', desc: 'World-class education with cutting-edge research', logo: '🏛️' },
      { name: 'Manipal University Jaipur', desc: 'Top-tier programs in Management and Technology', logo: '🎓' },
      { name: 'Sikkim Manipal University', desc: 'UGC-recognized programs in Management, IT, Engineering', logo: '📚' },
      { name: 'Jain University', desc: 'Innovative programs and industry-driven curriculum', logo: '💎' },
      { name: 'NMIMS University', desc: 'Comprehensive courses designed for career success', logo: '🌟' },
      { name: 'VIT Online', desc: 'Flexible, high-quality online programs for professionals', logo: '💻' },
      { name: 'Chandigarh University', desc: 'Excellence in education, research, and innovation', logo: '🏆' },
    ],
    professional: [
      { name: 'NMIMS University', desc: 'Professional certification courses for career advancement', logo: '🌟' },
      { name: 'VIT Online', desc: 'Industry-relevant certification programs', logo: '💻' },
    ],
  }

  const currentUniversities = universities[activeTab as keyof typeof universities]

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold-bright/5"></div>
        <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Associated Universities</h1>
            <p className="text-xl text-gray-600">Partner with top-tier institutions worldwide</p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'undergraduate', label: 'Undergraduate Programs' },
              { id: 'postgraduate', label: 'Postgraduate Programs' },
              { id: 'professional', label: 'Professional & Certification Courses' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-gold text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentUniversities.map((uni, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="text-5xl mb-4 text-center">{uni.logo}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{uni.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{uni.desc}</p>
                <button className="w-full bg-gradient-gold text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Know More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Universities

