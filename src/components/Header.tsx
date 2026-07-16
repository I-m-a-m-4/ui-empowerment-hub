'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, GraduationCap, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const navLinks = [
  { href: '#about', label: 'About Us' },
  { href: '#skills', label: 'Available Skills' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#mentors', label: 'Mentors' },
  { href: '#executives', label: 'Executives' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        id="heroNav"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-white shadow-sm border-b border-gray-200/80' : 'bg-white border-b border-gray-100'
        )}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 relative overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-200">
              <img
                src="/the three logo.jpeg"
                alt="UI Students' Union Logo"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-[#2C3038] leading-none">UI STUDENTS' UNION</span>
              <span className="text-[10px] text-[#5A5A5A] font-semibold tracking-wider">EMPOWERMENT HUB</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[#5A5A5A] hover:text-[#024AD8] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild className="hidden md:inline-flex bg-[#024AD8] hover:bg-[#0036C4] text-white font-medium rounded-md px-5 py-2.5">
              <a href="#skills">Explore Skills</a>
            </Button>
            <button
              id="menuBtn"
              className="p-2 rounded-md hover:bg-gray-100 md:hidden transition-colors text-[#2C3038]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-b border-gray-200 py-4 px-6 animate-in fade-in slide-in-from-top-5">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href} className="w-full">
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block py-2 text-base font-semibold text-[#5A5A5A] hover:text-[#024AD8] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-gray-150">
                <Button asChild className="w-full bg-[#024AD8] hover:bg-[#0036C4] text-white">
                  <a href="#skills" onClick={handleLinkClick}>
                    Explore Skills
                  </a>
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
