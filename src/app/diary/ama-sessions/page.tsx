
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import placeholderData from '@/lib/placeholder-images.json';
import { MessageSquare, Check, Mic, Rss, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bannerImage = placeholderData.placeholderImages.find(p => p.id === 'news-banner');

const AmaPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="relative h-80 md:h-96 w-full flex items-center justify-center text-center text-white">
            {bannerImage && (
                <Image
                    src={bannerImage.imageUrl}
                    alt="AMA Sessions with Olaiya Banner"
                    fill
                    className="object-cover"
                    data-ai-hint={bannerImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative z-10 p-4 anim d-1 max-w-4xl mx-auto">
                 <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6">
                    <MessageSquare className="w-4 h-4" />
                    <span>Third Series</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">AMA Sessions with Olaiya</h1>
                <p className="mt-4 text-lg md:text-xl text-white/90">
                    Every week, I host a live Ask Me Anything (AMA) session where I answer burning questions from Muslim business owners, founders, and entrepreneurs.
                </p>
            </div>
        </section>

        <section id="series-content" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold mb-4">About the Series</h2>
                        <div className="prose prose-lg dark:prose-invert">
                            <p>Think of it as your chance to bring your toughest challenges — and get direct, practical, faith-rooted answers in real time.</p>
                            
                            <h3 className="text-xl font-semibold mt-8 mb-4">What Happens in AMA Sessions:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3"><Check className="text-primary w-6 h-6 mt-1 flex-shrink-0" /><span>Questions gathered during the week from entrepreneurs and founders</span></li>
                                <li className="flex items-start gap-3"><Check className="text-primary w-6 h-6 mt-1 flex-shrink-0" /><span>Live answers on air — straight, clear, and actionable</span></li>
                                <li className="flex items-start gap-3"><Check className="text-primary w-6 h-6 mt-1 flex-shrink-0" /><span>Topics can range from business strategy, mindset, leadership, sales & marketing</span></li>
                                <li className="flex items-start gap-3"><Check className="text-primary w-6 h-6 mt-1 flex-shrink-0" /><span>How to hold firmly to Islam while navigating modern business challenges</span></li>
                            </ul>

                             <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-8">
                                This is the “office hours” of a Muslim strategist. Your struggles, clarified live.
                            </blockquote>
                        </div>
                    </div>
                    <aside className="md:col-span-1">
                        <div className="sticky top-24 glass-card p-6">
                            <h3 className="text-xl font-semibold mb-4">Series Details</h3>
                            <ul className="space-y-4 text-muted-foreground">
                                <li className="flex items-center gap-3">
                                    <Rss className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-semibold text-foreground">Frequency</p>
                                        <p>Weekly</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mic className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-semibold text-foreground">Format</p>
                                        <p>Live Q&A (recordings available)</p>
                                    </div>
                                </li>
                            </ul>
                             <div className="mt-6">
                                <h4 className="font-semibold mb-2">Where to Listen</h4>
                                <div className="flex flex-col gap-3">
                                    <Button variant="outline" asChild><a href="#" target="_blank" rel="noopener noreferrer" className="w-full">Podcast Platforms</a></Button>
                                    <Button variant="outline" asChild><a href="#" target="_blank" rel="noopener noreferrer" className="w-full">YouTube Live</a></Button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
                 <div className="mt-16 text-center">
                    <p className="text-lg text-muted-foreground">Episodes coming soon...</p>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AmaPage;
