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
                        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-900/5"
                    >
                        <div className="flex items-center justify-between border-b px-8 py-5">
                            <h3 className="text-xl font-semibold text-primary">
                                {modalType === 'customize' ? 'Customize Your Trip' : 'Plan Your Dream Trip'}
                            </h3>
                            <button
                                onClick={closeModal}
                                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Enquiry Submitted! We'll call you shortly."); closeModal(); }}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:border-primary focus:ring-primary outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="flex gap-2">
                                    <input
                                        type="tel"
                                        className="w-20 rounded-lg border-gray-300 border px-3 py-2 bg-gray-50 text-center"
                                        placeholder="+91"
                                        defaultValue={"+91"}
                                    />
                                    <input
                                        type="tel"
                                        required
                                        className="flex-1 rounded-lg border-gray-300 border px-4 py-2 focus:border-primary focus:ring-primary outline-none transition-all"
                                        placeholder="98765 43210"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your plans</label>
                                <textarea
                                    rows={4}
                                    className="w-full rounded-lg border-gray-300 border px-4 py-2 focus:border-primary focus:ring-primary outline-none transition-all resize-none"
                                    placeholder="Looking for a 5-day Kerala trip for 4 people in December..."
                                    defaultValue={prefillData?.message || ''}
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <Button type="submit" className="w-full" variant="secondary">
                                    Request Callback
                                </Button>
                                <p className="mt-3 text-center text-xs text-gray-500">
                                    Our experts will contact you within 2 hours.
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LeadCaptureModal;
