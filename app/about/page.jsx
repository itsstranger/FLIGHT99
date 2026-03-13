import React from 'react';
import { Users, Target, ShieldCheck, Award } from 'lucide-react';
import Button from '@/components/ui/Button';

const About = () => {
    return (
        <div className="pt-20 min-h-screen bg-white">
            {/* Cinematic Hero */}
            <div className="relative pt-10 pb-8 md:pt-16 md:pb-12 lg:pt-20 lg:pb-16 overflow-hidden flex items-center justify-center bg-[#0a1128] rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl z-10">
                {/* Advanced Glowing Orbs (Golden Ratio positioned) */}
                <div className="absolute top-0 right-0 w-[61.8vw] max-w-[800px] aspect-square bg-[#e6a810]/20 rounded-full blur-[100px] md:blur-[160px] -translate-y-[38.2%] translate-x-[38.2%] pointer-events-none mix-blend-screen mix-blend-color-dodge"></div>
                <div className="absolute bottom-0 left-0 w-[38.2vw] max-w-[600px] aspect-square bg-blue-500/30 rounded-full blur-[80px] md:blur-[120px] translate-y-[16.18%] -translate-x-[16.18%] pointer-events-none mix-blend-screen mix-blend-color-dodge"></div>

                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

                <div className="container mx-auto px-6 md:px-8 relative z-10 text-center flex flex-col items-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#e6a810] font-bold text-xs md:text-sm tracking-[0.1618em] uppercase mb-[2.618vh] shadow-[0_0_20px_rgba(230,168,16,0.2)]">
                        Our Story
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1] drop-shadow-2xl">
                        About Flight99
                    </h1>
                    <p className="text-[1rem] md:text-[1.618rem] text-white/80 max-w-[61.8%] min-w-[300px] mx-auto font-secondary leading-[1.618] font-medium drop-shadow-md">
                        Your trusted TRAVEL partner over 25 years.
                    </p>
                </div>
            </div>

            {/* Content */}
            <section className="py-20 container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience & Excellence</h2>
                        <p className="font-secondary text-gray-600 leading-relaxed mb-6">
                            FLIGHT99 Travel Enterprises has grown from a small ticketing agency to a comprehensive travel management company. With over two decades of industry experience, we specialize in curating seamless travel experiences for leisure and business travelers alike.
                        </p>
                        <p className="font-secondary text-gray-600 leading-relaxed mb-6">
                            Our commitment to "Absolute Trustability" and "Genuine Service" isn't just a slogan; it's the foundation of every booking we handle. From complex visa processing to luxury holiday packages, our expert team ensures every detail is perfect.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-4xl font-bold text-primary mb-2">25+</h3>
                                <p className="font-secondary text-sm font-semibold text-gray-500 uppercase">Years Experience</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
                                <p className="font-secondary text-sm font-semibold text-gray-500 uppercase">Global Destinations</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                            [Office/Team Image Placeholder]
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: ShieldCheck, title: "Absolute Trustability", desc: "We operate with total transparency and integrity in pricing and services." },
                        { icon: Users, title: "Client First", desc: "Your comfort and satisfaction are our top priorities, 24/7." },
                        { icon: Award, title: "Industry Experts", desc: "Our team consists of certified professionals with deep travel knowledge." }
                    ].map((val, idx) => (
                        <div key={idx} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                            <val.icon className="w-10 h-10 text-secondary mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{val.title}</h3>
                            <p className="text-gray-600">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
