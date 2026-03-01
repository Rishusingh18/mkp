"use client";

import Link from "next/link";
import { useState } from "react";

export default function Inventory() {
    const [sofaCount, setSofaCount] = useState(1);
    const [bookshelfCount, setBookshelfCount] = useState(2);
    const [totalEstimate, setTotalEstimate] = useState(12450);

    return (
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
            <div className="mb-10 text-center">
                <h1 className="font-display text-4xl font-bold text-oxford-navy dark:text-white mb-3">Smart Inventory Grid</h1>
                <p className="text-muted-light dark:text-muted-dark max-w-2xl mx-auto">Select the items you wish to relocate. Our AI-driven estimation engine updates your quote in real-time as you build your inventory.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="flex overflow-x-auto space-x-2 mb-8 pb-2 scrollbar-hide">
                        <button className="px-6 py-2.5 rounded-full bg-oxford-navy text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all whitespace-nowrap cursor-pointer">
                            Living Room
                        </button>
                        <button className="px-6 py-2.5 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                            Bedroom
                        </button>
                        <button className="px-6 py-2.5 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                            Kitchen
                        </button>
                        <button className="px-6 py-2.5 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                            Electronics
                        </button>
                        <button className="px-6 py-2.5 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                            Fragile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        <label className="cursor-pointer relative group md:col-span-2">
                            <input type="checkbox" className="peer sr-only" checked={sofaCount > 0} onChange={() => { }} />
                            <div className="h-full bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-row items-center justify-between shadow-sm hover:shadow-md transition-all bento-item peer-checked:border-primary peer-checked:bg-primary/5">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-lg bg-champagne-light dark:bg-oxford-navy flex items-center justify-center text-primary">
                                        <span className="material-icons-outlined text-3xl">chair</span>
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-lg text-oxford-navy dark:text-white">Sofa Set (3 Seater)</h3>
                                        <p className="text-xs text-muted-light dark:text-muted-dark mt-1">Includes cushions and upholstery protection</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-3">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${sofaCount > 0 ? "bg-primary border-primary" : "border-gray-300 dark:border-gray-600 group-hover:border-primary"}`}>
                                        <span className={`material-icons-outlined text-sm text-white ${sofaCount > 0 ? "opacity-100" : "opacity-0"}`}>check</span>
                                    </div>
                                    <div className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-all ${sofaCount > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                                        <button onClick={(e) => { e.preventDefault(); setSofaCount(Math.max(0, sofaCount - 1)); }} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary text-lg font-bold">-</button>
                                        <span className="w-8 text-center text-sm font-bold text-oxford-navy dark:text-white">{sofaCount}</span>
                                        <button onClick={(e) => { e.preventDefault(); setSofaCount(sofaCount + 1); }} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary text-lg font-bold">+</button>
                                    </div>
                                </div>
                            </div>
                        </label>

                        <label className="cursor-pointer relative group">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="h-full bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item min-h-[160px] peer-checked:border-primary peer-checked:bg-primary/5">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                                        <span className="material-icons-outlined text-2xl">table_restaurant</span>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center check-circle group-hover:border-primary">
                                        <span className="material-icons-outlined text-sm text-white opacity-0">check</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between items-end">
                                    <div>
                                        <h3 className="font-display font-semibold text-oxford-navy dark:text-white">Coffee Table</h3>
                                        <p className="text-[10px] text-muted-light dark:text-muted-dark uppercase tracking-wide mt-1">Glass / Wood</p>
                                    </div>
                                </div>
                            </div>
                        </label>

                        <label className="cursor-pointer relative group">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="h-full bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item min-h-[160px] peer-checked:border-primary peer-checked:bg-primary/5">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                                        <span className="material-icons-outlined text-2xl">tv</span>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center check-circle group-hover:border-primary">
                                        <span className="material-icons-outlined text-sm text-white opacity-0">check</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-display font-semibold text-oxford-navy dark:text-white">TV Unit</h3>
                                    <p className="text-[10px] text-muted-light dark:text-muted-dark uppercase tracking-wide mt-1">Medium Size</p>
                                </div>
                            </div>
                        </label>

                        <label className="cursor-pointer relative group md:row-span-2">
                            <input type="checkbox" className="peer sr-only" checked={bookshelfCount > 0} onChange={() => { }} />
                            <div className="h-full bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col shadow-sm hover:shadow-md transition-all bento-item peer-checked:border-primary peer-checked:bg-primary/5">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 rounded-lg bg-champagne-light dark:bg-oxford-navy flex items-center justify-center text-primary">
                                        <span className="material-icons-outlined text-3xl">menu_book</span>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${bookshelfCount > 0 ? "bg-primary border-primary" : "border-gray-300 dark:border-gray-600 group-hover:border-primary"}`}>
                                        <span className={`material-icons-outlined text-sm text-white ${bookshelfCount > 0 ? "opacity-100" : "opacity-0"}`}>check</span>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-display font-bold text-lg text-oxford-navy dark:text-white">Bookshelf</h3>
                                    <p className="text-sm text-muted-light dark:text-muted-dark mt-2">Standard wooden bookshelf. Please empty contents before packing.</p>
                                </div>
                                <div className={`mt-6 transition-all duration-300 flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-2 border border-gray-100 dark:border-gray-700 ${bookshelfCount > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                                    <span className="text-xs font-medium text-muted-light dark:text-muted-dark">Quantity</span>
                                    <div className="flex items-center gap-3">
                                        <button onClick={(e) => { e.preventDefault(); setBookshelfCount(Math.max(0, bookshelfCount - 1)); }} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary text-xl font-bold bg-white dark:bg-card-dark rounded shadow-sm">-</button>
                                        <span className="text-sm font-bold text-oxford-navy dark:text-white">{bookshelfCount}</span>
                                        <button onClick={(e) => { e.preventDefault(); setBookshelfCount(bookshelfCount + 1); }} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary text-xl font-bold bg-white dark:bg-card-dark rounded shadow-sm">+</button>
                                    </div>
                                </div>
                            </div>
                        </label>

                        <label className="cursor-pointer relative group">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="h-full bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item min-h-[160px] peer-checked:border-primary peer-checked:bg-primary/5">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                                        <span className="material-icons-outlined text-2xl">weekend</span>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center check-circle group-hover:border-primary">
                                        <span className="material-icons-outlined text-sm text-white opacity-0">check</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-display font-semibold text-oxford-navy dark:text-white">Recliner</h3>
                                    <p className="text-[10px] text-muted-light dark:text-muted-dark uppercase tracking-wide mt-1">Single Seater</p>
                                </div>
                            </div>
                        </label>

                        <label className="cursor-pointer relative group">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="h-full bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item min-h-[160px] peer-checked:border-primary peer-checked:bg-primary/5">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                                        <span className="material-icons-outlined text-2xl">light</span>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center check-circle group-hover:border-primary">
                                        <span className="material-icons-outlined text-sm text-white opacity-0">check</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-display font-semibold text-oxford-navy dark:text-white">Floor Lamp</h3>
                                    <p className="text-[10px] text-muted-light dark:text-muted-dark uppercase tracking-wide mt-1">Fragile</p>
                                </div>
                            </div>
                        </label>

                        <label className="cursor-pointer relative group md:col-span-2">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="h-full bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-row items-center justify-between shadow-sm hover:shadow-md transition-all bento-item peer-checked:border-primary peer-checked:bg-primary/5">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                                        <span className="material-icons-outlined text-2xl">inventory_2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-lg text-oxford-navy dark:text-white">Misc. Cartons</h3>
                                        <p className="text-sm text-muted-light dark:text-muted-dark mt-1">Small items, books, decor</p>
                                    </div>
                                </div>
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center check-circle group-hover:border-primary">
                                    <span className="material-icons-outlined text-sm text-white opacity-0">check</span>
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
                        <div className="bg-oxford-navy text-white rounded-xl shadow-[0_4px_20px_-2px_rgba(11,29,63,0.08)] overflow-hidden">
                            <div className="bg-gradient-to-r from-oxford-navy to-[#1a3666] p-6 border-b border-white/10">
                                <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                                    <span className="material-icons-outlined text-primary">receipt_long</span>
                                    Estimated Quote
                                </h2>
                                <p className="text-xs text-gray-300 mt-2 font-light">Price adjusts automatically based on inventory volume.</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                                    <span className="text-gray-300">Total Items Selected</span>
                                    <span className="font-bold text-white">{sofaCount + bookshelfCount + 1}</span>
                                </div>
                                <div className="space-y-3">
                                    {sofaCount > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400">Sofa Set (3 Seater)</span>
                                            <span className="text-gray-300">{sofaCount}x</span>
                                        </div>
                                    )}
                                    {bookshelfCount > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400">Bookshelf</span>
                                            <span className="text-gray-300">{bookshelfCount}x</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-xs text-primary pt-1 cursor-pointer hover:underline">
                                        <span>View full breakdown</span>
                                        <span className="material-icons-outlined text-xs">arrow_forward</span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-white/10">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer sr-only" />
                                            <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Include Insurance</span>
                                        <span className="material-icons-outlined text-xs text-gray-500 ml-auto" title="Damage Protection">info</span>
                                    </label>
                                </div>
                            </div>
                            <div className="bg-[#050F22] p-6 border-t border-white/10">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-sm text-gray-400 uppercase tracking-widest font-semibold">Total Estimate</span>
                                    <span className="font-display text-2xl font-bold text-primary">₹{totalEstimate.toLocaleString()}</span>
                                </div>
                                <p className="text-[10px] text-gray-500 text-right mb-6">*Tax excluded</p>
                                <Link href="/summary" className="w-full py-4 bg-primary hover:bg-[#c29d2b] text-oxford-navy font-bold rounded-lg shadow-[0_4px_20px_-2px_rgba(212,175,55,0.25)] transition-all transform active:scale-95 flex items-center justify-center gap-2">
                                    Proceed to Packaging
                                    <span className="material-icons-outlined">arrow_forward</span>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-card-dark p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center shadow-sm">
                                <span className="material-icons-outlined text-primary mb-1">verified_user</span>
                                <span className="text-[10px] font-bold text-oxford-navy dark:text-white uppercase">Insured Move</span>
                            </div>
                            <div className="bg-white dark:bg-card-dark p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center shadow-sm">
                                <span className="material-icons-outlined text-primary mb-1">support_agent</span>
                                <span className="text-[10px] font-bold text-oxford-navy dark:text-white uppercase">24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
