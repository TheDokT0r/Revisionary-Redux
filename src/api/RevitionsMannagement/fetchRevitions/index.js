import app from '../../firebase';
import 'firebase/firestore';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from '../../firebase';

const fetchRevitions = async (keyword) => {
    const querySnapshot = await getDocs(query(collection(firestore, "revitions"), where("isPublic", "==", true)));

    
}