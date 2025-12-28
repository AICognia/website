/**
 * Meta Pixel Tracking Utility
 * Pixel ID: 1224660309537951
 *
 * Centralized tracking for all Meta Pixel events to improve pixel quality
 * and optimize ad delivery.
 */

type EventSource =
  | 'desktop_hero' | 'mobile_hero'
  | 'desktop_navbar' | 'mobile_navbar'
  | 'sticky_cta' | 'final_cta' | 'footer'
  | 'demo_page' | 'contact_page'
  | 'solutions_page' | 'chatbot_page'
  | 'how_it_works' | 'features_section'
  | 'announcement_banner' | 'company_hero' | 'company_bottom_cta'
  | 'ai_receptionist_page' | 'ai_chatbot_page' | 'workflow_automation_page'
  | 'ai_audit_page' | 'business_intelligence_page' | 'custom_ai_page'
  | 'company_page';

interface TrackingOptions {
  source: EventSource;
  contentName?: string;
  contentCategory?: string;
  value?: number;
  currency?: string;
  eventID?: string;
}

// Tracking state to prevent duplicate events
const trackedEvents = new Set<string>();
let scrollMilestonesTracked = { 25: false, 50: false, 75: false, 100: false };
let timeOnSiteTracked = { 30: false, 60: false, 120: false };

/**
 * Check if Meta Pixel is available
 */
const isFbqAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!(window as any).fbq;
};

/**
 * Fire a Meta Pixel event
 */
const fireEvent = (
  eventType: 'track' | 'trackCustom',
  eventName: string,
  params: Record<string, any> = {},
  options?: { eventID?: string }
) => {
  if (!isFbqAvailable()) {
    console.warn('[MetaPixel] fbq not available');
    return false;
  }

  try {
    if (options?.eventID) {
      (window as any).fbq(eventType, eventName, params, { eventID: options.eventID });
    } else {
      (window as any).fbq(eventType, eventName, params);
    }
    console.log(`[MetaPixel] ${eventType}: ${eventName}`, params);
    return true;
  } catch (error) {
    console.error('[MetaPixel] Error firing event:', error);
    return false;
  }
};

/**
 * Track "Get Your AI Receptionist" CTA clicks
 * Event: InitiateCheckout (standard event for high-intent actions)
 */
export const trackCTAClick = (source: EventSource) => {
  fireEvent('track', 'InitiateCheckout', {
    content_name: 'Get Your AI Receptionist',
    content_category: 'demo_booking',
    source,
  });
};

/**
 * Track "Talk to AI" phone call clicks
 * Event: Contact (standard event for phone interactions)
 */
export const trackTalkToAI = (source: EventSource) => {
  fireEvent('track', 'Contact', {
    content_name: 'Talk to AI Now',
    content_category: 'phone_call',
    source,
  });
};

/**
 * Track "Book Demo" / "Get AI Receptionist" button clicks
 * Event: InitiateCheckout (standard event for high-intent actions)
 * NOTE: All demo booking CTAs should use InitiateCheckout for consistency
 */
export const trackBookDemo = (source: EventSource) => {
  fireEvent('track', 'InitiateCheckout', {
    content_name: 'Book Demo',
    content_category: 'demo_booking',
    source,
  });
};

/**
 * Track audio demo plays
 * Event: ViewContent (shows engagement with product demo)
 */
export const trackAudioDemo = (source: EventSource) => {
  const eventKey = `audio_demo_${source}`;
  if (trackedEvents.has(eventKey)) return; // Only track once per session

  trackedEvents.add(eventKey);
  fireEvent('track', 'ViewContent', {
    content_name: 'AI Voice Demo',
    content_type: 'audio_demo',
    content_category: 'product_demo',
    source,
  });
};

/**
 * Track form submissions (Lead event)
 * Uses eventID for deduplication with CAPI
 */
export const trackLead = (source: EventSource, eventID: string, contentCategory?: string) => {
  fireEvent('track', 'Lead', {
    content_name: 'Demo Request',
    content_category: contentCategory || 'general',
    source,
  }, { eventID });
};

