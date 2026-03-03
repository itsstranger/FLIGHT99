import './globals.css';
import { PackageProvider } from '@/context/PackageContext';
import { ModalProvider } from '@/context/ModalContext';
import { AuthProvider } from '@/context/AuthContext';
import { EnquiryProvider } from '@/context/EnquiryContext';
import LayoutWrapper from '@/components/LayoutWrapper';

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
                                <LayoutWrapper>
                                    {children}
                                </LayoutWrapper>
                            </ModalProvider>
                        </PackageProvider>
                    </EnquiryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
