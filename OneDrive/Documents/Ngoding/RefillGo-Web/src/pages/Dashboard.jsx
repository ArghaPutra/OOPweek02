import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import {
  Fuel, LayoutDashboard, ShoppingCart, CreditCard, Settings,
  Truck, MapPin, Star, CheckCircle, Clock, AlertCircle, ChevronRight,
  TrendingUp, Droplets
} from 'lucide-react';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png' });

const TRUCK_POSITIONS = [
  [-6.195, 106.818], [-6.205, 106.825], [-6.190, 106.810],
];

const STATIONS = [
  { name: 'Shell Sudirman', dist: '0.8 km', price: 'Rp 12.950', rating: 4.9, badge: true, color: 'bg-yellow-400' },
  { name: 'BP Kuningan', dist: '1.4 km', price: 'Rp 13.100', rating: 4.7, badge: true, color: 'bg-green-500' },
  { name: 'Pertamina Semanggi', dist: '2.1 km', price: 'Rp 12.800', rating: 4.8, badge: true, color: 'bg-red-500' },
  { name: 'Total TB Simatupang', dist: '3.0 km', price: 'Rp 13.200', rating: 4.6, badge: false, color: 'bg-blue-600' },
];

const ORDERS = [
  { id: '#RG-2401', vehicle: 'Honda CR-V', fuel: 'Pertamax', liters: '40L', amount: 'Rp 518.000', status: 'Completed', date: 'Apr 18' },
  { id: '#RG-2398', vehicle: 'Toyota Avanza', fuel: 'Pertalite', liters: '30L', amount: 'Rp 300.000', status: 'Completed', date: 'Apr 15' },
  { id: '#RG-2391', vehicle: 'Honda CR-V', fuel: 'Pertamax', liters: '45L', amount: 'Rp 582.750', status: 'Out for Delivery', date: 'Apr 12' },
  { id: '#RG-2380', vehicle: 'Honda CR-V', fuel: 'Dex', liters: '38L', amount: 'Rp 573.800', status: 'Pending', date: 'Apr 10' },
];

const StatusBadge = ({ status }) => {
  const cfg = {
    'Completed': 'bg-success/10 text-success',
    'Out for Delivery': 'bg-primary/10 text-primary',
    'Pending': 'bg-warning/10 text-warning',
  };
  const icons = {
    'Completed': <CheckCircle size={12} />,
    'Out for Delivery': <Truck size={12} />,
    'Pending': <Clock size={12} />,
  };
  return (
    <span className={`badge ${cfg[status]}`}>
      {icons[status]} {status}
    </span>
  );
};

