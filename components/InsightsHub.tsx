import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { articles } from '../content/articles';
import { Language, translations } from '../translations';
import { SEOHelmet } from './SEOHelmet';

interface InsightsHubProps {
  isDark: boolean;
  language: Language;
}

export const InsightsHub: React.FC<InsightsHubProps> = ({ isDark, language }) => {
  const navigate = useNavigate();
  const t = translations[language].ui;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-16 xl:px-20 transition-colors duration-1000 ${isDark ? 'bg-[#030303] text-white' : 'bg-white text-black'}`}>
      <SEOHelmet language={language} path="/insights" />
      
      <div className="max-w-[1920px] mx-auto w-full space-y-20">
        <header className="space-y-6">
          <span className="text-sm md:text-base uppercase tracking-[0.6em] text-[#FF660F] font-black block">
            {t.insights || 'INSIGHTS'} & JOURNAL
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-light tracking-tighter leading-tight max-w-4xl">
            The <span className="italic text-[#FF660F]">Methodology</span> of Digital Synthesis
          </h1>
          <p className={`text-xl md:text-2xl font-light max-w-2xl leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            Deep dives into architectural visualization, AI asset transformation, and the strategy behind high-converting real estate aesthetics.
          </p>
        </header>

        {/* Featured Article */}
        {articles.length > 0 && (
          <article 
            onClick={() => navigate(language === 'de' ? `/de/blog/${articles[0].slug}` : `/blog/${articles[0].slug}`)}
            className={`group cursor-pointer rounded-none border-none transition-all duration-700 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'} shadow-xl flex flex-col lg:flex-row mb-16 overflow-hidden`}
          >
            <div className="w-full lg:w-3/5 h-[40vh] lg:h-[600px] overflow-hidden relative bg-[#111]">
              {(() => {
                const imgBlock = articles[0].content[language].blocks.find((b: any) => b.type === 'image') as any;
                return imgBlock ? (
                   <img src={imgBlock.src} alt={articles[0].content[language].title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                ) : (
                   <div className="w-full h-full bg-gradient-to-tr from-black/80 to-transparent" />
                );
              })()}
            </div>
            <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold">
                    <span className="text-[#FF660F]">Featured · {articles[0].category}</span>
                    <span className="opacity-50">{articles[0].readTime}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-heading leading-tight group-hover:text-[#FF660F] transition-colors">
                    {articles[0].content[language].title}
                  </h3>
                  <p className={`text-lg md:text-xl font-light leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    {articles[0].content[language].description}
                  </p>
               </div>
               <div className="mt-12 pt-6 border-t border-current border-opacity-10 flex justify-between items-center font-bold tracking-widest text-xs uppercase opacity-50 group-hover:opacity-100 transition-opacity">
                  <span>Read Featured Article</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
               </div>
            </div>
          </article>
        )}

        {/* Regular Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.slice(1).map((article) => {
            const content = article.content[language];
            return (
              <article 
                key={article.id} 
                onClick={() => navigate(language === 'de' ? `/de/blog/${article.slug}` : `/blog/${article.slug}`)}
                className={`group cursor-pointer rounded-none p-8 md:p-10 border-none transition-all duration-500 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'} flex flex-col justify-between h-[450px] shadow-lg backdrop-blur-[12px]`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold">
                    <span className="text-[#FF660F]">{article.category}</span>
                    <span className="opacity-50">{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-heading leading-tight group-hover:text-[#FF660F] transition-colors">
                    {content.title}
                  </h3>
                  
                  <p className={`text-base font-light line-clamp-4 leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    {content.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-current border-opacity-10 flex justify-between items-center font-bold tracking-widest text-xs uppercase opacity-50 group-hover:opacity-100 transition-opacity">
                  <span>Read Article</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
