import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-oxford-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-oxford-navy font-serif font-bold text-xl group-hover:bg-primary-hover transition-colors">
                            M
                        </div>
                        <div>
                            <span className="font-serif text-white text-xl tracking-wide">MKP</span>
                            <span className="block text-xs text-cool-grey uppercase tracking-widest">Global Mobility</span>
                        </div>
                    </Link>
                    <div className="hidden md:flex space-x-8 items-center text-sm font-medium text-cool-grey">
                        <Link href="/" className="hover:text-primary transition-colors">Select Route</Link>
                        <Link href="/inventory" className="hover:text-primary transition-colors">Inventory</Link>
                        <Link href="/summary" className="hover:text-primary transition-colors">Summary</Link>
                        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all">
                            <span className="material-icons-outlined text-sm">person</span>
                            Client Portal
                        </button>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-300 hover:text-white focus:outline-none">
                            <span className="material-icons-outlined text-3xl">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
