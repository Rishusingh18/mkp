"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

const inventoryData = {
    "Living Room": [
        { id: "sofa", name: "Sofa Set (3 Seater)", desc: "Includes cushions and upholstery protection", icon: "chair", price: 2500, size: "large" },
        { id: "coffee_table", name: "Coffee Table", desc: "Glass / Wood", icon: "table_restaurant", price: 800 },
        { id: "tv_unit", name: "TV Unit", desc: "Medium Size", icon: "tv", price: 1200 },
        { id: "bookshelf", name: "Bookshelf", desc: "Standard wooden bookshelf", icon: "menu_book", price: 725 },
        { id: "recliner", name: "Recliner", desc: "Single Seater", icon: "weekend", price: 1500 },
        { id: "floor_lamp", name: "Floor Lamp", desc: "Fragile", icon: "light", price: 400 },
        { id: "misc_cartons_lr", name: "Misc. Cartons", desc: "Small items, books, decor", icon: "inventory_2", price: 200, size: "wide" }
    ],
    "Bedroom": [
        { id: "double_bed", name: "Double Bed", desc: "King/Queen size with mattress", icon: "bed", price: 3500, size: "large" },
        { id: "wardrobe", name: "Wardrobe", desc: "2-3 Door wooden wardrobe", icon: "door_sliding", price: 2800, size: "tall" },
        { id: "dressing_table", name: "Dressing Table", desc: "With mirror and stool", icon: "grid_view", price: 1200 },
        { id: "bedside_table", name: "Bedside Table", desc: "Small 2-drawer unit", icon: "calendar_view_day", price: 400 },
        { id: "mattress", name: "Extra Mattress", desc: "Single/Double rollable", icon: "layers", price: 600 }
    ],
    "Kitchen": [
        { id: "refrigerator", name: "Refrigerator", desc: "Double door / Single door", icon: "kitchen", price: 2200, size: "tall" },
        { id: "microwave", name: "Microwave", desc: "Convection / Solo", icon: "settings_input_component", price: 600 },
        { id: "dining_table", name: "Dining Table", desc: "4-6 Seater with chairs", icon: "table_bar", price: 2500, size: "large" },
        { id: "gas_stove", name: "Gas Stove/Hob", desc: "2-4 Burner unit", icon: "soup_kitchen", price: 400 },
        { id: "kitchen_rack", name: "Kitchen Rack", desc: "Steel/Wooden modular rack", icon: "shelves", price: 800 }
    ],
    "Electronics": [
        { id: "washing_machine", name: "Washing Machine", desc: "Front/Top load", icon: "local_laundry_service", price: 1800, size: "large" },
        { id: "ac_unit", name: "AC Unit", desc: "Split/Window 1.5-2 Ton", icon: "ac_unit", price: 1500 },
        { id: "desktop_pc", name: "Desktop PC", desc: "Monitor, CPU, UPS, Printer", icon: "desktop_windows", price: 1200 },
        { id: "home_theatre", name: "Home Theatre", desc: "5.1 Speaker system", icon: "speaker", price: 800 },
        { id: "air_cooler", name: "Air Cooler", desc: "Desert/Tower cooler", icon: "mode_fan", price: 600 }
    ],
    "Fragile": [
        { id: "mirror_large", name: "Large Mirror", desc: "Wall mounted / Standing", icon: "square", price: 1200, size: "tall" },
        { id: "glass_cabinet", name: "Glass Cabinet", desc: "Display unit with glass panes", icon: "all_in_box", price: 2200, size: "large" },
        { id: "flower_vases", name: "Flower Vases", desc: "Set of 3 ceramic vases", icon: "potted_plant", price: 500 },
        { id: "paintings", name: "Large Paintings", desc: "Framed canvas artworks", icon: "image", price: 1500, size: "wide" },
        { id: "crockery_set", name: "Crockery Set", desc: "Bone china dinner set 48pcs", icon: "flatware", price: 2000 }
    ],
    "Office": [
        { id: "office_chair", name: "Office Chair", desc: "Ergonomic mesh chair", icon: "event_seat", price: 800 },
        { id: "study_table", name: "Study Table", desc: "L-shaped / Standard wood", icon: "desk", price: 1800, size: "large" },
        { id: "file_cabinet", name: "File Cabinet", desc: "3-Drawer metal unit", icon: "folder_open", price: 1200, size: "tall" },
        { id: "office_printer", name: "Laser Printer", desc: "All-in-one corporate unit", icon: "print", price: 600 },
        { id: "water_dispenser", name: "Water Dispenser", desc: "Hot/Cold floor standing", icon: "water_drop", price: 500 }
    ]
};

