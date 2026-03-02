"use client";

import Link from "next/link";
import { useState } from "react";

type InventoryItem = {
    id: string;
    name: string;
    description: string;
    icon: string;
    price: number;
    hasQuantityOptions: boolean;
};

const inventoryItems: InventoryItem[] = [
    { id: "sofa", name: "Sofa Set (3 Seater)", description: "Includes cushions and upholstery protection", icon: "chair", price: 2500, hasQuantityOptions: true },
    { id: "coffeeTable", name: "Coffee Table", description: "Glass / Wood", icon: "table_restaurant", price: 500, hasQuantityOptions: false },
    { id: "tvUnit", name: "TV Unit", description: "Medium Size", icon: "tv", price: 800, hasQuantityOptions: false },
    { id: "bookshelf", name: "Bookshelf", description: "Standard wooden bookshelf. Please empty contents before packing.", icon: "menu_book", price: 725, hasQuantityOptions: true },
    { id: "recliner", name: "Recliner", description: "Single Seater", icon: "weekend", price: 1200, hasQuantityOptions: false },
    { id: "floorLamp", name: "Floor Lamp", description: "Fragile", icon: "light", price: 300, hasQuantityOptions: false },
    { id: "storageBed", name: "Storage Bed", description: "King / Queen", icon: "bed", price: 3500, hasQuantityOptions: false },
    { id: "wardrobe", name: "Wardrobe", description: "Almirah", icon: "checkroom", price: 2000, hasQuantityOptions: false },
    { id: "diningSet", name: "Dining Set", description: "4/6 Seater", icon: "restaurant", price: 2200, hasQuantityOptions: false },
    { id: "refrigerator", name: "Refrigerator", description: "Single / Double Door", icon: "kitchen", price: 1500, hasQuantityOptions: false },
    { id: "washingMachine", name: "Washing Machine", description: "Top / Front Load", icon: "local_laundry_service", price: 1000, hasQuantityOptions: false },
    { id: "ac", name: "Air Conditioner", description: "Window / Split", icon: "ac_unit", price: 1100, hasQuantityOptions: false },
    { id: "cartons", name: "Misc. Cartons", description: "Small items, books, decor", icon: "inventory_2", price: 150, hasQuantityOptions: true },
];

