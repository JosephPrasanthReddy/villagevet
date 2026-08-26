// Original line-art store concept visual — a modern rural veterinary + farm
// supply store front, avoiding stock-photo or pharmacy/hospital aesthetics.
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function StoreIllustration({ className = '' }) {
  const { translate } = useLanguage()
  return (
    <svg viewBox="0 0 600 420" className={className} role="img" aria-label={translate('VillageVet store concept: shelving with medicines, feed and equipment behind a farmer assistance counter')}>
      <rect x="0" y="0" width="600" height="420" rx="28" fill="#3B2418" />

      {/* storefront awning */}
      <path d="M40 90 L560 90 L540 40 L60 40 Z" fill="#C88924" />
      <text x="300" y="72" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="24" fontWeight="600" fill="#3B2418">
        VillageVet
      </text>

      {/* shopfront glass */}
      <rect x="60" y="100" width="480" height="280" fill="#F2EEE8" opacity="0.06" />

      {/* shelving — medicines */}
      <g>
        <rect x="90" y="150" width="120" height="90" rx="8" fill="#6E3719" opacity="0.85" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={104 + i * 34} y={168} width="22" height="56" rx="3" fill="#FFF9EF" opacity="0.9" />
        ))}
        <text x="150" y="256" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#FFF9EF">Medicines</text>
      </g>

      {/* feed bags */}
      <g>
        <rect x="240" y="170" width="110" height="70" rx="10" fill="#C88924" opacity="0.9" />
        <rect x="252" y="182" width="86" height="46" rx="6" fill="#FFF9EF" opacity="0.85" />
        <text x="295" y="256" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#FFF9EF">Feed & Poultry Feed</text>
      </g>

      {/* equipment / supplements */}
      <g>
        <rect x="380" y="150" width="130" height="90" rx="8" fill="#8B451F" opacity="0.85" />
        <circle cx="410" cy="185" r="12" fill="#FFF9EF" opacity="0.9" />
        <circle cx="440" cy="185" r="12" fill="#FFF9EF" opacity="0.9" />
        <circle cx="470" cy="185" r="12" fill="#FFF9EF" opacity="0.9" />
        <rect x="400" y="205" width="80" height="16" rx="4" fill="#FFF9EF" opacity="0.7" />
        <text x="445" y="256" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="#FFF9EF">Equipment</text>
      </g>

      {/* farmer assistance counter */}
      <rect x="90" y="290" width="420" height="46" rx="10" fill="#FFF9EF" opacity="0.92" />
      <text x="300" y="318" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#3B2418">
        Farmer Assistance Counter
      </text>

      {/* ground line */}
      <rect x="0" y="400" width="600" height="20" fill="#6E3719" opacity="0.4" />
    </svg>
  )
}
