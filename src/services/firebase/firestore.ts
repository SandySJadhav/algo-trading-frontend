// Import the functions you need from the SDKs you need
import { initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase
const app: App = initializeApp(
  {
    credential: cert('algo-to-the-future-key.json')
  },
  'my-firestore-admin'
);
// Initialize database & auth
const auth = getAuth(app);
const db = getFirestore(app);
const Firestore = { db, auth };

export default Firestore;
