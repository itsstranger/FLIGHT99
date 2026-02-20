'use client';

import React from 'react';
import { Moon, Calendar, MapPin, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useModal } from '@/context/ModalContext';

const HajjUmrah = () => {
    const { openModal } = useModal();
    return (
        <div className="pt-20 min-h-screen bg-white">
            {/* Hero */}
            <section className="relative h-[500px] flex items-center justify-center bg-emerald-950 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-0" />
                {/* Decorative Pattern Overlay can be added here */}
                <div className="relative z-10 text-center px-4">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-800/80 text-emerald-100 text-sm font-semibold mb-6 border border-emerald-700">Spiritual Journey</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Hajj & Umrah Packages</h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto">Complete guidance and premium arrangements for your sacred pilgrimage.</p>
                </div>
            </section>

            <section className="py-20 container mx-auto px-4 md:px-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                    <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                        <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm font-semibold mb-6 w-fit border border-emerald-100">
                            Sacred Pilgrimage
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Embark on Your Spiritual Journey with Peace of Mind</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Focus on your worship while we handle the logistics. FLIGHT99 offers comprehensive Hajj and Umrah services tailored to your needs.
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
                            src="https://images.unsplash.com/photo-1565552629477-ff14d7db481f?q=80&w=1974&auto=format&fit=crop"
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
