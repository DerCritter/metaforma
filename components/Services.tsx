import React, { useEffect, useRef, useState } from 'react';
import { AppSection } from '../types';
import { ARCHITECTURE_PROJECTS } from './Portfolio';

interface ServicesProps {
  onNavigate: (section: AppSection, projectId?: string) => void;
  isDark?: boolean;
}

// Custom Hook for counting up from 0 with energetic easing
const useCountUp = (target: number, duration: number = 2000, isInView: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing: easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easedProgress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration, isInView]);

  return count;
};

// Tactical Icon Components
const BigSliderIcon: React.FC = () => (
  <div className="relative w-14 h-9 md:w-16 md:h-10 lg:w-24 lg:h-16 border-2 border-white/10 rounded-xl overflow-hidden bg-[#030303]/20 shadow-2xl">
    <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#FF660F]/40 to-[#FF660F]/10 border-r-2 border-[#FF660F] animate-[slider_3s_easeInOutQuad_infinite]">
      <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
    </div>
    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/20"></div>
    <div className="absolute top-2 right-2 flex gap-1">
      <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-[#FF660F] rounded-full animate-pulse"></div>
      <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-white/20 rounded-full"></div>
    </div>
  </div>
);

const BigVideoIcon: React.FC = () => (
  <div className="relative w-10 h-10 md:w-12 md:h-12 lg:w-20 lg:h-20 flex items-center justify-center">
    <div className="absolute inset-0 border-2 border-[#FF660F]/30 rounded-full animate-[ping_3s_infinite] opacity-20"></div>
    <div className="absolute inset-2 border border-white/10 rounded-full animate-[spin_8s_linear_infinite]"></div>
    <div className="w-0 h-0 border-t-[6px] md:border-t-[8px] lg:border-t-[14px] border-t-transparent border-l-[10px] md:border-l-[12px] lg:border-l-[22px] border-l-[#FF660F] border-b-[6px] md:border-b-[8px] lg:border-b-[14px] border-b-transparent ml-1 md:ml-1.5 shadow-[0_0_30px_#FF660F] animate-[pulse_2s_easeInOutQuad_infinite]"></div>
  </div>
);

const BigSEOIcon: React.FC = () => (
  <div className="relative w-14 h-10 md:w-16 md:h-12 lg:w-24 lg:h-20">
    <div className="absolute top-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 lg:w-6 lg:h-6 border-2 border-[#FF660F] rounded-full flex items-center justify-center animate-[bounce_4s_infinite]">
      <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#FF660F] rounded-full animate-ping"></div>
    </div>
    <div className="space-y-1 lg:space-y-3 pt-3 md:pt-4">
      <div className="h-0.5 md:h-1 lg:h-1.5 rounded-full bg-[#FF660F] animate-[seo-bar-1_2s_infinite]"></div>
      <div className="h-0.5 md:h-1 lg:h-1.5 rounded-full bg-[#FF660F]/60 animate-[seo-bar-2_2.5s_infinite]"></div>
      <div className="h-0.5 md:h-1 lg:h-1.5 rounded-full bg-[#FF660F]/40 animate-[seo-bar-3_3s_infinite]"></div>
    </div>
  </div>
);

const TacticalModule: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  isDark: boolean;
  isInView: boolean;
}> = ({ icon, title, desc, isDark, isInView }) => (
  <div className={`relative p-6 md:p-8 lg:p-14 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[4rem] border flex flex-col items-center text-center gap-4 md:gap-6 group overflow-hidden ${isDark ? 'bg-[#030303]/60 border-white/10 hover:border-[#FF660F]/50' : 'bg-white border-black/5 hover:border-[#FF660F]/20 shadow-2xl'}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-[#FF660F]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

    <div className="relative z-10 scale-90 md:scale-100 lg:scale-125 transition-transform duration-700 group-hover:scale-110">{icon}</div>
    <div className="relative z-10 space-y-4">
      <h4 className={`text-xl md:text-xl lg:text-2xl font-heading tracking-tight transition-colors ${isDark ? 'text-white' : 'text-black'} group-hover:text-[#FF660F]`}>{title}</h4>
      <p className={`text-[11px] md:text-xs lg:text-base leading-relaxed font-light max-w-[280px] mx-auto transition-colors ${isDark ? 'text-white/50' : 'text-stone-500'}`}>{desc}</p>
    </div>
  </div>
);

const WebConversionViz: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  const count = useCountUp(400, 2000, isInView);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group bg-[#111112] backdrop-blur-[10px] border border-white/5 rounded-[1.2rem] md:rounded-[1.5rem] lg:rounded-[2rem] p-4 md:p-6 lg:p-10 flex flex-col justify-between overflow-hidden transition-all hover:bg-[#18181a] min-h-[140px] md:min-h-[160px] lg:min-h-[220px]">
      <div className="relative z-10 space-y-1">
        <span className="text-[9px] md:text-[8px] uppercase tracking-[0.4em] text-white/40 font-black">Performance</span>
        <h4 className="text-[11px] md:text-xs lg:text-sm font-heading text-white/90">Web Conversion</h4>
        <span className="text-3xl md:text-3xl lg:text-5xl font-heading font-medium text-[#FF660F] tabular-nums block mt-1">+{count}%</span>
      </div>
      <div className="relative h-10 md:h-16 lg:h-24 flex items-end gap-1 md:gap-1.5 mt-4">
        {[...Array(7)].map((_, i) => {
          const targetHeights = [15, 25, 40, 35, 20, 15, 95];
          const pulse = Math.sin((time * 0.15) + i) * 3;
          const progress = Math.min(1, (count / 400) * (1 + i * 0.1));
          const height = isInView ? `${(targetHeights[i] * progress) + pulse}%` : '4px';

          return (
            <div
              key={i}
              className={`flex-grow transition-all duration-[400ms] ease-out relative rounded-t-sm ${i === 6 ? 'bg-gradient-to-t from-[#FF660F]/60 to-[#FF660F] shadow-[0_0_25px_rgba(255,101,44,0.3)]' : 'bg-[#FF660F]/15'}`}
              style={{ height: height }}
            >
              {i === 6 && isInView && <div className="absolute inset-0 bg-white/10 animate-pulse"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SEOVisibilityViz: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  const count = useCountUp(157, 2000, isInView);

  return (
    <div className="relative group bg-[#111112] backdrop-blur-[10px] border border-white/5 rounded-[1.2rem] md:rounded-[1.5rem] lg:rounded-[2rem] p-4 md:p-6 lg:p-10 flex flex-col justify-between overflow-hidden transition-all hover:bg-[#18181a] min-h-[140px] md:min-h-[160px] lg:min-h-[220px]">
      <div className="relative z-10 space-y-1">
        <span className="text-[9px] md:text-[8px] uppercase tracking-[0.4em] text-white/40 font-black">Visibility</span>
        <h4 className="text-[11px] md:text-xs lg:text-sm font-heading text-white/90">SEO Authority</h4>
        <span className="text-3xl md:text-3xl lg:text-5xl font-heading font-medium text-[#FF660F] tabular-nums block mt-1">+{count}%</span>
      </div>
      <div className="relative h-10 md:h-16 lg:h-24 mt-4 bg-[#030303]/40 rounded-xl overflow-hidden border border-white/[0.03]">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
        <div className={`absolute inset-y-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#FF660F]/15 to-transparent transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ animation: isInView ? 'scan 4s linear infinite' : 'none' }}></div>

        <div
          className="absolute w-2 h-2 md:w-3 md:h-3 bg-[#FF660F] rounded-full shadow-[0_0_20px_#FF660F] transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) flex items-center justify-center"
          style={{
            left: isInView ? `${30 + (count / 157) * 45}%` : '50%',
            top: isInView ? `${70 - (count / 157) * 45}%` : '50%',
            scale: isInView ? 1 : 0
          }}
        >
          <div className="w-8 h-8 border border-[#FF660F]/30 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

const VideoMarketingViz: React.FC<{ isInView: boolean }> = ({ isInView }) => {
  const count = useCountUp(97, 2000, isInView);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group bg-[#111112] backdrop-blur-[12px] border border-white/5 rounded-[1.2rem] md:rounded-[1.5rem] lg:rounded-[2rem] p-6 md:p-8 lg:p-12 flex flex-col justify-between overflow-hidden transition-all hover:bg-[#18181a] col-span-full min-h-[120px] md:min-h-[150px] lg:min-h-[180px]">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-2">
        <div className="space-y-1">
          <span className="text-[9px] md:text-[8px] uppercase tracking-[0.4em] text-[#FF660F] font-black">Engagement</span>
          <h4 className="text-[12px] md:text-sm lg:text-xl font-heading text-white/95">Immersive Video Strategy</h4>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1">
          <span className="text-[8px] md:text-[8px] uppercase tracking-[0.4em] text-white/30">Conversion Boost</span>
          <span className="text-4xl md:text-4xl lg:text-6xl font-heading font-medium text-[#FF660F] leading-none tabular-nums block">+{count}%</span>
        </div>
      </div>
      <div className="relative h-6 md:h-12 lg:h-16 flex items-center gap-1.5 md:gap-3 mt-8">
        {Array.from({ length: 28 }).map((_, i) => {
          const progress = count / 97;
          const amplitude = 10 + (progress * 85);
          const frequency = 0.1 + (progress * 0.2);
          const height = isInView ? (Math.abs(Math.sin((i * frequency) + (time * 0.15))) * amplitude) : 4;
          const isHighlight = i % 7 === 0;

          return (
            <div
              key={i}
              className={`flex-grow rounded-full transition-all duration-300 ease-out ${isHighlight ? 'bg-[#FF660F] shadow-[0_0_20px_rgba(255,101,44,0.3)]' : 'bg-white/10'}`}
              style={{
                height: `${height}%`,
                opacity: isInView ? (0.3 + (progress * 0.7)) : 0
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

const ComparisonSlider: React.FC<{
  before: string;
  after: string;
  isInView: boolean;
  position: number;
  isDark: boolean;
  onPositionChange: (pos: number) => void;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
}> = ({ before, after, isInView, position, isDark, onPositionChange, onInteractionStart, onInteractionEnd }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const newPos = ((x - rect.left) / rect.width) * 100;
    onPositionChange(Math.max(0, Math.min(100, newPos)));
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden cursor-ew-resize select-none rounded-[1rem] md:rounded-[2rem] lg:rounded-[3.5rem] shadow-2xl border ${isDark ? 'border-white/5' : 'border-black/5'} transition-all duration-1000 ${isInView ? 'grayscale-0' : 'grayscale'}`}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseEnter={onInteractionStart}
      onMouseLeave={onInteractionEnd}
    >
      <img src={before} className="absolute inset-0 w-full h-full object-cover" alt="Before" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <img src={after} className="absolute inset-0 w-full h-full object-cover" alt="After" />
      </div>
      <div className="absolute inset-y-0 w-[1.5px] bg-[#FF660F] z-10" style={{ left: `${position}%`, boxShadow: '0 0 15px rgba(255,101,44,0.6)' }}>
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-12 bg-white/40 rounded-full blur-[1px]"></div>
      </div>
    </div>
  );
};

const ArchitectureShowcaseItem: React.FC<{
  title: string;
  subtitle: string;
  onClick: () => void;
  isDark: boolean;
  images: string[];
  isInView: boolean;
}> = ({ title, subtitle, onClick, isDark, images, isInView }) => {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (!isInView || images.length <= 1) {
      setImgIdx(0);
      return;
    }

    const interval = setInterval(() => {
      setImgIdx(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, images.length]);

  return (
    <div
      onClick={onClick}
      className={`group relative aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-1000 ${isInView ? 'translate-y-0 opacity-100 shadow-2xl scale-100' : 'translate-y-12 opacity-0 scale-95'}`}
    >
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`${title} perspective ${idx}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[3000ms] ease-in-out group-hover:scale-110 ${idx === imgIdx ? 'opacity-100' : 'opacity-0 scale-110'}`}
        />
      ))}

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent no-print"></div>

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 z-30">
        {/* Progress Dots */}
        <div className="flex gap-1.5 md:gap-2 mb-4 no-print transition-opacity duration-700">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`h-0.5 md:h-1 rounded-full transition-all duration-700 ease-out ${idx === imgIdx ? 'w-6 md:w-8 bg-[#FF660F]' : 'w-1.5 md:w-2 bg-white/20'}`}
            />
          ))}
        </div>
        <span className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] text-[#FF660F] font-black mb-2 block">{subtitle}</span>
        <h4 className="text-xl md:text-2xl font-heading text-white">{title}</h4>
      </div>
    </div>
  );
};

