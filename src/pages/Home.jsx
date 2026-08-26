import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import Hero from '../components/Hero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import FarmerSolutionCard from '../components/FarmerSolutionCard.jsx'
import ProductCategoryCard from '../components/ProductCategoryCard.jsx'
import CTASection from '../components/CTASection.jsx'
import StoreIllustration from '../components/StoreIllustration.jsx'
import OrganicBlob from '../components/OrganicBlob.jsx'
import AwarenessSpotlight from '../components/AwarenessSpotlight.jsx'
import { services } from '../data/services.js'
import { farmerSolutions } from '../data/farmerSolutions.js'
import { articles } from '../data/articles.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const featureHighlights = [
  { title: 'Experienced Veterinary Team', text: 'Professional veterinary guidance grounded in real, on-farm experience.' },
  { title: 'Farm & Livestock Consultation', text: 'Veterinary consultation support tailored to your farm and livestock.' },
  { title: 'Preventive Care & Vaccination', text: 'Farmer-focused health guidance on preventive care and vaccination schedules.' },
  { title: 'Farmer Support Network', text: 'A growing network connecting farmers with animal-health support close to home.' }
]

const whyPoints = [
  { title: 'Accessibility', text: 'Bringing veterinary medicines, feed and equipment physically closer to farming communities.' },
  { title: 'Farmer-First Thinking', text: 'Every decision starts with what a working farmer actually needs on a given day.' },
  { title: 'Veterinary Support', text: 'Connecting farmers with veterinary guidance alongside the products they rely on.' },
  { title: 'Local Availability', text: 'Working towards a retail presence in every mandal, not just district headquarters.' }
]

const ecosystemItems = [
  'Veterinary Medicines', 'Animal Feed', 'Poultry Feed', 'Supplements',
  'Mineral Mixtures', 'Veterinary Equipment', 'Animal Health Products'
]

const partnerAudiences = [
  { title: 'Medicine Manufacturers', text: 'Distribution reach into farming communities through a growing outlet network.' },
  { title: 'Feed Manufacturers', text: 'A retail channel built specifically around livestock and poultry nutrition.' },
  { title: 'Equipment Suppliers', text: 'A route to farmers who need reliable, everyday veterinary equipment.' },
  { title: 'Distributors & Retailers', text: 'A partnership model built around the mandal-level retail vision.' }
]

const whyPartner = [
  'A farmer-first distribution model built for rural India',
  'A single ecosystem spanning medicines, feed, equipment and awareness',
  'A long-term vision — not a one-time transaction',
  'A team focused on doing this responsibly, outlet by outlet'
]

