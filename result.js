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

const dataContainer = document.getElementById('output');
const documentId = 'Completedetail';

(async () => {
    try {
        // Create a reference to the document
        const docRef = doc(db, 'emotion', documentId);

        // Get the document snapshot
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            // Document exists, extract data
            const data = docSnapshot.data();
            console.log(data);

            // Analyze the data to find the most common field
            const mostCommonField = findMostCommonField(data);
            console.log(`Most common field: ${mostCommonField}`);

            // Display the data and most common field in the output container
            dataContainer.innerHTML = `<p>${data.per}</p>`;
            dataContainer.innerHTML += `<p>Most common field: ${mostCommonField}</p>`;
        } else {
            // Document doesn't exist
            console.log('No such document!');
            dataContainer.innerHTML = '<p>No data found</p>';
        }
    } catch (error) {
        // Handle errors
        console.error('Error getting document: ', error);
        dataContainer.innerHTML = '<p>Error retrieving data</p>';
    }
})();

function findMostCommonField(data) {
    // Assuming 'fields' is an array field in your document
    const fields = data.per || [];

    // Count occurrences of each field
    const fieldCounts = fields.reduce((acc, field) => {
        acc[field] = (acc[field] || 0) + 1;
        return acc;
    }, {});

    // Find the most common field
    const mostCommonField = Object.keys(fieldCounts).reduce((a, b) =>
        fieldCounts[a] > fieldCounts[b] ? a : b
    );

    return mostCommonField;
}