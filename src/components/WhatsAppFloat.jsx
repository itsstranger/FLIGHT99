'use client';

import React from 'react';

const WhatsAppFloat = () => {
    // You can replace this number with the actual WhatsApp business number
    const whatsappNumber = "+917356409377";
    const customMessage = "Hello FLIGHT99 Travel Enterprises, I need help planning a trip!";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customMessage)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 md:bottom-6 right-6 z-[100] hidden lg:flex items-center justify-center w-[54px] h-[54px] bg-[#25D366] rounded-[18px] shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:scale-110 hover:shadow-[0_12px_40px_rgba(37,211,102,0.4)] transition-all duration-300 group"
            aria-label="Chat on WhatsApp"
        >
            {/* Tooltip */}
            <span className="absolute right-16 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
                Chat with us
            </span>
            {/* WhatsApp Blue Icon */}
            <img src="/assets/whatsapp-blue.png" alt="WhatsApp" className="w-8 h-8 object-contain" suppressHydrationWarning />
        </a>
    );
};

export default WhatsAppFloat;
