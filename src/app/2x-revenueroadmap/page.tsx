'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Ticket } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Declare PaystackPop as a global variable
declare global {
    interface Window {
        PaystackPop: any;
    }
}

const PaystackButton = () => {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const amount = 2999900; // 29,999 NGN in kobo
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

    // Load Paystack inline script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        script.onload = () => {
            console.log('✅ Paystack script loaded');
            setScriptLoaded(true);
        };
        script.onerror = () => {
            console.error('❌ Failed to load Paystack script');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = () => {
        if (!publicKey) {
            toast({
                title: 'Configuration Error',
                description: 'Payment gateway is not configured.',
                variant: 'destructive',
            });
            return;
        }

        if (!email || !name) {
            toast({
                title: 'Missing Information',
                description: 'Please enter your name and email address.',
                variant: 'destructive',
            });
            return;
        }

        if (!scriptLoaded || !window.PaystackPop) {
            toast({
                title: 'Loading...',
                description: 'Please wait a moment and try again.',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);

        const handler = window.PaystackPop.setup({
            key: publicKey,
            email: email,
            amount: amount,
            currency: 'NGN',
            ref: 'RR-' + Math.floor((Math.random() * 1000000000) + 1),
            metadata: {
                custom_fields: [
                    {
                        display_name: "Name",
                        variable_name: "name",
                        value: name
                    }
                ]
            },
            channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
            callback: function(response: any) {
                console.log('✅✅✅ PAYMENT SUCCESS CALLBACK FIRED!', response);
                setLoading(false);

                toast({
                    title: '✅ Payment Successful!',
                    description: 'Redirecting you to WhatsApp now...',
                });

                // Save to Firestore in background
                addDoc(collection(db, 'revenueRoadmapRegistrations'), {
                    name: name,
                    email: email,
                    paystackReference: response.reference,
                    status: 'success',
                    amount: amount / 100,
                    webinar: '2x Revenue Roadmap',
                    registeredAt: serverTimestamp(),
                }).then(() => {
                    console.log('✅ Saved to Firestore');
                }).catch((error) => {
                    console.error('❌ Firestore error:', error);
                });

                // Redirect to WhatsApp
                setTimeout(() => {
                    window.location.href = 'https://wa.me/2348100985574';
                }, 1500);
            },
            onClose: function() {
                console.log('❌ Payment popup closed');
                setLoading(false);
            }
        });

        handler.openIframe();
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            <Input
                type="text"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-base h-12"
                required
            />
            <Input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base h-12"
                required
            />
            <Button 
                onClick={handlePayment} 
                disabled={loading || !publicKey || !scriptLoaded} 
                size="lg" 
                className="w-full h-12 text-base font-semibold"
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Ticket className="mr-2 h-5 w-5" />
                        Register and Pay ₦29,999
                    </>
                )}
            </Button>
            {!scriptLoaded && (
                <p className="text-xs text-center text-muted-foreground">
                    Loading payment gateway...
                </p>
            )}
        </div>
    );
};


