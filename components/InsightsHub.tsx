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
    <div className={`min-h-screen pt-32 pb-24 px-6 lg:px-24 transition-colors duration-1000 ${isDark ? 'bg-[#030303] text-white' : 'bg-white text-black'}`}>
      <SEOHelmet language={language} path="/insights" />
      
      <div className="max-w-7xl mx-auto space-y-20">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article) => {
            const content = article.content[language];
            return (
              <article 
                key={article.id} 
                onClick={() => navigate(language === 'de' ? `/de/insights/${article.slug}` : `/insights/${article.slug}`)}
                className={`group cursor-pointer rounded-[2rem] p-8 md:p-10 border transition-all duration-500 ${isDark ? 'border-white/10 hover:border-white/30 hover:bg-white/5' : 'border-black/10 hover:border-black/30 hover:bg-black/5'} flex flex-col justify-between h-[450px] shadow-lg`}
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
