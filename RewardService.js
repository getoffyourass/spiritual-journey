import { db } from '../../firebase/firebase-config';
import { doc, updateDoc, increment } from 'firebase/firestore';

class RewardService {
  constructor() {
    this.collection = collection(db, 'users');
  }

  async awardGems(userId, amount) {
    const userRef = doc(this.collection, userId);
    await updateDoc(userRef, {
      'progress.gems': increment(amount)
    });
  }

  async updateStreak(userId) {
    const userRef = doc(this.collection, userId);
    await updateDoc(userRef, {
      'progress.streak': increment(1),
      'progress.lastActivity': new Date()
    });
  }

  async addAchievement(userId, achievement) {
    const userRef = doc(this.collection, userId);
    await updateDoc(userRef, {
      'progress.achievements': arrayUnion(achievement)
    });
  }
}

export default new RewardService();
