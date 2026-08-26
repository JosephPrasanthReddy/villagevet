import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Store } from 'lucide-react'
import AIAssistantCTA from './AIAssistantCTA.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import AnimatedNumber from './AnimatedNumber.jsx'
import { heroPhotos, livestockPhotos } from '../data/media.js'

export default function Hero() {
  const { t, translate } = useLanguage()
  const artRef = useRef(null)
  const [activePhoto, setActivePhoto] = useState(0)
  const [photoPaused, setPhotoPaused] = useState(false)

  useEffect(() => {
    if (photoPaused || heroPhotos.length < 2 || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % heroPhotos.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [photoPaused])

  useEffect(() => {
    const node = artRef.current
    if (!node || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || window.matchMedia?.('(pointer: coarse)').matches) {
      return undefined
    }

    let frame = null
    const update = (event) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
        node.style.setProperty('--vv-frame-x', `${x * 5}px`)
        node.style.setProperty('--vv-frame-y', `${y * 4}px`)
        node.style.setProperty('--vv-card-x', `${x * 11}px`)
        node.style.setProperty('--vv-card-y', `${y * 8}px`)
        node.style.setProperty('--vv-main-x', `${x * -5}px`)
        node.style.setProperty('--vv-main-y', `${y * -4}px`)
        node.style.setProperty('--vv-glow-x', `${x * -7}px`)
        node.style.setProperty('--vv-glow-y', `${y * -5}px`)
      })
    }

    const reset = () => {
      node.style.setProperty('--vv-frame-x', '0px')
      node.style.setProperty('--vv-frame-y', '0px')
      node.style.setProperty('--vv-card-x', '0px')
      node.style.setProperty('--vv-card-y', '0px')
      node.style.setProperty('--vv-main-x', '0px')
      node.style.setProperty('--vv-main-y', '0px')
      node.style.setProperty('--vv-glow-x', '0px')
      node.style.setProperty('--vv-glow-y', '0px')
    }

    node.addEventListener('pointermove', update, { passive: true })
    node.addEventListener('pointerleave', reset)
    return () => {
      node.removeEventListener('pointermove', update)
      node.removeEventListener('pointerleave', reset)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const goToPhoto = (next) => {
    setActivePhoto((next + heroPhotos.length) % heroPhotos.length)
  }

  return (
    <section className="hero-modern">
      <div className="hero-modern-pattern" aria-hidden="true" />
      <div className="container-content relative grid items-stretch gap-8 py-7 sm:py-10 lg:grid-cols-[.88fr_1.12fr] lg:gap-10 lg:py-12">
        <div className="hero-modern-copy">
          <p className="eyebrow">{t.home.heroEyebrow}</p>
          <h1 className="hero-heading mt-6 max-w-lg text-balance text-4xl font-semibold leading-[1.05] tracking-[-.03em] text-ink sm:text-5xl lg:text-6xl">
            {t.home.heroHeadline}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink/65 sm:text-xl">
            {t.home.heroSub}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to="/services" className="btn-primary btn-arrow">{t.home.ctaPrimary}<span aria-hidden="true">→</span></Link>
            <Link to="/contact" className="btn-secondary">{t.home.ctaSecondary}</Link>
            <AIAssistantCTA variant="outline" />
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-2.5 sm:gap-3">
            {[
              [4, t.home.heroStatOutlets],
              [5, t.home.heroStatCategories],
              [1, t.home.heroStatEcosystem]
            ].map(([number, label], index) => (
              <div key={label} className="hero-stat dynamic-stat" style={{ '--stat-delay': `${index * 90}ms` }}>
                <strong><AnimatedNumber value={number} /></strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={artRef}
          className="hero-modern-art"
          onMouseEnter={() => setPhotoPaused(true)}
          onMouseLeave={() => setPhotoPaused(false)}
          onFocusCapture={() => setPhotoPaused(true)}
          onBlurCapture={() => setPhotoPaused(false)}
        >
          <div className="hero-art-glow" aria-hidden="true" />
          <div className="hero-art-frame hero-photo-frame">
            <div className="hero-art-topline"><span>VILLAGEVET</span><span>FARMER FIRST</span></div>
            <div className="hero-photo-stage">
              {heroPhotos.map((photo, index) => (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  className={`hero-photo-slide ${index === activePhoto ? 'hero-photo-slide-active' : ''}`}
                  style={{ objectPosition: photo.position }}
                />
              ))}
              <div className="hero-photo-shade" aria-hidden="true" />
              <div className="hero-photo-label" key={activePhoto}>
                <span>{translate(heroPhotos[activePhoto].label)}</span>
              </div>
            </div>

            <div className="hero-photo-controls">
              <button type="button" onClick={() => goToPhoto(activePhoto - 1)} aria-label="Previous farm photo">
                <ChevronLeft size={17} aria-hidden="true" />
              </button>
              <div className="hero-photo-dots" role="group" aria-label="Farm photos">
                {heroPhotos.map((photo, index) => (
                  <button
                    key={photo.src}
                    type="button"
                    className={index === activePhoto ? 'is-active' : ''}
                    onClick={() => setActivePhoto(index)}
                    aria-label={`Show ${translate(photo.label)}`}
                    aria-pressed={index === activePhoto}
                  />
                ))}
              </div>
              <button type="button" onClick={() => goToPhoto(activePhoto + 1)} aria-label="Next farm photo">
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            </div>
            <div className="hero-photo-timer" key={`timer-${activePhoto}`} aria-hidden="true" />
          </div>

          <div className="hero-float-card hero-float-card-main">
            <span className="hero-float-icon"><Store size={20} strokeWidth={2} aria-hidden="true" /></span>
            <div><small>{t.home.heroVisionLabel}</small><strong>{t.home.heroVisionText}</strong></div>
          </div>
          <div className="hero-float-card hero-float-card-side hero-livestock-stack">
            <span className="hero-mini-photos" aria-hidden="true">
              {['cattle-dairy', 'buffalo', 'goat', 'sheep', 'poultry'].map((slug) => (
                <img key={slug} src={`${livestockPhotos[slug].src}&w=140`} alt="" loading="lazy" />
              ))}
            </span>
            <span>{t.home.heroLivestockLabel}</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom-strip">
        <div className="hero-ticker" aria-label="VillageVet ecosystem">
          <div className="hero-ticker-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="hero-ticker-group" aria-hidden={copy === 1 ? 'true' : undefined}>
                <span>{t.home.heroStripMedicines}</span>
                <span>{t.home.heroStripFeed}</span>
                <span>{t.home.heroStripFarmerSupport}</span>
                <span>{t.home.heroStripGuidance}</span>
                <span>{t.home.heroStripRetail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
