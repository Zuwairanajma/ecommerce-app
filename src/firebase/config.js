import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: 'eshop-54135.firebaseapp.com',
  projectId: 'eshop-54135',
  storageBucket: 'eshop-54135.appspot.com',
  messagingSenderId: '304140416792',
  appId: '1:304140416792:web:63b62f1b51c0dd25da906d',
  measurementId: 'G-3LSEVTSZYL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
