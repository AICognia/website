import {
  FaDatabase,
  FaChartLine,
  FaRobot,
  FaBrain,
  FaHospital,
  FaUserMd,
  FaClipboardList,
  FaStethoscope,
  FaIndustry,
  FaCogs,
  FaTruck,
  FaBoxes,
  FaHotel,
  FaConciergeBell,
  FaCalendarAlt,
  FaUsers,
  FaSeedling,
  FaWarehouse,
  FaLeaf,
  FaTractor,
  FaShoppingCart,
  FaStore,
  FaChartBar,
  FaLayerGroup,
  FaBriefcase,
  FaFileContract,
  FaUserTie,
  FaClock,
  FaBalanceScale,
  FaGavel,
  FaFileAlt,
  FaHandshake,
  FaCar,
  FaWrench,
  FaClipboardCheck,
  FaTools,
  FaHome,
  FaPlug,
  FaFire,
  FaSnowflake,
  FaShieldAlt
} from 'react-icons/fa'
import { IndustryData } from '../components/templates/IndustryPageTemplate'

export const healthcareData: IndustryData = {
  slug: 'healthcare',
  seoTitle: 'AI Transformation for Healthcare | Cognia AI',
  seoDescription: 'Unify patient data, automate clinical workflows, and deliver AI-powered insights for better care coordination and operational efficiency.',
  badge: 'Healthcare & Medical',
  title: 'AI Transformation for',
  titleHighlight: 'Healthcare',
  subtitle: 'Unify patient data, automate clinical workflows, and deliver AI-powered insights for better care coordination and operational efficiency.',
  heroImage: '/images/industries/healthcare.jpg',
  heroWidget: {
    title: 'Unified Patient Intelligence',
    items: ['EHR Integration', 'Predictive Analytics', 'Smart Scheduling', 'Enterprise Security']
  },
  heroStats: [
    { value: '68%', label: 'Reduction in No-Shows' },
    { value: '40hrs', label: 'Saved Weekly per Practice' },
    { value: '94%', label: 'Patient Satisfaction' },
    { value: '100%', label: 'Secure Platform' }
  ],
  problemTitle: 'Healthcare Data is Fragmented',
  problemDescription: 'Patient information scattered across EHRs, practice management systems, billing platforms, and paper records. Staff spend hours on manual data entry while patients wait.',
  bentoContent: {
    mainChallenge: {
      badge: 'Patient Data Silos',
      title: 'Disconnected Care Systems',
      description: 'EHR, PMS, and billing data living in separate worlds.'
    },
    radarChart: {
      categories: [
        { label: 'EHR Integration', current: 25, potential: 92 },
        { label: 'Patient Flow', current: 35, potential: 88 },
        { label: 'Care Coordination', current: 20, potential: 95 },
        { label: 'Compliance', current: 45, potential: 98 },
        { label: 'Analytics', current: 30, potential: 90 },
      ],
      colors: { current: '#ef4444', potential: '#10b981' },
      style: 'glow'
    },
    ringChart: {
      percentage: 68,
      title: 'Patient No-Shows',
      description: 'Appointments lost to poor communication and scheduling gaps.',
      metric: 'Lost Revenue',
      metricValue: '$150K/year',
      color: 'red'
    },
    barChart: {
      title: 'Staff Time Drain',
      description: 'Hours spent on manual data entry vs. patient care.',
      data: [
        { label: 'Data Entry', value: 85 },
        { label: 'Scheduling', value: 72 },
        { label: 'Billing', value: 68 },
        { label: 'Follow-ups', value: 78 },
        { label: 'Reporting', value: 90 }
      ],
      statusBadge: 'Burnout Risk',
      statusColor: 'red'
    }
  },
  challenges: [
    'Patient data siloed across multiple systems with no unified view',
    'Manual scheduling and appointment management consuming staff time',
    'Lack of predictive insights for patient no-shows and capacity planning',
    'Compliance requirements making data integration complex'
  ],
  solutionsTitle: 'Healthcare-Specific AI Solutions',
  solutionsSubtitle: 'Purpose-built for clinical workflows with enterprise security at the core.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Patient Data',
      description: 'Connect EHR, PMS, and billing systems into a single source of truth for complete patient visibility.',
      features: ['EHR integration', 'Cross-system data sync', 'Patient 360° view', 'Compliance-ready']
    },
    {
      icon: FaBrain,
      title: 'Predictive Analytics',
      description: 'AI-powered forecasting for no-shows, capacity planning, and patient risk stratification.',
      features: ['No-show prediction', 'Demand forecasting', 'Risk scoring', 'Resource optimization']
    },
    {
      icon: FaRobot,
      title: 'Intelligent Automation',
      description: 'Automate scheduling, reminders, intake, and follow-ups with AI agents.',
      features: ['Smart scheduling', 'Automated reminders', 'Patient intake AI', 'Follow-up coordination']
    }
  ],
  resultsTitle: 'Measurable Healthcare Impact',
  results: [
    { value: '68%', label: 'Fewer No-Shows', suffix: '↓' },
    { value: '$1.8M', label: 'Revenue Recovery' },
    { value: '85%', label: 'Staff Time Saved', suffix: '↑' },
    { value: '24/7', label: 'Patient Access' }
  ],
  testimonial: {
    quote: 'Working with Cognia has been a game-changer for our office. What I appreciate the most is how they completely transformed our Monday mornings. Before Cognia, I would spend 45 minutes just waiting for the voicemail system to run so I could go through every message. Now, with Cognia, we receive a clear email summary along with call transcripts first thing in the morning. This lets us immediately prioritize call-backs without wasting time.',
    author: 'Jacob Ojalvo',
    role: 'Owner',
    company: 'My Smile Miami'
  },
  useCasesTitle: 'Healthcare Practices We Serve',
  useCases: [
    {
      icon: FaStethoscope,
      title: 'Primary Care Practices',
      features: ['Appointment optimization', 'Patient intake automation', 'Referral management', 'Care gap identification']
    },
    {
      icon: FaHospital,
      title: 'Multi-Location Health Systems',
      features: ['Cross-facility analytics', 'Capacity planning', 'Quality metrics', 'Executive dashboards']
    },
    {
      icon: FaUserMd,
      title: 'Specialty Clinics',
      features: ['Complex scheduling', 'Treatment tracking', 'Outcome analytics', 'Resource optimization']
    },
    {
      icon: FaClipboardList,
      title: 'Urgent Care Centers',
      features: ['Wait time optimization', 'Demand forecasting', 'Staff scheduling', 'Patient flow analytics']
    }
  ],
  ctaTitle: 'Ready to Transform Your Practice?',
  ctaSubtitle: 'Schedule a consultation to see how AI can improve patient outcomes while reducing operational burden.'
}

