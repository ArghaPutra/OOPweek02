import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Smartphone, QrCode, CreditCard, Banknote,
  Shield, CheckCircle, ChevronRight, Star, Fuel, Info
} from 'lucide-react';

const METHODS = [
  {
    id: 'gopay',
    name: 'GoPay',
    desc: 'Pay instantly with your GoPay balance',
    icon: <Smartphone size={24} />,
    color: 'text-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    btnLabel: 'Pay with GoPay',
    btnStyle: 'bg-green-500 hover:bg-green-600 text-white',
  },
  {
    id: 'qris',
    name: 'QRIS',
    desc: 'Scan QR code with any supported e-wallet',
    icon: <QrCode size={24} />,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    btnLabel: 'Scan & Pay with QRIS',
    btnStyle: 'bg-primary hover:bg-primary-dark text-white',
  },
  {
    id: 'card',
    name: 'Debit / Credit Card',
    desc: 'Visa, Mastercard, and JCB supported',
    icon: <CreditCard size={24} />,
    color: 'text-purple',
    bg: 'bg-purple/5',
    border: 'border-purple/20',
    btnLabel: 'Pay with Card',
    btnStyle: 'bg-label hover:bg-gray-800 text-white',
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    desc: 'Prepare exact change for the driver',
    icon: <Banknote size={24} />,
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/20',
    btnLabel: 'Confirm COD Order',
    btnStyle: 'bg-warning hover:bg-orange-500 text-white',
  },
];

const ORDER_ITEMS = [
  { label: 'Pertamax · 30L', amount: 'Rp 388.500' },
  { label: 'Delivery Fee', amount: 'Rp 15.000' },
  { label: 'Service Tax (1.1%)', amount: 'Rp 4.274' },
];
const TOTAL = 'Rp 407.774';

