import React, { useState, useEffect } from 'react'
import { Calendar, ShoppingBag, MapPin, TrendingUp, RefreshCw } from 'lucide-react'
import './Delivery.css'

function DeliveryHistory() {
  const [trips, setTrips] = useState([]);
  const [activeTab, setActiveTab] = useState('Daily');

  useEffect(() => {
    // Load from local storage, fallback to pre-loaded mock trips
    const localTrips = localStorage.getItem('rider_trips');
    if (localTrips) {
      setTrips(JSON.parse(localTrips));
    } else {
      const mockTrips = [
        {
          id: '#ORD-7811',
          date: 'Today',
          time: '08:14 PM',
          store: 'Blinkit Dark Store - Sector 62',
          destination: 'Rohan Joshi (Sector 62, Flat 12A)',
          payout: '₹38.00',
          itemsCount: 4
        },
        {
          id: '#ORD-6902',
          date: 'Yesterday',
          time: '02:40 PM',
          store: 'Blinkit Dark Store - Sector 62',
          destination: 'Megha Gupta (Sector 63, B-90)',
          payout: '₹48.50',
          itemsCount: 8
        },
        {
          id: '#ORD-5801',
          date: '15 May 2026',
          time: '12:10 PM',
          store: 'Blinkit Dark Store - Sector 62',
          destination: 'Vijay Sinha (Sector 59, Flat 501)',
          payout: '₹32.00',
          itemsCount: 2
        }
      ];
      setTrips(mockTrips);
      localStorage.setItem('rider_trips', JSON.stringify(mockTrips));
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('rider_trips');
    localStorage.removeItem('rider_earnings');
    setTrips([]);
  };

  const getFilteredTrips = () => {
    if (activeTab === 'Daily') {
      return trips.filter(t => t.date === 'Today');
    }
    if (activeTab === 'Weekly') {
      return trips.filter(t => t.date === 'Today' || t.date === 'Yesterday');
    }
    return trips; // Monthly
  };

  const filteredTrips = getFilteredTrips();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '20px' }}>
      
      {/* Title Header */}
      <div className="del-flex-between" style={{ marginBottom: '4px' }}>
        <div>
          <h2 className="del-font-extrabold" style={{ margin: 0, fontSize: '22px' }}>Trips History</h2>
          <p style={{ color: 'var(--del-text-muted)', fontSize: '13px', margin: 0 }}>List of completed deliveries.</p>
        </div>
        
        {trips.length > 0 && (
          <button 
            onClick={handleClearHistory} 
            style={{ 
              background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', 
              color: '#ef4444', padding: '6px 12px', borderRadius: '8px', 
              fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' 
            }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: 'var(--del-card-border)', borderRadius: '12px', padding: '4px' }}>
        {['Daily', 'Weekly', 'Monthly'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '8px 0',
              border: 'none',
              background: activeTab === tab ? 'var(--del-card-bg)' : 'transparent',
              color: activeTab === tab ? 'var(--del-primary)' : 'var(--del-text-muted)',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === tab ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* History cards timeline */}
      {filteredTrips.length === 0 ? (
        <div className="del-card del-text-center" style={{ padding: '40px 20px', marginTop: '10px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <h3 className="del-font-bold" style={{ margin: '0 0 6px 0' }}>No Trips {activeTab}</h3>
          <p style={{ color: 'var(--del-text-muted)', fontSize: '13px', margin: 0 }}>
            No completed trips found for this time period.
          </p>
        </div>
      ) : (
        <div className="del-flex-col" style={{ gap: '12px' }}>
          {filteredTrips.map((trip, idx) => (
            <div key={idx} className="del-card" style={{ padding: '16px 18px' }}>
              
              {/* Card Title Header */}
              <div className="del-flex-between" style={{ borderBottom: '1px solid var(--del-card-border)', paddingBottom: '10px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={14} style={{ color: 'var(--del-primary)' }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--del-text-muted)' }}>{trip.date} • {trip.time}</span>
                </div>
                <span style={{ fontSize: '11px', background: 'rgba(12,131,31,0.1)', color: 'var(--del-primary)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  COMPLETED
                </span>
              </div>

              {/* Path layout */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <MapPin size={15} style={{ color: 'var(--del-primary)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ color: 'var(--del-text-muted)', fontSize: '11px', display: 'block' }}>PICKUP STORE</span>
                    <span style={{ fontWeight: 600 }}>{trip.store}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <MapPin size={15} style={{ color: '#3b82f6', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ color: 'var(--del-text-muted)', fontSize: '11px', display: 'block' }}>DELIVERY DROP</span>
                    <span style={{ fontWeight: 600 }}>{trip.destination}</span>
                  </div>
                </div>
              </div>

              {/* Summary line footer */}
              <div className="del-flex-between" style={{ background: 'var(--del-bg)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--del-card-border)', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--del-text-muted)' }}>
                  <ShoppingBag size={14} />
                  <span>{trip.itemsCount} Items</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={14} style={{ color: 'var(--del-primary)' }} />
                  <span style={{ fontWeight: 800, color: 'var(--del-primary)' }}>{trip.payout}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default DeliveryHistory
