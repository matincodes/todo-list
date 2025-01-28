
const firebaseConfig = {
  apiKey: "AIzaSyDGLK7Nj42RVUbNubE6RFyAjgVxspnqXZg",
  authDomain: "to-do-list-b5b72.firebaseapp.com",
  projectId: "to-do-list-b5b72",
  storageBucket: "to-do-list-b5b72.firebasestorage.app",
  messagingSenderId: "88175997155",
  appId: "1:88175997155:web:a2b30e96bca9f422bad5d6",
  measurementId: "G-QM28VLZ9NB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();