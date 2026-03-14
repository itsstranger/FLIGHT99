'use client';

import React from 'react';
import { Shield, ScrollText, AlertCircle, FileText, CheckCircle } from 'lucide-react';

const TermsPage = () => {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            icon: CheckCircle,
            content: "By accessing and using the services of FLIGHT99 Travel Enterprises, you agree to be bound by these Terms and Conditions. If you do not agree, please refrain from using our services."
        },
        {
            title: "2. Booking and Payments",
            icon: ScrollText,
            content: "All bookings are subject to availability. A booking is only confirmed once full payment or the required deposit has been received and a confirmation invoice has been issued. Prices are subject to change until the booking is confirmed."
        },
        {
            title: "3. Cancellation and Refunds",
            icon: AlertCircle,
            content: "Cancellation policies vary depending on the service provider (airlines, hotels, tour operators). FLIGHT99 will pass on any refund received from the supplier, subject to our own administrative service fee. No-shows are generally non-refundable."
        },
        {
            title: "4. Travel Documents",
            icon: FileText,
            content: "It is the traveler's responsibility to ensure they possess valid passports, visas, health certificates, and any other required travel documents. FLIGHT99 is not liable for any issues arising from incomplete or invalid documentation."
        },
        {
            title: "5. Liability",
            icon: Shield,
            content: "FLIGHT99 acts as an agent for third-party service providers. While we strive to work with reputable partners, we are not liable for the acts, errors, or omissions of these providers, including delays, accidents, or property damage."
        }
    ];

    return (
        <div className="bg-gray-50 flex flex-col">

            {/* Cinematic Header */}
            <div className="relative pt-32 pb-20 bg-[#0a1128] overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0a1128]"></div>
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/30 blur-[120px] rounded-full"></div>
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white">
                    <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">Legal Agreements</span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#e6a810]">Conditions</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-400 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        Please read these terms carefully before booking your travel with FLIGHT99 Travel Enterprises.
                    </p>
                </div>
            </div>

            <div className="flex-1 py-16 px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                                    <section.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="bg-blue-50/50 rounded-[32px] p-8 border border-blue-100/50 text-center">
                        <p className="text-sm text-gray-500 italic">
                            These terms were last updated on March 14, 2026. For any questions regarding our terms, please contact us at booking@flight99.co.in
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TermsPage;
