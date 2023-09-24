import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA4DIuKckArN7sIZ6zKX5tNXfdCd8nGNQ4",
  authDomain: "daily-moments-e23ac.firebaseapp.com",
  projectId: "daily-moments-e23ac",
  storageBucket: "daily-moments-e23ac.appspot.com",
  messagingSenderId: "825065807657",
  appId: "1:825065807657:web:5e23839d6685401e916138",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
