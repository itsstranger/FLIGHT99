'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Tour Packages', path: '/tour-packages', icon: Compass },
        { name: 'Visa', path: '/visa', icon: Search },
        { name: 'Umrah', path: '/hajj-umrah', icon: MapPin },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex flex-1 flex-col items-center justify-center h-full transition-all duration-300 relative ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {/* Active Tab Indicator (Floating Circle) */}
                            {isActive && (
                                <div className="absolute -top-5 left-0 right-0 flex justify-center z-10 pointer-events-none">
                                    <motion.div
                                        layoutId="bottomNavIndicator"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="w-14 h-14 bg-white rounded-full p-1 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] border-t border-gray-100 flex items-center justify-center pointer-events-auto"
                                    >
                                        <div className="w-full h-full bg-primary rounded-full flex items-center justify-center shadow-md">
                                            <Icon className="w-6 h-6 text-white stroke-[2]" />
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            {/* Inactive Icon OR Spacing for Active Icon */}
                            <div className={`${isActive ? 'opacity-0 h-6' : 'opacity-100'} transition-opacity duration-200`}>
                                {!isActive && <Icon className="w-6 h-6 stroke-[1.5]" />}
                            </div>

                            {/* Label */}
                            <span className={`text-[10px] font-medium tracking-wide mt-1 transition-all duration-200 ${isActive ? 'text-primary font-bold translate-y-1' : ''
                                }`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
