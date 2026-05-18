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
import ProfilePage from './components/ProfilePage'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'orders', or 'profile'

  return (
    <div className="app">
      {/* Persistent Address Header & Searchbar are ONLY rendered on the homepage tab */}
      {activeTab === 'home' && (
        <>
          <Header setActiveTab={setActiveTab} setActiveCategory={setActiveCategory} />
          <SearchBar />
        </>
      )}
      
      {activeTab === 'home' && (
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
      )}

      {activeTab === 'orders' && (
        <main className="content-area full-tab-view">
          <OrdersPage />
        </main>
      )}

      {activeTab === 'profile' && (
        <main className="content-area full-tab-view">
          <ProfilePage setActiveTab={setActiveTab} setActiveCategory={setActiveCategory} />
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
