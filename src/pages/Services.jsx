import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CTASection from '../components/CTASection.jsx'
import { services } from '../data/services.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Services() {
  const { translate } = useLanguage()

  return (
    <>
      <SEO
        title={translate('Our Services')}
        description={translate("Veterinary medicines, animal feed, poultry feed, equipment, animal-health products, consultation and farmer awareness — VillageVet's animal-health solutions.")}
        path="/services"
      />

      <section className="section">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('What We Offer')}
            title={translate('Our Animal Health Solutions')}
            description={translate('A single ecosystem built around the everyday animal-health needs of farming households.')}
            as="h1"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 70}>
                <ServiceCard
                  title={s.title}
                  description={s.description}
                  slug={s.slug}
                  index={i}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={translate('Have a Question About Our Services?')}
        description={translate('Reach out and the VillageVet team will be glad to help.')}
        primary={{ to: '/contact', label: translate('Contact Us') }}
        secondary={{ to: '/products', label: translate('View Products') }}
      />
    </>
  )
}