"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { leadService, LeadData } from "@/services/leadService";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function Summary() {
    const [leads, setLeads] = useState<LeadData[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [confirmingId, setConfirmingId] = useState<string | null>(null);
    const [submittedIds, setSubmittedIds] = useState<Record<string, boolean>>({});
    const router = useRouter();

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                // Check for user session
                const { data: { session } } = await supabase.auth.getSession();
                const currentUser = session?.user ?? null;
                setUser(currentUser);

                let fetchedLeads: LeadData[] = [];

                if (currentUser) {
                    const userProfile = await leadService.getProfile(currentUser.id);
                    const phone = userProfile?.phone || currentUser.phone || "";
                    const userNameToSearch = userProfile?.full_name || currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || "";
                    await leadService.syncUserLeads(currentUser.id, phone, userNameToSearch);
                    const userLeads = await leadService.getUserLeads(currentUser.id, phone);
                    fetchedLeads = userLeads?.filter(l => l.status !== 'completed' && l.status !== 'cancelled') || [];
                }

                // If no leads found via user, fallback to local storage
                if (fetchedLeads.length === 0) {
                    const leadId = localStorage.getItem("current_lead_id");
                    if (leadId) {
                        const localLead = await leadService.getLeadById(leadId);
                        if (localLead && localLead.status !== 'completed' && localLead.status !== 'cancelled') {
                            fetchedLeads = [localLead];
                        }
                    }
                }

                setLeads(fetchedLeads);
            } catch (err) {
                console.error("Error fetching leads:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, [router]);

    const handleConfirmBooking = async (leadId: string) => {
        if (!leadId) return;
        setConfirmingId(leadId);
        try {
            console.log(`Attempting to submit request for lead ID: ${leadId}`);
            await leadService.updateLead(leadId, { status: 'submitted' });
            console.log("Request successfully submitted.");
            
            setSubmittedIds(prev => ({ ...prev, [leadId]: true }));
            
            // Update the lead status in local state so UI updates immediately
            setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: 'submitted' } : l));
            
            toast.success("Request Submitted! Our representative will contact you shortly with a personalized quote.");
        } catch (err) {
            console.error("Error submitting request:", err);
            toast.error("Failed to submit request. Please try again.");
        } finally {
            setConfirmingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex-grow flex items-center justify-center bg-background-light dark:bg-background-dark min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary dark:border-secondary"></div>
                    <p className="text-primary dark:text-secondary/60 text-sm font-medium animate-pulse">Loading relocation details...</p>
                </div>
            </div>
        );
    }

    if (leads.length === 0) {
        return (
            <div className="flex-grow flex items-center justify-center bg-background-light dark:bg-background-dark py-20 px-4">
                <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-primary/50 p-8 rounded-3xl border border-primary/10 shadow-xl">
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons-outlined text-4xl text-primary/40">search_off</span>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-primary dark:text-secondary">No Active Relocation</h2>
                    <p className="text-primary/60 dark:text-secondary/60">
                        We couldn&apos;t find an active relocation request for your session. Please start a new request from the home page.
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full py-4 bg-primary text-secondary rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-icons-outlined">home</span>
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="flex-grow z-10 py-12 px-4 sm:px-6 lg:px-8 bg-background-light relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%230e1c4f%27%3E%3Cpath%20d%3D%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            
            <div className="max-w-6xl mx-auto space-y-12 relative">
                {leads.map((lead) => (
                    <div key={lead.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-primary rounded-xl shadow-sm border border-secondary/20 p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-2xl font-serif text-secondary font-semibold">Relocation Request</h1>
                            <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">{lead.status === 'submitted' ? 'Submitted' : 'Draft'}</span>
                        </div>
                        <p className="text-secondary/80 text-sm">Reference ID: #MKP-LD-{lead.id?.slice(0, 8).toUpperCase()}</p>
                        <div className="mt-6 flex items-center relative">
                            <div className="absolute w-full h-1 bg-secondary/20 top-1/2 transform -translate-y-1/2 z-0"></div>
                            <div className="relative z-10 w-full flex justify-between">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center text-sm font-bold border-4 border-primary">1</div>
                                    <span className="text-xs mt-2 font-medium text-secondary">Details</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center text-sm font-bold border-4 border-primary">2</div>
                                    <span className="text-xs mt-2 font-medium text-secondary">Inventory</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center text-sm font-bold border-4 border-primary">3</div>
                                    <span className="text-xs mt-2 font-medium text-secondary">Quote</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 ${lead.status === 'submitted' ? 'bg-secondary text-primary' : 'bg-primary text-secondary/30'} rounded-full flex items-center justify-center text-sm font-bold border-4 border-primary`}>4</div>
                                    <span className={`text-xs mt-2 font-bold ${lead.status === 'submitted' ? 'text-secondary' : 'text-secondary/30'}`}>Submit</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary rounded-xl shadow-sm border border-secondary/20 overflow-hidden text-secondary">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-secondary mb-6 flex items-center gap-2">
                                <span className="material-icons-outlined text-secondary">map</span> Route Details
                            </h3>
                            <div className="flex flex-col md:flex-row gap-8 relative">
                                <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-secondary/30">
                                    <span className="material-icons-outlined text-4xl">arrow_forward</span>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <label className="text-xs uppercase tracking-wider text-secondary font-semibold">Origin</label>
                                    <div className="flex items-start gap-3">
                                        <span className="w-3 h-3 rounded-full border-2 border-secondary mt-1.5 flex-shrink-0"></span>
                                        <div>
                                            <p className="text-xl font-serif font-medium text-secondary">{lead.pickup_city}</p>
                                            <p className="text-sm text-secondary/80">Corporate Office Pickup</p>
                                        </div>
                                    </div>
                                    <div className="pl-6 pt-2">
                                        <p className="text-sm font-medium text-secondary">Pickup Date</p>
                                        <p className="text-sm text-secondary/80">{new Date(lead.moving_date).toLocaleDateString()} • 09:00 AM</p>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-3 md:pl-12">
                                    <label className="text-xs uppercase tracking-wider text-secondary font-semibold">Destination</label>
                                    <div className="flex items-start gap-3">
                                        <span className="w-3 h-3 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                                        <div>
                                            <p className="text-xl font-serif font-medium text-secondary">{lead.destination_city}</p>
                                            <p className="text-sm text-secondary/80">Corporate Office Delivery</p>
                                        </div>
                                    </div>
                                    <div className="pl-6 pt-2">
                                        <p className="text-sm font-medium text-secondary">Relocation Type</p>
                                        <p className="text-sm text-secondary/80 uppercase tracking-widest">{lead.shift_type} Relocation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-secondary/10 p-6 border-t border-secondary/10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-secondary">Inventory Items ({lead.items?.length || 0})</span>
                                <span className="text-sm font-medium text-secondary italic">Verified by Expert</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-secondary">Customized Quote</span>
                                <span className="text-sm font-medium text-secondary">Pending Review</span>
                            </div>
                            <div className="border-t border-secondary/20 pt-4 flex justify-between items-center opacity-50">
                                <span className="font-serif font-bold text-secondary text-lg">Estimated Total</span>
                                <span className="font-serif font-bold text-secondary text-xl">Contact for Quote</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-primary rounded-xl shadow-lg border-t-4 border-secondary overflow-hidden relative group text-secondary">
                        <div className="px-6 pt-6 pb-6 relative">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-secondary">Manoj Kumar Pandey</h3>
                                    <p className="text-sm text-secondary/80 font-medium mb-1">Senior Relocation Manager</p>
                                    <p className="text-xs text-secondary/60">MKP Elite Team • 10 Yrs Experience</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-secondary opacity-60 hover:opacity-100 transition-all cursor-pointer">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </div>
                                <div className="mt-4 pt-4 border-t border-secondary/20 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-secondary">
                                        <span className="material-icons-outlined text-secondary">verified</span>
                                        <span>Certified Corporate Specialist</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-secondary">
                                        <span className="material-icons-outlined text-secondary">language</span>
                                        <span>Speaks English, Hindi</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <a 
                                        href="https://wa.me/918787052894?text=Hello%20MKP%20Packers%20&%20Movers,%20I%20would%20like%20to%20inquire%20about%20my%20relocation%20request." 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-secondary text-primary hover:bg-secondary/90 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer text-center flex items-center justify-center"
                                    >
                                        Message
                                    </a>
                                    <a 
                                        href="tel:+918787052894"
                                        className="flex-1 bg-secondary text-primary hover:bg-secondary/90 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer text-center flex items-center justify-center"
                                    >
                                        Call
                                    </a>
                                </div>
                            </div>
                        </div>

                    <div className="bg-primary rounded-xl p-6 border border-secondary/20 shadow-sm">
                        <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Included Protection</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="material-icons-outlined text-secondary text-lg">check_circle</span>
                                <span className="text-sm text-secondary/80">100% Damage Protection</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-icons-outlined text-secondary text-lg">check_circle</span>
                                <span className="text-sm text-secondary/80">On-time Guarantee</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-icons-outlined text-secondary text-lg">check_circle</span>
                                <span className="text-sm text-secondary/80">Dedicated Move Coordinator</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4 mt-4 relative z-10">
                        {!user && (
                            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                                <span className="material-icons-outlined text-blue-500 text-xl mt-0.5">info</span>
                                <div>
                                    <p className="text-sm text-blue-500 font-medium">Want to track your relocation?</p>
                                    <p className="text-xs text-blue-500/80 mt-1">
                                        You are currently proceeding as a guest. Create an account or log in via the menu to securely track this process and access your Client Portal.
                                    </p>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => handleConfirmBooking(lead.id!)}
                            disabled={confirmingId === lead.id || lead.status === 'submitted' || submittedIds[lead.id ?? '']}
                            className="w-full bg-primary hover:bg-primary/90 text-secondary font-bold text-lg py-4 px-6 rounded-xl shadow-elegant transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-secondary/20 disabled:opacity-70"
                        >
                            {submittedIds[lead.id ?? ''] || lead.status === 'submitted' ? "Request Submitted" : confirmingId === lead.id ? "Submitting..." : "Submit Relocation Request"}
                            {confirmingId !== lead.id && !submittedIds[lead.id ?? ''] && lead.status !== 'submitted' && <span className="material-icons-outlined">send</span>}
                        </button>
                        <p className="text-center text-xs text-primary/60 font-semibold">By submitting, our manager will reach out for a final walkthrough.</p>
                    </div>
                </div>
            </div>
            ))}
            </div>

            <div className="mt-16 border-t border-primary/20 pt-8 relative z-10">
                <h5 className="text-center text-primary text-sm font-medium uppercase tracking-widest mb-8">Trusted By Industry Leaders</h5>
                <div className="relative w-full overflow-hidden bg-white/50 dark:bg-white/5 py-8 rounded-xl backdrop-blur-sm">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10"></div>
                    <div className="flex w-max animate-marquee">
                        <div className="flex justify-around items-center min-w-full px-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">

                            <span className="text-xl font-bold font-serif text-primary dark:text-slate-400">Acme Corp</span>
                            <span className="text-xl font-bold font-sans text-primary dark:text-slate-400 flex items-center gap-1"><span className="material-icons-outlined">token</span> Vertex</span>
                            <span className="text-xl font-bold font-serif italic text-primary dark:text-slate-400">Globex</span>
                            <span className="text-xl font-bold font-sans text-primary dark:text-slate-400 uppercase tracking-tighter">Soylent</span>
                            <span className="text-xl font-bold font-serif text-primary dark:text-slate-400">Initech</span>
                            <span className="text-xl font-bold font-sans text-primary dark:text-slate-400">Umbrella</span>
                        </div>
                        <div className="flex justify-around items-center min-w-full px-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <span className="text-xl font-bold font-serif text-primary dark:text-slate-400">Acme Corp</span>
                            <span className="text-xl font-bold font-sans text-primary dark:text-slate-400 flex items-center gap-1"><span className="material-icons-outlined">token</span> Vertex</span>
                            <span className="text-xl font-bold font-serif italic text-primary dark:text-slate-400">Globex</span>
                            <span className="text-xl font-bold font-sans text-primary dark:text-slate-400 uppercase tracking-tighter">Soylent</span>
                            <span className="text-xl font-bold font-serif text-primary dark:text-slate-400">Initech</span>
                            <span className="text-xl font-bold font-sans text-primary dark:text-slate-400">Umbrella</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Truck driving animation */}
            <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none opacity-20 z-0 overflow-hidden">
                <div className="absolute bottom-10 w-full border-b-2 border-dashed border-primary/20"></div>
                <div className="animate-drive absolute bottom-4 text-primary">
                    <span className="material-icons-outlined text-6xl inline-block">local_shipping</span>
                </div>
            </div>
        </main>
    );
}
