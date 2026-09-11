import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { useMusic } from '../../context/MusicContext';
import { 
  User, 
  Briefcase, 
  Sparkles, 
  Cpu, 
  Bot, 
  Terminal, 
  Mail, 
  GraduationCap,
  Music 
} from 'lucide-react';

export const Dock = () => {
  const { openWindows, activeWindow, openApp, isDarkMode } = useOS();
  const { openWidget } = useMusic();

  const dockApps = [
    { id: 'profile', name: 'Profile & Bio', icon: User, gradient: 'from-blue-500 to-indigo-600', badge: null },
    { id: 'experience', name: 'Experience', icon: Briefcase, gradient: 'from-purple-500 to-pink-600', badge: '1+ Yr' },
    { id: 'projects', name: 'AI Studio', icon: Sparkles, gradient: 'from-cyan-500 to-blue-600', badge: '3 Demos' },
    { id: 'music', name: 'Lofi Lounge', icon: Music, gradient: 'from-pink-500 via-rose-500 to-purple-600', badge: 'Lofi' },
    { id: 'skills', name: 'Skills Radar', icon: Cpu, gradient: 'from-emerald-500 to-teal-600', badge: null },
    { id: 'assistant', name: 'Amaresh Siri AI', icon: Bot, gradient: 'from-pink-500 to-rose-600', badge: '2026' },
    { id: 'terminal', name: 'CLI Terminal', icon: Terminal, gradient: 'from-slate-700 to-slate-900', badge: 'CMD' },
    { id: 'contact', name: 'Contact Mail', icon: Mail, gradient: 'from-amber-500 to-orange-600', badge: 'Hire' }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 select-none">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="glass-dock px-3 py-2 rounded-3xl flex items-center space-x-2 sm:space-x-3 shadow-2xl backdrop-blur-2xl border border-white/20"
      >
        {dockApps.map((app) => {
          const Icon = app.icon;
          const isOpen = openWindows.includes(app.id);
          const isActive = activeWindow === app.id;

          return (
            <motion.div
              key={app.id}
              whileHover={{ scale: 1.18, y: -8 }}
              whileTap={{ scale: 0.92 }}
              className="relative group cursor-pointer"
              onClick={() => {
                openApp(app.id);
                if (app.id === 'music') openWidget();
              }}
            >
              {/* Floating Tooltip */}
              <div className={`absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2.5 py-1 rounded-md backdrop-blur-md text-[10px] font-semibold border whitespace-nowrap shadow-lg ${
                  isDarkMode
                    ? 'bg-black/80 text-white border-white/10'
                    : 'bg-white/90 text-slate-800 border-black/10'
                }`}>
                {app.name}
              </div>

              {/* App Icon Box */}
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-lg border border-white/20 transition-all duration-200 ${
                isActive ? 'ring-2 ring-ios-accent shadow-ios-glow' : ''
              }`}>
                <Icon size={22} className="drop-shadow-md" />
              </div>

              {/* Badge counter if present */}
              {app.badge && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-ios-pink text-[9px] font-bold text-white shadow border border-white/20">
                  {app.badge}
                </span>
              )}

              {/* Open Window Indicator Dot */}
              <div className="w-full flex justify-center mt-1">
                {isOpen && (
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-ios-accent w-3 shadow-ios-glow'
                      : isDarkMode ? 'bg-white/60' : 'bg-slate-500/70'
                  }`} />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
