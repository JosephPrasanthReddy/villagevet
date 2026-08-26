import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import CTASection from '../components/CTASection.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const highlights = [
  { title: 'Farmer-Focused Model', text: 'Built around the everyday animal-health needs of dairy, cattle, buffalo, goat, sheep and poultry farmers.' },
  { title: 'Veterinary Services', text: 'Consultation and guidance positioned alongside products, not sold separately from them.' },
  { title: 'Medicine Access', text: 'Working to bring veterinary medicines meaningfully closer to farming communities.' },
  { title: 'Feed & Equipment', text: 'A retail model that brings feed and equipment into the same ecosystem as medicines and guidance.' },
  { title: 'Retail Expansion', text: 'Starting with a planned four-outlet pilot program under "One Veterinary Shop in Every Mandal."' },
  { title: 'Technology-Enabled Future', text: 'A long-term vision for a more connected, technology-enabled animal-health ecosystem.' }
]

export default function Investors() {
  const { translate } = useLanguage()

  return (
    <>
      <SEO
        title={translate('Investors & Business Opportunity')}
        description={translate("VillageVet's long-term vision to build a trusted animal-health ecosystem for India's farming communities.")}
        path="/investors"
      />

      <section className="section">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('Business Opportunity')}
            title={translate("Building a Trusted Animal-Health Ecosystem for India's Farming Communities")}
            description={translate('VillageVet is at an early stage — a planned pilot program, and a clear, long-term vision for what it can grow into.')}
            as="h1"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={(i % 3) * 70} className="card">
                <h3 className="text-base font-semibold text-ink">{translate(h.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{translate(h.text)}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 rounded-organic bg-brand-deep p-8 text-white sm:p-10">
            <h3 className="text-xl font-semibold">{translate('A Note on This Page')}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
              {translate("This page presents VillageVet's business vision and direction. It is not an offer, solicitation, or guarantee of any investment outcome, and does not include revenue, funding, valuation or growth figures, as none are being published at this stage. Anyone interested in exploring a business relationship with VillageVet is welcome to get in touch directly.")}
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow={translate("Let's Talk")}
        title={translate("Interested in VillageVet's Vision?")}
        description={translate('Reach out to start a conversation about the business opportunity.')}
        primary={{ to: '/contact', label: translate('Contact VillageVet') }}
        secondary={{ to: '/about', label: translate('Read Our Story') }}
      />
    </>
  )
}
