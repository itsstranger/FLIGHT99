'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Plane } from 'lucide-react';

/**
 * AirportInput — A text input with live airport search suggestions.
 *
 * Props:
 *  - value: string (controlled)
 *  - onChange: (displayValue: string, iataCode: string) => void
 *  - placeholder: string
 *  - name: string  — hidden input name sent with the form
 *  - required: bool
 */
export default function AirportInput({ value, onChange, placeholder = 'City or Airport', name, required, className = '', inputClassName = '' }) {
    const [query, setQuery] = useState(value || '');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [iataCode, setIataCode] = useState('');
    const containerRef = useRef(null);
    const debounceTimer = useRef(null);

    // Sync if parent resets value (e.g., swap button)
    useEffect(() => {
        setQuery(value || '');
    }, [value]);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const fetchSuggestions = useCallback(async (term) => {
        if (!term || term.length < 2) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`/api/airports?term=${encodeURIComponent(term)}`);
            const data = await res.json();
            setSuggestions(data);
            setIsOpen(data.length > 0);
        } catch {
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        setIataCode(''); // Clear stored code until user picks from list
        onChange(val, '');

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => fetchSuggestions(val), 280);
    };

    const handleSelect = (airport) => {
        const display = `${airport.city} (${airport.id})`;
        setQuery(display);
        setIataCode(airport.id);
        setSuggestions([]);
        setIsOpen(false);
        onChange(display, airport.id);
    };

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Hidden IATA input for form submission */}
            <input type="hidden" name={name} value={iataCode || query} />

            <input
                type="text"
                autoComplete="off"
                value={query}
                onChange={handleInputChange}
                onFocus={() => suggestions.length > 0 && setIsOpen(true)}
                placeholder={placeholder}
                required={required}
                className={`w-full text-[14px] md:text-lg font-bold text-gray-900 outline-none bg-transparent placeholder-gray-300 truncate ${inputClassName}`}
            />

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-[calc(100%+10px)] left-0 z-[999] w-[280px] md:w-[320px] bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {loading ? (
                        <div className="px-5 py-4 text-sm text-gray-400 flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 border-t-primary animate-spin" />
                            Searching airports...
                        </div>
                    ) : (
                        suggestions.map((airport) => (
                            <button
                                key={airport.id}
                                type="button"
                                onClick={() => handleSelect(airport)}
                                className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center gap-3 group border-b border-gray-50 last:border-0"
                            >
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                    <Plane className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-gray-900 truncate">
                                        {airport.city}
                                        <span className="ml-1.5 text-xs font-black text-primary">{airport.id}</span>
                                    </p>
                                    <p className="text-xs text-gray-400 truncate">{airport.name}, {airport.country}</p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
