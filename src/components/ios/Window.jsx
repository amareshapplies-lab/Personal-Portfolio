import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { Maximize2, Minimize2, X, Minus } from 'lucide-react';

export const Window = ({ id, title, icon: Icon, children, defaultSize = { w: 'max-w-4xl', h: 'h-[580px]' } }) => {
  const { 
    openWindows, 
    activeWindow, 
    minimizedWindows, 
    windowStack, 
    closeWindow, 
    minimizeWindow, 
    focusWindow,
    isDarkMode
  } = useOS();

  const [isMaximized, setIsMaximized] = useState(false);

  if (!openWindows.includes(id) || minimizedWindows.includes(id)) {
    return null;
  }

  const isActive = activeWindow === id;
  const zIndex = windowStack.indexOf(id) + 10;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 30 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      onClick={() => focusWindow(id)}
      style={{ zIndex }}
      className={`fixed ${
        isMaximized 
          ? 'inset-2 sm:inset-10 top-12 bottom-20 z-50' 
          : `left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[94vw] sm:w-[88vw] md:${defaultSize.w} ${defaultSize.h}`
      } flex flex-col glass-panel-dark rounded-3xl border shadow-2xl overflow-hidden select-none transition-all duration-300 ${
        isDarkMode ? 'border-white/20' : 'border-black/10'
      } ${
        isActive ? 'ring-1 ring-white/30 shadow-ios-glow' : 'opacity-95'
      }`}
    >
      {/* iOS Window Titlebar Header */}
      <div className={`h-11 px-4 flex items-center justify-between border-b backdrop-blur-md cursor-grab active:cursor-grabbing ${
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/8 bg-black/4'
        }`}>
        {/* Left Window Control Traffic Lights */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-[8px] text-red-950 font-bold opacity-90 hover:opacity-100 transition-opacity"
            title="Close Window"
          >
            <X size={8} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-[8px] text-yellow-950 font-bold opacity-90 hover:opacity-100 transition-opacity"
            title="Minimize Window"
          >
            <Minus size={8} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
            className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-[8px] text-emerald-950 font-bold opacity-90 hover:opacity-100 transition-opacity"
            title="Maximize Window"
          >
            {isMaximized ? <Minimize2 size={7} /> : <Maximize2 size={7} />}
          </button>
        </div>

        {/* Title & Icon */}
        <div className={`flex items-center space-x-2 text-xs font-semibold ${
            isDarkMode ? 'text-white/90' : 'text-slate-700'
          }`}>
          {Icon && <Icon size={14} className="text-ios-accent" />}
          <span>{title}</span>
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-ios-emerald animate-pulse" />
          <span className={`text-[10px] font-mono hidden sm:inline ${
              isDarkMode ? 'text-white/40' : 'text-slate-400'
            }`}>2026.v1</span>
        </div>
      </div>

      {/* Window Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 select-text">
        {children}
      </div>
    </motion.div>
  );
};
