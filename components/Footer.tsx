import React from 'react';
import { AppSection } from '../types';
import { Logo } from './Navbar';
import { Language, translations } from '../translations';

interface FooterProps {
  setActiveSection: (section: AppSection) => void;
  isDark?: boolean;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection, isDark = false, language }) => {
  const t = translations[language].footer;

  return (
    <footer className={`py-24 px-8 border-t transition-colors duration-700 ${isDark ? 'bg-[#030303] border-white/5' : 'bg-[#f5f5f7] border-black/5'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <Logo isDark={isDark} className="h-12 md:h-14 opacity-80" />
          <p className={`text-base md:text-base font-light max-w-sm leading-relaxed transition-colors ${isDark ? 'text-white/40' : 'text-stone-500'}`}>
            {t.mission}
          </p>
        </div>

        <div>
          <h5 className={`text-base md:text-base font-bold mb-6 tracking-[0.3em] uppercase transition-colors ${isDark ? 'text-white' : 'text-black'}`}>{t.pillars}</h5>
          <ul className="space-y-4 md:space-y-3">
            <li><button onClick={() => setActiveSection(AppSection.ARCHITECTURE)} className={`text-sm md:text-sm hover:text-[#FF660F] transition-colors font-light tracking-widest uppercase text-left ${isDark ? 'text-white/50' : 'text-stone-400'}`}>{translations[language].service_highlights.s2_title}</button></li>
            <li><button onClick={() => setActiveSection(AppSection.ARCHITECTURE)} className={`text-sm md:text-sm hover:text-[#FF660F] transition-colors font-light tracking-widest uppercase text-left ${isDark ? 'text-white/50' : 'text-stone-400'}`}>{translations[language].service_highlights.s3_title}</button></li>
            <li><button onClick={() => setActiveSection('digital-strategy' as any)} className={`text-sm md:text-sm hover:text-[#FF660F] transition-colors font-light tracking-widest uppercase text-left ${isDark ? 'text-white/50' : 'text-stone-400'}`}>{translations[language].service_highlights.s4_title}</button></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h5 className={`text-base md:text-base font-bold tracking-[0.3em] uppercase ${isDark ? 'text-white' : 'text-black'}`}>{t.imprint}</h5>
          <div className={`text-base md:text-base font-light leading-relaxed space-y-2 ${isDark ? 'text-white/40' : 'text-stone-500'}`}>
            <p><span className="font-bold opacity-100 text-white">{t.imp_brand}</span> Metaforma</p>
            <p><span className="font-bold opacity-100 text-white">{t.imp_contact}</span><br />
              Frank-Zappa-Straße 161<br />
              12681 Berlin, Germany<br />
              3rd floor</p>
            <p><span className="font-bold opacity-100 text-white">{t.imp_tax}</span> 14/237/02651</p>
          </div>
        </div>
      </div>
    </footer>
  );
};