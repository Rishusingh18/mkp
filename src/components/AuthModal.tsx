"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Loader2, CheckCircle2, User, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (user: any) => void;
    initialData?: { full_name?: string; phone?: string; email?: string } | null;
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialData }: AuthModalProps) {
    const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setFullName("");
                setEmail("");
                setPhone("");
                setError(null);
                setLoading(false);
            }, 300);
        } else {
            if (initialData?.full_name) setFullName(initialData.full_name);
            if (initialData?.email) setEmail(initialData.email);
            if (initialData?.phone) setPhone(initialData.phone.replace('+91', ''));
        }
    }, [isOpen]);

    const handleProceed = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const cleanName = fullName.trim();
        const cleanPhone = phone.replace(/\D/g, '');
        const cleanEmail = email.trim();

        const nameRegex = /^[a-zA-Z\s\.]{2,50}$/;
        if (!nameRegex.test(cleanName)) {
            const msg = "Please enter a valid name (letters only, min 2 characters).";
            setError(msg);
            toast.error(msg);
            setLoading(false);
            return;
        }

        if (cleanEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(cleanEmail)) {
                const msg = "Please enter a valid email address.";
                setError(msg);
                toast.error(msg);
                setLoading(false);
                return;
            }
        }

        // Validation for Indian mobile number (10 digits)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(cleanPhone)) {
            const msg = "Please enter a valid 10-digit Indian mobile number.";
            setError(msg);
            toast.error(msg);
            setLoading(false);
            return;
        }

        try {
            // We simulate a successful "login/register" by just passing data back
            // This bypasses the Supabase Auth "Unsupported phone provider" error
            const userData = {
                id: null, // Lead will be created with null user_id
                full_name: fullName,
                email: email,
                phone: `+91${phone}`,
                honeypot: honeypot
            };

            if (onSuccess) onSuccess(userData);
            
            // Short delay to show loading state for UX
            setTimeout(() => {
                onClose();
                setLoading(false);
            }, 600);
        } catch (err: any) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-secondary rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8 md:p-10">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-primary/5 transition-colors text-primary/40 hover:text-primary"
                    >
                        <X size={20} />
                    </button>

                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/10">
                                <Phone className="text-primary w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-primary">Get Moving Estimate</h3>
                            <p className="text-primary/60 text-sm mt-2">Enter your details to initiate your relocation.</p>
                        </div>

                        <form onSubmit={handleProceed} className="space-y-4">
                            <input 
                                type="text"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                style={{ display: 'none' }}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                            <div className="space-y-4">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">
                                        <User size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-primary/5 border border-primary/10 rounded-2xl text-primary placeholder-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">
                                        <Mail size={18} />
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="Email Address (Optional)"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-primary/5 border border-primary/10 rounded-2xl text-primary placeholder-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                    />
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 font-bold">+91</span>
                                    <input
                                        type="tel"
                                        placeholder="00000 00000"
                                        maxLength={10}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                        className="w-full pl-14 pr-4 py-4 bg-primary/5 border border-primary/10 rounded-2xl text-primary placeholder-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                        required
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading || phone.length < 10 || !fullName.trim()}
                                className="w-full py-4 bg-primary text-secondary rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Get Estimate"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="bg-primary/5 px-8 py-4 text-center border-t border-primary/10">
                    <p className="text-[10px] text-primary/40 uppercase tracking-[0.2em] font-bold">Encrypted & Secure Data Handling</p>
                </div>
            </motion.div>
        </div>
    );
}
