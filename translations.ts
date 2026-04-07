export type Language = 'en' | 'de';

export interface LanguageDictionary {
  navbar: {
    home: string;
    services: string;
    philosophy: string;
    portfolio: string;
    contact: string;
  };
  hero: {
    title_part1: string;
    title_part2: string;
    subtitle: string;
    cta: string;
  };
  services: {
    sector1_label: string;
    sector1_title1: string;
    sector1_title2: string;
    sector1_desc: string;
    sector2_label: string;
    sector2_title1: string;
    sector2_title2: string;
    sector2_desc: string;
    pillar3_label: string;
    pillar3_title1: string;
    pillar3_title2: string;
    pillar3_desc: string;
    growth_label: string;
    growth_title1: string;
    growth_title2: string;
    growth_desc: string;
    growth_pillar1_title: string;
    growth_pillar1_desc: string;
    growth_pillar2_title: string;
    growth_pillar2_desc: string;
    growth_pillar3_title: string;
    growth_pillar3_desc: string;
    showcase_label: string;
    showcase_title1: string;
    showcase_title2: string;
    neubau_showcase_label: string;
    neubau_showcase_title1: string;
    neubau_showcase_title2: string;
    philosophy_label: string;
    philosophy_title1: string;
    philosophy_title2: string;
    philosophy_p1: string;
    philosophy_p2: string;
    philosophy_p2_highlight: string;
    cta_portfolio: string;
    cta_inquiry: string;
    cta_open_library: string;
    cta_start_inquiry_sm: string;
    cta_start_inquiry_lg: string;
    cta_inquire_strategy: string;
    cta_start_strategy: string;
    label_performance: string;
    label_visibility: string;
    label_engagement: string;
    label_conversion_boost: string;
    title_web_conversion: string;
    title_seo_authority: string;
    title_video_strategy: string;
    highlight_philosophy: string;
    highlight_growth: string;
    project_coworking: string;
    project_lofts: string;
    project_multifamily: string;
    project_apartment: string;
    project_penthouse: string;
    project_coworking_sub: string;
    project_lofts_sub: string;
    project_multifamily_sub: string;
    project_apartment_sub: string;
    project_penthouse_sub: string;
    project_coworking_desc: string;
    project_lofts_desc: string;
    project_multifamily_desc: string;
    project_apartment_desc: string;
    project_penthouse_desc: string;
  };
  footer: {
    mission: string;
    pillars: string;
    imprint: string;
    imp_brand: string;
    imp_contact: string;
    imp_email: string;
    imp_tax: string;
  };
  chat: {
    title: string;
    subtitle: string;
    welcome: string;
    placeholder: string;
    btn_send: string;
    typing: string;
  };
  process: {
    title: string;
    step1_title: string;
    step1_desc: string;
    step2_title: string;
    step2_desc: string;
    step3_title: string;
    step3_desc: string;
  };
  service_highlights: {
    s1_title: string;
    s1_desc: string;
    s2_title: string;
    s2_desc: string;
    s3_title: string;
    s3_desc: string;
    s4_title: string;
    s4_desc: string;
  };
  trusted_partners: {
    title: string;
  };
  tags: {
    workplace: string;
    heritage_reuse: string;
    modernist: string;
    industrial_heritage: string;
    luxus_lofts: string;
    adaptive_reuse: string;
    heritage: string;
    multi_family: string;
    residential: string;
    commercial: string;
    modern_neubau: string;
    glass_architecture: string;
    office: string;
    digital_synthesis: string;
    industrial: string;
  };
  common: {
    portfolio: string;
    inquiry: string;
  };
  contact_form: {
    submitted_title: string;
    submitted_subtitle: string;
    label_get_in_touch: string;
    title_start: string;
    title_highlight: string;
    description: string;
    hq_label: string;
    hq_desc: string;
    field_name: string;
    field_email: string;
    field_vision: string;
    placeholder_name: string;
    placeholder_email: string;
    placeholder_vision: string;
    btn_submit: string;
  };
  ui: {
    export_pdf: string;
    insights: string;
    type: string;
    location: string;
    synthesis_comparison: string;
    before: string;
    after: string;
    immersive_perspective: string;
    cinematic_synthesis: string;
    immersive_vision: string;
    gallery: string;
    return_to_portfolio: string;
    close_detail: string;
    tap_to_close: string;
    heritage_reuse: string;
    gallery_desc: string;
    view_gallery: string;
  };
  portfolio_ui: {
    title_part1: string;
    title_part2: string;
    view_mode_cards_desc: string;
    view_mode_cloud_desc: string;
    view_standard: string;
    view_grid_cloud: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  }
}

