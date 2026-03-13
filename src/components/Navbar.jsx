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
        { name: 'Tour Packages', path: '/tour-packages' },
    ];

    return (
        <nav
            className={`fixed z-40 transition-all duration-500 ${isScrolled ? 'top-0 left-0 right-0 md:top-4 md:left-4 md:right-4 bg-white/95 backdrop-blur-xl shadow-lg border border-gray-200/50 py-2 md:py-3 rounded-b-2xl md:rounded-[2rem]' : 'top-0 left-0 right-0 bg-white border-b-2 border-slate-100 py-4 md:py-6'}`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo & Mobile Menu Toggle */}
                    <div className="flex items-center gap-3">
                        {/* Hamburger - Mobile only */}
                        <button
                            className="md:hidden p-1 -ml-1 text-gray-700 hover:text-primary transition-colors focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-7 h-7" strokeWidth={2.5} />
                        </button>

                        {/* Logo - Clean */}
                        <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105" onClick={() => setIsMobileMenuOpen(false)}>
                            <img
                                src="/assets/logo.png"
                                alt="FLIGHT99 Travel Enterprises"
                                className="h-10 md:h-14 w-auto object-contain drop-shadow-sm"
                                suppressHydrationWarning={true}
                            />
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-5 xl:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`relative font-medium text-[14px] xl:text-[15px] tracking-normal whitespace-nowrap transition-colors py-2 px-1 lg:px-2 group ${pathname === link.path ? 'text-primary' : 'text-gray-600 hover:text-black'}`}
                            >
                                {link.name}
                                <span className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-[#e6a810] rounded-t-lg origin-center transition-transform duration-300 ease-out ${pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0">
                        <a href="tel:+917356409377" className="group flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-primary transition-all px-3 lg:px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md whitespace-nowrap">
                            <div className="bg-primary/10 p-1.5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(48,53,114,0.4)] flex-shrink-0">
                                <Phone className="w-3.5 h-3.5" />
                            </div>
                            Call Expert
                        </a>
                        <button
                            onClick={() => openModal('plan')}
                            className="relative overflow-hidden group bg-[#0a1128] text-white text-[14px] font-medium px-6 py-[10px] rounded-lg shadow-sm hover:shadow-md border border-white/10 transition-all duration-300 hover:bg-black whitespace-nowrap"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Plan Your Trip
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e6a810" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                            </span>
                            {/* Shiny Sweep Effect */}
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer z-0"></div>
                        </button>
                    </div>

                    {/* Mobile Only CTA - WhatsApp & Call icons */}
                    <div className="md:hidden flex items-center gap-2">
                        <a
                            href="https://wa.me/+917356409377?text=Hello%20FLIGHT99%20Travel%20Enterprises%2C%20I%20need%20help%20planning%20a%20trip%21"
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

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>

            {/* Mobile Menu Drawer */}
            <div className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[60] shadow-2xl flex flex-col transform transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Drawer Header */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-primary/5">
                    <img src="/assets/logo.png" alt="FLIGHT99 Travel Enterprises" className="h-8 w-auto object-contain" suppressHydrationWarning={true} />
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-500 hover:text-gray-800 hover:bg-white rounded-full transition-all shadow-sm">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Links */}
                <div className="flex-1 overflow-y-auto py-6">
                    <div className="flex flex-col px-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`px-4 py-3.5 rounded-xl font-bold uppercase tracking-wide transition-all ${pathname === link.path ? 'bg-primary/10 text-primary shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-10 px-6">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Contact & Support</p>
                        <a href="tel:+917356409377" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 text-gray-700 mb-3 hover:bg-gray-100 transition-colors shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Call Us 24/7</p>
                                <span className="font-black text-[15px]">+91 73564 09377</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Drawer Footer CTA */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 mt-auto">
                    <Button
                        variant="primary"
                        className="w-full shadow-xl shadow-primary/20 h-14 text-[16px] font-black tracking-widest uppercase rounded-2xl"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            openModal('plan');
                        }}
                    >
                        Plan Your Trip
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
