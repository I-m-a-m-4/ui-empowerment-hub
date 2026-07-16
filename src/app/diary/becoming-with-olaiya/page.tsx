
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import placeholderData from '@/lib/placeholder-images.json';
import { Users, Check, Mic, Rss, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bannerImage = placeholderData.placeholderImages.find(p => p.id === 'diary-interviews');

const BecomingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="relative h-80 md:h-96 w-full flex items-center justify-center text-center text-white">
            {bannerImage && (
                <Image
                    src={bannerImage.imageUrl}
                    alt="Becoming with Olaiya Banner"
                    fill
                    className="object-cover"
                    data-ai-hint={bannerImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative z-10 p-4 anim d-1 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6">
                    <Users className="w-4 h-4" />
                    <span>Second Series</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Becoming with Olaiya</h1>
                <p className="mt-4 text-lg md:text-xl text-white/90">
                    I sit down with leading Muslim entrepreneurs, founders, CEOs, and creatives to uncover the real stories behind their journeys.
                </p>
            </div>
        </section>

        <section id="series-content" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold mb-4">About the Series</h2>
                        <div className="prose prose-lg dark:prose-invert">
                            <p>This is not just another “business podcast.” It’s a raw, unfiltered look into the struggles, sacrifices, and wins of Muslims who are building something meaningful — while holding firmly to their Islamic values.</p>
                            
                            <h3 className="text-xl font-semibold mt-8 mb-4">What to Expect:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3"><Check className="text-primary w-6 h-6 mt-1 flex-shrink-0" /><span>Behind-the-scenes struggles: the pains and challenges nobody talks about</span></li>
                                <li className="flex items-start gap-3"><Check className="text-primary w-6 h-6 mt-1 flex-shrink-0" /><span>Turning points: the breakthroughs that shifted their business journeys</span></li>
                                <li className="flex items-start gap-3"><Check className="text-primary w-6 h-6 mt-1 flex-shrink-0" /><span>Faith & resilience: how they stayed grounded in Islam while rising in business</span></li>
                                <li className="flex items-start gap-3"><Check className="text-primary w-6 h-6 mt-1 flex-shrink-0" /><span>Practical gems: advice you can implement immediately as a Muslim entrepreneur</span></li>
                            </ul>

                             <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-8">
                                Becoming with Olaiya is about proof. Proof that Muslims can build empires, lead industries, and create lasting legacies — without compromising their Deen.
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
                                        <p>Bi-weekly episodes</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mic className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-semibold text-foreground">Format</p>
                                        <p>Interview-style conversations (audio + highlight clips)</p>
                                    </div>
                                </li>
                            </ul>
                             <div className="mt-6">
                                <h4 className="font-semibold mb-2">Where to Listen</h4>
                                <div className="flex flex-col gap-3">
                                    <Button variant="outline" asChild><a href="#" target="_blank" rel="noopener noreferrer" className="w-full">Spotify</a></Button>
                                    <Button variant="outline" asChild><a href="#" target="_blank" rel="noopener noreferrer" className="w-full">Apple Podcasts</a></Button>
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

export default BecomingPage;
