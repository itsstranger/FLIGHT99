'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const pathname = usePathname();
    const isHomeOrAbout = pathname === '/' || pathname === '/about';

    // Hide footer on mobile screens unless we are on Home or About page
    const visibilityClass = isHomeOrAbout ? '' : 'hidden md:grid';

    return (
        <footer className="bg-[#0a1128] text-white">
            <div className="container mx-auto px-4 md:px-6">

                {/* Main Footer Content - Hidden on mobile for non-essential pages */}
                <div className={`grid grid-cols-1 md:grid-cols-4 gap-12 pt-16 pb-12 ${visibilityClass}`}>
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight">FLIGHT99</h2>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Experience the world with premium travel packages tailored just for you. From boutique stays to exclusive excursions, we handle it all.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-secondary">Explore</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/tour-packages" className="hover:text-white transition-colors">Tour Packages</Link></li>
                            <li><Link href="/flights" className="hover:text-white transition-colors">Flights</Link></li>
                            <li><Link href="/visas" className="hover:text-white transition-colors">Visa Services</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Supports */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-secondary">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-secondary">Contact</h3>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                                <span>123, Premium Tower, Business Bay, Dubai, UAE</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-secondary shrink-0" />
                                <span>+91 73564 09377</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-secondary shrink-0" />
                                <span>hello@flight99.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright & IATA - Always visible on all pages */}
                <div className={`border-white/10 pt-6 pb-24 lg:pb-8 flex flex-col md:flex-row justify-between items-center gap-4 ${isHomeOrAbout ? 'border-t' : 'border-t-0 md:border-t'}`}>
                    <p className="text-sm text-gray-400 text-center md:text-left">© {new Date().getFullYear()} FLIGHT99 Travel Enterprises. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">IATA Accredited</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
