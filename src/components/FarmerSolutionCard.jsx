import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { livestockPhotos } from '../data/media.js'

export default function FarmerSolutionCard({ solution, compact = false }) {
  const { translate } = useLanguage()
  const title = translate(solution.title)
  const summary = translate(solution.summary)
  const cardRef = useRef(null)
  const photo = livestockPhotos[solution.slug]

  const onPointerMove = (event) => {
    const node = cardRef.current
    if (!node || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || window.matchMedia?.('(pointer: coarse)').matches) return
    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    node.style.setProperty('--solution-x', `${(x - 0.5) * 7}deg`)
    node.style.setProperty('--solution-y', `${(0.5 - y) * 6}deg`)
    node.style.setProperty('--solution-glow-x', `${x * 100}%`)
    node.style.setProperty('--solution-glow-y', `${y * 100}%`)
  }

  const resetPointer = () => {
    const node = cardRef.current
    if (!node) return
    node.style.setProperty('--solution-x', '0deg')
    node.style.setProperty('--solution-y', '0deg')
    node.style.setProperty('--solution-glow-x', '50%')
    node.style.setProperty('--solution-glow-y', '50%')
  }

  return (
    <article
      ref={cardRef}
      className={`farmer-photo-card ${compact ? 'farmer-photo-card-compact' : ''}`}
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="farmer-photo-media">
        {photo && (
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: photo.position }}
          />
        )}
        <div className="farmer-photo-overlay" aria-hidden="true" />
        <span className="farmer-photo-number" aria-hidden="true">
          {String(['cattle-dairy', 'buffalo', 'goat', 'sheep', 'poultry'].indexOf(solution.slug) + 1).padStart(2, '0')}
        </span>
        <h3 className="farmer-photo-title">{title}</h3>
      </div>

      <div className="farmer-photo-copy">
        <p className="text-sm leading-relaxed text-ink/65">{summary}</p>
        {!compact && (
          <ul className="mt-5 space-y-2.5 text-sm text-ink/70">
            {solution.points.map((p) => (
              <li key={p} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                {translate(p)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
