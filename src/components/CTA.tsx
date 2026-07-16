'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import MotionWrap from './MotionWrap';

const CTA = () => {
  return (
    <MotionWrap>
      <section className="relative py-20 bg-[#F9FAFB] border-b border-gray-200">
        <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-blue-50/80 via-sky-50/50 to-white border border-blue-100/80 text-[#2C3038] shadow-sm relative overflow-hidden">
            {/* Elegant dot pattern background */}
            <div className="absolute inset-0 bg-[radial-gradient(#024ad8_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.08] pointer-events-none"></div>
            
            {/* Top glowing circle */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-400/10 blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#024AD8]/10 text-[#024AD8] rounded-md text-xs font-bold uppercase tracking-wider mb-6 border border-[#024AD8]/15">
                <Sparkles className="w-3.5 h-3.5 text-[#024AD8]" />
                GET STARTED
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight text-[#2C3038]">
                Start Building Your Future Today
              </h2>
              
              <p className="text-[#5A5A5A] text-sm sm:text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                Every great career starts with learning one valuable skill. Join the University of Ibadan Students'
                Union Empowerment Hub and take the first step toward becoming more employable, innovative, and self-reliant.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto rounded-md px-8 py-6 text-base font-bold bg-[#024AD8] text-white hover:bg-[#0036C4] shadow-md border-none">
                  <a href="#skills">
                    Explore Skills
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-md px-8 py-6 text-base font-bold border-gray-300 text-[#2C3038] hover:bg-gray-50 bg-white">
                  <a href="#mentors">
                    <UserCheck className="w-4 h-4 mr-2 text-[#024AD8]" />
                    Contact a Mentor
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionWrap>
  );
};

export default CTA;
