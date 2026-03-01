"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [shiftType, setShiftType] = useState<"local" | "intercity">("local");

  return (
    <main className="flex-grow relative">
      <div className="absolute inset-0 bg-secondary z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-900 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary opacity-5 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-1/2 text-white pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">Premium Corporate Service</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Efficiency meets <span className="text-primary italic">Elegance.</span>
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-lg leading-relaxed">
            Experience seamless corporate relocation with white-glove service. We handle the complexities of logistics so you can focus on business continuity.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="material-icons text-primary text-lg">verified_user</span>
              <span>Full Insurance Coverage</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="material-icons text-primary text-lg">schedule</span>
              <span>Guaranteed Timelines</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="material-icons text-primary text-lg">inventory_2</span>
              <span>Smart Inventory Tracking</span>
            </div>
          </div>
          <div className="bg-white/5 border-l-4 border-primary p-4 rounded-r backdrop-blur-sm max-w-md hidden md:block">
            <p className="text-gray-300 italic text-sm mb-2">"MKP redefined our office move. Zero downtime and impeccable handling of sensitive equipment."</p>
            <p className="text-white font-semibold text-xs">— CTO, TechGlobal Inc.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-5/12 ml-auto">
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="font-display text-2xl text-secondary dark:text-primary mb-6 text-center">Initiate Relocation</h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <label className="cursor-pointer group relative">
                <input
                  type="radio"
                  name="shiftType"
                  className="peer sr-only"
                  checked={shiftType === "local"}
                  onChange={() => setShiftType("local")}
                />
                <div className="selection-card p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 peer-checked:border-primary peer-checked:bg-primary/10 dark:peer-checked:bg-primary/5 hover:border-gray-300 dark:hover:border-gray-500 transition-all text-center h-full flex flex-col items-center justify-center gap-3">
                  <span className="material-icons text-3xl text-gray-400 peer-checked:text-secondary dark:peer-checked:text-primary group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">location_city</span>
                  <div>
                    <span className="block font-semibold text-gray-800 dark:text-white peer-checked:text-secondary dark:peer-checked:text-primary text-sm">Local Shift</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Within City Limits</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full items-center justify-center hidden peer-checked:flex shadow-sm">
                  <span className="material-icons text-xs text-secondary font-bold">check</span>
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
                <div className="selection-card p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 peer-checked:border-primary peer-checked:bg-primary/10 dark:peer-checked:bg-primary/5 hover:border-gray-300 dark:hover:border-gray-500 transition-all text-center h-full flex flex-col items-center justify-center gap-3">
                  <span className="material-icons text-3xl text-gray-400 peer-checked:text-secondary dark:peer-checked:text-primary group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">map</span>
                  <div>
                    <span className="block font-semibold text-gray-800 dark:text-white peer-checked:text-secondary dark:peer-checked:text-primary text-sm">Inter-City</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Domestic Movement</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full items-center justify-center hidden peer-checked:flex shadow-sm">
                  <span className="material-icons text-xs text-secondary font-bold">check</span>
                </div>
              </label>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <div className="absolute left-4 top-10 bottom-10 w-0.5 border-l-2 border-dashed border-gray-300 dark:border-gray-600 z-0"></div>

                <div className="relative z-10 mb-4 group">
                  <label htmlFor="source" className="sr-only">Move From</label>
                  <div className="absolute left-3 top-3.5 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-primary bg-white dark:bg-gray-800"></div>
                  </div>
                  <input type="text" id="source" className="block w-full pl-10 pr-3 py-3 text-sm border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-primary focus:border-primary transition-shadow shadow-sm outline-none" placeholder="Origin Location (City, Area)" />
                </div>

                <div className="relative z-10 group">
                  <label htmlFor="destination" className="sr-only">Move To</label>
                  <div className="absolute left-3 top-3.5 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  </div>
                  <input type="text" id="destination" className="block w-full pl-10 pr-3 py-3 text-sm border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-primary focus:border-primary transition-shadow shadow-sm outline-none" placeholder="Destination Location (City, Area)" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wide">Preferred Move Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-gray-400 text-lg">calendar_today</span>
                  </div>
                  <input type="date" className="block w-full pl-10 pr-3 py-3 text-sm border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-primary focus:border-primary shadow-sm outline-none" style={{ colorScheme: "light dark" }} />
                </div>
              </div>

              <Link href="/inventory" className="w-full mt-4 bg-primary hover:bg-primary-hover text-secondary font-bold py-4 px-4 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 group animate-pulse-slow">
                <span>Proceed to Estimate</span>
                <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">By proceeding, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> &amp; <a href="#" className="text-primary hover:underline">Privacy Policy</a>.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center font-display text-2xl text-secondary dark:text-white mb-10 font-bold">Comprehensive Relocation Solutions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: 'apartment', title: 'Office Relocation', desc: 'Minimize downtime with structured moves.' },
              { icon: 'computer', title: 'IT Infrastructure', desc: 'Safe transport of servers and workstations.' },
              { icon: 'local_shipping', title: 'Vehicle Transport', desc: 'Secure enclosed carriers for corporate fleets.' },
              { icon: 'warehouse', title: 'Warehousing', desc: 'Climate-controlled short & long term storage.' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors border border-gray-100 dark:border-gray-700">
                  <span className="material-icons text-3xl text-secondary dark:text-primary">{feature.icon}</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[150px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gray-100 dark:bg-black/40 border-t border-gray-200 dark:border-gray-800 py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 whitespace-nowrap">Recent Moves:</span>
          <div className="flex gap-8 overflow-hidden relative w-full">
            <div className="flex gap-12 animate-marquee whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="font-semibold">Fortune 500 HQ</span>
                <span className="text-gray-400">→</span>
                <span>Mumbai to Bangalore</span>
                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-[10px] rounded uppercase font-bold">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="font-semibold">TechStartup Ltd</span>
                <span className="text-gray-400">→</span>
                <span>Gurgaon Local Shift</span>
                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-[10px] rounded uppercase font-bold">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="font-semibold">Global Bank Corp</span>
                <span className="text-gray-400">→</span>
                <span>Delhi to Hyderabad</span>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] rounded uppercase font-bold">In Transit</span>
              </div>
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
