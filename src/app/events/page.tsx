
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { Calendar, Ticket, Sparkles, Cpu, Telescope, ChevronRight, Mail, CalendarDays, MapPin, ScanEye, Play, History } from 'lucide-react';
import Image from 'next/image';
import { getAllEvents } from '@/lib/events';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Events & Sessions | Scale with Olaiya',
    description: 'Join live strategy webinars and conversations with Ismail Adekunle-Olaiya, a Pro-Islamic business strategist. Get notified about upcoming events for leaders, entrepreneurs, and builders.',
    keywords: ['business events', 'strategy webinars', 'Islamic business seminars', 'entrepreneur workshops', 'Ismail Adekunle-Olaiya events'],
};

const featureCards = [
    {
        icon: Sparkles,
        category: 'Strategy Session',
        title: 'Clarity for Everyone',
        description: 'A signature session that blends proven frameworks with interactive Q&A.',
    },
    {
        icon: Cpu,
        category: 'Virtual Workshop',
        title: 'Largest Online Masterclass',
        description: 'Tour deep-dive case studies and live strategy teardowns.',
    },
    {
        icon: Telescope,
        category: 'Learn',
        title: 'Workshops & Seminars',
        description: 'Hands-on labs for all entrepreneurs, from startups to enterprise.',
    },
];

const EventsPage = async () => {
  const allEvents = await getAllEvents();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = allEvents.filter(event => new Date(event.date) >= today);
  const pastEvents = allEvents.filter(event => new Date(event.date) < today);

  const getIcon = (category?: string) => {
    switch(category?.toLowerCase()) {
        case 'virtual session': return ScanEye;
        case 'workshop': return Telescope;
        default: return MapPin;
    }
  }

  const EventCard = ({ event }: { event: any }) => {
    const EventIcon = getIcon(event.category);
    return (
        <article className={cn("group relative overflow-hidden rounded-2xl border backdrop-blur", event.featured ? 'border-primary/30 bg-primary/5 shadow-lg shadow-primary/20' : 'border-border bg-background/20')}>
            {event.featured && event.imageUrl && (
                <Image src={event.imageUrl} alt={event.title} className="absolute inset-0 h-full w-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" fill />
            )}
            {event.featured && (
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-background/20"></div>
            )}
            <div className="relative px-5 py-4">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] items-center gap-4">
                    <div className="flex items-center md:block justify-between">
                        <div className={cn("flex gap-2 text-[11px] uppercase tracking-wide items-center", event.featured ? 'text-primary' : 'text-muted-foreground')}>
                            <CalendarDays className="h-3.5 w-3.5"/>
                            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <p className="md:mt-2 text-2xl md:text-3xl font-semibold tracking-tight">{event.day}</p>
                    </div>
                    <div>
                        {(event.category || event.location) && (
                            <div className={cn("flex gap-2 text-[11px] uppercase tracking-wide items-center", event.featured ? "text-primary" : "text-muted-foreground")}>
                                <EventIcon className="h-3.5 w-3.5"/>
                                <span>{event.category || event.location}</span>
                            </div>
                        )}
                        <h3 className="mt-1 text-base md:text-lg font-semibold tracking-tight">{event.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="justify-self-end">
                        <Button variant="ghost" className="h-10 w-10 grid place-items-center rounded-xl border border-border bg-background/30 text-foreground/80 hover:bg-muted transition">
                            {event.featured ? <Play className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>}
                        </Button>
                    </div>
                </div>
            </div>
            {event.featured && (
                <span className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-primary/30"></span>
            )}
        </article>
    );
  };

  return (
    <div className="bg-background text-foreground antialiased font-sans">
      <div className="relative min-h-screen overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[140vmax] h-[140vmax] rounded-full bg-primary/5 blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[60vmin] h-[60vmin] rounded-full bg-blue-500/10 blur-[120px]"></div>
        </div>

        {/* Radial rings/grid */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vmin] h-[120vmin] rounded-full border border-border/50"></div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vmin] h-[90vmin] rounded-full border border-border/50"></div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] rounded-full border border-border/50"></div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border/50"></div>
            <div className="absolute left-0 right-0 top-1/4 -translate-y-1/2 h-px bg-border/50"></div>
        </div>

        <Header />

        <main className="relative z-10">
            <div className="max-w-7xl px-4 md:px-8 pt-24 md:pt-32 pb-20 md:pb-40 mx-auto">
                <div className="relative grid place-items-center text-center">
                    <h1 className="text-[20vw] leading-none md:text-[8rem] select-none font-semibold text-foreground/95 tracking-tight">
                    EVENTS
                    </h1>
                    <p className="mt-4 max-w-xl text-center text-base md:text-lg text-muted-foreground">
                    A next-gen event hall where deep strategy meets faith. Explore, learn, and experience growth in immersive ways.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                        <Button asChild size="lg">
                            <a href="#upcoming-events">
                            <Ticket className="w-5 h-5" />
                            <span>View Upcoming Events</span>
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <a href="#explore">
                            <PlayCircleIcon className="w-5 h-5" />
                            <span>Explore Topics</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            <section className="relative z-10 -mt-10" id="explore">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 supports-[backdrop-filter]:bg-background/50 md:p-4 bg-background/50 border border-border rounded-2xl pt-3 pr-3 pb-3 pl-3 backdrop-blur-3xl">
                        {featureCards.map(card => (
                            <div key={card.title} className="flex-1 group hover:bg-muted/50 transition md:p-5 flex items-start gap-4 bg-transparent border-border border rounded-xl pt-4 pr-4 pb-4 pl-4">
                                <div className="h-10 w-10 grid place-items-center shadow-primary/20 text-center bg-gradient-to-t from-background to-secondary rounded-full pt-3 pr-3 pb-3 pl-3 shadow-sm items-center justify-center">
                                    <card.icon className="w-[20px] h-[20px] text-foreground/50" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mt-1">{card.category}</p>
                                    <h3 className="mt-1 text-base md:text-lg font-semibold tracking-tight">{card.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section id="upcoming-events" className="relative z-10 max-w-7xl md:px-8 mt-24 md:mt-32 mr-auto ml-auto pr-6 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground/95 uppercase">Upcoming Events</h2>
                     <Button variant="outline" asChild>
                        <a href="#contact">
                            <Mail className="h-4 w-4" />
                            <span>Get Notified</span>
                        </a>
                    </Button>
                </div>
                
                <div className="mt-8 space-y-4">
                {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                )) : (
                  <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
                      <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-xl font-semibold">No Upcoming Events</h3>
                      <p className="mt-2 text-muted-foreground">Check back soon for new announcements.</p>
                  </div>
                )}
                </div>
            </section>

             <section id="past-events" className="relative z-10 max-w-7xl md:px-8 mt-24 md:mt-32 mr-auto ml-auto pr-6 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground/95 uppercase">Past Events</h2>
                    <p className="text-muted-foreground">A look back at our previous sessions.</p>
                </div>
                
                <div className="mt-8 space-y-4">
                {pastEvents.length > 0 ? pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                )) : (
                  <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
                      <History className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-xl font-semibold">No Past Events</h3>
                      <p className="mt-2 text-muted-foreground">Our event history will appear here.</p>
                  </div>
                )}
                </div>
            </section>
        </main>
        
        <div className="mt-32">
            <Footer />
        </div>

      </div>
    </div>
  );
};

function PlayCircleIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
        </svg>
    )
}

export default EventsPage;
