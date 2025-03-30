import React from 'react';
import { useShop } from '../../hooks/useShop';
import { useAuth } from '../../features/auth/AuthContext';

const ShopItem = ({ item }) => {
  const { purchaseItem } = useShop();
  const { user } = useAuth();

  const handlePurchase = async () => {
    try {
      await purchaseItem(user.uid, item.id);
      // Show success notification
    } catch (error) {
      // Show error notification
    }
  };

  return (
    <div className="shop-item">
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="shop-item-image"
      />
      <div className="shop-item-content">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="shop-item-price">
          <span className="gem-icon">💎</span>
          <span>{item.price}</span>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handlePurchase}
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default ShopItem;
