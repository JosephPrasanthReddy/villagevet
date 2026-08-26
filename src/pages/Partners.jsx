import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const audiences = [
  { title: 'Veterinary Medicine Manufacturers', text: 'A distribution channel built specifically around farming communities and everyday animal-health needs.' },
  { title: 'Feed Manufacturers', text: 'A retail model designed around livestock and poultry nutrition, mandal by mandal.' },
  { title: 'Equipment Manufacturers', text: 'A route to farmers who rely on dependable veterinary equipment.' },
  { title: 'Distributors', text: 'A growing network of outlets built around a consistent, farmer-first model.' },
  { title: 'Veterinary Professionals', text: 'Opportunities for consultation and collaboration as outlets open.' },
  { title: 'Retail Partners', text: 'A chance to operate within the VillageVet outlet model at the local level.' },
  { title: 'Technology Partners', text: 'A technology-enabled future for the animal-health ecosystem VillageVet is building.' }
]

export default function Partners() {
  const { translate } = useLanguage()

  return (
    <>
      <SEO
        title={translate('Business Partners')}
        description={translate('VillageVet welcomes partnerships with veterinary medicine manufacturers, feed manufacturers, equipment suppliers, distributors and retail partners.')}
        path="/business-partners"
      />

      <section className="section">
        <div className="container-content grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow={translate('For Businesses')}
              title={translate('Business Partners')}
              description={translate('VillageVet is looking to build long-term relationships with the businesses that make farm-level animal health possible.')}
              as="h1"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {audiences.map((a, i) => (
                <Reveal
                  key={a.title}
                  delay={(i % 2) * 60}
                  className="rounded-xl border border-ink/8 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <h3 className="text-sm font-semibold text-ink">{translate(a.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{translate(a.text)}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <ContactForm defaultEnquiryType="Business Partnership" title={translate('Partner With VillageVet')} />
        </div>
      </section>
    </>
  )
}
