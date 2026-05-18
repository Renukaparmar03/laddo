import React, { useState } from 'react'
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
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'orders', or 'profile'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
          {/* Persistent Address Header & Searchbar are ONLY rendered on the homepage tab */}
          {activeTab === 'home' && (
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

export default App
