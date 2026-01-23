/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
      {
        source: '/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      },
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      },
    ]
  },

  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/services', destination: '/solutions', permanent: true },
      { source: '/pricing', destination: '/demo', permanent: false },
      { source: '/usecases/customer-support', destination: '/usecases/CustomerSupport', permanent: true },
      { source: '/usecases/after-hours-service', destination: '/usecases/AfterHoursService', permanent: true },
      { source: '/usecases/client-intake', destination: '/usecases/ClientIntake', permanent: true },
      { source: '/usecases/lead-qualification', destination: '/usecases/LeadQualification', permanent: true },
      { source: '/usecases/order-processing', destination: '/usecases/OrderProcessing', permanent: true },
      { source: '/usecases/patient-scheduling', destination: '/usecases/PatientScheduling', permanent: true },
      { source: '/features/natural-conversations', destination: '/features/NaturalConversations', permanent: true },
      { source: '/features/smart-scheduling', destination: '/features/SmartScheduling', permanent: true },
      { source: '/features/call-handling', destination: '/features/CallHandling', permanent: true },
      { source: '/features/analytics-dashboard', destination: '/features/AnalyticsDashboard', permanent: true },
      { source: '/features/multi-language', destination: '/features/MultiLanguage', permanent: true },
      { source: '/features/crm-integration', destination: '/features/CRMIntegration', permanent: true },
      { source: '/industries/home-services', destination: '/industries/HomeServices', permanent: true },
      { source: '/use-cases/:path*', destination: '/usecases/:path*', permanent: true },
      { source: '/feature/:path*', destination: '/features/:path*', permanent: true },
      { source: '/industry/:path*', destination: '/industries/:path*', permanent: true },
      { source: '/:path+/', destination: '/:path+', permanent: true },
    ]
  },
}

module.exports = nextConfig
