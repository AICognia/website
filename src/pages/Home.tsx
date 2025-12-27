import React from 'react';
import SEO from '../components/SEO';
import { structuredDataTemplates } from '../config/seoConfig';
import ScrollProgress from '../components/ScrollProgress';
import OptimizedHero from '../components/OptimizedHero';
import MobileHeroRedesigned from '../components/MobileHeroRedesigned';
import ProblemSection from '../components/ProblemSection';
import SocialProofSection from '../components/SocialProofSection';
import FeaturesSection from '../components/FeaturesSection';
import SolutionsGrid from '../components/SolutionsGrid';
import DemoSection from '../components/DemoSection';
import IntegrationsStrip from '../components/IntegrationsStrip';
import HowItWorks from '../components/HowItWorks';
import FAQAccordion from '../components/FAQAccordion';
import FinalCTA from '../components/FinalCTA';
import DynamicTechBackground from '../components/DynamicTechBackground';
import { VideoProvider } from '../contexts/VideoContext';

const Home: React.FC = () => {

  // FAQ structured data for the home page
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does setup take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We set up your system within 1 week. After analyzing your needs, we configure and activate your AI assistant.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which languages do you support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support over 20 languages. Your AI assistant can communicate naturally in your customers\' preferred language.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it integrate with existing systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, it integrates seamlessly with your CRM, ERP, and other business systems. We provide full API support.'
        }
      }
    ]
  };

  return (
    <VideoProvider>
      <div className="min-h-screen relative bg-black text-white">
        <ScrollProgress />

        {/* Dynamic Tech Background - Fixed position for entire page */}
        <div className="fixed inset-0 z-0">
          <DynamicTechBackground />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <SEO
            page="home"
            structuredData={[
              structuredDataTemplates.organization,
              structuredDataTemplates.webSite,
              structuredDataTemplates.service,
              faqStructuredData
            ]}
          />

          {/* 1. Hero Section - Desktop */}
          <OptimizedHero />

          {/* 2. Hero Section - Mobile */}
          <MobileHeroRedesigned />

          {/* 3. Problem Section - Pain points that resonate */}
          <ProblemSection />

          {/* 4. Social Proof - Testimonials & stats */}
          <SocialProofSection />

          {/* 5. Features Section - What the AI does */}
          <FeaturesSection />

          {/* 6. Demo Section - See it in action */}
          <DemoSection />

          {/* 7. Industries - Who it's for */}
          <SolutionsGrid />

          {/* 8. Integrations Strip - Quick trust signal */}
          <IntegrationsStrip />

          {/* 9. How It Works - Timeline */}
          <HowItWorks />

          {/* 10. FAQ - Remove objections */}
          <FAQAccordion />

          {/* 11. Final CTA - Close the deal */}
          <FinalCTA />
        </div>
      </div>
    </VideoProvider>
  );
};

export default Home;
