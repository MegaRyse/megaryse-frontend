import { useState, useCallback, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useEnquireModal } from '../context/EnquireModalContext'

const GMAIL_SUFFIX = '@gmail.com'
const SHOW_AFTER_MS = 3 * 60 * 1000
/** Show success animation, then close the modal */
const SUCCESS_CLOSE_MS = 2400

const PAGES_NO_ENQUIRE_MODAL = ['/careers', '/contact']

// Web3Forms
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'
const WEB3_FORMS_ACCESS_KEY = 'cf4384ee-abbf-49c8-84c1-ca8db97c42c8'

/* University options kept for when the field is re-enabled
const UNIVERSITIES = [
  'Amity University',
  'Manipal University Jaipur',
  'Sikkim Manipal University',
  'NMIMS University',
  'Jain University',
  'Chandigarh University',
  'VIT Online',
]
*/

const COURSES = [
  'Bachelor of Commerce (B.Com)',
  'Bachelor of Business Administration (BBA)',
  'Bachelor of Computer Applications (BCA)',
  'Bachelor of Arts (BA)',
  'Master of Business Administration (MBA)',
  'Master of Computer Applications (MCA)',
  'Master of Arts (MA)',
  'Master of Science (MSC)',
  'Executive MBA',
  'Data Science & Analytics',
  'Digital Marketing',
  'Project Management',
]

/** All Indian states + union territories, alphabetical */
const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
]

interface EnquireFormState {
  fullName: string
  mobile: string
  email: string
  // university: string
  course: string
  state: string
}

interface EnquireErrors {
  fullName?: string
  mobile?: string
  email?: string
  // university?: string
  course?: string
  state?: string
  captcha?: string
}

function isEnquireExcludedPath(pathname: string) {
  return PAGES_NO_ENQUIRE_MODAL.some((path) => pathname === path || pathname.startsWith(path + '/'))
}

