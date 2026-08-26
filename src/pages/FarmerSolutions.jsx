import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import FarmerSolutionCard from '../components/FarmerSolutionCard.jsx'
import CTASection from '../components/CTASection.jsx'
import { farmerSolutions } from '../data/farmerSolutions.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function FarmerSolutions() {
  const { translate } = useLanguage()
  return (
    <>
      <SEO
        title={translate('Farmer Solutions')}
        description={translate('Category-specific animal-health support for cattle, buffalo, goat, sheep and poultry farmers.')}
        path="/farmer-solutions"
      />

      <section className="section">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('By Livestock Category')}
            title={translate('Solutions for Farmers')}
            description={translate('Every farm is different. Our support is organised around the animals you actually raise.')}
            as="h1"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {farmerSolutions.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <FarmerSolutionCard solution={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={translate('Get Support for Your Farm')}
        description={translate('Tell us about your farm and the VillageVet team will guide you to the right support.')}
        primary={{ to: '/contact', label: translate('Talk to VillageVet') }}
        secondary={{ to: '/farmer-awareness', label: translate('Read Farmer Awareness') }}
      />
    </>
  )
}
