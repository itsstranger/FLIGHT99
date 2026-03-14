'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const SettingsContext = createContext();

const defaultSettings = {
    support_email: 'booking@flight99.co.in',
    physical_address: 'Nilamboor Road, Wandoor',
    whatsapp_number: '+917356409377',
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    linkedin_url: ''
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(defaultSettings);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .eq('id', 1)
                .single();

            if (error && error.code !== 'PGRST116') {
                throw error;
            }
            if (data) {
                setSettings({ ...defaultSettings, ...data });
            }
        } catch (error) {
            console.warn('Info: site_settings table missing or no data. Using defaults.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const updateSettings = async (newSettings) => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .upsert({ id: 1, ...newSettings })
                .select()
                .single();

            if (error) throw error;
            if (data) {
                setSettings({ ...defaultSettings, ...data });
                return { success: true };
            }
        } catch (error) {
            console.error('Error updating settings:', error.message || error);
            return { error };
        }
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
