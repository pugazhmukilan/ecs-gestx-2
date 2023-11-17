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

  // Get a Firestore reference
  const firestore = getFirestore(firebaseApp);

  let [seconds, minutes, hours] = [45, 0, 0];
  let timeref = document.querySelector(".timer-display");
  let maxEmotionDisplay = document.getElementById("max-emotion");
  let int = null;

  document.getElementById("start-button").addEventListener("click", async () => {
    if (int !== null) {
      clearInterval(int);
    }

    try {
      // Fetch emotional data from Firestore
      const docRef = doc(firestore, 'emotion', 'Percentages');
      const docSnap = await getDoc(docRef);
      const emotionsData = docSnap.data().per; // Adjust this based on your actual field name

      // Find the key-value pair with the maximum value
      let maxEmotion = { key: null, value: -Infinity };
      for (const [key, value] of Object.entries(emotionsData)) {
        if (value > maxEmotion.value) {
          maxEmotion = { key, value };
        }
      }

      console.log("Emotion with Maximum Value:", maxEmotion);

      // Display the emotion with the maximum value on the website
      maxEmotionDisplay.innerHTML = `<p>Emotion with Maximum Value: ${maxEmotion.key} (${maxEmotion.value})</p>`;
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }

    int = setInterval(displayTimer, 1000);
  });

  function displayTimer() {
    seconds -= 1;
    if (seconds === 0) {
      clearInterval(int);
      [seconds, minutes, hours] = [0, 0, 0];
      timeref.innerHTML = "00 : 00 : 00";
      redirect();
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    timeref.innerHTML = `${h} : ${m} : ${s}`;
  }

  function redirect() {
    setTimeout(myURL, 1000); // Adjust the timeout as needed
  }

  function myURL() {
    document.location.href = 'result.html';
  }