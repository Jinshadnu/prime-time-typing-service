import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#070A12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>Career Progression & Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 font-heading">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            7+ years architecting enterprise SaaS platforms, leading frontend engineering teams, and optimizing distributed databases.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative border-s-2 border-slate-800 ms-4 sm:ms-32 space-y-12">
          {portfolioData.experience.map((exp, idx) => (
            <div key={idx} className="relative ps-8 group text-start">
              
              {/* Icon Node */}
              <div className="absolute -left-[19px] top-0 w-9 h-9 rounded-full bg-[#090D16] border-2 border-cyan-500 flex items-center justify-center text-cyan-400 shadow-lg group-hover:scale-110 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Card Container */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300">
                
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1 font-heading">
                  {exp.role}
                </h3>

                <div className="text-sm font-semibold text-slate-400 mb-4">
                  {exp.company}
                </div>

                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements list */}
                <div className="space-y-2 mb-6">
                  {exp.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="text-[11px] font-mono bg-slate-900 text-slate-400 border border-white/5 px-2.5 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
