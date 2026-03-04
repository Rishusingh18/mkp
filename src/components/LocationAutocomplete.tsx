"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Search, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

interface Location {
    display_name: string;
    lat: string;
    lon: string;
    address: {
        name?: string;
        suburb?: string;
        city?: string;
        town?: string;
        road?: string;
        state?: string;
        country?: string;
    };
}

interface LocationAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    id: string;
    icon?: React.ReactNode;
}

export default function LocationAutocomplete({
    value,
    onChange,
    placeholder,
    id,
    icon
}: LocationAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<Location[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchSuggestions = async (query: string) => {
        if (query.length < 3) return;

        setIsLoading(true);
        try {
            // Nominatim API call with India filter
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&addressdetails=1&limit=5&featuretype=settlement,suburb,road`
            );
            const data = await response.json();
            setSuggestions(data);
            setIsOpen(data.length > 0);
        } catch (error) {
            console.error("Error fetching locations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (inputValue: string) => {
        onChange(inputValue);

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        if (inputValue.length > 2) {
            debounceTimerRef.current = setTimeout(() => {
                fetchSuggestions(inputValue);
            }, 400); // 400ms debounce
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            e.preventDefault();
            selectLocation(suggestions[highlightedIndex]);
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const selectLocation = (loc: Location) => {
        const { address, display_name } = loc;
        // Priority: name > suburb > road > city > town > first part of display_name
        const mainText = address.name || address.suburb || address.road || address.city || address.town || display_name.split(',')[0];

        // Collect secondary info (City, State)
        const secondaryParts = [address.city || address.town, address.state]
            .filter(Boolean)
            .filter(part => part !== mainText);

        const subText = Array.from(new Set(secondaryParts)).join(", ");
        const finalAddress = subText ? `${mainText}, ${subText}` : mainText;

        onChange(finalAddress);
        setIsOpen(false);
        setHighlightedIndex(-1);
    };

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <span key={i} className="font-black text-secondary">{part}</span>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </span>
        );
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <div className="relative z-10 group">
                <label htmlFor={id} className="sr-only">{placeholder}</label>
                <div className="absolute left-3 top-3.5 flex items-center justify-center">
                    {icon || <MapPin size={16} className="text-secondary/30 group-focus-within:text-secondary transition-colors" />}
                </div>
                <input
                    type="text"
                    id={id}
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => value.length > 2 && suggestions.length > 0 && setIsOpen(true)}
                    autoComplete="off"
                    className="block w-full pl-10 pr-10 py-3.5 text-sm border-secondary/10 rounded-xl bg-primary/30 text-secondary placeholder-secondary/30 focus:ring-1 focus:ring-secondary/30 focus:border-secondary/30 transition-all outline-none shadow-inner group-hover:bg-primary/40"
                    placeholder={placeholder}
                />
                <div className="absolute right-3 top-3.5 flex items-center gap-2">
                    {isLoading && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Search size={14} className="text-secondary/20" /></motion.div>}
                    {value && !isLoading && (
                        <button
                            onClick={() => { onChange(""); setIsOpen(false); }}
                            className="text-secondary/20 hover:text-secondary/60 transition-colors"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        className="absolute top-full left-0 right-0 mt-2 z-[60] bg-primary/95 border border-secondary/10 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden"
                    >
                        <div className="max-h-[320px] overflow-y-auto scrollbar-hide py-1">
                            {suggestions.map((loc, index) => {
                                const { address, display_name } = loc;
                                const mainName = address.name || address.suburb || address.road || address.city || address.town || display_name.split(',')[0];
                                const secondaryParts = [address.city || address.town, address.state, address.country]
                                    .filter(Boolean)
                                    .filter(part => part !== mainName);
                                const secondaryName = Array.from(new Set(secondaryParts)).join(', ');

                                return (
                                    <div
                                        key={`${loc.lat}-${loc.lon}-${index}`}
                                        onClick={() => selectLocation(loc)}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                        className={cn(
                                            "flex items-start gap-4 px-4 py-3.5 cursor-pointer transition-all duration-200",
                                            highlightedIndex === index ? "bg-secondary/10" : "hover:bg-secondary/5"
                                        )}
                                    >
                                        <div className="mt-0.5 w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary/40 group-hover:text-secondary/60">
                                            <Navigation size={14} className={cn(highlightedIndex === index && "text-secondary/80")} />
                                        </div>
                                        <div className="flex flex-col flex-1 overflow-hidden">
                                            <span className="text-sm font-bold text-secondary tracking-tight truncate">
                                                {mainName}
                                            </span>
                                            <span className="text-[11px] text-secondary/40 font-medium truncate">
                                                {secondaryName}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="px-5 py-3.5 bg-black/30 border-t border-secondary/5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary/20 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/20">{suggestions.length} places found</span>
                            </div>
                            <div className="flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                                <span className="text-[9px] font-bold text-secondary/30 uppercase tracking-tighter">Powered by</span>
                                <svg viewBox="0 0 272 92" className="h-3 w-auto fill-secondary">
                                    <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44zM163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.33 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44zM210.12 26.34V67.6c0 16.89-9.99 23.78-21.85 23.78-11.43 0-18.32-7.65-20.92-13.87l8.49-3.53c1.51 3.61 5.21 7.82 12.44 7.82 8.07 0 13.03-4.96 13.03-14.37v-3.36h-.34c-2.43 3.02-7.14 5.63-13.03 5.63-12.35 0-23.36-10.76-23.36-22.27 0-11.59 11.01-22.18 23.36-22.18 5.88 0 10.6 2.61 13.03 5.54h.34v-4.45h9.2zm-8.83 20.92c0-7.81-5.21-13.53-12.02-13.53-6.89 0-12.61 5.72-12.61 13.53 0 7.73 5.72 13.36 12.61 13.36 6.81 0 12.02-5.63 12.02-13.36zM230.13 6.1V68.6h-9.74V6.1h9.74zM271.69 48.69l8.07 5.37c-2.61 3.86-8.91 10.76-19.92 10.76-13.53 0-23.28-10.5-23.28-22.18 0-12.18 9.83-22.18 22.1-22.18 12.35 0 18.06 10.17 20.08 14.12l1.01 2.52-30.08 12.44c2.35 4.62 5.97 6.89 11.18 6.89 5.21 0 8.74-2.61 10.84-5.74zm-24.29-2.02l20.17-8.32c-1.18-2.94-4.62-5.04-8.83-5.04-5.37 0-12.35 4.79-11.34 13.36zM32.32 23.94v9.24h21.01c-.67 4.96-2.52 8.57-5.37 11.43-3.44 3.44-8.74 7.14-15.64 7.14-10.93 0-19.5-8.91-19.5-19.75s8.57-19.75 19.5-19.75c5.97 0 10.34 2.35 13.7 5.54l6.55-6.55C47.78 6.03 41.15 2 32.32 2 14.77 2 0 16.7 0 34.25s14.77 32.25 32.32 32.25c9.49 0 16.63-3.11 22.44-9.16 5.8-5.8 7.65-13.95 7.65-20.5 0-1.93-.17-3.78-.5-5.37H32.32z" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
