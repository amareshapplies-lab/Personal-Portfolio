import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { Sparkles, ShieldCheck, Activity, Brain, Code2, Mail, Terminal, Music } from 'lucide-react';

export const DynamicIsland = () => {
  const { islandState } = useOS();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={16} className="text-ios-gold animate-spin" style={{ animationDuration: '4s' }} />;
      case 'Music': return <Music size={16} className="text-pink-400 animate-pulse" />;
      case 'ShieldCheck': return <ShieldCheck size={16} className="text-ios-emerald" />;
      case 'Activity': return <Activity size={16} className="text-ios-accent animate-pulse" />;
      case 'Brain': return <Brain size={16} className="text-ios-purple" />;
      case 'Code2': return <Code2 size={16} className="text-ios-cyan" />;
      case 'Mail': return <Mail size={16} className="text-ios-orange" />;
      default: return <Terminal size={16} className="text-ios-accent" />;
    }
  };

  return (
    <div className="fixed top-1.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <motion.div 
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`pointer-events-auto bg-black border border-white/20 shadow-2xl rounded-full flex items-center overflow-hidden transition-all duration-300 ${
          islandState.expanded 
            ? 'px-4 py-2.5 rounded-3xl border-ios-accent/50 shadow-ios-glow' 
            : 'px-3 py-1 text-xs'
        }`}
      >
        <AnimatePresence mode="wait">
          {islandState.expanded ? (
            <motion.div 
              key="expanded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center space-x-3 text-white max-w-sm sm:max-w-md"
            >
              <div className="p-2 rounded-full bg-white/10 flex-shrink-0">
                {getIcon(islandState.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs tracking-tight text-white truncate">
                  {islandState.title}
                </h4>
                <p className="text-[11px] text-white/70 truncate">
                  {islandState.subtitle}
                </p>
              </div>
              {/* Simulated Live Equalizer Waveform */}
              <div className="flex items-center space-x-0.5 h-3">
                <span className="w-0.5 h-full bg-ios-accent animate-bounce" />
                <span className="w-0.5 h-2/3 bg-ios-purple animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-0.5 h-full bg-ios-emerald animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2 text-[11px] text-white/80 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-ios-emerald animate-pulse" />
              <span className="font-medium text-[10px] tracking-wide uppercase text-white/90">Amaresh AI Core</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
