import { db } from '../../firebase/firebase-config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

class CommunityService {
  constructor() {
    this.collection = collection(db, 'communities');
    this.postsCollection = collection(db, 'posts');
  }

  async createGroup(groupData) {
    return await addDoc(this.collection, {
      ...groupData,
      createdAt: new Date(),
      members: [],
      posts: []
    });
  }

  async joinGroup(groupId, userId) {
    const groupRef = doc(this.collection, groupId);
    await updateDoc(groupRef, {
      members: arrayUnion(userId)
    });
  }

  async createPost(groupId, userId, postData) {
    return await addDoc(this.postsCollection, {
      groupId,
      userId,
      ...postData,
      createdAt: new Date(),
      likes: 0,
      comments: []
    });
  }
}

export default new CommunityService();
