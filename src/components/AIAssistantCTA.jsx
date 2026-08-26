import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Bot, Send, X, Sparkles, RotateCcw, Mic, MicOff, ChevronRight, Square, Copy, Check, RefreshCw, ImagePlus, Volume2, VolumeX } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import renderMarkdown from '../utils/renderMarkdown.jsx'

const STREAM_ENDPOINT = import.meta.env.VITE_AI_STREAM_ENDPOINT || '/api/chat/stream'
const MAX_IMAGE_FILE_BYTES = 10 * 1024 * 1024
const MAX_IMAGE_DIMENSION = 1600


const SPEECH_LANG_MAP = {
  en: 'en-IN',
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
}

const CHAT_COPY = {
  en: {
    subtitle: 'Farmer-friendly animal-health assistant',
    languageBadge: 'Replies in English',
    welcome: 'Namaste! I’m VillageVet AI. I can help with animal-health awareness, farm care, feed and nutrition basics, VillageVet services, and farmer support. I can guide you on what to check and when to contact a veterinarian, but I cannot diagnose an animal or prescribe medicines.',
    starters: ['What services does VillageVet provide?', 'Why might a dairy animal give less milk?', 'What are signs of heat stress in cattle?'],
    tryAsking: 'Try asking',
    thinking: 'Checking this for you',
    placeholder: 'Ask about animal care or VillageVet…',
    listening: 'Listening…',
    micDenied: 'Microphone access was not allowed. You can continue by typing your question.',
    micError: 'Voice input had a problem. You can continue by typing your question.',
    disclaimer: 'General awareness only — not a diagnosis or prescription. For urgent animal-health concerns, contact a qualified veterinarian.',
    connectionError: "Sorry, I'm having trouble connecting right now. Please try again or contact VillageVet directly.",
    rateLimit: 'Too many questions were sent at once. Please wait a minute and try again.',
    followUpLabel: 'You can ask next',
    fallbackFollowUps: ['What should I check first?', 'Which warning signs need a veterinarian?', 'What details should I share with the veterinarian?'],
    reset: 'Reset chat', close: 'Close VillageVet AI', send: 'Send message', voice: 'Use voice input', stopVoice: 'Stop voice input', voiceUnsupported: 'Voice input is not supported in this browser',
    stop: 'Stop generating', copy: 'Copy answer', copied: 'Copied', regenerate: 'Regenerate answer', stopped: 'Generation stopped',
    photo: 'Add photo', photoReady: 'Photo ready for visual analysis', removePhoto: 'Remove photo', photoUnsupported: 'Please choose a JPG, PNG or WebP image.', photoTooLarge: 'Please choose an image smaller than 10 MB.', photoError: 'I could not prepare that image. Please try another photo.', imageDefaultPrompt: 'Please look at this animal photo and tell me what visible signs I should pay attention to.', readAloud: 'Read aloud', stopReading: 'Stop reading', autoRead: 'Read new replies aloud', autoReadOn: 'Auto voice on', autoReadOff: 'Auto voice off',
  },
  te: {
    subtitle: 'రైతులకు ఉపయోగకరమైన పశు ఆరోగ్య సహాయకుడు',
    languageBadge: 'తెలుగులో సమాధానాలు',
    welcome: 'నమస్తే! నేను VillageVet AI. పశు ఆరోగ్య అవగాహన, ఫార్మ్ సంరక్షణ, మేత మరియు పోషణ ప్రాథమికాలు, VillageVet సేవలు మరియు రైతు సహాయం గురించి మీకు మార్గదర్శనం చేయగలను. ఏమి పరిశీలించాలి, ఎప్పుడు పశువైద్యుడిని సంప్రదించాలి అనే విషయాల్లో సహాయం చేస్తాను; కానీ నేను వ్యాధిని నిర్ధారించను లేదా మందులు సూచించను.',
    starters: ['VillageVet ఏ సేవలు అందిస్తుంది?', 'పాడి పశువులో పాలు తగ్గడానికి సాధారణ కారణాలు ఏమిటి?', 'పశువుల్లో వేడి ఒత్తిడి లక్షణాలు ఏమిటి?'],
    tryAsking: 'ఇలా అడగండి', thinking: 'మీ ప్రశ్నను పరిశీలిస్తున్నాను', placeholder: 'పశు సంరక్షణ లేదా VillageVet గురించి అడగండి…', listening: 'వింటున్నాను…',
    micDenied: 'మైక్రోఫోన్ అనుమతి ఇవ్వబడలేదు. మీరు టైప్ చేసి ప్రశ్న అడగవచ్చు.', micError: 'వాయిస్ ఇన్‌పుట్‌లో సమస్య వచ్చింది. మీరు టైప్ చేసి కొనసాగించవచ్చు.',
    disclaimer: 'సాధారణ అవగాహన కోసం మాత్రమే — ఇది నిర్ధారణ లేదా ప్రిస్క్రిప్షన్ కాదు. అత్యవసర పశు ఆరోగ్య సమస్యలకు అర్హత కలిగిన పశువైద్యుడిని సంప్రదించండి.',
    connectionError: 'ప్రస్తుతం కనెక్షన్‌లో సమస్య ఉంది. దయచేసి మళ్లీ ప్రయత్నించండి లేదా VillageVet ను నేరుగా సంప్రదించండి.', rateLimit: 'చాలా ప్రశ్నలు ఒకేసారి పంపబడ్డాయి. ఒక నిమిషం వేచి మళ్లీ ప్రయత్నించండి.',
    followUpLabel: 'తర్వాత ఇలా అడగవచ్చు', fallbackFollowUps: ['మొదట నేను ఏమి పరిశీలించాలి?', 'ఏ హెచ్చరిక లక్షణాలకు వెంటనే పశువైద్యుడిని సంప్రదించాలి?', 'పశువైద్యుడికి ఏ వివరాలు చెప్పాలి?'],
    reset: 'చాట్‌ను రీసెట్ చేయండి', close: 'VillageVet AI మూసివేయండి', send: 'సందేశం పంపండి', voice: 'వాయిస్ ఇన్‌పుట్ ఉపయోగించండి', stopVoice: 'వాయిస్ ఇన్‌పుట్ ఆపండి', voiceUnsupported: 'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్‌కు మద్దతు లేదు',
    stop: 'సమాధానం ఆపండి', copy: 'సమాధానం కాపీ చేయండి', copied: 'కాపీ అయింది', regenerate: 'మళ్లీ సమాధానం ఇవ్వండి', stopped: 'సమాధానం ఆపబడింది',
    photo: 'ఫోటో జోడించండి', photoReady: 'దృశ్య విశ్లేషణకు ఫోటో సిద్ధంగా ఉంది', removePhoto: 'ఫోటో తొలగించండి', photoUnsupported: 'JPG, PNG లేదా WebP ఫోటోను ఎంచుకోండి.', photoTooLarge: '10 MB కంటే చిన్న ఫోటోను ఎంచుకోండి.', photoError: 'ఫోటోను సిద్ధం చేయడంలో సమస్య వచ్చింది. మరో ఫోటో ప్రయత్నించండి.', imageDefaultPrompt: 'ఈ పశువు ఫోటోలో కనిపిస్తున్న లక్షణాలను చూసి నేను ఏమి గమనించాలో చెప్పండి.', readAloud: 'సమాధానం వినండి', stopReading: 'చదవడం ఆపండి', autoRead: 'కొత్త సమాధానాలను స్వయంచాలకంగా చదవండి', autoReadOn: 'ఆటో వాయిస్ ఆన్', autoReadOff: 'ఆటో వాయిస్ ఆఫ్',
  },
  hi: {
    subtitle: 'किसान-अनुकूल पशु-स्वास्थ्य सहायक', languageBadge: 'हिन्दी में जवाब',
    welcome: 'नमस्ते! मैं VillageVet AI हूँ। मैं पशु-स्वास्थ्य जागरूकता, फार्म देखभाल, चारा और पोषण की बुनियादी जानकारी, VillageVet सेवाओं और किसान सहायता में मदद कर सकता हूँ। मैं यह बता सकता हूँ कि क्या जाँचें और कब पशुचिकित्सक से संपर्क करें, लेकिन मैं बीमारी का निदान या दवा निर्धारित नहीं कर सकता।',
    starters: ['VillageVet कौन-कौन सी सेवाएँ देता है?', 'दूध देने वाले पशु में दूध कम होने के सामान्य कारण क्या हैं?', 'पशुओं में गर्मी के तनाव के संकेत क्या हैं?'],
    tryAsking: 'यह पूछकर देखें', thinking: 'आपके सवाल को देख रहा हूँ', placeholder: 'पशु देखभाल या VillageVet के बारे में पूछें…', listening: 'सुन रहा हूँ…',
    micDenied: 'माइक्रोफ़ोन की अनुमति नहीं मिली। आप अपना सवाल टाइप कर सकते हैं।', micError: 'वॉइस इनपुट में समस्या हुई। आप टाइप करके जारी रख सकते हैं।',
    disclaimer: 'केवल सामान्य जानकारी — निदान या प्रिस्क्रिप्शन नहीं। गंभीर या तत्काल पशु-स्वास्थ्य समस्या में योग्य पशुचिकित्सक से संपर्क करें।',
    connectionError: 'अभी कनेक्शन में समस्या है। कृपया फिर कोशिश करें या VillageVet से सीधे संपर्क करें।', rateLimit: 'एक साथ बहुत अधिक सवाल भेजे गए हैं। कृपया एक मिनट रुककर फिर कोशिश करें।',
    followUpLabel: 'अगला सवाल', fallbackFollowUps: ['सबसे पहले मुझे क्या जाँचना चाहिए?', 'किन संकेतों पर तुरंत पशुचिकित्सक की जरूरत है?', 'पशुचिकित्सक को कौन-सी जानकारी बतानी चाहिए?'],
    reset: 'चैट रीसेट करें', close: 'VillageVet AI बंद करें', send: 'संदेश भेजें', voice: 'वॉइस इनपुट इस्तेमाल करें', stopVoice: 'वॉइस इनपुट रोकें', voiceUnsupported: 'इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है',
    stop: 'जवाब रोकें', copy: 'जवाब कॉपी करें', copied: 'कॉपी हो गया', regenerate: 'जवाब फिर से बनाएँ', stopped: 'जवाब रोक दिया गया',
    photo: 'फोटो जोड़ें', photoReady: 'फोटो देखने के लिए तैयार है', removePhoto: 'फोटो हटाएँ', photoUnsupported: 'कृपया JPG, PNG या WebP फोटो चुनें।', photoTooLarge: 'कृपया 10 MB से छोटी फोटो चुनें।', photoError: 'इस फोटो को तैयार नहीं किया जा सका। दूसरी फोटो आज़माएँ।', imageDefaultPrompt: 'इस पशु की फोटो में दिखाई देने वाले संकेत देखकर बताइए कि मुझे क्या ध्यान देना चाहिए।', readAloud: 'जवाब सुनें', stopReading: 'पढ़ना रोकें', autoRead: 'नए जवाब अपने-आप पढ़ें', autoReadOn: 'ऑटो वॉइस चालू', autoReadOff: 'ऑटो वॉइस बंद',
  },
  ta: {
    subtitle: 'விவசாயிகளுக்கான கால்நடை நல உதவியாளர்', languageBadge: 'தமிழில் பதில்கள்',
    welcome: 'வணக்கம்! நான் VillageVet AI. கால்நடை ஆரோக்கிய விழிப்புணர்வு, பண்ணை பராமரிப்பு, தீவனம் மற்றும் ஊட்டச்சத்து அடிப்படைகள், VillageVet சேவைகள் மற்றும் விவசாயி ஆதரவு குறித்து உதவ முடியும். என்னென்ன கவனிக்க வேண்டும், எப்போது கால்நடை மருத்துவரை அணுக வேண்டும் என்பதில் வழிகாட்டுவேன்; ஆனால் நோயை கண்டறியவோ மருந்து பரிந்துரைக்கவோ முடியாது.',
    starters: ['VillageVet என்ன சேவைகள் வழங்குகிறது?', 'பால் மாட்டில் பால் குறைவதற்கான பொதுவான காரணங்கள் என்ன?', 'கால்நடைகளில் வெப்ப அழுத்தத்தின் அறிகுறிகள் என்ன?'],
    tryAsking: 'இதை கேட்டுப் பாருங்கள்', thinking: 'உங்கள் கேள்வியைப் பார்க்கிறேன்', placeholder: 'கால்நடை பராமரிப்பு அல்லது VillageVet பற்றி கேளுங்கள்…', listening: 'கேட்டுக்கொண்டிருக்கிறேன்…',
    micDenied: 'மைக்ரோஃபோன் அனுமதி கிடைக்கவில்லை. கேள்வியை தட்டச்சு செய்யலாம்.', micError: 'குரல் உள்ளீட்டில் சிக்கல் ஏற்பட்டது. தட்டச்சு செய்து தொடரலாம்.',
    disclaimer: 'பொதுவான விழிப்புணர்வுக்காக மட்டும் — இது நோயறிதல் அல்லது மருந்து பரிந்துரை அல்ல. அவசர கால்நடை பிரச்சினைக்கு தகுதியான கால்நடை மருத்துவரை அணுகவும்.',
    connectionError: 'தற்போது இணைப்பில் சிக்கல் உள்ளது. மீண்டும் முயற்சிக்கவும் அல்லது VillageVet-ஐ நேரடியாக தொடர்புகொள்ளவும்.', rateLimit: 'ஒரே நேரத்தில் அதிக கேள்விகள் அனுப்பப்பட்டுள்ளன. ஒரு நிமிடம் காத்திருந்து மீண்டும் முயற்சிக்கவும்.',
    followUpLabel: 'அடுத்து கேட்கலாம்', fallbackFollowUps: ['முதலில் நான் எதைச் சரிபார்க்க வேண்டும்?', 'எந்த அறிகுறிகளுக்கு உடனே கால்நடை மருத்துவர் தேவை?', 'கால்நடை மருத்துவரிடம் என்ன விவரங்கள் சொல்ல வேண்டும்?'],
    reset: 'உரையாடலை மீட்டமை', close: 'VillageVet AI-ஐ மூடு', send: 'செய்தி அனுப்பு', voice: 'குரல் உள்ளீட்டைப் பயன்படுத்து', stopVoice: 'குரல் உள்ளீட்டை நிறுத்து', voiceUnsupported: 'இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை',
    stop: 'பதிலை நிறுத்து', copy: 'பதிலை நகலெடு', copied: 'நகலெடுக்கப்பட்டது', regenerate: 'பதிலை மீண்டும் உருவாக்கு', stopped: 'பதில் நிறுத்தப்பட்டது',
    photo: 'படம் சேர்க்கவும்', photoReady: 'படம் காட்சி ஆய்வுக்கு தயாராக உள்ளது', removePhoto: 'படத்தை நீக்கவும்', photoUnsupported: 'JPG, PNG அல்லது WebP படத்தைத் தேர்ந்தெடுக்கவும்.', photoTooLarge: '10 MB-க்கு குறைவான படத்தைத் தேர்ந்தெடுக்கவும்.', photoError: 'இந்த படத்தைத் தயார் செய்ய முடியவில்லை. வேறு படத்தை முயற்சிக்கவும்.', imageDefaultPrompt: 'இந்த கால்நடை படத்தில் தெரியும் அறிகுறிகளைப் பார்த்து நான் எதை கவனிக்க வேண்டும் என்று சொல்லுங்கள்.', readAloud: 'பதிலை ஒலித்துப் படிக்கவும்', stopReading: 'வாசிப்பை நிறுத்தவும்', autoRead: 'புதிய பதில்களை தானாக வாசிக்கவும்', autoReadOn: 'ஆட்டோ குரல் ஆன்', autoReadOff: 'ஆட்டோ குரல் ஆஃப்',
  },
  kn: {
    subtitle: 'ರೈತ ಸ್ನೇಹಿ ಪಶು-ಆರೋಗ್ಯ ಸಹಾಯಕ', languageBadge: 'ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಗಳು',
    welcome: 'ನಮಸ್ಕಾರ! ನಾನು VillageVet AI. ಪಶು ಆರೋಗ್ಯ ಜಾಗೃತಿ, ಫಾರ್ಮ್ ಆರೈಕೆ, ಮೇವು ಮತ್ತು ಪೌಷ್ಟಿಕತೆಯ ಮೂಲಭೂತ ಮಾಹಿತಿ, VillageVet ಸೇವೆಗಳು ಮತ್ತು ರೈತ ಸಹಾಯ ಕುರಿತು ನೆರವಾಗಬಹುದು. ಏನು ಪರಿಶೀಲಿಸಬೇಕು ಮತ್ತು ಯಾವಾಗ ಪಶುವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಬೇಕು ಎಂದು ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇನೆ; ಆದರೆ ರೋಗನಿರ್ಣಯ ಮಾಡುವುದಿಲ್ಲ ಅಥವಾ ಔಷಧಿ ಸೂಚಿಸುವುದಿಲ್ಲ.',
    starters: ['VillageVet ಯಾವ ಸೇವೆಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ?', 'ಹಾಲು ಕೊಡುವ ಪಶುವಿನಲ್ಲಿ ಹಾಲು ಕಡಿಮೆಯಾಗಲು ಸಾಮಾನ್ಯ ಕಾರಣಗಳೇನು?', 'ಪಶುಗಳಲ್ಲಿ ಬಿಸಿಯ ಒತ್ತಡದ ಲಕ್ಷಣಗಳೇನು?'],
    tryAsking: 'ಹೀಗೆ ಕೇಳಿ ನೋಡಿ', thinking: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದ್ದೇನೆ', placeholder: 'ಪಶು ಆರೈಕೆ ಅಥವಾ VillageVet ಬಗ್ಗೆ ಕೇಳಿ…', listening: 'ಕೇಳುತ್ತಿದ್ದೇನೆ…',
    micDenied: 'ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿ ಸಿಗಲಿಲ್ಲ. ನೀವು ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಬಹುದು.', micError: 'ವಾಯ್ಸ್ ಇನ್‌ಪುಟ್‌ನಲ್ಲಿ ಸಮಸ್ಯೆ ಉಂಟಾಯಿತು. ಟೈಪ್ ಮಾಡಿ ಮುಂದುವರಿಯಬಹುದು.',
    disclaimer: 'ಸಾಮಾನ್ಯ ಜಾಗೃತಿಗಾಗಿ ಮಾತ್ರ — ಇದು ರೋಗನಿರ್ಣಯ ಅಥವಾ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಅಲ್ಲ. ತುರ್ತು ಪಶು ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗೆ ಅರ್ಹ ಪಶುವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    connectionError: 'ಈಗ ಸಂಪರ್ಕದಲ್ಲಿ ಸಮಸ್ಯೆ ಇದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ VillageVet ಅನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ.', rateLimit: 'ಒಂದೇ ಸಮಯದಲ್ಲಿ ತುಂಬಾ ಪ್ರಶ್ನೆಗಳು ಕಳುಹಿಸಲಾಗಿದೆ. ಒಂದು ನಿಮಿಷ ಕಾಯ್ದು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    followUpLabel: 'ಮುಂದೆ ಕೇಳಬಹುದು', fallbackFollowUps: ['ಮೊದಲು ನಾನು ಏನು ಪರಿಶೀಲಿಸಬೇಕು?', 'ಯಾವ ಎಚ್ಚರಿಕೆ ಲಕ್ಷಣಗಳಿಗೆ ತಕ್ಷಣ ಪಶುವೈದ್ಯರು ಬೇಕು?', 'ಪಶುವೈದ್ಯರಿಗೆ ಯಾವ ವಿವರಗಳನ್ನು ಹೇಳಬೇಕು?'],
    reset: 'ಚಾಟ್ ಮರುಹೊಂದಿಸಿ', close: 'VillageVet AI ಮುಚ್ಚಿ', send: 'ಸಂದೇಶ ಕಳುಹಿಸಿ', voice: 'ವಾಯ್ಸ್ ಇನ್‌ಪುಟ್ ಬಳಸಿ', stopVoice: 'ವಾಯ್ಸ್ ಇನ್‌ಪುಟ್ ನಿಲ್ಲಿಸಿ', voiceUnsupported: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ವಾಯ್ಸ್ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ',
    stop: 'ಉತ್ತರವನ್ನು ನಿಲ್ಲಿಸಿ', copy: 'ಉತ್ತರವನ್ನು ನಕಲಿಸಿ', copied: 'ನಕಲಿಸಲಾಗಿದೆ', regenerate: 'ಉತ್ತರವನ್ನು ಮತ್ತೆ ರಚಿಸಿ', stopped: 'ಉತ್ತರ ನಿಲ್ಲಿಸಲಾಗಿದೆ',
    photo: 'ಫೋಟೋ ಸೇರಿಸಿ', photoReady: 'ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆಗೆ ಫೋಟೋ ಸಿದ್ಧವಾಗಿದೆ', removePhoto: 'ಫೋಟೋ ತೆಗೆದುಹಾಕಿ', photoUnsupported: 'JPG, PNG ಅಥವಾ WebP ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ.', photoTooLarge: '10 MB ಗಿಂತ ಚಿಕ್ಕ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ.', photoError: 'ಈ ಫೋಟೋವನ್ನು ಸಿದ್ಧಪಡಿಸಲು ಆಗಲಿಲ್ಲ. ಮತ್ತೊಂದು ಫೋಟೋ ಪ್ರಯತ್ನಿಸಿ.', imageDefaultPrompt: 'ಈ ಪಶುವಿನ ಫೋಟೋದಲ್ಲಿ ಕಾಣುವ ಲಕ್ಷಣಗಳನ್ನು ನೋಡಿ ನಾನು ಏನು ಗಮನಿಸಬೇಕು ಎಂದು ಹೇಳಿ.', readAloud: 'ಉತ್ತರವನ್ನು ಓದಿ ಕೇಳಿಸಿ', stopReading: 'ಓದುವುದನ್ನು ನಿಲ್ಲಿಸಿ', autoRead: 'ಹೊಸ ಉತ್ತರಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಓದಿ', autoReadOn: 'ಆಟೋ ವಾಯ್ಸ್ ಆನ್', autoReadOff: 'ಆಟೋ ವಾಯ್ಸ್ ಆಫ್',
  },
  ml: {
    subtitle: 'കർഷക സൗഹൃദ മൃഗാരോഗ്യ സഹായി', languageBadge: 'മലയാളത്തിൽ മറുപടികൾ',
    welcome: 'നമസ്കാരം! ഞാൻ VillageVet AI ആണ്. മൃഗാരോഗ്യ അവബോധം, ഫാം പരിചരണം, തീറ്റയും പോഷണവും സംബന്ധിച്ച അടിസ്ഥാനങ്ങൾ, VillageVet സേവനങ്ങൾ, കർഷക പിന്തുണ എന്നിവയിൽ സഹായിക്കാം. എന്തെല്ലാം പരിശോധിക്കണം, എപ്പോൾ വെറ്ററിനറിയനെ സമീപിക്കണം എന്നതിൽ മാർഗനിർദേശം നൽകാം; പക്ഷേ രോഗനിർണയം നടത്തുകയോ മരുന്ന് നിർദേശിക്കുകയോ ചെയ്യില്ല.',
    starters: ['VillageVet എന്തെല്ലാം സേവനങ്ങളാണ് നൽകുന്നത്?', 'പാൽമൃഗത്തിൽ പാൽ കുറയാനുള്ള സാധാരണ കാരണങ്ങൾ എന്തൊക്കെയാണ്?', 'കന്നുകാലികളിലെ ചൂട് സമ്മർദ്ദത്തിന്റെ ലക്ഷണങ്ങൾ എന്തൊക്കെയാണ്?'],
    tryAsking: 'ഇങ്ങനെ ചോദിക്കാം', thinking: 'നിങ്ങളുടെ ചോദ്യം പരിശോധിക്കുന്നു', placeholder: 'മൃഗപരിചരണമോ VillageVet-നെയോ കുറിച്ച് ചോദിക്കൂ…', listening: 'കേൾക്കുന്നു…',
    micDenied: 'മൈക്രോഫോൺ അനുമതി ലഭിച്ചില്ല. ചോദ്യം ടൈപ്പ് ചെയ്ത് തുടരാം.', micError: 'വോയ്സ് ഇൻപുട്ടിൽ പ്രശ്നമുണ്ടായി. ടൈപ്പ് ചെയ്ത് തുടരാം.',
    disclaimer: 'പൊതുവായ അവബോധത്തിനായി മാത്രം — രോഗനിർണയമോ പ്രിസ്ക്രിപ്ഷനോ അല്ല. അടിയന്തര മൃഗാരോഗ്യ പ്രശ്നങ്ങൾക്ക് യോഗ്യനായ വെറ്ററിനറിയനെ സമീപിക്കുക.',
    connectionError: 'ഇപ്പോൾ കണക്ഷനിൽ പ്രശ്നമുണ്ട്. വീണ്ടും ശ്രമിക്കുകയോ VillageVet-നെ നേരിട്ട് ബന്ധപ്പെടുകയോ ചെയ്യുക.', rateLimit: 'ഒരേസമയം വളരെ കൂടുതൽ ചോദ്യങ്ങൾ അയച്ചു. ഒരു മിനിറ്റ് കാത്ത ശേഷം വീണ്ടും ശ്രമിക്കുക.',
    followUpLabel: 'അടുത്തതായി ചോദിക്കാം', fallbackFollowUps: ['ആദ്യം ഞാൻ എന്താണ് പരിശോധിക്കേണ്ടത്?', 'ഏത് മുന്നറിയിപ്പ് ലക്ഷണങ്ങൾക്ക് ഉടൻ വെറ്ററിനറിയനെ സമീപിക്കണം?', 'വെറ്ററിനറിയനോട് എന്തെല്ലാം വിവരങ്ങൾ പറയണം?'],
    reset: 'ചാറ്റ് റീസെറ്റ് ചെയ്യുക', close: 'VillageVet AI അടയ്ക്കുക', send: 'സന്ദേശം അയയ്ക്കുക', voice: 'വോയ്സ് ഇൻപുട്ട് ഉപയോഗിക്കുക', stopVoice: 'വോയ്സ് ഇൻപുട്ട് നിർത്തുക', voiceUnsupported: 'ഈ ബ്രൗസറിൽ വോയ്സ് ഇൻപുട്ട് പിന്തുണയ്ക്കുന്നില്ല',
    stop: 'മറുപടി നിർത്തുക', copy: 'മറുപടി പകർത്തുക', copied: 'പകർത്തി', regenerate: 'മറുപടി വീണ്ടും സൃഷ്ടിക്കുക', stopped: 'മറുപടി നിർത്തി',
    photo: 'ഫോട്ടോ ചേർക്കുക', photoReady: 'ദൃശ്യ പരിശോധനയ്ക്ക് ഫോട്ടോ തയ്യാറാണ്', removePhoto: 'ഫോട്ടോ നീക്കുക', photoUnsupported: 'JPG, PNG അല്ലെങ്കിൽ WebP ഫോട്ടോ തിരഞ്ഞെടുക്കുക.', photoTooLarge: '10 MB-ൽ താഴെയുള്ള ഫോട്ടോ തിരഞ്ഞെടുക്കുക.', photoError: 'ഈ ഫോട്ടോ തയ്യാറാക്കാനായില്ല. മറ്റൊരു ഫോട്ടോ ശ്രമിക്കുക.', imageDefaultPrompt: 'ഈ മൃഗത്തിന്റെ ഫോട്ടോയിൽ കാണുന്ന ലക്ഷണങ്ങൾ നോക്കി ഞാൻ എന്താണ് ശ്രദ്ധിക്കേണ്ടത് എന്ന് പറയുക.', readAloud: 'മറുപടി വായിച്ചു കേൾപ്പിക്കുക', stopReading: 'വായന നിർത്തുക', autoRead: 'പുതിയ മറുപടികൾ സ്വയം വായിക്കുക', autoReadOn: 'ഓട്ടോ വോയ്സ് ഓൺ', autoReadOff: 'ഓട്ടോ വോയ്സ് ഓഫ്',
  },
}