export const manufacturingData: IndustryData = {
  slug: 'manufacturing',
  seoTitle: 'AI Transformation for Manufacturing | Cognia AI',
  seoDescription: 'Unify production data, predict equipment failures, and optimize operations with AI-powered intelligence across your entire manufacturing operation.',
  badge: 'Manufacturing & Industrial',
  title: 'AI Transformation for',
  titleHighlight: 'Manufacturing',
  subtitle: 'Unify production data, predict equipment failures, and optimize operations with AI-powered intelligence across your entire manufacturing operation.',
  heroImage: '/images/industries/technology.jpg',
  heroWidget: {
    title: 'Production Intelligence Hub',
    items: ['MES Integration', 'Predictive Maintenance', 'Quality Analytics', 'Supply Chain Sync']
  },
  heroStats: [
    { value: '32%', label: 'Production Efficiency Gain' },
    { value: '$2.4M', label: 'Annual Savings' },
    { value: '94%', label: 'Forecast Accuracy' },
    { value: '3 weeks', label: 'Earlier Issue Detection' }
  ],
  problemTitle: 'Manufacturing Data is Disconnected',
  problemDescription: 'Production metrics in one system, inventory in another, quality data in spreadsheets. Without a unified view, you\'re making decisions with incomplete information.',
  bentoContent: {
    mainChallenge: {
      badge: 'Production Silos',
      title: 'Disconnected Shop Floor',
      description: 'MES, ERP, and equipment data in separate systems.'
    },
    radarChart: {
      categories: [
        { label: 'OEE', current: 58, potential: 92 },
        { label: 'Quality', current: 65, potential: 96 },
        { label: 'Maintenance', current: 30, potential: 88 },
        { label: 'Supply Chain', current: 42, potential: 90 },
        { label: 'Throughput', current: 55, potential: 94 },
      ],
      colors: { current: '#f97316', potential: '#3b82f6' },
      style: 'default'
    },
    ringChart: {
      percentage: 45,
      title: 'Unplanned Downtime',
      description: 'Equipment failures caught too late causing costly production stops.',
      metric: 'Annual Cost',
      metricValue: '$2.4M/year',
      color: 'orange'
    },
    barChart: {
      title: 'Equipment Health',
      description: 'OEE scores across your production lines.',
      data: [
        { label: 'Line A', value: 62 },
        { label: 'Line B', value: 78 },
        { label: 'Line C', value: 45 },
        { label: 'Line D', value: 71 },
        { label: 'Line E', value: 58 }
      ],
      statusBadge: 'Below Target',
      statusColor: 'orange'
    }
  },
  challenges: [
    'Production data scattered across MES, ERP, and legacy systems',
    'No real-time visibility into equipment performance and maintenance needs',
    'Quality control issues detected too late in the process',
    'Supply chain disruptions impacting production without warning'
  ],
  solutionsTitle: 'Manufacturing-Specific AI Solutions',
  solutionsSubtitle: 'Purpose-built for production environments with real-time monitoring and predictive capabilities.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Production Data',
      description: 'Connect MES, ERP, quality systems, and equipment sensors into one intelligent platform.',
      features: ['MES integration', 'Real-time data sync', 'Equipment connectivity', 'Cross-plant visibility']
    },
    {
      icon: FaChartLine,
      title: 'Predictive Maintenance',
      description: 'AI-powered equipment monitoring that predicts failures before they cause downtime.',
      features: ['Failure prediction', 'Maintenance scheduling', 'Parts forecasting', 'Downtime prevention']
    },
    {
      icon: FaCogs,
      title: 'Quality Intelligence',
      description: 'Detect quality anomalies in real-time and trace root causes across the production line.',
      features: ['Anomaly detection', 'Root cause analysis', 'Quality trending', 'Defect prevention']
    }
  ],
  resultsTitle: 'Measurable Manufacturing Impact',
  results: [
    { value: '32%', label: 'Efficiency Increase', suffix: '↑' },
    { value: '45%', label: 'Downtime Reduction', suffix: '↓' },
    { value: '3 weeks', label: 'Earlier Detection' },
    { value: '$2.4M', label: 'Annual Savings' }
  ],
  testimonial: {
    quote: 'After we switched to Cognia AI, the whole situation changed. Calls actually get answered now, even when we\'re tied up or out on the road, and customers get a response right away instead of voicemail. Over the last few weeks, we\'ve noticed a pretty clear bump in jobs coming in. You stop missing calls, you stop missing work.',
    author: 'Elite Auto Repair',
    role: 'Auto Repair Shop',
    company: 'Automotive'
  },
  useCasesTitle: 'Manufacturing Operations We Serve',
  useCases: [
    {
      icon: FaIndustry,
      title: 'Discrete Manufacturing',
      features: ['Production tracking', 'Quality control', 'Inventory optimization', 'Order management']
    },
    {
      icon: FaCogs,
      title: 'Process Manufacturing',
      features: ['Batch monitoring', 'Recipe management', 'Compliance tracking', 'Yield optimization']
    },
    {
      icon: FaTruck,
      title: 'Supply Chain Operations',
      features: ['Supplier analytics', 'Demand forecasting', 'Inventory planning', 'Logistics optimization']
    },
    {
      icon: FaBoxes,
      title: 'Warehouse & Distribution',
      features: ['Inventory visibility', 'Pick optimization', 'Shipping analytics', 'Capacity planning']
    }
  ],
  ctaTitle: 'Ready to Optimize Your Operations?',
  ctaSubtitle: 'Schedule a consultation to see how AI can improve efficiency while reducing downtime.'
}

export const hospitalityData: IndustryData = {
  slug: 'hospitality',
  seoTitle: 'AI Transformation for Hospitality | Cognia AI',
  seoDescription: 'Unify guest data, optimize revenue management, and deliver personalized experiences with AI-powered intelligence across your properties.',
  badge: 'Hospitality & Tourism',
  title: 'AI Transformation for',
  titleHighlight: 'Hospitality',
  subtitle: 'Unify guest data, optimize revenue management, and deliver personalized experiences with AI-powered intelligence across your properties.',
  heroImage: '/images/industries/public_sector.jpg',
  heroWidget: {
    title: 'Guest Experience Platform',
    items: ['PMS Integration', 'Revenue Optimization', 'Guest Analytics', 'Multi-Property Sync']
  },
  heroStats: [
    { value: '18%', label: 'Revenue Increase' },
    { value: '42%', label: 'Guest Satisfaction Lift' },
    { value: '35%', label: 'Operational Cost Savings' },
    { value: '24/7', label: 'Guest Support' }
  ],
  problemTitle: 'Hospitality Data is Siloed',
  problemDescription: 'Reservations in one system, guest preferences in another, revenue data in spreadsheets. Without unified insights, personalization and optimization suffer.',
  bentoContent: {
    mainChallenge: {
      badge: 'Guest Data Silos',
      title: 'Fragmented Guest Profiles',
      description: 'PMS, CRM, and booking data scattered across properties.'
    },
    radarChart: {
      categories: [
        { label: 'Guest Experience', current: 55, potential: 95 },
        { label: 'RevPAR', current: 62, potential: 90 },
        { label: 'Personalization', current: 25, potential: 92 },
        { label: 'Operations', current: 48, potential: 88 },
        { label: 'Loyalty', current: 35, potential: 94 },
      ],
      colors: { current: '#8b5cf6', potential: '#06b6d4' },
      style: 'gradient'
    },
    ringChart: {
      percentage: 23,
      title: 'Revenue Leakage',
      description: 'ADR optimization missed due to reactive pricing decisions.',
      metric: 'RevPAR Gap',
      metricValue: '-$42/night',
      color: 'purple'
    },
    barChart: {
      title: 'Occupancy by Day',
      description: 'Weekly occupancy patterns show revenue opportunities.',
      data: [
        { label: 'Mon', value: 58 },
        { label: 'Tue', value: 62 },
        { label: 'Wed', value: 71 },
        { label: 'Thu', value: 85 },
        { label: 'Fri-Sun', value: 94 }
      ],
      statusBadge: 'Midweek Gap',
      statusColor: 'amber'
    }
  },
  challenges: [
    'Guest data fragmented across PMS, CRM, and booking platforms',
    'Revenue management based on historical data, not predictive insights',
    'Staff overwhelmed with routine guest inquiries and requests',
    'No real-time visibility into operational performance across properties'
  ],
  solutionsTitle: 'Hospitality-Specific AI Solutions',
  solutionsSubtitle: 'Purpose-built for guest experience excellence and operational efficiency.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Guest Intelligence',
      description: 'Connect PMS, CRM, and booking systems for a complete 360° view of every guest.',
      features: ['Guest profile unification', 'Preference tracking', 'Cross-property visibility', 'Loyalty integration']
    },
    {
      icon: FaChartLine,
      title: 'Revenue Optimization',
      description: 'AI-powered pricing and demand forecasting to maximize RevPAR across all properties.',
      features: ['Dynamic pricing', 'Demand forecasting', 'Channel optimization', 'Competitive intelligence']
    },
    {
      icon: FaRobot,
      title: 'Guest Experience AI',
      description: 'Intelligent automation for reservations, concierge services, and guest communications.',
      features: ['Smart booking', 'AI concierge', 'Personalized outreach', 'Request automation']
    }
  ],
  resultsTitle: 'Measurable Hospitality Impact',
  results: [
    { value: '18%', label: 'RevPAR Increase', suffix: '↑' },
    { value: '42%', label: 'Guest Satisfaction', suffix: '↑' },
    { value: '60%', label: 'Inquiry Automation' },
    { value: '24/7', label: 'Service Availability' }
  ],
  testimonial: {
    quote: 'Working with Cognia has been a game-changer for our office. What I appreciate the most is how they completely transformed our Monday mornings. Now, with Cognia, we receive a clear email summary along with call transcripts first thing in the morning. This lets us immediately prioritize call-backs without wasting time.',
    author: 'Jacob Ojalvo',
    role: 'Owner',
    company: 'My Smile Miami'
  },
  useCasesTitle: 'Hospitality Operations We Serve',
  useCases: [
    {
      icon: FaHotel,
      title: 'Hotels & Resorts',
      features: ['Revenue management', 'Guest personalization', 'Operations optimization', 'Multi-property analytics']
    },
    {
      icon: FaConciergeBell,
      title: 'Boutique Properties',
      features: ['Concierge automation', 'Guest communications', 'Review management', 'Local recommendations']
    },
    {
      icon: FaCalendarAlt,
      title: 'Event Venues',
      features: ['Booking optimization', 'Capacity planning', 'Client management', 'Event analytics']
    },
    {
      icon: FaUsers,
      title: 'Restaurant Groups',
      features: ['Reservation management', 'Table optimization', 'Guest preferences', 'Staff scheduling']
    }
  ],
  ctaTitle: 'Ready to Elevate Guest Experience?',
  ctaSubtitle: 'Schedule a consultation to see how AI can drive revenue while delighting guests.'
}

