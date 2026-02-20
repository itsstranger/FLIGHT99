import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Plane, Building2 } from 'lucide-react';

const services = [
    { icon: Plane, label: "Air Ticket", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Building2, label: "Umrah & Hajj", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: Building2, label: "Hotel Booking", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: FileText, label: "Global Visa Services", color: "text-orange-600", bg: "bg-orange-50" },
    { icon: FileText, label: "Saudi Visa Services", color: "text-green-600", bg: "bg-green-50" },
    { icon: Shield, label: "Travel Insurance", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: Plane, label: "Holiday Packages", color: "text-rose-600", bg: "bg-rose-50" },
];

const ServiceBar = () => {
    return (
        <div className="w-full pt-4 pb-2 px-2 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 md:gap-x-12 md:gap-y-10">
                {services.map((service, index) => (
                    <motion.div
                        key={service.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + (index * 0.05) }}
                        className="w-[calc(33.33%-1rem)] sm:w-[calc(25%-1rem)] md:w-[140px] flex flex-col items-center justify-start gap-4 group cursor-pointer"
                    >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg ${service.bg} border-2 border-transparent group-hover:border-${service.color.split('-')[1]}-200`}>
                            <service.icon className={`w-7 h-7 ${service.color}`} strokeWidth={1.5} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors text-center leading-tight px-1">
                            {service.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ServiceBar;
