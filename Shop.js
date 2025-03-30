import React, { useState, useEffect } from 'react';
import { useShop } from '../hooks/useShop';
import { useAuth } from '../features/auth/AuthContext';
import ShopItem from '../components/shop/ShopItem';
import GemBalance from '../components/shop/GemBalance';
import ShopCategories from '../components/shop/ShopCategories';

const Shop = () => {
  const { user } = useAuth();
  const { items, loading, error, fetchItems } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'themes', name: 'Themes' },
    { id: 'sounds', name: 'Meditation Sounds' },
    { id: 'backgrounds', name: 'Backgrounds' },
    { id: 'premium', name: 'Premium Features' }
  ];

  const filteredItems = items.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="shop-page">
      <header className="shop-header">
        <h1>Spiritual Shop</h1>
        <GemBalance userId={user.uid} />
      </header>

      <ShopCategories 
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {loading ? (
        <div className="loading-spinner" />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="shop-grid">
          {filteredItems.map(item => (
            <ShopItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