export const agricultureData: IndustryData = {
  slug: 'agriculture',
  seoTitle: 'AI Transformation for Agriculture | Cognia AI',
  seoDescription: 'Unify farm data, optimize supply chains, and make data-driven decisions with AI-powered intelligence across your agricultural operations.',
  badge: 'Agriculture & Food',
  title: 'AI Transformation for',
  titleHighlight: 'Agriculture',
  subtitle: 'Unify farm data, optimize supply chains, and make data-driven decisions with AI-powered intelligence across your agricultural operations.',
  heroImage: '/images/industries/technology.jpg',
  heroWidget: {
    title: 'Agricultural Intelligence',
    items: ['Yield Analytics', 'Supply Chain', 'Weather Integration', 'IoT Sensors']
  },
  heroStats: [
    { value: '24%', label: 'Yield Improvement' },
    { value: '35%', label: 'Waste Reduction' },
    { value: '94%', label: 'Forecast Accuracy' },
    { value: '$1.2M', label: 'Annual Savings' }
  ],
  problemTitle: 'Agricultural Data is Scattered',
  problemDescription: 'Field data, weather information, market prices, and supply chain logistics exist in separate systems. Making informed decisions requires manual data gathering.',
  bentoContent: {
    mainChallenge: {
      badge: 'Farm Data Silos',
      title: 'Disconnected Operations',
      description: 'Field sensors, equipment, and market data in separate systems.'
    },
    radarChart: {
      categories: [
        { label: 'Yield', current: 58, potential: 92 },
        { label: 'Sustainability', current: 40, potential: 88 },
        { label: 'Supply Chain', current: 35, potential: 90 },
        { label: 'Forecasting', current: 28, potential: 94 },
        { label: 'Resource Use', current: 45, potential: 86 },
      ],
      colors: { current: '#f59e0b', potential: '#22c55e' },
      style: 'dots'
    },
    ringChart: {
      percentage: 35,
      title: 'Post-Harvest Loss',
      description: 'Crop waste from poor visibility and timing decisions.',
      metric: 'Annual Waste',
      metricValue: '~$1.2M/year',
      color: 'amber'
    },
    barChart: {
      title: 'Yield by Field',
      description: 'Production variability across your operation.',
      data: [
        { label: 'North', value: 72 },
        { label: 'South', value: 58 },
        { label: 'East', value: 85 },
        { label: 'West', value: 64 },
        { label: 'Center', value: 78 }
      ],
      statusBadge: 'Optimization Needed',
      statusColor: 'amber'
    }
  },
  challenges: [
    'Farm data scattered across equipment, sensors, and spreadsheets',
    'Supply chain visibility gaps leading to waste and inefficiency',
    'Weather and market volatility without predictive capabilities',
    'Quality tracking disconnected from production and logistics'
  ],
  solutionsTitle: 'Agriculture-Specific AI Solutions',
  solutionsSubtitle: 'Purpose-built for agricultural operations with predictive analytics and supply chain intelligence.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Farm Intelligence',
      description: 'Connect equipment, sensors, and operational systems into one data platform.',
      features: ['Equipment integration', 'Sensor data unification', 'Field mapping', 'Weather integration']
    },
    {
      icon: FaChartLine,
      title: 'Predictive Analytics',
      description: 'AI-powered forecasting for yields, demand, and optimal harvest timing.',
      features: ['Yield prediction', 'Demand forecasting', 'Price optimization', 'Risk assessment']
    },
    {
      icon: FaTruck,
      title: 'Supply Chain Intelligence',
      description: 'End-to-end visibility from farm to market with quality tracking and logistics optimization.',
      features: ['Traceability', 'Quality monitoring', 'Logistics optimization', 'Market connectivity']
    }
  ],
  resultsTitle: 'Measurable Agricultural Impact',
  results: [
    { value: '24%', label: 'Yield Improvement', suffix: '↑' },
    { value: '35%', label: 'Waste Reduction', suffix: '↓' },
    { value: '94%', label: 'Forecast Accuracy' },
    { value: '28%', label: 'Cost Reduction', suffix: '↓' }
  ],
  useCasesTitle: 'Agricultural Operations We Serve',
  useCases: [
    {
      icon: FaTractor,
      title: 'Farm Operations',
      features: ['Crop planning', 'Equipment management', 'Input optimization', 'Yield tracking']
    },
    {
      icon: FaWarehouse,
      title: 'Food Processing',
      features: ['Quality control', 'Batch tracking', 'Compliance management', 'Waste reduction']
    },
    {
      icon: FaLeaf,
      title: 'Agribusiness',
      features: ['Supply chain visibility', 'Market analytics', 'Contract management', 'Risk assessment']
    },
    {
      icon: FaSeedling,
      title: 'Sustainable Agriculture',
      features: ['Resource optimization', 'Carbon tracking', 'Certification management', 'Impact reporting']
    }
  ],
  ctaTitle: 'Ready to Modernize Your Operations?',
  ctaSubtitle: 'Schedule a consultation to see how AI can improve yields while reducing waste.'
}

export const retailData: IndustryData = {
  slug: 'retail',
  seoTitle: 'AI Transformation for Retail | Cognia AI',
  seoDescription: 'Unify customer data, optimize inventory, and deliver personalized experiences with AI-powered intelligence across all your channels.',
  badge: 'Retail & E-commerce',
  title: 'AI Transformation for',
  titleHighlight: 'Retail',
  subtitle: 'Unify customer data, optimize inventory, and deliver personalized experiences with AI-powered intelligence across all your channels.',
  heroImage: '/images/industries/financial_services.png',
  heroWidget: {
    title: 'Unified Retail Intelligence',
    items: ['Inventory AI', 'Customer 360°', 'Demand Forecasting', 'Omnichannel Sync']
  },
  heroStats: [
    { value: '32%', label: 'Inventory Cost Reduction' },
    { value: '89%', label: 'Stockout Prevention' },
    { value: '4.2x', label: 'ROI in Year One' },
    { value: '28%', label: 'Revenue Increase' }
  ],
  problemTitle: 'Retail Data is Fragmented',
  problemDescription: 'Customer data in the CRM, inventory across locations, sales in POS systems. Without unified insights, you\'re missing opportunities to optimize and personalize.',
  bentoContent: {
    mainChallenge: {
      badge: 'Omnichannel Gaps',
      title: 'Disconnected Channels',
      description: 'Online, in-store, and mobile data living in silos.'
    },
    radarChart: {
      categories: [
        { label: 'Inventory', current: 42, potential: 95 },
        { label: 'Customer 360', current: 28, potential: 92 },
        { label: 'Omnichannel', current: 35, potential: 90 },
        { label: 'Demand', current: 45, potential: 94 },
        { label: 'Personalization', current: 22, potential: 88 },
      ],
      colors: { current: '#3b82f6', potential: '#8b5cf6' },
      style: 'neon'
    },
    ringChart: {
      percentage: 32,
      title: 'Inventory Costs',
      description: 'Excess carrying costs from poor demand visibility.',
      metric: 'Overstock Rate',
      metricValue: '~18% excess',
      color: 'blue'
    },
    barChart: {
      title: 'Stockout Rate by Category',
      description: 'Lost sales from inventory blind spots.',
      data: [
        { label: 'Electronics', value: 28 },
        { label: 'Apparel', value: 42 },
        { label: 'Home', value: 35 },
        { label: 'Beauty', value: 18 },
        { label: 'Food', value: 52 }
      ],
      statusBadge: 'High Stockouts',
      statusColor: 'red'
    }
  },
  challenges: [
    'Customer data siloed across online and offline channels',
    'Inventory visibility gaps leading to stockouts and overstock',
    'No predictive capabilities for demand planning',
    'Manual processes for pricing and promotional optimization'
  ],
  solutionsTitle: 'Retail-Specific AI Solutions',
  solutionsSubtitle: 'Purpose-built for omnichannel retail with customer intelligence and inventory optimization.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Customer Intelligence',
      description: 'Connect POS, e-commerce, CRM, and loyalty systems for a complete customer view.',
      features: ['Customer 360° view', 'Cross-channel tracking', 'Preference learning', 'Segment analytics']
    },
    {
      icon: FaChartBar,
      title: 'Inventory Intelligence',
      description: 'AI-powered inventory optimization across all locations and channels.',
      features: ['Demand forecasting', 'Stock optimization', 'Reorder automation', 'Shrink detection']
    },
    {
      icon: FaBrain,
      title: 'Personalization Engine',
      description: 'Deliver personalized recommendations, pricing, and communications at scale.',
      features: ['Product recommendations', 'Dynamic pricing', 'Personalized marketing', 'Churn prediction']
    }
  ],
  resultsTitle: 'Measurable Retail Impact',
  results: [
    { value: '32%', label: 'Inventory Costs', suffix: '↓' },
    { value: '28%', label: 'Revenue Increase', suffix: '↑' },
    { value: '89%', label: 'Stockout Prevention' },
    { value: '4.2x', label: 'ROI Year One' }
  ],
  testimonial: {
    quote: 'After we switched to Cognia AI, the whole situation changed. Calls actually get answered now, even when we\'re tied up or out on the road, and customers get a response right away instead of voicemail. Over the last few weeks, we\'ve noticed a pretty clear bump in jobs coming in. You stop missing calls, you stop missing work.',
    author: 'Elite Auto Repair',
    role: 'Auto Repair Shop',
    company: 'Automotive'
  },
  useCasesTitle: 'Retail Operations We Serve',
  useCases: [
    {
      icon: FaStore,
      title: 'Multi-Location Retail',
      features: ['Cross-store analytics', 'Inventory balancing', 'Staff optimization', 'Performance benchmarking']
    },
    {
      icon: FaShoppingCart,
      title: 'E-commerce',
      features: ['Conversion optimization', 'Cart abandonment', 'Personalization', 'Fulfillment intelligence']
    },
    {
      icon: FaLayerGroup,
      title: 'Omnichannel Retail',
      features: ['Channel unification', 'Order routing', 'BOPIS optimization', 'Returns intelligence']
    },
    {
      icon: FaChartLine,
      title: 'Category Management',
      features: ['Assortment planning', 'Space optimization', 'Promotion analytics', 'Vendor management']
    }
  ],
  ctaTitle: 'Ready to Transform Your Retail Operations?',
  ctaSubtitle: 'Schedule a consultation to see how AI can optimize inventory while growing revenue.'
}

