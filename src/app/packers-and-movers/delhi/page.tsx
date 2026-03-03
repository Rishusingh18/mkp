"use client";

import Link from "next/link";
import { useState } from "react";

export default function DelhiPackersAndMovers() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        if (activeFaq === index) {
            setActiveFaq(null);
        } else {
            setActiveFaq(index);
        }
    };

    const services = [
        { title: "Within City", discount: "Upto 25% off", icon: "home" },
        { title: "Between City", discount: "Upto 25% off", icon: "flight_takeoff" },
        { title: "City Tempo", discount: "Upto 50% off", icon: "local_shipping" },
        { title: "Vehicle Shifting", discount: "Just Launched", icon: "two_wheeler" }
    ];

    const steps = [
        { title: "Share your Shifting Requirement", desc: "Detail your move and pick a date. Our team maps out the fastest routes to navigate Delhi's traffic.", icon: "post_add" },
        { title: "Receive Free Instant Quote", desc: "Receive an instant, comprehensive quote with zero hidden charges. We provide the most transparent pricing for all household shifts", icon: "request_quote" },
        { title: "Assign Quality Service Expert", desc: "Dedicated relocation manager to oversee your booking, coordinating everything.", icon: "support_agent" },
        { title: "Leave the Heavy Lifting to Us", desc: "Trained staff uses high-grade bubble wrap and corrugated sheets to ensure your valuables stay safe while travelling.", icon: "fitness_center" }
    ];

    const features = [
        { title: "Lowest Price Guarantee", desc: "Most affordable house shifting rates in Delhi with upfront pricing ensures you pay exactly what was quoted.", icon: "payments" },
        { title: "Best Quality Service", desc: "Secure your peace of mind with Damage & Delay Protection: Any damage, Any delay, We pay. policy", icon: "verified" },
        { title: "Reschedule your shifting anytime", desc: "free rescheduling policy for your move if requested at least 48 hours before the scheduled shifting time.", icon: "event_repeat" },
        { title: "Dedicated Support Assistance", desc: "Dedicated support assistance ensures a smooth, stress-free relocation experience and for quick query resolution.", icon: "headset_mic" },
        { title: "Professional Labour", desc: "Background-verified professionals who are experts at handling heavy furniture and delicate glassware with maximum care.", icon: "engineering" }
    ];

    const trustIndicators = [
        { value: "10 Years", label: "Years of Experience" },
        { value: "15 Lakh+", label: "Satisfied Customers" },
        { value: "4.8 (8.9 Lakh+ Review)", label: "Customer Rating" },
        { value: "100+ Cities", label: "Service Coverage" },
        { value: "99.3%", label: "Moving Accuracy" },
        { value: "ISO 9001:2015", label: "Certified Company" }
    ];

    const faqs = [
        { q: "Why should I pay a token in advance before the move?", a: "The token is used to confirm slot bookings and avoid any last-minute delays or inconvenience. The token amount will be adjusted in the final payment of your quotation." },
        { q: "Why are weekend and month-end prices higher in Delhi?", a: "Weekend and month-end prices for Packers & Movers in Delhi are typically higher due to increased demand during these periods, leading to limited availability and increasing pricing." },
        { q: "Can I get a price breakup for my move?", a: "Our summary page provides a detailed price breakup covering base charges, packaging, unpacking, dismantling, and service charges." },
        { q: "Will I be charged extra for higher floors?", a: "Our service includes door-to-door shifting. However, there might be additional charges if you live in a high-rise with no service lift. You can specify your floor details while booking to get an accurate quote." },
        { q: "Are the packing materials included in the package? Are there any hidden charges?", a: "Yes, all packing materials and labour costs are included in the package with no hidden charges." }
    ];

    const reviews = [
        { name: "Simran arora", text: "In movers aur packers ki team ne bahut hi professional tareeke se kaam kiya. Mujhe un par pura vishwas tha aur unhone mere expectations ko pura kiya." },
        { name: "Ms Pappo", text: "\"MKP Packers ensured that all my items, including fragile ones, were packed securely.\"" },
        { name: "satyendra pratap singh", text: "Outstanding service of the packing as well as behaviour of the staff. Overall outstanding work." },
        { name: "Md Taushif", text: "\"MKP Packers provide excellent value for money. Highly recommended\"" },
        { name: "Md Farhan", text: "\"The cost was reasonable, and the quality of service was exceptional.\"" },
    ];

    return (
        <main className="min-h-screen bg-background-light pb-20">
            {/* Hero Section */}
            <section className="relative pt-24 pb-12 overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply z-10"></div>
                    {/* Animated background blobs */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/30 blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-20">
                    <div className="max-w-3xl text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-lg">
                            Best Packers and Movers <br />
                            <span className="text-primary italic">in Delhi</span>
                        </h1>
                        <p className="text-lg md:text-xl text-primary/20 mb-8 max-w-2xl font-light">
                            Top Rated House Shifting Services in Delhi with 100% Damage and Delay Protection. Any Damage. Any Delay. We Pay.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/inventory" className="bg-primary hover:bg-yellow-500 text-secondary font-bold py-4 px-8 rounded-lg shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 text-center inline-flex items-center justify-center gap-2 group">
                                <span className="material-icons">local_shipping</span>
                                <span>Get Free Quote Estimate</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-12 -mt-8 relative z-30 container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-8 border border-primary/10">
                    <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                        Relocation Services We Offer in Delhi
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {services.map((service, idx) => (
                            <div key={idx} className="group relative bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/10 transition-all duration-300 hover:-translate-y-2">
                                <div className="absolute top-0 inset-x-0 flex justify-center -mt-3 z-10">
                                    <span className="bg-[#ffe8c3] text-[#4b4b4b] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border border-white shadow-sm uppercase tracking-wider">
                                        {service.discount}
                                    </span>
                                </div>

                                <div className="w-16 h-16 rounded-full bg-secondary/10 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/10">
                                    <span className="material-icons text-3xl text-secondary group-hover:text-primary transition-colors">{service.icon}</span>
                                </div>

                                <h3 className="font-semibold text-primary text-sm md:text-base group-hover:text-secondary">{service.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                {/* Left Column - 2/3 width on LG */}
                <div className="lg:col-span-2 space-y-8">

                    {/* How It Works */}
                    <section className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-8 border border-primary/10">
                        <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            How MKP Packers and Movers Works?
                        </h2>

                        <div className="relative border-l-2 border-dashed border-primary/10 ml-6 pl-8 space-y-10 py-2">
                            {steps.map((step, idx) => (
                                <div key={idx} className="relative group">
                                    <div className="absolute -left-12 top-0.5 w-10 h-10 rounded-full bg-background-light border-2 border-primary/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-colors z-10 shadow-sm">
                                        <span className="material-icons text-primary/70 group-hover:text-primary transition-colors text-xl">{step.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-primary mb-2 group-hover:text-secondary transition-colors">{step.title}</h3>
                                    <p className="text-primary/70 text-sm md:text-base leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Trust Indicators */}
                    <section className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-8 border border-primary/10">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-primary mb-2">Why MKP is a Trusted Moving Company</h2>
                            <p className="text-primary/70">Delivering excellence in relocation services across India</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {trustIndicators.map((stat, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-4 text-center border border-primary/10 hover:border-primary/20 hover:shadow-md transition-all">
                                    <div className="text-lg md:text-xl font-bold text-secondary mb-1">{stat.value}</div>
                                    <div className="text-xs md:text-sm text-primary/70">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-white rounded-xl p-5 border border-primary/10">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-icons text-primary text-2xl">emoji_events</span>
                                <h3 className="text-lg font-bold text-primary">Awards & Recognitions</h3>
                            </div>
                            <ul className="list-disc pl-5 text-sm text-primary/70 space-y-2">
                                <li>CII Industry Transformation in Logistics & Supply Chain</li>
                                <li>BW Supply Chain Award for Best Collaborative Supplier Partnership</li>
                            </ul>
                        </div>
                    </section>

                    {/* Comparison Table */}
                    <section className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-8 border border-primary/10 overflow-hidden">
                        <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            MKP Vs Local Packers & Movers
                        </h2>

                        <div className="overflow-x-auto rounded-xl border border-primary/10">
                            <table className="w-full text-left border-collapse min-w-[500px]">
                                <thead>
                                    <tr className="bg-secondary border-b border-primary/10 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-bold text-primary/70 w-1/2 border-r border-primary/10">Services</th>
                                        <th className="p-4 font-bold text-primary/70 w-1/4 text-center border-r border-primary/10">Local Movers</th>
                                        <th className="p-4 font-bold text-secondary w-1/4 text-center bg-primary">MKP</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        "Vehicle Assurance",
                                        "Verified Professional Partners",
                                        "Regular Update",
                                        "Packaging & Unpacking Of household goods",
                                        "Dismantling & Re-Assemble Of Cot",
                                        "Damage Assurance"
                                    ].map((feature, idx) => (
                                        <tr key={idx} className="border-b border-primary/10 hover:bg-white transition-colors">
                                            <td className="p-4 font-medium text-primary/70 border-r border-primary/10">{feature}</td>
                                            <td className="p-4 text-center border-r border-primary/10">
                                                <span className="material-icons text-primary/40">close</span>
                                            </td>
                                            <td className="p-4 text-center bg-secondary/20">
                                                <span className="material-icons text-green-500">check_circle</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Household Items & Preparation Guide */}
                    <section className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-8 border border-primary/10 mt-8">
                        <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            Household Items & Preparation Guide
                        </h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                                    <span className="material-icons">living</span>
                                    Living Room Essentials
                                </h3>
                                <ul className="space-y-3 text-primary/70 list-disc ml-6">
                                    <li><strong>Sofa Sets:</strong> Usually a 3-seater with two 1-seater chairs, or an L-shaped sectional for modern apartments.</li>
                                    <li><strong>Center/Coffee Table:</strong> Often paired with smaller side tables for serving tea and snacks to guests.</li>
                                    <li><strong>TV Unit/Console:</strong> A focal point that often includes storage for media players and decorative items.</li>
                                    <li><strong>Diwan/Daybed:</strong> A traditional low-seated couch, often used for lounging or as an extra guest bed.</li>
                                    <li><strong>Jhula (Swing):</strong> Especially popular in South India and Gujarat, often made of wood with brass chains.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                                    <span className="material-icons">bed</span>
                                    Bedroom & Storage
                                </h3>
                                <ul className="space-y-3 text-primary/70 list-disc ml-6">
                                    <li><strong>Storage Beds:</strong> King or Queen-sized beds with hydraulic or manual storage underneath are standard to maximize space.</li>
                                    <li><strong>Wardrobes (Almirahs):</strong> Many homes still prefer steel Godrej-style almirahs or large wooden wardrobes.</li>
                                    <li><strong>Dressing Table:</strong> A dedicated unit with a mirror and drawers for cosmetics and grooming.</li>
                                    <li><strong>Bookshelves/Display Units:</strong> Used for books, souvenirs, and often small religious idols (puja space).</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                                    <span className="material-icons">restaurant</span>
                                    Dining & Utility
                                </h3>
                                <ul className="space-y-3 text-primary/70 list-disc ml-6">
                                    <li><strong>Dining Set:</strong> Usually a 4 or 6-seater wooden table.</li>
                                    <li><strong>Study Table & Chair:</strong> Essential for students or those working from home.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                                    <span className="material-icons">kitchen</span>
                                    Relocating Big Items (White Goods)
                                </h3>
                                <p className="text-primary/70 mb-4">Relocating large appliances requires specific preparation to prevent mechanical failure during transit.</p>
                                <div className="space-y-4">
                                    <div className="bg-background-light p-4 rounded-xl border border-primary/10">
                                        <h4 className="font-bold text-primary mb-2">1. Refrigerator</h4>
                                        <p className="text-sm text-primary/70 mb-1"><strong>Preparation:</strong> Empty it completely and defrost the freezer at least 24 hours before moving.</p>
                                        <p className="text-sm text-primary/70 mb-1"><strong>Moving Tip:</strong> Always transport it upright. Laying a fridge on its side can cause compressor oil to flow into the cooling lines, potentially ruining the appliance.</p>
                                        <p className="text-sm text-primary/70"><strong>Setup:</strong> Once placed in the new home, let it stand for 4–6 hours before plugging it in to allow the fluids to settle.</p>
                                    </div>
                                    <div className="bg-background-light p-4 rounded-xl border border-primary/10">
                                        <h4 className="font-bold text-primary mb-2">2. Washing Machine</h4>
                                        <p className="text-sm text-primary/70 mb-1"><strong>Preparation:</strong> Drain all remaining water from the hoses and the internal pump.</p>
                                        <p className="text-sm text-primary/70 mb-1"><strong>Critical Step:</strong> Use shipping bolts (transit bolts) to secure the drum. Without these, the drum can bounce during the move and damage the suspension system.</p>
                                        <p className="text-sm text-primary/70"><strong>Moving Tip:</strong> Keep the drain pipe secured to the back of the machine so it doesn't drag.</p>
                                    </div>
                                    <div className="bg-background-light p-4 rounded-xl border border-primary/10">
                                        <h4 className="font-bold text-primary mb-2">3. Air Conditioner (AC)</h4>
                                        <p className="text-sm text-primary/70 mb-1"><strong>Preparation:</strong> Requires professional &quot;pump-down&quot; and disconnection to ensure the refrigerant gas is saved within the outdoor unit.</p>
                                        <p className="text-sm text-primary/70"><strong>Moving Tip:</strong> Copper pipes are fragile; ensure they are coiled carefully and not kinked.</p>
                                    </div>
                                    <div className="bg-background-light p-4 rounded-xl border border-primary/10">
                                        <h4 className="font-bold text-primary mb-2">4. Kitchen Appliances (Microwave &amp; Water Purifiers)</h4>
                                        <p className="text-sm text-primary/70 mb-1"><strong>Microwave:</strong> Remove the glass turntable and pack it separately in bubble wrap.</p>
                                        <p className="text-sm text-primary/70"><strong>Water Purifier (RO):</strong> Drain the storage tank completely. It&apos;s often best to call a technician to uninstall and reinstall it to avoid internal filter damage.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Right Column - 1/3 width on LG */}
                <div className="space-y-8">

                    {/* Why Choose Us */}
                    <section className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-8 border border-primary/10">
                        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            Why Choose Us?
                        </h2>

                        <div className="space-y-6">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <span className="material-icons text-secondary group-hover:text-primary text-xl transition-colors">{feature.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-primary text-sm mb-1 group-hover:text-secondary">{feature.title}</h3>
                                        <p className="text-xs text-primary/70 leading-relaxed">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>

            {/* Testimonials */}
            <section className="py-12 bg-white border-y border-primary/10 overflow-hidden relative">
                <div className="container mx-auto px-4 mb-8 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold text-primary flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            Customer Reviews
                        </h2>
                        <p className="text-primary/70 text-sm">(4.8/5 Rating from 8.9 Lakh+ Reviews)</p>
                    </div>
                    <button className="text-primary font-semibold text-sm hover:underline hidden sm:block">See All Reviews &rarr;</button>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="container mx-auto px-4">
                    <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory pt-2 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                        {reviews.map((review, idx) => (
                            <div key={idx} className="flex-none w-[300px] bg-white rounded-xl shadow-md border border-primary/10 p-6 snap-center hover:shadow-xl hover:-translate-y-1 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-yellow-600 text-white font-bold flex items-center justify-center text-lg shadow-inner">
                                        {review.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-sm">{review.name}</h4>
                                        <div className="flex text-primary text-xs">
                                            {[...Array(5)].map((_, i) => <span key={i} className="material-icons" style={{ fontSize: '14px' }}>star</span>)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-primary/70 text-sm italic line-clamp-4 leading-relaxed tracking-wide relative">
                                    <span className="absolute -top-3 -left-2 text-3xl text-primary/20 material-icons font-serif" style={{ zIndex: -1 }}>format_quote</span>
                                    {review.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-16 container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-primary mb-8 text-center">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'border-primary/50 shadow-md ring-1 ring-primary/10' : 'border-primary/10 hover:border-primary/20 shadow-sm'}`}
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                                >
                                    <span className={`font-semibold text-sm md:text-base pr-8 ${activeFaq === idx ? 'text-secondary' : 'text-primary/70'}`}>
                                        {idx + 1}. {faq.q}
                                    </span>
                                    <span className={`material-icons flex-shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-primary' : 'text-primary/40'}`}>
                                        expand_more
                                    </span>
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === idx ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-primary/70 text-sm md:text-base leading-relaxed border-t border-primary/10 pt-4">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