export const EnquireNowFormModal = () => {
  const location = useLocation()
  const { isOpen, openEnquireModal, closeEnquireModal } = useEnquireModal()
  const [form, setForm] = useState<EnquireFormState>({
    fullName: '',
    mobile: '',
    email: '',
    // university: '',
    course: '',
    state: '',
  })
  const [errors, setErrors] = useState<EnquireErrors>({})
  const [submitTried, setSubmitTried] = useState(false)
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const hCaptchaRef = useRef<HCaptcha>(null)
  const localTimeRef = useRef<HTMLInputElement>(null)
  const twoMinutesElapsedRef = useRef(false)
  const autoPromptDismissedRef = useRef(false)
  const successCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearSuccessCloseTimer = useCallback(() => {
    if (successCloseTimerRef.current) {
      clearTimeout(successCloseTimerRef.current)
      successCloseTimerRef.current = null
    }
  }, [])

  const isExcludedPage = isEnquireExcludedPath(location.pathname)

  // Show once, 3 minutes after the user enters the site. Stays open until they close it.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      twoMinutesElapsedRef.current = true
      if (autoPromptDismissedRef.current) return
      if (isEnquireExcludedPath(window.location.pathname)) return
      openEnquireModal()
    }, SHOW_AFTER_MS)

    return () => window.clearTimeout(timer)
  }, [openEnquireModal])

  useEffect(() => {
    if (!twoMinutesElapsedRef.current || autoPromptDismissedRef.current || isExcludedPage) return
    openEnquireModal()
  }, [isExcludedPage, location.pathname, openEnquireModal])

  const validateFullName = useCallback((value: string): string | undefined => {
    if (!value.trim()) return 'Full name is required'
    if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed'
    return undefined
  }, [])

  const validateMobile = useCallback((value: string): string | undefined => {
    if (!value.trim()) return 'Mobile number is required'
    if (!/^\d+$/.test(value)) return 'Only numbers allowed'
    if (value.length < 10) return 'Enter a valid 10-digit number'
    return undefined
  }, [])

  const validateEmail = useCallback((value: string): string | undefined => {
    if (!value.trim()) return 'Email is required'
    if (!value.toLowerCase().endsWith(GMAIL_SUFFIX)) return 'Invalid email. Use a valid @gmail.com address'
    const local = value.slice(0, -GMAIL_SUFFIX.length)
    if (!/^[a-zA-Z0-9._+-]+$/.test(local)) return 'Invalid email. Use alphanumeric characters for the part before @gmail.com'
    return undefined
  }, [])

  const handleChange = useCallback((field: keyof EnquireFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  const runValidation = useCallback((): boolean => {
    const newErrors: EnquireErrors = {}
    const fn = validateFullName(form.fullName)
    if (fn) newErrors.fullName = fn
    const mob = validateMobile(form.mobile)
    if (mob) newErrors.mobile = mob
    const em = validateEmail(form.email)
    if (em) newErrors.email = em
    // if (!form.university.trim()) newErrors.university = 'Please select a university'
    if (!form.course.trim()) newErrors.course = 'Please select a course'
    if (!form.state.trim()) newErrors.state = 'Please select a state'
    if (!hCaptchaToken) newErrors.captcha = 'Please complete the captcha verification'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [form, hCaptchaToken, validateFullName, validateMobile, validateEmail])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitTried(true)
      setSubmitMessage('')
      if (!runValidation()) return

      const localTime = new Date().toLocaleString()
      if (localTimeRef.current) localTimeRef.current.value = localTime

      setIsSubmitting(true)
      setSubmitStatus('idle')

      try {
        const payload: Record<string, string> = {
          access_key: WEB3_FORMS_ACCESS_KEY,
          subject: 'Enquire Now – Course interest',
          from_name: form.fullName,
          email: form.email,
          'h-captcha-response': hCaptchaToken!,
          'Full Name': form.fullName,
          'Mobile': `+91 ${form.mobile}`,
          // Reply-to uses system field `email` above — do not also send custom "Email"
          // 'University': form.university,
          'Course': form.course,
          'State': form.state,
          'Local Time': localTime,
        }

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        const result = await response.json().catch(() => ({ success: false, message: 'Invalid response' }))

        if (result.success) {
          setSubmitStatus('success')
          setSubmitMessage(result.message || "We've received your enquiry. Our team will get back to you soon!")
          setForm({
            fullName: '',
            mobile: '',
            email: '',
            // university: '',
            course: '',
            state: '',
          })
          setHCaptchaToken(null)
          hCaptchaRef.current?.resetCaptcha()
          setErrors({})
          setSubmitTried(false)
          clearSuccessCloseTimer()
          successCloseTimerRef.current = setTimeout(() => {
            autoPromptDismissedRef.current = true
            setSubmitStatus('idle')
            setSubmitMessage('')
            closeEnquireModal()
          }, SUCCESS_CLOSE_MS)
        } else {
          setSubmitStatus('error')
          setSubmitMessage(result.message || 'Something went wrong. Please try again or contact us directly.')
        }
      } catch (err) {
        setSubmitStatus('error')
        setSubmitMessage(err instanceof Error ? err.message : 'Network error. Please check your connection and try again.')
        console.error('Enquire form submit error:', err)
      } finally {
        setIsSubmitting(false)
      }
    },
    [form, runValidation, hCaptchaToken, clearSuccessCloseTimer, closeEnquireModal]
  )

  const handleClose = useCallback(() => {
    clearSuccessCloseTimer()
    autoPromptDismissedRef.current = true
    setErrors({})
    setSubmitTried(false)
    setSubmitStatus('idle')
    setSubmitMessage('')
    setIsSubmitting(false)
    setHCaptchaToken(null)
    hCaptchaRef.current?.resetCaptcha()
    setForm({
      fullName: '',
      mobile: '',
      email: '',
      course: '',
      state: '',
    })
    closeEnquireModal()
  }, [closeEnquireModal, clearSuccessCloseTimer])

  useEffect(() => () => clearSuccessCloseTimer(), [clearSuccessCloseTimer])

  const handleOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      // Tap outside the card (form or success) closes the modal
      if (e.target === e.currentTarget) handleClose()
    },
    [handleClose],
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/70 z-[100]"
            onClick={handleClose}
            aria-hidden
          />
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={handleOutsideClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-2xl shadow-2xl border-t-4 border-gold bg-white"
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquire-form-title"
            >
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="enquire-success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, y: -8 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className="flex flex-col items-center justify-center px-6 py-14 text-center sm:py-16"
                  >
                    <motion.div
                      className="relative mb-6 flex h-20 w-20 items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.08 }}
                    >
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-gold/25"
                        animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                      />
                      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-bright shadow-lg shadow-gold/30">
                        <motion.svg
                          className="h-8 w-8 text-navy"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.45 }}
                        >
                          <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
                          />
                        </motion.svg>
                      </span>
                    </motion.div>

                    <motion.h2
                      id="enquire-form-title"
                      className="text-2xl font-bold text-navy"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 }}
                    >
                      Form Submitted
                    </motion.h2>
                    <motion.p
                      className="mt-2 max-w-sm text-sm leading-relaxed text-navy/70"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.38 }}
                    >
                      {submitMessage || "We've received your enquiry. Our team will get back to you soon!"}
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="enquire-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header with gold accent */}
                    <div className="bg-navy text-white px-6 py-5 rounded-t-2xl">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 id="enquire-form-title" className="text-xl font-bold text-gold-bright leading-tight">
                            Still wondering which course is right for you?
                          </h2>
                          <p className="text-offwhite/90 text-sm mt-1">
                            Tell us a bit about yourself and we&apos;ll help you find the best fit.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                          aria-label="Close"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                      <input type="hidden" name="Local Time" id="enquire_local_time" ref={localTimeRef} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="enquire-fullName" className="block text-sm font-medium text-navy mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="enquire-fullName"
                            type="text"
                            value={form.fullName}
                            onChange={(e) => {
                              const v = e.target.value
                              if (/^[a-zA-Z\s]*$/.test(v)) handleChange('fullName', v)
                            }}
                            placeholder="Full Name"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-offwhite/50 text-navy placeholder-gray-500 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition"
                          />
                          {submitTried && errors.fullName && (
                            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="enquire-mobile" className="block text-sm font-medium text-navy mb-1">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <div className="flex rounded-lg border border-gray-200 bg-offwhite/50 overflow-hidden focus-within:ring-2 focus-within:ring-gold focus-within:border-gold">
                            <span className="flex items-center px-3 text-navy/70 bg-gold/20 border-r border-gray-200 text-sm font-medium">+91</span>
                            <input
                              id="enquire-mobile"
                              type="text"
                              inputMode="numeric"
                              value={form.mobile}
                              onChange={(e) => {
                                const v = e.target.value.replace(/\D/g, '')
                                if (v.length <= 10) handleChange('mobile', v)
                              }}
                              placeholder="Mobile Number"
                              className="flex-1 px-4 py-2.5 text-navy placeholder-gray-500 outline-none bg-transparent"
                            />
                          </div>
                          {submitTried && errors.mobile && (
                            <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="enquire-email" className="block text-sm font-medium text-navy mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="enquire-email"
                          type="text"
                          inputMode="email"
                          value={form.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-offwhite/50 text-navy placeholder-gray-500 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition"
                        />
                        {submitTried && errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>

                      {/* University — hidden for now
                      <div>
                        <label htmlFor="enquire-university" className="block text-sm font-medium text-navy mb-1">
                          University <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="enquire-university"
                          value={form.university}
                          onChange={(e) => handleChange('university', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-offwhite/50 text-navy focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                        >
                          <option value="">Select University</option>
                          {UNIVERSITIES.map((u) => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                        {submitTried && errors.university && (
                          <p className="mt-1 text-sm text-red-600">{errors.university}</p>
                        )}
                      </div>
                      */}

                      <div>
                        <label htmlFor="enquire-course" className="block text-sm font-medium text-navy mb-1">
                          Course <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="enquire-course"
                          value={form.course}
                          onChange={(e) => handleChange('course', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-offwhite/50 text-navy focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                        >
                          <option value="">Select Course</option>
                          {COURSES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        {submitTried && errors.course && (
                          <p className="mt-1 text-sm text-red-600">{errors.course}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="enquire-state" className="block text-sm font-medium text-navy mb-1">
                          State <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="enquire-state"
                          value={form.state}
                          onChange={(e) => handleChange('state', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-offwhite/50 text-navy focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                        >
                          <option value="">Select State</option>
                          {INDIAN_STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {submitTried && errors.state && (
                          <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                        )}
                      </div>

                      <div>
                        <HCaptcha
                          ref={hCaptchaRef}
                          sitekey={HCAPTCHA_SITEKEY}
                          reCaptchaCompat={false}
                          onVerify={(token: string) => setHCaptchaToken(token)}
                          onExpire={() => setHCaptchaToken(null)}
                        />
                        {submitTried && errors.captcha && (
                          <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>
                        )}
                      </div>

                      {submitStatus === 'error' && submitMessage && (
                        <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{submitMessage}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-gold hover:bg-gold-bright text-navy font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 focus:ring-gold focus:ring-offset-2 shadow-md"
                      >
                        {isSubmitting ? 'Sending…' : 'SUBMIT'}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
