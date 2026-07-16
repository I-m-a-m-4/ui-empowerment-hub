'use client';

import React from 'react';
import { Target, Compass, CheckCircle2, BookOpen, Clock, Users, Laptop, Network, GraduationCap } from 'lucide-react';
import MotionWrap from './MotionWrap';

const benefits = [
  {
    icon: Laptop,
    title: 'Practical, career-focused skills',
    description: 'Learn real-world skills that make you highly marketable in today\'s competitive job market.',
  },
  {
    icon: Clock,
    title: 'Learn at your own pace',
    description: 'Study through curated learning resources structured to fit comfortably around your academic schedule.',
  },
  {
    icon: Users,
    title: 'Access to experienced student mentors',
    description: 'Get guidance directly from peer mentors who have successfully walked the path before you.',
  },
  {
    icon: BookOpen,
    title: 'Curated learning resources',
    description: 'Save hours of searching with step-by-step roadmaps, guides, and selected high-quality videos.',
  },
  {
    icon: Network,
    title: 'Networking & collaboration',
    description: 'Connect with a vibrant community of fellow learners, creators, and future student leaders.',
  },
  {
    icon: GraduationCap,
    title: 'Built specifically for UI students',
    description: 'Tailored by the Diligent Team to complement academic excellence with practical capabilities.',
  },
];

const About = () => {
  return (
    <MotionWrap>
      <section id="about" className="relative py-24 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* About Us section */}
          <article className="grid lg:grid-cols-2 gap-16 items-start mb-24">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#024AD8]/10 text-[#024AD8] rounded-md text-xs font-bold uppercase tracking-wider">
                WHO WE ARE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2C3038] leading-tight">
                About The{' '}
                <span className="text-[#024AD8]">
                  Empowerment Hub
                </span>
              </h2>
              <div className="space-y-4 text-[#5A5A5A] leading-relaxed text-base sm:text-lg">
                <p>
                  The University of Ibadan Students' Union Empowerment Hub, an initiative of{' '}
                  <strong className="text-[#2C3038] font-bold">The Diligent Team</strong>, is dedicated to empowering
                  UI students through skill acquisition and personal development opportunities.
                </p>
                <p>
                  The platform serves as a central hub where students can easily access training programs, digital skills,
                  entrepreneurship initiatives, professional certifications, workshops, and other empowerment resources.
                </p>
                <p>
                  Our goal is to ensure that every student has the opportunity to develop practical, future-ready skills
                  that complement academic excellence and prepare them for leadership, innovation, and career success.
                </p>
              </div>
            </div>

            {/* Vision & Mission cards */}
            <div className="grid gap-6">
              <div className="p-6 rounded-lg border border-gray-200 bg-white relative overflow-hidden group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#024AD8]/10 text-[#024AD8] shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-[#2C3038]">Our Vision</h3>
                    <p className="text-[#5A5A5A] text-sm leading-relaxed">
                      To build a community of skilled, innovative, and empowered University of Ibadan students who are
                      equipped to create value and make meaningful impact locally and globally.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 bg-white relative overflow-hidden group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-500/10 text-orange-600 shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-[#2C3038]">Our Mission</h3>
                    <ul className="space-y-2.5">
                      {[
                        'Provide easy access to quality skill acquisition and empowerment opportunities for every UI student.',
                        'Foster a culture of continuous learning, innovation, and personal growth.',
                        'Equip students with practical skills that enhance employability and entrepreneurship.',
                        'Create an inclusive platform that supports every student\'s journey toward excellence and self-reliance.',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#5A5A5A] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Why Learn With Us benefits section */}
          <div className="border-t border-gray-200 pt-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#024AD8]/10 text-[#024AD8] rounded-md text-xs font-bold uppercase tracking-wider mb-4">
                BENEFITS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-[#2C3038]">
                Why Learn With the{' '}
                <span className="text-[#024AD8]">
                  Empowerment Hub?
                </span>
              </h2>
              <p className="text-[#5A5A5A]">
                Designed specifically for University of Ibadan students to gain modern advantages beyond the classroom.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const IconComp = benefit.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-lg border border-gray-200 bg-white group hover:border-[#024AD8]/50 transition-colors duration-300"
                  >
                    <div className="p-3 w-fit rounded-lg bg-[#024AD8]/10 text-[#024AD8] mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#2C3038] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-[#5A5A5A] text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </MotionWrap>
  );
};

export default About;
