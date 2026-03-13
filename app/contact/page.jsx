'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function ContactPage() {
    const [status, setStatus] = useState('idle');
    const { settings } = useSettings();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.service_type = 'general_contact';

            const response = await fetch('/api/send-enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                e.target.reset();
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            console.error('Submit error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col pt-16 selection:bg-primary/20">
            {/* Cinematic Hero */}
            <div className="relative pt-10 pb-8 md:pt-16 md:pb-12 lg:pt-20 lg:pb-16 overflow-hidden flex items-center justify-center bg-[#0a1128] rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl z-10">
                {/* Advanced Glowing Orbs (Golden Ratio positioned) */}
                <div className="absolute top-0 right-0 w-[61.8vw] max-w-[800px] aspect-square bg-[#e6a810]/20 rounded-full blur-[100px] md:blur-[160px] -translate-y-[38.2%] translate-x-[38.2%] pointer-events-none mix-blend-screen mix-blend-color-dodge"></div>
                <div className="absolute bottom-0 left-0 w-[38.2vw] max-w-[600px] aspect-square bg-blue-500/30 rounded-full blur-[80px] md:blur-[120px] translate-y-[16.18%] -translate-x-[16.18%] pointer-events-none mix-blend-screen mix-blend-color-dodge"></div>

                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

                <div className="container mx-auto px-6 md:px-8 relative z-10 text-center flex flex-col items-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#e6a810] font-bold text-xs md:text-sm tracking-[0.1618em] uppercase mb-[2.618vh] shadow-[0_0_20px_rgba(230,168,16,0.2)]">
                        We're Here for You
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-[1.1]">
                        Contact Us
                    </h1>
                    <p className="text-[1rem] md:text-[1.2rem] lg:text-[1.618rem] text-white/80 max-w-[61.8%] min-w-[300px] mx-auto font-secondary leading-[1.618] font-medium drop-shadow-md">
                        Have a question about our tour packages, visa services, or flights? Get in touch with the FLIGHT99 team today.
                    </p>

                </div>
            </div>

            {/* Main Content (Equal Sizes Layout) */}
            <div className="container mx-auto px-6 md:px-8 py-[4vh] md:py-[8vh] flex-1 relative z-30">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[3rem] md:gap-[5rem] items-start">

                    {/* Left: Contact Info */}
                    <div className="space-y-[2.618rem] sticky top-[16.18vh]">
                        <div>
                            <h2 className="text-[1.618rem] md:text-[2.618rem] font-black text-gray-900 font-heading uppercase mb-[1.618rem] leading-[1.1] tracking-tight">Let's Talk About Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#e6a810]">Journey</span></h2>
                            <p className="text-[1rem] md:text-[1.1rem] text-gray-600 font-secondary leading-[1.618]">
                                Whether you're planning a corporate retreat, a spiritual journey, or a family vacation, our expert travel consultants are here to help you design the perfect itinerary.
                            </p>
                        </div>

                        <div className="space-y-[1.618rem]">
                            {/* Contact Card 1 */}
                            <div className="group flex items-start gap-[1rem] md:gap-[1.618rem] p-[1.618rem] rounded-[1.618rem] bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1">
                                <div className="w-[3.82rem] h-[3.82rem] rounded-[1rem] bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                                    <Phone className="w-[1.618rem] h-[1.618rem] text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1 font-secondary text-[1rem] md:text-[1.1rem] group-hover:text-primary transition-colors">Call Us Directly</h4>
                                    <a href={`tel:${settings.whatsapp_number?.replace(/\s+/g, '')}`} className="text-gray-600 font-secondary text-[1rem] hover:text-primary transition-colors inline-block">{settings.whatsapp_number}</a>
                                    <p className="text-gray-400 text-[0.75rem] mt-[0.382rem] uppercase tracking-[0.1em] font-bold">Available Mon-Sat, 9AM to 7PM</p>
                                </div>
                            </div>

                            {/* Contact Card 2 */}
                            <div className="group flex items-start gap-[1rem] md:gap-[1.618rem] p-[1.618rem] rounded-[1.618rem] bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1">
                                <div className="w-[3.82rem] h-[3.82rem] rounded-[1rem] bg-gradient-to-br from-[#e6a810]/10 to-yellow-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                                    <Mail className="w-[1.618rem] h-[1.618rem] text-[#e6a810]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1 font-secondary text-[1rem] md:text-[1.1rem] group-hover:text-[#e6a810] transition-colors">Email Us</h4>
                                    <a href={`mailto:${settings.support_email}`} className="text-gray-600 font-secondary text-[1rem] hover:text-[#e6a810] transition-colors inline-block">{settings.support_email}</a>
                                    <p className="text-gray-400 text-[0.75rem] mt-[0.382rem] uppercase tracking-[0.1em] font-bold">We reply within 24 hours</p>
                                </div>
                            </div>

                            {/* Contact Card 3 */}
                            <div className="group flex items-start gap-[1rem] md:gap-[1.618rem] p-[1.618rem] rounded-[1.618rem] bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1">
                                <div className="w-[3.82rem] h-[3.82rem] rounded-[1rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                                    <MapPin className="w-[1.618rem] h-[1.618rem] text-indigo-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1 font-secondary text-[1rem] md:text-[1.1rem] group-hover:text-indigo-500 transition-colors">Visit Our Office</h4>
                                    <p className="text-gray-600 font-secondary leading-[1.618] text-[1rem] group-hover:text-gray-900 transition-colors whitespace-pre-line">
                                        {settings.physical_address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Glassmorphism Contact Form */}
                    <div className="relative">
                        {/* Decorative background blur behind form */}
                        <div className="absolute -inset-[3.82rem] bg-gradient-to-br from-primary/10 via-transparent to-[#e6a810]/10 rounded-[4.236rem] blur-[60px] opacity-70 pointer-events-none hidden lg:block"></div>

                        <div className="relative bg-white/80 backdrop-blur-2xl rounded-[2.618rem] p-[1.618rem] md:p-[2.618rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/60">

                            <div className="flex items-center justify-between mb-[2.618rem]">
                                <h3 className="text-[1.618rem] font-black text-gray-900 font-heading uppercase tracking-tight">Send a Message</h3>
                                <div className="p-3 bg-gray-50 rounded-full shrink-0">
                                    <Send className="w-5 h-5 text-primary" />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-[1.618rem]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.618rem]">
                                    {/* Glass Input 1 */}
                                    <div>
                                        <label htmlFor="name" className="text-gray-500 font-bold uppercase tracking-[0.1em] text-[0.618rem] md:text-[0.75rem] ml-[1rem] mb-[0.618rem] block transition-colors">Full Name</label>
                                        <input type="text" name="name" required id="name" className="w-full bg-gray-50/60 hover:bg-gray-50 px-[1.618rem] py-[1rem] rounded-[1.2rem] border border-gray-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:bg-white transition-all font-semibold text-gray-900 text-[1rem]" placeholder="John Doe" />
                                    </div>
                                    {/* Glass Input 2 */}
                                    <div>
                                        <label htmlFor="phone" className="text-gray-500 font-bold uppercase tracking-[0.1em] text-[0.618rem] md:text-[0.75rem] ml-[1rem] mb-[0.618rem] block transition-colors">Phone Number</label>
                                        <input type="tel" name="phone" required id="phone" className="w-full bg-gray-50/60 hover:bg-gray-50 px-[1.618rem] py-[1rem] rounded-[1.2rem] border border-gray-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:bg-white transition-all font-semibold text-gray-900 text-[1rem]" placeholder="+91 98765 43210" />
                                    </div>
                                </div>

                                {/* Glass Input 3 */}
                                <div>
                                    <label htmlFor="email" className="text-gray-500 font-bold uppercase tracking-[0.1em] text-[0.618rem] md:text-[0.75rem] ml-[1rem] mb-[0.618rem] block transition-colors">Email Address <span className="lowercase font-normal opacity-70">(Optional)</span></label>
                                    <input type="email" name="email" id="email" className="w-full bg-gray-50/60 hover:bg-gray-50 px-[1.618rem] py-[1rem] rounded-[1.2rem] border border-gray-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:bg-white transition-all font-semibold text-gray-900 text-[1rem]" placeholder="john@example.com" />
                                </div>

                                {/* Glass Textarea */}
                                <div>
                                    <label htmlFor="message" className="text-gray-500 font-bold uppercase tracking-[0.1em] text-[0.618rem] md:text-[0.75rem] ml-[1rem] mb-[0.618rem] block transition-colors">How can we help?</label>
                                    <textarea name="message" id="message" required rows="5" className="w-full bg-gray-50/60 hover:bg-gray-50 px-[1.618rem] py-[1.618rem] rounded-[1.618rem] border border-gray-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:bg-white transition-all font-semibold text-gray-900 text-[1rem] resize-none leading-[1.618]" placeholder="I'm interested in booking a custom tour package..."></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="relative overflow-hidden w-full group py-[1.2rem] bg-gray-900 rounded-[1.618rem] text-white font-black tracking-[0.2em] uppercase transition-all shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] hover:-translate-y-1 flex items-center justify-center gap-[1rem]"
                                >
                                    {/* Hover sweep effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

                                    {status === 'submitting' ? (
                                        <span className="flex items-center gap-[0.618rem] text-[1rem]">Sending... <Loader2 className="w-5 h-5 animate-spin" /></span>
                                    ) : status === 'success' ? (
                                        <span className="flex items-center gap-[0.618rem] text-green-400 text-[1rem]"><CheckCircle2 className="w-6 h-6" /> Message Sent</span>
                                    ) : (
                                        <span className="flex items-center gap-[0.618rem] text-[1rem]">Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                                    )}
                                </button>

                                {status === 'error' && (
                                    <div className="p-[1rem] bg-red-50 text-red-600 rounded-[1rem] border border-red-100 text-center font-bold text-[0.85rem] mt-[1rem]">
                                        Failed to send message. Please try again later.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
