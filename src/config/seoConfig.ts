// SEO Configuration for all pages
export interface PageSEO {
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  keywords: {
    tr: string[];
    en: string[];
  };
  canonicalPath: string;
  ogImage?: string;
  structuredData?: any;
}

export const seoConfig: Record<string, PageSEO> = {
  home: {
    title: {
      tr: 'Cognia AI - AI Receptionist & Voice Agents | 24/7 Müşteri Hizmetleri',
      en: 'Cognia AI - AI Receptionist & Voice Agents | Never Miss a Call, Book 24/7'
    },
    description: {
      tr: 'AI receptionist ve sesli asistan çözümleri. 24/7 otomatik randevu alma, hiç kaçırılmayan aramalar. %10-20 daha fazla müşteri garantisi. Amerika ve Türkiye\'de hizmet. 1 hafta içinde kurulum.',
      en: 'AI receptionist and voice agent solutions. Never miss a call, book appointments 24/7. Guaranteed 10-20% more customers. Operating in US & Turkey. Enterprise voice AI, custom integrations. Setup in 1 week.'
    },
    keywords: {
      tr: ['AI danışmanlık', 'yapay zeka', 'chatbot', 'WhatsApp bot', 'Instagram bot', 'sesli asistan', 'AI otomasyon', 'iş otomasyonu', 'Türkiye AI', 'Amerika AI şirketi', 'Cognia AI', 'müşteri desteği otomasyonu', 'AI çözümleri'],
      en: ['AI consultancy', 'artificial intelligence', 'chatbot', 'WhatsApp bot', 'Instagram bot', 'voice agent', 'AI automation', 'business automation', 'US AI company', 'Turkey AI company', 'Cognia AI', 'customer support automation', 'AI solutions']
    },
    canonicalPath: '/',
    ogImage: '/og-image.png'
  },
  solutions: {
    title: {
      tr: 'AI Çözümleri | Sesli Asistanlar ve Chatbotlar - Cognia AI',
      en: 'AI Solutions | Voice Agents and Chatbots - Cognia AI'
    },
    description: {
      tr: 'Kurumsal AI çözümleri: Akıllı sesli asistanlar, çok kanallı chatbotlar, %95 ilk aramada çözüm oranı. WhatsApp, Instagram, telefon entegrasyonu.',
      en: 'Enterprise AI solutions: Intelligent voice agents, omnichannel chatbots, 95% first-call resolution. WhatsApp, Instagram, phone integration.'
    },
    keywords: {
      tr: ['AI çözümleri', 'sesli asistan', 'chatbot', 'kurumsal AI', 'müşteri desteği', 'çok kanallı', 'WhatsApp entegrasyonu', 'Instagram bot', 'telefon otomasyonu', 'AI müşteri hizmetleri'],
      en: ['AI solutions', 'voice agents', 'chatbots', 'enterprise AI', 'customer support', 'omnichannel', 'WhatsApp integration', 'Instagram bot', 'phone automation', 'AI customer service']
    },
    canonicalPath: '/solutions',
    ogImage: '/og-image-solutions.png'
  },
  platform: {
    title: {
      tr: 'Cognia AI Platform | Kurumsal AI Altyapısı ve Araçları',
      en: 'Cognia AI Platform | Enterprise AI Infrastructure & Tools'
    },
    description: {
      tr: 'Ölçeklenebilir kurumsal AI platformu. Bulut tabanlı, güvenli, kolay entegrasyon. CRM, ERP entegrasyonu, 45+ dil desteği, gelişmiş analitik.',
      en: 'Scalable enterprise AI platform. Cloud-native, secure, easy integration. CRM, ERP integration, 45+ language support, advanced analytics.'
    },
    keywords: {
      tr: ['AI platform', 'kurumsal AI', 'bulut AI', 'AI altyapı', 'CRM entegrasyonu', 'ERP entegrasyonu', 'çok dilli AI', 'AI analitik', 'güvenli AI', 'ölçeklenebilir AI'],
      en: ['AI platform', 'enterprise AI', 'cloud AI', 'AI infrastructure', 'CRM integration', 'ERP integration', 'multilingual AI', 'AI analytics', 'secure AI', 'scalable AI']
    },
    canonicalPath: '/platform',
    ogImage: '/og-image-platform.png'
  },
  company: {
    title: {
      tr: 'Hakkımızda | Cognia AI - Global AI Danışmanlık Şirketi',
      en: 'About Us | Cognia AI - Global AI Consultancy Company'
    },
    description: {
      tr: 'Cognia AI hakkında. Misyonumuz, değerlerimiz ve vizyonumuz. Türkiye ve Amerika\'da faaliyet gösteren uluslararası AI danışmanlık şirketi.',
      en: 'About Cognia AI. Our mission, values, and vision. International AI consultancy company operating in Turkey and the United States.'
    },
    keywords: {
      tr: ['Cognia AI hakkında', 'AI şirketi', 'misyon', 'vizyon', 'değerler', 'uluslararası AI', 'Türkiye AI', 'Amerika AI', 'AI danışmanlık hakkında'],
      en: ['about Cognia AI', 'AI company', 'mission', 'vision', 'values', 'international AI', 'Turkey AI', 'US AI', 'about AI consultancy']
    },
    canonicalPath: '/company',
    ogImage: '/og-image-company.png'
  },
  contact: {
    title: {
      tr: 'İletişim | Cognia AI - Ücretsiz Demo ve Danışmanlık',
      en: 'Contact | Cognia AI - Free Demo and Consultation'
    },
    description: {
      tr: 'Cognia AI ile iletişime geçin. Ücretsiz demo talep edin. Türkiye: +90 531 773 9053, Amerika: +1 217 693 8413. 24 saat içinde dönüş garantisi.',
      en: 'Contact Cognia AI. Request a free demo. Turkey: +90 531 773 9053, US: +1 217 693 8413. Response within 24 hours guaranteed.'
    },
    keywords: {
      tr: ['Cognia AI iletişim', 'AI demo', 'ücretsiz danışmanlık', 'AI çözüm talebi', 'iletişim formu', 'telefon', 'email', 'WhatsApp iletişim'],
      en: ['Cognia AI contact', 'AI demo', 'free consultation', 'AI solution request', 'contact form', 'phone', 'email', 'WhatsApp contact']
    },
    canonicalPath: '/contact',
    ogImage: '/og-image-contact.png'
  },
  privacy: {
    title: {
      tr: 'Gizlilik Politikası | Cognia AI',
      en: 'Privacy Policy | Cognia AI'
    },
    description: {
      tr: 'Cognia AI gizlilik politikası - Verilerinizi nasıl topladığımız, kullandığımız ve koruduğumuz hakkında bilgi edinin.',
      en: 'Cognia AI privacy policy - Learn how we collect, use, and protect your data.'
    },
    keywords: {
      tr: ['gizlilik politikası', 'veri koruma', 'KVKK', 'GDPR', 'Cognia AI', 'kişisel veriler', 'veri güvenliği'],
      en: ['privacy policy', 'data protection', 'GDPR', 'Cognia AI', 'personal data', 'data security', 'privacy']
    },
    canonicalPath: '/privacy-policy',
    ogImage: '/og-image.png'
  }
};

