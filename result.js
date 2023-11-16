// Import the necessary functions from Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDyOXjT2mYo3g72q1NLSREZg9HX7bzDsCI",
  authDomain: "ecs-project-3a8d3.firebaseapp.com",
  projectId: "ecs-project-3a8d3",
  storageBucket: "ecs-project-3a8d3.appspot.com",
  messagingSenderId: "587479702485",
  appId: "1:587479702485:web:ccc1b75533437d281a7b5c",
  measurementId: "G-NTJ6F80SY5"
  
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

const dataContainer = document.getElementById('output');

// Fetch data from Firestore using async/await for simplicity
(async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'emotion'));

        querySnapshot.forEach(doc => {
            const data = doc.data();
            console.log(data);
            dataContainer.innerHTML += `<p>${data.per}</p>`;
        });
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
})();
