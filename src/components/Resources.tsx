
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import MotionWrap from './MotionWrap';
import { Dialog, DialogTrigger } from './ui/dialog';
import WaitlistForm from './WaitlistForm';

const Resources = () => {
  return (
    <MotionWrap>
      <section id="resources" className="relative py-20 md:py-32 bg-[#111113] text-white overflow-hidden" style={{'--animation-delay': '0.8s'} as React.CSSProperties}>
        <div className="absolute inset-0 bg-[url(/images/grain.jpg)] opacity-10 pointer-events-none"></div>
        <div className="absolute -left-1/4 -bottom-1/4 w-3/4 h-3/4 bg-red-500/30 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="flex justify-center anim d-2 perspective-container">
              <div className="relative w-96 h-[32rem] book-transform">
                  <Image
                      src="/images/Book_Cover_Mockup.png"
                      alt="How the Best Generation Built Wealth Book Cover"
                      fill
                      data-ai-hint="book cover"
                      className="object-cover shadow-2xl shadow-red-900/20"
                      sizes="(max-width: 768px) 70vw, 33vw"
                  />
                  <div className="absolute inset-0 book-reflection"></div>
              </div>
            </div>
            <div className="text-center lg:text-left anim d-3">
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">How the Best Generation Built Wealth—Exploring How the Companions Run their Businesses without Compromise</h3>
              <p className="mt-4 text-lg text-neutral-300">
                This book is your passport to the real Islamic heritage and wealth journey: bold, planned, and bursting with rich insights. From students and dreamers to business owners and global investors, this book is for anyone ready to trade confused stereotypes for fresh Islamic-informed perspectives.
              </p>
              <p className="mt-4 font-semibold text-primary text-xl">Coming Soon!</p>
              <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" variant="secondary" className="bg-primary hover:bg-primary/90 text-primary-foreground">Join the Waitlist</Button>
                    </DialogTrigger>
                    <WaitlistForm />
                </Dialog>
              </div>
            </div>
          </article>
        </div>
      </section>
    </MotionWrap>
  );
};

export default Resources;
