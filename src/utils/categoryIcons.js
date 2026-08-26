import {
  Pill,
  Wheat,
  Bird,
  Stethoscope,
  HeartPulse,
  BookOpen,
  ShieldCheck,
  FlaskConical,
  Milk,
  PawPrint,
  Sparkles
} from 'lucide-react'

// Maps a data slug (from services.js / products.js) to a distinct Lucide
// icon component. Falls back to a generic icon for any slug not listed here,
// so adding a new category later never breaks rendering.
const categoryIcons = {
  'veterinary-medicines': Pill,
  'animal-feed': Wheat,
  'feed-supplements': Wheat,
  'poultry-feed': Bird,
  'poultry-products': Bird,
  'veterinary-equipment': Stethoscope,
  'animal-health-products': HeartPulse,
  'veterinary-consultation': Stethoscope,
  'farmer-awareness': BookOpen,
  'farm-health-support': ShieldCheck,
  'mineral-mixtures': FlaskConical,
  'dairy-animal-products': Milk,
  'goat-sheep-products': PawPrint
}

export function getCategoryIcon(slug) {
  return categoryIcons[slug] || Sparkles
}
