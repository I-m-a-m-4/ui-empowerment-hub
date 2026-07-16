
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { type Event } from '@/lib/events';
import { getAllEvents } from '@/lib/events';
import MotionWrap from './MotionWrap';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Loader2, PlayCircle, Ticket } from 'lucide-react';

const Events = () => {
    const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const allEvents = await getAllEvents();
            const firstFeatured = allEvents.find(e => e.featured) || allEvents[0] || null;
            setFeaturedEvent(firstFeatured);
            setLoading(false);
        };
        fetchEvents();
    }, []);

    return (
        <MotionWrap>
            <section id="events" className="py-20 bg-secondary/20" style={{'--animation-delay': '0.7s'} as React.CSSProperties}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="text-center mb-12 max-w-3xl mx-auto">
                         <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6 anim d-1">
                            <Calendar className="w-4 h-4" />
                            <span>Events & Sessions</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Join Live Strategy Sessions</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            I occasionally host live strategy webinars and conversations for leaders, entrepreneurs, and builders like you. Explore upcoming events below.
                        </p>
                    </header>

                    <div className="max-w-4xl mx-auto">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : featuredEvent ? (
                            <div className="relative group">
                                <div className="absolute -inset-4">
                                    {featuredEvent.imageUrl && (
                                        <Image
                                            src={featuredEvent.imageUrl}
                                            alt={featuredEvent.title}
                                            fill
                                            className="object-cover rounded-3xl blur-lg opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                                        />
                                    )}
                                </div>
                                 <div className="relative grid md:grid-cols-2 items-center glass-card p-8 rounded-2xl overflow-hidden">
                                    <div className="relative aspect-video rounded-lg overflow-hidden hidden md:block">
                                        {featuredEvent.imageUrl && (
                                             <Image
                                                src={featuredEvent.imageUrl}
                                                alt={featuredEvent.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <PlayCircle className="w-16 h-16 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </div>
                                    <div className="md:pl-8">
                                        <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(featuredEvent.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                                        </div>
                                        <h3 className="text-2xl font-semibold mt-2">{featuredEvent.title}</h3>
                                        <p className="text-muted-foreground mt-2 line-clamp-3">{featuredEvent.description}</p>
                                        <Button asChild className="mt-6">
                                            <Link href="/events">
                                                <Ticket className="w-4 h-4 mr-2" />
                                                View All Events
                                            </Link>
                                        </Button>
                                    </div>
                                 </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
                                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-xl font-semibold">No Upcoming Events</h3>
                                <p className="mt-2 text-muted-foreground">Check back soon for new announcements.</p>
                                <Button asChild variant="outline" className="mt-6">
                                     <Link href="/events">
                                        Explore Past Events
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MotionWrap>
    );
};

export default Events;
