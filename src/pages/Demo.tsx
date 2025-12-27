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

      <div className="min-h-screen bg-black flex items-center justify-center">
        {/* Ambient background glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/8 via-blue-500/5 to-purple-500/8 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-md lg:max-w-lg mx-auto px-6 py-12 lg:py-16">
          {/* Centered Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header - Minimal */}
            <div className="text-center mb-8">
              <h1 className="text-2xl lg:text-3xl font-light text-white mb-2">
                Book Your Free Demo
              </h1>
              <p className="text-sm text-gray-500">
                See your AI receptionist in action
              </p>
            </div>

            {/* Elegant Form Card */}
            <div className="relative">
              {/* Subtle glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50" />

              <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4" data-fb-noscript="true">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                            autoComplete="name"
                          />
                        </div>

                        {/* Business Name */}
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                            Business Name
                          </label>
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Acme Inc."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                            autoComplete="organization"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                            Work Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                            autoComplete="email"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
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
                              className="text-red-400 text-sm text-center"
                            >
                              {error}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 mt-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Book My Free Demo</span>
                              <FaArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform" />
                            </>
                          )}
                        </button>
                      </form>

                      {/* Trust indicators */}
                      <div className="flex items-center justify-center gap-4 mt-5 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaCheck className="text-green-500 text-[8px]" />
                          1 Week Free
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCheck className="text-green-500 text-[8px]" />
                          No Card Required
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCheck className="text-green-500 text-[8px]" />
                          HIPAA Compliant
                        </span>
                      </div>

                      {/* Privacy */}
                      <p className="mt-4 text-center text-[10px] text-gray-600">
                        By submitting, you agree to our{' '}
                        <Link to="/privacy-policy" className="text-gray-500 hover:text-cyan-400 underline underline-offset-2 transition-colors">
                          Privacy Policy
                        </Link>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-8 text-center"
                    >
                      <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                        <FaCheck className="text-xl text-green-500" />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        You're all set!
                      </h3>
                      <p className="text-gray-400 text-sm mb-5">
                        Redirecting to schedule your demo...
                      </p>
                      <a
                        href="https://calendly.com/emrebenian-cogniaai/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium rounded-xl transition-all text-sm shadow-lg shadow-cyan-500/25"
                      >
                        Open Calendly
                        <FaArrowRight className="text-xs" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Phone alternative */}
            <p className="text-center text-xs text-gray-600 mt-6">
              Prefer to talk?{' '}
              <a
                href="tel:+16163263328"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                onClick={() => conversionTracker.trackPhoneCall('+16163263328')}
              >
                Call our AI now
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Demo;
