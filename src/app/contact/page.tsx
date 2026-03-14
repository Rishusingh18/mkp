export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary mb-6">Contact Us</h1>
            <p className="text-secondary/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                Get in touch with us for any inquiries or support concerning your relocation needs.
            </p>
            <div className="bg-white/5 border border-secondary/20 p-8 rounded-2xl max-w-md w-full text-left shadow-xl">
                <div className="mb-6">
                    <span className="block text-xs font-bold text-secondary/50 uppercase tracking-widest mb-2">Email</span>
                    <a href="mailto:support@mkpglobalmobility.com" className="text-secondary text-lg hover:text-white transition-colors">support@mkpglobalmobility.com</a>
                </div>
                <div>
                    <span className="block text-xs font-bold text-secondary/50 uppercase tracking-widest mb-2">Phone</span>
                    <a href="tel:+1234567890" className="text-secondary text-lg hover:text-white transition-colors">+1 (234) 567-890</a>
                </div>
            </div>
        </div>
    );
}
