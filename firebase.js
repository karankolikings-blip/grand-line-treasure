import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA61IYQg9dPJBYXaVfwOmSMK4PUBSP1OM",
  authDomain: "grandlinetreasure-acc2d.firebaseapp.com",
  projectId: "grandlinetreasure-acc2d",
  storageBucket: "grandlinetreasure-acc2d.appspot.com",
  messagingSenderId: "650437968573",
  appId: "1:650437968573:web:0ffe9a0a74fcb852f22dd4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.auth = auth;
window.db = db;
window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.signOut = signOut;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;
window.query = query;
window.where = where;