/**
 * Track scroll depth milestones
 * Event: CustomEvent - shows engagement level
 */
export const trackScrollDepth = (percentage: 25 | 50 | 75 | 100) => {
  if (scrollMilestonesTracked[percentage]) return;

  scrollMilestonesTracked[percentage] = true;
  fireEvent('trackCustom', 'ScrollDepth', {
    depth_percentage: percentage,
    page_url: window.location.pathname,
  });
};

/**
 * Track time on site milestones
 * Event: CustomEvent - shows quality of visit
 */
export const trackTimeOnSite = (seconds: 30 | 60 | 120) => {
  if (timeOnSiteTracked[seconds]) return;

  timeOnSiteTracked[seconds] = true;
  fireEvent('trackCustom', 'TimeOnSite', {
    time_seconds: seconds,
    page_url: window.location.pathname,
  });
};

/**
 * Track page completion (reaching FinalCTA/footer)
 * Event: ViewContent - shows high intent
 */
export const trackPageCompletion = () => {
  const eventKey = 'page_completion';
  if (trackedEvents.has(eventKey)) return;

  trackedEvents.add(eventKey);
  fireEvent('track', 'ViewContent', {
    content_name: 'Page Completion',
    content_type: 'page_scroll',
    content_category: 'engagement',
  });
};

/**
 * Track solution page views
 * Event: ViewContent - shows interest in specific product
 */
export const trackSolutionView = (solutionName: string) => {
  fireEvent('track', 'ViewContent', {
    content_name: solutionName,
    content_type: 'solution_page',
    content_category: 'product_interest',
  });
};

/**
 * Track WhatsApp clicks
 * Event: Contact - shows high intent
 */
export const trackWhatsAppClick = (source: EventSource) => {
  fireEvent('track', 'Contact', {
    content_name: 'WhatsApp Chat',
    content_category: 'messaging',
    source,
  });
};

/**
 * Track social media clicks
 * Event: CustomEvent
 */
export const trackSocialClick = (platform: 'linkedin' | 'instagram', source: EventSource) => {
  fireEvent('trackCustom', 'SocialClick', {
    platform,
    source,
  });
};

/**
 * Initialize scroll and time tracking for a page
 * Call this in your main App component or page components
 */
export const initEngagementTracking = () => {
  if (typeof window === 'undefined') return;

  // Reset tracking state for new page
  scrollMilestonesTracked = { 25: false, 50: false, 75: false, 100: false };
  timeOnSiteTracked = { 30: false, 60: false, 120: false };

  // Scroll depth tracking
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.scrollY / scrollHeight) * 100;

    if (scrollPercentage >= 25 && !scrollMilestonesTracked[25]) trackScrollDepth(25);
    if (scrollPercentage >= 50 && !scrollMilestonesTracked[50]) trackScrollDepth(50);
    if (scrollPercentage >= 75 && !scrollMilestonesTracked[75]) trackScrollDepth(75);
    if (scrollPercentage >= 95 && !scrollMilestonesTracked[100]) {
      trackScrollDepth(100);
      trackPageCompletion();
    }
  };

  // Time on site tracking
  const startTime = Date.now();
  const checkTimeOnSite = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed >= 30 && !timeOnSiteTracked[30]) trackTimeOnSite(30);
    if (elapsed >= 60 && !timeOnSiteTracked[60]) trackTimeOnSite(60);
    if (elapsed >= 120 && !timeOnSiteTracked[120]) trackTimeOnSite(120);
  };

  // Attach listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  const timeInterval = setInterval(checkTimeOnSite, 5000);

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearInterval(timeInterval);
  };
};

export default {
  trackCTAClick,
  trackTalkToAI,
  trackBookDemo,
  trackAudioDemo,
  trackLead,
  trackScrollDepth,
  trackTimeOnSite,
  trackPageCompletion,
  trackSolutionView,
  trackWhatsAppClick,
  trackSocialClick,
  initEngagementTracking,
};
