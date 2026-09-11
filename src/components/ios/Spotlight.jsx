import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { Search, Sparkles, User, Briefcase, Cpu, Code2, Terminal, ArrowRight, Music } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export const Spotlight = () => {
  const { isSpotlightOpen, setIsSpotlightOpen, openApp } = useOS();
  const [query, setQuery] = useState('');

  if (!isSpotlightOpen) return null;

  // Search filter across resume data
  const searchResults = [];

  if (query.trim()) {
    const q = query.toLowerCase();

    // Check music app
    if ('lofi music songs player playlist tracks beats'.includes(q)) {
      searchResults.push({
        type: 'app',
        title: 'Lofi Music Lounge',
        subtitle: 'English Lofi & Pinterest Beats Player',
        appId: 'music',
        icon: Music
      });
    }

    // Check skills
    resumeData.skillCategories.forEach(cat => {
      cat.skills.forEach(s => {
        if (s.name.toLowerCase().includes(q)) {
          searchResults.push({
            type: 'skill',
            title: s.name,
            subtitle: `${cat.category} • Proficiency ${s.level}%`,
            appId: 'skills',
            icon: Cpu
          });
        }
      });
    });

    // Check experience
    resumeData.experience.forEach(exp => {
      if (
        exp.role.toLowerCase().includes(q) ||
        exp.company.toLowerCase().includes(q) ||
        exp.highlights.some(h => h.toLowerCase().includes(q))
      ) {
        searchResults.push({
          type: 'experience',
          title: `${exp.role} @ ${exp.company}`,
          subtitle: exp.period,
          appId: 'experience',
          icon: Briefcase
        });
      }
    });

    // Check projects
    resumeData.projects.forEach(proj => {
      if (
        proj.title.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q) ||
        proj.tags.some(t => t.toLowerCase().includes(q))
      ) {
        searchResults.push({
          type: 'project',
          title: proj.title,
          subtitle: proj.subtitle,
          appId: 'projects',
          icon: Sparkles
        });
      }
    });
  }

  const defaultSuggestions = [
    { title: 'Lofi Music Lounge', subtitle: 'English Lofi & Pinterest Beats Player', appId: 'music', icon: Music },
    { title: 'Generative AI Defect Detection', subtitle: 'Vision Transformers & Diffusion Models', appId: 'projects', icon: Sparkles },
    { title: 'Research Analyst @ Lyceum', subtitle: 'Jul 2025 - Present', appId: 'experience', icon: Briefcase },
    { title: 'PyTorch & Multimodal Pipelines', subtitle: 'Core ML Skill', appId: 'skills', icon: Cpu },
    { title: 'Amaresh Siri 2026 AI Assistant', subtitle: 'Ask any question about resume', appId: 'assistant', icon: User }
  ];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-md"
        onClick={() => setIsSpotlightOpen(false)}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl glass-panel-dark rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
        >
          {/* Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10">
            <Search size={20} className="text-ios-accent mr-3" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills, projects, experience, or ask AI..."
              autoFocus
              className="w-full bg-transparent text-white placeholder-white/40 outline-none text-sm font-medium"
            />
            <span className="text-xs text-white/30 px-2 py-1 rounded bg-white/5 font-mono">ESC</span>
          </div>

          {/* Results List */}
          <div className="p-3 max-h-80 overflow-y-auto space-y-1">
            {query.trim() ? (
              searchResults.length > 0 ? (
                searchResults.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        openApp(item.appId);
                        setIsSpotlightOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-white/10 transition-colors text-left group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-ios-accent/20 text-ios-accent">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                          <p className="text-[11px] text-white/60">{item.subtitle}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })
              ) : (
                <div className="p-6 text-center text-white/50 text-xs">
                  No matching results found for "{query}". Try searching "PyTorch", "Defect", or "Lyceum".
                </div>
              )
            ) : (
              <div>
                <span className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40 block">Top Suggestions</span>
                {defaultSuggestions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        openApp(item.appId);
                        setIsSpotlightOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-white/10 transition-colors text-left group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-white/10 text-ios-accent">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                          <p className="text-[11px] text-white/60">{item.subtitle}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
