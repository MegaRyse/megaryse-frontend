import { useState, FormEvent, useCallback } from 'react'
import { motion } from 'framer-motion'

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Singapore',
  'India',
  'Other',
]
const INTAKES = ['Fall 2024', 'Spring 2025', 'Fall 2025', 'Spring 2026', 'Not Sure Yet']
const RESET_DELAY_MS = 3000
const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  country: '',
  intake: '',
  message: '',
}

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }, [errors])

  const validate = useCallback(() => {
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
  }, [formData])

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData(INITIAL_FORM_DATA)
      }, RESET_DELAY_MS)
    }
  }, [validate])

  return (
    <div className="w-full bg-offwhite">
      {/* Contact Section */}
      <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col justify-start w-full"
            >
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                className="mb-12 w-full"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Get In Touch!
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
                  Let's take your career to the next level!
                </p>
              </motion.div>
              <div className="space-y-6 w-full">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.7,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  className="flex items-start gap-5"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="w-2 h-14 rounded-full flex-shrink-0 mt-1"
                    style={{
                      background: 'linear-gradient(180deg, #FFD447 0%, #E8C547 50%, #C9A978 100%)',
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1.5 text-lg">Location</h3>
                    <p className="text-gray-600 text-base leading-relaxed">Bangalore, India</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.7,
                    delay: 0.5,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  className="flex items-start gap-5"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.6,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="w-2 h-14 rounded-full flex-shrink-0 mt-1"
                    style={{
                      background: 'linear-gradient(180deg, #FFD447 0%, #E8C547 50%, #C9A978 100%)',
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1.5 text-lg">Email</h3>
                    <p className="text-gray-600 text-base leading-relaxed">info@megaryse.com</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.7,
                    delay: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  className="flex items-start gap-5"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.9,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="w-2 h-14 rounded-full flex-shrink-0 mt-1"
                    style={{
                      background: 'linear-gradient(180deg, #FFD447 0%, #E8C547 50%, #C9A978 100%)',
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1.5 text-lg">Contact Number</h3>
                    <p className="text-gray-600 text-base leading-relaxed">+1 (555) 123-4567</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="w-full"
            >
              <div className="bg-[#00275E] rounded-xl p-8 sm:p-10 shadow-xl border border-gray-100 w-full">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                      className="text-6xl mb-6"
                    >
                      ✅
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Thank You!</h3>
                    <p className="text-white/90 text-base">We'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-white mb-2.5">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3.5 rounded-lg border bg-white/95 text-gray-900 placeholder-gray-400 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all`}
                          placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1.5">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3.5 rounded-lg border bg-white/95 text-gray-900 placeholder-gray-400 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all`}
                          placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1.5">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2.5">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3.5 rounded-lg border bg-white/95 text-gray-900 placeholder-gray-400 ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all`}
                          placeholder="Enter your mobile number"
                        />
                        {errors.phone && <p className="text-red-400 text-sm mt-1.5">{errors.phone}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="country" className="block text-sm font-semibold text-white mb-2.5">
                            Preferred Country *
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={`w-full px-4 py-3.5 rounded-lg border bg-white/95 text-gray-900 ${
                              errors.country ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all`}
                          >
                            <option value="">Select Country</option>
                            {COUNTRIES.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                          {errors.country && <p className="text-red-400 text-sm mt-1.5">{errors.country}</p>}
                        </div>

                        <div>
                          <label htmlFor="intake" className="block text-sm font-semibold text-white mb-2.5">
                            Preferred Intake *
                          </label>
                          <select
                            id="intake"
                            name="intake"
                            value={formData.intake}
                            onChange={handleChange}
                            className={`w-full px-4 py-3.5 rounded-lg border bg-white/95 text-gray-900 ${
                              errors.intake ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all`}
                          >
                            <option value="">Select Intake</option>
                            {INTAKES.map((intake) => (
                              <option key={intake} value={intake}>
                                {intake}
                              </option>
                            ))}
                          </select>
                          {errors.intake && <p className="text-red-400 text-sm mt-1.5">{errors.intake}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-white mb-2.5">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={`w-full px-4 py-3.5 rounded-lg border bg-white/95 text-gray-900 placeholder-gray-400 ${
                            errors.message ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none transition-all`}
                          placeholder="Enter your message"
                        />
                        {errors.message && <p className="text-red-400 text-sm mt-1.5">{errors.message}</p>}
                      </div>

                      <motion.button
                        type="submit"
                        className="w-full bg-gradient-gold text-gray-900 px-8 py-4 rounded-lg font-semibold text-base shadow-md hover:shadow-xl transition-all duration-300"
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: '0 20px 40px rgba(213, 173, 54, 0.3)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        Send Message
                      </motion.button>
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

