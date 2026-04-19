import React, { useState } from 'react';
import { AppSection } from '../types';
import { Language, translations } from '../translations';

interface NavbarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Logo: React.FC<{ className?: string, isDark?: boolean }> = ({ className = "h-12", isDark = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/assets/metaforma_logo_4k.svg"
        alt="Metaforma"
        className={`h-full w-auto transition-all duration-500 ${isDark ? 'invert brightness-[5]' : 'brightness-0'}`}
      />
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection, isDark, setIsDark, language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language].navbar;

  const handleNavClick = (section: AppSection) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-40 backdrop-blur-[12px] border-b transition-all duration-700 h-20 md:h-24 flex items-center ${isDark ? 'bg-[#030303]/60 border-white/5' : 'bg-white/60 border-black/5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex items-center justify-between gap-8">
        <div
          className="cursor-pointer group flex-shrink-0"
          onClick={() => handleNavClick(AppSection.HOME)}
        >
          <Logo isDark={isDark} className="h-10 md:h-12 lg:h-14 transition-all duration-500" />
        </div>

        <div className="flex items-center gap-3 lg:gap-5 xl:gap-8">
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {[
              { id: AppSection.SERVICES, label: t.services },
              { id: AppSection.PHILOSOPHY, label: t.philosophy },
              { id: AppSection.ARCHITECTURE, label: t.portfolio },
              { id: AppSection.BLOG, label: t.blog },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => handleNavClick(nav.id)}
                className={`whitespace-nowrap text-[10px] xl:text-xs 2xl:text-sm tracking-widest xl:tracking-[0.2em] uppercase transition-all
                  ${activeSection === nav.id
                    ? (isDark ? 'text-white font-bold underline underline-offset-[12px] decoration-2' : 'text-black font-bold underline underline-offset-[12px] decoration-2')
                    : isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
              >
                {nav.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick(AppSection.CONTACT_FORM)}
              className={`whitespace-nowrap ml-1 xl:ml-4 px-4 xl:px-7 py-2.5 rounded-full font-bold text-[10px] xl:text-xs 2xl:text-sm tracking-widest xl:tracking-[0.2em] uppercase transition-all shadow-lg bg-[#FF660F] text-white shadow-[#FF660F]/20 hover:scale-105`}
            >
              {t.contact}
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Toggle */}
            <div className={`p-1 rounded-full flex items-center gap-1 ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-[#FF660F] text-white' : isDark ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('de')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'de' ? 'bg-[#FF660F] text-white' : isDark ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`}
              >
                DE
              </button>
            </div>


            {/* Mobile Menu Trigger */}
            <button
              className={`lg:hidden relative z-50 p-1.5 md:p-2 transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 w-full h-screen bg-[#030303] z-[100] lg:hidden overflow-hidden transition-all duration-700 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6 text-center">
          {[
            { id: AppSection.HOME, label: t.home },
            { id: AppSection.SERVICES, label: t.services },
            { id: AppSection.PHILOSOPHY, label: t.philosophy },
            { id: AppSection.ARCHITECTURE, label: t.portfolio },
            { id: AppSection.BLOG, label: t.blog },
          ].map((nav, idx) => (
            <button
              key={nav.id}
              onClick={() => handleNavClick(nav.id)}
              style={{ transitionDelay: `${idx * 100}ms` }}
              className={`text-3xl font-heading text-white tracking-widest uppercase hover:text-[#FF660F] transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              {nav.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick(AppSection.CONTACT_FORM)}
            className={`px-12 py-6 rounded-full font-bold text-sm tracking-[0.3em] uppercase mt-10 shadow-2xl bg-[#FF660F] text-white shadow-[#FF660F]/40 hover:scale-110 transition-all duration-700 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            {t.contact}
          </button>
        </div>
      </div>
    </nav>
  );
};