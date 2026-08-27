import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry / Consultation',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#070A12] relative overflow-hidden">
      
      <div className="glow-cyan top-1/3 left-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <Send className="w-4 h-4 text-cyan-400" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 font-heading">
            Let's Build Something Exceptional
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Whether you need a full-stack system architecture overhaul, senior technical leadership, or high-performance web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Direct Details Column */}
          <div className="lg:col-span-5 space-y-6 text-start">
            
            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Direct Email</div>
                <a href={`mailto:${portfolioData.personal.socials.email}`} className="text-base font-bold text-white hover:text-cyan-400 transition-colors">
                  {portfolioData.personal.socials.email}
                </a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Direct Phone</div>
                <div className="text-base font-bold text-white">
                  {portfolioData.personal.socials.phone}
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Location</div>
                <div className="text-base font-bold text-white">
                  {portfolioData.personal.location}
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="pt-4 flex items-center gap-3">
              <a
                href={portfolioData.personal.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-slate-900 hover:bg-slate-800 border border-white/10 p-3 rounded-2xl flex items-center justify-center gap-2 text-slate-300 hover:text-cyan-400 transition-all font-mono text-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={portfolioData.personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-slate-900 hover:bg-slate-800 border border-white/10 p-3 rounded-2xl flex items-center justify-center gap-2 text-slate-300 hover:text-cyan-400 transition-all font-mono text-xs"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 text-start shadow-2xl relative">
            
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">
                  Message Dispatched!
                </h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Thank you for reaching out. Alex will review your inquiry and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Project Inquiry', message: '' });
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold px-6 py-2.5 rounded-xl transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <h3 className="text-2xl font-bold text-white mb-6 font-heading">
                  Send Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2 font-bold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-500 rounded-xl py-3 px-4 text-sm text-slate-100 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-2 font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="jane@company.com"
                      className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-500 rounded-xl py-3 px-4 text-sm text-slate-100 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-2 font-bold">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-500 rounded-xl py-3 px-4 text-sm text-slate-100 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-2 font-bold">
                    Message Details *
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell me about your project, timeline, or open role requirements..."
                    className="w-full bg-slate-950/80 border border-white/10 focus:border-cyan-500 rounded-xl py-3 px-4 text-sm text-slate-100 focus:outline-none transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
