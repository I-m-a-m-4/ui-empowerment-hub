
'use client'

import { Button } from "@/components/ui/button";
import { Check, Users } from "lucide-react";
import Link from "next/link";
import MotionWrap from "./MotionWrap";

const Mentorship = () => {
    return (
        <MotionWrap>
            <section id="mentorship" className="py-20" style={{ '--animation-delay': '0.6s' } as React.CSSProperties}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="text-center mb-12 max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Book a One-on-One with a Growth Strategist</h2>
                        <p className="mt-2 text-lg text-muted-foreground">Get expert mentorship from a Pro-Islamic Business Strategist and Consultant.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                        <article className="md:col-span-1 glass-card p-6 anim d-2 rounded-2xl">
                            <h3 className="text-xl font-semibold">Why Work With a Business Strategist?</h3>
                            <ul className="mt-4 space-y-4 text-muted-foreground">
                                <li>
                                    <h4 className="font-semibold text-foreground">World-Class Expertise</h4>
                                    <p className="text-sm">Learn from a business consultant with proven success across multiple industries.</p>
                                </li>
                                <li>
                                    <h4 className="font-semibold text-foreground">Tailored for You</h4>
                                    <p className="text-sm">Every session is customized to your business challenges by an expert brand strategist.</p>
                                </li>
                                <li>
                                    <h4 className="font-semibold text-foreground">Action-Oriented</h4>
                                    <p className="text-sm">Walk away with practical strategies you can implement immediately.</p>
                                </li>
                            </ul>
                        </article>

                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <article className="border-2 border-primary/50 bg-primary/5 glass-card p-6 anim d-3 relative rounded-2xl">
                                <div className="absolute -top-3 right-4 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary ring-1 ring-primary/20">In-Person</div>
                                <h3 className="text-lg tracking-tight font-medium">One-on-One In-Person Session</h3>
                                <p className="mt-1 text-3xl tracking-tight font-semibold">$349.99</p>
                                <p className="text-sm text-muted-foreground mt-1">90-120 minutes</p>
                                <p className="text-sm text-foreground/80 mt-4">👉 Best for serious entrepreneurs who want immersive guidance.</p>
                                <ul className="mt-4 space-y-2 text-sm">
                                    <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Immersive Guidance</li>
                                    <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> 2-week hands-on follow-up</li>
                                </ul>
                                 <Button asChild className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                    <a href="https://calendly.com/scalewitholaiya/20-minute-discovery-call" target="_blank" rel="noopener noreferrer">Book Session</a>
                                </Button>
                            </article>
                            <article className="glass-card p-6 anim d-4 relative rounded-2xl">
                                <div className="absolute -top-3 right-4 bg-sky-400/10 px-2 py-1 text-[10px] font-medium text-sky-300 ring-1 ring-sky-400/20">Virtual</div>
                                <h3 className="text-lg tracking-tight font-medium">One-on-One Virtual Session</h3>
                                <p className="mt-1 text-3xl tracking-tight font-semibold">$99.99</p>
                                <p className="text-sm text-muted-foreground mt-1">60-75 minutes (Zoom/Meet)</p>
                                 <p className="text-sm text-foreground/80 mt-4">👉 Best for entrepreneurs who want clarity & quick wins.</p>
                                <ul className="mt-4 space-y-2 text-sm">
                                    <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Tailored Strategies</li>
                                    <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> 2-week hands-on follow-up</li>
                                </ul>
                                <Button asChild variant="secondary" className="mt-5 w-full">
                                    <a href="https://calendly.com/scalewitholaiya/20-minute-discovery-call" target="_blank" rel="noopener noreferrer">Book Session</a>
                                </Button>
                            </article>
                        </div>
                    </div>

                    <article className="max-w-6xl mx-auto mt-12 text-center glass-card p-8 anim d-5 rounded-2xl">
                        <h3 className="text-xl font-semibold">Important Information</h3>
                        <p className="text-muted-foreground mt-2">All sessions include a 2-week hands-on follow-up. Retainer options are available for continued support.</p>
                        <div className="mt-6">
                            <Button asChild>
                                <Link href="/pricing">View All Packages & Retainers</Link>
                            </Button>
                        </div>
                    </article>

                    <div className="mt-20 border-t border-border pt-20">
                        <header className="text-center mb-12 max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Team & Corporate Mentorship</h2>
                            <p className="mt-2 text-lg text-muted-foreground">Empower your entire team with strategic clarity and a growth mindset.</p>
                        </header>
                        <article className="relative border-2 border-primary/30 bg-primary/5 p-8 max-w-4xl mx-auto anim d-1 rounded-2xl glass-card">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-primary/10 ring-1 ring-primary/20 rounded-lg">
                                            <Users className="size-6 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-semibold">Team Mentorship</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-6">
                                        Tailored for startups, SMEs, and corporate teams seeking to align their objectives with proven growth strategies. Available in-person or virtually.
                                    </p>
                                    <ul className="space-y-2 text-sm mb-6">
                                        <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Group-focused Strategy & Alignment</li>
                                        <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Leadership & Mindset Coaching</li>
                                        <li className="flex items-center gap-2"><Check className="size-4 text-primary" /> Half-Day & Full-Day Workshops Available</li>
                                    </ul>
                                    <Button size="lg" asChild>
                                        <a href="#contact">Enquire About Team Sessions</a>
                                    </Button>
                                </div>
                                <div className="hidden md:block">
                                    <div className="text-center bg-background/30 p-8 rounded-xl">
                                        <p className="text-lg text-muted-foreground">Starting from</p>
                                        <p className="text-5xl font-bold tracking-tighter text-foreground my-2">$1,299.99</p>
                                        <p className="text-muted-foreground">for a 2-3 hour virtual session</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </MotionWrap>
    );
};

export default Mentorship;
