import React, { useState } from 'react';
import { 
  Code2, 
  FileCode2, 
  Palette, 
  Network, 
  Server, 
  Cpu, 
  Terminal, 
  Database, 
  Container, 
  Cloud, 
  Workflow, 
  Sparkles, 
  Brain,
  Layers
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const iconMap = {
    Code2,
    FileCode2,
    Palette,
    Network,
    Server,
    Cpu,
    Terminal,
    Database,
    Container,
    Cloud,
    Workflow,
    Sparkles,
    Brain
  };

  const filteredSkills = portfolioData.skills.filter(
    skill => activeCategory === 'all' || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 bg-[#070A12] relative overflow-hidden">
      
      <div className="glow-purple top-1/2 -left-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-purple-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-purple-400 mb-4">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Technical Capabilities & Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 font-heading">
            Core Expertise & Technologies
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Battle-tested frameworks, languages, and distributed systems architecture tools.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {portfolioData.skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/10 hover:bg-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <div
                key={index}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl text-start"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-white/5">
                    {skill.experience}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors font-heading">
                  {skill.name}
                </h3>

                <p className="text-xs text-slate-400 mb-5 leading-relaxed line-clamp-2">
                  {skill.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-500 uppercase">Proficiency</span>
                    <span className="text-cyan-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
