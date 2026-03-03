"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, Menu, Lock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import AuthModal from "./AuthModal";
import { supabase } from "@/lib/supabase";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const pathname = usePathname();

    const navItems = [
        { label: 'Select Route', href: '/' },
        { label: 'Inventory', href: '/inventory' },
        { label: 'Summary', href: '/summary' }
    ];

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

    // Effect for scroll handling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close search on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsSearchOpen(false);
                setSearchQuery("");
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                    "w-[95%] md:w-full max-w-6xl border transition-all duration-300 overflow-hidden pointer-events-auto backdrop-blur-xl",
                    isScrolled
                        ? "bg-primary/95 border-secondary/20 rounded-[2rem] shadow-[0_20px_50px_rgba(14,28,79,0.3)]"
                        : "bg-primary/90 border-secondary/20 rounded-[2.5rem] md:rounded-full shadow-[0_15px_40px_rgba(14,28,79,0.2)]"
                )}
            >
                <div className="px-6 md:px-10">
                    <div className="flex justify-between h-16 md:h-20 items-center gap-4">
                        {/* Logo Block */}
                        <Link href="/" className="flex items-center gap-3 group shrink-0 h-full">
                            <div className="h-10 w-10 md:h-12 md:w-12 bg-secondary rounded-xl flex items-center justify-center text-primary font-serif font-bold text-xl md:text-2xl group-hover:bg-secondary/95 transition-all shadow-inner shrink-0">
                                M
                            </div>
                            <div className="flex flex-col justify-center leading-tight">
                                <span className="font-serif text-secondary text-base md:text-xl font-bold tracking-tight md:tracking-wider">MKP</span>
                                <span className="text-[7px] md:text-[9px] text-secondary/50 uppercase tracking-[0.25em] font-sans font-bold">Global Mobility</span>
                            </div>
                        </Link>

                        {/* Desktop Nav Items */}
                        <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-secondary/10 h-11 relative">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative text-xs md:text-sm font-bold px-6 h-full flex items-center rounded-xl transition-all z-10",
                                        pathname === item.href ? "text-primary" : "text-secondary/60 hover:text-secondary"
                                    )}
                                >
                                    {pathname === item.href && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-secondary rounded-lg -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Action Area */}
                        <div className="flex items-center gap-2 md:gap-4 shrink-0 h-full">
                            {/* Search Expansion Logic */}
                            <div className="hidden sm:flex items-center">
                                <AnimatePresence mode="wait">
                                    {isSearchOpen ? (
                                        <motion.div
                                            key="search-input"
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 240, opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            className="relative flex items-center bg-white/10 border border-secondary/20 rounded-xl px-2 overflow-hidden h-10 md:h-12"
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
                                            className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-xl hover:bg-white/10 transition-all text-secondary/60 hover:text-secondary group"
                                        >
                                            <Search size={20} className="group-hover:scale-110 transition-transform" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            {user ? (
                                <div className="flex items-center gap-2">
                                    <div className="hidden md:flex flex-col items-end mr-2">
                                        <span className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest">Active Member</span>
                                        <span className="text-secondary font-display font-bold text-sm">+{user.phone?.slice(-10)}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-white/10 hover:bg-white/20 text-secondary h-10 md:h-12 w-10 md:w-12 rounded-xl flex items-center justify-center transition-all cursor-pointer group shadow-lg"
                                        title="Logout"
                                    >
                                        <X size={18} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsAuthModalOpen(true)}
                                    className="hidden md:flex bg-secondary hover:bg-secondary/95 text-primary h-10 md:h-12 px-6 rounded-xl items-center gap-2 transition-all cursor-pointer font-bold text-xs md:text-sm shadow-lg active:scale-95"
                                >
                                    <Lock size={16} />
                                    <span>Client Portal</span>
                                </button>
                            )}

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden text-secondary/80 hover:text-secondary w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Animated Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden bg-primary/95 border-t border-secondary/10 overflow-hidden"
                        >
                            <div className="px-6 py-8 space-y-6">
                                <div className="space-y-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "flex items-center justify-between py-3 text-lg font-bold border-b border-secondary/5 transition-all",
                                                pathname === item.href ? "text-secondary pl-2" : "text-secondary/60"
                                            )}
                                        >
                                            {item.label}
                                            <ArrowRight size={18} className={pathname === item.href ? "opacity-100" : "opacity-0"} />
                                        </Link>
                                    ))}
                                </div>
                                <div className="pt-4">
                                    {user ? (
                                        <div className="bg-white/5 p-6 rounded-2xl border border-secondary/10">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest leading-none mb-1">Authenticated</span>
                                                    <span className="text-secondary font-display font-bold text-lg leading-none">+{user.phone?.slice(-10)}</span>
                                                </div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="p-3 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-xl transition-all"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                            <button className="w-full bg-secondary text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all">
                                                Manage Dashboard
                                                <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setIsAuthModalOpen(true);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full bg-secondary text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-transform"
                                        >
                                            <Lock size={20} />
                                            Client Portal
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </nav>
    );
}
