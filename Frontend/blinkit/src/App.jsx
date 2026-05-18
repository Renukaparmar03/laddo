import React, { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CategoryNav from './components/CategoryNav'
import HeroBanner from './components/HeroBanner'
import CategorySection from './components/CategorySection'
import ProductGrid from './components/ProductGrid'
import BottomNav from './components/BottomNav'
import OrdersPage from './components/OrdersPage'
import CategoryPage from './components/CategoryPage'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('home'); // 'home' or 'orders'

  return (
    <div className="app">
      <Header setActiveTab={setActiveTab} setActiveCategory={setActiveCategory} />
      <SearchBar />
      
      {activeTab === 'home' ? (
        <>
          <CategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          
          <main className="content-area">
            {activeCategory === 'All' ? (
              <>
                <HeroBanner />
                <CategorySection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <ProductGrid activeCategory={activeCategory} />
              </>
            ) : (
              <CategoryPage activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            )}
          </main>
        </>
      ) : (
        <main className="content-area">
          <OrdersPage />
        </main>
      )}

      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </div>
  )
}

export default App