export const professionalServicesData: IndustryData = {
  slug: 'professional-services',
  seoTitle: 'AI Transformation for Professional Services | Cognia AI',
  seoDescription: 'Unify client data, optimize resource utilization, and deliver exceptional service with AI-powered intelligence across your practice.',
  badge: 'Professional Services',
  title: 'AI Transformation for',
  titleHighlight: 'Professional Services',
  subtitle: 'Unify client data, optimize resource utilization, and deliver exceptional service with AI-powered intelligence across your practice.',
  heroImage: '/images/industries/technology.jpg',
  heroWidget: {
    title: 'Practice Intelligence',
    items: ['Client Management', 'Resource Planning', 'Billing Automation', 'Project Analytics']
  },
  heroStats: [
    { value: '35%', label: 'Utilization Improvement' },
    { value: '42%', label: 'Admin Time Reduction' },
    { value: '94%', label: 'Client Satisfaction' },
    { value: '28%', label: 'Revenue per Partner' }
  ],
  problemTitle: 'Professional Services Data is Scattered',
  problemDescription: 'Client information in CRM, project data in PM tools, financials in billing systems. Without unified insights, profitability and client service suffer.',
  bentoContent: {
    mainChallenge: {
      badge: 'Practice Silos',
      title: 'Disconnected Client Data',
      description: 'CRM, PM tools, and billing in separate systems.'
    },
    radarChart: {
      categories: [
        { label: 'Utilization', current: 65, potential: 92 },
        { label: 'Profitability', current: 55, potential: 90 },
        { label: 'Client Intel', current: 38, potential: 95 },
        { label: 'Resource Plan', current: 42, potential: 88 },
        { label: 'Delivery', current: 58, potential: 94 },
      ],
      colors: { current: '#6366f1', potential: '#14b8a6' },
      style: 'minimal'
    },
    ringChart: {
      percentage: 65,
      title: 'Billable Utilization',
      description: 'Target utilization not met due to poor resource visibility.',
      metric: 'Target Gap',
      metricValue: '-15% below',
      color: 'blue'
    },
    barChart: {
      title: 'Utilization by Team',
      description: 'Resource allocation across your practice.',
      data: [
        { label: 'Senior', value: 78 },
        { label: 'Manager', value: 68 },
        { label: 'Associate', value: 55 },
        { label: 'Analyst', value: 82 },
        { label: 'Admin', value: 45 }
      ],
      statusBadge: 'Underutilized',
      statusColor: 'blue'
    }
  },
  challenges: [
    'Client data fragmented across multiple systems',
    'Resource planning based on outdated information',
    'No predictive insights for project profitability',
    'Manual time tracking and billing processes'
  ],
  solutionsTitle: 'Professional Services AI Solutions',
  solutionsSubtitle: 'Purpose-built for knowledge work with client intelligence and resource optimization.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Client Intelligence',
      description: 'Connect CRM, project management, and billing for complete client visibility.',
      features: ['Client 360° view', 'Engagement history', 'Profitability analytics', 'Risk identification']
    },
    {
      icon: FaUsers,
      title: 'Resource Optimization',
      description: 'AI-powered resource planning and utilization optimization across your practice.',
      features: ['Capacity planning', 'Skill matching', 'Utilization forecasting', 'Bench management']
    },
    {
      icon: FaChartLine,
      title: 'Project Intelligence',
      description: 'Predictive analytics for project health, profitability, and delivery risk.',
      features: ['Budget forecasting', 'Risk prediction', 'Milestone tracking', 'Profitability analysis']
    }
  ],
  resultsTitle: 'Measurable Professional Services Impact',
  results: [
    { value: '35%', label: 'Utilization Increase', suffix: '↑' },
    { value: '42%', label: 'Admin Reduction', suffix: '↓' },
    { value: '28%', label: 'Revenue Growth', suffix: '↑' },
    { value: '94%', label: 'Client Satisfaction' }
  ],
  useCasesTitle: 'Professional Services We Serve',
  useCases: [
    {
      icon: FaBriefcase,
      title: 'Consulting Firms',
      features: ['Resource planning', 'Project profitability', 'Client analytics', 'Knowledge management']
    },
    {
      icon: FaFileContract,
      title: 'Accounting Firms',
      features: ['Engagement management', 'Billing optimization', 'Compliance tracking', 'Staff scheduling']
    },
    {
      icon: FaUserTie,
      title: 'Marketing Agencies',
      features: ['Campaign analytics', 'Client reporting', 'Resource allocation', 'Profitability tracking']
    },
    {
      icon: FaClock,
      title: 'IT Services',
      features: ['Ticket analytics', 'SLA monitoring', 'Resource optimization', 'Customer health scoring']
    }
  ],
  ctaTitle: 'Ready to Optimize Your Practice?',
  ctaSubtitle: 'Schedule a consultation to see how AI can improve utilization while growing revenue.'
}

