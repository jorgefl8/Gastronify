import { getDocs, collection, addDoc, doc, getDoc , setDoc} from "firebase/firestore";
import { FirestoreDB } from "./firebaseconfig.js";
import DataMenu from "../src/Menu.js"
const db = FirestoreDB;

const getCollection = async (collection_) => {
    try {
        const querySnapshot = await getDocs(collection(db, collection_));
        var dataCollection = []
        querySnapshot.forEach((doc) => {
            dataCollection.push(doc.data());
        });
        return dataCollection;
    } catch (error) {
        console.log(error);
    }

};
// Suebe el documento como json a la coleccion dada
const uploadDoc = async (collection_, data) => {
    try {
        const docRef = await addDoc(collection(db, collection_), data);
    } catch (error) {
        console.log(error);
    }
}

const uploadJSONMenu = async (collection_) => {
    try {
        DataMenu.forEach(async x => await addDoc(collection(db, collection_), x));
    } catch (error) {
        console.log(error);
    }
}

const getCollectionByDoc = async (collection_, doc_) => {
    try {
        //console.log(collection_, doc_)
      const currentUser = doc(
        db,
        collection_,
        doc_
      );
      const userDoc = await getDoc(currentUser);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  };

const updateDocByUid = async (collection_, doc_, data) => {
    try {
        await setDoc(doc(db, collection_, doc_), data);
    } catch (error) {
        console.log(error);
    }


}

export default { getCollection, uploadDoc, uploadJSONMenu, getCollectionByDoc, updateDocByUid };