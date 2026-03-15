import React from 'react';

export const metadata = {
    title: "Terms of Use | MKP Packers & Movers",
    description: "Terms and conditions of use for MKP Packers & Movers website.",
};

export default function TermsOfUsePage() {
    return (
        <div className="min-h-screen bg-background-light pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <div className="mb-12">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Legal</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-6 tracking-tight">
                        Terms of Use
                    </h1>
                    <p className="text-primary/70 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                <div className="space-y-10 text-primary/80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">2. Description of Service</h2>
                        <p>
                            MKP Packers & Movers provides logistics, packing, and moving services including home relocation, corporate relocation, and vehicle transportation. We reserve the right to modify or discontinue, temporarily or permanently, the services with or without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">3. User Responsibilities & Data</h2>
                        <p className="mb-4">
                            When requesting a quote or service through our website, you agree to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide true, accurate, current, and complete information about yourself (Name, Phone Number, Email).</li>
                            <li>Provide accurate details regarding your relocation needs to ensure a proper estimate.</li>
                            <li>Acknowledge that by submitting your contact information, you authorize MKP Packers & Movers to call and message you regarding your inquiry, even if your number is registered on a "Do Not Call" registry.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">4. Limitation of Liability</h2>
                        <p>
                            MKP Packers & Movers shall not be liable for any indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses (even if we have been advised of the possibility of such damages), resulting from the use or the inability to use the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">5. Modifications to Terms</h2>
                        <p>
                            We reserve the right to change these conditions from time to time as we see fit and your continued use of the site will signify your acceptance of any adjustment to these terms.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
