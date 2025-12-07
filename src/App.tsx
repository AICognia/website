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
import Breadcrumb from './components/Breadcrumb';
import { PageLoader } from './components/LoadingSkeleton';
import StickyMobileCTARedesigned from './components/StickyMobileCTARedesigned';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Company = lazy(() => import('./pages/Company'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Lazy load industry pages
const Healthcare = lazy(() => import('./pages/industries/Healthcare'));
const Legal = lazy(() => import('./pages/industries/Legal'));
const Retail = lazy(() => import('./pages/industries/Retail'));
const Enterprise = lazy(() => import('./pages/industries/Enterprise'));
const Hospitality = lazy(() => import('./pages/industries/Hospitality'));
const Automotive = lazy(() => import('./pages/industries/Automotive'));
const HomeServices = lazy(() => import('./pages/industries/HomeServices'));

// Lazy load feature pages
const CallHandling = lazy(() => import('./pages/features/CallHandling'));
const SmartScheduling = lazy(() => import('./pages/features/SmartScheduling'));
const MultiLanguage = lazy(() => import('./pages/features/MultiLanguage'));
const CRMIntegration = lazy(() => import('./pages/features/CRMIntegration'));
const NaturalConversations = lazy(() => import('./pages/features/NaturalConversations'));
const AnalyticsDashboard = lazy(() => import('./pages/features/AnalyticsDashboard'));

// Lazy load use case pages
const PatientScheduling = lazy(() => import('./pages/usecases/PatientScheduling'));
const ClientIntake = lazy(() => import('./pages/usecases/ClientIntake'));
const CustomerSupport = lazy(() => import('./pages/usecases/CustomerSupport'));
const AfterHoursService = lazy(() => import('./pages/usecases/AfterHoursService'));
const LeadQualification = lazy(() => import('./pages/usecases/LeadQualification'));
const OrderProcessing = lazy(() => import('./pages/usecases/OrderProcessing'));

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

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Announcement Banner */}
      <AnnouncementBanner />
      {/* Mobile Navigation - Redesigned with simplified menu */}
      <MobileNavbarRedesigned />
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <Navbar />
      </div>
      {location.pathname !== '/' && <Breadcrumb />}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/company" element={<Company />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* Industry Pages */}
            <Route path="/industries/healthcare" element={<Healthcare />} />
            <Route path="/industries/legal" element={<Legal />} />
            <Route path="/industries/retail" element={<Retail />} />
            <Route path="/industries/enterprise" element={<Enterprise />} />
            <Route path="/industries/hospitality" element={<Hospitality />} />
            <Route path="/industries/automotive" element={<Automotive />} />
            <Route path="/industries/home-services" element={<HomeServices />} />
            {/* Feature Pages */}
            <Route path="/features/call-handling" element={<CallHandling />} />
            <Route path="/features/smart-scheduling" element={<SmartScheduling />} />
            <Route path="/features/multi-language" element={<MultiLanguage />} />
            <Route path="/features/crm-integration" element={<CRMIntegration />} />
            <Route path="/features/natural-conversations" element={<NaturalConversations />} />
            <Route path="/features/analytics-dashboard" element={<AnalyticsDashboard />} />
            {/* Use Case Pages */}
            <Route path="/usecases/patient-scheduling" element={<PatientScheduling />} />
            <Route path="/usecases/client-intake" element={<ClientIntake />} />
            <Route path="/usecases/customer-support" element={<CustomerSupport />} />
            <Route path="/usecases/after-hours-service" element={<AfterHoursService />} />
            <Route path="/usecases/lead-qualification" element={<LeadQualification />} />
            <Route path="/usecases/order-processing" element={<OrderProcessing />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CookieConsentBanner />

      {/* Conversion Optimization Components */}
      <StickyMobileCTARedesigned />
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