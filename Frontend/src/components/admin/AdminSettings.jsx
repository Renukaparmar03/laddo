import React, { useState, useEffect } from 'react';
import { Save, Loader } from 'lucide-react';
import './AdminApp.css';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    deliveryTime: '10–15 mins',
    freeDeliveryThreshold: 199,
    deliveryFee: 25,
    gstPercentage: 5,
    handlingFee: 2,
    platformFee: 0,
    cancellationPolicyTitle: 'Cancellation Policy',
    cancellationPolicyText: 'Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({
          deliveryTime: data.deliveryTime || '10–15 mins',
          freeDeliveryThreshold: data.freeDeliveryThreshold ?? 199,
          deliveryFee: data.deliveryFee ?? 25,
          gstPercentage: data.gstPercentage ?? 5,
          handlingFee: data.handlingFee ?? 2,
          platformFee: data.platformFee ?? 0,
          cancellationPolicyTitle: data.cancellationPolicyTitle || 'Cancellation Policy',
          cancellationPolicyText: data.cancellationPolicyText || 'Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.'
        });
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const res = await fetch('http://localhost:5000/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (res.ok) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save settings.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center"><Loader className="animate-spin inline mr-2" /> Loading settings...</div>;
  }

  return (
    <div className="admin-page">
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <h2>Platform Settings</h2>
        <p>Manage dynamic variables for checkout and app behavior.</p>
      </div>

      {message && (
        <div style={{ padding: '10px 15px', backgroundColor: message.includes('success') ? '#e6f4ea' : '#fce8e8', color: message.includes('success') ? '#1e4620' : '#c5221f', borderRadius: '8px', marginBottom: '20px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ padding: '24px' }}>
        
        <h3 style={{ marginBottom: '16px', fontSize: '18px', color: '#1a1a1a', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Delivery Settings</h3>
        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Default Delivery Time</label>
            <input type="text" name="deliveryTime" value={settings.deliveryTime} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Free Delivery Threshold (₹)</label>
            <input type="number" name="freeDeliveryThreshold" value={settings.freeDeliveryThreshold} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Base Delivery Fee (₹)</label>
            <input type="number" name="deliveryFee" value={settings.deliveryFee} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
        </div>

        <h3 style={{ marginBottom: '16px', fontSize: '18px', color: '#1a1a1a', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Tax & Charges</h3>
        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>GST Percentage (%)</label>
            <input type="number" step="0.1" name="gstPercentage" value={settings.gstPercentage} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Handling Fee (₹)</label>
            <input type="number" name="handlingFee" value={settings.handlingFee} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Platform Fee (₹)</label>
            <input type="number" name="platformFee" value={settings.platformFee} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
        </div>

        <h3 style={{ marginBottom: '16px', fontSize: '18px', color: '#1a1a1a', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Cancellation Policy</h3>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Policy Title</label>
          <input type="text" name="cancellationPolicyTitle" value={settings.cancellationPolicyTitle} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
        </div>
        <div className="form-group" style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Policy Description</label>
          <textarea name="cancellationPolicyText" value={settings.cancellationPolicyText} onChange={handleChange} className="form-input" rows="4" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', resize: 'vertical' }} />
        </div>

        <button type="submit" disabled={saving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '16px' }}>
          {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
