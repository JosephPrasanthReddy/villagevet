import { getCategoryIcon } from '../utils/categoryIcons.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function ProductCategoryCard({ category, index = 0 }) {
  const { translate } = useLanguage()
  const alt = index % 2 === 1
  const Icon = getCategoryIcon(category.slug)
  const title = translate(category.title)
  const description = translate(category.description)

  return (
    <div className={`${alt ? 'card-alt' : 'card'} group`}>
      <span className={`${alt ? 'icon-tag-gold' : 'icon-tag'} transition-transform duration-300 group-hover:scale-110`}>
        <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">{description}</p>
    </div>
  )
}