export const legalData: IndustryData = {
  slug: 'legal',
  seoTitle: 'AI Transformation for Legal | Cognia AI',
  seoDescription: 'Unify case data, automate client intake, and deliver data-driven insights with AI-powered intelligence across your practice.',
  badge: 'Legal Services',
  title: 'AI Transformation for',
  titleHighlight: 'Legal',
  subtitle: 'Unify case data, automate client intake, and deliver data-driven insights with AI-powered intelligence across your practice.',
  heroImage: '/images/industries/financial_services.png',
  heroWidget: {
    title: 'Legal Intelligence Platform',
    items: ['Case Management', 'Client Intake AI', 'Document Analysis', 'Billing Insights']
  },
  heroStats: [
    { value: '45%', label: 'Intake Time Reduction' },
    { value: '32%', label: 'Billable Hours Increase' },
    { value: '94%', label: 'Client Satisfaction' },
    { value: '2.8x', label: 'ROI Year One' }
  ],
  problemTitle: 'Legal Data is Fragmented',
  problemDescription: 'Case information in practice management, documents scattered across systems, client communications in email. Without unified insights, efficiency suffers.',
  bentoContent: {
    mainChallenge: {
      badge: 'Matter Silos',
      title: 'Disconnected Case Data',
      description: 'Practice management, docs, and billing in separate systems.'
    },
    radarChart: {
      categories: [
        { label: 'Realization', current: 72, potential: 95 },
        { label: 'Intake', current: 35, potential: 90 },
        { label: 'Document Mgmt', current: 40, potential: 92 },
        { label: 'Compliance', current: 65, potential: 98 },
        { label: 'Analytics', current: 28, potential: 88 },
      ],
      colors: { current: '#a855f7', potential: '#0ea5e9' },
      style: 'glow'
    },
    ringChart: {
      percentage: 72,
      title: 'Realization Rate',
      description: 'Billing leakage from time not captured or written off.',
      metric: 'Collection Gap',
      metricValue: '-28% lost',
      color: 'purple'
    },
    barChart: {
      title: 'Attorney Time Allocation',
      description: 'Where billable hours are being lost.',
      data: [
        { label: 'Admin', value: 35 },
        { label: 'Intake', value: 42 },
        { label: 'Research', value: 65 },
        { label: 'Drafting', value: 78 },
        { label: 'Client', value: 88 }
      ],
      statusBadge: 'High Admin Load',
      statusColor: 'orange'
    }
  },
  challenges: [
    'Client and matter data siloed across systems',
    'Manual intake processes consuming attorney time',
    'No visibility into case profitability until completion',
    'Document management disconnected from case context'
  ],
  solutionsTitle: 'Legal-Specific AI Solutions',
  solutionsSubtitle: 'Purpose-built for legal practice with client intelligence and workflow automation.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Matter Intelligence',
      description: 'Connect practice management, document systems, and billing for complete matter visibility.',
      features: ['Matter 360° view', 'Document centralization', 'Timeline tracking', 'Profitability analytics']
    },
    {
      icon: FaRobot,
      title: 'Intelligent Intake',
      description: 'AI-powered client intake and matter opening with conflict checking and routing.',
      features: ['Automated intake', 'Conflict checking', 'Lead qualification', 'Document collection']
    },
    {
      icon: FaChartLine,
      title: 'Practice Analytics',
      description: 'Predictive insights for case outcomes, profitability, and resource optimization.',
      features: ['Profitability forecasting', 'Resource planning', 'Outcome prediction', 'Performance benchmarking']
    }
  ],
  resultsTitle: 'Measurable Legal Impact',
  results: [
    { value: '45%', label: 'Intake Time', suffix: '↓' },
    { value: '32%', label: 'Billable Hours', suffix: '↑' },
    { value: '28%', label: 'Realization Rate', suffix: '↑' },
    { value: '2.8x', label: 'ROI Year One' }
  ],
  useCasesTitle: 'Legal Practices We Serve',
  useCases: [
    {
      icon: FaBalanceScale,
      title: 'Law Firms',
      features: ['Matter management', 'Client intake', 'Billing optimization', 'Performance analytics']
    },
    {
      icon: FaGavel,
      title: 'Corporate Legal',
      features: ['Contract management', 'Compliance tracking', 'Vendor management', 'Risk assessment']
    },
    {
      icon: FaFileAlt,
      title: 'Litigation Support',
      features: ['Document analytics', 'Timeline creation', 'Deposition management', 'Case preparation']
    },
    {
      icon: FaHandshake,
      title: 'Transaction Teams',
      features: ['Due diligence', 'Deal room management', 'Closing coordination', 'Document automation']
    }
  ],
  ctaTitle: 'Ready to Transform Your Practice?',
  ctaSubtitle: 'Schedule a consultation to see how AI can improve efficiency while growing profitability.'
}

export const automotiveData: IndustryData = {
  slug: 'automotive',
  seoTitle: 'AI Transformation for Automotive | Cognia AI',
  seoDescription: 'Unify customer data, optimize service operations, and deliver exceptional experiences with AI-powered intelligence across your dealership.',
  badge: 'Automotive',
  title: 'AI Transformation for',
  titleHighlight: 'Automotive',
  subtitle: 'Unify customer data, optimize service operations, and deliver exceptional experiences with AI-powered intelligence across your dealership.',
  heroImage: '/images/industries/energy.png',
  heroWidget: {
    title: 'Dealership Intelligence',
    items: ['DMS Integration', 'Service Optimization', 'Lead Management', 'Inventory Analytics']
  },
  heroStats: [
    { value: '35%', label: 'Service Revenue Increase' },
    { value: '42%', label: 'Appointment Efficiency' },
    { value: '28%', label: 'Customer Retention Lift' },
    { value: '24/7', label: 'Customer Support' }
  ],
  problemTitle: 'Automotive Data is Disconnected',
  problemDescription: 'Customer data in DMS, service history in shop systems, sales in CRM. Without unified insights, you miss opportunities for service and retention.',
  bentoContent: {
    mainChallenge: {
      badge: 'Dealership Silos',
      title: 'Disconnected Customer View',
      description: 'DMS, CRM, and service systems living in isolation.'
    },
    radarChart: {
      categories: [
        { label: 'Service Rev', current: 55, potential: 90 },
        { label: 'Retention', current: 42, potential: 88 },
        { label: 'Bay Efficiency', current: 60, potential: 92 },
        { label: 'Parts Mgmt', current: 48, potential: 86 },
        { label: 'Customer Exp', current: 52, potential: 94 },
      ],
      colors: { current: '#f97316', potential: '#22d3ee' },
      style: 'default'
    },
    ringChart: {
      percentage: 42,
      title: 'Service Retention',
      description: 'Customers lost to competitors after warranty expires.',
      metric: 'Annual Loss',
      metricValue: '~$850K/year',
      color: 'orange'
    },
    barChart: {
      title: 'Service Appointment Fill Rate',
      description: 'Bay utilization throughout the week.',
      data: [
        { label: 'Mon', value: 92 },
        { label: 'Tue', value: 78 },
        { label: 'Wed', value: 65 },
        { label: 'Thu', value: 58 },
        { label: 'Fri', value: 85 }
      ],
      statusBadge: 'Midweek Gaps',
      statusColor: 'amber'
    }
  },
  challenges: [
    'Customer data fragmented across DMS, CRM, and service systems',
    'Service scheduling inefficiency and missed follow-ups',
    'No predictive insights for maintenance needs and customer churn',
    'Manual processes for appointment booking and reminders'
  ],
  solutionsTitle: 'Automotive-Specific AI Solutions',
  solutionsSubtitle: 'Purpose-built for dealership operations with customer intelligence and service optimization.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Customer Intelligence',
      description: 'Connect DMS, CRM, and service systems for a complete customer lifecycle view.',
      features: ['Customer 360° view', 'Vehicle history', 'Service predictions', 'Retention scoring']
    },
    {
      icon: FaRobot,
      title: 'Service Automation',
      description: 'AI-powered scheduling, reminders, and service recommendations.',
      features: ['Smart scheduling', 'Maintenance predictions', 'Automated reminders', 'Service marketing']
    },
    {
      icon: FaChartLine,
      title: 'Dealership Analytics',
      description: 'Real-time insights into sales, service, and customer satisfaction performance.',
      features: ['Sales analytics', 'Service profitability', 'CSI tracking', 'Staff performance']
    }
  ],
  resultsTitle: 'Measurable Automotive Impact',
  results: [
    { value: '35%', label: 'Service Revenue', suffix: '↑' },
    { value: '42%', label: 'Efficiency Gain', suffix: '↑' },
    { value: '28%', label: 'Customer Retention', suffix: '↑' },
    { value: '24/7', label: 'Availability' }
  ],
  useCasesTitle: 'Automotive Operations We Serve',
  useCases: [
    {
      icon: FaCar,
      title: 'New Car Dealerships',
      features: ['Sales intelligence', 'Lead management', 'F&I optimization', 'Customer follow-up']
    },
    {
      icon: FaWrench,
      title: 'Service Departments',
      features: ['Service scheduling', 'Parts forecasting', 'Tech efficiency', 'Warranty management']
    },
    {
      icon: FaClipboardCheck,
      title: 'Used Car Operations',
      features: ['Inventory analytics', 'Pricing optimization', 'Reconditioning tracking', 'Market intelligence']
    },
    {
      icon: FaTools,
      title: 'Auto Service Centers',
      features: ['Appointment management', 'Customer communications', 'Service recommendations', 'Review management']
    }
  ],
  ctaTitle: 'Ready to Transform Your Dealership?',
  ctaSubtitle: 'Schedule a consultation to see how AI can grow service revenue while improving retention.'
}

