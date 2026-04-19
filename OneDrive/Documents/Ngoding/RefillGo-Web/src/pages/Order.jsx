import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Droplets, Flame, Diamond, Leaf, ChevronRight, Calendar, Clock, Fuel, Info } from 'lucide-react';

const FUELS = [
  { id:'pertalite', name:'Pertalite', octane:'RON 90', price:10000, color:'text-success', bg:'bg-success/10', icon:<Droplets size={28} />, tags:['Eco-Friendly','Standard'], desc:'Best for city driving. Lower emissions and gentle on the engine.' },
  { id:'pertamax', name:'Pertamax', octane:'RON 92', price:12950, color:'text-primary', bg:'bg-primary/10', icon:<Flame size={28} />, tags:['Most Popular','Performance'], desc:'Premium fuel for optimal engine performance and fuel efficiency.' },
  { id:'pertamax-turbo', name:'Pertamax Turbo', octane:'RON 98', price:14650, color:'text-warning', bg:'bg-warning/10', icon:<Flame size={28} />, tags:['High-Octane','Sport'], desc:'Maximum performance fuel for turbocharged and high-compression engines.' },
  { id:'dex', name:'Pertamina Dex', octane:'CN 53', price:15100, color:'text-purple', bg:'bg-purple/10', icon:<Diamond size={28} />, tags:['Diesel','Premium'], desc:'Ultra-clean diesel for modern diesel engines with DPF systems.' },
];

const SkeletonLoader = () => (
  <div className="space-y-4">
    {[1,2,3].map(i => <div key={i} className="skeleton h-20 w-full" />)}
  </div>
);

