import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  isDark?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, isDark = false }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-cycle imagery when in view, just like the homepage
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !project.images || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % project.images!.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, project.images]);

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-[2.5rem] transition-all duration-1000 cursor-pointer border backdrop-blur-[12px] ${isDark
        ? 'bg-white/5 border-white/5 hover:shadow-[0_40px_80px_-20px_rgba(255,101,44,0.1)]'
        : 'glass-morphism bg-white/40 border-black/5 hover:shadow-[0_40px_80px_-20px_rgba(255,101,44,0.15)]'
        } ${isInView ? 'grayscale-0 opacity-100' : 'grayscale opacity-40'}`}
      onClick={() => onClick(project)}
    >
      <div className="aspect-[4/5] w-full overflow-hidden relative">
        {project.images && project.images.length > 0 ? (
          project.images.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`${project.title} view ${idx}`}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[2000ms] ease-in-out ${idx === imgIdx ? 'opacity-100 scale-110' : 'opacity-0 scale-100'} ${isInView ? 'grayscale-0' : 'grayscale'}`}
            />
          ))
        ) : (
          <img
            src={project.imageUrl}
            alt={project.title}
            className={`h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 ${isInView ? 'grayscale-0' : 'grayscale'}`}
          />
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center z-10">
          <span className={`px-8 py-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl text-[10px] tracking-[0.4em] uppercase font-bold bg-[#FF660F] text-white`}>
            View Gallery
          </span>
        </div>

        {/* Progress Dots */}
        {project.images && project.images.length > 1 && (
          <div className="absolute top-8 right-8 flex gap-1.5 z-20">
            {project.images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-500 ${idx === imgIdx ? 'w-6 bg-[#FF660F]' : isDark ? 'w-1.5 bg-white/10' : 'w-1.5 bg-[#0a0a0b]/10'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-8 md:p-10">
        <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-5">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] md:text-[9px] uppercase tracking-[0.3em] font-black text-[#FF660F]/70">
              {tag}
            </span>
          ))}
        </div>

        <h3 className={`text-2xl md:text-3xl font-heading font-medium mb-3 md:mb-4 group-hover:text-[#FF660F] transition-colors leading-tight md:leading-none tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
          {project.title}
        </h3>
        <p className={`text-xs md:text-sm leading-relaxed font-light mb-6 md:mb-8 transition-opacity line-clamp-3 md:line-clamp-2 ${isDark ? 'text-white/40 group-hover:text-white/60' : 'text-stone-600 group-hover:text-stone-800'}`}>
          {project.description}
        </p>

        <div className={`w-12 h-px group-hover:w-full group-hover:bg-[#FF660F]/30 transition-all duration-1000 ${isDark ? 'bg-white/10' : 'bg-[#0a0a0b]/10'}`}></div>
      </div>
    </div>
  );
};
