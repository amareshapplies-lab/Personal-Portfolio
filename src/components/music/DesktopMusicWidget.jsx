import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusic } from '../../context/MusicContext';
import { useOS } from '../../context/OSContext';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  ListMusic,
  CloudRain,
  Disc,
  Minimize2,
  Maximize2,
  Sparkles,
  Music,
  X,
  GripVertical
} from 'lucide-react';

export const DesktopMusicWidget = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    formatTime,
    isShuffled,
    isRepeating,
    ambientRain,
    ambientVinyl,
    isWidgetMinimized,
    isWidgetVisible,
    closeWidget,
    isPlaylistOpen,
    playlist,
    currentTrackIndex,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    setVolume,
    toggleMute,
    seekTo,
    toggleShuffle,
    toggleRepeat,
    toggleAmbientRain,
    toggleAmbientVinyl,
    toggleWidgetMinimized,
    togglePlaylistOpen
  } = useMusic();

  const { openApp, triggerIslandNotification } = useOS();

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClose = (e) => {
    e?.stopPropagation?.();
    closeWidget();
    triggerIslandNotification(
      "Music Bar Closed",
      "Reopen anytime from the top Status Bar or Dock",
      "info",
      "Music",
      3000
    );
  };

  return (
    <AnimatePresence>
      {isWidgetVisible && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.06}
          whileDrag={{ scale: 1.02 }}
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 15 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="fixed bottom-24 right-4 z-30 select-none pointer-events-auto touch-none"
        >
          <AnimatePresence mode="wait">
            {isWidgetMinimized ? (
              /* Minimized Floating Pill Mode */
              <motion.div
                key="minimized-pill"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-panel px-3 py-2 rounded-full border border-white/20 shadow-2xl backdrop-blur-2xl flex items-center space-x-2.5 hover:border-pink-500/40 transition-colors bg-black/70 group"
              >
                {/* Drag Handle Indicator */}
                <div
                  className="cursor-grab active:cursor-grabbing text-white/30 group-hover:text-white/70 transition-colors flex items-center pl-0.5"
                  title="Drag to reposition music bar"
                >
                  <GripVertical size={13} />
                </div>

                {/* Spinning Mini Vinyl */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWidgetMinimized();
                  }}
                  className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer shadow-md flex-shrink-0"
                  title="Click to expand player"
                >
                  <img
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    className={`w-full h-full object-cover rounded-full ${isPlaying ? 'animate-spin' : ''}`}
                    style={{ animationDuration: '8s' }}
                  />
                  <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-black rounded-full border border-white/30" />
                </div>

                {/* Title & Artist */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWidgetMinimized();
                  }}
                  className="cursor-pointer max-w-[120px] sm:max-w-[150px] min-w-0"
                  title="Click to expand player"
                >
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                    <h4 className="text-xs font-bold text-white truncate">{currentTrack.title}</h4>
                  </div>
                  <p className="text-[10px] text-white/60 truncate">{currentTrack.artist}</p>
                </div>

                {/* Quick Controls in Pill */}
                <div className="flex items-center space-x-1 pl-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all active:scale-90"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={12} fill="white" /> : <Play size={12} fill="white" className="ml-0.5" />}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextTrack();
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-90"
                    title="Next Track"
                  >
                    <SkipForward size={12} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWidgetMinimized();
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                    title="Expand Player"
                  >
                    <Maximize2 size={11} />
                  </button>

                  {/* Close Pill Button */}
                  <button
                    onClick={handleClose}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="w-6 h-6 rounded-full hover:bg-red-500/20 text-white/40 hover:text-red-400 flex items-center justify-center transition-colors ml-0.5"
                    title="Close Music Bar"
                  >
                    <X size={12} />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Full Desktop Widget Card Mode */
              <motion.div
                key="full-widget"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-[260px] glass-panel p-3 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-2xl relative overflow-hidden bg-gradient-to-b from-white/15 via-black/40 to-black/70"
              >
                {/* Ambient Background Aura */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Header / Brand with Drag Grip */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
                  <div className="flex items-center space-x-2 cursor-grab active:cursor-grabbing">
                    <div className="text-white/30 hover:text-white/60">
                      <GripVertical size={13} />
                    </div>
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md">
                      <Music size={13} />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-white tracking-wide block">MUSIC PLAYER</span>
                      <span className="text-[9px] text-pink-300/80 font-medium block">Curated Grooves</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {/* Expand into full Window */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openApp('music');
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      title="Open Full Music App"
                    >
                      <Maximize2 size={13} />
                    </button>

                    {/* Minimize to Pill */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWidgetMinimized();
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      title="Minimize to Pill"
                    >
                      <Minimize2 size={13} />
                    </button>

                    {/* Close Widget */}
                    <button
                      onClick={handleClose}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                      title="Close Music Player"
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>

                {/* Album Cover & Track Info — Compact Row */}
                <div className="pt-2.5 pb-1.5 flex items-center space-x-3 relative z-10">
                  <div 
                    className="relative group cursor-pointer flex-shrink-0" 
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    {/* Main Album Art */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg border border-white/20 z-10">
                      <img
                        src={currentTrack.cover}
                        alt={currentTrack.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white ml-0.5" />}
                      </div>
                    </div>
                    {/* Tiny spinning vinyl dot */}
                    {isPlaying && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-neutral-900 border border-neutral-700 animate-spin flex items-center justify-center" style={{ animationDuration: '4s' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                      </div>
                    )}
                  </div>

                  {/* Track Metadata */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="inline-block px-1.5 py-0.5 rounded-full text-[8px] font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30 truncate max-w-full">
                      {currentTrack.tag}
                    </span>

                    <h3 className="text-[11px] font-bold text-white truncate leading-tight">
                      {currentTrack.title}
                    </h3>

                    <p className="text-[10px] text-white/60 truncate">
                      {currentTrack.artist}
                    </p>

                    {/* Tiny EQ bars */}
                    <div className="flex items-end space-x-0.5 h-3">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`w-0.5 rounded-full bg-gradient-to-t from-pink-500 to-purple-400 transition-all ${isPlaying ? 'animate-bounce' : 'opacity-30'
                            }`}
                          style={{
                            height: isPlaying ? `${Math.max(4, (i % 3 + 1) * 4)}px` : '3px',
                            animationDuration: `${0.4 + (i * 0.12)}s`,
                            animationDelay: `${i * 0.08}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Time Scrubber / Progress Bar */}
                <div className="pt-2 space-y-1 relative z-10">
                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      step={0.5}
                      value={currentTime}
                      onPointerDown={(e) => e.stopPropagation()}
                      onChange={(e) => seekTo(parseFloat(e.target.value))}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-white/15 accent-pink-500 hover:h-2 transition-all"
                      style={{
                        background: `linear-gradient(to right, #ec4899 ${progressPercent}%, rgba(255,255,255,0.15) ${progressPercent}%)`
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-white/50 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{duration > 0 ? formatTime(duration) : currentTrack.durationStr}</span>
                  </div>
                </div>

                {/* Playback Controls — compact */}
                <div className="pt-1.5 flex items-center justify-between relative z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleShuffle();
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className={`p-1.5 rounded-lg transition-colors ${isShuffled ? 'text-pink-400 bg-pink-500/10' : 'text-white/40 hover:text-white/80'
                      }`}
                    title={isShuffled ? 'Shuffle: On' : 'Shuffle: Off'}
                  >
                    <Shuffle size={12} />
                  </button>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevTrack();
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all active:scale-90"
                      title="Previous Track"
                    >
                      <SkipBack size={13} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white flex items-center justify-center shadow-lg transition-all active:scale-95"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause size={13} fill="white" />
                      ) : (
                        <Play size={13} fill="white" className="ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextTrack();
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all active:scale-90"
                      title="Next Track"
                    >
                      <SkipForward size={13} />
                    </button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRepeat();
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className={`p-1.5 rounded-lg transition-colors ${isRepeating ? 'text-pink-400 bg-pink-500/10' : 'text-white/40 hover:text-white/80'
                      }`}
                    title={isRepeating ? 'Repeat: On' : 'Repeat: Off'}
                  >
                    <Repeat size={12} />
                  </button>
                </div>

                {/* Volume & Extras Row */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between relative z-10">
                  {/* Volume Slider */}
                  <div className="flex items-center space-x-1.5 w-28">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="text-white/60 hover:text-white transition-colors"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted || volume === 0 ? <VolumeX size={12} /> : <Volume2 size={12} />}
                    </button>

                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={isMuted ? 0 : volume}
                      onPointerDown={(e) => e.stopPropagation()}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-white/15 accent-pink-500"
                    />
                  </div>

                  {/* Ambient SFX Toggles */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAmbientRain();
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      className={`p-1.5 rounded-lg transition-colors ${ambientRain
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'hover:bg-white/10 text-white/50 hover:text-white'
                        }`}
                      title={ambientRain ? 'Rain FX: Active' : 'Rain FX: Off'}
                    >
                      <CloudRain size={12} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAmbientVinyl();
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      className={`p-1.5 rounded-lg transition-colors ${ambientVinyl
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'hover:bg-white/10 text-white/50 hover:text-white'
                        }`}
                      title={ambientVinyl ? 'Vinyl Crackle: Active' : 'Vinyl Crackle: Off'}
                    >
                      <Disc size={12} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlaylistOpen();
                      }}
                      onPointerDown={(e) => e.stopPropagation()}
                      className={`p-1.5 rounded-lg transition-colors ${isPlaylistOpen
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                          : 'hover:bg-white/10 text-white/50 hover:text-white'
                        }`}
                      title="Quick Playlist"
                    >
                      <ListMusic size={12} />
                    </button>
                  </div>
                </div>

                {/* Quick Expandable Playlist drawer inside the widget */}
                <AnimatePresence>
                  {isPlaylistOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-white/10 mt-2 pt-2 space-y-1 max-h-36 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-pink-500/30"
                    >
                      {playlist.map((track, idx) => {
                        const isSelected = idx === currentTrackIndex;
                        return (
                          <div
                            key={track.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              selectTrack(idx);
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className={`p-1.5 rounded-xl flex items-center space-x-2.5 cursor-pointer transition-colors ${isSelected
                                ? 'bg-pink-500/20 border border-pink-500/30 text-white'
                                : 'hover:bg-white/10 text-white/70'
                              }`}
                          >
                            <img
                              src={track.cover}
                              alt={track.title}
                              className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-[11px] font-semibold truncate leading-tight">
                                {track.title}
                              </h5>
                              <span className="text-[9px] text-white/40 block truncate">
                                {track.artist}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-white/50">
                              {isSelected && isPlaying ? (
                                <span className="text-pink-400 font-bold">PLAYING</span>
                              ) : (
                                track.durationStr
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
