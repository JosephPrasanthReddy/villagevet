// Original line-art signature illustration: a village skyline, field rows and
// a cow/veterinary cross motif, tying the "one shop in every mandal" idea to
// the hero without relying on stock photography.
export default function HeroIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 560 560" className={className} role="img" aria-label="Illustration of a farming village with a veterinary care mark">
      <defs>
        <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2EEE8" />
          <stop offset="1" stopColor="#FFF9EF" />
        </linearGradient>
      </defs>

      <circle cx="280" cy="280" r="260" fill="url(#skyFade)" />

      {/* sun */}
      <circle cx="410" cy="140" r="46" fill="#C88924" opacity="0.9" />

      {/* distant hills */}
      <path d="M40 300 Q170 240 300 300 T560 290 V560 H40 Z" fill="#F3E5D6" />

      {/* field rows */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M0 ${380 + i * 26} Q280 ${350 + i * 26} 560 ${380 + i * 26}`}
          stroke="#8B451F"
          strokeOpacity={0.18 + i * 0.05}
          strokeWidth="6"
          fill="none"
        />
      ))}

      {/* village huts */}
      <g stroke="#3B2418" strokeWidth="3" fill="none" strokeLinejoin="round">
        <path d="M90 330 L90 300 L120 278 L150 300 L150 330 Z" />
        <path d="M170 340 L170 306 L205 280 L240 306 L240 340 Z" />
      </g>

      {/* cow silhouette */}
      <g transform="translate(300,270)">
        <path
          d="M0 60 C-6 30 10 6 46 6 C60 6 66 -6 80 -4 C96 -2 96 16 84 22 C104 24 118 42 112 62 C136 66 148 90 132 108 L120 108 C122 118 112 126 100 122 L92 108 L36 108 L28 122 C16 126 6 118 8 108 L-4 108 C-16 92 -6 66 20 62 Z"
          stroke="#3B2418"
          fill="#FFF9EF"
        />
        <circle cx="86" cy="8" r="3.4" fill="#3B2418" />
      </g>

      {/* veterinary cross mark */}
      <g transform="translate(230,150)">
        <rect x="0" y="0" width="64" height="64" rx="16" fill="#A5701D" />
        <rect x="26" y="14" width="12" height="36" rx="4" fill="#FFF9EF" />
        <rect x="14" y="26" width="36" height="12" rx="4" fill="#FFF9EF" />
      </g>

      {/* connecting nodes — "one shop in every mandal" network motif */}
      <g stroke="#6E3719" strokeWidth="2" strokeDasharray="2 6" fill="none" opacity="0.7">
        <path d="M262 182 L150 320" />
        <path d="M262 182 L400 340" />
        <path d="M262 182 L460 160" />
      </g>
      <circle cx="150" cy="320" r="6" fill="#8B451F" />
      <circle cx="400" cy="340" r="6" fill="#8B451F" />
      <circle cx="460" cy="160" r="6" fill="#8B451F" />
    </svg>
  )
}
