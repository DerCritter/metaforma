import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Utility to track custom events in GA4
 * Usage: trackEvent('cta_click', { label: 'hero_inquiry' })
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  const consent = localStorage.getItem('metaforma_cookie_consent');
  if (consent === 'accepted' && window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString()
    });
  }
};

interface GA4TrackerProps {
  measurementId: string;
}

export const GA4Tracker: React.FC<GA4TrackerProps> = ({ measurementId }) => {
  const location = useLocation();

  useEffect(() => {
    // Check for cookie consent before tracking
    const consent = localStorage.getItem('metaforma_cookie_consent');
    if (consent !== 'accepted') return;

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: location.pathname,
        page_title: document.title,
        send_to: measurementId
      });
    }
  }, [location, measurementId]);

  return null; // This component doesn't render anything
};
