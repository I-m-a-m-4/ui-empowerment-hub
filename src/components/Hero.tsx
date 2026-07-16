'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Users } from 'lucide-react';
import MotionWrap from './MotionWrap';
import Image from 'next/image';

const Hero = () => {
  return (
    <MotionWrap>
      <section className="relative min-h-[95vh] flex items-center justify-center py-28 border-b border-gray-200 overflow-hidden bg-zinc-950">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/student with laptop chearing learning.jpeg"
            alt="Students with laptops learning and cheering"
            fill
            className="object-cover object-center filter brightness-[0.85]"
            priority
          />
          {/* Premium dark overlay with backdrop blur for high contrast */}
          <div className="absolute inset-0 bg-[#2C3038]/50 z-10"></div>
        </div>

        <div className="container relative z-20 mx-auto px-6 max-w-5xl text-center">
          <div className="flex flex-col items-center">
            {/* Tag / Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#024AD8]/25 text-white rounded-md text-xs font-bold uppercase tracking-wider border border-white/10">
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

          </div>
        </div>
      </section>
    </MotionWrap>
  );
};

export default Hero;
