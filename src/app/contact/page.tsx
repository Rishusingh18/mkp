"use client";

import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background-light pt-8 md:pt-20 pb-12 lg:pb-20">
            {/* 1. TOP SECTION (Info Grid) */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-4 lg:mb-6 -mt-4 md:-mt-8 relative z-10 w-full flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-2 tracking-tight uppercase text-center w-full">
                    GET IN TOUCH
                </h1>

                {/* Contact Items Grid */}
                <div className="max-w-4xl mx-auto mt-4 lg:mt-6 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16">
                        {/* Address */}
                        <div className="flex flex-col items-center text-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="text-primary font-bold mb-1 whitespace-nowrap">Our Address</h3>
                                <div className="text-primary/70 text-sm leading-relaxed inline-block">
                                    MKP Packers & Movers<br />
                                    Corporate Headquarters
                                </div>
                            </div>
                        </div>

                        {/* Phone / WhatsApp Combined */}
                        <a 
                            href="https://wa.me/918787052894?text=Hello%20MKP%20Packers%20&%20Movers,%20I%20would%20like%20to%20inquire%20about%20your%20services." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex flex-col items-center text-center gap-3 group cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366]/20 transition-colors shrink-0">
                                <MessageCircle size={20} />
                            </div>
                            <div>
                                <h3 className="text-primary font-bold mb-1 whitespace-nowrap">Our Contact Info</h3>
                                <div className="text-primary/70 text-sm leading-relaxed inline-block">
                                    <span className="group-hover:text-primary transition-colors block whitespace-nowrap">
                                        +91 8787052894
                                    </span>
                                </div>
                            </div>
                        </a>

                        {/* Email */}
                        <div className="flex flex-col items-center text-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="text-primary font-bold mb-1 whitespace-nowrap">Email Support</h3>
                                <div className="text-primary/70 text-sm leading-relaxed break-all inline-block">
                                    <a href="mailto:support@mkpglobalmobility.com" className="hover:text-primary transition-colors block">support@mkpglobalmobility.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MIDDLE SECTION (Constrained Map) */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-[500px] lg:h-[600px] relative mb-12">
                <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-xl border border-secondary/10">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3606.3150241088195!2d82.9420152!3d25.2970116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE3JzQ5LjIiTiA4MsKwNTYnNDAuNSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full grayscale-[10%] contrast-[0.95] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    ></iframe>
                </div>
                
                {/* Floating Directions Button within Map Container */}
                <div className="absolute bottom-8 left-6 md:left-12 z-10">
                    <a 
                        href="https://maps.app.goo.gl/6861yGhcZgLvpnZJ6" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-primary-hover text-secondary px-6 py-3 rounded-full flex items-center gap-3 font-bold text-sm shadow-xl transition-transform hover:-translate-y-1 group"
                    >
                        Get Directions
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>

            {/* 3. BOTTOM SECTION (Form) */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-20 lg:mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    <div className="max-w-md">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">Have any query?</h2>
                        <p className="text-primary/70 leading-relaxed text-lg">
                            Whether you need a custom estimate, have questions about our relocation services, or want to learn more about how we can help, our team is ready. Fill out the form below and we'll get back to you shortly.
                        </p>
                    </div>

                    <div className="w-full">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-primary ml-2 uppercase tracking-wide">Your Name <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your name..." 
                                    className="w-full px-4 py-3 bg-primary/5 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary placeholder:text-primary/40 transition-all"
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-primary ml-2 uppercase tracking-wide">Your Phone No. <span className="text-red-500">*</span></label>
                                <input 
                                    type="tel" 
                                    placeholder="Enter your phone number..." 
                                    className="w-full px-4 py-3 bg-primary/5 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary placeholder:text-primary/40 transition-all"
                                />
                            </div>

                            {/* Query Box */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-primary ml-2 uppercase tracking-wide">Your Query <span className="text-red-500">*</span></label>
                                <textarea 
                                    rows={4}
                                    placeholder="Write your query here..." 
                                    className="w-full px-4 py-3 bg-primary/5 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary placeholder:text-primary/40 transition-all resize-y"
                                ></textarea>
                            </div>

                            <div className="md:col-span-2 mt-6 md:mt-10 flex justify-center">
                                <button type="submit" className="bg-primary hover:bg-primary-hover text-secondary px-12 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto hover:-translate-y-1">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
