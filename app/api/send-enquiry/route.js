import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, destination, date, duration, package: packageTitle, service_type, message, persons, bookHotel } = body;

        // Format the message field if it's missing (e.g. from the Hero form)
        let finalMessage = message || '';

        if (service_type === 'umrah') {
            finalMessage = `Interested in Umrah. Pilgrims: ${persons || 1}. Hotel Booking: ${bookHotel || 'Yes'}. Dates: ${date || 'Flexible'}. Duration: ${duration || 'Flexible'}.`;
        } else if (destination || date || duration) {
            finalMessage = `Interested in: ${destination || 'Any'}. Dates: ${date || 'Flexible'}. Duration: ${duration || 'Flexible'}. ${message || ''}`;
        }

        // Format to match the enquiries table schema
        const enquiryData = {
            name,
            email,
            phone,
            service_type: service_type || 'holiday', // default to holiday if omitted
            message: finalMessage,
        };

        const { error } = await supabase
            .from('enquiries')
            .insert([enquiryData]);

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Enquiry saved successfully" });

    } catch (error) {
        console.error("API route error:", error);
        return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
    }
}
