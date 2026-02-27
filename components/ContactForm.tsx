import React, { useState } from 'react';

interface ContactFormProps {
    isDark?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ isDark = false }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className={`py-24 px-6 text-center animate-in fade-in duration-700 ${isDark ? 'text-white' : 'text-black'}`}>
                <div className="w-20 h-20 bg-[#FF660F] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2 className="text-4xl font-heading mb-4">Inquiry Received.</h2>
                <p className={`text-lg font-light ${isDark ? 'text-white/60' : 'text-stone-500'}`}>Our synthesis team will reach out to you within 24 hours.</p>
            </div>
        );
    }

    return (
        <section className={`py-12 md:py-24 px-6 max-w-5xl mx-auto animate-in slide-in-from-bottom-12 duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>
            <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
                <div className="space-y-8 md:space-y-12">
                    <div className="space-y-4">
                        <span className="text-[9px] md:text-[11px] uppercase tracking-[0.6em] text-[#FF660F] font-black">GET IN TOUCH</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading leading-tight tracking-tighter">
                            Start Your <br />
                            <span className="italic font-normal text-[#FF660F]">Synthesis.</span>
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <p className={`text-base md:text-xl font-light leading-relaxed ${isDark ? 'text-white/40' : 'text-stone-500'}`}>
                            Based in Berlin, Germany. Serving visionary real estate leaders globally with AI-native architecture and heritage transformation.
                        </p>
                        <div className={`p-8 rounded-[2rem] border backdrop-blur-[12px] ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#0a0a0b]/5 border-black/5'}`}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-[#FF660F]/20 flex items-center justify-center text-[#FF660F]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF660F]">HQ BERLIN</h4>
                                    <p className={`text-xs opacity-60`}>Berlin, Germany | Est. 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border backdrop-blur-[12px] shadow-2xl ${isDark ? 'bg-white/5 border-white/10 shadow-black/50' : 'bg-white/60 border-black/5 shadow-black/5'}`}>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="group">
                                <label className={`text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block transition-colors group-focus-within:text-[#FF660F] ${isDark ? 'text-white/30' : 'text-black/30'}`}>Your Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    className={`w-full bg-transparent border-b py-3 text-sm md:text-base focus:outline-none focus:border-[#FF660F] transition-colors placeholder:text-stone-600 font-light ${isDark ? 'border-white/10 text-white' : 'border-stone-300 text-black'}`}
                                />
                            </div>
                            <div className="group">
                                <label className={`text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block transition-colors group-focus-within:text-[#FF660F] ${isDark ? 'text-white/30' : 'text-black/30'}`}>Business Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    className={`w-full bg-transparent border-b py-3 text-sm md:text-base focus:outline-none focus:border-[#FF660F] transition-colors placeholder:text-stone-600 font-light ${isDark ? 'border-white/10 text-white' : 'border-stone-300 text-black'}`}
                                />
                            </div>
                            <div className="group">
                                <label className={`text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block transition-colors group-focus-within:text-[#FF660F] ${isDark ? 'text-white/30' : 'text-black/30'}`}>Project Vision</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Tell us about your architectural asset..."
                                    className={`w-full bg-transparent border-b py-3 text-sm md:text-base focus:outline-none focus:border-[#FF660F] transition-colors placeholder:text-stone-600 font-light resize-none ${isDark ? 'border-white/10 text-white' : 'border-stone-300 text-black'}`}
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 md:py-6 bg-[#FF660F] text-white rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-black hover:scale-[1.02] transition-all shadow-xl shadow-[#FF660F]/20"
                        >
                            Request Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
