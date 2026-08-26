import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function NotFound() {
  const { translate } = useLanguage()
  return (
    <>
      <SEO
        title={translate('Page Not Found')}
        description={translate("The page you're looking for doesn't exist.")}
        path="/404"
      />
      <section className="section text-center">
        <div className="container-content">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{translate("We couldn't find that page")}</h1>
          <p className="mx-auto mt-4 max-w-md text-ink/60">
            {translate('The page you\u2019re looking for may have moved. Try heading back to the homepage.')}
          </p>
          <Link to="/" className="btn-primary mt-8 inline-flex">
            {translate('Back to Home')}
          </Link>
        </div>
      </section>
    </>
  )
}
