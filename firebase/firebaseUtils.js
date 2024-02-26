import { getDocs, collection, addDoc } from "firebase/firestore";

// Devuelve un array con todos los documentos de la coleccion
const getCollection = async (db, collection_) => {
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
const uploadDoc = async (db, collection_, data) => {
    try {
        const docRef = await addDoc(collection(db, collection_), data);
    } catch (error) {
        console.log(error);
    }
}
export default { getCollection, uploadDoc };