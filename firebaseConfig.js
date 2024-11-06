// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDDK3Vz2Et1P7zA0sbK0cslX51C5E0Ml8g',
  authDomain: 'mobile-df37e.firebaseapp.com',
  projectId: 'mobile-df37e',
  storageBucket: 'mobile-df37e.firebasestorage.com',
  messagingSenderId: '1055719721288',
  appId: '1:1055719721288:android:29a9d536fc8ecff423cb7d',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export Firebase and auth
const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, auth, firestore };
