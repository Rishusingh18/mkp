"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { leadService, LeadData, ProfileData } from "@/services/leadService";
import { toast } from "sonner";
import { format } from "date-fns";
import { 
    User, 
    LogOut, 
    Calendar, 
    Package, 
    History,
    Shield,
    ArrowRight,
    AlertCircle,
    Save,
    MapPin,
    Phone,
    Mail
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function UserDashboard() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [leads, setLeads] = useState<LeadData[]>([]);
    
    // Form states
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editName, setEditName] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [savingProfile, setSavingProfile] = useState(false);

    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthAndFetchData = async () => {
            try {
                const { data: { session }, error: authError } = await supabase.auth.getSession();
                
                if (authError || !session?.user) {
                    router.push('/login');
                    return;
                }

                setUser(session.user);
                
                // Fetch Profile first to get potential linked phone number
                const userProfile = await leadService.getProfile(session.user.id);
                
                let phoneToSearch = session.user.phone || "";
                
                if (userProfile) {
                    setProfile(userProfile);
                    setEditName(userProfile.full_name || session.user.user_metadata?.full_name || "");
                    setEditPhone(userProfile.phone || session.user.phone || "");
                    setEditAddress(userProfile.address || "");
                    phoneToSearch = userProfile.phone || phoneToSearch;
                } else {
                    // Fallback to auth metadata if no profile row yet
                    setEditName(session.user.user_metadata?.full_name || "");
                    setEditPhone(session.user.phone || "");
                }

                // Fetch Leads using userId AND Phone to capture previously submitted guest leads
                const userLeads = await leadService.getUserLeads(session.user.id, phoneToSearch);
                setLeads(userLeads || []);

            } catch (error) {
                console.error("Dashboard error:", error);
                toast.error("Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetchData();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        toast.success("Successfully logged out");
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingProfile(true);
        try {
            if (!user) return;
            
            const updates = {
                full_name: editName,
                phone: editPhone,
                address: editAddress,
            };

            const updatedProfile = await leadService.updateProfile(user.id, updates);
            setProfile(updatedProfile);
            
            // Re-fetch Leads to capture any guest leads associated with the new phone number
            const userLeads = await leadService.getUserLeads(user.id, updatedProfile.phone || editPhone);
            setLeads(userLeads || []);
            setIsEditingProfile(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setSavingProfile(false);
        }
    };

    const getStatusStyles = (status?: string) => {
        switch (status) {
            case 'submitted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'confirmed': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'completed': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            default: return 'bg-secondary/10 text-secondary border-secondary/20';
        }
    };

    const getStatusText = (status?: string) => {
        switch (status) {
            case 'submitted': return 'Quote Pending';
            case 'confirmed': return 'Move Confirmed';
            case 'cancelled': return 'Cancelled';
            case 'completed': return 'Completed';
            default: return 'Processing';
        }
    };

    // Calculate Categorized Leads
    const ongoingLeads = leads.filter(l => l.status !== 'completed' && l.status !== 'cancelled');
    const pastLeads = leads.filter(l => l.status === 'completed' || l.status === 'cancelled');

    const displayName = profile?.full_name || user?.user_metadata?.full_name || "Client";
    const displayPhone = profile?.phone || user?.phone || "";

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center pt-24 pb-12">
                <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null; // Prevents flash before redirect

    return (
        <div className="min-h-screen bg-primary pt-32 pb-24 text-secondary relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 space-y-12">
                
                {/* Missing Info Alert */}
                {!displayPhone && (
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-orange-400 font-bold text-lg">Mobile Number Missing</h3>
                                <p className="text-orange-400/80 text-sm">Please update your profile with a valid phone number so our team can contact you regarding your relocation queries.</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsEditingProfile(true)}
                            className="whitespace-nowrap px-6 py-2 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 transition-colors"
                        >
                            Update Now
                        </button>
                    </div>
                )}

                {/* 1. Profile Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-secondary/10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-secondary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-3xl"></div>
                            <User size={40} className="relative z-10" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary tracking-tight mb-2">
                                Welcome, {displayName}
                            </h1>
                            <div className="flex items-center gap-4 text-sm font-medium">
                                {displayPhone && (
                                    <span className="bg-secondary/10 px-3 py-1 rounded-full text-secondary font-mono tracking-widest border border-secondary/10">
                                        +{displayPhone.slice(-10)}
                                    </span>
                                )}
                                <span className="text-secondary/50 flex items-center gap-1">
                                    <Shield size={14} /> Verified Member
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleSignOut}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 font-bold transition-all border border-red-500/10 self-start w-full md:w-auto"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left Column: Requests */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Ongoing Relocations */}
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-secondary flex items-center gap-3">
                                        <History className="text-secondary/60" /> Ongoing Relocations
                                    </h2>
                                    <p className="text-secondary/50 text-sm mt-1">Track the status of your active moving requests.</p>
                                </div>
                                <Link 
                                    href="/" 
                                    className="hidden md:flex items-center gap-2 text-sm font-bold bg-secondary text-primary px-6 py-3 rounded-full hover:bg-white hover:-translate-y-1 transition-all shadow-lg"
                                >
                                    New Quote <ArrowRight size={16} />
                                </Link>
                            </div>

                            {ongoingLeads.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {ongoingLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
                                </div>
                            ) : (
                                <div className="bg-primary-hover border border-secondary/10 border-dashed rounded-3xl p-10 text-center shadow-inner">
                                    <div className="w-16 h-16 bg-secondary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Package size={24} className="text-secondary/30" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-secondary mb-2">No Active Moves</h3>
                                    <p className="text-secondary/50 max-w-sm mx-auto mb-6 text-sm">
                                        You don't have any ongoing relocations at the moment.
                                    </p>
                                    <Link 
                                        href="/" 
                                        className="inline-flex md:hidden items-center gap-2 font-bold bg-secondary text-primary px-6 py-3 rounded-xl hover:bg-white transition-all"
                                    >
                                        Start Relocation
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Past Relocations */}
                        {pastLeads.length > 0 && (
                            <div>
                                <h2 className="text-xl font-serif font-bold text-secondary/60 flex items-center gap-3 mb-6">
                                    Past Relocations
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-70 hover:opacity-100 transition-opacity">
                                    {pastLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Profile Management */}
                    <div className="space-y-6">
                        <div className="bg-primary-hover border border-secondary/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/40 to-secondary/10"></div>
                            
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-display font-bold text-secondary">Account Details</h3>
                                {!isEditingProfile && (
                                    <button 
                                        onClick={() => setIsEditingProfile(true)}
                                        className="text-xs font-bold uppercase tracking-wider text-secondary/60 hover:text-secondary transition-colors"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>

                            {isEditingProfile ? (
                                <form onSubmit={handleSaveProfile} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-secondary/60 uppercase tracking-widest pl-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="w-full bg-primary/50 border border-secondary/20 rounded-xl px-4 py-3 text-secondary text-sm focus:outline-none focus:border-secondary transition-colors"
                                            placeholder="Your Name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-secondary/60 uppercase tracking-widest pl-1">Mobile Number</label>
                                        <input 
                                            type="tel" 
                                            value={editPhone}
                                            onChange={(e) => setEditPhone(e.target.value)}
                                            className="w-full bg-primary/50 border border-secondary/20 rounded-xl px-4 py-3 text-secondary text-sm focus:outline-none focus:border-secondary transition-colors"
                                            placeholder="e.g. 9876543210"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-secondary/60 uppercase tracking-widest pl-1">Default Address</label>
                                        <textarea 
                                            value={editAddress}
                                            onChange={(e) => setEditAddress(e.target.value)}
                                            className="w-full bg-primary/50 border border-secondary/20 rounded-xl px-4 py-3 text-secondary text-sm focus:outline-none focus:border-secondary transition-colors resize-none h-24"
                                            placeholder="Your home address"
                                        />
                                    </div>
                                    
                                    <div className="flex gap-3 pt-2">
                                        <button 
                                            type="button"
                                            onClick={() => setIsEditingProfile(false)}
                                            className="flex-1 py-3 rounded-xl border border-secondary/20 text-secondary hover:bg-secondary/5 font-bold transition-colors text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit"
                                            disabled={savingProfile}
                                            className="flex-1 py-3 rounded-xl bg-secondary text-primary hover:bg-white font-bold transition-all shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                                        >
                                            {savingProfile ? "Saving..." : <><Save size={16} /> Save</>}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-start gap-3">
                                        <Mail size={18} className="text-secondary/40 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Email Address</p>
                                            <p className="font-medium text-secondary truncate">{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone size={18} className="text-secondary/40 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Mobile Number</p>
                                            <p className="font-medium text-secondary">{displayPhone ? `+${displayPhone}` : <span className="text-red-400 italic">Not Provided</span>}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin size={18} className="text-secondary/40 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">Default Address</p>
                                            <p className="font-medium text-secondary text-sm leading-relaxed">{profile?.address || <span className="text-secondary/40 italic">Not Provided</span>}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-component for rendering a Lead explicitly to avoid code duplication
function LeadCard({ lead }: { lead: LeadData }) {
    const getStatusStyles = (status?: string) => {
        switch (status) {
            case 'submitted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'confirmed': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'completed': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            default: return 'bg-secondary/10 text-secondary border-secondary/20';
        }
    };

    const getStatusText = (status?: string) => {
        switch (status) {
            case 'submitted': return 'Quote Pending';
            case 'confirmed': return 'Move Confirmed';
            case 'cancelled': return 'Cancelled';
            case 'completed': return 'Completed';
            default: return 'Processing';
        }
    };

    return (
        <div className="bg-primary-hover border border-secondary/10 rounded-3xl p-6 shadow-xl hover:border-secondary/30 transition-colors group relative overflow-hidden flex flex-col h-full">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="px-3 py-1 bg-primary/50 text-secondary/60 font-mono text-xs font-bold rounded-lg border border-primary">
                    #{lead.id?.slice(0, 6).toUpperCase()}
                </div>
                <div className={cn("px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider", getStatusStyles(lead.status))}>
                    {getStatusText(lead.status)}
                </div>
            </div>

            <div className="relative z-10 flex-grow">
                <div className="flex items-start gap-4 mb-4">
                    <div className="flex flex-col items-center gap-1 mt-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-secondary/40 ring-4 ring-secondary/5"></div>
                        <div className="w-0.5 h-8 bg-gradient-to-b from-secondary/40 to-secondary rounded-full"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-secondary/20"></div>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <div>
                            <p className="text-[10px] text-secondary/40 uppercase tracking-widest font-bold">From</p>
                            <p className="font-bold text-secondary text-lg truncate" title={lead.pickup_city}>{lead.pickup_city}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-secondary/40 uppercase tracking-widest font-bold">To</p>
                            <p className="font-bold text-secondary text-lg truncate" title={lead.destination_city}>{lead.destination_city}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-secondary/10 relative z-10">
                <div className="flex items-center gap-2 text-secondary/70">
                    <Calendar size={16} className="text-secondary/40" />
                    <span className="text-sm font-semibold">{format(new Date(lead.moving_date), "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2 text-secondary/70 justify-end">
                    <Package size={16} className="text-secondary/40" />
                    <span className="text-sm font-semibold">{lead.items?.length || 0} Items</span>
                </div>
            </div>
        </div>
        );
}
