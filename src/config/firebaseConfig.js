// Firebase Imports
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  updateDoc 
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBL5DxNL5cQ-EJVZAdNo8SIHIXy8Q9qTPc",
  authDomain: "skilltree-dashboard-6190b.firebaseapp.com",
  projectId: "skilltree-dashboard-6190b",
  storageBucket: "skilltree-dashboard-6190b.firebasestorage.app",
  messagingSenderId: "1071496240143",
  appId: "1:1071496240143:web:85cfcc376c95bf6675177a",
  measurementId: "G-JEVD9Q6YEN"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);


export const listenToUsers = (callback) => {
  const usersRef = collection(db, "users");
  return onSnapshot(usersRef, (snapshot) => {
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(users);
  });
};

export const addUser = async (userData) => {
  const usersRef = collection(db, "users");
  await addDoc(usersRef, userData);
};


export const deleteUser = async (id) => {
  await deleteDoc(doc(db, "users", id));
};

export const updateUser = async (id, updatedData) => {
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, updatedData);
};
