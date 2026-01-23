import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://cogniaai.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/sign-in/',
          '/sign-up/',
          '/sso-callback/',
          '/_next/',
          '/chat/',
          '/*.json$',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/industries/',
          '/features/',
          '/usecases/',
          '/products/',
          '/solutions/',
          '/about/',
          '/contact/',
          '/demo/',
        ],
        disallow: [
          '/api/',
          '/sign-in/',
          '/sign-up/',
          '/sso-callback/',
          '/chat/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/*.png$',
          '/*.jpg$',
          '/*.jpeg$',
          '/*.gif$',
          '/*.webp$',
          '/*.svg$',
        ],
        disallow: [
          '/api/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/sign-in/',
          '/sign-up/',
          '/sso-callback/',
          '/chat/',
        ],
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        disallow: [
          '/api/',
          '/sign-in/',
          '/sign-up/',
          '/chat/',
        ],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: [
          '/api/',
          '/sign-in/',
          '/sign-up/',
          '/chat/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/about/',
          '/solutions/',
          '/industries/',
          '/features/',
          '/usecases/',
          '/products/',
        ],
        disallow: [
          '/api/',
          '/sign-in/',
          '/sign-up/',
          '/chat/',
          '/contact/',
        ],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: [
          '/api/',
          '/sign-in/',
          '/sign-up/',
          '/chat/',
        ],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: [
          '/api/',
          '/sign-in/',
          '/sign-up/',
          '/chat/',
        ],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: [
          '/api/',
          '/sign-in/',
          '/sign-up/',
          '/chat/',
        ],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: [
          '/api/',
          '/sign-in/',
          '/sign-up/',
          '/chat/',
        ],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: [
          '/api/',
          '/sign-in/',
          '/sign-up/',
          '/chat/',
        ],
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: ['/api/', '/sign-in/', '/sign-up/'],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: ['/api/', '/sign-in/', '/sign-up/'],
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: ['/api/', '/sign-in/', '/sign-up/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
