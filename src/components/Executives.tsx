'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquareText, User, ZoomIn } from 'lucide-react';
import MotionWrap from './MotionWrap';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const executivesList = [
  { name: 'President', role: 'President', link: 'https://wa.link/kipinc', image: '/president picture.jpeg' },
  { name: 'Vice President', role: 'Vice President', link: 'https://wa.link/jfklme', image: '/vice president.jpeg' },
  { name: 'General Secretary', role: 'General Secretary', link: 'https://wa.link/vyr58v', image: '/general secretary.jpeg' },
  { name: 'Assistant General Secretary', role: 'Assistant General Secretary', link: 'https://wa.link/l5tqix', image: '/assistant general secretary.jpeg' },
  { name: 'Treasurer', role: 'Treasurer', link: 'https://wa.link/yqbu0h', image: '/treasurer pic.jpeg' },
  { name: 'Public Relations Officer', role: 'Public Relations Officer', link: 'https://wa.link/bypmfu', image: '/pro picture.jpeg' },
  { name: 'House Secretary', role: 'House Secretary', link: 'https://wa.link/y36l4u', image: '/House secretary pic.jpeg' },
  { name: 'Sport Secretary', role: 'Sport Secretary', link: 'https://wa.link/li07rg', image: '/Sport sectary pic.jpeg' },
];

const Executives = () => {
  const [selectedExec, setSelectedExec] = useState<typeof executivesList[0] | null>(null);

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
              <div className="flex flex-col items-center w-full">
                <button
                  onClick={() => exec.image && setSelectedExec(exec)}
                  disabled={!exec.image}
                  className={`w-36 h-36 rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-gray-150 bg-[#024AD8]/10 text-[#024AD8] shadow-sm relative group/img ${exec.image ? 'cursor-zoom-in' : 'cursor-default'}`}
                  aria-label={exec.image ? `View larger photo of ${exec.name}` : undefined}
                >
                  {exec.image ? (
                    <>
                      <img
                        src={exec.image}
                        alt={exec.name}
                        className="object-cover w-full h-full group-hover/img:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <ZoomIn className="w-6 h-6 transform scale-90 group-hover/img:scale-100 transition-transform duration-300" />
                      </div>
                    </>
                  ) : (
                    <User className="w-16 h-16" />
                  )}
                </button>
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

      {/* Lightbox / Modal for Executive Photos */}
      {selectedExec && (
        <Dialog open={!!selectedExec} onOpenChange={(open) => !open && setSelectedExec(null)}>
          <DialogContent className="sm:max-w-[480px] rounded-lg border border-neutral-800 bg-[#151516] p-6 overflow-hidden flex flex-col items-center text-white">
            <DialogHeader className="w-full text-center mb-4">
              <DialogTitle className="text-xl font-bold text-white">
                {selectedExec.name}
              </DialogTitle>
              <DialogDescription className="text-xs font-semibold text-[#024AD8] uppercase tracking-wider">
                {selectedExec.role}
              </DialogDescription>
            </DialogHeader>

            <div className="relative w-full aspect-square max-h-[380px] rounded-lg overflow-hidden border border-neutral-800 mb-6">
              {selectedExec.image && (
                <img
                  src={selectedExec.image}
                  alt={selectedExec.name}
                  className="object-cover w-full h-full"
                />
              )}
            </div>

            <Button
              asChild
              className="w-full rounded-md py-4 bg-[#024AD8] text-white hover:bg-[#0036C4]"
            >
              <a href={selectedExec.link} target="_blank" rel="noopener noreferrer" onClick={() => setSelectedExec(null)}>
                <MessageSquareText className="w-4 h-4 mr-2" />
                Contact on WhatsApp
              </a>
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Executives;
