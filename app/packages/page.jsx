'use client';

import React, { useState, Suspense } from 'react';
import { usePackages } from '@/context/PackageContext';
import PackageCard from '@/components/PackageCard';
import { Filter, X, ChevronDown } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

const PackagesContent = () => {
    const searchParams = useSearchParams();
    const { packages } = usePackages();
    const initialType = searchParams.get('type') || 'All';
    const initialDestination = searchParams.get('destination') || '';

    const [priceRange, setPriceRange] = useState(150000); // Default max price
    const [typeFilter, setTypeFilter] = useState(initialType === 'all' ? 'All' : initialType.charAt(0).toUpperCase() + initialType.slice(1));
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const filteredPackages = packages.filter(p => {
        const matchesPrice = p.price <= priceRange;
        const matchesType = typeFilter === 'All' || p.type?.toLowerCase() === typeFilter.toLowerCase();
        const matchesDest = !initialDestination || p.location.toLowerCase().includes(initialDestination.toLowerCase()) || p.title.toLowerCase().includes(initialDestination.toLowerCase());

        return matchesPrice && matchesType && matchesDest;
    });

    const types = ['All', 'International', 'Domestic'];

    return (
        <div className="pt-24 pb-20 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">Our Holiday Collections</h1>
                    <p className="text-gray-500 max-w-2xl">Browse our handpicked itineraries designed for every type of traveler.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-8 items-start relative">
                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        className="md:hidden flex items-center justify-between w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 font-bold text-gray-900 relative z-10"
                    >
                        <span className="flex items-center gap-2"><Filter className="w-5 h-5" /> Filters</span>
                        {isMobileFiltersOpen ? <X className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>

                    {/* Sidebar Filter */}
                    <div className={`w-full md:w-64 shrink-0 bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:sticky md:top-24 mt-[-1rem] md:mt-0 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
                        <div className="hidden md:flex items-center gap-2 mb-6 text-gray-900 font-bold text-lg">
                            <Filter className="w-5 h-5" /> Filters
                        </div>

                        <div className="space-y-8">
                            {/* Type Filter */}
                            <div>
                                <h4 className="font-semibold mb-3 text-sm uppercase text-gray-500 tracking-wider">Destination Type</h4>
                                <div className="space-y-2">
                                    {types.map(t => (
                                        <label key={t} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${typeFilter === t ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                                                {typeFilter === t && <div className="w-2 h-2 rounded-full bg-white" />}
                                            </div>
                                            <input
                                                type="radio"
                                                name="type"
                                                className="hidden"
                                                checked={typeFilter === t}
                                                onChange={() => setTypeFilter(t)}
                                            />
                                            <span className={`text-sm group-hover:text-primary transition-colors ${typeFilter === t ? 'font-semibold text-primary' : 'text-gray-600'}`}>{t}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter (Volume Adjuster Style) */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-semibold text-sm uppercase text-gray-500 tracking-wider">Max Price</h4>
                                    <span className="text-sm font-bold text-primary">₹{priceRange.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="10000"
                                    max="200000"
                                    step="5000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>₹10k</span>
                                    <span>₹2L+</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-3 text-sm uppercase text-gray-500 tracking-wider">Duration</h4>
                                <div className="space-y-2">
                                    {['Any', '3-5 Days', '6-10 Days', '10+ Days'].map((d, i) => (
                                        <label key={i} className="flex items-center gap-3 cursor-pointer">
                                            <div className="w-5 h-5 rounded border border-gray-300 bg-white" />
                                            <span className="text-sm text-gray-600">{d}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
