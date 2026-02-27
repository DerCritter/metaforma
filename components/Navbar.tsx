import React, { useState } from 'react';
import { AppSection } from '../types';

interface NavbarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
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

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection, isDark, setIsDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (section: AppSection) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-40 backdrop-blur-[12px] border-b transition-all duration-700 h-20 md:h-24 flex items-center ${isDark ? 'bg-[#030303]/60 border-white/5' : 'bg-white/60 border-black/5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex items-center justify-between">
        <div
          className="cursor-pointer group flex-shrink-0"
          onClick={() => handleNavClick(AppSection.HOME)}
        >
          <Logo isDark={isDark} className="h-10 md:h-12 lg:h-14 transition-all duration-500" />
        </div>

        <div className="flex items-center gap-3 md:gap-10">
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {[
              { id: AppSection.SERVICES, label: 'Services' },
              { id: AppSection.PHILOSOPHY, label: 'Philosophy' },
              { id: AppSection.ARCHITECTURE, label: 'Portfolio' },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => handleNavClick(nav.id)}
                className={`text-[10px] md:text-[11px] tracking-[0.3em] uppercase transition-all
                  ${activeSection === nav.id
                    ? (isDark ? 'text-white font-bold underline underline-offset-[12px] decoration-2' : 'text-black font-bold underline underline-offset-[12px] decoration-2')
                    : isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
              >
                {nav.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick(AppSection.CONTACT_FORM)}
              className={`ml-2 md:ml-4 px-5 md:px-7 py-2 md:py-2.5 rounded-full font-bold text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-all shadow-lg bg-[#FF660F] text-white shadow-[#FF660F]/20 hover:scale-105`}
            >
              Contact Now
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 md:p-3 rounded-full transition-all duration-500 flex items-center justify-center group ${isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-black hover:bg-black/10'}`}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[18px] md:h-[18px] group-hover:rotate-12 transition-transform duration-500"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-[18px] md:h-[18px] group-hover:-rotate-12 transition-transform duration-500"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            className={`lg:hidden p-1.5 md:p-2 ${isDark ? 'text-white' : 'text-black'}`}
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

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-20 bg-[#030303]/80 backdrop-blur-[12px] z-40 lg:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6 text-center">
          <button
            onClick={() => handleNavClick(AppSection.HOME)}
            className="text-2xl font-heading text-white tracking-widest uppercase"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick(AppSection.SERVICES)}
            className="text-2xl font-heading text-white tracking-widest uppercase"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick(AppSection.PHILOSOPHY)}
            className="text-2xl font-heading text-white tracking-widest uppercase"
          >
            Philosophy
          </button>
          <button
            onClick={() => handleNavClick(AppSection.ARCHITECTURE)}
            className="text-2xl font-heading text-white tracking-widest uppercase"
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavClick(AppSection.CONTACT_FORM)}
            className={`px-8 py-4 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase mt-4 shadow-lg bg-[#FF660F] text-white shadow-[#FF660F]/20 hover:scale-105`}
          >
            Contact Now
          </button>
        </div>
      </div>
    </nav>
  );
};