'use client';

import React, { useState, Suspense } from 'react';
import { usePackages } from '@/context/PackageContext';
import PackageCard from '@/components/PackageCard';
import { Filter, X, ChevronDown, SlidersHorizontal, Search } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

const PackagesContent = () => {
    const searchParams = useSearchParams();
    const { packages } = usePackages();
    const { openModal } = useModal();
    const initialType = searchParams.get('type') || 'All';
    const initialDestination = searchParams.get('destination') || '';

    const [priceRange, setPriceRange] = useState(150000); // Default max price
    const [typeFilter, setTypeFilter] = useState(initialType === 'all' ? 'All' : initialType.charAt(0).toUpperCase() + initialType.slice(1));
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPackages = packages.filter(p => {
        const matchesPrice = p.price <= priceRange;
        const matchesType = typeFilter === 'All' || p.type?.toLowerCase() === typeFilter.toLowerCase();
        const matchesDest = !initialDestination || p.location.toLowerCase().includes(initialDestination.toLowerCase()) || p.title.toLowerCase().includes(initialDestination.toLowerCase());
        const matchesQuery = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesPrice && matchesType && matchesDest && matchesQuery;
    });

    const types = ['All', 'International', 'Domestic'];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-16 selection:bg-primary/20">
            {/* Cinematic Hero */}
            <div className="relative pt-10 pb-8 md:pt-16 md:pb-12 lg:pt-20 lg:pb-16 overflow-hidden flex items-center justify-center bg-[#0f172a] rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl z-10">
                {/* Advanced Glowing Orbs */}
                <div className="absolute top-0 right-0 w-[50vw] max-w-[600px] aspect-square bg-[#e6a810]/20 rounded-full blur-[100px] md:blur-[140px] -translate-y-[30%] translate-x-[30%] pointer-events-none mix-blend-screen mix-blend-color-dodge"></div>
                <div className="absolute bottom-0 left-0 w-[30vw] max-w-[400px] aspect-square bg-blue-500/30 rounded-full blur-[80px] md:blur-[100px] translate-y-[10%] -translate-x-[10%] pointer-events-none mix-blend-screen mix-blend-color-dodge"></div>

                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

                <div className="container mx-auto px-6 md:px-8 relative z-10 text-center flex flex-col items-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#e6a810] font-bold text-xs md:text-sm tracking-[0.1618em] uppercase mb-[2vh] shadow-[0_0_20px_rgba(230,168,16,0.2)]">
                        Explore the World
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1] drop-shadow-2xl">
                        Our Holiday Collections
                    </h1>
                    <p className="text-[1rem] md:text-[1.2rem] text-white/80 max-w-[61.8%] min-w-[300px] mx-auto font-secondary leading-[1.618] font-medium drop-shadow-md">
                        Browse our handpicked itineraries designed for every type of traveler.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8 relative z-30 flex-1">
                {/* Header & Search */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-end gap-6 border-b border-gray-200 pb-6">
                    {/* Integrated Search & Filter UI */}
                    <div className="w-full md:w-auto flex md:justify-end flex-grow max-w-2xl">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search packages, destinations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/70 backdrop-blur-md border border-gray-200 text-gray-900 pl-11 pr-14 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-sm font-medium"
                            />
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${showFilters ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                                aria-label="Toggle Filters"
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                        <button
                            onClick={() => openModal('customize')}
                            className="hidden md:flex ml-4 items-center gap-2 whitespace-nowrap bg-white border border-gray-200 text-gray-700 hover:text-primary hover:border-primary/30 px-5 py-3.5 rounded-2xl font-semibold transition-all shadow-sm hover:shadow"
                        >
                            Customize Trip
                        </button>
                    </div>
                </div>

                {/* Mobile Customize Button */}
                <div className="md:hidden mb-6 flex justify-end">
                    <button
                        onClick={() => openModal('customize')}
                        className="flex items-center gap-2 text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full"
                    >
                        + Customize Package
                    </button>
                </div>

                {/* Horizontal Filters (YouTube Style) */}
                {showFilters && (
                    <div className="flex flex-col gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">

                        {/* Top Row: Scrollable Type Pills */}
                        <div className="flex items-center overflow-x-auto pb-2 scrollbar-hide gap-3 w-full">
                            {types.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTypeFilter(t)}
                                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all shrink-0 ${typeFilter === t
                                        ? 'bg-gray-900 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        {/* Bottom Row: Additional Controls (Desktop inline, mobile stacked) */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-white/40">
                            {/* Price Range */}
                            <div className="flex items-center gap-4 flex-1 max-w-md">
                                <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">Max Price: <span className="text-primary">₹{priceRange.toLocaleString()}</span></span>
                                <div className="flex-1">
                                    <input
                                        type="range"
                                        min="10000"
                                        max="200000"
                                        step="5000"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                                    />
                                </div>
                            </div>

                            {/* Note: Duration filtering logic is currently UI-only in the original code.
                            Adding a simple UI placeholder here to maintain visual parity with requested functionality. */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-600">Duration:</span>
                                <select className="input-premium py-1.5 px-3 text-sm bg-gray-50 border-transparent">
                                    <option>Any Duration</option>
                                    <option>3-5 Days</option>
                                    <option>6-10 Days</option>
                                    <option>10+ Days</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Grid */}
                <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPackages.map(pkg => (
                            <PackageCard key={pkg.id} packageData={pkg} />
                        ))}
                    </div>
                    {filteredPackages.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No packages found for this category.</p>
                            <button onClick={() => setTypeFilter('All')} className="text-primary font-semibold mt-2 hover:underline">Clear Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Packages = () => {
    return (
        <Suspense fallback={<div className="min-h-screen pt-24 text-center">Loading packages...</div>}>
            <PackagesContent />
        </Suspense>
    );
};

export default Packages;
