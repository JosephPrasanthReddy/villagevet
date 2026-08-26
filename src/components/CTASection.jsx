import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

export default function CTASection({ eyebrow, title, description, primary, secondary }) {
  return (
    <section className="section">
      <div className="container-content">
        <Reveal
          as="div"
          className="relative overflow-hidden rounded-organic bg-brand-deep px-6 py-16 text-center sm:px-16 sm:py-20"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-dots opacity-[0.06]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-blob bg-gold/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-blob bg-brand/30 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            {eyebrow && <p className="eyebrow mx-auto !bg-white/10 !text-gold">{eyebrow}</p>}
            <h2 className="mt-4 text-balance text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
            {description && <p className="mt-4 text-white/70">{description}</p>}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              {primary && (
                <Link to={primary.to} className="btn-primary">
                  {primary.label}
                </Link>
              )}
              {secondary && (
                <Link to={secondary.to} className="btn-outline-light">
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
