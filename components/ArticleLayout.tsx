import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articles, ArticleBlock } from '../content/articles';
import { Language } from '../translations';
import { SEOHelmet } from './SEOHelmet';

interface ArticleLayoutProps {
  isDark: boolean;
  language: Language;
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({ isDark, language }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const article = articles.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'text-white' : 'text-black'}`}>
        <h1 className="text-4xl font-heading">Article not found</h1>
        <button onClick={() => navigate(-1)} className="mt-8 text-[#FF660F] uppercase tracking-widest font-bold">Go Back</button>
      </div>
    );
  }

  const content = article.content[language];

  const renderBlock = (block: ArticleBlock, index: number) => {
    switch (block.type) {
      case 'h2':
        return <h2 key={index} className="text-3xl md:text-4xl font-heading font-medium tracking-tight mt-20 mb-8 max-w-3xl mx-auto px-6">{block.content}</h2>;
      case 'h3':
        return <h3 key={index} className="text-2xl md:text-3xl font-heading text-[#FF660F] mt-16 mb-6 max-w-3xl mx-auto px-6">{block.content}</h3>;
      case 'p':
        return <p key={index} className="text-lg md:text-xl font-light leading-relaxed mb-8 opacity-80 max-w-3xl mx-auto px-6">{block.content}</p>;
      case 'callout':
        return (
          <div key={index} className={`p-6 md:p-8 border-l-4 border-[#FF660F] my-12 max-w-3xl mx-auto px-6 ${isDark ? 'bg-white/5' : 'bg-black/5'} `}>
            <p className="text-base md:text-lg italic font-medium">{block.content}</p>
          </div>
        );
      case 'image':
        if ((block as any).size === 'reference') {
           return (
             <figure key={index} className="my-8 w-full max-w-sm md:max-w-md lg:max-w-xl mx-auto px-6">
               <div className="w-full flex items-center justify-center">
                   <img src={block.src} alt={block.alt} className="w-full h-auto object-contain rounded-lg border border-white/5 opacity-80" />
               </div>
               {block.caption && <figcaption className="mt-4 text-[10px] md:text-xs text-center opacity-50 px-6 uppercase tracking-widest">{block.caption}</figcaption>}
             </figure>
           );
        }
        if ((block as any).size === 'inline') {
           return (
             <figure key={index} className="my-10 w-full max-w-3xl mx-auto px-6">
               <div className="w-full flex items-center justify-center">
                   <img src={block.src} alt={block.alt} className="w-full max-w-lg lg:max-w-2xl h-auto object-contain rounded-xl shadow-lg border border-white/10" />
               </div>
               {block.caption && <figcaption className="mt-4 text-xs md:text-sm text-center opacity-60 px-6">{block.caption}</figcaption>}
             </figure>
           );
        }
        return (
          <figure key={index} className="my-20 w-full object-cover">
            <div className="w-full h-80 md:h-[600px] lg:h-[90vh] bg-black/10 overflow-hidden relative flex items-center justify-center">
                {block.src.includes('placeholder') ? (
                  <span className="text-white/30 tracking-widest uppercase text-sm md:text-lg px-6 text-center">[Placeholder Image: {block.alt}]</span>
                ) : (
                  <img src={block.src} alt={block.alt} className="w-full h-full object-cover" />
                )}
            </div>
            {block.caption && <figcaption className="mt-6 text-sm md:text-base text-center opacity-50 tracking-widest uppercase px-6">{block.caption}</figcaption>}
          </figure>
        );
      case 'comparison':
        return (
          <div key={index} className="my-24 space-y-8 w-full">
            <h4 className="text-center text-sm md:text-base uppercase tracking-[0.4em] font-bold text-[#FF660F]">{block.label}</h4>
            <div className="relative grid lg:grid-cols-2 group border border-white/10 rounded-[2rem] md:rounded-[4rem] overflow-hidden bg-black/40 shadow-2xl">
              
              {/* Elegant Before/After Divider (Desktop) */}
              <div className="hidden lg:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/20 z-10"></div>

              <div className="relative group p-4 md:p-8">
                 <div className="w-full aspect-square md:aspect-[4/3] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden bg-black/10">
                    {block.before.includes('placeholder') ? (
                      <span className="text-white/30 tracking-widest uppercase text-xs md:text-sm text-center px-4">[Placeholder Before:<br/>Raw Photo/CAD]</span>
                    ) : (
                      <img src={block.before} alt="Raw Asset" className="w-full h-full object-cover grayscale-[0.2]" />
                    )}
                 </div>
                 <p className="mt-6 text-center text-xs md:text-sm uppercase tracking-[0.3em] font-bold opacity-60">Raw Photo</p>
              </div>
              
              <div className="relative group p-4 md:p-8 bg-[#FF660F]/5">
                 <div className="w-full aspect-square md:aspect-[4/3] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden">
                    {block.after.includes('placeholder') ? (
                      <span className="text-[#FF660F]/50 tracking-widest uppercase text-xs md:text-sm text-center px-4">[Placeholder After:<br/>Render]</span>
                    ) : (
                      <img src={block.after} alt="Final Render" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms]" />
                    )}
                 </div>
                 <p className="mt-6 text-center text-xs md:text-sm uppercase tracking-[0.3em] text-[#FF660F] font-bold">Final Render</p>
              </div>
            </div>
          </div>
        );
      case 'synthesis':
        return (
          <div key={index} className="my-32 w-full flex flex-col items-center relative">
            <h4 className="text-center text-sm md:text-base uppercase tracking-[0.4em] font-bold text-[#FF660F] mb-12">{block.label}</h4>
            
            {/* Inputs (Raw + Reference) */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full max-w-5xl px-6 mx-auto mb-20">
              {/* Raw Input */}
              <div className="flex flex-col items-center gap-4 w-full md:w-1/2 max-w-[400px]">
                 <div className="w-full aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-black/10">
                    <img src={block.raw} alt="Raw Input" className="w-full h-full object-cover" />
                 </div>
                 <p className="text-[10px] md:text-sm uppercase tracking-widest opacity-60 font-bold">Raw Photo</p>
              </div>

              {/* Plus Sign */}
              <div className="text-4xl text-[#FF660F] font-light md:py-0 py-4">+</div>

              {/* Style Reference */}
              <div className="flex flex-col items-center gap-4 w-full md:w-1/2 max-w-[400px]">
                 <div className="w-full aspect-square rounded-[2rem] md:rounded-[3rem] border-2 border-[#FF660F]/40 overflow-hidden shadow-2xl bg-black/10">
                    <img src={block.ref} alt="Style Reference" className="w-full h-full object-cover" />
                 </div>
                 <p className="text-[10px] md:text-sm uppercase tracking-widest text-[#FF660F] font-bold">Style Reference</p>
              </div>
            </div>

            {/* Main Result (FULL BLEED) */}
            <div className="w-full relative group">
               <div className="w-full h-[60vh] md:h-[90vh] overflow-hidden bg-black object-cover">
                  <img src={block.result} alt="Final Synthesis" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[3000ms]" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent flex items-end p-12">
                 <p className="text-sm md:text-lg uppercase tracking-[0.5em] text-[#FF660F] font-light">Final Render</p>
               </div>
            </div>
          </div>
        );
      case 'aerial-integration':
        return (
          <div key={index} className="my-32 w-full flex flex-col items-center relative">
             <h4 className="text-center text-sm md:text-base uppercase tracking-[0.4em] font-bold text-[#FF660F] mb-12">{block.label}</h4>
             
             {/* Google Maps Raw Data window */}
             <div className="relative z-10 flex flex-col items-center mb-8 w-full max-w-2xl px-6">
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative bg-[#111]">
                   {/* MacOS window dots for software feel */}
                   <div className="absolute top-0 left-0 w-full h-8 bg-black/40 flex items-center px-4 gap-2 z-20 border-b border-white/10 backdrop-blur-md">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                      <div className="ml-auto text-[9px] uppercase tracking-widest text-white/40 font-mono">Raw Topography Capture</div>
                   </div>
                   
                   <img src={block.map} alt="Raw Topography" className="w-full h-full object-cover pt-8" />
                   
                   {/* Target Reticle Overlay */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4 w-12 h-12 border border-[#FF660F] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,102,15,0.5)]">
                     <div className="w-1.5 h-1.5 bg-[#FF660F] rounded-full"></div>
                     <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#FF660F]/30"></div>
                     <div className="absolute left-0 right-0 top-1/2 h-px bg-[#FF660F]/30"></div>
                   </div>
                </div>
                <div className="mt-8 text-[#FF660F] text-xs md:text-sm tracking-[0.3em] uppercase flex items-center gap-3 font-bold opacity-70">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                   Google Maps Screenshot
                </div>
             </div>

             {/* Full Bleed Result */}
             <div className="w-full relative group">
                <div className="w-full h-[60vh] md:h-[90vh] overflow-hidden bg-black object-cover">
                   <img src={block.result} alt="Final Aerial Render" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[3000ms]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent flex items-end p-12">
                   <p className="text-sm md:text-lg uppercase tracking-[0.5em] text-white font-light">Final Render</p>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <article className={`min-h-screen pt-32 pb-32 transition-colors duration-1000 ${isDark ? 'bg-[#030303] text-white' : 'bg-white text-black'}`}>
      <SEOHelmet language={language} path={`/blog/${article.slug}`} />
      
      {/* Header */}
      <header className="px-6 lg:px-24 max-w-5xl mx-auto text-center space-y-8 mb-20">
        <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-[#FF660F]">
           <span>{article.category}</span>
           <span className="w-1 h-1 rounded-full bg-current"></span>
           <span>{article.date}</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-light tracking-tighter leading-tight">
          {content.title}
        </h1>
        <p className="text-xl md:text-2xl font-light opacity-60 max-w-3xl mx-auto leading-relaxed">
          {content.description}
        </p>
      </header>

      {/* Hero Image (Extracted from article content for maximum impact) */}
      <div className="w-full mb-24">
        {(() => {
          // Find the first 'synthesis' or 'comparison' block to use its after/result image as the hero
          const heroSource = content.blocks.find(b => b.type === 'synthesis' || b.type === 'comparison') as any;
          const heroImage = heroSource ? (heroSource.result || heroSource.after) : null;
          
          if (!heroImage || heroImage.includes('placeholder')) {
             return (
               <div className="w-full h-[50vh] md:h-[70vh] bg-[#111] flex items-center justify-center border-y border-white/5">
                   <span className="text-white/20 uppercase tracking-widest font-bold md:text-xl">[ HERO IMAGE PLACEHOLDER ]</span>
               </div>
             );
          }

          return (
             <div className="w-full h-[60vh] md:h-[80vh] bg-[#111] relative border-y border-white/5">
                <img src={heroImage} alt="Hero Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/20 to-transparent"></div>
             </div>
          );
        })()}
      </div>

      {/* Content Body (Images break out of padding automatically) */}
      <div className="w-full">
        <div className="w-full">
          {content.blocks.map((block, i) => renderBlock(block, i))}
          
          {/* Footer CTA */}
          <div className="max-w-3xl mx-auto mt-32 pt-16 border-t border-current border-opacity-10 text-center space-y-8">
             <h4 className="text-2xl font-heading">Ready to transform your asset?</h4>
             <button 
                onClick={() => navigate(language === 'de' ? '/de/contact' : '/contact')}
                className="px-10 py-5 bg-[#FF660F] text-white rounded-full text-xs font-bold tracking-[0.4em] uppercase hover:scale-105 transition-transform"
             >
                Start Inquiry
             </button>
          </div>
        </div>
      </div>
    </article>
  );
};
