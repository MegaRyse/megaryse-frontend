import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    intake: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.country) newErrors.country = 'Please select a country'
    if (!formData.intake) newErrors.intake = 'Please select an intake'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          intake: '',
          message: '',
        })
      }, 3000)
    }
  }

  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Singapore', 'India', 'Other']
  const intakes = ['Fall 2024', 'Spring 2025', 'Fall 2025', 'Spring 2026', 'Not Sure Yet']

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
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Get In Touch!</h1>
            <p className="text-xl text-gray-600">
              Let's take your career to the next level!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center text-white text-xl">
                    📍
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">Bangalore, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center text-white text-xl">
                    📧
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@megaryse.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center text-white text-xl">
                    📞
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Contact Number</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-gold`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-gold`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-gold`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="country" className="block text-sm font-semibold text-gray-900 mb-2">
                            Preferred Country *
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.country ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-gold`}
                          >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                        </div>

                        <div>
                          <label htmlFor="intake" className="block text-sm font-semibold text-gray-900 mb-2">
                            Preferred Intake *
                          </label>
                          <select
                            id="intake"
                            name="intake"
                            value={formData.intake}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.intake ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-gold`}
                          >
                            <option value="">Select Intake</option>
                            {intakes.map((intake) => (
                              <option key={intake} value={intake}>
                                {intake}
                              </option>
                            ))}
                          </select>
                          {errors.intake && <p className="text-red-500 text-sm mt-1">{errors.intake}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.message ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-gold resize-none`}
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-gold text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