function getSpeechRecognitionCtor() {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function speechText(text) {
  return String(text || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/[*_~>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('read failed'))
    reader.readAsDataURL(file)
  })
}

async function prepareImage(file) {
  if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    const error = new Error('unsupported')
    error.code = 'unsupported'
    throw error
  }
  if (file.size > MAX_IMAGE_FILE_BYTES) {
    const error = new Error('too-large')
    error.code = 'too-large'
    throw error
  }

  const sourceUrl = await fileToDataUrl(file)
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('decode failed'))
    img.src = sourceUrl
  })

  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(image.naturalWidth || 1, image.naturalHeight || 1))
  const width = Math.max(1, Math.round((image.naturalWidth || 1) * scale))
  const height = Math.max(1, Math.round((image.naturalHeight || 1) * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d', { alpha: false })
  if (!context) throw new Error('canvas unavailable')
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, width, height)
  context.drawImage(image, 0, 0, width, height)

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((result) => result ? resolve(result) : reject(new Error('encode failed')), 'image/jpeg', 0.8)
  })
  const preview = await fileToDataUrl(blob)
  const data = preview.split(',')[1] || ''
  if (!data) throw new Error('encode failed')

  return {
    name: file.name || 'animal-photo.jpg',
    mimeType: 'image/jpeg',
    data,
    preview,
  }
}

