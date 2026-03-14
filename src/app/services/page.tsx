import React from 'react';

export default function ServicesPage() {
    return (
        <div className="min-h-screen flex flex-col items-center py-32 px-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary mb-6 text-center">Our Services</h1>
            <p className="text-secondary/80 text-lg md:text-xl max-w-2xl text-center leading-relaxed mb-16">
                Comprehensive relocation solutions tailored to your unique needs, whether moving across town or across the globe.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                <div className="bg-white/5 border border-secondary/20 p-8 rounded-3xl flex flex-col items-start text-left hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                        <span className="text-secondary text-2xl font-serif font-bold">1</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-secondary mb-3">Residential Moving</h3>
                    <p className="text-secondary/70 leading-relaxed">Expert packing, safe transport, and unpacking at your new home with utmost care for your belongings.</p>
                </div>
                
                <div className="bg-white/5 border border-secondary/20 p-8 rounded-3xl flex flex-col items-start text-left hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                        <span className="text-secondary text-2xl font-serif font-bold">2</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-secondary mb-3">Corporate Relocation</h3>
                    <p className="text-secondary/70 leading-relaxed">Minimizing downtime with efficient office moving and comprehensive employee relocation programs.</p>
                </div>
                
                <div className="bg-white/5 border border-secondary/20 p-8 rounded-3xl flex flex-col items-start text-left hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                        <span className="text-secondary text-2xl font-serif font-bold">3</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-secondary mb-3">International Moving</h3>
                    <p className="text-secondary/70 leading-relaxed">Navigating customs, securing temporary housing, and managing global logistics for a smooth move abroad.</p>
                </div>
            </div>
        </div>
    );
}
