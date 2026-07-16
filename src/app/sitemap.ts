
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog-posts';
import { getAllProducts } from '@/lib/products';
import { getAllPodcasts } from '@/lib/podcasts';

const URL = 'https://scalewitholaiya.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();
    const products = await getAllProducts();
    const podcasts = await getAllPodcasts();

    const postEntries: MetadataRoute.Sitemap = posts.map(({ slug, date }) => ({
        url: `${URL}/blog/${slug}`,
        lastModified: new Date(date),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const productEntries: MetadataRoute.Sitemap = products.map(({ slug }) => ({
        url: `${URL}/shop/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));
    
    const podcastEntries: MetadataRoute.Sitemap = podcasts.map(({ slug, releaseDate }) => ({
        url: `${URL}/diary/podcast/${slug}`,
        lastModified: new Date(releaseDate),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    const staticPages: MetadataRoute.Sitemap = [
        { url: URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
        { url: `${URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
        { url: `${URL}/diary`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${URL}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${URL}/events`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${URL}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${URL}/diary/reviews`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${URL}/diary/ama-sessions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${URL}/diary/strategies-from-the-companions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${URL}/diary/becoming-with-olaiya`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${URL}/diary/resource-library`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${URL}/diary/gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${URL}/keynote`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ];

    return [
        ...staticPages,
        ...postEntries,
        ...productEntries,
        ...podcastEntries,
    ];
}