function visibleStreamText(raw) {
  const lower = raw.toLowerCase()
  const markerIndex = lower.indexOf('<suggestions>')
  if (markerIndex >= 0) return raw.slice(0, markerIndex).trimEnd()

  const lastOpen = raw.lastIndexOf('<')
  if (lastOpen >= 0) {
    const tail = raw.slice(lastOpen).toLowerCase()
    if (!tail.includes('>') && '<suggestions>'.startsWith(tail)) {
      return raw.slice(0, lastOpen).trimEnd()
    }
  }
  return raw
}

// Gemini streams token fragments, so a formatting marker can arrive before
// its closing pair. Hiding only the unmatched marker prevents temporary raw
// "**" / "`" characters from flashing in the chat while preserving the
// complete Markdown once the rest of the token arrives.
function stabilizeStreamingMarkdown(text) {
  let safe = String(text || '')

  const boldMarkers = [...safe.matchAll(/\*\*/g)]
  if (boldMarkers.length % 2 === 1) {
    const marker = boldMarkers[boldMarkers.length - 1]
    safe = `${safe.slice(0, marker.index)}${safe.slice(marker.index + 2)}`
  }

  const codeMarkers = [...safe.matchAll(/`/g)]
  if (codeMarkers.length % 2 === 1) {
    const marker = codeMarkers[codeMarkers.length - 1]
    safe = `${safe.slice(0, marker.index)}${safe.slice(marker.index + 1)}`
  }

  return safe
}

function parseModelPayload(raw, fallbackSuggestions) {
  const lower = raw.toLowerCase()
  const startTag = '<suggestions>'
  const endTag = '</suggestions>'
  const start = lower.indexOf(startTag)
  if (start < 0) {
    return { answer: raw.trim(), suggestions: fallbackSuggestions }
  }

  const end = lower.indexOf(endTag, start + startTag.length)
  const suggestionText = raw.slice(start + startTag.length, end >= 0 ? end : undefined)
  const suggestions = suggestionText
    .split(/\r?\n/)
    .map((item) => item.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 3)

  return {
    answer: raw.slice(0, start).trim(),
    suggestions: suggestions.length ? suggestions : fallbackSuggestions,
  }
}

function parseSseBlock(block) {
  const data = block
    .split(/\r?\n/)
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice(5).trim())
    .join('\n')
  if (!data) return null
  try { return JSON.parse(data) } catch { return null }
}

export default function AIAssistantCTA({ variant = 'solid', compact = false, className = '' }) {
  const { t, lang } = useLanguage()
  const copy = CHAT_COPY[lang] || CHAT_COPY.en
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ id: createId(), role: 'assistant', text: copy.welcome, suggestions: [] }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamStarted, setStreamStarted] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const messagesRef = useRef(null)
  const wrapperRef = useRef(null)
  const panelRef = useRef(null)
  const requestControllerRef = useRef(null)
  const activeAssistantIdRef = useRef(null)
  const copiedTimerRef = useRef(null)
  const fileInputRef = useRef(null)
  const lastAutoSpokenRef = useRef(null)
  const [copiedId, setCopiedId] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageError, setImageError] = useState('')
  const [speakingId, setSpeakingId] = useState(null)
  const [autoRead, setAutoRead] = useState(true)
  const [speechSupported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window)

  const recognitionRef = useRef(null)
  const [micSupported] = useState(() => Boolean(getSpeechRecognitionCtor()))
  const [listening, setListening] = useState(false)
  const [micError, setMicError] = useState('')

  useEffect(() => {
    setMessages((current) => {
      if (current.length === 1 && current[0]?.role === 'assistant') {
        return [{ ...current[0], text: copy.welcome, suggestions: [] }]
      }
      return current
    })
  }, [copy.welcome])

  useEffect(() => {
    if (!open && recognitionRef.current) {
      try { recognitionRef.current.stop() } catch { /* already stopped */ }
    }
    if (!open && speechSupported) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
    }
  }, [open, speechSupported])

  useEffect(() => () => {
    requestControllerRef.current?.abort()
    if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current)
    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch { /* already stopped */ }
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
  }, [])

  const stopListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch { /* already stopped */ }
    }
    setListening(false)
  }

  const startListening = () => {
    const Ctor = getSpeechRecognitionCtor()
    if (!Ctor) return
    setMicError('')

    const recognition = new Ctor()
    recognition.lang = SPEECH_LANG_MAP[lang] || 'en-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.continuous = false
    recognition.onstart = () => setListening(true)
    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript?.trim()
      if (transcript) {
        setInput((current) => (current ? `${current} ${transcript}` : transcript))
        window.setTimeout(() => inputRef.current?.focus(), 0)
      }
    }
    recognition.onerror = (event) => {
      if (event?.error === 'not-allowed' || event?.error === 'permission-denied' || event?.error === 'service-not-allowed') {
        setMicError(copy.micDenied)
      } else if (event?.error !== 'no-speech' && event?.error !== 'aborted') {
        setMicError(copy.micError)
      }
      setListening(false)
    }
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition

    try { recognition.start() } catch { setListening(false) }
  }

  const toggleMic = () => {
    if (!micSupported) return
    if (listening) stopListening()
    else startListening()
  }

  const handleImageFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setImageError('')
    try {
      const prepared = await prepareImage(file)
      setSelectedImage(prepared)
      window.setTimeout(() => inputRef.current?.focus(), 0)
    } catch (err) {
      setSelectedImage(null)
      if (err?.code === 'unsupported') setImageError(copy.photoUnsupported)
      else if (err?.code === 'too-large') setImageError(copy.photoTooLarge)
      else setImageError(copy.photoError)
    }
  }

  const stopSpeaking = () => {
    if (!speechSupported) return
    window.speechSynthesis.cancel()
    setSpeakingId(null)
  }

  const speakAnswer = (message) => {
    if (!speechSupported || !message?.text) return
    if (speakingId === message.id) {
      stopSpeaking()
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(speechText(message.text))
    utterance.lang = SPEECH_LANG_MAP[lang] || 'en-IN'
    const voices = window.speechSynthesis.getVoices?.() || []
    const wanted = utterance.lang.toLowerCase().split('-')[0]
    const matchingVoice = voices.find((voice) => String(voice.lang || '').toLowerCase().startsWith(wanted))
    if (matchingVoice) utterance.voice = matchingVoice
    utterance.rate = 0.94
    utterance.pitch = 1
    utterance.onend = () => setSpeakingId((current) => current === message.id ? null : current)
    utterance.onerror = () => setSpeakingId((current) => current === message.id ? null : current)
    setSpeakingId(message.id)
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (!open) return undefined
    const handleClick = (e) => {
      const insideTrigger = wrapperRef.current && wrapperRef.current.contains(e.target)
      const insidePanel = panelRef.current && panelRef.current.contains(e.target)
      if (!insideTrigger && !insidePanel) setOpen(false)
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
      window.clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (!messagesRef.current) return
    const el = messagesRef.current
    window.requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [messages, loading, streamStarted])

  useEffect(() => {
    const textarea = inputRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 112)}px`
  }, [input])

  const base = compact
    ? 'ai-cta-btn inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
    : 'ai-cta-btn inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  const styles = variant === 'solid'
    ? 'ai-cta-solid text-white shadow-soft hover:shadow-lift'
    : 'border-2 border-brand/20 text-brand-deep hover:border-gold hover:bg-gold-light'

  const latestAssistantId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].role === 'assistant') return messages[i].id
    }
    return null
  }, [messages])

  useEffect(() => {
    if (!autoRead || !speechSupported || loading || !latestAssistantId) return undefined
    const message = messages.find((item) => item.id === latestAssistantId)
    if (!message || message.streaming || !message.text || message.id === messages[0]?.id) return undefined
    if (lastAutoSpokenRef.current === message.id) return undefined
    lastAutoSpokenRef.current = message.id
    const timer = window.setTimeout(() => speakAnswer(message), 180)
    return () => window.clearTimeout(timer)
  }, [autoRead, speechSupported, loading, latestAssistantId, messages])

  const toPayloadHistory = (items) => items
    .filter((message) => (
      (message.role === 'user' || message.role === 'assistant')
      && !message.streaming
      && typeof message.text === 'string'
      && message.text.trim()
    ))
    .slice(-12)
    .map(({ role, text: content }) => ({ role, content }))

  const runRequest = async ({ text, assistantId, payloadHistory, image = null, appendUser = true }) => {
    const userMessage = { id: createId(), role: 'user', text, image }

    if (speechSupported) window.speechSynthesis.cancel()
    setSpeakingId(null)
    if (lastAutoSpokenRef.current === assistantId) lastAutoSpokenRef.current = null
    setInput('')
    setSelectedImage(null)
    setImageError('')
    setError('')
    setMicError('')
    setLoading(true)
    setStreamStarted(false)
    activeAssistantIdRef.current = assistantId

    if (appendUser) {
      setMessages((current) => [
        ...current,
        userMessage,
        { id: assistantId, role: 'assistant', text: '', suggestions: [], streaming: true, stopped: false },
      ])
    } else {
      setMessages((current) => current.map((message) => (
        message.id === assistantId
          ? { ...message, text: '', suggestions: [], streaming: true, stopped: false }
          : message
      )))
    }

    const controller = new AbortController()
    requestControllerRef.current = controller
    let rawReply = ''

    try {
      const response = await fetch(STREAM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: text,
          history: payloadHistory,
          language: lang,
          image: image ? { mimeType: image.mimeType, data: image.data } : undefined,
        }),
      })

      if (!response.ok) {
        let data = null
        try { data = await response.json() } catch { data = null }
        const message = response.status === 429 ? copy.rateLimit : (data?.error || copy.connectionError)
        const safeError = new Error(message)
        safeError.vetted = true
        throw safeError
      }

      if (!response.body) {
        const safeError = new Error(copy.connectionError)
        safeError.vetted = true
        throw safeError
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value: chunk } = await reader.read()
        buffer += decoder.decode(chunk || new Uint8Array(), { stream: !done })

        const blocks = buffer.split(/\r?\n\r?\n/)
        buffer = blocks.pop() || ''

        for (const block of blocks) {
          const event = parseSseBlock(block)
          if (!event) continue
          if (event.type === 'delta' && typeof event.text === 'string') {
            rawReply += event.text
            const visible = stabilizeStreamingMarkdown(visibleStreamText(rawReply))
            setStreamStarted(true)
            setMessages((current) => current.map((message) => (
              message.id === assistantId ? { ...message, text: visible } : message
            )))
          }
          if (event.type === 'replace' && typeof event.text === 'string') {
            rawReply = event.text
            const visible = stabilizeStreamingMarkdown(visibleStreamText(rawReply))
            setStreamStarted(true)
            setMessages((current) => current.map((message) => (
              message.id === assistantId ? { ...message, text: visible } : message
            )))
          }
          if (event.type === 'error') {
            const safeError = new Error(event.message || copy.connectionError)
            safeError.vetted = true
            throw safeError
          }
        }

        if (done) break
      }

      if (!rawReply.trim()) {
        const safeError = new Error(copy.connectionError)
        safeError.vetted = true
        throw safeError
      }

      const parsed = parseModelPayload(rawReply, copy.fallbackFollowUps)
      setMessages((current) => current.map((message) => (
        message.id === assistantId
          ? { ...message, text: parsed.answer, suggestions: parsed.suggestions, streaming: false }
          : message
      )))
    } catch (err) {
      if (err?.name === 'AbortError') return
      setMessages((current) => current.filter((message) => message.id !== assistantId))
      setError(err?.vetted ? err.message : copy.connectionError)
    } finally {
      if (requestControllerRef.current === controller) requestControllerRef.current = null
      if (activeAssistantIdRef.current === assistantId) activeAssistantIdRef.current = null
      setLoading(false)
      setStreamStarted(false)
    }
  }

  const sendMessage = async (value = input, imageOverride = selectedImage) => {
    const image = imageOverride
    const text = String(value || '').trim() || (image ? copy.imageDefaultPrompt : '')
    if ((!text && !image) || loading) return
    const assistantId = createId()
    await runRequest({
      text,
      image,
      assistantId,
      payloadHistory: toPayloadHistory(messages),
      appendUser: true,
    })
  }

  const stopGeneration = () => {
    const assistantId = activeAssistantIdRef.current
    requestControllerRef.current?.abort()
    requestControllerRef.current = null
    activeAssistantIdRef.current = null
    if (assistantId) {
      setMessages((current) => current.flatMap((message) => {
        if (message.id !== assistantId) return [message]
        if (!message.text.trim()) return []
        return [{ ...message, streaming: false, suggestions: [], stopped: true }]
      }))
    }
    setLoading(false)
    setStreamStarted(false)
  }

  const regenerateAnswer = async (assistantId) => {
    if (loading) return
    const assistantIndex = messages.findIndex((message) => message.id === assistantId && message.role === 'assistant')
    if (assistantIndex < 0) return

    let userIndex = assistantIndex - 1
    while (userIndex >= 0 && messages[userIndex].role !== 'user') userIndex -= 1
    if (userIndex < 0) return

    const text = messages[userIndex].text?.trim()
    const image = messages[userIndex].image || null
    if (!text && !image) return

    await runRequest({
      text: text || copy.imageDefaultPrompt,
      image,
      assistantId,
      payloadHistory: toPayloadHistory(messages.slice(0, userIndex)),
      appendUser: false,
    })
  }

  const copyAnswer = async (message) => {
    if (!message?.text) return
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(message.text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = message.text
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        textarea.remove()
      }
      setCopiedId(message.id)
      if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current)
      copiedTimerRef.current = window.setTimeout(() => setCopiedId(null), 1600)
    } catch {
      // Clipboard access can be blocked by browser permissions. The chat
      // remains usable, so avoid replacing the answer with an error state.
    }
  }

  const resetChat = () => {
    requestControllerRef.current?.abort()
    requestControllerRef.current = null
    activeAssistantIdRef.current = null
    if (speechSupported) window.speechSynthesis.cancel()
    lastAutoSpokenRef.current = null
    setSpeakingId(null)
    setMessages([{ id: createId(), role: 'assistant', text: copy.welcome, suggestions: [] }])
    setInput('')
    setSelectedImage(null)
    setImageError('')
    setError('')
    setMicError('')
    setLoading(false)
    setStreamStarted(false)
    setCopiedId(null)
  }

  return (
    <>
      <div className={`relative inline-block ${className}`} ref={wrapperRef}>
        <button
          type="button"
          className={`${base} ${styles}`}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={t.ai.cta}
          title={compact ? t.ai.cta : undefined}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className={`flex items-center justify-center ${compact ? 'h-[18px] w-[18px]' : 'h-5 w-5'}`}>
            <Bot size={18} strokeWidth={2} />
          </span>
          {!compact && t.ai.cta}
        </button>
      </div>

      {open && createPortal(
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="VillageVet AI assistant"
          className="ai-chat-panel fixed bottom-3 left-3 right-3 z-[80] flex h-[min(720px,calc(100dvh-24px))] flex-col overflow-hidden rounded-[1.75rem] border border-brand-deep/10 bg-cream shadow-lift sm:bottom-6 sm:left-auto sm:right-6 sm:top-auto sm:h-[min(700px,calc(100dvh-48px))] sm:w-[min(460px,calc(100vw-48px))]"
        >
          <div className="bg-brand-deep px-4 py-3 text-white">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold text-brand-deep">
                  <Sparkles size={19} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">VillageVet AI</p>
                  <p className="truncate text-[11px] text-white/65">{copy.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1">
                <button type="button" onClick={resetChat} className="rounded-full p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold" aria-label={copy.reset} title={copy.reset}>
                  <RotateCcw size={16} />
                </button>
                <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold" aria-label={copy.close}>
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 pl-[52px]">
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/80 ring-1 ring-inset ring-white/10">
                {copy.languageBadge}
              </span>
              {speechSupported && (
                <button
                  type="button"
                  onClick={() => {
                    const next = !autoRead
                    setAutoRead(next)
                    if (!next) stopSpeaking()
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset transition ${autoRead ? 'bg-gold text-brand-deep ring-gold' : 'bg-white/10 text-white/80 ring-white/10 hover:bg-white/15'}`}
                  aria-pressed={autoRead}
                  aria-label={copy.autoRead}
                  title={copy.autoRead}
                >
                  {autoRead ? <Volume2 size={12} aria-hidden="true" /> : <VolumeX size={12} aria-hidden="true" />}
                  <span>{autoRead ? copy.autoReadOn : copy.autoReadOff}</span>
                </button>
              )}
            </div>
          </div>

          <div
            ref={messagesRef}
            className="ai-chat-scroll min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#FFFCF6] px-3 py-4 sm:px-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message) => (
              <div key={message.id} className={`${message.streaming && !message.text ? 'hidden ' : ''}space-y-2`}>
                <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[88%] break-words rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                      message.role === 'user'
                        ? 'whitespace-pre-wrap rounded-br-md bg-brand text-white shadow-sm'
                        : 'rounded-bl-md border border-brand-deep/10 bg-white text-ink/80 shadow-sm'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <>
                        {message.image?.preview && (
                          <img
                            src={message.image.preview}
                            alt={message.image.name || 'Attached animal photo'}
                            className="mb-2 max-h-48 w-full rounded-xl object-cover ring-1 ring-white/25"
                          />
                        )}
                        {message.text && <div className="whitespace-pre-wrap">{message.text}</div>}
                      </>
                    ) : (
                      <>
                        {renderMarkdown(message.text)}
                        {message.streaming && message.text && <span className="ai-stream-cursor" aria-hidden="true" />}
                      </>
                    )}
                  </div>
                </div>

                {message.role === 'assistant' && !message.streaming && message.id !== messages[0]?.id && message.text && (
                  <div className="ml-1 flex flex-wrap items-center gap-1.5 text-[10px] text-ink/50">
                    {message.stopped && (
                      <span className="mr-1 rounded-full bg-brand-light px-2 py-1 font-semibold text-brand-deep/70">{copy.stopped}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => copyAnswer(message)}
                      className="ai-message-action inline-flex items-center gap-1 rounded-full px-2 py-1.5 font-semibold transition hover:bg-brand-light hover:text-brand-deep"
                      aria-label={copy.copy}
                      title={copy.copy}
                    >
                      {copiedId === message.id ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
                      <span>{copiedId === message.id ? copy.copied : copy.copy}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => regenerateAnswer(message.id)}
                      className="ai-message-action inline-flex items-center gap-1 rounded-full px-2 py-1.5 font-semibold transition hover:bg-brand-light hover:text-brand-deep disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={copy.regenerate}
                      title={copy.regenerate}
                      disabled={loading}
                    >
                      <RefreshCw size={12} aria-hidden="true" />
                      <span>{copy.regenerate}</span>
                    </button>
                    {speechSupported && (
                      <button
                        type="button"
                        onClick={() => speakAnswer(message)}
                        className="ai-message-action inline-flex items-center gap-1 rounded-full px-2 py-1.5 font-semibold transition hover:bg-brand-light hover:text-brand-deep"
                        aria-label={speakingId === message.id ? copy.stopReading : copy.readAloud}
                        title={speakingId === message.id ? copy.stopReading : copy.readAloud}
                      >
                        {speakingId === message.id ? <VolumeX size={12} aria-hidden="true" /> : <Volume2 size={12} aria-hidden="true" />}
                        <span>{speakingId === message.id ? copy.stopReading : copy.readAloud}</span>
                      </button>
                    )}
                  </div>
                )}

                {message.role === 'assistant' && message.id === latestAssistantId && !loading && message.suggestions?.length > 0 && messages.length > 1 && (
                  <div className="ml-1 max-w-[94%] animate-[ai-suggestions-in_.22s_ease-out]">
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[.13em] text-brand/60">{copy.followUpLabel}</p>
                    <div className="flex flex-col gap-1.5">
                      {message.suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => sendMessage(suggestion, null)}
                          className="group flex w-full items-center justify-between gap-2 rounded-xl border border-brand-deep/10 bg-white px-3 py-2 text-left text-xs font-medium leading-5 text-brand-deep shadow-sm transition hover:-translate-y-0.5 hover:border-gold/70 hover:bg-gold-light/60 hover:shadow-card"
                        >
                          <span>{suggestion}</span>
                          <ChevronRight size={14} className="flex-shrink-0 text-brand/50 transition group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && !streamStarted && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3 rounded-2xl rounded-bl-md border border-brand-deep/10 bg-white px-3.5 py-3 text-sm text-ink/60 shadow-sm">
                  <span className="ai-thinking-dots" aria-hidden="true"><i /><i /><i /></span>
                  <span>{copy.thinking}</span>
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="pt-1">
                <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[.14em] text-brand/70">{copy.tryAsking}</p>
                <div className="flex flex-wrap gap-2">
                  {copy.starters.map((prompt) => (
                    <button key={prompt} type="button" onClick={() => sendMessage(prompt, null)} className="rounded-full border border-brand/15 bg-white px-3 py-2 text-left text-xs font-medium text-brand-deep transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold-light">
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && <div role="alert" className="rounded-xl border border-brand/15 bg-brand-light px-3 py-2.5 text-xs leading-5 text-brand-deep">{error}</div>}
            {micError && <div role="alert" className="rounded-xl border border-brand/15 bg-brand-light px-3 py-2.5 text-xs leading-5 text-brand-deep">{micError}</div>}
          </div>

          <div className="border-t border-brand-deep/10 bg-cream p-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleImageFile}
            />
            {selectedImage && (
              <div className="mb-2 flex items-center gap-2 rounded-2xl border border-brand-deep/10 bg-white p-2 shadow-sm">
                <img src={selectedImage.preview} alt="Selected animal" className="h-14 w-14 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-brand-deep">{selectedImage.name}</p>
                  <p className="text-[10px] text-ink/45">{copy.photoReady}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-ink/50 transition hover:bg-brand-light hover:text-brand-deep"
                  aria-label={copy.removePhoto}
                  title={copy.removePhoto}
                >
                  <X size={15} aria-hidden="true" />
                </button>
              </div>
            )}
            {imageError && <div role="alert" className="mb-2 rounded-xl border border-brand/15 bg-brand-light px-3 py-2 text-[11px] leading-4 text-brand-deep">{imageError}</div>}
            <form onSubmit={(e) => { e.preventDefault(); sendMessage() }} className="flex items-end gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                aria-label={copy.photo}
                title={copy.photo}
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40 ${selectedImage ? 'border-gold bg-gold-light text-brand-deep' : 'border-brand-deep/15 bg-white text-brand-deep hover:border-gold hover:bg-gold-light'}`}
              >
                <ImagePlus size={18} aria-hidden="true" />
              </button>
              <label className="sr-only" htmlFor="villagevet-ai-input">Message VillageVet AI</label>
              <textarea
                ref={inputRef}
                id="villagevet-ai-input"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder={copy.placeholder}
                className="min-h-11 max-h-28 flex-1 resize-none overflow-y-auto rounded-2xl border border-brand-deep/15 bg-white px-3.5 py-2.5 text-sm leading-5 text-ink outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-2 focus:ring-gold/20"
                disabled={loading}
              />
              <button
                type="button"
                onClick={toggleMic}
                disabled={!micSupported || loading}
                aria-label={!micSupported ? copy.voiceUnsupported : listening ? copy.stopVoice : copy.voice}
                title={!micSupported ? copy.voiceUnsupported : listening ? copy.stopVoice : copy.voice}
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40 ${listening ? 'border-transparent bg-brand text-white animate-pulse' : 'border-brand-deep/15 bg-white text-brand-deep hover:border-gold hover:bg-gold-light'}`}
              >
                {listening ? <MicOff size={17} aria-hidden="true" /> : <Mic size={17} aria-hidden="true" />}
              </button>
              {loading ? (
                <button
                  type="button"
                  onClick={stopGeneration}
                  className="ai-stop-button flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-deep text-white transition hover:-translate-y-0.5 hover:bg-ink"
                  aria-label={copy.stop}
                  title={copy.stop}
                >
                  <Square size={15} fill="currentColor" aria-hidden="true" />
                </button>
              ) : (
                <button type="submit" disabled={!input.trim() && !selectedImage} className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0" aria-label={copy.send}>
                  <Send size={17} aria-hidden="true" />
                </button>
              )}
            </form>
            {listening && <p className="mt-2 px-1 text-[11px] font-medium text-brand-deep" aria-live="polite">🎤 {copy.listening}</p>}
            <p className="mt-2 px-1 text-[10px] leading-4 text-ink/45">{copy.disclaimer}</p>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
