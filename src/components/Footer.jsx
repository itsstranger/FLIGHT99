'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

const Footer = () => {
    const pathname = usePathname();
    const { settings } = useSettings();
    const isHomeOrAbout = pathname === '/' || pathname === '/about';

    // Hide footer on mobile screens unless we are on Home or About page
    const visibilityClass = isHomeOrAbout ? '' : 'hidden md:grid';

    return (
        <footer className="relative bg-gradient-to-b from-[#1b2b5a] via-[#0a1128] to-[#040712] text-white overflow-hidden">
            {/* Subtle Glowing Mesh Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2a4696]/40 to-transparent"></div>
                <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[60%] bg-[#2a4696]/20 blur-[130px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#e6a810]/5 blur-[100px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">

                {/* Main Footer Content - Hidden on mobile for non-essential pages */}
                <div className={`grid grid-cols-1 md:grid-cols-4 gap-12 pt-16 pb-12 ${visibilityClass}`}>
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight">FLIGHT99 Travel Enterprises</h2>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Experience the world with premium travel packages tailored just for you. From boutique stays to exclusive excursions, we handle it all.
                        </p>
                        <div className="flex gap-4">
                            {settings?.facebook_url && <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors"><Facebook className="w-5 h-5" /></a>}
                            {settings?.twitter_url && <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors"><Twitter className="w-5 h-5" /></a>}
                            {settings?.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors"><Instagram className="w-5 h-5" /></a>}
                            {settings?.linkedin_url && <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors"><Linkedin className="w-5 h-5" /></a>}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-secondary">Explore</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/tour-packages" className="hover:text-white transition-colors">Tour Packages</Link></li>
                            <li><Link href="/#flights" className="hover:text-white transition-colors">Flights</Link></li>
                            <li><Link href="/visa" className="hover:text-white transition-colors">Visa Services</Link></li>
                            <li><Link href="/hajj-umrah" className="hover:text-white transition-colors">Hajj & Umrah</Link></li>
                        </ul>
                    </div>

                    {/* Supports */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-secondary">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
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
                                <span className="whitespace-pre-line">{settings?.physical_address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-secondary shrink-0" />
                                <span>{settings?.whatsapp_number}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-secondary shrink-0" />
                                <span>{settings?.support_email}</span>
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
