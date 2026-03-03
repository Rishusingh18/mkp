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
    categories: string[];
};

type CustomItem = InventoryItem & { isCustom: boolean };

const inventoryItems: InventoryItem[] = [
    { id: "sofa", name: "Sofa Set (3 Seater)", description: "Includes cushions and upholstery protection", icon: "chair", price: 2500, hasQuantityOptions: true, categories: ['Living Room'] },
    { id: "coffeeTable", name: "Coffee Table", description: "Glass / Wood", icon: "table_restaurant", price: 500, hasQuantityOptions: true, categories: ['Living Room'] },
    { id: "studyTable", name: "Study / Office Table", description: "Standard wooden or metal desk", icon: "desk", price: 800, hasQuantityOptions: true, categories: ['Living Room', 'Bedroom'] },
    { id: "tvUnit", name: "TV Unit", description: "Medium Size", icon: "tv", price: 800, hasQuantityOptions: true, categories: ['Living Room', 'Bedroom'] },
    { id: "bookshelf", name: "Bookshelf", description: "Standard wooden bookshelf. Please empty contents before packing.", icon: "menu_book", price: 725, hasQuantityOptions: true, categories: ['Living Room', 'Bedroom'] },
    { id: "recliner", name: "Recliner", description: "Single Seater", icon: "weekend", price: 1200, hasQuantityOptions: true, categories: ['Living Room'] },
    { id: "officeChair", name: "Wooden / Office Chair", description: "Standard non-upholstered or office chair", icon: "chair_alt", price: 400, hasQuantityOptions: true, categories: ['Living Room', 'Bedroom'] },
    { id: "floorLamp", name: "Floor Lamp", description: "Fragile", icon: "light", price: 300, hasQuantityOptions: true, categories: ['Living Room', 'Bedroom'] },
    { id: "storageBed", name: "Storage Bed", description: "King / Queen", icon: "bed", price: 3500, hasQuantityOptions: true, categories: ['Bedroom'] },
    { id: "wardrobe", name: "Wardrobe", description: "Almirah", icon: "checkroom", price: 2000, hasQuantityOptions: true, categories: ['Bedroom'] },
    { id: "diningSet", name: "Dining Set", description: "4/6 Seater", icon: "restaurant", price: 2200, hasQuantityOptions: true, categories: ['Kitchen', 'Living Room'] },
    { id: "refrigerator", name: "Refrigerator", description: "Single / Double Door", icon: "kitchen", price: 1500, hasQuantityOptions: true, categories: ['Kitchen'] },
    { id: "washingMachine", name: "Washing Machine", description: "Top / Front Load", icon: "local_laundry_service", price: 1000, hasQuantityOptions: true, categories: ['Kitchen', 'Utility'] },
    { id: "ac", name: "Air Conditioner", description: "Window / Split", icon: "ac_unit", price: 1100, hasQuantityOptions: true, categories: ['Bedroom', 'Living Room'] },
    { id: "desktop", name: "Desktop Computer", description: "PC Tower, Monitor & Peripherals", icon: "desktop_windows", price: 600, hasQuantityOptions: true, categories: ['Living Room', 'Bedroom'] },
    { id: "cartons", name: "Misc. Cartons", description: "Small items, books, decor", icon: "inventory_2", price: 150, hasQuantityOptions: true, categories: ['Living Room', 'Bedroom', 'Kitchen'] },
];

