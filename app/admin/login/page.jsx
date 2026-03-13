'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { Lock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const router = useRouter();
    const { session, loading } = useAuth();

    useEffect(() => {
        if (!loading && session) {
            router.push('/admin/dashboard');
        }
    }, [session, loading, router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsLoggingIn(false);
        } else {
            // Router push is handled by the useEffect watching session state
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <img src="/assets/logo.png" alt="FLIGHT99 Travel Enterprises" className="h-12 w-auto mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
                    <p className="text-sm text-gray-500">Sign in to manage packages</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                            {error}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="input-premium w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="input-premium w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="w-full flex justify-center items-center gap-2" variant="primary" disabled={isLoggingIn}>
                        {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                        {isLoggingIn ? 'Logging in...' : 'Secure Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
