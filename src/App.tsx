import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContactCTA from './components/ContactCTA';
import Services from './components/Services';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ContactCTA />
      <Services />
      <Features />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
