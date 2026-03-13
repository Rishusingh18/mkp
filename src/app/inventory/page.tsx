"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { toast } from "sonner";

const inventoryData = {
    "Living Room": [
        { id: "sofa", name: "Sofa Set (3 Seater)", desc: "Includes cushions and upholstery protection", icon: "chair", price: 2500, size: "large" },
        { id: "coffee_table", name: "Coffee Table", desc: "Glass / Wood", icon: "table_restaurant", price: 800 },
        { id: "tv_unit", name: "TV Unit", desc: "Medium Size", icon: "tv", price: 1200 },
        { id: "bookshelf", name: "Bookshelf", desc: "Standard wooden bookshelf", icon: "menu_book", price: 725 },
        { id: "recliner", name: "Recliner", desc: "Single Seater", icon: "weekend", price: 1500 },
        { id: "floor_lamp", name: "Floor Lamp", desc: "Fragile", icon: "light", price: 400 }
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
        { id: "kitchen_rack", name: "Kitchen Rack", desc: "Steel/Wooden modular rack", icon: "dns", price: 800 }
    ],
    "Electronics": [
        { id: "washing_machine", name: "Washing Machine", desc: "Front/Top load", icon: "local_laundry_service", price: 1800, size: "large" },
        { id: "ac_unit", name: "AC Unit", desc: "Split/Window 1.5-2 Ton", icon: "ac_unit", price: 1500 },
        { id: "desktop_pc", name: "Desktop PC", desc: "Monitor, CPU, UPS, Printer", icon: "desktop_windows", price: 1200 },
        { id: "home_theatre", name: "Home Theatre", desc: "5.1 Speaker system", icon: "speaker", price: 800 },
        { id: "air_cooler", name: "Air Cooler", desc: "Desert/Tower cooler", icon: "ac_unit", price: 600 }
    ],
    "Fragile": [
        { id: "mirror_large", name: "Large Mirror", desc: "Wall mounted / Standing", icon: "crop_portrait", price: 1200, size: "tall" },
        { id: "glass_cabinet", name: "Glass Cabinet", desc: "Display unit with glass panes", icon: "kitchen", price: 2200, size: "large" },
        { id: "paintings", name: "Large Paintings", desc: "Framed canvas artworks", icon: "image", price: 1500, size: "wide" },
        { id: "crockery_set", name: "Crockery Set", desc: "Bone china dinner set 48pcs", icon: "flatware", price: 2000 }
    ],
    "Office": [
        { id: "office_chair", name: "Office Chair", desc: "Ergonomic mesh chair", icon: "event_seat", price: 800 },
        { id: "study_table", name: "Study Table", desc: "L-shaped / Standard wood", icon: "desk", price: 1800, size: "large" },
        { id: "file_cabinet", name: "File Cabinet", desc: "3-Drawer metal unit", icon: "folder_open", price: 1200, size: "tall" },
        { id: "office_printer", name: "Laser Printer", desc: "All-in-one corporate unit", icon: "print", price: 600 },
        { id: "water_dispenser", name: "Water Dispenser", desc: "Hot/Cold floor standing", icon: "water_drop", price: 500 }
    ],
    "Others": [
        { id: "misc_cartons_lr", name: "Misc. Cartons", desc: "Small items, books, decor", icon: "inventory_2", price: 200, size: "wide" }
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
    const [activeCategory, setActiveCategory] = useState<keyof typeof inventoryData | "All" | "Custom">("All");
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
                total_estimate: 0,
                status: 'inventory_mapped'
            });

            router.push("/summary");
        } catch (err: any) {
            console.error("Error updating lead inventory:", err);
            toast.error("Failed to save inventory. Please try again.");
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
                        Select the items you wish to relocate. Our team will review your selection and provide a precise quote based on volume and requirements.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col gap-12 px-4 md:px-12 pb-24">
                    <div className="w-full">
                        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2 scrollbar-hide justify-start md:justify-center">
                            <button
                                onClick={() => setActiveCategory("All")}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${activeCategory === "All"
                                    ? "bg-primary text-secondary shadow-lg scale-105"
                                    : "bg-secondary border border-primary/20 text-primary hover:border-primary"
                                    }`}
                            >
                                All Items
                            </button>
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
                                            className={`relative group bg-primary rounded-xl border p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item ${qty > 0 ? "border-secondary" : "border-secondary/20"}`}
                                        >
                                            <div className="flex justify-between items-center gap-4">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                                        <span className="material-icons-outlined text-2xl">{item.icon}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-display font-bold text-secondary leading-tight">{item.name}</h3>
                                                        <p className="text-[10px] text-secondary/70 uppercase tracking-wide mt-1">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => updateQuantity(item.id, qty > 0 ? -qty : 1)}
                                                    className={`w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${qty > 0 ? "bg-secondary border-secondary" : "border-secondary/30 group-hover:border-secondary"
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
                                (() => {
                                    if (activeCategory === "All") {
                                        const allItems = Object.values(inventoryData).flat();
                                        const uniqueItems = Array.from(new Map(allItems.map(item => [item.id, item])).values());
                                        return uniqueItems;
                                    }
                                    return inventoryData[activeCategory as keyof typeof inventoryData];
                                })().map((item) => {
                                    const qty = selectedItems[item.id] || 0;
                                    return (
                                        <div
                                            key={item.id}
                                            className={`relative group bg-primary rounded-xl border p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all bento-item ${qty > 0 ? "border-secondary" : "border-secondary/20"}`}
                                        >
                                            <div className="flex justify-between items-center gap-4">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                                        <span className="material-icons-outlined text-2xl">{item.icon}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-display font-bold text-secondary leading-tight">{item.name}</h3>
                                                        <p className="text-[10px] text-secondary/70 uppercase tracking-wide mt-1">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => updateQuantity(item.id, qty > 0 ? -qty : 1)}
                                                    className={`w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${qty > 0 ? "bg-secondary border-secondary" : "border-secondary/30 group-hover:border-secondary"
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
                                className="flex items-center gap-2 text-primary font-bold hover:underline text-sm uppercase tracking-widest cursor-pointer group px-6 py-3 border-2 border-primary/20 rounded-full hover:border-primary/40 transition-all"
                            >
                                <span className="material-icons-outlined text-lg group-hover:rotate-90 transition-transform">add_circle_outline</span>
                                Can't find an item? Add Custom Item
                            </button>
                        </div>
                    </div>

                    <div className="w-full max-w-3xl mx-auto border-t border-primary/10 pt-12">
                        <div className="bg-primary text-secondary rounded-2xl shadow-elegant overflow-hidden border border-primary p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h2 className="font-display text-2xl font-bold flex items-center gap-3 mb-2">
                                    <span className="material-icons-outlined text-3xl">inventory_2</span>
                                    Inventory Summary
                                </h2>
                                <p className="text-sm text-secondary/70">
                                    {inventoryStats.count > 0
                                        ? `You have carefully selected ${inventoryStats.count} items for your upcoming move.`
                                        : "Please build your inventory list to proceed."}
                                </p>
                            </div>

                            <div className="w-full md:w-auto flex-shrink-0">
                                <button
                                    onClick={handleProceedToSummary}
                                    disabled={loading || inventoryStats.count === 0}
                                    className="w-full md:w-auto px-8 py-4 bg-secondary hover:bg-secondary/95 text-primary font-bold rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg hover:shadow-xl"
                                >
                                    {loading ? "Saving..." : "Review Relocation Plan"}
                                    {!loading && <span className="material-icons-outlined">arrow_forward</span>}
                                </button>
                                <p className="text-[10px] text-secondary/50 text-center mt-3 uppercase tracking-wider">Expert review required</p>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center gap-4">
                            <div className="bg-primary/5 px-6 py-3 rounded-full border border-primary/10 flex items-center gap-3 shadow-sm">
                                <span className="material-icons-outlined text-primary">verified_user</span>
                                <span className="text-xs font-bold text-primary uppercase tracking-wide">Insured Move</span>
                            </div>
                            <div className="bg-primary/5 px-6 py-3 rounded-full border border-primary/10 flex items-center gap-3 shadow-sm">
                                <span className="material-icons-outlined text-primary">support_agent</span>
                                <span className="text-xs font-bold text-primary uppercase tracking-wide">24/7 Support</span>
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
