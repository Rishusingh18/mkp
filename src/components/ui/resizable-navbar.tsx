"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Context to share scroll state
const NavbarContext = createContext<{ isScrolled: boolean }>({ isScrolled: false });

export const Navbar = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check init
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <NavbarContext.Provider value={{ isScrolled }}>
            <header className={cn("fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none transition-all duration-300",
                "p-4",
                className)}>
                {children}
            </header>
        </NavbarContext.Provider>
    );
};

export const NavBody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const { isScrolled } = useContext(NavbarContext);
    const { scrollY } = useScroll();

    // Island transformations
    const width = useTransform(scrollY, [0, 60], ["98%", "90%"]);
    const maxWidth = useTransform(scrollY, [0, 60], ["1400px", "1200px"]);
    const borderRadius = useTransform(scrollY, [0, 60], ["24px", "40px"]);

    // Custom MKP Colors for the floating island
    const backgroundColor = useTransform(scrollY, [0, 60], ["rgba(14,28,79,1)", "rgba(14,28,79,0.95)"]);
    const borderColor = useTransform(scrollY, [0, 60], ["rgba(255,236,209,0)", "rgba(255,236,209,0.1)"]);
    const boxShadow = useTransform(scrollY, [0, 60], ["none", "0 20px 40px -15px rgba(14,28,79,0.5)"]);

    return (
        <motion.div
            style={{
                width,
                maxWidth,
                borderRadius,
                backgroundColor,
                borderColor,
                boxShadow,
            }}
            className={cn("flex items-center justify-between h-16 md:h-18 px-6 md:px-10 border pointer-events-auto backdrop-blur-xl transition-all duration-300", className)}
        >
            {children}
        </motion.div>
    );
};

export const NavItems = ({ items }: { items: { label: string; href: string }[] }) => {
    const pathname = usePathname();

    return (
        <div className="hidden lg:flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-secondary/10 h-11 relative">
            <AnimatePresence>
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative text-sm font-bold px-6 h-full flex items-center rounded-xl transition-colors z-10 whitespace-nowrap",
                                isActive ? "text-primary" : "text-secondary/60 hover:text-secondary"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav-pill"
                                    className="absolute inset-0 bg-secondary rounded-xl -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {item.label}
                        </Link>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export const NavbarLogo = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={cn("flex items-center gap-3 group shrink-0 h-full", className)}>
            {children}
        </div>
    );
};

export const NavbarButton = ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => {
    return (
        <button
            onClick={onClick}
            className={cn("hidden md:flex bg-secondary hover:bg-secondary/95 text-primary h-12 px-6 rounded-xl items-center gap-2 transition-transform cursor-pointer font-bold text-sm shadow-lg active:scale-95", className)}
        >
            {children}
        </button>
    );
};

// Mobile Navigation
export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className="lg:hidden text-secondary w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors pointer-events-auto"
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
    );
};

export const MobileNav = ({ children }: { children: React.ReactNode }) => {
    return <div className="absolute top-full left-0 w-full z-40 pointer-events-auto">{children}</div>;
};

export const MobileNavMenu = ({ isOpen, children, className }: { isOpen: boolean; children: React.ReactNode; className?: string }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    className={cn("bg-primary/95 border-t border-secondary/10 backdrop-blur-xl overflow-hidden shadow-2xl rounded-b-3xl px-6 py-8", className)}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
