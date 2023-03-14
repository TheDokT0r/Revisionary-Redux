import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';


const getUid = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
        resolve(uid);
      } else {
        console.log("user isn't logged out");
        resolve(false);
      }
    });
  });
};

export default getUid;
