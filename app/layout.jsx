import './globals.css';
import { PackageProvider } from '@/context/PackageContext';
import { ModalProvider } from '@/context/ModalContext';
import { AuthProvider } from '@/context/AuthContext';
import { EnquiryProvider } from '@/context/EnquiryContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BottomNav from '@/components/BottomNav';

export const metadata = {
    title: 'FLIGHT99 - Your Trusted Travel Partner',
    description: 'Expert travel services for flights, visas, and holiday packages.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning={true} className="overflow-x-hidden">
            <body className="font-sans antialiased text-gray-900 bg-white overflow-x-hidden w-full" suppressHydrationWarning={true}>
                <AuthProvider>
                    <EnquiryProvider>
                        <PackageProvider>
                            <ModalProvider>
                                <Navbar />
                                <BottomNav />
                                <main className="min-h-screen">
                                    {children}
                                </main>
                                <Footer />
                                <LeadCaptureModal />
                                <WhatsAppFloat />
                            </ModalProvider>
                        </PackageProvider>
                    </EnquiryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
