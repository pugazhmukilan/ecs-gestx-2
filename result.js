// Import the necessary functions from Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

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

const table = document.getElementById('dataTable');
const documentId = 'complete_emotion_percentage';
(async () => {
    try {
        // Create a reference to the document
        const docRef = doc(db, 'emotion', documentId);

        // Get the document snapshot
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            // Document exists, extract data
            const dataArray = docSnapshot.data().per;

            dataArray.forEach((element) => {
                var row = table.insertRow(-1);
                var cell = row.insertCell(0);
                cell.innerHTML = element;
            });
        } else {
            // Document doesn't exist
            console.log('No such document!');
            table.innerHTML = '<tr><td>No data found</td></tr>';
        }
    } catch (error) {
        // Handle errors
        console.error('Error getting document: ', error);
        table.innerHTML = '<tr><td>Error retrieving data</td></tr>';
    }
})();