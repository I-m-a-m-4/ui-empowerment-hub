
'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Award, BookOpen, Check, Cpu, ImageIcon, Library, MessageSquare, Mic, Newspaper, Play, Rocket, Star, Users, Briefcase, GraduationCap, BookHeart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import placeholderData from '@/lib/placeholder-images.json';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';


const featureSlides = [
    {
        key: 'strategies',
        bullet: 'Strategies from the Hearts of the Companions',
        accent: 'emerald',
        icon: BookOpen,
        pillText: 'Learn from',
        tailText: 'the best generation',
        body: 'A deep dive into the strategic brilliance of the Sahabah. We extract timeless principles from their practices for you to apply today.',
    },
    {
        key: 'becoming',
        bullet: 'Becoming with Olaiya',
        accent: 'blue',
        icon: Users,
        pillText: 'Uncover',
        tailText: 'the real stories',
        body: 'Raw, unfiltered conversations with leading Muslim entrepreneurs, founders, and CEOs about their struggles, sacrifices, and wins.',
    },
    {
        key: 'ama',
        bullet: 'AMA Sessions with Olaiya',
        accent: 'violet',
        icon: MessageSquare,
        pillText: 'Get',
        tailText: 'your questions answered',
        body: 'Live Q&A sessions where I answer your burning questions on business strategy, scaling, mindset, and navigating the market as a Muslim.',
    },
];

const diarySections = [
  { href: '/diary/strategies-from-the-companions', label: 'Strategies from the Hearts of the Companions', description: 'Timeless principles from the Sahabah.', imageId: 'diary-podcast', icon: BookOpen },
  { href: '/diary/becoming-with-olaiya', label: 'Becoming with Olaiya', description: 'In-depth conversations with leaders.', imageId: 'diary-interviews', icon: Users },
  { href: '/diary/ama-sessions', label: 'AMA Sessions', description: 'Live Q&A with Olaiya.', imageId: 'diary-news', icon: MessageSquare },
  { href: '/diary/reviews', label: 'Reviews', description: 'Real stories and results from clients.', imageId: 'diary-reviews', icon: Award },
  { href: '/pagetopurpose', label: 'Page to Purpose™', description: 'Join the book review club for growth.', imageId: 'resource-library-banner', icon: BookHeart },
  { href: '/SMEgrant-readinessbootcamp', label: 'Halal Grant-Readiness Community', description: 'Webinar on SME grants for Muslims.', imageId: 'gallery-banner', icon: GraduationCap },
];


