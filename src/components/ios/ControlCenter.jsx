import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Eye, 
  Sparkles, 
  Download, 
  Mail, 
  Terminal, 
  X, 
  Check,
  Play,
  Pause,
  SkipForward,
  Music
} from 'lucide-react';
import { resumeData } from '../../data/resumeData';
import { useMusic } from '../../context/MusicContext';

export const ControlCenter = () => {
  const { currentTrack, isPlaying, volume, isMuted, togglePlay, nextTrack, setVolume } = useMusic();
  const { 
    isControlCenterOpen, 
    setIsControlCenterOpen, 
    isDarkMode, 
    setIsDarkMode,
    soundEnabled,
    setSoundEnabled,
    highContrast,
    setHighContrast,
    openApp,
    triggerIslandNotification
  } = useOS();

  if (!isControlCenterOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 pointer-events-auto"
        onClick={() => setIsControlCenterOpen(false)}
      >
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-12 right-4 w-80 sm:w-96 glass-panel-dark p-5 rounded-3xl border border-white/20 shadow-2xl space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className="text-ios-accent" />
              <h3 className="font-semibold text-sm text-white">iOS Control Center</h3>
            </div>
            <button 
              onClick={() => setIsControlCenterOpen(false)}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Quick Toggles Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                triggerIslandNotification(`Theme Switched`, isDarkMode ? "Light Mode Active" : "Dark Mode Active", "info", "Sun");
              }}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col items-start space-y-2 ${
                isDarkMode 
                  ? 'bg-ios-cardDark border-white/15 text-white' 
                  : 'bg-white/20 border-white/30 text-white'
              }`}
            >
              <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-ios-purple text-white' : 'bg-ios-gold text-black'}`}>
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <div>
                <span className="text-xs font-semibold block">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                <span className="text-[10px] text-white/60">Tap to switch</span>
              </div>
            </button>

            {/* Sound FX Toggle */}
            <button 
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                triggerIslandNotification(`Audio FX`, !soundEnabled ? "Sound Enabled" : "Muted", "info", "Volume2");
              }}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col items-start space-y-2 ${
                soundEnabled 
                  ? 'bg-ios-accent/20 border-ios-accent/40 text-white' 
                  : 'bg-white/5 border-white/10 text-white/50'
              }`}
            >
              <div className={`p-2 rounded-xl ${soundEnabled ? 'bg-ios-accent text-white' : 'bg-white/10 text-white/50'}`}>
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </div>
              <div>
                <span className="text-xs font-semibold block">Audio FX</span>
                <span className="text-[10px] text-white/60">{soundEnabled ? 'On' : 'Muted'}</span>
              </div>
            </button>

            {/* High Contrast */}
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col items-start space-y-2 col-span-2 ${
                highContrast 
                  ? 'bg-ios-emerald/20 border-ios-emerald/40 text-white' 
                  : 'bg-white/5 border-white/10 text-white/70'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-ios-emerald text-black">
                    <Eye size={18} />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-semibold block">High Contrast Mode</span>
                    <span className="text-[10px] text-white/60">Optimized for accessibility</span>
                  </div>
                </div>
                {highContrast && <Check size={16} className="text-ios-emerald" />}
              </div>
            </button>
          </div>

          {/* Now Playing Music Module */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
            <div className="flex items-center space-x-3">
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title} 
                className="w-11 h-11 rounded-xl object-cover shadow-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[9px] uppercase font-bold text-pink-400 tracking-wider block">Now Playing</span>
                <h4 className="text-xs font-bold text-white truncate">{currentTrack.title}</h4>
                <p className="text-[10px] text-white/60 truncate">{currentTrack.artist}</p>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all active:scale-90"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={14} fill="white" /> : <Play size={14} fill="white" className="ml-0.5" />}
                </button>
                <button
                  onClick={() => nextTrack()}
                  className="w-8 h-8 rounded-full hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all active:scale-90"
                  title="Next Track"
                >
                  <SkipForward size={14} />
                </button>
              </div>
            </div>

            {/* Volume Mini Slider */}
            <div className="flex items-center space-x-2 pt-1 border-t border-white/5">
              <Volume2 size={12} className="text-white/40" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-white/15 accent-pink-500"
              />
              <span className="text-[9px] text-white/40 font-mono w-6 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>
          </div>

          {/* Quick Resume Actions */}
          <div className="border-t border-white/10 pt-3 space-y-2">
            <span className="text-[11px] font-semibold uppercase text-white/50 tracking-wider">Quick Actions</span>
            
            <div className="grid grid-cols-3 gap-1.5">
              <button 
                onClick={() => {
                  window.open(`mailto:${resumeData.personal.email}`);
                  setIsControlCenterOpen(false);
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-white transition-colors gap-1 cursor-pointer"
              >
                <Mail size={15} className="text-ios-orange" />
                <span>Email</span>
              </button>

              <a 
                href={resumeData.personal.resumeUrl || '/Amaresh_DR_Resume.pdf'}
                download={resumeData.personal.resumeFileName || 'Amaresh_DR_Resume.pdf'}
                onClick={() => {
                  triggerIslandNotification("Resume Downloaded", "Amaresh_DR_Resume.pdf", "info", "Download");
                  setIsControlCenterOpen(false);
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-white transition-colors gap-1 no-underline cursor-pointer"
              >
                <Download size={15} className="text-ios-accent" />
                <span>Resume</span>
              </a>

              <button 
                onClick={() => {
                  openApp('terminal');
                  setIsControlCenterOpen(false);
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-white transition-colors gap-1 cursor-pointer"
              >
                <Terminal size={15} className="text-ios-cyan" />
                <span>Terminal</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
