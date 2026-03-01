import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-oxford-navy text-cool-grey py-8 border-t border-white/10 mt-auto z-10 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm">
                    © {new Date().getFullYear()} MKP Global Mobility. All rights reserved.
                </div>
                <div className="flex space-x-6 text-sm">
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                </div>
            </div>
        </footer>
    );
}
