import ServiceCategory from './pages/ServiceCategory.jsx'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import FarmerSolutions from './pages/FarmerSolutions.jsx'
import RetailNetwork from './pages/RetailNetwork.jsx'
import Products from './pages/Products.jsx'
import FarmerAwareness from './pages/FarmerAwareness.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import Professionals from './pages/Professionals.jsx'
import Partners from './pages/Partners.jsx'
import Investors from './pages/Investors.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Disclaimer from './pages/Disclaimer.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceCategory />} />
          <Route path="/farmer-solutions" element={<FarmerSolutions />} />
          <Route path="/retail-network" element={<RetailNetwork />} />
          <Route path="/products" element={<Products />} />
          <Route path="/farmer-awareness" element={<FarmerAwareness />} />
          <Route path="/farmer-awareness/:slug" element={<ArticleDetail />} />
          <Route path="/veterinary-professionals" element={<Professionals />} />
          <Route path="/business-partners" element={<Partners />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/medical-disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  )
}
