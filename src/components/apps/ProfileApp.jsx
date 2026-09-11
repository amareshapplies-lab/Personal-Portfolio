import React from 'react';
import { useOS } from '../../context/OSContext';
import { 
  User, 
  MapPin, 
  Mail, 
  Linkedin, 
  Github, 
  Download, 
  Sparkles, 
  Award, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck 
} from 'lucide-react';
import { resumeData } from '../../data/resumeData';
export const ProfileApp = () => {
  const { openApp, triggerIslandNotification } = useOS();
  const personal = resumeData?.personal || {};
  const summary = resumeData?.summary || '';
  const stats = resumeData?.stats || [];
  const education = resumeData?.education || [];
  const certifications = resumeData?.certifications || [];

  const handleDownloadResume = () => {
    try {
      import('canvas-confetti').then(module => {
        const confettiFn = module.default || module;
        confettiFn({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
    triggerIslandNotification("Resume Downloaded", personal.resumeFileName || "Amaresh_DR_Resume.pdf", "info", "Download");
  };

  return (
    <div className="space-y-6">
      {/* Header Profile Card */}
      <div className="glass-panel p-6 rounded-3xl border border-white/20 relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ios-accent/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          {/* Avatar / Initial Badge */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-ios-accent via-ios-purple to-ios-emerald p-1 shadow-ios-glow">
              <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center text-4xl font-extrabold text-white tracking-wider">
                ADR
              </div>
            </div>
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-ios-emerald border-2 border-black flex items-center justify-center text-[10px] text-black font-bold">
              ✓
            </span>
          </div>

          {/* Profile Main Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {personal.name}
              </h1>
              <span className="px-3 py-1 rounded-full bg-ios-emerald/20 border border-ios-emerald/40 text-ios-emerald text-xs font-semibold flex items-center gap-1">
                <ShieldCheck size={13} />
                Open for Hire
              </span>
            </div>

            <p className="text-sm font-semibold text-ios-accent">
              {personal.title}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-ios-pink" />
                {personal.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase size={13} className="text-ios-purple" />
                {personal.experienceYears} Experience
              </span>
            </div>

            <p className="text-xs text-white/80 max-w-2xl leading-relaxed pt-1">
              {personal.tagline}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
              <a 
                href={personal.resumeUrl || '/Amaresh_DR_Resume.pdf'}
                download={personal.resumeFileName || 'Amaresh_DR_Resume.pdf'}
                onClick={handleDownloadResume}
                className="px-4 py-2 rounded-2xl bg-ios-accent hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-2 shadow-ios-glow transition-all active:scale-95 cursor-pointer no-underline"
              >
                <Download size={14} />
                Download Resume PDF
              </a>

              <button 
                onClick={() => openApp('contact')}
                className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <Mail size={14} className="text-ios-orange" />
                Get in Touch
              </button>

              <a 
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats?.map((stat, idx) => (
          <div key={idx} className="glass-panel p-4 rounded-2xl text-center space-y-1 hover:border-ios-accent/50 transition-colors">
            <span className="text-2xl font-extrabold text-white glow-text-blue block">
              {stat.value}
            </span>
            <span className="text-[11px] font-medium text-white/60 block">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Professional Profile Summary */}
      <div className="glass-panel p-5 rounded-3xl space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Sparkles size={16} className="text-ios-gold" />
          Executive Summary
        </h3>
        <p className="text-xs text-white/80 leading-relaxed">
          {summary}
        </p>
      </div>

      {/* Education & Certifications Row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Education Card */}
        <div className="glass-panel p-5 rounded-3xl space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <GraduationCap size={16} className="text-ios-accent" />
            Education
          </h3>
          {education?.map((edu, idx) => (
            <div key={idx} className="space-y-1 bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <h4 className="text-xs font-bold text-white">{edu.degree}</h4>
              <p className="text-[11px] text-ios-accent font-medium">{edu.institution} • {edu.year}</p>
              <p className="text-[11px] text-ios-emerald font-semibold">CGPA: {edu.cgpa}</p>
            </div>
          ))}
        </div>

        {/* Certifications Card */}
        <div className="glass-panel p-5 rounded-3xl space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Award size={16} className="text-ios-gold" />
            Certifications
          </h3>
          <div className="space-y-2">
            {certifications?.map((cert, idx) => (
              <div key={idx} className="bg-white/5 p-3 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">{cert.title}</h4>
                  <p className="text-[11px] text-white/60">{cert.issuer}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-mono">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
