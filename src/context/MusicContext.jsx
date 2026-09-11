import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { popularPlaylist } from '../data/musicData';
import { useOS } from './OSContext';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const { triggerIslandNotification } = useOS();
  const [playlist] = useState(popularPlaylist);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.75); // Normalized 0.0 - 1.0
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isWidgetMinimized, setIsWidgetMinimized] = useState(true);
  const [isWidgetVisible, setIsWidgetVisible] = useState(true);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [ambientRain, setAmbientRain] = useState(false);
  const [ambientVinyl, setAmbientVinyl] = useState(false);

  // Audio elements & Web Audio nodes
  const audioRef = useRef(null);
  const prevVolumeRef = useRef(0.75);
  const isPlayingRef = useRef(isPlaying);
  const isRepeatingRef = useRef(isRepeating);
  const isShuffledRef = useRef(isShuffled);
  const currentTrackIndexRef = useRef(currentTrackIndex);
  const playlistLenRef = useRef(playlist.length);
  const triggerNotificationRef = useRef(triggerIslandNotification);

  // Ambient Web Audio refs
  const audioCtxRef = useRef(null);
  const rainNodesRef = useRef(null);
  const vinylNodesRef = useRef(null);

  // Sync refs to avoid stale closures in event listeners
  useEffect(() => { currentTrackIndexRef.current = currentTrackIndex; }, [currentTrackIndex]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { isRepeatingRef.current = isRepeating; }, [isRepeating]);
  useEffect(() => { isShuffledRef.current = isShuffled; }, [isShuffled]);
  useEffect(() => { triggerNotificationRef.current = triggerIslandNotification; }, [triggerIslandNotification]);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // Helper to get or create Web Audio context for ambient effects
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Safe notification helper that uses the latest ref
  const notifyTrack = useCallback((track) => {
    if (!track) return;
    try {
      triggerNotificationRef.current?.(
        track.title,
        `${track.artist} • ${track.tag}`,
        'music',
        'Music',
        3500
      );
    } catch (e) {}
  }, []);

  // Initialize HTML5 Audio instance once
  useEffect(() => {
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio();
      audio.preload = 'auto';
      audio.volume = volume;
      audioRef.current = audio;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleDurationChange = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (isRepeatingRef.current) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        const len = playlistLenRef.current;
        let next;
        if (isShuffledRef.current) {
          next = Math.floor(Math.random() * len);
          if (next === currentTrackIndexRef.current && len > 1) {
            next = (next + 1) % len;
          }
        } else {
          next = (currentTrackIndexRef.current + 1) % len;
        }

        setCurrentTrackIndex(next);
        currentTrackIndexRef.current = next;

        const nextT = popularPlaylist[next];
        if (nextT) {
          audio.src = nextT.url;
          audio.currentTime = 0;
          setCurrentTime(0);
          audio.play()
            .then(() => {
              setIsPlaying(true);
              notifyTrack(nextT);
            })
            .catch(e => console.warn('Auto-next play error:', e));
        }
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e) => {
      console.warn('Audio playback error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // Initial source assignment without auto-reloading
    const initialTrack = popularPlaylist[0];
    if (initialTrack?.url && (!audio.src || !audio.src.endsWith(initialTrack.url))) {
      audio.src = initialTrack.url;
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      // NOTE: Do not set audio.src = '' here so StrictMode re-mount preserves audio!
    };
  }, [notifyTrack, volume]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = playlist[currentTrackIndexRef.current] || playlist[0];
    
    // Ensure correct source
    if (!audio.src || !audio.src.endsWith(track.url)) {
      audio.src = track.url;
    }

    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true);
          notifyTrack(track);
        })
        .catch(err => {
          console.warn('Playback play() call prevented or canceled:', err.message);
        });
    }
  }, [playlist, notifyTrack]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      play();
    } else {
      pause();
    }
  }, [play, pause]);

  const nextTrack = useCallback((auto = false) => {
    const len = playlistLenRef.current;
    let next;
    if (isShuffledRef.current) {
      next = Math.floor(Math.random() * len);
      if (next === currentTrackIndexRef.current && len > 1) {
        next = (next + 1) % len;
      }
    } else {
      next = (currentTrackIndexRef.current + 1) % len;
    }

    setCurrentTrackIndex(next);
    currentTrackIndexRef.current = next;

    const track = playlist[next];
    const audio = audioRef.current;
    if (track && audio) {
      audio.src = track.url;
      audio.currentTime = 0;
      setCurrentTime(0);

      if (!auto || isPlayingRef.current) {
        audio.play()
          .then(() => {
            setIsPlaying(true);
            notifyTrack(track);
          })
          .catch(e => console.warn('Next track play error:', e.message));
      }
    }
  }, [playlist, notifyTrack]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const len = playlistLenRef.current;
    const prev = (currentTrackIndexRef.current - 1 + len) % len;
    setCurrentTrackIndex(prev);
    currentTrackIndexRef.current = prev;

    const track = playlist[prev];
    if (track && audio) {
      audio.src = track.url;
      audio.currentTime = 0;
      setCurrentTime(0);
      audio.play()
        .then(() => {
          setIsPlaying(true);
          notifyTrack(track);
        })
        .catch(e => console.warn('Prev track play error:', e.message));
    }
  }, [playlist, notifyTrack]);

  const selectTrack = useCallback((index) => {
    const track = playlist[index];
    if (!track) return;
    setCurrentTrackIndex(index);
    currentTrackIndexRef.current = index;

    const audio = audioRef.current;
    if (audio) {
      if (!audio.src || !audio.src.endsWith(track.url)) {
        audio.src = track.url;
        audio.currentTime = 0;
        setCurrentTime(0);
      }
      audio.play()
        .then(() => {
          setIsPlaying(true);
          notifyTrack(track);
        })
        .catch(e => console.warn('Select track play error:', e.message));
    }
  }, [playlist, notifyTrack]);

  const setVolume = useCallback((val) => {
    let normalized = typeof val === 'number' ? val : parseFloat(val);
    if (normalized > 1) normalized = normalized / 100;
    const clamped = Math.max(0, Math.min(1, normalized));

    setVolumeState(clamped);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = clamped;
    }
    if (clamped > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (isMuted) {
      const restored = prevVolumeRef.current || 0.75;
      setVolume(restored);
      setIsMuted(false);
      if (audio) audio.muted = false;
    } else {
      prevVolumeRef.current = volume;
      setIsMuted(true);
      if (audio) audio.muted = true;
    }
  }, [isMuted, volume, setVolume]);

  const seekTo = useCallback((seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    const target = Math.max(0, Math.min(audio.duration || 1000, seconds));
    audio.currentTime = target;
    setCurrentTime(target);
  }, []);

  const formatTime = (secs) => {
    if (!secs || isNaN(secs) || !isFinite(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleShuffle = () => setIsShuffled(p => !p);
  const toggleRepeat = () => setIsRepeating(p => !p);
  const toggleWidgetMinimized = () => setIsWidgetMinimized(p => !p);
  const toggleWidgetVisible = () => setIsWidgetVisible(p => !p);
  const openWidget = () => setIsWidgetVisible(true);
  const closeWidget = () => setIsWidgetVisible(false);
  const togglePlaylistOpen = () => setIsPlaylistOpen(p => !p);

  // --- Procedural Ambient Sounds (Web Audio API) ---
  const toggleAmbientRain = useCallback(() => {
    setAmbientRain(prev => {
      const nextState = !prev;
      const ctx = getAudioContext();
      if (!ctx) return nextState;

      if (nextState) {
        try {
          const bufferSize = ctx.sampleRate * 2;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
            b6 = white * 0.115926;
          }

          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = buffer;
          noiseSource.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = 1000;

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.6);

          noiseSource.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          noiseSource.start();
          rainNodesRef.current = { noiseSource, gain };
        } catch (e) {
          console.warn('Ambient rain error:', e);
        }
      } else {
        if (rainNodesRef.current) {
          try {
            const { gain, noiseSource } = rainNodesRef.current;
            gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            setTimeout(() => {
              try { noiseSource.stop(); noiseSource.disconnect(); } catch (err) {}
            }, 500);
          } catch (e) {}
          rainNodesRef.current = null;
        }
      }
      return nextState;
    });
  }, [getAudioContext]);

  const toggleAmbientVinyl = useCallback(() => {
    setAmbientVinyl(prev => {
      const nextState = !prev;
      const ctx = getAudioContext();
      if (!ctx) return nextState;

      if (nextState) {
        try {
          const bufferSize = ctx.sampleRate * 2;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            let val = (Math.random() * 2 - 1) * 0.015;
            if (Math.random() < 0.0009) {
              val += (Math.random() * 2 - 1) * 0.35;
            }
            data[i] = val;
          }

          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = buffer;
          noiseSource.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.value = 800;

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 0.4);

          noiseSource.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          noiseSource.start();
          vinylNodesRef.current = { noiseSource, gain };
        } catch (e) {
          console.warn('Ambient vinyl error:', e);
        }
      } else {
        if (vinylNodesRef.current) {
          try {
            const { gain, noiseSource } = vinylNodesRef.current;
            gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            setTimeout(() => {
              try { noiseSource.stop(); noiseSource.disconnect(); } catch (err) {}
            }, 400);
          } catch (e) {}
          vinylNodesRef.current = null;
        }
      }
      return nextState;
    });
  }, [getAudioContext]);

  // Clean up Web Audio on unmount
  useEffect(() => {
    return () => {
      if (rainNodesRef.current) {
        try { rainNodesRef.current.noiseSource.stop(); } catch (e) {}
      }
      if (vinylNodesRef.current) {
        try { vinylNodesRef.current.noiseSource.stop(); } catch (e) {}
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  return (
    <MusicContext.Provider value={{
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
      isWidgetMinimized,
      isPlaylistOpen,
      ambientRain,
      ambientVinyl,
      play,
      pause,
      togglePlay,
      nextTrack,
      prevTrack,
      selectTrack,
      setVolume,
      toggleMute,
      seekTo,
      toggleShuffle,
      toggleRepeat,
      toggleWidgetMinimized,
      isWidgetVisible,
      setIsWidgetVisible,
      toggleWidgetVisible,
      openWidget,
      closeWidget,
      togglePlaylistOpen,
      toggleAmbientRain,
      toggleAmbientVinyl
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within a MusicProvider');
  return context;
};
