export const PACKAGES = [
    {
        id: 1,
        slug: "classic-dubai-experience",
        title: "Classic Dubai Experience",
        duration: "5 Days / 4 Nights",
        days: 5,
        price: 45000,
        location: "Dubai, UAE",
        image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2070&auto=format&fit=crop",
        theme: "Luxury",
        rating: 4.8,
        reviews: 124,
        description: "Experience the glitz and glamour of Dubai with our classic 5-day tour. From the heights of Burj Khalifa to the depths of the desert, this package covers it all.",
        itinerary: [
            { day: 1, title: "Arrival in Dubai & Dhow Cruise", description: "Welcome to Dubai! Transfer to your 4-star hotel. In the evening, enjoy a romantic dinner on a traditional Dhow Cruise along the Creek." },
            { day: 2, title: "City Tour & Burj Khalifa", description: "Morning half-day city tour covering Dubai Museum, Jumeirah Mosque, and Palm Jumeirah. Evening visit to the 124th floor of Burj Khalifa." },
            { day: 3, title: "Desert Safari Adventure", description: "Free morning. Late afternoon pickup for a thrilling Desert Safari with dune bashing, camel riding, and a BBQ dinner under the stars." },
            { day: 4, title: "Shopping & Leisure", description: "A full day at leisure. We recommend visiting the Dubai Mall or taking a day trip to Abu Dhabi (optional add-on)." },
            { day: 5, title: "Departure", description: "Check out from the hotel and transfer to Dubai International Airport for your flight back home." }
        ],
        inclusions: ["4 Star Hotel Stay", "Daily Breakfast", "Airport Transfers (Private)", "Desert Safari with BBQ", "Burj Khalifa Tickets", "Visa Assistance"],
        images: [
            "https://images.unsplash.com/photo-1512453979798-5ea904ac6605",
            "https://images.unsplash.com/photo-1526495124232-a04e1849168c",
            "https://images.unsplash.com/photo-1546412414-e1885259563a"
        ]
    },
    {
        id: 2,
        slug: "magical-maldives-honey",
        title: "Magical Maldives Honeymoon",
        duration: "4 Days / 3 Nights",
        days: 4,
        price: 85000,
        location: "Maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2667&auto=format&fit=crop",
        theme: "Honeymoon",
        rating: 4.9,
        reviews: 89,
        description: "Escape to paradise with your loved one. Pristine turquoise waters, white sandy beaches, and luxury water villas await you.",
        itinerary: [
            { day: 1, title: "Arrival in Male", description: "Speedboat transfer to your private island resort. Welcome drinks and check-in to your Beach Villa." },
            { day: 2, title: "Water Sports & Relaxation", description: "Enjoy complimentary snorkeling gear. Optional sunset dolphin cruise in the evening." },
            { day: 3, title: "Spa Day & Candlelight Dinner", description: "Relax with a couple's spa treatment. Evening romantic candlelight dinner on the beach." },
            { day: 4, title: "Departure", description: "Speedboat transfer back to Male International Airport." }
        ],
        inclusions: ["Beach Villa Stay", "All Meals (Full Board)", "Speedboat Transfers", "Welcome Drinks", "Snorkeling Gear", "Green Tax"],
        images: [
            "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
            "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
            "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992"
        ]
    },
    {
        id: 3,
        slug: "swiss-alps-adventure",
        title: "Swiss Alps Adventure",
        duration: "7 Days / 6 Nights",
        days: 7,
        price: 120000,
        location: "Switzerland",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2540&auto=format&fit=crop",
        theme: "Adventure",
        rating: 4.7,
        reviews: 56,
        description: "Explore the breathtaking landscapes of Switzerland. From Zurich to Lucerne and Interlaken, experience the best of the Alps.",
        itinerary: [
            { day: 1, title: "Arrival in Zurich", description: "Train transfer to Lucerne. Evening boat cruise on Lake Lucerne." },
            { day: 2, title: "Mt. Pilatus Excursion", description: "Cable car ride to Mt. Pilatus. Hiking and sightseeing." },
            { day: 3, title: "Interlaken Transfer", description: "GoldenPass Line panoramic train to Interlaken." },
            { day: 4, title: "Jungfraujoch - Top of Europe", description: "Day trip to Jungfraujoch, the highest railway station in Europe." },
            { day: 5, title: "Zermatt & Matterhorn", description: "Train to Zermatt. View the majestic Matterhorn." },
            { day: 6, title: "Glacier Express to St. Moritz", description: "Ride the famous Glacier Express." },
            { day: 7, title: "Departure", description: "Train to Zurich Airport." }
        ],
        inclusions: ["3 Star Hotel Stays", "Swiss Travel Pass (8 Days)", "Mt. Pilatus Ticket", "Jungfraujoch Ticket", "Daily Breakfast"],
        images: [
            "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
            "https://images.unsplash.com/photo-1527668752968-14dc70a27c95"
        ]
    },
    {
        id: 4,
        slug: "kerala-backwaters",
        title: "Kerala Backwaters Bliss",
        duration: "6 Days / 5 Nights",
        days: 6,
        price: 28000,
        location: "Kerala, India",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2664&auto=format&fit=crop",
        theme: "Culture",
        rating: 4.6,
        reviews: 210,
        description: "God's Own Country calls! Houseboats, tea gardens, and misty hills make this the perfect relaxing getaway.",
        itinerary: [
            { day: 1, title: "Arrival in Cochin", description: "Transfer to Munnar. En route visit Cheeyappara Waterfalls." },
            { day: 2, title: "Munnar Sightseeing", description: "Visit Tea Museum, Mattupetty Dam, and Eravikulam National Park." },
            { day: 3, title: "Thekkady", description: "Drive to Thekkady. Periyar Lake boat ride and spice plantation tour." },
            { day: 4, title: "Alleppey Houseboat", description: "Check in to a traditional houseboat. Cruise through the backwaters." },
            { day: 5, title: "Cochin Tour", description: "Drive back to Cochin. Visit Jewish Synagogue and Chinese Fishing Nets." },
            { day: 6, title: "Departure", description: "Transfer to Cochin Airport." }
        ],
        inclusions: ["Hotels & Houseboat", "Daily Breakfast", "Private Cab for Transfers", "Driver Allowance"],
        images: [
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2"
        ]
    }
];
