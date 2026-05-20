import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CategoryNav from './components/CategoryNav'
import HeroBanner from './components/HeroBanner'
import CategorySection from './components/CategorySection'
import ProductGrid from './components/ProductGrid'
import BottomNav from './components/BottomNav'
import OrdersPage from './components/OrdersPage'
import ProductDetailPage from './components/ProductDetailPage'
import CategoryPage from './components/CategoryPage'
import ProfilePage from './components/ProfilePage'
import DeliveryApp from './components/delivery/DeliveryApp'
import SellerApp from './components/seller/SellerApp'
import './App.css'

function CustomerApp() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect base path to /user/home
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/user' || location.pathname === '/user/') {
      navigate('/user/home', { replace: true });
    }
  }, [location.pathname, navigate]);

  // Derive active tab from URL path
  let activeTab = 'home';
  if (location.pathname.includes('/user/orders')) activeTab = 'orders';
  if (location.pathname.includes('/user/profile')) activeTab = 'profile';

  const handleTabChange = (tab) => {
    navigate(`/user/${tab}`);
    setSelectedProduct(null);
  };

  return (
    <div className="app">
      {selectedProduct ? (
        <main className="content-area">
          <ProductDetailPage 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
            onSelectProduct={setSelectedProduct} 
          />
        </main>
      ) : (
        <>
          {/* Persistent Address Header & Searchbar are rendered on the homepage and orders tab */}
          {(activeTab === 'home' || activeTab === 'orders') && (
            <>
              <Header setActiveTab={handleTabChange} setActiveCategory={setActiveCategory} />
              <SearchBar />
            </>
          )}

          {activeTab === 'home' && (
            <>
              <CategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
              
              <main className="content-area">
                <HeroBanner />
                <CategorySection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                {activeCategory === 'All' ? (
                  <ProductGrid activeCategory={activeCategory} onProductSelect={setSelectedProduct} />
                ) : (
                  <CategoryPage 
                    activeCategory={activeCategory} 
                    setActiveCategory={setActiveCategory} 
                    onProductSelect={setSelectedProduct} 
                  />
                )}
              </main>
            </>
          )}

          {activeTab === 'orders' && (
            <main className="content-area full-tab-view">
              <OrdersPage onProductSelect={setSelectedProduct} />
            </main>
          )}

          {activeTab === 'profile' && (
            <main className="content-area full-tab-view">
              <ProfilePage setActiveTab={handleTabChange} setActiveCategory={setActiveCategory} />
            </main>
          )}

          <BottomNav 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </>
      )}
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/delivery/*" element={<DeliveryApp />} />
      <Route path="/seller/*" element={<SellerApp />} />
      <Route path="/user/*" element={<CustomerApp />} />
      <Route path="/" element={<Navigate to="/user/home" replace />} />
    </Routes>
  )
}

export default App