const RevenueRoadmapPage = () => {
    const { setTheme } = useTheme();

    useEffect(() => {
        // Add custom styles for text spacing
        const styleId = 'revenue-article-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .revenue-article p {
                    margin-top: 1.5rem !important;
                    margin-bottom: 1.5rem !important;
                }
                .revenue-article h1 {
                    margin-top: 0 !important;
                    margin-bottom: 2.5rem !important;
                    line-height: 1.3 !important;
                }
                .revenue-article h2 {
                    margin-top: 4rem !important;
                    margin-bottom: 2rem !important;
                    line-height: 1.3 !important;
                }
                .revenue-article h3 {
                    margin-top: 3rem !important;
                    margin-bottom: 1.5rem !important;
                    line-height: 1.4 !important;
                }
                .revenue-article ul {
                    margin-top: 2rem !important;
                    margin-bottom: 2rem !important;
                    list-style-type: disc !important;
                    padding-left: 2.5rem !important;
                    margin-left: 0 !important;
                }
                .revenue-article li {
                    margin-top: 0.75rem !important;
                    margin-bottom: 0.75rem !important;
                    line-height: 1.8 !important;
                    display: list-item !important;
                }
                .revenue-article blockquote {
                    margin-top: 3rem !important;
                    margin-bottom: 3rem !important;
                    padding-top: 1.5rem !important;
                    padding-bottom: 1.5rem !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        return () => {
            const style = document.getElementById(styleId);
            if (style) {
                style.remove();
            }
        };
    }, []);

    useEffect(() => {
        setTheme('light');
    }, [setTheme]);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [isStickyOpen, setIsStickyOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-[0%] z-50" style={{ scaleX }} />

            <Header />
            <main className="flex-grow pt-24 pb-32">
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <article className="revenue-article max-w-3xl mx-auto prose prose-lg dark:prose-invert 
                            [&_p]:my-6 [&_p]:leading-[1.8]
                            [&_h1]:mt-0 [&_h1]:mb-10 [&_h1]:leading-[1.3]
                            [&_h2]:mt-16 [&_h2]:mb-8 [&_h2]:leading-[1.3]
                            [&_h3]:mt-12 [&_h3]:mb-6 [&_h3]:leading-[1.4]
                            [&_ul]:my-8 [&_ul]:space-y-2
                            [&_li]:my-2 [&_li]:leading-[1.8]
                            [&_blockquote]:my-12 [&_blockquote]:py-6
                            [&_strong]:font-bold">
                            
                            <h1 className="font-bold">Almost every Nigerian Muslim entrepreneur experiences this <mark className="bg-primary/20 text-primary font-semibold px-1">Yellow Bus Problem</mark>.</h1>

                            <p className="text-3xl md:text-4xl font-bold !leading-[1.15] my-8 text-center">And in the next 6 months, I will help you 2x your revenue by doing less than you are already doing.</p>

                            <p><strong>Before you read on, watch this video first, I will tell you why later.</strong></p>

                            <div className="relative aspect-[9/16] bg-black rounded-lg my-8 overflow-hidden max-w-sm mx-auto">
                                <video
                                    src="/revenueroadmap.mp4"
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls
                                />
                            </div>

                            <p className="text-sm text-muted-foreground">Saturday, 7:04 am</p>

                            <p>My name is Ismail Olaiya.</p>
                            
                            <p>I'm a husband and a father to an amazing son.</p>
                            
                            <p>And most importantly, I'm a business growth strategist for muslim entrepreneurs.</p>
                            
                            <p>I have worked with top industries such as The Rehla Academy, Peritus, HeartHub Solutions, ResearchGain, SCCENTAURA, Pilgrim Privè and lots more.</p>

                            <p>I'm writing this letter from one of the busiest cities in Nigeria: Lagos.</p>
                            
                            <p>There is one popular thing in Lagos that even if you don't live here, you already know it.</p>
                            
                            <p><strong>The yellow transport bus.</strong></p>

                            <p>You see,</p>
                            
                            <p>Over time, I started listening to the real reasons why most entrepreneurs are stuck in their revenue:</p>
                            
                            <ul>
                                <li>Why their income is not stable.</li>
                                <li>Why they are pulled in different directions by urgent tasks.</li>
                                <li>Why growth feels like a slow, repeating circle.</li>
                            </ul>

                            <p>Then I realized something.</p>
                            
                            <p>There is only one major problem.</p>
                            
                            <p>And it is common to more than 87% of the brands I have worked with.</p>

                            <blockquote className="border-l-4 border-primary pl-4 italic my-8">
                                If all you want right now is to make at least 2x what your business is currently making without being as busy as you are now then you are also facing this problem.
                            </blockquote>

                            <h2>I call it the <mark className="bg-primary/20 text-primary font-semibold px-1">Yellow Bus Problem</mark>.</h2>
                            
                            <p>Let me explain.</p>
                            
                            <p>The Lagos yellow bus is known for one thing: <strong>it is always busy.</strong></p>
                            
                            <p>There is hardly any time of the day you won't find it on the road.</p>
                            
                            <p>It works 24/7.</p>
                            
                            <p>And most entrepreneurs are <strong>exactly like this.</strong></p>
                            
                            <p>They are very busy and that busyness is draining their business potential.</p>

                            <h3>They are trapped in the technical side of their business.</h3>
                            
                            <ul>
                                <li>Waking up to onboard clients.</li>
                                <li>Tracking payments.</li>
                                <li>Delivering services.</li>
                                <li>Following up.</li>
                                <li>Looking for new clients.</li>
                                <li>Monitoring campaigns.</li>
                                <li>And handling many other daily tasks.</li>
                            </ul>

                            <p>On the surface, nothing seems wrong.</p>
                            
                            <p>After all, the business is running.</p>
                            
                            <p>But that right there is the Yellow Bus Problem.</p>

                            <h3>You are running your business like the yellow bus:</h3>
                            
                            <ul>
                                <li>same route,</li>
                                <li>same audience,</li>
                                <li>same price,</li>
                                <li>same method,</li>
                                <li>same income.</li>
                            </ul>
                            
                            <p>You are stuck in the technical phase, the phase that only keeps the business running.</p>
                            
                            <p><strong>But you should be in the strategic phase, the phase that makes the business grow.</strong></p>
                            
                            <p>And this is exactly where I come in.</p>
                            
                            <h2>To move you from the technical phase to the strategic phase.</h2>
                            
                            <p>Here's what that looks like:</p>
                            
                            <ul>
                                <li>You won't be as busy as you are right now.</li>
                                <li>Most of the things causing you stress will be handled.</li>
                                <li>You will have a business that runs smoothly without depending on you every day.</li>
                                <li>You will know the exact steps to grow your revenue to at least 2x.</li>
                                <li>And most importantly, you will enjoy your business again just like other business owners I've worked with.</li>
                            </ul>
                            
                            <p>You might be asking:</p>
                            
                            <h3>How exactly will I help you do this?</h3>
                            
                            <p>There is a clear blueprint.</p>
                            
                            <p>Not guesswork.</p>
                            
                            <p>Not trial and error.</p>
                            
                            <p>Not another "work harder" strategy.</p>
                            
                            <p>And I'm not doing this alone.</p>
                            
                            <p>I have invited <strong>Tanim Zaman</strong> (the man in the video I asked you to watch earlier) to walk you through it in an upcoming webinar.</p>
                            
                            <div className="my-8 p-6 bg-secondary/30 rounded-lg not-prose">
                                <p>Tanim Zaman is a UK-based revenue growth expert who has spent close to half a decade helping Muslim businesses across the world 3X, 5X, even 10X their revenue often in 12 months or less.</p>
                            </div>

                            <div className="my-12">
                                <Image
                                    src="/6x-growth.jpeg"
                                    alt="6x growth in 5 months testimonial"
                                    width={400}
                                    height={600}
                                    className="mx-auto rounded-lg shadow-lg"
                                />
                            </div>
                            
                            <p>This is not theory.</p>
                            
                            <p>He has worked directly with $10M+ groups of companies and helped businesses in different industries achieve serious results.</p>
                            
                            <ul>
                                <li>A construction business in Singapore doubled sales in 12 months.</li>
                                <li>A project management business in Canada 10X revenue in just 5 months.</li>
                                <li>A medical app in the UK, 10X subscription growth in 12 months.</li>
                            </ul>

                            <div className="my-12">
                                <Image
                                    src="/3x-growth.jpeg"
                                    alt="3x in 6 months testimonial"
                                    width={400}
                                    height={600}
                                    className="mx-auto rounded-lg shadow-lg"
                                />
                            </div>

                            <p>He also helped scale a property management business to £180M AUM in under 6 years.</p>
                            
                            <p>With this level of experience, Tanim now mentors business owners across the globe, helping them fix broken systems, clarify strategy, and grow revenue in the shortest realistic time.</p>
                            
                            <p>Millions of people already benefit from his insights across Instagram, TikTok, and Facebook.</p>
                            
                            <p>And in this webinar, you'll see exactly how this applies to your business.</p>
                            
                            <h2>How to sign up</h2>
                            
                            <p>Now, this is important.</p>
                            
                            <p>The things we will share in this webinar are not just information.</p>
                            
                            <p>Anyone can hear information.</p>
                            
                            <p>But using it and using it correctly is what actually changes a business.</p>
                            
                            <p>That is why this session includes personal follow-up and guidance.</p>
                            
                            <div className="my-8 p-6 border-l-4 border-primary bg-primary/5 not-prose">
                                <p>And to make sure my team is not overwhelmed, and to ensure every participant gets value, <strong>we have opened only 100 slots.</strong></p>
                                <p>Once those 100 slots are filled, the registration link will be taken down.</p>
                                <p>No extensions. No waiting list.</p>
                            </div>
                            
                            <h2>Your investment</h2>
                            
                            <p>The investment for this session is</p>
                            
                            <p className="text-4xl font-bold my-4">₦29,999.</p>
                            
                            <p>Now, let's put that in perspective.</p>
                            
                            <p>If your business is currently making ₦500k a month, and this helps you move to ₦1m…</p>
                            
                            <p>If you're making ₦1m and it moves you to ₦2m…</p>
                            
                            <p>Even if it only fixes one leak in your system pricing, structure, offers, or positioning, it pays for itself many times over.</p>

                            <p>Now here's the part most people don't like to hear:</p>
                            
                            <p><strong>The real cost is not the price of this webinar.</strong></p>
                            
                            <p>The real cost is staying stuck in the Yellow Bus.</p>
                            
                            <ul>
                                <li>Another 6 months of running around.</li>
                                <li>Another 6 months of unstable income.</li>
                                <li>Another 6 months of being busy but unsure if things are actually improving.</li>
                            </ul>
                            
                            <p>That cost is already draining you every day.</p>
                            
                            <p>Now, you might think:</p>
                            
                            <p><em>"Let me think about it."</em></p>
                            
                            <p>That's fair. But be honest with yourself.</p>
                            
                            <ul>
                                <li>How long have you been "thinking about it"?</li>
                                <li>How many opportunities have you postponed because you wanted to be sure?</li>
                                <li>And how many times has staying comfortable kept you exactly where you are?</li>
                            </ul>
                            
                            <p>Here's something else you should know.</p>
                            
                            <p><strong>This is not for everyone.</strong></p>
                            
                            <p>If you're comfortable being busy without clarity, if you enjoy doing everything yourself, or if you're not serious about growth, then you should skip this.</p>
                            
                            <p>But if you know deep down that your business can do more, and you're tired of running it like a yellow bus, then this is for you.</p>

                            <blockquote className="border-l-4 border-primary pl-4 italic my-8">
                              Remember seats are limited. Not because of marketing tricks, but because this is a focused session designed for people who are ready to act. Once the seats are filled, registration will close. And this session will not be repeated in this same format.
                            </blockquote>

                            <p>So you have two options.</p>
                            
                            <p>You can close this page and go back to your routine.</p>
                            
                            <p>Or you can take one simple step that could change how your business runs for the rest of the year.</p>
                            
                            <p>If you're ready to step out of the technical phase and finally enter the strategic phase,</p>
                            
                            <p>then secure your seat now.</p>

                            <p>The yellow bus keeps moving.</p>
                            
                            <p>The only question is:</p>
                            
                            <p><strong>Will you keep riding it, or finally step off?</strong></p>
                        </article>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Sticky Collapsible Payment Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40">
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                    <Collapsible open={isStickyOpen} onOpenChange={setIsStickyOpen}>
                        <div className="bg-red-600 backdrop-blur-lg border-t border-red-700 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.3)]">
                            <CollapsibleTrigger className="w-full p-4 flex justify-between items-center cursor-pointer group">
                                <h3 className="text-lg font-bold text-left text-white">Secure Your Seat Now</h3>
                                <div className="flex items-center gap-2 text-white">
                                    <span className="text-sm font-medium">Register</span>
                                    <ChevronsUpDown className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                </div>
                            </CollapsibleTrigger>
                            <AnimatePresence initial={false}>
                                {isStickyOpen && (
                                    <CollapsibleContent forceMount asChild>
                                        <motion.div
                                            initial="collapsed"
                                            animate="open"
                                            exit="collapsed"
                                            variants={{
                                                open: { opacity: 1, height: "auto" },
                                                collapsed: { opacity: 0, height: 0 },
                                            }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 border-t border-red-700 pt-6 bg-white">
                                                <PaystackButton />
                                            </div>
                                        </motion.div>
                                    </CollapsibleContent>
                                )}
                            </AnimatePresence>
                        </div>
                    </Collapsible>
                </motion.div>
            </div>
        </div>
    );
};

export default RevenueRoadmapPage;