import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calculator, Target, Split, Layers, DollarSign, Clock, 
  Plus, Trash2, BookOpen, ArrowRight, CheckCircle2, 
  AlertTriangle, Lightbulb, Zap, BarChart3, ChevronDown, ChevronUp,
  HelpCircle, Activity, Users, FileQuestion, Briefcase, TrendingUp, ShoppingBag, PieChart, Info
} from 'lucide-react';

// --- ESTILO "VISIONARY 2025" + RIGOR ACADÉMICO ---
// Mantiene el diseño premiado pero añade capas de profundidad explicativa.

const Label = ({ children, helpText }) => (
  <div className="mb-3 ml-1">
    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
      {children}
      {helpText && (
        <div className="group relative">
          <HelpCircle size={12} className="text-slate-300 cursor-help hover:text-indigo-500 transition-colors"/>
          <div className="absolute left-0 bottom-full mb-2 w-48 bg-slate-900 text-white text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 font-medium normal-case tracking-normal">
            {helpText}
          </div>
        </div>
      )}
    </label>
  </div>
);

const Input = (props) => (
  <div className="relative group">
    <input 
      {...props}
      className={`w-full p-5 bg-slate-50 border-0 rounded-2xl text-slate-900 font-bold text-lg placeholder-slate-300 transition-all duration-300 focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none hover:bg-slate-100 ${props.className}`}
    />
    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 pointer-events-none group-focus-within:ring-black/10 transition-all"></div>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-[2.5rem] p-1 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-white/50 ${className}`}>
    {children}
  </div>
);

const ExplanationSection = ({ title, purpose, whenToUse, interpretation, formula, benchmarks }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-12 pt-8 border-t border-slate-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-4 text-sm font-bold text-slate-400 hover:text-slate-900 transition-all w-full"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-slate-900 text-white rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
           <ChevronDown size={16} />
        </div>
        <span className="tracking-wide">{isOpen ? 'Cerrar Documentación Académica' : 'Ver Fundamento Teórico y Estándares'}</span>
        <div className="h-px bg-slate-100 flex-grow group-hover:bg-slate-200 transition-colors ml-4"></div>
      </button>
      
      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="bg-slate-50/80 rounded-3xl p-8 relative overflow-hidden backdrop-blur-sm border border-white/50">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                        <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-2 uppercase tracking-wide">
                            <Lightbulb size={16} className="text-amber-500 fill-amber-500"/> Objetivo Metodológico
                        </h4>
                        <p className="text-slate-600 leading-relaxed text-sm">{purpose}</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Criterio de Uso</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">{whenToUse}</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Interpretación de Resultados</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">{interpretation}</p>
                    </div>
                    
                    {benchmarks && (
                       <div className="bg-white/60 p-4 rounded-2xl border border-slate-100">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Estándares de la Industria</h4>
                          <ul className="text-xs text-slate-500 space-y-1.5 list-disc pl-4">
                            {benchmarks.map((bench, i) => <li key={i}>{bench}</li>)}
                          </ul>
                       </div>
                    )}

                    {formula && (
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Modelo Matemático</p>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100/50 inline-block">
                               <code className="text-indigo-600 font-mono text-xs font-bold">{formula}</code>
                            </div>
                        </div>
                    )}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- LOGICA MATEMÁTICA ---
const calculateSample = (Z, p, e, N) => {
  if (e <= 0) return 0;
  const eVal = e / 100;
  const numerator = Math.pow(Z, 2) * p * (1 - p);
  const denominator = Math.pow(eVal, 2);
  let n = numerator / denominator;
  if (N && N > 0) n = n / (1 + ((n - 1) / N));
  return Math.ceil(n);
};

const calculateMarginOfError = (Z, p, n, N) => {
  if (n <= 0) return 0;
  let standardError = Math.sqrt((p * (1 - p)) / n);
  if (N && N > 0) {
    if (n >= N) return 0;
    const fpc = Math.sqrt((N - n) / (N - 1));
    standardError = standardError * fpc;
  }
  return (Z * standardError * 100).toFixed(2);
};

// --- APP PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState('calc-sample');

  const tools = [
    { id: 'calc-sample', label: '1. Muestra', icon: Calculator },
    { id: 'calc-error', label: '2. Error', icon: Target },
    { id: 'ab-test', label: '3. A/B Test', icon: Split },
    { id: 'stratified', label: '4. Estratos', icon: Layers },
    { id: 'costs', label: '5. Costos', icon: DollarSign },
    { id: 'sampling-guide', label: '6. Guía', icon: BookOpen },
    { id: 'case-studies', label: '7. Casos Prácticos', icon: Briefcase },
    { id: 'demand', label: '8. Estimar Demanda', icon: PieChart }, 
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-black selection:text-white pb-32 relative overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-white to-transparent pointer-events-none z-0"></div>
      
      {/* Navigation */}
      <div className="sticky top-6 z-50 flex justify-center px-6 mb-12">
        <nav className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full p-1.5 flex gap-1 overflow-x-auto max-w-full items-center">
          {tools.map((tool) => {
            const isActive = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`
                  relative flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap group
                  ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'}
                `}
              >
                {isActive && (
                   <span className="absolute inset-0 bg-black rounded-full shadow-lg z-[-1] animate-in zoom-in-95 duration-300 ease-out"></span>
                )}
                <tool.icon size={16} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600 transition-colors"}/>
                {tool.label}
              </button>
            )
          })}
        </nav>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out">
          {activeTab === 'calc-sample' && <SampleSizeTool />}
          {activeTab === 'calc-error' && <MarginErrorTool />}
          {activeTab === 'ab-test' && <ABTestingTool />}
          {activeTab === 'stratified' && <StratifiedTool />}
          {activeTab === 'costs' && <CostEstimatorTool />}
          {activeTab === 'sampling-guide' && <SamplingGuideTool />}
          {activeTab === 'case-studies' && <CaseStudiesTool />}
          {activeTab === 'demand' && <DemandEstimationTool />}
        </div>
      </main>

    </div>
  );
}

