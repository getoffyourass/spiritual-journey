import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase-config';
import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';

export const useMeditation = (userId) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, 'meditation_sessions'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      setSessions(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startSession = async (sessionData) => {
    try {
      const docRef = await addDoc(collection(db, 'meditation_sessions'), {
        userId,
        ...sessionData,
        startedAt: new Date(),
        status: 'in_progress'
      });
      return docRef.id;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const completeSession = async (sessionId, duration) => {
    try {
      await updateDoc(doc(db, 'meditation_sessions', sessionId), {
        status: 'completed',
        duration,
        completedAt: new Date()
      });
      await fetchSessions();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSessions();
    }
  }, [userId]);

  return {
    sessions,
    loading,
    error,
    startSession,
    completeSession,
    fetchSessions
  };
};
