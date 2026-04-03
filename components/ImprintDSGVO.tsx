import React, { useEffect } from 'react';
import { Language, translations } from '../translations';

interface ImprintDSGVOProps {
    isDark?: boolean;
    language: Language;
    type: 'impressum' | 'privacy';
}

export const ImprintDSGVO: React.FC<ImprintDSGVOProps> = ({ isDark = true, language, type }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    const ObfuscatedEmail = () => (
        <a 
            href={`mai${'lto:'}info${'@'}metaforma-ai.com`} 
            className="hover:underline"
        >
            info<span className="hidden">anti-spam</span>@<span className="hidden">ignore-this</span>metaforma-ai.com
        </a>
    );

    return (
        <section className={`min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 transition-colors duration-1000 ${isDark ? 'bg-[#030303] text-white' : 'bg-white text-black'}`}>
            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* Header */}
                <div className="space-y-4">
                    <span className="text-base md:text-base uppercase tracking-[0.6em] text-[#FF660F] font-black">
                        {type === 'impressum' ? 'LEGAL' : 'DSGVO'}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading font-light tracking-tighter">
                        {type === 'impressum' ? 
                            (language === 'de' ? <>Impressum <span className="italic text-[#FF660F]">und Angaben</span></> : <>Imprint <span className="italic text-[#FF660F]">& Legal Notice</span></>) 
                            : 
                            (language === 'de' ? <>Datenschutz<span className="italic text-[#FF660F]">erklärung</span></> : <>Privacy <span className="italic text-[#FF660F]">Policy</span></>)
                        }
                    </h1>
                </div>

                <div className={`prose prose-lg max-w-none ${isDark ? 'prose-invert prose-p:text-white/70 prose-headings:text-white prose-a:text-[#FF660F]' : 'prose-p:text-black/70 prose-headings:text-black prose-a:text-[#FF660F]'}`}>
                    
                    {type === 'impressum' && (
                        <div>
                            {language === 'de' ? (
                                <div className="space-y-12">
                                    <div className="border-b border-stone-500/20 pb-12">
                                        <h2 className="mt-0">Angaben gemäß § 5 DDG</h2>
                                        <p>
                                            <strong>Metaforma</strong><br />
                                            Daniel Boubet<br />
                                            Frank-Zappa-Straße 161, 3. OG<br />
                                            12681 Berlin, Germany
                                        </p>
                                        <p>
                                            <strong>Vertreten durch:</strong><br />
                                            Daniel Boubet
                                        </p>
                                    </div>
                                    <div className="border-b border-stone-500/20 pb-12">
                                        <h2 className="mt-0">Kontakt</h2>
                                        <p>
                                            E-Mail: <ObfuscatedEmail />
                                        </p>
                                    </div>
                                    <div className="border-b border-stone-500/20 pb-12">
                                        <h2 className="mt-0">Registereintrag</h2>
                                        <p>
                                            <strong>Umsatzsteuer-Identifikationsnummer:</strong><br /> 
                                            Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und nicht ausgewiesen (Kleinunternehmerstatus).
                                        </p>
                                    </div>
                                    <div className="border-b border-stone-500/20 pb-12">
                                        <h2 className="mt-0">Redaktionell verantwortlich</h2>
                                        <p>
                                            Daniel Boubet<br />
                                            Frank-Zappa-Straße 161, 3. OG<br />
                                            12681 Berlin
                                        </p>
                                    </div>
                                    <div className="pb-12">
                                        <h2 className="mt-0">EU-Streitschlichtung</h2>
                                        <p>
                                            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br />
                                            Unsere E-Mail-Adresse finden Sie oben im Impressum.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-12">
                                    <div className="border-b border-stone-500/20 pb-12">
                                        <h2 className="mt-0">Information according to § 5 DDG</h2>
                                        <p>
                                            <strong>Metaforma</strong><br />
                                            Daniel Boubet<br />
                                            Frank-Zappa-Straße 161, 3rd floor<br />
                                            12681 Berlin, Germany
                                        </p>
                                        <p>
                                            <strong>Represented by:</strong><br />
                                            Daniel Boubet
                                        </p>
                                    </div>
                                    <div className="border-b border-stone-500/20 pb-12">
                                        <h2 className="mt-0">Contact</h2>
                                        <p>
                                            Email: <ObfuscatedEmail />
                                        </p>
                                    </div>
                                    <div className="border-b border-stone-500/20 pb-12">
                                        <h2 className="mt-0">Commercial Register</h2>
                                        <p>
                                            <strong>VAT ID:</strong><br /> 
                                            According to § 19 UStG no sales tax is charged and not shown (small business status / Kleinunternehmerstatus).
                                        </p>
                                    </div>
                                    <div className="border-b border-stone-500/20 pb-12">
                                        <h2 className="mt-0">Responsible for content</h2>
                                        <p>
                                            Daniel Boubet<br />
                                            Frank-Zappa-Straße 161, 3rd floor<br />
                                            12681 Berlin
                                        </p>
                                    </div>
                                    <div className="pb-12">
                                        <h2 className="mt-0">EU Dispute Resolution</h2>
                                        <p>
                                            The European Commission provides a platform for online dispute resolution (OS): <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br />
                                            Our email address can be found above in the imprint.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {type === 'privacy' && (
                        <div>
                            {language === 'de' ? (
                                <>
                                    <h2>1. Datenschutz auf einen Blick</h2>
                                    <h3>Allgemeine Hinweise</h3>
                                    <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
                                    
                                    <h3>Datenerfassung auf unserer Website</h3>
                                    <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>

                                    <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>
                                    <h3>Datenschutz</h3>
                                    <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.</p>

                                    <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                                    <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>

                                    <h3>FormSubmit</h3>
                                    <p>Für unsere Kontaktformulare nutzen wir den Dienst FormSubmit. Beim Absenden eines Formulars werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse und Nachricht) an FormSubmit übertragen und dort verarbeitet, um uns per E-Mail zuzustellen. Weitere Informationen zum Datenschutz bei FormSubmit finden Sie in deren Datenschutzerklärung.</p>
                                </>
                            ) : (
                                <>
                                    <h2>1. Privacy at a glance</h2>
                                    <h3>General information</h3>
                                    <p>The following notes provide a simple overview of what happens to your personal data when you visit our website. Personal data is any data with which you could be personally identified. Detailed information on the subject of data protection can be found in our privacy policy found below.</p>
                                    
                                    <h3>Data collection on our website</h3>
                                    <p><strong>Who is responsible for the data collection on this website?</strong><br />
                                    The data processing on this website is carried out by the website operator. You can find their contact details in the imprint of this website.</p>

                                    <h2>2. General information and mandatory information</h2>
                                    <h3>Data protection</h3>
                                    <p>The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations (GDPR) and this privacy policy.</p>

                                    <h3>Revocation of your consent to data processing</h3>
                                    <p>Many data processing operations are only possible with your express consent. You can revoke your consent at any time. An informal message by email to us is sufficient. The legality of the data processing carried out before the revocation remains unaffected by the revocation.</p>

                                    <h3>FormSubmit</h3>
                                    <p>For our contact forms, we use the service FormSubmit. When submitting a form, the data you enter (name, email address, and message) is transmitted to FormSubmit and processed there in order to deliver it to us by email. Further information on data protection at FormSubmit can be found in their privacy policy.</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