type CustomItem = {
    id: string;
    name: string;
    desc: string;
    icon: string;
    price: number;
    size?: string;
    isCustom: boolean;
};

import { useRouter } from "next/navigation";
import { leadService } from "@/services/leadService";

export default function Inventory() {
    const [activeCategory, setActiveCategory] = useState<keyof typeof inventoryData>("Living Room");
    const [selectedItems, setSelectedItems] = useState<Record<string, number>>({
        'sofa': 1,
        'bookshelf': 2,
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // ... (rest of state and functions)

    const handleProceedToSummary = async (e: React.MouseEvent) => {
        e.preventDefault();
        const leadId = localStorage.getItem("current_lead_id");
        if (!leadId) {
            router.push("/");
            return;
        }

        setLoading(true);
        try {
            // Transform selectedItems to a simple array or keep as object
            const itemsArray = Object.entries(selectedItems)
                .filter(([_, qty]) => qty > 0)
                .map(([id, qty]) => ({ id, qty }));

            await leadService.updateLead(leadId, {
                items: itemsArray,
                total_estimate: totalEstimate,
                status: 'inventory_mapped'
            });

            router.push("/summary");
        } catch (err: any) {
            console.error("Error updating lead inventory:", err);
            alert("Failed to save inventory. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Custom Items State
    const [customItems, setCustomItems] = useState<CustomItem[]>([]);
    const [isCustomMenuOpen, setIsCustomMenuOpen] = useState(false);
    const [customItemName, setCustomItemName] = useState("");

    const categories = Object.keys(inventoryData) as Array<keyof typeof inventoryData>;

    const inventoryStats = useMemo(() => {
        let count = 0;
        let price = 0;

        // Count regular items
        Object.entries(selectedItems).forEach(([id, qty]) => {
            if (qty > 0) {
                for (const catItems of Object.values(inventoryData)) {
                    const item = catItems.find(i => i.id === id);
                    if (item) {
                        count += qty;
                        price += item.price * qty;
                        break;
                    }
                }
            }
        });

        // Count custom items
        customItems.forEach(item => {
            const qty = selectedItems[item.id] || 0;
            if (qty > 0) {
                count += qty;
                price += item.price * qty;
            }
        });

        return { count, price };
    }, [selectedItems, customItems]);

    const basePrice = 8500;
    const totalEstimate = basePrice + inventoryStats.price;

    const updateQuantity = (id: string, delta: number) => {
        setSelectedItems(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta)
        }));
    };

    const handleAddCustomItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customItemName.trim()) return;

        const newItemId = `custom_${Date.now()}`;
        const newCustomItem: CustomItem = {
            id: newItemId,
            name: customItemName,
            desc: "Custom Item",
            icon: "category",
            price: 500,
            isCustom: true
        };

        setCustomItems(prev => [...prev, newCustomItem]);
        setSelectedItems(prev => ({ ...prev, [newItemId]: 1 }));

        setCustomItemName("");
        setIsCustomMenuOpen(false);
    };

    return (
        <main className="flex-grow bg-background-light min-h-screen">
            <div className="w-full">
                <div className="px-4 md:px-12 py-12">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4 text-center uppercase tracking-tight">Smart Inventory Grid</h1>
                    <p className="text-lg text-primary/70 mb-12 text-center max-w-3xl mx-auto">
                        Select the items you wish to relocate. Our AI-driven estimation engine updates your quote in real-time as you build your inventory.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-12">
                    <div className="flex-1">
                        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2 scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${activeCategory === cat
                                        ? "bg-primary text-secondary shadow-lg scale-105"
                                        : "bg-secondary border border-primary/20 text-primary hover:border-primary"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                            {customItems.length > 0 && (
                                <button
                                    onClick={() => setActiveCategory("Custom" as any)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${activeCategory === ("Custom" as any)
                                        ? "bg-primary text-secondary shadow-lg scale-105"
                                        : "bg-secondary border border-primary/20 text-primary hover:border-primary"
                                        }`}
                                >
                                    Custom Items
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {activeCategory === ("Custom" as any) ? (
                                customItems.map((item) => {
                                    const qty = selectedItems[item.id] || 0;
                                    return (
                                        <div
                                            key={item.id}
                                            className={`relative group h-full bg-primary rounded-xl border p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item min-h-[160px] ${qty > 0 ? "border-secondary" : "border-secondary/20"}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                                        <span className="material-icons-outlined text-2xl">{item.icon}</span>
                                                    </div>
                                                    <div className="max-w-[180px]">
                                                        <h3 className="font-display font-bold text-secondary leading-tight">{item.name}</h3>
                                                        <p className="text-[10px] text-secondary/70 uppercase tracking-wide mt-1">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => updateQuantity(item.id, qty > 0 ? -qty : 1)}
                                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${qty > 0 ? "bg-secondary border-secondary" : "border-secondary/30 group-hover:border-secondary"
                                                        }`}
                                                >
                                                    <span className={`material-icons-outlined text-sm text-primary transition-opacity ${qty > 0 ? "opacity-100" : "opacity-0"}`}>check</span>
                                                </button>
                                            </div>

                                            <div className={`mt-6 flex items-center justify-between bg-secondary/5 rounded-xl p-3 border border-secondary/10 transition-all ${qty > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
                                                <span className="text-xs font-bold text-secondary uppercase tracking-wider">Qty: {qty}</span>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-8 h-8 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-colors text-xl font-bold bg-primary/20 rounded shadow-sm cursor-pointer"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm font-bold text-secondary min-w-[20px] text-center">{qty}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-colors text-xl font-bold bg-primary/20 rounded shadow-sm cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                inventoryData[activeCategory].map((item) => {
                                    const qty = selectedItems[item.id] || 0;
                                    return (
                                        <div
                                            key={item.id}
                                            className={`relative group h-full bg-primary rounded-xl border p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item min-h-[160px] ${item.size === "large" ? "md:col-span-2" :
                                                item.size === "tall" ? "md:row-span-2" :
                                                    item.size === "wide" ? "md:col-span-2" : ""
                                                } ${qty > 0 ? "border-secondary" : "border-secondary/20"}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                                        <span className="material-icons-outlined text-2xl">{item.icon}</span>
                                                    </div>
                                                    <div className="max-w-[180px]">
                                                        <h3 className="font-display font-bold text-secondary leading-tight">{item.name}</h3>
                                                        <p className="text-[10px] text-secondary/70 uppercase tracking-wide mt-1">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => updateQuantity(item.id, qty > 0 ? -qty : 1)}
                                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${qty > 0 ? "bg-secondary border-secondary" : "border-secondary/30 group-hover:border-secondary"
                                                        }`}
                                                >
                                                    <span className={`material-icons-outlined text-sm text-primary transition-opacity ${qty > 0 ? "opacity-100" : "opacity-0"}`}>check</span>
                                                </button>
                                            </div>

                                            <div className={`mt-6 flex items-center justify-between bg-secondary/5 rounded-xl p-3 border border-secondary/10 transition-all ${qty > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
                                                <span className="text-xs font-bold text-secondary uppercase tracking-wider">Qty: {qty}</span>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-8 h-8 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-colors text-xl font-bold bg-primary/20 rounded shadow-sm cursor-pointer"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm font-bold text-secondary min-w-[20px] text-center">{qty}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-colors text-xl font-bold bg-primary/20 rounded shadow-sm cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={() => setIsCustomMenuOpen(true)}
                                className="flex items-center gap-2 text-primary font-bold hover:underline text-sm uppercase tracking-widest cursor-pointer group"
                            >
                                <span className="material-icons-outlined text-lg group-hover:rotate-90 transition-transform">add_circle_outline</span>
                                Can't find an item? Add Custom Item
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-96 relative pb-12">
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
                                        <span className="text-secondary/70">Inventory ({inventoryStats.count} items)</span>
                                        <span className="font-semibold text-secondary">₹{inventoryStats.price.toLocaleString()}</span>
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
                                    <button
                                        onClick={handleProceedToSummary}
                                        disabled={loading}
                                        className="w-full py-4 bg-secondary hover:bg-secondary/95 text-primary font-bold rounded-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {loading ? "Saving..." : "Proceed to Packaging"}
                                        {!loading && <span className="material-icons-outlined">arrow_forward</span>}
                                    </button>
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
