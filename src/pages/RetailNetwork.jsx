import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import StoreIllustration from '../components/StoreIllustration.jsx'
import OrganicBlob from '../components/OrganicBlob.jsx'
import CTASection from '../components/CTASection.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const storeContains = [
  'Veterinary medicines',
  'Cattle feed',
  'Poultry feed',
  'Supplements',
  'Mineral mixtures',
  'Veterinary equipment',
  'Animal-care products',
  'Farmer assistance counter'
]

const pilotFacts = [
  { label: 'Program', value: 'Planned 4-Outlet Pilot Program' },
  { label: 'Vision', value: 'One Veterinary Shop in Every Mandal' },
  { label: 'Model', value: 'Medicines, feed, equipment & support — under one roof' }
]

export default function RetailNetwork() {
  const { translate } = useLanguage()

  return (
    <>
      <SEO
        title={translate('VillageVet Retail Network')}
        description={translate("One Veterinary Shop in Every Mandal — VillageVet's planned four-outlet pilot program bringing medicines, feed, equipment and animal-health support closer to farming communities.")}
        path="/retail-network"
      />

      <section className="section overflow-hidden">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{translate('Our Retail Vision')}</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{translate('One Veterinary Shop in Every Mandal')}</h1>
            <p className="mt-5 text-lg text-ink/65">
              {translate('Bringing medicines, feed, equipment and animal-health support closer to every farming community.')}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {pilotFacts.map((f, i) => (
                <Reveal
                  key={f.label}
                  delay={i * 70}
                  className="rounded-xl border border-ink/8 bg-white p-4 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">{translate(f.label)}</p>
                  <p className="mt-1.5 text-sm font-semibold text-ink">{translate(f.value)}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={120} className="relative">
            <OrganicBlob color="#F3E5D6" className="absolute -inset-8 -z-10 h-[calc(100%+4rem)] w-[calc(100%+4rem)] opacity-90" />
            <StoreIllustration className="w-full rounded-xl2 shadow-cardHover" />
          </Reveal>
        </div>
      </section>

      <section className="section bg-ink-light/60">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('The Pilot Program')}
            title={translate('A Planned 4-Outlet Pilot Program')}
            description={translate('VillageVet is beginning with a planned pilot program of four outlets. This is our first, deliberate step toward the long-term vision of a veterinary shop within reach of every mandal — not a claim that the full network is already in place.')}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {storeContains.map((item, i) => (
              <Reveal key={item} delay={(i % 4) * 70} className="card !p-5 text-center">
                <p className="text-sm font-medium text-ink">{translate(item)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content grid gap-10 lg:grid-cols-2">
          <Reveal className="rounded-organic border border-brand-deep/8 bg-white p-8 shadow-card">
            <h2 className="text-xl font-semibold text-ink">{translate('What Each Outlet Aims to Offer')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              {translate('Each planned VillageVet outlet is designed to bring veterinary medicines, animal feed, poultry feed, equipment and animal-health products together in one place — supported by a farmer assistance counter, so farmers are not left to figure things out alone.')}
            </p>
          </Reveal>
          <Reveal delay={90} className="rounded-organic-r border border-brand-deep/8 bg-white p-8 shadow-card">
            <h2 className="text-xl font-semibold text-ink">{translate('A Model We Aim to Grow Carefully')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              {translate('We aim to expand mandal by mandal, learning from each outlet before opening the next — building a retail network that farming communities can rely on for the long term.')}
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow={translate('Be Part of the Network')}
        title={translate('Partner With VillageVet')}
        description={translate('Retail partners, distributors and local operators interested in the VillageVet outlet model are welcome to get in touch.')}
        primary={{ to: '/business-partners', label: translate('Partner With VillageVet') }}
        secondary={{ to: '/contact', label: translate('Contact Us') }}
      />
    </>
  )
}
