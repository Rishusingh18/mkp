"use client";

import React from 'react';
import {
    CheckCircle2,
    Star,
    Quote,
    ChevronDown,
    Building2,
    Users,
    Trophy,
    ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Animated Accordion Component for FAQs ---
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border border-primary/10 rounded-2xl overflow-hidden bg-primary/5 mb-4 hover:border-primary/20 transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
            >
                <span className="font-bold text-primary lg:text-lg">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary/70 shrink-0 ml-4"
                >
                    <ChevronDown size={20} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-5 text-primary/70 leading-relaxed border-t border-primary/5 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background-light pt-12 lg:pt-16 pb-20 overflow-hidden">

            {/* 1. HERO SECTION */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12 lg:mb-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary mb-6 tracking-tight">
                        About Us
                    </h1>
                    <p className="text-primary/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Discover the passion, experience, and leadership behind MKP Packers & Movers. We are dedicated to providing seamless relocation experiences across India and beyond.
                    </p>
                </motion.div>
            </section>

            {/* 2. ABOUT US INTRODUCTION (Customized as requested) */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24 lg:mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary font-bold tracking-widest uppercase text-lg mb-4 block">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                            10+ Years of Relocation Excellence
                        </h2>
                        <div className="space-y-6 text-primary/70 leading-relaxed text-lg">
                            <p>
                                Welcome to MKP Packers & Movers. We have been in the relocation business for <span className="text-primary font-bold">more than 10 years</span>, proudly serving our clients with our team of expert locators, packers, and movers.
                            </p>
                            <p>
                                Based originally out of Varanasi, Uttar Pradesh, we have grown into one of the most reputed and trusted logistics agencies. Whether you are shifting goods within your current city or moving your entire life between cities, our highly qualified and experienced professionals ensure a stress-free transition.
                            </p>
                            <p>
                                We guarantee that from the very beginning to the final delivery, your relocation will be meticulously coordinated and executed by us, ensuring the safe transportation of your goods at highly competitive prices.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-10">
                            <div className="bg-primary p-6 rounded-2xl border border-primary-hover shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                                <Trophy className="text-background-light mb-4" size={32} />
                                <h4 className="text-2xl font-display font-bold text-background-light mb-1">10+</h4>
                                <p className="text-sm font-bold text-background-light/70 uppercase tracking-wide">Years Experience</p>
                            </div>
                            <div className="bg-primary p-6 rounded-2xl border border-primary-hover shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                                <Users className="text-background-light mb-4" size={32} />
                                <h4 className="text-2xl font-display font-bold text-background-light mb-1">Expert</h4>
                                <p className="text-sm font-bold text-background-light/70 uppercase tracking-wide">Movers & Packers</p>
                            </div>
                        </div>

                        {/* GST Certification Badge */}
                        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 transition-colors w-full sm:w-max group cursor-default">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-secondary shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h4 className="text-primary font-bold tracking-wide">Government Approved & Certified</h4>
                                <p className="text-primary/70 text-sm font-mono mt-0.5 font-semibold">GSTIN: 09AMKPP6212B2Z6</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Offset Grid & Image Collage Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block h-full min-h-[600px] xl:min-h-[650px] group cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-3 border border-primary/10 transition-all duration-500 group-hover:-rotate-4 group-hover:scale-[1.02] group-hover:translate-x-2 group-hover:bg-primary/10"></div>
                        <div className="absolute inset-0 bg-primary text-background-light p-10 xl:p-12 rounded-[3rem] shadow-2xl flex flex-col justify-start overflow-hidden transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-3xl group-hover:rotate-1">
                            <div className="relative z-10 shrink-0">
                                <ShieldCheck size={48} className="text-secondary mb-6 group-hover:scale-110 transition-transform duration-500" />
                                <h3 className="text-3xl xl:text-4xl font-display font-bold mb-4 tracking-tight">Uncompromised Quality</h3>
                                <p className="text-background-light/70 text-sm xl:text-base leading-relaxed">
                                    We deal in shifting goods with absolute precision. We employ the trade's best men, trained to pack your household items flawlessly. Our lorry drivers are highly experienced, ensuring they navigate roads perfectly to avoid bumps and deliver your items in pristine condition.
                                </p>
                            </div>
                            
                            {/* Expandable Image Region */}
                            <div className="mt-8 flex-grow relative rounded-2xl overflow-hidden border border-secondary/10 group-hover:border-secondary/30 transition-colors shadow-inner w-full min-h-[200px]">
                                {/* Current main banner, stretches to fill available space */}
                                <img 
                                    src="/mkp-banner.png" 
                                    alt="MKP Relocation Quality Transport" 
                                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Overlay gradient to keep edge contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-4 right-4 bg-secondary/90 backdrop-blur-sm text-primary text-[10px] uppercase tracking-widest px-4 py-2 rounded-full font-bold border border-secondary/50 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-xl">
                                    View Gallery
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* 3. OUR TEAM */}
            <section className="bg-primary/5 py-24 lg:py-32 mb-24 lg:mb-32">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Leadership</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">Our Team</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sushil Kumar Panday", role: "Operations Director", desc: "Directs and controls company operations, providing strategic guidance to ensure MKP achieves its mission and long-term objectives." },
                            { name: "Abhinav Panday", role: "Vision & Strategy", desc: "Sets the long-term goals of the organization, managing the overarching strategy and monitoring its successful implementation." },
                            { name: "Sarvesh Dubey", role: "Planning & Resources", desc: "Creates specific plans to meet company goals, allocating employee resources, delegating responsibilities, and setting realistic timelines." }
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-primary text-background-light border border-primary-hover rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-background-light/5 rounded-bl-full group-hover:bg-background-light/10 transition-colors duration-300"></div>
                                <div className="w-20 h-20 rounded-2xl bg-background-light border border-primary/10 mb-6 flex items-center justify-center shadow-md relative z-10 group-hover:scale-110 transition-transform">
                                    <span className="text-3xl font-display font-bold text-primary">{member.name.charAt(0)}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-background-light mb-1 font-display">{member.name}</h3>
                                <p className="text-secondary font-bold text-sm tracking-wide uppercase mb-4">{member.role}</p>
                                <p className="text-background-light/80 leading-relaxed">
                                    {member.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* 4. VISION & MISSION */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24 lg:mb-32 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-primary text-background-light rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl border border-primary-hover hover:-translate-y-2 hover:shadow-3xl transition-all duration-300 group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-background-light/5 rounded-bl-full group-hover:bg-background-light/10 transition-colors duration-500 z-0"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-tr-full z-0 group-hover:bg-secondary/20 transition-colors duration-500"></div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <Building2 size={48} className="text-secondary mx-auto mb-8" />
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Our Vision & Mission</h2>
                        <p className="text-background-light/80 text-lg md:text-xl leading-relaxed mb-8">
                            Our vision is to help our customers in the absolute best manner possible. This means getting things done exclusively to the satisfaction of our clients. We believe satisfied customers naturally become repeat customers, which drives our growth.
                        </p>
                        <p className="text-secondary font-display text-2xl italic leading-relaxed">
                            "We never compromise on the quality of our services. We take utter care of your goods, ensuring they are delivered to the destination in perfect shape and condition—zero damage, guaranteed."
                        </p>
                    </div>
                </motion.div>
            </section>


            {/* 5. TESTIMONIALS (Reused from Services dark theme) */}
            <section className="bg-primary text-background-light py-24 lg:py-32 mb-24 lg:mb-32 border-y border-primary-hover">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Client Feedback</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold">What They Say</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Gaurav Singh", text: "They delivered it on time as well as taken good care of the things. Staff behaviour is also good. Overall a very good experience, best in class." },
                            { name: "Ashwani Yadav", text: "Their service is nice and I'm really pleased with your service & good behavior staff of the packers movers." },
                            { name: "Riya Chaudhary", text: "Their service allows people to shift hassle-free. They pick things and move them with care. Carefully packed stuff and great service." },
                            { name: "Pankaj Agrawal", text: "I shifted to Noida with the help of MKP. The representatives connected me with genuine service providers who delivered fast services. No loss!" },
                            { name: "Dabbu Marwari", text: "I have a very good experience with the packers and movers, their work quality is supreme and well organized." }
                        ].map((test, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-primary-hover/50 p-8 rounded-3xl border border-background-light/10 relative hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 hover:bg-primary-hover/80 overflow-hidden group ${index === 3 ? 'md:col-span-2 lg:col-span-1' : ''} ${index === 4 ? 'lg:col-span-2' : ''}`}
                            >
                                <Quote size={40} className="text-secondary/20 absolute top-8 right-8" />
                                <div className="flex gap-1 mb-6 text-secondary">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-background-light/80 italic leading-relaxed mb-6 relative z-10">"{test.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary">
                                        {test.name.charAt(0)}
                                    </div>
                                    <h4 className="font-bold font-display tracking-wide">{test.name}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. FAQs (Reused from Services) */}
            <section className="max-w-3xl mx-auto px-6 md:px-12 mb-12">
                <div className="text-center mb-12">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Information</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    <FAQItem
                        question="Are you properly licensed?"
                        answer="Yes, we are a fully licensed and registered entity with a valid GSTIN number for absolute transparent and compliant corporate operations."
                    />
                    <FAQItem
                        question="What moving services do you offer?"
                        answer="We offer a comprehensive suite including home relocation, corporate relocation, car carrier services, loading & unloading, packing & unpacking, and unpacking & rearranging services."
                    />
                    <FAQItem
                        question="Why should I choose MKP Packers & Movers?"
                        answer="We are a reliable name in the logistics field with a professionally trained team. We use the best quality multi-layered packaging materials and closed containers to ensure absolute zero-risk transportation of your valuable goods."
                    />
                    <FAQItem
                        question="How much notice do you need before shifting?"
                        answer="To ensure the highest quality of service and fleet allocation, we require at least 24 hours of advance notice before you want your goods to be relocated."
                    />
                    <FAQItem
                        question="How do I know what I can't take with me?"
                        answer="Certain hazardous or perishable items are restricted. Once you book, our dedicated relocation manager will assist you directly in identifying restricted items during the pre-move survey."
                    />
                </div>
            </section>

        </div>
    );
}
