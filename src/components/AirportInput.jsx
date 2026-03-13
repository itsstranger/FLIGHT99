'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Plane } from 'lucide-react';

/**
 * AirportInput — Live airport/city autocomplete via Travelpayouts public API.
 * No API key required — fetched directly from the client.
 *
 * Props:
 *  - value: string (display value, controlled)
 *  - onChange: (displayValue: string, iataCode: string) => void
 *  - placeholder: string
 *  - name: string  — form field name
 *  - required: bool
 */
export default function AirportInput({ value, onChange, placeholder = 'City or Airport', name, required, className = '' }) {
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

    // Close dropdown on outside click
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
        if (!term || term.trim().length < 2) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(term)}&locale=en&types[]=airport&types[]=city`
            );
            const data = await res.json();
            setSuggestions(Array.isArray(data) ? data.slice(0, 8) : []);
            setIsOpen(Array.isArray(data) && data.length > 0);
        } catch {
            setSuggestions([]);
            setIsOpen(false);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        setIataCode('');
        onChange(val, '');

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => fetchSuggestions(val), 300);
    };

    const handleSelect = (place) => {
        const code = place.code || place.id || '';
        const display = place.name || '';
        setQuery(display);
        setIataCode(code);
        setSuggestions([]);
        setIsOpen(false);
        onChange(display, code);
    };

    const getIcon = (type) => type === 'city' ? '🏙️' : '✈️';

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Hidden IATA for form submission */}
            <input type="hidden" name={name} value={iataCode || query} />

            <input
                type="text"
                autoComplete="off"
                value={query}
                onChange={handleInputChange}
                onFocus={() => suggestions.length > 0 && setIsOpen(true)}
                placeholder={placeholder}
                required={required}
                className="w-full text-[14px] md:text-lg font-bold text-gray-900 outline-none bg-transparent placeholder-gray-300 truncate"
            />

            {/* Suggestions Dropdown — flat & light */}
            {isOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 z-[999] w-[260px] md:w-[300px] bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                    {loading ? (
                        <div className="px-4 py-3 text-xs text-gray-400 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full border-2 border-gray-300 border-t-primary animate-spin" />
                            Searching...
                        </div>
                    ) : (
                        suggestions.map((place, i) => {
                            const code = place.code || place.id || '';
                            const name = place.name || '';
                            const country = place.country_name || '';
                            const type = place.type || 'airport';
                            return (
                                <button
                                    key={`${code}-${i}`}
                                    type="button"
                                    onClick={() => handleSelect(place)}
                                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors flex items-center gap-2.5 border-b border-gray-100 last:border-0"
                                >
                                    <span className="text-gray-400 text-xs w-4 shrink-0">{type === 'city' ? '🏙' : '✈'}</span>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-800 truncate">
                                            {name}
                                            {code && <span className="ml-1.5 text-[10px] font-bold text-primary/80">{code}</span>}
                                        </p>
                                        <p className="text-[11px] text-gray-400 truncate capitalize">{country}</p>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}
