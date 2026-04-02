import React, { useEffect, useRef, useState } from 'react';
import { Language, translations } from '../translations';

interface ProcessStepData {
  num: string;
  title: string;
  desc: string;
}

const ProcessStep: React.FC<{ step: ProcessStepData, isDark: boolean }> = ({ step, isDark }) => {
  const [isInView, setIsInView] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (stepRef.current) observer.observe(stepRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stepRef}
      className={`relative p-14 rounded-[2.5rem] shadow-sm border group transition-all duration-1000 ${isDark ? 'bg-white/5 border-white/5 hover:shadow-2xl hover:shadow-[#FF660F]/10' : 'bg-white/95 border-black/5 hover:shadow-2xl hover:shadow-[#FF660F]/10'} ${isInView ? 'grayscale-0 opacity-100' : 'grayscale opacity-40'}`}
    >
      <span className={`text-8xl font-serif italic absolute top-4 left-6 pointer-events-none group-hover:text-[#FF660F]/5 transition-colors ${isDark ? 'text-white/[0.03]' : 'text-stone-100'}`}>
        {step.num}
      </span>
      <div className="relative z-10 pt-6">
        <h3 className={`text-base md:text-base font-bold tracking-[0.4em] uppercase mb-6 font-heading transition-colors ${isDark ? 'text-white' : 'text-black'}`}>{step.title}</h3>
        <p className={`font-light text-base leading-relaxed transition-colors ${isDark ? 'text-white/40' : 'text-stone-500'}`}>{step.desc}</p>
      </div>
    </div>
  );
};

export const Process: React.FC<{ isDark?: boolean, language: Language }> = ({ isDark = false, language }) => {
  const t = translations[language].process;

  const steps: ProcessStepData[] = [
    {
      num: '01',
      title: t.step1_title,
      desc: t.step1_desc
    },
    {
      num: '02',
      title: t.step2_title,
      desc: t.step2_desc
    },
    {
      num: '03',
      title: t.step3_title,
      desc: t.step3_desc
    }
  ];

  return (
    <section className={`w-full min-h-screen flex items-center py-24 md:py-40 px-6 transition-colors duration-700 ${isDark ? 'bg-[#050505]' : 'bg-[#e6e6e8]'}`}>
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="mb-24 text-center">
          <h2 className={`text-4xl md:text-5xl font-heading font-medium italic mb-2 tracking-tight transition-colors ${isDark ? 'text-white' : 'text-black'}`}>{t.title}</h2>
          <div className="w-16 h-0.5 bg-[#FF660F] mx-auto opacity-40 mt-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(step => (
            <ProcessStep key={step.num} step={step} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};
