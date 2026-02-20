'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePackages } from '@/context/PackageContext';
import { useEnquiries } from '@/context/EnquiryContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, X, Check, ArrowLeft, Upload, Loader2, LayoutGrid, List, Search, LogOut, Package, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { processImage } from '@/lib/imageProcessor';
import PackageCard from '@/components/PackageCard';

const AdminDashboard = () => {
    const { packages, addPackage, updatePackage, deletePackage } = usePackages();
    const { enquiries, updateEnquiryStatus, deleteEnquiry } = useEnquiries();
    const { session, loading: authLoading } = useAuth();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPackage, setCurrentPackage] = useState(null); // null for add, object for edit

    // UI State
    const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'enquiries'
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this package?')) {
            deletePackage(id);
        }
    };

    // Filter Logic
    const filteredPackages = packages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (authLoading || !session) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8" style={{ paddingTop: '120px' }}>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-5">
                        <Link href="/" className="p-3 bg-gray-50 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group">
                            <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Workspace</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage packages, view leads, and grow your business.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button onClick={() => handleOpenModal()} variant="primary" className="flex justify-center items-center gap-2 shadow-sm shadow-primary/20 w-full md:w-auto">
                            <Plus className="w-4 h-4" /> Add Package
                        </Button>
                        <button onClick={handleLogout} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100 bg-gray-50" title="Logout">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                    {/* Modern Segmented Tabs */}
                    <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 w-full lg:w-auto flex overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab('packages')}
                            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${activeTab === 'packages' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                        >
                            <Package className="w-4 h-4" /> Holiday Packages
                        </button>
                        <button
                            onClick={() => setActiveTab('enquiries')}
                            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${activeTab === 'enquiries' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                        >
                            <Users className="w-4 h-4" /> Customer Leads
                            {enquiries.filter(e => e.status === 'new').length > 0 && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ml-1 ${activeTab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-red-500 text-white'}`}>
                                    {enquiries.filter(e => e.status === 'new').length} New
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Search & Filters */}
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="relative w-full lg:w-72">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab === 'packages' ? 'destinations or titles' : 'names or emails'}...`}
                                className="w-full pl-10 pr-4 py-2.5 bg-white text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {activeTab === 'packages' && (
                            <div className="flex items-center bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm shrink-0">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'packages' ? (
                    viewMode === 'list' ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-500">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Title</th>
                                        <th className="px-6 py-4 font-medium">Location</th>
                                        <th className="px-6 py-4 font-medium">Price</th>
                                        <th className="px-6 py-4 font-medium">Type</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredPackages.map((pkg) => (
                                        <tr key={pkg.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-gray-900">{pkg.title}</td>
                                            <td className="px-6 py-4 text-gray-500">{pkg.location}</td>
                                            <td className="px-6 py-4 text-primary font-bold">₹{pkg.price.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide ${pkg.type === 'International' ? 'bg-blue-50/50 text-blue-600' : 'bg-green-50/50 text-green-600'}`}>
                                                    {pkg.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleOpenModal(pkg)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(pkg.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredPackages.length === 0 && (
                                <div className="p-16 flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                        <Package className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-900">No packages found</h3>
                                    <p className="text-sm text-gray-500 mt-1">Try adjusting your search query.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPackages.map((pkg) => (
                                <div key={pkg.id} className="relative group">
                                    <PackageCard packageData={pkg} />
                                    {/* Admin Overlay */}
                                    <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleOpenModal(pkg)} className="p-2 bg-white/90 backdrop-blur text-blue-600 shadow-sm rounded-lg hover:bg-white transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(pkg.id)} className="p-2 bg-white/90 backdrop-blur text-red-600 shadow-sm rounded-lg hover:bg-white transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-500">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Date/Time</th>
                                    <th className="px-6 py-4 font-medium">Customer Info</th>
                                    <th className="px-6 py-4 font-medium">Interest</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {enquiries
                                    .filter(enq => enq.name.toLowerCase().includes(searchQuery.toLowerCase()) || enq.email.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map((enq) => (
                                        <tr key={enq.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-gray-500">
                                                <div className="font-medium text-gray-900">{new Date(enq.created_at).toLocaleDateString()}</div>
                                                <div className="text-xs mt-0.5">{new Date(enq.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{enq.name}</div>
                                                <div className="text-gray-500 mt-0.5">{enq.email}</div>
                                                <div className="text-gray-500">{enq.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block text-[11px] px-2.5 py-1 rounded-md font-semibold mb-1.5 uppercase tracking-wide ${enq.service_type === 'umrah' ? 'bg-emerald-50 text-emerald-700' : 'bg-primary/5 text-primary'}`}>
                                                    {enq.service_type}
                                                </span>
                                                <div className="text-gray-600 max-w-xs truncate" title={enq.message}>
                                                    {enq.message || <span className="text-gray-400 italic">No message provided</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={enq.status}
                                                    onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                                                    className={`text-xs rounded-lg px-3 py-1.5 font-medium border border-transparent focus:ring-2 focus:ring-primary/20 cursor-pointer transition-colors outline-none ${enq.status === 'new' ? 'bg-red-50 text-red-700 hover:bg-red-100' :
                                                        enq.status === 'contacted' ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' : 'bg-green-50 text-green-700 hover:bg-green-100'
                                                        }`}
                                                >
                                                    <option value="new">New Lead</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="resolved">Resolved</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => confirm('Delete this enquiry?') && deleteEnquiry(enq.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {enquiries.length === 0 && (
                            <div className="p-16 flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                    <Users className="w-5 h-5 text-gray-400" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-900">No leads found</h3>
                                <p className="text-sm text-gray-500 mt-1">When customers submit enquiries, they will appear here.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Edit/Add Modal */}
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
        </div>
    );
};

const PackageFormModal = ({ isOpen, onClose, packageData, onSubmit }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        type: 'International', // Default
        duration: '',
        description: '',
        ...packageData,
        image: packageData?.image_url || packageData?.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop', // Placeholder
    });

    const [processing, setProcessing] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        // Convert price to number
        onSubmit({ ...formData, price: Number(formData.price) });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">{packageData ? 'Edit Package' : 'Add New Package'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Package Image</label>
                            <div
                                className="relative w-full h-48 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden group"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {formData.image ? (
                                    <>
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white font-medium flex items-center gap-2"><Edit className="w-4 h-4" /> Change Image</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center">
                                        <Upload className="w-8 h-8 mb-2" />
                                        <span className="text-sm">Click to upload image</span>
                                        <span className="text-xs text-gray-400 mt-1">Auto-cropped to 16:9</span>
                                    </div>
                                )}
                                {processing && (
                                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Package Title</label>
                            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="input-premium w-full" placeholder="e.g. Magical Maldives" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" name="location" required value={formData.location} onChange={handleChange} className="input-premium w-full" placeholder="e.g. Male, Maldives" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                            <input type="number" name="price" required value={formData.price} onChange={handleChange} className="input-premium w-full" placeholder="50000" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="input-premium w-full">
                                <option value="International">International</option>
                                <option value="Domestic">Domestic</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                    <input type="text" name="duration" required value={formData.duration} onChange={handleChange} className="input-premium w-full" placeholder="e.g. 4 Days / 3 Nights" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="description" rows="4" required value={formData.description} onChange={handleChange} className="input-premium w-full resize-none" placeholder="Detailed description..." />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose} disabled={processing}>Cancel</Button>
                        <Button type="submit" variant="primary" disabled={processing}>
                            {processing ? 'Processing...' : 'Save Package'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;
