import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Store, ArrowRight } from 'lucide-react';
import './SellerApp.css';

function SellerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('seller_logged_in', 'true');
      navigate('/seller/home');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '16px', 
            background: '#8b5cf6', color: 'white', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            boxShadow: '0 8px 16px rgba(139, 92, 246, 0.2)'
          }}>
            <Store size={32} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>Seller Central</h2>
          <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>Manage your store and grow your business</p>
        </div>

        <form onSubmit={handleLogin} style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 12px 24px rgba(0,0,0,0.04)' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '8px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                placeholder="seller@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                  border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Password</label>
              <a href="#" style={{ fontSize: '13px', color: '#8b5cf6', textDecoration: 'none', fontWeight: '500' }}>Forgot?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                  border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', padding: '14px', background: '#8b5cf6', color: 'white', 
              border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.2s'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748b' }}>
          Don't have a seller account? <Link to="/seller/register" style={{ color: '#8b5cf6', fontWeight: '600', textDecoration: 'none' }}>Register now</Link>
        </p>
      </div>
    </div>
  );
}

export default SellerLogin;
