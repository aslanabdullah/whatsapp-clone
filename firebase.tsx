import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore, collection, 
  getDocs, addDoc, setDoc, doc, serverTimestamp, getDoc, query, where } from "firebase/firestore"
import { getAuth, Auth, signInWithPopup, signOut, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC4XSgK_labl2CMKrOGyrZT8eq2zTPt0BQ",
  authDomain: "whatsapp-3ff02.firebaseapp.com",
  projectId: "whatsapp-3ff02",
  storageBucket: "whatsapp-3ff02.appspot.com",
  messagingSenderId: "344154008820",
  appId: "1:344154008820:web:9846d9b78c37f1ce3102a1"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

const db: Firestore = getFirestore(app);

export { auth, signInWithPopup, signOut, providerGoogle, GoogleAuthProvider };
export { db, collection, getDocs, getDoc, addDoc, setDoc, doc, serverTimestamp, query, where };
export default app;
