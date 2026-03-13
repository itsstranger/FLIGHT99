'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import PlanTripFloat from '@/components/PlanTripFloat';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const LayoutWrapper = ({ children }) => {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    if (isAdminRoute) {
        return (
            <main className="min-h-screen">
                {children}
            </main>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <LeadCaptureModal />
            <PlanTripFloat />
            <WhatsAppFloat />
        </>
    );
};

export default LayoutWrapper;
