import React from 'react';
import { Users, Target, ShieldCheck, Award } from 'lucide-react';
import Button from '@/components/ui/Button';

const About = () => {
    return (
        <div className="pt-20 min-h-screen bg-white">
            {/* Hero */}
            <section className="relative h-[400px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/40 z-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">About FLIGHT99</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">Your trusted TRAVEL partner over 25 years.</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience & Excellence</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            FLIGHT99 Travel Enterprises has grown from a small ticketing agency to a comprehensive travel management company. With over two decades of industry experience, we specialize in curating seamless travel experiences for leisure and business travelers alike.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Our commitment to "Absolute Trustability" and "Genuine Service" isn't just a slogan; it's the foundation of every booking we handle. From complex visa processing to luxury holiday packages, our expert team ensures every detail is perfect.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-4xl font-bold text-primary mb-2">25+</h3>
                                <p className="text-sm font-semibold text-gray-500 uppercase">Years Experience</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
                                <p className="text-sm font-semibold text-gray-500 uppercase">Global Destinations</p>
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
