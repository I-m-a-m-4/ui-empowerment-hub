'use client';

import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import MotionWrap from './MotionWrap';

const Vision = () => {
    const heroPanelRef = useRef<HTMLDivElement>(null);
    const parallaxLayersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);

    useEffect(() => {
        const heroPanel = heroPanelRef.current;
        if (!heroPanel) return;

        parallaxLayersRef.current = heroPanel.querySelectorAll('.parallax-layer');
        const parallaxLayers = parallaxLayersRef.current;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        let animationFrameId: number;

        const parallaxUpdate = () => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                animationFrameId = requestAnimationFrame(parallaxUpdate);
                return;
            }

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = mouseX - centerX;
            const moveY = mouseY - centerY;

            parallaxLayers.forEach((layer) => {
                const depth = parseFloat(layer.dataset.depth || '0');
                const offsetX = moveX * depth * -1;
                const offsetY = moveY * depth * -1;
                layer.style.transform = `translate3d(${offsetX / 10}px, ${offsetY / 10}px, 0)`;
            });

            animationFrameId = requestAnimationFrame(parallaxUpdate);
        };

        animationFrameId = requestAnimationFrame(parallaxUpdate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <MotionWrap>
            <section className="relative min-h-[700px] lg:min-h-screen w-full flex items-center justify-center overflow-hidden light:bg-gray-50/50">
                <div ref={heroPanelRef} className="hero-panel w-[95%] max-w-7xl glass-card p-4 shadow-2xl relative transition-transform duration-1000 ease-out rounded-2xl">
                    <div className="hero-panel-inner relative h-auto md:h-[600px] overflow-hidden rounded-2xl" style={{ transformStyle: 'preserve-3d', perspective: '2000px' }}>
                        <div className="parallax-layer hero-aurora absolute inset-0" data-depth="0.1"></div>
                        
                        <div className="parallax-layer absolute inset-0" data-depth="0.2">
                            <svg className="svg-lines absolute inset-0 z-4 opacity-70 w-full h-full" viewBox="0 0 1360 600" preserveAspectRatio="xMidYMid meet">
                                <path d="M300,150 C400,200 500,300 680,300" />
                                <path d="M1060,150 C960,200 860,300 680,300" />
                                <path d="M300,450 C400,400 500,300 680,300" />
                                <path d="M1060,450 C960,400 860,300 680,300" />
                            </svg>
                        </div>

                        <div className="parallax-layer absolute inset-0 z-10 hidden md:block" data-depth="0.6">
                            <div className="data-points-layer w-full h-full relative">
                                <div className="data-point absolute" style={{top: '25%', left: '20%'}}><span className="label font-semibold">Mindset</span></div>
                                <div className="data-point absolute" style={{top: '25%', right: '20%'}}><span className="label font-semibold">Structures</span></div>
                                <div className="data-point absolute" style={{bottom: '25%', left: '20%'}}><span className="label font-semibold">Unity</span></div>
                                <div className="data-point absolute" style={{bottom: '25%', right: '20%'}}><span className="label font-semibold">Strategic Thinking</span></div>
                            </div>
                        </div>

                        <div className="parallax-layer hero-content z-20 flex flex-col items-center justify-center text-center relative md:absolute inset-0 p-8 md:p-4" data-depth="0.15">
                            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground light:text-black">My Vision for the Muslim Ummah</h2>
                            <p className="max-w-3xl text-lg text-muted-foreground light:text-gray-800">As a Business & Growth Strategist for Muslims, my vision is to see Muslims reclaim their rightful place as leading entrepreneurs—by driving a fundamental shift in mindset, building meaningful structures, fostering unity, and embracing long-term strategic thinking.</p>
                            <div className="mt-8">
                                <Button size="lg" asChild>
                                    <Link href="#contact">Work With Me</Link>
                                </Button>
                            </div>
                            {/* Mobile-only grid for data points */}
                            <div className="mt-12 mb-8 grid grid-cols-2 gap-4 md:hidden w-full max-w-md">
                                <div className="data-point flex-col items-center justify-center text-center p-4 h-24 rounded-lg"><span className="label font-semibold">Mindset</span></div>
                                <div className="data-point flex-col items-center justify-center text-center p-4 h-24 rounded-lg"><span className="label font-semibold">Structures</span></div>
                                <div className="data-point flex-col items-center justify-center text-center p-4 h-24 rounded-lg"><span className="label font-semibold">Unity</span></div>
                                <div className="data-point flex-col items-center justify-center text-center p-4 h-24 rounded-lg"><span className="label font-semibold">Strategic<br/>Thinking</span></div>
                            </div>
                        </div>

                        <div className="parallax-layer absolute inset-0" data-depth="0.1">
                            <div className="hero-panel-footer absolute bottom-0 left-0 w-full p-4 flex justify-center items-center z-10 text-sm light:text-gray-500 text-neutral-400">
                                <span>Vision Statement</span>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .hero-panel {
                        background-color: var(--color-panel-bg);
                    }
                    .light .hero-panel {
                        background-color: rgba(255, 255, 255, 0.6);
                        border: 1px solid rgba(0, 0, 0, 0.05);
                    }
                    .hero-aurora {
                        background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%);
                        filter: blur(100px);
                        animation: subtle-pan-and-breathe 40s linear infinite;
                    }
                    .light .hero-aurora {
                        background: radial-gradient(circle at center, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0) 60%);
                    }
                    .svg-lines path {
                        stroke: var(--color-panel-border);
                        stroke-width: 1px;
                        fill: none;
                        stroke-dasharray: 1000;
                        stroke-dashoffset: 1000;
                        animation: draw-line 2s 1.4s forwards;
                    }
                    .light .svg-lines path {
                        stroke: rgba(0,0,0,0.1);
                    }
                    .data-point { 
                        display: flex; 
                        align-items: center; 
                        gap: 0.75rem; 
                        padding: 0.5rem 0.75rem; 
                        background-color: rgba(20, 21, 23, 0.5); 
                        backdrop-filter: blur(5px); 
                        -webkit-backdrop-filter: blur(5px); 
                        border: 1px solid rgba(255, 255, 255, 0.05); 
                        font-size: 0.8rem; 
                        color: #E2E3E5;
                        border-radius: 0.5rem;
                    }
                    .light .data-point {
                        background-color: hsla(0, 0%, 13%, 0.8);
                        border-color: rgba(0,0,0,0.08);
                        color: hsl(0, 0%, 100%);
                    }
                    .data-point .label {
                        color: #E2E3E5;
                    }
                    .light .data-point .label {
                        color: hsl(0, 0%, 100%);
                    }


                    .data-point::before { 
                        content: ''; 
                        display: none;
                    }
                    .md\\:data-point::before {
                        display: block;
                        content: ''; 
                        width: 8px; 
                        height: 8px; 
                        background: var(--color-background); 
                        border: 2px solid var(--color-accent); 
                        border-radius: 50%; 
                        animation: pulse-glow 3s infinite ease-in-out; 
                    }
                    .light .md\\:data-point::before {
                        background: #f8fafc;
                        border-color: #ef4444;
                    }
                `}</style>
            </section>
        </MotionWrap>
    );
};

export default Vision;
