import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Code2, 
  Check, 
  Copy, 
  Play, 
  RotateCcw,
  Download
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ onNavigate }) {
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'command', text: '$ whoami' },
    { type: 'response', text: portfolioData.cliCommands.whoami },
    { type: 'command', text: '$ cat skills.json' },
    { type: 'response', text: JSON.stringify(portfolioData.cliCommands.skills, null, 2) }
  ]);

  const [activeTab, setActiveTab] = useState('whoami');
  const [copied, setCopied] = useState(false);

  const runCommand = (cmd) => {
    setActiveTab(cmd);
    if (cmd === 'whoami') {
      setTerminalOutput([
        { type: 'command', text: '$ whoami' },
        { type: 'response', text: portfolioData.cliCommands.whoami },
        { type: 'response', text: `Location: ${portfolioData.personal.location}` },
        { type: 'response', text: `Status: ${portfolioData.personal.availability}` }
      ]);
    } else if (cmd === 'skills') {
      setTerminalOutput([
        { type: 'command', text: '$ cat skills.json' },
        { type: 'response', text: JSON.stringify(portfolioData.cliCommands.skills, null, 2) }
      ]);
    } else if (cmd === 'focus') {
      setTerminalOutput([
        { type: 'command', text: '$ echo $CURRENT_FOCUS' },
        { type: 'response', text: portfolioData.cliCommands.currentFocus }
      ]);
    } else if (cmd === 'contact') {
      setTerminalOutput([
        { type: 'command', text: '$ curl -X GET api/v1/contact' },
        { type: 'response', text: `Email: ${portfolioData.cliCommands.contact}` },
        { type: 'response', text: `GitHub: ${portfolioData.personal.socials.github}` },
        { type: 'response', text: `LinkedIn: ${portfolioData.personal.socials.linkedin}` }
      ]);
    }
  };

  const handleCopy = () => {
    const textToCopy = terminalOutput.map(item => item.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      
      {/* Ambient Glow Orbs */}
      <div className="glow-cyan -top-20 left-1/4"></div>
      <div className="glow-purple top-1/3 -right-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 text-start">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-cyan-400 mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{portfolioData.personal.role}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight mb-6 font-heading">
              Engineering <br />
              <span className="gradient-text-cyan">High-Impact Systems</span> & <br />
              Digital Experiences.
            </h1>

            {/* Bio */}
            <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              {portfolioData.personal.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => onNavigate('projects')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 cursor-pointer flex items-center gap-2 group"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm px-6 py-3.5 rounded-xl border border-white/10 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 text-slate-400">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500">Connect:</span>
              <a 
                href={portfolioData.personal.socials.github} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900/60 border border-white/10 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a 
                href={portfolioData.personal.socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900/60 border border-white/10 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:${portfolioData.personal.socials.email}`}
                className="p-2 rounded-lg bg-slate-900/60 border border-white/10 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive CLI Terminal */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#0B0F19] border border-white/15 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
              
              {/* Terminal Window Header */}
              <div className="bg-[#111827] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  <span className="text-slate-400 text-xs ms-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>alex-rivera@dev-box:~</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCopy}
                    className="text-slate-400 hover:text-cyan-400 p-1 transition-colors"
                    title="Copy terminal output"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="bg-slate-900/80 px-4 py-2 border-b border-white/5 flex flex-wrap gap-2 text-[11px]">
                <span className="text-slate-500 me-1">Presets:</span>
                {['whoami', 'skills', 'focus', 'contact'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => runCommand(cmd)}
                    className={`px-2.5 py-0.5 rounded transition-all cursor-pointer ${
                      activeTab === cmd
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    ${cmd}
                  </button>
                ))}
              </div>

              {/* Terminal Output Body */}
              <div className="p-5 h-72 overflow-y-auto text-start space-y-3 bg-[#060911]/90">
                {terminalOutput.map((item, index) => (
                  <div key={index} className="leading-relaxed">
                    {item.type === 'command' ? (
                      <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                        <span className="text-emerald-400">➜</span>
                        <span>{item.text}</span>
                      </div>
                    ) : (
                      <pre className="text-slate-300 whitespace-pre-wrap font-mono text-xs ps-4">
                        {item.text}
                      </pre>
                    )}
                  </div>
                ))}
                
                <div className="flex items-center text-cyan-400 font-bold">
                  <span className="text-emerald-400">➜</span>
                  <span className="ms-1 font-mono">~</span>
                  <span className="terminal-cursor"></span>
                </div>
              </div>

              {/* Terminal Footer Info */}
              <div className="bg-[#111827] px-4 py-2 border-t border-white/10 text-[11px] text-slate-500 flex justify-between items-center">
                <span>Type commands or click presets above</span>
                <span className="text-emerald-400">● Live Execution</span>
              </div>

            </div>
          </div>

        </div>

        {/* Metrics Grid */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioData.metrics.map((m, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 text-center hover:border-cyan-500/30 transition-colors">
              <div className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${m.color} bg-clip-text text-transparent mb-1 font-heading`}>
                {m.value}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                {m.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
