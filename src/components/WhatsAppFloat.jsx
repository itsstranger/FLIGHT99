'use client';

import React from 'react';

const WhatsAppFloat = () => {
    // You can replace this number with the actual WhatsApp business number
    const whatsappNumber = "+919876543210";
    const customMessage = "Hello FLIGHT99, I need help planning a trip!";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customMessage)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
            aria-label="Chat on WhatsApp"
        >
            {/* Tooltip */}
            <span className="absolute right-16 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">
                Chat with us
            </span>
            {/* SVG Icon */}
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M17.472 14.382C17.155 14.223 15.594 13.454 15.303 13.349C15.012 13.243 14.801 13.19 14.59 13.507C14.378 13.824 13.77 14.537 13.585 14.749C13.4 14.96 13.216 14.986 12.899 14.828C12.582 14.669 11.558 14.335 10.347 13.255C9.395 12.404 8.756 11.365 8.571 11.048C8.386 10.73 8.552 10.559 8.71 10.401C8.854 10.259 9.028 10.033 9.186 9.848C9.345 9.662 9.398 9.53 9.503 9.319C9.609 9.108 9.556 8.923 9.477 8.764C9.398 8.606 8.764 7.046 8.5 6.411C8.243 5.798 7.978 5.881 7.788 5.871C7.618 5.862 7.407 5.861 7.195 5.861C6.984 5.861 6.64 5.94 6.35 6.257C6.059 6.574 5.24 7.34 5.24 8.9C5.24 10.459 6.376 11.966 6.534 12.177C6.693 12.389 8.744 15.683 12.028 17.103C12.809 17.441 13.418 17.643 13.896 17.795C14.68 18.043 15.395 18.006 15.968 17.917C16.608 17.818 17.94 17.103 18.23 16.31C18.521 15.518 18.521 14.857 18.442 14.751C18.363 14.645 18.152 14.593 17.834 14.434L17.472 14.382ZM11.988 22.094C10.284 22.094 8.647 21.636 7.228 20.8L6.87 20.588L3.25 21.537L4.223 18L3.99 17.632C3.056 16.142 2.537 14.364 2.537 12.484C2.537 7.245 6.791 2.99 12.035 2.99C14.575 2.992 16.963 3.982 18.756 5.776C20.548 7.57 21.536 9.959 21.536 12.497C21.536 17.736 17.28 21.99 12.036 21.99L11.988 22.094Z"
                    fill="currentColor"
                />
            </svg>
        </a>
    );
};

export default WhatsAppFloat;
