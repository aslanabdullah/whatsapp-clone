import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, setDoc, collection, addDoc, doc, serverTimestamp } from "../firebase"
import Login from './Login';
import Loading from './component/Loading';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  const [user, loading] = useAuthState(auth);

  const addUser = async () => {
    try {
      const usersRef = collection(db, "users");
      const docRef = await setDoc(doc(usersRef, user!.uid!), {
        email: user!.email,
        displayName: user!.displayName,
        lastSeen: serverTimestamp(),
        photoURL: user!.photoURL
      });
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {

    if (user) {      
      addUser();
    }
  }, [user]);
  

  if(loading) return <Loading/>
  if (!user) {
    return <Login></Login>
  }


  return <Component {...pageProps} />
}

export default MyApp
