"use client";

import Link from "next/link";
import { useState } from "react";

export default function Inventory() {
    const [sofaCount, setSofaCount] = useState(1);
    const [bookshelfCount, setBookshelfCount] = useState(2);

    // Calculated values for the quote breakdown
    const basePrice = 8500;
    const inventoryPrice = (sofaCount * 2500) + (bookshelfCount * 725);
    const totalEstimate = basePrice + inventoryPrice;

    return (
        <main className="flex-grow bg-background-light min-h-screen">
            <div className="w-full">
                <div className="px-4 md:px-12 py-12">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4 text-center">Smart Inventory Grid</h1>
                    <p className="text-lg text-primary/70 mb-12 text-center max-w-3xl mx-auto">
                        Select the items you wish to relocate. Our AI-driven estimation engine updates your quote in real-time as you build your inventory.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2 scrollbar-hide">
                            <button className="px-6 py-2.5 rounded-full bg-primary text-secondary text-sm font-medium shadow-lg hover:shadow-xl transition-all whitespace-nowrap cursor-pointer">
                                Living Room
                            </button>
                            <button className="px-6 py-2.5 rounded-full bg-secondary border border-primary/20 text-primary text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                                Bedroom
                            </button>
                            <button className="px-6 py-2.5 rounded-full bg-secondary border border-primary/20 text-primary text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                                Kitchen
                            </button>
                            <button className="px-6 py-2.5 rounded-full bg-secondary border border-primary/20 text-primary text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                                Electronics
                            </button>
                            <button className="px-6 py-2.5 rounded-full bg-secondary border border-primary/20 text-primary text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                                Fragile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            <label className="cursor-pointer relative group md:col-span-2">
                                <input type="checkbox" className="peer sr-only" checked={sofaCount > 0} onChange={() => { }} />
                                <div className="h-full bg-primary rounded-xl border border-secondary/20 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item peer-checked:border-secondary">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                            <span className="material-icons-outlined text-3xl">chair</span>
                                        </div>
                                        <div>
                                            <h3 className="font-display font-bold text-lg text-secondary">Sofa Set (3 Seater)</h3>
                                            <p className="text-xs text-secondary mt-1">Includes cushions and upholstery protection</p>
                                        </div>
                                    </div>
                                    <div className={`mt-6 flex items-center justify-between bg-secondary/5 rounded-xl p-3 border border-secondary/10 transition-all ${sofaCount > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Qty: {sofaCount}</span>
                                        <div className="flex items-center gap-3">
                                            <button onClick={(e) => { e.preventDefault(); setSofaCount(Math.max(0, sofaCount - 1)); }} className="w-6 h-6 flex items-center justify-center text-secondary hover:text-white text-xl font-bold bg-primary rounded shadow-sm">-</button>
                                            <span className="text-sm font-bold text-secondary">{sofaCount}</span>
                                            <button onClick={(e) => { e.preventDefault(); setSofaCount(sofaCount + 1); }} className="w-6 h-6 flex items-center justify-center text-secondary hover:text-white text-xl font-bold bg-primary rounded shadow-sm">+</button>
                                        </div>
                                    </div>
                                </div>
                            </label>

                            <label className="cursor-pointer relative group">
                                <input type="checkbox" className="peer sr-only" />
                                <div className="h-full bg-primary rounded-xl border border-secondary/20 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item min-h-[160px] peer-checked:border-secondary">
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary group-hover:text-white transition-colors">
                                            <span className="material-icons-outlined text-2xl">table_restaurant</span>
                                        </div>
                                        <div className="w-6 h-6 rounded-full border-2 border-secondary/30 flex items-center justify-center check-circle group-hover:border-secondary peer-checked:bg-secondary peer-checked:border-secondary">
                                            <span className="material-icons-outlined text-sm text-primary opacity-0 peer-checked:opacity-100">check</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-end">
                                        <div>
                                            <h3 className="font-display font-semibold text-secondary">Coffee Table</h3>
                                            <p className="text-[10px] text-secondary uppercase tracking-wide mt-1">Glass / Wood</p>
                                        </div>
                                    </div>
                                </div>
                            </label>

                            <label className="cursor-pointer relative group">
                                <input type="checkbox" className="peer sr-only" />
                                <div className="h-full bg-primary rounded-xl border border-secondary/20 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item min-h-[160px] peer-checked:border-secondary">
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary group-hover:text-white transition-colors">
                                            <span className="material-icons-outlined text-2xl">tv</span>
                                        </div>
                                        <div className="w-6 h-6 rounded-full border-2 border-secondary/30 flex items-center justify-center check-circle group-hover:border-secondary peer-checked:bg-secondary peer-checked:border-secondary">
                                            <span className="material-icons-outlined text-sm text-primary opacity-0 peer-checked:opacity-100">check</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="font-display font-semibold text-secondary">TV Unit</h3>
                                        <p className="text-[10px] text-secondary uppercase tracking-wide mt-1">Medium Size</p>
                                    </div>
                                </div>
                            </label>

                            <label className="cursor-pointer relative group md:row-span-2">
                                <input type="checkbox" className="peer sr-only" checked={bookshelfCount > 0} onChange={() => { }} />
                                <div className="h-full bg-primary rounded-xl border border-secondary/20 p-6 flex flex-col shadow-sm hover:shadow-md transition-all bento-item peer-checked:border-secondary">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                            <span className="material-icons-outlined text-3xl">menu_book</span>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${bookshelfCount > 0 ? "bg-secondary border-secondary" : "border-secondary/30 group-hover:border-secondary"}`}>
                                            <span className={`material-icons-outlined text-sm text-primary ${bookshelfCount > 0 ? "opacity-100" : "opacity-0"}`}>check</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-display font-bold text-lg text-secondary">Bookshelf</h3>
                                        <p className="text-sm text-secondary mt-2">Standard wooden bookshelf. Please empty contents before packing.</p>
                                    </div>
                                    <div className={`mt-6 transition-all duration-300 flex items-center justify-between bg-secondary/5 rounded-xl p-3 border border-secondary/10 ${bookshelfCount > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Qty: {bookshelfCount}</span>
                                        <div className="flex items-center gap-3">
                                            <button onClick={(e) => { e.preventDefault(); setBookshelfCount(Math.max(0, bookshelfCount - 1)); }} className="w-6 h-6 flex items-center justify-center text-secondary hover:text-white text-xl font-bold bg-primary rounded shadow-sm">-</button>
                                            <span className="text-sm font-bold text-secondary">{bookshelfCount}</span>
                                            <button onClick={(e) => { e.preventDefault(); setBookshelfCount(bookshelfCount + 1); }} className="w-6 h-6 flex items-center justify-center text-secondary hover:text-white text-xl font-bold bg-primary rounded shadow-sm">+</button>
                                        </div>
                                    </div>
                                </div>
                            </label>

                            <label className="cursor-pointer relative group">
                                <input type="checkbox" className="peer sr-only" />
                                <div className="h-full bg-primary rounded-xl border border-secondary/20 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item min-h-[160px] peer-checked:border-secondary">
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary group-hover:text-white transition-colors">
                                            <span className="material-icons-outlined text-2xl">weekend</span>
                                        </div>
                                        <div className="w-6 h-6 rounded-full border-2 border-secondary/30 flex items-center justify-center check-circle group-hover:border-secondary peer-checked:bg-secondary peer-checked:border-secondary">
                                            <span className="material-icons-outlined text-sm text-primary opacity-0 peer-checked:opacity-100">check</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="font-display font-semibold text-secondary">Recliner</h3>
                                        <p className="text-[10px] text-secondary uppercase tracking-wide mt-1">Single Seater</p>
                                    </div>
                                </div>
                            </label>

                            <label className="cursor-pointer relative group">
                                <input type="checkbox" className="peer sr-only" />
                                <div className="h-full bg-primary rounded-xl border border-secondary/20 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item min-h-[160px] peer-checked:border-secondary">
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary group-hover:text-white transition-colors">
                                            <span className="material-icons-outlined text-2xl">light</span>
                                        </div>
                                        <div className="w-6 h-6 rounded-full border-2 border-secondary/30 flex items-center justify-center check-circle group-hover:border-secondary peer-checked:bg-secondary peer-checked:border-secondary">
                                            <span className="material-icons-outlined text-sm text-primary opacity-0 peer-checked:opacity-100">check</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="font-display font-semibold text-secondary">Floor Lamp</h3>
                                        <p className="text-[10px] text-secondary uppercase tracking-wide mt-1">Fragile</p>
                                    </div>
                                </div>
                            </label>

                            <label className="cursor-pointer relative group md:col-span-2">
                                <input type="checkbox" className="peer sr-only" />
                                <div className="h-full bg-primary rounded-xl border border-secondary/20 p-6 flex flex-row items-center justify-between shadow-sm hover:shadow-md transition-all bento-item peer-checked:border-secondary">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary group-hover:text-white transition-colors">
                                            <span className="material-icons-outlined text-2xl">inventory_2</span>
                                        </div>
                                        <div>
                                            <h3 className="font-display font-bold text-lg text-secondary">Misc. Cartons</h3>
                                            <p className="text-sm text-secondary mt-1">Small items, books, decor</p>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-2 border-secondary/30 flex items-center justify-center check-circle group-hover:border-secondary peer-checked:bg-secondary peer-checked:border-secondary">
                                        <span className="material-icons-outlined text-sm text-primary opacity-0 peer-checked:opacity-100">check</span>
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button className="flex items-center gap-2 text-primary font-medium hover:underline text-sm uppercase tracking-widest cursor-pointer">
                                <span className="material-icons-outlined text-lg">add_circle_outline</span>
                                Can't find an item? Add Custom Item
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-96 relative">
                        <div className="sticky top-24">
                            <div className="bg-primary text-secondary rounded-xl shadow-elegant overflow-hidden border border-primary">
                                <div className="bg-primary p-6 border-b border-secondary/10">
                                    <h2 className="font-display text-xl font-bold text-secondary flex items-center gap-2">
                                        <span className="material-icons-outlined text-secondary">receipt_long</span>
                                        Estimated Quote
                                    </h2>
                                    <p className="text-xs text-secondary/70 mt-2 font-light">Price adjusts automatically based on inventory volume.</p>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-secondary/70">Base Shipping</span>
                                        <span className="font-semibold text-secondary">₹{basePrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-secondary/70">Inventory ({sofaCount + bookshelfCount} items)</span>
                                        <span className="font-semibold text-secondary">₹{inventoryPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="pt-4 border-t border-secondary/10">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="w-5 h-5 rounded border border-secondary/30 flex items-center justify-center group-hover:border-secondary/50 transition-colors peer-checked:bg-secondary">
                                                <span className="material-icons text-xs text-primary opacity-0 peer-checked:opacity-100">check</span>
                                            </div>
                                            <span className="text-xs text-secondary/70">Insurance Coverage (Recommended)</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="bg-primary p-6 border-t border-secondary/10">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-secondary uppercase tracking-widest font-semibold">Total Estimate</span>
                                        <span className="font-display text-2xl font-bold text-secondary">₹{totalEstimate.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[10px] text-secondary/70 text-right mb-6">*Tax excluded</p>
                                    <Link href="/summary" className="w-full py-4 bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-lg transition-all transform active:scale-95 flex items-center justify-center gap-2">
                                        Proceed to Packaging
                                        <span className="material-icons-outlined">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 flex flex-col items-center text-center shadow-sm">
                                    <span className="material-icons-outlined text-primary mb-1">verified_user</span>
                                    <span className="text-[10px] font-bold text-primary uppercase">Insured Move</span>
                                </div>
                                <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 flex flex-col items-center text-center shadow-sm">
                                    <span className="material-icons-outlined text-primary mb-1">support_agent</span>
                                    <span className="text-[10px] font-bold text-primary uppercase">24/7 Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
