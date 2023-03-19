import { auth, firestore } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore'

const createRevition = async (data) => {
    try {
        const db = firestore;
        const docRef = await addDoc(collection(db, "revitions"), data);
        console.log("Document written with ID: ", docRef.id);
    }
    catch (e) {
        console.log(e);
    }
}

export default createRevition;