export const Services: React.FC<ServicesProps> = ({ onNavigate, isDark = false }) => {
  const [sector1InView, setSector1InView] = useState(false);
  const [sector2InView, setSector2InView] = useState(false);
  const [showcaseInView, setShowcaseInView] = useState(false);
  const [growthInView, setGrowthInView] = useState(false);
  const [tacticalInView, setTacticalInView] = useState(false);
  const [philosophyInView, setPhilosophyInView] = useState(false);
  const [neubauShowcaseInView, setNeubauShowcaseInView] = useState(false);

  const [sector1SetIdx, setSector1SetIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const targetSliderPos = useRef(50);
  const isHovering = useRef<boolean>(false);
  const autoDirection = useRef<number>(1);

  const sector1Ref = useRef<HTMLDivElement>(null);
  const sector2Ref = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const growthRef = useRef<HTMLDivElement>(null);
  const tacticalRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const neubauShowcaseRef = useRef<HTMLDivElement>(null);

  const sector1Sets = [
    { before: "https://i.postimg.cc/sXCwQJ2k/outside_10_old.jpg", after: "https://i.postimg.cc/qB8WLNVN/outside_10.jpg" },
    { before: "https://i.postimg.cc/zXVnJzRy/1-outdoor.jpg", after: "https://i.postimg.cc/kXBxnJtV/2-outdoor.jpg" },
    { before: "https://i.postimg.cc/JhX2HZ6S/indoor_4_old.jpg", after: "https://i.postimg.cc/hGm5QTZS/indoor_5.jpg" }
  ];

  useEffect(() => {
    let animationFrame: number;
    const lerp = () => {
      setSliderPos(current => {
        const diff = targetSliderPos.current - current;
        if (Math.abs(diff) < 0.01) return targetSliderPos.current;
        return current + diff * 0.1;
      });
      animationFrame = requestAnimationFrame(lerp);
    };
    animationFrame = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => { if (!isHovering.current) setSector1SetIdx(prev => (prev + 1) % sector1Sets.length); }, 4500);
    return () => clearInterval(interval);
  }, [sector1Sets.length]);

  useEffect(() => {
    const moveSlider = () => {
      if (isHovering.current) return;
      let next = targetSliderPos.current + (0.15 * autoDirection.current);
      if (next >= 85) { autoDirection.current = -1; next = 85; }
      else if (next <= 15) { autoDirection.current = 1; next = 15; }
      targetSliderPos.current = next;
    };
    const interval = setInterval(moveSlider, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const options = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === sector1Ref.current) setSector1InView(entry.isIntersecting);
        if (entry.target === sector2Ref.current) setSector2InView(entry.isIntersecting);
        if (entry.target === showcaseRef.current) setShowcaseInView(entry.isIntersecting);
        if (entry.target === growthRef.current) setGrowthInView(entry.isIntersecting);
        if (entry.target === tacticalRef.current) setTacticalInView(entry.isIntersecting);
        if (entry.target === philosophyRef.current) setPhilosophyInView(entry.isIntersecting);
        if (entry.target === neubauShowcaseRef.current) setNeubauShowcaseInView(entry.isIntersecting);
      });
    }, options);
    [sector1Ref, sector2Ref, showcaseRef, growthRef, tacticalRef, philosophyRef, neubauShowcaseRef].forEach(r => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  const textboxClass = (isInView: boolean) => `
    relative mb-6 md:mb-0 md:absolute z-40
    w-full md:max-w-[280px] lg:max-w-md xl:max-w-lg p-5 md:p-6 lg:p-10 xl:p-14 backdrop-blur-[12px] rounded-[1.2rem] md:rounded-[1.5rem] lg:rounded-[3rem]
    transition-all duration-[1200ms] ease-[cubic-bezier(0.16, 1, 0.3, 1)]
    shadow-[0_15px_40px_-10px_rgba(0, 0, 0, 0.15)] ring-1
    flex flex-col border border-white/30
    ${isDark ? 'bg-[#030303]/60 ring-white/10' : 'bg-white/60 ring-black/5'}
    ${isInView ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : 'opacity-0 md:-translate-x-6 translate-y-4 md:-translate-y-4 scale-95'}
`;

  return (
    <section id="pillars" className="relative p-0">
      <div className="relative z-10">

        {/* Sector I: Heritage Adaptive Reuse */}
        <div className="relative min-h-screen flex items-center py-24 md:py-40 px-6 md:px-24">
          <div className="max-w-[1600px] mx-auto w-full relative">
            {/* Information box goes above on mobile via DOM order shift */}
            <div className={`${textboxClass(sector1InView)} md:left-0 md:top-[-1rem] lg:left-[-3rem] lg:top-[-3rem]`}>
              <span className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-[#FF660F] font-black mb-1.5 md:mb-3 opacity-70">SECTOR I</span>
              <h2 className={`text-xl md:text-xl lg:text-3xl xl:text-5xl font-heading mb-3 md:mb-4 leading-[1.1] lg:leading-[0.95] tracking-tight transition-colors ${isDark ? 'text-white' : 'text-black'}`}><span className="font-medium">Heritage</span> <br /> <span className="italic font-light text-[#FF660F]">Adaptive Reuse</span></h2>
              <p className={`text-[10px] md:text-[10px] lg:text-base leading-relaxed mb-6 md:mb-8 font-medium transition-colors ${isDark ? 'text-white/50' : 'text-black/50'}`}>We specialize in Denkmalschutz (Historic Preservation). Our AI-driven process respects the architectural soul of the past while projecting the luxury potential for tomorrow's investors.</p>
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 mt-auto">
                <button onClick={() => onNavigate(AppSection.ARCHITECTURE)} className={`text-[8px] md:text-[8px] uppercase tracking-[0.3em] font-black border-b-2 transition-all pb-0.5 ${isDark ? 'text-white/70 border-white/10 hover:border-[#FF660F]' : 'text-black/70 border-black/10 hover:border-[#FF660F]'}`}>VIEW PORTFOLIO</button>
                <button onClick={() => onNavigate(AppSection.CONTACT_FORM)} className={`px-6 md:px-6 lg:px-12 py-3 md:py-3 rounded-full text-[9px] lg:text-[11px] font-bold tracking-[0.2em] hover:scale-105 transition-all shadow-xl bg-[#FF660F] text-white shadow-[#FF660F]/20`}>INQUIRY NOW</button>
              </div>
            </div>
            <div ref={sector1Ref} className="w-full md:w-[96%] lg:w-[94%] md:ml-auto min-h-[400px] md:min-h-[500px] lg:aspect-video relative group/carousel z-10">
              {sector1Sets.map((set, idx) => (
                <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === sector1SetIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                  <ComparisonSlider before={set.before} after={set.after} isInView={sector1InView} position={sliderPos} isDark={isDark} onPositionChange={(pos) => targetSliderPos.current = pos} onInteractionStart={() => isHovering.current = true} onInteractionEnd={() => isHovering.current = false} />
                </div>
              ))}
              <div className="invisible aspect-video"></div>
            </div>
          </div>
        </div>

        {/* Visionary Transformations Showcase */}
        <div ref={showcaseRef} className="min-h-screen flex flex-col justify-center py-12 md:py-32 px-6 md:px-24 bg-[#030303]/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#FF660F_1px,transparent_1px)] [background-size:40px_40px]"></div>
          </div>
          <div className="max-w-[1600px] mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-16 gap-3 md:gap-5 text-center md:text-left">
              <div className="space-y-1"><span className={`text-[7px] md:text-[9px] uppercase tracking-[0.5em] font-bold block transition-colors ${isDark ? 'text-white/20' : 'text-black/30'}`}>STRATEGY</span><h3 className={`text-xl md:text-2xl lg:text-7xl font-heading font-light tracking-tighter transition-colors ${isDark ? 'text-white' : 'text-black'}`}>Visionary <span className="italic text-[#FF660F]">Transformations</span></h3></div>
              <button onClick={() => onNavigate(AppSection.ARCHITECTURE)} className={`text-[7px] md:text-[9px] uppercase tracking-[0.5em] font-bold transition-colors border-b-2 pb-1 ${isDark ? 'text-white/20 border-white/5 hover:text-white hover:border-white' : 'text-black/30 border-black/5 hover:border-black'}`}>OPEN LIBRARY</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-16">
              <ArchitectureShowcaseItem
                title="Coworking space Wuppertal"
                subtitle="Modern Workplace Integration"
                onClick={() => onNavigate(AppSection.ARCHITECTURE, 'arch-03')}
                isDark={isDark}
                images={ARCHITECTURE_PROJECTS.find(p => p.id === 'arch-03')?.images || []}
                isInView={showcaseInView}
              />
              <ArchitectureShowcaseItem
                title="Luxus lofts Nürnberg"
                subtitle="Industrial Heritage Conversion"
                onClick={() => onNavigate(AppSection.ARCHITECTURE, 'arch-01')}
                isDark={isDark}
                images={ARCHITECTURE_PROJECTS.find(p => p.id === 'arch-01')?.images || []}
                isInView={showcaseInView}
              />
              <ArchitectureShowcaseItem
                title="Heritage Multi-Family Wuppertal"
                subtitle="Historic Sector Transformation"
                onClick={() => onNavigate(AppSection.ARCHITECTURE, 'arch-02')}
                isDark={isDark}
                images={ARCHITECTURE_PROJECTS.find(p => p.id === 'arch-02')?.images || []}
                isInView={showcaseInView}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: the living element (refined epic slideshow) */}
        <div id="philosophy-section" ref={philosophyRef} className={`relative min-h-[500px] lg:min-h-screen flex items-center justify-center overflow-hidden ${philosophyInView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'} transition-all duration-[1500ms]`}>
          <div className="absolute inset-0 z-0 overflow-hidden">
            {(() => {
              const images = [
                "https://i.postimg.cc/zXcmGDc9/outdoor-4.jpg",
                "https://i.postimg.cc/hGm5QTZS/indoor_5.jpg",
                "https://i.postimg.cc/XJ0DfqmR/indoor_6.jpg",
                "https://i.postimg.cc/kX4Ht3r8/outdoor_1.jpg",
                "https://i.postimg.cc/2jPgdnK1/dm_auftrag_9_aussen_3.png",
                "https://i.postimg.cc/zBFZznsx/indoor_4.jpg",
                "https://i.postimg.cc/G2rV544C/indoor_6.jpg"
              ];
              const [activeIdx, setActiveIdx] = useState(0);
              useEffect(() => {
                const interval = setInterval(() => setActiveIdx(p => (p + 1) % images.length), 3000);
                return () => clearInterval(interval);
              }, [images.length]);

              return images.map((img, idx) => (
                <div
                  key={img}
                  className={`absolute inset-[-10%] transition-all duration-[3500ms] ease-in-out ${idx === activeIdx ? 'opacity-100 scale-110' : 'opacity-0 scale-125'}`}
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    willChange: 'opacity, transform'
                  }}
                />
              ));
            })()}
            <div className="absolute inset-0 bg-[#030303]/60 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/20 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1600px] px-6 md:px-24 py-12 md:py-24">
            <div className="space-y-12 md:space-y-32">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-4 mb-6 md:mb-10">
                  <div className="w-10 md:w-16 h-px bg-[#FF660F]"></div>
                  <span className="text-[9px] md:text-[11px] uppercase tracking-[0.6em] text-[#FF660F] font-black">the philosophy</span>
                </div>
                <h3 className="text-fluid-h1 font-heading leading-[0.85] tracking-tighter text-white lowercase mb-6 md:mb-12">
                  the living <br />
                  <span className="italic font-normal text-[#FF660F]">element</span>
                </h3>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 md:gap-24 items-start">
                <div className="relative">
                  <div className="absolute -left-8 top-0 w-px h-full bg-gradient-to-b from-[#FF660F] to-transparent opacity-40 hidden md:block"></div>
                  <p className="text-2xl md:text-4xl leading-[1.2] font-light text-white/95 max-w-2xl">
                    Our philosophy is rooted in the emotional resonance of a space. We master the dialogue between <span className="text-[#FF660F] font-medium italic">light, texture, and cinematic depth</span> to capture the ‘Living Element.’
                  </p>
                </div>

                <div className="space-y-12 md:mt-24">
                  <p className="text-base md:text-xl leading-relaxed font-light text-white/50 max-w-xl">
                    From restoring historic landmarks to developing contemporary visions from the ground up, we invite investors to inhabit the future today. We bridge the gap between technical blueprints and the aspiration of an elevated lifestyle. Whether Heritage or Neubau, we ensure <span className="text-white font-medium">every project is lived before it is built.</span>
                  </p>

                  <button
                    onClick={() => onNavigate(AppSection.CONTACT_FORM)}
                    className="group flex items-center gap-8"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 md:w-24 md:h-24 border border-white/20 rounded-full flex items-center justify-center transition-all duration-700 group-hover:border-[#FF660F] group-hover:scale-110">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FF660F] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-90 group-hover:bg-white text-white group-hover:text-[#FF660F]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] md:text-[12px] font-bold tracking-[0.5em] text-white uppercase group-hover:text-[#FF660F] transition-colors">Start Your Inquiry</span>
                      <div className="w-12 h-px bg-white/20 mt-2 transition-all duration-700 group-hover:w-full group-hover:bg-[#FF660F]"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sector II: Neubau Digital Synthesis */}
        <div className="relative min-h-screen flex items-center py-24 md:py-40 px-6 md:px-24">
          <div className="max-w-[1600px] mx-auto w-full relative">
            {/* Information box goes left now */}
            <div className={`${textboxClass(sector2InView)} md:left-0 md:top-[-1rem] lg:left-[-3rem] lg:top-[-3rem]`}>
              <span className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-[#FF660F] font-black mb-1.5 md:mb-3 opacity-70">SECTOR II</span>
              <h2 className={`text-lg md:text-xl lg:text-3xl xl:text-5xl font-heading mb-2 md:mb-3 leading-[1.1] lg:leading-[0.95] tracking-tight transition-colors ${isDark ? 'text-white' : 'text-black'}`}><span className="font-medium">Modern New Builds</span> <br /> <span className="italic font-light text-[#FF660F]">Defining the Skyline</span></h2>
              <p className={`text-[9px] md:text-[10px] lg:text-base leading-relaxed mb-4 md:mb-6 font-medium transition-colors ${isDark ? 'text-white/50' : 'text-black/50'}`}>From high-end residential complexes to cutting-edge commercial spaces. We provide technical precision and aesthetic perfection to ensure market dominance from the first concept.</p>
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-8 mt-auto">
                <button onClick={() => onNavigate(AppSection.ARCHITECTURE)} className={`text-[6px] md:text-[8px] uppercase tracking-[0.3em] font-black border-b-2 pb-0.5 ${isDark ? 'text-white/70 border-white/10 hover:border-[#FF660F]' : 'text-black/70 border-black/10 hover:border-[#FF660F]'}`}>PORTFOLIO</button>
                <button onClick={() => onNavigate(AppSection.CONTACT_FORM)} className={`px-6 md:px-6 lg:px-12 py-3 md:py-3 rounded-full text-[9px] lg:text-[11px] font-bold tracking-[0.2em] hover:scale-105 transition-all shadow-xl bg-[#FF660F] text-white shadow-[#FF660F]/20`}>INQUIRY NOW</button>
              </div>
            </div>
            <div ref={sector2Ref} className={`w-full md:w-[96%] lg:w-[94%] md:ml-auto min-h-[400px] md:min-h-[500px] lg:aspect-video relative rounded-[1rem] md:rounded-[2rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5 transition-all duration-1000 z-10 ${sector2InView ? 'grayscale-0 opacity-100' : 'grayscale opacity-40'}`}>
              <iframe
                src="https://player.vimeo.com/video/1165443658?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1"
                className="absolute inset-0 w-full h-full scale-[1.35] pointer-events-none"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                title="Modern New Build Reel"
              ></iframe>
              <div className={`absolute inset-0 bg-[#030303]/10`}></div>
            </div>
          </div>
        </div>

        {/* SECTION 5: NEUBAU SYNTHESIS GALLERY */}
        <div ref={neubauShowcaseRef} className="min-h-screen flex flex-col justify-center py-24 md:py-32 px-6 md:px-24 bg-[#030303]/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:60px_60px]"></div>
          </div>
          <div className="max-w-[1600px] mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-16 gap-3 md:gap-5 text-center md:text-left">
              <div className="space-y-1"><span className={`text-[7px] md:text-[9px] uppercase tracking-[0.5em] font-bold block transition-colors ${isDark ? 'text-white/20' : 'text-black/30'}`}>PORTFOLIO</span><h3 className={`text-xl md:text-2xl lg:text-7xl font-heading font-light tracking-tighter transition-colors ${isDark ? 'text-white' : 'text-black'}`}>Neubau <span className="italic text-[#FF660F]">Synthesis</span></h3></div>
              <button onClick={() => onNavigate(AppSection.ARCHITECTURE)} className={`text-[7px] md:text-[9px] uppercase tracking-[0.5em] font-bold transition-colors border-b-2 pb-1 ${isDark ? 'text-white/20 border-white/5 hover:text-white hover:border-white' : 'text-black/30 border-black/5 hover:border-black'}`}>OPEN LIBRARY</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-10 lg:gap-16">
              <ArchitectureShowcaseItem
                title="Apartment complex"
                subtitle="Baden-Württemberg"
                onClick={() => onNavigate(AppSection.ARCHITECTURE, 'arch-04')}
                isDark={isDark}
                images={ARCHITECTURE_PROJECTS.find(p => p.id === 'arch-04')?.images || []}
                isInView={neubauShowcaseInView}
              />
              <ArchitectureShowcaseItem
                title="NRW Penthouse"
                subtitle="Luxury Lifestyle"
                onClick={() => onNavigate(AppSection.ARCHITECTURE, 'arch-07')}
                isDark={isDark}
                images={ARCHITECTURE_PROJECTS.find(p => p.id === 'arch-07')?.images || []}
                isInView={neubauShowcaseInView}
              />
            </div>
          </div>
        </div>

        {/* Sector III: Integrated Growth Strategy */}
        <div className="relative min-h-[100vh] flex items-center py-24 md:py-40 px-0 md:px-24 overflow-hidden">
          {/* Mobile Video Background (Full Section) */}
          <div className="absolute inset-0 w-full h-full md:hidden overflow-hidden z-0">
            <iframe
              src="https://player.vimeo.com/video/1164815646?background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479"
              className="absolute top-1/2 left-1/2 w-[350vw] h-[350vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover"
              frameBorder="0"
              allow="autoplay; fullscreen"
              title="Mobile Background Video"
            />
            <div className="absolute inset-0 bg-[#030303]/80"></div>
          </div>

          <div className="max-w-[1600px] mx-auto w-full space-y-16 md:space-y-40 relative z-10">
            <div ref={growthRef} className={`relative md:bg-[#030303] md:rounded-[2rem] lg:rounded-[4rem] px-6 py-0 md:p-10 lg:p-14 text-white transition-all duration-500 overflow-hidden md:shadow-2xl min-h-[450px] lg:min-h-[75vh] flex items-center ${growthInView ? 'opacity-100' : 'opacity-40'}`}>

              {/* Desktop Video Background (Confined to Card) */}
              <div className="absolute inset-0 overflow-hidden z-0 hidden md:block">
                <iframe
                  src="https://player.vimeo.com/video/1164815646?background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none md:min-w-[100vw] md:min-h-[56.25vw] md:top-1/2 md:-translate-y-1/2"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  title="Desktop Background Video"
                />
                <div className="absolute inset-0 bg-[#030303]/80 backdrop-blur-none"></div>
              </div>

              <div className="relative z-10 w-full py-12 md:py-0">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
                  <div className="space-y-4 md:space-y-8 lg:space-y-12 text-center md:text-left">
                    <div>
                      <span className="text-[9px] md:text-[8px] lg:text-[11px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-[#FF660F] font-black block opacity-80 mb-3 md:mb-6">PILLAR III: GROWTH</span>
                      <h2 className="text-fluid-h3 font-heading leading-[1] tracking-tighter font-light mb-4 pb-4">Digital Strategy <br /> <span className="italic font-light text-[#FF660F]">for AEC Leaders</span></h2>
                    </div>
                    <p className="text-white/60 text-fluid-p font-light leading-relaxed max-w-md mx-auto md:mx-0">Empowering high-end architectural and heritage projects with data-driven online positioning, increased user trust, and maximized market conversion.</p>
                    <button onClick={() => onNavigate(AppSection.CONTACT_FORM)} className={`px-9 md:px-8 lg:px-12 py-3 md:py-4 lg:py-6 border-2 rounded-full text-[10px] md:text-[9px] font-bold tracking-[0.2em] md:tracking-[0.5em] uppercase transition-all shadow-xl border-[#FF660F] text-[#FF660F] hover:bg-[#FF660F] hover:text-white`}>Inquire Strategy</button>
                  </div>
                  <div className="grid gap-3 md:gap-6 lg:gap-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 lg:gap-8">
                      <WebConversionViz isInView={growthInView} />
                      <SEOVisibilityViz isInView={growthInView} />
                    </div>
                    <div className="col-span-full">
                      <VideoMarketingViz isInView={growthInView} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="digital-strategy" ref={tacticalRef} className={`relative min-h-[500px] lg:min-h-screen flex items-center justify-center overflow-hidden mt-12 md:mt-32 border-t border-white/5 ${tacticalInView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'} transition-all duration-[1500ms]`}>
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-[#030303]">
            <img src="https://i.postimg.cc/TPfPc9MM/Make-the-background-030303-2k-delpmaspu.jpg" alt="Growth Ecosystem" className="absolute inset-0 w-full h-full object-cover md:object-contain object-right translate-x-[35%] md:translate-x-[20%] scale-[2.2] md:scale-100 origin-right md:origin-center" />
          </div>
          <div className="absolute inset-0 bg-[#030303]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] opacity-80"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 pb-32">
            <div className="space-y-12 md:space-y-32">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-4 mb-6 md:mb-10">
                  <div className="w-10 md:w-16 h-px bg-[#FF660F]"></div>
                  <span className="text-[9px] md:text-[11px] uppercase tracking-[0.6em] text-[#FF660F] font-black">Growth Ecosystem</span>
                </div>
                <h3 className="text-fluid-h3 font-heading font-light leading-[0.9] tracking-[-0.04em] text-white lowercase mb-6 md:mb-12">
                  scale your vision <br />
                  <span className="italic font-light text-[#FF660F]">with digital assets</span>
                </h3>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 md:gap-24 items-start">
                <div className="relative">
                  <div className="absolute -left-8 top-0 w-px h-full bg-gradient-to-b from-[#FF660F] to-transparent opacity-40 hidden md:block"></div>
                  <p className="text-2xl md:text-4xl leading-[1.2] font-light text-white/95 max-w-2xl">
                    We provide the technical framework to showcase your heritage projects on any platform with <span className="text-[#FF660F] font-medium italic">maximum engagement.</span>
                  </p>
                </div>

                <div className="space-y-12 md:mt-24">
                  <div className="space-y-8">
                    <div className="group">
                      <h4 className="text-xl md:text-2xl font-heading text-white lowercase tracking-tight group-hover:text-[#FF660F] transition-colors"><span className="text-[#FF660F] font-bold mr-3 tracking-widest text-sm uppercase">PILLAR I</span> conversion web ecosystems</h4>
                      <p className="text-base md:text-lg font-light leading-relaxed text-white/50 max-w-xl">Digital stages that increase investor trust and maximize photorealistic conversion.</p>
                    </div>
                    <div className="group pt-4 border-t border-white/5">
                      <h4 className="text-xl md:text-2xl font-heading text-white lowercase tracking-tight group-hover:text-[#FF660F] transition-colors"><span className="text-[#FF660F] font-bold mr-3 tracking-widest text-sm uppercase">PILLAR II</span> cinematic storytelling</h4>
                      <p className="text-base md:text-lg font-light leading-relaxed text-white/50 max-w-xl">High-impact video campaigns that increase purchase intent by 97% across AEC sectors.</p>
                    </div>
                    <div className="group pt-4 border-t border-white/5">
                      <h4 className="text-xl md:text-2xl font-heading text-white lowercase tracking-tight group-hover:text-[#FF660F] transition-colors"><span className="text-[#FF660F] font-bold mr-3 tracking-widest text-sm uppercase">PILLAR III</span> strategic market authority</h4>
                      <p className="text-base md:text-lg font-light leading-relaxed text-white/50 max-w-xl">SEO and organic positioning to dominate the AEC sector using heritage search intent.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate(AppSection.CONTACT_FORM)}
                    className="group flex items-center gap-8 mt-12"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 md:w-24 md:h-24 border border-white/20 rounded-full flex items-center justify-center transition-all duration-700 group-hover:border-[#FF660F] group-hover:scale-110">
                        <div className="w-3 h-3 md:w-4 md:h-4 bg-[#FF660F] rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase block text-white group-hover:text-[#FF660F] transition-colors">Inquire Now</span>
                      <span className="text-[9px] font-light tracking-[0.2em] text-white/40 group-hover:text-white/80 transition-colors">Start strategy</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
  @keyframes scan { 0% { transform: translateX(-150%); } 100% { transform: translateX(250%); } }
  @keyframes slider { 0%, 100% { transform: translateX(0%); } 50% { transform: translateX(100%); } }
  @keyframes seo-bar-1 { 0%, 100% { width: 40%; } 50% { width: 100%; } }
  @keyframes seo-bar-2 { 0%, 100% { width: 30%; } 50% { width: 80%; } }
  @keyframes seo-bar-3 { 0%, 100% { width: 50%; } 50% { width: 90%; } }
  `}</style>
    </section>
  );
};