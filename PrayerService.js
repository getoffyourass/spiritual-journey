import { db } from '../../firebase/firebase-config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

class PrayerService {
  constructor() {
    this.collection = collection(db, 'prayers');
  }

  async addPrayer(userId, prayerData) {
    return await addDoc(this.collection, {
      userId,
      ...prayerData,
      createdAt: new Date(),
      completed: false
    });
  }

  async getUserPrayers(userId) {
    const q = query(this.collection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async markPrayerComplete(prayerId) {
    const prayerRef = doc(this.collection, prayerId);
    await updateDoc(prayerRef, {
      completed: true,
      completedAt: new Date()
    });
  }
}

export default new PrayerService();
