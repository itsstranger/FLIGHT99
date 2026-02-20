'use client';

import React, { useState, Suspense } from 'react';
import { usePackages } from '@/context/PackageContext';
import PackageCard from '@/components/PackageCard';
import { Filter, X, ChevronDown } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

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

                {/* Horizontal Filters (YouTube Style) */}
                <div className="flex flex-col gap-4 mb-8">

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
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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
