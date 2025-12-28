import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import { structuredDataTemplates } from '../config/seoConfig';
import ScrollProgress from '../components/ScrollProgress';
import OptimizedHero from '../components/OptimizedHero';
import MobileHeroRedesigned from '../components/MobileHeroRedesigned';
import SocialProofSection from '../components/SocialProofSection';
import FeaturesSection from '../components/FeaturesSection';
import SolutionsGrid from '../components/SolutionsGrid';
import FAQAccordion from '../components/FAQAccordion';
import HowItWorks from '../components/HowItWorks';
import FinalCTA from '../components/FinalCTA';
import DynamicTechBackground from '../components/DynamicTechBackground';
import { VideoProvider } from '../contexts/VideoContext';
import { initEngagementTracking } from '../utils/metaPixel';

const Home: React.FC = () => {
  // Initialize Meta Pixel and track PageView on component mount
  useEffect(() => {
    // Initialize Meta Pixel with pixel ID: 1224660309537951
    if (!(window as any).fbq) {
      /* eslint-disable */
      (function(f: any, b: any, e: any, v: any) {
        let n: any;
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        const t = b.createElement(e);
        t.async = !0;
        t.src = v;
        const s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
    }

    // Initialize with pixel ID and disable automatic tracking to prevent duplicates
    (window as any).fbq('set', 'autoConfig', false, '1224660309537951');
    (window as any).fbq('init', '1224660309537951', {}, { autoConfig: false });
    (window as any).fbq('track', 'PageView');

    // Initialize scroll depth and time on site tracking
    const cleanup = initEngagementTracking();
    return cleanup;
  }, []);

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

          {/* 3. Social Proof - Testimonials & stats */}
          <SocialProofSection />

          {/* 4. Features Section - What the AI does */}
          <FeaturesSection />

          {/* 5. How It Works - Setup process */}
          <HowItWorks />

          {/* 6. Industries - Who it's for */}
          <SolutionsGrid />

          {/* 7. FAQ - Remove objections */}
          <FAQAccordion />

          {/* 8. Final CTA - Close the deal */}
          <FinalCTA />
        </div>
      </div>
    </VideoProvider>
  );
};

export default Home;
