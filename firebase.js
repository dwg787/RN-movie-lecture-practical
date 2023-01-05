import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAoIhcUJZgHUV25DLc9hTZUdcjMj6VNH6Y',
  authDomain: 'rn-movie-63390.firebaseapp.com',
  projectId: 'rn-movie-63390',
  storageBucket: 'rn-movie-63390.appspot.com',
  messagingSenderId: '580861193659',
  appId: '1:580861193659:web:863e90038421668019e89e',
};

const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
