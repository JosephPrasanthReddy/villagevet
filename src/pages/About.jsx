import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import CTASection from '../components/CTASection.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const sections = [
  {
    title: 'Who We Are',
    body: 'VillageVet India Pvt. Ltd. is building a farmer-focused animal-health ecosystem — bringing veterinary medicines, feed, equipment and guidance closer to farming communities across India.'
  },
  {
    title: 'Why VillageVet Was Created',
    body: 'Farming households that depend on cattle, buffalo, goats, sheep and poultry often travel long distances, or wait days, for something as basic as a veterinary medicine or reliable guidance. VillageVet was created to close that distance.'
  },
  {
    title: 'Challenges Facing Farming Communities',
    body: 'Limited local access to veterinary medicines and equipment, inconsistent availability of quality feed, and uneven access to veterinary guidance all add real cost and risk to farming households. These are the everyday problems VillageVet is built around.'
  },
  {
    title: 'Our Vision',
    body: 'A trusted, one-stop animal-health partner for farming communities — with a veterinary shop within reach of every mandal.'
  },
  {
    title: 'Our Mission',
    body: 'To make veterinary medicines, feed, equipment and guidance more accessible, reliable and affordable for farmers, one outlet at a time.'
  },
  {
    title: 'Our Farmer-First Approach',
    body: 'Every part of the VillageVet model — from what an outlet stocks to how it is staffed — is designed around what a working farmer actually needs, not around what is easiest for us to sell.'
  },
  {
    title: 'Our Ecosystem',
    body: 'Veterinary medicines, animal feed, poultry feed, equipment, animal-health products, consultation access and farmer-awareness content, brought together as one connected system rather than separate, hard-to-find pieces.'
  },
  {
    title: 'Our Long-Term Retail Vision',
    body: 'We are starting with a planned four-outlet pilot program under the banner "One Veterinary Shop in Every Mandal." It is the first step towards a much larger retail presence built carefully, outlet by outlet.'
  }
]

export default function About() {
  const { translate } = useLanguage()

  return (
    <>
      <SEO
        title={translate('About VillageVet')}
        description={translate('Who VillageVet is, why we exist, and our long-term vision to become a trusted animal-health partner for farming communities across India.')}
        path="/about"
      />

      <section className="section">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('About VillageVet')}
            title={translate('Built Around Farming Communities, From the Ground Up')}
            description={translate('VillageVet India Pvt. Ltd. — veterinary care for farming communities.')}
            as="h1"
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-content grid gap-8 sm:grid-cols-2">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 70} className="card">
              <h2 className="text-lg font-semibold text-ink">{translate(s.title)}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{translate(s.body)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow={translate('Our Vision in Motion')}
        title={translate('Building Toward One Veterinary Shop in Every Mandal')}
        description={translate('Learn about the planned pilot program and how to be part of it.')}
        primary={{ to: '/retail-network', label: translate('See the Retail Vision') }}
        secondary={{ to: '/contact', label: translate('Contact VillageVet') }}
      />
    </>
  )
}
