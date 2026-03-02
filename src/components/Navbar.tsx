import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 md:px-6">
            <div className="w-full max-w-[1400px] bg-primary border border-secondary/10 rounded-2xl shadow-2xl pointer-events-auto backdrop-blur-md transition-all duration-300">
                <div className="px-4 md:px-8">
                    <div className="flex justify-between h-16 md:h-20 items-center gap-4">
                        <Link href="/" className="flex items-center gap-3 group shrink-0 h-full">
                            <div className="h-10 w-10 md:h-12 md:w-12 bg-secondary rounded-xl flex items-center justify-center text-primary font-serif font-bold text-xl md:text-2xl group-hover:bg-secondary/95 transition-all shadow-inner shrink-0">
                                M
                            </div>
                            <div className="flex flex-col justify-center leading-tight">
                                <span className="font-serif text-secondary text-base md:text-xl font-bold tracking-tight md:tracking-wider">MKP</span>
                                <span className="text-[7px] md:text-[9px] text-secondary/50 uppercase tracking-[0.25em] font-sans font-bold">Global Mobility</span>
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-secondary/10 h-12">
                            {[
                                { label: 'Select Route', href: '/' },
                                { label: 'Inventory', href: '/inventory' },
                                { label: 'Summary', href: '/summary' }
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-xs md:text-sm font-bold text-secondary/60 hover:text-secondary hover:bg-white/10 px-6 h-full flex items-center rounded-xl transition-all"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 shrink-0 h-full">
                            <button className="hidden sm:flex bg-secondary hover:bg-secondary/95 text-primary h-10 md:h-12 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-bold text-xs md:text-sm shadow-lg active:scale-95">
                                <span className="material-icons-outlined text-sm md:text-base">lock_open</span>
                                <span className="hidden md:inline">Client Portal</span>
                                <span className="md:hidden">Portal</span>
                            </button>
                            <button className="lg:hidden text-secondary/80 hover:text-secondary w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                                <span className="material-icons-outlined text-2xl">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
