import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const Lightbox: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0b]/40 animate-in fade-in duration-500 backdrop-blur-[32px] no-print"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-4 text-white/50 hover:text-[#FF660F] transition-all bg-white/5 rounded-full hover:bg-white/10 backdrop-blur-[5px] border border-white/10 shadow-2xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <img
        src={imageUrl}
        alt="Enlarged view"
        className="max-w-[95vw] max-h-[85vh] object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-500"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-6 text-white/40 text-[10px] md:text-[10px] uppercase tracking-[0.5em] font-bold">
        Tap to close
      </div>
    </div>
  );
};

const ProjectSlideshow: React.FC<{ images: string[]; onImageClick: (url: string) => void }> = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      className="relative w-full aspect-[4/5] sm:aspect-[21/9] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] group cursor-zoom-in"
      onClick={() => onImageClick(images[currentIndex])}
    >
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`Slide ${idx}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[3000ms] ease-in-out ${idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent no-print"></div>

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20 no-print">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`h-0.5 md:h-1 rounded-full transition-all duration-700 ease-out ${idx === currentIndex ? 'w-8 md:w-12 bg-[#FF660F]' : 'w-2 md:w-4 bg-white/20'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const targetPos = useRef(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef<boolean>(false);
  const autoDirection = useRef<number>(1);

  useEffect(() => {
    let animationFrame: number;
    const lerp = () => {
      setSliderPos(current => {
        const diff = targetPos.current - current;
        if (Math.abs(diff) < 0.01) return targetPos.current;
        return current + diff * 0.1;
      });
      animationFrame = requestAnimationFrame(lerp);
    };
    animationFrame = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const moveSlider = () => {
      if (isHovering.current) return;
      let next = targetPos.current + (0.15 * autoDirection.current);
      if (next >= 85) { autoDirection.current = -1; next = 85; }
      else if (next <= 15) { autoDirection.current = 1; next = 15; }
      targetPos.current = next;
    };
    const interval = setInterval(moveSlider, 16);
    return () => clearInterval(interval);
  }, []);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const newPos = ((x - rect.left) / rect.width) * 100;
    targetPos.current = Math.max(0, Math.min(100, newPos));
  };

  const getMosaicClasses = (index: number) => {
    const mod = index % 4;
    switch (mod) {
      case 0: return "col-span-1 md:col-span-2 md:row-span-2 aspect-square md:aspect-[4/4.1]";
      case 1: return "col-span-1 aspect-square";
      case 2: return "col-span-1 aspect-square";
      case 3: return "col-span-1 md:col-span-3 aspect-video md:aspect-[21/9]";
      default: return "md:col-span-1 aspect-square";
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center animate-in fade-in duration-700 bg-[#0a0a0b]/60 backdrop-blur-[12px] print:relative print:bg-white print:z-0">
        <div className="absolute inset-0 z-0 no-print" onClick={onClose}></div>

        <div className="absolute top-4 right-4 md:top-10 md:right-10 z-[80] flex gap-3 no-print">
          <button
            onClick={handleExportPDF}
            className="p-4 md:p-4 text-white/80 hover:text-[#FF660F] transition-all bg-[#0a0a0b]/60 rounded-full border border-white/10 flex items-center gap-2 group shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span className="text-[11px] font-bold tracking-widest hidden md:block">EXPORT PDF</span>
          </button>

          <button
            onClick={onClose}
            className="p-3 md:p-4 text-white/50 hover:text-[#FF660F] transition-all bg-[#0a0a0b]/40 rounded-full border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="relative w-full h-full md:h-[90vh] md:max-w-[1700px] md:mx-6 overflow-y-auto bg-[#0a0a0b]/40 md:rounded-[4rem] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.6)] border-t md:border border-white/20 backdrop-blur-[20px] custom-scrollbar animate-in slide-in-from-bottom-12 duration-700 print:w-full print:h-auto print:max-w-none print:m-0 print:border-none print:shadow-none print:bg-white print:text-black">
          <div className="px-6 md:px-24 py-16 md:py-24 space-y-24 md:space-y-48 print:py-0 print:px-0 print:space-y-12">

            <div className="grid lg:grid-cols-12 gap-12 md:gap-20 items-start">
              <div className="lg:col-span-5 space-y-12 print:col-span-12">
                <div>
                  <div className="flex flex-wrap gap-x-4 mb-8 print:mb-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] md:text-[10px] uppercase tracking-[0.4em] font-black text-[#FF660F]">{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-medium text-white mb-8 md:mb-10 leading-[1] md:leading-[0.9] tracking-tighter print:text-black print:text-4xl">
                    {project.title.split(' ')[0]} <br />
                    <span className="italic font-normal text-[#FF660F]">{project.title.split(' ').slice(1).join(' ')}</span>
                  </h2>
                  <p className="text-white/60 text-sm sm:text-base md:text-xl leading-relaxed font-light print:text-black/80 print:text-sm">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-6 pt-10 border-t border-white/10 print:border-black/10 print:pt-4">
                  <h4 className="text-[9px] md:text-[11px] uppercase tracking-[0.6em] text-white/30 font-bold print:text-black/30">INSIGHTS</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1 py-4 border-b border-white/10 print:border-black/5">
                      <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] print:text-black/40">Type</span>
                      <span className="text-base md:text-lg text-white font-light print:text-black">Heritage Reuse</span>
                    </div>
                    <div className="flex flex-col gap-1 py-4 border-b border-white/10 print:border-black/5">
                      <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] print:text-black/40">Location</span>
                      <span className="text-base md:text-lg text-white font-light print:text-black">{project.location || 'Germany'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 print:col-span-12 print:mt-12">
                {project.beforeAfter ? (
                  <div className="space-y-6 md:space-y-10">
                    <h3 className="text-[9px] md:text-[11px] uppercase tracking-[0.6em] text-[#FF660F] font-black no-print">SYNTHESIS COMPARISON</h3>

                    {/* Simplified Comparison for Print */}
                    <div className="hidden print:grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <img src={project.beforeAfter.before} className="w-full aspect-video object-cover" alt="Historical" />
                        <p className="text-[8px] uppercase tracking-widest text-center">Before (Historical)</p>
                      </div>
                      <div className="space-y-2">
                        <img src={project.beforeAfter.after} className="w-full aspect-video object-cover border border-[#FF660F]/50" alt="Synthesis" />
                        <p className="text-[8px] uppercase tracking-widest text-center text-[#FF660F]">After (Synthesis)</p>
                      </div>
                    </div>

                    <div ref={containerRef} className="no-print relative w-full aspect-[3/4] sm:aspect-video rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5 cursor-ew-resize group" onMouseMove={handleMove} onTouchMove={handleMove} onMouseEnter={() => isHovering.current = true} onMouseLeave={() => isHovering.current = false}>
                      <img src={project.beforeAfter.before} className="absolute inset-0 w-full h-full object-cover" alt="Before" />
                      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}>
                        <img src={project.beforeAfter.after} className="absolute inset-0 w-full h-full object-cover" alt="After" />
                      </div>
                      <div className="absolute inset-y-0 w-[1.5px] bg-[#FF660F] z-10" style={{ left: `${sliderPos}%`, boxShadow: '0 0 15px rgba(255,101,44,0.6)' }}>
                        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-12 bg-white/40 rounded-full blur-[1px]"></div>
                      </div>
                      <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 px-4 sm:px-6 py-2 bg-[#0a0a0b]/40 backdrop-blur-[12px] rounded-full text-[9px] sm:text-[10px] text-white uppercase tracking-widest border border-white/10 z-20">BEFORE</div>
                      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 px-4 sm:px-6 py-2 bg-[#FF660F]/80 backdrop-blur-[12px] rounded-full text-[9px] sm:text-[10px] text-white uppercase tracking-widest border border-white/10 z-20">AFTER</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-right-12 duration-1000">
                    <h3 className="text-[9px] md:text-[11px] uppercase tracking-[0.6em] text-[#FF660F] font-black">IMMERSIVE PERSPECTIVE</h3>
                    <div className="relative group overflow-hidden rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                      <img
                        src={project.images[1] || project.imageUrl}
                        className="w-full h-full object-cover aspect-[4/3] md:aspect-video transition-transform duration-[4000ms] group-hover:scale-110"
                        alt={project.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-12 left-12">
                        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black text-[#FF660F] block mb-2">CINEMATIC SYNTHESIS</span>
                        <h4 className="text-xl md:text-3xl font-heading text-white">{project.title}</h4>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {project.images && project.images.length > 0 && (
              <div className="space-y-8 md:space-y-16 print:break-before-page print:mt-12">
                <h3 className="text-[9px] md:text-[11px] uppercase tracking-[0.6em] text-[#FF660F] font-black print:text-black">IMMERSIVE VISION</h3>
                <ProjectSlideshow images={project.images} onImageClick={setLightboxImage} />
              </div>
            )}

            <div className="space-y-12 md:space-y-24 print:space-y-12 print:mt-12">
              <div className="border-b border-white/10 pb-8 print:border-black/10">
                <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-[#FF660F] font-black mb-4">GALLERY</h3>
                <p className="text-white/50 text-xs md:text-sm max-w-xl font-light tracking-widest leading-relaxed print:text-black/60">
                  Perspectives showcasing the digital synthesis of heritage preservation and high-performance adaptation.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-14 print:gap-4 print:grid-cols-2">
                {project.images?.map((img, i) => (
                  <div
                    key={i}
                    className={`relative rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-white/5 group shadow-lg cursor-zoom-in print:rounded-none print:shadow-none print:border-none ${getMosaicClasses(i)}`}
                    onClick={() => setLightboxImage(img)}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover transition-all duration-[3000ms] ease-out group-hover:scale-110 print:group-hover:scale-100"
                      alt={`View ${i + 1}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity no-print"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 md:pt-24 pb-12 flex flex-col items-center text-center space-y-8 md:space-y-12 no-print">
              <div className="w-px h-16 md:h-32 bg-gradient-to-b from-[#FF660F] to-transparent"></div>
              <h4 className="text-3xl md:text-5xl font-heading text-white italic font-light tracking-tight">Return to Portfolio</h4>
              <button
                onClick={onClose}
                className="px-10 md:px-20 py-5 md:py-8 bg-[#FF660F] text-white rounded-full text-[10px] md:text-[12px] font-bold tracking-[0.4em] md:tracking-[0.8em] uppercase hover:scale-105 transition-all shadow-2xl shadow-[#FF660F]/20"
              >
                Close Detail
              </button>
            </div>
          </div>
        </div>
      </div>

      {lightboxImage && (
        <Lightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />
      )}
    </>
  );
};