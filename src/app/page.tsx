import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Mentors from '@/components/Mentors';
import Testimonials from '@/components/Testimonials';
import Executives from '@/components/Executives';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Testimonials />
        <Mentors />
        <Executives />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
