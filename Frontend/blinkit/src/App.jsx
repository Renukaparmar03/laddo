import React, { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CategoryNav from './components/CategoryNav'
import HeroBanner from './components/HeroBanner'
import CategorySection from './components/CategorySection'
import ProductGrid from './components/ProductGrid'
import BottomNav from './components/BottomNav'
import OrdersPage from './components/OrdersPage'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('home'); // 'home' or 'orders'

  return (
    <div className="app">
      <Header setActiveTab={setActiveTab} />
      <SearchBar />
      
      {activeTab === 'home' ? (
        <>
          <CategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          
          <main className="content-area">
            <HeroBanner />
            <CategorySection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <ProductGrid activeCategory={activeCategory} />
          </main>
        </>
      ) : (
        <main className="content-area">
          <OrdersPage />
        </main>
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App
