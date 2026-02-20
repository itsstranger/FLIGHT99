import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PackageCard = ({ packageData }) => {
    const { id, title, image, image_url, duration, price, location } = packageData;
    const displayImage = image_url || image;

    // Determine a subtle dynamic bottom block gradient based on location length or id to mimic the reference's variety
    const bgColors = [
        'bg-gradient-to-br from-[#717b68] to-[#515a49]', // olive/sage green gradient
        'bg-gradient-to-br from-[#5b7890] to-[#3a5870]', // slate blue gradient
        'bg-gradient-to-br from-[#3891db] to-[#1e6cb0]', // bright blue gradient
        'bg-gradient-to-br from-[#404635] to-[#252a1a]', // dark moss gradient
        'bg-gradient-to-br from-[#3b596b] to-[#1e3240]'  // dark slate gradient
    ];
    // Hash string to index
    const colorIndex = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % bgColors.length;
    const bottomBgColor = bgColors[colorIndex];

    // Mock up a fake original price (+10% for the strike-through effect in the design)
    const originalPrice = Math.floor(price * 1.11);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className={`group relative overflow-hidden rounded-md shadow-md hover:shadow-xl transition-all h-[420px] flex flex-col`}
        >
            {/* Top Section - Image + Title Overlay */}
            <div className="relative h-[65%] w-full overflow-hidden shrink-0">
                <img
                    src={displayImage}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
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
                    <div className="bg-black/30 backdrop-blur-sm px-2.5 py-1.5 rounded-md text-xs font-bold tracking-wide">
                        {duration}
                    </div>
                    <span className="text-sm font-medium text-white/90 truncate">
                        {location}
                    </span>
                </div>

                {/* Sep. Line (Optional, visually inferred from structured spacing) */}
                <div className="h-px w-full bg-white/20 my-4" />

                {/* Row 2: Pricing & CTA */}
                <div className="flex items-end justify-between w-full">
                    <div className="flex flex-col">
                        {/* Struck-through original price */}
                        <span className="text-xs text-white/60 line-through decoration-white/40 mb-0.5">
                            ₹{originalPrice.toLocaleString()}/-
                        </span>
                        {/* Main Price */}
                        <span className="text-[1.35rem] leading-none font-bold">
                            ₹{price.toLocaleString()}/-
                        </span>
                    </div>

                    <Link href={`/packages/${id}`}>
                        <button className="bg-white text-gray-900 font-bold text-xs px-4 py-2.5 rounded-sm hover:bg-gray-100 transition-colors shadow-sm">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PackageCard;
