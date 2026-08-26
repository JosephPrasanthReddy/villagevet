import Reveal from './Reveal.jsx'

export default function SectionHeader({ eyebrow, title, description, align = 'left', light = false, as: Heading = 'h2' }) {
  return (
    <Reveal className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`eyebrow ${light ? '!bg-white/10 !text-gold' : ''}`}>{eyebrow}</p>
      )}
      <Heading className={`mt-4 text-balance text-3xl font-semibold leading-[1.15] sm:text-4xl ${light ? 'text-white' : ''}`}>
        {title}
      </Heading>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-white/70' : 'text-ink/60'}`}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
