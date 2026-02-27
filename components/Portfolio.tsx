import React, { useEffect } from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';

export const ARCHITECTURE_PROJECTS: Project[] = [
  {
    id: 'arch-03',
    category: 'architecture',
    title: 'Coworking space Wuppertal',
    description: 'A modern workplace integration within a historical architectural shell, blending industrial aesthetics with digital-age collaboration. This project reimagines high-ceilinged historical structures as high-performance, light-filled creative hubs.',
    imageUrl: 'https://i.postimg.cc/pdj65zG7/indoor-1.jpg',
    images: [
      "https://i.postimg.cc/DZKYr0Rm/outdoor_4.jpg",
      "https://i.postimg.cc/pdj65zG7/indoor-1.jpg",
      "https://i.postimg.cc/0NSBKDWF/indoor-2.jpg",
      "https://i.postimg.cc/HLMh8XZN/indoor-3.jpg",
      "https://i.postimg.cc/hGm5QTZS/indoor-5.jpg",
      "https://i.postimg.cc/XJ0DfqmR/indoor-6.jpg",
      "https://i.postimg.cc/xCSFv8BD/indoor-7.jpg",
      "https://i.postimg.cc/k4dhQGLJ/outdoor-2.jpg",
      "https://i.postimg.cc/JnWdN0Sn/outdoor-3.jpg",
      "https://i.postimg.cc/NMwP6FZy/outdoor-6.jpg",
      "https://i.postimg.cc/pTt1fr3h/outdoor-7.jpg"
    ],
    beforeAfter: {
      before: "https://i.postimg.cc/JhX2HZ6S/indoor_4_old.jpg",
      after: "https://i.postimg.cc/hGm5QTZS/indoor_5.jpg"
    },
    tags: ['Workplace', 'Heritage Reuse', 'Modernist'],
    location: 'Wuppertal'
  },
  {
    id: 'arch-01',
    category: 'architecture',
    title: 'Luxus lofts Nürnberg',
    description: 'Transformation of a historic industrial building into high-end residential lofts. This project preserves the raw industrial heritage and material soul while introducing luxury living amenities and cinematic spatial depth. It is an industrial heritage building converted to luxus lofts, showcasing the perfect balance between grit and grandeur.',
    imageUrl: 'https://i.postimg.cc/qB8WLNVN/outside_10.jpg',
    images: [
      "https://i.postimg.cc/qB8WLNVN/outside_10.jpg",
      "https://i.postimg.cc/x1MC3CZM/Aussen2.png",
      "https://i.postimg.cc/C1X54qw8/Innen2.png",
      "https://i.postimg.cc/Mp76jLcG/Aussen7.png",
      "https://i.postimg.cc/qv4RQ0H2/Innen3.png"
    ],
    beforeAfter: {
      before: "https://i.postimg.cc/sXCwQJ2k/outside_10_old.jpg",
      after: "https://i.postimg.cc/qB8WLNVN/outside_10.jpg"
    },
    tags: ['Industrial Heritage', 'Luxus Lofts', 'Adaptive Reuse'],
    location: 'Nürnberg'
  },
  {
    id: 'arch-02',
    category: 'architecture',
    title: 'Heritage Multi-Family Wuppertal',
    description: 'A sophisticated adaptive reuse project transforming a former monastic complex into a premium multi-family residence. The design bridges historical sacred architecture with modern residential luxury, creating a consistent architectural dialogue between past and present.',
    imageUrl: 'https://i.postimg.cc/13nknhx3/outdoor-2-new.jpg',
    images: [
      "https://i.postimg.cc/zXcmGDc9/outdoor-4.jpg",
      "https://i.postimg.cc/FsBtHFBp/indoor-1.jpg",
      "https://i.postimg.cc/85mQph24/indoor-2.jpg",
      "https://i.postimg.cc/qRxVJ8PK/indoor-3.jpg",
      "https://i.postimg.cc/zBFZznsx/indoor-4.jpg",
      "https://i.postimg.cc/bJhff6BJ/indoor-5.jpg",
      "https://i.postimg.cc/G2rV544C/indoor-6.jpg",
      "https://i.postimg.cc/13nknhx3/outdoor-2-new.jpg",
      "https://i.postimg.cc/630gJBZ2/outdoor-3.jpg"
    ],
    beforeAfter: {
      before: "https://i.postimg.cc/fRtGtn4D/outdoor-1-old.jpg",
      after: "https://i.postimg.cc/13nknhx3/outdoor-2-new.jpg"
    },
    tags: ['Heritage', 'Multi-Family', 'Residential'],
    location: 'Wuppertal'
  },
  {
    id: 'arch-04',
    category: 'architecture',
    title: 'Apartment complex, Baden-Württemberg',
    description: 'A landmark high-end commercial development featuring a crystalline facade and visionary spatial architecture. This project defines modern luxury corporate environments with a focus on transparency, high-performance materials, and cinematic aesthetic dominance.',
    imageUrl: 'https://i.postimg.cc/kX4Ht3r8/outdoor-1.jpg',
    images: [
      "https://i.postimg.cc/kX4Ht3r8/outdoor-1.jpg",
      "https://i.postimg.cc/15jjGCsx/outdoor-3.jpg",
      "https://i.postimg.cc/ZKMM87ZL/outdoor-4.jpg",
      "https://i.postimg.cc/XJ0DfqmR/indoor-6.jpg",
      "https://i.postimg.cc/xCSFv8BD/indoor-7.jpg"
    ],
    tags: ['Commercial', 'Modern Neubau', 'Glass Architecture'],
    location: 'Baden-Württemberg'
  },

  {
    id: 'arch-07',
    category: 'architecture',
    title: 'NRW Penthouse',
    description: 'A visionary transformation of a high-end space into a cutting-edge luxury penthouse. This project showcases the power of digital synthesis in reimagining interior volumes with modern architectural elements and premium lifestyle aspirations.',
    imageUrl: 'https://i.postimg.cc/9FbxzbF9/volkers-Nordrhein-Westfalen-outdoor-1.jpg',
    images: [
      "https://i.postimg.cc/kXsjDsXm/volkers-Nordrhein-Westfalen-indoor-1.jpg",
      "https://i.postimg.cc/m2jdhj2f/volkers-Nordrhein-Westfalen-indoor-2.jpg",
      "https://i.postimg.cc/bNg6dgNP/volkers-Nordrhein-Westfalen-indoor-3.jpg",
      "https://i.postimg.cc/Pry6NyrP/volkers-Nordrhein-Westfalen-indoor-5.jpg",
      "https://i.postimg.cc/9FbxzbF9/volkers-Nordrhein-Westfalen-outdoor-1.jpg",
      "https://i.postimg.cc/Wb89t8b0/volkers-Nordrhein-Westfalen-outdoor-2.jpg",
      "https://i.postimg.cc/g20ghhnw/volkers-Nordrhein-Westfalen-outdoor-3.jpg",
      "https://i.postimg.cc/y8NLRRkF/volkers-Nordrhein-Westfalen-outdoor-4.jpg",
      "https://i.postimg.cc/52tszz63/volkers-Nordrhein-Westfalen-outdoor-5.jpg"
    ],
    beforeAfter: {
      before: "https://i.postimg.cc/x173b4r2/volkers-Nordrhein-Westfalen-indoor-4-old.jpg",
      after: "https://i.postimg.cc/Pry6NyrP/volkers-Nordrhein-Westfalen-indoor-5.jpg"
    },
    tags: ['Office', 'Digital Synthesis', 'Industrial'],
    location: 'NRW'
  }
];

