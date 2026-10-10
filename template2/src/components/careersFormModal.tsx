import { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HCaptcha from '@hcaptcha/react-hcaptcha'

const GMAIL_SUFFIX = '@gmail.com'
const SUCCESS_CLOSE_MS = 2400

export interface CareersFormModalProps {
  isOpen: boolean
  onClose: () => void
  positionTitle?: string
}

interface FormState {
  fullName: string
  mobile: string
  email: string
  workYears: string
  workMonths: string
  whatDefinesYou: string
}

interface Errors {
  fullName?: string
  mobile?: string
  email?: string
  workExperience?: string
  whatDefinesYou?: string
  captcha?: string
}

const YEARS_OPTIONS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Above 10 years']
const MONTHS_OPTIONS = Array.from({ length: 13 }, (_, i) => i.toString())

const EMPTY_FORM: FormState = {
  fullName: '',
  mobile: '',
  email: '',
  workYears: '',
  workMonths: '',
  whatDefinesYou: '',
}

// Web3Forms hCaptcha site key
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'
const WEB3_FORMS_ACCESS_KEY = '2a03f997-204d-41fe-989a-3bcbf3181adc'

export const CareersFormModal = ({ isOpen, onClose, positionTitle }: CareersFormModalProps) => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Errors>({})
  const [submitTried, setSubmitTried] = useState(false)
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [formResetKey, setFormResetKey] = useState(0)
  const hCaptchaRef = useRef<HCaptcha>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const localTimeRef = useRef<HTMLInputElement>(null)
  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetFormState = useCallback((remount = false) => {
    setForm(EMPTY_FORM)
    setErrors({})
    setSubmitTried(false)
    setSubmitStatus('idle')
    setSubmitMessage('')
    setHCaptchaToken(null)
    setIsSubmitting(false)
    hCaptchaRef.current?.resetCaptcha()
    formRef.current?.reset()
    if (remount) setFormResetKey((key) => key + 1)
  }, [])

  const clearAutoCloseTimer = useCallback(() => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current)
      autoCloseTimerRef.current = null
    }
  }, [])

  const handleClose = useCallback(() => {
    clearAutoCloseTimer()
    // Step 1: wipe on every close (X, backdrop, Escape, success auto-close)
    resetFormState()
    onClose()
  }, [onClose, resetFormState, clearAutoCloseTimer])

  // Step 1 + 2: wipe leftover state whenever the modal hides or is about to show
  useLayoutEffect(() => {
    if (isOpen) {
      // Step 2: before paint on open — remount so no previous/cached values remain
      resetFormState(true)
    } else {
      resetFormState()
    }
  }, [isOpen, resetFormState])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, handleClose])

  useEffect(() => () => clearAutoCloseTimer(), [clearAutoCloseTimer])

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

  const validateWorkExperience = useCallback((): string | undefined => {
    if (!form.workYears) return 'Work experience (years) is required'
    if (form.workYears === 'Above 10 years') return undefined
    if (!form.workMonths) return 'Work experience (months) is required'
    return undefined
  }, [form.workYears, form.workMonths])

  const validateWhatDefinesYou = useCallback((value: string): boolean => {
    if (!value.trim()) return true // optional
    return /^[a-zA-Z0-9\s.,!?-]+$/.test(value)
  }, [])

  const handleChange = useCallback((field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined, workExperience: prev.workExperience }))
    if (field === 'workYears' || field === 'workMonths') {
      setErrors((prev) => ({ ...prev, workExperience: undefined }))
    }
  }, [])

  const runValidation = useCallback((): boolean => {
    const newErrors: Errors = {}
    const fn = validateFullName(form.fullName)
    if (fn) newErrors.fullName = fn
    const mob = validateMobile(form.mobile)
    if (mob) newErrors.mobile = mob
    const em = validateEmail(form.email)
    if (em) newErrors.email = em
    const we = validateWorkExperience()
    if (we) newErrors.workExperience = we
    if (form.whatDefinesYou.trim() && !validateWhatDefinesYou(form.whatDefinesYou)) {
      newErrors.whatDefinesYou = 'Only letters, numbers and basic punctuation allowed'
    }
    if (!hCaptchaToken) {
      newErrors.captcha = 'Please complete the captcha verification'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [form, hCaptchaToken, validateFullName, validateMobile, validateEmail, validateWorkExperience, validateWhatDefinesYou])

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
        // Web3Forms expects JSON body (see https://docs.web3forms.com)
        const payload: Record<string, string> = {
          access_key: WEB3_FORMS_ACCESS_KEY,
          subject: positionTitle ? `Application: ${positionTitle}` : 'Career Application',
          from_name: form.fullName,
          email: form.email,
          'h-captcha-response': hCaptchaToken!,
          'Full Name': form.fullName,
          'Mobile': `+91 ${form.mobile}`,
          // Reply-to uses system field `email` above — do not also send custom "Email"
          'Work Experience (Years)': form.workYears,
          'Work Experience (Months)': form.workYears === 'Above 10 years' ? '—' : form.workMonths,
          'What defines you for this role': form.whatDefinesYou || '—',
          'Position': positionTitle || 'General Application',
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
          setSubmitMessage(result.message || "Application submitted successfully! We'll be in touch.")
          setForm(EMPTY_FORM)
          setHCaptchaToken(null)
          hCaptchaRef.current?.resetCaptcha()
          setErrors({})
          setSubmitTried(false)
          formRef.current?.reset()
          clearAutoCloseTimer()
          autoCloseTimerRef.current = setTimeout(() => {
            handleClose()
          }, SUCCESS_CLOSE_MS)
        } else {
          setSubmitStatus('error')
          setSubmitMessage(result.message || 'Submission failed. Please try again or email us directly.')
        }
      } catch (err) {
        setSubmitStatus('error')
        setSubmitMessage(err instanceof Error ? err.message : 'Network error. Please check your connection and try again.')
        console.error('Careers form submit error:', err)
      } finally {
        setIsSubmitting(false)
      }
    },
    [form, positionTitle, runValidation, hCaptchaToken, handleClose, clearAutoCloseTimer]
  )

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
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={handleClose}
            aria-hidden
          />
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={handleOutsideClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="apply-form-title"
            >
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="careers-success"
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
                      id="apply-form-title"
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
                      {submitMessage || "Application submitted successfully! We'll be in touch."}
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="careers-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
              {/* Header with close */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                <h2 id="apply-form-title" className="text-xl font-bold text-navy">
                  {positionTitle ? `Apply for ${positionTitle}` : "We're Here to Help – Apply Now"}
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-lg bg-blue-custom text-white hover:bg-navy transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form
                key={formResetKey}
                ref={formRef}
                onSubmit={handleSubmit}
                autoComplete="off"
                className="p-6 space-y-5"
              >
                <input type="hidden" name="Local Time" id="careers_local_time" ref={localTimeRef} />
                {/* Row: Full Name + Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="apply-fullName" className="block text-sm font-medium text-navy mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="apply-fullName"
                      type="text"
                      autoComplete="off"
                      value={form.fullName}
                      onChange={(e) => {
                        const v = e.target.value
                        if (/^[a-zA-Z\s]*$/.test(v)) handleChange('fullName', v)
                      }}
                      placeholder="Full Name"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-navy placeholder-gray-400 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition"
                    />
                    {submitTried && errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="apply-mobile" className="block text-sm font-medium text-navy mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex rounded-lg border border-gray-200 bg-gray-50 overflow-hidden focus-within:ring-2 focus-within:ring-gold focus-within:border-gold">
                      <span className="flex items-center px-3 text-gray-600 bg-gray-100 border-r border-gray-200 text-sm">+91</span>
                      <input
                        id="apply-mobile"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        value={form.mobile}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '')
                          if (v.length <= 10) handleChange('mobile', v)
                        }}
                        placeholder="Mobile Number"
                        className="flex-1 px-4 py-2.5 text-navy placeholder-gray-400 outline-none bg-transparent"
                      />
                    </div>
                    {submitTried && errors.mobile && (
                      <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="apply-email" className="block text-sm font-medium text-navy mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="apply-email"
                    type="text"
                    inputMode="email"
                    autoComplete="off"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-navy placeholder-gray-400 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition"
                  />
                  {submitTried && errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Work Experience: Years + Months */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">
                    Work Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="apply-years" className="sr-only">Years</label>
                      <select
                        id="apply-years"
                        value={form.workYears}
                        onChange={(e) => handleChange('workYears', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-navy focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                      >
                        <option value="">Years</option>
                        {YEARS_OPTIONS.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="apply-months" className="sr-only">Months</label>
                      <select
                        id="apply-months"
                        value={form.workMonths}
                        onChange={(e) => handleChange('workMonths', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-navy focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                      >
                        <option value="">Months</option>
                        {MONTHS_OPTIONS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {submitTried && errors.workExperience && (
                    <p className="mt-1 text-sm text-red-600">{errors.workExperience}</p>
                  )}
                </div>

                {/* What defines you (optional) */}
                <div>
                  <label htmlFor="apply-whatDefinesYou" className="block text-sm font-medium text-navy mb-1">
                    What defines you for this role?
                  </label>
                  <p className="text-xs text-gray-500 mb-1">Optional. Tell us what makes you a fit (letters and numbers only).</p>
                  <textarea
                    id="apply-whatDefinesYou"
                    value={form.whatDefinesYou}
                    onChange={(e) => {
                      const v = e.target.value
                      if (/^[a-zA-Z0-9\s.,!?-]*$/.test(v)) handleChange('whatDefinesYou', v)
                    }}
                    placeholder="e.g. Your aim, strengths, or what drives you"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-navy placeholder-gray-400 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition resize-y"
                  />
                  {submitTried && errors.whatDefinesYou && (
                    <p className="mt-1 text-sm text-red-600">{errors.whatDefinesYou}</p>
                  )}
                </div>

                {/* hCaptcha – Web3Forms zero-config (enable in Web3Forms dashboard) */}
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
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-blue-custom hover:bg-navy disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold transition-colors focus:ring-2 focus:ring-gold focus:ring-offset-2"
                  >
                    {isSubmitting ? 'Sending…' : 'SUBMIT'}
                  </button>
                </div>
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
