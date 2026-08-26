import { useEffect } from 'react'

const SITE = 'https://www.villagevetindia.com'

function setMeta(nameOrProp, content, isProperty = false) {
  if (!content) return
  const attr = isProperty ? 'property' : 'name'
  let el = document.head.querySelector(`meta[${attr}="${nameOrProp}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, nameOrProp)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function SEO({ title, description, path = '/' }) {
  useEffect(() => {
    const fullTitle = `${title} | VillageVet India`
    document.title = fullTitle

    setMeta('description', description)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:url', `${SITE}${path}`, true)
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE}${path}`)
  }, [title, description, path])

  return null
}
