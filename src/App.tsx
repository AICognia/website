import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContactCTA from './components/ContactCTA';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Features from './components/Features';
import About from './components/About';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ContactCTA />
      <Services />
      <Testimonials />
      <Features />
      <About />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
