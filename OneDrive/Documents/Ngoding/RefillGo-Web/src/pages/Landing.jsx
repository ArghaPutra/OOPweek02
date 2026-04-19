import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Shield, Clock, MapPin, Star, ChevronRight, Fuel, Truck, Navigation } from 'lucide-react';

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function Landing() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ── Floating Navbar ── */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <nav className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-card">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Fuel size={16} className="text-white" />
            </div>
            <span className="font-bold text-label text-lg tracking-tight">RefillGo</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#features" className="hover:text-label transition-colors">Features</a>
            <a href="#how" className="hover:text-label transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-label transition-colors">Pricing</a>
          </div>
          <Link to="/dashboard">
            <button className="btn-primary text-sm py-2 px-5">Open App</button>
          </Link>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl mx-auto">
          <motion.div variants={fade} className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
            Now available in Jakarta & Surabaya
          </motion.div>

          <motion.h1 variants={fade} className="text-6xl md:text-8xl font-black tracking-tight text-label leading-[1.05] mb-6">
            Fuel Delivered<br />
            <span className="text-primary">To Your Door.</span>
          </motion.h1>

          <motion.p variants={fade} className="text-xl text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Premium on-demand fuel delivery. No queues, no gas stations. Just tap, and we bring the fuel to wherever you are.
          </motion.p>

          <motion.div variants={fade} className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/dashboard">
              <button className="btn-primary text-base py-4 px-8 rounded-2xl shadow-glow">
                <Zap size={20} />
                Start Refilling
              </button>
            </Link>
            <button className="btn-ghost text-base py-4 px-8 rounded-2xl">
              Watch Demo <ChevronRight size={18} />
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={fade} className="flex items-center justify-center gap-6 mt-12">
            <div className="flex -space-x-2">
              {['bg-orange-400','bg-blue-400','bg-green-400','bg-purple-400'].map((c,i) => (
                <div key={i} className={`w-9 h-9 rounded-full ${c} border-2 border-white`} />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_,i) => <Star key={i} size={14} className="text-warning fill-warning" />)}
              </div>
              <p className="text-sm text-gray-400 mt-0.5">Loved by <strong className="text-label">50,000+</strong> drivers</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative w-full max-w-3xl mx-auto"
        >
          <div className="rounded-4xl overflow-hidden shadow-heavy border border-gray-100 bg-surface">
            <div className="h-80 bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 50% 50%, #007AFF 1px, transparent 1px)', backgroundSize:'32px 32px'}} />
              <div className="animate-float relative z-10">
                <div className="w-48 h-32 rounded-3xl bg-white shadow-heavy flex items-center justify-center">
                  <Truck size={64} className="text-primary" />
                </div>
                <div className="mt-4 text-center">
                  <p className="font-bold text-label">Fuel Truck #07</p>
                  <p className="text-sm text-success font-medium">2.3 km away • ETA 8 min</p>
                </div>
              </div>
              {/* Floating map pins */}
              {[{x:'20%',y:'30%',c:'bg-success'},{x:'75%',y:'20%',c:'bg-warning'},{x:'60%',y:'70%',c:'bg-primary'}].map((p,i) => (
                <div key={i} className={`absolute w-6 h-6 rounded-full ${p.c} border-2 border-white shadow-card flex items-center justify-center`} style={{left:p.x,top:p.y}}>
                  <MapPin size={12} className="text-white" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Bento Grid Features ── */}
      <section id="features" className="py-24 px-4 bg-surface">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="text-center mb-16">
            <p className="section-label mb-3">Why RefillGo</p>
            <h2 className="text-4xl font-black text-label tracking-tight">Everything you need,<br/>nothing you don't.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large card */}
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="md:col-span-2 card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -translate-y-12 translate-x-12" />
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Zap size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-label mb-3">Order in Seconds</h3>
              <p className="text-gray-400 leading-relaxed">Three taps and you're done. Select your fuel type, set a delivery point, and confirm. No queues. No small talk.</p>
              <div className="mt-6 flex gap-3">
                {['Pertalite','Pertamax','Dex'].map(f => (
                  <span key={f} className="badge bg-primary/10 text-primary">{f}</span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.1}} className="card p-8">
              <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center mb-6">
                <Shield size={24} className="text-success" />
              </div>
              <h3 className="text-xl font-bold text-label mb-3">Professional Delivery</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Certified technicians. ISO-compliant equipment. Your vehicle is safe with us.</p>
            </motion.div>

            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.15}} className="card p-8">
              <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center mb-6">
                <Clock size={24} className="text-warning" />
              </div>
              <h3 className="text-xl font-bold text-label mb-3">30‑Min Guarantee</h3>
              <p className="text-gray-400 text-sm leading-relaxed">We deliver within 30 minutes or your next order is free.</p>
            </motion.div>

            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.2}} className="md:col-span-2 card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-success/5 rounded-full -translate-y-12 translate-x-12" />
              <div className="w-12 h-12 rounded-2xl bg-purple/10 flex items-center justify-center mb-6">
                <Navigation size={24} className="text-purple" />
              </div>
              <h3 className="text-2xl font-bold text-label mb-3">Real‑Time Tracking</h3>
              <p className="text-gray-400 leading-relaxed">Watch your fuel truck navigate to you on a live map. Know exactly when to expect delivery — down to the minute.</p>
              <div className="mt-6 h-2 bg-surface rounded-full overflow-hidden">
                <motion.div className="h-2 bg-primary rounded-full" initial={{width:'0%'}} whileInView={{width:'72%'}} viewport={{once:true}} transition={{duration:1.2, delay:0.3}} />
              </div>
              <p className="text-xs text-gray-400 mt-2">Truck #07 — 72% of route complete</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label mb-3">How it works</p>
          <h2 className="text-4xl font-black text-label tracking-tight mb-16">Three steps to a full tank.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { n:'01', icon: <MapPin size={28} className="text-primary" />, title:'Pin Your Location', desc:'Share your GPS pin or type an address. Our trucks cover the entire city.' },
              { n:'02', icon: <Fuel size={28} className="text-warning" />, title:'Choose Your Fuel', desc:'Select fuel type and quantity. Prices are always live — no hidden fees.' },
              { n:'03', icon: <Zap size={28} className="text-success" />, title:'Confirm & Relax', desc:'One-tap Apple Pay checkout. Your fuel arrives while you carry on.' },
            ].map((s,i) => (
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6, delay:i*0.15}} className="flex flex-col items-center">
                <div className="text-7xl font-black text-gray-100 mb-4 select-none">{s.n}</div>
                <div className="w-16 h-16 rounded-3xl bg-surface flex items-center justify-center mb-4 -mt-10">{s.icon}</div>
                <h3 className="font-bold text-label text-xl mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4">
        <motion.div initial={{opacity:0,scale:0.96}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.6}} className="max-w-3xl mx-auto rounded-4xl bg-primary p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{backgroundImage:'radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)', backgroundSize:'24px 24px'}} />
          <h2 className="text-4xl font-black text-white mb-4 relative">Ready for your first refill?</h2>
          <p className="text-blue-100 mb-8 relative">Join 50,000+ drivers who never wait at a gas station again.</p>
          <Link to="/dashboard">
            <button className="bg-white text-primary font-bold text-lg py-4 px-10 rounded-2xl hover:shadow-heavy transition-all active:scale-95 relative">
              Get Started Free
            </button>
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-4 text-center text-gray-400 text-sm border-t border-divider">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Fuel size={12} className="text-white" />
          </div>
          <span className="font-bold text-label">RefillGo</span>
        </div>
        <p>© 2026 RefillGo. Premium fuel delivery, everywhere.</p>
      </footer>
    </div>
  );
}
