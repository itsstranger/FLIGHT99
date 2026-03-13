'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePackages } from '@/context/PackageContext';
import { useEnquiries } from '@/context/EnquiryContext';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import {
    Plus, Edit, Trash2, X, Upload, Loader2, LayoutGrid, List, Search,
    LogOut, Package as PackageIcon, Users, LayoutDashboard, Settings,
    TrendingUp, MapPin, CheckCircle2, CircleDashed, ChevronRight, Menu, Image as ImageIcon, MessageCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { processImage } from '@/lib/imageProcessor';
import PackageCard from '@/components/PackageCard';
import NextImage from 'next/image';

const AdminDashboard = () => {
    const { packages, addPackage, updatePackage, deletePackage } = usePackages();
    const { enquiries, updateEnquiryStatus, deleteEnquiry } = useEnquiries();
    const { session, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPackage, setCurrentPackage] = useState(null);

    const { settings, updateSettings } = useSettings();
    const [settingsForm, setSettingsForm] = useState(settings || {});
    const [isSavingSettings, setIsSavingSettings] = useState(false);

    useEffect(() => {
        if (settings) setSettingsForm(settings);
    }, [settings]);

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setIsSavingSettings(true);
        await updateSettings(settingsForm);
        setIsSavingSettings(false);
        alert('Global Settings synced thoroughly!');
    };

    // UI State
    const [activeMenu, setActiveMenu] = useState('dashboard'); // 'dashboard', 'packages', 'enquiries'
    const [viewMode, setViewMode] = useState('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [enquiryFilter, setEnquiryFilter] = useState('all');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!authLoading && !session) {
            router.push('/admin/login');
        }
    }, [session, authLoading, router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    const handleOpenModal = (pkg = null) => {
        setCurrentPackage(pkg);
        setIsModalOpen(true);
    };

    const handleDeletePackage = (id) => {
        if (confirm('Are you sure you want to delete this package?')) {
            deletePackage(id);
        }
    };

    const filteredPackages = packages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredEnquiries = enquiries
        .filter(enq => enq.service_type !== 'general_contact')
        .filter(enq => (enquiryFilter === 'all' || enq.service_type === enquiryFilter))
        .filter(enq => enq.name.toLowerCase().includes(searchQuery.toLowerCase()) || enq.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const filteredMessages = enquiries
        .filter(enq => enq.service_type === 'general_contact')
        .filter(enq => enq.name.toLowerCase().includes(searchQuery.toLowerCase()) || enq.email.toLowerCase().includes(searchQuery.toLowerCase()));

    // Stats calculations
    const uniqueLocations = new Set(packages.map(p => p.location)).size;
    const newLeadsCount = enquiries.filter(e => e.status === 'new' && e.service_type !== 'general_contact').length;
    const newMessagesCount = enquiries.filter(e => e.status === 'new' && e.service_type === 'general_contact').length;
    const resolvedLeadsCount = enquiries.filter(e => e.status === 'resolved').length;

    if (authLoading || !session) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    }

    const navigation = [
        { name: 'Overview', id: 'dashboard', icon: LayoutDashboard },
        { name: 'Holiday Packages', id: 'packages', icon: PackageIcon },
        { name: 'Customer Leads', id: 'enquiries', icon: Users, badge: newLeadsCount > 0 ? newLeadsCount : null },
        { name: 'Messages', id: 'messages', icon: MessageCircle, badge: newMessagesCount > 0 ? newMessagesCount : null },
        { name: 'Settings', id: 'settings', icon: Settings }
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Mobile overlay removed per user request for a cleaner look */}

            {/* ---------------- SIDEBAR (Donezo Style) ---------------- */}
            <aside className="hidden lg:flex inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0">
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center transition-transform hover:scale-105">
                            <img
                                src="/assets/logo.png"
                                alt="FLIGHT99 Travel Enterprises"
                                className="h-14 w-auto object-contain drop-shadow-sm"
                                suppressHydrationWarning={true}
                            />
                        </Link>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-2 text-gray-500 bg-gray-50 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-4 py-2 mt-4 flex-1 space-y-1 overflow-y-auto">
                    <p className="px-3 text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 mt-4">Menu</p>
                    {navigation.map((item) => {
                        const isActive = activeMenu === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if (!item.disabled) {
                                        setActiveMenu(item.id);
                                        setMobileMenuOpen(false);
                                    }
                                }}
                                disabled={item.disabled}
                                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-primary text-white shadow-sm shadow-primary/20'
                                    : item.disabled
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                    <span className="font-semibold text-[15px]">{item.name}</span>
                                </div>
                                {item.badge && (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-red-500 text-white'}`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                            <span className="font-bold text-primary">A</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm">Admin User</h4>
                        <p className="text-xs text-gray-500 mt-0.5 mb-4">Workspace Active</p>
                        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all">
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Backdrop removed for native bottom nav */}

            {/* ---------------- MAIN CONTENT AREA ---------------- */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                {/* Top Header */}
                <header className="h-20 px-6 flex items-center justify-between shrink-0 lg:bg-transparent bg-transparent">
                    <div className="flex items-center gap-4">
                        <img src="/assets/logo.png" alt="Logo" className="h-8 w-auto lg:hidden" suppressHydrationWarning />
                        <div className="hidden lg:block">
                            <h2 className="text-xl lg:text-2xl font-bold text-white lg:text-gray-900 capitalize leading-tight">
                                {navigation.find(n => n.id === activeMenu)?.name}
                            </h2>
                            <p className="text-xs lg:text-sm text-white/70 lg:text-gray-500 mt-0.5 hidden sm:block">
                                Manage and grow your travel business
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {(activeMenu === 'packages' || activeMenu === 'enquiries') && (
                            <div className="relative hidden md:block w-64">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-white lg:bg-white text-sm rounded-xl border-none ring-1 ring-gray-200/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        )}
                        <Link href="/" className="hidden lg:flex p-2.5 bg-white/10 lg:bg-white backdrop-blur lg:shadow-sm lg:ring-1 lg:ring-gray-200/50 rounded-xl text-white lg:text-gray-600 hover:bg-white/20 lg:hover:bg-gray-50 transition-colors" title="View Website">
                            <LayoutGrid className="w-5 h-5" />
                        </Link>
                    </div>
                </header>

                {/* Content Container (Scrollable) */}
                <div className="flex-1 overflow-y-auto w-full">
                    {/* The rounded card effect on mobile, standard padding on desktop */}
                    <div className="mx-4 lg:mx-8 mb-28 lg:mb-8 mt-2 lg:mt-0 bg-white lg:bg-transparent rounded-t-[2rem] lg:rounded-none px-4 py-6 lg:p-0 min-h-[calc(100vh-8rem)]">

                        {/* Search on mobile */}
                        {(activeMenu === 'packages' || activeMenu === 'enquiries') && (
                            <div className="relative md:hidden mb-6">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 hover:bg-gray-100 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        )}

                        {/* --- DASHBOARD OVERVIEW VIEW --- */}
                        {activeMenu === 'dashboard' && (
                            <div className="space-y-6 lg:space-y-8">
                                {/* Stats Cards - Donezo Style */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                    <div className="bg-primary text-white p-5 lg:p-6 rounded-[20px] shadow-sm relative overflow-hidden group">
                                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
                                        <p className="text-white/80 text-sm font-medium mb-1">New Leads</p>
                                        <h3 className="text-3xl lg:text-4xl font-black">{newLeadsCount}</h3>
                                        <div className="mt-4 flex items-center text-xs font-semibold bg-white/20 w-fit px-2.5 py-1 rounded-md">
                                            <TrendingUp className="w-3.5 h-3.5 mr-1" /> Requires Action
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-100 p-5 lg:p-6 rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative group hover:border-blue-100 transition-colors">
                                        <div className="absolute right-6 top-6 w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">Destinations</p>
                                        <h3 className="text-3xl lg:text-4xl font-black text-gray-900">{uniqueLocations}</h3>
                                        <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 bg-blue-50 w-fit px-2.5 py-1 rounded-md">
                                            Global Reach
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-100 p-5 lg:p-6 rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative group hover:border-indigo-100 transition-colors">
                                        <div className="absolute right-6 top-6 w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
                                            <PackageIcon className="w-5 h-5" />
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">Total Packages</p>
                                        <h3 className="text-3xl lg:text-4xl font-black text-gray-900">{packages.length}</h3>
                                        <div className="mt-4 flex items-center text-xs font-semibold text-indigo-600 bg-indigo-50 w-fit px-2.5 py-1 rounded-md">
                                            Active Directory
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-100 p-5 lg:p-6 rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative group hover:border-green-100 transition-colors">
                                        <div className="absolute right-6 top-6 w-10 h-10 bg-green-50 text-green-600 rounded-xl flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">Resolved Leads</p>
                                        <h3 className="text-3xl lg:text-4xl font-black text-gray-900">{resolvedLeadsCount}</h3>
                                        <div className="mt-4 flex items-center text-xs font-semibold text-green-600 bg-green-50 w-fit px-2.5 py-1 rounded-md">
                                            Completed
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions & Recent */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 bg-white rounded-[20px] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-bold text-gray-900">Recent Customer Leads</h3>
                                            <button onClick={() => setActiveMenu('enquiries')} className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1">
                                                View All <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {enquiries.slice(0, 4).map(enq => (
                                                <div key={enq.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${enq.status === 'new' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                            {enq.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 text-sm">{enq.name}</h4>
                                                            <p className="text-xs text-gray-500">{enq.service_type.toUpperCase()} • {new Date(enq.created_at).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md ${enq.status === 'new' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-200 text-gray-600'}`}>
                                                        {enq.status}
                                                    </span>
                                                </div>
                                            ))}
                                            {enquiries.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No leads received yet.</p>}
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-b from-primary to-primary/90 rounded-[20px] shadow-lg p-6 text-white relative overflow-hidden">
                                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                                        <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
                                        <p className="text-sm text-white/70 mb-8">Manage your travel catalog efficiently.</p>

                                        <div className="space-y-3">
                                            <button onClick={() => handleOpenModal()} className="w-full bg-white text-primary hover:bg-gray-50 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]">
                                                <Plus className="w-5 h-5" /> Let's Add New Package
                                            </button>
                                            <button onClick={() => setActiveMenu('packages')} className="w-full bg-primary-dark border border-white/20 text-white hover:bg-white/10 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                                                <LayoutGrid className="w-5 h-5" /> Manage Existing
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- PACKAGES GRID/LIST VIEW --- */}
                        {activeMenu === 'packages' && (
                            <div className="bg-white lg:rounded-[20px] lg:border border-gray-100 lg:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] lg:p-6 lg:min-h-[calc(100vh-120px)]">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 hidden lg:block">Published Packages</h3>
                                    <div className="flex items-center gap-3 ml-auto">
                                        <div className="flex items-center bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                                            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                                                <List className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                                                <LayoutGrid className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <Button onClick={() => handleOpenModal()} variant="primary" className="!py-2.5">
                                            <Plus className="w-4 h-4 mr-2 hidden sm:inline-block" /> Add New
                                        </Button>
                                    </div>
                                </div>

                                {viewMode === 'list' ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm whitespace-nowrap">
                                            <thead className="text-gray-400 text-xs uppercase bg-gray-50/50 rounded-xl">
                                                <tr>
                                                    <th className="px-4 py-3 font-semibold first:rounded-l-xl">Package Details</th>
                                                    <th className="px-4 py-3 font-semibold">Price</th>
                                                    <th className="px-4 py-3 font-semibold">Type</th>
                                                    <th className="px-4 py-3 font-semibold text-right last:rounded-r-xl">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {filteredPackages.map((pkg) => (
                                                    <tr key={pkg.id} className="hover:bg-gray-50/30 transition-colors group">
                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                                                                    {!pkg.image_url ? (
                                                                        <div className="w-full h-full bg-gray-200" />
                                                                    ) : pkg.image_url.startsWith('data:') ? (
                                                                        <img src={pkg.image_url} alt={pkg.title} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <NextImage src={pkg.image_url} alt={pkg.title} fill sizes="48px" className="object-cover" />
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-gray-900">{pkg.title}</p>
                                                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {pkg.location}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-primary font-bold">₹{pkg.price.toLocaleString()}</td>
                                                        <td className="px-4 py-4">
                                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${pkg.type === 'International' ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-green-50 border-green-100 text-green-600'}`}>
                                                                {pkg.type}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-4 text-right">
                                                            <div className="flex justify-end gap-1 opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:opacity-0 sm:opacity-100">
                                                                <button onClick={() => handleOpenModal(pkg)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                                                                <button onClick={() => handleDeletePackage(pkg.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
                                        {filteredPackages.map((pkg) => (
                                            <div key={pkg.id} className="relative group rounded-[20px] overflow-hidden bg-gray-50 border border-gray-100">
                                                <div className="aspect-[4/3] relative w-full overflow-hidden">
                                                    {!pkg.image_url ? (
                                                        <div className="w-full h-full bg-gray-200" />
                                                    ) : pkg.image_url.startsWith('data:') ? (
                                                        <img src={pkg.image_url} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    ) : (
                                                        <NextImage src={pkg.image_url} alt={pkg.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    <p className="absolute bottom-3 left-3 right-3 text-white font-bold leading-tight line-clamp-2">{pkg.title}</p>
                                                </div>
                                                <div className="p-3 bg-white">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-xs font-semibold text-gray-500 truncate mr-2">{pkg.location}</span>
                                                        <span className="text-sm font-black text-primary">₹{pkg.price.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleOpenModal(pkg)} className="w-full py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">Edit</button>
                                                        <button onClick={() => handleDeletePackage(pkg.id)} className="w-full py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {filteredPackages.length === 0 && (
                                    <div className="py-20 flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                                            <PackageIcon className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">No packages found</h3>
                                        <p className="text-sm text-gray-500 mt-1 max-w-sm">You haven't added any packages yet, or none match your search criteria.</p>
                                        <Button onClick={() => handleOpenModal()} className="mt-6" variant="primary">Add Your First Package</Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* --- ENQUIRIES VIEW --- */}
                        {activeMenu === 'enquiries' && (
                            <div className="bg-white lg:rounded-[20px] lg:border border-gray-100 lg:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] lg:p-6 lg:min-h-[calc(100vh-120px)]">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 hidden lg:block">Customer Leads</h3>
                                    <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-100 w-full sm:w-auto overflow-x-auto no-scrollbar">
                                        {['all', 'holiday', 'flight', 'umrah', 'visa'].map(filter => (
                                            <button
                                                key={filter}
                                                onClick={() => setEnquiryFilter(filter)}
                                                className={`px-4 py-2 font-semibold text-xs rounded-lg capitalize whitespace-nowrap transition-all ${enquiryFilter === filter ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {filteredEnquiries.map((enq) => (
                                        <div key={enq.id} className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-sm hover:border-gray-300 transition-colors flex flex-col md:flex-row gap-5 relative group overflow-hidden">
                                            {/* Status indicator line */}
                                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${enq.status === 'new' ? 'bg-red-500' : enq.status === 'resolved' ? 'bg-green-500' : 'bg-yellow-500'}`} />

                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="font-bold text-gray-900 text-lg">{enq.name}</h4>
                                                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-gray-100 text-gray-600`}>
                                                        {enq.service_type}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-600 mb-4">
                                                    <a href={`mailto:${enq.email}`} className="hover:text-primary transition-colors">{enq.email}</a>
                                                    <a href={`tel:${enq.phone}`} className="hover:text-primary transition-colors font-medium">{enq.phone}</a>
                                                    <span className="text-gray-400">{new Date(enq.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                                </div>
                                                {enq.message && (
                                                    <div className="bg-gray-50 p-4 rounded-xl text-sm italic text-gray-700 border border-gray-100">
                                                        "{enq.message}"
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-row md:flex-col items-center justify-between md:justify-start gap-4 shrink-0 md:w-48 md:border-l md:border-gray-100 md:pl-5">
                                                <div className="w-full">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Action Status</label>
                                                    <select
                                                        value={enq.status}
                                                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                                                        className={`w-full text-sm rounded-xl px-3 py-2 font-bold border border-transparent focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors outline-none ${enq.status === 'new' ? 'bg-red-50 text-red-700 hover:bg-red-100 border-red-100' :
                                                            enq.status === 'contacted' ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-100' : 'bg-green-50 text-green-700 hover:bg-green-100 border-green-100'
                                                            }`}
                                                    >
                                                        <option value="new">🔴 Needs Action</option>
                                                        <option value="contacted">🟡 In Progress</option>
                                                        <option value="resolved">🟢 Resolved</option>
                                                    </select>
                                                </div>
                                                <button onClick={() => confirm('Delete this lead forever?') && deleteEnquiry(enq.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all self-end md:self-auto md:w-full md:flex md:justify-center md:items-center mt-auto md:mt-2">
                                                    <Trash2 className="w-4 h-4 md:mr-2 md:inline-block block" /> <span className="hidden md:inline-block text-xs font-bold">Delete Lead</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredEnquiries.length === 0 && (
                                        <div className="py-20 flex flex-col items-center justify-center text-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                                                <Users className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <h3 className="text-base font-bold text-gray-900">Inbox Zero</h3>
                                            <p className="text-sm text-gray-500 mt-1 max-w-sm">No customer leads found matching your criteria.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* --- MESSAGES VIEW --- */}
                        {activeMenu === 'messages' && (
                            <div className="bg-white lg:rounded-[20px] lg:border border-gray-100 lg:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] lg:p-6 lg:min-h-[calc(100vh-120px)]">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 hidden lg:block">Inbox Messages</h3>
                                </div>

                                <div className="space-y-4">
                                    {filteredMessages.map((msg) => (
                                        <div key={msg.id} className="bg-white border border-gray-100 rounded-[16px] p-5 shadow-sm hover:border-gray-300 transition-colors flex flex-col md:flex-row gap-5 relative group overflow-hidden">
                                            {/* Status indicator line */}
                                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${msg.status === 'new' ? 'bg-red-500' : msg.status === 'resolved' ? 'bg-green-500' : 'bg-yellow-500'}`} />

                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="font-bold text-gray-900 text-lg">{msg.name}</h4>
                                                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-700`}>
                                                        Contact Form
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-medium ml-auto">
                                                        {new Date(msg.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Mail className="w-4 h-4 text-gray-400" />
                                                        <a href={`mailto:${msg.email}`} className="hover:text-primary transition-colors">{msg.email || 'N/A'}</a>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Phone className="w-4 h-4 text-gray-400" />
                                                        <a href={`tel:${msg.phone}`} className="hover:text-primary transition-colors">{msg.phone}</a>
                                                    </div>
                                                </div>

                                                <div className="bg-white p-4 rounded-xl border border-gray-100 relative">
                                                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Message Body</h5>
                                                    <p className="text-gray-700 font-medium whitespace-pre-wrap text-sm leading-relaxed">{msg.message}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-row md:flex-col justify-between md:items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-5">
                                                <div className="w-full md:w-32">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Status</label>
                                                    <select
                                                        value={msg.status}
                                                        onChange={(e) => updateEnquiryStatus(msg.id, e.target.value)}
                                                        className={`w-full text-sm rounded-xl px-3 py-2 font-bold border border-transparent focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors outline-none ${msg.status === 'new' ? 'bg-red-50 text-red-700 hover:bg-red-100 border-red-100' :
                                                            msg.status === 'contacted' ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-100' : 'bg-green-50 text-green-700 hover:bg-green-100 border-green-100'
                                                            }`}
                                                    >
                                                        <option value="new">🔴 Unread</option>
                                                        <option value="contacted">🟡 Replying</option>
                                                        <option value="resolved">🟢 Resolved</option>
                                                    </select>
                                                </div>
                                                <button onClick={() => confirm('Delete this message forever?') && deleteEnquiry(msg.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all self-end md:self-auto md:w-full md:flex md:justify-center md:items-center mt-auto md:mt-2">
                                                    <Trash2 className="w-4 h-4 md:mr-2 md:inline-block block" /> <span className="hidden md:inline-block text-xs font-bold">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredMessages.length === 0 && (
                                        <div className="py-20 flex flex-col items-center justify-center text-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                                                <MessageCircle className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <h3 className="text-base font-bold text-gray-900">Inbox Zero</h3>
                                            <p className="text-sm text-gray-500 mt-1 max-w-sm">You have no general contact messages.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* --- SETTINGS VIEW --- */}
                        {activeMenu === 'settings' && (
                            <div className="max-w-3xl mx-auto space-y-6 pb-20">
                                <div className="bg-white rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100">
                                        <h2 className="text-lg font-bold text-gray-900">Global Site Settings</h2>
                                        <p className="text-sm text-gray-500 mt-1">Manage physical addresses, emails, and social media links.</p>
                                    </div>
                                    <form onSubmit={handleSaveSettings} className="p-6 space-y-6">

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">Support Email</label>
                                                <input type="email" value={settingsForm.support_email || ''} onChange={(e) => setSettingsForm({ ...settingsForm, support_email: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">WhatsApp / Phone Number</label>
                                                <input type="text" value={settingsForm.whatsapp_number || ''} onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-semibold text-gray-700">Physical Address</label>
                                                <input type="text" value={settingsForm.physical_address || ''} onChange={(e) => setSettingsForm({ ...settingsForm, physical_address: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-gray-100">
                                            <h3 className="text-md font-bold text-gray-900 mb-4">Social Media Links</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-gray-700">Facebook URL</label>
                                                    <input type="url" value={settingsForm.facebook_url || ''} onChange={(e) => setSettingsForm({ ...settingsForm, facebook_url: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="https://facebook.com/..." />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-gray-700">Twitter (X) URL</label>
                                                    <input type="url" value={settingsForm.twitter_url || ''} onChange={(e) => setSettingsForm({ ...settingsForm, twitter_url: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="https://twitter.com/..." />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-gray-700">Instagram URL</label>
                                                    <input type="url" value={settingsForm.instagram_url || ''} onChange={(e) => setSettingsForm({ ...settingsForm, instagram_url: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="https://instagram.com/..." />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-gray-700">LinkedIn URL</label>
                                                    <input type="url" value={settingsForm.linkedin_url || ''} onChange={(e) => setSettingsForm({ ...settingsForm, linkedin_url: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="https://linkedin.com/..." />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 flex justify-end">
                                            <Button type="submit" disabled={isSavingSettings} className="px-8 bg-primary hover:bg-primary-dark">
                                                {isSavingSettings ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Settings'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* --- MOBILE BOTTOM NAVIGATION --- */}
                <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around z-[100] lg:hidden pb-safe px-2 py-1 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] rounded-t-2xl">
                    {navigation.filter(n => !n.disabled).map((item) => {
                        const isActive = activeMenu === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveMenu(item.id)}
                                className={`flex flex-col items-center justify-center p-2 min-w-[4rem] transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <div className={`relative p-1.5 rounded-xl transition-all ${isActive ? 'bg-primary/10' : ''}`}>
                                    <item.icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-gray-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                                    {item.badge && (
                                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                <span className={`text-[10px] font-semibold mt-1 transition-all ${isActive ? 'text-primary' : 'text-gray-500 font-medium'}`}>
                                    {item.name.split(' ')[0]}
                                </span>
                            </button>
                        );
                    })}
                    <button
                        onClick={handleLogout}
                        className="flex flex-col items-center justify-center p-2 min-w-[4rem] text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <div className="p-1.5 rounded-xl transition-all">
                            <LogOut className="w-6 h-6 text-gray-400" />
                        </div>
                        <span className="text-[10px] font-medium mt-1 text-gray-500">
                            Logout
                        </span>
                    </button>
                </nav>
            </main>
            {/* Edit/Add Modal Wrapper */}
            {isModalOpen && (
                <PackageFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    packageData={currentPackage}
                    onSubmit={(data) => {
                        if (currentPackage) {
                            updatePackage(currentPackage.id, data);
                        } else {
                            addPackage(data);
                        }
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

/* Form Modal Component remains structurally the same for data integrity, but with slight aesthetic tweaks */
const PackageFormModal = ({ isOpen, onClose, packageData, onSubmit }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        title: '', location: '', price: '', type: 'International', duration: '', description: '',
        inclusions: packageData?.inclusions || [], itinerary: packageData?.itinerary || [],
        ...packageData,
        image: packageData?.image_url || packageData?.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
    });
    const [processing, setProcessing] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleAddInclusion = () => setFormData(prev => ({ ...prev, inclusions: [...prev.inclusions, ''] }));
    const handleRemoveInclusion = (idx) => setFormData(prev => ({ ...prev, inclusions: prev.inclusions.filter((_, i) => i !== idx) }));
    const handleInclusionChange = (idx, value) => {
        const newInclusions = [...formData.inclusions];
        newInclusions[idx] = value;
        setFormData(prev => ({ ...prev, inclusions: newInclusions }));
    };
    const handleAddItinerary = () => setFormData(prev => ({ ...prev, itinerary: [...prev.itinerary, { day: `Day ${prev.itinerary.length + 1}`, title: '', description: '' }] }));
    const handleRemoveItinerary = (idx) => setFormData(prev => ({ ...prev, itinerary: prev.itinerary.filter((_, i) => i !== idx) }));
    const handleItineraryChange = (idx, field, value) => {
        const newItinerary = [...formData.itinerary];
        newItinerary[idx] = { ...newItinerary[idx], [field]: value };
        setFormData(prev => ({ ...prev, itinerary: newItinerary }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setProcessing(true);
            const base64 = await processImage(file);
            setFormData(prev => ({ ...prev, image: base64 }));
        } catch (error) {
            console.error("Image processing failed", error);
            alert("Failed to process image.");
        } finally {
            setProcessing(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, price: Number(formData.price) });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
                    <h2 className="text-xl font-black text-gray-900">{packageData ? 'Edit Travel Package' : 'Create New Package'}</h2>
                    <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Header Image Upload */}
                    <div>
                        <div
                            className="relative w-full h-56 bg-gray-50 rounded-[20px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-primary/50 transition-all overflow-hidden group"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {formData.image ? (
                                <>
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="p-3 bg-white/20 backdrop-blur rounded-full text-white mb-2"><Edit className="w-5 h-5" /></div>
                                        <p className="text-white font-semibold text-sm">Replace Required Thumbnail</p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-gray-400 flex flex-col items-center">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                        <ImageIcon className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-600">Click to upload thumbnail</span>
                                    <span className="text-xs text-gray-400 mt-1">16:9 ratio recommended</span>
                                </div>
                            )}
                            {processing && (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                                    <p className="text-sm font-bold text-gray-900">Processing image...</p>
                                </div>
                            )}
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Package Title</label>
                            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-3.5 transition-all outline-none" placeholder="e.g. Magical Maldives Escape" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Location</label>
                            <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-3.5 transition-all outline-none" placeholder="e.g. Male, Maldives" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Price (₹)</label>
                            <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-3.5 transition-all outline-none" placeholder="50000" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-3.5 transition-all outline-none">
                                <option value="International">International</option>
                                <option value="Domestic">Domestic</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Duration</label>
                            <input type="text" name="duration" required value={formData.duration} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-3.5 transition-all outline-none" placeholder="e.g. 4 Days / 3 Nights" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">General Overview</label>
                        <textarea name="description" rows="4" required value={formData.description} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-3.5 transition-all outline-none resize-none" placeholder="Entice the customer with a beautiful description..." />
                    </div>

                    <div className="bg-blue-50/50 p-5 rounded-[20px] border border-blue-50">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">Package Inclusions</h4>
                                <p className="text-xs text-gray-500 mt-0.5">What's included in the price?</p>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={handleAddInclusion} className="!py-1.5 !px-3 !bg-white">Add Item</Button>
                        </div>
                        <div className="space-y-3">
                            {formData.inclusions.map((inc, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <input type="text" value={inc} onChange={(e) => handleInclusionChange(idx, e.target.value)} className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary block p-2 transition-all outline-none" placeholder="e.g. Return flights & transfers" required />
                                    <button type="button" onClick={() => handleRemoveInclusion(idx)} className="p-2 text-gray-400 hover:text-red-500 bg-white border border-gray-200 hover:border-red-100 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                            {formData.inclusions.length === 0 && <p className="text-xs text-gray-400 italic bg-white p-3 rounded-xl border border-dashed border-gray-200 text-center">No inclusions added yet.</p>}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-[20px] border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">Daily Itinerary</h4>
                                <p className="text-xs text-gray-500 mt-0.5">Breakdown the trip day by day.</p>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={handleAddItinerary} className="!py-1.5 !px-3 !bg-white">Add Day</Button>
                        </div>
                        <div className="space-y-4">
                            {formData.itinerary.map((day, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 relative group">
                                    <button type="button" onClick={() => handleRemoveItinerary(idx)} className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-3.5 h-3.5" /></button>
                                    <div className="flex gap-3 pr-8">
                                        <div className="w-24 shrink-0">
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Tag</label>
                                            <input type="text" value={day.day} onChange={(e) => handleItineraryChange(idx, 'day', e.target.value)} className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary/20 block p-2 outline-none" placeholder="Day 1" required />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Title</label>
                                            <input type="text" value={day.title} onChange={(e) => handleItineraryChange(idx, 'title', e.target.value)} className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary/20 block p-2 outline-none" placeholder="e.g. Arrival in Paradise" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Plan details</label>
                                        <textarea value={day.description} onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)} className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary/20 block p-2 outline-none resize-none" rows="2" placeholder="Activities planned..." required />
                                    </div>
                                </div>
                            ))}
                            {formData.itinerary.length === 0 && <p className="text-xs text-gray-400 italic bg-white p-3 rounded-xl border border-dashed border-gray-200 text-center">No itinerary days added yet.</p>}
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0 rounded-b-[24px]">
                    <Button type="button" variant="outline" onClick={onClose} disabled={processing} className="bg-white">Cancel</Button>
                    <Button type="button" onClick={handleSubmit} variant="primary" disabled={processing} className="min-w-[140px]">
                        {processing ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save Package'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
