import React from 'react';

export const metadata = {
    title: "Privacy Policy | MKP Packers & Movers",
    description: "Privacy policy and data collection practices for MKP Packers & Movers.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background-light pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <div className="mb-12">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Legal</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-6 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-primary/70 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>

                <div className="space-y-10 text-primary/80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">1. Introduction</h2>
                        <p>
                            At MKP Packers & Movers, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">2. Information We Collect</h2>
                        <p className="mb-4">
                            To provide our relocation services effectively, we may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, and title.</li>
                            <li><strong>Contact Data:</strong> includes your email address and telephone/mobile numbers.</li>
                            <li><strong>Relocation Data:</strong> includes pickup address, destination address, moving dates, and necessary inventory details required to provide an accurate estimate and execute the move.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">3. How We Use Your Information</h2>
                        <p className="mb-4">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To contact you via phone calls or SMS/WhatsApp messages regarding your inquiry.</li>
                            <li>To provide an accurate estimate for your relocation based on the provided data.</li>
                            <li>To manage our relationship with you during the packing and moving procedure.</li>
                            <li>To coordinate with our drivers and packers for the smooth execution of your relocation.</li>
                        </ul>
                        <p className="mt-4 font-semibold text-primary">
                            By providing your phone number and email address, you expressly consent to being contacted by MKP Packers & Movers personnel for further procedures related to your relocation request.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">4. Data Security</h2>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at our corporate headquarters or via the Contact Us page on this website.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
