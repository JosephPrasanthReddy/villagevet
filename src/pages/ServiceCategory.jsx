import { Link, useParams } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import { services } from '../data/services.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function ServiceCategory() {
  const { slug } = useParams()
  const { t, translate } = useLanguage()

  const service = services.find((item) => item.slug === slug)
  const card = service ? t.cards?.services?.[service.slug] : null
  const title = card?.title || service?.title
  const description = card?.description || service?.description

  if (!service) {
    return (
      <section className="section">
        <div className="container-content text-center">
          <p className="eyebrow">{translate('Service Not Found')}</p>

          <h1 className="mt-5 text-4xl font-semibold text-ink">
            {translate("We couldn't find that service")}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-ink/60">
            {translate("The service you're looking for may have been moved or is not currently available.")}
          </p>

          <Link to="/services" className="btn-primary mt-8">
            {translate('Back to Services')}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEO
        title={title}
        description={description}
        path={`/services/${service.slug}`}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div className="container-content py-16 sm:py-20">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition hover:gap-3"
          >
            <span aria-hidden="true">←</span>
            {translate('Back to Services')}
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="eyebrow">{translate('VillageVet Services')}</p>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/65">
              {description}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <div className="rounded-full bg-brand-light px-5 py-3 text-sm font-semibold text-brand-dark">
              {service.items.length} {translate('items')}
            </div>

            <div className="rounded-full bg-gold-light px-5 py-3 text-sm font-semibold text-gold-dark">
              {translate('Farmer-focused solutions')}
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="border-y border-brand-deep/10 bg-white">
        <div className="container-content py-4">
          <nav
            aria-label={translate('Breadcrumb')}
            className="flex flex-wrap items-center gap-2 text-sm text-ink/55"
          >
            <Link
              to="/"
              className="transition hover:text-brand-dark"
            >
              {translate('Home')}
            </Link>

            <span>/</span>

            <Link
              to="/services"
              className="transition hover:text-brand-dark"
            >
              {translate('Services')}
            </Link>

            <span>/</span>

            <span className="font-semibold text-ink">
              {title}
            </span>
          </nav>
        </div>
      </section>

      {/* Items */}
      <section className="section bg-sand">
        <div className="container-content">
          <div className="max-w-2xl">
            <p className="eyebrow">{translate('Available Categories')}</p>

            <h2 className="mt-5 text-3xl font-semibold text-ink sm:text-4xl">
              {translate('Explore')} {title}
            </h2>

            <p className="mt-4 leading-relaxed text-ink/60">
              {translate('Browse the different solutions available within this category. Product brands, availability and detailed specifications can be added as the VillageVet retail network grows.')}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.items.map((item, index) => (
              <Reveal key={item.name} delay={(index % 3) * 70}>
                <article
                  className={`group flex h-full flex-col rounded-organic ${
                    index % 2 === 1 ? 'bg-white' : 'bg-cream'
                  } border border-brand-deep/10 p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-blob text-2xl ${
                      index % 2 === 1
                        ? 'bg-gold-light'
                        : 'bg-brand-light'
                    }`}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-xl font-semibold text-ink">
                    {translate(item.name)}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">
                    {translate(item.description)}
                  </p>

                  {/* Animal type */}
                  <div className="mt-6 rounded-xl bg-white/70 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark">
                      {translate('Suitable for')}
                    </p>

                    <p className="mt-1 text-sm text-ink/70">
                      {translate(item.animals)}
                    </p>
                  </div>

                  {/* Future product button */}
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition group-hover:gap-3"
                  >
                    {translate('Ask about this')}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-content">
          <div className="overflow-hidden rounded-[2rem] bg-brand-deep px-8 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-gold">
                {translate('Need help?')}
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                {translate('Looking for a specific')} {title.toLowerCase()} {translate('item?')}
              </h2>

              <p className="mt-4 leading-relaxed text-white/70">
                {translate('Contact the VillageVet team and tell us what you need. We can help you understand the available options.')}
              </p>
            </div>

            <Link
              to="/contact"
              className="btn-outline-light mt-8 shrink-0 lg:mt-0"
            >
              {translate('Contact VillageVet')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}