// ----------------------------------------------------------------------
// 1. CÁLCULO DE MUESTRA
// ----------------------------------------------------------------------
function SampleSizeTool() {
  const [population, setPopulation] = useState('');
  const [confidence, setConfidence] = useState(1.96);
  const [marginError, setMarginError] = useState(5);
  const [heterogeneity, setHeterogeneity] = useState(0.5);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const N = population === '' ? null : Number(population);
    setResult(calculateSample(Number(confidence), Number(heterogeneity), Number(marginError), N));
  }, [population, confidence, marginError, heterogeneity]);

  return (
    <Card className="p-2">
      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-5/12 p-8 lg:p-12 space-y-10">
          <div>
             <h2 className="text-3xl font-black tracking-tighter mb-2 text-slate-900">Diseño Muestral</h2>
             <p className="text-slate-500 font-medium text-sm">Calcula el "n" estadístico ideal.</p>
          </div>
          
          <div className="space-y-8">
             <div className="space-y-4">
               <Label helpText="Probabilidad de que el valor real de la población esté dentro del margen de error calculado. 95% es el estándar científico.">
                 Nivel de Confianza (Z)
               </Label>
               <div className="grid grid-cols-3 gap-3">
                 {[{ l: '90%', v: 1.645 }, { l: '95%', v: 1.96 }, { l: '99%', v: 2.576 }].map(c => (
                   <button 
                    key={c.l} 
                    onClick={() => setConfidence(c.v)} 
                    className={`py-4 rounded-2xl text-xs font-bold transition-all duration-300 border ${
                      confidence === c.v 
                        ? 'bg-black text-white border-black shadow-xl scale-105' 
                        : 'bg-slate-50 text-slate-400 border-transparent hover:bg-slate-100 hover:text-slate-900'
                    }`}
                   >
                     {c.l}
                   </button>
                 ))}
               </div>
               <p className="text-[10px] text-slate-400 font-medium">
                 {confidence === 1.96 ? 'Estándar para Ciencias Sociales y Marketing.' : confidence === 2.576 ? 'Requerido para Medicina o Alta Precisión.' : 'Aceptable solo para sondeos rápidos.'}
               </p>
             </div>

             <div className="space-y-4">
               <Label helpText="Número total de personas en el grupo que deseas estudiar. Si es mayor a 100,000, se considera 'Infinita' matemáticamente.">
                 Población Total (N)
               </Label>
               <Input 
                 type="number" 
                 placeholder="Infinita (Vacío)" 
                 value={population} 
                 onChange={e => setPopulation(e.target.value)} 
               />
             </div>

             <div className="space-y-6 pt-4">
               <div className="flex justify-between items-center">
                  <Label helpText="Rango máximo en el que puede variar el resultado real. Ej: Si obtienes 50% con error de 5%, la realidad está entre 45% y 55%.">
                    Margen de Error (e)
                  </Label>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">{marginError}%</div>
               </div>
               <input 
                 type="range" 
                 min="0.5" 
                 max="10" 
                 step="0.1" 
                 value={marginError} 
                 onChange={e => setMarginError(Number(e.target.value))} 
                 className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-black hover:accent-slate-700 transition-all" 
               />
               <div className="flex justify-between text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                 <span>&lt;3% (Alta Precisión)</span>
                 <span>&gt;5% (Baja Precisión)</span>
               </div>
             </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12 p-3">
          <div className="bg-slate-900 rounded-[2rem] h-full p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden text-white shadow-2xl">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl -mr-40 -mt-40 mix-blend-screen animate-pulse duration-[10s]"></div>
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-3xl -ml-20 -mb-20 mix-blend-screen"></div>

             <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest mb-12">
                   <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                   Muestra Estadísticamente Válida
                </div>

                <div>
                   <div className="text-[10rem] lg:text-[12rem] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 -ml-2 break-all">
                      {result.toLocaleString()}
                   </div>
                   <div className="text-xl font-medium text-slate-400 mt-6 pl-2 max-w-md">
                      Personas necesarias para asegurar un nivel de confianza del {confidence === 1.96 ? '95%' : confidence === 2.576 ? '99%' : '90%'}.
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <div className="px-8 lg:px-12 pb-12">
        <ExplanationSection 
          title="Muestreo Aleatorio Simple"
          purpose="Calcular el tamaño mínimo de muestra (n) requerido para inferir propiedades de una población total (N) con un grado específico de certeza."
          whenToUse="Obligatorio en la fase de planificación de cualquier investigación cuantitativa. Se debe definir ANTES de empezar a encuestar."
          interpretation={`Debes completar ${result.toLocaleString()} encuestas válidas. Si consigues menos, tu margen de error aumentará y tus conclusiones perderán validez científica.`}
          benchmarks={[
            "Error máximo aceptable en academia: 5%",
            "Error ideal para estudios políticos: 2.5% - 3%",
            "Nivel de confianza estándar: 95% (Z=1.96)",
            "Si N es desconocido, se asume población infinita."
          ]}
          formula="n = (Z² * p * q) / e²"
        />
      </div>
    </Card>
  );
}

