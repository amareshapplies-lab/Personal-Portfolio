import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { 
  Sparkles, 
  Activity, 
  Brain, 
  ShieldAlert, 
  Sliders, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  Layers, 
  Cpu, 
  Eye, 
  Info 
} from 'lucide-react';
import { resumeData } from '../../data/resumeData';

export const ProjectsApp = () => {
  const { triggerIslandNotification } = useOS();
  const projectsList = resumeData?.projects || [];
  const [activeProject, setActiveProject] = useState(projectsList[0]?.id || 'defect-detection');

  // Simulator 1: Defect Inspector State
  const [selectedComponent, setSelectedComponent] = useState('battery');
  const [useDiffusion, setUseDiffusion] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // Simulator 2: SHAP Fetal Health State
  const [fetalHR, setFetalHR] = useState(135);
  const [accelerations, setAccelerations] = useState(0.003);
  const [contractions, setContractions] = useState(0.005);
  const [shapResult, setShapResult] = useState(null);

  // Simulator 3: Spinel Transformer State
  const [selectedSpinel, setSelectedSpinel] = useState('MgAl2O4');
  const [spinelResult, setSpinelResult] = useState(null);

  // Handler for Defect Scanner
  const runDefectScan = () => {
    setIsScanning(true);
    setScanResult(null);
    triggerIslandNotification("ViT Anomaly Pipeline", "Scanning component image...", "info", "Eye");

    setTimeout(() => {
      setIsScanning(false);
      const isDefective = selectedComponent === 'battery' || selectedComponent === 'relay';
      const confidence = useDiffusion ? (98.4 + Math.random() * 1.2).toFixed(1) : (82.1 + Math.random() * 3).toFixed(1);
      
      setScanResult({
        status: isDefective ? 'Defect Anomaly Detected' : 'Normal / Passed',
        confidence: `${confidence}%`,
        box: isDefective ? { x: '35%', y: '40%', w: '30%', h: '30%' } : null,
        augmentedDataPoints: useDiffusion ? '10,000 synthetic diffusion samples' : 'Standard 1:200 imbalanced dataset'
      });

      triggerIslandNotification(
        isDefective ? "Defect Detected!" : "Inspection Passed",
        `Confidence: ${confidence}%`,
        isDefective ? "alert" : "info",
        isDefective ? "ShieldAlert" : "CheckCircle"
      );
    }, 1200);
  };

  // Handler for SHAP Fetal Health Predictor
  const runShapPrediction = () => {
    let riskScore = 0.15; // default normal
    if (fetalHR > 150 || fetalHR < 120) riskScore += 0.35;
    if (accelerations < 0.001) riskScore += 0.3;
    if (contractions > 0.008) riskScore += 0.2;

    const status = riskScore > 0.5 ? (riskScore > 0.7 ? 'Pathological Risk' : 'Suspect Risk') : 'Normal / Healthy';
    const color = riskScore > 0.5 ? (riskScore > 0.7 ? 'text-ios-pink' : 'text-ios-orange') : 'text-ios-emerald';

    setShapResult({
      status,
      score: (riskScore * 100).toFixed(1),
      color,
      shapBreakdown: [
        { feature: 'Fetal Heart Rate (bpm)', impact: fetalHR > 150 ? '+0.32 (Increased Risk)' : '-0.15 (Stable)', positive: fetalHR > 150 },
        { feature: 'Accelerations / sec', impact: accelerations < 0.001 ? '+0.28 (Hypoxia Signal)' : '-0.20 (Normal)', positive: accelerations < 0.001 },
        { feature: 'Uterine Contractions', impact: contractions > 0.008 ? '+0.18 (Stress Risk)' : '-0.10 (Normal)', positive: contractions > 0.008 }
      ]
    });

    triggerIslandNotification("SHAP Risk Model", `Outcome: ${status}`, "info", "Brain");
  };

  // Handler for Spinel Transformer Predictor
  const runSpinelPredictor = () => {
    const spinels = {
      'MgAl2O4': { energy: '-3.42 eV/atom', status: 'Thermodynamically Stable Phase', spaceGroup: 'Fd-3m' },
      'Fe3O4': { energy: '-2.88 eV/atom', status: 'Ferrimagnetic Inverse Spinel', spaceGroup: 'Fd-3m' },
      'Co3O4': { energy: '-2.15 eV/atom', status: 'Metastable Catalytic Phase', spaceGroup: 'Fd-3m' },
      'ZnFe2O4': { energy: '-3.10 eV/atom', status: 'Stable Mixed Spinel', spaceGroup: 'Fd-3m' }
    };
    setSpinelResult(spinels[selectedSpinel]);
    triggerIslandNotification("Physics Transformer", `${selectedSpinel} Analyzed`, "info", "Sparkles");
  };

  return (
    <div className="space-y-6">
      {/* Studio Header & Project Tabs */}
      <div className="glass-panel p-4 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-ios-gold" />
              AI Projects Studio & Live Simulators
            </h2>
            <p className="text-xs text-white/60">
              Interactive demonstrations of ViT Defect Inspection, SHAP Explainable AI, and Physics Transformers
            </p>
          </div>
        </div>

        {/* Project Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {projectsList.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setActiveProject(proj.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                activeProject === proj.id
                  ? 'bg-ios-accent/20 border-ios-accent shadow-ios-glow text-white'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'
              }`}
            >
              <span className="text-[10px] font-mono text-ios-accent uppercase block tracking-wider">{proj.category}</span>
              <h4 className="text-xs font-bold text-white mt-0.5 truncate">{proj.title}</h4>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Project Detail Card */}
      {projectsList.map((proj) => {
        if (proj.id !== activeProject) return null;

        return (
          <div key={proj.id} className="space-y-6">
            {/* Overview */}
            <div className="glass-panel p-5 rounded-3xl space-y-3 border border-white/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-ios-gold uppercase font-mono">{proj.subtitle}</span>
                  <h3 className="text-xl font-extrabold text-white">{proj.title}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/80 font-mono self-start">
                  {proj.period}
                </span>
              </div>

              <p className="text-xs text-white/80 leading-relaxed">
                {proj.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {Object.entries(proj.metrics).map(([key, val], idx) => (
                  <div key={idx} className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                    <span className="text-sm font-extrabold text-ios-cyan block">{val}</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wide block">{key}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {proj.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-ios-accent/15 border border-ios-accent/30 text-ios-accent text-[11px] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* LIVE INTERACTIVE SIMULATOR WIDGET */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border-2 border-ios-accent/40 shadow-ios-glow space-y-5 bg-black/40">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <Cpu size={18} className="text-ios-accent animate-pulse" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Interactive Live Demo Simulator
                  </h4>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-ios-emerald/20 text-ios-emerald text-[10px] font-bold">
                  2026 Engine Ready
                </span>
              </div>

              {/* SIMULATOR 1: ViT Defect Inspection */}
              {proj.simType === 'vit-defect' && (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Input Controls */}
                    <div className="space-y-3">
                      <label className="text-xs font-semibold text-white/80 block">Select Industrial Test Component:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'battery', name: 'EV Battery Cell', icon: '🔋' },
                          { id: 'pcb', name: 'PCB Circuit', icon: '🔌' },
                          { id: 'relay', name: 'Relay Switch', icon: '⚡' }
                        ].map((c) => (
                          <button
                            key={c.id}
                            onClick={() => { setSelectedComponent(c.id); setScanResult(null); }}
                            className={`p-3 rounded-2xl border text-center transition-all ${
                              selectedComponent === c.id 
                                ? 'bg-ios-accent/30 border-ios-accent text-white font-bold' 
                                : 'bg-white/5 border-white/10 text-white/70'
                            }`}
                          >
                            <span className="text-xl block mb-1">{c.icon}</span>
                            <span className="text-[10px] block">{c.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Toggle Diffusion Augmentation */}
                      <button
                        onClick={() => setUseDiffusion(!useDiffusion)}
                        className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all ${
                          useDiffusion 
                            ? 'bg-ios-purple/20 border-ios-purple text-white' 
                            : 'bg-white/5 border-white/10 text-white/50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Layers size={16} className="text-ios-purple" />
                          <div className="text-left">
                            <span className="text-xs font-bold block">Diffusion Synthetic Augmentation</span>
                            <span className="text-[10px] text-white/60">Solves 1:200 class imbalance</span>
                          </div>
                        </div>
                        <span className={`w-4 h-4 rounded-full border ${useDiffusion ? 'bg-ios-purple border-white' : 'border-white/30'}`} />
                      </button>

                      <button
                        onClick={runDefectScan}
                        disabled={isScanning}
                        className="w-full py-3 rounded-2xl bg-ios-accent hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-ios-glow transition-all active:scale-95 disabled:opacity-50"
                      >
                        <Play size={15} />
                        {isScanning ? 'Running ViT Pipeline...' : 'Execute Visual Anomaly Inspection'}
                      </button>
                    </div>

                    {/* Simulated Inspection Canvas */}
                    <div className="relative rounded-2xl bg-slate-950 border border-white/20 h-56 flex flex-col items-center justify-center overflow-hidden">
                      {isScanning && (
                        <div className="absolute inset-0 bg-ios-accent/20 z-10 flex items-center justify-center backdrop-blur-sm">
                          <div className="w-full h-1 bg-ios-accent shadow-ios-glow animate-bounce" />
                        </div>
                      )}

                      {/* Mock Image Wireframe */}
                      <div className="relative w-36 h-36 border-2 border-dashed border-white/30 rounded-xl flex items-center justify-center text-4xl">
                        {selectedComponent === 'battery' ? '🔋' : selectedComponent === 'pcb' ? '🔌' : '⚡'}
                        
                        {/* Bounding Box overlay if scanned */}
                        {scanResult && scanResult.box && (
                          <div className="absolute border-2 border-ios-pink bg-ios-pink/20 animate-pulse rounded-lg flex items-center justify-center" style={scanResult.box}>
                            <span className="text-[9px] font-bold text-white bg-ios-pink px-1 rounded -top-4 absolute">DEFECT</span>
                          </div>
                        )}
                      </div>

                      {scanResult ? (
                        <div className="mt-3 text-center space-y-0.5">
                          <span className={`text-xs font-extrabold ${scanResult.box ? 'text-ios-pink' : 'text-ios-emerald'}`}>
                            {scanResult.status} ({scanResult.confidence})
                          </span>
                          <p className="text-[10px] text-white/50">{scanResult.augmentedDataPoints}</p>
                        </div>
                      ) : (
                        <p className="text-[11px] text-white/40 mt-2">Click Execute to run ViT model</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATOR 2: SHAP Fetal Health Explainer */}
              {proj.simType === 'shap-fetal' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/80">Heart Rate (bpm): {fetalHR}</label>
                      <input 
                        type="range" min="100" max="170" value={fetalHR} 
                        onChange={(e) => setFetalHR(Number(e.target.value))}
                        className="w-full accent-ios-accent" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/80">Accelerations/s: {accelerations}</label>
                      <input 
                        type="range" min="0" max="0.01" step="0.001" value={accelerations} 
                        onChange={(e) => setAccelerations(Number(e.target.value))}
                        className="w-full accent-ios-purple" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-white/80">Contractions/s: {contractions}</label>
                      <input 
                        type="range" min="0" max="0.015" step="0.001" value={contractions} 
                        onChange={(e) => setContractions(Number(e.target.value))}
                        className="w-full accent-ios-pink" 
                      />
                    </div>
                  </div>

                  <button
                    onClick={runShapPrediction}
                    className="w-full py-3 rounded-2xl bg-ios-purple hover:bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-ios-glow transition-all active:scale-95"
                  >
                    <Brain size={15} />
                    Compute SHAP Risk & Feature Attribution
                  </button>

                  {shapResult && (
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Multimodal Risk Assessment:</span>
                        <span className={`text-sm font-extrabold ${shapResult.color}`}>{shapResult.status} ({shapResult.score}%)</span>
                      </div>

                      <div className="space-y-2 border-t border-white/10 pt-2">
                        <span className="text-[10px] uppercase font-bold text-white/40 block">SHAP Force Plot Attribution:</span>
                        {shapResult.shapBreakdown.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-white/80">{item.feature}</span>
                            <span className={`font-mono font-bold ${item.positive ? 'text-ios-pink' : 'text-ios-emerald'}`}>
                              {item.impact}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SIMULATOR 3: Spinel Physics Transformer */}
              {proj.simType === 'spinel-transformer' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="text-xs font-semibold text-white/80 whitespace-nowrap">Select Spinel Compound:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                      {['MgAl2O4', 'Fe3O4', 'Co3O4', 'ZnFe2O4'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSpinel(s)}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                            selectedSpinel === s ? 'bg-ios-gold text-black border-ios-gold shadow-ios-glow' : 'bg-white/5 border-white/10 text-white/70'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={runSpinelPredictor}
                    className="w-full py-3 rounded-2xl bg-ios-gold text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-ios-glow transition-all active:scale-95"
                  >
                    <Sparkles size={15} />
                    Run Physics-Aware Transformer Model
                  </button>

                  {spinelResult && (
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">{selectedSpinel} Stability Prediction</span>
                        <span className="text-[11px] text-ios-emerald font-semibold">{spinelResult.status}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-ios-gold block font-mono">{spinelResult.energy}</span>
                        <span className="text-[10px] text-white/50 font-mono">Space Group: {spinelResult.spaceGroup}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
