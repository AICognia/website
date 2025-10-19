import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsent';

// Pages
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Company from './pages/Company';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Healthcare from './pages/Healthcare';
import Hospitality from './pages/Hospitality';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/healthcare" element={<Healthcare />} />
                <Route path="/hospitality" element={<Hospitality />} />
                <Route path="/company" element={<Company />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <CookieConsentBanner />
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;