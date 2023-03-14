import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";


const getUid = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        resolve(uid);
      } else {
        resolve(false);
      }
    });
  });
};

export default getUid;