export const homeServicesData: IndustryData = {
  slug: 'home-services',
  seoTitle: 'AI Transformation for Home Services | Cognia AI',
  seoDescription: 'Unify customer data, optimize field operations, and deliver exceptional service with AI-powered intelligence across your business.',
  badge: 'Home Services',
  title: 'AI Transformation for',
  titleHighlight: 'Home Services',
  subtitle: 'Unify customer data, optimize field operations, and deliver exceptional service with AI-powered intelligence across your business.',
  heroImage: '/images/industries/public_sector.jpg',
  heroWidget: {
    title: 'Field Service Intelligence',
    items: ['Route Optimization', 'Dispatch AI', 'Customer Management', 'Technician Scheduling']
  },
  heroStats: [
    { value: '42%', label: 'Booking Conversion Lift' },
    { value: '35%', label: 'Dispatch Efficiency' },
    { value: '28%', label: 'Revenue per Tech' },
    { value: '24/7', label: 'Customer Support' }
  ],
  problemTitle: 'Home Services Data is Scattered',
  problemDescription: 'Customer calls in one system, scheduling in another, technician data in field service software. Without unified insights, you miss opportunities and lose efficiency.',
  bentoContent: {
    mainChallenge: {
      badge: 'Field Service Silos',
      title: 'Disconnected Operations',
      description: 'Dispatch, CRM, and technician data in separate systems.'
    },
    radarChart: {
      categories: [
        { label: 'Booking Rate', current: 58, potential: 95 },
        { label: 'Dispatch', current: 45, potential: 90 },
        { label: 'Tech Utilization', current: 62, potential: 92 },
        { label: 'First-Time Fix', current: 70, potential: 94 },
        { label: 'Customer Sat', current: 75, potential: 96 },
      ],
      colors: { current: '#ef4444', potential: '#10b981' },
      style: 'dots'
    },
    ringChart: {
      percentage: 38,
      title: 'Missed Calls',
      description: 'Potential revenue lost to unanswered calls and slow response.',
      metric: 'Lost Revenue',
      metricValue: '~$420K/year',
      color: 'red'
    },
    barChart: {
      title: 'Technician Utilization',
      description: 'Daily productivity across your field team.',
      data: [
        { label: 'Tech A', value: 72 },
        { label: 'Tech B', value: 85 },
        { label: 'Tech C', value: 58 },
        { label: 'Tech D', value: 91 },
        { label: 'Tech E', value: 64 }
      ],
      statusBadge: 'Route Gaps',
      statusColor: 'orange'
    }
  },
  challenges: [
    'Customer and job data fragmented across systems',
    'Missed calls leading to lost revenue',
    'Dispatch and routing inefficiency',
    'No visibility into technician performance and capacity'
  ],
  solutionsTitle: 'Home Services AI Solutions',
  solutionsSubtitle: 'Purpose-built for field service operations with customer intelligence and dispatch optimization.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Customer Intelligence',
      description: 'Connect CRM, field service, and communication systems for complete customer visibility.',
      features: ['Customer 360° view', 'Service history', 'Property data', 'Membership tracking']
    },
    {
      icon: FaRobot,
      title: 'Intelligent Booking',
      description: 'AI-powered call handling, scheduling, and dispatch optimization.',
      features: ['24/7 call handling', 'Smart scheduling', 'Route optimization', 'Capacity management']
    },
    {
      icon: FaChartLine,
      title: 'Operations Analytics',
      description: 'Real-time insights into technician performance, job profitability, and customer satisfaction.',
      features: ['Tech performance', 'Job profitability', 'Demand forecasting', 'Review analytics']
    }
  ],
  resultsTitle: 'Measurable Home Services Impact',
  results: [
    { value: '42%', label: 'Booking Conversion', suffix: '↑' },
    { value: '35%', label: 'Dispatch Efficiency', suffix: '↑' },
    { value: '28%', label: 'Revenue per Tech', suffix: '↑' },
    { value: '95%', label: 'Call Answer Rate' }
  ],
  useCasesTitle: 'Home Services We Serve',
  useCases: [
    {
      icon: FaPlug,
      title: 'Electrical Contractors',
      features: ['Job scheduling', 'Parts management', 'Permit tracking', 'Customer communications']
    },
    {
      icon: FaFire,
      title: 'Plumbing Services',
      features: ['Emergency dispatch', 'Recurring service', 'Estimate management', 'Follow-up automation']
    },
    {
      icon: FaSnowflake,
      title: 'HVAC Services',
      features: ['Maintenance contracts', 'Seasonal forecasting', 'Equipment tracking', 'Service reminders']
    },
    {
      icon: FaHome,
      title: 'General Contractors',
      features: ['Project management', 'Subcontractor coordination', 'Customer updates', 'Document management']
    }
  ],
  ctaTitle: 'Ready to Grow Your Business?',
  ctaSubtitle: 'Schedule a consultation to see how AI can increase bookings while improving efficiency.'
}

export const technologyData: IndustryData = {
  slug: 'technology',
  seoTitle: 'AI Transformation for Technology Companies | Cognia AI',
  seoDescription: 'Unify product data, optimize engineering operations, and accelerate innovation with AI-powered intelligence across your technology organization.',
  badge: 'Technology & Software',
  title: 'AI Transformation for',
  titleHighlight: 'Technology',
  subtitle: 'Unify product data, optimize engineering operations, and accelerate innovation with AI-powered intelligence across your technology organization.',
  heroImage: '/images/industries/technology.jpg',
  heroWidget: {
    title: 'Tech Intelligence Platform',
    items: ['DevOps Integration', 'Product Analytics', 'Engineering Insights', 'Customer Intelligence']
  },
  heroStats: [
    { value: '40%', label: 'Faster Time-to-Market' },
    { value: '65%', label: 'Reduced Support Tickets' },
    { value: '3.2x', label: 'Developer Productivity' },
    { value: '99.9%', label: 'System Uptime' }
  ],
  problemTitle: 'Technology Data is Fragmented',
  problemDescription: 'Product metrics in one tool, engineering data in another, customer feedback scattered across platforms. Without unified insights, innovation suffers.',
  bentoContent: {
    mainChallenge: {
      badge: 'Tech Silos',
      title: 'Disconnected Systems',
      description: 'Engineering, product, and customer data in separate tools.'
    },
    radarChart: {
      categories: [
        { label: 'Dev Velocity', current: 55, potential: 92 },
        { label: 'Code Quality', current: 68, potential: 95 },
        { label: 'Observability', current: 45, potential: 90 },
        { label: 'Customer Intel', current: 35, potential: 88 },
        { label: 'Release Speed', current: 50, potential: 94 },
      ],
      colors: { current: '#3b82f6', potential: '#a855f7' },
      style: 'neon'
    },
    ringChart: {
      percentage: 45,
      title: 'Context Switching',
      description: 'Developer time lost navigating fragmented toolchains.',
      metric: 'Productivity Loss',
      metricValue: '~18hrs/week',
      color: 'blue'
    },
    barChart: {
      title: 'Tool Fragmentation',
      description: 'Data spread across your technology stack.',
      data: [
        { label: 'Dev Tools', value: 85 },
        { label: 'Analytics', value: 72 },
        { label: 'Support', value: 68 },
        { label: 'Product', value: 78 },
        { label: 'Ops', value: 90 }
      ],
      statusBadge: 'High Fragmentation',
      statusColor: 'blue'
    }
  },
  challenges: [
    'Product and engineering data siloed across multiple platforms',
    'No unified view of customer usage and feedback',
    'Manual processes for reporting and incident response',
    'Difficulty connecting business outcomes to engineering efforts'
  ],
  solutionsTitle: 'Technology-Specific AI Solutions',
  solutionsSubtitle: 'Purpose-built for software companies with engineering intelligence at the core.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Product Intelligence',
      description: 'Connect product analytics, engineering metrics, and customer data into one platform.',
      features: ['Product analytics', 'Usage tracking', 'Feature adoption', 'Customer health']
    },
    {
      icon: FaBrain,
      title: 'Engineering Insights',
      description: 'AI-powered analysis of development velocity, code quality, and team performance.',
      features: ['Velocity tracking', 'Code quality', 'Sprint analytics', 'Bottleneck detection']
    },
    {
      icon: FaRobot,
      title: 'Intelligent Automation',
      description: 'Automate support, incident response, and customer communications at scale.',
      features: ['Support automation', 'Incident triage', 'Customer onboarding', 'Documentation AI']
    }
  ],
  resultsTitle: 'Measurable Technology Impact',
  results: [
    { value: '40%', label: 'Faster Releases', suffix: '↑' },
    { value: '65%', label: 'Fewer Tickets', suffix: '↓' },
    { value: '3.2x', label: 'Dev Productivity' },
    { value: '99.9%', label: 'Uptime' }
  ],
  testimonial: {
    quote: 'Working with Cognia has been a game-changer for our office. What I appreciate the most is how they completely transformed our Monday mornings. Now, with Cognia, we receive a clear email summary along with call transcripts first thing in the morning. This lets us immediately prioritize call-backs without wasting time.',
    author: 'Jacob Ojalvo',
    role: 'Owner',
    company: 'My Smile Miami'
  },
  useCasesTitle: 'Technology Companies We Serve',
  useCases: [
    {
      icon: FaBrain,
      title: 'SaaS Companies',
      features: ['Usage analytics', 'Churn prediction', 'Feature adoption', 'Customer health scoring']
    },
    {
      icon: FaCogs,
      title: 'Engineering Teams',
      features: ['Velocity tracking', 'Code quality', 'Sprint analytics', 'Resource planning']
    },
    {
      icon: FaUsers,
      title: 'Product Teams',
      features: ['Feature analytics', 'User feedback', 'A/B testing', 'Roadmap intelligence']
    },
    {
      icon: FaDatabase,
      title: 'Platform Companies',
      features: ['API analytics', 'Partner metrics', 'Integration tracking', 'Developer experience']
    }
  ],
  ctaTitle: 'Ready to Accelerate Innovation?',
  ctaSubtitle: 'Schedule a consultation to see how AI can improve engineering velocity while reducing overhead.'
}

