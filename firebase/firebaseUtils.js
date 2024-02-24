import {  getDocs, collection } from "firebase/firestore";

const getCollection = async (db, collection_) => {
    const querySnapshot = await getDocs(collection(db, collection_));
    var dataCollection = []
    querySnapshot.forEach((doc) => {
        dataCollection.push(doc.data());
    });
    return dataCollection;
};
export default {getCollection};