import React, { useState } from 'react';
import { useMusic } from '../../context/MusicContext';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Shuffle, 
  Repeat, 
  CloudRain, 
  Disc, 
  Music, 
  Sparkles,
  Heart,
  Radio,
  Search
} from 'lucide-react';

export const MusicApp = () => {
  const { 
    playlist, 
    currentTrackIndex, 
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
    toggleAmbientVinyl
  } = useMusic();

  const [searchQuery, setSearchQuery] = useState('');
  const [likedTracks, setLikedTracks] = useState(['lofi-soul', 'melancholy-morning']);

  const toggleLike = (trackId) => {
    setLikedTracks(prev => 
      prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]
    );
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const filteredPlaylist = playlist.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[520px] select-none">
      {/* Left Column: Now Playing & Big Aesthetic Visualizer */}
      <div className="w-full lg:w-5/12 glass-panel p-6 rounded-3xl border border-white/15 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-white/10 via-black/40 to-black/80">
        <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Tag & Like */}
        <div className="flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1.5">
            <Sparkles size={12} />
            {currentTrack.mood}
          </span>

          <button 
            onClick={() => toggleLike(currentTrack.id)}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-rose-400 transition-colors"
            title="Favorite Track"
          >
            <Heart 
              size={18} 
              className={likedTracks.includes(currentTrack.id) ? 'fill-rose-500 text-rose-500' : ''} 
            />
          </button>
        </div>

        {/* Center: Large Album Art with Spinning Vinyl Record */}
        <div className="my-auto py-4 flex items-center justify-center relative z-10">
          <div className="relative group cursor-pointer" onClick={togglePlay}>
            {/* Spinning Vinyl Record */}
            <div 
              className={`absolute -right-6 sm:-right-8 top-2 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-neutral-950 border-4 border-neutral-800 shadow-2xl flex items-center justify-center transition-transform duration-700 pointer-events-none ${
                isPlaying ? 'translate-x-6 sm:translate-x-8 animate-spin' : 'translate-x-0'
              }`}
              style={{ animationDuration: '8s' }}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-neutral-800 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 border-2 border-black/40 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-black" />
                </div>
              </div>
            </div>

            {/* Album Cover */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 z-10">
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                {isPlaying ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white ml-1" />}
              </div>
            </div>
          </div>
        </div>

        {/* Track Title & Artist */}
        <div className="space-y-1 text-center z-10">
          <h2 className="text-lg font-extrabold text-white truncate drop-shadow-md">
            {currentTrack.title}
          </h2>
          <p className="text-xs text-white/70 truncate">
            {currentTrack.artist} • <span className="text-pink-300">{currentTrack.album}</span>
          </p>
        </div>

        {/* Scrubber Range Bar */}
        <div className="pt-4 space-y-1.5 z-10">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.5}
            value={currentTime}
            onChange={(e) => seekTo(parseFloat(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/15 accent-pink-500 hover:h-2.5 transition-all"
            style={{
              background: `linear-gradient(to right, #ec4899 ${progressPercent}%, rgba(255,255,255,0.15) ${progressPercent}%)`
            }}
          />

          <div className="flex justify-between text-[11px] text-white/50 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : currentTrack.durationStr}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="pt-2 flex items-center justify-between z-10">
          <button
            onClick={toggleShuffle}
            className={`p-2.5 rounded-xl transition-colors ${
              isShuffled ? 'text-pink-400 bg-pink-500/20' : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
            title="Shuffle"
          >
            <Shuffle size={16} />
          </button>

          <button
            onClick={prevTrack}
            className="p-3 rounded-full hover:bg-white/15 text-white transition-all active:scale-90"
            title="Previous"
          >
            <SkipBack size={22} />
          </button>

          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 hover:brightness-110 text-white flex items-center justify-center shadow-xl shadow-pink-500/40 transition-all active:scale-95 group"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={24} fill="white" />
            ) : (
              <Play size={24} fill="white" className="ml-1 group-hover:scale-105 transition-transform" />
            )}
          </button>

          <button
            onClick={() => nextTrack()}
            className="p-3 rounded-full hover:bg-white/15 text-white transition-all active:scale-90"
            title="Next"
          >
            <SkipForward size={22} />
          </button>

          <button
            onClick={toggleRepeat}
            className={`p-2.5 rounded-xl transition-colors ${
              isRepeating ? 'text-pink-400 bg-pink-500/20' : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
            title="Repeat"
          >
            <Repeat size={16} />
          </button>
        </div>

        {/* Volume & Ambient Bar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between z-10">
          {/* Volume */}
          <div className="flex items-center space-x-2 w-36">
            <button 
              onClick={toggleMute}
              className="text-white/60 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-white/15 accent-pink-500 hover:h-2 transition-all"
              style={{
                background: `linear-gradient(to right, #ec4899 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.15) ${(isMuted ? 0 : volume) * 100}%)`
              }}
            />
          </div>

          {/* Ambient Sounds */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleAmbientRain}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                ambientRain 
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-400/40 shadow-sm' 
                  : 'bg-white/5 hover:bg-white/10 text-white/60 border border-white/10'
              }`}
              title="Toggle Cozy Rain Sound"
            >
              <CloudRain size={13} className={ambientRain ? 'animate-bounce' : ''} />
              <span>Rain</span>
            </button>

            <button
              onClick={toggleAmbientVinyl}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                ambientVinyl 
                  ? 'bg-amber-500/30 text-amber-300 border border-amber-400/40 shadow-sm' 
                  : 'bg-white/5 hover:bg-white/10 text-white/60 border border-white/10'
              }`}
              title="Toggle Vinyl Record Needle Crackle"
            >
              <Disc size={13} className={ambientVinyl ? 'animate-spin' : ''} />
              <span>Vinyl</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Playlist, Search & Aesthetic Mood Board */}
      <div className="w-full lg:w-7/12 flex flex-col justify-between space-y-4">
        {/* Playlist Header & Search */}
        <div className="glass-panel p-4 rounded-3xl border border-white/15 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white">
                <Music size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Curated Chill & Groove Lounge</h3>
                <p className="text-[11px] text-white/50">Upbeat Funk, Modern Soul, Lo-Fi & Ambient Vibes</p>
              </div>
            </div>

            {/* Live Visualizer Waves */}
            <div className="flex items-center space-x-1 h-5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {[...Array(8)].map((_, i) => (
                <span 
                  key={i} 
                  className={`w-1 rounded-full bg-gradient-to-t from-pink-500 to-purple-400 transition-all ${
                    isPlaying ? 'animate-bounce' : 'h-1.5 opacity-30'
                  }`}
                  style={{ 
                    height: isPlaying ? `${Math.max(30, (i % 4 + 1) * 25)}%` : '4px',
                    animationDuration: `${0.35 + (i * 0.1)}s`,
                    animationDelay: `${i * 0.08}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search playlist by track, artist, or vibe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-pink-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Tracks List */}
        <div className="glass-panel p-3 rounded-3xl border border-white/15 flex-1 overflow-y-auto space-y-2 max-h-[340px]">
          {filteredPlaylist.map((track, idx) => {
            const isCurrent = playlist[currentTrackIndex]?.id === track.id;
            const originalIndex = playlist.findIndex(t => t.id === track.id);

            return (
              <div
                key={track.id}
                onClick={() => selectTrack(originalIndex)}
                className={`group p-3 rounded-2xl flex items-center space-x-3.5 cursor-pointer transition-all border ${
                  isCurrent 
                    ? 'bg-gradient-to-r from-pink-500/25 to-purple-500/15 border-pink-500/40 text-white shadow-lg' 
                    : 'hover:bg-white/10 border-transparent text-white/80'
                }`}
              >
                {/* Thumbnail / Playing Indicator */}
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                  <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                  {isCurrent && isPlaying ? (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping" />
                    </div>
                  ) : null}
                </div>

                {/* Track Metadata */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-pink-300 transition-colors">
                      {track.title}
                    </h4>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 truncate">
                      {track.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 truncate pt-0.5">
                    {track.artist} • <span className="italic">{track.album}</span>
                  </p>
                </div>

                {/* Duration / Playing State */}
                <div className="flex items-center space-x-3 flex-shrink-0">
                  {isCurrent && isPlaying ? (
                    <span className="text-[10px] font-bold text-pink-400 tracking-wider">
                      PLAYING
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-white/40">
                      {track.durationStr}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(track.id);
                    }}
                    className="p-1 rounded-full text-white/30 hover:text-rose-400 transition-colors"
                  >
                    <Heart 
                      size={14} 
                      className={likedTracks.includes(track.id) ? 'fill-rose-500 text-rose-500' : ''} 
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
