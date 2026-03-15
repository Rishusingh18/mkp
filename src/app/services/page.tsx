"use client";

import { 
    Box, 
    Home, 
    Building2, 
    Car, 
    ArrowDownToLine,
    ArrowUpFromLine, 
    CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background-light pt-24 lg:pt-32 pb-20 overflow-hidden">
            
            {/* 1. HERO SECTION */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 lg:mb-32 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary mb-6 tracking-tight">
                        Our Services
                    </h1>
                    <p className="text-primary/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        We offer premium packing and moving services executed by a team of qualified, trained, and experienced professionals. Ensuring safe transportation of your most valuable assets with elite care.
                    </p>
                </motion.div>
            </section>


            {/* 3. CORE SERVICES GRID (The 6 Main Items) */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24 lg:mb-32">
                <div className="text-center mb-16">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Comprehensive Portfolio</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">Core Services</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {[
                        { icon: Home, title: "Home Relocation", desc: "Carry out safe packaging to keep your goods intact. We make use of high quality packaging materials that protect under all adverse conditions." },
                        { icon: Building2, title: "Corporate Relocation", desc: "Designed to meet corporate needs, delivering customized relocation services that improve experience and drastically reduce risk exposure." },
                        { icon: Car, title: "Car Carrier Services", desc: "Cost-effective and personalized car transportation ensuring proper delivery and absolute safety of your vehicles." },
                        { icon: ArrowUpFromLine, title: "Loading Services", desc: "Well thought-out, organized, and dependable loading preventing any kind of scratches or breakage during the lifting process." },
                        { icon: Box, title: "Packing Services", desc: "Professional packing teams ensuring delicate electronics, artwork, and furniture are secured for long-haul journeys." },
                        { icon: ArrowDownToLine, title: "Unpacking & Rearranging", desc: "We offer complete unpacking and rearranging services to make settling in effortless. Our personnel safely handle goods till the desired destination." }
                    ].map((service, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-primary border border-primary-hover rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -z-10 group-hover:bg-secondary/10 transition-colors"></div>
                            
                            <service.icon size={40} className="text-secondary mb-6" />
                            <h3 className="text-2xl font-bold text-background-light mb-4 font-display">{service.title}</h3>
                            <p className="text-background-light/70 leading-relaxed">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}

                </div>
            </section>


        </div>
    );
}
