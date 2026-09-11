import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { Cpu, Sparkles, Search, CheckCircle2, Layers, Code2, Brain, Eye } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export const SkillsApp = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Brain': return <Brain size={18} className="text-ios-purple" />;
      case 'Sparkles': return <Sparkles size={18} className="text-ios-gold" />;
      case 'Eye': return <Eye size={18} className="text-ios-accent" />;
      default: return <Code2 size={18} className="text-ios-cyan" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-4 rounded-3xl">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu size={18} className="text-ios-emerald" />
            Core Competencies & Tech Stack Radar
          </h2>
          <p className="text-xs text-white/60">
            Categorized skills breakdown with proficiency levels and technology stack tags
          </p>
        </div>

        {/* Search Input */}
        <div className="flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/15 w-full sm:w-60">
          <Search size={14} className="text-white/50 mr-2" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search PyTorch, ViT, SHAP..."
            className="bg-transparent text-xs text-white placeholder-white/40 outline-none w-full"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {(resumeData?.skillCategories || []).map((cat, idx) => {
          const filteredSkills = cat.skills.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
          if (filteredSkills.length === 0 && searchTerm) return null;

          return (
            <div key={idx} className="glass-panel p-5 rounded-3xl space-y-4 border border-white/15 hover:border-ios-emerald/40 transition-colors">
              <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
                <div className="p-2 rounded-xl bg-white/10">
                  {getIcon(cat.icon)}
                </div>
                <h3 className="text-sm font-bold text-white">{cat.category}</h3>
              </div>

              <div className="space-y-3">
                {filteredSkills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-white/90">{skill.name}</span>
                      <span className="font-mono text-ios-emerald text-[11px] font-bold">{skill.level}%</span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-ios-accent via-ios-purple to-ios-emerald transition-all duration-1000 shadow-ios-glow"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
