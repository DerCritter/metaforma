import React from 'react';

interface TrustedPartnersProps {
    isDark?: boolean;
}

export const TrustedPartners: React.FC<TrustedPartnersProps> = ({ isDark = false }) => {
    const partners = [
        {
            name: 'BPT INVEST GMBH',
            logo: 'https://i.postimg.cc/zfYycg6r/BPT-INVEST-GMBH-2.jpg',
            link: 'https://www.bptinvest.de/'
        },
        {
            name: 'Deutsche Monumentum',
            logo: 'https://i.postimg.cc/v8xWpqnp/deutsche-monumentum.png',
            link: 'https://www.deutsche-monumentum.de/'
        },
        {
            name: 'Tokuti Property',
            logo: 'https://i.postimg.cc/zDHn9th4/tokuti.png',
            link: 'https://vg.linkedin.com/company/tokuti-property'
        }
    ];

    return (
        <section className={`py-16 md:py-24 border-t transition-colors duration-1000 ${isDark ? 'bg-[#030303] border-white/5' : 'bg-[#f5f5f7] border-black/5'}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                <h4 className={`text-[9px] md:text-[11px] font-bold tracking-[0.4em] uppercase mb-12 md:mb-16 transition-colors ${isDark ? 'text-white/40' : 'text-stone-400'}`}>
                    Trusted Partners
                </h4>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 opacity-80 hover:opacity-100 transition-opacity">
                    {partners.map((partner, idx) => (
                        <a
                            key={idx}
                            href={partner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center transition-transform hover:scale-105"
                            title={partner.name}
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className={`h-12 md:h-16 lg:h-20 object-contain max-w-[200px] transition-all duration-500 filter ${isDark ? 'grayscale brightness-150 contrast-125 group-hover:grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
