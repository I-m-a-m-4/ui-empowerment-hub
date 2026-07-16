
'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Users, Video, User, Briefcase, Star, Minus, StarIcon, Award, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { GoogleIcon } from '@/components/ui/icons';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

const packages = [
    {
        title: "One-on-One (Virtual)",
        price: 99.99,
        retainerPrice: 39.99,
        specialRetainerPrice: 19.99,
        duration: "60–75 minutes",
        delivery: "Zoom/Google Meet",
        features: [
            "2-week hands-on follow-up",
            "Tailored growth strategies",
            "Actionable quick wins"
        ],
        bestFor: "Muslim entrepreneurs who want clarity, quick wins, and tailored strategies.",
        icon: Video,
        featured: false,
    },
    {
        title: "One-on-One (In-Person)",
        price: 349.99,
        retainerPrice: 39.99,
        specialRetainerPrice: 19.99,
        duration: "90 minutes",
        delivery: "Face-to-face session",
        features: [
            "2-week hands-on follow-up",
            "Immersive guidance",
            "Deep-dive strategy"
        ],
        bestFor: "Serious entrepreneurs who want immersive guidance.",
        icon: User,
        featured: true,
    },
    {
        title: "Team & Corporate (Virtual)",
        price: 1299.99,
        retainerPrice: 99.99,
        specialRetainerPrice: 49.99,
        duration: "2–3 hours",
        delivery: "2–10 participants",
        features: [
            "2-week hands-on follow-up",
            "Team alignment sessions",
            "Growth framework implementation"
        ],
        bestFor: "Muslim-led teams seeking alignment and growth.",
        icon: Users,
        featured: false,
    },
    {
        title: "Team & Corporate (In-Person)",
        price: 1799.99,
        retainerPrice: 99.99,
        specialRetainerPrice: 49.99,
        duration: "Half-day session",
        delivery: "2–10 participants",
        features: [
            "2-week hands-on follow-up",
            "Fully tailored growth strategy",
            "On-site workshop"
        ],
        bestFor: "Corporate teams wanting a fully tailored growth strategy experience.",
        icon: Briefcase,
        featured: false,
    }
];

const comparisonFeatures = [
    {
        category: 'Core Session',
        features: [
            { name: 'Session Duration', virtual: '60-75 min', inPerson: '90 min', teamVirtual: '2-3 hours', teamInPerson: 'Half-day' },
            { name: 'Delivery Method', virtual: 'Zoom/Meet', inPerson: 'Face-to-Face', teamVirtual: 'Zoom/Meet', teamInPerson: 'On-site' },
            { name: 'Participants', virtual: '1', inPerson: '1', teamVirtual: '2-10', teamInPerson: '2-10' },
        ]
    },
    {
        category: 'Support & Follow-up',
        features: [
            { name: 'Hands-on Follow-up', virtual: true, inPerson: true, teamVirtual: true, teamInPerson: true },
            { name: 'Follow-up Duration', virtual: '2 Weeks', inPerson: '2 Weeks', teamVirtual: '2 Weeks', teamInPerson: '2 Weeks' },
        ]
    },
    {
        category: 'Optional Add-on Retainer',
        features: [
            { name: 'Monthly Price', virtual: '$39.99', inPerson: '$39.99', teamVirtual: '$99.99', teamInPerson: '$99.99' },
            { name: 'Special First Month', virtual: '$19.99', inPerson: '$19.99', teamVirtual: '$49.99', teamInPerson: '$49.99' },
            { name: 'Continuous Accountability', virtual: true, inPerson: true, teamVirtual: true, teamInPerson: true },
        ]
    }
];

const faqs = [
    {
        question: "How do I know which pricing package is right for me?",
        answer: "The best package depends on your needs. The Virtual One-on-One is great for targeted advice and quick wins. The In-Person session is for those who prefer a more immersive, face-to-face experience. Team packages are designed for organizations looking to align their members and scale together. If you're still unsure, feel free to book a discovery call to discuss your goals."
    },
    {
        question: "What happens after the initial session?",
        answer: "Every core session includes a two-week hands-on follow-up period where you can reach out with questions as you implement the strategies we discussed. For ongoing support, you can opt for one of our monthly retainer packages, which provide continuous accountability and guidance."
    },
     {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods, including major credit cards and bank transfers. We will provide detailed payment information once you book a session."
    },
    {
        question: "Is the retainer billed automatically every month?",
        answer: "Yes, the retainer package is a monthly subscription that is billed automatically to ensure uninterrupted support. You can cancel your retainer at any time before the next billing cycle."
    },
    {
        question: "How do I get the special first-month retainer price?",
        answer: "The special introductory price for the retainer is available when you decide to upgrade immediately after your initial one-time session. It's a way to thank you for your commitment to long-term growth."
    },
];

