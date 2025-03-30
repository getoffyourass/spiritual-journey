import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase-config';
import { 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  updateDoc,
  doc 
} from 'firebase/firestore';

export const usePrayer = (userId) => {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrayers();
  }, [userId]);

  const fetchPrayers = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, 'prayers'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const prayerList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPrayers(prayerList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPrayer = async (prayerData) => {
    try {
      const docRef = await addDoc(collection(db, 'prayers'), {
        ...prayerData,
        userId,
        createdAt: new Date(),
        completed: false
      });
      return docRef.id;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const completePrayer = async (prayerId) => {
    try {
      await updateDoc(doc(db, 'prayers', prayerId), {
        completed: true,
        completedAt: new Date()
      });
      await fetchPrayers();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    prayers,
    loading,
    error,
    addPrayer,
    completePrayer,
    fetchPrayers
  };
};