interface PortfolioProps {
  category: 'architecture';
  onSelectProject: (project: Project) => void;
  isDark: boolean;
}

export const Portfolio: React.FC<PortfolioProps> = ({ category, onSelectProject, isDark }) => {
  const [viewMode, setViewMode] = React.useState<'cards' | 'cloud'>('cards');

  // Flatten all images for the cloud view
  const allProjectImages = ARCHITECTURE_PROJECTS.flatMap(p =>
    (p.images || []).map(img => ({ url: img, project: p }))
  ).sort(() => Math.random() - 0.5); // Cinematic shuffle

  return (
    <section className={`py-16 md:py-24 lg:py-48 px-6 md:px-10 lg:px-24 max-w-[1700px] mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 transition-colors ${isDark ? 'text-white' : 'text-black'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 lg:mb-32 gap-6 md:gap-10">
        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          <span className={`text-[8px] md:text-[10px] lg:text-[11px] uppercase tracking-[0.5em] md:tracking-[0.8em] font-bold block transition-colors ${isDark ? 'text-white/20' : 'text-black/30'}`}>COLLECTION IV: SYNTHESIS</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-heading font-light tracking-tighter leading-[1] md:leading-[0.9]">
            Adaptive AI <br />
            <span className={`italic ${isDark ? 'text-white' : 'text-black'}`}>Architecture</span>
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6 md:gap-12">
          {/* View Toggle */}
          <div className={`p-1 rounded-full border transition-all duration-500 overflow-hidden flex ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#0a0a0b]/5 border-black/5'}`}>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-5 md:px-7 py-2.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center gap-2 ${viewMode === 'cards' ? ('bg-[#FF660F] text-white shadow-lg') : isDark ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Standard
            </button>
            <button
              onClick={() => setViewMode('cloud')}
              className={`px-5 md:px-7 py-2.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center gap-2 ${viewMode === 'cloud' ? ('bg-[#FF660F] text-white shadow-lg') : isDark ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Grid Cloud
            </button>
          </div>

          <div className="max-w-xs md:max-w-sm lg:max-w-md md:text-right">
            <p className={`text-[10px] md:text-xs lg:text-sm font-light leading-relaxed tracking-wide transition-colors ${isDark ? 'text-white/40' : 'text-stone-500'}`}>
              {viewMode === 'cards'
                ? "A specialized collection focusing on the intersection of heritage preservation and generative photorealism."
                : "A cinematic cloud of project perspectives. Tap any visual to immerse yourself in the detailed project synthesis."
              }
            </p>
          </div>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-16">
          {ARCHITECTURE_PROJECTS.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onSelectProject}
              isDark={isDark}
            />
          ))}
        </div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 animate-in fade-in zoom-in-95 duration-700">
          {allProjectImages.map((item, idx) => (
            <div
              key={`${item.project.id}-${idx}`}
              className="relative group overflow-hidden rounded-[1rem] md:rounded-[2rem] border border-white/5 cursor-pointer shadow-lg transition-transform hover:scale-[1.02] hover:z-10"
              onClick={() => onSelectProject(item.project)}
            >
              <img
                src={item.url}
                alt={item.project.title}
                className="w-full h-auto object-cover transition-all duration-700 group-hover:blur-[2px]"
              />
              <div className="absolute inset-0 bg-[#0a0a0b]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8 backdrop-blur-[4px]">
                <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{item.project.tags[0]}</span>
                <h4 className="text-sm md:text-lg font-heading text-white font-medium leading-none">{item.project.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};