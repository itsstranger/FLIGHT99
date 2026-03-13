import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manually parse .env.local
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

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const dummyPackages = [
    {
        title: "Maldives Luxury Escape",
        location: "Maldives",
        price: 125000,
        type: "International",
        duration: "5 Days / 4 Nights",
        description: "Experience the ultimate luxury in our carefully curated overwater villas, complete with private pools and direct lagoon access. Perfect for honeymooners and couples looking for a romantic getaway.",
        image_url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop",
        inclusions: ["5-Star Beach Villa Accommodation", "Return Seaplane Transfers from Male", "All-inclusive Meal Plan (Breakfast, Lunch, Dinner)", "Guided Snorkeling Excursion", "Couples Spa Treatment (60 mins)"],
        itinerary: [
            { day: "Day 1", title: "Arrival in Paradise", description: "Arrive at Male International Airport. Transfer via seaplane to your exclusive 5-star island resort. Welcome drinks upon check-in and leisure time." },
            { day: "Day 2", title: "Underwater Exploration", description: "Morning guided snorkeling tour around the house reef. Afternoon relax by your private pool. Evening romantic beachside dinner setup." },
            { day: "Day 3", title: "Rejuvenation", description: "Enjoy a rejuvenating 60-minute couples massage at the overwater spa. Afternoon choice of non-motorized watersports (kayaking/paddleboarding)." },
            { day: "Day 4", title: "Sunset Cruise", description: "Free day for leisure. In the evening, embark on a traditional dhoni for a sunset dolphin watching cruise with champagne and canapés." },
            { day: "Day 5", title: "Departure", description: "Breakfast at the resort. Morning check-out and seaplane transfer back to Male for your onward flight." }
        ]
    },
    {
        title: "Swiss Alpine Adventure",
        location: "Switzerland",
        price: 210000,
        type: "International",
        duration: "7 Days / 6 Nights",
        description: "Immerse yourself in the spectacular beauty of the Swiss Alps. Journey through picturesque villages, take panoramic train rides, and marvel at the majestic Matterhorn.",
        image_url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
        inclusions: ["4-Star Alpine Hotel Stays", "Swiss Travel Pass (Premium)", "Mount Titlis Rotair Cable Car Tickets", "Glacier Express Train Journey", "Daily Swiss Breakfast Buffet"],
        itinerary: [
            { day: "Day 1", title: "Arrival in Zurich", description: "Arrive in Zurich. Transfer to Lucerne by train. Check-in and explore the famous Chapel Bridge." },
            { day: "Day 2", title: "Mount Titlis Experience", description: "Full day excursion to Mount Titlis. Ride the world's first revolving cable car and walk the thrilling Cliff Walk suspension bridge." },
            { day: "Day 3", title: "Journey to Zermatt", description: "Travel by train through stunning alpine scenery to the car-free village of Zermatt, lying at the foot of the Matterhorn." },
            { day: "Day 4", title: "Matterhorn Glacier Paradise", description: "Ascend to the highest cable car station in Europe. Enjoy panoramic views and visit the spectacular Glacier Palace." },
            { day: "Day 5", title: "Glacier Express to St. Moritz", description: "Board the famous Glacier Express. Enjoy a breathtaking 8-hour journey through valleys and over 291 bridges to glamorous St. Moritz." },
            { day: "Day 6", title: "Explore St. Moritz", description: "Free day to explore the elegant resort town of St. Moritz or take a funicular up the surrounding mountains." },
            { day: "Day 7", title: "Departure", description: "Train journey from St. Moritz to Zurich Airport for your flight back home." }
        ]
    },
    {
        title: "Dubai Desert & City Lights",
        location: "Dubai, UAE",
        price: 65000,
        type: "International",
        duration: "5 Days / 4 Nights",
        description: "Experience the perfect juxtaposition of futuristic architecture and ancient desert traditions. Shop, dine, and explore the golden dunes of the Emirates.",
        image_url: "https://images.unsplash.com/photo-1512453979436-5a50ce845e2e?q=80&w=2070&auto=format&fit=crop",
        inclusions: ["4-Star Premium City Center Hotel", "Half-Day Dubai City Tour", "Premium Desert Safari with BBQ Dinner", "Burj Khalifa At The Top Access (Level 124)", "Return Airport Transfers"],
        itinerary: [
            { day: "Day 1", title: "Welcome to Dubai", description: "Arrival at Dubai International Airport. Meet and greet, transfer to your hotel. Evening at leisure to explore nearby areas." },
            { day: "Day 2", title: "City Tour & Burj Khalifa", description: "Morning half-day city tour covering Dubai Museum, Jumeirah Mosque, and Burj Al Arab photo stop. Afternoon visit to the 124th floor of Burj Khalifa." },
            { day: "Day 3", title: "Leisure & Desert Safari", description: "Morning free for shopping at Dubai Mall. Afternoon departure for a thrilling 4x4 dune bashing experience, followed by a traditional BBQ dinner, belly dancing, and camel rides at a desert camp." },
            { day: "Day 4", title: "Free Day / Optional Marina Cruise", description: "Free day for leisure, shopping at the Gold Souk, or visiting the Dubai Frame. Optional evening Dhow Cruise Dinner at Dubai Marina." },
            { day: "Day 5", title: "Departure", description: "Check out from hotel. Transfer to the airport for your onward flight with wonderful memories." }
        ]
    },
    {
        title: "Kashmir Paradise Tour",
        location: "Kashmir, India",
        price: 32000,
        type: "Domestic",
        duration: "6 Days / 5 Nights",
        description: "Discover 'Heaven on Earth' with our signature Kashmir package. Sail on the tranquil Dal Lake, walk through lush valleys in Pahalgam, and ride the gondola in Gulmarg.",
        image_url: "https://images.unsplash.com/photo-1595815771614-ade9d652765d?q=80&w=2070&auto=format&fit=crop",
        inclusions: ["Premium Houseboat Stay in Srinagar", "3-Star Hotel Stays in Gulmarg/Pahalgam", "Private Chauffeur Driven Car", "1-Hour Shikara Ride on Dal Lake", "Daily Breakfast & Dinner"],
        itinerary: [
            { day: "Day 1", title: "Arrival in Srinagar", description: "Arrive at Srinagar airport. Transfer to a premium houseboat on Dal Lake. Enjoy a relaxing 1-hour Shikara ride in the evening." },
            { day: "Day 2", title: "Srinagar to Gulmarg", description: "Drive to Gulmarg (Meadow of Flowers). Check into your hotel. Rest of the day free to explore the beautiful surroundings or take a pony ride." },
            { day: "Day 3", title: "Gulmarg Gondola Excursion", description: "Experience the famous Gulmarg Gondola (cable car) to Apharwat peak for spectacular snow-capped views. Afternoon drive back to Srinagar." },
            { day: "Day 4", title: "Srinagar to Pahalgam", description: "Drive to Pahalgam (Valley of Shepherds) via the saffron fields of Pampore. Check into hotel and relax by the Lidder River." },
            { day: "Day 5", title: "Explore Pahalgam & Return", description: "Visit Betab Valley and Aru Valley. Afternoon drive back to Srinagar. Check into a city hotel and visit the beautiful Mughal Gardens (Shalimar & Nishat)." },
            { day: "Day 6", title: "Departure", description: "After breakfast, check out from the hotel and transfer to Srinagar Airport for your onward journey." }
        ]
    }
];

async function seedPackages() {
    console.log('Starting seed process for generic travel packages...');
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

    console.log(`\nSeed complete! Injected ${successCount} dummy packages into the live server.`);
}

seedPackages();
