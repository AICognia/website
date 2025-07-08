import React, { useState, useEffect, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';

// Lazy load heavy components
const ContactCTA = React.lazy(() => import('./components/ContactCTA'));
const Services = React.lazy(() => import('./components/Services'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Features = React.lazy(() => import('./components/Features'));
const About = React.lazy(() => import('./components/About'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const Footer = React.lazy(() => import('./components/Footer'));
const StickyChat = React.lazy(() => import('./components/StickyChat'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="h-16"></div>}>
        <ContactCTA />
        <Services />
        <Testimonials />
        <Features />
        <About />
        <FAQ />
        <Footer />
        <StickyChat />
      </Suspense>
    </div>
  );
}

export default App;
