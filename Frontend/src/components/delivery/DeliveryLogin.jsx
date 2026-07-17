import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Phone, Lock, Bike, ArrowRight, Eye, EyeOff } from 'lucide-react'
import './Delivery.css'

function DeliveryLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (phone.length === 10 && password) {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/delivery/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, password })
        });
        const data = await res.json();
        
        if (res.ok) {
          localStorage.setItem('rider_logged_in', 'true');
          localStorage.setItem('delivery_info', JSON.stringify(data));
          navigate('/delivery/home');
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Server error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="del-app-container" style={{ justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ padding: '30px 24px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Brand Logo Banner */}
        <div className="del-text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '20px', 
            background: 'var(--del-primary)', display: 'flex', 
            alignItems: 'center', justifycontent: 'center', 
            color: 'white', display: 'flex', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
          }}>
            <Bike size={32} />
          </div>
          <div>
            <h2 className="del-font-extrabold" style={{ margin: '0 0 4px 0', fontSize: '24px' }}>QuickKart Partner</h2>
            <p style={{ color: 'var(--del-text-muted)', margin: 0, fontSize: '13px' }}>
              Delivering happiness in 10-minutes.
            </p>
          </div>
        </div>

        {/* Form panel */}
        <form onSubmit={handleLogin} className="del-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="del-text-center" style={{ marginBottom: '10px' }}>
            <h3 className="del-font-semibold" style={{ margin: '0 0 6px 0', fontSize: '18px' }}>Rider Login</h3>
            <p style={{ color: 'var(--del-text-muted)', margin: 0, fontSize: '13px' }}>Enter phone and password to continue.</p>
          </div>

          <div className="del-input-group">
            <label className="del-flex-between">
              <span>Mobile Number</span>
              <Phone size={16} />
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '16px', color: 'var(--del-text-muted)', fontSize: '15px', fontWeight: 600 }}>+91</span>
              <input 
                type="tel" 
                maxLength={10}
                placeholder="Enter 10 digit number" 
                className="del-input" 
                style={{ paddingLeft: '54px', width: '100%' }}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>

          <div className="del-input-group">
            <div className="del-flex-between" style={{ marginBottom: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--del-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</span>
                <Lock size={14} color="var(--del-text-muted)" />
              </label>
              <Link to="/reset-password?type=delivery" style={{ fontSize: '13px', color: 'var(--del-primary)', textDecoration: 'none', fontWeight: '600' }}>Forgot Password?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                className="del-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '40px', width: '100%' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={18} color="var(--del-text-muted)" /> : <Eye size={18} color="var(--del-text-muted)" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="del-btn del-btn-primary del-mt-2"
            disabled={phone.length !== 10 || !password || loading}
            style={{ opacity: (phone.length !== 10 || !password || loading) ? 0.6 : 1 }}
          >
            <span>{loading ? 'Logging in...' : 'Login & Go Online'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Navigation to signup */}
        <div className="del-text-center" style={{ fontSize: '14px', color: 'var(--del-text-muted)' }}>
          New partner?{' '}
          <Link to="/delivery/register" style={{ color: 'var(--del-primary)', fontWeight: 700, textDecoration: 'none' }}>
            Register Here
          </Link>
        </div>

      </div>
    </div>
  )
}

export default DeliveryLogin
