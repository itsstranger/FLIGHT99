import { supabase } from '@/lib/supabase';

export default async function sitemap() {
    const baseUrl = 'https://flight99.co.in';

    // Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/faq',
        '/hajj-umrah',
        '/tour-packages',
        '/visa',
        '/terms',
        '/privacy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Routes for Packages
    let packageRoutes = [];
    try {
        const { data: packages, error } = await supabase
            .from('packages')
            .select('id, created_at');

        if (error) {
            console.error('Sitemap: Error fetching packages:', error);
        } else if (packages) {
            packageRoutes = packages.map((pkg) => ({
                url: `${baseUrl}/tour-packages/${pkg.id}`,
                lastModified: pkg.created_at ? new Date(pkg.created_at) : new Date(),
                changeFrequency: 'monthly',
                priority: 0.6,
            }));
        }
    } catch (error) {
        console.error('Sitemap generation error fetching packages:', error);
    }

    return [...staticRoutes, ...packageRoutes];
}
