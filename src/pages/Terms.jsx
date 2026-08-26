import SEO from '../components/SEO.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Terms() {
  const { translate } = useLanguage()

  return (
    <>
      <SEO
        title={translate('Terms of Use')}
        description={translate('Terms governing the use of the VillageVet India website.')}
        path="/terms"
      />
      <section className="section">
        <div className="container-content max-w-3xl">
          <SectionHeader eyebrow={translate('Legal')} title={translate('Terms of Use')} as="h1" />
          <div className="prose prose-sm mt-8 max-w-none space-y-6 text-sm leading-relaxed text-ink/70">
            <p>
              {translate('These Terms of Use govern your access to and use of www.villagevetindia.com, operated by VillageVet India Pvt. Ltd. By using this website, you agree to these terms.')}
            </p>

            <div>
              <h2 className="text-base font-semibold text-ink">{translate('Use of This Website')}</h2>
              <p className="mt-2">
                {translate('This website is provided for general information about VillageVet, its planned services, and its retail-network vision. Content is provided in good faith, but VillageVet makes no guarantee that all information is complete, current or error-free at all times.')}
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-ink">{translate('No Medical Advice')}</h2>
              <p className="mt-2">
                {translate('Content on this website, including Farmer Awareness articles, is provided for general educational purposes only and does not constitute veterinary diagnosis, treatment or advice. See our Medical Disclaimer for more detail.')}
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-ink">{translate('Planned Initiatives')}</h2>
              <p className="mt-2">
                {translate("References to outlets, retail expansion or partnership programs describe VillageVet's plans and vision. Unless explicitly stated otherwise, these should be understood as planned or in-progress initiatives rather than fully completed operations.")}
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-ink">{translate('Intellectual Property')}</h2>
              <p className="mt-2">
                {translate('The VillageVet name, logo and website content are the property of VillageVet India Pvt. Ltd. and may not be reproduced without permission.')}
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-ink">{translate('Changes to These Terms')}</h2>
              <p className="mt-2">
                {translate('VillageVet may update these terms from time to time as the business and website evolve.')}
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-ink">{translate('Contact')}</h2>
              <p className="mt-2">
                {translate('Questions about these terms can be sent to')}{' '}
                <a href="mailto:Subba.reddy@villagevetindia.com" className="text-brand underline">
                  Subba.reddy@villagevetindia.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