function QRISPanel() {
  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-48 h-48 rounded-3xl bg-white border-2 border-divider flex items-center justify-center shadow-card mb-4 relative overflow-hidden">
        <div className="absolute inset-4 grid grid-cols-7 grid-rows-7 gap-0.5 opacity-80">
          {Array.from({length:49},(_,i)=>(
            <div key={i} className={`rounded-sm ${Math.random()>0.5?'bg-label':'bg-transparent'}`} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Fuel size={22} className="text-white" />
          </div>
        </div>
      </div>
      <p className="text-sm font-semibold text-label">RefillGo · Order #RG-2402</p>
      <p className="text-xs text-gray-400 mt-1">QR code expires in <strong className="text-warning">04:59</strong></p>
      <p className="text-xs text-gray-400 mt-4 text-center max-w-xs">Open GoPay, OVO, DANA, ShopeePay, or any QRIS-supported app and scan this code.</p>
    </div>
  );
}

function CardPanel() {
  return (
    <div className="space-y-4 py-3">
      {/* Card preview */}
      <div className="h-40 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white relative overflow-hidden shadow-heavy">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-10 translate-x-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-10 -translate-x-10" />
        <p className="text-xs text-white/50 uppercase tracking-widest mb-6">Debit / Credit</p>
        <p className="font-mono text-lg tracking-widest">•••• •••• •••• 4242</p>
        <div className="flex justify-between items-end mt-3">
          <div><p className="text-xs text-white/50">Card Holder</p><p className="font-semibold">Budi Wijaya</p></div>
          <div className="text-right"><p className="text-xs text-white/50">Expires</p><p className="font-semibold">08/28</p></div>
        </div>
      </div>
      <input placeholder="Card number" className="input font-mono" />
      <div className="grid grid-cols-2 gap-3">
        <input placeholder="MM / YY" className="input" />
        <input placeholder="CVV" className="input" type="password" />
      </div>
      <input placeholder="Name on card" className="input" />
    </div>
  );
}

function CODPanel() {
  return (
    <div className="py-3 space-y-4">
      <div className="flex items-start gap-4 p-4 bg-warning/10 rounded-2xl">
        <Info size={20} className="text-warning mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-label text-sm">Prepare Exact Change</p>
          <p className="text-sm text-gray-500 mt-1">Our driver carries limited change. Please have <strong className="text-label">{TOTAL}</strong> ready in cash at the time of delivery.</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 bg-surface rounded-2xl">
        <CheckCircle size={18} className="text-success" />
        <p className="text-sm text-gray-600">Your order will be confirmed instantly. The driver will contact you 10 minutes before arrival.</p>
      </div>
    </div>
  );
}

export default function Payment() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('qris');
  const [isDefault, setIsDefault] = useState(false);
  const [paid, setPaid] = useState(false);

  const method = METHODS.find(m => m.id === selected);

  const handlePay = () => {
    setPaid(true);
    setTimeout(() => navigate('/dashboard'), 2500);
  };

  if (paid) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring',stiffness:200}} className="card p-12 text-center max-w-sm mx-4">
          <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2,type:'spring',stiffness:300}} className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-success" />
          </motion.div>
          <h2 className="text-2xl font-black text-label mb-2">Payment Confirmed!</h2>
          <p className="text-gray-400 mb-6">Your fuel is on its way. ETA 28 minutes.</p>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_,i)=><Star key={i} size={16} className="text-warning fill-warning"/>)}
          </div>
          <p className="text-sm text-gray-400">Redirecting to dashboard…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="sticky top-0 z-10 glass border-b border-divider px-8 py-5 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-black text-label">Payment</h1>
          <p className="text-sm text-gray-400">Select your payment method</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Shield size={16} className="text-success" />
          <span className="text-sm font-semibold text-success">256-bit Secured</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Payment methods */}
        <div className="lg:col-span-3 space-y-4">
          <div className="card p-6">
            <h2 className="font-bold text-label text-base mb-4">Payment Method</h2>
            <div className="space-y-3">
              {METHODS.map(m => (
                <motion.button
                  key={m.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(m.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${selected === m.id ? `${m.bg} ${m.border}` : 'border-divider bg-white hover:border-gray-300'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${m.bg} ${m.color}`}>{m.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-label text-sm">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.desc}</p>
                  </div>
                  {selected === m.id && (
                    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:400}} className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Method-specific UI */}
          <AnimatePresence mode="wait">
            <motion.div key={selected} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:0.25}} className="card p-6">
              <h2 className="font-bold text-label text-base mb-2">{method?.name} Details</h2>
              {selected === 'qris' && <QRISPanel />}
              {selected === 'card' && <CardPanel />}
              {selected === 'cod' && <CODPanel />}
              {selected === 'gopay' && (
                <div className="py-4 space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center"><Smartphone size={22} className="text-white"/></div>
                    <div><p className="font-semibold text-label">GoPay Balance</p><p className="text-xl font-black text-green-500">Rp 1.235.000</p></div>
                  </div>
                  <p className="text-sm text-gray-400 text-center">You will be redirected to the Gojek app to authorize this payment.</p>
                </div>
              )}
              {/* Set as default toggle */}
              <div className="flex items-center justify-between mt-5 pt-5 border-t border-divider">
                <div>
                  <p className="text-sm font-semibold text-label">Save as default</p>
                  <p className="text-xs text-gray-400">Skip this step next time</p>
                </div>
                <button onClick={() => setIsDefault(d => !d)} className={`toggle ${isDefault ? 'bg-primary' : 'bg-gray-300'}`}>
                  <motion.span animate={{x: isDefault ? 20 : 0}} transition={{type:'spring',stiffness:500,damping:30}} className="toggle-thumb" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2 space-y-4 sticky top-28 self-start">
          <div className="card p-6">
            <h2 className="font-bold text-label text-base mb-5">Invoice Summary</h2>
            <div className="space-y-3 mb-5">
              {ORDER_ITEMS.map(({label,amount}) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-label">{amount}</span>
                </div>
              ))}
              <div className="flex justify-between font-black text-base pt-4 border-t border-divider">
                <span>Total</span>
                <span className="text-primary">{TOTAL}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handlePay}
              className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 shadow-card ${method?.btnStyle}`}
            >
              {method?.icon} {method?.btnLabel}
            </motion.button>

            <div className="flex items-center gap-2 justify-center mt-4">
              <Shield size={13} className="text-gray-400" />
              <p className="text-xs text-gray-400">Payment secured by 256-bit TLS encryption</p>
            </div>
          </div>

          {/* Saved cards */}
          <div className="card p-5">
            <p className="section-label mb-4">Saved Methods</p>
            <div className="space-y-2">
              {[{l:'GoPay',s:'Rp 1.235.000',c:'bg-green-500'},{l:'Visa ••4242',s:'Default',c:'bg-blue-600'}].map(({l,s,c})=>(
                <div key={l} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-surface transition-colors cursor-pointer">
                  <div className={`w-8 h-8 rounded-xl ${c} flex items-center justify-center`}><CreditCard size={14} className="text-white"/></div>
                  <div className="flex-1"><p className="text-sm font-semibold text-label">{l}</p><p className="text-xs text-gray-400">{s}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
