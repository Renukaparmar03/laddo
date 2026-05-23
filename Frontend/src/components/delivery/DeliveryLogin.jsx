import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Phone, Lock, Bike, ArrowRight } from 'lucide-react'
import './Delivery.css'

function DeliveryLogin() {
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
        // Save mock login details
        localStorage.setItem('rider_logged_in', 'true');
        localStorage.setItem('rider_name', 'Rahul Sharma');
        localStorage.setItem('rider_vehicle', 'bike');
        navigate('/delivery/home');
      }, 1000);
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
            <h2 className="del-font-extrabold" style={{ margin: '0 0 4px 0', fontSize: '24px' }}>Blinkit Partner</h2>
            <p style={{ color: 'var(--del-text-muted)', margin: 0, fontSize: '13px' }}>
              Delivering happiness in 10-minutes.
            </p>
          </div>
        </div>

        {/* Form panel */}
        {!showOtpField ? (
          <form onSubmit={handleSendOtp} className="del-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="del-text-center" style={{ marginBottom: '10px' }}>
              <h3 className="del-font-semibold" style={{ margin: '0 0 6px 0', fontSize: '18px' }}>Rider Login</h3>
              <p style={{ color: 'var(--del-text-muted)', margin: 0, fontSize: '13px' }}>Enter registered mobile number to continue.</p>
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

            <button 
              type="submit" 
              className="del-btn del-btn-primary del-mt-2"
              disabled={phone.length !== 10 || loading}
              style={{ opacity: (phone.length !== 10 || loading) ? 0.6 : 1 }}
            >
              <span>{loading ? 'Sending OTP...' : 'Send OTP'}</span>
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="del-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="del-text-center" style={{ marginBottom: '10px' }}>
              <h3 className="del-font-semibold" style={{ margin: '0 0 6px 0', fontSize: '18px' }}>Enter OTP</h3>
              <p style={{ color: 'var(--del-text-muted)', margin: 0, fontSize: '13px' }}>We sent a 4-digit code to +91 {phone}</p>
            </div>

            <div className="del-input-group">
              <label className="del-flex-between">
                <span>OTP Code</span>
                <Lock size={16} />
              </label>
              <input 
                type="text" 
                maxLength={4}
                placeholder="Enter 4 digit OTP" 
                className="del-input" 
                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '20px', fontWeight: 700 }}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <div className="del-flex-between" style={{ fontSize: '12px', padding: '0 4px' }}>
              <span style={{ color: 'var(--del-text-muted)' }}>Didn't receive code?</span>
              <button 
                type="button" 
                onClick={() => { setShowOtpField(false); setOtp(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--del-primary)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Change Number
              </button>
            </div>

            <button 
              type="submit" 
              className="del-btn del-btn-primary del-mt-2"
              disabled={otp.length !== 4 || loading}
              style={{ opacity: (otp.length !== 4 || loading) ? 0.6 : 1 }}
            >
              <span>{loading ? 'Verifying...' : 'Login & Go Online'}</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

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
