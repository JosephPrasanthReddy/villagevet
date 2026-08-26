import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import { articles } from '../data/articles.js'
import NotFound from './NotFound.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function ArticleDetail() {
  const { slug } = useParams()
  const { t, translate } = useLanguage()
  const article = articles.find((a) => a.slug === slug)
  const articleText = t.articles?.[article?.slug]
  const title = articleText?.title || article?.title
  const excerpt = articleText?.excerpt || article?.excerpt
  const category = article ? translate(article.category) : undefined

  useEffect(() => {
    if (!article) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      articleSection: category,
      publisher: { '@type': 'Organization', name: 'VillageVet India Pvt. Ltd.' }
    })
    document.head.appendChild(script)
    return () => document.head.removeChild(script)
  }, [article, title, category])

  if (!article) return <NotFound />

  const related = articles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 2)

  return (
    <>
      <SEO title={title} description={excerpt} path={`/farmer-awareness/${article.slug}`} />

      <article className="section">
        <div className="container-content max-w-3xl">
          <Link to="/farmer-awareness" className="text-sm font-semibold text-brand">
            ← {translate('Farmer Awareness')}
          </Link>
          <p className="mt-6 eyebrow">{category}</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="mt-4 text-lg text-ink/65">{excerpt}</p>

          <div className="prose prose-sm mt-10 max-w-none space-y-5 text-[15px] leading-relaxed text-ink/75">
            <p>
              {translate('This article provides general awareness on the topic above for farming households. Local conditions, animal history and current health status all affect what is right for a specific animal, so this content is meant as a starting point for discussion with a qualified veterinarian — not a substitute for one.')}
            </p>
            <p>
              {translate("As VillageVet's outlet network grows, farmers will be able to combine this kind of general awareness with direct access to veterinary guidance, medicines, feed and equipment through their nearest VillageVet outlet.")}
            </p>
          </div>

          <p className="mt-10 rounded-xl border border-ink/8 bg-ink-light/60 p-5 text-sm text-ink/60">
            {translate('Educational content is provided for general awareness and should not replace professional veterinary diagnosis or treatment.')}
          </p>

          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="text-lg font-semibold text-ink">{translate('Related Reading')}</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {related.map((a) => {
                  const relText = t.articles?.[a.slug]
                  return (
                    <Link key={a.slug} to={`/farmer-awareness/${a.slug}`} className="card block">
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand">{translate(a.category)}</p>
                      <h3 className="mt-2 text-sm font-semibold text-ink">{relText?.title || a.title}</h3>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
