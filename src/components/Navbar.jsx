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
        { name: 'Packages', path: '/packages' }, // Kept for general holiday packages
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
                        <a href="tel:+919876543210">
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

                    {/* Mobile Only CTA - Call icon instead of full button for extreme cleanliness */}
                    <div className="md:hidden flex items-center">
                        <a href="tel:+919876543210" className="p-2 text-primary bg-primary/5 rounded-full">
                            <Phone className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
