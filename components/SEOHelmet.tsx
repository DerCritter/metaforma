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
    // Precise canonical mapping: ensure language roots have trailing slashes to match sitemap.xml
    const canonicalPath = (normalizedPath === '/' || normalizedPath === '/de' || normalizedPath === '/de/') 
        ? (normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`) 
        : normalizedPath;
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
            
            {/* Hreflang Tags for International Targeting - Stronger cross-linking */}
            <link rel="alternate" hrefLang="en" href={`${baseUrl}${enPath}`} />
            <link rel="alternate" hrefLang="de" href={`${baseUrl}${dePath}`} />
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

            {/* Structured Data: Organization + LocalBusiness */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
                    "@id": `${baseUrl}/#organization`,
                    "name": "Metaforma",
                    "alternateName": "Metaforma AI",
                    "url": baseUrl,
                    "logo": `${baseUrl}/favicon.svg`,
                    "image": `${baseUrl}/assets/og-image.jpg`,
                    "description": language === 'de' 
                        ? "KI-gestützte Architekturvisualisierung und Immobilienmarketing in Berlin. Spezialisiert auf Denkmalschutz, Sanierung und hochwertige 3D-Renderings für Projektentwickler."
                        : "AI-driven architectural visualization and real estate marketing in Berlin. Specialized in heritage preservation, renovation, and high-end 3D renders for property developers.",
                    "foundingDate": "2024",
                    "founder": {
                        "@type": "Person",
                        "name": "Daniel Boubet"
                    },
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Frank-Zappa-Straße 161, 3rd floor",
                        "addressLocality": "Berlin",
                        "postalCode": "12681",
                        "addressRegion": "Berlin",
                        "addressCountry": "DE"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 52.5200,
                        "longitude": 13.4050
                    },
                    "areaServed": [
                        { "@type": "Country", "name": "Germany" },
                        { "@type": "Country", "name": "Austria" },
                        { "@type": "Country", "name": "Switzerland" }
                    ],
                    "email": "info@metaforma-ai.com",
                    "priceRange": "€€€",
                    "knowsLanguage": ["de", "en", "es"],
                    "knowsAbout": [
                        "Architekturvisualisierung",
                        "3D Rendering Immobilien",
                        "Denkmalschutz Visualisierung",
                        "Immobilienmarketing",
                        "KI Architektur Rendering",
                        "Sanierung Visualisierung",
                        "AI Architectural Visualization",
                        "Real Estate Marketing Renders",
                        "Heritage Building Renovation",
                        "Property Development Visuals"
                    ],
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Architectural Visualization Services",
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": language === 'de' ? "KI Editorial Renderings" : "AI Editorial Renders",
                                    "description": language === 'de' 
                                        ? "Hochwertige KI-gestützte Architekturvisualisierungen für Immobilien-Exposés und Luxuskataloge"
                                        : "High-end AI-powered architectural visualizations for property exposés and luxury catalogs"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": language === 'de' ? "Denkmalschutz & Sanierung Visualisierung" : "Heritage Renovation Visualization",
                                    "description": language === 'de'
                                        ? "Digitale Visualisierung von Sanierungsprojekten für denkmalgeschützte Gebäude und historische Objekte"
                                        : "Digital visualization of renovation projects for heritage-protected buildings and historical properties"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": language === 'de' ? "Neubau 3D Visualisierung" : "New Build 3D Visualization",
                                    "description": language === 'de'
                                        ? "Fotorealistische 3D-Renderings für Neubauprojekte und moderne Architektur"
                                        : "Photorealistic 3D renders for new construction projects and modern architecture"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": language === 'de' ? "Strategische Vertriebsvisualisierung" : "Strategic Sales Assets",
                                    "description": language === 'de'
                                        ? "KI-generierte visuelle Inhalte zur Beschleunigung von Immobilieninvestitionen"
                                        : "AI-generated visual content designed to accelerate real estate investment"
                                }
                            }
                        ]
                    }
                })}
            </script>

            {/* Structured Data: WebSite with SearchAction for Sitelinks */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Metaforma",
                    "url": baseUrl,
                    "inLanguage": [language === 'de' ? "de-DE" : "en"],
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${baseUrl}/blog?q={search_term_string}`,
                        "query-input": "required name=search_term_string"
                    }
                })}
            </script>
        </Helmet>
    );
};
