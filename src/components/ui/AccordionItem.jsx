import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Calendar, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

const AccordionItem = ({ day, title, description, isOpen, onClick }) => {
    return (
        <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-5 text-left bg-white relative z-10"
            >
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm shrink-0 transition-colors",
                        isOpen ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                    )}>
                        Day {day}
                    </div>
                    <h4 className="font-semibold text-lg text-gray-900">{title}</h4>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-5 pt-0 pl-[4.5rem] text-gray-600 leading-relaxed border-t border-gray-50 bg-gray-50/50">
                            {description}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccordionItem;
