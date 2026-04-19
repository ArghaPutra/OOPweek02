import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, User, Car, CreditCard, Shield, Bell,
  Plus, Trash2, ChevronRight, Camera, Key, Smartphone, Mail, MessageSquare
} from 'lucide-react';

const VEHICLES = [
  { id:1, name:'Honda CR-V', plate:'B 1234 ABC', fuel:'Pertamax', color:'bg-blue-500' },
  { id:2, name:'Toyota Avanza', plate:'B 5678 DEF', fuel:'Pertalite', color:'bg-orange-400' },
];

const CARDS = [
  { type:'Visa', last4:'4242', exp:'08/28', color:'from-gray-800 to-gray-900', default:true },
  { type:'Mastercard', last4:'8891', exp:'03/27', color:'from-purple-700 to-purple-900', default:false },
  { type:'GoPay', last4:'', exp:'balance Rp 1.2M', color:'from-green-500 to-green-600', default:false },
];

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} className={`toggle flex-shrink-0 ${value ? 'bg-primary' : 'bg-gray-300'}`}>
      <motion.span animate={{x: value ? 20 : 0}} transition={{type:'spring',stiffness:500,damping:30}} className="toggle-thumb"/>
    </button>
  );
}

function SectionCard({ title, icon, children }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-2xl bg-surface flex items-center justify-center text-gray-500">{icon}</div>
        <h2 className="font-bold text-label text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState(VEHICLES);
  const [twoFA, setTwoFA] = useState(true);
  const [sso, setSSO] = useState(false);
  const [notifs, setNotifs] = useState({ email:true, sms:true, push:false, marketing:false });
  const [name, setName] = useState('Budi Wijaya');
  const [email, setEmail] = useState('budi@email.com');
  const [phone, setPhone] = useState('+62 812 3456 7890');

  const deleteVehicle = id => setVehicles(vs => vs.filter(v => v.id !== id));

  return (
    <div className="min-h-screen bg-surface">
      <div className="sticky top-0 z-10 glass border-b border-divider px-8 py-5 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-black text-label">Settings</h1>
          <p className="text-sm text-gray-400">Account & preferences</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-8 space-y-6">

        {/* ── Profile ── */}
        <SectionCard title="Profile" icon={<User size={18}/>}>
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple flex items-center justify-center text-white text-3xl font-black">BW</div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-label flex items-center justify-center">
                <Camera size={14} className="text-white" />
              </button>
            </div>
            <p className="font-bold text-label text-xl mt-3">{name}</p>
            <p className="text-sm text-gray-400">Member since April 2024</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="section-label block mb-2">Full Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="input" />
            </div>
            <div>
              <label className="section-label block mb-2">Email Address</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} className="input" type="email" />
            </div>
            <div>
              <label className="section-label block mb-2">Phone Number</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} className="input" type="tel" />
            </div>
            <button className="btn-primary w-full mt-2">Save Profile</button>
          </div>
        </SectionCard>

        {/* ── Garage ── */}
        <SectionCard title="My Garage" icon={<Car size={18}/>}>
          <div className="space-y-3">
            {vehicles.map(v => (
              <motion.div key={v.id} layout initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,x:-20}} className="flex items-center gap-4 p-4 bg-surface rounded-2xl">
                <div className={`w-12 h-12 rounded-2xl ${v.color} flex items-center justify-center`}>
                  <Car size={22} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-label text-sm">{v.name}</p>
                  <p className="text-xs text-gray-400">{v.plate} · Fuel: {v.fuel}</p>
                </div>
                <button onClick={() => deleteVehicle(v.id)} className="w-9 h-9 rounded-full hover:bg-danger/10 flex items-center justify-center text-gray-300 hover:text-danger transition-colors">
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
            <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-divider text-gray-400 hover:border-primary hover:text-primary transition-all font-medium text-sm">
              <Plus size={18} /> Add Vehicle
            </button>
          </div>
        </SectionCard>

        {/* ── Payment Methods ── */}
        <SectionCard title="Payment Methods" icon={<CreditCard size={18}/>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CARDS.map((c,i) => (
              <div key={i} className={`relative rounded-3xl bg-gradient-to-br ${c.color} p-5 text-white overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
                {c.default && <span className="absolute top-3 right-3 text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">Default</span>}
                <p className="text-xs text-white/60 uppercase tracking-widest mb-4">{c.type}</p>
                <p className="font-mono text-base">{c.last4 ? `•••• •••• •••• ${c.last4}` : c.exp}</p>
                {c.last4 && <p className="text-xs text-white/60 mt-2">Exp {c.exp}</p>}
              </div>
            ))}
            <button className="rounded-3xl bg-surface border-2 border-dashed border-divider p-5 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-all min-h-32">
              <Plus size={24} />
              <span className="text-sm font-medium">Add Method</span>
            </button>
          </div>
        </SectionCard>

        {/* ── Security ── */}
        <SectionCard title="Security & Governance" icon={<Shield size={18}/>}>
          <div className="space-y-4">
            {[
              { label:'Two-Factor Authentication', desc:'Require a code from your phone to sign in', icon:<Smartphone size={16}/>, value:twoFA, onChange:setTwoFA },
              { label:'Single Sign-On (SSO)', desc:'Sign in with Google or Microsoft work account', icon:<Key size={16}/>, value:sso, onChange:setSSO },
            ].map(({label,desc,icon,value,onChange}) => (
              <div key={label} className="flex items-center justify-between p-4 bg-surface rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="text-gray-400">{icon}</div>
                  <div>
                    <p className="font-semibold text-label text-sm">{label}</p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </div>
                </div>
                <Toggle value={value} onChange={onChange} />
              </div>
            ))}
            <button className="flex items-center justify-between w-full p-4 bg-danger/5 rounded-2xl hover:bg-danger/10 transition-colors">
              <div className="flex items-center gap-3">
                <Key size={16} className="text-danger" />
                <span className="font-semibold text-danger text-sm">Change Password</span>
              </div>
              <ChevronRight size={16} className="text-danger" />
            </button>
          </div>
        </SectionCard>

        {/* ── Notifications ── */}
        <SectionCard title="Notification Preferences" icon={<Bell size={18}/>}>
          <div className="space-y-3">
            {[
              { key:'email', label:'Email Notifications', desc:'Order updates & receipts', icon:<Mail size={16}/> },
              { key:'sms', label:'SMS Alerts', desc:'Real-time delivery tracking', icon:<MessageSquare size={16}/> },
              { key:'push', label:'Web Push', desc:'Browser notifications', icon:<Bell size={16}/> },
              { key:'marketing', label:'Marketing Emails', desc:'Tips, promotions & offers', icon:<Mail size={16}/> },
            ].map(({key,label,desc,icon}) => (
              <div key={key} className="flex items-center justify-between p-4 bg-surface rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="text-gray-400">{icon}</div>
                  <div>
                    <p className="font-semibold text-label text-sm">{label}</p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </div>
                </div>
                <Toggle value={notifs[key]} onChange={v => setNotifs(n=>({...n,[key]:v}))} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
