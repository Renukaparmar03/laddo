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
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('home'); // 'home' or 'orders'
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
          <Header setActiveTab={handleTabChange} />
          <SearchBar />
          
          {activeTab === 'home' ? (
            <>
              <CategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
              
              <main className="content-area">
                <HeroBanner />
                <CategorySection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <ProductGrid activeCategory={activeCategory} onProductSelect={setSelectedProduct} />
              </main>
            </>
          ) : (
            <main className="content-area">
              <OrdersPage onProductSelect={setSelectedProduct} />
            </main>
          )}

          <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
        </>
      )}
    </div>
  )
}

export default App
