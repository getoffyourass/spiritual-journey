import { db } from '../../firebase/firebase-config';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

class ShopService {
  constructor() {
    this.collection = collection(db, 'shop');
    this.usersCollection = collection(db, 'users');
  }

  async getShopItems() {
    const items = await getDocs(this.collection);
    return items.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async purchaseItem(userId, itemId) {
    const userRef = doc(this.usersCollection, userId);
    const itemRef = doc(this.collection, itemId);

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

    return itemData;
  }
}

export default new ShopService();
