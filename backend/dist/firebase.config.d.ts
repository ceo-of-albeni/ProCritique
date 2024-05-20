import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
declare const app: import("@firebase/app").FirebaseApp;
declare const firestore: import("@firebase/firestore").Firestore;
declare const auth: import("@firebase/auth").Auth;
declare const database: import("@firebase/database").Database;
declare const storage: import("@firebase/storage").FirebaseStorage;
export { app, firestore, auth, database, storage, collection, doc, setDoc, getDoc, signInWithEmailAndPassword, createUserWithEmailAndPassword };
