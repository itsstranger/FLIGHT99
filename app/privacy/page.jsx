'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lock, Eye, Database, Share2, ShieldCheck, Cookie } from 'lucide-react';

const PrivacyPage = () => {
    const sections = [
        {
            title: "Data We Collect",
            icon: Database,
            content: "We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our services, when you participate in activities on our website, or otherwise when you contact us."
        },
        {
            title: "How We Use Your Info",
            icon: Eye,
            content: "We use personal information collected via our website for a variety of business purposes, including to provide and deliver the services you requested, to send you administrative information, and to fulfill our legal obligations."
        },
        {
            title: "Sharing Your Data",
            icon: Share2,
            content: "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. This includes sharing with airlines and hotels to facilitate your bookings."
        },
        {
            title: "Data Security",
            icon: Lock,
            content: "We aim to protect your personal information through a system of organizational and technical security measures. However, no electronic transmission over the internet can be guaranteed to be 100% secure."
        },
        {
            title: "Cookies",
            icon: Cookie,
            content: "We may use cookies and similar tracking technologies to access or store information. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent."
        }
    ];

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Cinematic Header */}
            <div className="relative pt-32 pb-20 bg-[#0a1128] overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0a1128]"></div>
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/20 blur-[120px] rounded-full"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white">
                    <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">Privacy First</span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#e6a810]">Policy</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-400 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        Your trust is our most valuable asset. Learn how we handle and protect your personal information at FLIGHT99.
                    </p>
                </div>
            </div>

            <div className="flex-1 py-16 px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sections.map((section, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary mb-6">
                                    <section.icon className="w-6 h-6" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-emerald-50/50 rounded-[32px] p-10 border border-emerald-100/50 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-inner">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">We respect your data</h3>
                        <p className="text-gray-500 text-sm max-w-lg mx-auto">
                            FLIGHT99 Travel Enterprises is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default PrivacyPage;
