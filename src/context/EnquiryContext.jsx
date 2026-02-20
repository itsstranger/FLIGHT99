'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const { session } = useAuth(); // Only fetch if authenticated

    const fetchEnquiries = async () => {
        if (!session) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('enquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching enquiries:', error);
        } else {
            setEnquiries(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (session) {
            fetchEnquiries();
        } else {
            setEnquiries([]);
        }
    }, [session]);

    const updateEnquiryStatus = async (id, status) => {
        const { error } = await supabase
            .from('enquiries')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error('Error updating enquiry:', error);
            return { error };
        }
        setEnquiries(enquiries.map(enq => enq.id === id ? { ...enq, status } : enq));
        return { success: true };
    };

    const deleteEnquiry = async (id) => {
        const { error } = await supabase
            .from('enquiries')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting enquiry:', error);
            return { error };
        }
        setEnquiries(enquiries.filter(enq => enq.id !== id));
        return { success: true };
    };

    return (
        <EnquiryContext.Provider value={{ enquiries, loading, updateEnquiryStatus, deleteEnquiry, refreshEnquiries: fetchEnquiries }}>
            {children}
        </EnquiryContext.Provider>
    );
};

export const useEnquiries = () => {
    const context = useContext(EnquiryContext);
    if (!context) {
        throw new Error('useEnquiries must be used within an EnquiryProvider');
    }
    return context;
};
