import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from 'firebase/auth';
import config from '../../firebase-applet-config.json';

const app = initializeApp(config);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, config.firestoreDatabaseId);

export const auth = getAuth(app);

export { doc, setDoc, getDoc, onSnapshot, signInAnonymously, onAuthStateChanged, signOut };
