import { db } from '../../firebase/firebase-config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

class MeditationService {
  constructor() {
    this.collection = collection(db, 'meditations');
  }

  async startSession(userId, sessionData) {
    return await addDoc(this.collection, {
      userId,
      ...sessionData,
      startedAt: new Date(),
      completed: false
    });
  }

  async completeSession(sessionId, duration) {
    const sessionRef = doc(this.collection, sessionId);
    await updateDoc(sessionRef, {
      completed: true,
      duration,
      completedAt: new Date()
    });
  }

  async getUserSessions(userId) {
    const q = query(this.collection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}

export default new MeditationService();
