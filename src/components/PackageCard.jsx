import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PackageCard = ({ packageData }) => {
    const { id, title, image, image_url, duration, price, location } = packageData;
    const displayImage = image_url || image;

    // Premium Glassmorphism Bottom Panel
    const bottomBgColor = 'bg-white/90 backdrop-blur-xl border-t border-white/60 text-gray-900';

    // Mock up a fake original price (+10% for the strike-through effect in the design)
    const originalPrice = Math.floor(price * 1.11);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all h-[420px] flex flex-col`}
        >
            {/* Top Section - Image + Title Overlay */}
            <div className="relative h-[65%] w-full overflow-hidden shrink-0">
                {!displayImage ? (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">No Image</div>
                ) : displayImage.startsWith('data:') ? (
                    // base64 from admin upload — Next.js <Image> can't optimize data: URLs
                    <img
                        src={displayImage}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    // Real remote URL (Supabase Storage / Unsplash) — use optimized Image
                    <Image
                        src={displayImage}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={false}
                    />
                )}
                {/* Gradient for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                {/* Overlaid Title */}
                <h3 className="absolute bottom-4 left-5 right-5 text-white font-bold text-xl leading-tight drop-shadow-md line-clamp-2">
                    {title}
                </h3>
            </div>

            {/* Bottom Section - Info Block */}
            <div className={`flex flex-col flex-1 p-5 ${bottomBgColor} text-white`}>

                {/* Row 1: Duration & Location */}
                <div className="flex items-center gap-3 mb-auto">
                    <div className="bg-primary/10 text-primary px-2.5 py-1.5 rounded-md text-xs font-bold tracking-wide">
                        {duration}
                    </div>
                    <span className="text-sm font-medium text-gray-600 truncate">
                        {location}
                    </span>
                </div>

                {/* Sep. Line (Optional, visually inferred from structured spacing) */}
                <div className="h-px w-full bg-gray-200 my-4" />

                {/* Row 2: Pricing & CTA */}
                <div className="flex items-end justify-between w-full">
                    <div className="flex flex-col">
                        {/* Struck-through original price */}
                        <span className="text-xs text-gray-400 line-through decoration-gray-400/40 mb-0.5">
                            ₹{originalPrice.toLocaleString()}/-
                        </span>
                        {/* Main Price */}
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl lg:text-2xl leading-none font-semibold tracking-tight text-primary">
                                ₹{price.toLocaleString()}/-
                            </span>
                        </div>
                    </div>

                    <Link href={`/tour-packages/${id}`}>
                        <button className="bg-primary text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PackageCard;
