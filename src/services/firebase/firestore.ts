// Import the functions you need from the SDKs you need
import { initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

console.log('🚀 Initializing firebase admin app');

// Initialize Firebase
const app: App = initializeApp(
  {
    credential: cert('algo-to-the-future-key.json')
  },
  'algo-admin'
);
// Initialize database & auth
export const FirebaseAdminAuth = getAuth(app);
export const FirebaseDB = getFirestore(app);
