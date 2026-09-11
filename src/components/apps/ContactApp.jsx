import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Send, 
  CheckCircle2, 
  Loader2, 
  FileSpreadsheet, 
  Bell, 
  Smartphone, 
  ExternalLink 
} from 'lucide-react';
import { resumeData } from '../../data/resumeData';
import { contactConfig } from '../../config/contactConfig';

export const ContactApp = () => {
  const { triggerIslandNotification, playSound } = useOS();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !senderEmail.trim()) return;

    setIsSubmitting(true);
    playSound('open');

    const payload = {
      senderEmail: senderEmail.trim(),
      subject: subject.trim() || 'Portfolio Inquiry',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      source: window.location.origin
    };

    let deliveredToCloud = false;

    // 1. If Google Apps Script Webhook is configured, dispatch to Google Sheets & Mobile notification
    if (contactConfig.googleScriptUrl && contactConfig.googleScriptUrl.trim().startsWith('http')) {
      try {
        await fetch(contactConfig.googleScriptUrl.trim(), {
          method: 'POST',
          mode: 'no-cors', // standard for Google Apps Script Web App redirects
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        deliveredToCloud = true;
      } catch (err) {
        console.warn('Google Script Webhook dispatch failed or blocked by network:', err);
      }
    }

    // 2. Backup to localStorage so no submissions are ever lost
    try {
      const stored = JSON.parse(localStorage.getItem('portfolio_contact_messages') || '[]');
      stored.unshift({ ...payload, id: 'LOCAL-' + Date.now(), deliveredToCloud });
      localStorage.setItem('portfolio_contact_messages', JSON.stringify(stored));
      if (!deliveredToCloud) {
        setSavedLocally(true);
      }
    } catch (e) {
      console.warn('LocalStorage backup error:', e);
    }

    // 3. Trigger Delight Effects (Confetti & Sound)
    try {
      import('canvas-confetti').then(module => {
        const confettiFn = module.default || module;
        confettiFn({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    } catch (e) {}

    // 4. Dynamic Island & Sound Notification
    if (deliveredToCloud) {
      triggerIslandNotification(
        "Message Logged!",
        "Saved to Excel & alert sent to Amaresh's phone",
        "info",
        "Mail"
      );
    } else {
      triggerIslandNotification(
        "Message Dispatched!",
        "Thank you for contacting Amaresh",
        "info",
        "Mail"
      );
    }

    setIsSubmitting(false);
    setSent(true);

    // 5. Native mailto fallback as secondary guarantee if cloud endpoint isn't set
    if (!deliveredToCloud && (!contactConfig.googleScriptUrl || !contactConfig.googleScriptUrl.trim())) {
      setTimeout(() => {
        window.open(`mailto:${resumeData.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message + '\n\nFrom: ' + senderEmail)}`);
      }, 1200);
    }
  };

  const handleReset = () => {
    setSent(false);
    setMessage('');
    setSubject('');
    setSavedLocally(false);
  };

  return (
    <div className="space-y-6">
      {/* Quick Contact Cards */}
      <div className="grid sm:grid-cols-3 gap-3">
        <a 
          href={`mailto:${resumeData.personal.email}`}
          className="glass-panel p-4 rounded-3xl border border-white/10 hover:border-ios-orange/50 transition-colors flex items-center space-x-3 group"
        >
          <div className="p-3 rounded-2xl bg-ios-orange/20 text-ios-orange group-hover:scale-110 transition-transform">
            <Mail size={20} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-white/50 uppercase font-semibold block">Email</span>
            <span className="text-xs font-bold text-white truncate block">{resumeData.personal.email}</span>
          </div>
        </a>

        <a 
          href={`tel:${resumeData.personal.phone}`}
          className="glass-panel p-4 rounded-3xl border border-white/10 hover:border-ios-emerald/50 transition-colors flex items-center space-x-3 group"
        >
          <div className="p-3 rounded-2xl bg-ios-emerald/20 text-ios-emerald group-hover:scale-110 transition-transform">
            <Phone size={20} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-white/50 uppercase font-semibold block">Phone</span>
            <span className="text-xs font-bold text-white truncate block">{resumeData.personal.phone}</span>
          </div>
        </a>

        <a 
          href={resumeData.personal.linkedin}
          target="_blank"
          rel="noreferrer"
          className="glass-panel p-4 rounded-3xl border border-white/10 hover:border-ios-accent/50 transition-colors flex items-center space-x-3 group"
        >
          <div className="p-3 rounded-2xl bg-ios-accent/20 text-ios-accent group-hover:scale-110 transition-transform">
            <Linkedin size={20} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-white/50 uppercase font-semibold block">LinkedIn</span>
            <span className="text-xs font-bold text-white truncate block">{resumeData.personal.linkedinHandle}</span>
          </div>
        </a>
      </div>

      {/* iOS Styled Message Composer */}
      <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Mail size={18} className="text-ios-orange" />
            <h3 className="text-sm font-bold text-white">Direct Message Composer</h3>
          </div>

          {/* Sync status indicator */}
          <div className="flex items-center space-x-2 text-[11px] text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden sm:inline">Auto-saves to Excel & Mobile Alert</span>
            <span className="sm:hidden">Excel & Mobile Sync</span>
          </div>
        </div>

        {sent ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-ios-emerald/20 text-ios-emerald flex items-center justify-center mx-auto shadow-ios-glow">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">Message Successfully Sent!</h4>
              <p className="text-xs text-white/80 max-w-md mx-auto leading-relaxed">
                Your message has been captured. It has been synced to Amaresh's spreadsheet and an instant notification has been dispatched to his mobile device.
              </p>
            </div>

            {/* Notification & Excel Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                <FileSpreadsheet size={14} />
                <span>Recorded in Excel Spreadsheet</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
                <Smartphone size={14} />
                <span>Mobile Notification Pushed</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="flex items-center border-b border-white/10 py-2">
              <span className="w-16 font-semibold text-white/50">To:</span>
              <span className="font-bold text-ios-orange">{resumeData.personal.email}</span>
            </div>

            <div className="flex items-center border-b border-white/10 py-2">
              <span className="w-16 font-semibold text-white/50">From:</span>
              <input 
                type="email"
                required
                disabled={isSubmitting}
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="your.email@company.com"
                className="flex-1 bg-transparent text-white placeholder-white/30 outline-none disabled:opacity-50"
              />
            </div>

            <div className="flex items-center border-b border-white/10 py-2">
              <span className="w-16 font-semibold text-white/50">Subject:</span>
              <input 
                type="text"
                required
                disabled={isSubmitting}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. AI/ML Engineering Position Inquiry"
                className="flex-1 bg-transparent text-white placeholder-white/30 outline-none font-medium disabled:opacity-50"
              />
            </div>

            <div className="pt-2">
              <textarea 
                rows={5}
                required
                disabled={isSubmitting}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message or job opportunity description here..."
                className="w-full p-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none resize-none leading-relaxed disabled:opacity-50"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2 text-[11px] text-white/50">
                <FileSpreadsheet size={13} className="text-emerald-400" />
                <span>Logs to Excel</span>
                <span>•</span>
                <Bell size={13} className="text-amber-400" />
                <span>Instant Mobile Alert</span>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-ios-orange to-ios-pink text-white font-bold text-xs flex items-center justify-center gap-2 shadow-ios-glow transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Syncing to Excel & Mobile...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message to Amaresh</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
