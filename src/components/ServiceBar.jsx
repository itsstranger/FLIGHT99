import React from 'react';
import { motion } from 'framer-motion';
import { FileText, RefreshCcw, Shield, Plane, Building2, GraduationCap } from 'lucide-react';

const services = [
    { icon: FileText, label: "Visa Services", color: "text-blue-600" },
    { icon: Shield, label: "Travel Insurance", color: "text-green-600" },
    { icon: RefreshCcw, label: "Forex", color: "text-purple-600" },
    { icon: Plane, label: "Airport Transfers", color: "text-orange-600" },
    { icon: Building2, label: "Umrah Packages", color: "text-teal-600" },
    { icon: GraduationCap, label: "Student Fares", color: "text-red-600" },
];

const ServiceBar = () => {
    return (
        <div className="w-full overflow-x-auto pb-2 pt-2 no-scrollbar">
            <div className="flex gap-3 md:gap-4 px-2 min-w-max mx-auto justify-center">
                {services.map((service, index) => (
                    <motion.div
                        key={service.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (index * 0.1) }}
                        className="flex flex-col items-center gap-3 group cursor-pointer bg-white/80 backdrop-blur-sm border border-white/40 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl p-4 min-w-[100px]"
                    >
                        <div className={`w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110`}>
                            <service.icon className={`w-5 h-5 ${service.color}`} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700 group-hover:text-primary transition-colors whitespace-nowrap">
                            {service.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ServiceBar;
