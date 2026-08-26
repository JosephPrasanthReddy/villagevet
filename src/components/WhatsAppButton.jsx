import { useLanguage } from '../i18n/LanguageContext.jsx'

// Number must be set in .env as VITE_WHATSAPP_NUMBER (international format,
// digits only, e.g. 919876543210). No number is invented here.
const number = import.meta.env.VITE_WHATSAPP_NUMBER

export default function WhatsAppButton() {
  const { translate } = useLanguage()
  if (!number) return null

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={translate('Chat with VillageVet on WhatsApp')}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand shadow-cardHover transition hover:bg-brand-dark"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.36 2 11.75c0 2.06.63 3.97 1.72 5.56L2.5 21.5l4.36-1.14A10.1 10.1 0 0 0 12 21.5c5.52 0 10-4.36 10-9.75S17.52 2 12 2Zm0 17.7c-1.65 0-3.18-.47-4.47-1.28l-.32-.2-2.65.69.71-2.56-.21-.33a7.86 7.86 0 0 1-1.31-4.27C3.75 7.4 7.44 3.8 12 3.8s8.25 3.6 8.25 7.95S16.56 19.7 12 19.7Zm4.53-5.96c-.25-.12-1.46-.71-1.69-.79-.23-.08-.39-.12-.56.12-.16.24-.64.79-.78.95-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.2-.73-.64-1.22-1.43-1.37-1.67-.14-.24-.02-.37.11-.49.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.31-.02-.43-.06-.12-.56-1.33-.76-1.82-.2-.48-.41-.41-.56-.42h-.48c-.16 0-.43.06-.65.31-.23.24-.86.83-.86 2.03s.88 2.36 1 2.52c.12.16 1.73 2.63 4.2 3.68.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z" />
      </svg>
    </a>
  )
}
