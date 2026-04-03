import React, { useState, useEffect } from 'react';
import { Language } from '../translations';

export const CookieConsent: React.FC<{ language: Language, isDark: boolean }> = ({ language, isDark }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('metaforma_cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    if (!isVisible) return null;

    const handleAccept = () => {
        localStorage.setItem('metaforma_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('metaforma_cookie_consent', 'rejected');
        setIsVisible(false);
    };

    return (
        <div className={`fixed bottom-0 left-0 w-full z-[100] p-6 lg:p-8 backdrop-blur-3xl border-t ${isDark ? 'bg-black/95 border-white/10 text-white shadow-[0_-20px_50px_rgba(0,0,0,0.5)]' : 'bg-white/95 border-black/10 text-black shadow-[0_-20px_50px_rgba(0,0,0,0.05)]'}`}>
            <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 xl:gap-12">
                <div className="flex-1 space-y-3">
                    <h3 className="font-bold tracking-widest uppercase text-sm">
                        {language === 'de' ? 'Datenschutzeinstellungen' : 'Privacy Settings'}
                    </h3>
                    <p className={`text-xs md:text-sm font-light leading-relaxed max-w-4xl ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                        {language === 'de' 
                            ? 'Wir nutzen Cookies, um die ordentliche Funktion der Website zu gewährleisten und Ihnen das bestmögliche Nutzererlebnis zu bieten. Gemäß der DSGVO können Sie alle nicht essenziellen Cookies blockieren.' 
                            : 'We use cookies to ensure the proper functioning of the website and to provide you with the best possible user experience. In accordance with the GDPR, you can block all non-essential cookies.'}
                    </p>
                </div>
                <div className="flex flex-row gap-4 w-full xl:w-auto shrink-0 mt-2 xl:mt-0">
                    <button 
                        onClick={handleReject}
                        className={`flex-1 xl:flex-none px-6 md:px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-full border ${isDark ? 'border-white/20 hover:border-white hover:text-white text-white/70' : 'border-black/20 hover:border-black hover:text-black text-black/70'}`}
                    >
                        {language === 'de' ? 'Ablehnen' : 'Reject All'}
                    </button>
                    <button 
                        onClick={handleAccept}
                        className={`flex-1 xl:flex-none px-6 md:px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-full border border-transparent ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-stone-800'}`}
                    >
                        {language === 'de' ? 'Akzeptieren' : 'Accept All'}
                    </button>
                </div>
            </div>
        </div>
    );
};
