import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-slate-950 text-red-400 font-mono text-xs h-screen overflow-auto space-y-4 select-text">
          <h1 className="text-lg font-bold text-red-500">React Runtime Error Caught</h1>
          <p className="text-white bg-red-950/40 p-4 rounded-xl border border-red-800/50">
            {this.state.error && this.state.error.toString()}
          </p>
          <pre className="text-[11px] text-slate-400 bg-black/60 p-4 rounded-xl border border-white/10 whitespace-pre-wrap">
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-sans font-bold"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
import { OSProvider, useOS } from './context/OSContext';
import { MusicProvider } from './context/MusicContext';
import { Wallpaper } from './components/ios/Wallpaper';
import { StatusBar } from './components/ios/StatusBar';
import { DynamicIsland } from './components/ios/DynamicIsland';
import { Dock } from './components/ios/Dock';
import { ControlCenter } from './components/ios/ControlCenter';
import { Spotlight } from './components/ios/Spotlight';
import { Window } from './components/ios/Window';
import { DesktopMusicWidget } from './components/music/DesktopMusicWidget';

import { ProfileApp } from './components/apps/ProfileApp';
import { ExperienceApp } from './components/apps/ExperienceApp';
import { ProjectsApp } from './components/apps/ProjectsApp';
import { SkillsApp } from './components/apps/SkillsApp';
import { AIAssistantApp } from './components/apps/AIAssistantApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { ContactApp } from './components/apps/ContactApp';
import { MusicApp } from './components/apps/MusicApp';

import { 
  User, 
  Briefcase, 
  Sparkles, 
  Cpu, 
  Bot, 
  Terminal, 
  Mail,
  Music 
} from 'lucide-react';

const DesktopContent = () => {
  const { openApp, highContrast, isDarkMode } = useOS();

  const desktopIcons = [
    { id: 'profile', name: 'About Amaresh', icon: User, gradient: 'from-blue-500 to-indigo-600' },
    { id: 'projects', name: 'AI Studio (3 Demos)', icon: Sparkles, gradient: 'from-cyan-500 to-blue-600' },
    { id: 'experience', name: 'Career Timeline', icon: Briefcase, gradient: 'from-purple-500 to-pink-600' },
    { id: 'music', name: 'Music Player', icon: Music, gradient: 'from-pink-500 via-rose-500 to-purple-600' },
    { id: 'skills', name: 'Tech Radar', icon: Cpu, gradient: 'from-emerald-500 to-teal-600' },
    { id: 'assistant', name: 'Amaresh Siri AI', icon: Bot, gradient: 'from-pink-500 to-rose-600' },
    { id: 'terminal', name: 'CLI Terminal', icon: Terminal, gradient: 'from-slate-700 to-slate-900' },
    { id: 'contact', name: 'Contact & Hire', icon: Mail, gradient: 'from-amber-500 to-orange-600' }
  ];

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${highContrast ? 'contrast-125 brightness-110' : ''}`}>
      <Wallpaper />
      <StatusBar />
      <DynamicIsland />
      <ControlCenter />
      <Spotlight />
      <DesktopMusicWidget />

      {/* Desktop App Icons Grid (Top-Left) */}
      <div className="absolute top-14 left-4 z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xs pointer-events-auto">
        {desktopIcons.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => openApp(app.id)}
              className={`flex items-center space-x-3 p-2.5 rounded-2xl glass-panel border transition-all group text-left shadow-lg active:scale-95 ${
                isDarkMode
                  ? 'border-white/10 hover:bg-white/15'
                  : 'border-black/8 hover:bg-black/5'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${app.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <span className={`text-xs font-bold block truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{app.name}</span>
                <span className={`text-[10px] block ${isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>iOS WebOS</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Windows Layer */}
      <Window id="profile" title="About Amaresh D R" icon={User}>
        <ProfileApp />
      </Window>

      <Window id="experience" title="Career Experience" icon={Briefcase}>
        <ExperienceApp />
      </Window>

      <Window id="projects" title="AI Projects Studio & Live Simulators" icon={Sparkles} defaultSize={{ w: 'max-w-5xl', h: 'h-[620px]' }}>
        <ProjectsApp />
      </Window>

      <Window id="skills" title="Skills & Technical Radar" icon={Cpu}>
        <SkillsApp />
      </Window>

      <Window id="assistant" title="Amaresh Siri AI Assistant (2026)" icon={Bot} defaultSize={{ w: 'max-w-xl', h: 'h-[580px]' }}>
        <AIAssistantApp />
      </Window>

      <Window id="terminal" title="Amaresh Shell CLI" icon={Terminal} defaultSize={{ w: 'max-w-2xl', h: 'h-[520px]' }}>
        <TerminalApp />
      </Window>

      <Window id="contact" title="Contact & Hire" icon={Mail} defaultSize={{ w: 'max-w-2xl', h: 'h-[560px]' }}>
        <ContactApp />
      </Window>

      <Window id="music" title="Music Lounge • Curated Grooves & Lo-Fi Beats" icon={Music} defaultSize={{ w: 'max-w-4xl', h: 'h-[590px]' }}>
        <MusicApp />
      </Window>

      <Dock />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <OSProvider>
        <MusicProvider>
          <DesktopContent />
        </MusicProvider>
      </OSProvider>
    </ErrorBoundary>
  );
}
