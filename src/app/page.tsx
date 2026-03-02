"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [shiftType, setShiftType] = useState<"local" | "intercity">("local");

  return (
    <main className="flex-grow relative bg-background-light">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary opacity-5 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-1/2 text-primary pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">Premium Corporate Service</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Efficiency meets <span className="text-primary italic">Elegance.</span>
          </h1>
          <p className="text-lg text-primary/80 mb-10 max-w-lg leading-relaxed">
            Experience seamless corporate relocation with white-glove service. We handle the complexities of logistics so you can focus on business continuity.
          </p>
          <div className="flex flex-wrap gap-6 mb-12">
            <div className="flex items-center gap-2 text-sm text-primary font-bold">
              <span className="material-icons text-primary text-xl">verified_user</span>
              <span>Full Insurance Coverage</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary font-bold">
              <span className="material-icons text-primary text-xl">schedule</span>
              <span>Guaranteed Timelines</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary font-bold">
              <span className="material-icons text-primary text-xl">inventory_2</span>
              <span>Smart Inventory Tracking</span>
            </div>
          </div>
          <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r backdrop-blur-sm max-w-md hidden md:block">
            <p className="text-primary italic text-sm mb-2">"MKP redefined our office move. Zero downtime and impeccable handling of sensitive equipment."</p>
            <p className="text-primary font-semibold text-xs">— CTO, TechGlobal Inc.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-5/12 ml-auto">
          <div className="bg-primary rounded-xl shadow-2xl p-6 md:p-8 border border-secondary/20">
            <h2 className="font-display text-2xl text-secondary mb-6 text-center">Initiate Relocation</h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <label className="cursor-pointer group relative">
                <input
                  type="radio"
                  name="shiftType"
                  className="peer sr-only"
                  checked={shiftType === "local"}
                  onChange={() => setShiftType("local")}
                />
                <div className="selection-card p-4 rounded-lg border-2 border-secondary/20 peer-checked:border-secondary peer-checked:bg-secondary/10 hover:border-secondary/40 transition-all text-center h-full flex flex-col items-center justify-center gap-3">
                  <span className="material-icons text-3xl text-secondary/40 peer-checked:text-secondary group-hover:text-secondary/60 transition-colors">location_city</span>
                  <div>
                    <span className="block font-bold text-secondary/60 peer-checked:text-secondary text-sm">Local Shift</span>
                    <span className="block text-[10px] text-secondary/50 mt-1 uppercase tracking-tight">Within City Limits</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 w-5 h-5 bg-secondary rounded-full items-center justify-center hidden peer-checked:flex shadow-sm">
                  <span className="material-icons text-xs text-primary font-bold">check</span>
                </div>
              </label>

              <label className="cursor-pointer group relative">
                <input
                  type="radio"
                  name="shiftType"
                  className="peer sr-only"
                  checked={shiftType === "intercity"}
                  onChange={() => setShiftType("intercity")}
                />
                <div className="selection-card p-4 rounded-lg border-2 border-secondary/20 peer-checked:border-secondary peer-checked:bg-secondary/10 hover:border-secondary/40 transition-all text-center h-full flex flex-col items-center justify-center gap-3">
                  <span className="material-icons text-3xl text-secondary/40 peer-checked:text-secondary group-hover:text-secondary/60 transition-colors">map</span>
                  <div>
                    <span className="block font-bold text-secondary/60 peer-checked:text-secondary text-sm">Inter-City</span>
                    <span className="block text-[10px] text-secondary/50 mt-1 uppercase tracking-tight">Domestic Movement</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 w-5 h-5 bg-secondary rounded-full items-center justify-center hidden peer-checked:flex shadow-sm">
                  <span className="material-icons text-xs text-primary font-bold">check</span>
                </div>
              </label>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <div className="absolute left-4 top-10 bottom-10 w-0.5 border-l-2 border-dashed border-secondary/20 z-0"></div>

                <div className="relative z-10 mb-4 group">
                  <label htmlFor="source" className="sr-only">Move From</label>
                  <div className="absolute left-3 top-3.5 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-secondary bg-primary"></div>
                  </div>
                  <input type="text" id="source" className="block w-full pl-10 pr-3 py-3 text-sm border-secondary/20 rounded-lg bg-primary/20 text-secondary placeholder-secondary/40 focus:ring-secondary focus:border-secondary transition-shadow shadow-sm outline-none" placeholder="Origin Location (City, Area)" />
                </div>

                <div className="relative z-10 group">
                  <label htmlFor="destination" className="sr-only">Move To</label>
                  <div className="absolute left-3 top-3.5 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                  </div>
                  <input type="text" id="destination" className="block w-full pl-10 pr-3 py-3 text-sm border-secondary/20 rounded-lg bg-primary/20 text-secondary placeholder-secondary/40 focus:ring-secondary focus:border-secondary transition-shadow shadow-sm outline-none" placeholder="Destination Location (City, Area)" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary mb-1 uppercase tracking-wider">Preferred Move Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-secondary/40 text-lg">calendar_today</span>
                  </div>
                  <input type="date" className="block w-full pl-10 pr-3 py-3 text-sm border-secondary/20 rounded-lg bg-primary/20 text-secondary placeholder-secondary/40 focus:ring-secondary focus:border-secondary shadow-sm outline-none" style={{ colorScheme: "dark" }} />
                </div>
              </div>

              <Link href="/inventory" className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-primary font-bold py-4 px-4 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                <span>Proceed to Estimate</span>
                <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-secondary/60">By proceeding, you agree to our <a href="#" className="text-secondary hover:underline">Terms of Service</a> &amp; <a href="#" className="text-secondary hover:underline">Privacy Policy</a>.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-primary text-secondary border-t border-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center font-display text-2xl text-secondary mb-10 font-bold">Comprehensive Relocation Solutions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: 'apartment', title: 'Office Relocation', desc: 'Minimize downtime with structured moves.' },
              { icon: 'computer', title: 'IT Infrastructure', desc: 'Safe transport of servers and workstations.' },
              { icon: 'local_shipping', title: 'Vehicle Transport', desc: 'Secure enclosed carriers for corporate fleets.' },
              { icon: 'warehouse', title: 'Warehousing', desc: 'Climate-controlled short & long term storage.' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors border border-secondary/20">
                  <span className="material-icons text-3xl text-secondary">{feature.icon}</span>
                </div>
                <h4 className="font-bold text-secondary mb-1">{feature.title}</h4>
                <p className="text-xs text-secondary/70 max-w-[150px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-secondary/50 border-t border-primary/10 py-3 overflow-hidden relative group">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="text-xs font-bold uppercase text-primary/60 whitespace-nowrap z-10 bg-secondary/80 px-2 py-1 rounded backdrop-blur-sm shadow-sm">Recent Moves:</span>
          <div className="flex gap-8 overflow-hidden relative w-full">
            <div className="flex gap-12 animate-marquee whitespace-nowrap text-sm text-primary items-center">
              {[
                { client: "Fortune 500 HQ", route: "Mumbai to Bangalore", status: "Completed" },
                { client: "TechStartup Ltd", route: "Gurgaon Local Shift", status: "Completed" },
                { client: "Global Bank Corp", route: "Delhi to Hyderabad", status: "In Transit" },
                { client: "Creative Agency", route: "Pune to Chennai", status: "Completed" },
                { client: "Retail Giant", route: "Kolkata to Mumbai", status: "Completed" },
                { client: "FinTech Hub", route: "Bangalore to Noida", status: "Packing" },
                { client: "BioLab Solutions", route: "Ahmadabad to Pune", status: "Completed" },
                { client: "EduTech Pro", route: "Chennai to Delhi", status: "Completed" }
              ].map((move, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${move.status === "In Transit" || move.status === "Packing" ? "bg-primary animate-pulse" : "bg-primary"}`}></span>
                  <span className="font-bold">{move.client}</span>
                  <span className="text-primary/40 text-lg">→</span>
                  <span className="font-serif italic">{move.route}</span>
                  <span className={`px-2 py-0.5 text-[9px] rounded uppercase font-bold border transition-colors ${move.status === "Completed" ? "bg-primary/10 text-primary border-primary/20" : "bg-primary text-secondary border-primary"}`}>
                    {move.status}
                  </span>
                </div>
              ))}
              {/* Duplicate set for seamless looping */}
              {[
                { client: "Fortune 500 HQ", route: "Mumbai to Bangalore", status: "Completed" },
                { client: "TechStartup Ltd", route: "Gurgaon Local Shift", status: "Completed" },
                { client: "Global Bank Corp", route: "Delhi to Hyderabad", status: "In Transit" },
                { client: "Creative Agency", route: "Pune to Chennai", status: "Completed" },
                { client: "Retail Giant", route: "Kolkata to Mumbai", status: "Completed" },
                { client: "FinTech Hub", route: "Bangalore to Noida", status: "Packing" },
                { client: "BioLab Solutions", route: "Ahmadabad to Pune", status: "Completed" },
                { client: "EduTech Pro", route: "Chennai to Delhi", status: "Completed" }
              ].map((move, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${move.status === "In Transit" || move.status === "Packing" ? "bg-primary animate-pulse" : "bg-primary"}`}></span>
                  <span className="font-bold">{move.client}</span>
                  <span className="text-primary/40 text-lg">→</span>
                  <span className="font-serif italic">{move.route}</span>
                  <span className={`px-2 py-0.5 text-[9px] rounded uppercase font-bold border transition-colors ${move.status === "Completed" ? "bg-primary/10 text-primary border-primary/20" : "bg-primary text-secondary border-primary"}`}>
                    {move.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-primary hover:bg-primary-hover text-secondary rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50 cursor-pointer">
          <span className="material-icons text-2xl">chat</span>
        </button>
      </div>
    </main>
  );
}