// Structured Data Templates
export const structuredDataTemplates = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cognia AI',
    alternateName: 'Cognia Artificial Intelligence',
    url: 'https://cogniaai.com',
    logo: 'https://cogniaai.com/logo512.png',
    description: 'AI receptionist and voice agent solutions for businesses. Never miss a call, book 24/7.',
    foundingDate: '2023',
    founders: [
      {
        '@type': 'Person',
        name: 'Emre Benian'
      }
    ],
    address: [
      {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        addressLocality: 'United States'
      },
      {
        '@type': 'PostalAddress',
        addressCountry: 'TR',
        addressLocality: 'Turkey'
      }
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-217-693-8413',
        contactType: 'sales',
        areaServed: 'US',
        availableLanguage: ['English', 'Turkish']
      },
      {
        '@type': 'ContactPoint',
        telephone: '+90-531-773-9053',
        contactType: 'sales',
        areaServed: 'TR',
        availableLanguage: ['Turkish', 'English']
      }
    ],
    sameAs: [
      'https://instagram.com/cognia_ai',
      'https://linkedin.com/company/cognia-ai'
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Natural Language Processing',
      'Voice Recognition',
      'Chatbots',
      'Business Automation'
    ],
    knowsLanguage: ['en', 'tr'],
    slogan: 'Transform Your Business with AI',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    }
  },
  
  webSite: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cognia AI',
    url: 'https://cogniaai.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cogniaai.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  },

  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI Receptionist and Voice Agent Solutions',
    provider: {
      '@type': 'Organization',
      name: 'Cognia AI'
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'United States'
      },
      {
        '@type': 'Country', 
        name: 'Turkey'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Solutions',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Receptionist',
            description: '24/7 AI receptionist that never misses calls and books appointments automatically'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Chatbot Solutions',
            description: 'Multi-channel chatbot integration for WhatsApp, Instagram'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Automation',
            description: 'Custom AI automation solutions for businesses'
          }
        }
      ]
    }
  },

  faqPage: {
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
          text: 'We support over 20 languages including Turkish and English. Your AI assistant can communicate naturally in your customers\' preferred language.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it integrate with existing systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, it integrates seamlessly with your CRM, ERP, and other business systems. We provide API support.'
        }
      }
    ]
  },

  breadcrumbList: (items: Array<{name: string, url: string}>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }),

  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cognia AI Turkey',
    image: 'https://cogniaai.com/logo512.png',
    '@id': 'https://cogniaai.com',
    url: 'https://cogniaai.com',
    telephone: '+90-531-773-9053',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressRegion: 'Turkey'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    },
    priceRange: '$$',
    servesCuisine: 'AI Solutions'
  }
};
