import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term');

    if (!term || term.length < 2) {
        return NextResponse.json([]);
    }

    const apiKey = process.env.KIWI_API_KEY;

    try {
        const res = await fetch(
            `https://api.tequila.kiwi.com/locations/query?term=${encodeURIComponent(term)}&location_types=airport&limit=7&active_only=true`,
            {
                headers: {
                    apikey: apiKey || '',
                },
                // Cache results for 24 hours to reduce API calls
                next: { revalidate: 86400 },
            }
        );

        if (!res.ok) {
            return NextResponse.json([]);
        }

        const json = await res.json();
        const locations = (json.locations || []).map((loc) => ({
            id: loc.id,           // IATA code, e.g. "BOM"
            name: loc.name,       // Airport name, e.g. "Chhatrapati Shivaji Maharaj International"
            city: loc.city?.name || loc.name, // City name
            country: loc.country?.name || '',
        }));

        return NextResponse.json(locations);
    } catch (err) {
        console.error('Airport API error:', err);
        return NextResponse.json([]);
    }
}
