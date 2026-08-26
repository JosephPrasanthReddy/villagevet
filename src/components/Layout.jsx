import { useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main key={pathname} className="page-transition flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
