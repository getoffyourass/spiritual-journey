import create from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase/firebase-config';

const useStore = create(
  persist(
    (set, get) => ({
      // User preferences
      preferences: {
        theme: 'light',
        religion: null,
        language: 'en',
        notifications: true
      },
      
      // User progress
      progress: {
        streak: 0,
        gems: 0,
        completedSessions: 0,
        achievements: []
      },
      
      // Actions
      setPreference: (key, value) => {
        set(state => ({
          preferences: {
            ...state.preferences,
            [key]: value
          }
        }));
      },
      
      updateProgress: (updates) => {
        set(state => ({
          progress: {
            ...state.progress,
            ...updates
          }
        }));
      },
      
      // Sync with Firebase
      syncWithFirebase: async (userId) => {
        if (!userId) return;
        
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();
        
        set({
          preferences: userData.preferences || get().preferences,
          progress: userData.progress || get().progress
        });
      }
    }),
    {
      name: 'spiritual-journey-storage',
      getStorage: () => localStorage
    }
  )
);

export default useStore;
