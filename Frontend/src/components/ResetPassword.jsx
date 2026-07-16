import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') || 'user'; // admin, user, seller, delivery

  const [identifier, setIdentifier] = useState(''); // Email or Phone
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const getLoginRoute = () => {
    switch (type) {
      case 'admin': return '/admin/login';
      case 'seller': return '/seller/login';
      case 'delivery': return '/delivery/login';
      case 'user':
      default: return '/user/login';
    }
  };

  const getApiRoute = () => {
    switch (type) {
      case 'admin': return 'http://localhost:5000/api/users/reset-password-admin';
      case 'seller': return 'http://localhost:5000/api/sellers/reset-password';
      case 'delivery': return 'http://localhost:5000/api/delivery/reset-password';
      case 'user':
      default: return 'http://localhost:5000/api/users/reset-password';
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    try {
      const payload = type === 'delivery' ? { phone: identifier, newPassword } : { email: identifier, newPassword };
      
      const response = await fetch(getApiRoute(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Password reset successfully!');
        navigate(getLoginRoute());
      } else {
        alert(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset error:', error);
      alert('Server connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isDelivery = type === 'delivery';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '16px', 
            background: '#3b82f6', color: 'white', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            boxShadow: '0 8px 16px rgba(59, 130, 246, 0.2)'
          }}>
            <ShieldCheck size={32} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>Reset Password</h2>
          <p style={{ color: '#3b82f6', margin: 0, fontSize: '14px', textTransform: 'capitalize' }}>For {type} Account</p>
        </div>

        <form onSubmit={handleReset} style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 12px 24px rgba(0,0,0,0.04)' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              {isDelivery ? 'Registered Phone Number' : 'Registered Email Address'}
            </label>
            <div style={{ position: 'relative' }}>
              {isDelivery ? (
                <Phone size={18} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              ) : (
                <Mail size={18} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              )}
              <input 
                type={isDelivery ? "tel" : "email"}
                placeholder={isDelivery ? "Enter 10 digit number" : "Enter your email"} 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                  border: '1px solid #d1d5db', outline: 'none', fontSize: '15px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>New Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="Enter new password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                  border: '1px solid #d1d5db', outline: 'none', fontSize: '15px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="Confirm new password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                  border: '1px solid #d1d5db', outline: 'none', fontSize: '15px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={!identifier || !newPassword || !confirmPassword || loading}
            style={{ 
              width: '100%', padding: '14px', background: '#3b82f6', color: 'white', 
              border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: 'pointer', opacity: (!identifier || !newPassword || !confirmPassword || loading) ? 0.7 : 1, transition: 'all 0.2s'
            }}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#6b7280' }}>
          Remember your password? <Link to={getLoginRoute()} style={{ color: '#3b82f6', fontWeight: '600', textDecoration: 'none' }}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
