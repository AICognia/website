export const generateArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  author: {
    '@type': 'Person',
    name: article.author
  },
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  image: article.image || 'https://cogniaai.com/og-image.png',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url
  },
  publisher: {
    '@type': 'Organization',
    name: 'Cognia AI',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cogniaai.com/logo512.png'
    }
  }
});

export const generateEventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: {
    name: string;
    address?: string;
  };
  url?: string;
  organizer?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.name,
  description: event.description,
  startDate: event.startDate,
  endDate: event.endDate || event.startDate,
  location: event.location ? {
    '@type': 'Place',
    name: event.location.name,
    address: event.location.address ? {
      '@type': 'PostalAddress',
      streetAddress: event.location.address
    } : undefined
  } : {
    '@type': 'VirtualLocation',
    url: event.url || 'https://cogniaai.com'
  },
  organizer: {
    '@type': 'Organization',
    name: event.organizer || 'Cognia AI'
  }
});

export const generateReviewSchema = (review: {
  itemName: string;
  reviewerName: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'Service',
    name: review.itemName
  },
  author: {
    '@type': 'Person',
    name: review.reviewerName
  },
  reviewBody: review.reviewBody,
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.ratingValue,
    bestRating: 5,
    worstRating: 1
  },
  datePublished: review.datePublished
});

export const generateHowToSchema = (howTo: {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: howTo.name,
  description: howTo.description,
  totalTime: howTo.totalTime,
  step: howTo.steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
    image: step.image
  }))
});

export const generateVideoSchema = (video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: video.name,
  description: video.description,
  thumbnailUrl: video.thumbnailUrl,
  uploadDate: video.uploadDate,
  duration: video.duration,
  contentUrl: video.contentUrl,
  embedUrl: video.embedUrl,
  publisher: {
    '@type': 'Organization',
    name: 'Cognia AI',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cogniaai.com/logo512.png'
    }
  }
});

export const generateSoftwareApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Cognia AI Platform',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    priceValidUntil: '2025-12-31'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '245'
  },
  author: {
    '@type': 'Organization',
    name: 'Cognia AI'
  },
  softwareVersion: '2.0',
  datePublished: '2023-01-01',
  downloadUrl: 'https://cogniaai.com/platform',
  screenshot: 'https://cogniaai.com/screenshot.png',
  featureList: [
    'AI Voice Agents',
    'Multi-channel Chatbots',
    'Real-time Analytics',
    'CRM Integration',
    '45+ Language Support',
    'Enterprise Security'
  ]
});
