import { Link } from 'react-router-dom'
import { useEnquireModal } from '../context/EnquireModalContext'
import Logo from '../assets/images/footer-logo.png'
import LogoWebp from '../assets/images/footer-logo.webp'
import { OptimizedImage } from './OptimizedImage'
import Scanner from './Scanner'

/** Brand palette — matches visiting card / Tailwind tokens */
const BRAND = {
  navy: '#00275E',
  navyDeep: '#050B23',
  gold: '#C9A978',
  goldBright: '#FFD447',
  goldRich: '#c0a142',
  offwhite: '#F5F2EA',
} as const

const Footer = () => {
  const { openEnquireModal } = useEnquireModal()
  return (
    <footer className="relative mt-auto min-h-[320px] overflow-hidden border-t border-gold/30 bg-[#00275E] sm:min-h-[360px]">
      {/* Scanner — full-bleed animated field behind footer content */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 h-full w-full">
          <Scanner
            color1={BRAND.goldRich}
            color2={BRAND.gold}
            color3={BRAND.goldBright}
            speed={0.5}
            sweepSpeed={0.25}
            sweepWidth={1.6}
            sweepFalloff={6}
            scale={1.5}
            frequency={2}
            ripple={0.22}
            bandDensity={11}
            lineSharpness={5.5}
            glow={0.22}
            scanDirection="vertical"
            colorSpread={0.7}
            brightness={1.0}
            contrast={1.15}
            softness={1.4}
            vignette={0.45}
            scanline
            grain
            grainIntensity={0.05}
            opacity={1.0}
            mouseInteraction={false}
            mouseRadius={0.5}
            mouseStrength={0.5}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Soft navy veil so logo + copy stay readable over the scan field */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#00275E]/80 via-[#00275E]/55 to-[#050B23]/75"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-container px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-9 text-center sm:grid-cols-2 sm:gap-10 sm:text-left md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="sm:col-span-2 md:col-span-1">
            <Link
              to="/"
              aria-label="MegaRyse EduCntr home"
              className="mx-auto inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:mx-0"
            >
              <span className="flex h-24 w-44 flex-shrink-0 items-center justify-center sm:h-28 sm:w-52">
                <OptimizedImage
                  src={Logo}
                  webpSrc={LogoWebp}
                  alt="MegaRyse EduCntr logo"
                  className="h-full w-full object-contain"
                />
              </span>
            </Link>
            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/75 sm:mx-0">
              Your trusted partner in higher education and career advancement.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/about" className="transition-colors hover:text-gold-bright">About Us</Link></li>
              <li><Link to="/universities" className="transition-colors hover:text-gold-bright">Universities</Link></li>
              <li><Link to="/courses" className="transition-colors hover:text-gold-bright">Courses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white">Resources</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/careers" className="transition-colors hover:text-gold-bright">Careers</Link></li>
              <li>
                <button
                  type="button"
                  onClick={openEnquireModal}
                  className="border-0 bg-transparent p-0 text-center text-sm text-white/70 transition-colors hover:text-gold-bright sm:text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white">Contact</h4>
            <ul className="space-y-3 text-sm leading-relaxed text-white/70">
              <li>
                <span className="block text-xs font-semibold uppercase tracking-wide text-gold/90">Email</span>
                <a href="mailto:info@megaryse.com" className="break-all transition-colors hover:text-gold-bright">
                  info@megaryse.com
                </a>
              </li>
              <li>
                <span className="block text-xs font-semibold uppercase tracking-wide text-gold/90">Phone</span>
                <a href="tel:+15551234567" className="transition-colors hover:text-gold-bright">
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-center text-xs text-white/60 sm:flex-row sm:text-left">
          <p>&copy; 2026 MegaRyse EduCntr. All rights reserved.</p>
          <button
            type="button"
            onClick={openEnquireModal}
            className="font-semibold text-gold transition-colors hover:text-gold-bright"
          >
            Start your learning journey →
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
