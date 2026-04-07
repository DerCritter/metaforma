import React, { useEffect, useRef, useState } from 'react';

import { Language, translations } from '../translations';

interface HeroProps {
  onExplore: () => void;
  isDark?: boolean;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, isDark = false, language }) => {
  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const t = translations[language].hero;

  const iframe0Ref = useRef<HTMLIFrameElement>(null);
  const iframe1Ref = useRef<HTMLIFrameElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);

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
      <div className={`absolute inset-0 z-0 ${isDark ? 'opacity-[0.65]' : 'opacity-40'} bg-black`}>
        <div className="absolute inset-0 contrast-125">
            <div className={`absolute inset-0 transition-none pointer-events-none ${activeVideo === 0 ? 'opacity-100' : 'opacity-0'}`}>
              <iframe
                ref={iframe0Ref}
                src="https://player.vimeo.com/video/1179651662?background=1&playsinline=1&dnt=1"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] md:w-[150%] md:h-[150%] object-cover md:pointer-events-none"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
              ></iframe>
            </div>
            <div className={`absolute inset-0 transition-none pointer-events-none ${activeVideo === 1 ? 'opacity-100' : 'opacity-0'}`}>
              <iframe
                ref={iframe1Ref}
                src="https://player.vimeo.com/video/1179891679?background=1&playsinline=1&dnt=1"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] md:w-[150%] md:h-[150%] object-cover md:pointer-events-none"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
              ></iframe>
            </div>
        </div>
        <div className={`absolute inset-0 ${isDark ? 'bg-[#030303]/60' : 'bg-white/10'} backdrop-blur-[1px]`}></div>
      </div>

      <div className="relative z-10 max-w-6xl px-4 flex flex-col items-center">
        <h1 className={`text-fluid-h3 font-heading font-light leading-[0.9] tracking-[-0.04em] lowercase mb-6 md:mb-8 transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>
          {t.title_part1} <br />
          <span className={`italic font-light ${isDark ? 'text-[#FF660F]' : 'text-[#FF660F]'}`}>{t.title_part2}</span>
        </h1>
        <p className={`text-base md:text-base lg:text-base font-medium tracking-[0.15em] uppercase mb-8 md:mb-12 ${isDark ? 'text-white/40' : 'text-stone-400'}`}>
          {t.subtitle}
        </p>

        <button
          onClick={onExplore}
          className={`px-8 md:px-14 py-4 md:py-6 rounded-full text-sm md:text-sm font-bold tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-2xl ${isDark ? 'bg-[#FF660F] text-white shadow-[#FF660F]/20' : 'bg-[#FF660F] text-white shadow-[#FF660F]/20'}`}
        >
          {t.cta}
        </button>
      </div>

      <div className={`absolute bottom-6 md:bottom-8 w-px h-6 md:h-8 transition-colors duration-700 ${isDark ? 'bg-white/10' : 'bg-[#0a0a0b]/10'}`}></div>
    </section>
  );
};