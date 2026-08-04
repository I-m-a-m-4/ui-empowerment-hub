'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen, ExternalLink, FileSpreadsheet, LineChart, Palette, Video, Library } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const resources = [
  {
    title: 'Microsoft Excel',
    description: 'Master spreadsheets, formulas, data analysis, and reporting to make data-driven decisions.',
    link: 'https://drive.google.com/drive/folders/1p1xmKIGfNEPVMTJo0wPAYkefvv-B__Gm',
    image: '/images/excel_cover.png',
    icon: FileSpreadsheet,
    color: 'from-emerald-500 to-green-600',
    roadmap: ['Basic Formulas', 'Data Analysis', 'Pivot Tables & Charts', 'Excel Dashboards'],
    fullDesc: 'Go from simple rows and columns to creating custom automated dashboards. Curated learning guides and practical templates are available for download.',
    mentorLink: '/#mentors',
  },
  {
    title: 'Trading & Finance',
    description: 'Learn the fundamentals of financial markets, technical analysis, risk management, and trading strategies.',
    link: 'https://drive.google.com/drive/folders/1SMDFK8d_Qgdfyk4VxGiLvlj1U0rXeuGo',
    image: '/images/trading_cover.png',
    icon: LineChart,
    color: 'from-blue-500 to-indigo-600',
    roadmap: ['Market Structure', 'Technical Indicators', 'Risk Management', 'Trading Strategies'],
    fullDesc: 'Discover how financial trading works, including charting, patterns, and developing a discipline-focused trading model with resources.',
    mentorLink: '/#mentors',
  },
  {
    title: 'UI/UX Design',
    description: 'Explore user interface design, user experiences, wireframing, prototyping, and modern design principles.',
    link: 'https://drive.google.com/drive/folders/1xry2OGGHYfza0yCkZgOZ2-wypD_8BqDI',
    image: '/images/uiux_cover.png',
    icon: Palette,
    color: 'from-pink-500 to-rose-600',
    roadmap: ['UI Fundamentals', 'User Research', 'Wireframing & Prototyping', 'Figma Mastery'],
    fullDesc: 'Learn to design beautiful, user-centered websites and mobile apps. Access shared Figma files, templates, and courses.',
    mentorLink: '/#mentors',
  },
  {
    title: 'Video Editing',
    description: 'Acquire post-production skills, motion graphics, audio editing, and video creation techniques.',
    link: 'https://drive.google.com/drive/folders/1fziIVy1WLZNLpBHg__PaRAYp5_qXFmsv',
    image: '/images/video_cover.png',
    icon: Video,
    color: 'from-purple-500 to-violet-600',
    roadmap: ['CapCut (Mobile)', 'CapCut (Desktop)', 'Adobe Premiere Pro', 'Adobe After Effects'],
    fullDesc: 'The learning path combines practical projects, curated tutorials, and progressive skill development. The complete training guide has already been prepared and is ready for download.',
    mentorLink: '/#mentors',
  },
  {
    title: 'Graphics Design',
    description: 'Create stunning visuals, learn typography, branding layout, and professional design software.',
    link: 'https://drive.google.com/drive/folders/1ojuqLafMNMSWgzEArNhpIJ9Zajz481yR',
    image: '/images/graphics_cover.png',
    icon: Palette,
    color: 'from-amber-500 to-orange-600',
    roadmap: ['Design Principles', 'Photoshop & Illustrator', 'Branding & Layouts', 'Project Portfolio'],
    fullDesc: 'Unleash your creativity by learning graphic design. This course covers everything from simple poster layouts to complete brand guidelines.',
    mentorLink: '/#mentors',
  },
];

export default function SkillsAndResources() {
  const [selectedResource, setSelectedResource] = useState<typeof resources[0] | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] text-gray-900">
      <Header />

      <main className="flex-grow pt-32 pb-24">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none overflow-hidden z-0 opacity-40">
          <div className="absolute -top-20 left-10 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl"></div>
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* Back button and page header */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#024AD8] transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#024AD8]/10 text-[#024AD8] rounded-md text-xs font-bold uppercase tracking-wider mb-4">
                Resource Library
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2C3038] mb-4">
                Skills & Learning <span className="text-[#024AD8]">Resources</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                Unlock lifetime access to our curated Google Drive folders. Each resource path has been hand-selected and organized to accelerate your learning and career development.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://drive.google.com/drive/folders/1L2mgOcnvYqrpX36i9TFFE9ofKsoMgcZv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-[#024AD8] hover:bg-[#0036C4] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <Library className="w-4 h-4" />
                  Access Full Skills Acquisition Drive
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Grid of Resource Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Pictorial Header */}
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent"></div>
                    
                    {/* Floating Icon */}
                    <div className={`absolute top-4 left-4 p-2.5 rounded-xl bg-gradient-to-br ${resource.color} text-white shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#2C3038] mb-2 group-hover:text-[#024AD8] transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {resource.description}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedResource(resource)}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-[#024AD8] hover:text-white hover:border-[#024AD8] transition-all duration-200 shadow-sm"
                    >
                      Access Drive Folder
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Roadmap Modal */}
      {selectedResource && (
        <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
          <DialogContent className="sm:max-w-[480px] rounded-lg border border-neutral-800 bg-[#151516] p-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white mb-2">
                {selectedResource.title} Roadmap
              </DialogTitle>
              <DialogDescription className="text-neutral-400 text-sm leading-relaxed">
                {selectedResource.fullDesc}
              </DialogDescription>
            </DialogHeader>

            <div className="my-6 space-y-4">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Learning Journey Path:</h4>
              <div className="space-y-2">
                {selectedResource.roadmap.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-neutral-900/50 rounded-md border border-neutral-800/60">
                    <div className="w-7 h-7 rounded bg-[#024AD8]/10 text-[#024AD8] flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm font-semibold text-neutral-200">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-neutral-800">
              <Button
                asChild
                className="flex-1 rounded-md border border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white bg-transparent font-semibold text-sm flex items-center justify-center transition-colors"
                onClick={() => setSelectedResource(null)}
              >
                <Link href={selectedResource.mentorLink}>Contact Mentor</Link>
              </Button>
              <Button
                asChild
                className="flex-1 rounded-md bg-[#024AD8] hover:bg-[#0036C4] text-white font-semibold text-sm flex items-center justify-center"
              >
                <a href={selectedResource.link} target="_blank" rel="noopener noreferrer" onClick={() => setSelectedResource(null)}>
                  Access Drive
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
}
