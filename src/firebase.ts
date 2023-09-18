import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4DIuKckArN7sIZ6zKX5tNXfdCd8nGNQ4",
  authDomain: "daily-moments-e23ac.firebaseapp.com",
  projectId: "daily-moments-e23ac",
  storageBucket: "daily-moments-e23ac.appspot.com",
  messagingSenderId: "825065807657",
  appId: "1:825065807657:web:5e23839d6685401e916138",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = firebase.firestore();
