import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBG8MIBlyfvmLVqaCu4yupWZSg2EXJARw4',
  authDomain: 'react-womanup-todo-4a16e.firebaseapp.com',
  projectId: 'react-womanup-todo-4a16e',
  storageBucket: 'react-womanup-todo-4a16e.appspot.com',
  messagingSenderId: '838651967839',
  appId: '1:838651967839:web:8005d419853a2b53601eea',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
