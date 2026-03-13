'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const PlanTripFloat = () => {
    const { openModal } = useModal();

    return (
        <button
            onClick={() => openModal('plan')}
            className="fixed bottom-6 right-4 lg:bottom-8 lg:right-8 z-[60] flex lg:hidden items-center justify-center px-5 py-3.5 bg-[#32315c] text-white font-bold rounded-full shadow-xl hover:scale-105 hover:shadow-[0_10px_25px_rgba(50,49,92,0.25)] transition-all duration-300 gap-2 border border-white/10"
            aria-label="Plan Your Trip"
        >
            <Sparkles className="w-5 h-5 fill-white/20" />
            <span className="text-sm tracking-wide">Plan Trip</span>
        </button>
    );
};

export default PlanTripFloat;
