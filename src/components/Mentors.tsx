'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquareText, UserCheck } from 'lucide-react';
import MotionWrap from './MotionWrap';

const mentorsList = [
  {
    name: 'Video Editing Mentor',
    skill: 'Video Editing (CapCut, Premiere Pro, After Effects)',
    whatsapp: 'https://wa.link/f8c3uw',
    bio: 'Guiding students to master professional video editing and create high-impact, engaging visual content.',
  },
  {
    name: 'Social Media Marketing Mentor',
    skill: 'Social Media Marketing & Brand Building',
    whatsapp: 'https://wa.link/5ijpvz',
    bio: 'Helping students leverage meta, google, and tiktok campaigns to drive sales and scale digital brands.',
  },
];

const Mentors = () => {
  return (
    <section id="mentors" className="py-24 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#024AD8]/10 text-[#024AD8] rounded-md text-xs font-bold uppercase tracking-wider mb-4">
            MENTORSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-[#2C3038]">
            Meet Your{' '}
            <span className="text-[#024AD8]">
              Skill Mentors
            </span>
          </h2>
          <p className="text-[#5A5A5A] text-sm sm:text-base">
            Reach out directly to experienced student mentors on WhatsApp to clarify concepts, review projects, and get feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {mentorsList.map((mentor, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border border-gray-200 bg-white flex flex-col justify-between hover:border-[#024AD8]/40 transition-colors duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#024AD8]/10 rounded-lg flex items-center justify-center text-[#024AD8] shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2C3038]">{mentor.name}</h3>
                  <span className="text-xs font-bold text-[#024AD8] block mt-1 uppercase tracking-wide">
                    {mentor.skill}
                  </span>
                </div>
              </div>

              <p className="text-[#5A5A5A] text-sm leading-relaxed mb-8">
                {mentor.bio}
              </p>

              <Button
                asChild
                className="w-full rounded-md py-6 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold border-none"
              >
                <a
                  href={mentor.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageSquareText className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;
