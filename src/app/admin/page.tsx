"use client";

import { useState, useEffect } from "react";
import { leadService, LeadData } from "@/services/leadService";
import { toast } from "sonner";
import { format } from "date-fns";
import { 
    LayoutDashboard, 
    Users, 
    Clock, 
    CheckCircle2, 
    AlertCircle,
    ChevronRight,
    Search,
    Filter,
    MoreVertical,
    MapPin,
    Calendar,
    Package
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
    const [leads, setLeads] = useState<LeadData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            fetchLeads();
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            setIsAuthenticated(true);
            toast.success("Welcome back, Admin");
        } else {
            toast.error("Invalid credentials. Please try again.");
        }
    };

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const data = await leadService.getAllLeads();
            setLeads(data);
        } catch (err) {
            toast.error("Failed to fetch leads");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-primary-hover p-8 rounded-3xl border border-secondary/20 shadow-2xl space-y-8 animate-in fade-in zoom-in duration-500">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-secondary/20 rotate-3">
                            <LayoutDashboard className="text-secondary w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-secondary">Admin Portal</h2>
                        <p className="text-secondary/60 text-sm">Authorized personnel only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-secondary/40 ml-1">Access Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full px-4 py-4 bg-primary border border-secondary/20 rounded-2xl text-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-4 bg-secondary text-primary rounded-2xl font-bold shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] transition-all"
                        >
                            Log into Dashboard
                        </button>
                    </form>

                    <div className="pt-4 text-center border-t border-secondary/10">
                        <p className="text-[10px] text-secondary/30 uppercase tracking-[0.2em]">MKP Elite Corporate Logistics v1.0</p>
                    </div>
                </div>
            </div>
        );
    }

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await leadService.updateLead(id, { status });
            toast.success(`Lead marked as ${status}`);
            fetchLeads();
            if (selectedLead?.id === id) {
                setSelectedLead({ ...selectedLead, status });
            }
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = 
            lead.pickup_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.destination_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.id?.includes(searchTerm);
        const matchesFilter = filterStatus === "all" || lead.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'submitted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'confirmed': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <div className="flex-grow bg-primary min-h-screen text-secondary p-4 md:p-8 relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold flex items-center gap-3">
                            <LayoutDashboard className="text-secondary" /> Admin Console
                        </h1>
                        <p className="text-sm opacity-60 mt-1">Manage corporate relocation leads and requests</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={fetchLeads} className="p-2 hover:bg-secondary/10 rounded-full transition-colors">
                            <Clock size={20} className={loading ? "animate-spin" : ""} />
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Total Requests', value: leads.length, icon: Users, color: 'text-secondary' },
                        { label: 'Pending Action', value: leads.filter(l => l.status === 'submitted').length, icon: AlertCircle, color: 'text-amber-400' },
                        { label: 'Confirmed', value: leads.filter(l => l.status === 'confirmed').length, icon: CheckCircle2, color: 'text-green-400' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-primary-hover p-6 rounded-2xl border border-secondary/10 shadow-lg backdrop-blur-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-secondary/60">{stat.label}</p>
                                    <p className="text-3xl font-serif font-bold mt-2 text-secondary">{stat.value}</p>
                                </div>
                                <stat.icon className={cn("w-8 h-8", stat.color)} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* List */}
                    <div className="lg:col-span-12 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/30" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search by city or ID..."
                                    className="w-full pl-10 pr-4 py-3 bg-primary-hover border border-secondary/20 rounded-xl focus:ring-2 focus:ring-secondary/20 outline-none text-secondary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <select 
                                    className="px-4 py-3 bg-primary-hover border border-secondary/20 rounded-xl outline-none text-secondary"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="submitted">Submitted</option>
                                    <option value="confirmed">Confirmed</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-primary-hover rounded-2xl border border-secondary/10 overflow-hidden shadow-xl backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-secondary/5 border-b border-secondary/10">
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary/70">Lead ID</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary/70">Customer</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary/70">Route</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary/70">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary/70">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary/70">Items</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary/70 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary/5">
                                        {filteredLeads.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-secondary/5 transition-colors cursor-pointer" onClick={() => setSelectedLead(lead)}>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-mono font-bold text-secondary">#{lead.id?.slice(0, 8).toUpperCase()}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm text-secondary">{lead.customer_name || 'Guest User'}</span>
                                                        <span className="text-[10px] text-secondary/60 font-bold">{lead.customer_phone || 'No Phone'}</span>
                                                        {lead.user_id && <span className="text-[9px] text-secondary/40 font-mono mt-0.5">UID: {lead.user_id.slice(0, 13)}...</span>}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm text-secondary">{lead.pickup_city}</span>
                                                        <span className="text-[10px] text-secondary/40 uppercase">to {lead.destination_city}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-medium text-secondary">{format(new Date(lead.moving_date), "MMM dd, yyyy")}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn("px-2 py-1 text-[10px] font-bold rounded-full uppercase border", getStatusColor(lead.status))}>
                                                        {lead.status || 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs text-secondary font-bold">{lead.items?.length || 0} items</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 hover:bg-primary/10 rounded-lg">
                                                        <ChevronRight size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detail Overlay */}
                {selectedLead && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedLead(null)}></div>
                        <div className="relative w-full max-w-4xl bg-primary text-secondary max-h-screen overflow-y-auto rounded-3xl shadow-2xl border border-secondary/20 flex flex-col animate-in fade-in zoom-in duration-300">
                            <div className="p-8 border-b border-secondary/10 flex items-center justify-between bg-secondary/5">
                                <div>
                                    <h2 className="text-2xl font-serif font-bold tracking-tight text-secondary">Lead Detail View</h2>
                                    <p className="text-sm text-secondary/60">Reference #{selectedLead.id?.toUpperCase()}</p>
                                </div>
                                <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-secondary/10 rounded-full text-secondary">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-secondary/40 border-b border-secondary/10 pb-2">Customer Details</h3>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                                <Users size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-secondary/40">Name / Contact</p>
                                                <p className="font-bold text-secondary text-lg">{selectedLead.customer_name || 'Guest User'}</p>
                                                <p className="text-sm text-secondary/80 font-bold">{selectedLead.customer_phone || 'N/A'}</p>
                                                {selectedLead.user_id && (
                                                    <p className="text-[10px] text-secondary/40 font-mono mt-1 pt-1 border-t border-secondary/5">
                                                        USER_ID: {selectedLead.user_id}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-secondary/40 border-b border-secondary/10 pb-2">Route & Date</h3>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-secondary/40">From / To</p>
                                                <p className="font-bold text-secondary">{selectedLead.pickup_city} → {selectedLead.destination_city}</p>
                                                <p className="text-xs uppercase mt-1 text-secondary/60 font-bold tracking-tighter">{selectedLead.shift_type} Relocation</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-secondary/40">Moving Date</p>
                                                <p className="font-bold text-secondary">{format(new Date(selectedLead.moving_date), "EEEE, MMM dd, yyyy")}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-secondary/40 border-b border-secondary/10 pb-2">Actions</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button 
                                                onClick={() => handleUpdateStatus(selectedLead.id!, 'confirmed')}
                                                className="py-3 bg-secondary text-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/90 transition-all shadow-lg active:scale-95"
                                            >
                                                <CheckCircle2 size={18} /> Confirm Move
                                            </button>
                                            <button 
                                                onClick={() => handleUpdateStatus(selectedLead.id!, 'cancelled')}
                                                className="py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all active:scale-95"
                                            >
                                                <AlertCircle size={18} /> Cancel Lead
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-secondary/40 border-b border-secondary/10 pb-2 flex items-center justify-between">
                                        <span>Inventory List</span>
                                        <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px]">{selectedLead.items?.length || 0} ITEMS</span>
                                    </h3>
                                    <div className="bg-secondary/5 rounded-2xl p-4 overflow-y-auto max-h-[400px] space-y-2 border border-secondary/10">
                                        {selectedLead.items?.length ? (
                                            selectedLead.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center bg-primary-hover p-4 rounded-xl border border-secondary/5 shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <Package size={16} className="text-secondary/30" />
                                                        <span className="text-sm font-medium text-secondary">{item.id}</span>
                                                    </div>
                                                    <span className="text-xs font-black bg-secondary text-primary px-3 py-1 rounded-full uppercase tracking-tighter">Qty: {item.qty}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center py-12 text-secondary/30 italic text-sm">No items listed</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