const DiaryPage = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % featureSlides.length);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    const handleBulletClick = (index: number) => {
        setActiveSlide(index);
    };

    const currentSlide = featureSlides[activeSlide];

    const accents = {
        blue: {
            pill: 'ring-blue-500/60 bg-blue-500/10 text-blue-200',
            iconBox: 'bg-blue-500/10 text-blue-400',
            bar: 'bg-blue-400',
        },
        emerald: {
            pill: 'ring-emerald-500/60 bg-emerald-500/10 text-emerald-200',
            iconBox: 'bg-emerald-500/10 text-emerald-400',
            bar: 'bg-emerald-400',
        },
        violet: {
            pill: 'ring-violet-500/60 bg-violet-500/10 text-violet-200',
            iconBox: 'bg-violet-500/10 text-violet-400',
            bar: 'bg-violet-400',
        },
    };
    
    const currentAccent = accents[currentSlide.accent as keyof typeof accents];
    const heroImage = placeholderData.placeholderImages.find(p => p.id === 'diary-banner');


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="relative z-10">
          <div className="md:px-8 lg:px-12 md:py-24 mt-16 mb-16 pt-16 pr-6 pb-16 pl-6 items-center justify-center">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div className="order-2 lg:order-1">
                  <div className="p-8 lg:p-10 shadow-xl border rounded-3xl backdrop-blur-sm border-indigo-500/20 bg-gradient-to-br from-blue-500/10 to-purple-600/10 hover:border-indigo-400/40 transition-all duration-300 light:bg-white/80">
                    <div className="flex items-center gap-3 mb-8">
                       <div className="flex items-center gap-0.5">
                           {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 stroke-[1.5] text-amber-500 fill-amber-500" />)}
                       </div>
                       <span className="text-xs font-medium text-slate-400 light:text-slate-500">Trusted by Muslim Entrepreneurs</span>
                    </div>
                     <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-8 text-slate-100 light:text-slate-900 font-light tracking-tighter">
                        Diary of the Muslim Strategist
                     </h1>
                    <p className="text-lg leading-relaxed mb-12 text-zinc-400 light:text-zinc-700">
                        A curated collection of insights, stories, and resources from my journey as a Pro-Islamic business consultant.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                      <Button asChild size="lg">
                        <Link href="#explore">
                            <Play className="w-4 h-4 stroke-[1.5] mr-2" />
                            Explore Content
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <a href="https://calendly.com/scalewitholaiya/20-minute-discovery-call" target="_blank" rel="noopener noreferrer">
                            <MessageSquare className="w-4 h-4 stroke-[1.5] mr-2" />
                            Book a Session
                        </a>
                      </Button>
                    </div>
                     <div className="grid grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-12 h-12 flex border rounded-2xl mr-auto mb-3 ml-auto items-center justify-center border-white/20 bg-white/10 backdrop-blur-xl shadow-lg light:bg-slate-100 light:border-slate-200">
                                <Newspaper className="w-5 h-5 text-white light:text-slate-600" />
                            </div>
                            <div className="text-xs font-medium text-blue-300 light:text-blue-600">Articles</div>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 flex border rounded-2xl mr-auto mb-3 ml-auto items-center justify-center border-white/20 bg-white/10 backdrop-blur-xl shadow-lg light:bg-slate-100 light:border-slate-200">
                               <Mic className="w-5 h-5 text-white light:text-slate-600" />
                            </div>
                            <div className="text-xs font-medium text-blue-300 light:text-blue-600">Podcasts</div>
                        </div>
                        <div className="text-center">
                           <div className="w-12 h-12 flex border rounded-2xl mr-auto mb-3 ml-auto items-center justify-center border-white/20 bg-white/10 backdrop-blur-xl shadow-lg light:bg-slate-100 light:border-slate-200">
                               <Award className="w-5 h-5 text-white light:text-slate-600" />
                           </div>
                           <div className="text-xs font-medium text-blue-300 light:text-blue-600">Case Studies</div>
                        </div>
                    </div>
                  </div>
                </div>
                 <div className="relative order-1 lg:order-2 group">
                    <div className="overflow-hidden border rounded-3xl shadow-2xl backdrop-blur-sm border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-600/10 hover:border-blue-400/40 transition-all duration-300 light:bg-white/80">
                        <div className="absolute top-8 left-8 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium border z-10 backdrop-blur-sm border-emerald-500/20 bg-white/10 text-emerald-300 light:bg-slate-100 light:border-slate-200 light:text-emerald-700">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span>Latest Insights</span>
                        </div>
                         <div className="h-[500px] lg:h-[650px] bg-gradient-to-br from-blue-600/20 to-purple-700/20 relative overflow-hidden">
                            {heroImage && <Image src={heroImage.imageUrl} alt={heroImage.description} fill className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-30" />}
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-6">
                            <div className="border rounded-2xl pt-6 pr-6 pb-6 pl-6 backdrop-blur-xl border-white/20 bg-white/10 shadow-lg light:bg-slate-100/80 light:border-slate-200">
                                <div className="text-2xl text-slate-100 font-light tracking-tighter light:text-slate-900">50+</div>
                                <div className="text-sm mt-1 text-blue-300 light:text-blue-600">Articles & Guides</div>
                            </div>
                            <div className="rounded-2xl p-6 border backdrop-blur-xl border-white/20 bg-white/10 shadow-lg light:bg-slate-100/80 light:border-slate-200">
                                <div className="text-2xl text-slate-100 font-light tracking-tighter light:text-slate-900">20+</div>
                                <div className="text-sm mt-1 text-blue-300 light:text-blue-600">Podcast Episodes</div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="explore" className="max-w-7xl md:px-8 md:py-24 mr-auto ml-auto pt-16 pr-6 pb-16 pl-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white light:text-slate-900 font-light tracking-tighter">
                       A Strategist's Playbook for the Ummah
                    </h2>
                     <div id="bulletList" className="mt-10 space-y-5">
                       {featureSlides.map((slide, index) => (
                         <button key={slide.key} type="button" data-index={index} onClick={() => handleBulletClick(index)} className="group w-full flex items-center gap-3 sm:gap-4">
                           <span className={cn("h-6 w-1 rounded-full transition-colors", activeSlide === index ? currentAccent.bar : 'bg-neutral-700 light:bg-neutral-300')}></span>
                           <span className={cn("text-sm sm:text-base font-medium", activeSlide === index ? 'text-white light:text-slate-900' : 'text-neutral-500 group-hover:text-neutral-300 light:text-neutral-500 light:group-hover:text-neutral-800')}>{slide.bullet}</span>
                         </button>
                       ))}
                     </div>
                </div>
                <div className="relative">
                    <div className="relative rounded-2xl border border-neutral-800/80 bg-neutral-900/50 shadow-[0_10px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/5 backdrop-blur-md overflow-hidden light:bg-white light:border-neutral-200 light:shadow-2xl">
                        <div className="h-12 flex items-center gap-2 px-4 border-b border-neutral-800/70 text-neutral-400 text-sm light:border-neutral-200 light:text-neutral-500">
                           <BookOpen className="w-4 h-4" />
                           <span className="truncate">Scale with Olaiya</span>
                           <span className="opacity-50">›</span>
                           <span className="truncate text-neutral-300 light:text-neutral-900">Diary</span>
                        </div>
                         <div className="relative px-6 md:px-8 py-8 md:py-10">
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-5", currentAccent.iconBox)}>
                                <currentSlide.icon className="w-6 h-6" />
                            </div>
                            <div className="relative">
                                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-100 flex flex-wrap items-center gap-3 light:text-neutral-900">
                                    <span className={cn("inline-flex items-center rounded-md px-2.5 py-1.5 ring-1 text-base sm:text-lg", currentAccent.pill)}>{currentSlide.pillText}</span>
                                    <span className="font-light tracking-tighter">{currentSlide.tailText}</span>
                                </h3>
                            </div>
                            <p className="mt-5 text-neutral-400 leading-relaxed max-w-prose text-[17px] sm:text-lg light:text-neutral-600">{currentSlide.body}</p>
                             <div className="mt-8 space-y-2">
                               <div className="h-3 rounded bg-neutral-800/70 w-2/3 light:bg-neutral-200"></div>
                               <div className="h-3 rounded bg-neutral-800/70 w-5/6 light:bg-neutral-200"></div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="diary-grid" className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <header className="mx-auto max-w-3xl text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground anim d-1">A Peek Into The Diary</h2>
                    <p className="mt-6 text-lg text-muted-foreground leading-relaxed anim d-2">
                        Explore reviews, news, podcast episodes, and more. This is more than a blog—it's a window into my world as a business strategist committed to the Ummah.
                    </p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {diarySections.map((section, index) => {
                    const sectionImage = placeholderData.placeholderImages.find(p => p.id === section.imageId);
                    return (
                       <Link href={section.href} key={index} className={`group relative aspect-square block overflow-hidden rounded-2xl anim d-${index + 2}`}>
                           {sectionImage && (
                                <Image
                                    src={sectionImage.imageUrl}
                                    alt={section.label}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    data-ai-hint={sectionImage.imageHint}
                                />
                           )}
                           <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-colors duration-300 group-hover:bg-black/40" />
                           <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                                <div className="p-4 bg-white/10 rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-90">
                                    <section.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-semibold tracking-tight">{section.label}</h3>
                                <p className="mt-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{section.description}</p>
                           </div>
                       </Link>
                    )
                  })}
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default DiaryPage;
