import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Shield, ArrowRight } from 'lucide-react';
import './AdminApp.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Persist admin identity so AdminProfile can read it
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('admin_email',     email);
      localStorage.setItem('admin_name',      email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
      localStorage.setItem('admin_login_at',  new Date().toISOString());
      navigate('/admin/home');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '16px', 
            background: '#3b82f6', color: 'white', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
          }}>
            <Shield size={32} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f8fafc', margin: '0 0 8px 0' }}>Admin Portal</h2>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Secure access to platform management</p>
        </div>

        <form onSubmit={handleLogin} style={{ background: '#1e293b', padding: '32px', borderRadius: '24px', boxShadow: '0 12px 32px rgba(0,0,0,0.5)', border: '1px solid #334155' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cbd5e1', marginBottom: '8px' }}>Admin Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                placeholder="admin@platform.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                  border: '1px solid #334155', background: '#0f172a', color: '#f8fafc',
                  outline: 'none', fontSize: '15px', boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#cbd5e1' }}>Password</label>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                  border: '1px solid #334155', background: '#0f172a', color: '#f8fafc',
                  outline: 'none', fontSize: '15px', boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', padding: '14px', background: '#3b82f6', color: 'white', 
              border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.2s'
            }}
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#475569' }}>
          Restricted Access. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
