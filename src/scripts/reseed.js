import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        process.env[match[1].trim()] = match[2].trim();
    }
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const titlesToDelete = [
    "Maldives Luxury Escape",
    "Swiss Alpine Adventure",
    "Dubai Desert & City Lights",
    "Kashmir Paradise Tour",
    "Thailand: Exotic Bangkok & Pattaya",
    "Malaysia: Kuala Lumpur Highlights",
    "Georgia: Caucasus Scenic Tour",
    "Lakshadeep: Pristine Island Getaway"
];

const dummyPackages = [
    {
        title: "Maldives Luxury Escape",
        location: "Maldives",
        price: 125000,
        type: "International",
        duration: "5 Days / 4 Nights",
        description: "Experience the ultimate luxury in our carefully curated overwater villas, complete with private pools and direct lagoon access. Perfect for honeymooners and couples looking for a romantic getaway.",
        image_url: "https://images.unsplash.com/photo-1573843981267-be1480e3b77e?w=1200&auto=format&fit=crop",
        inclusions: ["5-Star Beach Villa Accommodation", "Return Seaplane Transfers from Male", "All-inclusive Meal Plan (Breakfast, Lunch, Dinner)", "Guided Snorkeling Excursion", "Couples Spa Treatment (60 mins)"],
        itinerary: [
            { day: "Day 1", title: "Arrival in Paradise", description: "Arrive at Male International Airport. Transfer via seaplane to your exclusive 5-star island resort. Welcome drinks upon check-in and leisure time." }
        ]
    },
    {
        title: "Swiss Alpine Adventure",
        location: "Switzerland",
        price: 210000,
        type: "International",
        duration: "7 Days / 6 Nights",
        description: "Immerse yourself in the spectacular beauty of the Swiss Alps. Journey through picturesque villages, take panoramic train rides, and marvel at the majestic Matterhorn.",
        image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop",
        inclusions: ["4-Star Alpine Hotel Stays", "Swiss Travel Pass (Premium)", "Mount Titlis Rotair Cable Car Tickets", "Glacier Express Train Journey", "Daily Swiss Breakfast Buffet"],
        itinerary: [
            { day: "Day 1", title: "Arrival in Zurich", description: "Arrive in Zurich. Transfer to Lucerne by train. Check-in and explore the famous Chapel Bridge." }
        ]
    },
    {
        title: "Dubai Desert & City Lights",
        location: "Dubai, UAE",
        price: 65000,
        type: "International",
        duration: "5 Days / 4 Nights",
        description: "Experience the perfect juxtaposition of futuristic architecture and ancient desert traditions. Shop, dine, and explore the golden dunes of the Emirates.",
        image_url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&auto=format&fit=crop",
        inclusions: ["4-Star Premium City Center Hotel", "Half-Day Dubai City Tour", "Premium Desert Safari with BBQ Dinner", "Burj Khalifa At The Top Access (Level 124)", "Return Airport Transfers"],
        itinerary: [
            { day: "Day 1", title: "Welcome to Dubai", description: "Arrival at Dubai International Airport. Meet and greet, transfer to your hotel. Evening at leisure to explore nearby areas." }
        ]
    },
    {
        title: "Kashmir Paradise Tour",
        location: "Kashmir, India",
        price: 32000,
        type: "Domestic",
        duration: "6 Days / 5 Nights",
        description: "Discover 'Heaven on Earth' with our signature Kashmir package. Sail on the tranquil Dal Lake, walk through lush valleys in Pahalgam, and ride the gondola in Gulmarg.",
        image_url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop",
        inclusions: ["Premium Houseboat Stay in Srinagar", "3-Star Hotel Stays in Gulmarg/Pahalgam", "Private Chauffeur Driven Car", "1-Hour Shikara Ride on Dal Lake", "Daily Breakfast & Dinner"],
        itinerary: [
            { day: "Day 1", title: "Arrival in Srinagar", description: "Arrive at Srinagar airport. Transfer to a premium houseboat on Dal Lake." }
        ]
    },
    {
        title: "Thailand: Exotic Bangkok & Pattaya",
        location: "Thailand",
        price: 45000,
        type: "International",
        duration: "5 Days / 4 Nights",
        description: "Explore the vibrant streets of Bangkok and the beautiful beaches of Pattaya. This package offers a perfect mix of cultural exploration and seaside relaxation.",
        image_url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop",
        inclusions: ["4-Star Hotel Accommodation", "Guided Bangkok City Tour", "Coral Island Speedboat Tour", "Daily Buffet Breakfast", "Private Airport Transfers"],
        itinerary: [
            { day: "Day 1", title: "Bangkok Arrival", description: "Arrive at Suvarnabhumi Airport, Bangkok. Transfer to your hotel. Evening at leisure." }
        ]
    },
    {
        title: "Malaysia: Kuala Lumpur Highlights",
        location: "Malaysia",
        price: 38000,
        type: "International",
        duration: "4 Days / 3 Nights",
        description: "Discover the best of Malaysia's capital city. Visit the iconic Petronas Twin Towers, explore Batu Caves, and enjoy a day at Genting Highlands.",
        image_url: "https://images.unsplash.com/photo-1596422846543-75c6fc1855ea?w=1200&auto=format&fit=crop",
        inclusions: ["City Center Hotel Stay", "Kuala Lumpur Half-Day City Tour", "Genting Highlands Day Trip with Cable Car", "Batu Caves Visit", "Return Airport Transfers"],
        itinerary: [
            { day: "Day 1", title: "Kuala Lumpur Arrival", description: "Arrive in Kuala Lumpur. Meet our representative and transfer to hotel." }
        ]
    },
    {
        title: "Georgia: Caucasus Scenic Tour",
        location: "Georgia",
        price: 85000,
        type: "International",
        duration: "6 Days / 5 Nights",
        description: "Experience the unique beauty of Georgia. From the historic streets of Tbilisi to the breathtaking Caucasus mountains, discover this hidden gem of Europe.",
        image_url: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&auto=format&fit=crop",
        inclusions: ["Premium Boutique Hotel Stay", "Tbilisi City Walking Tour", "Kazbegi and Ananuri Mountain Trip", "Wine Tasting in Kakheti", "Daily Georgian Breakfast"],
        itinerary: [
            { day: "Day 1", title: "Arrival in Tbilisi", description: "Welcome to Georgia! Transfer to your hotel and evening exploring the Old Town." }
        ]
    },
    {
        title: "Lakshadeep: Pristine Island Getaway",
        location: "Lakshadeep, India",
        price: 42000,
        type: "Domestic",
        duration: "5 Days / 4 Nights",
        description: "Escape to the untouched coral islands of Lakshadweep. Enjoy crystal clear lagoons, white sandy beaches, and incredible water sports experiences.",
        image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop",
        inclusions: ["Beach Front Cottage Stay", "All Meals Included (Island Buffet)", "Snorkeling and Glass Bottom Boat Ride", "Agatti Island Sightseeing", "Return Flight from Kochi"],
        itinerary: [
            { day: "Day 1", title: "Arrival at Agatti", description: "Arrive at Agatti Airport. Check-in to your resort and enjoy sunset on the beach." }
        ]
    }
];



async function run() {
    console.log('Cleaning up old buggy packages...');
    for (const title of titlesToDelete) {
        await supabase.from('packages').delete().eq('title', title);
    }
    console.log('Old packages deleted. Injecting new verified packages...');

    let successCount = 0;
    for (const pkg of dummyPackages) {
        const { error } = await supabase.from('packages').insert([pkg]);
        if (error) {
            console.error(`Error inserting ${pkg.title}:`, error.message);
        } else {
            console.log(`✅ Successfully seeded: ${pkg.title}`);
            successCount++;
        }
    }
    console.log(`\nCleanup complete! Safely injected ${successCount} fresh dummy packages.`);
}

run();
