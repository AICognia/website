import { Metadata } from 'next'

const baseUrl = 'https://cogniaai.com'

function getOgImageUrl(title: string, description: string): string {
  return `${baseUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`
}

export const homePageMetadata: Metadata = {
  title: 'AI Transformation Agency | From Data Chaos to Strategic Clarity',
  description: 'AI transformation agency that turns data chaos into strategic clarity. Automate workflows, empower teams, accelerate growth.',
  keywords: [
    'AI transformation agency', 'data intelligence', 'AI solutions', 'business automation',
    'AI consulting', 'workflow automation', 'enterprise AI', 'data analytics AI',
    'strategic clarity', 'digital transformation', 'AI deployment'
  ],
  openGraph: {
    title: 'Cognia AI - AI Transformation Agency | Data to Strategic Clarity',
    description: 'AI transformation agency. Automate workflows, empower teams, accelerate business growth.',
    url: baseUrl,
    type: 'website',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: 'Cognia AI - AI Transformation Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cognia AI - From Data Chaos to Strategic Clarity',
    description: 'AI transformation agency. Automate workflows, empower teams, accelerate growth.',
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: baseUrl,
    languages: { 'en-US': baseUrl, 'tr-TR': `${baseUrl}?lang=tr` },
  },
}

export const aboutPageMetadata: Metadata = {
  title: 'About Us - Leading AI Receptionist & Voice Agent Company',
  description: 'Cognia AI bridges business operations and AI technology. Founded to make enterprise-grade AI accessible to all businesses. Operating in US & Turkey with 127+ satisfied clients.',
  keywords: [
    'about Cognia AI', 'AI company history', 'AI receptionist company', 'voice agent provider',
    'enterprise AI partner', 'US AI company', 'Turkey AI company', 'AI transformation partner',
    'business AI solutions', 'AI consultancy firm', 'trusted AI provider', 'AI innovation leader'
  ],
  openGraph: {
    title: 'About Cognia AI | Leading AI Receptionist & Voice Agent Company',
    description: 'Enterprise-grade AI made accessible. 127+ satisfied clients. Operating in US & Turkey.',
    url: `${baseUrl}/about`,
    type: 'website',
    images: [{ url: getOgImageUrl('About Cognia AI', 'Your AI Transformation Partner'), width: 1200, height: 630, alt: 'About Cognia AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Cognia AI | Your AI Transformation Partner',
    description: 'Making enterprise-grade AI accessible. 127+ satisfied clients worldwide.',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
    languages: { 'en-US': `${baseUrl}/about`, 'tr-TR': `${baseUrl}/about?lang=tr` },
  },
}

export const contactPageMetadata: Metadata = {
  title: 'Contact Us - Get Your Free AI Receptionist Demo',
  description: 'Schedule a free AI receptionist demo. Connect with Cognia AI experts today. US: +1 217 693 8413 | Turkey: +90 531 773 9053. Response within 24 hours guaranteed. No commitment required.',
  keywords: [
    'contact Cognia AI', 'AI receptionist demo', 'free AI consultation', 'schedule AI demo',
    'AI implementation support', 'enterprise AI demo', 'voice agent demo', 'chatbot demo',
    'AI consultation booking', 'get AI quote', 'AI pricing inquiry', 'talk to AI expert'
  ],
  openGraph: {
    title: 'Contact Cognia AI | Get Your Free AI Receptionist Demo',
    description: 'Schedule a free demo. US: +1 217 693 8413 | Turkey: +90 531 773 9053. Response within 24 hours.',
    url: `${baseUrl}/contact`,
    type: 'website',
    images: [{ url: getOgImageUrl('Contact Us', 'Get Your Free AI Demo'), width: 1200, height: 630, alt: 'Contact Cognia AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Cognia AI | Free AI Demo',
    description: 'Schedule your free AI receptionist demo. Response within 24 hours guaranteed.',
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
    languages: { 'en-US': `${baseUrl}/contact`, 'tr-TR': `${baseUrl}/contact?lang=tr` },
  },
}

export const solutionsPageMetadata: Metadata = {
  title: 'AI Solutions - Voice Agents, Chatbots & Automation for Every Industry',
  description: 'Comprehensive AI solutions for healthcare, legal, hospitality, retail & more. AI voice agents with 95% resolution rate. Multi-channel chatbots for WhatsApp, Instagram & phone. CRM integration included.',
  keywords: [
    'AI solutions', 'voice agent solutions', 'chatbot solutions', 'enterprise AI', 'industry AI',
    'AI automation', 'customer support AI', 'WhatsApp AI', 'Instagram chatbot', 'phone automation',
    'omnichannel AI', 'CRM AI integration', 'AI for business', 'automated customer service'
  ],
  openGraph: {
    title: 'AI Solutions for Every Industry | Cognia AI',
    description: 'Voice agents with 95% resolution. Multi-channel chatbots. CRM integration. Solutions for healthcare, legal, retail & more.',
    url: `${baseUrl}/solutions`,
    type: 'website',
    images: [{ url: getOgImageUrl('AI Solutions', 'For Every Industry'), width: 1200, height: 630, alt: 'Cognia AI Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solutions for Every Industry | Cognia AI',
    description: 'Voice agents, chatbots & automation. 95% first-call resolution.',
  },
  alternates: {
    canonical: `${baseUrl}/solutions`,
    languages: { 'en-US': `${baseUrl}/solutions`, 'tr-TR': `${baseUrl}/solutions?lang=tr` },
  },
}

export const demoPageMetadata: Metadata = {
  title: 'Schedule a Demo - See AI Receptionist in Action',
  description: 'Experience Cognia AI receptionist live. See how AI handles calls, books appointments & qualifies leads. Personalized demo for your industry. No commitment. Setup in 1 week after approval.',
  keywords: [
    'AI demo', 'AI receptionist demo', 'voice agent demo', 'chatbot demo', 'enterprise AI demo',
    'see AI in action', 'live AI demonstration', 'AI trial', 'AI proof of concept', 'try AI receptionist',
    'free AI demo', 'AI pricing demo', 'book AI demo', 'schedule AI demonstration'
  ],
  openGraph: {
    title: 'Schedule a Demo | See Cognia AI Receptionist in Action',
    description: 'Experience AI receptionist live. Personalized demo for your industry. No commitment required.',
    url: `${baseUrl}/demo`,
    type: 'website',
    images: [{ url: getOgImageUrl('Schedule a Demo', 'See AI in Action'), width: 1200, height: 630, alt: 'Cognia AI Demo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schedule a Demo | Cognia AI',
    description: 'Experience AI receptionist live. No commitment. Personalized for your industry.',
  },
  alternates: {
    canonical: `${baseUrl}/demo`,
    languages: { 'en-US': `${baseUrl}/demo`, 'tr-TR': `${baseUrl}/demo?lang=tr` },
  },
}

export const privacyPolicyMetadata: Metadata = {
  title: 'Privacy Policy - Data Protection & Compliance',
  description: 'Cognia AI privacy policy. Learn how we protect your data. Enterprise-grade security. Your data is never sold or shared.',
  keywords: [
    'privacy policy', 'data protection', 'data security', 'AI privacy', 'Cognia AI privacy', 'enterprise data protection'
  ],
  openGraph: {
    title: 'Privacy Policy | Cognia AI',
    description: 'Enterprise-grade data protection. Your data is never sold or shared.',
    url: `${baseUrl}/privacy-policy`,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${baseUrl}/privacy-policy`,
    languages: { 'en-US': `${baseUrl}/privacy-policy`, 'tr-TR': `${baseUrl}/privacy-policy?lang=tr` },
  },
}

export const whatWeDoPageMetadata: Metadata = {
  title: 'What We Do - AI Voice Agents, Chatbots & Business Automation',
  description: 'Cognia AI transforms customer experience with AI voice agents, intelligent chatbots & enterprise automation. 24/7 availability. 45+ languages. CRM integration. Reduce costs by 60% while improving satisfaction.',
  keywords: [
    'AI services', 'AI solutions', 'voice agents', 'AI chatbots', 'business automation',
    'AI implementation', 'enterprise AI', 'customer experience AI', 'AI cost reduction',
    'multilingual AI', 'CRM AI', 'automated customer service', 'AI transformation'
  ],
  openGraph: {
    title: 'What We Do | AI Voice Agents & Business Automation',
    description: 'AI voice agents, chatbots & automation. 45+ languages. 60% cost reduction. 24/7 availability.',
    url: `${baseUrl}/what-we-do`,
    type: 'website',
    images: [{ url: getOgImageUrl('What We Do', 'AI Solutions & Services'), width: 1200, height: 630, alt: 'Cognia AI Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What We Do | Cognia AI',
    description: 'AI voice agents, chatbots & enterprise automation. 45+ languages. 24/7 availability.',
  },
  alternates: {
    canonical: `${baseUrl}/what-we-do`,
    languages: { 'en-US': `${baseUrl}/what-we-do`, 'tr-TR': `${baseUrl}/what-we-do?lang=tr` },
  },
}

export const industriesPageMetadata: Metadata = {
  title: 'Industries We Serve - AI Solutions for Every Sector',
  description: 'Discover AI solutions tailored for your industry. Healthcare, legal, hospitality, retail, automotive, financial services, and more. Transform your operations with industry-specific AI.',
  keywords: [
    'AI industry solutions', 'healthcare AI', 'legal AI', 'hospitality AI', 'retail AI',
    'automotive AI', 'financial services AI', 'enterprise AI', 'industry-specific AI',
    'business automation by industry'
  ],
  openGraph: {
    title: 'Industries We Serve | AI Solutions for Every Sector',
    description: 'Industry-specific AI solutions for healthcare, legal, hospitality, retail, and more.',
    url: `${baseUrl}/industries`,
    type: 'website',
    images: [{ url: getOgImageUrl('Industries', 'AI Solutions for Every Sector'), width: 1200, height: 630, alt: 'Cognia AI Industries' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries We Serve | Cognia AI',
    description: 'AI solutions tailored for healthcare, legal, hospitality, retail & more.',
  },
  alternates: {
    canonical: `${baseUrl}/industries`,
    languages: { 'en-US': `${baseUrl}/industries`, 'tr-TR': `${baseUrl}/industries?lang=tr` },
  },
}

export const businessIntelligencePageMetadata: Metadata = {
  title: 'Business Intelligence - AI Analytics & Predictive Insights',
  description: 'Transform business data into actionable insights with Cognia AI. Predictive analytics, real-time reporting, anomaly detection, executive briefings, and natural language querying. Make data-driven decisions faster.',
  keywords: [
    'business intelligence', 'AI analytics', 'predictive analytics', 'data intelligence',
    'data insights', 'enterprise analytics', 'customer analytics', 'anomaly detection',
    'executive briefings', 'real-time reporting', 'AI data analysis', 'predictive modeling'
  ],
  openGraph: {
    title: 'Business Intelligence | AI Analytics & Predictive Insights',
    description: 'Predictive analytics, anomaly detection & real-time reporting. Make data-driven decisions.',
    url: `${baseUrl}/business-intelligence`,
    type: 'website',
    images: [{ url: getOgImageUrl('Business Intelligence', 'AI-Powered Analytics'), width: 1200, height: 630, alt: 'Cognia AI Business Intelligence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Intelligence | Cognia AI',
    description: 'AI analytics & predictive insights. Transform data into decisions.',
  },
  alternates: {
    canonical: `${baseUrl}/business-intelligence`,
    languages: { 'en-US': `${baseUrl}/business-intelligence`, 'tr-TR': `${baseUrl}/business-intelligence?lang=tr` },
  },
}

export const companyPageMetadata: Metadata = {
  title: 'Company - Our Mission, Team & Global Presence',
  description: 'Cognia AI company information. Founded to democratize enterprise AI. Global presence in US & Turkey. Meet our leadership team. 127+ enterprise clients. 4.9/5 customer rating.',
  keywords: [
    'Cognia AI company', 'AI company about', 'AI leadership team', 'AI company mission',
    'global AI company', 'US AI office', 'Turkey AI office', 'AI company values',
    'enterprise AI company', 'AI industry leader', 'AI innovation company'
  ],
  openGraph: {
    title: 'Company | Cognia AI - Mission, Team & Global Presence',
    description: 'Global AI company with offices in US & Turkey. 127+ enterprise clients. 4.9/5 rating.',
    url: `${baseUrl}/company`,
    type: 'website',
    images: [{ url: getOgImageUrl('Our Company', 'Global AI Excellence'), width: 1200, height: 630, alt: 'Cognia AI Company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company | Cognia AI',
    description: 'Global AI company. 127+ enterprise clients. 4.9/5 rating.',
  },
  alternates: {
    canonical: `${baseUrl}/company`,
    languages: { 'en-US': `${baseUrl}/company`, 'tr-TR': `${baseUrl}/company?lang=tr` },
  },
}

export const aiReceptionistPageMetadata: Metadata = {
  title: 'AI Receptionist - 24/7 Automated Call Handling & Booking',
  description: 'AI receptionist that never misses calls. Answers in 0.5 seconds. Books appointments automatically. Handles 100+ concurrent calls. 95% first-call resolution. Guaranteed 10-20% more customers.',
  keywords: [
    'AI receptionist', 'virtual receptionist', 'automated receptionist', 'AI phone answering',
    '24/7 receptionist', 'appointment booking AI', 'call handling AI', 'AI front desk',
    'never miss calls', 'automated scheduling', 'medical receptionist AI'
  ],
  openGraph: {
    title: 'AI Receptionist | Never Miss a Call, Book 24/7',
    description: 'Answers in 0.5s. 100+ concurrent calls. 95% resolution. 10-20% more customers guaranteed.',
    url: `${baseUrl}/products/ai-receptionist`,
    type: 'website',
    images: [{ url: getOgImageUrl('AI Receptionist', 'Never Miss a Call'), width: 1200, height: 630, alt: 'Cognia AI Receptionist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Receptionist | Cognia AI',
    description: '24/7 AI receptionist. Answers in 0.5s. 10-20% more customers. Enterprise security.',
  },
  alternates: {
    canonical: `${baseUrl}/products/ai-receptionist`,
    languages: { 'en-US': `${baseUrl}/products/ai-receptionist`, 'tr-TR': `${baseUrl}/products/ai-receptionist?lang=tr` },
  },
}

interface IndustryMetadataConfig {
  industry: string
  title: string
  description: string
  keywords: string[]
  benefits: string[]
}

const industryConfigs: Record<string, IndustryMetadataConfig> = {
  healthcare: {
    industry: 'healthcare',
    title: 'Healthcare',
    description: 'Secure AI receptionist for healthcare. Patient scheduling, appointment reminders, insurance verification & 24/7 medical reception. Reduce no-shows by 40%. Handle 100+ concurrent patient calls.',
    keywords: [
      'healthcare AI', 'medical AI receptionist', 'patient scheduling AI',
      'medical appointment booking', 'healthcare automation', 'clinic AI', 'hospital AI',
      'patient communication AI', 'medical practice AI', 'telehealth AI', 'healthcare chatbot'
    ],
    benefits: ['Enterprise security', '40% fewer no-shows', '24/7 patient support']
  },
  hospitality: {
    industry: 'hospitality',
    title: 'Hospitality',
    description: 'AI concierge for hotels, restaurants & resorts. 24/7 booking management, guest services & multilingual support in 45+ languages. Increase direct bookings by 35%. Reduce front desk workload.',
    keywords: [
      'hospitality AI', 'hotel AI', 'restaurant AI', 'AI concierge', 'hotel booking AI',
      'guest services AI', 'resort AI', 'hospitality automation', 'hotel chatbot',
      'restaurant reservation AI', 'multilingual hospitality AI', 'hotel front desk AI'
    ],
    benefits: ['45+ languages', '35% more direct bookings', '24/7 concierge']
  },
  automotive: {
    industry: 'automotive',
    title: 'Automotive',
    description: 'AI solutions for car dealerships & auto services. Service scheduling, lead qualification & customer follow-ups. Capture 30% more leads. Automate service reminders & reduce missed appointments.',
    keywords: [
      'automotive AI', 'car dealership AI', 'auto service AI', 'dealership automation',
      'automotive lead generation', 'service scheduling AI', 'car sales AI', 'auto shop AI',
      'vehicle service reminders', 'automotive chatbot', 'dealership receptionist AI'
    ],
    benefits: ['30% more leads', 'Automated follow-ups', 'Service reminders']
  },
  legal: {
    industry: 'legal',
    title: 'Legal Services',
    description: 'AI for law firms. Confidential client intake, appointment scheduling & 24/7 answering service. Attorney-client privilege protected. Capture every potential client. Reduce intake time by 60%.',
    keywords: [
      'legal AI', 'law firm AI', 'attorney AI', 'legal intake AI', 'law office automation',
      'client intake automation', 'legal receptionist AI', 'law firm chatbot',
      'legal appointment scheduling', '24/7 legal answering', 'lawyer AI assistant'
    ],
    benefits: ['60% faster intake', 'Confidential handling', '24/7 availability']
  },
  retail: {
    industry: 'retail',
    title: 'Retail',
    description: 'AI for retail customer service. Order inquiries, product information & sales support. Omnichannel support across phone, WhatsApp & Instagram. Increase sales by 25% with AI-powered recommendations.',
    keywords: [
      'retail AI', 'e-commerce AI', 'customer service AI', 'retail automation',
      'order tracking AI', 'product inquiry AI', 'sales AI', 'retail chatbot',
      'shopping assistant AI', 'WhatsApp commerce', 'Instagram shopping AI'
    ],
    benefits: ['25% more sales', 'Omnichannel support', 'AI recommendations']
  },
  enterprise: {
    industry: 'enterprise',
    title: 'Enterprise',
    description: 'Enterprise-grade AI solutions with custom integrations. Dedicated support & SLA guarantees. Scale to millions of interactions. API-first architecture for seamless integration.',
    keywords: [
      'enterprise AI', 'corporate AI solutions', 'enterprise automation', 'large business AI',
      'enterprise integration', 'scalable AI', 'corporate chatbot',
      'enterprise voice AI', 'business process AI', 'enterprise CRM AI'
    ],
    benefits: ['Enterprise security', 'Custom integrations', 'SLA guarantees']
  },
  technology: {
    industry: 'technology',
    title: 'Technology',
    description: 'AI for tech companies. Technical support automation, customer onboarding & sales qualification. API integrations with your stack. Reduce support tickets by 50% with intelligent self-service.',
    keywords: [
      'tech company AI', 'SaaS AI', 'technical support AI', 'software company automation',
      'tech sales AI', 'customer onboarding AI', 'IT support AI', 'developer support AI',
      'tech startup AI', 'software support automation', 'API AI integration'
    ],
    benefits: ['50% fewer tickets', 'API integrations', 'Self-service AI']
  },
  'financial-services': {
    industry: 'financial-services',
    title: 'Financial Services',
    description: 'Secure AI for banks, insurance & fintech. Customer verification, appointment booking & account inquiries. Fraud-resistant authentication. 24/7 financial support.',
    keywords: [
      'financial AI', 'banking AI', 'insurance AI', 'fintech AI', 'financial services automation',
      'bank customer service AI', 'insurance claims AI', 'financial chatbot',
      'secure banking AI', 'wealth management AI'
    ],
    benefits: ['Enterprise security', 'Secure verification', '24/7 support']
  },
  energy: {
    industry: 'energy',
    title: 'Energy & Utilities',
    description: 'AI for energy companies & utilities. Billing inquiries, outage reporting & service requests. Handle high-volume call spikes during outages. Reduce call center costs by 40%.',
    keywords: [
      'energy AI', 'utility AI', 'power company AI', 'utility customer service AI',
      'outage reporting AI', 'billing inquiry AI', 'utility automation', 'energy chatbot',
      'utility call center AI', 'smart grid AI', 'renewable energy AI'
    ],
    benefits: ['40% cost reduction', 'Outage handling', 'Billing automation']
  },
  'public-sector': {
    industry: 'public-sector',
    title: 'Public Sector',
    description: 'AI for government agencies & public services. Citizen services, appointment scheduling & information hotlines. Handle high volumes during peak periods. Improve citizen satisfaction.',
    keywords: [
      'government AI', 'public sector AI', 'citizen services AI', 'government automation',
      'municipal AI', 'city services AI', 'government chatbot', 'public service automation',
      'government call center AI', 'civic AI'
    ],
    benefits: ['Accessible design', 'High-volume handling', 'Citizen satisfaction']
  },
  HomeServices: {
    industry: 'HomeServices',
    title: 'Home Services',
    description: 'AI for contractors, plumbers, electricians & HVAC. Service scheduling, customer follow-ups & lead management. Never miss a service call. Increase bookings by 35% with 24/7 availability.',
    keywords: [
      'home services AI', 'contractor AI', 'plumber AI', 'electrician AI', 'HVAC AI',
      'service scheduling AI', 'home service automation', 'field service AI',
      'contractor scheduling', 'home repair AI', 'service business AI'
    ],
    benefits: ['35% more bookings', '24/7 scheduling', 'Lead capture']
  },
}

export function generateIndustryMetadata(industryKey: string): Metadata {
  const config = industryConfigs[industryKey]
  if (!config) {
    return {
      title: `AI Solutions for ${industryKey} | Cognia AI`,
      description: `Transform your ${industryKey} business with AI voice agents, chatbots, and automation.`,
    }
  }

  const slug = config.industry.toLowerCase().replace(/\s+/g, '-')

  return {
    title: `AI Solutions for ${config.title} - ${config.benefits[0]}`,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: `AI for ${config.title} | ${config.benefits.join(' • ')}`,
      description: config.description,
      url: `${baseUrl}/industries/${slug}`,
      type: 'website',
      images: [{ url: getOgImageUrl(`AI for ${config.title}`, config.benefits.join(' • ')), width: 1200, height: 630, alt: `Cognia AI for ${config.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `AI for ${config.title} | Cognia AI`,
      description: `${config.benefits.join('. ')}. Transform your ${config.title.toLowerCase()} business.`,
    },
    alternates: {
      canonical: `${baseUrl}/industries/${slug}`,
      languages: { 'en-US': `${baseUrl}/industries/${slug}`, 'tr-TR': `${baseUrl}/industries/${slug}?lang=tr` },
    },
  }
}

export const industryMetadata: Record<string, Metadata> = Object.keys(industryConfigs).reduce((acc, key) => {
  acc[key] = generateIndustryMetadata(key)
  return acc
}, {} as Record<string, Metadata>)

interface FeatureMetadataConfig {
  feature: string
  title: string
  tagline: string
  description: string
  keywords: string[]
}

const featureConfigs: Record<string, FeatureMetadataConfig> = {
  NaturalConversations: {
    feature: 'NaturalConversations',
    title: 'Natural Conversations',
    tagline: 'Human-Like AI Interactions',
    description: 'AI that sounds human. Natural language understanding, context awareness & intelligent responses. Handles interruptions, understands intent & responds naturally. No robotic scripts.',
    keywords: [
      'natural AI conversations', 'human-like AI', 'conversational AI', 'NLU AI',
      'context-aware AI', 'intelligent AI responses', 'natural language AI',
      'AI voice naturalness', 'conversational intelligence', 'AI understanding'
    ]
  },
  SmartScheduling: {
    feature: 'SmartScheduling',
    title: 'Smart Scheduling',
    tagline: 'Intelligent Appointment Booking',
    description: 'AI scheduling that syncs with your calendar. Automatic rescheduling, conflict detection & smart time slot suggestions. Reduce no-shows with automated reminders. Works with Google, Outlook & more.',
    keywords: [
      'AI scheduling', 'smart appointment booking', 'calendar AI', 'automated scheduling',
      'appointment AI', 'scheduling automation', 'calendar integration AI',
      'no-show reduction', 'automatic rescheduling', 'booking AI'
    ]
  },
  CallHandling: {
    feature: 'CallHandling',
    title: 'Call Handling',
    tagline: 'Professional Call Management',
    description: 'Enterprise call handling with intelligent routing, warm transfers & voicemail transcription. Handle 100+ concurrent calls. Priority routing for VIP customers. Real-time call analytics.',
    keywords: [
      'AI call handling', 'call routing AI', 'call transfer AI', 'voicemail AI',
      'call management AI', 'IVR AI', 'call analytics', 'concurrent call handling',
      'priority call routing', 'enterprise call AI'
    ]
  },
  AnalyticsDashboard: {
    feature: 'AnalyticsDashboard',
    title: 'Analytics Dashboard',
    tagline: 'Real-Time AI Insights',
    description: 'Real-time analytics for all AI interactions. Call patterns, customer sentiment, conversion metrics & performance KPIs. Export reports. Identify trends & optimize operations.',
    keywords: [
      'AI analytics', 'call analytics dashboard', 'customer sentiment analysis',
      'conversion analytics', 'AI performance metrics', 'real-time AI insights',
      'business intelligence AI', 'AI reporting', 'KPI dashboard', 'AI metrics'
    ]
  },
  MultiLanguage: {
    feature: 'MultiLanguage',
    title: 'Multi-Language Support',
    tagline: '45+ Languages Fluently',
    description: 'AI that speaks 45+ languages fluently. Automatic language detection. Native-quality pronunciation. Serve global customers in their preferred language. Real-time translation.',
    keywords: [
      'multilingual AI', 'multi-language AI', 'AI translation', 'language AI',
      'global AI support', 'international AI', 'language detection AI',
      'AI localization', 'multilingual chatbot', 'voice AI languages'
    ]
  },
  CRMIntegration: {
    feature: 'CRMIntegration',
    title: 'CRM Integration',
    tagline: 'Seamless System Connection',
    description: 'Connect AI with Salesforce, HubSpot, Zoho & 100+ CRMs. Automatic contact updates, call logging & deal tracking. Two-way sync. Custom field mapping. API access included.',
    keywords: [
      'CRM AI integration', 'Salesforce AI', 'HubSpot AI', 'Zoho AI integration',
      'CRM automation', 'AI CRM sync', 'contact management AI', 'deal tracking AI',
      'CRM API integration', 'sales automation AI'
    ]
  },
}

export function generateFeatureMetadata(featureKey: string): Metadata {
  const config = featureConfigs[featureKey]
  if (!config) {
    return {
      title: `${featureKey} | Cognia AI Features`,
      description: `AI-powered ${featureKey} feature from Cognia AI.`,
    }
  }

  return {
    title: `${config.title} - ${config.tagline}`,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: `${config.title} | ${config.tagline}`,
      description: config.description,
      url: `${baseUrl}/features/${config.feature}`,
      type: 'website',
      images: [{ url: getOgImageUrl(config.title, config.tagline), width: 1200, height: 630, alt: `Cognia AI - ${config.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${config.title} | Cognia AI`,
      description: config.tagline,
    },
    alternates: {
      canonical: `${baseUrl}/features/${config.feature}`,
      languages: { 'en-US': `${baseUrl}/features/${config.feature}`, 'tr-TR': `${baseUrl}/features/${config.feature}?lang=tr` },
    },
  }
}

export const featureMetadata: Record<string, Metadata> = Object.keys(featureConfigs).reduce((acc, key) => {
  acc[key] = generateFeatureMetadata(key)
  return acc
}, {} as Record<string, Metadata>)

interface UseCaseMetadataConfig {
  useCase: string
  title: string
  tagline: string
  description: string
  keywords: string[]
}

const useCaseConfigs: Record<string, UseCaseMetadataConfig> = {
  CustomerSupport: {
    useCase: 'CustomerSupport',
    title: 'Customer Support',
    tagline: '24/7 AI-Powered Support',
    description: '24/7 AI customer support that resolves 95% of inquiries on first contact. Instant responses. Intelligent escalation. Reduce support costs by 60% while improving customer satisfaction.',
    keywords: [
      'AI customer support', '24/7 support AI', 'customer service automation',
      'support chatbot', 'help desk AI', 'customer inquiry AI', 'support automation',
      'first-call resolution', 'AI support agent', 'customer experience AI'
    ]
  },
  AfterHoursService: {
    useCase: 'AfterHoursService',
    title: 'After Hours Service',
    tagline: 'Never Miss a Call',
    description: 'AI handles calls when you\'re closed. Book appointments, take messages & handle emergencies 24/7. Capture after-hours leads worth $10,000+ monthly. Professional service around the clock.',
    keywords: [
      'after hours AI', 'night time answering', '24/7 answering service', 'after hours support',
      'overnight AI', 'weekend AI service', 'holiday answering', 'after hours booking',
      'night answering service', 'round the clock AI'
    ]
  },
  ClientIntake: {
    useCase: 'ClientIntake',
    title: 'Client Intake',
    tagline: 'Streamlined Onboarding',
    description: 'Automate client intake with AI. Collect information, qualify leads & schedule consultations. Reduce intake time by 60%. Consistent data collection. Perfect for law firms, healthcare & professional services.',
    keywords: [
      'AI client intake', 'automated intake', 'client onboarding AI', 'intake automation',
      'lead qualification AI', 'client data collection', 'intake form AI',
      'professional services intake', 'law firm intake AI', 'healthcare intake AI'
    ]
  },
  LeadQualification: {
    useCase: 'LeadQualification',
    title: 'Lead Qualification',
    tagline: 'AI-Powered Lead Scoring',
    description: 'AI qualifies leads before they reach sales. Score leads based on criteria. Ask qualifying questions. Route hot leads instantly. Increase sales efficiency by 40%.',
    keywords: [
      'AI lead qualification', 'lead scoring AI', 'sales qualification AI', 'lead routing',
      'hot lead detection', 'sales automation', 'lead capture AI', 'qualifying questions AI',
      'sales lead AI', 'prospect qualification'
    ]
  },
  OrderProcessing: {
    useCase: 'OrderProcessing',
    title: 'Order Processing',
    tagline: 'Automated Order Taking',
    description: 'AI takes orders via phone, chat & messaging. Order confirmation, upselling & status updates. Integration with POS & inventory systems. Reduce order errors by 95%.',
    keywords: [
      'AI order processing', 'automated order taking', 'phone order AI', 'order automation',
      'order confirmation AI', 'AI upselling', 'order status AI', 'POS integration AI',
      'inventory AI', 'order management AI'
    ]
  },
  PatientScheduling: {
    useCase: 'PatientScheduling',
    title: 'Patient Scheduling',
    tagline: 'Secure Medical Booking',
    description: 'Secure patient scheduling with enterprise-grade security. Automated appointment reminders. Insurance verification. Reduce no-shows by 40%. Integration with EHR/EMR systems. 24/7 patient access.',
    keywords: [
      'patient scheduling AI', 'medical scheduling AI',
      'healthcare appointment AI', 'patient reminder AI', 'EHR integration AI',
      'EMR scheduling', 'no-show reduction AI', 'medical receptionist AI'
    ]
  },
}

export function generateUseCaseMetadata(useCaseKey: string): Metadata {
  const config = useCaseConfigs[useCaseKey]
  if (!config) {
    return {
      title: `${useCaseKey} | AI Use Cases | Cognia AI`,
      description: `AI-powered ${useCaseKey} from Cognia AI.`,
    }
  }

  return {
    title: `${config.title} - ${config.tagline}`,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: `${config.title} | ${config.tagline}`,
      description: config.description,
      url: `${baseUrl}/usecases/${config.useCase}`,
      type: 'website',
      images: [{ url: getOgImageUrl(config.title, config.tagline), width: 1200, height: 630, alt: `Cognia AI - ${config.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${config.title} | Cognia AI`,
      description: config.tagline,
    },
    alternates: {
      canonical: `${baseUrl}/usecases/${config.useCase}`,
      languages: { 'en-US': `${baseUrl}/usecases/${config.useCase}`, 'tr-TR': `${baseUrl}/usecases/${config.useCase}?lang=tr` },
    },
  }
}

export const useCaseMetadata: Record<string, Metadata> = Object.keys(useCaseConfigs).reduce((acc, key) => {
  acc[key] = generateUseCaseMetadata(key)
  return acc
}, {} as Record<string, Metadata>)

export { industryConfigs, featureConfigs, useCaseConfigs }
