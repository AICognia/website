import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaSpinner, FaCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import conversionTracker from '../utils/conversionTracking';

// Helper function to get cookie value by name
const getCookie = (name: string): string => {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue || '';
    }
    return '';
  } catch (e) {
    console.warn('Failed to read cookie:', name, e);
    return '';
  }
};

// Generate fbc from fbclid if cookie doesn't exist
// Format: fb.1.{timestamp}.{fbclid}
const generateFbc = (fbclid: string): string => {
  if (!fbclid) return '';
  const timestamp = Date.now();
  return `fb.1.${timestamp}.${fbclid}`;
};

const features = [
  'AI-powered call handling 24/7',
  'Seamless calendar integration',
  'Natural, human-like conversations',
  'Custom training for your business',
];

const trustedIndustries = [
  'Healthcare',
  'Legal',
  'Retail',
  'Enterprise',
  'Hospitality',
  'Automotive',
  'Home Services',
];

const Demo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Capture all attribution signals using ref (not state) for reliability
  const attributionDataRef = useRef({
    landing_url: typeof window !== 'undefined' ? window.location.href : '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    fbclid: '',
    gclid: '',
    referrer: '',
    // Meta CAPI required fields
    fbp: '', // _fbp cookie from Meta Pixel
    fbc: '', // _fbc cookie or generated from fbclid
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  });

  // Capture attribution signals on page load with localStorage backup
  useEffect(() => {
    const STORAGE_KEY = 'cognia_attribution';
    const EXPIRY_MS = 86400000; // 24 hours

    // Extract current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const currentFbclid = urlParams.get('fbclid') || '';

    // Capture Meta Pixel cookies (fbp and fbc)
    const fbpCookie = getCookie('_fbp'); // Set by Meta Pixel
    const fbcCookie = getCookie('_fbc'); // Set by Meta Pixel or generated from fbclid
    // If fbc cookie doesn't exist but we have fbclid, generate fbc
    const fbcValue = fbcCookie || generateFbc(currentFbclid);

    // Capture current page signals
    const currentSignals = {
      landing_url: window.location.href,
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || '',
      fbclid: currentFbclid,
      gclid: urlParams.get('gclid') || '',
      referrer: document.referrer || '',
      // Meta CAPI fields - captured fresh on each page load
      fbp: fbpCookie,
      fbc: fbcValue,
      user_agent: navigator.userAgent || '',
      timestamp: Date.now(),
    };

    // Check if we have any meaningful signals from current URL
    const hasCurrentSignals = currentSignals.utm_source || currentSignals.fbclid ||
                              currentSignals.gclid || currentSignals.referrer;

    // Try to restore from localStorage if current signals are empty
    let finalSignals = { ...currentSignals };

    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        const isRecent = (Date.now() - parsed.timestamp) < EXPIRY_MS;

        if (isRecent) {
          // Merge: use current signals if present, otherwise fall back to stored
          // Note: fbp, fbc, user_agent are always captured fresh (not from storage)
          finalSignals = {
            landing_url: currentSignals.landing_url || parsed.landing_url || '',
            utm_source: currentSignals.utm_source || parsed.utm_source || '',
            utm_medium: currentSignals.utm_medium || parsed.utm_medium || '',
            utm_campaign: currentSignals.utm_campaign || parsed.utm_campaign || '',
            utm_content: currentSignals.utm_content || parsed.utm_content || '',
            utm_term: currentSignals.utm_term || parsed.utm_term || '',
            fbclid: currentSignals.fbclid || parsed.fbclid || '',
            gclid: currentSignals.gclid || parsed.gclid || '',
            referrer: currentSignals.referrer || parsed.referrer || '',
            // Meta CAPI fields - always use current values (cookies are session-specific)
            fbp: currentSignals.fbp,
            fbc: currentSignals.fbc || generateFbc(parsed.fbclid || ''), // Generate from stored fbclid if needed
            user_agent: currentSignals.user_agent,
            timestamp: currentSignals.timestamp,
          };
        }
      }
    } catch (e) {
      console.warn('Failed to read attribution from localStorage:', e);
    }

    // Save to localStorage if we have meaningful signals (excluding fbp/fbc/user_agent which are session-specific)
    if (hasCurrentSignals || finalSignals.utm_source || finalSignals.fbclid || finalSignals.gclid) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(finalSignals));
      } catch (e) {
        console.warn('Failed to save attribution to localStorage:', e);
      }
    }

    // Update ref with final signals
    attributionDataRef.current = finalSignals;

    // Debug log
    console.log('Attribution data captured:', attributionDataRef.current);
  }, []);

  // Initialize Meta Pixel and track PageView on component mount
  useEffect(() => {
    // Initialize Meta Pixel with new ID - disable automatic button tracking
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

    // Initialize with pixel ID: 1224660309537951
    // CRITICAL: Disable ALL automatic tracking to prevent duplicate Lead events
    // autoConfig: false - disables automatic button/form tracking
    (window as any).fbq('set', 'autoConfig', false, '1224660309537951');
    (window as any).fbq('init', '1224660309537951', {}, { autoConfig: false });
    (window as any).fbq('track', 'PageView');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.businessName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Generate tracking token BEFORE submission for deduplication
    // This SAME token must be sent to both: (1) Formspree/n8n for CAPI, (2) fbq pixel eventID
    const trackingToken = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    try {
      // Submit to Formspree (Formspree webhooks to n8n automatically)
      const response = await fetch('https://formspree.io/f/mqarlrwl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          // Form data
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          tracking_token: trackingToken,
          // CRITICAL: event_id for Meta CAPI deduplication (must match tracking_token)
          event_id: trackingToken,
          // Attribution data - UTM parameters
          landing_url: attributionDataRef.current.landing_url || window.location.href,
          utm_source: attributionDataRef.current.utm_source || 'website',
          utm_medium: attributionDataRef.current.utm_medium,
          utm_campaign: attributionDataRef.current.utm_campaign,
          utm_content: attributionDataRef.current.utm_content,
          utm_term: attributionDataRef.current.utm_term,
          // Attribution data - Click IDs (CRITICAL for ad tracking)
          fbclid: attributionDataRef.current.fbclid,
          gclid: attributionDataRef.current.gclid,
          // Attribution data - Referrer
          referrer: attributionDataRef.current.referrer,
          // Meta CAPI required fields
          fbp: attributionDataRef.current.fbp, // _fbp cookie from Meta Pixel
          fbc: attributionDataRef.current.fbc, // _fbc cookie or generated from fbclid
          user_agent: attributionDataRef.current.user_agent, // Browser user agent
          // Meta fields
          _subject: `Demo Request from ${formData.name}${formData.businessName ? ` - ${formData.businessName}` : ''}`,
          form_type: 'demo_booking',
          source: 'demo_page',
          submitted_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      // Track conversion
      conversionTracker.trackDemoBooking('demo_page');
      conversionTracker.trackButtonClick('Lead Form Submitted', 'demo_page');

      // Fire Meta Pixel Lead event with event_id for deduplication
      // This event_id must match the one sent via CAPI (n8n) for Meta to deduplicate
      console.log('[DEDUP DEBUG] trackingToken value:', trackingToken);
      console.log('[DEDUP DEBUG] fbq available:', !!(window as any).fbq);

      if ((window as any).fbq) {
        console.log('[DEDUP DEBUG] Firing fbq Lead event with eventID:', trackingToken);
        (window as any).fbq('track', 'Lead', {
          content_name: 'Demo Request',
          content_category: 'general',
        }, {
          eventID: trackingToken,
        });
        console.log('[DEDUP DEBUG] fbq Lead event fired');
      } else {
        console.error('[DEDUP DEBUG] fbq NOT available - pixel event NOT sent!');
      }

      // Build Calendly URL with prefilled data
      const calendlyBase = 'https://calendly.com/emrebenian-cogniaai/30min';
      const calendlyParams = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        a1: formData.phone,
        utm_source: 'website',
        utm_medium: 'form',
        utm_content: trackingToken,
        utm_campaign: 'demo_booking',
      });

      // Wait 500ms to ensure pixel event network request completes before redirect
      // fbq is async and redirect can cancel in-flight requests
      console.log('[DEDUP DEBUG] Waiting 500ms for pixel to send...');
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('[DEDUP DEBUG] Redirecting to Calendly');

      setIsSubmitted(true);

      // Redirect to Calendly
      setTimeout(() => {
        window.location.href = `${calendlyBase}?${calendlyParams.toString()}`;
      }, 1000);

    } catch (err) {
      console.error('Form submission error:', err);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Schedule a Demo | Cognia AI</title>
        <meta name="description" content="Schedule a personalized demo to see how Cognia AI can transform your customer communications with AI-powered call handling." />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* Subtle gradient background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column - Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-24"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-neutral-400 mb-8">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Free 7-day trial included
              </div>

              {/* Headline */}
              <h1 className="text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight mb-6">
                See Cognia AI
                <span className="block text-neutral-500">in action</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-lg">
                Schedule a personalized demo with our team. We'll show you exactly how AI can handle your calls, book appointments, and never let a customer slip through the cracks.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-[10px] text-neutral-500" />
                    </div>
                    <span className="text-neutral-300 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Proof - Subtle */}
              <div className="pt-8 border-t border-neutral-900">
                <p className="text-xs text-neutral-600 uppercase tracking-wider mb-4">
                  Trusted by businesses across industries
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {trustedIndustries.map((industry, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-full"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {/* Form Header */}
                      <div className="mb-8">
                        <h2 className="text-xl font-medium text-white mb-2">
                          Request a demo
                        </h2>
                        <p className="text-sm text-neutral-500">
                          Fill in your details below and we'll be in touch.
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-5" data-fb-noscript="true">
                        {/* Name */}
                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">
                            Full name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                            className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:bg-neutral-900 transition-all text-sm"
                            autoComplete="name"
                          />
                        </div>

                        {/* Business Name */}
                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">
                            Business name *
                          </label>
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Acme Inc."
                            className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:bg-neutral-900 transition-all text-sm"
                            autoComplete="organization"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">
                            Work email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jane@company.com"
                            className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:bg-neutral-900 transition-all text-sm"
                            autoComplete="email"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">
                            Phone number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                            className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:bg-neutral-900 transition-all text-sm"
                            autoComplete="tel"
                          />
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                          {error && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-400 text-sm"
                            >
                              {error}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm group flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin text-xs" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Continue to scheduling</span>
                              <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                            </>
                          )}
                        </button>
                      </form>

                      {/* Footer */}
                      <p className="mt-6 text-center text-xs text-neutral-600">
                        By submitting, you agree to our{' '}
                        <Link to="/privacy-policy" className="text-neutral-500 hover:text-neutral-400 underline underline-offset-2 transition-colors">
                          Privacy Policy
                        </Link>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCheck className="text-2xl text-green-500" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-3">
                        You're all set
                      </h3>
                      <p className="text-neutral-400 text-sm mb-6 max-w-sm mx-auto">
                        Redirecting to Calendly to schedule your demo...
                      </p>
                      <a
                        href="https://calendly.com/emrebenian-cogniaai/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-colors text-sm"
                      >
                        Open Calendly
                        <FaArrowRight className="text-xs" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Additional Info */}
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-neutral-600">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  HIPAA Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No credit card required
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
