'use client'; // Client Component due to hooks

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane, Calendar, ShieldCheck, Map, ArrowRight, TrendingUp, Users, Globe2, ChevronDown } from 'lucide-react';
import { usePackages } from '@/context/PackageContext';
import PackageCard from '@/components/PackageCard';
import Button from '@/components/ui/Button';
import ServiceBar from '@/components/ServiceBar';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

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
        router.push(`/packages?${params.toString()}`);
    };

    const uniqueDestinations = Array.from(new Set(
        packages
            .filter(p => !searchType || p.type.toLowerCase() === searchType)
            .map(p => p.location)
    ));

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 flex flex-col items-center">
                {/* Parallax Background - Fixed Height Video Banner */}
                <motion.div style={{ y: yBg }} className="absolute top-0 left-0 right-0 h-[500px] z-0 overflow-hidden bg-gray-900">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover object-center"
                    >
                        <source src="/assets/clouds-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Dark Overlay for Text Contrast */}
                    <div className="absolute inset-0 bg-black/30 z-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8 flex flex-col items-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg text-center">
                            Travel brings <br />
                            <span className="text-secondary italic font-serif">pleasure</span>
                        </h1>
                        <p className="text-lg text-gray-100 max-w-2xl mx-auto drop-shadow-md text-center">
                            Discover exclusive deals on flights, premium holiday packages, and hassle-free visa services.
                        </p>
                    </motion.div>

                    {/* Enhanced Searchology Engine */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="w-full max-w-5xl mt-16 md:mt-[100px]"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl shadow-black/10 border border-gray-100 flex flex-col md:flex-row w-full mt-4">

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
                                className="h-[80px] md:h-auto md:w-56 rounded-none rounded-b-3xl md:rounded-l-none md:rounded-r-3xl text-xl font-black tracking-wider shadow-none hover:bg-primary/90 transition-all border-none"
                                variant="primary"
                                onClick={handleSearch}
                            >
                                SEARCH <ArrowRight className="w-6 h-6 ml-2" />
                            </Button>
                        </div>

                        {/* Service Bar */}
                        <div className="mt-8">
                            <ServiceBar />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Dynamic Trust Stats Section */}
            <section className="py-16 bg-white relative z-20 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {[
                            { icon: Globe2, value: "25+", label: "Years Experience", desc: "Serving the industry since 1999." },
                            { icon: ShieldCheck, value: "100%", label: "Trustability", desc: "Transparent dealings & secure payments." },
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
                        <Link href="/packages">
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
                        <Link href="/packages">
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
