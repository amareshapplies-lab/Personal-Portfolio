import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export const ExperienceApp = () => {
  const { openApp } = useOS();
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = ['All', 'PyTorch', 'Vision Transformers', 'Diffusion Models', 'SHAP', 'Multimodal Pipelines', 'Python', 'Django'];

  const filteredExperience = (resumeData?.experience || []).filter(exp => {
    if (selectedTag === 'All') return true;
    return exp.skills?.includes(selectedTag);
  });

  return (
    <div className="space-y-6">
      {/* Experience Header & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-4 rounded-3xl">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Briefcase size={18} className="text-ios-purple" />
            Professional Career Experience
          </h2>
          <p className="text-xs text-white/60">
            1+ Years of enterprise & research experience building multimodal AI/ML systems
          </p>
        </div>

        {/* Filter Tags Pill Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter size={14} className="text-white/40 mr-1 flex-shrink-0" />
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-ios-accent text-white shadow-ios-glow'
                  : 'bg-white/5 hover:bg-white/15 text-white/70 border border-white/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="relative border-l-2 border-white/15 left-3 sm:left-4 space-y-8 pl-6 sm:pl-8 pr-2 py-2">
        {filteredExperience.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-ios-purple border-4 border-black flex items-center justify-center shadow-ios-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>

            {/* Experience Card */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl space-y-4 border border-white/15 hover:border-ios-purple/50 transition-colors">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-white">{exp.role}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-ios-purple/20 border border-ios-purple/40 text-ios-purple text-[10px] font-bold">
                      {exp.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-ios-accent mt-0.5">{exp.company}</h4>
                </div>

                <div className="flex items-center gap-3 text-xs text-white/60 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-ios-gold" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-ios-pink" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Key Bullet Highlights */}
              <div className="space-y-2.5">
                {exp.highlights.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
                    <CheckCircle2 size={15} className="text-ios-emerald flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Skills Used Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
                <span className="text-[10px] font-semibold uppercase text-white/40 mr-1">Skills:</span>
                {exp.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/70 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA to Projects Studio */}
      <div className="glass-panel p-5 rounded-3xl flex items-center justify-between bg-gradient-to-r from-ios-purple/20 to-ios-accent/20 border border-ios-purple/30">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles size={14} className="text-ios-gold" />
            Explore Projects & Live Simulators
          </h4>
          <p className="text-[11px] text-white/70">Test GenAI Defect Detection & SHAP Fetal Health interactive widgets</p>
        </div>
        <button 
          onClick={() => openApp('projects')}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <span>Open AI Studio</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
