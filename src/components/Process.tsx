'use client'

import { Lightbulb, Palette, CheckCircle, BrainCircuit } from "lucide-react";
import Image from "next/image";
import placeholderData from '@/lib/placeholder-images.json';
import MotionWrap from "./MotionWrap";

const processSteps = [
    {
        phase: 1,
        title: "Discovery & Strategy",
        description: "We begin with an in-depth consultation to understand your vision, business, and goals. This crucial phase includes market analysis, audience profiling, and strategic planning to build a solid foundation.",
        details: [
            "Initial consultation & analysis (2-3 hours)",
            "Market & audience research",
            "Goal setting & KPI definition"
        ],
        icon: Lightbulb,
        color: "blue",
        image: placeholderData.placeholderImages.find(p => p.id === 'process1')
    },
    {
        phase: 2,
        title: "Design & Development",
        description: "Our team creates detailed brand concepts, strategic frameworks, and content plans. We present multiple options and refine the strategy based on your feedback to ensure perfect alignment.",
        details: [
            "Brand identity & strategy development",
            "Content & marketing blueprints",
            "Service & offer architecture"
        ],
        icon: Palette,
        color: "purple",
        image: placeholderData.placeholderImages.find(p => p.id === 'process2')
    },
    {
        phase: 3,
        title: "Flawless Execution",
        description: "Professional implementation to bring your brand strategy to life with precision. We coordinate all aspects of the launch and execution process, ensuring a seamless rollout.",
        details: [
            "Project management & coordination",
            "Content creation & campaign launch",
            "Final review & optimization"
        ],
        icon: CheckCircle,
        color: "green",
        image: placeholderData.placeholderImages.find(p => p.id === 'process3')
    }
];

const Process = () => {
    return (
        <MotionWrap>
            <section id="process" className="relative py-32 light:bg-white dark:bg-background overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="anim d-1 inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6">
                            <BrainCircuit className="w-4 h-4" />
                            <span>Our Process</span>
                        </div>
                        <h2 className="anim d-2 text-5xl sm:text-6xl font-light tracking-tighter mb-6">
                            From Vision to <span className="font-semibold">Victory</span>
                        </h2>
                        <p className="anim d-3 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Our proven methodology ensures seamless project delivery while maintaining the highest standards of strategic excellence in line with your Deen.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line for large screens */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 transform -translate-x-1/2 hidden lg:block"></div>

                        <div className="space-y-16 lg:space-y-24">
                            {processSteps.map((step, index) => {
                                const isReversed = (index + 1) % 2 === 0;
                                const colors = {
                                    blue: {
                                        bg: 'light:bg-blue-100 dark:bg-blue-500/10',
                                        text: 'light:text-blue-700 dark:text-blue-400',
                                        iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
                                        check: 'text-blue-500'
                                    },
                                    purple: {
                                        bg: 'light:bg-purple-100 dark:bg-purple-500/10',
                                        text: 'light:text-purple-700 dark:text-purple-400',
                                        iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
                                        check: 'text-purple-500'
                                    },
                                    green: {
                                        bg: 'light:bg-green-100 dark:bg-green-500/10',
                                        text: 'light:text-green-700 dark:text-green-400',
                                        iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
                                        check: 'text-green-500'
                                    },
                                };
                                const color = colors[step.color as keyof typeof colors];

                                return (
                                    <div key={step.phase} className={`relative flex flex-col lg:flex-row items-center gap-8 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                                        {/* Content */}
                                        <div className={`anim d-1 lg:w-1/2 ${isReversed ? 'lg:text-left lg:pl-16' : 'lg:text-right lg:pr-16'}`}>
                                            <div className={`inline-flex items-center gap-2 ${color.bg} ${color.text} rounded-full px-4 py-2 text-sm font-medium mb-4`}>
                                                <span>Phase {step.phase}</span>
                                            </div>
                                            <h3 className="text-3xl font-semibold mb-4">{step.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                                                {step.description}
                                            </p>
                                            <div className="space-y-2 text-sm text-muted-foreground">
                                                {step.details.map((detail, i) => (
                                                    <div key={i} className={`flex items-center gap-2 ${isReversed ? '' : 'lg:justify-end'}`}>
                                                        <CheckCircle className={`w-4 h-4 ${color.check}`} />
                                                        <span>{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* Icon */}
                                        <div className={`anim d-2 relative z-10 w-20 h-20 rounded-full ${color.iconBg} text-white grid place-items-center shadow-xl`}>
                                            <step.icon className="w-10 h-10" />
                                            <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${color.bg} ${color.text} grid place-items-center text-sm font-bold`}>{step.phase}</div>
                                        </div>
                                        
                                        {/* Image */}
                                        {step.image &&
                                            <div className={`anim d-3 lg:w-1/2 ${isReversed ? 'lg:pr-16' : 'lg:pl-16'}`}>
                                                <Image src={step.image.imageUrl} alt={step.title} width={500} height={400} className="w-full h-64 object-cover shadow-lg" data-ai-hint={step.image.imageHint} />
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </MotionWrap>
    );
};

export default Process;
