"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { label: 'Select Route', href: '/' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Summary', href: '/summary' }
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(-1);
    const [isScrolled, setIsScrolled] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 20);

            // Find active section based on standard navItems 
            const currentIndex = navItems.findIndex(item => pathname === item.href);
            setActiveIdx(currentIndex);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check initial state
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    // Island effect classes
    const navContainerClasses = cn(
        "fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out",
        isScrolled
            ? "top-4 px-4 md:px-6 pointer-events-none"
            : "top-0 px-0 pointer-events-auto"
    );

    const navInnerClasses = cn(
        "w-full transition-all duration-500 ease-in-out flex flex-col pointer-events-auto",
        isScrolled
            ? "max-w-[1400px] bg-white/90 dark:bg-primary/95 border border-black/10 dark:border-secondary/10 rounded-2xl shadow-2xl backdrop-blur-md"
            : "max-w-full bg-white dark:bg-primary border-transparent rounded-none shadow-none"
    );

    return (
        <div className={navContainerClasses}>
            <div className={navInnerClasses}>
                {/* Desktop Navigation Body */}
                <div className="px-4 md:px-8 flex justify-between h-16 md:h-20 items-center gap-4">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0 h-full">
                        <div className="h-10 w-10 md:h-12 md:w-12 bg-primary dark:bg-secondary rounded-xl flex items-center justify-center text-white dark:text-primary font-serif font-bold text-xl md:text-2xl group-hover:opacity-90 transition-all shadow-inner shrink-0">
                            M
                        </div>
                        <div className="flex flex-col justify-center leading-tight">
                            <span className="font-serif text-primary dark:text-secondary text-base md:text-xl font-bold tracking-tight md:tracking-wider">MKP</span>
                            <span className="text-[7px] md:text-[9px] text-primary/50 dark:text-secondary/50 uppercase tracking-[0.25em] font-sans font-bold">Global Mobility</span>
                        </div>
                    </Link>

                    {/* Desktop Nav Items */}
                    <div className="hidden lg:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-2xl border border-black/10 dark:border-secondary/10 h-10 md:h-12">
                        {navItems.map((item, idx) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-xs md:text-sm font-bold px-6 h-full flex items-center rounded-xl transition-all",
                                    activeIdx === idx
                                        ? "bg-white/20 dark:bg-white/10 text-primary dark:text-secondary shadow-sm"
                                        : "text-neutral-600 dark:text-secondary/60 hover:text-primary dark:hover:text-secondary hover:bg-white/10"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3 shrink-0 h-full">
                        <button className="hidden sm:flex bg-primary dark:bg-secondary hover:bg-primary/90 dark:hover:bg-secondary/95 text-white dark:text-primary h-10 md:h-12 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-bold text-xs md:text-sm shadow-lg active:scale-95">
                            <span className="material-icons-outlined text-sm md:text-base">lock_open</span>
                            <span className="hidden md:inline">Client Portal</span>
                            <span className="md:hidden">Portal</span>
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-neutral-800 dark:text-secondary/80 hover:text-primary dark:hover:text-secondary w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-white dark:bg-primary border-t border-black/5 dark:border-white/5 lg:hidden"
                        >
                            <div className="px-6 py-6 flex flex-col">
                                {navItems.map((item, idx) => (
                                    <Link
                                        key={`mobile-link-${idx}`}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="py-4 border-b border-neutral-100 dark:border-white/5 text-lg font-medium text-neutral-900 dark:text-secondary hover:text-primary dark:hover:text-white transition-all"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="mt-8 w-full bg-primary dark:bg-secondary hover:opacity-90 text-white dark:text-primary rounded-xl py-4 text-base font-bold shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span className="material-icons-outlined">lock_open</span>
                                    Client Portal
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
