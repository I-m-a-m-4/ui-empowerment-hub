'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import MotionWrap from './MotionWrap';

const CTA = () => {
  return (
    <MotionWrap>
      <section className="relative py-20 bg-white border-b border-gray-200">
        <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
          <div className="p-8 md:p-12 rounded-lg bg-gradient-to-br from-[#024AD8] to-[#0036C4] text-white shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-md text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                GET STARTED
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
                Start Building Your Future Today
              </h2>
              
              <p className="text-white/80 text-sm sm:text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Every great career starts with learning one valuable skill. Join the University of Ibadan Students'
                Union Empowerment Hub and take the first step toward becoming more employable, innovative, and self-reliant.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto rounded-md px-8 py-6 text-base font-bold bg-white text-[#024AD8] hover:bg-gray-100 shadow-md">
                  <a href="#skills">
                    Explore Skills
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-md px-8 py-6 text-base font-bold border-white text-white hover:bg-white/10 bg-transparent">
                  <a href="#mentors">
                    <UserCheck className="w-4 h-4 mr-2" />
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
