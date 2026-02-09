import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LeadCaptureModal from './LeadCaptureModal';
import { MessageCircle } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen relative">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <LeadCaptureModal />

            {/* Floating WhatsApp Widget */}
            <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center cursor-pointer group"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle className="w-6 h-6" />
                <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Chat with us
                </span>
            </a>
        </div>
    );
};

export default Layout;
