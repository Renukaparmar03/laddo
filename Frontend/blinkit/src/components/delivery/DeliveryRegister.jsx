import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, MapPin, Bike, FileText, UploadCloud, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import './Delivery.css'

function DeliveryRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Mumbai',
    vehicle: 'bike', // bike, bicycle, electric
    licenseNo: '',
    aadharNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVehicleSelect = (type) => {
    setFormData(prev => ({ ...prev, vehicle: type }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      // Mock save to storage
      localStorage.setItem('rider_registered', 'true');
      localStorage.setItem('rider_name', formData.name);
      localStorage.setItem('rider_vehicle', formData.vehicle);
      navigate('/delivery/home');
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  return (
    <div className="del-app-container">
      {/* Header */}
      <header className="del-header">
        <div className="del-logo">
          <Bike size={24} />
          <span>Blinkit Partner</span>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--del-text-muted)', fontWeight: 600 }}>
          Step {step} of 4
        </div>
      </header>

      {/* Main Container */}
      <div className="del-reg-container" style={{ flexGrow: 1 }}>
        
        {/* Step Progress Line */}
        <div className="status-tracker">
          <div className="status-step-line-active" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          <div className={`status-dot ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`status-dot ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`status-dot ${step >= 3 ? 'active' : ''}`}>3</div>
          <div className={`status-dot ${step >= 4 ? 'active' : ''}`}>4</div>
        </div>

        {/* STEP 1: Basic Profile */}
        {step === 1 && (
          <div className="del-flex-col" style={{ gap: '20px' }}>
            <div className="del-text-center">
              <h2 className="del-font-extrabold" style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Let's Get Started!</h2>
              <p style={{ color: 'var(--del-text-muted)', margin: 0, fontSize: '14px' }}>
                Join India's fastest 10-minute delivery fleet.
              </p>
            </div>

            <div className="del-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
              <div className="del-input-group">
                <label className="del-flex-between">
                  <span>Full Name</span>
                  <User size={16} />
                </label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Enter your full name" 
                  className="del-input" 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="del-input-group">
                <label className="del-flex-between">
                  <span>Phone Number</span>
                  <Phone size={16} />
                </label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="10 digit mobile number" 
                  className="del-input" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="del-input-group">
                <label className="del-flex-between">
                  <span>Working City</span>
                  <MapPin size={16} />
                </label>
                <select 
                  name="city"
                  className="del-input" 
                  value={formData.city}
                  onChange={handleChange}
                  style={{ appearance: 'none', background: 'rgba(255, 255, 255, 0.04)' }}
                >
                  <option value="Mumbai" style={{ background: '#111827' }}>Mumbai</option>
                  <option value="Delhi NCR" style={{ background: '#111827' }}>Delhi NCR</option>
                  <option value="Bangalore" style={{ background: '#111827' }}>Bangalore</option>
                  <option value="Pune" style={{ background: '#111827' }}>Pune</option>
                </select>
              </div>
            </div>

            <button 
              className="del-btn del-btn-primary del-mt-4" 
              onClick={handleNext}
              disabled={!formData.name || !formData.phone}
              style={{ opacity: (!formData.name || !formData.phone) ? 0.6 : 1 }}
            >
              <span>Continue</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2: Vehicle Selection */}
        {step === 2 && (
          <div className="del-flex-col" style={{ gap: '20px' }}>
            <div className="del-text-center">
              <h2 className="del-font-extrabold" style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Select Your Vehicle</h2>
              <p style={{ color: 'var(--del-text-muted)', margin: 0, fontSize: '14px' }}>
                Your payout will be optimized according to your ride.
              </p>
            </div>

            <div className="del-flex-col" style={{ gap: '12px', marginTop: '10px' }}>
              <div 
                className={`vehicle-option ${formData.vehicle === 'bike' ? 'selected' : ''}`}
                onClick={() => handleVehicleSelect('bike')}
              >
                <div className="vehicle-details">
                  <div className="vehicle-icon">
                    <Bike size={20} />
                  </div>
                  <div className="vehicle-info">
                    <h4>Motorcycle / Scooty</h4>
                    <p>Earn up to ₹850/day. Dynamic distance pay.</p>
                  </div>
                </div>
                <div style={{ 
                  width: '18px', height: '18px', borderRadius: '50%', 
                  border: '2px solid var(--del-primary)',
                  background: formData.vehicle === 'bike' ? 'var(--del-primary)' : 'transparent'
                }}></div>
              </div>

              <div 
                className={`vehicle-option ${formData.vehicle === 'electric' ? 'selected' : ''}`}
                onClick={() => handleVehicleSelect('electric')}
              >
                <div className="vehicle-details">
                  <div className="vehicle-icon">
                    <Bike size={20} style={{ transform: 'rotateY(180deg)' }} />
                  </div>
                  <div className="vehicle-info">
                    <h4>EV Scooter / Electric Cycle</h4>
                    <p>Eco bonus. Earn up to ₹900/day. Fuel-free savings.</p>
                  </div>
                </div>
                <div style={{ 
                  width: '18px', height: '18px', borderRadius: '50%', 
                  border: '2px solid var(--del-primary)',
                  background: formData.vehicle === 'electric' ? 'var(--del-primary)' : 'transparent'
                }}></div>
              </div>

              <div 
                className={`vehicle-option ${formData.vehicle === 'bicycle' ? 'selected' : ''}`}
                onClick={() => handleVehicleSelect('bicycle')}
              >
                <div className="vehicle-details">
                  <div className="vehicle-icon">
                    <Bike size={18} />
                  </div>
                  <div className="vehicle-info">
                    <h4>Bicycle</h4>
                    <p>Short-distance orders (under 1.5 km). Earn up to ₹400/day.</p>
                  </div>
                </div>
                <div style={{ 
                  width: '18px', height: '18px', borderRadius: '50%', 
                  border: '2px solid var(--del-primary)',
                  background: formData.vehicle === 'bicycle' ? 'var(--del-primary)' : 'transparent'
                }}></div>
              </div>
            </div>

            <div className="del-flex-between del-mt-4" style={{ gap: '12px' }}>
              <button className="del-btn del-btn-danger" onClick={handlePrev} style={{ width: '40%' }}>
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
              <button className="del-btn del-btn-primary" onClick={handleNext} style={{ width: '60%' }}>
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Document Details */}
        {step === 3 && (
          <div className="del-flex-col" style={{ gap: '20px' }}>
            <div className="del-text-center">
              <h2 className="del-font-extrabold" style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Identity & Documents</h2>
              <p style={{ color: 'var(--del-text-muted)', margin: 0, fontSize: '14px' }}>
                Quick check to verify and activate your rider profile.
              </p>
            </div>

            <div className="del-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="del-input-group">
                <label className="del-flex-between">
                  <span>Aadhaar Number</span>
                  <FileText size={16} />
                </label>
                <input 
                  type="text" 
                  name="aadharNo"
                  placeholder="Enter 12 digit Aadhaar number" 
                  className="del-input" 
                  value={formData.aadharNo}
                  onChange={handleChange}
                />
              </div>

              {formData.vehicle !== 'bicycle' && (
                <div className="del-input-group">
                  <label className="del-flex-between">
                    <span>Driving License (DL) Number</span>
                    <FileText size={16} />
                  </label>
                  <input 
                    type="text" 
                    name="licenseNo"
                    placeholder="Enter valid Driving License number" 
                    className="del-input" 
                    value={formData.licenseNo}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className="del-flex-between del-mt-4" style={{ gap: '12px' }}>
              <button className="del-btn del-btn-danger" onClick={handlePrev} style={{ width: '40%' }}>
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
              <button 
                className="del-btn del-btn-primary" 
                onClick={handleNext} 
                style={{ width: '60%', opacity: (!formData.aadharNo || (formData.vehicle !== 'bicycle' && !formData.licenseNo)) ? 0.6 : 1 }}
                disabled={!formData.aadharNo || (formData.vehicle !== 'bicycle' && !formData.licenseNo)}
              >
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Documents Upload & Submit */}
        {step === 4 && (
          <div className="del-flex-col" style={{ gap: '20px' }}>
            <div className="del-text-center">
              <h2 className="del-font-extrabold" style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Upload Document Images</h2>
              <p style={{ color: 'var(--del-text-muted)', margin: 0, fontSize: '14px' }}>
                Upload photos of your actual documents for verify.
              </p>
            </div>

            <div className="del-flex-col" style={{ gap: '14px' }}>
              <div className="doc-upload-box">
                <UploadCloud size={28} className="doc-upload-icon" />
                <h4 style={{ margin: '0 0 4px 0', fontWeight: 600 }}>Front Photo of Aadhaar Card</h4>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--del-text-muted)' }}>PNG, JPG format up to 5MB</p>
              </div>

              {formData.vehicle !== 'bicycle' && (
                <div className="doc-upload-box">
                  <UploadCloud size={28} className="doc-upload-icon" />
                  <h4 style={{ margin: '0 0 4px 0', fontWeight: 600 }}>Driving License Photo</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--del-text-muted)' }}>PNG, JPG format up to 5MB</p>
                </div>
              )}
            </div>

            <div className="del-flex-between del-mt-4" style={{ gap: '12px' }}>
              <button className="del-btn del-btn-danger" onClick={handlePrev} style={{ width: '40%' }}>
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
              <button className="del-btn del-btn-primary" onClick={handleNext} style={{ width: '60%' }}>
                <CheckCircle2 size={18} />
                <span>Complete Submit</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default DeliveryRegister