export default function Order() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedFuel, setSelectedFuel] = useState('pertamax');
  const [liters, setLiters] = useState(30);
  const [schedule, setSchedule] = useState('now');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const fuel = FUELS.find(f => f.id === selectedFuel);
  const subtotal = fuel ? fuel.price * liters : 0;
  const delivery = 15000;
  const tax = Math.round(subtotal * 0.011);
  const total = subtotal + delivery + tax;

  const fmt = n => `Rp ${n.toLocaleString('id-ID')}`;

  const timeSlots = ['08:00','10:00','12:00','14:00','16:00','18:00'];

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="sticky top-0 z-10 glass border-b border-divider px-8 py-5 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-black text-label">Order Fuel</h1>
          <p className="text-sm text-gray-400">Configure your refill</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — configurator */}
          <div className="lg:col-span-2 space-y-6">

            {/* Fuel type picker */}
            <div className="card p-6">
              <h2 className="font-bold text-label text-lg mb-5">Select Fuel Type</h2>
              {loading ? <SkeletonLoader /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FUELS.map(f => (
                    <motion.button
                      key={f.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedFuel(f.id)}
                      className={`relative p-5 rounded-3xl border-2 text-left transition-all duration-200 ${selectedFuel === f.id ? 'border-primary bg-primary/5' : 'border-divider bg-white hover:border-gray-300'}`}
                    >
                      <div className={`w-12 h-12 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-4`}>{f.icon}</div>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-label text-base">{f.name}</h3>
                        {selectedFuel === f.id && (
                          <motion.div initial={{scale:0}} animate={{scale:1}} className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
                          </motion.div>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-3">{f.octane} · {f.desc.slice(0,48)}…</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {f.tags.map(t => (
                          <span key={t} className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${f.bg} ${f.color}`}>{t}</span>
                        ))}
                      </div>
                      <p className="font-black text-label text-lg">{fmt(f.price)}<span className="text-xs font-normal text-gray-400">/L</span></p>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Amount slider */}
            <div className="card p-6">
              <h2 className="font-bold text-label text-lg mb-5">Select Amount</h2>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-5xl font-black text-label">{liters}</span>
                  <span className="text-xl font-semibold text-gray-400 ml-2">Liters</span>
                </div>
                <motion.div
                  key={subtotal}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="text-right"
                >
                  <p className="text-2xl font-black text-primary">{fmt(subtotal)}</p>
                  <p className="text-xs text-gray-400">Fuel cost only</p>
                </motion.div>
              </div>
              <input
                type="range" min={5} max={60} step={1}
                value={liters}
                onChange={e => setLiters(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>5L</span><span>30L</span><span>60L</span>
              </div>
              {/* Presets */}
              <div className="flex gap-3 mt-5">
                {[20,30,40,50].map(l => (
                  <button key={l} onClick={() => setLiters(l)} className={`flex-1 py-2.5 rounded-2xl text-sm font-semibold transition-all ${liters === l ? 'bg-label text-white' : 'bg-surface text-gray-500 hover:bg-gray-200'}`}>{l}L</button>
                ))}
              </div>
            </div>

            {/* Scheduler */}
            <div className="card p-6">
              <h2 className="font-bold text-label text-lg mb-5">Schedule Delivery</h2>
              <div className="flex gap-3 mb-6">
                {[['now','Deliver Now (30 min)',<Clock size={16}/>],['later','Schedule for Later',<Calendar size={16}/>]].map(([id,label,icon]) => (
                  <button key={id} onClick={() => setSchedule(id)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all ${schedule===id ? 'bg-primary text-white shadow-glow' : 'bg-surface text-gray-500 hover:bg-gray-200'}`}>
                    {icon}{label}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {schedule === 'later' && (
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3}}>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div>
                        <label className="section-label block mb-2">Date</label>
                        <input type="date" value={selectedDate} onChange={e=>setSelectedDate(e.target.value)} className="input" />
                      </div>
                      <div>
                        <label className="section-label block mb-2">Time Slot</label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map(t => (
                            <button key={t} onClick={() => setSelectedTime(t)} className={`py-2 rounded-xl text-sm font-medium transition-all ${selectedTime===t ? 'bg-primary text-white' : 'bg-surface text-gray-500 hover:bg-gray-200'}`}>{t}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {schedule === 'now' && (
                <div className="flex items-center gap-3 p-4 bg-success/8 rounded-2xl">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
                  <p className="text-sm font-medium text-success">3 trucks available nearby. Estimated arrival: <strong>25–35 minutes</strong>.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right — order summary */}
          <div className="space-y-4 sticky top-28 self-start">
            <div className="card p-6">
              <h2 className="font-bold text-label text-lg mb-5">Order Summary</h2>
              {loading ? <SkeletonLoader /> : (
                <>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-3 p-3 bg-surface rounded-2xl">
                      <div className={`w-10 h-10 rounded-xl ${fuel?.bg} ${fuel?.color} flex items-center justify-center`}>{fuel?.icon}</div>
                      <div>
                        <p className="font-semibold text-label text-sm">{fuel?.name}</p>
                        <p className="text-xs text-gray-400">{liters}L × {fmt(fuel?.price)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5 border-t border-divider pt-4">
                    {[['Fuel Cost', fmt(subtotal)],['Delivery Fee', fmt(delivery)],['Service Tax (1.1%)', fmt(tax)]].map(([l,v]) => (
                      <div key={l} className="flex justify-between text-sm">
                        <span className="text-gray-400">{l}</span>
                        <span className="font-medium text-label">{v}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-black text-base pt-3 border-t border-divider">
                      <span>Total</span>
                      <motion.span key={total} initial={{scale:1.1,color:'#007AFF'}} animate={{scale:1,color:'#000'}} transition={{duration:0.3}}>{fmt(total)}</motion.span>
                    </div>
                  </div>
                  <Link to="/payment">
                    <button className="btn-primary w-full mt-5">
                      Continue to Payment <ChevronRight size={18} />
                    </button>
                  </Link>
                  <p className="flex items-center gap-1.5 text-xs text-gray-400 justify-center mt-3">
                    <Info size={12} /> Prices include all applicable taxes
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
