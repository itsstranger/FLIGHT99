'use client';

import React from 'react';
import { FileText, CheckCircle, Globe } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useModal } from '@/context/ModalContext';

const VisaServices = () => {
    const { openModal } = useModal();
    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            {/* Cinematic Hero */}
            <div className="relative pt-10 pb-8 md:pt-16 md:pb-12 lg:pt-20 lg:pb-16 -mt-20 overflow-hidden flex items-center justify-center bg-[#0f172a] rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl">
                {/* Advanced Glowing Orbs (Golden Ratio positioned) */}
                <div className="absolute top-0 right-0 w-[61.8vw] max-w-[800px] aspect-square bg-blue-500/20 rounded-full blur-[100px] md:blur-[160px] -translate-y-[38.2%] translate-x-[38.2%] pointer-events-none mix-blend-screen mix-blend-color-dodge"></div>
                <div className="absolute bottom-0 left-0 w-[38.2vw] max-w-[600px] aspect-square bg-purple-500/20 rounded-full blur-[80px] md:blur-[120px] translate-y-[16.18%] -translate-x-[16.18%] pointer-events-none mix-blend-screen mix-blend-color-dodge"></div>

                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

                <div className="container mx-auto px-6 md:px-8 relative z-10 text-center flex flex-col items-center pt-20">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 font-bold text-xs md:text-sm tracking-[0.1618em] uppercase mb-[2.618vh] shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        Global Coverage
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1] drop-shadow-2xl">
                        Visa Services
                    </h1>
                    <p className="text-[1rem] md:text-[1.618rem] text-white/80 max-w-[61.8%] min-w-[300px] mx-auto font-secondary leading-[1.618] font-medium drop-shadow-md">
                        Hassle-free visa processing for over 50 countries. We handle the paperwork so you can travel with peace of mind.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                    <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                        <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6 w-fit">
                            Global Coverage
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Expert Visa Assistance for All Destinations</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Planning an international trip? Don't let visa complexities hold you back.
                            FLIGHT99 provides comprehensive visa services for tourists and business travelers.
                            Whether you're heading to Dubai, Europe (Schengen), USA, UK, or anywhere else,
                            our team ensures a smooth and error-free application process.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                "Document pre-verification to minimize rejection",
                                "End-to-end application filing support",
                                "Appointment scheduling & interview prep",
                                "Real-time application tracking"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full md:w-auto shadow-lg shadow-primary/20"
                            onClick={() => openModal('visa')}
                        >
                            Get Visa Assistance Now
                        </Button>
                    </div>
                    <div className="md:w-1/2 bg-gray-100 relative min-h-[400px]">
                        <img
                            src="https://images.unsplash.com/photo-1554463529-e27854014799?q=80&w=2070&auto=format&fit=crop"
                            alt="Passport and Visa"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <p className="text-white text-lg font-medium">"Traveling keeps you young, does it not?"</p>
                        </div>
                    </div>
                </div>
                <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose FLIGHT99 for Visas?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <div>
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><FileText className="w-6 h-6" /></div>
                            <h3 className="font-semibold text-gray-900">Expert Guidance</h3>
                            <p className="text-sm text-gray-500 mt-2">Our experts stay updated with the latest immigration rules for all major countries.</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-6 h-6" /></div>
                            <div className="text-green-600 font-bold text-2xl mb-1">99.8%</div>
                            <h3 className="font-semibold text-gray-900">Success Rate</h3>
                            <p className="text-sm text-gray-500 mt-2">Minimize rejection risk with our thorough document pre-check process.</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><FileText className="w-6 h-6" /></div>
                            <h3 className="font-semibold text-gray-900">End-to-End Support</h3>
                            <p className="text-sm text-gray-500 mt-2">From application form filling to interview preparation, we cover it all.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisaServices;
