'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import MotionWrap from "./MotionWrap";

const testimonials = [
  {
    name: "Tunde Adelaja",
    quote: "The Social Media Marketing roadmap was incredibly clear. Within three weeks of learning Meta and Google Ads pathways, I launched a small campaign for a local vendor in Ibadan and saw real conversions!",
    title: "Economics Student (300L)",
    category: "Student Completion"
  },
  {
    name: "Fatima Yusuf",
    quote: "Starting video editing was intimidating, but CapCut to Premiere Pro progression is brilliant. The mentorship support from the Diligent Team made all the difference when I hit road blocks.",
    title: "Computer Science Student (200L)",
    category: "Student Completion"
  },
  {
    name: "Adewale Alao",
    quote: "Peer-to-peer mentorship is the secret weapon of the UI SU Empowerment Hub. As student mentors, we feel fulfilled helping our peers build practical competencies next to academic excellence.",
    title: "Video Editing Mentor",
    category: "Mentor Feedback"
  },
  {
    name: "Oluwaseun Adebayo",
    quote: "An excellent initiative from the Diligent Team. Integrating digital capabilities into our student community prepares UI graduates for actual self-reliance and modern career entry.",
    title: "Student Representative Council",
    category: "Student Leader"
  },
  {
    name: "Chioma Nwachukwu",
    quote: "Accessing the additional Mellanbites Google Drive folders gave me immediate access to graphic design guides. It is structured, accessible, and completely free.",
    title: "Chemistry Student (400L)",
    category: "Student Completion"
  },
  {
    name: "Dr. A. O. Bello",
    quote: "Creating systems like the Empowerment Hub helps complement standard classroom theory with hands-on technical skills required for leadership and innovation.",
    title: "UI Faculty Member",
    category: "University Community"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 bg-white overflow-hidden border-b border-gray-200">
      <div className="relative container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#024AD8]/10 text-[#024AD8] rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-[#2C3038]">
            What Our{' '}
            <span className="text-[#024AD8]">
              Community Says
            </span>
          </h2>
          <p className="text-[#5A5A5A] text-sm sm:text-base max-w-3xl mx-auto">
            Read testimonials from students, mentors, student leaders, and faculty members regarding their experience with the Empowerment Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg p-6 border border-gray-200 bg-white flex flex-col justify-between hover:border-[#024AD8]/40 transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#024AD8] fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold bg-[#024AD8]/10 text-[#024AD8] px-2.5 py-1 rounded uppercase tracking-wider">
                    {testimonial.category}
                  </span>
                </div>
                <p className="text-[#5A5A5A] text-sm leading-relaxed mb-6 italic">
                  “{testimonial.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                <Avatar className="w-10 h-10 border border-gray-200 bg-[#024AD8]/10 text-[#024AD8]">
                  <AvatarFallback className="text-xs font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-bold text-[#2C3038]">{testimonial.name}</div>
                  <div className="text-xs text-[#5A5A5A] font-semibold">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