export default function Home() {
  const { t, translate } = useLanguage()
  return (
    <>
      <SEO
        title={translate('Veterinary Care for Farming Communities')}
        description={translate('VillageVet is building a farmer-focused animal-health ecosystem across India — veterinary medicines, feed, equipment, consultation and awareness, closer to every farming community.')}
        path="/"
      />

      <Hero />

      {/* FEATURE HIGHLIGHTS */}
      <section className="section !pt-14 sm:!pt-20">
        <div className="container-content">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featureHighlights.map((f, i) => (
              <Reveal key={f.title} delay={i * 70} className={i % 2 === 1 ? 'card-alt' : 'card'}>
                <span className={i % 2 === 1 ? 'icon-tag-gold' : 'icon-tag'}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M10 17.5C10 17.5 3.5 14 3.5 8.2C3.5 5.3 5.9 3 8.8 3C10 3 10 4.3 10 4.3C10 4.3 10 3 11.2 3C14.1 3 16.5 5.3 16.5 8.2C16.5 14 10 17.5 10 17.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h2 className="mt-5 text-base font-semibold text-ink">{translate(f.title)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{translate(f.text)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY VILLAGEVET */}
      <section className="section section-sand">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('Our Purpose')}
            title={t.home.whyTitle}
            description={translate('Farming communities across India often have to travel far, and wait long, for basic animal-health support. VillageVet exists to close that gap.')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyPoints.map((w, i) => (
              <Reveal key={w.title} delay={i * 70} className={i % 2 === 1 ? 'card-alt !p-6' : 'card !p-6'}>
                <h3 className="text-base font-semibold text-ink">{translate(w.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{translate(w.text)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ANIMAL HEALTH SOLUTIONS */}
      <section className="section">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('What We Offer')}
            title={t.home.solutionsTitle}
            description={translate('A single ecosystem built around everyday animal-health needs on the farm.')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 70}>
                <ServiceCard title={s.title} description={s.description} slug={s.slug} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS FOR FARMERS */}
      <section className="section section-sand">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('By Livestock Category')}
            title={t.home.farmerSolutionsTitle}
            description={translate('Practical, category-specific support for the animals your farm depends on.')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {farmerSolutions.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <FarmerSolutionCard solution={s} compact />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/farmer-solutions" className="btn-secondary">
              {translate('View All Farmer Solutions')}
            </Link>
          </div>
        </div>
      </section>

      {/* MEDICINES + FEED + EQUIPMENT */}
      <section className="section relative overflow-hidden bg-brand-deep text-white">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.06]" aria-hidden="true" />
        <div className="container-content relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow !bg-white/10 !text-gold">{translate('The Ecosystem')}</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold sm:text-4xl">{t.home.ecosystemTitle}</h2>
            <p className="mt-4 max-w-lg text-white/70">
              {translate('Essential animal-health products, feed and equipment brought closer to farming communities — organised as one connected ecosystem rather than scattered, hard-to-find supplies.')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ecosystemItems.map((item, i) => (
              <Reveal
                key={item}
                delay={i * 50}
                className={`rounded-organic border border-white/12 bg-white/5 px-4 py-4 text-sm font-medium text-white/85 transition duration-300 hover:border-gold/50 hover:bg-white/10 ${
                  i % 3 === 1 ? '!rounded-organic-r' : ''
                }`}
              >
                {translate(item)}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RETAIL NETWORK */}
      <section className="section overflow-hidden">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{translate('Planned 4-Outlet Pilot Program')}</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold sm:text-4xl">{t.home.retailTitle}</h2>
            <p className="mt-4 text-ink/65">
              {translate('Bringing medicines, feed, equipment and animal-health support closer to every farming community. VillageVet is starting with a planned four-outlet pilot program that brings these essentials together under one roof, alongside a farmer assistance counter.')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/retail-network" className="btn-primary">{translate('See the Retail Vision')}</Link>
              <Link to="/business-partners" className="btn-secondary">{translate('Partner With VillageVet')}</Link>
            </div>
          </div>
          <Reveal delay={120} className="dynamic-store-visual relative">
            <OrganicBlob color="#F8F1E5" className="absolute -inset-8 -z-10 h-[calc(100%+4rem)] w-[calc(100%+4rem)] opacity-90" />
            <StoreIllustration className="w-full rounded-organic shadow-soft" />
          </Reveal>
        </div>
      </section>

      {/* FARMER AWARENESS */}
      <section className="section section-sand">
        <div className="container-content grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow={translate('Education')}
              title={t.home.awarenessTitle}
              description={translate('Practical, general-awareness content on disease prevention, nutrition and farm hygiene — written for farming communities, not veterinary textbooks.')}
            />
            <Link to="/farmer-awareness" className="btn-secondary mt-8 inline-flex">
              {translate('Browse Farmer Awareness')}
            </Link>
          </div>
          <Reveal delay={100}>
            <AwarenessSpotlight articles={articles} />
          </Reveal>
        </div>
      </section>

      {/* VETERINARY PROFESSIONALS */}
      <section className="section">
        <div className="container-content grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{translate('For Veterinarians')}</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold sm:text-4xl">{t.home.professionalsTitle}</h2>
            <p className="mt-4 text-ink/65">
              {translate('VillageVet is building an ecosystem where veterinary professionals can support farming communities at scale — through consultation opportunities and collaboration as the retail network grows.')}
            </p>
            <Link to="/veterinary-professionals" className="btn-primary mt-8 inline-flex">
              {translate('Join VillageVet')}
            </Link>
          </div>
          <Reveal delay={100} className="card-alt">
            <ul className="space-y-4 text-sm text-ink/70">
              <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />{translate('Community-level animal-health support')}</li>
              <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />{translate('Consultation opportunities as outlets open')}</li>
              <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />{translate('Professional collaboration within the ecosystem')}</li>
              <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />{translate('A farmer base that values consistent veterinary guidance')}</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT CATEGORIES PREVIEW */}
      <section className="section section-sand">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('Catalogue')}
            title={translate('Products Across the Ecosystem')}
            description={translate('A category-level view of what VillageVet outlets bring together.')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <ProductCategoryCard category={{ slug: s.slug, title: s.title, description: s.description }} index={i} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/products" className="btn-secondary">{translate('Browse All Products')}</Link>
          </div>
        </div>
      </section>

      {/* BUSINESS PARTNERS */}
      <section className="section">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('For Businesses')}
            title={t.home.partnersTitle}
            description={translate('VillageVet is looking to build long-term relationships with the businesses that make farm-level animal health possible.')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerAudiences.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} className={i % 2 === 1 ? 'card-alt' : 'card'}>
                <h3 className="text-base font-semibold text-ink">{translate(p.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{translate(p.text)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="section section-sand">
        <div className="container-content grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">{translate('The Case for Partnership')}</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold sm:text-4xl">{t.home.whyPartnerTitle}</h2>
          </div>
          <ul className="space-y-4">
            {whyPartner.map((w, i) => (
              <Reveal
                key={w}
                as="li"
                delay={i * 70}
                className="dynamic-list-item flex items-start gap-3 rounded-organic border border-brand-deep/8 bg-white p-5 text-sm text-ink/70"
              >
                <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-dark">✓</span>
                {translate(w)}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        eyebrow={translate('Get in Touch')}
        title={t.home.contactTitle}
        description={translate("Whether you're a farmer, a veterinarian, or a potential business partner — we'd like to hear from you.")}
        primary={{ to: '/contact', label: translate('Contact VillageVet') }}
        secondary={{ to: '/business-partners', label: translate('Explore Partnerships') }}
      />
    </>
  )
}
