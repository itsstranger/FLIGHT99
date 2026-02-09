import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const PackageCard = ({ packageData }) => {
    const { id, title, image, duration, price, rating, reviews, location } = packageData;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 transition-all hover:shadow-xl"
        >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
                    Bestseller
                </div>
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="line-clamp-1 text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            {location}
                        </p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg text-yellow-700 font-medium text-xs">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        {rating}
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1.5 text-xs font-medium bg-gray-50 px-3 py-1.5 rounded-full text-gray-600">
                        <Clock className="w-3.5 h-3.5" />
                        {duration}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Starting from</span>
                        <span className="text-xl font-bold text-primary">₹{price.toLocaleString()}</span>
                    </div>

                    <Link to={`/packages/${id}`}>
                        <Button size="sm" variant="outline" className="text-xs px-3 group-hover:bg-primary group-hover:text-white transition-all">
                            View Itinerary <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PackageCard;
