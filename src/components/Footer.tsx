import Link from "next/link";
import { Instagram, Facebook, Youtube, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <div className="footer-reveal-container h-full">
            <footer className="footer-content bg-primary text-background-light/60 py-10 border-t border-secondary/10 mt-auto z-10 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer">
                        <div className="h-8 w-8 bg-secondary rounded flex items-center justify-center text-primary font-serif font-bold text-lg">M</div>
                        <div className="text-sm">
                            <span className="block font-bold text-secondary">MKP Packers & Movers</span>
                            <span className="text-xs uppercase tracking-tighter text-background-light/40">© {new Date().getFullYear()} All rights reserved.</span>
                        </div>
                    </Link>
                    <div className="flex flex-col items-end gap-6">
                        <div className="flex space-x-8 text-xs uppercase tracking-widest font-medium">
                            <Link href="/privacy-policy" className="hover:text-secondary text-background-light/60 transition-colors py-2">Privacy Policy</Link>
                            <Link href="/terms-of-use" className="hover:text-secondary text-background-light/60 transition-colors py-2">Terms of Use</Link>
                            <Link href="/contact" className="hover:text-secondary text-background-light/60 transition-colors py-2">Contact Support</Link>
                        </div>
                        <div className="flex space-x-6 text-background-light/40">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                                <Youtube size={24} className="-mt-0.5" />
                            </a>
                            <a href="https://maps.app.goo.gl/6861yGhcZgLvpnZJ6" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                                <MapPin size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
