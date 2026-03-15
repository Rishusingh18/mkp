"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Lock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNavToggle,
    MobileNav,
    MobileNavMenu,
    NavbarButton,
} from "./ui/resizable-navbar";

const navItems = [
    { label: 'Relocation', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Summary', href: '/summary' }
];

export default function AppNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState<any>(null);
    const pathname = usePathname();
    const router = useRouter();

    // Auth State Handling
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => authListener.subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <div className="relative w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <div className="flex flex-1 items-center gap-4 lg:gap-8 justify-between lg:justify-start w-full">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group shrink-0 h-full">
                            <div className="relative h-10 w-10 md:h-12 md:w-12 bg-primary rounded-xl overflow-hidden flex items-center justify-center shrink-0 pointer-events-auto border border-secondary/20 group-hover:border-secondary/50 transition-colors shadow-inner">
                                <Image src="/logo.png" alt="MKP Global Mobility Logo" fill className="object-cover" />
                            </div>
                            <div className="flex flex-col justify-center leading-tight">
                                <span className="font-serif text-secondary text-base md:text-xl font-bold tracking-tight md:tracking-wider">MKP</span>
                                <span className="text-[7px] md:text-[9px] text-secondary/50 uppercase tracking-[0.25em] font-sans font-bold">Global Mobility</span>
                            </div>
                        </Link>

                        {/* Desktop Nav Items */}
                        <div className="hidden lg:flex justify-center flex-1">
                            <NavItems items={navItems} />
                        </div>

                        {/* Action Area */}
                        <div className="hidden lg:flex items-center gap-4 shrink-0 h-full pointer-events-auto">
                            <div className="relative flex items-center" onMouseLeave={() => { if (!searchQuery && isSearchOpen) setIsSearchOpen(false); }}>
                                <AnimatePresence mode="wait">
                                    {isSearchOpen ? (
                                        <motion.div
                                            key="search-input"
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 240, opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="relative flex items-center bg-white/10 border border-secondary/20 rounded-xl px-2 overflow-hidden h-12"
                                        >
                                            <Search size={18} className="text-secondary/50 ml-2 shrink-0" />
                                            <input
                                                type="text"
                                                placeholder="Search route..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full bg-transparent border-none focus:ring-0 px-3 py-2 text-sm text-secondary placeholder-secondary/30 focus:outline-none"
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchQuery("");
                                                }}
                                                className="p-1 rounded-lg hover:bg-secondary/10 transition-colors text-secondary/50 hover:text-secondary"
                                            >
                                                <X size={16} />
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            key="search-trigger"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setIsSearchOpen(true)}
                                            className="group flex flex-row items-center justify-center p-2 rounded-xl hover:bg-white/10 transition-all duration-300 text-secondary/60 hover:text-secondary h-12 w-12 hover:w-36 overflow-hidden"
                                        >
                                            <Search size={20} className="shrink-0" />
                                            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-sm font-bold">
                                                Search...
                                            </span>
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            {user ? (
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col items-end mr-2">
                                        <span className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest">Active Member</span>
                                        <span className="text-secondary font-display font-bold text-sm">+{user.phone?.slice(-10)}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-white/10 hover:bg-white/20 text-secondary h-12 w-12 rounded-xl flex items-center justify-center transition-all cursor-pointer group shadow-lg"
                                    >
                                        <X size={18} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            ) : (
                                <NavbarButton onClick={() => router.push('/login')} className="whitespace-nowrap">
                                    <Lock size={16} />
                                    <span>Login</span>
                                </NavbarButton>
                            )}
                        </div>

                        {/* Mobile Actions Container (so toggle and search sit together) */}
                        <div className="flex lg:hidden items-center gap-2 h-full pointer-events-auto">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-secondary/80 hover:text-secondary w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors pointer-events-auto"
                            >
                                <Search size={20} />
                            </button>
                            <MobileNavToggle
                                isOpen={isMobileMenuOpen}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            />
                        </div>
                    </div>
                </NavBody>

                {/* Mobile Navigation Dropdown */}
                <MobileNav>
                    <MobileNavMenu isOpen={isMobileMenuOpen}>
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between py-4 text-xl font-bold border-b border-secondary/5 text-secondary/60 hover:text-secondary hover:pl-2 transition-all"
                                >
                                    {item.label}
                                    <ArrowRight size={20} className={pathname === item.href ? "opacity-100 text-secondary" : "opacity-0"} />
                                </Link>
                            ))}
                        </div>

                        {isSearchOpen && (
                            <div className="relative mt-6">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/50" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search routes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-secondary/20 rounded-2xl pl-12 pr-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all shadow-sm text-secondary"
                                />
                            </div>
                        )}

                        <div className="flex w-full flex-col gap-4 mt-8 pointer-events-auto">
                            {user ? (
                                <>
                                    <div className="bg-white/5 p-6 rounded-2xl border border-secondary/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest mb-1">Authenticated</span>
                                                <span className="text-secondary font-display font-bold text-lg">+{user.phone?.slice(-10)}</span>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="p-3 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-xl transition-all"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        router.push('/login');
                                    }}
                                    className="w-full bg-secondary text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-transform"
                                >
                                    <Lock size={20} />
                                    Login
                                </button>
                            )}
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}
