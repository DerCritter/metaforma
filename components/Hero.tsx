import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  onExplore: () => void;
  isDark?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, isDark = false }) => {
  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const [activeVideo, setActiveVideo] = useState(0);
  const videos = [
    "https://player.vimeo.com/video/1165443658?background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479",
    "https://player.vimeo.com/video/1164815646?background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo(prev => (prev + 1) % videos.length);
    }, 10000);
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
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isDark ? 'opacity-[0.65]' : 'opacity-40'}`}>
        <div className="absolute inset-0 contrast-125">
          {videos.map((vid, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${idx === activeVideo ? 'opacity-100' : 'opacity-0'}`}
            >
              <iframe
                src={vid}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] object-cover pointer-events-none"
                frameBorder="0"
                allow="autoplay; fullscreen"
              ></iframe>
            </div>
          ))}
        </div>
        <div className={`absolute inset-0 ${isDark ? 'bg-[#030303]/60' : 'bg-white/10'} backdrop-blur-[1px]`}></div>
      </div>

      <div className="relative z-10 max-w-6xl px-4 flex flex-col items-center">
        <h1 className={`text-fluid-h3 font-heading font-light leading-[0.9] tracking-[-0.04em] lowercase mb-6 md:mb-8 transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>
          transforming properties <br />
          <span className={`italic font-light ${isDark ? 'text-[#FF660F]' : 'text-[#FF660F]'}`}>with ai-driven renders</span>
        </h1>
        <p className={`text-fluid-sm font-medium max-w-lg mx-auto mb-10 md:mb-12 tracking-[0.4em] transition-colors duration-700 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
          Elevate listings. Define spaces.
        </p>

        <button
          onClick={onExplore}
          className={`px-8 md:px-14 py-4 md:py-6 rounded-full text-[10px] md:text-[12px] font-bold tracking-[0.4em] uppercase hover:scale-105 transition-all shadow-2xl ${isDark ? 'bg-[#FF660F] text-white shadow-[#FF660F]/20' : 'bg-[#FF660F] text-white shadow-[#FF660F]/20'}`}
        >
          Start Inquiry
        </button>
      </div>

      <div className={`absolute bottom-6 md:bottom-8 w-px h-6 md:h-8 transition-colors duration-700 ${isDark ? 'bg-white/10' : 'bg-[#0a0a0b]/10'}`}></div>
    </section>
  );
};