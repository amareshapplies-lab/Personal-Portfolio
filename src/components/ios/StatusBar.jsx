import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { Wifi, Battery, Search, SlidersHorizontal, Terminal, ShieldCheck, Music } from 'lucide-react';
import { useMusic } from '../../context/MusicContext';

export const StatusBar = () => {
  const { 
    activeWindow, 
    openApp, 
    setIsControlCenterOpen, 
    setIsSpotlightOpen,
    triggerIslandNotification,
    isDarkMode
  } = useOS();

  const { isPlaying, currentTrack, isWidgetVisible, toggleWidgetVisible } = useMusic();

  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAppName = (id) => {
    const apps = {
      profile: 'About Amaresh',
      experience: 'Career Experience',
      projects: 'AI Projects Studio',
      skills: 'Skills & Tech Stack',
      assistant: 'Amaresh Siri 2026',
      terminal: 'Amaresh Shell CLI',
      contact: 'Contact & Hire',
      music: 'Lofi Music Lounge'
    };
    return apps[id] || 'Finder';
  };

  // Adaptive classes based on dark/light mode
  const textPrimary = isDarkMode ? 'text-white/90' : 'text-slate-800';
  const textMuted   = isDarkMode ? 'text-white/60' : 'text-slate-500';
  const textFaint   = isDarkMode ? 'text-white/30' : 'text-slate-300';
  const headerBg    = isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white/70 border-black/8';
  const btnBg       = isDarkMode ? 'bg-white/5 hover:bg-white/15 border-white/10' : 'bg-black/5 hover:bg-black/10 border-black/10';
  const iconColor   = isDarkMode ? 'text-white/70' : 'text-slate-600';

  return (
    <header className={`fixed top-0 left-0 right-0 h-9 z-40 px-4 flex items-center justify-between text-xs font-medium backdrop-blur-xl border-b select-none ${headerBg} ${textPrimary}`}>
      {/* Left Menu Section */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => triggerIslandNotification("Amaresh D R", "Data Scientist & AI/ML Engineer", "info", "Sparkles")}
          className={`flex items-center space-x-1.5 font-semibold hover:opacity-80 transition-opacity ${textPrimary}`}
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-ios-accent to-ios-purple flex items-center justify-center text-[9px] text-white font-bold">
            A
          </div>
          <span className="hidden sm:inline">Amaresh OS</span>
        </button>

        <span className={textFaint}>|</span>

        <span className="font-semibold text-ios-accent flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-ios-accent animate-ping" />
          {getAppName(activeWindow)}
        </span>

        <button
          onClick={() => openApp('terminal')}
          className={`hidden md:flex items-center gap-1 px-2 py-0.5 rounded border transition-colors ${btnBg} ${textMuted}`}
        >
          <Terminal size={11} />
          <span>v2026.1</span>
        </button>
      </div>

      {/* Center Dynamic Status Indicator */}
      <div className="hidden lg:flex items-center gap-2">
        <button
          onClick={() => triggerIslandNotification("System Status: Optimal", "PyTorch 2.4 / ViT Models Ready", "info", "ShieldCheck")}
          className={`px-2.5 py-0.5 rounded-full glass-panel border text-[11px] text-emerald-500 flex items-center gap-1.5 hover:bg-white/10 transition-colors ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
        >
          <ShieldCheck size={12} />
          <span>Available for Hire</span>
        </button>
      </div>

      {/* Right Controls Section */}
      <div className="flex items-center space-x-3">
        {/* Floating Music Bar Toggle */}
        <button
          onClick={toggleWidgetVisible}
          className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all border max-w-[170px] ${
            isWidgetVisible
              ? 'bg-pink-500/20 border-pink-500/30 text-pink-500 hover:bg-pink-500/30'
              : isDarkMode
                ? 'bg-white/5 border-white/15 text-white/70 hover:bg-white/10 hover:text-white'
                : 'bg-black/5 border-black/10 text-slate-600 hover:bg-black/10 hover:text-slate-800'
          }`}
          title={isWidgetVisible ? "Hide Floating Music Bar" : "Show Floating Music Bar"}
        >
          <Music size={11} className={isPlaying ? "animate-pulse text-pink-500 flex-shrink-0" : `${iconColor} flex-shrink-0`} />
          <span className="hidden sm:inline truncate">
            {isPlaying ? currentTrack?.title : (isWidgetVisible ? "Music Bar" : "Show Music Bar")}
          </span>
        </button>

        <button 
          onClick={() => setIsSpotlightOpen(true)}
          className={`flex items-center gap-1 transition-colors px-2 py-0.5 rounded-full border ${btnBg} ${textMuted} hover:${textPrimary}`}
          title="Spotlight Search (Cmd+K)"
        >
          <Search size={12} />
          <span className={`hidden sm:inline text-[10px] ${textFaint}`}>⌘K</span>
        </button>

        <button 
          onClick={() => setIsControlCenterOpen(prev => !prev)}
          className={`p-1 rounded-md transition-colors ${iconColor} hover:${textPrimary} hover:bg-black/10`}
          title="Control Center"
        >
          <SlidersHorizontal size={13} />
        </button>

        <div className={`flex items-center space-x-1.5 ${iconColor}`}>
          <Wifi size={13} />
          <div className="flex items-center text-[10px]">
            <span>100%</span>
            <Battery size={14} className="ml-0.5 text-emerald-500" />
          </div>
        </div>

        <div className={`flex items-center space-x-1 font-mono ${textPrimary}`}>
          <span>{date}</span>
          <span className={textFaint}>•</span>
          <span className="font-semibold">{time}</span>
        </div>
      </div>
    </header>
  );
};
