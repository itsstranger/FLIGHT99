'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';

const FAQPage = () => {


    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 pt-24 md:pt-32 pb-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block opacity-80">Support Center</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-heading">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#e6a810]">Questions</span></h1>
                        <p className="font-secondary text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                            Everything you need to know about booking your dream trip with FLIGHT99.
                        </p>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                        <FAQSection />
                    </div>

                    {/* Still have questions block */}
                    <div className="mt-16 bg-[#32315c] rounded-3xl p-8 md:p-12 text-center text-white shadow-xl animate-in fade-in duration-700 delay-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-heading">Still have questions?</h3>
                            <p className="font-secondary text-gray-300 mb-8 max-w-xl mx-auto">
                                Can't find the answer you're looking for? Please chat to our friendly team.
                            </p>
                            <a
                                href="https://wa.me/917356409377"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto tracking-wide"
                            >
                                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default FAQPage;
