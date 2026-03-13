"use client";

import React, { useState, useRef, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isBefore, startOfToday } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Note: I'll use standard JS Date objects to avoid adding date-fns dependency if possible, 
// but since the user might want it simple, I'll stick to a robust native implementation.

interface CustomDatePickerProps {
    selectedDate: Date;
    onSelect: (date: Date) => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function CustomDatePicker({ selectedDate, onSelect, isOpen, onClose }: CustomDatePickerProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
    const [position, setPosition] = useState<'bottom' | 'top'>('bottom');
    const containerRef = useRef<HTMLDivElement>(null);
    const today = startOfToday();

    useEffect(() => {
        if (isOpen && containerRef.current) {
            const rect = containerRef.current.parentElement?.getBoundingClientRect();
            if (rect) {
                const spaceBelow = window.innerHeight - rect.bottom;
                const pickerHeight = 450; // Estimated max height of the picker
                if (spaceBelow < pickerHeight && rect.top > pickerHeight) {
                    setPosition('top');
                } else {
                    setPosition('bottom');
                }
            }
        }
    }, [isOpen]);

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between px-4 py-4 border-b border-secondary/10">
                <button
                    onClick={(e) => { e.stopPropagation(); setCurrentMonth(subMonths(currentMonth, 1)); }}
                    className="p-2 hover:bg-secondary/10 rounded-xl transition-colors text-secondary/60 hover:text-secondary"
                >
                    <ChevronLeft size={20} />
                </button>
                <h2 className="font-serif font-bold text-secondary tracking-wide text-lg">
                    {format(currentMonth, "MMMM yyyy")}
                </h2>
                <button
                    onClick={(e) => { e.stopPropagation(); setCurrentMonth(addMonths(currentMonth, 1)); }}
                    className="p-2 hover:bg-secondary/10 rounded-xl transition-colors text-secondary/60 hover:text-secondary"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return (
            <div className="grid grid-cols-7 mb-2 border-b border-secondary/5">
                {days.map((day) => (
                    <div key={day} className="py-3 text-[10px] font-bold text-secondary/30 uppercase tracking-[0.2em] text-center">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, "d");
                const cloneDay = day;
                const isDisabled = isBefore(day, today);
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);

                days.push(
                    <div
                        key={day.toString()}
                        className={cn(
                            "relative h-12 flex items-center justify-center cursor-pointer transition-all duration-300 rounded-xl group",
                            !isCurrentMonth && "opacity-0 pointer-events-none",
                            isDisabled && "opacity-20 cursor-not-allowed grayscale pointer-events-none",
                            isSelected && "bg-secondary text-primary shadow-lg scale-105 z-10",
                            !isSelected && !isDisabled && "hover:bg-secondary/10 text-secondary/80 hover:text-secondary"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isDisabled) {
                                onSelect(cloneDay);
                                onClose();
                            }
                        }}
                    >
                        <span className={cn("text-sm font-bold", isSelected ? "font-black" : "font-medium")}>
                            {formattedDate}
                        </span>
                        {isSameDay(day, today) && !isSelected && (
                            <div className="absolute bottom-2 w-1 h-1 bg-secondary rounded-full" />
                        )}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="p-2">{rows}</div>;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px]"
                    />

                    {/* Calendar Card */}
                    <motion.div
                        ref={containerRef}
                        initial={{ opacity: 0, y: position === 'bottom' ? 10 : -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: position === 'bottom' ? 10 : -10, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={cn(
                            "absolute left-0 z-[70] w-[320px] bg-primary/95 border border-secondary/20 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden",
                            position === 'bottom' ? "top-full mt-4" : "bottom-full mb-4"
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {renderHeader()}
                        {renderDays()}
                        {renderCells()}

                        <div className="px-4 py-4 bg-black/20 flex justify-between items-center">
                            <button
                                onClick={(e) => { e.stopPropagation(); onSelect(today); onClose(); }}
                                className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 hover:text-secondary transition-colors"
                            >
                                Go to Today
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
