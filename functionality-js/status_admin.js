// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZiskzFA7Lyb9m1w8vPiXrCifgV8VhoSg",
  authDomain: "test-29549.firebaseapp.com",
  databaseURL:
    "https://test-29549-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-29549",
  storageBucket: "test-29549.appspot.com",
  messagingSenderId: "864209838742",
  appId: "1:864209838742:web:26d5ee1b5cf49944f558b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);
const auth = getAuth();

// Checks if user is logged in and enables functionality if they are logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.

    // Get campus status and saves the input or changes
    get(child(dbRef, `serviceStatus/campus`)).then((snapshot) => {
      if (snapshot.exists()) {
        const campusStat = snapshot.val();
        console.log(campusStat);
        document.getElementById("campus").value = String(campusStat);
      } else {
        console.log("no data available campus");
      }
    });

    // Get eLearning status and saves the input or changes
    get(child(dbRef, `serviceStatus/eLearning`)).then((snapshot) => {
      if (snapshot.exists()) {
        const eLearningStat = snapshot.val();
        console.log(eLearningStat);
        document.getElementById("eLearning").value = String(eLearningStat);
      } else {
        console.log("no data available eLearning");
      }
    });

    // Get email service status and saves the input or changes
    get(child(dbRef, `serviceStatus/emailServices`)).then((snapshot) => {
      if (snapshot.exists()) {
        const emailStat = snapshot.val();
        console.log(emailStat);
        document.getElementById("email").value = String(emailStat);
      } else {
        console.log("no data available email");
      }
    });

    // Get internet status and saves the input or changes
    get(child(dbRef, `serviceStatus/internetServices`)).then((snapshot) => {
      if (snapshot.exists()) {
        const internetStat = snapshot.val();
        console.log(internetStat);
        document.getElementById("internet").value = String(internetStat);
      } else {
        console.log("no data available internet");
      }
    });

    // Get MySIS status and saves the input or changes
    get(child(dbRef, `serviceStatus/mysis`)).then((snapshot) => {
      if (snapshot.exists()) {
        const mysisStat = snapshot.val();
        console.log(mysisStat);
        document.getElementById("mysis").value = String(mysisStat);
      } else {
        console.log("no data available mysis");
      }
    });

    // Get WiFi status and saves the input or changes
    get(child(dbRef, `serviceStatus/wifi`)).then((snapshot) => {
      if (snapshot.exists()) {
        const wifiStat = snapshot.val();
        console.log(wifiStat);
        document.getElementById("wifi").value = String(wifiStat);
      } else {
        console.log("no data available wifi");
      }
    });

    // Get date of when services were last updated and change the date
    get(child(dbRef, `serviceStatus/lastUpdated`)).then((snapshot) => {
      if (snapshot.exists()) {
        const updatedDate = snapshot.val();
        console.log(updatedDate);
        document.getElementById("dateModified").innerHTML = "Last Modified: " + String(updatedDate);
      } else {
        console.log("no data available wifi");
      }
    });

    // When the EECS admin click button to make changes
    let submit_button = document.getElementById("submit-button");
    submit_button.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default form submission behavior

      // Set variables from data input
      let campus = document.getElementById("campus").value;
      let eLearning = document.getElementById("eLearning").value;
      let email = document.getElementById("email").value;
      let internetServices = document.getElementById("internet").value;
      let mysis = document.getElementById("mysis").value;
      let wifi = document.getElementById("wifi").value;

      // Format date time
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      let date2 = `${day}/${month}/${year}`;

      // Set data variables to input
      var data = {
        campus: campus,
        eLearning: eLearning,
        emailServices: email,
        internetServices: internetServices,
        lastUpdated: date2,
        mysis: mysis,
        wifi: wifi,
      };

      // Set object in service status
      var refTicket = child(dbRef, "serviceStatus");
      set(refTicket, data, (error) => {
        if (error) {
          console.error("Error saving data:", error);
        } else {
          console.log("Data saved successfully");
        }
      });
      console.log("ticket submitted");

      alert("Status updated");

    });
  } else {
    // User not logged in or has just logged out.
    console.log("User not logged in");
  }
});