export default function Inventory() {
    // State maps item ID to its selected quantity
    const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({
        sofa: 1,
        bookshelf: 2,
    });

    const toggleItem = (itemId: string, hasQuantityOptions: boolean) => {
        setSelectedQuantities(prev => {
            const currentQty = prev[itemId] || 0;
            if (currentQty > 0) {
                // If already selected, deselect it
                const newState = { ...prev };
                delete newState[itemId];
                return newState;
            } else {
                // If not selected, select it with quantity 1
                return { ...prev, [itemId]: 1 };
            }
        });
    };

    const updateQuantity = (itemId: string, change: number) => {
        setSelectedQuantities(prev => {
            const currentQty = prev[itemId] || 0;
            const newQty = Math.max(0, currentQty + change);

            if (newQty === 0) {
                const newState = { ...prev };
                delete newState[itemId];
                return newState;
            }
            return { ...prev, [itemId]: newQty };
        });
    };

    // Calculated values for the quote breakdown
    const basePrice = 8500;

    // Calculate total inventory price dynamically
    let inventoryPrice = 0;
    let totalItemsSelected = 0;

    Object.entries(selectedQuantities).forEach(([itemId, qty]) => {
        const item = inventoryItems.find(i => i.id === itemId);
        if (item) {
            inventoryPrice += item.price * qty;
            totalItemsSelected += qty;
        }
    });

    const totalEstimate = basePrice + inventoryPrice;

    return (
        <main className="flex-grow bg-[#faecc3] min-h-screen">
            <div className="w-full">
                <div className="px-4 md:px-12 py-12">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4 text-center">Smart Inventory Grid</h1>
                    <p className="text-lg text-primary/70 mb-12 text-center max-w-3xl mx-auto">
                        Select the items you wish to relocate. Our AI-driven estimation engine updates your quote in real-time as you build your inventory.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-12 pb-12">
                    <div className="flex-1">
                        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2 scrollbar-hide">
                            <button className="px-6 py-2.5 rounded-full bg-primary text-secondary text-sm font-medium shadow-lg hover:shadow-xl transition-all whitespace-nowrap cursor-pointer">
                                All Items
                            </button>
                            <button className="px-6 py-2.5 rounded-full bg-secondary border border-primary/20 text-primary text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                                Living Room
                            </button>
                            <button className="px-6 py-2.5 rounded-full bg-secondary border border-primary/20 text-primary text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                                Bedroom
                            </button>
                            <button className="px-6 py-2.5 rounded-full bg-secondary border border-primary/20 text-primary text-sm font-medium hover:border-primary hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                                Kitchen
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 grid-flow-row-dense">
                            {inventoryItems.map((item) => {
                                const isSelected = (selectedQuantities[item.id] || 0) > 0;
                                const qty = selectedQuantities[item.id] || 0;

                                // Some items span 2 columns based on original design
                                const isWide = item.id === 'sofa' || item.id === 'cartons';
                                const isTall = item.id === 'bookshelf';

                                return (
                                    <label key={item.id} className={`cursor-pointer relative group ${isWide ? 'md:col-span-2' : ''} ${isTall ? 'md:row-span-2' : ''}`}>
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={isSelected}
                                            onChange={() => toggleItem(item.id, item.hasQuantityOptions)}
                                        />
                                        <div className={`h-full bg-primary rounded-xl border p-5 md:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item min-h-[160px] ${isSelected ? 'border-secondary' : 'border-secondary/20'}`}>

                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`flex items-start gap-4 ${isWide && !isTall ? 'flex-row items-center' : 'flex-col'}`}>
                                                    <div className={`rounded-lg bg-secondary/5 group-hover:bg-secondary/10 flex items-center justify-center text-secondary group-hover:text-white transition-colors flex-shrink-0 ${item.hasQuantityOptions ? 'w-12 h-12 md:w-14 md:h-14 bg-secondary/10' : 'w-12 h-12'}`}>
                                                        <span className={`material-icons-outlined ${item.hasQuantityOptions ? 'text-3xl' : 'text-2xl'}`}>{item.icon}</span>
                                                    </div>

                                                    {/* Text Next to icon for Wide Elements */}
                                                    {isWide && !isTall && (
                                                        <div>
                                                            <h3 className={`font-display font-semibold text-secondary text-lg font-bold`}>{item.name}</h3>
                                                            <p className={`text-xs md:text-sm mt-1 text-secondary`}>{item.description}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ml-4 ${isSelected ? 'bg-secondary border-secondary' : 'border-secondary/30 group-hover:border-secondary'}`}>
                                                    <span className={`material-icons-outlined text-sm text-primary ${isSelected ? 'opacity-100' : 'opacity-0'}`}>check</span>
                                                </div>
                                            </div>

                                            <div className="flex-grow flex flex-col justify-end">
                                                {/* Text Below icon for Normal Elements */}
                                                {!(isWide && !isTall) && (
                                                    <div className="mb-4">
                                                        <h3 className={`font-display font-semibold text-secondary ${item.hasQuantityOptions ? 'text-lg font-bold' : ''}`}>{item.name}</h3>
                                                        <p className={`${item.hasQuantityOptions ? 'text-xs md:text-sm mt-1' : 'text-[10px] uppercase tracking-wide mt-1'} text-secondary`}>{item.description}</p>
                                                    </div>
                                                )}

                                                {/* Quantity selector for advanced items */}
                                                {item.hasQuantityOptions && (
                                                    <div className={`mt-auto transition-all duration-300 flex items-center justify-between bg-secondary/5 rounded-xl p-3 border border-secondary/10 ${isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 delay-100"}`}>
                                                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Qty: {qty}</span>
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={(e) => { e.preventDefault(); updateQuantity(item.id, -1); }}
                                                                className="w-6 h-6 flex items-center justify-center text-secondary hover:text-white text-xl font-bold bg-primary rounded shadow-sm z-10 relative cursor-pointer"
                                                            >-</button>
                                                            <span className="text-sm font-bold text-secondary">{qty}</span>
                                                            <button
                                                                onClick={(e) => { e.preventDefault(); updateQuantity(item.id, 1); }}
                                                                className="w-6 h-6 flex items-center justify-center text-secondary hover:text-white text-xl font-bold bg-primary rounded shadow-sm z-10 relative cursor-pointer"
                                                            >+</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </label>
                                );
                            })}
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
                                        <span className="text-secondary/70">Inventory ({totalItemsSelected} items)</span>
                                        <span className="font-semibold text-secondary">₹{inventoryPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="pt-4 border-t border-secondary/10">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="peer sr-only" defaultChecked />
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
