"use client";

import Link from "next/link";
import Image from "next/image";

export default function Summary() {
    return (
        <main className="flex-grow z-10 py-12 px-4 sm:px-6 lg:px-8 bg-background-light relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%230e1c4f%27%3E%3Cpath%20d%3D%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-primary rounded-xl shadow-sm border border-secondary/20 p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-2xl font-serif text-secondary font-semibold">Booking Summary</h1>
                            <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">Quote Finalized</span>
                        </div>
                        <p className="text-secondary/80 text-sm">Reference ID: #MKP-2023-8921</p>
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
                                    <div className="w-8 h-8 bg-primary text-secondary/30 rounded-full flex items-center justify-center text-sm font-bold border-4 border-primary">4</div>
                                    <span className="text-xs mt-2 font-bold text-secondary/30">Confirm</span>
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
                                            <p className="text-xl font-serif font-medium text-secondary">New York, NY</p>
                                            <p className="text-sm text-secondary/80">1200 Corporate Blvd, Suite 400<br />NY 10019</p>
                                            <div className="mt-2 inline-flex items-center gap-1 text-xs text-primary bg-secondary px-2 py-1 rounded">
                                                <span className="material-icons-outlined text-xs">elevator</span> Elevator Access
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pl-6 pt-2">
                                        <p className="text-sm font-medium text-secondary">Pickup Date</p>
                                        <p className="text-sm text-secondary/80">Oct 24, 2023 • 09:00 AM</p>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-3 md:pl-12">
                                    <label className="text-xs uppercase tracking-wider text-secondary font-semibold">Destination</label>
                                    <div className="flex items-start gap-3">
                                        <span className="w-3 h-3 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                                        <div>
                                            <p className="text-xl font-serif font-medium text-secondary">San Francisco, CA</p>
                                            <p className="text-sm text-secondary/80">450 Tech Plaza, Floor 12<br />CA 94107</p>
                                            <div className="mt-2 inline-flex items-center gap-1 text-xs text-primary bg-secondary px-2 py-1 rounded">
                                                <span className="material-icons-outlined text-xs">straighten</span> Long Carry
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pl-6 pt-2">
                                        <p className="text-sm font-medium text-secondary">Delivery Estimate</p>
                                        <p className="text-sm text-secondary/80">Oct 29 - Oct 31, 2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-secondary/10 p-6 border-t border-secondary/10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-secondary">Base Relocation Cost</span>
                                <span className="text-sm font-medium text-secondary">$4,250.00</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-secondary">Insurance (Full Value Protection)</span>
                                <span className="text-sm font-medium text-secondary">$350.00</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-secondary">Corporate Discount (10%)</span>
                                <span className="text-sm font-medium text-secondary">-$460.00</span>
                            </div>
                            <div className="border-t border-secondary/20 pt-4 flex justify-between items-center">
                                <span className="font-serif font-bold text-secondary text-lg">Total Estimate</span>
                                <span className="font-serif font-bold text-secondary text-2xl">$4,140.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-primary rounded-xl shadow-lg border-t-4 border-secondary overflow-hidden relative group text-secondary">
                        <div className="h-24 bg-secondary/5 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        </div>
                        <div className="px-6 relative">
                            <div className="absolute -top-12 border-4 border-primary rounded-full overflow-hidden w-24 h-24 shadow-md bg-primary">
                                <img alt="Sarah Jenkins" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB5CSqHReh4O40Qqvn6Ziq2k4dlybs75LxvnLZyNwq7p7tkheCf-_8YOlGi_ZCHR6-HCxXQF2dn1LAgO2Yt7lxGns4WAmMWEoc63tTYWOCevBI5eZuZLmnYbCvhqk97oT92O5lv-QwprfpL0vvhOZ5UwCV0G9RzjvrnsOsLUK_QA4hhO6roOG-j1bz22qaCzqyiVC6WAGRjVsqpfadcEYpTLouGumTQKYlCDRKZOZDzDLK2Y639QxzqKOCGv9VGTd9dSRAIhe6XVC" />
                            </div>
                            <div className="pt-14 pb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-serif font-bold text-secondary">Sarah Jenkins</h3>
                                        <p className="text-sm text-secondary/80 font-medium mb-1">Senior Relocation Manager</p>
                                        <p className="text-xs text-secondary/60">MKP Elite Team • 8 Yrs Experience</p>
                                    </div>
                                    <img alt="LinkedIn" className="w-6 h-6 opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbrSATt6f1KKfhovkW-OzSx1BmApMHkIpGqVHTVfZDm58mW9MH8x8W0l3F-7vwoUSVSj6ZMKA7hFVMfBwNItJRPi3NwFmWw9iVmS5DZ-8X-lpLSpNyRGt1qbwNyDgJCRukMi6j3RbLPEGMW_N2TuarnZiXaarFFiAnzfBm06S6Ayr_yhi4j6fmN-Zlh3SY9bjoBXl3R--z31KskIXv0B-TkjioYitopAN7APdyweXUw1a9R2a7y6O5kiExiUYoNhsBlie4v0mxz2Be" />
                                </div>
                                <div className="mt-4 pt-4 border-t border-secondary/20 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-secondary">
                                        <span className="material-icons-outlined text-secondary">verified</span>
                                        <span>Certified Corporate Specialist</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-secondary">
                                        <span className="material-icons-outlined text-secondary">language</span>
                                        <span>Speaks English, Spanish</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <button className="flex-1 bg-secondary text-primary hover:bg-secondary/90 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">Message</button>
                                    <button className="flex-1 bg-secondary text-primary hover:bg-secondary/90 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">Schedule Call</button>
                                </div>
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

                    <div className="sticky bottom-6">
                        <button className="w-full bg-primary hover:bg-primary/90 text-secondary font-bold text-lg py-4 px-6 rounded-xl shadow-elegant transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-secondary/20">
                            Confirm Booking
                            <span className="material-icons-outlined">arrow_forward</span>
                        </button>
                        <p className="text-center text-xs text-secondary mt-3">By confirming, you agree to MKP Terms of Service.</p>
                    </div>
                </div>
            </div>

            <div className="mt-16 border-t border-primary/20 pt-8 relative z-10">
                <h5 className="text-center text-primary text-sm font-medium uppercase tracking-widest mb-8">Trusted By Industry Leaders</h5>
                <div className="relative w-full overflow-hidden bg-white/50 dark:bg-white/5 py-8 rounded-xl backdrop-blur-sm">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10"></div>
                    <div className="flex w-[200%] animate-scroll">
                        <div className="flex justify-around items-center w-full px-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <span className="text-xl font-bold font-serif text-primary dark:text-slate-400">Acme Corp</span>
                            <span className="text-xl font-bold font-sans text-primary dark:text-slate-400 flex items-center gap-1"><span className="material-icons-outlined">token</span> Vertex</span>
                            <span className="text-xl font-bold font-serif italic text-primary dark:text-slate-400">Globex</span>
                            <span className="text-xl font-bold font-sans text-primary dark:text-slate-400 uppercase tracking-tighter">Soylent</span>
                            <span className="text-xl font-bold font-serif text-primary dark:text-slate-400">Initech</span>
                            <span className="text-xl font-bold font-sans text-primary dark:text-slate-400">Umbrella</span>
                        </div>
                        <div className="flex justify-around items-center w-full px-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
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
                    <span className="material-icons-outlined text-6xl transform scale-x-[-1]">local_shipping</span>
                </div>
            </div>
        </main>
    );
}
