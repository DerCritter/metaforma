import React, { useEffect, useRef, useState } from 'react';

import { Language, translations } from '../translations';
import { trackEvent } from './GA4Tracker';

interface HeroProps {
  onExplore: () => void;
  isDark?: boolean;
  language: Language;
}

const HERO_VIDEOS = [
  '/assets/videos/hero_5.mp4',
  '/assets/videos/hero_1.mp4',
  '/assets/videos/hero_2.mp4',
  '/assets/videos/hero_3.mp4',
  '/assets/videos/hero_4.mp4',
];

export const Hero: React.FC<HeroProps> = ({ onExplore, isDark = false, language }) => {
  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const t = translations[language].hero;

  const [activeVideo, setActiveVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When activeVideo changes, load and play the new source
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = HERO_VIDEOS[activeVideo];
      video.load();
      video.play().catch(() => {});
    }
  }, [activeVideo]);

  // Start the first video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = HERO_VIDEOS[0];
      video.load();
      video.play().catch(() => {});
    }
  }, []);

  const handleVideoEnd = () => {
    setActiveVideo(prev => (prev + 1) % HERO_VIDEOS.length);
  };

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
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            onEnded={handleVideoEnd}
            preload="auto"
          />
          {/* Black band to mask watermark on videos */}
          <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-black z-10 pointer-events-none"></div>
        </div>

        <div className={`absolute inset-0 ${isDark ? 'bg-[#030303]/35' : 'bg-white/5'} backdrop-blur-[1px] pointer-events-none z-20`}></div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-30 max-w-6xl px-4 flex flex-col items-center">
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

      <div className={`absolute bottom-6 md:bottom-8 w-px h-6 md:h-8 transition-colors duration-700 z-30 ${isDark ? 'bg-white/10' : 'bg-[#0a0a0b]/10'}`}></div>
    </section>
  );
};