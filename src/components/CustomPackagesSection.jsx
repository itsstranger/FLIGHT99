'use client';

import React from 'react';
import { Compass, Sparkles, PlaneTakeoff } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

const customizationSteps = [
    {
        id: 'step-1',
        title: 'Share Your Vision',
        desc: 'Tell us about your dream destination, travel dates, and personal preferences to start the journey.',
        icon: Compass,
        step: '01'
    },
    {
        id: 'step-2',
        title: 'Expert Curation',
        desc: 'Our travel experts design a beautifully tailored itinerary packed with handpicked experiences and hotels.',
        icon: Sparkles,
        step: '02'
    },
    {
        id: 'step-3',
        title: 'Seamless Journey',
        desc: 'Review your custom schedule, approve the final details, and pack your bags while we handle the bookings.',
        icon: PlaneTakeoff,
        step: '03'
    }
];

export default function CustomPackagesSection() {
    const { openModal } = useModal();

    return (
        <section className="relative py-24 bg-primary overflow-hidden">
            {/* Background pattern/accents to give it depth */}
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#e6a810]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-stretch justify-between mb-12 gap-6">
                    <div className="max-w-3xl flex-1">
                        <p className="text-[#e6a810] font-bold tracking-widest uppercase text-sm mb-4">Our Packages</p>
                        <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-white leading-tight font-heading uppercase">
                            Let's Design Your Customized<br className="hidden md:block" /> Package With FLIGHT99
                        </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between shrink-0 mt-4 md:mt-0 py-1 gap-6 md:gap-0">
                        <button
                            onClick={() => openModal('holiday')}
                            className="bg-[#e6a810] text-[#32315c] px-6 py-3 lg:px-6 lg:py-3.5 rounded-xl font-black tracking-widest uppercase border-2 border-[#e6a810] transition-all shadow-lg text-xs lg:text-sm flex items-center justify-center gap-2 w-full sm:w-auto mt-auto"
                        >
                            Request Custom
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {customizationSteps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.id} className="relative group p-8 md:p-10 rounded-[28px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-2xl backdrop-blur-sm -translate-y-2 hover:-translate-y-4">
                                {/* Large background step number */}
                                <div className="absolute top-2 right-4 text-[120px] leading-none font-black text-white/[0.04] select-none font-heading group-hover:text-white/[0.08] transition-colors duration-500">
                                    {step.step}
                                </div>

                                <div className="w-16 h-16 rounded-2xl bg-[#e6a810]/15 flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 group-hover:bg-[#e6a810]/25 transition-all duration-500 shadow-inner">
                                    <Icon className="w-8 h-8 text-[#e6a810]" strokeWidth={2.5} />
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black text-white mb-4 tracking-wide font-heading uppercase">{step.title}</h3>
                                    <p className="text-white/60 font-medium leading-relaxed font-secondary text-sm md:text-base">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-[#e6a810] to-yellow-300 group-hover:w-full transition-all duration-700 ease-out"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