export default function Inventory() {
    // State maps item ID to its selected quantity
    const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({
        sofa: 1,
        bookshelf: 2,
    });

    // Custom Items State
    const [customItems, setCustomItems] = useState<CustomItem[]>([]);
    const [isCustomMenuOpen, setIsCustomMenuOpen] = useState(false);
    const [customItemName, setCustomItemName] = useState("");

    // Category Filter State
    const [selectedCategory, setSelectedCategory] = useState<string>("All Items");

    const allItems = [...inventoryItems, ...customItems];

    // Filtered items based on selected category
    const filteredItems = allItems.filter(item =>
        selectedCategory === "All Items" ||
        item.categories?.includes(selectedCategory) ||
        (item as CustomItem).isCustom // Custom items always show or can be filtered differently if needed
    );

    const handleAddCustomItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customItemName.trim()) return;

        const newItemId = `custom_${Date.now()}`;
        const newCustomItem: CustomItem = {
            id: newItemId,
            name: customItemName,
            description: "Custom Item",
            icon: "category", // Generic icon
            price: 500, // Default price for custom items, could be made editable
            hasQuantityOptions: true,
            isCustom: true,
            categories: ["Custom"], // Fallback category for custom items
        };

        setCustomItems(prev => [...prev, newCustomItem]);
        // Auto-select the newly added custom item with quantity 1
        setSelectedQuantities(prev => ({ ...prev, [newItemId]: 1 }));

        setCustomItemName("");
        setIsCustomMenuOpen(false);
    };

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
        const item = allItems.find(i => i.id === itemId);
        if (item) {
            inventoryPrice += item.price * qty;
            totalItemsSelected += qty;
        }
    });

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

                <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-12 pb-12">
                    <div className="flex-1">
                        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2 scrollbar-hide">
                            {['All Items', 'Living Room', 'Bedroom', 'Kitchen'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${selectedCategory === cat
                                        ? 'bg-primary text-secondary shadow-lg hover:shadow-xl'
                                        : 'bg-secondary border border-primary/20 text-primary hover:border-primary hover:text-primary'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 grid-flow-row-dense">
                            {filteredItems.map((item) => {
                                const isSelected = (selectedQuantities[item.id] || 0) > 0;
                                const qty = selectedQuantities[item.id] || 0;

                                // Some items span 2 columns based on original design
                                // Some items span 2 columns based on original design
                                const isWide = item.id === 'sofa' || item.id === 'cartons';
                                const isTall = false;

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
                            <button
                                onClick={() => setIsCustomMenuOpen(true)}
                                className="flex items-center gap-2 text-primary font-medium hover:underline text-sm uppercase tracking-widest cursor-pointer"
                            >
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

            {/* Custom Item Modal */}
            {isCustomMenuOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-primary border border-secondary/20 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in">
                        <div className="px-6 py-4 border-b border-secondary/10 flex items-center justify-between">
                            <h3 className="font-display font-bold text-xl text-primary dark:text-secondary">Add Custom Item</h3>
                            <button
                                onClick={() => setIsCustomMenuOpen(false)}
                                className="text-primary/60 dark:text-secondary/60 hover:text-primary dark:hover:text-secondary transition-colors"
                            >
                                <span className="material-icons-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleAddCustomItem}>
                                <div className="mb-4">
                                    <label htmlFor="customItemName" className="block text-sm font-medium text-primary dark:text-secondary/80 mb-2">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        id="customItemName"
                                        value={customItemName}
                                        onChange={(e) => setCustomItemName(e.target.value)}
                                        className="w-full px-4 py-3 bg-primary/5 dark:bg-black/20 border border-primary/20 dark:border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary text-primary dark:text-white"
                                        placeholder="e.g. Grand Piano, Safe, Pool Table..."
                                        autoFocus
                                    />
                                    <p className="text-xs text-primary/60 dark:text-secondary/60 mt-2">
                                        Added items will use an estimated default volume. A surveyor will confirm exact pricing later.
                                    </p>
                                </div>
                                <div className="flex gap-3 justify-end mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setIsCustomMenuOpen(false)}
                                        className="px-5 py-2.5 text-sm font-bold text-primary dark:text-secondary hover:bg-primary/5 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!customItemName.trim()}
                                        className="px-6 py-2.5 text-sm font-bold bg-primary dark:bg-secondary text-white dark:text-primary rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                                    >
                                        Add Item
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
