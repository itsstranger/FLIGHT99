'use client';

import React from 'react';
import { Moon, Calendar, MapPin, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useModal } from '@/context/ModalContext';

const HajjUmrah = () => {
    const { openModal } = useModal();
    return (
        <div className="pt-20 min-h-screen bg-white">
            {/* Cinematic Hero */}
            <div className="relative pt-10 pb-8 md:pt-16 md:pb-12 lg:pt-20 lg:pb-16 overflow-hidden flex items-center justify-center bg-[#064e3b] rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl">
                {/* Advanced Glowing Orbs (Golden Ratio positioned) */}
                <div className="absolute top-0 right-0 w-[61.8vw] max-w-[800px] aspect-square bg-[#e6a810]/20 rounded-full blur-[100px] md:blur-[160px] -translate-y-[38.2%] translate-x-[38.2%] pointer-events-none mix-blend-screen mix-blend-color-dodge"></div>
                <div className="absolute bottom-0 left-0 w-[38.2vw] max-w-[600px] aspect-square bg-[#34d399]/20 rounded-full blur-[80px] md:blur-[120px] translate-y-[16.18%] -translate-x-[16.18%] pointer-events-none mix-blend-screen mix-blend-color-dodge"></div>

                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

                <div className="container mx-auto px-6 md:px-8 relative z-10 text-center flex flex-col items-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#e6a810] font-bold text-xs md:text-sm tracking-[0.1618em] uppercase mb-[2.618vh] shadow-[0_0_20px_rgba(230,168,16,0.2)]">
                        Spiritual Journey
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1] drop-shadow-2xl">
                        Hajj & Umrah
                    </h1>
                    <p className="text-[1rem] md:text-[1.618rem] text-white/80 max-w-[61.8%] min-w-[300px] mx-auto font-secondary leading-[1.618] font-medium drop-shadow-md">
                        Complete guidance and premium arrangements for your sacred pilgrimage.
                    </p>
                </div>
            </div>

            <section className="py-20 container mx-auto px-4 md:px-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                    <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                        <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm font-semibold mb-6 w-fit border border-emerald-100">
                            Sacred Pilgrimage
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Embark on Your Spiritual <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#e6a810]">Journey</span> with Peace of Mind</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Focus on your worship while we handle the logistics. FLIGHT99 Travel Enterprises offers comprehensive Hajj and Umrah services tailored to your needs.
                            From visa processing and flight bookings to comfortable accommodation near the Haram, our dedicated team ensures a hassle-free experience.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                "Ministry approved Hajj & Umrah service provider",
                                "Premium hotels within walking distance of Haram",
                                "Complete ground transport & Ziyarat arrangements",
                                "24/7 Local support in Makkah & Madina"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full md:w-auto shadow-lg shadow-emerald-900/20 bg-emerald-700 hover:bg-emerald-800 border-emerald-700 text-white"
                            onClick={() => openModal('hajj')}
                        >
                            Start Your Journey
                        </Button>
                    </div>
                    <div className="md:w-1/2 bg-gray-100 relative min-h-[400px]">
                        <img
                            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop"
                            alt="Kaaba Makkah"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <p className="text-white text-lg font-medium">"Talbiyah: Labbayk Allahumma Labbayk"</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-emerald-700">
                            <Moon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Ramadan Packages</h3>
                        <p className="text-sm text-gray-600">Special packages for the blessed month with spiritual guidance.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm">
                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-700">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Custom Itineraries</h3>
                        <p className="text-sm text-gray-600">Combine Umrah with holidays in Dubai, Turkey or Jordan.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm">
                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-700">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Group Departures</h3>
                        <p className="text-sm text-gray-600">Fixed departure dates with guided groups for first-timers.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HajjUmrah;
