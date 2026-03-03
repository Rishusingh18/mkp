"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
    const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep("phone");
                setPhone("");
                setOtp("");
                setError(null);
                setLoading(false);
            }, 300);
        }
    }, [isOpen]);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Basic phone validation (needs + prefix for Supabase usually)
            const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
            const { error: otpError } = await supabase.auth.signInWithOtp({
                phone: formattedPhone,
            });

            if (otpError) throw otpError;
            setStep("otp");
        } catch (err: any) {
            setError(err.message || "Failed to send OTP. Please check your number.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
            const { data, error: verifyError } = await supabase.auth.verifyOtp({
                phone: formattedPhone,
                token: otp,
                type: "sms",
            });

            if (verifyError) throw verifyError;

            setStep("success");
            if (onSuccess) onSuccess(data.user);

            // Auto close after success
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Invalid OTP. Please try again.");
        } finally {
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

                    <AnimatePresence mode="wait">
                        {step === "phone" && (
                            <motion.div
                                key="phone-step"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/10">
                                        <Phone className="text-primary w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-primary">Phone Verification</h3>
                                    <p className="text-primary/60 text-sm mt-2">Enter your number to receive a secure OTP.</p>
                                </div>

                                <form onSubmit={handleSendOtp} className="space-y-4">
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 font-bold">+</span>
                                        <input
                                            type="tel"
                                            placeholder="91 00000 00000"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full pl-8 pr-4 py-4 bg-primary/5 border border-primary/10 rounded-2xl text-primary placeholder-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                            required
                                        />
                                    </div>

                                    {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={loading || !phone}
                                        className="w-full py-4 bg-primary text-secondary rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Receive OTP"}
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {step === "otp" && (
                            <motion.div
                                key="otp-step"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/10">
                                        <CheckCircle2 className="text-primary w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-primary">Verify OTP</h3>
                                    <p className="text-primary/60 text-sm mt-2">We sent a 6-digit code to +{phone}</p>
                                </div>

                                <form onSubmit={handleVerifyOtp} className="space-y-4">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        placeholder="0 0 0 0 0 0"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-4 py-4 bg-primary/5 border border-primary/10 rounded-2xl text-primary placeholder-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-center text-2xl tracking-[0.5em] font-bold"
                                        required
                                        autoFocus
                                    />

                                    {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={loading || otp.length < 6}
                                        className="w-full py-4 bg-primary text-secondary rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Verify & Continue"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setStep("phone")}
                                        className="w-full text-xs text-primary/40 hover:text-primary font-bold uppercase tracking-wider"
                                    >
                                        Back to phone
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {step === "success" && (
                            <motion.div
                                key="success-step"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center py-10 space-y-4"
                            >
                                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-primary/10">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", bounce: 0.5 }}
                                    >
                                        <CheckCircle2 className="text-primary w-12 h-12" />
                                    </motion.div>
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-primary">Welcome Back</h3>
                                <p className="text-primary/60 font-medium tracking-wide">Authentication Successful</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="bg-primary/5 px-8 py-4 text-center border-t border-primary/10">
                    <p className="text-[10px] text-primary/40 uppercase tracking-[0.2em] font-bold">Secure connection via Supabase Auth</p>
                </div>
            </motion.div>
        </div>
    );
}
