import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function AwarenessSpotlight({ articles = [] }) {
  const { t, translate } = useLanguage()
  const items = useMemo(() => {
    const featured = articles.find((article) => article.featured)
    const rest = articles.filter((article) => article !== featured)
    return [featured, ...rest].filter(Boolean).slice(0, 4)
  }, [articles])
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || items.length < 2) return undefined
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [items.length, paused])

  useEffect(() => {
    if (active >= items.length) setActive(0)
  }, [active, items.length])

  if (!items.length) return null

  const article = items[active]
  const articleText = t.articles?.[article.slug]
  const title = articleText?.title || translate(article.title)
  const excerpt = articleText?.excerpt || translate(article.excerpt)

  const previous = () => setActive((current) => (current - 1 + items.length) % items.length)
  const next = () => setActive((current) => (current + 1) % items.length)

  return (
    <div
      className="awareness-spotlight card-alt"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">{translate('Featured Article')}</p>
        {items.length > 1 && (
          <div className="flex items-center gap-2" aria-label="Article controls">
            <button type="button" className="spotlight-arrow" onClick={previous} aria-label="Previous article">
              <ChevronLeft size={17} strokeWidth={1.9} aria-hidden="true" />
            </button>
            <button type="button" className="spotlight-arrow" onClick={next} aria-label="Next article">
              <ChevronRight size={17} strokeWidth={1.9} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <div key={article.slug} className="spotlight-content">
        <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">{excerpt}</p>
        <Link
          to={`/farmer-awareness/${article.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition hover:gap-2.5"
        >
          {translate('Read article →')}
        </Link>
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
          {items.map((item, index) => (
            <span key={item.slug} className={`spotlight-dot ${index === active ? 'spotlight-dot-active' : ''}`} />
          ))}
        </div>
      )}
    </div>
  )
}
