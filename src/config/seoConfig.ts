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
  structuredData?: unknown;
}

const baseUrl = 'https://cogniaai.com'

export const seoConfig: Record<string, PageSEO> = {
  home: {
    title: {
      tr: 'Cognia AI - AI Dönüşüm Ajansı | Veri Kaosundan Stratejik Netliğe',
      en: 'Cognia AI - AI Transformation Agency | From Data Chaos to Strategic Clarity'
    },
    description: {
      tr: 'Veri kaosunu stratejik netliğe dönüştüren AI dönüşüm ajansı. İş akışlarınızı otomatikleştiren, ekiplerinizi güçlendiren ve işinizi hızlandıran AI çözümleri.',
      en: 'AI transformation agency that turns data chaos into strategic clarity. Automate workflows, empower teams, accelerate growth.'
    },
    keywords: {
      tr: ['AI dönüşüm ajansı', 'veri zekası', 'AI çözümleri', 'iş otomasyonu', 'AI danışmanlık', 'iş akışı otomasyonu', 'kurumsal AI', 'dijital dönüşüm', 'Türkiye AI', 'Amerika AI şirketi', 'Cognia AI', 'stratejik netlik'],
      en: ['AI transformation agency', 'data intelligence', 'AI solutions', 'business automation', 'AI consulting', 'workflow automation', 'enterprise AI', 'digital transformation', 'US AI company', 'Turkey AI company', 'Cognia AI', 'strategic clarity']
    },
    canonicalPath: '/',
    ogImage: '/og-image.png'
  },
  solutions: {
    title: {
      tr: 'AI Çözümleri | Sesli Asistanlar, Chatbotlar & Otomasyon - Cognia AI',
      en: 'AI Solutions | Voice Agents, Chatbots & Automation for Every Industry'
    },
    description: {
      tr: 'Her sektör için AI çözümleri: Sağlık, hukuk, otelcilik, perakende ve daha fazlası. %95 ilk aramada çözüm oranı. WhatsApp, Instagram, telefon entegrasyonu. CRM entegrasyonu dahil.',
      en: 'Comprehensive AI solutions for healthcare, legal, hospitality, retail & more. AI voice agents with 95% resolution rate. Multi-channel chatbots. CRM integration included.'
    },
    keywords: {
      tr: ['AI çözümleri', 'sesli asistan çözümleri', 'chatbot çözümleri', 'kurumsal AI', 'sektörel AI', 'AI otomasyon', 'müşteri desteği AI', 'WhatsApp AI', 'Instagram chatbot', 'telefon otomasyonu', 'çok kanallı AI', 'CRM AI entegrasyonu'],
      en: ['AI solutions', 'voice agent solutions', 'chatbot solutions', 'enterprise AI', 'industry AI', 'AI automation', 'customer support AI', 'WhatsApp AI', 'Instagram chatbot', 'phone automation', 'omnichannel AI', 'CRM AI integration']
    },
    canonicalPath: '/what-we-do',
    ogImage: '/og-image.png'
  },
  platform: {
    title: {
      tr: 'Cognia AI Platform | Kurumsal AI Altyapısı & Araçları',
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
    ogImage: '/og-image.png'
  },
  company: {
    title: {
      tr: 'Hakkımızda | Cognia AI - Global AI Resepsiyonist Şirketi',
      en: 'Company - Our Mission, Team & Global Presence | Cognia AI'
    },
    description: {
      tr: 'Cognia AI hakkında. Misyonumuz, ekibimiz ve global varlığımız. 127+ kurumsal müşteri. 4.9/5 müşteri puanı. Türkiye ve Amerika\'da ofisler.',
      en: 'Cognia AI company information. Founded to democratize enterprise AI. Global presence in US & Turkey. 127+ enterprise clients. 4.9/5 customer rating.'
    },
    keywords: {
      tr: ['Cognia AI hakkında', 'AI şirketi', 'AI liderlik ekibi', 'global AI şirketi', 'Türkiye AI ofisi', 'Amerika AI ofisi', 'AI şirketi değerleri', 'kurumsal AI şirketi'],
      en: ['Cognia AI company', 'AI company about', 'AI leadership team', 'global AI company', 'US AI office', 'Turkey AI office', 'AI company values', 'enterprise AI company']
    },
    canonicalPath: '/company',
    ogImage: '/og-image.png'
  },
  contact: {
    title: {
      tr: 'İletişim | Cognia AI - Ücretsiz AI Demo Talebi',
      en: 'Contact Us - Get Your Free AI Receptionist Demo'
    },
    description: {
      tr: 'Ücretsiz AI resepsiyonist demo talebi. Türkiye: +90 531 773 9053 | Amerika: +1 217 693 8413. 24 saat içinde dönüş garantisi. Sektörünüze özel demo. Taahhüt yok.',
      en: 'Schedule a free AI receptionist demo. Connect with Cognia AI experts today. US: +1 217 693 8413 | Turkey: +90 531 773 9053. Response within 24 hours guaranteed.'
    },
    keywords: {
      tr: ['Cognia AI iletişim', 'AI demo', 'ücretsiz danışmanlık', 'AI resepsiyonist demo', 'sesli asistan demo', 'chatbot demo', 'demo talebi', 'AI fiyat teklifi', 'AI uzmanı ile görüşme'],
      en: ['contact Cognia AI', 'AI receptionist demo', 'free AI consultation', 'schedule AI demo', 'AI implementation support', 'voice agent demo', 'chatbot demo', 'get AI quote', 'talk to AI expert']
    },
    canonicalPath: '/contact',
    ogImage: '/og-image.png'
  },
  privacy: {
    title: {
      tr: 'Gizlilik Politikası | Cognia AI - Veri Koruma & Uyumluluk',
      en: 'Privacy Policy - Data Protection & Compliance | Cognia AI'
    },
    description: {
      tr: 'Cognia AI gizlilik politikası. Kurumsal düzeyde güvenlik ve veri koruma. Verileriniz asla satılmaz veya paylaşılmaz.',
      en: 'Cognia AI privacy policy. Enterprise-grade security and data protection. Your data is never sold or shared.'
    },
    keywords: {
      tr: ['gizlilik politikası', 'veri koruma', 'KVKK', 'Cognia AI gizlilik', 'kişisel veriler', 'veri güvenliği'],
      en: ['privacy policy', 'data protection', 'data security', 'AI privacy', 'enterprise security']
    },
    canonicalPath: '/privacy-policy',
    ogImage: '/og-image.png'
  }
};

export const structuredDataTemplates = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Cognia AI',
    alternateName: ['Cognia Artificial Intelligence', 'Cognia', 'CogniaAI'],
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo512.png`,
      width: 512,
      height: 512,
      caption: 'Cognia AI Logo'
    },
    image: `${baseUrl}/og-image.png`,
    description: 'AI transformation agency that turns data chaos into strategic clarity. We design and deploy AI solutions that automate workflows, empower teams, and accelerate business growth.',
    foundingDate: '2023',
    founders: [
      {
        '@type': 'Person',
        name: 'Emre Benian',
        jobTitle: 'Founder & CEO'
      }
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50
    },
    address: [
      {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        addressLocality: 'United States',
        addressRegion: 'Illinois'
      },
      {
        '@type': 'PostalAddress',
        addressCountry: 'TR',
        addressLocality: 'Istanbul',
        addressRegion: 'Turkey'
      }
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-217-693-8413',
        contactType: 'sales',
        areaServed: ['US', 'CA', 'GB', 'AU'],
        availableLanguage: ['English', 'Turkish'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        }
      },
      {
        '@type': 'ContactPoint',
        telephone: '+90-531-773-9053',
        contactType: 'sales',
        areaServed: ['TR', 'DE', 'FR', 'NL'],
        availableLanguage: ['Turkish', 'English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        }
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-217-693-8413',
        contactType: 'customer support',
        availableLanguage: ['English', 'Turkish']
      }
    ],
    sameAs: [
      'https://instagram.com/cognia_ai',
      'https://linkedin.com/company/cognia-ai',
      'https://twitter.com/cognia_ai'
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Natural Language Processing',
      'Voice Recognition',
      'Conversational AI',
      'Chatbots',
      'Virtual Assistants',
      'Business Automation',
      'Customer Service Automation',
      'Healthcare AI',
      'Enterprise AI Solutions'
    ],
    knowsLanguage: ['en', 'tr', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'ar', 'zh', 'ja', 'ko'],
    slogan: 'From Data Chaos to Strategic Clarity',
    brand: {
      '@type': 'Brand',
      name: 'Cognia AI',
      logo: `${baseUrl}/logo512.png`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    /* HIDDEN: Compliance awards - uncomment to re-enable
    award: [
      'HIPAA Compliant',
      'SOC 2 Type II Certified',
      'GDPR Compliant'
    ]
    */
    award: []
  },

  webSite: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Cognia AI',
    alternateName: 'Cognia Artificial Intelligence',
    url: baseUrl,
    description: 'AI transformation agency. From data chaos to strategic clarity.',
    publisher: {
      '@id': `${baseUrl}/#organization`
    },
    inLanguage: ['en-US', 'tr-TR'],
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      {
        '@type': 'ReadAction',
        target: baseUrl
      }
    ]
  },

  softwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${baseUrl}/products/ai-receptionist#software`,
    name: 'Cognia AI Receptionist',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Cloud-based',
    description: 'AI receptionist that never misses calls. Answers in 0.5 seconds. Books appointments automatically. Handles 100+ concurrent calls. 95% first-call resolution.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free demo available. Custom pricing based on call volume.',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    featureList: [
      '24/7 Availability',
      '0.5 Second Response Time',
      '100+ Concurrent Calls',
      '95% First-Call Resolution',
      '45+ Languages',
      'CRM Integration',
      'Enterprise Security',
      'Data Encryption'
    ],
    screenshot: `${baseUrl}/og-image.png`,
    softwareVersion: '2.0',
    releaseNotes: 'Enhanced natural conversation capabilities with improved context understanding.'
  },

  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/#service`,
    serviceType: 'AI Transformation and Data Intelligence Solutions',
    name: 'Cognia AI Services',
    description: 'AI transformation agency offering workflow automation, data intelligence, and enterprise AI solutions that turn data chaos into strategic clarity.',
    provider: {
      '@id': `${baseUrl}/#organization`
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Turkey' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Australia' }
    ],
    serviceOutput: 'Automated customer communication and appointment scheduling',
    termsOfService: `${baseUrl}/privacy-policy`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Solutions Catalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Receptionist',
            description: '24/7 AI receptionist that never misses calls, books appointments automatically, and handles 100+ concurrent calls with 95% first-call resolution.',
            provider: { '@id': `${baseUrl}/#organization` }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Voice Agent Solutions',
            description: 'Enterprise voice AI with natural conversation capabilities, context awareness, and intelligent responses in 45+ languages.',
            provider: { '@id': `${baseUrl}/#organization` }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Omnichannel Chatbots',
            description: 'Multi-channel chatbot integration for WhatsApp, Instagram, Facebook Messenger, and website with unified customer experience.',
            provider: { '@id': `${baseUrl}/#organization` }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Automation',
            description: 'Custom AI automation solutions including CRM integration, lead qualification, appointment scheduling, and customer support automation.',
            provider: { '@id': `${baseUrl}/#organization` }
          }
        }
      ]
    }
  },

  faqPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${baseUrl}/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does Cognia AI setup take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We set up your AI receptionist system within 1 week. After analyzing your business needs, we configure your AI assistant with your specific scripts, integrations, and preferences. Training and optimization continue during the first month.'
        }
      },
      {
        '@type': 'Question',
        name: 'What languages does Cognia AI support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cognia AI supports over 45 languages including English, Spanish, French, German, Turkish, Arabic, Chinese, Japanese, Korean, Portuguese, Italian, Dutch, and many more. Your AI assistant can automatically detect the caller\'s language and respond naturally.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does Cognia AI integrate with my existing CRM?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Cognia AI integrates seamlessly with 100+ popular CRM platforms including Salesforce, HubSpot, Zoho, Pipedrive, and custom systems. We provide two-way sync, automatic contact updates, call logging, and deal tracking through our API.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Cognia AI secure for healthcare?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Cognia AI provides enterprise-grade security for healthcare organizations. We offer encrypted data transmission, secure data storage, and comprehensive audit logging to protect sensitive patient information.'
        }
      },
      {
        '@type': 'Question',
        name: 'How many calls can Cognia AI handle simultaneously?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cognia AI can handle 100+ concurrent calls without any degradation in quality or response time. Our cloud-based infrastructure automatically scales to meet demand, ensuring you never miss a call even during peak periods.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the first-call resolution rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cognia AI achieves 95% first-call resolution rate across all industries. Our AI understands context, handles complex inquiries, and can escalate to human agents when necessary with full context transfer.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can Cognia AI book appointments automatically?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Cognia AI can book, reschedule, and cancel appointments automatically. It integrates with Google Calendar, Microsoft Outlook, Calendly, and other scheduling systems. It checks availability in real-time and sends confirmation and reminder messages.'
        }
      },
      {
        '@type': 'Question',
        name: 'What happens after business hours?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cognia AI works 24/7/365 with no breaks or holidays. After-hours calls are handled exactly like business hours - booking appointments, taking messages, handling emergencies, and capturing leads. You never miss an opportunity.'
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

  localBusinessTurkey: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#localbusiness-tr`,
    name: 'Cognia AI Turkey',
    image: `${baseUrl}/logo512.png`,
    url: baseUrl,
    telephone: '+90-531-773-9053',
    email: 'info@cogniaai.com',
    description: 'AI receptionist and voice agent solutions for businesses in Turkey and Europe.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressRegion: 'Istanbul',
      addressLocality: 'Istanbul'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.0082,
      longitude: 28.9784
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    priceRange: '$$',
    areaServed: ['Turkey', 'Europe', 'Middle East'],
    paymentAccepted: 'Credit Card, Bank Transfer, Invoice',
    currenciesAccepted: 'TRY, USD, EUR'
  },

  localBusinessUS: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#localbusiness-us`,
    name: 'Cognia AI United States',
    image: `${baseUrl}/logo512.png`,
    url: baseUrl,
    telephone: '+1-217-693-8413',
    email: 'info@cogniaai.com',
    description: 'AI receptionist and voice agent solutions for businesses in the United States and North America.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'Illinois',
      addressLocality: 'United States'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    priceRange: '$$',
    areaServed: ['United States', 'Canada', 'North America'],
    paymentAccepted: 'Credit Card, Bank Transfer, Invoice',
    currenciesAccepted: 'USD'
  },

  product: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}/products/ai-receptionist#product`,
    name: 'Cognia AI Receptionist',
    description: 'AI-powered virtual receptionist that handles calls 24/7, books appointments automatically, and never misses a customer inquiry. Features 95% first-call resolution and 45+ language support.',
    image: `${baseUrl}/og-image.png`,
    brand: {
      '@type': 'Brand',
      name: 'Cognia AI'
    },
    manufacturer: {
      '@id': `${baseUrl}/#organization`
    },
    category: 'Business Software > Customer Service > Virtual Receptionist',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '0',
      highPrice: '999',
      offerCount: '3',
      offers: [
        {
          '@type': 'Offer',
          name: 'Free Demo',
          price: '0',
          priceCurrency: 'USD',
          description: 'Try Cognia AI Receptionist free for 14 days',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Business Plan',
          description: 'For growing businesses with moderate call volume',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Enterprise Plan',
          description: 'Custom solutions for large organizations with high-volume needs',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Organization',
          name: 'Healthcare Clinic'
        },
        reviewBody: 'Cognia AI reduced our no-shows by 40% and handles all after-hours calls. Setup was seamless.'
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Organization',
          name: 'Law Firm'
        },
        reviewBody: 'Client intake is now 60% faster. We never miss a potential case. The AI handles consultations scheduling perfectly.'
      }
    ]
  },

  howTo: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Get Started with Cognia AI Receptionist',
    description: 'Step-by-step guide to implementing AI receptionist for your business',
    image: `${baseUrl}/og-image.png`,
    totalTime: 'P7D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Schedule a Demo',
        text: 'Book a free personalized demo at cogniaai.com/demo. See AI receptionist in action for your specific industry.',
        url: `${baseUrl}/demo`,
        position: 1
      },
      {
        '@type': 'HowToStep',
        name: 'Consultation',
        text: 'Meet with our AI experts to discuss your specific needs, call scripts, and integration requirements.',
        position: 2
      },
      {
        '@type': 'HowToStep',
        name: 'Configuration',
        text: 'We configure your AI receptionist with custom scripts, voice, integrations, and business logic.',
        position: 3
      },
      {
        '@type': 'HowToStep',
        name: 'Integration',
        text: 'Connect with your existing phone system, CRM, calendar, and other business tools.',
        position: 4
      },
      {
        '@type': 'HowToStep',
        name: 'Go Live',
        text: 'Launch your AI receptionist and start capturing every call 24/7. Training and optimization continue.',
        position: 5
      }
    ]
  },

  videoObject: (videoData: { name: string; description: string; thumbnailUrl: string; uploadDate: string; duration: string; contentUrl?: string; embedUrl?: string }) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: videoData.name,
    description: videoData.description,
    thumbnailUrl: videoData.thumbnailUrl,
    uploadDate: videoData.uploadDate,
    duration: videoData.duration,
    contentUrl: videoData.contentUrl,
    embedUrl: videoData.embedUrl,
    publisher: {
      '@id': `${baseUrl}/#organization`
    }
  }),

  industryService: (industry: { name: string; description: string; features: string[] }) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cognia AI for ${industry.name}`,
    description: industry.description,
    provider: {
      '@id': `${baseUrl}/#organization`
    },
    serviceType: `AI Receptionist for ${industry.name}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${industry.name} AI Solutions`,
      itemListElement: industry.features.map(feature => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature
        }
      }))
    }
  }),

  contactPage: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${baseUrl}/contact#contactpage`,
    name: 'Contact Cognia AI',
    description: 'Get in touch with Cognia AI for a free demo or consultation.',
    url: `${baseUrl}/contact`,
    mainEntity: {
      '@id': `${baseUrl}/#organization`
    }
  },

  aboutPage: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${baseUrl}/about#aboutpage`,
    name: 'About Cognia AI',
    description: 'Learn about Cognia AI, our mission, team, and global presence.',
    url: `${baseUrl}/about`,
    mainEntity: {
      '@id': `${baseUrl}/#organization`
    }
  },

  customerReviews: [
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Product',
        name: 'Cognia AI Receptionist',
        '@id': `${baseUrl}/products/ai-receptionist#product`
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1'
      },
      name: 'Game-Changer for Our Office',
      reviewBody: 'Working with Cognia has been a game-changer for our office. Before Cognia, I would spend 45 minutes just waiting for the voicemail system. Now we receive a clear email summary along with call transcripts first thing in the morning. If a patient requests an appointment over the weekend, Cognia schedules it for us — no backlog, no delays.',
      author: {
        '@type': 'Person',
        name: 'Jacob Ojalvo',
        jobTitle: 'Office Manager'
      },
      publisher: {
        '@type': 'Organization',
        name: 'My Smile Miami'
      },
      datePublished: '2024-10-15'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Product',
        name: 'Cognia AI Receptionist',
        '@id': `${baseUrl}/products/ai-receptionist#product`
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1'
      },
      name: 'Stop Missing Calls, Stop Missing Work',
      reviewBody: 'Before this, we were missing way more calls than we ever thought. After we switched to Cognia AI, calls actually get answered now, even when we are tied up or out on the road, and customers get a response right away instead of voicemail. We have noticed a pretty clear bump in jobs coming in. You stop missing calls, you stop missing work.',
      author: {
        '@type': 'Organization',
        name: 'Elite Auto Repair'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Elite Auto Repair'
      },
      datePublished: '2024-11-01'
    }
  ]
};