export const financialServicesData: IndustryData = {
  slug: 'financial-services',
  seoTitle: 'AI Transformation for Financial Services | Cognia AI',
  seoDescription: 'Unify client data, automate compliance workflows, and deliver personalized experiences with AI-powered intelligence across your financial institution.',
  badge: 'Financial Services',
  title: 'AI Transformation for',
  titleHighlight: 'Financial Services',
  subtitle: 'Unify client data, automate compliance workflows, and deliver personalized experiences with AI-powered intelligence across your financial institution.',
  heroImage: '/images/industries/financial_services.png',
  heroWidget: {
    title: 'Financial Intelligence',
    items: ['Client 360°', 'Compliance AI', 'Risk Analytics', 'Process Automation']
  },
  heroStats: [
    { value: '55%', label: 'Compliance Time Saved' },
    { value: '38%', label: 'Client Retention Lift' },
    { value: '$2.1M', label: 'Annual Savings' },
    { value: '100%', label: 'Audit Ready' }
  ],
  problemTitle: 'Financial Data is Siloed',
  problemDescription: 'Client information in core banking, compliance docs scattered, portfolio data in legacy systems. Without unified insights, risk management and client service suffer.',
  bentoContent: {
    mainChallenge: {
      badge: 'Data Silos',
      title: 'Fragmented Client View',
      description: 'Core banking, CRM, and compliance in separate systems.'
    },
    radarChart: {
      categories: [
        { label: 'Compliance', current: 45, potential: 98 },
        { label: 'Client 360', current: 38, potential: 92 },
        { label: 'Risk Mgmt', current: 55, potential: 94 },
        { label: 'Automation', current: 28, potential: 90 },
        { label: 'Reporting', current: 42, potential: 96 },
      ],
      colors: { current: '#8b5cf6', potential: '#0ea5e9' },
      style: 'gradient'
    },
    ringChart: {
      percentage: 55,
      title: 'Compliance Overhead',
      description: 'Staff time consumed by manual compliance and reporting.',
      metric: 'Annual Cost',
      metricValue: '$2.1M/year',
      color: 'purple'
    },
    barChart: {
      title: 'Process Automation',
      description: 'Manual vs. automated financial workflows.',
      data: [
        { label: 'KYC', value: 35 },
        { label: 'Reporting', value: 42 },
        { label: 'Onboard', value: 28 },
        { label: 'Reviews', value: 55 },
        { label: 'Audits', value: 45 }
      ],
      statusBadge: 'Mostly Manual',
      statusColor: 'purple'
    }
  },
  challenges: [
    'Client data scattered across core banking and CRM systems',
    'Manual compliance and regulatory reporting processes',
    'No unified view of client relationships and risk',
    'Legacy systems limiting digital transformation'
  ],
  solutionsTitle: 'Financial Services AI Solutions',
  solutionsSubtitle: 'Purpose-built for financial institutions with compliance and security at the core.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Client Intelligence',
      description: 'Connect core banking, CRM, and portfolio systems for complete client visibility.',
      features: ['Client 360° view', 'Relationship mapping', 'Wallet share analysis', 'Next-best-action']
    },
    {
      icon: FaChartLine,
      title: 'Compliance Automation',
      description: 'AI-powered compliance workflows for KYC, AML, and regulatory reporting.',
      features: ['KYC automation', 'AML monitoring', 'Regulatory reporting', 'Audit trails']
    },
    {
      icon: FaRobot,
      title: 'Intelligent Service',
      description: 'Automate client service, onboarding, and relationship management at scale.',
      features: ['Client onboarding', 'Service automation', 'Advisor intelligence', 'Document processing']
    }
  ],
  resultsTitle: 'Measurable Financial Impact',
  results: [
    { value: '55%', label: 'Compliance Saved', suffix: '↑' },
    { value: '38%', label: 'Client Retention', suffix: '↑' },
    { value: '75%', label: 'Faster Onboarding' },
    { value: '$2.1M', label: 'Annual Savings' }
  ],
  testimonial: {
    quote: 'After we switched to Cognia AI, the whole situation changed. Calls actually get answered now, even when we\'re tied up or out on the road, and customers get a response right away instead of voicemail. Over the last few weeks, we\'ve noticed a pretty clear bump in jobs coming in. You stop missing calls, you stop missing work.',
    author: 'Elite Auto Repair',
    role: 'Auto Repair Shop',
    company: 'Automotive'
  },
  useCasesTitle: 'Financial Institutions We Serve',
  useCases: [
    {
      icon: FaBriefcase,
      title: 'Wealth Management',
      features: ['Client analytics', 'Portfolio insights', 'Advisor productivity', 'Compliance tracking']
    },
    {
      icon: FaChartLine,
      title: 'Banking',
      features: ['Customer 360°', 'Risk management', 'Process automation', 'Branch analytics']
    },
    {
      icon: FaFileContract,
      title: 'Insurance',
      features: ['Claims analytics', 'Underwriting AI', 'Customer service', 'Fraud detection']
    },
    {
      icon: FaHandshake,
      title: 'Credit Unions',
      features: ['Member intelligence', 'Loan processing', 'Service automation', 'Community insights']
    }
  ],
  ctaTitle: 'Ready to Transform Your Institution?',
  ctaSubtitle: 'Schedule a consultation to see how AI can improve compliance while enhancing client relationships.'
}

