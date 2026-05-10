import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update, onValue } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type NextOrObserver, type User} from 'firebase/auth';
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBM2daL6o8eKzBKuudxWNk4r-Gl9qwvbrU",
  authDomain: "studysync-8431e.firebaseapp.com",
  databaseURL: "https://studysync-8431e-default-rtdb.firebaseio.com",
  projectId: "studysync-8431e",
  storageBucket: "studysync-8431e.firebasestorage.app",
  messagingSenderId: "241056413733",
  appId: "1:241056413733:web:896aa99e49c4d10005a7cc"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase)
const firebaseSignOut = () => signOut(auth);

export const signInWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
}

export { firebaseSignOut as signOut};

export const updateData = (path: string, value: object) => (
  update(ref(database, path), value)
);

export const useDataQuery = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    return onValue(ref(database, path), (snapshot) => {
      setData(snapshot.val());
      setLoading(false);
    }, (error) => {
      setError(error);
      setLoading(false);
    });
  }, [path]);

  return [data, loading, error];
};

export interface AuthState {
  user: User | null,
  isAuthenticated: boolean,
  isInitialLoading: boolean
}

export const addAuthStateListener = (fn: NextOrObserver<User>) => (
  onAuthStateChanged(auth, fn)
);

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState(auth.currentUser);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(
    () =>
      addAuthStateListener((user) => {
        setUser(user);
        setIsInitialLoading(false);
      }),
    []
  );

  return { user, isAuthenticated, isInitialLoading };
};