export function generatePageStructuredData(pageType: string, pageData?: Record<string, unknown>): unknown[] {
  const schemas: unknown[] = [
    structuredDataTemplates.organization,
    structuredDataTemplates.webSite
  ];

  switch (pageType) {
    case 'home':
      schemas.push(structuredDataTemplates.service);
      schemas.push(structuredDataTemplates.faqPage);
      schemas.push(structuredDataTemplates.howTo);
      break;
    case 'solutions':
      schemas.push(structuredDataTemplates.service);
      break;
    case 'about':
      schemas.push(structuredDataTemplates.aboutPage);
      break;
    case 'contact':
      schemas.push(structuredDataTemplates.contactPage);
      schemas.push(structuredDataTemplates.localBusinessTurkey);
      schemas.push(structuredDataTemplates.localBusinessUS);
      break;
    case 'ai-receptionist':
      schemas.push(structuredDataTemplates.product);
      schemas.push(structuredDataTemplates.softwareApplication);
      break;
    case 'industry':
      if (pageData) {
        schemas.push(structuredDataTemplates.industryService(pageData as { name: string; description: string; features: string[] }));
      }
      break;
    default:
      break;
  }

  return schemas;
}

export function generateBreadcrumbs(pathSegments: string[]): unknown {
  const items = [{ name: 'Home', url: baseUrl }];

  let currentPath = '';
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    items.push({ name, url: `${baseUrl}${currentPath}` });
  });

  return structuredDataTemplates.breadcrumbList(items);
}

export default seoConfig;
