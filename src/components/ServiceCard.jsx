import { Link } from 'react-router-dom'
import { getCategoryIcon } from '../utils/categoryIcons.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function ServiceCard({ title, description, slug, index }) {
  const { translate } = useLanguage()
  const alt = index % 2 === 1
  const Icon = getCategoryIcon(slug)
  const cardTitle = translate(title)
  const cardDescription = translate(description)

  return (
    <div className={`${alt ? 'card-alt' : 'card'} group flex h-full flex-col`}>
      <span className={`${alt ? 'icon-tag-gold' : 'icon-tag'} transition-transform duration-300 group-hover:scale-110`}>
        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
      </span>

      <h3 className="mt-5 text-lg font-semibold text-ink">
        {cardTitle}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
        {cardDescription}
      </p>

      <Link
        to={`/services/${slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition hover:gap-2.5"
      >
        {translate('Learn more')}

        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  )
}
