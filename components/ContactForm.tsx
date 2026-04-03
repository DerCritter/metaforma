import React, { useState } from 'react';
import { Language, translations } from '../translations';

interface ContactFormProps {
    isDark?: boolean;
    language: Language;
}

export const ContactForm: React.FC<ContactFormProps> = ({ isDark = false, language }) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
    const [submitted, setSubmitted] = useState(false);
    const t = translations[language].contact_form;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://formsubmit.co/ajax/daniel.boubet@metaforma-ai.com", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    if (submitted) {
        return (
            <div className={`py-24 px-6 text-center animate-in fade-in duration-700 ${isDark ? 'text-white' : 'text-black'}`}>
                <div className="w-20 h-20 bg-[#FF660F] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2 className="text-4xl font-heading mb-4">{t.submitted_title}</h2>
                <p className={`text-lg font-light ${isDark ? 'text-white/60' : 'text-stone-500'}`}>{t.submitted_subtitle}</p>
            </div>
        );
    }

    return (
        <section className={`pt-32 pb-12 md:pb-24 px-6 max-w-5xl mx-auto animate-in slide-in-from-bottom-12 duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>
            <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
                <div className="space-y-8 md:space-y-12">
                    <div className="space-y-4">
                        <span className="text-base md:text-base uppercase tracking-[0.6em] text-[#FF660F] font-black">{t.label_get_in_touch}</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading leading-tight tracking-tighter">
                            {t.title_start} <br />
                            <span className="italic font-normal text-[#FF660F]">{t.title_highlight}</span>
                        </h2>
                    </div>

                        <div className="space-y-6">
                            <p className={`text-base md:text-xl font-light leading-relaxed ${isDark ? 'text-white/40' : 'text-stone-500'}`}>
                                {t.description}
                            </p>
                            <div className="flex flex-col gap-4">
                                <a 
                                    href={`mai${'lto'}:daniel.boubet@metaforma-ai.com`}
                                    className={`w-full p-6 md:p-8 rounded-[1.5rem] border backdrop-blur-[12px] transition-all hover:border-[#FF660F] group ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#0a0a0b]/5 border-black/5'}`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-full bg-[#FF660F]/20 flex items-center justify-center text-[#FF660F] group-hover:bg-[#FF660F] group-hover:text-white transition-all shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#FF660F] mb-1">Direct Email</h4>
                                            <p className={`text-base md:text-lg font-light ${isDark ? 'text-white/80' : 'text-black/80'}`}>daniel.boubet@metaforma-ai.com</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                </div>

                <div className={`p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border backdrop-blur-[12px] shadow-2xl ${isDark ? 'bg-white/5 border-white/10 shadow-black/50' : 'bg-white/60 border-black/5 shadow-black/5'}`}>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="group">
                                <label className={`text-base md:text-base uppercase tracking-[0.3em] font-bold mb-2 block transition-colors group-focus-within:text-[#FF660F] ${isDark ? 'text-white/30' : 'text-black/30'}`}>{t.field_name}</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder={t.placeholder_name}
                                    className={`w-full bg-transparent border-b py-3 text-base md:text-base focus:outline-none focus:border-[#FF660F] transition-colors placeholder:text-stone-600 font-light ${isDark ? 'border-white/10 text-white' : 'border-stone-300 text-black'}`}
                                />
                            </div>
                            <div className="group">
                                <label className={`text-base md:text-base uppercase tracking-[0.3em] font-bold mb-2 block transition-colors group-focus-within:text-[#FF660F] ${isDark ? 'text-white/30' : 'text-black/30'}`}>{t.field_email}</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder={t.placeholder_email}
                                    className={`w-full bg-transparent border-b py-3 text-base md:text-base focus:outline-none focus:border-[#FF660F] transition-colors placeholder:text-stone-600 font-light ${isDark ? 'border-white/10 text-white' : 'border-stone-300 text-black'}`}
                                />
                            </div>
                            <div className="group">
                                <label className={`text-base md:text-base uppercase tracking-[0.3em] font-bold mb-2 block transition-colors group-focus-within:text-[#FF660F] ${isDark ? 'text-white/30' : 'text-black/30'}`}>{t.field_vision}</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder={t.placeholder_vision}
                                    className={`w-full bg-transparent border-b py-3 text-base md:text-base focus:outline-none focus:border-[#FF660F] transition-colors placeholder:text-stone-600 font-light resize-none ${isDark ? 'border-white/10 text-white' : 'border-stone-300 text-black'}`}
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className={`w-full py-5 md:py-6 bg-[#FF660F] text-white rounded-full text-sm md:text-sm font-bold tracking-[0.4em] uppercase hover:bg-black hover:scale-[1.02] transition-all shadow-xl shadow-[#FF660F]/20 flex items-center justify-center ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {status === 'submitting' ? 'SENDING...' : t.btn_submit}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
