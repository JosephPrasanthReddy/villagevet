import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from './en.js'
import te from './te.js'
import hi from './hi.js'
import ta from './ta.js'
import kn from './kn.js'
import ml from './ml.js'

export const languages = [
  { code: 'en', native: 'English', short: 'EN' },
  { code: 'te', native: 'తెలుగు', short: 'తెలుగు' },
  { code: 'hi', native: 'हिन्दी', short: 'हिन्दी' },
  { code: 'ta', native: 'தமிழ்', short: 'தமிழ்' },
  { code: 'kn', native: 'ಕನ್ನಡ', short: 'ಕನ್ನಡ' },
  { code: 'ml', native: 'മലയാളം', short: 'മലയാളം' }
]

const dictionaries = { en, te, hi, ta, kn, ml }

// Reverse lookup (translated string -> English) per language, built once.
// Lets translate() accept either the English source string or an
// already-translated string and still resolve correctly. It never touches
// the DOM.
const structuredCardUi = Object.fromEntries(
  Object.entries(dictionaries).map(([code, dictionary]) => {
    const mapped = {}
    for (const group of ['services', 'products']) {
      const englishCards = en.cards?.[group] || {}
      const translatedCards = dictionary.cards?.[group] || {}
      for (const [slug, englishCard] of Object.entries(englishCards)) {
        const translatedCard = translatedCards[slug]
        if (!translatedCard) continue
        if (englishCard.title && translatedCard.title) mapped[englishCard.title] = translatedCard.title
        if (englishCard.description && translatedCard.description) mapped[englishCard.description] = translatedCard.description
      }
    }
    return [code, mapped]
  })
)

const reverseUi = Object.fromEntries(
  Object.entries(dictionaries).map(([code, dictionary]) => {
    const translatedToEnglish = Object.fromEntries(
      Object.entries(dictionary.ui || {}).map(([english, translated]) => [translated, english])
    )
    for (const [english, translated] of Object.entries(structuredCardUi[code] || {})) {
      translatedToEnglish[translated] = english
    }
    return [code, translatedToEnglish]
  })
)

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem('villagevet-language')
  return dictionaries[saved] ? saved : 'en'
}

// Explicit, single-source-of-truth translation helper. Components call this
// directly with a known English string (usually from a data file) and get
// back the string for the active language, falling back to English. This is
// the ONLY translation mechanism in the app -- there is no DOM walking, no
// MutationObserver, and no second translation system.
function translateDynamic(value, lang) {
  if (typeof value !== 'string') return value
  let english = value
  if (reverseUi[lang]?.[value]) {
    english = reverseUi[lang][value]
  }
  return dictionaries[lang]?.ui?.[english] || structuredCardUi[lang]?.[english] || english
}

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  languages,
  t: en,
  translate: (value) => value
})

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLanguage)

  const setLang = (nextLang) => {
    if (!dictionaries[nextLang]) return
    setLangState(nextLang)
    window.localStorage.setItem('villagevet-language', nextLang)
  }

  const value = useMemo(() => ({
    lang,
    setLang,
    languages,
    translate: (value) => translateDynamic(value, lang),
    t: { ...en, ...dictionaries[lang] }
  }), [lang])

  // Only side effect on language change: keep the lang attribute in sync so
  // the :lang() typography rules in index.css apply. No DOM text mutation.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
