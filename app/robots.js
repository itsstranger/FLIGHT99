export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api'],
            },
        ],
        sitemap: 'https://flight99.co.in/sitemap.xml',
    };
}
