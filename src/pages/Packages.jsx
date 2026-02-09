import React, { useState } from 'react';
import { PACKAGES } from '../data/mockData';
import PackageCard from '../components/PackageCard';
import { Filter } from 'lucide-react';

const Packages = () => {
    const [filter, setFilter] = useState('All');

    const filteredPackages = filter === 'All'
        ? PACKAGES
        : PACKAGES.filter(p => p.theme === filter);

    const themes = ['All', 'Luxury', 'Adventure', 'Honeymoon', 'Culture'];

    return (
        <div className="pt-24 pb-20 min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">Our Holiday Collections</h1>
                    <p className="text-gray-500 max-w-2xl">Browse our handpicked itineraries designed for every type of traveler.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar Filter */}
                    <div className="w-full md:w-64 shrink-0 bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold text-lg">
                            <Filter className="w-5 h-5" /> Filters
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold mb-3 text-sm uppercase text-gray-500 tracking-wider">Theme</h4>
                                <div className="space-y-2">
                                    {themes.map(theme => (
                                        <label key={theme} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filter === theme ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                                                {filter === theme && <div className="w-2 h-2 rounded-full bg-white" />}
                                            </div>
                                            <input
                                                type="radio"
                                                name="theme"
                                                className="hidden"
                                                checked={filter === theme}
                                                onChange={() => setFilter(theme)}
                                            />
                                            <span className={`text-sm group-hover:text-primary transition-colors ${filter === theme ? 'font-semibold text-primary' : 'text-gray-600'}`}>{theme}</span>
                                        </label>
                                    ))}
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
                                <button onClick={() => setFilter('All')} className="text-primary font-semibold mt-2 hover:underline">Clear Filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packages;