export const energyData: IndustryData = {
  slug: 'energy',
  seoTitle: 'AI Transformation for Energy & Utilities | Cognia AI',
  seoDescription: 'Unify operational data, optimize grid performance, and improve customer service with AI-powered intelligence across your energy organization.',
  badge: 'Energy & Utilities',
  title: 'AI Transformation for',
  titleHighlight: 'Energy & Utilities',
  subtitle: 'Unify operational data, optimize grid performance, and improve customer service with AI-powered intelligence across your energy organization.',
  heroImage: '/images/industries/energy.png',
  heroWidget: {
    title: 'Energy Intelligence',
    items: ['Grid Analytics', 'Asset Management', 'Customer Service', 'Demand Forecasting']
  },
  heroStats: [
    { value: '28%', label: 'Outage Reduction' },
    { value: '42%', label: 'Service Efficiency' },
    { value: '$3.5M', label: 'Annual Savings' },
    { value: '99.5%', label: 'Grid Reliability' }
  ],
  problemTitle: 'Energy Data is Disconnected',
  problemDescription: 'Grid data in SCADA systems, customer info in CIS, field operations in separate tools. Without unified insights, reliability and efficiency suffer.',
  bentoContent: {
    mainChallenge: {
      badge: 'Utility Silos',
      title: 'Disconnected Operations',
      description: 'SCADA, CIS, and field systems in isolation.'
    },
    radarChart: {
      categories: [
        { label: 'Grid Reliability', current: 72, potential: 99 },
        { label: 'Asset Health', current: 55, potential: 92 },
        { label: 'Outage Response', current: 60, potential: 95 },
        { label: 'Customer Svc', current: 48, potential: 90 },
        { label: 'Sustainability', current: 40, potential: 88 },
      ],
      colors: { current: '#f97316', potential: '#22c55e' },
      style: 'glow'
    },
    ringChart: {
      percentage: 35,
      title: 'Unplanned Outages',
      description: 'Grid failures from reactive vs. predictive maintenance.',
      metric: 'Customer Impact',
      metricValue: '~45K hrs/year',
      color: 'orange'
    },
    barChart: {
      title: 'Asset Health by Region',
      description: 'Infrastructure condition across service territory.',
      data: [
        { label: 'North', value: 72 },
        { label: 'South', value: 58 },
        { label: 'East', value: 85 },
        { label: 'West', value: 64 },
        { label: 'Central', value: 78 }
      ],
      statusBadge: 'Aging Infrastructure',
      statusColor: 'orange'
    }
  },
  challenges: [
    'Operational data siloed across SCADA, GIS, and CIS systems',
    'Reactive maintenance leading to unplanned outages',
    'Customer service disconnected from field operations',
    'Difficulty meeting regulatory and sustainability requirements'
  ],
  solutionsTitle: 'Energy-Specific AI Solutions',
  solutionsSubtitle: 'Purpose-built for utilities with grid reliability and customer service at the core.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Grid Intelligence',
      description: 'Connect SCADA, GIS, CIS, and field systems for complete operational visibility.',
      features: ['Real-time monitoring', 'Asset health', 'Outage prediction', 'Load forecasting']
    },
    {
      icon: FaChartLine,
      title: 'Predictive Maintenance',
      description: 'AI-powered asset management that prevents failures before they impact customers.',
      features: ['Failure prediction', 'Maintenance optimization', 'Parts forecasting', 'Crew scheduling']
    },
    {
      icon: FaRobot,
      title: 'Customer Service AI',
      description: 'Intelligent automation for outage communication, billing, and service requests.',
      features: ['Outage updates', 'Billing inquiries', 'Service scheduling', 'Usage insights']
    }
  ],
  resultsTitle: 'Measurable Energy Impact',
  results: [
    { value: '28%', label: 'Fewer Outages', suffix: '↓' },
    { value: '42%', label: 'Service Efficiency', suffix: '↑' },
    { value: '35%', label: 'Maintenance Costs', suffix: '↓' },
    { value: '$3.5M', label: 'Annual Savings' }
  ],
  testimonial: {
    quote: 'Working with Cognia has been a game-changer for our office. What I appreciate the most is how they completely transformed our Monday mornings. Now, with Cognia, we receive a clear email summary along with call transcripts first thing in the morning. This lets us immediately prioritize call-backs without wasting time.',
    author: 'Jacob Ojalvo',
    role: 'Owner',
    company: 'My Smile Miami'
  },
  useCasesTitle: 'Energy Organizations We Serve',
  useCases: [
    {
      icon: FaCogs,
      title: 'Electric Utilities',
      features: ['Grid analytics', 'Outage management', 'Load forecasting', 'Asset optimization']
    },
    {
      icon: FaFire,
      title: 'Gas Utilities',
      features: ['Pipeline monitoring', 'Leak detection', 'Meter analytics', 'Safety compliance']
    },
    {
      icon: FaLeaf,
      title: 'Renewable Energy',
      features: ['Generation forecasting', 'Storage optimization', 'Grid integration', 'Carbon tracking']
    },
    {
      icon: FaTruck,
      title: 'Field Operations',
      features: ['Crew optimization', 'Work management', 'Vehicle routing', 'Mobile workforce']
    }
  ],
  ctaTitle: 'Ready to Modernize Your Grid?',
  ctaSubtitle: 'Schedule a consultation to see how AI can improve reliability while reducing costs.'
}

export const publicSectorData: IndustryData = {
  slug: 'public-sector',
  seoTitle: 'AI Transformation for Public Sector | Cognia AI',
  seoDescription: 'Unify citizen data, streamline government services, and improve operational efficiency with AI-powered intelligence across your public organization.',
  badge: 'Public Sector',
  title: 'AI Transformation for',
  titleHighlight: 'Public Sector',
  subtitle: 'Unify citizen data, streamline government services, and improve operational efficiency with AI-powered intelligence across your public organization.',
  heroImage: '/images/industries/public_sector.jpg',
  heroWidget: {
    title: 'Government Intelligence',
    items: ['Citizen Services', 'Process Automation', 'Data Integration', 'Compliance Ready']
  },
  heroStats: [
    { value: '65%', label: 'Faster Case Resolution' },
    { value: '45%', label: 'Cost Reduction' },
    { value: '92%', label: 'Citizen Satisfaction' },
    { value: '100%', label: 'Compliance' }
  ],
  problemTitle: 'Government Data is Fragmented',
  problemDescription: 'Citizen records in legacy systems, case data scattered across departments, communications in silos. Without unified insights, service delivery suffers.',
  bentoContent: {
    mainChallenge: {
      badge: 'Agency Silos',
      title: 'Disconnected Departments',
      description: 'Citizen data isolated across agencies and systems.'
    },
    radarChart: {
      categories: [
        { label: 'Service Speed', current: 35, potential: 90 },
        { label: 'Accessibility', current: 42, potential: 95 },
        { label: 'Transparency', current: 55, potential: 92 },
        { label: 'Digital Adopt', current: 38, potential: 88 },
        { label: 'Compliance', current: 70, potential: 98 },
      ],
      colors: { current: '#3b82f6', potential: '#14b8a6' },
      style: 'minimal'
    },
    ringChart: {
      percentage: 48,
      title: 'Process Delays',
      description: 'Service requests delayed by manual workflows and data gaps.',
      metric: 'Avg Wait Time',
      metricValue: '~14 days',
      color: 'blue'
    },
    barChart: {
      title: 'Digital Adoption',
      description: 'Online vs. in-person service utilization.',
      data: [
        { label: 'Permits', value: 35 },
        { label: 'Licenses', value: 42 },
        { label: 'Benefits', value: 28 },
        { label: 'Records', value: 55 },
        { label: 'Payments', value: 68 }
      ],
      statusBadge: 'Low Digital Adoption',
      statusColor: 'blue'
    }
  },
  challenges: [
    'Citizen data fragmented across departments and legacy systems',
    'Manual processes slowing service delivery',
    'Difficulty meeting accessibility and compliance requirements',
    'Limited visibility into cross-agency operations'
  ],
  solutionsTitle: 'Public Sector AI Solutions',
  solutionsSubtitle: 'Purpose-built for government with security, compliance, and accessibility at the core.',
  solutions: [
    {
      icon: FaDatabase,
      title: 'Unified Citizen Intelligence',
      description: 'Connect systems across departments for complete citizen service visibility.',
      features: ['Citizen 360° view', 'Case management', 'Service history', 'Cross-agency data']
    },
    {
      icon: FaRobot,
      title: 'Service Automation',
      description: 'AI-powered citizen services for permits, licenses, and benefits processing.',
      features: ['Intake automation', 'Document processing', 'Status updates', 'Self-service portal']
    },
    {
      icon: FaChartLine,
      title: 'Operations Analytics',
      description: 'Real-time insights into service delivery, resource allocation, and citizen satisfaction.',
      features: ['Performance metrics', 'Resource planning', 'Citizen feedback', 'Compliance tracking']
    }
  ],
  resultsTitle: 'Measurable Public Sector Impact',
  results: [
    { value: '65%', label: 'Faster Resolution', suffix: '↑' },
    { value: '45%', label: 'Cost Reduction', suffix: '↓' },
    { value: '92%', label: 'Citizen Satisfaction' },
    { value: '24/7', label: 'Service Access' }
  ],
  testimonial: {
    quote: 'After we switched to Cognia AI, the whole situation changed. Calls actually get answered now, even when we\'re tied up or out on the road, and customers get a response right away instead of voicemail. Over the last few weeks, we\'ve noticed a pretty clear bump in jobs coming in. You stop missing calls, you stop missing work.',
    author: 'Elite Auto Repair',
    role: 'Auto Repair Shop',
    company: 'Automotive'
  },
  useCasesTitle: 'Public Organizations We Serve',
  useCases: [
    {
      icon: FaGavel,
      title: 'State & Local Government',
      features: ['Citizen services', 'Permit automation', 'License processing', 'Records management']
    },
    {
      icon: FaBalanceScale,
      title: 'Courts & Legal',
      features: ['Case management', 'Document processing', 'Scheduling', 'Public access']
    },
    {
      icon: FaUsers,
      title: 'Social Services',
      features: ['Benefits processing', 'Case coordination', 'Client tracking', 'Outcome analytics']
    },
    {
      icon: FaShieldAlt,
      title: 'Public Safety',
      features: ['Dispatch optimization', 'Records integration', 'Community engagement', 'Resource planning']
    }
  ],
  ctaTitle: 'Ready to Modernize Government Services?',
  ctaSubtitle: 'Schedule a consultation to see how AI can improve citizen service while reducing costs.'
}

// Export all industry data
export const allIndustryData: Record<string, IndustryData> = {
  healthcare: healthcareData,
  manufacturing: manufacturingData,
  hospitality: hospitalityData,
  agriculture: agricultureData,
  retail: retailData,
  'professional-services': professionalServicesData,
  legal: legalData,
  automotive: automotiveData,
  'home-services': homeServicesData,
  technology: technologyData,
  'financial-services': financialServicesData,
  energy: energyData,
  'public-sector': publicSectorData
}
