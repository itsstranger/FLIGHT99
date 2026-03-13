'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Calendar, Clock, CheckCircle, Share2, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import AccordionItem from '@/components/ui/AccordionItem';
import { useModal } from '@/context/ModalContext';
import { usePackages } from '@/context/PackageContext';

const PackageDetails = ({ params }) => {
    // In Next.js 15, params is a Promise that needs to be unwrapped.
    const resolvedParams = React.use(params);
    const id = resolvedParams?.id;
    const { packages, loading } = usePackages();

    // Safety check - find package
    const pkg = packages.find(p => String(p.id) === String(id));

    const { openModal } = useModal();
    const [activeAccordion, setActiveAccordion] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!id || loading) return <div className="pt-32 text-center">Loading...</div>;
    if (!pkg) return <div className="pt-32 text-center">Package not found</div>;

    return (
        <div className="pt-20 min-h-screen bg-gray-50 pb-20">
            {/* Hero Banner */}
            <div className="relative h-[60vh] md:h-[500px]">
                <img src={pkg.image_url || pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                            <div>
                                <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">{pkg.theme} Theme</span>
                                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{pkg.title}</h1>
                                <div className="flex items-center gap-6 text-gray-200">
                                    <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {pkg.location}</span>
                                    <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> {pkg.duration}</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="white" size="icon" className="rounded-full"><Share2 className="w-5 h-5" /></Button>
                                <Button variant="white" size="icon" className="rounded-full"><Heart className="w-5 h-5" /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">{pkg.description}</p>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {(pkg.inclusions || []).map((inc, i) => (
                                    <div key={i} className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                        <span>{inc}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Itinerary */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Itinerary</h2>
                            <div className="space-y-4">
                                {(pkg.itinerary || []).map((day, idx) => (
                                    <AccordionItem
                                        key={idx}
                                        day={day.day}
                                        title={day.title}
                                        description={day.description}
                                        isOpen={activeAccordion === idx}
                                        onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex justify-between items-center mb-6 border-b pb-6">
                                <div>
                                    <span className="text-sm text-gray-400 block">Starting from</span>
                                    <span className="text-3xl font-bold text-primary">₹{pkg.price.toLocaleString()}</span>
                                    <span className="text-sm text-gray-400"> /person</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Travel Date</label>
                                    <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travellers</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="50"
                                        defaultValue="1"
                                        placeholder="e.g. 2"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            <Button
                                className="w-full mb-3"
                                size="lg"
                                onClick={() => openModal('booking', { message: `I am interested in ${pkg.title}` })}
                            >
                                Book This Package
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => openModal('customize', { message: `I want to customize ${pkg.title}` })}
                            >
                                Customize Trip
                            </Button>

                            <p className="mt-4 text-xs text-center text-gray-500">
                                *Price subject to seasonality and availability.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
