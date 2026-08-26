import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Logo({ className = '', light = false }) {
  const { translate } = useLanguage()
  const img = (
    <img
      src="/villagevet-logo.png"
      alt={translate('VillageVet - Veterinary care for farming communities')}
      width={512}
      height={512}
      className={light ? 'h-14 w-auto object-contain' : 'h-16 w-auto object-contain sm:h-[4.5rem]'}
    />
  )

  // The supplied artwork sits on an opaque near-white background (no
  // transparency), so on the dark footer it needs a light backing card to
  // read against dark brown -- that part is real and stays. On the cream
  // navbar it's shown directly: rendering it at a fixed size on a plain
  // white/cream test canvas confirms the artwork itself is legible at
  // navbar height, so a card there added nothing and has been removed.
  // If the mark still isn't appearing, it's an asset-loading issue (see
  // Logo.jsx history / chat) rather than anything CSS is hiding -- the
  // artwork itself is never modified, cropped, or recoloured.
  if (light) {
    return (
      <span className={`inline-flex items-center rounded-organic bg-cream/95 p-2 shadow-card ${className}`}>
        {img}
      </span>
    )
  }

  return <span className={`inline-flex items-center ${className}`}>{img}</span>
}
