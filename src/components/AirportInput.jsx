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

            {/* Suggestions Dropdown */}
            {isOpen && (
                <div className="absolute top-[calc(100%+10px)] left-0 z-[999] w-[280px] md:w-[320px] bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden">
                    {loading ? (
                        <div className="px-5 py-4 text-sm text-gray-400 flex items-center gap-2">
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-200 border-t-primary animate-spin" />
                            Searching airports...
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
                                    className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center gap-3 group border-b border-gray-50 last:border-0"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-base group-hover:bg-primary/20 transition-colors">
                                        {getIcon(type)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-gray-900 truncate">
                                            {name}
                                            {code && <span className="ml-2 text-xs font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded">{code}</span>}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate capitalize">{type} · {country}</p>
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
