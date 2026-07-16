'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, CheckCircle2, Video, Target, Library } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const skillsList = [
  {
    id: 'smm',
    name: 'Social Media Marketing',
    icon: Target,
    shortDesc: 'Learn how businesses use platforms like Facebook, Instagram, TikTok, Google, and Snapchat to attract customers, run advertisements, increase sales, and build profitable brands through digital marketing.',
    roadmap: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'Snapchat Ads'],
    fullDesc: 'Students will be guided from beginner level to practical campaign creation using curated video resources and hands-on practice. The complete learning roadmap has already been prepared and is ready for download.',
    mentorLink: '#mentors',
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    icon: Video,
    shortDesc: 'Learn professional video editing from beginner level using CapCut before progressing into industry-standard software such as Adobe Premiere Pro and Adobe After Effects.',
    roadmap: ['CapCut (Mobile)', 'CapCut (Desktop)', 'Adobe Premiere Pro', 'Adobe After Effects'],
    fullDesc: 'The learning path combines practical projects, curated tutorials, and progressive skill development. The complete training guide has already been prepared and is ready for download.',
    mentorLink: '#mentors',
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
                    variant="outline"
                    className="flex-1 rounded-md py-4 border-[#2C3038] text-[#2C3038] hover:bg-gray-50 bg-white font-semibold text-sm"
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
          <div className="p-8 rounded-lg border border-gray-200 bg-white flex flex-col justify-between group hover:border-orange-500/40 transition-colors duration-300">
            <div>
              <div className="p-4 w-fit rounded-lg bg-orange-500/10 text-orange-600 mb-6">
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
                className="w-full rounded-md py-5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 border-none text-white font-bold"
              >
                <a
                  href="https://drive.google.com/drive/folders/1V1_rW5rT1gQ_06sB7-eW399s3j1W-7S6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Access Resource Drive
                  <ArrowUpRight className="w-4 h-4" />
                </a>
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
                variant="outline"
                className="flex-1 rounded-md border-gray-300 text-[#2C3038] hover:bg-gray-50"
                onClick={() => setSelectedSkill(null)}
              >
                <a href="#mentors">Contact Mentor</a>
              </Button>
              <Button
                className="flex-1 rounded-md bg-[#024AD8] hover:bg-[#0036C4] text-white"
                onClick={() => {
                  alert("Downloadable guide will be available shortly!");
                  setSelectedSkill(null);
                }}
              >
                Download Guide
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Skills;
