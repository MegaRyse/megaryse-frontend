import { useEffect } from 'react'
import Logo from '../assets/images/logo_1.png'
import LogoWebp from '../assets/images/logo_1.webp'
import { OptimizedImage } from '../components/OptimizedImage'

const TITLE = "We'll be back shortly | MegaRyse EduCntr"
const DESCRIPTION =
  'MegaRyse EduCntr is temporarily unavailable while we make improvements. Please check back soon.'

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/megaryse_edcntr/',
    icon: InstagramIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/megaryse-educntr',
    icon: LinkedInIcon,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919901370886',
    icon: WhatsAppIcon,
  },
] as const

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M6.94 8.5H3.75V20h3.2V8.5ZM5.34 3.5A1.85 1.85 0 1 0 5.35 7.2 1.85 1.85 0 0 0 5.34 3.5ZM20.25 20h-3.19v-5.6c0-1.34-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V20H9.87V8.5h3.06v1.57h.04c.43-.8 1.47-1.65 3.02-1.65 3.23 0 3.83 2.13 3.83 4.9V20Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M12.04 2.5A9.5 9.5 0 0 0 3.3 16.55L2.5 21.5l5.07-.78A9.5 9.5 0 1 0 12.04 2.5Zm0 1.74a7.76 7.76 0 0 1 6.55 11.93 7.73 7.73 0 0 1-6.52 3.57 7.7 7.7 0 0 1-3.7-.94l-.26-.15-3 .46.47-2.92-.17-.28A7.76 7.76 0 0 1 12.04 4.24Zm-3.3 3.6c-.18 0-.47.07-.71.34-.24.28-.93.9-.93 2.2s.95 2.55 1.08 2.73c.13.17 1.84 2.95 4.54 4.02 2.25.88 2.7.7 3.19.66.49-.04 1.57-.64 1.79-1.25.22-.62.22-1.15.15-1.25-.07-.11-.26-.17-.54-.3-.28-.13-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.16.18-.33.2-.61.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.56.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.18.05-.35-.02-.49-.07-.14-.63-1.53-.87-2.09-.23-.55-.46-.47-.64-.48Z" />
    </svg>
  )
}

export default function Maintenance() {
  useEffect(() => {
    document.title = TITLE
    const robots = document.querySelector('meta[name="robots"]')
    if (robots) robots.setAttribute('content', 'noindex, nofollow')
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-offwhite">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg text-center">
          <OptimizedImage
            src={Logo}
            webpSrc={LogoWebp}
            alt="MegaRyse EduCntr"
            className="mx-auto mb-10 h-16 w-auto sm:h-20"
          />
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold sm:text-xs">
            Temporarily offline
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            We&apos;ll be back shortly
          </h1>
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-gray-600 sm:text-lg">
            {DESCRIPTION}
          </p>
          <div className="mx-auto h-px w-16 bg-gradient-gold" />
          <p className="mt-8 text-sm text-gray-500">
            Need help now?{' '}
            <a
              href="mailto:info@megaryse.com"
              className="font-semibold text-blue-custom underline-offset-2 hover:text-gold hover:underline"
            >
              info@megaryse.com
            </a>
          </p>
        </div>
      </div>

      <div className="px-6 pb-10 pt-2">
        <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-xs">
          Stay connected
        </p>
        <ul className="flex items-center justify-center gap-3 sm:gap-4">
          {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-white text-blue-custom shadow-sm transition-colors duration-200 hover:border-gold hover:bg-gradient-gold hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
