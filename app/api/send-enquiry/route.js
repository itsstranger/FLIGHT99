import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, destination, date, duration, package: packageTitle, service_type, message, persons, bookHotel, from, to, priorities } = body;

        // Format the message field if it's missing (e.g. from the Hero form)
        let finalMessage = message || '';

        if (service_type === 'umrah') {
            finalMessage = `Interested in Umrah. Pilgrims: ${persons || 1}. Hotel Booking: ${bookHotel || 'Yes'}. Dates: ${date || 'Flexible'}. Duration: ${duration || 'Flexible'}.`;
        } else if (service_type === 'visa') {
            finalMessage = `Visa Assistance for: ${destination || 'Unknown'}. Expected Travel Date: ${date || 'Flexible'}. ${message || ''}`;
        } else if (service_type === 'flight') {
            finalMessage = `Flight Ticket Request. From: ${from || 'N/A'}. To: ${to || 'N/A'}. Date: ${date || 'Flexible'}. Priorities: ${priorities || 'None'}.`;
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

        // 1. Save to Supabase
        const { error } = await supabase
            .from('enquiries')
            .insert([enquiryData]);

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        // 2. Forward to Email via Web3Forms (Background process)
        try {
            await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: "fd4cbdc6-dbae-42b4-9ed9-a09170314f38",
                    subject: `New Lead: ${service_type?.toUpperCase() || 'GENERAL'} - ${name || 'Unknown'}`,
                    from_name: "FLIGHT99 System",
                    name: name || "Website Visitor",
                    email: email || "no-reply@flight99.com",
                    message: `New Enquiry Received via FLIGHT99 Website:

Name: ${name || 'N/A'}
Phone: ${phone || 'N/A'}
Email: ${email || 'N/A'}
Service Type: ${service_type || 'General'}

Client Request / Details:
${finalMessage}`
                })
            });
        } catch (emailError) {
            console.error("Failed to forward email via Web3Forms:", emailError);
            // We do not fail the request if just the email fails
        }

        return NextResponse.json({ success: true, message: "Enquiry saved successfully" });

    } catch (error) {
        console.error("API route error:", error);
        return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
    }
}
