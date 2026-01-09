import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import { LeadCaptureProvider } from './contexts/LeadCaptureContext';
import AnnouncementBanner from './components/AnnouncementBanner';
import Navbar from './components/Navbar';
import MobileNavbarRedesigned from './components/MobileNavbarRedesigned';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsent';
import { PageLoader } from './components/LoadingSkeleton';
import StickyMobileCTARedesigned from './components/StickyMobileCTARedesigned';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Company = lazy(() => import('./pages/Company'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Demo = lazy(() => import('./pages/Demo'));
const Chatbot = lazy(() => import('./pages/Chatbot'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Lazy load solution pages
const AIChatbot = lazy(() => import('./pages/solutions/AIChatbot'));
const AIReceptionist = lazy(() => import('./pages/solutions/AIReceptionist'));
const WorkflowAutomation = lazy(() => import('./pages/solutions/WorkflowAutomation'));
const AIAudit = lazy(() => import('./pages/solutions/AIAudit'));
const BusinessIntelligence = lazy(() => import('./pages/solutions/BusinessIntelligence'));
const CustomAI = lazy(() => import('./pages/solutions/CustomAI'));

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

// Main app content with routing
function AppContent() {
  const location = useLocation();

  // Pages that should not show navigation (standalone pages)
  const isStandalonePage = location.pathname === '/chatbot' || location.pathname === '/dashboard';
  const isLandingPage = false;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Announcement Banner */}
      {!isLandingPage && !isStandalonePage && <AnnouncementBanner />}
      {/* Mobile Navigation - Redesigned with simplified menu */}
      {!isLandingPage && !isStandalonePage && <MobileNavbarRedesigned />}
      {/* Desktop Navigation */}
      {!isLandingPage && !isStandalonePage && (
        <div className="hidden lg:block">
          <Navbar />
        </div>
      )}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/company" element={<Company />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/demo" element={<Demo />} />
            {/* Solution Pages */}
            <Route path="/solutions/chatbot" element={<AIChatbot />} />
            <Route path="/solutions/ai-receptionist" element={<AIReceptionist />} />
            <Route path="/solutions/workflow-automation" element={<WorkflowAutomation />} />
            <Route path="/solutions/ai-audit" element={<AIAudit />} />
            <Route path="/solutions/business-intelligence" element={<BusinessIntelligence />} />
            <Route path="/solutions/custom-ai" element={<CustomAI />} />
            {/* Standalone Pages */}
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </main>
      {!isLandingPage && !isStandalonePage && <Footer />}
      {!isLandingPage && !isStandalonePage && <CookieConsentBanner />}

      {/* Conversion Optimization Components */}
      {!isLandingPage && !isStandalonePage && <StickyMobileCTARedesigned />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <LeadCaptureProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </LeadCaptureProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;