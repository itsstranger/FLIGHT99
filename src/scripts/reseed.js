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
    "Kashmir Paradise Tour"
];

const dummyPackages = [
    {
        title: "Maldives Luxury Escape",
        location: "Maldives",
        price: 125000,
        type: "International",
        duration: "5 Days / 4 Nights",
        description: "Experience the ultimate luxury in our carefully curated overwater villas, complete with private pools and direct lagoon access. Perfect for honeymooners and couples looking for a romantic getaway.",
        image_url: "https://plus.unsplash.com/premium_photo-1666286163385-abe05fbf22d7?q=80&w=2800&auto=format&fit=crop",
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
        image_url: "https://images.unsplash.com/photo-1527668752968-14ce70a3d7ce?q=80&w=2800&auto=format&fit=crop",
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
        image_url: "https://images.unsplash.com/photo-1512453979436-5a50ce845e2e?q=80&w=2800&auto=format&fit=crop",
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
        image_url: "https://images.unsplash.com/photo-1595815771614-ade9d652765d?q=80&w=2800&auto=format&fit=crop",
        inclusions: ["Premium Houseboat Stay in Srinagar", "3-Star Hotel Stays in Gulmarg/Pahalgam", "Private Chauffeur Driven Car", "1-Hour Shikara Ride on Dal Lake", "Daily Breakfast & Dinner"],
        itinerary: [
            { day: "Day 1", title: "Arrival in Srinagar", description: "Arrive at Srinagar airport. Transfer to a premium houseboat on Dal Lake." }
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
