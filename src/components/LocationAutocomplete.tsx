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
    const abortControllerRef = useRef<AbortController | null>(null);

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
        if (query.length < 2) return;

        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsLoading(true);
        try {
            // Nominatim API call with India filter
            // Removed featuretype restriction to be more inclusive of broad searches
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&addressdetails=1&limit=5`,
                { signal: controller.signal }
            );
            const data = await response.json();
            setSuggestions(data);
            setIsOpen(true); // Always show dropdown to show 'No results' if empty
        } catch (error: any) {
            if (error.name === 'AbortError') return;
            console.error("Error fetching locations:", error);
        } finally {
            if (controller === abortControllerRef.current) {
                setIsLoading(false);
            }
        }
    };

    const handleInputChange = (inputValue: string) => {
        onChange(inputValue);

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        if (inputValue.length > 1) {
            debounceTimerRef.current = setTimeout(() => {
                fetchSuggestions(inputValue);
            }, 300); // 300ms debounce
        } else {
            setSuggestions([]);
            setIsOpen(false);
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
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
                {isOpen && value.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        className="absolute top-full left-0 right-0 mt-2 z-[60] bg-primary/95 border border-secondary/10 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden"
                    >
                        <div className="max-h-[320px] overflow-y-auto scrollbar-hide py-1">
                            {isLoading ? (
                                <div className="px-6 py-10 text-center flex flex-col items-center gap-3">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    >
                                        <Search size={20} className="text-secondary/20" />
                                    </motion.div>
                                    <p className="text-xs text-secondary/40 font-medium">Searching custom locations...</p>
                                </div>
                            ) : suggestions.length > 0 ? (
                                <>
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
                                                <div className="mt-0.5 w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary/40 group-hover:text-secondary/60 transition-colors">
                                                    <Navigation size={14} className={cn(highlightedIndex === index && "text-secondary/80")} />
                                                </div>
                                                <div className="flex flex-col flex-1 overflow-hidden">
                                                    <span className="text-sm font-bold text-secondary tracking-tight truncate">
                                                        {highlightMatch(mainName, value)}
                                                    </span>
                                                    <span className="text-[11px] text-secondary/40 font-medium truncate mt-0.5">
                                                        {secondaryName}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div
                                        onClick={() => { onChange(value); setIsOpen(false); }}
                                        className="mt-1 border-t border-secondary/5 flex items-center gap-4 px-4 py-3.5 cursor-pointer hover:bg-secondary/5 transition-all duration-200 group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary/40 group-hover:text-secondary/80 transition-colors">
                                            <MapPin size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-secondary/60">Not seeing your location?</span>
                                            <span className="text-xs text-secondary/90 font-bold">Use "{value}" as custom location</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="px-1 py-1">
                                    <div className="px-6 py-8 text-center flex flex-col items-center gap-2">
                                        <MapPin size={20} className="text-secondary/10" />
                                        <p className="text-xs text-secondary/40 font-medium">No precise results for "{value}"</p>
                                    </div>
                                    <div
                                        onClick={() => { onChange(value); setIsOpen(false); }}
                                        className="flex items-center gap-4 px-4 py-4 cursor-pointer bg-secondary/5 hover:bg-secondary/10 rounded-xl transition-all duration-200 group mx-1 mb-1"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary/60 group-hover:text-secondary rotate-45 transition-all">
                                            <Navigation size={16} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black uppercase tracking-widest text-secondary/30 mb-0.5">Custom Entry</span>
                                            <span className="text-sm font-bold text-secondary">Use "{value}" manually</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Attribution / Footer */}
                        <div className="px-5 py-3.5 bg-black/30 border-t border-secondary/5 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-secondary/30">
                                <Search size={10} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Search Intelligence</span>
                            </div>
                            <div className="flex items-center gap-1.5 opacity-30 hover:opacity-100 transition-opacity">
                                <span className="text-[8px] font-bold text-secondary/60 uppercase">Powered by</span>
                                <div className="px-1.5 py-0.5 bg-secondary/10 rounded-sm">
                                    <span className="text-[8px] font-black text-secondary tracking-tighter">OSM Nominatim</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