const brandLogos = [
  { name: 'Peritus Engineering', logo: '/images/Peritus-Engineering-logo.png' },
  { name: 'Pilgrim Prive', logo: '/images/pilgrimprive.svg' },
  { name: 'EasyReside LTD', logo: '/images/EasyReside-Logo.png' },
  { name: 'ResearchGains', logo: '/images/researchgains.jpg' },
  { name: 'Haamz Variety Store', logo: '/images/Haamzvarietystore.png' },
  { name: 'Sccentaura', logo: '/images/sccentaura.png' },
  { name: 'Brime Drinks', logo: '/images/brimedrinks.png' },
  { name: 'The Muslim Linguist', logo: '/images/themuslimlinguist.png' },
  { name: 'Therehla', logo: '/images/therehla.jpg' },
  { name: 'Tides & Design', logo: '/images/tides&design.jpg' },
];

const PricingPage = () => {
    const [isMonthly, setIsMonthly] = useState(false);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        {/* Header Section */}
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl"></div>
                 <Sparkles className="absolute top-1/4 left-1/4 w-24 h-24 text-primary/10" />
                 <Award className="absolute bottom-1/4 right-1/4 w-24 h-24 text-primary/10" />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <header className="mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight anim d-0">Find a Plan to <span className="text-primary relative inline-block">Power Your Growth<span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/30"></span></span></h1>
                    <p className="mt-4 text-xl text-muted-foreground anim d-1">Transparent pricing for ambitious Muslim entrepreneurs and teams. Let's build a thriving, Deen-aligned business together.</p>
                </header>
            </div>
        </section>

        {/* Core Packages Section */}
        <section id="pricing" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="flex justify-center items-center gap-4 mb-12">
                    <Label htmlFor="pricing-toggle" className={cn("font-medium transition-colors", !isMonthly ? "text-primary" : "text-muted-foreground")}>One-Time Session</Label>
                    <Switch id="pricing-toggle" checked={isMonthly} onCheckedChange={setIsMonthly} />
                    <Label htmlFor="pricing-toggle" className={cn("font-medium transition-colors", isMonthly ? "text-primary" : "text-muted-foreground")}>Monthly Retainer</Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-start">
                    {packages.map((pkg, index) => (
                        <div key={index} className={cn(
                            "rounded-2xl p-6 flex flex-col transition-all duration-300 glass-card relative h-full",
                            pkg.featured ? "border-2 border-primary bg-primary/5" : "border border-border"
                        )}>
                             {pkg.featured && (
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                    <div className="bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold rounded-full shadow-lg">
                                        Most Popular
                                    </div>
                                </div>
                            )}
                            <div className="flex-grow flex flex-col">
                                <h3 className="text-xl font-semibold tracking-tight">{pkg.title}</h3>
                                <p className="text-sm text-muted-foreground mt-2 min-h-[60px] flex-grow">{pkg.bestFor}</p>
                                <div className="my-6 relative h-10">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isMonthly ? 'monthly' : 'onetime'}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0"
                                        >
                                            {isMonthly ? (
                                                <>
                                                    <span className="text-4xl font-bold tracking-tight">${pkg.retainerPrice}</span>
                                                    <span className="text-muted-foreground">/mo</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-4xl font-bold tracking-tight">${pkg.price}</span>
                                                    <span className="text-muted-foreground">/one-time</span>
                                                </>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <Button asChild className="w-full" variant={pkg.featured ? 'default' : 'outline'}>
                                    <a href="https://calendly.com/scalewitholaiya/20-minute-discovery-call" target="_blank" rel="noopener noreferrer">Book Session</a>
                                </Button>
                                <ul className="mt-6 space-y-3 text-sm flex-grow">
                                    {pkg.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                             <div className="mt-6 pt-6 border-t border-dashed border-border h-32 relative">
                                <AnimatePresence mode="wait">
                                     <motion.div
                                        key={isMonthly ? 'monthly-offer' : 'onetime-offer'}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0"
                                    >
                                        {isMonthly ? (
                                            <>
                                                <h4 className="font-semibold text-sm">Special Offer!</h4>
                                                <div className="mt-2">
                                                    <span className="text-2xl font-bold tracking-tight text-primary">${pkg.specialRetainerPrice}</span>
                                                    <p className="text-xs text-muted-foreground">for your first month after a one-time session.</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <h4 className="font-semibold text-sm">Optional Retainer</h4>
                                                <p className="text-xs text-muted-foreground">For ongoing support:</p>
                                                <div className="mt-2">
                                                    <span className="text-2xl font-bold tracking-tight">${pkg.retainerPrice}<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
                                                </div>
                                                <div className="mt-1 h-8">
                                                    <p className="text-xs text-primary font-semibold p-1 bg-primary/10 rounded-md">
                                                        First month only ${pkg.specialRetainerPrice}!
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                     </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="mt-12 text-center anim d-3">
                    <Button asChild variant="outline">
                        <Link href="#comparison">Compare All Plans</Link>
                    </Button>
                </div>
            </div>
        </section>
        
        {/* Comparison Table Section */}
        <section id="comparison" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <header className="mx-auto max-w-4xl text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-semibold tracking-tight anim d-0">Compare All Plans</h2>
                  <p className="mt-4 text-xl text-muted-foreground anim d-1">Get a detailed look at what's included in each package.</p>
                </header>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 text-left font-semibold sticky left-0 bg-background/90 z-10 w-1/5">Features</th>
                                <th className="p-6 text-center font-semibold w-1/5">One-on-One (Virtual)</th>
                                <th className="p-6 text-center font-semibold w-1/5 bg-primary/5">One-on-One (In-Person)</th>
                                <th className="p-6 text-center font-semibold w-1/5">Team (Virtual)</th>
                                <th className="p-6 text-center font-semibold w-1/5">Team (In-Person)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonFeatures.map((category, catIndex) => (
                                <React.Fragment key={catIndex}>
                                    <tr><td colSpan={5} className="p-4 bg-muted/50 font-bold text-lg">{category.category}</td></tr>
                                    {category.features.map((feature, featIndex) => (
                                        <tr key={featIndex} className="border-b">
                                            <td className="p-4 font-medium sticky left-0 bg-background/90 z-10">{feature.name}</td>
                                            <td className="p-6 text-center">
                                                {typeof feature.virtual === 'boolean' ? (feature.virtual ? <Check className="mx-auto text-green-500" /> : <Minus className="mx-auto text-muted-foreground" />) : feature.virtual}
                                            </td>
                                            <td className="p-6 text-center bg-primary/5">
                                                {typeof feature.inPerson === 'boolean' ? (feature.inPerson ? <Check className="mx-auto text-green-500" /> : <Minus className="mx-auto text-muted-foreground" />) : feature.inPerson}
                                            </td>
                                            <td className="p-6 text-center">
                                                {typeof feature.teamVirtual === 'boolean' ? (feature.teamVirtual ? <Check className="mx-auto text-green-500" /> : <Minus className="mx-auto text-muted-foreground" />) : feature.teamVirtual}
                                            </td>
                                            <td className="p-6 text-center">
                                                {typeof feature.teamInPerson === 'boolean' ? (feature.teamInPerson ? <Check className="mx-auto text-green-500" /> : <Minus className="mx-auto text-muted-foreground" />) : feature.teamInPerson}
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t-2">
                                <td className="p-4 sticky left-0 bg-background/90 z-10"></td>
                                <td className="p-6 text-center"><Button asChild className="w-full" variant="outline"><a href="https://calendly.com/scalewitholaiya/20-minute-discovery-call" target="_blank" rel="noopener noreferrer">Book Session</a></Button></td>
                                <td className="p-6 text-center bg-primary/5"><Button asChild className="w-full"><a href="https://calendly.com/scalewitholaiya/20-minute-discovery-call" target="_blank" rel="noopener noreferrer">Book Session</a></Button></td>
                                <td className="p-6 text-center"><Button asChild className="w-full" variant="outline"><a href="https://calendly.com/scalewitholaiya/20-minute-discovery-call" target="_blank" rel="noopener noreferrer">Book Session</a></Button></td>
                                <td className="p-6 text-center"><Button asChild className="w-full" variant="outline"><a href="https://calendly.com/scalewitholaiya/20-minute-discovery-call" target="_blank" rel="noopener noreferrer">Book Session</a></Button></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">Join Visionary Muslims Who Deliver Results</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Partner with a business consultant trusted by ambitious brands across the Ummah.
                </p>

                <div
                    className="relative mt-12 w-full overflow-hidden"
                    style={{
                    maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                    }}
                >
                    <div className="flex w-max animate-marquee">
                        {[...brandLogos, ...brandLogos].map((brand, index) => (
                            <div key={index} className="flex-shrink-0 px-12 h-16 flex items-center">
                                <Image src={brand.logo} alt={brand.name} width={140} height={50} className="object-contain max-h-full" />
                            </div>
                        ))}
                    </div>
                </div>

                <a href="https://g.page/r/CfmNlDiguvFYEBM/review" target="_blank" rel="noopener noreferrer" className="mt-16 max-w-2xl mx-auto block group">
                    <div className="glass-card p-6 md:p-8 rounded-2xl group-hover:bg-accent/50 transition-colors">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarFallback>PE</AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <p className="font-semibold">Peritus Engineering</p>
                                 <div className="flex items-center gap-1.5 mt-1">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_,i) => <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                                    </div>
                                </div>
                            </div>
                            <div className="ml-auto">
                                <GoogleIcon className="w-6 h-6"/>
                            </div>
                        </div>
                        <blockquote className="mt-4 text-left text-muted-foreground">
                            “I have been really impressed by the works of Olaiya. He stands out.”
                        </blockquote>
                    </div>
                </a>
            </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-20">
             <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl tracking-tight font-semibold">Frequently Asked Questions</h2>
                    <p className="mt-3 text-muted-foreground">Find answers below. If you can’t find what you’re looking for, we’re a message away.</p>
                </header>
                <div className="mt-10 max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className={`rounded-lg glass-card p-1 anim d-${index + 2}`}>
                                <AccordionTrigger className="text-left font-medium hover:no-underline p-4">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="p-4 pt-0">
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;

    