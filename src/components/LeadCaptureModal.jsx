'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import Button from './ui/Button';

const LeadCaptureModal = () => {
    const { isModalOpen, closeModal, modalType, prefillData } = useModal();

    if (!isModalOpen) return null;

    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg md:max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-900/5 flex"
                    >
                        {/* Form Column */}
                        <div className="flex flex-col flex-1 overflow-y-auto">
                            <div className="flex items-center justify-between border-b px-6 md:px-8 py-4 md:py-5 sticky top-0 bg-white z-10">
                                <h3 className="text-xl font-semibold text-primary">
                                    {modalType === 'hajj' ? 'Plan Your Umrah Journey' : modalType === 'customize' ? 'Customize Your Trip' : modalType === 'visa' ? 'Visa Assistance' : 'Plan Your Dream Trip'}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1" onSubmit={async (e) => {
                                e.preventDefault();

                                const formElement = e.target;
                                const submitBtn = formElement.querySelector('button[type="submit"]');
                                const originalText = submitBtn.textContent;

                                submitBtn.textContent = "Sending...";
                                submitBtn.disabled = true;

                                const formData = new FormData(formElement);

                                // 1. Build Data Object for Custom API (Supabase)
                                const data = Object.fromEntries(formData);

                                // Merge Country Code and Phone
                                if (data.countryCode) {
                                    data.phone = `${data.countryCode} ${data.phone}`;
                                    formData.set('phone', data.phone);
                                }

                                if (modalType === 'hajj') {
                                    data.service_type = 'umrah';
                                } else if (modalType === 'visa') {
                                    data.service_type = 'visa';
                                }
                                data.service_type = data.service_type || 'holiday';

                                // Attach context if triggered from a specific package
                                if (prefillData?.message) {
                                    data.message = prefillData.message;
                                }

                                // 2. Append Web3Forms Key & Formatting
                                formData.append("access_key", "fd4cbdc6-dbae-42b4-9ed9-a09170314f38");
                                formData.append("subject", `New Lead: ${data.service_type.toUpperCase()} Enquiry from ${data.name}`);
                                formData.append("from_name", "FLIGHT99 Website");

                                if (data.message) {
                                    formData.append("message", `Context: ${data.message}`);
                                }

                                try {
                                    // Execute Both Requests Concurrently
                                    await Promise.all([
                                        fetch('https://api.web3forms.com/submit', {
                                            method: 'POST',
                                            body: formData
                                        }),
                                        fetch('/api/send-enquiry', {
                                            method: 'POST',
                                            body: JSON.stringify(data),
                                            headers: { 'Content-Type': 'application/json' }
                                        })
                                    ]);

                                    alert("Success! Your enquiry has been sent.");
                                    closeModal();
                                } catch (err) {
                                    alert("Something went wrong. Please try again.");
                                } finally {
                                    submitBtn.textContent = originalText;
                                    submitBtn.disabled = false;
                                }
                            }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input type="text" name="name" required className="input-premium w-full" placeholder="Name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <div className="flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/40 shadow-sm transition-all hover:bg-white/90">
                                            <select name="countryCode" className="bg-transparent border-none outline-none py-3 pl-3 pr-1 text-gray-700 font-medium text-sm border-r border-gray-200 focus:ring-0 shrink-0 cursor-pointer hover:bg-gray-50 transition-colors">
                                                <option value="+91">🇮🇳 +91</option>
                                                <option value="+971">🇦🇪 +971</option>
                                                <option value="+1">🇺🇸 +1</option>
                                                <option value="+44">🇬🇧 +44</option>
                                                <option value="+61">🇦🇺 +61</option>
                                            </select>
                                            <input type="tel" name="phone" required className="bg-transparent border-none outline-none flex-1 min-w-0 py-3 px-3 font-medium text-gray-900 placeholder-gray-400 focus:ring-0 text-sm" placeholder="Phone Number" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" name="email" required className="input-premium w-full" placeholder="Email Address" />
                                </div>

                                {modalType === 'visa' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Which Country's Visa?</label>
                                            <input type="text" name="destination" required className="input-premium w-full" placeholder="e.g. UAE, Schengen, USA" defaultValue={prefillData?.destination || ''} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Date</label>
                                            <input type="date" name="date" required className="input-premium w-full" />
                                        </div>
                                    </div>
                                ) : modalType !== 'hajj' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Travelling From</label>
                                            <input type="text" name="from" className="input-premium w-full" placeholder="Mumbai" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                                            <input type="text" name="destination" className="input-premium w-full" placeholder="Dubai" defaultValue={prefillData?.destination || ''} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Pilgrims</label>
                                            <input type="number" min="1" name="persons" className="input-premium w-full" placeholder="2" defaultValue="1" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Need Hotel Booking?</label>
                                            <select name="bookHotel" className="input-premium w-full">
                                                <option value="Yes">Yes, include hotels</option>
                                                <option value="No">No, only ground transport/visa</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {modalType !== 'visa' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{modalType === 'hajj' ? 'Start Date' : 'Travel Date'}</label>
                                            <input type="date" name="date" required={modalType === 'hajj'} className="input-premium w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                                            <select name="duration" className="input-premium w-full">
                                                <option>3-5 Days</option>
                                                <option>6-10 Days</option>
                                                <option>10-15 Days</option>
                                                <option>15+ Days</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-2">
                                    <Button type="submit" className="w-full" variant="secondary">
                                        Send Enquiry
                                    </Button>
                                    <p className="mt-3 text-center text-xs text-gray-500">
                                        Your details are sent directly to our expert team.
                                    </p>
                                </div>
                            </form>
                        </div>

                        {/* Image Panel — desktop only */}
                        <div className="hidden md:flex relative w-56 shrink-0 flex-col justify-end overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=800&auto=format&fit=crop"
                                alt="Travel destination"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Dark gradient for text legibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                            <div className="relative z-10 p-5 text-white">
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/70 mb-1">Trusted by 10,000+</p>
                                <p className="text-base font-bold leading-snug">Travellers who explored the world with us ✈️</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LeadCaptureModal;
