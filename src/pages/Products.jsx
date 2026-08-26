import { Link } from 'react-router-dom'
import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import ProductCategoryCard from '../components/ProductCategoryCard.jsx'
import { productCategories } from '../data/products.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Products() {
  const { translate } = useLanguage()

  return (
    <>
      <SEO
        title={translate('Products')}
        description={translate('Category-level catalogue of veterinary medicines, feed supplements, mineral mixtures, poultry products and veterinary equipment planned for VillageVet outlets.')}
        path="/products"
      />

      <section className="section">
        <div className="container-content">
          <SectionHeader
            eyebrow={translate('Catalogue')}
            title={translate('Products')}
            description={translate('A category-level view of what VillageVet outlets bring together. Specific brands and product listings will be added as outlets open.')}
            as="h1"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 4) * 70}>
                <ProductCategoryCard category={c} index={i} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 rounded-organic border border-brand-deep/8 bg-white p-8 text-center shadow-card">
            <h2 className="text-xl font-semibold text-ink">{translate('Looking for a Specific Product?')}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">
              {translate('Reach out with your requirement and the VillageVet team will let you know about availability through the outlet network as it grows.')}
            </p>
            <Link to="/contact" className="btn-primary mt-6 inline-flex">
              {translate('Enquire About Products')}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
