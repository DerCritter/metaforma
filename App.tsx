import React, { useState, useEffect } from 'react';
import { AppSection, ChatMessage, Project } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio, getArchitectureProjects } from './components/Portfolio';
import { ServiceHighlights } from './components/ServiceHighlights';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';
import { TrustedPartners } from './components/TrustedPartners';
import { Language } from './translations';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  // Starting the website in dark mode as requested
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState<Language>('en');

  const handleSelectProject = (projectId: string) => {
    const project = getArchitectureProjects(language).find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleNavigate = (section: AppSection | string, projectId?: string) => {
    const isCustomScrollId = !Object.values(AppSection).includes(section as AppSection);

    if (isCustomScrollId) {
      if (activeSection !== AppSection.HOME) {
        setActiveSection(AppSection.HOME);
        setTimeout(() => {
          const el = document.getElementById(section);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (projectId) {
      handleSelectProject(projectId);
      if (activeSection === AppSection.HOME) {
        return;
      }
    }

    if (section === AppSection.SERVICES) {
      handleNavigate('services-section');
      return;
    }
    if (section === AppSection.PHILOSOPHY) {
      handleNavigate('philosophy-section');
      return;
    }

    setActiveSection(section as AppSection);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#030303' : '#ffffff';
  }, [isDark]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 relative ${isDark ? 'text-white' : 'text-black'}`}>

      {/* Atmospheric Background Layers (Removed to fix square glitches) */}

      <Navbar
        activeSection={activeSection}
        setActiveSection={(section) => handleNavigate(section)}
        isDark={isDark}
        setIsDark={setIsDark}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-grow">
        {activeSection === AppSection.HOME && (
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
        )}

        {activeSection === AppSection.ARCHITECTURE && (
          <Portfolio
            category="architecture"
            onSelectProject={setSelectedProject}
            isDark={isDark}
            language={language}
          />
        )}

        {(activeSection === AppSection.CONTACT_FORM || activeSection === AppSection.AI_CONSULTANT) && (
          <ContactForm isDark={isDark} language={language} />
        )}
      </main>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          language={language}
        />
      )}

      <TrustedPartners isDark={isDark} language={language} />

      <Footer
        setActiveSection={(section) => handleNavigate(section)}
        isDark={isDark}
        language={language}
      />
    </div>
  );
};

export default App;