function Sidebar() {
  const loc = useLocation();
  const links = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/order', icon: <ShoppingCart size={20} />, label: 'Order Fuel' },
    { to: '/payment', icon: <CreditCard size={20} />, label: 'Payment' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-64 h-screen bg-white border-r border-divider flex flex-col py-8 px-4 sticky top-0 flex-shrink-0"
    >
      <div className="flex items-center gap-3 px-4 mb-10">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
          <Fuel size={17} className="text-white" />
        </div>
        <span className="font-black text-xl tracking-tight">RefillGo</span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(l => (
          <Link key={l.to} to={l.to}>
            <div className={`nav-link ${loc.pathname === l.to ? 'active' : ''}`}>
              {l.icon} {l.label}
            </div>
          </Link>
        ))}
      </nav>
      <div className="card p-4 mx-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple flex items-center justify-center text-white font-bold text-sm">BW</div>
          <div>
            <p className="font-semibold text-sm text-label">Budi Wijaya</p>
            <p className="text-xs text-gray-400">budi@email.com</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 glass border-b border-divider px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-label">Good evening, Budi 👋</h1>
            <p className="text-sm text-gray-400">Jakarta Selatan — Saturday, Apr 19</p>
          </div>
          <Link to="/order">
            <button className="btn-primary shadow-glow">
              <Fuel size={18} /> Order Now
            </button>
          </Link>
        </div>

        <div className="p-8 space-y-8">
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Total Orders', value:'24', icon:<ShoppingCart size={20} className="text-primary" />, bg:'bg-primary/10' },
              { label:'Liters Delivered', value:'892L', icon:<Droplets size={20} className="text-success" />, bg:'bg-success/10' },
              { label:'This Month', value:'Rp 1.2M', icon:<TrendingUp size={20} className="text-warning" />, bg:'bg-warning/10' },
              { label:'Saved vs Station', value:'4.2 hrs', icon:<Clock size={20} className="text-purple" />, bg:'bg-purple/10' },
            ].map((s,i) => (
              <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.08, duration:0.5}} className="card p-6">
                <div className={`w-10 h-10 rounded-2xl ${s.bg} flex items-center justify-center mb-4`}>{s.icon}</div>
                <p className="text-2xl font-black text-label">{s.value}</p>
                <p className="text-sm text-gray-400 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Map + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3, duration:0.6}} className="lg:col-span-2 card overflow-hidden">
              <div className="p-6 border-b border-divider flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-label text-lg">Live Map</h2>
                  <p className="text-sm text-success font-medium flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" /> 3 trucks nearby
                  </p>
                </div>
                <span className="badge bg-primary/10 text-primary">Live</span>
              </div>
              <div className="h-80">
                <MapContainer center={[-6.2, 106.816666]} zoom={14} style={{height:'100%', width:'100%'}} zoomControl={false} attributionControl={false}>
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                  <Circle center={[-6.2, 106.816666]} radius={800} pathOptions={{color:'#007AFF',fillColor:'#007AFF',fillOpacity:0.08}} />
                  {TRUCK_POSITIONS.map((pos, i) => (
                    <Marker key={i} position={pos}>
                      <Popup><b>Truck #{String(i+1).padStart(2,'0')}</b><br/>Available</Popup>
                    </Marker>
                  ))}
                  <Marker position={[-6.2, 106.816666]}>
                    <Popup><b>Your Location</b><br/>Honda CR-V</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </motion.div>

            {/* Station partners */}
            <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.4, duration:0.6}} className="card p-6">
              <h2 className="font-bold text-label text-lg mb-5">Partner Stations</h2>
              <div className="space-y-3">
                {STATIONS.map((s,i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-surface transition-colors cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}>
                      <Fuel size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-sm text-label truncate">{s.name}</p>
                        {s.badge && <span className="badge bg-success/10 text-success py-0.5 px-1.5 text-[10px]">✓ Trusted</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">{s.dist}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-xs font-semibold text-primary">{s.price}/L</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-xs text-warning">
                      <Star size={11} className="fill-warning" /> {s.rating}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Vehicle card + Recent orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vehicle card */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5, duration:0.6}} className="card p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/5 -translate-y-8 translate-x-8" />
              <p className="section-label mb-4">My Vehicle</p>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-black text-label">Honda CR-V</h3>
                  <p className="text-gray-400 font-medium">B 1234 ABC</p>
                  <span className="badge bg-surface text-gray-500 mt-2">SUV · Gasoline</span>
                </div>
                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center">
                  <Truck size={32} className="text-primary" />
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-400">Fuel Level</span>
                  <span className="text-sm font-bold text-warning">38%</span>
                </div>
                <div className="h-2.5 bg-surface rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-warning to-orange-400" initial={{width:'0%'}} animate={{width:'38%'}} transition={{duration:1.2, delay:0.6}} />
                </div>
                <p className="text-xs text-gray-400 mt-2">~18L remaining · Refill recommended</p>
              </div>
              <Link to="/order">
                <button className="btn-primary w-full mt-5">
                  <Fuel size={16} /> Refill Now
                </button>
              </Link>
            </motion.div>

            {/* Recent orders */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6, duration:0.6}} className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-label text-lg">Recent Orders</h2>
                <button className="text-sm text-primary font-semibold">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      {['Order ID','Vehicle','Fuel','Amount','Status','Date'].map(h => (
                        <th key={h} className="text-left text-xs text-gray-400 font-semibold pb-4 first:pl-0 last:pr-0 px-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-divider">
                    {ORDERS.map((o,i) => (
                      <tr key={i} className="hover:bg-surface/50 transition-colors">
                        <td className="py-3 pl-0 pr-2 text-sm font-mono font-semibold text-label">{o.id}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{o.vehicle}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{o.fuel} · {o.liters}</td>
                        <td className="py-3 px-2 text-sm font-semibold text-label">{o.amount}</td>
                        <td className="py-3 px-2"><StatusBadge status={o.status} /></td>
                        <td className="py-3 pl-2 pr-0 text-sm text-gray-400">{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