// ----------------------------------------------------------------------
// 2. ERROR REAL
// ----------------------------------------------------------------------
function MarginErrorTool() {
  const [n, setN] = useState('');
  const [N, setPop] = useState('');
  const [confidence, setConfidence] = useState(1.96);
  const result = useMemo(() => calculateMarginOfError(confidence, 0.5, Number(n), N === '' ? null : Number(N)), [n, N, confidence]);

  const precisionLabel = Number(result) <= 3 ? "Alta (Científica)" : Number(result) <= 5 ? "Estándar (Aceptable)" : "Baja (Referencial)";
  const precisionColor = Number(result) <= 3 ? "text-emerald-600 bg-emerald-50 border-emerald-100" : Number(result) <= 5 ? "text-indigo-600 bg-indigo-50 border-indigo-100" : "text-rose-600 bg-rose-50 border-rose-100";

  return (
    <Card className="p-8 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5 space-y-10">
           <div>
             <h2 className="text-3xl font-black tracking-tighter mb-2">Auditoría Post-Campo</h2>
             <p className="text-slate-500 font-medium text-sm">Verifica la calidad del dato recolectado.</p>
           </div>
           <div className="space-y-6">
             <div className="space-y-4">
               <Label helpText="La cantidad final de encuestas válidas que lograste recolectar y procesar.">Muestras Recolectadas (n)</Label>
               <Input 
                 type="number" 
                 value={n} 
                 onChange={e => setN(e.target.value)} 
                 className="text-2xl font-black tracking-tight"
                 placeholder="0" 
               />
             </div>
             <div className="space-y-4">
               <Label helpText="El universo total de estudio. Si no lo sabes, déjalo vacío (asume infinito).">Población Total (N)</Label>
               <Input 
                   type="number" 
                   value={N} 
                   onChange={e => setPop(e.target.value)} 
                   placeholder="Infinita" 
                   className="bg-white border-2 border-slate-100"
               />
             </div>
             <div className="pt-4">
                <Label>Confianza del Estudio</Label>
                <div className="flex gap-2 p-1.5 bg-slate-100/50 rounded-2xl">
                    {[1.645, 1.96, 2.576].map(val => (
                       <button key={val} onClick={() => setConfidence(val)}
                         className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${confidence === val ? 'bg-white text-black shadow-lg shadow-black/5 ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}>
                         {val === 1.96 ? '95%' : val === 1.645 ? '90%' : '99%'}
                       </button>
                     ))}
                </div>
             </div>
           </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
           <div className="bg-slate-50 rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden group hover:shadow-lg transition-shadow duration-500">
             <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
             {n ? (
               <div className="relative z-10">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Error Real Calculado</p>
                 <div className="text-[6rem] lg:text-[8rem] font-black text-slate-900 tracking-tighter leading-none mb-8">
                   ±{result}%
                 </div>
                 <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold border transition-colors duration-300 ${precisionColor}`}>
                    {Number(result) > 5 ? <AlertTriangle size={16}/> : <CheckCircle2 size={16}/>}
                    Precisión: {precisionLabel}
                 </div>
                 <p className="text-xs text-slate-400 mt-6 max-w-sm mx-auto font-medium leading-relaxed">
                   {Number(result) > 5 
                     ? "Advertencia: Un error superior al 5% reduce la capacidad de generalizar los resultados a toda la población."
                     : "Tus datos son altamente confiables para inferencias poblacionales."}
                 </p>
               </div>
             ) : (
               <div className="relative z-10 flex flex-col items-center justify-center py-12 opacity-30">
                 <div className="w-20 h-20 bg-slate-200 rounded-full mb-6 animate-pulse"></div>
                 <p className="text-xl font-bold text-slate-400">Esperando datos...</p>
               </div>
             )}
           </div>
        </div>
      </div>
      <ExplanationSection 
        title="Cálculo Inverso del Error Estándar"
        purpose="Determinar la precisión 'ex-post' (después del hecho). Sirve para reportar honestamente qué tan lejos pueden estar nuestros datos de la realidad."
        whenToUse="Obligatorio en la sección 'Metodología' de cualquier reporte final. Si planeaste 384 encuestas pero solo hiciste 200, tu error subió y debes recalcularlo aquí."
        interpretation={`Un error de ±${result}% significa que el valor real oscila ${result} puntos arriba o abajo. Si tu encuesta dice '60%', la realidad está entre ${Math.max(0, 60-Number(result))}% y ${Math.min(100, 60+Number(result))}%.`}
        formula="e = Z * √((p * (1-p)) / n)"
      />
    </Card>
  );
}

// ----------------------------------------------------------------------
// 3. A/B TESTING
// ----------------------------------------------------------------------
function ABTestingTool() {
  const [sampleA, setSampleA] = useState(1000);
  const [convA, setConvA] = useState(200);
  const [sampleB, setSampleB] = useState(1000);
  const [convB, setConvB] = useState(240);

  const calculateSig = () => {
    if(!sampleA || !sampleB) return null;
    const p1 = convA / sampleA;
    const p2 = convB / sampleB;
    const pPool = (convA + convB) / (sampleA + sampleB);
    const se = Math.sqrt(pPool * (1 - pPool) * (1/sampleA + 1/sampleB));
    const z = Math.abs((p1 - p2) / se);
    return {
      rateA: (p1 * 100).toFixed(2),
      rateB: (p2 * 100).toFixed(2),
      isSignificant: z > 1.96,
      zScore: z.toFixed(2),
      confidence: z > 2.576 ? '99%' : z > 1.96 ? '95%' : 'Baja (<90%)'
    };
  };

  const results = calculateSig();

  return (
    <Card className="p-8 lg:p-12">
       <div className="mb-10">
         <h2 className="text-3xl font-black tracking-tighter mb-2">Prueba de Hipótesis (A/B)</h2>
         <p className="text-slate-500 font-medium text-sm">Valida si una diferencia es estadísticamente significativa.</p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mb-8">
         <div className="bg-slate-50 rounded-[2rem] p-8 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-slate-100">
             <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grupo Control (A)</span>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 font-bold">A</div>
             </div>
             <div className="space-y-6">
               <div>
                 <Label helpText="Total de personas expuestas a la versión original.">Muestra Total</Label>
                 <Input type="number" value={sampleA} onChange={e => setSampleA(Number(e.target.value))} className="bg-white" />
               </div>
               <div>
                 <Label helpText="Número de personas que realizaron la acción deseada (compra, clic, voto).">Conversiones / Éxitos</Label>
                 <Input type="number" value={convA} onChange={e => setConvA(Number(e.target.value))} className="bg-white" />
               </div>
               <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
                 <span className="text-xs font-bold text-slate-400 uppercase">Tasa Observada</span>
                 <span className="text-4xl font-black text-slate-800 tracking-tighter">{results?.rateA}%</span>
               </div>
             </div>
         </div>
         <div className="bg-indigo-50/50 rounded-[2rem] p-8 transition-all duration-300 hover:shadow-lg border border-indigo-50 hover:border-indigo-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/40 rounded-full blur-3xl -mr-10 -mt-10"></div>
             <div className="flex justify-between items-center mb-8 relative z-10">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Variante (B)</span>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-indigo-600 font-bold">B</div>
             </div>
             <div className="space-y-6 relative z-10">
               <div>
                 <Label helpText="Total de personas expuestas a la nueva versión o tratamiento.">Muestra Total</Label>
                 <Input type="number" value={sampleB} onChange={e => setSampleB(Number(e.target.value))} className="bg-white focus:ring-indigo-100" />
               </div>
               <div>
                 <Label helpText="Número de personas que realizaron la acción en este grupo.">Conversiones / Éxitos</Label>
                 <Input type="number" value={convB} onChange={e => setConvB(Number(e.target.value))} className="bg-white focus:ring-indigo-100" />
               </div>
               <div className="pt-6 border-t border-indigo-200/50 flex justify-between items-end">
                 <span className="text-xs font-bold text-indigo-400 uppercase">Tasa Observada</span>
                 <span className="text-4xl font-black text-indigo-600 tracking-tighter">{results?.rateB}%</span>
               </div>
             </div>
         </div>
       </div>
       {results && (
         <div className={`rounded-[2rem] p-8 flex flex-col md:flex-row items-start md:items-center gap-6 transition-all duration-500 ${results.isSignificant ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20' : 'bg-slate-100 text-slate-500'}`}>
            <div className={`p-4 rounded-full ${results.isSignificant ? 'bg-white/10 text-white animate-pulse' : 'bg-slate-200 text-slate-400'}`}>
               {results.isSignificant ? <Zap size={24} fill="currentColor"/> : <Activity size={24}/>}
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight mb-1">
                {results.isSignificant ? 'Diferencia Significativa Confirmada' : 'Ruido Estadístico (Sin Diferencia)'}
              </h4>
              <p className={`text-sm font-medium ${results.isSignificant ? 'text-slate-400' : 'text-slate-400'}`}>
                Z-Score: {results.zScore} — Confianza: {results.confidence}
              </p>
              <p className="text-xs mt-2 opacity-60">
                 {results.isSignificant 
                   ? "La probabilidad de que esta diferencia sea por azar es menor al 5%. Es seguro decir que un grupo es mejor que el otro." 
                   : "La diferencia es tan pequeña que podría deberse a la casualidad. No hay evidencia suficiente para declarar un ganador."}
              </p>
            </div>
         </div>
       )}
       <ExplanationSection 
          title="Prueba Z para Dos Proporciones"
          purpose="Validar si la diferencia observada entre dos grupos es 'real' (estadísticamente significativa) o si es producto del azar."
          whenToUse="En experimentos comparativos (Landing Page A vs B, Medicina A vs Placebo, Mensaje A vs Mensaje B)."
          interpretation="Si el Z-Score > 1.96, rechazamos la hipótesis nula. Esto significa que la diferencia es real con un 95% de confianza."
          formula="Z = (p1 - p2) / Error_Estándar"
       />
    </Card>
  );
}

// ----------------------------------------------------------------------
// 4. ESTRATIFICADO
// ----------------------------------------------------------------------
function StratifiedTool() {
  const [totalSample, setTotalSample] = useState(400);
  const [strata, setStrata] = useState([
    { id: 1, name: 'Sector Norte', population: 50 },
    { id: 2, name: 'Sector Sur', population: 150 },
    { id: 3, name: 'Sector Centro', population: 800 },
  ]);

  const addStratum = () => {
    setStrata([...strata, { id: Date.now(), name: 'Nuevo Grupo', population: 100 }]);
  };

  const removeStratum = (id) => {
    setStrata(strata.filter(s => s.id !== id));
  };

  const updateStratum = (id, field, value) => {
    setStrata(strata.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const totalPop = strata.reduce((acc, curr) => acc + Number(curr.population), 0);

  return (
    <Card className="p-8 lg:p-12">
      <div className="flex flex-col xl:flex-row gap-12">
        <div className="w-full xl:w-4/12 space-y-10">
           <div>
             <h2 className="text-3xl font-black tracking-tighter mb-2">Estratificación</h2>
             <p className="text-slate-500 font-medium text-sm">Distribución proporcional de la muestra.</p>
           </div>
           <div className="bg-slate-50 p-8 rounded-[2rem]">
             <div className="space-y-6">
               <Label helpText="El número total de encuestas que calculaste previamente con la herramienta de Muestra.">Muestra Objetivo (n)</Label>
               <Input 
                  type="number" 
                  value={totalSample} 
                  onChange={e => setTotalSample(Number(e.target.value))} 
                  className="bg-white text-3xl p-6" 
               />
             </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-slate-100 rounded-3xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Población Total</p>
                <p className="text-xl font-bold text-slate-900">{totalPop.toLocaleString()}</p>
              </div>
              <div className="p-5 bg-white border border-slate-100 rounded-3xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Factor (k)</p>
                <p className="text-xl font-bold text-slate-900">{(totalSample/totalPop*100).toFixed(1)}%</p>
              </div>
           </div>
        </div>
        <div className="w-full xl:w-8/12">
           <div className="flex justify-between items-center mb-8">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Matriz de Asignación Proporcional</h3>
             <button onClick={addStratum} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-black/10">
               <Plus size={14}/> Agregar Estrato
             </button>
           </div>
           <div className="space-y-3">
             <div className="grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <div className="col-span-5 md:col-span-4">Estrato / Grupo</div>
               <div className="col-span-3 md:col-span-3">Población (Ni)</div>
               <div className="col-span-3 md:col-span-4 text-right pr-4">Muestra (ni)</div>
               <div className="col-span-1"></div>
             </div>
             {strata.map((s, idx) => {
               const weight = s.population / totalPop;
               const allocation = Math.round(weight * totalSample);
               return (
                 <div key={s.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                    <div className="col-span-5 md:col-span-4">
                      <input 
                        type="text" 
                        value={s.name} 
                        onChange={e => updateStratum(s.id, 'name', e.target.value)} 
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-900 outline-none focus:ring-0 placeholder-slate-300"
                        placeholder="Nombre del grupo..."
                      />
                    </div>
                    <div className="col-span-3 md:col-span-3">
                      <input 
                        type="number" 
                        value={s.population} 
                        onChange={e => updateStratum(s.id, 'population', Number(e.target.value))} 
                        className="w-full bg-transparent border-none p-0 text-sm font-medium text-slate-500 focus:text-black outline-none"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-4 flex justify-end pr-4">
                      <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold min-w-[3rem] text-center shadow-lg shadow-slate-900/10">
                        {isNaN(allocation) ? 0 : allocation}
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button 
                        onClick={() => removeStratum(s.id)} 
                        className="w-8 h-8 flex items-center justify-center rounded-full text-slate-300 hover:bg-rose-50 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </div>
                 </div>
               );
             })}
           </div>
           <ExplanationSection 
              title="Afijación Proporcional"
              purpose="Evitar sesgos asegurando que cada subgrupo esté representado en la muestra exactamente en la misma proporción que en la realidad."
              whenToUse="Cuando la población es heterogénea (ej: una empresa con 90% operarios y 10% directivos). Un sorteo simple podría dejar fuera a los directivos; este método asegura que se encueste al % correcto de cada uno."
              interpretation="La columna 'Muestra (ni)' indica cuántas encuestas debes hacer OBLIGATORIAMENTE en ese grupo para mantener la validez estadística."
              formula="ni = n * (Ni / N)"
            />
        </div>
      </div>
    </Card>
  );
}

// ----------------------------------------------------------------------
// 5. COSTOS
// ----------------------------------------------------------------------
function CostEstimatorTool() {
  const [sampleSize, setSampleSize] = useState(384);
  const [cpi, setCpi] = useState(5.00); 
  const [incidence, setIncidence] = useState(100); 
  const [length, setLength] = useState(10); 

  const qualifies = incidence / 100;
  const contactsNeeded = Math.ceil(sampleSize / qualifies);
  const totalCost = sampleSize * cpi;
  const totalHours = Math.ceil((sampleSize * length) / 60);

  const efficiencyLabel = incidence < 30 ? 'Crítica (<30%)' : incidence < 70 ? 'Media (30-70%)' : 'Alta (>70%)';
  const efficiencyColor = incidence < 30 ? 'text-rose-600 bg-rose-50' : incidence < 70 ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50';

  return (
    <Card className="p-8 lg:p-12">
      <div className="mb-10">
         <h2 className="text-3xl font-black tracking-tighter mb-2">Estimación de Recursos</h2>
         <p className="text-slate-500 font-medium text-sm">Proyección de viabilidad y costos operativos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <div className="lg:col-span-5 space-y-8">
             <div className="p-8 bg-slate-50 rounded-[2.5rem] space-y-6">
               <div>
                 <Label helpText="El número de encuestas completas que necesitas al final.">Muestra Objetivo</Label>
                 <Input type="number" value={sampleSize} onChange={e => setSampleSize(Number(e.target.value))} className="bg-white" />
               </div>
               <div>
                 <Label helpText="Costo por encuesta efectiva (incluye incentivos, honorarios de encuestador, plataforma, etc).">Costo Unitario ($)</Label>
                 <Input type="number" value={cpi} onChange={e => setCpi(Number(e.target.value))} className="bg-white" />
               </div>
             </div>
             <div className="px-4">
                <div className="flex justify-between mb-4 items-center">
                  <Label helpText="Porcentaje de la población general que cumple con los requisitos para responder tu encuesta.">Incidencia (IR)</Label>
                  <span className="text-sm font-bold text-slate-900 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-sm">{incidence}%</span>
                </div>
                <input type="range" min="10" max="100" value={incidence} onChange={e => setIncidence(Number(e.target.value))} className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-black" />
                <p className="text-xs text-slate-400 mt-3 font-medium leading-relaxed">
                  Afecta directamente el número de intentos fallidos.
                </p>
             </div>
             <div className="px-4">
                <Label>Duración Promedio (min)</Label>
                <div className="mt-4 flex items-baseline gap-2">
                   <Input type="number" value={length} onChange={e => setLength(Number(e.target.value))} className="w-24 text-center bg-white border border-slate-200" />
                   <span className="text-slate-400 font-bold text-sm">minutos</span>
                </div>
             </div>
         </div>
         <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
            <div className="md:col-span-2 bg-black text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-white/20 transition-colors duration-500"></div>
               <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Presupuesto Estimado</p>
                 <p className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">${totalCost.toLocaleString()}</p>
               </div>
               <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-3 text-sm font-bold text-slate-300">
                  <Clock size={18} className="text-white"/> 
                  <span>{totalHours.toLocaleString()} horas estimadas de campo</span>
               </div>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
               <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Esfuerzo de Barrido</p>
                 <p className="text-4xl font-black text-slate-900">{contactsNeeded.toLocaleString()}</p>
                 <p className="text-xs text-slate-500 font-bold mt-1">Intentos Totales Necesarios</p>
               </div>
            </div>
            <div className={`p-8 rounded-[2.5rem] flex flex-col justify-between border ${incidence < 50 ? 'bg-rose-50/50 border-rose-100' : 'bg-emerald-50/50 border-emerald-100'}`}>
               <div>
                 <p className={`text-xs font-bold uppercase tracking-widest mb-3 text-slate-400`}>Eficiencia de Campo</p>
                 <p className={`text-2xl font-black ${efficiencyColor} bg-transparent`}>
                   {efficiencyLabel}
                 </p>
               </div>
               <div className={`mt-4 text-[10px] leading-tight font-medium opacity-80 ${incidence < 50 ? 'text-rose-800' : 'text-emerald-800'}`}>
                 {incidence < 50 
                   ? "El costo de encontrar a alguien calificado es alto. Se descarta a la mayoría." 
                   : "La mayoría de los contactados califica. Costo de búsqueda bajo."}
               </div>
            </div>
         </div>
      </div>
      <ExplanationSection 
        title="Impacto de la Tasa de Incidencia (IR)"
        purpose="Calcular el 'Costo de Búsqueda'. No basta con pagar por las encuestas completas; hay un costo operativo en llamar/contactar a gente que al final no califica para el estudio."
        whenToUse="Esencial cuando el estudio tiene filtros demográficos o de comportamiento (ej: 'Solo dueños de gatos')."
        interpretation={`Con una incidencia del ${incidence}%, por cada 10 llamadas que hagas, solo ${incidence/10} personas calificarán. El resto es tiempo perdido que debe presupuestarse.`}
        benchmarks={[
            "IR > 70%: Estudio General (Población Masiva)",
            "IR 30%-70%: Estudio Segmentado (Ej: Solo Mujeres)",
            "IR < 30%: Estudio de Nicho (Ej: Médicos, Dueños de autos de lujo)"
        ]}
        formula="Total_Contactos = Muestra_Objetivo / (Incidencia %)"
      />
    </Card>
  );
}

// ----------------------------------------------------------------------
// 6. GUÍA DE MUESTREO
// ----------------------------------------------------------------------
function SamplingGuideTool() {
  return (
    <Card className="p-8 lg:p-12">
      <div className="mb-10">
         <h2 className="text-3xl font-black tracking-tighter mb-2">Selector de Método</h2>
         <p className="text-slate-500 font-medium text-sm">¿Qué tipo de muestreo necesita tu estudio?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white rounded-[2rem] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-[80px] -mr-20 -mt-20"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/10 rounded-xl">
                        <BarChart3 size={24} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Probabilístico</h3>
                        <p className="text-xs text-slate-400 uppercase tracking-widest">El Estándar Científico</p>
                    </div>
                </div>
                <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                    Todos los individuos tienen una probabilidad conocida (no cero) de ser seleccionados. Permite calcular el margen de error y generalizar resultados (inferencia estadística).
                </p>
                <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <h4 className="font-bold text-emerald-300 text-sm mb-1">Aleatorio Simple</h4>
                        <p className="text-xs text-slate-400">Sorteo puro. Requiere lista completa.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <h4 className="font-bold text-emerald-300 text-sm mb-1">Estratificado</h4>
                        <p className="text-xs text-slate-400">Divide en grupos clave y sortea dentro de ellos para asegurar representación.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <h4 className="font-bold text-emerald-300 text-sm mb-1">Por Conglomerados</h4>
                        <p className="text-xs text-slate-400">Selecciona grupos naturales (ej: escuelas, manzanas) al azar.</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Requisitos:</p>
                    <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                        <li>Marco muestral (lista de contactos) completo.</li>
                        <li>Aleatoriedad estricta en la selección.</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 relative overflow-hidden group">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <Target size={24} className="text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">No Probabilístico</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">El Estándar Práctico</p>
                    </div>
                </div>
                <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                    La selección depende del criterio del investigador o la disponibilidad. No permite cálculo riguroso de error, pero es útil para exploración o cuando no hay lista completa.
                </p>
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-bold text-indigo-600 text-sm mb-1">Por Cuotas</h4>
                        <p className="text-xs text-slate-500">Imita la composición demográfica (ej: 50% hombres) pero elige a dedo.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-bold text-indigo-600 text-sm mb-1">Bola de Nieve</h4>
                        <p className="text-xs text-slate-500">Los participantes reclutan a otros. Ideal para poblaciones ocultas.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <h4 className="font-bold text-indigo-600 text-sm mb-1">Conveniencia</h4>
                        <p className="text-xs text-slate-500">Lo que esté a mano (ej: encuestar en la calle). Alto sesgo.</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Uso Común:</p>
                    <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                        <li>Estudios de mercado rápidos.</li>
                        <li>Pruebas piloto.</li>
                        <li>Cuando es imposible tener lista de todos.</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
       <ExplanationSection 
          title="¿Cuál debo elegir?"
          purpose="Definir la validez externa del estudio. La elección dicta si puedes decir 'La población piensa X' o solo 'Mis encuestados piensan X'."
          whenToUse="Fase de diseño de investigación."
          interpretation="Si usas No Probabilístico, técnicamente no puedes reportar Margen de Error, aunque la industria a menudo lo hace como 'referencia'. Sé honesto con las limitaciones."
          formula="Validez = Representatividad vs. Viabilidad"
       />
    </Card>
  );
}

// ----------------------------------------------------------------------
// 7. CASOS DE USO
// ----------------------------------------------------------------------
function CaseStudiesTool() {
    const cases = [
        {
            title: "Escenario Político / Electoral",
            subtitle: "Alta Sensibilidad",
            icon: <AlertTriangle size={24} className="text-rose-500"/>,
            color: "rose",
            context: "Elección reñida donde cada punto porcentual define al ganador. Requiere máxima certeza.",
            params: {
                pop: "Infinita",
                conf: "99% (Z=2.58)",
                error: "2%",
                result: "~4,147 encuestas"
            },
            reason: "El error debe ser menor a la diferencia entre candidatos para predecir con éxito."
        },
        {
            title: "Lanzamiento de Producto (MVP)",
            subtitle: "Lean Startup",
            icon: <Zap size={24} className="text-amber-500"/>,
            color: "amber",
            context: "Startup validando si la gente compraría una nueva app. Prioriza velocidad y presupuesto.",
            params: {
                pop: "Infinita",
                conf: "90% (Z=1.65)",
                error: "7%",
                result: "~139 encuestas"
            },
            reason: "No necesitas precisión milimétrica para saber si una idea 'gusta o no gusta'. Ahorra recursos."
        },
        {
            title: "Clima Laboral Interno",
            subtitle: "Población Finita",
            icon: <Briefcase size={24} className="text-indigo-500"/>,
            color: "indigo",
            context: "Empresa mediana que quiere medir satisfacción de sus empleados.",
            params: {
                pop: "500 empleados",
                conf: "95% (Z=1.96)",
                error: "5%",
                result: "217 encuestas"
            },
            reason: "Al ser pocos individuos (N<100,000), el factor de corrección reduce drásticamente la muestra necesaria."
        }
    ];

    return (
        <Card className="p-8 lg:p-12">
            <div className="mb-10">
                <h2 className="text-3xl font-black tracking-tighter mb-2">Casos Prácticos</h2>
                <p className="text-slate-500 font-medium text-sm">Referencias rápidas para tomar decisiones.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cases.map((c, i) => (
                    <div key={i} className={`bg-${c.color}-50/50 border border-${c.color}-100 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 group`}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                                {c.icon}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest text-${c.color}-600 bg-white px-2 py-1 rounded-lg`}>
                                {c.subtitle}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{c.title}</h3>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed">{c.context}</p>
                        <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-100 mb-4">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400 font-medium">Confianza:</span>
                                <span className="font-bold text-slate-700">{c.params.conf}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400 font-medium">Margen Error:</span>
                                <span className="font-bold text-slate-700">±{c.params.error}</span>
                            </div>
                            <div className="pt-2 mt-2 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-slate-400">Muestra:</span>
                                <span className={`font-black text-lg text-${c.color}-600`}>{c.params.result}</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 italic leading-relaxed border-l-2 pl-3 border-slate-200">
                            "{c.reason}"
                        </p>
                    </div>
                ))}
            </div>
            <ExplanationSection 
                title="Contexto mata Fórmula"
                purpose="Entender que el número mágico '384' (error 5%, confianza 95%) no es una ley universal. El diseño muestral debe adaptarse al riesgo que estás dispuesto a correr."
                whenToUse="Antes de usar la calculadora de la pestaña 1."
                interpretation="Usa estos ejemplos para defender tu presupuesto. Si tu jefe pide error del 1% con presupuesto cero, muéstrale el caso 'Político' para que vea el costo implicado."
                formula="Riesgo = (1 - Confianza) + Error"
            />
        </Card>
    );
}

// ----------------------------------------------------------------------
// 8. ESTIMACIÓN DE DEMANDA (5-LAYER FUNNEL)
// ----------------------------------------------------------------------
function DemandEstimationTool() {
  const [universe, setUniverse] = useState(100000); 
  const [potentialPct, setPotentialPct] = useState(100); 
  const [availablePct, setAvailablePct] = useState(80); 
  const [targetPct, setTargetPct] = useState(50); 
  const [penetratedPct, setPenetratedPct] = useState(10); 
  const [frequency, setFrequency] = useState(1);

  const potentialMarket = Math.floor(universe * (potentialPct / 100));
  const availableMarket = Math.floor(potentialMarket * (availablePct / 100));
  const targetMarket = Math.floor(availableMarket * (targetPct / 100));
  const penetratedMarket = Math.floor(targetMarket * (penetratedPct / 100));
  
  const totalUnits = penetratedMarket * frequency;

  return (
    <Card className="p-8 lg:p-12">
      <div className="flex flex-col xl:flex-row gap-12">
         <div className="w-full xl:w-5/12 space-y-8">
            <div>
               <h2 className="text-3xl font-black tracking-tighter mb-2 text-slate-900">Demanda Potencial</h2>
               <p className="text-slate-500 font-medium text-sm">Modelo de 5 Capas (Market Sizing).</p>
            </div>
            <div className="space-y-6">
               <div>
                  <Label helpText="Población Total (N) de la zona geográfica o demográfica.">1. Población Total</Label>
                  <Input type="number" value={universe} onChange={e => setUniverse(Number(e.target.value))} />
               </div>
               <div className="p-6 bg-slate-50 rounded-3xl space-y-6 border border-slate-100">
                  <div>
                      <div className="flex justify-between mb-2">
                          <Label helpText="% que tiene la necesidad o el problema que resuelves (TAM).">2. % Mercado Potencial</Label>
                          <span className="text-xs font-bold">{potentialPct}%</span>
                      </div>
                      <input type="range" min="1" max="100" value={potentialPct} onChange={e => setPotentialPct(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-full accent-indigo-600 appearance-none cursor-pointer"/>
                  </div>
                  <div>
                      <div className="flex justify-between mb-2">
                          <Label helpText="% del Potencial que tiene acceso a tu canal y capacidad de pago (SAM).">3. % Mercado Disponible</Label>
                          <span className="text-xs font-bold">{availablePct}%</span>
                      </div>
                      <input type="range" min="1" max="100" value={availablePct} onChange={e => setAvailablePct(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-full accent-indigo-600 appearance-none cursor-pointer"/>
                  </div>
                  <div>
                      <div className="flex justify-between mb-2">
                          <Label helpText="% del Disponible al que decides enfocarte por estrategia o presupuesto (Target).">4. % Mercado Objetivo</Label>
                          <span className="text-xs font-bold">{targetPct}%</span>
                      </div>
                      <input type="range" min="1" max="100" value={targetPct} onChange={e => setTargetPct(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-full accent-indigo-600 appearance-none cursor-pointer"/>
                  </div>
                  <div>
                      <div className="flex justify-between mb-2">
                          <Label helpText="% del Objetivo que realmente logras capturar o convertir (SOM).">5. % Mercado Penetrado</Label>
                          <span className="text-xs font-bold">{penetratedPct}%</span>
                      </div>
                      <input type="range" min="1" max="100" value={penetratedPct} onChange={e => setPenetratedPct(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-full accent-emerald-500 appearance-none cursor-pointer"/>
                  </div>
               </div>
               <div>
                  <Label helpText="Cuántas veces al año comprará el producto un usuario promedio.">Frecuencia de Consumo (Anual)</Label>
                  <div className="flex items-center gap-4">
                     <Input type="number" value={frequency} onChange={e => setFrequency(Number(e.target.value))} className="text-center font-black"/>
                     <span className="text-sm font-bold text-slate-400">unidades/año</span>
                  </div>
               </div>
            </div>
         </div>
         <div className="w-full xl:w-7/12">
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 h-full relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>

                <div className="relative z-10 space-y-8">
                   <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                         <ShoppingBag size={24} className="text-emerald-400"/>
                      </div>
                      <div>
                         <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Demanda Total Estimada (Q)</p>
                         <h3 className="text-5xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                            {totalUnits.toLocaleString()}
                         </h3>
                         <p className="text-emerald-400 font-bold text-sm mt-1">Unidades por año</p>
                      </div>
                   </div>

                   {/* FUNNEL VIZ */}
                   <div className="space-y-2 pt-8">
                      <div className="flex justify-between items-end mb-4">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Embudo de Mercado (Bottom-Up)</p>
                          <div className="flex items-center gap-1 text-[9px] text-slate-500 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 cursor-help" title="Se aplica un ancho mínimo a las barras para que el texto sea legible, por lo que visualmente no representan la proporción exacta del 100%.">
                             <AlertTriangle size={10} className="text-amber-500"/>
                             <span>Escala Ajustada por Legibilidad</span>
                          </div>
                      </div>
                      
                      <div className="relative h-10 bg-slate-800 rounded-r-2xl w-full flex items-center px-4 border-l-4 border-slate-600 group min-w-[220px]">
                         <span className="text-[10px] font-bold text-slate-400 w-32 uppercase">1. Población Total</span>
                         <span className="text-xs font-bold ml-auto">{universe.toLocaleString()}</span>
                      </div>
                      
                      <div className="relative h-10 bg-indigo-900/30 rounded-r-2xl flex items-center px-4 border-l-4 border-indigo-300/30 transition-all duration-500 min-w-[220px]" style={{width: `${Math.max(10, (potentialMarket/universe)*100)}%`}}>
                         <span className="text-[10px] font-bold text-indigo-200 w-32 uppercase">2. Potencial</span>
                         <span className="text-xs font-bold ml-auto text-indigo-100">{potentialMarket.toLocaleString()}</span>
                      </div>

                      <div className="relative h-10 bg-indigo-900/60 rounded-r-2xl flex items-center px-4 border-l-4 border-indigo-400/50 transition-all duration-500 min-w-[220px]" style={{width: `${Math.max(10, (availableMarket/universe)*100)}%`}}>
                         <span className="text-[10px] font-bold text-indigo-100 w-32 uppercase">3. Disponible</span>
                         <span className="text-xs font-bold ml-auto">{availableMarket.toLocaleString()}</span>
                      </div>

                      <div className="relative h-10 bg-indigo-600 rounded-r-2xl flex items-center px-4 border-l-4 border-indigo-400 transition-all duration-500 min-w-[220px]" style={{width: `${Math.max(10, (targetMarket/universe)*100)}%`}}>
                         <span className="text-[10px] font-bold text-white w-32 uppercase">4. Objetivo</span>
                         <span className="text-xs font-bold ml-auto">{targetMarket.toLocaleString()}</span>
                      </div>

                      <div className="relative h-10 bg-emerald-500 rounded-r-2xl flex items-center px-4 border-l-4 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500 min-w-[220px]" style={{width: `${Math.max(10, (penetratedMarket/universe)*100)}%`}}>
                         <span className="text-[10px] font-bold text-black w-32 uppercase">5. Penetrado</span>
                         <span className="text-xs font-black text-black ml-auto">{penetratedMarket.toLocaleString()}</span>
                      </div>
                   </div>

                   <div className="text-[10px] text-slate-500 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 flex gap-2">
                       <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5"/>
                       <p>
                           <strong>Nota de Transparencia:</strong> Para asegurar que los textos sean legibles, las barras inferiores tienen un "ancho mínimo" forzado. 
                           Esto significa que el gráfico <em>no es matemáticamente proporcional</em> (ej: la barra del 1% se muestra más ancha de lo que es en realidad). 
                           Guíese siempre por los números a la derecha.
                       </p>
                   </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 text-xs text-slate-400 leading-relaxed max-w-lg">
                   Este modelo visualiza la reducción realista de tu mercado. Desde la población general hasta los clientes que efectivamente te compran.
                </div>
            </div>
         </div>
      </div>
      <ExplanationSection 
          title="Las 5 Capas de Mercado"
          purpose="Afinar la puntería. Ir más allá de 'todos son mis clientes' para identificar quién realmente te sostiene financieramente."
          whenToUse="Obligatorio en Business Plans y Pitch Decks para inversores."
          interpretation={`De una población de ${universe.toLocaleString()}, tu mercado real es de ${penetratedMarket.toLocaleString()} personas. Esta es tu base de clientes pagadores.`}
          formula="Penetrado = Objetivo * % Conversión"
          benchmarks={[
             "TAM (Potencial): La visión grande.",
             "SAM (Disponible): Lo realista hoy.",
             "SOM (Penetrado): Lo que vas a capturar a corto plazo."
          ]}
       />
    </Card>
  );
}