import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import logo from '../assets/logo.png';
import Button from './ui/Button';
import { useModal } from '../context/ModalContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { openModal } = useModal();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Flights', path: '/' },
        { name: 'Packages', path: '/packages' },
        { name: 'Visa', path: '/visa' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    // Check if we are on home page to determining transparency
    const isHome = location.pathname === '/';

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md shadow-md py-3 transition-all duration-300"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo - Clean */}
                    <Link to="/" className="flex items-center gap-2 transition-all duration-300">
                        <img src={logo} alt="FLIGHT99" className="h-10 w-auto object-contain drop-shadow-md" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="font-medium text-sm text-gray-700 transition-colors hover:text-secondary drop-shadow-md"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Button
                            variant="primary"
                            size="sm"
                            className="shadow-lg shadow-primary/20"
                            onClick={openModal}
                        >
                            <Phone className="w-4 h-4 mr-2" /> Talk to an Expert
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="text-gray-900" /> : <Menu className="text-gray-900" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-gray-600 font-medium py-2 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button
                        variant="primary"
                        className="w-full justify-center"
                        onClick={() => {
                            openModal();
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        <Phone className="w-4 h-4 mr-2" /> Talk to an Expert
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