export const translations: Record<Language, LanguageDictionary> = {
  en: {
    navbar: {
      home: 'Home',
      services: 'Services',
      philosophy: 'Philosophy',
      portfolio: 'Portfolio',
      contact: 'Contact Now'
    },
    hero: {
      title_part1: 'transforming properties',
      title_part2: 'with ai-driven renders',
      subtitle: 'Elevate listings. Define spaces.',
      cta: 'Start Inquiry'
    },
    services: {
      sector1_label: 'SECTOR I',
      sector1_title1: 'Heritage',
      sector1_title2: 'Adaptive Reuse',
      sector1_desc: 'We specialize in Denkmalschutz (Historic Preservation). Our AI-driven process respects the architectural soul of the past while projecting the luxury potential for tomorrow\'s investors.',
      sector2_label: 'SECTOR II',
      sector2_title1: 'Modern New Builds',
      sector2_title2: 'Defining the Skyline',
      sector2_desc: 'From high-end residential complexes to cutting-edge commercial spaces. We provide technical precision and aesthetic perfection to ensure market dominance from the first concept.',
      pillar3_label: 'GROWTH',
      pillar3_title1: 'Digital Strategy',
      pillar3_title2: 'for AEC Leaders',
      pillar3_desc: 'Empowering high-end architectural and heritage projects with data-driven online positioning, increased user trust, and maximized market conversion.',
      growth_label: 'Growth Ecosystem',
      growth_title1: 'scale your vision',
      growth_title2: 'with digital assets',
      growth_desc: 'We provide the technical framework to showcase your projects on any platform with .',
      growth_pillar1_title: 'Conversion web ecosystems',
      growth_pillar1_desc: 'Digital stages that increase investor trust and maximize photorealistic conversion.',
      growth_pillar2_title: 'Cinematic storytelling',
      growth_pillar2_desc: 'High-impact video campaigns that increase purchase intent by 97% across AEC sectors.',
      growth_pillar3_title: 'Strategic market authority',
      growth_pillar3_desc: 'SEO and organic positioning to dominate the AEC sector using heritage search intent.',
      showcase_label: 'STRATEGY',
      showcase_title1: 'Visionary',
      showcase_title2: 'Transformations',
      neubau_showcase_label: 'PORTFOLIO',
      neubau_showcase_title1: 'Neubau',
      neubau_showcase_title2: 'Synthesis',
      philosophy_label: 'the philosophy',
      philosophy_title1: 'the living',
      philosophy_title2: 'element',
      philosophy_p1: 'Our philosophy is rooted in the emotional resonance of a space. We master the dialogue between light, texture, and cinematic depth to capture the ‘Living Element.’',
      philosophy_p2: 'From restoring historic landmarks to developing contemporary visions from the ground up, we invite investors to inhabit the future today. We bridge the gap between technical blueprints and the aspiration of an elevated lifestyle. Whether Heritage or Neubau, we ensure ',
      philosophy_p2_highlight: 'every project is lived before it is built.',
      cta_portfolio: 'VIEW PORTFOLIO',
      cta_inquiry: 'INQUIRY NOW',
      cta_open_library: 'OPEN LIBRARY',
      cta_start_inquiry_sm: 'Start Your Inquiry',
      cta_start_inquiry_lg: 'Inquire Now',
      cta_inquire_strategy: 'Inquire Strategy',
      cta_start_strategy: 'Start strategy',
      label_performance: 'Performance',
      label_visibility: 'Visibility',
      label_engagement: 'Engagement',
      label_conversion_boost: 'Conversion Boost',
      title_web_conversion: 'Web Conversion',
      title_seo_authority: 'SEO Authority',
      title_video_strategy: 'Immersive Video Strategy',
      highlight_philosophy: 'light, texture, and cinematic depth',
      highlight_growth: 'maximum engagement',
      project_coworking: 'Coworking space Wuppertal',
      project_lofts: 'Luxus lofts Nürnberg',
      project_multifamily: 'Heritage Multi-Family Wuppertal',
      project_apartment: 'Apartment complex',
      project_penthouse: 'NRW Penthouse',
      project_coworking_sub: 'Modern Workplace Integration',
      project_lofts_sub: 'Industrial Heritage Conversion',
      project_multifamily_sub: 'Historic Sector Transformation',
      project_apartment_sub: 'Baden-Württemberg',
      project_penthouse_sub: 'Luxury Lifestyle',
      project_coworking_desc: 'A modern workplace integration within a historical architectural shell, blending industrial aesthetics with digital-age collaboration. This project reimagines high-ceilinged historical structures as high-performance, light-filled creative hubs.',
      project_lofts_desc: 'Transformation of a historic industrial building into high-end residential lofts. This project preserves the raw industrial heritage and material soul while introducing luxury living amenities and cinematic spatial depth.',
      project_multifamily_desc: 'A sophisticated adaptive reuse project transforming a former monastic complex into a premium multi-family residence. The design bridges historical sacred architecture with modern residential luxury.',
      project_apartment_desc: 'A landmark high-end commercial development featuring a crystalline facade and visionary spatial architecture. This project defines modern luxury corporate environments.',
      project_penthouse_desc: 'A visionary transformation of a high-end space into a cutting-edge luxury penthouse. This project showcases the power of digital synthesis in reimagining interior volumes.'
    },
    footer: {
      mission: 'A studio dedicated to the preservation of physical heritage through advanced AI synthesis and digital architectural photorealism.',
      pillars: 'SECTORS',
      imprint: 'IMPRINT / LEGAL NOTICE',
      imp_brand: 'Brand / Business Name:',
      imp_contact: 'Contact / Business Address:',
      imp_email: 'Email:',
      imp_tax: 'Tax ID:'
    },
    chat: {
      title: 'Heritage Advisor',
      subtitle: 'Consulting on Space, History & Innovation',
      welcome: 'How may I assist your heritage synthesis today?',
      placeholder: 'Ask about monument adaptation...',
      btn_send: 'Send',
      typing: 'Synthesizing...'
    },
    process: {
      title: 'Our Methodology',
      step1_title: 'CONSULTATION',
      step1_desc: 'Deep dive into heritage constraints and monument preservation requirements.',
      step2_title: 'AI SYNTHESIS',
      step2_desc: 'Generative photorealistic models visualize complex adaptive reuse of historical structures.',
      step3_title: 'DIGITAL PORTFOLIO',
      step3_desc: 'Providing blueprints and visionary renders for developers and conservationists.'
    },
    service_highlights: {
      s1_title: 'AI Editorial Renders',
      s1_desc: 'High-impact, AI-powered imagery for architectural publications and luxury catalogs.',
      s2_title: 'Renovations & Heritage',
      s2_desc: 'High-end visual transformation for refurbishments and historic landmarks via AI.',
      s3_title: 'New Developments (Neubau)',
      s3_desc: 'Hyper-realistic AI visualizations for ground-up architectural projects.',
      s4_title: 'Strategic Sales Assets',
      s4_desc: 'AI-generated visual content designed to accelerate real estate investment.'
    },
    trusted_partners: {
      title: 'Trusted Partners'
    },
    tags: {
      workplace: 'Workplace',
      heritage_reuse: 'Heritage Reuse',
      modernist: 'Modernist',
      industrial_heritage: 'Industrial Heritage',
      luxus_lofts: 'Luxus Lofts',
      adaptive_reuse: 'Adaptive Reuse',
      heritage: 'Heritage',
      multi_family: 'Multi-Family',
      residential: 'Residential',
      commercial: 'Commercial',
      modern_neubau: 'Modern Neubau',
      glass_architecture: 'Glass Architecture',
      office: 'Office',
      digital_synthesis: 'Digital Synthesis',
      industrial: 'Industrial'
    },
    common: {
      portfolio: 'PORTFOLIO',
      inquiry: 'INQUIRY'
    },
    contact_form: {
      submitted_title: 'Inquiry Received.',
      submitted_subtitle: 'Our synthesis team will reach out to you within 24 hours.',
      label_get_in_touch: 'GET IN TOUCH',
      title_start: 'Start Your',
      title_highlight: 'Synthesis.',
      description: 'Based in Berlin, Germany. Serving visionary real estate leaders globally with architecture and heritage transformation.',
      hq_label: 'HQ BERLIN',
      hq_desc: 'Berlin, Germany | Est. 2026',
      field_name: 'Your Name',
      field_email: 'Business Email',
      field_vision: 'Project Vision',
      placeholder_name: 'John Doe',
      placeholder_email: 'john@example.com',
      placeholder_vision: 'Tell us about your architectural asset...',
      btn_submit: 'Request Inquiry'
    },
    ui: {
      export_pdf: 'EXPORT PDF',
      insights: 'INSIGHTS',
      type: 'Type',
      location: 'Location',
      synthesis_comparison: 'SYNTHESIS COMPARISON',
      before: 'BEFORE',
      after: 'AFTER',
      immersive_perspective: 'IMMERSIVE PERSPECTIVE',
      cinematic_synthesis: 'CINEMATIC SYNTHESIS',
      immersive_vision: 'IMMERSIVE VISION',
      gallery: 'GALLERY',
      return_to_portfolio: 'Return to Portfolio',
      close_detail: 'Close Detail',
      tap_to_close: 'Tap to close',
      heritage_reuse: 'Heritage Reuse',
      gallery_desc: 'Perspectives showcasing the digital synthesis of heritage preservation and high-performance adaptation.',
      view_gallery: 'View Gallery'
    },
    portfolio_ui: {
      title_part1: 'Adaptive AI',
      title_part2: 'Architecture',
      view_mode_cards_desc: 'A specialized collection focusing on the intersection of heritage preservation and generative photorealism.',
      view_mode_cloud_desc: 'A cinematic cloud of project perspectives. Tap any visual to immerse yourself in the detailed project synthesis.',
      view_standard: 'Standard',
      view_grid_cloud: 'Grid Cloud'
    },
    seo: {
      title: 'Metaforma | High-End AI Renders for Adaptive Reuse & New Construction',
      description: 'Luxury architectural visualizations and heritage adaptive reuse renders powered by advanced AI synthesis. Transforming heritage assets into modern luxury environments.',
      keywords: 'AI architecture visualization, adaptive reuse renders, new construction renders, heritage transformation, premium architectural rendering'
    }
  },
  de: {
    navbar: {
      home: 'Startseite',
      services: 'Leistungen',
      philosophy: 'Philosophie',
      portfolio: 'Portfolio',
      contact: 'Jetzt Kontaktieren'
    },
    hero: {
      title_part1: 'Immobilien Transformieren',
      title_part2: 'mit KI-gestützten Renderings',
      subtitle: 'Exzellente Präsentation. Räume Definieren.',
      cta: 'Anfrage Starten'
    },
    services: {
      sector1_label: 'SEKTOR I',
      sector1_title1: 'Denkmalschutz',
      sector1_title2: 'Adaptive Umnutzung',
      sector1_desc: 'Wir spezialisieren uns auf den Denkmalschutz. Unser KI-gestützter Prozess respektiert die architektonische Seele der Vergangenheit und projiziert gleichzeitig das Luxuspotenzial für Investoren von morgen.',
      sector2_label: 'SEKTOR II',
      sector2_title1: 'Moderne Neubauten',
      sector2_title2: 'Die Skyline Definieren',
      sector2_desc: 'Von High-End-Wohnkomplexen bis hin zu modernsten Gewerbeflächen. Wir bieten technische Präzision und ästhetische Perfektion, um die Marktführerschaft vom ersten Entwurf an sicherzustellen.',
      pillar3_label: 'WACHSTUM',
      pillar3_title1: 'Digitale Strategie',
      pillar3_title2: 'für AEC-Experten',
      pillar3_desc: 'Stärkung von High-End-Architektur- und Kulturerbeprojekten durch datengestützte Online-Positionierung, erhöhtes Nutzervertrauen und maximale Marktkonvertierung.',
      growth_label: 'Wachstums-Ökosystem',
      growth_title1: 'Vision Skalieren',
      growth_title2: 'mit digitalen Assets',
      growth_desc: 'Wir bieten den technischen Rahmen, um Ihre Projekte auf jeder Plattform mit . präsentieren zu können.',
      growth_pillar1_title: 'Konvertierungs-Web-Ökosysteme',
      growth_pillar1_desc: 'Digitale Bühnen, die das Vertrauen der Investoren stärken und die fotorealistische Konvertierung maximieren.',
      growth_pillar2_title: 'Kinoreifes Storytelling',
      growth_pillar2_desc: 'Wirkungsvolle Videokampagnen, die die Kaufabsicht in AEC-Sektoren um 97% steigern.',
      growth_pillar3_title: 'Strategische Marktautorität',
      growth_pillar3_desc: 'SEO und organische Positionierung, um den AEC-Sektor durch gezielte Suchabsichten zu dominieren.',
      showcase_label: 'STRATEGIE',
      showcase_title1: 'Visionäre',
      showcase_title2: 'Transformationen',
      neubau_showcase_label: 'PORTFOLIO',
      neubau_showcase_title1: 'Neubau',
      neubau_showcase_title2: 'Synthese',
      philosophy_label: 'Die Philosophie',
      philosophy_title1: 'Das Lebendige',
      philosophy_title2: 'Element',
      philosophy_p1: 'Unsere Philosophie wurzelt in der emotionalen Resonanz eines Raumes. Wir beherrschen den Dialog zwischen Licht, Textur und kinoreifer Tiefe, um das „lebendige Element“ einzufangen.',
      philosophy_p2: 'Von der Restaurierung historischer Wahrzeichen bis hin zur Entwicklung zeitgenössischer Visionen laden wir Investoren ein, die Zukunft schon heute zu bewohnen. Wir schließen die Lücke zwischen technischen Entwürfen und dem Anspruch an einen gehobenen Lebensstil. Ob Erbe oder Neubau, wir stellen sicher, dass ',
      philosophy_p2_highlight: 'jedes Projekt gelebt wird, bevor es gebaut wird.',
      cta_portfolio: 'PORTFOLIO ANSEHEN',
      cta_inquiry: 'JETZT ANFRAGEN',
      cta_open_library: 'BIBLIOTHEK ÖFFNEN',
      cta_start_inquiry_sm: 'Anfrage Starten',
      cta_start_inquiry_lg: 'Jetzt Anfragen',
      cta_inquire_strategy: 'Strategie Anfragen',
      cta_start_strategy: 'Strategie starten',
      label_performance: 'Performance',
      label_visibility: 'Sichtbarkeit',
      label_engagement: 'Interaktion',
      label_conversion_boost: 'Konvertierungs-Schub',
      title_web_conversion: 'Web-Konvertierung',
      title_seo_authority: 'SEO-Autorität',
      title_video_strategy: 'Immersive Videostrategie',
      highlight_philosophy: 'Licht, Textur und kinoreife Tiefe',
      highlight_growth: 'maximales Engagement',
      project_coworking: 'Coworking Space Wuppertal',
      project_lofts: 'Luxuslofts Nürnberg',
      project_multifamily: 'Denkmal Mehrfamilienhaus Wuppertal',
      project_apartment: 'Wohnkomplex',
      project_penthouse: 'NRW Penthouse',
      project_coworking_sub: 'Moderne Arbeitsplatz-Integration',
      project_lofts_sub: 'Industriekultur-Umnutzung',
      project_multifamily_sub: 'Historische Sektor-Transformation',
      project_apartment_sub: 'Baden-Württemberg',
      project_penthouse_sub: 'Luxuriöser Lebensstil',
      project_coworking_desc: 'Moderne Arbeitsplatz-Integration in historischem Gewand, die industrielle Ästhetik mit digitaler Zusammenarbeit verbindet. Dieses Projekt verwandelt hohe historische Strukturen in lichtdurchflutete Kreativzentren.',
      project_lofts_desc: 'Transformation eines historischen Industriegebäudes in hochwertige Wohnlofts. Dieses Projekt bewahrt das industrielle Erbe, während es luxuriöse Annehmlichkeiten und räumliche Tiefe einführt.',
      project_multifamily_desc: 'Ein anspruchsvolles Umnutzungsprojekt, das einen ehemaligen Klosterkomplex in eine Premium-Wohnanlage verwandelt. Das Design verbindet historische Sakralarchitektur mit modernem Wohnluxus.',
      project_apartment_desc: 'Ein wegweisendes gewerbliches Projekt mit kristalliner Fassade und visionärer Raumarchitektur. Dieses Projekt definiert moderne Luxus-Unternehmensumgebungen.',
      project_penthouse_desc: 'Eine visionäre Transformation eines High-End-Raums in ein hochmodernes Luxus-Penthouse. Dieses Projekt zeigt die Kraft der digitalen Synthese bei der Neugestaltung von Innenräumen.'
    },
    footer: {
      mission: 'Ein Studio, das sich der Erhaltung des physischen Erbes durch fortschrittliche KI-Synthese und digitalen Architektur-Fotorealismus widmet.',
      pillars: 'SEKTOREN',
      imprint: 'IMPRESSUM / RECHTLICHER HINWEIS',
      imp_brand: 'Marke / Unternehmensname:',
      imp_contact: 'Kontakt / Geschäftsadresse:',
      imp_email: 'E-Mail:',
      imp_tax: 'Steuernummer:'
    },
    chat: {
      title: 'Denkmal-Berater',
      subtitle: 'Beratung zu Raum, Geschichte & Innovation',
      welcome: 'Wie kann ich Ihre Denkmal-Synthese heute unterstützen?',
      placeholder: 'Fragen Sie nach Denkmal-Umnutzung...',
      btn_send: 'Senden',
      typing: 'Synthetisiere...'
    },
    process: {
      title: 'Unsere Methodik',
      step1_title: 'BERATUNG',
      step1_desc: 'Tiefgehende Analyse von Denkmalschutz-Auflagen und Erhaltungsanforderungen.',
      step2_title: 'KI-SYNTHESE',
      step2_desc: 'Generative fotorealistische Modelle visualisieren die komplexe Umnutzung historischer Strukturen.',
      step3_title: 'DIGITALES PORTFOLIO',
      step3_desc: 'Bereitstellung von Entwürfen und visionären Renderings für Entwickler und Denkmalschützer.'
    },
    service_highlights: {
      s1_title: 'KI Redaktions-Renderings',
      s1_desc: 'KI-gestützte High-Impact-Bilder für Architekturpublikationen und Luxuskataloge.',
      s2_title: 'Renovierung & Denkmalschutz',
      s2_desc: 'Hochwertige visuelle Transformation für Denkmalschutz-Sanierungen via KI.',
      s3_title: 'Neubau-Entwicklungen',
      s3_desc: 'Hyperrealistische KI-Visualisierungen für Neubau-Architekturprojekte.',
      s4_title: 'Strategische Vertriebs-Assets',
      s4_desc: 'KI-generierte visuelle Inhalte zur Beschleunigung von Immobilien-Investitionen.'
    },
    trusted_partners: {
      title: 'Vertrauenswürdige Partner'
    },
    tags: {
      workplace: 'Arbeitsplatz',
      heritage_reuse: 'Denkmal-Umnutzung',
      modernist: 'Modernistisch',
      industrial_heritage: 'Industriekultur',
      luxus_lofts: 'Luxus-Lofts',
      adaptive_reuse: 'Adaptive Wiedernutzung',
      heritage: 'Kulturerbe',
      multi_family: 'Mehrfamilienhaus',
      residential: 'Wohnbau',
      commercial: 'Gewerbebau',
      modern_neubau: 'Moderner Neubau',
      glass_architecture: 'Glasarchitektur',
      office: 'Büro',
      digital_synthesis: 'Digitale Synthese',
      industrial: 'Industriell'
    },
    common: {
      portfolio: 'PORTFOLIO',
      inquiry: 'ANFRAGE'
    },
    contact_form: {
      submitted_title: 'Anfrage erhalten.',
      submitted_subtitle: 'Unser Synthese-Team wird sich innerhalb von 24 Stunden bei Ihnen melden.',
      label_get_in_touch: 'KONTAKT AUFNEHMEN',
      title_start: 'Starten Sie Ihre',
      title_highlight: 'Synthese.',
      description: 'Ansässig in Berlin, Deutschland. Wir unterstützen visionäre Immobilienexperten weltweit mit Architektur- und Denkmal-Transformation.',
      hq_label: 'HAUPTSITZ BERLIN',
      hq_desc: 'Berlin, Deutschland | Gegr. 2026',
      field_name: 'Ihr Name',
      field_email: 'Geschäftliche E-Mail',
      field_vision: 'Projekt-Vision',
      placeholder_name: 'Max Mustermann',
      placeholder_email: 'max@beispiel.de',
      placeholder_vision: 'Erzählen Sie uns von Ihrem architektonischen Projekt...',
      btn_submit: 'Anfrage Senden'
    },
    ui: {
      export_pdf: 'PDF EXPORTIEREN',
      insights: 'EINBLICKE',
      type: 'Typ',
      location: 'Standort',
      synthesis_comparison: 'SYNTHESE-VERGLEICH',
      before: 'VORHER',
      after: 'NACHHER',
      immersive_perspective: 'IMMERSIVE PERSPEKTIVE',
      cinematic_synthesis: 'KINOREIFE SYNTHESE',
      immersive_vision: 'IMMERSIVE VISION',
      gallery: 'GALERIE',
      return_to_portfolio: 'Zurück zum Portfolio',
      close_detail: 'Detail schließen',
      tap_to_close: 'Zum Schließen tippen',
      heritage_reuse: 'Denkmal-Wiedernutzung',
      gallery_desc: 'Perspektiven, die die digitale Synthese von Denkmalpflege und Hochleistungs-Adaption zeigen.',
      view_gallery: 'Galerie Ansehen'
    },
    portfolio_ui: {
      title_part1: 'Adaptive KI',
      title_part2: 'Architektur',
      view_mode_cards_desc: 'Eine spezialisierte Sammlung, die sich auf die Schnittstelle zwischen Denkmalpflege und generativer Fotorealistik konzentriert.',
      view_mode_cloud_desc: 'Eine kinoreife Cloud von Projektperspektiven. Tippen Sie auf ein beliebiges Bild, um in die detaillierte Projektsynthese einzutauchen.',
      view_standard: 'Standard',
      view_grid_cloud: 'Raster-Cloud'
    },
    seo: {
      title: 'Metaforma | High-End KI-Renderings für Denkmal-Umnutzung & Neubau',
      description: 'Hochwertige KI-Architekturvisualisierung und Denkmal-Umnutzung. Wir verwandeln historisches Erbe und Industriebau in moderne Luxusimmobilien.',
      keywords: 'Architekturvisualisierung KI, Denkmal-Umnutzung Renderings, High-End Renderings, Immobilien-Visualisierung Berlin, adaptive Wiedernutzung'
    }
  }
};
