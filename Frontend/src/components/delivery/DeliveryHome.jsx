import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { MapPin, Phone, CheckCircle, Navigation, Clock, ShoppingBag, ArrowRight, Play } from 'lucide-react'
import './Delivery.css'

function DeliveryHome() {
  const { isOnline } = useOutletContext();
  
  // States: 'IDLE', 'INCOMING', 'TO_STORE', 'AT_STORE', 'TO_CUSTOMER', 'AT_CUSTOMER', 'SUCCESS'
  const [step, setStep] = useState('IDLE');
  
  // Timer for incoming request
  const [incomingTimer, setIncomingTimer] = useState(30);

  // Verification codes
  const [storeOtp, setStoreOtp] = useState('');
  const [customerOtp, setCustomerOtp] = useState('');
  
  // Error triggers
  const [otpError, setOtpError] = useState('');

  // Active Simulated Order details
  const activeOrder = {
    id: '#ORD-9842',
    items: [
      { name: 'Amul Taaza Toned Milk (1L)', qty: 2 },
      { name: 'Oreo Chocolate Sandwich Biscuits', qty: 1 },
      { name: 'Lay\'s Classic Salted Potato Chips (50g)', qty: 3 }
    ],
    payout: '₹42.50',
    storeName: 'Blinkit Dark Store - Sector 62',
    storeAddress: 'Plot C-14, Industrial Area, Sector 62, Noida',
    customerName: 'Aman Verma',
    customerAddress: 'Flat 402, Block-B, Galaxy Apartments, Sector 62',
    customerPhone: '+91 98765 43210'
  };

  // Timer countdown for incoming order
  useEffect(() => {
    let interval;
    if (step === 'INCOMING') {
      interval = setInterval(() => {
        setIncomingTimer(prev => {
          if (prev <= 1) {
            setStep('IDLE');
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  // Simulation controls
  const triggerOrderSimulation = () => {
    if (isOnline && step === 'IDLE') {
      setIncomingTimer(30);
      setStep('INCOMING');
    }
  };

  const handleAcceptOrder = () => {
    setStep('TO_STORE');
  };

  const handleRejectOrder = () => {
    setStep('IDLE');
  };

  const handleArriveAtStore = () => {
    setStep('AT_STORE');
    setOtpError('');
  };

  const handleConfirmStorePickup = () => {
    if (storeOtp === '1234') {
      setStep('TO_CUSTOMER');
      setOtpError('');
    } else {
      setOtpError('Invalid Code! Hint: Use code 1234');
    }
  };

  const handleArriveAtCustomer = () => {
    setStep('AT_CUSTOMER');
    setOtpError('');
  };

  const handleConfirmDelivery = () => {
    if (customerOtp === '5678') {
      setStep('SUCCESS');
      setOtpError('');
      
      // Save simulated trip to local storage trip history
      const savedTrips = JSON.parse(localStorage.getItem('rider_trips') || '[]');
      const newTrip = {
        id: activeOrder.id,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        store: activeOrder.storeName,
        destination: activeOrder.customerName,
        payout: activeOrder.payout,
        itemsCount: activeOrder.items.reduce((acc, curr) => acc + curr.qty, 0)
      };
      localStorage.setItem('rider_trips', JSON.stringify([newTrip, ...savedTrips]));

      // Update earnings
      const prevEarnings = parseFloat(localStorage.getItem('rider_earnings') || '0');
      const payoutVal = parseFloat(activeOrder.payout.replace('₹', ''));
      localStorage.setItem('rider_earnings', (prevEarnings + payoutVal).toFixed(2));
      
    } else {
      setOtpError('Invalid Code! Hint: Use code 5678');
    }
  };

  const handleCompleteFlow = () => {
    setStep('IDLE');
    setStoreOtp('');
    setCustomerOtp('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* OFFLINE Screen State */}
      {!isOnline && step === 'IDLE' && (
        <div className="del-card del-text-center" style={{ padding: '40px 20px', marginTop: '20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>😴</div>
          <h2 className="del-font-extrabold" style={{ margin: '0 0 10px 0', fontSize: '22px' }}>You are Offline</h2>
          <p style={{ color: 'var(--del-text-muted)', fontSize: '14px', lineHeight: '1.5', marginBottom: '25px' }}>
            Aap abhi offline hain. Orders receive karna shuru karne ke liye top header me switch ko **Online** karein!
          </p>
          <div style={{ 
            padding: '12px', border: '1px dashed var(--del-card-border)', 
            borderRadius: '12px', background: 'rgba(255,255,255,0.01)',
            fontSize: '12px', color: 'var(--del-text-muted)'
          }}>
            Duty status is updated to server in real-time.
          </div>
        </div>
      )}

      {/* ONLINE Screen IDLE State (Pulsing Radar) */}
      {isOnline && step === 'IDLE' && (
        <div className="del-flex-col" style={{ gap: '16px' }}>
          
          {/* Radar Scanner Grid */}
          <div className="map-placeholder">
            <div className="map-grid-overlay"></div>
            <div className="map-radar"></div>
            <div className="map-radar" style={{ animationDelay: '1s' }}></div>
            <div className="map-radar" style={{ animationDelay: '2s' }}></div>
            <div className="map-rider-dot"></div>
            
            <div style={{ 
              position: 'absolute', bottom: '16px', background: 'rgba(0,0,0,0.8)', 
              padding: '6px 12px', borderRadius: '20px', fontSize: '11px',
              fontWeight: 600, border: '1px solid var(--del-card-border)'
            }}>
              GPS Connected • Sector 62
            </div>
          </div>

          <div className="del-card del-text-center" style={{ padding: '24px 20px' }}>
            <div className="duty-status-badge online" style={{ display: 'inline-block', marginBottom: '12px' }}>
              Searching for orders...
            </div>
            <h3 className="del-font-bold" style={{ margin: '0 0 6px 0', fontSize: '18px' }}>Waiting for Ping</h3>
            <p style={{ color: 'var(--del-text-muted)', fontSize: '13px', margin: '0 0 20px 0' }}>
              Hum aapke dark store ke sabse pasandida orders assign kar rahe hain. Apne phone ka sound full rakhein.
            </p>
            
            {/* Simulation Trigger Button */}
            <button 
              className="del-btn del-btn-accent" 
              onClick={triggerOrderSimulation}
              style={{ padding: '12px 20px', fontSize: '14px' }}
            >
              <Play size={16} />
              <span>Simulate New Order Alert</span>
            </button>
          </div>
        </div>
      )}

      {/* INCOMING Order Alert Modal Dialog */}
      {step === 'INCOMING' && (
        <div className="del-alert-overlay">
          <div className="del-alert-box">
            <div className="alert-ring-animation">
              <div className="alert-pulse-circle"></div>
              <ShoppingBag size={32} />
            </div>

            <div style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
              New Delivery Assigned!
            </div>
            <h2 className="del-font-extrabold" style={{ color: 'white', margin: '0 0 16px 0', fontSize: '26px' }}>
              {activeOrder.payout}
            </h2>

            {/* Timed countdown tracker bar */}
            <div style={{ width: '100%', height: '4px', background: '#374151', borderRadius: '2px', marginBottom: '20px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#f59e0b', width: `${(incomingTimer / 30) * 100}%`, transition: 'width 1s linear' }}></div>
            </div>

            {/* Trip distance summary cards */}
            <div className="del-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', textAlign: 'left', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--del-primary)', flexShrink: 0 }} />
                <div>
                  <span style={{ color: 'var(--del-text-muted)' }}>Store:</span> <b>{activeOrder.storeName}</b>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} style={{ color: '#3b82f6', flexShrink: 0 }} />
                <div>
                  <span style={{ color: 'var(--del-text-muted)' }}>Customer:</span> <b>{activeOrder.customerAddress}</b>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--del-card-border)', paddingTop: '8px', fontSize: '11px', color: 'var(--del-text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Items count: {activeOrder.items.length}</span>
                <span>Time remaining: {incomingTimer}s</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="del-flex-col" style={{ gap: '10px' }}>
              <button className="del-btn del-btn-accent" onClick={handleAcceptOrder}>
                Accept & Start Duty
              </button>
              <button className="del-btn del-btn-danger" onClick={handleRejectOrder} style={{ padding: '12px' }}>
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATE: Heading to Store */}
      {step === 'TO_STORE' && (
        <div className="del-flex-col" style={{ gap: '16px' }}>
          {/* Header Step tracker */}
          <div className="del-card" style={{ padding: '14px 18px', margin: 0 }}>
            <div className="del-flex-between" style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--del-primary)', fontWeight: 700 }}>STEP 1 OF 3</span>
              <span className="duty-status-badge online">Picked Up Phase</span>
            </div>
            <h4 style={{ margin: 0, fontWeight: 700 }}>Navigate to Blinkit Dark Store</h4>
          </div>

          {/* Details map & directions card */}
          <div className="del-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="del-flex-between">
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '17px', fontWeight: 700 }}>{activeOrder.storeName}</h3>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--del-text-muted)' }}>{activeOrder.storeAddress}</p>
              </div>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeOrder.storeAddress)}`} 
                target="_blank" 
                rel="noreferrer"
                className="vehicle-icon"
                style={{ background: 'var(--del-primary)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Navigation size={18} />
              </a>
            </div>

            {/* List of packages to fetch */}
            <div style={{ borderTop: '1px solid var(--del-card-border)', paddingTop: '14px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', color: 'var(--del-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Items to Collect:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeOrder.items.map((item, index) => (
                  <div key={index} className="del-flex-between" style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <span style={{ fontSize: '14px' }}>{item.name}</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--del-primary)' }}>x{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="del-btn del-btn-primary del-mt-2" onClick={handleArriveAtStore}>
            <span>I Have Reached Store</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STATE: At Store Verification */}
      {step === 'AT_STORE' && (
        <div className="del-flex-col" style={{ gap: '16px' }}>
          <div className="del-card" style={{ padding: '14px 18px', margin: 0 }}>
            <div className="del-flex-between" style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--del-primary)', fontWeight: 700 }}>STEP 2 OF 3</span>
              <span className="duty-status-badge online" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>Verification Phase</span>
            </div>
            <h4 style={{ margin: 0, fontWeight: 700 }}>Verify Store Pickup Code</h4>
          </div>

          <div className="del-card del-text-center" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px 20px' }}>
            <div>
              <ShoppingBag size={40} style={{ color: 'var(--del-primary)', marginBottom: '8px' }} />
              <h3 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>Collect Package Box</h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--del-text-muted)' }}>
                Store manager se order bag lijiye aur niche unka verify code enter karein.
              </p>
            </div>

            <div className="del-input-group" style={{ maxWidth: '280px', margin: '0 auto', width: '100%' }}>
              <input 
                type="text" 
                maxLength={4}
                placeholder="Store Code (Hint: 1234)" 
                className="del-input" 
                style={{ textAlign: 'center', fontSize: '20px', fontWeight: 800, letterSpacing: '6px' }}
                value={storeOtp}
                onChange={(e) => setStoreOtp(e.target.value.replace(/\D/g, ''))}
              />
              {otpError && <span style={{ color: 'var(--del-danger)', fontSize: '11px', marginTop: '6px', fontWeight: 600 }}>{otpError}</span>}
            </div>
          </div>

          <button className="del-btn del-btn-primary del-mt-2" onClick={handleConfirmStorePickup}>
            <CheckCircle size={18} />
            <span>Confirm Pickup OTP</span>
          </button>
        </div>
      )}

      {/* STATE: Heading to Customer */}
      {step === 'TO_CUSTOMER' && (
        <div className="del-flex-col" style={{ gap: '16px' }}>
          <div className="del-card" style={{ padding: '14px 18px', margin: 0 }}>
            <div className="del-flex-between" style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--del-primary)', fontWeight: 700 }}>STEP 3 OF 3</span>
              <span className="duty-status-badge online" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>On the Way</span>
            </div>
            <h4 style={{ margin: 0, fontWeight: 700 }}>Navigate to Customer Address</h4>
          </div>

          <div className="del-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="del-flex-between">
              <div>
                <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', color: 'var(--del-text-muted)' }}>CUSTOMER</span>
                <h3 style={{ margin: '4px 0 2px 0', fontSize: '17px', fontWeight: 700 }}>{activeOrder.customerName}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--del-text-muted)' }}>{activeOrder.customerAddress}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a 
                  href={`tel:${activeOrder.customerPhone}`}
                  className="vehicle-icon"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--del-text)' }}
                >
                  <Phone size={16} />
                </a>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeOrder.customerAddress)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="vehicle-icon"
                  style={{ background: 'var(--del-primary)', color: 'white' }}
                >
                  <Navigation size={16} />
                </a>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--del-card-border)', paddingTop: '14px', display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.03)' }}>
                <Clock size={16} style={{ color: '#f59e0b', marginBottom: '4px' }} />
                <div style={{ fontSize: '11px', color: 'var(--del-text-muted)' }}>ETA SLA Limit</div>
                <div style={{ fontSize: '14px', fontWeight: 800 }}>8 Mins Remaining</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.03)' }}>
                <ShoppingBag size={16} style={{ color: 'var(--del-primary)', marginBottom: '4px' }} />
                <div style={{ fontSize: '11px', color: 'var(--del-text-muted)' }}>Earning</div>
                <div style={{ fontSize: '14px', fontWeight: 800 }}>{activeOrder.payout}</div>
              </div>
            </div>
          </div>

          <button className="del-btn del-btn-primary del-mt-2" onClick={handleArriveAtCustomer}>
            <span>I Have Reached Customer Gate</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STATE: At Customer Verification */}
      {step === 'AT_CUSTOMER' && (
        <div className="del-flex-col" style={{ gap: '16px' }}>
          <div className="del-card" style={{ padding: '14px 18px', margin: 0 }}>
            <div className="del-flex-between" style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--del-primary)', fontWeight: 700 }}>FINAL VERIFICATION</span>
              <span className="duty-status-badge online" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>Doorstep Deliver</span>
            </div>
            <h4 style={{ margin: 0, fontWeight: 700 }}>Handover & Confirm Delivery</h4>
          </div>

          <div className="del-card del-text-center" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px 20px' }}>
            <div>
              <CheckCircle size={40} style={{ color: 'var(--del-primary)', marginBottom: '8px' }} />
              <h3 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>Ask Customer for OTP</h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--del-text-muted)' }}>
                Confirm handover by entering the 4-digit code shown in customer's app dashboard.
              </p>
            </div>

            <div className="del-input-group" style={{ maxWidth: '280px', margin: '0 auto', width: '100%' }}>
              <input 
                type="text" 
                maxLength={4}
                placeholder="Customer Code (Hint: 5678)" 
                className="del-input" 
                style={{ textAlign: 'center', fontSize: '20px', fontWeight: 800, letterSpacing: '6px' }}
                value={customerOtp}
                onChange={(e) => setCustomerOtp(e.target.value.replace(/\D/g, ''))}
              />
              {otpError && <span style={{ color: 'var(--del-danger)', fontSize: '11px', marginTop: '6px', fontWeight: 600 }}>{otpError}</span>}
            </div>
          </div>

          <button className="del-btn del-btn-primary del-mt-2" onClick={handleConfirmDelivery}>
            <CheckCircle size={18} />
            <span>Confirm Safe Delivery</span>
          </button>
        </div>
      )}

      {/* STATE: Success Celebration summary */}
      {step === 'SUCCESS' && (
        <div className="del-card del-text-center animate-success" style={{ padding: '36px 20px', marginTop: '20px' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', 
            background: 'rgba(16, 185, 129, 0.1)', border: '2px solid var(--del-primary)',
            color: 'var(--del-primary)', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', margin: '0 auto 20px auto'
          }}>
            <CheckCircle size={36} />
          </div>
          
          <h2 className="del-font-extrabold" style={{ margin: '0 0 4px 0', fontSize: '24px' }}>Order Delivered!</h2>
          <p style={{ color: 'var(--del-text-muted)', fontSize: '13px', margin: '0 0 24px 0' }}>
            Great job! You delivered the packages safe & well within SLA target.
          </p>

          <div className="del-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', textAlign: 'left', marginBottom: '24px' }}>
            <div className="del-flex-between">
              <span style={{ color: 'var(--del-text-muted)' }}>Trip Payout:</span>
              <span className="del-font-semibold">{activeOrder.payout}</span>
            </div>
            <div className="del-flex-between">
              <span style={{ color: 'var(--del-text-muted)' }}>Time Elapsed:</span>
              <span className="del-font-semibold">6 mins 42 secs</span>
            </div>
            <div className="del-flex-between" style={{ borderTop: '1px solid var(--del-card-border)', paddingTop: '10px', fontSize: '15px' }}>
              <span style={{ fontWeight: 700 }}>Total Credited:</span>
              <span style={{ fontWeight: 800, color: 'var(--del-primary)' }}>{activeOrder.payout}</span>
            </div>
          </div>

          <button className="del-btn del-btn-primary" onClick={handleCompleteFlow}>
            <span>Back to Active Duty</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

    </div>
  )
}

export default DeliveryHome
