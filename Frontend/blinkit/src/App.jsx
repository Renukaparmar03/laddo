import React, { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CategoryNav from './components/CategoryNav'
import HeroBanner from './components/HeroBanner'
import CategorySection from './components/CategorySection'
import ProductGrid from './components/ProductGrid'
import BottomNav from './components/BottomNav'
import OrdersPage from './components/OrdersPage'
<<<<<<< HEAD
import ProductDetailPage from './components/ProductDetailPage'
=======
import CategoryPage from './components/CategoryPage'
import ProfilePage from './components/ProfilePage'
>>>>>>> e1ff80d8a1e4369efcde73d024733ca3948065af
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
<<<<<<< HEAD
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
=======
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
>>>>>>> e1ff80d8a1e4369efcde73d024733ca3948065af
        <>
          <Header setActiveTab={handleTabChange} />
          <SearchBar />
          
          {activeTab === 'home' ? (
            <>
              <CategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
              
              <main className="content-area">
                <HeroBanner />
                <CategorySection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
<<<<<<< HEAD
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
=======
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
>>>>>>> e1ff80d8a1e4369efcde73d024733ca3948065af
    </div>
  )
}

export default App
