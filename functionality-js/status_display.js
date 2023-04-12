// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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

//check if user is logged in and enables functionality
auth.onAuthStateChanged((user) => {
  if (user) {
    //get campus status and sets status accordingly
    get(child(dbRef, `serviceStatus/campus`)).then((snapshot) => {
      if (snapshot.exists()) {
        const campusStat = snapshot.val();

        if (campusStat == "Operational") {
          document.getElementById("campusStat").innerHTML = String(campusStat);
          document.getElementById("campusStat").style.color = "green";
        } else if (campusStat == "Down") {
          document.getElementById("campusStat").innerHTML = String(campusStat);
          document.getElementById("campusStat").style.color = "red";
        } else if (campusStat == "maintenance") {
          document.getElementById("campusStat").innerHTML =
            "In " + String(campusStat);
          document.getElementById("campusStat").style.color = "orange";
        }
      } else {
        console.log("no data available campus");
      }
    });

    //get elearning status and sets status accordingly
    get(child(dbRef, `serviceStatus/eLearning`)).then((snapshot) => {
      if (snapshot.exists()) {
        const eLearningStat = snapshot.val();

        if (eLearningStat == "Operational") {
          document.getElementById("eLearningStat").innerHTML =
            String(eLearningStat);
          document.getElementById("eLearningStat").style.color = "green";
        } else if (eLearningStat == "Down") {
          document.getElementById("eLearningStat").innerHTML =
            String(eLearningStat);
          document.getElementById("eLearningStat").style.color = "red";
        } else if (eLearningStat == "maintenance") {
          document.getElementById("eLearningStat").innerHTML =
            "In " + String(eLearningStat);
          document.getElementById("eLearningStat").style.color = "orange";
        }
      } else {
        console.log("no data available eLearning");
      }
    });

    //get email status and sets status accordingly
    get(child(dbRef, `serviceStatus/emailServices`)).then((snapshot) => {
      if (snapshot.exists()) {
        const emailStat = snapshot.val();

        if (emailStat == "Operational") {
          document.getElementById("emailStat").innerHTML = String(emailStat);
          document.getElementById("emailStat").style.color = "green";
        } else if (emailStat == "Down") {
          document.getElementById("emailStat").innerHTML = String(emailStat);
          document.getElementById("emailStat").style.color = "red";
        } else if (emailStat == "maintenance") {
          document.getElementById("emailStat").innerHTML = String(emailStat);
          document.getElementById("emailStat").style.color = "orange";
        }
      } else {
        console.log("no data available email");
      }
    });

    //get internet status and sets status accordingly
    get(child(dbRef, `serviceStatus/internetServices`)).then((snapshot) => {
      if (snapshot.exists()) {
        const internetStat = snapshot.val();

        if (internetStat == "Operational") {
          document.getElementById("iServicesStat").innerHTML =
            String(internetStat);
          document.getElementById("iServicesStat").style.color = "green";
        }
        if (internetStat == "Down") {
          document.getElementById("iServicesStat").innerHTML =
            String(internetStat);
          document.getElementById("iServicesStat").style.color = "red";
        } else if (internetStat == "maintenance") {
          document.getElementById("iServicesStat").innerHTML =
            "In " + String(internetStat);
          document.getElementById("iServicesStat").style.color = "orange";
        }
      } else {
        console.log("no data available internet");
      }
    });

    //get mysis status and sets status accordingly
    get(child(dbRef, `serviceStatus/mysis`)).then((snapshot) => {
      if (snapshot.exists()) {
        const mysisStat = snapshot.val();

        if (mysisStat == "Operational") {
          document.getElementById("mysisStat").innerHTML = String(mysisStat);
          document.getElementById("mysisStat").style.color = "green";
        }
        if (mysisStat == "Down") {
          document.getElementById("mysisStat").innerHTML = String(mysisStat);
          document.getElementById("mysisStat").style.color = "red";
        } else if (mysisStat == "maintenance") {
          document.getElementById("mysisStat").innerHTML =
            "In " + String(mysisStat);
          document.getElementById("mysisStat").style.color = "orange";
        }
      } else {
        console.log("no data available mysis");
      }
    });

    //get wifi status and sets status accordingly
    get(child(dbRef, `serviceStatus/wifi`)).then((snapshot) => {
      if (snapshot.exists()) {
        const wifiStat = snapshot.val();

        if (wifiStat == "Operational") {
          document.getElementById("wifiStat").innerHTML = String(wifiStat);
          document.getElementById("wifiStat").style.color = "green";
        }
        if (wifiStat == "Down") {
          document.getElementById("wifiStat").innerHTML = String(wifiStat);
          document.getElementById("wifiStat").style.color = "red";
        } else if (wifiStat == "maintenance") {
          document.getElementById("wifiStat").innerHTML =
            "In " + String(wifiStat);
          document.getElementById("wifiStat").style.color = "orange";
        }
      } else {
        console.log("no data available wifi");
      }
    });

    //updates date and displays it on page
    get(child(dbRef, `serviceStatus/lastUpdated`)).then((snapshot) => {
      if (snapshot.exists()) {
        const updatedDate = snapshot.val();

        document.getElementById("dateModified").innerHTML =
          "Last Modified: " + String(updatedDate);
      } else {
        console.log("no data available wifi");
      }
    });
  } else {
    // User not logged in or has just logged out.
    console.log("User not logged in");
  }
});
