 
import { initializeApp } from "firebase/app";


import { getAuth} from "firebase/auth";
import{getFirestore} from 'firebase/firestore';


import { getStorage, ref } from 'firebase/storage';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwgD3XAV58dmyso1T6G6qDXzuSG3pRb5E",
  authDomain: "clinic-project-bd9d7.firebaseapp.com",
  databaseURL: "https://clinic-project-bd9d7-default-rtdb.firebaseio.com",
  projectId: "clinic-project-bd9d7",
  storageBucket: "clinic-project-bd9d7.firebasestorage.app",
  messagingSenderId: "596967891956",
  appId: "1:596967891956:web:f5b987ec00c7c505604fa1",
  measurementId: "G-DYXJE1T6W3"
};


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const firestore = getFirestore(app);
  
  export { app, auth, db, storage, ref,firestore  };


 