import app from './firebase'
import 'firebase/firestore';

const getUserData = async (uid) => {
  const snapshot = await app.firestore().collection('users').where('uid', '==', uid).get();

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }

  const userData = snapshot.docs[0].data();

  return userData;
};

export default getUserData;