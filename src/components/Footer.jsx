import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'
import Logo from './Logo.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const quickLinks = [
  { to: '/services', label: 'Services' },
  { to: '/farmer-solutions', label: 'Farmer Solutions' },
  { to: '/retail-network', label: 'Retail Network' },
  { to: '/products', label: 'Products' },
  { to: '/farmer-awareness', label: 'Farmer Awareness' },
  { to: '/veterinary-professionals', label: 'Professionals' },
  { to: '/business-partners', label: 'Partners' },
  { to: '/contact', label: 'Contact Us' }
]

// Social URLs are intentionally left as configurable placeholders — do not
// invent real profile links. Set VITE_SOCIAL_* in .env once accounts exist.
const socials = [
  { key: 'Instagram', env: import.meta.env.VITE_SOCIAL_INSTAGRAM },
  { key: 'Facebook', env: import.meta.env.VITE_SOCIAL_FACEBOOK },
  { key: 'LinkedIn', env: import.meta.env.VITE_SOCIAL_LINKEDIN },
  { key: 'YouTube', env: import.meta.env.VITE_SOCIAL_YOUTUBE }
]

export default function Footer() {
  const { lang, setLang, languages, translate } = useLanguage()

  return (
    <footer className="relative bg-brand-deep text-white/80">
      <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-[99%] overflow-hidden leading-none" aria-hidden="true">
        <svg
          className="wave-divider text-brand-deep"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path d="M0 60 C 200 0, 400 0, 600 30 C 800 60, 1000 60, 1200 10 L1200 60 L0 60 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container-content grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            {translate('VillageVet India Pvt. Ltd. — Veterinary care for farming communities.')}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {socials.map((s) =>
              s.env ? (
                <a
                  key={s.key}
                  href={s.env}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.key}
                  className="rounded-full border border-white/15 px-3.5 py-1.5 transition hover:border-gold hover:text-gold"
                >
                  {s.key}
                </a>
              ) : (
                <span
                  key={s.key}
                  aria-disabled="true"
                  title={`${s.key} ${translate('link coming soon')}`}
                  className="cursor-default rounded-full border border-white/10 px-3.5 py-1.5 text-white/35"
                >
                  {s.key}
                </span>
              )
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold/80">{translate('Quick Links')}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-gold">
                  {translate(l.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold/80">{translate('Contact Us')}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href="mailto:Subba.reddy@villagevetindia.com" className="transition hover:text-gold">
                Subba.reddy@villagevetindia.com
              </a>
            </li>
            <li>
              <a href="tel:+919704420273" className="transition hover:text-gold">
                +91 97044 20273
              </a>
            </li>
          </ul>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gold/80">{translate('Legal')}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/privacy-policy" className="transition hover:text-gold">{translate('Privacy Policy')}</Link></li>
            <li><Link to="/terms" className="transition hover:text-gold">{translate('Terms')}</Link></li>
            <li><Link to="/medical-disclaimer" className="transition hover:text-gold">{translate('Medical Disclaimer')}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>{translate('© 2026 VillageVet India Pvt. Ltd. All rights reserved.')}</p>
          <label className="footer-language-select">
            <span aria-hidden="true"><Globe size={14} strokeWidth={2} /></span>
            <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label={translate('Select language')}>
              {languages.map((language) => (
                <option key={language.code} value={language.code}>{language.native}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </footer>
  )
}
