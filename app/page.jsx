'use client'; // Client Component due to hooks

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane, Calendar, ShieldCheck, Map, ArrowRight, TrendingUp, Users, Globe2 } from 'lucide-react';
import { usePackages } from '@/context/PackageContext';
import PackageCard from '@/components/PackageCard';
import Button from '@/components/ui/Button';
import ServiceBar from '@/components/ServiceBar';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

// Helper to get asset path
const getAssetPath = (path) => `/assets/${path.split('/').pop()}`;

const Home = () => {
    const router = useRouter();
    const { packages } = usePackages();
    const [searchType, setSearchType] = useState('international');
    const [destination, setDestination] = useState('');
    const { scrollY } = useScroll();
    const yBg = useTransform(scrollY, [0, 500], [0, 200]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        params.set('type', searchType);
        if (destination) params.set('destination', destination);
        router.push(`/packages?${params.toString()}`);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 flex flex-col items-center">
                {/* Parallax Background - Fixed Height Banner */}
                <motion.div style={{ y: yBg }} className="absolute top-0 left-0 right-0 h-[500px] z-0 overflow-hidden rounded-b-[1.5rem] md:rounded-b-[3rem] bg-gray-900">
                    <img
                        src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0"
                        alt="Travel Background"
                        className="w-full h-full object-cover object-center"
                    />

                    {/* Dark Overlay for Text Contrast */}
                    <div className="absolute inset-0 bg-black/30 z-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8 flex flex-col items-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg text-center">
                            The World is Waiting. <br />
                            <span className="text-secondary italic font-serif">Go Get It.</span>
                        </h1>
                        <p className="text-lg text-gray-100 max-w-2xl mx-auto drop-shadow-md text-center">
                            Discover exclusive deals on flights, premium holiday packages, and hassle-free visa services.
                        </p>
                    </motion.div>

                    {/* Enhanced Searchology Engine */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="w-full max-w-5xl"
                    >
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 overflow-hidden border border-white/40 p-5 md:p-8">
                            <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-end">
                                {/* Type Toggle */}
                                <div className="flex w-full md:w-auto bg-gray-100 p-1 rounded-lg shrink-0">
                                    {['International', 'Domestic'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setSearchType(type.toLowerCase())}
                                            className={`flex-1 md:flex-none px-6 py-2.5 rounded-md text-sm font-bold transition-all ${searchType === type.toLowerCase()
                                                ? 'bg-white text-primary shadow-sm'
                                                : 'text-gray-500 hover:text-gray-900'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>

                                {/* Destination Input */}
                                <div className="flex-1 w-full">
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2 tracking-wider">Destination</label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder={`Search ${searchType} destinations...`}
                                            className="input-premium pl-11 w-full text-base"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        />
                                        <Map className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 group-focus-within:text-primary transition-colors" />
                                    </div>
                                </div>

                                {/* Search Button */}
                                <Button
                                    size="lg"
                                    className="h-[50px] w-full md:w-auto shadow-lg shadow-primary/30 hover:shadow-primary/50 shrink-0 md:min-w-[140px]"
                                    variant="primary"
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </div>
                        </div>

                        {/* Service Bar */}
                        <div className="mt-8">
                            <ServiceBar />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Dynamic Trust Stats Section */}
            <section className="py-16 bg-white relative z-20 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {[
                            { icon: Globe2, value: "25+", label: "Years Experience", desc: "Serving the industry since 1999." },
                            { icon: ShieldCheck, value: "100%", label: "Trustability", desc: "Transparent dealings & secure payments." },
                            { icon: Users, value: "Genuine", label: "Service", desc: "Real support by real experts." },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="px-8 py-4 flex flex-col items-center text-center group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-primary">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-extrabold text-primary mb-1">{item.value}</h3>
                                <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">{item.label}</p>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Grid */}
            <section className="py-20 bg-gray-50/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 text-center md:text-left">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Trending Destinations</h2>
                            <p className="text-gray-500">Curated packages that are selling out fast.</p>
                        </div>
                        <Link href="/packages">
                            <Button variant="ghost" className="hidden md:inline-flex">View All Packages <ArrowRight className="ml-2 w-4 h-4" /></Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.slice(0, 3).map((pkg) => (
                            <PackageCard key={pkg.id} packageData={pkg} />
                        ))}
                    </div>
                    <div className="mt-8 text-center md:hidden">
                        <Link href="/packages">
                            <Button variant="outline" className="w-full">View All Packages</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Lead Magnet / Newsletter */}
            <section className="py-20 bg-primary text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl mix-blend-screen" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Exclusive Travel Deals</h2>
                    <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">Join our newsletter and receive up to 50% off on your first booking. No spam, just adventures.</p>

                    <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 w-full px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm"
                        />
                        <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 shrink-0">Subscribe</Button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Home;
