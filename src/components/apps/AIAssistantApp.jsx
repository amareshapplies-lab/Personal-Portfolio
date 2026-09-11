import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { Bot, Send, Sparkles, User, Mic, Volume2 } from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export const AIAssistantApp = () => {
  const { triggerIslandNotification, playSound } = useOS();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hi! I'm Amaresh's 2026 Siri AI Assistant. Ask me anything about his ML models, research experience at Lyceum, PyTorch skills, or contact info!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const quickPrompts = [
    "Summarize Amaresh's profile",
    "What ML/GenAI projects did he build?",
    "Tell me about his experience at Researcher Lyceum",
    "How can I contact or hire him?"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    playSound('click');
    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsThinking(true);

    triggerIslandNotification("Amaresh Siri AI", "Processing query...", "ai", "Sparkles");

    setTimeout(() => {
      setIsThinking(false);
      const qLower = query.toLowerCase();

      let matchedAnswer = "Amaresh D R is an AI Developer and Generative AI / ML Engineer skilled in PyTorch, Vision Transformers, Diffusion Models, SHAP, and full-stack development. Feel free to download his resume (Amaresh_DR_Resume.pdf) or email him directly at amareshapplies@gmail.com.";

      for (const item of resumeData.aiKnowledge) {
        if (item.keywords.some(k => qLower.includes(k))) {
          matchedAnswer = item.answer;
          break;
        }
      }

      setMessages(prev => [...prev, { sender: 'ai', text: matchedAnswer }]);
      triggerIslandNotification("Amaresh Siri AI", "Response generated", "info", "Bot");
    }, 800);
  };

  return (
    <div className="flex flex-col h-[480px] space-y-4">
      {/* Siri Orb Header */}
      <div className="glass-panel p-4 rounded-3xl flex items-center justify-between border border-ios-pink/30 bg-gradient-to-r from-ios-pink/10 via-ios-purple/10 to-ios-accent/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-ios-pink via-ios-purple to-ios-accent p-0.5 shadow-ios-glow animate-pulse">
            <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center text-white">
              <Bot size={20} />
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              Amaresh Siri AI Assistant 2026
              <span className="w-2 h-2 rounded-full bg-ios-emerald animate-ping" />
            </h3>
            <p className="text-[10px] text-white/60">Powered by Resume Embeddings & Knowledge Graph</p>
          </div>
        </div>

        {/* Animated Waveform */}
        <div className="hidden sm:flex items-center space-x-1">
          <span className="w-1 h-5 bg-ios-pink rounded-full animate-bounce" />
          <span className="w-1 h-3 bg-ios-purple rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
          <span className="w-1 h-6 bg-ios-accent rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
          <span className="w-1 h-4 bg-ios-emerald rounded-full animate-bounce" style={{ animationDelay: '0.45s' }} />
        </div>
      </div>

      {/* Quick Prompt Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-white/80 whitespace-nowrap transition-all flex items-center gap-1 hover:text-white"
          >
            <Sparkles size={11} className="text-ios-gold" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Chat History Box */}
      <div className="flex-1 overflow-y-auto space-y-3 p-3 glass-panel rounded-3xl border border-white/10">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 ${
              msg.sender === 'user' ? 'bg-ios-accent' : 'bg-gradient-to-tr from-ios-pink to-ios-purple'
            }`}>
              {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>

            <div className={`p-3.5 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-ios-accent text-white rounded-tr-none shadow-ios-glow' 
                : 'bg-white/10 text-white/90 border border-white/10 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center space-x-2 text-xs text-white/50 p-2">
            <span className="w-2 h-2 rounded-full bg-ios-pink animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-ios-purple animate-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="w-2 h-2 rounded-full bg-ios-accent animate-bounce" style={{ animationDelay: '0.3s' }} />
            <span>Amaresh AI is querying knowledge base...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Composer */}
      <div className="flex items-center space-x-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Siri AI about Amaresh's experience, models, or skills..."
          className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-xs text-white placeholder-white/40 outline-none focus:border-ios-accent transition-colors"
        />
        <button 
          onClick={() => handleSend()}
          className="p-3 rounded-2xl bg-ios-accent hover:bg-blue-600 text-white transition-all shadow-ios-glow active:scale-95"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};
