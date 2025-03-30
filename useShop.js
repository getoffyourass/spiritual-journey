import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase-config';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';

export const useShop = (userId) => {
  const [items, setItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'shop_items'));
      setItems(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchInventory = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      setInventory(userDoc.data()?.inventory || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const purchaseItem = async (itemId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const itemRef = doc(db, 'shop_items', itemId);
      
      const [userDoc, itemDoc] = await Promise.all([
        getDoc(userRef),
        getDoc(itemRef)
      ]);

      const userData = userDoc.data();
      const itemData = itemDoc.data();

      if (userData.gems < itemData.price) {
        throw new Error('Insufficient gems');
      }

      await updateDoc(userRef, {
        gems: userData.gems - itemData.price,
        inventory: [...userData.inventory, itemId]
      });

      await fetchInventory();
      return itemData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchItems();
    if (userId) {
      fetchInventory();
    }
  }, [userId]);

  return {
    items,
    inventory,
    loading,
    error,
    purchaseItem,
    fetchItems,
    fetchInventory
  };
};
