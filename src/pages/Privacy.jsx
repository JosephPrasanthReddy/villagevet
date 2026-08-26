import SEO from '../components/SEO.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Privacy() {
  const { translate } = useLanguage()

  return (
    <>
      <SEO
        title={translate('Privacy Policy')}
        description={translate('How VillageVet India Pvt. Ltd. collects, uses and protects information submitted through this website.')}
        path="/privacy-policy"
      />
      <section className="section">
        <div className="container-content max-w-3xl">
          <SectionHeader eyebrow={translate('Legal')} title={translate('Privacy Policy')} as="h1" />
          <div className="prose prose-sm mt-8 max-w-none space-y-6 text-sm leading-relaxed text-ink/70">
            <p>
              {translate('This Privacy Policy explains how VillageVet India Pvt. Ltd. ("VillageVet", "we", "us") handles information collected through www.villagevetindia.com.')}
            </p>

            <div>
              <h2 className="text-base font-semibold text-ink">{translate('Information We Collect')}</h2>
              <p className="mt-2">
                {translate('When you use our enquiry forms, we may collect the information you choose to provide, such as your name, phone number, email address, enquiry type and message.')}
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-ink">{translate('How We Use Information')}</h2>
              <p className="mt-2">
                {translate('Information submitted through our forms is used solely to respond to your enquiry and to communicate with you about the products, services or partnership opportunities you asked about.')}
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-ink">{translate('Sharing of Information')}</h2>
              <p className="mt-2">
                {translate('We do not sell your personal information. Information may be shared internally within VillageVet, or with service providers who help us operate this website and respond to enquiries, solely for that purpose.')}
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-ink">{translate('Cookies')}</h2>
              <p className="mt-2">
                {translate('This website does not currently use tracking or advertising cookies beyond what may be required for basic functionality.')}
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-ink">{translate('Contacting Us')}</h2>
              <p className="mt-2">
                {translate('For any questions about this Privacy Policy, please contact us at')}{' '}
                <a href="mailto:Subba.reddy@villagevetindia.com" className="text-brand underline">
                  Subba.reddy@villagevetindia.com
                </a>.
              </p>
            </div>

            <p className="text-xs text-ink/45">
              {translate("This policy will be reviewed and updated as VillageVet's operations, systems and applicable law evolve.")}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
