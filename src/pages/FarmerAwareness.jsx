import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { articles, articleCategories } from '../data/articles.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const categoryAccent = {
  'Disease Awareness': 'before:bg-brand-deep',
  'Poultry Health': 'before:bg-gold',
  Nutrition: 'before:bg-brand',
  'Farm Hygiene': 'before:bg-brand-dark',
  'Heat Stress': 'before:bg-gold',
  Vaccination: 'before:bg-soil'
}

export default function FarmerAwareness() {
  const { t, translate } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const featured = articles.find((a) => a.featured) || articles[0]
  const featuredText = t.articles?.[featured.slug]
  const featuredTitle = featuredText?.title || featured.title
  const featuredExcerpt = featuredText?.excerpt || featured.excerpt

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return articles.filter((a) => {
      const matchesCategory = category === 'All' || a.category === category
      const articleText = t.articles?.[a.slug]
      const searchableTitle = articleText?.title || a.title
      const searchableExcerpt = articleText?.excerpt || a.excerpt
      const matchesQuery =
        !needle ||
        searchableTitle.toLowerCase().includes(needle) ||
        searchableExcerpt.toLowerCase().includes(needle)
      return matchesCategory && matchesQuery
    })
  }, [query, category, t.articles])

  return (
    <>
      <SEO
        title={translate('Farmer Awareness')}
        description={translate('Educational articles on disease awareness, poultry health, heat stress, vaccination, nutrition and farm hygiene for farming communities.')}
        path="/farmer-awareness"
      />

      <section className="section">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('Education')}
            title={translate('Farmer Awareness')}
            description={translate('General-awareness content to help farming households recognise risks early and manage animal health proactively.')}
          />

          <div className="mt-10 rounded-organic bg-brand-deep p-8 text-white sm:p-10">
            <p className="eyebrow !text-gold">{translate('Featured Article')}</p>
            <h2 className="mt-3 text-2xl font-semibold">{featuredTitle}</h2>
            <p className="mt-2 max-w-xl text-white/70">{featuredExcerpt}</p>
            <Link to={`/farmer-awareness/${featured.slug}`} className="btn-primary mt-6 inline-flex">
              {translate('Read Article')}
            </Link>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory('All')}
                aria-pressed={category === 'All'}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  category === 'All' ? 'bg-brand text-white' : 'bg-white text-ink/70 hover:bg-ink-light'
                }`}
              >
                {translate('All')}
              </button>
              {articleCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    category === c ? 'bg-brand text-white' : 'bg-white text-ink/70 hover:bg-ink-light'
                  }`}
                >
                  {translate(c)}
                </button>
              ))}
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={translate('Search articles…')}
              aria-label={translate('Search farmer awareness articles')}
              className="w-full max-w-xs rounded-full border border-ink/15 px-4 py-2.5 text-sm outline-none focus:border-brand sm:w-64"
            />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            {filtered.map((a, i) => {
              const articleText = t.articles?.[a.slug]
              const articleTitle = articleText?.title || a.title
              const articleExcerpt = articleText?.excerpt || a.excerpt
              return (
                <Reveal key={a.slug} delay={(i % 3) * 70}>
                  <Link
                    to={`/farmer-awareness/${a.slug}`}
                    className={`card relative block overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:content-[''] ${
                      categoryAccent[a.category] || 'before:bg-brand'
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand">{translate(a.category)}</p>
                    <h3 className="mt-3 text-base font-semibold text-ink">{articleTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{articleExcerpt}</p>
                  </Link>
                </Reveal>
              )
            })}
            {filtered.length === 0 && (
              <p className="col-span-full py-10 text-center text-sm text-ink/50">
                {translate('No articles match your search yet.')}
              </p>
            )}
          </div>

          <p className="mt-14 rounded-xl border border-ink/8 bg-ink-light/60 p-5 text-sm text-ink/60">
            {translate('Educational content is provided for general awareness and should not replace professional veterinary diagnosis or treatment.')}
          </p>
        </div>
      </section>
    </>
  )
}
