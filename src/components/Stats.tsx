
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import placeholderData from '@/lib/placeholder-images.json';
import { Users, Target, Presentation, BookHeart } from 'lucide-react';
import { useInView } from 'framer-motion';

const statsImage = placeholderData.placeholderImages.find(p => p.id === 'stats-bg');

const stats = [
    {
        icon: Users,
        value: 50,
        label: 'Muslim Brands Guided',
        suffix: '+'
    },
    {
        icon: Target,
        value: 200,
        label: 'Strategies Deployed',
        suffix: '+'
    },
    {
        icon: Presentation,
        value: 100,
        label: 'Client Workshops',
        suffix: '+'
    },
    {
        icon: BookHeart,
        value: 90,
        label: 'Success Stories',
        suffix: '%'
    }
];

const brandLogos = [
  { name: 'Peritus Engineering', logo: '/images/Peritus-Engineering-logo.svg' },
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


const AnimatedCounter = ({ to, suffix }: { to: number, suffix: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const duration = 2000;

    useEffect(() => {
        if (!isInView) return;

        const startTime = Date.now();

        const easeOutExpo = (t: number) => {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        };

        const frame = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const easedProgress = easeOutExpo(progress);
            
            setCount(Math.floor(easedProgress * to));

            if (progress < 1) {
                requestAnimationFrame(frame);
            }
        };

        requestAnimationFrame(frame);
    }, [isInView, to]);

    return <span ref={ref} className="text-4xl md:text-5xl font-bold tracking-tighter">{count}{suffix}</span>;
};


const Stats = () => {
    return (
        <section className="relative py-24 md:py-32 bg-background">
            {statsImage && (
                <Image
                    src={statsImage.imageUrl}
                    alt="Professional workspace"
                    fill
                    className="object-cover opacity-10"
                    data-ai-hint={statsImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background" />

            <div className="relative container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center gap-3 anim" style={{ '--animation-delay': `${(index + 1) * 0.15}s` } as React.CSSProperties}>
                            <stat.icon className="w-12 h-12 text-primary" />
                            <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                            <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-24 border-t border-border pt-16">
                    <h3 className="text-center text-sm uppercase tracking-[0.2em] text-muted-foreground anim-fade d-0">Brands I’ve Worked With</h3>
                    <div
                        className="relative mt-8 w-full overflow-hidden"
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
                </div>
            </div>
        </section>
    );
};

export default Stats;
