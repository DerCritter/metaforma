import React, { useState } from 'react';
import { Language, translations } from '../translations';

interface ExpertiseProps {
    isDark?: boolean;
    language: Language;
}

export const Expertise: React.FC<ExpertiseProps> = ({ isDark = false, language }) => {
    const t = translations[language].expertise;
    const [openIndex, setOpenIndex] = useState<number>(0);

    const faqs = [
        { q: t.faq1_q, a: t.faq1_a },
        { q: t.faq2_q, a: t.faq2_a },
        { q: t.faq3_q, a: t.faq3_a },
    ];

    return (
        <section className={`py-24 md:py-32 px-6 lg:px-24 transition-colors duration-1000 ${isDark ? 'bg-[#030303] text-white' : 'bg-white text-black'} relative overflow-hidden`} id="expertise-section">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
                
                {/* Header Column */}
                <div className="lg:col-span-5 space-y-6 md:space-y-10">
                    <span className="text-sm md:text-base uppercase tracking-[0.6em] text-[#FF660F] font-black block">
                        {t.label}
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tighter leading-[1.1]">
                        {t.title.split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                                {i === 1 ? <span className="italic text-[#FF660F] pr-2">{word}</span> : word + ' '}
                            </React.Fragment>
                        ))}
                    </h2>
                    <div className={`w-full max-w-[100px] h-px mt-8 ${isDark ? 'bg-white/20' : 'bg-black/20'}`}></div>
                </div>

                {/* FAQ Column */}
                <article className="lg:col-span-7 flex flex-col justify-center">
                    <div className="border-t border-white/10" itemScope itemType="https://schema.org/FAQPage">
                        {faqs.map((faq, idx) => (
                            <div 
                                key={idx} 
                                className={`border-b group transition-colors duration-500 cursor-pointer ${isDark ? 'border-white/10 hover:border-white/30' : 'border-black/10 hover:border-black/30'}`}
                                onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
                                itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
                            >
                                <div className="py-8 md:py-10 flex justify-between items-center gap-6">
                                    <h3 
                                        className={`text-xl md:text-2xl font-heading tracking-tight transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'} ${openIndex === idx ? 'text-[#FF660F]' : 'group-hover:text-[#FF660F]'}`}
                                        itemProp="name"
                                    >
                                        {faq.q}
                                    </h3>
                                    <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-current opacity-40 group-hover:opacity-100 transition-all">
                                        <div className="relative w-4 h-4">
                                            <div className="absolute inset-y-0 left-1/2 w-[1.5px] bg-current -translate-x-1/2 transition-transform duration-500" style={{ transform: openIndex === idx ? 'rotate(90deg)' : 'none' }}></div>
                                            <div className="absolute inset-x-0 top-1/2 h-[1.5px] bg-current -translate-y-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div 
                                    className={`overflow-hidden transition-all duration-700 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100 pb-10' : 'max-h-0 opacity-0 pb-0'}`}
                                    itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                                >
                                    <p className={`text-base md:text-lg font-light leading-relaxed max-w-3xl ${isDark ? 'text-white/60' : 'text-stone-600'}`} itemProp="text">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>

            </div>
        </section>
    );
};
