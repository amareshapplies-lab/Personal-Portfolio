import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { Terminal, Send, Sparkles } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export const TerminalApp = () => {
  const { triggerIslandNotification } = useOS();
  const [history, setHistory] = useState([
    { text: 'Amaresh WebOS 2026 Interactive CLI Shell v2.4.0', type: 'system' },
    { text: 'Type "help" to see available commands or "neofetch" for system specs.', type: 'info' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;

      const newHistory = [...history, { text: `user@amaresh-os:~$ ${input}`, type: 'user' }];
      setInput('');

      switch (cmd) {
        case 'help':
          newHistory.push({
            text: `Available Commands:
  help       - Display this command list
  neofetch   - Display system specs & candidate summary
  skills     - Output technical skills & frameworks
  projects   - List key AI/ML project highlights
  experience - Output professional experience
  resume     - Download Amaresh_DR_Resume.pdf to your system
  contact    - Print email, phone, and LinkedIn
  clear      - Clear terminal screen`,
            type: 'output'
          });
          break;

        case 'neofetch':
          newHistory.push({
            text: `
    .---.      AMARESH D R @ WebOS-2026
   /     \\     -----------------------
  |  (o)  |    OS: Amaresh iOS WebOS v2.4 (React + Vite + Tailwind)
   \\     /     Role: AI Developer | Generative AI & ML Engineer
    \`---\`      Experience: 1+ Professional Years
               Core Stack: PyTorch, ViT, Diffusion, SHAP, Python
               CGPA: 8.00 / 10.0 (Anna University)
               Location: Bangalore, Karnataka (Open to Relocate)`,
            type: 'output'
          });
          break;

        case 'skills':
          newHistory.push({
            text: `TECHNICAL SKILLS:
  - Languages: Python, SQL, JavaScript, HTML, CSS
  - ML/DL: Scikit-learn, PyTorch, ViT, CNN, LSTM, Transformers
  - GenAI: Diffusion Models, GANs, VAEs, LLMs
  - Explainable AI: SHAP, OpenCV
  - Full-Stack: Django, REST APIs, Node`,
            type: 'output'
          });
          break;

        case 'projects':
          newHistory.push({
            text: `FEATURED PROJECTS:
  1. GenAI Defect Detection (ViT + Diffusion Synthetic Augmentation)
  2. Multimodal Fetal Health Analysis (SHAP Explainable AI)
  3. Physics-Aware Transformer (Spinel Crystal Stability Prediction)`,
            type: 'output'
          });
          break;

        case 'experience':
          newHistory.push({
            text: `EXPERIENCE:
  Researcher Lyceum Pvt Ltd | Research Analyst / Tech Programmer (Jul 2025 - Present)
  Networkz Systems          | Full Stack Developer Intern (May 2023 - Jul 2023)`,
            type: 'output'
          });
          break;

        case 'resume':
        case 'cv':
          const resumeLink = document.createElement('a');
          resumeLink.href = resumeData.personal.resumeUrl || '/Amaresh_DR_Resume.pdf';
          resumeLink.download = resumeData.personal.resumeFileName || 'Amaresh_DR_Resume.pdf';
          document.body.appendChild(resumeLink);
          resumeLink.click();
          document.body.removeChild(resumeLink);
          newHistory.push({
            text: `Downloading Amaresh_DR_Resume.pdf to your system... Done!`,
            type: 'output'
          });
          triggerIslandNotification("Resume Downloaded", "Amaresh_DR_Resume.pdf", "info", "Download");
          break;

        case 'contact':
          newHistory.push({
            text: `CONTACT DETAILS:
  Email:    ${resumeData.personal.email}
  Phone:    ${resumeData.personal.phone}
  LinkedIn: https://www.linkedin.com/in/amaresh-dr-551445433/`,
            type: 'output'
          });
          triggerIslandNotification("CLI Command Executed", "Contact info displayed", "info", "Terminal");
          break;

        case 'clear':
          setHistory([]);
          return;

        default:
          newHistory.push({
            text: `Command not found: "${cmd}". Type "help" for a list of valid commands.`,
            type: 'error'
          });
      }

      setHistory(newHistory);
    }
  };

  return (
    <div className="font-mono text-xs h-[460px] flex flex-col glass-panel rounded-3xl border border-white/10 bg-slate-950/90 p-4 space-y-3">
      {/* Shell Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-white/50 text-[10px]">
        <div className="flex items-center space-x-2">
          <Terminal size={14} className="text-ios-emerald" />
          <span>zsh - amaresh@webos:~</span>
        </div>
        <span>UTF-8</span>
      </div>

      {/* Output Console */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-2">
        {history.map((item, idx) => (
          <div key={idx} className={`whitespace-pre-wrap leading-relaxed ${
            item.type === 'user' ? 'text-ios-accent font-semibold' :
            item.type === 'system' ? 'text-ios-gold font-bold' :
            item.type === 'error' ? 'text-ios-pink' :
            'text-slate-200'
          }`}>
            {item.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command Input Prompt */}
      <div className="flex items-center space-x-2 border-t border-white/10 pt-2">
        <span className="text-ios-emerald font-bold">amaresh@webos:~$</span>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="Type command ('help', 'neofetch', 'skills')..."
          autoFocus
          className="flex-1 bg-transparent text-white placeholder-white/30 outline-none font-mono text-xs"
        />
      </div>
    </div>
  );
};
