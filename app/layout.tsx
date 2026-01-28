import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Source_Serif_4 } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ClerkProviderWrapper } from '@/src/providers/ClerkProviderWrapper'
import { LanguageProvider } from '@/src/contexts/LanguageContext'
import { LeadCaptureProvider } from '@/src/contexts/LeadCaptureContext'
import Navbar from '@/src/components/Navbar'
import MobileNavbar from '@/src/components/MobileNavbar'
import Footer from '@/src/components/Footer'
import CookieConsentBanner from '@/src/components/CookieConsent'
import StickyMobileCTA from '@/src/components/StickyMobileCTA'
import { VideoProvider } from '@/src/contexts/VideoContext'
import { HelmetClientProvider } from '@/src/providers/HelmetClientProvider'
// TactileBackground removed - redundant with HeroBackgroundGrid, was causing double canvas rendering
// import TactileBackground from '@/src/components/TactileBackground'
import { ThemeProvider } from '@/src/providers/ThemeProvider'
import DarkModeToggle from '@/src/components/DarkModeToggle'

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Reduced from 6 weights to 3 for ~60% smaller font payload
})

export const metadata: Metadata = {
  title: {
    default: 'Cognia AI - AI Transformation Agency | From Data Chaos to Strategic Clarity',
    template: '%s | Cognia AI'
  },
  description: 'AI transformation agency turning data chaos into strategic clarity. Automate workflows, empower teams, accelerate growth.',
  keywords: [
    // Primary keywords
    'AI transformation agency', 'data intelligence', 'AI solutions', 'business automation',
    // Service keywords
    'AI consulting', 'workflow automation', 'AI deployment', 'enterprise AI', 'data analytics AI',
    // Feature keywords
    'AI integration', 'CRM automation', 'business intelligence', 'predictive analytics',
    // Industry keywords
    'healthcare AI', 'legal AI', 'hospitality AI', 'retail AI', 'enterprise AI solutions',
    // Geographic keywords
    'US AI company', 'Turkey AI company', 'Cognia AI', 'AI consultancy',
    // Benefit keywords
    'strategic clarity', 'data-driven decisions', 'AI automation', 'digital transformation'
  ],
  authors: [{ name: 'Cognia AI', url: 'https://cogniaai.com' }],
  creator: 'Cognia AI',
  publisher: 'Cognia AI',
  metadataBase: new URL('https://cogniaai.com'),
  applicationName: 'Cognia AI',
  category: 'Technology',
  classification: 'Business Software',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['tr_TR'],
    url: 'https://cogniaai.com',
    siteName: 'Cognia AI',
    title: 'Cognia AI - AI Transformation Agency | Data to Strategic Clarity',
    description: 'AI transformation agency that designs and deploys solutions to automate workflows, empower teams, and accelerate business growth.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cognia AI - AI Transformation Agency',
        type: 'image/png',
      },
    ],
    countryName: 'United States',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cognia_ai',
    creator: '@cognia_ai',
    title: 'Cognia AI - From Data Chaos to Strategic Clarity',
    description: 'AI transformation agency. Automate workflows, empower teams, accelerate growth. Enterprise-grade solutions.',
    images: {
      url: '/og-image.png',
      alt: 'Cognia AI - AI Transformation Agency',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'googlea9ba80c2320d77e2',
  },
  alternates: {
    canonical: 'https://cogniaai.com',
    languages: {
      'en-US': 'https://cogniaai.com',
      'tr-TR': 'https://cogniaai.com?lang=tr',
    },
  },
  other: {
    'msapplication-TileColor': '#162B4D',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Blocking script to prevent theme flash - runs before any paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var d = document.documentElement;
                var stored = null;
                try { stored = localStorage.getItem('theme'); } catch(e) {}
                var theme = stored || 'dark';
                d.classList.remove('dark', 'light');
                d.classList.add(theme);
                d.style.colorScheme = theme;
                d.style.backgroundColor = theme === 'dark' ? '#111827' : '#ffffff';
                d.setAttribute('data-theme', theme);
                window.__theme = theme;
              })();
            `,
          }}
        />
        {/* Preconnect to critical third-party origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS prefetch for additional third-party domains */}
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://platform.twitter.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />

        {/* Meta Pixel Code moved to afterInteractive for better performance */}

        {/* Note: og-image.png is not preloaded as it's only needed for social sharing metadata */}

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* PWA and mobile optimization */}
        <meta name="theme-color" content="#162B4D" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cognia AI" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Additional SEO meta tags */}
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
      </head>
      <body className={`${inter.variable} ${sourceSerif.variable}`}>
        {/* Meta Pixel - deferred to afterInteractive for better TTI */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              var pixelId = '${process.env.NEXT_PUBLIC_META_PIXEL_ID || ''}';
              if (pixelId) {
                fbq('init', pixelId);
                fbq('track', 'PageView');
              }
            `,
          }}
        />
        {/* Skip to main content link for accessibility - visible on focus */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#162B4D] focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#162B4D] transition-all"
        >
          Skip to main content
        </a>
        <ClerkProviderWrapper>
        <ThemeProvider>
          <HelmetClientProvider>
            <LanguageProvider>
              <LeadCaptureProvider>
                <VideoProvider>
                  {/* TactileBackground removed for performance - was running 60fps canvas globally */}
                  <DarkModeToggle />
                  <div className="w-full min-h-screen relative mesh-gradient">
                    {/* Level 2: Centering wrapper */}
                    <div className="relative flex flex-col justify-start items-center w-full">
                      {/* Level 3: Main content container - removed max-width to allow overflow */}
                      <div className="w-full relative flex flex-col justify-start items-start min-h-screen">
                        {/* Level 4: Actual content */}
                        <div className="w-full relative z-10 flex flex-col flex-grow">
                          <div className="w-full relative">
                            <MobileNavbar />
                            <div className="hidden lg:block">
                              <Navbar />
                            </div>
                          </div>
                          <main id="main-content" className="flex-grow" role="main" aria-label="Main content">
                            {children}
                          </main>
                          <Footer />
                          <CookieConsentBanner />
                          <StickyMobileCTA />
                        </div>
                      </div>
                    </div>
                  </div>
                </VideoProvider>
              </LeadCaptureProvider>
            </LanguageProvider>
          </HelmetClientProvider>
        </ThemeProvider>
        </ClerkProviderWrapper>
      </body>
    </html>
  )
}

