import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Order from './pages/Order.jsx';
import Payment from './pages/Payment.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
