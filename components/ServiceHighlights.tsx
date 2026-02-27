import React from 'react';
import { AppSection } from '../types';

interface ServiceHighlightsProps {
    isDark?: boolean;
    onNavigate: (section: AppSection | string) => void;
}

export const ServiceHighlights: React.FC<ServiceHighlightsProps> = ({ isDark = false, onNavigate }) => {
    const services = [
        {
            id: '01',
            title: 'AI Editorial Renders',
            description: 'High-impact, AI-powered imagery for architectural publications and luxury catalogs.',
            action: () => onNavigate(AppSection.ARCHITECTURE)
        },
        {
            id: '02',
            title: 'Renovations & Heritage',
            description: 'High-end visual transformation for refurbishments and historic landmarks via AI.',
            action: () => onNavigate(AppSection.ARCHITECTURE)
        },
        {
            id: '03',
            title: 'New Developments (Neubau)',
            description: 'Hyper-realistic AI visualizations for ground-up architectural projects.',
            action: () => onNavigate(AppSection.ARCHITECTURE)
        },
        {
            id: '04',
            title: 'Strategic Sales Assets',
            description: 'AI-generated visual content designed to accelerate real estate investment.',
            action: () => onNavigate('digital-strategy')
        }
    ];

    return (
        <section id="services-section" className={`py-16 md:py-24 px-6 md:px-12 lg:px-24 transition-colors duration-1000 ${isDark ? 'bg-[#030303]' : 'bg-white'} overflow-hidden`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col border-t border-white/10">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            onClick={service.action}
                            className={`group relative py-8 md:py-10 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 transition-all duration-500 hover:bg-[#FF660F]/(5) md:hover:px-6 cursor-pointer`}
                        >
                            <div className="relative z-10 flex flex-col md:flex-row items-baseline gap-4 md:gap-12 lg:gap-16 w-full">
                                <span className="text-3xl md:text-4xl font-heading font-black text-[#FF660F] opacity-30 group-hover:opacity-100 transition-all duration-500 tracking-tighter">
                                    {service.id}
                                </span>

                                <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-12">
                                    <h3 className={`text-xl md:text-2xl font-heading font-medium tracking-tight ${isDark ? 'text-white' : 'text-black'} min-w-[300px]`}>
                                        {service.title}
                                    </h3>
                                    <p className={`text-sm md:text-base font-light leading-relaxed transition-all duration-500 ${isDark ? 'text-white/40 group-hover:text-white/80' : 'text-black/40 group-hover:text-black/80'}`}>
                                        {service.description}
                                    </p>
                                </div>

                                <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full border border-[#FF660F]/30 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF660F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
