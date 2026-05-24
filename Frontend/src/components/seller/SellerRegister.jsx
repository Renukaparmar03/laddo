import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Store, ArrowRight, User, Phone, FileText } from 'lucide-react';
import './SellerApp.css';

function SellerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    storeName: '',
    gstNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/sellers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName: formData.storeName,
          ownerName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          address: 'Not Provided' // Default as not in UI
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('seller_logged_in', 'true');
        localStorage.setItem('seller_info', JSON.stringify(data));
        navigate('/seller/home');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Seller Registration error:', error);
      alert('Server connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '24px 0' }}>
      <div style={{ width: '100%', maxWidth: '500px', padding: '24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '16px', 
            background: '#8b5cf6', color: 'white', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            boxShadow: '0 8px 16px rgba(139, 92, 246, 0.2)'
          }}>
            <Store size={32} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>Create Seller Account</h2>
          <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>Join us and start selling to millions of customers</p>
        </div>

        <form onSubmit={handleRegister} style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 12px 24px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '8px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="John Doe" 
                  value={formData.fullName}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                    border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px', boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '8px' }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="9876543210" 
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ 
                    width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                    border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px', boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '8px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                name="email"
                placeholder="seller@example.com" 
                value={formData.email}
                onChange={handleChange}
                style={{ 
                  width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                  border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px', boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '8px' }}>Store Name</label>
            <div style={{ position: 'relative' }}>
              <Store size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                name="storeName"
                placeholder="My Awesome Store" 
                value={formData.storeName}
                onChange={handleChange}
                style={{ 
                  width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                  border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px', boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>GSTIN Number (Optional)</label>
            </div>
            <div style={{ position: 'relative' }}>
              <FileText size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                name="gstNumber"
                placeholder="22AAAAA0000A1Z5" 
                value={formData.gstNumber}
                onChange={handleChange}
                style={{ 
                  width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                  border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px', boxSizing: 'border-box',
                  textTransform: 'uppercase'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#334155', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                name="password"
                placeholder="Create a strong password" 
                value={formData.password}
                onChange={handleChange}
                style={{ 
                  width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', 
                  border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px', boxSizing: 'border-box'
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
            {loading ? 'Creating account...' : 'Register & Continue'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748b' }}>
          Already have an account? <Link to="/seller/login" style={{ color: '#8b5cf6', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SellerRegister;
