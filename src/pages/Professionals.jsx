import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const points = [
  {
    title: "VillageVet's Veterinary Ecosystem",
    text: 'A model that brings medicines, feed, equipment and guidance together — designed to work alongside veterinary professionals, not around them.'
  },
  {
    title: 'Farmer Support',
    text: 'Direct exposure to farming communities that need consistent, accessible veterinary guidance.'
  },
  {
    title: 'Consultation Opportunities',
    text: 'As the outlet network grows, so does the opportunity for veterinary consultation within it.'
  },
  {
    title: 'Professional Collaboration',
    text: 'A chance to shape how community-level animal-health support is delivered, from the ground up.'
  },
  {
    title: 'Community-Level Impact',
    text: 'Work that is felt directly by farming households, not just in a clinic setting.'
  }
]

export default function Professionals() {
  const { translate } = useLanguage()

  return (
    <>
      <SEO
        title={translate('Veterinary Professionals')}
        description={translate("Explore collaboration and consultation opportunities with VillageVet's growing animal-health ecosystem.")}
        path="/veterinary-professionals"
      />

      <section className="section">
        <div className="container-content grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow={translate('For Veterinarians')}
              title={translate('Veterinary Professionals')}
              description={translate('VillageVet is building an ecosystem designed to work with veterinary professionals — not replace them — as it grows.')}
              as="h1"
            />
            <div className="mt-10 space-y-6">
              {points.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={i * 60}
                  className="rounded-xl border border-ink/8 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <h3 className="text-sm font-semibold text-ink">{translate(p.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{translate(p.text)}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-xs text-ink/45">
              {translate('VillageVet does not yet operate an established veterinarian network — collaboration opportunities will grow alongside the planned outlet pilot program.')}
            </p>
          </div>

          <ContactForm defaultEnquiryType="Veterinary Professional" title={translate('Join VillageVet')} />
        </div>
      </section>
    </>
  )
}
