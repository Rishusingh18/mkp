import Link from "next/link";

export default function Footer() {
    return (
        <div className="footer-reveal-container h-full">
            <footer className="footer-content bg-primary text-secondary/60 py-10 border-t border-secondary/10 mt-auto z-10 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 bg-secondary rounded flex items-center justify-center text-primary font-serif font-bold text-lg">M</div>
                        <div className="text-sm">
                            <span className="block font-bold text-secondary">MKP Global Mobility</span>
                            <span className="text-xs uppercase tracking-tighter">© {new Date().getFullYear()} All rights reserved.</span>
                        </div>
                    </div>
                    <div className="flex space-x-8 text-xs uppercase tracking-widest font-medium">
                        <a href="#" className="hover:text-secondary transition-colors py-2">Privacy Policy</a>
                        <a href="#" className="hover:text-secondary transition-colors py-2">Terms of Use</a>
                        <a href="#" className="hover:text-secondary transition-colors py-2">Contact Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
