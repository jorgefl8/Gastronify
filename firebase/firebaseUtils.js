import { getDocs, collection, addDoc } from "firebase/firestore";
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

export default { getCollection, uploadDoc, uploadJSONMenu };