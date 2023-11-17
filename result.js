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

document.addEventListener('DOMContentLoaded', async () => {
    const table = document.getElementById('dataTable');
    const maxEmotionContainer = document.getElementById('maxEmotionContainer');
    const maxEmotionElement = document.getElementById('maxEmotion');
    const documentId = 'complete_emotion_percentage';

    try {
        // Create a reference to the document
        const docRef = doc(db, 'emotion', documentId);

        // Get the document snapshot
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            // Document exists, extract data
            const dataMap = docSnapshot.data().per;

            // Variables to track maximum emotion
            let maxEmotion = '';
            let maxValue = -Infinity;

            Object.entries(dataMap).forEach(([emotion, value]) => {
                var row = table.insertRow(-1);
                var emotionCell = row.insertCell(0);
                var valueCell = row.insertCell(1);

                emotionCell.innerHTML = emotion;
                valueCell.innerHTML = value;

                // Update maxEmotion if current value is greater
                if (value > maxValue) {
                    maxValue = value;
                    maxEmotion = emotion;
                }
            });

            // Display the emotion with the maximum value outside the table
            maxEmotionElement.textContent = maxEmotion;
        } else {
            // Document doesn't exist
            console.log('No such document!');
            table.innerHTML = '<tr><td colspan="2">No data found</td></tr>';
        }
    } catch (error) {
        // Handle errors
        console.error('Error getting document: ', error);
        table.innerHTML = '<tr><td colspan="2">Error retrieving data</td></tr>';
    }
});