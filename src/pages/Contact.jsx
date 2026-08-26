import SEO from '../components/SEO.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER

export default function Contact() {
  const { translate } = useLanguage()

  return (
    <>
      <SEO
        title={translate('Contact Us')}
        description={translate('Get in touch with VillageVet India Pvt. Ltd. — for farmer support, product enquiries, veterinary collaboration or business partnerships.')}
        path="/contact"
      />

      <section className="section">
        <div className="container-content grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader
              eyebrow={translate('Get in Touch')}
              title={translate('Contact VillageVet')}
              description={translate('VillageVet India Pvt. Ltd. — Veterinary care for farming communities.')}
              as="h1"
            />

            <div className="mt-8 space-y-4">
              <a href="mailto:Subba.reddy@villagevetindia.com" className="btn-secondary w-full justify-start !px-5">
                <span aria-hidden="true">✉️</span> Subba.reddy@villagevetindia.com
              </a>
              <a href="tel:+919704420273" className="btn-secondary w-full justify-start !px-5">
                <span aria-hidden="true">📞</span> +91 97044 20273
              </a>
              {whatsappNumber ? (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-start !px-5"
                >
                  <span aria-hidden="true">💬</span> {translate('Chat on WhatsApp')}
                </a>
              ) : (
                <p className="rounded-full border border-dashed border-ink/20 px-5 py-3.5 text-sm text-ink/40">
                  {translate('WhatsApp number to be added (VITE_WHATSAPP_NUMBER)')}
                </p>
              )}
            </div>

            <div className="mt-10 rounded-xl border border-ink/8 bg-white p-5 text-sm text-ink/60">
              <p className="font-semibold text-ink">{translate('VillageVet India Pvt. Ltd.')}</p>
              <p className="mt-1">www.villagevetindia.com</p>
            </div>
          </div>

          <ContactForm title={translate('Send an Enquiry')} />
        </div>
      </section>
    </>
  )
}
