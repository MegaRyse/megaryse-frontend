import { useState, FormEvent, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import HCaptcha from '@hcaptcha/react-hcaptcha'

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
const INTAKES = ['Fall 2026', 'Spring 2027', 'Fall 2027', 'Not Sure Yet']
const RESET_DELAY_MS = 3000
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'
const WEB3_FORMS_ACCESS_KEY = 'cdd002cc-e902-4392-9cf6-87f21c3a11b0'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null)
  const hCaptchaRef = useRef<HCaptcha>(null)
  const localTimeRef = useRef<HTMLInputElement>(null)

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
    if (!hCaptchaToken) newErrors.captcha = 'Please complete the captcha verification'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, hCaptchaToken])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    if (!validate()) return

    const localTime = new Date().toLocaleString()
    if (localTimeRef.current) localTimeRef.current.value = localTime

    setIsSubmitting(true)

    try {
      const payload: Record<string, string> = {
        access_key: WEB3_FORMS_ACCESS_KEY,
        subject: 'Contact Form Enquiry',
        from_name: formData.name,
        email: formData.email,
        'h-captcha-response': hCaptchaToken!,
        'Full Name': formData.name,
        'Mobile': formData.phone,
        'Preferred Country': formData.country,
        'Preferred Intake': formData.intake,
        'Message': formData.message,
        'Local Time': localTime,
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => ({ success: false, message: 'Invalid response' }))

      if (result.success) {
        setSubmitted(true)
        setFormData(INITIAL_FORM_DATA)
        setHCaptchaToken(null)
        hCaptchaRef.current?.resetCaptcha()
        setErrors({})
        setTimeout(() => {
          setSubmitted(false)
        }, RESET_DELAY_MS)
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again or contact us directly.')
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Network error. Please check your connection and try again.')
      console.error('Contact form submit error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, hCaptchaToken, validate])

  return (
    <div className="w-full bg-offwhite">
      {/* Contact Section */}
      <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 bg-offwhite">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex w-full flex-col"
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
                className="mb-8 w-full sm:mb-10"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Get In Touch!
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
                  Let's take your career to the next level!
                </p>
              </motion.div>

              <div className="w-full space-y-6">
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
                    <a
                      href="tel:+918431867374"
                      className="text-gray-600 text-base leading-relaxed transition-colors hover:text-navy"
                    >
                      +918431867374
                    </a>
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
              className="flex h-full w-full flex-col"
            >
              <div className="flex h-full min-h-0 w-full flex-col rounded-xl border border-gray-100 bg-[#00275E] p-8 shadow-xl sm:p-10 lg:h-full">
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
                  <form
                    onSubmit={handleSubmit}
                    className="flex h-full min-h-0 flex-col"
                  >
                    <input type="hidden" name="Local Time" id="contact_local_time" ref={localTimeRef} />
                    <div className="flex flex-1 flex-col space-y-5">
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

                      <div>
                        <HCaptcha
                          ref={hCaptchaRef}
                          sitekey={HCAPTCHA_SITEKEY}
                          reCaptchaCompat={false}
                          onVerify={(token: string) => {
                            setHCaptchaToken(token)
                            setErrors((prev) => ({ ...prev, captcha: '' }))
                          }}
                          onExpire={() => setHCaptchaToken(null)}
                        />
                        {errors.captcha && <p className="text-red-400 text-sm mt-1.5">{errors.captcha}</p>}
                      </div>

                      {submitError && (
                        <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200">{submitError}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-5 w-full shrink-0 rounded-lg bg-gradient-gold px-8 py-4 text-base font-semibold text-gray-900 shadow-md transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 lg:mt-auto lg:pt-6"
                      whileHover={isSubmitting ? undefined : {
                        scale: 1.02,
                        boxShadow: '0 20px 40px rgba(213, 173, 54, 0.3)',
                      }}
                      whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {isSubmitting ? 'Sending…' : 'Send Message'}
                    </motion.button>
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
