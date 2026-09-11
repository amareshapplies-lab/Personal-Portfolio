import React from 'react';
import { useOS } from '../../context/OSContext';

export const Wallpaper = () => {
  const { isDarkMode, wallpaperIndex } = useOS();

  const wallpapers = [
    // 2026 iOS Mesh Aurora
    isDarkMode
      ? 'radial-gradient(at 0% 0%, hsla(240, 100%, 12%, 1) 0px, transparent 50%), radial-gradient(at 100% 0%, hsla(217, 100%, 14%, 1) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(280, 100%, 15%, 1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(200, 100%, 10%, 1) 0px, transparent 50%)'
      : 'radial-gradient(at 0% 0%, hsla(210, 100%, 92%, 1) 0px, transparent 50%), radial-gradient(at 100% 0%, hsla(280, 90%, 94%, 1) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(190, 90%, 92%, 1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(240, 90%, 96%, 1) 0px, transparent 50%)'
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-700">
      {/* Background Mesh Gradient */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: wallpapers[wallpaperIndex % wallpapers.length],
          backgroundColor: isDarkMode ? '#06070a' : '#f4f6fc'
        }}
      />

      {/* Dynamic Animated Ambient Orbs */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-30 animate-pulse-glow ${isDarkMode ? 'bg-ios-accent' : 'bg-blue-300'}`} />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[130px] opacity-25 animate-pulse-glow ${isDarkMode ? 'bg-ios-purple' : 'bg-purple-300'}`} style={{ animationDelay: '1.5s' }} />
      <div className={`absolute top-1/2 right-1/3 w-80 h-80 rounded-full blur-[110px] opacity-20 animate-pulse-glow ${isDarkMode ? 'bg-ios-emerald' : 'bg-teal-200'}`} style={{ animationDelay: '3s' }} />

      {/* Fine iOS Subtle Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
    </div>
  );
};
