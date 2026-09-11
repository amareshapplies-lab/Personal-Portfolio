import React, { createContext, useContext, useState, useEffect } from 'react';

const OSContext = createContext();

export const OSProvider = ({ children }) => {
  // Default open windows on launch: Profile and Projects
  const [openWindows, setOpenWindows] = useState(['profile', 'projects']);
  const [activeWindow, setActiveWindow] = useState('profile');
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [windowStack, setWindowStack] = useState(['projects', 'profile']);

  // Theme & Appearance
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [wallpaperIndex, setWallpaperIndex] = useState(0);

  // Sync dark class on <html> so Tailwind dark: variants work everywhere
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  // System Menus & Overlays
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  
  // Dynamic Island State
  const [islandState, setIslandState] = useState({
    expanded: false,
    title: "Amaresh WebOS 2026",
    subtitle: "AI/ML Engineer Portfolio",
    type: "info", // info, music, ai, alert
    icon: "Sparkles",
    duration: 5000
  });

  // Sound FX simulator
  const playSound = (type = 'click') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'open') {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } else if (type === 'notification') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08); // E5
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      }
    } catch (e) {
      // Audio context fallbacks
    }
  };

  // Dynamic Island Notification Trigger
  const triggerIslandNotification = React.useCallback((title, subtitle, type = 'info', icon = 'Sparkles', duration = 4000) => {
    playSound('notification');
    setIslandState({
      expanded: true,
      title,
      subtitle,
      type,
      icon,
      duration
    });

    setTimeout(() => {
      setIslandState(prev => ({ ...prev, expanded: false }));
    }, duration);
  }, [soundEnabled]);

  // Window Management Actions
  const openApp = (appId) => {
    playSound('open');
    if (!openWindows.includes(appId)) {
      setOpenWindows([...openWindows, appId]);
    }
    if (minimizedWindows.includes(appId)) {
      setMinimizedWindows(minimizedWindows.filter(id => id !== appId));
    }
    focusWindow(appId);
  };

  const closeWindow = (appId) => {
    playSound('click');
    setOpenWindows(openWindows.filter(id => id !== appId));
    setMinimizedWindows(minimizedWindows.filter(id => id !== appId));
    const newStack = windowStack.filter(id => id !== appId);
    setWindowStack(newStack);
    if (newStack.length > 0) {
      setActiveWindow(newStack[newStack.length - 1]);
    }
  };

  const minimizeWindow = (appId) => {
    playSound('click');
    if (!minimizedWindows.includes(appId)) {
      setMinimizedWindows([...minimizedWindows, appId]);
    }
    const newStack = windowStack.filter(id => id !== appId);
    setWindowStack(newStack);
    if (newStack.length > 0) {
      setActiveWindow(newStack[newStack.length - 1]);
    }
  };

  const focusWindow = (appId) => {
    setActiveWindow(appId);
    setWindowStack(prev => [...prev.filter(id => id !== appId), appId]);
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <OSContext.Provider value={{
      openWindows,
      activeWindow,
      minimizedWindows,
      windowStack,
      isDarkMode,
      setIsDarkMode,
      soundEnabled,
      setSoundEnabled,
      highContrast,
      setHighContrast,
      wallpaperIndex,
      setWallpaperIndex,
      isControlCenterOpen,
      setIsControlCenterOpen,
      isSpotlightOpen,
      setIsSpotlightOpen,
      islandState,
      triggerIslandNotification,
      openApp,
      closeWindow,
      minimizeWindow,
      focusWindow,
      playSound
    }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => useContext(OSContext);
