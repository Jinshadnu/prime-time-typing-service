import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  X, 
  ArrowUpRight, 
  Zap,
  BarChart3
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Platforms' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'microservices', label: 'Microservices & APIs' }
  ];

  const filteredProjects = portfolioData.projects.filter(
    p => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <section id="projects" className="py-24 bg-[#090D16] relative">
      
      <div className="glow-cyan bottom-10 right-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            <span>Featured Case Studies & Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 font-heading">
            Architected Production Systems
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            High-scale web platforms, distributed backends, and intelligence tools built for real-world impact.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/10 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-3xl border border-white/10 overflow-hidden hover:border-cyan-500/40 transition-all duration-500 group flex flex-col justify-between text-start"
            >
              <div>
                {/* Project Image Viewport */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent"></div>

                  {/* Benchmark Metric Overlay */}
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5 shadow-lg">
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{project.metrics}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8">
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-heading">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {project.subtitle}
                  </p>

                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 sm:px-8 pb-8 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                <button
                  onClick={() => setSelectedProjectModal(project)}
                  className="text-xs font-bold text-slate-300 hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>Architecture Case Study</span>
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-900 border border-white/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-all text-slate-400"
                    title="Source Code"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all shadow-md"
                    title="Live Demo"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Architecture Case Study Modal */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0D1322] border border-cyan-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 text-start shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProjectModal(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-slate-900 border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 uppercase">
                System Architecture Deep-Dive
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 font-heading">
              {selectedProjectModal.title}
            </h3>

            <p className="text-slate-400 text-sm mb-6">
              {selectedProjectModal.subtitle}
            </p>

            <div className="space-y-6">
              
              {/* Summary */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10">
                <h4 className="text-xs font-mono uppercase text-cyan-400 mb-2 font-bold">
                  Architecture Overview
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedProjectModal.architecture.summary}
                </p>
              </div>

              {/* Technical Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 font-bold">
                  Key Technical Achievements
                </h4>
                <div className="space-y-2.5">
                  {selectedProjectModal.architecture.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-900/50 p-3.5 rounded-xl border border-white/5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 font-bold">
                  Stack Components
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectModal.tags.map((t, idx) => (
                    <span key={idx} className="text-xs font-mono bg-slate-900 text-cyan-300 border border-white/10 px-3 py-1.5 rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Close Case Study
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
