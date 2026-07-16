'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquareText, User } from 'lucide-react';
import MotionWrap from './MotionWrap';

const executivesList = [
  { name: 'President', role: 'President', link: 'https://wa.link/kipinc' },
  { name: 'Vice President', role: 'Vice President', link: 'https://wa.link/jfklme' },
  { name: 'General Secretary', role: 'General Secretary', link: 'https://wa.link/vyr58v' },
  { name: 'Assistant General Secretary', role: 'Assistant General Secretary', link: 'https://wa.link/l5tqix' },
  { name: 'Treasurer', role: 'Treasurer', link: 'https://wa.link/yqbu0h' },
  { name: 'Public Relations Officer', role: 'Public Relations Officer', link: 'https://wa.link/bypmfu' },
  { name: 'House Secretary', role: 'House Secretary', link: 'https://wa.link/y36l4u' },
  { name: 'Sport Secretary', role: 'Sport Secretary', link: 'https://wa.link/li07rg' },
];

const Executives = () => {
  return (
    <section id="executives" className="py-24 relative bg-[#F3F3F3] border-b border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#024AD8]/10 text-[#024AD8] rounded-md text-xs font-bold uppercase tracking-wider mb-4">
            LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-[#2C3038]">
            Meet Your{' '}
            <span className="text-[#024AD8]">
              Executives
            </span>
          </h2>
          <p className="text-[#5A5A5A] text-sm sm:text-base">
            Introducing the leadership team responsible for the University of Ibadan Students' Union Empowerment Hub (The Diligent Team).
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {executivesList.map((exec, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg border border-gray-200 bg-white flex flex-col justify-between items-center text-center hover:border-[#024AD8]/40 transition-colors duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#024AD8]/10 text-[#024AD8] rounded-full flex items-center justify-center mb-4">
                  <User className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#2C3038] mb-1">{exec.name}</h3>
                <span className="text-xs text-[#5A5A5A] font-semibold uppercase tracking-wider mb-4 block">
                  {exec.role}
                </span>
              </div>

              <Button
                asChild
                className="w-full rounded-md py-4 flex items-center justify-center gap-2 bg-[#024AD8] text-white hover:bg-[#0036C4] transition-colors"
              >
                <a href={exec.link} target="_blank" rel="noopener noreferrer">
                  <MessageSquareText className="w-4 h-4" />
                  Contact
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Executives;
