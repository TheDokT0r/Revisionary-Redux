import app from '../../firebase';
import 'firebase/firestore';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from '../../firebase';

const userDataCache = new Map();

const getUserData = async (uid) => {
  console.log('Fetching user data...');

  if (userDataCache.has(uid)) {
    console.log('Returning cached user data...');
    return userDataCache.get(uid);
  }
  
  const querySnapshot = await getDocs(query(collection(firestore, "users"), where("uid", "==", uid)));
  if (querySnapshot.docs.length > 0) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    console.log('Caching user data...');
    userDataCache.set(uid, userData);

    return userData;
  } else {
    return null;
  }
};

export default getUserData;
