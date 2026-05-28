import React, { useEffect, useRef, useState } from 'react';

import { Language, translations } from '../translations';
import { trackEvent } from './GA4Tracker';

interface HeroProps {
  onExplore: () => void;
  isDark?: boolean;
  language: Language;
}

// Shared style for the 16:9 crop container:
// Centers itself, expands to cover the section in both dimensions,
// and clips anything beyond its bounds (where the black bars are).
const cropContainerStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  aspectRatio: '16 / 9',
  minWidth: '100%',
  minHeight: '100%',
  overflow: 'hidden',
};

// The iframe is 20% larger than the 16:9 container on every side,
// so the baked-in black letterbox bars are pushed outside the crop boundary.
const iframeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '120%',
  height: '120%',
  border: 'none',
};

export const Hero: React.FC<HeroProps> = ({ onExplore, isDark = false, language }) => {
  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const t = translations[language].hero;

  const iframe0Ref = useRef<HTMLIFrameElement>(null);
  const iframe1Ref = useRef<HTMLIFrameElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);

  const [isDesktop, setIsDesktop] = useState(false);
  const [mountSecondVideo, setMountSecondVideo] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    // Defer loading the second high-bandwidth desktop video by 4 seconds
    const timer = setTimeout(() => {
      setMountSecondVideo(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isDesktop]);

  useEffect(() => {
    // Fade out high-resolution poster after 1.8 seconds to give Vimeo time to buffer and start playing
    const timer = setTimeout(() => {
      setShowPoster(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Disable periodic reset on mobile to avoid triggering Safari/Chrome (iOS) protection
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;

    const interval = setInterval(() => {
      setActiveVideo(prev => {
        const next = prev === 0 ? 1 : 0;
        // Raw Vimeo iframe message to immediately rewind the upcoming video to 0:00
        const nextIframe = next === 0 ? iframe0Ref.current : iframe1Ref.current;
        if (nextIframe && nextIframe.contentWindow) {
           nextIframe.contentWindow.postMessage('{"method":"setCurrentTime","value":0}', '*');
           nextIframe.contentWindow.postMessage('{"method":"play"}', '*');
        }
        return next;
      });
    }, 12800); // 12.8s interval to cut right before Vimeo auto-loops natively
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className={`relative min-h-[600px] lg:min-h-screen py-24 md:py-32 flex flex-col items-center justify-center text-center px-6 overflow-hidden transition-all duration-1000 ${isDark ? 'bg-[#030303]' : 'bg-white'} ${isInView ? 'opacity-100' : 'opacity-40'}`}
    >
      {/* ── Video background layer ── */}
      <div className={`absolute inset-0 z-0 overflow-hidden ${isDark ? 'opacity-[0.90]' : 'opacity-80'} bg-black`}>
        <div className="absolute inset-0 contrast-125">

          {/* Video 0
              Structure: section (overflow:hidden) → 16:9 crop box (overflow:hidden) → iframe 105%
              The 16:9 box expands to cover the full section. The iframe at 105% pushes its edges
              (where the baked-in letterbox bars live) outside the crop box, which clips them. */}
          <div className={`absolute inset-0 transition-none ${activeVideo === 0 ? 'opacity-100' : 'opacity-0 z-0 pointer-events-none'}`}>
            <div style={cropContainerStyle}>
              <iframe
                ref={iframe0Ref}
                src="https://player.vimeo.com/video/1179651662?background=1&autoplay=1&loop=1&muted=1&autopause=0&playsinline=1"
                style={iframeStyle}
                allow="autoplay; fullscreen; picture-in-picture"
              />
            </div>
          </div>

          {/* Video 1 — desktop only, deferred */}
          {isDesktop && mountSecondVideo && (
            <div className={`absolute inset-0 transition-none ${activeVideo === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
              <div style={cropContainerStyle}>
                <iframe
                  ref={iframe1Ref}
                  src="https://player.vimeo.com/video/1179891679?background=1&autoplay=1&loop=1&muted=1&autopause=0&playsinline=1"
                  style={iframeStyle}
                  allow="autoplay; fullscreen; picture-in-picture"
                />
              </div>
            </div>
          )}

        </div>

        {/* Seamless High-Resolution Poster Overlay */}
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out pointer-events-none ${showPoster ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: "url('https://i.postimg.cc/qB8WLNVN/outside_10.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className={`absolute inset-0 ${isDark ? 'bg-[#030303]/35' : 'bg-white/5'} backdrop-blur-[1px] pointer-events-none z-10`}></div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl px-4 flex flex-col items-center">
        <h1 className={`text-fluid-h3 font-heading font-light leading-[0.9] tracking-[-0.04em] lowercase mb-6 md:mb-8 transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>
          {t.title_part1} <br />
          <span className={`italic font-light ${isDark ? 'text-[#FF660F]' : 'text-[#FF660F]'}`}>{t.title_part2}</span>
        </h1>
        <p className={`text-base md:text-base lg:text-base font-medium tracking-[0.15em] uppercase mb-8 md:mb-12 ${isDark ? 'text-white/40' : 'text-stone-400'}`}>
          {t.subtitle}
        </p>

        <button
          onClick={() => {
            trackEvent('cta_click', { label: 'hero_inquiry', section: 'hero' });
            onExplore();
          }}
          className={`px-8 md:px-14 py-4 md:py-6 rounded-full text-sm md:text-sm font-bold tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-2xl ${isDark ? 'bg-[#FF660F] text-white shadow-[#FF660F]/20' : 'bg-[#FF660F] text-white shadow-[#FF660F]/20'}`}
        >
          {t.cta}
        </button>
      </div>

      <div className={`absolute bottom-6 md:bottom-8 w-px h-6 md:h-8 transition-colors duration-700 ${isDark ? 'bg-white/10' : 'bg-[#0a0a0b]/10'}`}></div>
    </section>
  );
};