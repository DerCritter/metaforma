import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AppSection, Project } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio, getArchitectureProjects } from './components/Portfolio';
import { ServiceHighlights } from './components/ServiceHighlights';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { TrustedPartners } from './components/TrustedPartners';
import { Language } from './translations';
import { SEOHelmet } from './components/SEOHelmet';
import { ImprintDSGVO } from './components/ImprintDSGVO';
import { CookieConsent } from './components/CookieConsent';
import { GA4Tracker } from './components/GA4Tracker';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Auto-redirect based on browser language for the very first visit to root
  useEffect(() => {
    const pref = localStorage.getItem('metaforma_lang_pref');
    // We only auto-redirect if NO preference exists yet and we are at the root
    if (!pref && location.pathname === '/') {
        const userLan = navigator.language || (navigator as any).userLanguage;
        if (userLan && userLan.toLowerCase().startsWith('de')) {
            // Set the preference to 'de' and go there
            localStorage.setItem('metaforma_lang_pref', 'de');
            navigate('/de');
        } else {
            // Otherwise, we consider 'en' the preference by default
            localStorage.setItem('metaforma_lang_pref', 'en');
        }
    }
  }, []);
  // Determine language based on URL path instead of just browser language
  const isDe = location.pathname.startsWith('/de');
  const language: Language = isDe ? 'de' : 'en';

  const handleSetLanguage = (newLang: Language) => {
    // Store user preference to avoid unwanted redirects
    localStorage.setItem('metaforma_lang_pref', newLang);

    // Navigate strictly matching the domain roots
    if (newLang === 'de' && !isDe) {
      if (location.pathname === '/') navigate('/de');
      else navigate(`/de${location.pathname}`);
    } else if (newLang === 'en' && isDe) {
      const newPath = location.pathname.replace(/^\/de/, '');
      navigate(newPath === '' ? '/' : newPath);
    }
  };

  const handleSelectProject = (projectId: string) => {
    const project = getArchitectureProjects(language).find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleNavigate = (section: AppSection | string, projectId?: string) => {
    const isCustomScrollId = !Object.values(AppSection).includes(section as AppSection);
    
    // Check if we are not on the home page (where sections reside)
    const isHomePage = location.pathname === '/' || location.pathname === '/de' || location.pathname === '/de/';

    if (!isHomePage && (section === AppSection.HOME || section === AppSection.SERVICES || section === AppSection.PHILOSOPHY || section === AppSection.ARCHITECTURE || isCustomScrollId)) {
        // We aren't on Home, so we must route there first
        navigate(isDe ? `/de` : `/`);
        
        if (section === AppSection.ARCHITECTURE) {
          setActiveSection(AppSection.ARCHITECTURE);
        }

        // Note: Actual scrolling to fragment needs an effect tracking location changes, or we use a small timeout
        setTimeout(() => {
          if (isCustomScrollId) {
             const el = document.getElementById(section);
             if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else {
             window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 300);
        return;
    }

    if (isCustomScrollId) {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (projectId) {
      handleSelectProject(projectId);
      if (activeSection === AppSection.HOME) return;
    }

    if (section === AppSection.SERVICES) {
      const el = document.getElementById('services-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (section === AppSection.PHILOSOPHY) {
      const el = document.getElementById('philosophy-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (section === AppSection.HOME) {
        navigate(isDe ? '/de' : '/');
    } else if (section === AppSection.CONTACT_FORM || section === AppSection.AI_CONSULTANT) {
        navigate(isDe ? '/de/contact' : '/contact');
        setActiveSection(section as AppSection);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    setActiveSection(section as AppSection);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#030303' : '#ffffff';
  }, [isDark]);

  // Sync active section natively based on route
  useEffect(() => {
      if (location.pathname.includes('impressum') || location.pathname.includes('datenschutz') || location.pathname.includes('privacy')) {
          setActiveSection(null as any); // Disable native UI sections while on DSGVO
      } else if (location.pathname.includes('contact')) {
          setActiveSection(AppSection.CONTACT_FORM);
      } else if (activeSection === null) {
          setActiveSection(AppSection.HOME);
      }
  }, [location.pathname]);

  const homeComponent = (
    <div className="animate-in fade-in duration-1000">
        <Hero
            onExplore={() => handleNavigate(AppSection.CONTACT_FORM)}
            isDark={isDark}
            language={language}
        />
        <ServiceHighlights isDark={isDark} onNavigate={handleNavigate} language={language} />
        <Services
            onNavigate={handleNavigate}
            isDark={isDark}
            language={language}
        />
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 relative ${isDark ? 'text-white' : 'text-black'}`}>
      <SEOHelmet language={language} path={location.pathname} />
      <GA4Tracker measurementId="G-WB3LQRQM78" />
      
      <Navbar
        activeSection={activeSection}
        setActiveSection={(section) => handleNavigate(section)}
        isDark={isDark}
        setIsDark={setIsDark}
        language={language}
        setLanguage={handleSetLanguage}
      />

      <main className="flex-grow">
        <Routes>
            {/* Root English */}
            <Route path="/" element={activeSection === AppSection.ARCHITECTURE ? (
              <Portfolio
                category="architecture"
                onSelectProject={setSelectedProject}
                isDark={isDark}
                language={language}
              />
            ) : homeComponent} />
            <Route path="/contact" element={<ContactForm isDark={isDark} language={language} />} />
            <Route path="/impressum" element={<ImprintDSGVO isDark={isDark} language={language} type="impressum" />} />
            <Route path="/privacy" element={<ImprintDSGVO isDark={isDark} language={language} type="privacy" />} />

            {/* Root German */}
            <Route path="/de" element={activeSection === AppSection.ARCHITECTURE ? (
              <Portfolio
                category="architecture"
                onSelectProject={setSelectedProject}
                isDark={isDark}
                language={language}
              />
            ) : homeComponent} />
            <Route path="/de/contact" element={<ContactForm isDark={isDark} language={language} />} />
            <Route path="/de/impressum" element={<ImprintDSGVO isDark={isDark} language={language} type="impressum" />} />
            <Route path="/de/datenschutz" element={<ImprintDSGVO isDark={isDark} language={language} type="privacy" />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Keeping Portfolio modal alive if requested outside of direct routing for SPA fluidness */}
      </main>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          language={language}
        />
      )}

      <TrustedPartners isDark={isDark} language={language} />
      
      <CookieConsent isDark={isDark} language={language} />
      
      <Footer
        setActiveSection={(section) => handleNavigate(section)}
        isDark={isDark}
        language={language}
      />
    </div>
  );
};

export default App;