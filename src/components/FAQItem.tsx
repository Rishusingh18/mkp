"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
    question: string;
    answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-primary/10 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
                suppressHydrationWarning
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
                <span className="font-display font-bold text-primary text-lg pr-8">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 text-primary"
                >
                    <ChevronDown size={20} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 pt-2 text-primary/70 leading-relaxed border-t border-primary/5">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
