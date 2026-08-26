import { useEffect, useRef, useState } from 'react'

export default function AnimatedNumber({ value, duration = 850 }) {
  const ref = useRef(null)
  const [displayValue, setDisplayValue] = useState(0)
  const numericValue = Number(value)

  useEffect(() => {
    const node = ref.current
    if (!node || !Number.isFinite(numericValue)) return undefined

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      setDisplayValue(numericValue)
      return undefined
    }

    let frame = null
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        observer.disconnect()
        const start = performance.now()

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplayValue(Math.round(numericValue * eased))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.55 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [numericValue, duration])

  return <span ref={ref}>{displayValue}</span>
}
