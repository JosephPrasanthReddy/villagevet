import { useLanguage } from '../i18n/LanguageContext.jsx'

// Layered agricultural scene: rolling fields, a farmer figure, cattle,
// poultry and a village silhouette under a golden sky — built from solid
// organic shapes (not thin line-art) so it reads as a genuine illustrated
// scene rather than a diagram or a medical/corporate icon set.
export default function FarmScene({ className = '' }) {
  const { translate } = useLanguage()
  return (
    <svg
      viewBox="0 0 600 620"
      className={className}
      role="img"
      aria-label={translate('Illustration of an Indian farming village with cattle, poultry and a farmer under an open sky')}
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DFAF3A" />
          <stop offset="1" stopColor="#FFF9EF" />
        </linearGradient>
        <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DFAF3A" />
          <stop offset="1" stopColor="#6E3719" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect x="0" y="0" width="600" height="620" rx="28" fill="url(#skyGrad)" />

      {/* sun */}
      <circle cx="462" cy="118" r="58" fill="#C88924" opacity="0.9" />
      <circle cx="462" cy="118" r="80" fill="#C88924" opacity="0.18" />

      {/* distant hill line */}
      <path d="M0 270 Q140 220 300 260 T600 240 V620 H0 Z" fill="#F3E5D6" />

      {/* far field band */}
      <path d="M0 330 Q160 300 320 330 T600 320 V620 H0 Z" fill="#F6E9CC" />

      {/* main field — terraced rows, evokes Indian farmland */}
      <path d="M0 380 Q150 350 300 382 T600 370 V620 H0 Z" fill="url(#fieldGrad)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M0 ${420 + i * 34} Q300 ${400 + i * 34} 600 ${420 + i * 34}`}
          stroke="#DFAF3A"
          strokeOpacity={0.14}
          strokeWidth="5"
          fill="none"
        />
      ))}

      {/* village huts on the ridge */}
      <g fill="#FFF9EF" stroke="#6E3719" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M56 322 L56 292 L86 268 L116 292 L116 322 Z" />
        <path d="M132 330 L132 300 L162 276 L192 300 L192 330 Z" />
      </g>

      {/* cattle silhouette, solid fill */}
      <g transform="translate(346,392)">
        <path
          d="M0 74C-8 40 8 12 46 10c14-1 22-14 38-11 17 3 18 22 4 29 22 3 36 22 30 42 24 6 34 30 18 47h-14c2 11-9 18-20 13l-8-13H50l-8 13c-11 5-22-2-20-13H8C-8 121 4 96 24 90Z"
          fill="#FFF9EF"
          stroke="#6E3719"
          strokeWidth="2.5"
        />
        <circle cx="86" cy="14" r="4" fill="#6E3719" />
        <path d="M-4 108c-8 14 2 30 20 26" fill="none" stroke="#6E3719" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* farmer figure, abstract solid silhouette */}
      <g transform="translate(150,420)">
        <circle cx="30" cy="20" r="16" fill="#3B2418" />
        <path d="M4 120 L10 58 Q10 40 30 40 Q50 40 50 58 L56 120 Z" fill="#A5701D" />
        <path d="M10 58 L-14 92" stroke="#3B2418" strokeWidth="8" strokeLinecap="round" />
        <path d="M50 58 L74 78" stroke="#3B2418" strokeWidth="8" strokeLinecap="round" />
        <rect x="6" y="118" width="14" height="34" rx="5" fill="#6E3719" />
        <rect x="38" y="118" width="14" height="34" rx="5" fill="#6E3719" />
      </g>

      {/* poultry cluster */}
      <g transform="translate(470,470)">
        <ellipse cx="0" cy="14" rx="20" ry="16" fill="#C88924" />
        <circle cx="16" cy="0" r="9" fill="#C88924" />
        <path d="M24 -2 L34 2 L24 6 Z" fill="#6E3719" />
        <ellipse cx="40" cy="24" rx="15" ry="12" fill="#DFAF3A" stroke="#C88924" strokeWidth="2" />
      </g>

      {/* goat */}
      <g transform="translate(220,486)">
        <path d="M0 44C-4 24 6 8 26 8c9 0 15-8 24-6 10 2 10 14 2 18 13 2 20 14 16 26 12 3 18 16 8 26H68c1 7-6 11-13 8l-4-8H28l-4 8c-7 3-14-1-13-8H4C-6 90 0 74 12 70Z" fill="#6E3719" opacity="0.85" />
      </g>

      {/* veterinary care mark, softened blob badge floating over the scene */}
      <g transform="translate(30,60)">
        <path
          d="M60 5c30 4 55 25 58 55 3 32-18 60-48 68-30 8-64-4-80-30-16-26-12-60 10-80S30 1 60 5Z"
          fill="#A5701D"
        />
        <rect x="42" y="42" width="14" height="42" rx="5" fill="#FFF9EF" />
        <rect x="28" y="56" width="42" height="14" rx="5" fill="#FFF9EF" />
      </g>
    </svg>
  )
}
