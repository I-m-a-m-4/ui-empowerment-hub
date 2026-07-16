'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Users } from 'lucide-react';
import MotionWrap from './MotionWrap';
import Image from 'next/image';

const backgroundImages = [
  '/images/hero_slide_1.png',
  '/images/hero_slide_2.png',
  '/images/hero_slide_3.png'
];

const Hero = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MotionWrap>
      <section className="relative min-h-[85vh] flex items-center justify-center py-28 border-b border-gray-200 overflow-hidden bg-zinc-950">
        {/* Background Image Slideshow with smooth crossfade */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIdx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt={`Empowerment Hub background slide ${index + 1}`}
                fill
                className="object-cover object-center filter brightness-90"
                priority={index === 0}
              />
            </div>
          ))}
          {/* Premium dark overlay with backdrop blur for high contrast */}
          <div className="absolute inset-0 bg-[#2C3038]/50 backdrop-blur-[1.5px] z-10"></div>
        </div>

        <div className="container relative z-20 mx-auto px-6 max-w-5xl text-center">
          <div className="flex flex-col items-center">
            {/* Tag / Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#024AD8]/20 text-white rounded-md text-xs font-bold uppercase tracking-wider">
                UNIVERSITY OF IBADAN STUDENTS' UNION
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 max-w-4xl leading-tight">
              Empowering UI Students with{' '}
              <span className="text-[#4080FF] bg-gradient-to-r from-blue-400 to-[#024AD8] bg-clip-text text-transparent">
                Future-Ready Skills
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-200 font-medium mb-10 leading-relaxed">
              Discover practical skills, connect with experienced mentors, and begin your journey toward career growth,
              entrepreneurship, and personal development—all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 py-6 rounded-md bg-[#024AD8] hover:bg-[#0036C4] text-white font-bold transition-colors shadow-md">
                <a href="#skills">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Skills
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-6 rounded-md border-white/40 text-white hover:bg-white/10 hover:text-white bg-transparent font-bold transition-colors">
                <a href="#mentors">
                  <Users className="w-5 h-5 mr-2" />
                  Meet a Mentor
                </a>
              </Button>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex gap-2 mt-12">
              {backgroundImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIdx(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIdx ? 'bg-[#024AD8] w-6' : 'bg-gray-400 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>
    </MotionWrap>
  );
};

export default Hero;
