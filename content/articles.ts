import { Language } from '../translations';
import React from 'react';

export type ArticleBlock = 
  | { type: 'h2'; content: string }
  | { type: 'h3'; content: string }
  | { type: 'p'; content: string | React.ReactNode }
  | { type: 'image'; src: string; alt: string; caption?: string; size?: 'full' | 'inline' | 'reference' }
  | { type: 'comparison'; before: string; after: string; label: string }
  | { type: 'synthesis'; raw: string; ref: string; result: string; label: string }
  | { type: 'aerial-integration'; map: string; result: string; label: string }
  | { type: 'callout'; content: string };

export interface Article {
  id: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  content: Record<Language, {
    title: string;
    description: string;
    blocks: ArticleBlock[];
  }>;
}

export const articles: Article[] = [
{
  id: 'draft-sketch-to-render-1',
  slug: 'architectural-sketch-to-photorealistic-ai-render',
  date: '2026-07-29',
  readTime: '6 min read',
  category: 'Methodology',
  content: {
    en: {
      title: 'AI in Architecture: From Sketch to Render in 2026',
      description: 'Navigating the current landscape of AI rendering tools: when to use BIM integrations like Veras versus rapid ideation tools like ArchiVinci.',
      blocks: [
        { type: 'p', content: 'In 2026, the use of AI in architectural sketch-to-render workflows has evolved from an experimental novelty to a standard industry practice. The question is no longer whether to use AI, but which tool fits the specific stage of your design process. Currently, the landscape is divided by how these tools integrate with existing software and how well they preserve geometric intent.' },
        { type: 'image', src: '/assets/blog/project-outdoor.jpg', alt: 'Architectural Workflow Project' },
        { type: 'h2', content: 'Model-Based Plugins (Veras)' },
        { type: 'p', content: 'When geometric accuracy is non-negotiable, standalone web generators often fail by hallucinating structural changes. This is where model-based plugins excel. Tools like <a href="https://www.evolvelab.io/veras" target="_blank">Veras</a> operate directly within BIM and CAD environments—such as Revit, SketchUp, and Rhino. They read the active 3D geometry and apply AI-driven materials and lighting without altering the underlying model.' },
        { type: 'p', content: 'This approach ensures that the BIM file remains the single source of truth for dimensions and buildable geometry, while the AI accelerates client communication and material exploration.' },
        { type: 'h2', content: 'Sketch Interpreters (ArchiVinci & MyArchitectAI)' },
        { type: 'p', content: 'For the earliest stages of design, when you only have a napkin sketch or a flat CAD screenshot, tools like <a href="https://archivinci.com" target="_blank">ArchiVinci</a> and <a href="https://myarchitectai.com" target="_blank">MyArchitectAI</a> provide rapid ideation. They infer a complete render from simple line drawings in seconds. While they are incredibly fast, they lack the geometric constraints of a BIM plugin, meaning the output is better suited for internal moodboarding than final client presentation.' },
        { type: 'callout', content: 'If you need high-end artistic mood boards without strict geometric constraints, Midjourney remains a leader for pure aesthetic exploration based on text prompts.' },
        { type: 'h2', content: 'The Need for a Unified Workflow' },
        { type: 'p', content: 'As the industry matures, we are seeing a shift toward collaborative design workspaces like Gendo, which move beyond one-click generation. These platforms provide a dedicated canvas where teams can store, edit, annotate, and compare multiple design iterations in one place.' },
        { type: 'p', content: 'Ultimately, generative models are built to speed up ideation. By choosing the right tool for the right input—Veras for 3D models, ArchiVinci for sketches—you ensure the AI supports your design process without compromising architectural integrity.' }
      ]
    },
    de: {
      title: 'KI in der Architektur: Von der Skizze zum Render im Jahr 2026',
      description: 'Die aktuelle Landschaft der KI-Rendering-Tools: Wann BIM-Integrationen wie Veras und wann schnelle Ideen-Tools wie ArchiVinci sinnvoll sind.',
      blocks: [
        { type: 'p', content: 'Im Jahr 2026 hat sich der Einsatz von KI in architektonischen Skizze-zu-Render-Workflows von einer experimentellen Neuheit zu einem Standard in der Branche entwickelt. Die Frage ist nicht mehr, ob man KI einsetzt, sondern welches Tool zur jeweiligen Phase des Entwurfsprozesses passt. Aktuell unterteilt sich der Markt danach, wie diese Tools in bestehende Software integriert werden und wie gut sie die geometrische Absicht bewahren.' },
        { type: 'image', src: '/assets/blog/project-outdoor.jpg', alt: 'Architektur-Workflow Projekt' },
        { type: 'h2', content: 'Modellbasierte Plugins (Veras)' },
        { type: 'p', content: 'Wenn geometrische Genauigkeit unverzichtbar ist, versagen eigenständige Web-Generatoren oft, indem sie strukturelle Änderungen halluzinieren. Hier brillieren modellbasierte Plugins. Tools wie <a href="https://www.evolvelab.io/veras" target="_blank">Veras</a> arbeiten direkt in BIM- und CAD-Umgebungen – wie Revit, SketchUp und Rhino. Sie lesen die aktive 3D-Geometrie aus und wenden KI-gesteuerte Materialien und Beleuchtung an, ohne das zugrunde liegende Modell zu verändern.' },
        { type: 'p', content: 'Dieser Ansatz stellt sicher, dass die BIM-Datei die einzige Quelle der Wahrheit (Source of Truth) für Abmessungen und baubare Geometrie bleibt, während die KI die Kundenkommunikation und Materialerkundung beschleunigt.' },
        { type: 'h2', content: 'Skizzen-Interpreter (ArchiVinci & MyArchitectAI)' },
        { type: 'p', content: 'Für die frühesten Entwurfsphasen, in denen nur eine Serviettenskizze oder ein flacher CAD-Screenshot vorliegt, bieten Tools wie <a href="https://archivinci.com" target="_blank">ArchiVinci</a> und <a href="https://myarchitectai.com" target="_blank">MyArchitectAI</a> eine schnelle Ideenfindung. Sie leiten aus einfachen Strichzeichnungen in Sekundenschnelle ein vollständiges Render ab. Obwohl sie unglaublich schnell sind, fehlen ihnen die geometrischen Einschränkungen eines BIM-Plugins, was bedeutet, dass sich die Ausgabe besser für internes Moodboarding als für finale Kundenpräsentationen eignet.' },
        { type: 'callout', content: 'Wenn Sie hochwertige künstlerische Moodboards ohne strenge geometrische Einschränkungen benötigen, bleibt Midjourney führend für die rein ästhetische Erkundung basierend auf Text-Prompts.' },
        { type: 'h2', content: 'Der Bedarf an einem einheitlichen Workflow' },
        { type: 'p', content: 'Mit zunehmender Reife der Branche beobachten wir einen Wandel hin zu kollaborativen Entwurfsarbeitsplätzen wie Gendo, die über die einfache Generierung per Mausklick hinausgehen. Diese Plattformen bieten eine dedizierte Arbeitsfläche, auf der Teams mehrere Entwurfsiterationen an einem Ort speichern, bearbeiten, kommentieren und vergleichen können.' },
        { type: 'p', content: 'Letztendlich sind generative Modelle dafür gebaut, die Ideenfindung zu beschleunigen. Indem Sie das richtige Tool für den richtigen Input wählen – Veras für 3D-Modelle, ArchiVinci für Skizzen –, stellen Sie sicher, dass die KI Ihren Entwurfsprozess unterstützt, ohne die architektonische Integrität zu gefährden.' }
      ]
    }
  }
}
,
  {
    id: '1',
    slug: 'how-to-elevate-real-estate-assets',
    date: '2026-04-19',
    readTime: '5 min read',
    category: 'Methodology',
    content: {
      en: {
        title: 'How to Elevate Real Estate Assets from a Low-Quality Photo',
        description: 'A professional guide on how we methodically transform poor baseline photography into comprehensive, high-end editorial render sets.',
        blocks: [
          { type: 'p', content: 'In real estate marketing, the quality of your visual assets dictates the perceived value of the property before a buyer even steps through the door. Often, we are handed low-quality smartphone captures or basic 3D drafts. Our goal isn\'t just to "make it look better"—it\'s to establish a cohesive, photorealistic narrative. Here is a breakdown of our exact methodology.' },
          { type: 'comparison', before: '/assets/blog/raw-before-2.jpg', after: '/assets/blog/anchor-after.jpg', label: 'The Baseline Transformation' },
          { type: 'h2', content: 'Phase I: Establishing the Master Anchor' },
          { type: 'p', content: 'Before generating a full gallery, you need an "Anchor Image". This first render establishes the setting, the mood, and the lighting parameters for the entire series. When working from a low-quality photo, the precision of your prompt is everything.' },
          { type: 'p', content: 'You must actively dictate the atmospheric conditions from a specific vocabulary list. Do not let the AI guess. Specify the time of day and lighting mood by choosing parameters like: Golden Hour, Early Morning, Overcast, Blue Hour, or Night.' },
          { type: 'image', src: '/assets/blog/light-settings.jpg', alt: 'Atmospheric Lighting Settings Variations', size: 'reference' },
          { type: 'p', content: 'We also lock in the specific architectural style (e.g., High-end, Industrial, Residential) and the camera gear to emulate. Here is an example of a foundational prompt we might use:' },
          { type: 'callout', content: '"Create a photorealistic version of the picture, appear well-maintained and renovated, for editorial real estate resolution. Shot with a Canon EOS R5. Golden Hour lighting, editorial real estate quality."' },
          { type: 'h2', content: 'Phase II: Aesthetic Propagation' },
          { type: 'p', content: 'Once we have successfully generated this Anchor frame, it becomes our core reference. By extracting the stylistic and lighting DNA of this master image, we can import it alongside other low-quality photos of the property. The methodology relies on applying the precise aesthetic of our anchor to the remaining views, ensuring the entire gallery looks like a unified photoshoot rather than a collection of disjointed renders.' },
          { 
            type: 'synthesis', 
            raw: '/assets/blog/propagation-before.jpg', 
            ref: '/assets/blog/anchor-ref.jpg', 
            result: '/assets/blog/propagation-after.jpg',
            label: 'The Synthesis Process: Raw Input + Style Ingredient = Editorial Result' 
          },
          { type: 'h2', content: 'Phase III: Environmental Aerial Blending' },
          { type: 'p', content: 'For a complete real estate package, grand aerial perspectives are crucial. One of our advanced techniques is to generate flawless drone shots by strictly geo-referencing raw topographical captures from Google Maps, and mixing them with our established style signature.' },
          { 
            type: 'aerial-integration', 
            map: '/assets/blog/aerial-raw.jpg', 
            result: '/assets/blog/aerial-result-final.jpg',
            label: 'Topographical Translation: Raw Data to Real Estate' 
          },
          { type: 'callout', content: 'If you want a step-by-step technical breakdown of this process, click here to explore our specialized Aerial Maps Tutorial (coming soon).' },
          { type: 'h2', content: 'Phase IV: Conscious Lifestyle Inhabitation' },
          { type: 'p', content: 'To make scenes feel genuinely alive, we must introduce human elements that reflect the lifestyle of the environment. This must be approached logically: the demographics must match the space, whether it\'s a collaborative co-working hub or a relaxed family residential building.' },
          { type: 'image', src: '/assets/blog/lifestyle.jpg', alt: 'Diverse Urban Lifestyle Integration', caption: 'Conscious integration of context-appropriate demographics.' },
          { type: 'p', content: 'Crucially, you must actively manage demographic bias. Generative models tend to default to homogenized populations. You must actively specify in your prompt that you want your demographics to be ethnically balanced, integrating multiple ethnicities to accurately reflect modern, diverse urban realities.' },
          { type: 'h3', content: 'Executing the Vision' },
          { type: 'p', content: 'While the foundational concepts are straightforward, achieving consistent, high-end editorial results requires significant time, architectural judgment, and parameter fine-tuning. If you would rather focus on selling the asset while professionals handle the visual synthesis, our team is ready to step in.' }
        ]
      },
      de: {
        title: 'Wie man Immobilien-Assets aus einem minderwertigen Foto aufwertet',
        description: 'Ein professioneller Leitfaden, wie wir methodisch schlechte Ausgangsfotos in umfassende, hochwertige Editorial-Rendering-Sets verwandeln.',
        blocks: [
          { type: 'p', content: 'Im Immobilienmarketing bestimmt die Qualität der visuellen Assets den wahrgenommenen Wert der Immobilie, noch bevor ein potenzieller Käufer den Raum betritt. Oft erhalten wir minderwertige Smartphone-Aufnahmen oder einfache 3D-Entwürfe. Unser Ziel ist es nicht nur, diese "besser aussehen zu lassen", sondern eine kohärente, fotorealistische Erzählung zu schaffen. Hier ist eine genaue Aufschlüsselung unserer Methodik.' },
          { type: 'comparison', before: '/assets/blog/raw-before-2.jpg', after: '/assets/blog/anchor-after.jpg', label: 'Die Basis-Transformation' },
          { type: 'h2', content: 'Phase I: Etablierung des Master-Ankers' },
          { type: 'p', content: 'Bevor wir eine vollständige Galerie erstellen, benötigen wir ein "Anker-Bild". Dieser erste Render legt das Setting, die Stimmung und die Beleuchtungsparameter für die gesamte Fotostrecke fest. Wenn Sie von einem minderwertigen Foto ausgehen, ist die Präzision Ihres Prompts entscheidend.' },
          { type: 'p', content: 'Sie müssen die atmosphärischen Bedingungen aus einem spezifischen Vokabular aktiv vorgeben. Überlassen Sie der KI nicht das Raten. Bestimmen Sie die Tageszeit und Lichtstimmung, indem Sie Parameter wie Golden Hour, Early Morning, Overcast, Blue Hour oder Night wählen.' },
          { type: 'image', src: '/assets/blog/light-settings.jpg', alt: 'Atmospheric Lighting Settings Variations', size: 'reference' },
          { type: 'p', content: 'Wir legen auch den spezifischen architektonischen Stil (z.B. High-End, Industrial, Residential) und die simulierte Kameraausrüstung fest. Hier ist ein Beispiel für einen grundlegenden Prompt, den wir verwenden könnten:' },
          { type: 'callout', content: '"Create a photorealistic version of the picture, appear well-maintained and renovated, for editorial real estate resolution. Shot with a Canon EOS R5. Golden Hour lighting, editorial real estate quality."' },
          { type: 'h2', content: 'Phase II: Ästhetische Propagierung' },
          { type: 'p', content: 'Sobald wir diesen Anker-Frame erfolgreich generiert haben, wird er zu unserer Hauptreferenz. Indem wir die stilistische und lichttechnische DNA dieses Master-Bildes extrahieren, können wir sie neben anderen minderwertigen Fotos der Immobilie importieren. Die Methodik besteht darin, die genaue Ästhetik unseres Ankers auf die restlichen Ansichten anzuwenden, um sicherzustellen, dass die gesamte Galerie wie ein einheitliches Fotoshooting wirkt und nicht wie eine Sammlung zusammenhangsloser Renderings.' },
          { 
            type: 'synthesis', 
            raw: '/assets/blog/propagation-before.jpg', 
            ref: '/assets/blog/anchor-ref.jpg', 
            result: '/assets/blog/propagation-after.jpg',
            label: 'Der Synthese-Prozess: Roher Input + Stil-Ingredienz = Editorial-Ergebnis' 
          },
          { type: 'h2', content: 'Phase III: Umgebungs-Aerials' },
          { type: 'p', content: 'Für ein vollständiges Immobilienpaket sind imposante Luftbildperspektiven entscheidend. Eine unserer fortschrittlichen Techniken besteht darin, makellose Drohnenaufnahmen zu generieren, indem wir rohe topografische Aufnahmen von Google Maps strikt georeferenzieren und mit unserer etablierten Stil-Signatur mischen.' },
          { 
            type: 'aerial-integration', 
            map: '/assets/blog/aerial-raw.jpg', 
            result: '/assets/blog/aerial-result-final.jpg',
            label: 'Topografische Übersetzung: Rohdaten zu Immobilien' 
          },
          { type: 'callout', content: 'Wenn Sie eine detaillierte technische Aufschlüsselung dieses Prozesses wünschen, klicken Sie hier, um unser spezielles Aerial-Maps-Tutorial zu entdecken (coming soon).' },
          { type: 'h2', content: 'Phase IV: Bewusste Lifestyle-Integration' },
          { type: 'p', content: 'Um Szenen wirklich lebendig wirken zu lassen, müssen wir menschliche Elemente einführen, die den Lebensstil der Umgebung widerspiegeln. Dies muss logisch angegangen werden: Die Demografie muss zum Raum passen, sei es ein kollaborativer Co-Working-Hub oder ein entspanntes Familienwohngebäude.' },
          { type: 'image', src: '/assets/blog/lifestyle.jpg', alt: 'Vielfältige urbane Lifestyle-Integration', caption: 'Bewusste Integration einer kontextbezogenen Demografie.' },
          { type: 'p', content: 'Entscheidend ist, dass Sie demografische Voreingenommenheit (Bias) proaktiv managen müssen. Generative Modelle tendieren dazu, auf homogenisierte Populationen zurückzugreifen. Sie müssen in Ihrem Prompt aktiv angeben, dass Sie ethnisch ausgewogene Demografien wünschen, die verschiedene Ethnien integrieren, um moderne und vielfältige urbane Realitäten genau widerzuspiegeln.' },
          { type: 'h3', content: 'Umsetzung der Vision' },
          { type: 'p', content: 'Während die grundlegenden Konzepte einfach sind, erfordert das Erreichen konsistenter, kinoreifer und hochwertiger Editorial-Ergebnisse viel Zeit, architektonisches Urteilsvermögen und die Feinabstimmung von Parametern. Wenn Sie sich lieber auf den Verkauf der Immobilie konzentrieren möchten, während Profis die visuelle Synthese übernehmen, steht unser Team bereit.' }
        ]
      }
    }
  }
];
