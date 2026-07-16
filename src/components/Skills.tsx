'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, CheckCircle2, Video, Target, Library, FileSpreadsheet, TrendingUp, Palette, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Link from 'next/link';

const skillsList = [
  {
    id: 'smm',
    name: 'Social Media Marketing',
    icon: Target,
    shortDesc: 'Learn how businesses use platforms like Facebook, Instagram, TikTok, Google, and Snapchat to attract customers, run advertisements, increase sales, and build profitable brands.',
    roadmap: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'Snapchat Ads'],
    fullDesc: 'Students will be guided from beginner level to practical campaign creation using curated video resources and hands-on practice. The complete learning roadmap has already been prepared and is ready for download.',
    mentorLink: '#mentors',
    driveLink: 'https://drive.google.com/drive/folders/1V1_rW5rT1gQ_06sB7-eW399s3j1W-7S6'
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    icon: Video,
    shortDesc: 'Learn professional video editing from beginner level using CapCut before progressing into industry-standard software such as Adobe Premiere Pro and Adobe After Effects.',
    roadmap: ['CapCut (Mobile)', 'CapCut (Desktop)', 'Adobe Premiere Pro', 'Adobe After Effects'],
    fullDesc: 'The learning path combines practical projects, curated tutorials, and progressive skill development. The complete training guide has already been prepared and is ready for download.',
    mentorLink: '#mentors',
    driveLink: 'https://drive.google.com/drive/folders/1fziIVy1WLZNLpBHg__PaRAYp5_qXFmsv'
  },
  {
    id: 'excel',
    name: 'Microsoft Excel',
    icon: FileSpreadsheet,
    shortDesc: 'Master spreadsheets, formulas, data analysis, visual charts, and reporting to make data-driven decisions and optimize business operations.',
    roadmap: ['Basic Formulas', 'Data Analysis', 'Pivot Tables & Charts', 'Excel Dashboards'],
    fullDesc: 'Go from simple rows and columns to creating custom automated dashboards. Curated learning guides and practical templates are available for download.',
    mentorLink: '#mentors',
    driveLink: 'https://drive.google.com/drive/folders/1p1xmKIGfNEPVMTJo0wPAYkefvv-B__Gm'
  },
  {
    id: 'trading',
    name: 'Trading & Finance',
    icon: TrendingUp,
    shortDesc: 'Learn the fundamentals of financial markets, technical analysis, risk management, and trading strategies to navigate markets effectively.',
    roadmap: ['Market Structure', 'Technical Indicators', 'Risk Management', 'Trading Strategies'],
    fullDesc: 'Discover how financial trading works, including charting, patterns, and developing a discipline-focused trading model with resources.',
    mentorLink: '#mentors',
    driveLink: 'https://drive.google.com/drive/folders/1SMDFK8d_Qgdfyk4VxGiLvlj1U0rXeuGo'
  },
  {
    id: 'uiux',
    name: 'UI/UX Design',
    icon: Palette,
    shortDesc: 'Explore user interface design, user experiences, wireframing, prototyping, and modern design principles using Figma.',
    roadmap: ['UI Fundamentals', 'User Research', 'Wireframing & Prototyping', 'Figma Mastery'],
    fullDesc: 'Learn to design beautiful, user-centered websites and mobile apps. Access shared Figma files, templates, and courses.',
    mentorLink: '#mentors',
    driveLink: 'https://drive.google.com/drive/folders/1xry2OGGHYfza0yCkZgOZ2-wypD_8BqDI'
  },
  {
    id: 'graphics',
    name: 'Graphics Design',
    icon: Palette,
    shortDesc: 'Create stunning visuals, learn typography, branding layouts, color theory, and professional design software.',
    roadmap: ['Design Principles', 'Photoshop & Illustrator', 'Branding & Layouts', 'Project Portfolio'],
    fullDesc: 'Unleash your creativity by learning graphic design. This course covers everything from simple poster layouts to complete brand guidelines.',
    mentorLink: '#mentors',
    driveLink: 'https://drive.google.com/drive/folders/1ojuqLafMNMSWgzEArNhpIJ9Zajz481yR'
  },
  {
    id: 'books',
    name: 'Personal Development Books',
    icon: BookOpen,
    shortDesc: 'Curated list of reading materials and books focused on mindset, financial growth, leadership, and success.',
    roadmap: ['Mindset & Barakah', 'Finance & Wealth', 'Leadership Principles', 'Productivity Habits'],
    fullDesc: 'Access a curated collection of ebooks and guides focused on personal growth, halal wealth building, and prophetic leadership principles.',
    mentorLink: '#mentors',
    driveLink: 'https://drive.google.com/drive/folders/1crsaLdEAfziNMIHkR2m9UjFv1UwbPG3O'
  }
];

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<typeof skillsList[0] | null>(null);

  return (
    <section id="skills" className="py-24 relative bg-[#F3F3F3] border-b border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#024AD8]/10 text-[#024AD8] rounded-md text-xs font-bold uppercase tracking-wider mb-4">
            CURRICULUM
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-[#2C3038]">
            Available{' '}
            <span className="text-[#024AD8]">
              Skill Pathways
            </span>
          </h2>
          <p className="text-[#5A5A5A] text-sm sm:text-base">
            Start learning directly from structured pathways built to take you from absolute beginner to industry professional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsList.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.id}
                className="p-8 rounded-lg border border-gray-200 bg-white flex flex-col justify-between group hover:border-[#024AD8]/40 transition-colors duration-300"
              >
                <div>
                  <div className="p-4 w-fit rounded-lg bg-[#024AD8]/10 text-[#024AD8] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3038] mb-3">{skill.name}</h3>
                  <p className="text-[#5A5A5A] text-sm leading-relaxed mb-6">
                    {skill.shortDesc}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5A5A] mb-3">Roadmap Outline:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {skill.roadmap.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-[#5A5A5A]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#024AD8] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-gray-100 mt-auto">
                  <Button
                    asChild
                    className="flex-1 rounded-md py-4 border border-[#2C3038] text-[#2C3038] hover:bg-gray-50 hover:text-[#024AD8] hover:border-[#024AD8] bg-white font-semibold text-sm flex items-center justify-center transition-colors"
                  >
                    <a href={skill.mentorLink}>Mentor</a>
                  </Button>
                  <Button
                    className="flex-1 rounded-md py-4 bg-[#024AD8] hover:bg-[#0036C4] text-white font-semibold text-sm"
                    onClick={() => setSelectedSkill(skill)}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Google Drive other skills card */}
          <div className="p-8 rounded-lg border border-gray-200 bg-white flex flex-col justify-between group hover:border-[#024AD8]/40 transition-colors duration-300">
            <div>
              <div className="p-4 w-fit rounded-lg bg-[#024AD8]/10 text-[#024AD8] mb-6">
                <Library className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#2C3038] mb-3">Additional Skills</h3>
              <p className="text-[#5A5A5A] text-sm leading-relaxed mb-6">
                Looking for more choices? Explore our shared resource library containing comprehensive guides, assets, and roadmaps for dozens of other practical skills.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 mt-auto">
              <Button
                asChild
                className="w-full rounded-md py-5 bg-gradient-to-r from-[#024AD8] to-blue-500 hover:from-[#0036C4] hover:to-blue-600 border-none text-white font-bold"
              >
                <Link
                  href="/skills-and-resources"
                  className="flex items-center justify-center gap-2"
                >
                  Access Skills and Resources
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Modal */}
      {selectedSkill && (
        <Dialog open={!!selectedSkill} onOpenChange={(open) => !open && setSelectedSkill(null)}>
          <DialogContent className="sm:max-w-[480px] rounded-lg border border-gray-200 bg-white p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[#2C3038] mb-2">
                {selectedSkill.name} Roadmap
              </DialogTitle>
              <DialogDescription className="text-[#5A5A5A] text-sm leading-relaxed">
                {selectedSkill.fullDesc}
              </DialogDescription>
            </DialogHeader>

            <div className="my-6 space-y-4">
              <h4 className="text-xs font-bold text-[#2C3038] uppercase tracking-wider">Learning Journey Path:</h4>
              <div className="space-y-2">
                {selectedSkill.roadmap.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-md border border-gray-100">
                    <div className="w-7 h-7 rounded bg-[#024AD8]/10 text-[#024AD8] flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm font-semibold text-[#2C3038]">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-100">
              <Button
                asChild
                className="flex-1 rounded-md border border-gray-300 text-[#2C3038] hover:bg-gray-50 hover:text-[#024AD8] hover:border-[#024AD8] bg-white font-semibold text-sm flex items-center justify-center transition-colors"
                onClick={() => setSelectedSkill(null)}
              >
                <a href="#mentors">Contact Mentor</a>
              </Button>
              <Button
                asChild
                className="flex-1 rounded-md bg-[#024AD8] hover:bg-[#0036C4] text-white font-semibold text-sm flex items-center justify-center"
              >
                <a href={selectedSkill.driveLink} target="_blank" rel="noopener noreferrer" onClick={() => setSelectedSkill(null)}>
                  Access Drive
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Skills;
