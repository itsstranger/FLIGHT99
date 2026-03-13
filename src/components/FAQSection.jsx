'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const faqs = [
    {
        question: "How do I organize my trip?",
        answer: "From our well-designed tour packages, you can easily choose the details that you want. Otherwise, you can also customize your plan with us by sharing your requirements. So we can help you to design an amazing trip based on your specifications."
    },
    {
        question: "What are the packages you offer?",
        answer: "Journey through the essence of global destinations with FLIGHT99. You can customize and explore your trip from the spiritual journey of Hajj and Umrah packages to the landscapes of Europe with us. Here are the packages we offer:\n\n• International packages: Europe, USA, Turkey, Azerbaijan, Thailand, Malaysia, Vietnam, Dubai & more\n• Domestic Packages: Kashmir, Delhi, Agra, Manali, Jaipur, Honeymoon packages\n• Spiritual packages: Hajj and Umrah, Customised Umrah"
    },
    {
        question: "What about the payment process?",
        answer: "Normally, after getting an advance amount, we will start to confirm your arrangements for the trip. The services depend on the amount that you may require. You need to pay the amount before the arrival of the journey. You can pay via bank transfer, credit card, cash, etc."
    },
    {
        question: "Is there a cancellation policy possible after booking?",
        answer: "Yes, we customize your tour packages as per your needs, so the cancellation also varies across services and hotels. Nevertheless, make sure to cancel before you make any payments."
    },
    {
        question: "What should I do to book my trip with you?",
        answer: "If you are excited about our packages, feel free to contact us for your dream journey. Our expert travel consultants are ready to assist you in planning every detail."
    }
];

export const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-gray-200 rounded-2xl mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-white relative z-10 hover:bg-gray-50/50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors ${isOpen ? "bg-primary text-white" : "bg-blue-50 text-primary"}`}>
                        <HelpCircle className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 pr-4 font-secondary">{question}</h4>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                >
                    <ChevronDown className={`w-5 h-5 ${isOpen ? "text-primary" : "text-gray-400"}`} />
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
                        <div className="p-5 md:p-6 pt-0 md:pt-0 pl-[4.5rem] md:pl-[5.5rem] text-gray-600 leading-relaxed border-t border-gray-50 bg-gray-50/30 whitespace-pre-wrap font-secondary">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function FAQSection({ limit }) {
    const [openIndex, setOpenIndex] = useState(0);
    const displayFaqs = limit ? faqs.slice(0, limit) : faqs;

    return (
        <div className="w-full">
            {displayFaqs.map((faq, index) => (
                <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
            ))}
        </div>
    );
}
