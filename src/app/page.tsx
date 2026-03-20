"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { leadService } from "@/services/leadService";
import { supabase } from "@/lib/supabase";
import AuthModal from "@/components/AuthModal";
import CustomDatePicker from "@/components/CustomDatePicker";
import LocationAutocomplete from "@/components/LocationAutocomplete";
import { Calendar as CalendarIcon, ChevronDown, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import FAQItem from "@/components/FAQItem";

const faqs = [
  {
    question: "How long does a typical local move take?",
    answer: "A standard local move (within the same city) usually takes 1-2 days. The first day is dedicated to packing and the second day for transportation and unloading. The exact timeline depends on the size of your inventory."
  },
  {
    question: "Are my belongings insured during the move?",
    answer: "Yes, we provide comprehensive transit insurance for all your belongings. Our estimator will discuss the valuation and coverage details with you during the initial survey to ensure you have complete peace of mind."
  },
  {
    question: "Do you provide packing materials?",
    answer: "Absolutely. We use premium, industry-grade packing materials including sturdy corrugated boxes, bubble wrap, foam sheets, and specialized cartons for fragile items like electronics and artwork. All standard packing materials are included in your quote."
  },
  {
    question: "How far in advance should I book my move?",
    answer: "We recommend booking at least 2-3 weeks in advance for local moves and 4-6 weeks for intercity or international relocations, especially during peak moving seasons (summer months and month-ends)."
  },
  {
    question: "What happens if my move date changes?",
    answer: "We understand that plans can change. You can reschedule your move up to 72 hours before the scheduled packing date without any penalty. Please contact your dedicated relocation manager to adjust the timeline."
  }
];

export default function Home() {
  const [shiftType, setShiftType] = useState<"local" | "intercity">("local");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const router = useRouter();

  // Initialize date as a Date object
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        leadService.getProfile(session.user.id).then((p) => setProfile(p));
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleProceed = async (e?: React.MouseEvent, guestData?: any) => {
    if (e) e.preventDefault();

    if (!source || !destination || !selectedDate) {
      toast.error("Please fill in all the details to get an estimate.");
      return;
    }

    const userPhone = profile?.phone || user?.phone;

    // If user lacks a phone number, or no user and no guestData provided, open the modal
    if ((!user || !userPhone) && !guestData) {
      setIsAuthModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      // Prioritize explicit guestData (from AuthModal) > DB Profile > Auth Metadata > Google Auth Name
      const leadName = guestData?.full_name || profile?.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name || null;
      const leadPhone = guestData?.phone || profile?.phone || user?.phone || null;

      const lead = await leadService.createLead({
        user_id: user?.id || null,
        customer_name: leadName,
        customer_phone: leadPhone,
        pickup_city: source,
        destination_city: destination,
        moving_date: selectedDate.toISOString(),
        shift_type: shiftType,
        honeypot: guestData?.honeypot || honeypot
      } as any);

      toast.success("Quote requested successfully! Our team will contact you shortly.");

      localStorage.setItem("current_lead_id", lead.id);
      router.push("/inventory");
    } catch (err: any) {
      console.error("Error creating lead:", err);
      toast.error("Failed to initiate relocation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow relative bg-background-light">
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialData={{
           full_name: profile?.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name || "",
           phone: profile?.phone || user?.phone || "",
           email: user?.email || ""
        }}
        onSuccess={(u) => {
          setIsAuthModalOpen(false);
          // Directly proceed with the captured guest data
          handleProceed(undefined, u);
        }}
      />
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
          <div className="bg-white border-l-4 border-primary p-4 rounded-r backdrop-blur-sm max-w-md hidden md:block">
            <p className="text-primary italic text-sm mb-2">"MKP redefined our office move. Zero downtime and impeccable handling of sensitive equipment."</p>
            <p className="text-primary font-semibold text-xs">— CTO, TechGlobal Inc.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-5/12 ml-auto">
          <div className="bg-primary rounded-xl shadow-2xl p-6 md:p-8 border border-secondary/20">
            <h2 className="font-display text-2xl text-secondary mb-6 text-center">Initiate Relocation</h2>

            <input 
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

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
              <div className="space-y-4 relative">
                <div className="absolute left-[20px] top-8 bottom-8 w-0.5 border-l-2 border-dashed border-secondary/10 z-0"></div>

                <div className="relative z-[20] transition-all duration-300">
                  <LocationAutocomplete
                    id="source"
                    value={source}
                    onChange={setSource}
                    placeholder="Origin Location (City, Area)"
                    icon={
                      <div className="w-4 h-4 rounded-full border-2 border-secondary bg-primary shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
                    }
                  />
                </div>

                <div className="relative z-[10] transition-all duration-300">
                  <LocationAutocomplete
                    id="destination"
                    value={destination}
                    onChange={setDestination}
                    placeholder="Destination Location (City, Area)"
                    icon={
                      <div className="w-4 h-4 rounded-full bg-secondary shadow-[0_0_10px_rgba(212,175,55,0.4)]"></div>
                    }
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-[10px] font-bold text-secondary/40 mb-2 uppercase tracking-[0.25em] group-hover:text-secondary/60 transition-colors">Preferred Move Date</label>

                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  className="w-full flex items-center justify-between pl-4 pr-5 py-3.5 bg-primary/40 border border-secondary/10 rounded-2xl text-secondary hover:bg-primary/50 hover:border-secondary/20 transition-all duration-300 shadow-inner group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary/60 group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-500">
                      <CalendarIcon size={20} />
                    </div>
                    <div className="flex flex-col items-start translate-y-[1px]">
                      <span className="text-[10px] text-secondary/30 uppercase tracking-widest font-bold leading-none mb-1">Scheduled for</span>
                      <span className="text-base font-serif font-bold tracking-wide">
                        {format(selectedDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                  <ChevronDown size={18} className={cn("text-secondary/30 transition-transform duration-500", isDatePickerOpen && "rotate-180")} />
                </button>

                <CustomDatePicker
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                  isOpen={isDatePickerOpen}
                  onClose={() => setIsDatePickerOpen(false)}
                />
              </div>

              <button
                onClick={handleProceed}
                disabled={loading}
                className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-primary font-bold py-4 px-4 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                <span>{loading ? "Processing..." : "Get Free Quote"}</span>
                {!loading && <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>}
              </button>
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

      {/* Uncompromised Quality Section */}
      <section className="bg-background-light py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex justify-center">
        <div className="bg-primary rounded-[2rem] overflow-hidden relative shadow-2xl flex flex-col md:flex-row w-full max-w-5xl">
          {/* Text Content */}
          <div className="p-8 md:p-14 lg:p-16 w-full md:w-1/2 flex flex-col justify-center relative z-10 order-2 md:order-1">
            <div className="w-14 h-14 rounded-full border-2 border-secondary/30 flex items-center justify-center mb-8">
              <span className="material-icons text-secondary text-3xl">verified_user</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-secondary font-bold tracking-wider mb-6 leading-tight">
              UNCOMPROMISED<br/>QUALITY
            </h2>
            <p className="text-secondary/80 leading-relaxed text-sm md:text-base font-medium">
              We deal in shifting goods with absolute precision. We employ the trade's best men, trained to pack your household items flawlessly. Our lorry drivers are highly experienced, ensuring they navigate roads perfectly to avoid bumps and deliver your items in pristine condition.
            </p>
          </div>
          
          {/* Image Content */}
          <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-full order-1 md:order-2 overflow-hidden">
            <img 
              src="/uncompromised-quality.png" 
              alt="Uncompromised Quality Transport" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* The blue geometric shape overlay */}
            <div 
              className="absolute bottom-0 right-0 w-[150%] h-[150%] bg-primary z-20 flex items-center justify-center origin-bottom-right" 
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', transform: 'translateX(20%) translateY(20%)' }}
            >
              <span className="font-display text-[6rem] md:text-[8rem] font-black text-white/90 transform -translate-x-12 translate-y-12">MKP</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-light py-20 border-t border-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-4xl text-primary mb-16 font-bold">How MKP Packers and Movers Works?</h2>

          <div className="relative space-y-12">
            {/* Vertical Connector */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 border-l-2 border-dashed border-primary/20 z-0"></div>

            {[
              {
                icon: 'list_alt',
                title: 'Share your Shifting Requirement',
                desc: 'Detail your move and pick a date. Our team maps out the fastest routes to navigate traffic efficiently.'
              },
              {
                icon: 'payments',
                title: 'Receive Expert Quote',
                desc: 'Receive a comprehensive quote after our team reviews your relocation requirements. Zero hidden charges.'
              },
              {
                icon: 'support_agent',
                title: 'Assign Quality Service Expert',
                desc: 'A dedicated relocation manager will oversee your booking, coordinating everything from start to finish.'
              },
              {
                icon: 'local_shipping',
                title: 'Leave the Heavy Lifting to Us',
                desc: 'Our trained staff uses high-grade packing materials to ensure your valuables stay safe while travelling.'
              },
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex items-start gap-8 group">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg border-2 border-secondary/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-icons text-secondary text-2xl">{step.icon}</span>
                </div>
                <div className="pt-3">
                  <h3 className="font-display text-xl font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-primary/70 leading-relaxed text-sm md:text-base">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-background-light py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-primary font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-primary/70 text-lg">Find answers to common questions about our corporate and residential relocation services.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white border-t border-primary/10 py-3 overflow-hidden relative group">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <span className="text-xs font-bold uppercase text-primary/60 whitespace-nowrap z-10 bg-white/80 px-2 py-1 rounded backdrop-blur-sm shadow-sm">Recent Moves:</span>
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
        <a 
            href="https://wa.me/918787052894?text=Hello%20MKP%20Packers%20&%20Movers,%20I%20would%20like%20to%20inquire%20about%20your%20relocation%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-primary hover:bg-primary-hover text-secondary rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50 cursor-pointer"
        >
          <span className="material-icons text-2xl">chat</span>
        </a>
      </div>
    </main>
  );
}
