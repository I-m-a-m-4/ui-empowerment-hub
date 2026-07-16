
'use client';

import { useState, useEffect } from 'react';
import { type Podcast, getAllPodcasts } from '@/lib/podcasts';
import { Loader2, Play, Headphones, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PodcastPlayer = () => {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPodcasts = async () => {
            const data = await getAllPodcasts();
            setPodcasts(data);
            setLoading(false);
        };
        fetchPodcasts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    if (podcasts.length === 0) {
        return (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                <h2 className="mt-6 text-xl font-semibold">No Sessions Available</h2>
                <p className="mt-2 text-muted-foreground">The first keynote session will be uploaded soon.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {podcasts.map((podcast, index) => (
                <Link href={`/diary/podcast/${podcast.slug}`} key={podcast.slug} className="group block">
                    <div className="flex items-center gap-4 p-4 rounded-2xl glass-card transition-all duration-300 hover:bg-primary/10 hover:shadow-xl hover:border-primary/20 border border-transparent">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
                            <Image
                                src={podcast.imageUrl}
                                alt={podcast.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play className="h-8 w-8 text-white/80 fill-white/80" />
                            </div>
                        </div>
                        <div className="flex-grow min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{podcast.title}</h3>
                            <p className="text-sm text-muted-foreground truncate">{podcast.artist}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                                <div className="flex items-center gap-1.5">
                                    <Headphones className="h-3 w-3" />
                                    <span>{podcast.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3 w-3" />
                                    <span>{new Date(podcast.releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default PodcastPlayer;
