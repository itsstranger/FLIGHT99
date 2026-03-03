'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import Button from './ui/Button';
import { useModal } from '../context/ModalContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { openModal } = useModal();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Visa Services', path: '/visa' },
        { name: 'Hajj & Umrah', path: '/hajj-umrah' },
        { name: 'Tour Packages', path: '/tour-packages' }, // Kept for general holiday packages
    ];

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b-2 border-slate-200/80 py-3 transition-all duration-300"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo - Clean */}
                    <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
                        <img
                            src="/assets/logo.png"
                            alt="FLIGHT99"
                            className="h-12 md:h-14 w-auto object-contain drop-shadow-sm"
                            suppressHydrationWarning={true}
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className="font-medium text-sm text-gray-700 transition-colors hover:text-secondary drop-shadow-md"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <a href="tel:+917356409377">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary hover:border-primary/20"
                            >
                                <Phone className="w-4 h-4 mr-2" /> Call Expert
                            </Button>
                        </a>
                        <Button
                            variant="primary"
                            size="sm"
                            className="shadow-lg shadow-primary/20"
                            onClick={() => openModal('plan')}
                        >
                            Plan Your Trip
                        </Button>
                    </div>

                    {/* Mobile Only CTA - WhatsApp & Call icons */}
                    <div className="md:hidden flex items-center gap-2">
                        <a
                            href="https://wa.me/+917356409377?text=Hello%20FLIGHT99%2C%20I%20need%20help%20planning%20a%20trip%21"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#25D366] bg-[#25D366]/10 rounded-full hover:scale-105 transition-transform"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.008 2.005C6.48 2.005 1.996 6.488 1.996 12.016c0 1.766.46 3.486 1.334 5L1.996 22l5.122-1.344a9.96 9.96 0 0 0 4.89 1.28h.004C17.54 21.936 22 17.436 22 11.918 22 6.39 17.536 2.005 12.008 2.005z" fill="currentColor" />
                                <path d="M16.92 14.505c-.276-.138-1.633-.807-1.887-.905-.254-.093-.44-.138-.625.138-.184.276-.713.896-.874 1.08-.16.184-.32.207-.597.07-.276-.138-1.164-.43-2.217-1.373-.83-.733-1.376-1.636-1.536-1.913-.162-.276-.017-.425.12-.564.124-.126.276-.322.414-.482.14-.162.185-.276.277-.46.092-.185.046-.346-.023-.484-.07-.14-.626-1.507-.852-2.06-.226-.54-.456-.473-.626-.473-.16 0-.345-.008-.53-.008-.183 0-.482.07-.736.346-.252.276-.965.943-.965 2.302 0 1.358.988 2.67 1.127 2.854.138.184 1.943 2.964 4.708 4.156.657.283 1.17.452 1.57.578.66.21 1.26.18 1.734.11.535-.08 1.633-.668 1.863-1.312.23-.645.23-1.196.16-1.312-.068-.115-.253-.184-.53-.322z" fill="white" />
                            </svg>
                        </a>
                        <a href="tel:+917356409377" className="p-2 text-primary bg-primary/5 rounded-full hover:scale-105 transition-transform">
                            <Phone className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
