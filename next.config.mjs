/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // Supabase Storage
            {
                protocol: 'https',
                hostname: 'rhneejgpjqlakmhkvmcz.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
            // Unsplash (used by seed/demo packages)
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
        ],
    },
};

export default nextConfig;
