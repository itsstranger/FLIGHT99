'use client'; // Client Component due to hooks

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane, Calendar, ShieldCheck, Map, ArrowRight, TrendingUp, Users, Globe2, ChevronDown, CheckCircle2 } from 'lucide-react';
import { usePackages } from '@/context/PackageContext';
import PackageCard from '@/components/PackageCard';
import Button from '@/components/ui/Button';
import ServiceBar from '@/components/ServiceBar';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Helper to get asset path
const getAssetPath = (path) => `/assets/${path.split('/').pop()}`;

const Home = () => {
    const router = useRouter();
    const { packages } = usePackages();
    const [searchType, setSearchType] = useState('international');
    const [destination, setDestination] = useState('');
    const [activeTab, setActiveTab] = useState('flights');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Extended Flight Form State
    const [flightFrom, setFlightFrom] = useState('');
    const [flightTo, setFlightTo] = useState('');
    const [flightTripType, setFlightTripType] = useState('one-way');
    const [showContactPrompt, setShowContactPrompt] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { scrollY } = useScroll();
    const yBg = useTransform(scrollY, [0, 500], [0, 200]);

    // Custom Dropdown State
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isDestOpen, setIsDestOpen] = useState(false);
    const typeRef = useRef(null);
    const destRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (typeRef.current && !typeRef.current.contains(event.target)) setIsTypeOpen(false);
            if (destRef.current && !destRef.current.contains(event.target)) setIsDestOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();
        params.set('type', searchType);
        if (destination) params.set('destination', destination);
        router.push(`/tour-packages?${params.toString()}`);
    };

    const handleFlightSubmit = async (e) => {
        e.preventDefault();

        if (!showContactPrompt) {
            setShowContactPrompt(true);
            return;
        }

        setIsSubmitting(true);
        const formElement = e.target;
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData.entries());
        data.service_type = 'flight';

        // Enrich priorities with trip details for backend and email
        let tripDetails = data.trip_type === 'round-trip' ? `Round Trip (Return: ${data.return_date || 'N/A'})` : 'One Way';
        data.priorities = `Passengers/Class: ${data.passengers || 'N/A'}. Trip Type: ${tripDetails}`;
        // Update the FormData object for the email submission as well
        formData.set('priorities', data.priorities);

        formData.append("access_key", "fd4cbdc6-dbae-42b4-9ed9-a09170314f38");
        formData.append("subject", `New Flight Enquiry from ${data.name} to ${data.to}`);
        formData.append("from_name", "FLIGHT99 Website");

        try {
            await Promise.all([
                fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData }),
                fetch('/api/send-enquiry', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                })
            ]);
            setShowSuccess(true);
            setShowContactPrompt(false);
            formElement.reset();

            // Auto hide success overlay after 3.5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3500);
        } catch (err) {
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const uniqueDestinations = Array.from(new Set(
        packages
            .filter(p => !searchType || p.type.toLowerCase() === searchType)
            .map(p => p.location)
    ));

    return (
        <>
            {/* Hero Section Layer (Video & Text Only) */}
            <section className="relative flex flex-col items-center w-full bg-gray-50">
                {/* Parallax Background - Fixed Height Video Banner */}
                <motion.div style={{ y: yBg }} className="absolute top-0 left-0 right-0 h-[500px] z-0 overflow-hidden bg-gray-900 pointer-events-none">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover object-center opacity-80"
                    >
                        <source src="/assets/clouds-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Dark Overlay for Text Contrast */}
                    <div className="absolute inset-0 bg-black/40 z-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent z-0" />
                </motion.div>

                {/* Content Container (Fixed to match video height, pushing down text) */}
                <div className="relative z-10 w-full flex flex-col items-center h-[500px] justify-center px-4 md:px-6 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center flex flex-col items-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg text-center">
                            Travel brings <br />
                            <span className="text-secondary italic font-serif">pleasure</span>
                        </h1>
                        <p className="text-lg text-gray-100 max-w-2xl mx-auto drop-shadow-md text-center">
                            Discover exclusive deals on flights, premium holiday packages, and hassle-free visa services.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Overlapping Straddle Search Widget Layer */}
            <div className="relative z-30 w-full flex flex-col items-center px-4 -mt-[145px] md:-mt-[155px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="w-full max-w-5xl"
                >
                    {/* Tabs */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-gray-900/40 backdrop-blur-md p-1.5 rounded-full inline-flex gap-2">
                            <button
                                onClick={() => setActiveTab('flights')}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'flights' ? 'bg-primary text-white shadow-md' : 'text-gray-200 hover:text-white'}`}
                            >
                                Flight Tickets
                            </button>
                            <button
                                onClick={() => setActiveTab('packages')}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'packages' ? 'bg-primary text-white shadow-md' : 'text-gray-200 hover:text-white'}`}
                            >
                                Tour Packages
                            </button>
                        </div>
                    </div>

                    {activeTab === 'packages' ? (
                        <div className="bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-100 flex flex-col md:flex-row w-full mt-4">

                            {/* Trip Type Custom Dropdown */}
                            <div
                                ref={typeRef}
                                className="relative flex flex-col w-full md:w-1/3 px-6 py-5 border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-50 transition-colors rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none cursor-pointer"
                                onClick={() => { setIsTypeOpen(!isTypeOpen); setIsDestOpen(false); }}
                            >
                                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 mb-2 tracking-wider cursor-pointer">
                                    <Map className="w-4 h-4 text-primary" /> Trip Type
                                </label>
                                <div className="flex items-center justify-between w-full text-lg font-bold text-gray-900 capitalize">
                                    <span>{searchType}</span>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isTypeOpen ? 'rotate-180 text-primary' : ''}`} />
                                </div>

                                {/* Dropdown Menu */}
                                {isTypeOpen && (
                                    <div className="absolute top-[calc(100%+8px)] left-0 w-[calc(100%+2px)] bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                                        {['domestic', 'international'].map(type => (
                                            <div
                                                key={type}
                                                className={`px-6 py-3 hover:bg-gray-50 cursor-pointer font-bold capitalize transition-colors ${searchType === type ? 'text-primary bg-primary/5' : 'text-gray-700'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSearchType(type);
                                                    setIsTypeOpen(false);
                                                    setDestination(''); // Reset destination on type change
                                                }}
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Destination Custom Dropdown */}
                            <div
                                ref={destRef}
                                className="relative flex flex-col flex-1 px-6 py-5 hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => { setIsDestOpen(!isDestOpen); setIsTypeOpen(false); }}
                            >
                                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 mb-2 tracking-wider cursor-pointer">
                                    <Globe2 className="w-4 h-4 text-primary" /> Destination
                                </label>
                                <div className="flex items-center justify-between w-full text-lg font-bold text-gray-900">
                                    <span className={!destination ? "text-gray-400 font-medium" : ""}>
                                        {destination || `Any ${searchType === 'international' ? 'International' : 'Domestic'} Destination`}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDestOpen ? 'rotate-180 text-primary' : ''}`} />
                                </div>

                                {/* Dropdown Menu */}
                                {isDestOpen && (
                                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-2 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                                        <div
                                            className={`px-6 py-3 hover:bg-gray-50 cursor-pointer font-medium transition-colors ${!destination ? 'text-primary bg-primary/5 font-bold' : 'text-gray-600'}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDestination('');
                                                setIsDestOpen(false);
                                            }}
                                        >
                                            Any {searchType === 'international' ? 'International' : 'Domestic'} Destination
                                        </div>
                                        {uniqueDestinations.map(loc => (
                                            <div
                                                key={loc}
                                                className={`px-6 py-3 hover:bg-gray-50 cursor-pointer font-bold transition-colors ${destination === loc ? 'text-primary bg-primary/5' : 'text-gray-700'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDestination(loc);
                                                    setIsDestOpen(false);
                                                }}
                                            >
                                                {loc}
                                            </div>
                                        ))}
                                        {uniqueDestinations.length === 0 && (
                                            <div className="px-6 py-4 text-gray-400 text-sm italic text-center">
                                                No destinations found for this type.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Search Button */}
                            <Button
                                size="lg"
                                className="h-[80px] md:h-auto md:w-56 rounded-none rounded-b-xl md:rounded-l-none md:rounded-r-xl text-xl font-black tracking-wider shadow-none hover:bg-primary/90 transition-all border-none"
                                variant="primary"
                                onClick={handleSearch}
                            >
                                SEARCH <ArrowRight className="w-6 h-6 ml-2" />
                            </Button>
                        </div>
                    ) : (
                        <form id="flight-form" onSubmit={handleFlightSubmit} className="w-full relative z-10 flex flex-col mt-4">
                            <input type="hidden" name="trip_type" value={flightTripType} form="flight-form" />

                            {/* Top Row: Trip Types & Title */}
                            <div className="flex flex-col md:flex-row items-center justify-between px-2 mb-2">
                                <div className="flex items-center gap-3">
                                    <label className={`flex items-center gap-2 cursor-pointer px-4 py-1.5 rounded-full text-sm font-bold shadow-sm transition-all ${flightTripType === 'one-way' ? 'bg-white text-gray-900' : 'text-gray-100 hover:bg-white/20'}`}>
                                        <input type="radio" name="trip_type_radio" value="one-way" checked={flightTripType === 'one-way'} onChange={() => setFlightTripType('one-way')} className="w-3.5 h-3.5 accent-red-500" /> One Way
                                    </label>
                                    <label className={`flex items-center gap-2 cursor-pointer px-4 py-1.5 rounded-full text-sm font-bold shadow-sm transition-all ${flightTripType === 'round-trip' ? 'bg-white text-gray-900' : 'text-gray-100 hover:bg-white/20'}`}>
                                        <input type="radio" name="trip_type_radio" value="round-trip" checked={flightTripType === 'round-trip'} onChange={() => setFlightTripType('round-trip')} className="w-3.5 h-3.5 accent-red-500" /> Round Trip
                                    </label>
                                    <label className={`hidden md:flex items-center gap-2 cursor-pointer px-4 py-1.5 rounded-full text-sm font-bold shadow-sm transition-all ${flightTripType === 'multi-city' ? 'bg-white text-gray-900' : 'text-gray-100 hover:bg-white/20'}`}>
                                        <input type="radio" name="trip_type_radio" value="multi-city" checked={flightTripType === 'multi-city'} onChange={() => setFlightTripType('multi-city')} className="w-3.5 h-3.5 accent-red-500" /> Multi City
                                    </label>
                                </div>
                                <div className="hidden md:flex items-center gap-2 text-white font-bold text-lg">
                                    <Plane className="w-5 h-5" /> Book Flight Tickets
                                </div>
                            </div>

                            {/* Main Horizontal Block */}
                            <div className="bg-white rounded-xl shadow-2xl flex flex-col md:flex-row relative items-stretch border border-gray-100 min-h-[95px]">

                                {/* From */}
                                <div className="flex-[1.2] flex flex-col justify-center px-4 md:px-5 py-3 hover:bg-blue-50/40 transition-colors rounded-t-xl md:rounded-l-xl md:rounded-tr-none border-b md:border-b-0 md:border-r border-gray-200 cursor-text group relative">
                                    <label className="text-gray-500 text-xs font-semibold mb-0.5 cursor-text group-hover:text-primary transition-colors">From</label>
                                    <input type="text" name="from" value={flightFrom} onChange={(e) => setFlightFrom(e.target.value)} required={!showContactPrompt} className="w-full text-[16px] md:text-lg font-bold text-gray-900 outline-none bg-transparent placeholder-gray-300 truncate md:pr-4" placeholder="Mumbai" />
                                    <span className="text-[11px] text-gray-500 mt-0.5 truncate block group-hover:text-gray-600 transition-colors font-medium">Enter city or airport</span>

                                    {/* Swap Icon */}
                                    <div className="absolute left-1/2 bottom-0 translate-y-1/2 md:top-1/2 md:-translate-y-1/2 md:left-auto md:right-0 md:translate-x-1/2 -translate-x-1/2 z-20 w-8 h-8 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12)] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100 text-[#32315c] hover:text-[#32315c]/80" onClick={() => { const temp = flightFrom; setFlightFrom(flightTo); setFlightTo(temp); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path d="M4 17h16" /></svg>
                                    </div>
                                </div>

                                {/* To */}
                                <div className="flex-[1.2] flex flex-col justify-center px-4 md:px-5 py-3 hover:bg-blue-50/40 transition-colors border-b md:border-b-0 md:border-r border-gray-200 cursor-text pl-4 md:pl-8 pt-5 md:pt-3 group relative">
                                    <label className="text-gray-500 text-xs font-semibold mb-0.5 cursor-text group-hover:text-primary transition-colors">To</label>
                                    <input type="text" name="to" value={flightTo} onChange={(e) => setFlightTo(e.target.value)} required={!showContactPrompt} className="w-full text-[16px] md:text-lg font-bold text-gray-900 outline-none bg-transparent placeholder-gray-300 truncate" placeholder="New Delhi" />
                                    <span className="text-[11px] text-gray-500 mt-0.5 truncate block group-hover:text-gray-600 transition-colors font-medium">Enter city or airport</span>
                                </div>

                                {/* Departure */}
                                <div className="flex-[0.9] flex flex-col justify-center px-4 md:px-5 py-3 hover:bg-blue-50/40 transition-colors border-b md:border-b-0 md:border-r border-gray-200 cursor-text bg-blue-50/20 group relative overflow-hidden">
                                    <label className="text-gray-500 text-xs font-semibold mb-0.5 flex items-center gap-1 cursor-text group-hover:text-primary transition-colors">
                                        <Calendar className="w-3 h-3" /> Departure
                                        <ChevronDown className="w-3 h-3 ml-0.5 opacity-50" />
                                    </label>
                                    <div className="relative w-full">
                                        <input type="date" name="date" required={!showContactPrompt} className="w-full text-[14px] md:text-[15px] font-bold text-gray-900 outline-none bg-transparent mt-0.5 z-10 cursor-pointer relative [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                                    </div>
                                </div>

                                {/* Return */}
                                <div className={`flex-[0.9] flex flex-col justify-center px-4 md:px-5 py-3 transition-colors border-b md:border-b-0 md:border-r border-gray-200 cursor-text group relative ${flightTripType === 'round-trip' ? 'hover:bg-blue-50/40 bg-white' : 'bg-gray-50/80 opacity-60 hover:opacity-100 hover:bg-gray-50'}`}>
                                    <label className="text-gray-500 text-xs font-semibold mb-0.5 flex items-center gap-1 cursor-text group-hover:text-primary transition-colors relative w-full">
                                        <Calendar className="w-3 h-3" /> Return
                                        <ChevronDown className="w-3 h-3 ml-0.5 opacity-50" />
                                    </label>
                                    {flightTripType === 'round-trip' ? (
                                        <div className="relative w-full">
                                            <input type="date" name="return_date" required={flightTripType === 'round-trip' && !showContactPrompt} className="w-full text-[14px] md:text-[15px] font-bold text-gray-900 outline-none bg-transparent mt-0.5 relative z-10 cursor-pointer animate-in fade-in [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                                        </div>
                                    ) : (
                                        <div className="text-[11px] text-gray-400 mt-1.5 font-medium leading-tight cursor-pointer relative z-10 h-[22px] flex items-center" onClick={() => setFlightTripType('round-trip')}>
                                            Tap to add a return date
                                        </div>
                                    )}
                                </div>

                                {/* Travellers & Class */}
                                <div className="flex-[1] flex flex-col justify-center px-5 py-3 hover:bg-blue-50/40 transition-colors cursor-text group">
                                    <label className="text-gray-500 text-xs font-semibold mb-0.5 cursor-text group-hover:text-primary transition-colors">Travellers & Class</label>
                                    <input type="text" name="passengers" required={!showContactPrompt} className="w-full text-[15px] md:text-[16px] font-bold text-gray-900 outline-none bg-transparent placeholder-gray-800 truncate" placeholder="1 Traveller, Economy" defaultValue="1 Traveller" />
                                    <span className="text-[11px] text-gray-500 mt-0.5 block font-medium truncate">Economy/Business</span>
                                </div>

                                {/* Primary Desktop Book Button */}
                                <div className="hidden lg:flex flex-col">
                                    <button type="submit" disabled={showContactPrompt && isSubmitting} className="h-full w-40 bg-[#32315c] hover:bg-[#201d46] rounded-r-xl text-white font-bold text-[19px] tracking-wide flex items-center justify-center transition-all shadow-md group-hover:shadow-lg">
                                        {isSubmitting && !showContactPrompt ? '...' : 'BOOKING'}
                                    </button>
                                </div>

                            </div>

                            {/* Bottom Row: Filters (Desktop) */}
                            <div className="hidden md:flex flex-wrap items-center gap-1.5 bg-gray-50/95 backdrop-blur-sm px-4 py-2 mt-[-5px] rounded-b-[10px] w-fit mx-auto shadow-sm text-gray-600 text-[11px] font-medium border border-gray-200 border-t-0 -z-10 relative pt-3">
                                <label className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 px-2"><input type="checkbox" className="accent-gray-500 rounded-sm" /> Direct Flights</label>
                                <label className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 px-2"><input type="checkbox" className="accent-gray-500 rounded-sm" /> Defence Fare</label>
                                <label className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 px-2"><input type="checkbox" className="accent-gray-500 rounded-sm" /> Student Fare</label>
                                <label className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 px-2"><input type="checkbox" className="accent-gray-500 rounded-sm" /> Senior Citizen Fare</label>
                            </div>

                            {/* Mobile Book Button */}
                            <div className="lg:hidden mt-4">
                                <button type="submit" disabled={showContactPrompt && isSubmitting} className="w-full py-4 bg-[#32315c] hover:bg-[#201d46] rounded-xl text-white font-bold text-xl tracking-wide shadow-md">
                                    {isSubmitting && !showContactPrompt ? 'SENDING...' : 'BOOKING'}
                                </button>
                            </div>

                            {/* Contact Details Modal (Progressive Disclosure) */}
                            {showContactPrompt && typeof document !== 'undefined' && createPortal(
                                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                                    {/* Modal Backdrop */}
                                    <div
                                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                                        onClick={() => setShowContactPrompt(false)}
                                    ></div>

                                    {/* Modal Content */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
                                    >
                                        <div className="bg-primary px-6 py-4 flex items-center justify-between">
                                            <h3 className="text-white text-lg font-bold flex items-center gap-2">
                                                <Plane className="w-5 h-5" /> Complete Your Booking
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => setShowContactPrompt(false)}
                                                className="text-white/80 hover:text-white transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            </button>
                                        </div>

                                        <div className="p-6">
                                            <p className="text-gray-600 text-sm mb-5">Please provide your contact details so our travel experts can send you the best flight itineraries and confirm your booking.</p>

                                            <div className="flex flex-col gap-4">
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Full Name</label>
                                                    <input type="text" name="name" form="flight-form" required className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 shadow-sm font-medium text-gray-900 placeholder-gray-400" placeholder="John Doe" />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Phone Number</label>
                                                    <input type="tel" name="phone" form="flight-form" required className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 shadow-sm font-medium text-gray-900 placeholder-gray-400" placeholder="+91 98765 43210" />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Email Address</label>
                                                    <input type="email" name="email" form="flight-form" required className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 shadow-sm font-medium text-gray-900 placeholder-gray-400" placeholder="john@example.com" />
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <button type="submit" form="flight-form" disabled={isSubmitting} className="w-full py-4 bg-primary hover:bg-primary/90 rounded-xl text-white font-black text-[17px] tracking-widest shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 uppercase flex items-center justify-center gap-2">
                                                    {isSubmitting ? 'PROCESSING...' : 'CONFIRM FLIGHT BOOKING'}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>,
                                document.body
                            )}

                            {/* Success Tick Animation Modal */}
                            {showSuccess && typeof document !== 'undefined' && createPortal(
                                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                        className="bg-white rounded-[2rem] p-8 md:p-10 flex flex-col items-center shadow-2xl relative z-10 max-w-sm w-full text-center border-t-8 border-green-500"
                                    >
                                        <motion.div
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                            className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner ring-8 ring-green-50/50"
                                        >
                                            <CheckCircle2 className="w-12 h-12" />
                                        </motion.div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-wide">Booking Requested!</h3>
                                        <p className="text-gray-500 font-medium leading-relaxed">
                                            Your flight details have been securely sent. A travel expert will be in touch shortly with the best options.
                                        </p>
                                    </motion.div>
                                </div>,
                                document.body
                            )}
                        </form>
                    )}

                    {/* Service Bar */}
                    <div className="mt-8 mb-12">
                        <ServiceBar />
                    </div>
                </motion.div>
            </div>

            {/* Dynamic Trust Stats Section */}
            <section className="pt-8 pb-16 bg-white relative z-20 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {[
                            { icon: Globe2, value: "25+", label: "Years Experience", desc: "Serving the industry since 1999." },
                            { icon: ShieldCheck, value: "Absolute", label: "Trustability", desc: "Transparent dealings & secure payments." },
                            { icon: Users, value: "Genuine", label: "Service", desc: "Real support by real experts." },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="px-8 py-4 flex flex-col items-center text-center group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-primary">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-extrabold text-primary mb-1">{item.value}</h3>
                                <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">{item.label}</p>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Grid as Swiper Carousel */}
            <section className="py-20 bg-gray-50/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 text-center md:text-left">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Trending Destinations</h2>
                            <p className="text-gray-500">Curated packages that are selling out fast.</p>
                        </div>
                        <Link href="/tour-packages">
                            <Button variant="ghost" className="hidden md:inline-flex">View All Packages <ArrowRight className="ml-2 w-4 h-4" /></Button>
                        </Link>
                    </div>

                    <div className="-mx-4 px-4 md:mx-0 md:px-0">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={24}
                            slidesPerView={1.2}
                            breakpoints={{
                                640: { slidesPerView: 2.2 },
                                1024: { slidesPerView: 3.5 },
                                1280: { slidesPerView: 4 },
                            }}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            navigation
                            autoplay={{ delay: 5000, disableOnInteraction: true }}
                            className="!pb-12 !pt-4 [&_.swiper-button-next]:text-primary [&_.swiper-button-prev]:text-primary [&_.swiper-pagination-bullet-active]:bg-primary"
                        >
                            {/* We show more packages (up to 8) to make the carousel feel full */}
                            {packages.slice(0, 8).map((pkg) => (
                                <SwiperSlide key={pkg.id} className="h-auto">
                                    <PackageCard packageData={pkg} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link href="/tour-packages">
                            <Button variant="outline" className="w-full border-gray-300 text-gray-700">View All Packages</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Lead Magnet / Newsletter */}

        </>
    );
};

export default Home;
