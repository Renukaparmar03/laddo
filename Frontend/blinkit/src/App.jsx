import React from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CategoryNav from './components/CategoryNav'
import HeroBanner from './components/HeroBanner'
import CategorySection from './components/CategorySection'
import ProductGrid from './components/ProductGrid'
import BottomNav from './components/BottomNav'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <SearchBar />
      <CategoryNav />
      
      <main className="content-area">
        <HeroBanner />
        <CategorySection />
        <ProductGrid />
      </main>

      <BottomNav />
    </div>
  )
}

export default App
