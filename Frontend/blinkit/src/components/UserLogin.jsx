import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Lock, ShoppingBag, ArrowRight } from 'lucide-react';

function UserLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowOtpField(true);
      }, 1000);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem('user_logged_in', 'true');
        navigate('/user/home');
      }, 1000);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0fdf4', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '16px', 
            background: '#16a34a', color: 'white', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            boxShadow: '0 8px 16px rgba(22, 163, 74, 0.2)'
          }}>
            <ShoppingBag size={32} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534', margin: '0 0 8px 0' }}>Welcome to Blinkit</h2>
          <p style={{ color: '#15803d', margin: 0, fontSize: '14px' }}>Groceries delivered in 10 minutes</p>
        </div>

        {!showOtpField ? (
          <form onSubmit={handleSendOtp} style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 12px 24px rgba(0,0,0,0.04)' }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Mobile Number</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '16px', color: '#6b7280', fontSize: '15px', fontWeight: 600 }}>+91</span>
                <input 
                  type="tel" 
                  maxLength={10}
                  placeholder="Enter 10 digit number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  style={{ 
                    width: '100%', padding: '12px 16px 12px 54px', borderRadius: '12px', 
                    border: '1px solid #d1d5db', outline: 'none', fontSize: '15px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={phone.length !== 10 || loading}
              style={{ 
                width: '100%', padding: '14px', background: '#16a34a', color: 'white', 
                border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                cursor: 'pointer', opacity: (phone.length !== 10 || loading) ? 0.7 : 1, transition: 'all 0.2s'
              }}
            >
              {loading ? 'Sending OTP...' : 'Continue'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 12px 24px rgba(0,0,0,0.04)' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Enter OTP</label>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#9ca3af" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  maxLength={4}
                  placeholder="0000" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  style={{ 
                    width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                    border: '1px solid #d1d5db', outline: 'none', fontSize: '20px', letterSpacing: '8px',
                    boxSizing: 'border-box', textAlign: 'center', fontWeight: 'bold'
                  }}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '13px' }}>
                <span style={{ color: '#6b7280' }}>Sent to +91 {phone}</span>
                <button type="button" onClick={() => { setShowOtpField(false); setOtp(''); }} style={{ background: 'none', border: 'none', color: '#16a34a', fontWeight: '600', cursor: 'pointer' }}>Change</button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={otp.length !== 4 || loading}
              style={{ 
                width: '100%', padding: '14px', background: '#16a34a', color: 'white', 
                border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                cursor: 'pointer', opacity: (otp.length !== 4 || loading) ? 0.7 : 1, transition: 'all 0.2s'
              }}
            >
              {loading ? 'Verifying...' : 'Login securely'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
