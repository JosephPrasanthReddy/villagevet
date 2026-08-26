import SEO from '../components/SEO.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Disclaimer() {
  const { translate } = useLanguage()

  return (
    <>
      <SEO
        title={translate('Medical Disclaimer')}
        description={translate('Important disclaimer regarding educational and animal-health content on the VillageVet website.')}
        path="/medical-disclaimer"
      />
      <section className="section">
        <div className="container-content max-w-3xl">
          <SectionHeader eyebrow={translate('Legal')} title={translate('Medical Disclaimer')} as="h1" />
          <div className="prose prose-sm mt-8 max-w-none space-y-6 text-sm leading-relaxed text-ink/70">
            <p>
              {translate('The information provided on www.villagevetindia.com, including all Farmer Awareness articles and general descriptions of animal-health solutions, is intended for general educational purposes only.')}
            </p>
            <p>
              {translate('It is not intended to diagnose, treat, cure or prevent any animal-health condition, and should not be relied upon as a substitute for professional veterinary diagnosis, treatment or advice. Always consult a qualified veterinarian regarding the specific health needs of your animals.')}
            </p>
            <p>
              {translate('VillageVet does not make claims about the medical efficacy of any product or service beyond what is explicitly and accurately stated. Descriptions of veterinary medicines, feed, supplements and equipment on this website are provided at a general, category level and do not constitute medical claims or guarantees of outcome.')}
            </p>
            <p>
              {translate('In case of a suspected animal-health emergency, please contact a qualified veterinarian immediately rather than relying on information from this website.')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
