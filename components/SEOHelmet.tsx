import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Language, translations } from '../translations';

interface SEOHelmetProps {
    language: Language;
    path: string;
}

export const SEOHelmet: React.FC<SEOHelmetProps> = ({ language, path }) => {
    const t = translations[language].seo;
    const baseUrl = 'https://metaforma-ai.com';
    
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    // Ensure trailing slash for root and language paths to match sitemap perfectly
    const canonicalPath = (normalizedPath === '/' || normalizedPath === '/de') ? `${normalizedPath}/` : normalizedPath;
    const isDe = normalizedPath === '/de' || normalizedPath.startsWith('/de/');
    
    let enPath = normalizedPath;
    let dePath = normalizedPath;

    if (isDe) {
        enPath = normalizedPath.replace(/^\/de/, '');
        if (enPath === '') enPath = '/';
    } else {
        dePath = normalizedPath === '/' ? '/de' : `/de${normalizedPath}`;
    }

    return (
        <Helmet>
            <html lang={language} />
            <title>{t.title}</title>
            <meta name="description" content={t.description} />
            <meta name="keywords" content={t.keywords} />
            
            {/* Canonical URL to prevent indexing duplicates (www vs non-www) */}
            <link rel="canonical" href={`${baseUrl}${canonicalPath}`} />
            
            {/* Hreflang Tags for International Targeting */}
            <link rel="alternate" hrefLang="en" href={`${baseUrl}${enPath}`} />
            <link rel="alternate" hrefLang="de-DE" href={`${baseUrl}${dePath}`} />
            <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${enPath}`} />

            {/* Social Sharing - Open Graph */}
            <meta property="og:title" content={t.title} />
            <meta property="og:description" content={t.description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${baseUrl}${normalizedPath}`} />
            <meta property="og:image" content={`${baseUrl}/assets/og-image.jpg`} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t.title} />
            <meta name="twitter:description" content={t.description} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    "name": "Metaforma",
                    "url": baseUrl,
                    "logo": `${baseUrl}/favicon.svg`,
                    "image": `${baseUrl}/assets/og-image.jpg`,
                    "description": t.description,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Berlin",
                        "addressCountry": "DE"
                    },
                    "areaServed": {
                        "@type": "Country",
                        "name": "Germany"
                    },
                    "serviceType": [
                        "Architectural AI Renders",
                        "Immobilien-Vermarktung",
                        "Denkmal-Umnutzung Visualisierung",
                        "Real Estate Marketing Visuals"
                    ],
                    "offers": {
                        "@type": "Offer",
                        "areaServed": "DE"
                    }
                })}
            </script>
        </Helmet>
    );
};
