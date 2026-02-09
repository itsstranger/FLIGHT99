import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg focus:ring-primary",
        secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-md hover:shadow-lg focus:ring-secondary",
        outline: "border-2 border-primary text-primary hover:bg-primary/10",
        ghost: "text-primary hover:bg-primary/10",
        white: "bg-white text-primary hover:bg-gray-50 shadow-md",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
