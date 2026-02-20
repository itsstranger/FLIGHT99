import React from 'react';
import { motion } from 'framer-motion';
import { FileText, RefreshCcw, Shield, Plane, Building2, GraduationCap } from 'lucide-react';

const services = [
    { icon: Plane, label: "Air Ticket", color: "text-blue-600" },
    { icon: Building2, label: "Umrah & Hajj", color: "text-emerald-600" },
    { icon: Building2, label: "Hotel Booking", color: "text-indigo-600" },
    { icon: FileText, label: "Global Visa Services", color: "text-orange-600" },
    { icon: FileText, label: "Saudi Visa Services", color: "text-green-600" },
    { icon: Shield, label: "Travel Insurance", color: "text-purple-600" },
    { icon: Plane, label: "Holiday Packages", color: "text-rose-600" },
];

const ServiceBar = () => {
    return (
        <div className="w-full pb-2 pt-2 md:block overflow-hidden">
            {/* Mobile Marquee */}
            <div className="md:hidden flex overflow-hidden mask-edges">
                <motion.div
                    className="flex shrink-0 animate-marquee gap-3 px-4"
                >
                    {[...services, ...services].map((service, index) => (
                        <div
                            key={`${service.label}-${index}`}
                            className="shrink-0 w-[140px] flex flex-col items-center justify-center gap-3 group cursor-pointer bg-white/80 backdrop-blur-sm border border-white/40 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl p-4 aspect-[4/3]"
                        >
                            <div className={`w-12 h-12 rounded-full bg-blue-50/50 flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <service.icon className={`w-6 h-6 ${service.color}`} />
                            </div>
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors text-center leading-tight">
                                {service.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-4 gap-4 px-4 max-w-4xl mx-auto pb-2">
                {services.map((service, index) => (
                    <motion.div
                        key={service.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                        className="flex flex-col items-center justify-center gap-3 group cursor-pointer bg-white/80 backdrop-blur-sm border border-white/40 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl p-4 aspect-[4/3]"
                    >
                        <div className={`w-12 h-12 rounded-full bg-blue-50/50 flex items-center justify-center transition-transform group-hover:scale-110`}>
                            <service.icon className={`w-6 h-6 ${service.color}`} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors text-center leading-tight">
                            {service.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ServiceBar;
