import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Globe, Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'
import AIAssistantCTA from './AIAssistantCTA.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const links = [
  { to: '/about', key: 'about' },
  { to: '/services', key: 'services' },
  { to: '/farmer-solutions', key: 'farmerSolutions' },
  { to: '/retail-network', key: 'retailNetwork' },
  { to: '/products', key: 'products' },
  { to: '/farmer-awareness', key: 'farmerAwareness' },
  { to: '/veterinary-professionals', key: 'professionals' },
  { to: '/business-partners', key: 'partners' }
]

export default function Navbar() {
  const { t, lang, setLang, languages, translate } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let frame = null
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
        setScrolled(window.scrollY > 8)
        setScrollProgress(Math.min(window.scrollY / maxScroll, 1))
        frame = null
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [lang])

  // The mobile menu is a fixed slide-over. It must never become part of the
  // page flow (the previous implementation made the whole hero jump down).
  useEffect(() => {
    if (!open) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const primaryLinks = [{ to: '/', key: 'home', end: true }, ...links]

  return (
    <header className="sticky top-0 z-50">
      <div className="header-progress-track" aria-hidden="true">
        <div
          className="header-progress-fill"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <div
        className={`border-b border-ink/[0.08] transition-all ${
          scrolled ? 'bg-cream/95 shadow-card backdrop-blur-xl' : 'bg-cream/90 backdrop-blur-xl'
        }`}
      >
        {/* Desktop/tablet top row: branding + actions. Keeping the actions on
            their own row gives every Indian-language label enough room. */}
        <div className={`header-top-row mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10 ${scrolled ? 'header-top-row-scrolled' : ''}`}>
          <Link
            to="/"
            aria-label="VillageVet home"
            className="shrink-0"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>

          <div className="hidden min-w-0 items-center justify-end gap-2 lg:flex xl:gap-3">
            <label className="language-select header-language-select">
              <Globe size={16} strokeWidth={2} aria-hidden="true" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                aria-label={translate('Select language')}
              >
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>{language.native}</option>
                ))}
              </select>
            </label>

            <AIAssistantCTA variant="outline" />

            <Link to="/contact" className="btn-primary !px-5 !py-2.5 whitespace-nowrap">
              {t.nav.contact}
            </Link>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-white/60 text-ink shadow-sm transition hover:border-gold hover:bg-gold-light lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open
              ? <X size={21} strokeWidth={1.8} aria-hidden="true" />
              : <Menu size={21} strokeWidth={1.8} aria-hidden="true" />}
          </button>
        </div>

        {/* Desktop/tablet navigation. A nine-column grid is intentionally used
            instead of one long flex row: translated labels may wrap inside
            their own cell, but can never push the page horizontally. */}
        <nav
          className="mx-auto hidden w-full max-w-[1600px] grid-cols-9 items-stretch gap-1 px-5 pb-2 sm:px-8 lg:grid lg:px-10"
          aria-label="Primary"
        >
          {primaryLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `header-nav-link relative flex min-h-[46px] min-w-0 items-center justify-center rounded-2xl px-2 py-2 text-center text-[12px] font-semibold leading-[1.25] transition duration-200 xl:px-3 xl:text-[13px] ${
                  isActive
                    ? 'bg-brand-light text-brand-dark shadow-sm'
                    : 'text-ink/70 hover:bg-white/70 hover:text-ink'
                }`
              }
            >
              <span className="min-w-0">{t.nav[item.key]}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Small-screen slide-over. It overlays the page instead of increasing
          header height, so opening it no longer pushes the hero downward. */}
      {open && (
        <div
          className="mobile-nav-backdrop fixed inset-0 z-[80] bg-ink/25 backdrop-blur-[2px] lg:hidden"
          role="presentation"
          onMouseDown={() => setOpen(false)}
        >
          <aside
            className="mobile-nav-drawer absolute right-0 top-0 flex h-dvh w-[min(90vw,420px)] flex-col overflow-hidden border-l border-ink/10 bg-cream shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-ink/10 px-5 py-3">
              <Link to="/" onClick={() => setOpen(false)} aria-label="VillageVet home">
                <Logo className="[&_img]:!h-14" />
              </Link>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white/70 transition hover:border-gold hover:bg-gold-light"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={22} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <nav className="flex flex-col gap-1.5" aria-label="Mobile">
                {primaryLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `mobile-nav-link rounded-2xl px-4 text-sm font-semibold transition duration-200 ${
                        isActive
                          ? 'bg-brand-light text-brand-dark'
                          : 'text-ink/80 hover:bg-white/70 hover:text-ink'
                      }`
                    }
                  >
                    {t.nav[item.key]}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="shrink-0 border-t border-ink/10 bg-white/35 p-5">
              <div className="grid gap-3">
                <label className="language-select language-select-mobile !flex w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Globe size={17} strokeWidth={2} aria-hidden="true" />
                    <span className="text-xs font-semibold text-ink/65">{translate('Select language')}</span>
                  </span>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    aria-label={translate('Select language')}
                  >
                    {languages.map((language) => (
                      <option key={language.code} value={language.code}>{language.native}</option>
                    ))}
                  </select>
                </label>

                <AIAssistantCTA variant="outline" className="w-full [&>button]:w-full" />

                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full !px-5 !py-3"
                >
                  {t.nav.contact}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  )
}
