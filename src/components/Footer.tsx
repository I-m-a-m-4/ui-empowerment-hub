'use client';

import React from 'react';
import { GraduationCap, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative bg-[#2C3038] text-white border-t border-gray-800 pt-20 pb-10 overflow-hidden">
      <div className="relative container mx-auto px-6 max-w-7xl z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          
          {/* Brand/About */}
          <div className="col-span-1 md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 relative overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-200 bg-white">
                <img
                  src="/the three logo.jpeg"
                  alt="UI Students' Union Logo"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white leading-none">UI STUDENTS' UNION</span>
                <span className="text-[10px] text-gray-300 font-semibold tracking-wider">EMPOWERMENT HUB</span>
              </div>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              The University of Ibadan Students' Union Empowerment Hub, an initiative of The Diligent Team, is dedicated to empowering UI students through skill acquisition and personal development.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="col-span-1 sm:col-span-4 md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h4>
            <nav className="flex flex-col gap-2.5 text-sm">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Available Skills</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
              <a href="#mentors" className="text-gray-300 hover:text-white transition-colors">Contact Mentors</a>
              <a href="#executives" className="text-gray-300 hover:text-white transition-colors">Meet Executives</a>
            </nav>
          </div>

          {/* Available Skills */}
          <div className="col-span-1 sm:col-span-4 md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Skills & Roadmap</h4>
            <nav className="flex flex-col gap-2.5 text-sm">
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Social Media Marketing</a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Video Editing</a>
              <Link
                href="/skills-and-resources"
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
              >
                Skills & Resources
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </nav>
          </div>

          {/* Contacts */}
          <div className="col-span-1 sm:col-span-4 md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Mentors & Leaders</h4>
            <nav className="flex flex-col gap-2.5 text-sm">
              <a href="https://wa.link/f8c3uw" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Video Editing Mentor</a>
              <a href="https://wa.link/5ijpvz" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Marketing Mentor</a>
              <a href="https://wa.link/kipinc" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Union President</a>
              <a href="https://wa.link/jfklme" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Union Vice President</a>
            </nav>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} University of Ibadan Students' Union. Developed by The Diligent Team.</p>
          <div className="flex items-center gap-4">
            <span>All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
