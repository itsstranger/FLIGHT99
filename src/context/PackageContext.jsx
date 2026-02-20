'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPackages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('packages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching packages:', error);
        } else {
            setPackages(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const addPackage = async (newPackage) => {
        const payload = { ...newPackage };
        if (payload.image) {
            payload.image_url = payload.image;
            delete payload.image;
        }

        const { data, error } = await supabase
            .from('packages')
            .insert([payload])
            .select();

        if (error) {
            console.error('Error adding package:', error.message || error);
            return { error };
        }
        if (data) {
            setPackages([data[0], ...packages]);
            return { data: data[0] };
        }
    };

    const updatePackage = async (id, updatedData) => {
        const payload = { ...updatedData };
        if (payload.image) {
            payload.image_url = payload.image;
            delete payload.image;
        }

        const { error } = await supabase
            .from('packages')
            .update(payload)
            .eq('id', id);

        if (error) {
            console.error('Error updating package:', error.message || error);
            return { error };
        }
        setPackages(packages.map(pkg => pkg.id === id ? { ...pkg, ...payload } : pkg));
        return { success: true };
    };

    const deletePackage = async (id) => {
        const { error } = await supabase
            .from('packages')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting package:', error);
            return { error };
        }
        setPackages(packages.filter(pkg => pkg.id !== id));
        return { success: true };
    };

    return (
        <PackageContext.Provider value={{ packages, loading, addPackage, updatePackage, deletePackage, refreshPackages: fetchPackages }}>
            {children}
        </PackageContext.Provider>
    );
};

export const usePackages = () => {
    const context = useContext(PackageContext);
    if (!context) {
        throw new Error('usePackages must be used within a PackageProvider');
    }
    return context;
};
