// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  set
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
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
const user = auth.currentUser;
var userID;




auth.onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    console.log(user.uid);
    let userID = user.uid;
    console.log(userID);

      console.log("test");
      get(child(dbRef, `serviceStatus/campus`)).then((snapshot) => {
        if (snapshot.exists()) {
          const campusStat = snapshot.val();
          console.log(campusStat);

          if(campusStat == "Operational"){
            document.getElementById("campusStat").innerHTML = String(campusStat);
            document.getElementById("campusStat").style.color = "green";
          }
          else if(campusStat == "Down"){
            document.getElementById("campusStat").innerHTML = String(campusStat);
            document.getElementById("campusStat").style.color = "red";
          }
          else if(campusStat == "maintenance"){
            document.getElementById("campusStat").innerHTML = "In " + String(campusStat);
            document.getElementById("campusStat").style.color = "orange";
          }
          
        } else {
          console.log("no data available campus");
        }
      });

      get(child(dbRef, `serviceStatus/eLearning`)).then((snapshot) => {
        if (snapshot.exists()) {
          const eLearningStat = snapshot.val();
          console.log(eLearningStat);

          if(eLearningStat == "Operational"){
            document.getElementById("eLearningStat").innerHTML = String(eLearningStat);
            document.getElementById("eLearningStat").style.color = "green";
          }
          else if(eLearningStat == "Down"){
            document.getElementById("eLearningStat").innerHTML = String(eLearningStat);
            document.getElementById("eLearningStat").style.color = "red";
          }
          else if(eLearningStat == "maintenance"){
            document.getElementById("eLearningStat").innerHTML = "In " + String(eLearningStat);
            document.getElementById("eLearningStat").style.color = "orange";
          }

        } else {
          console.log("no data available eLearning");
        }
      });

      get(child(dbRef, `serviceStatus/emailServices`)).then((snapshot) => {
        if (snapshot.exists()) {
          const emailStat = snapshot.val();
          console.log(emailStat);

          if(emailStat == "Operational"){
            document.getElementById("emailStat").innerHTML = String(emailStat);
            document.getElementById("emailStat").style.color = "green";
          }
          else if(emailStat == "Down"){
            document.getElementById("emailStat").innerHTML = String(emailStat);
            document.getElementById("emailStat").style.color = "red";
          }
          else if(emailStat == "maintenance"){
            document.getElementById("emailStat").innerHTML =  String(emailStat);
            document.getElementById("emailStat").style.color = "orange";
          }

        } else {
          console.log("no data available email");
        }
      });

      get(child(dbRef, `serviceStatus/internetServices`)).then((snapshot) => {
        if (snapshot.exists()) {
          const internetStat = snapshot.val();
          console.log(internetStat);

          if(internetStat == "Operational"){
            document.getElementById("iServicesStat").innerHTML = String(internetStat);
            document.getElementById("iServicesStat").style.color = "green";
          }
          if(internetStat == "Down"){
            document.getElementById("iServicesStat").innerHTML = String(internetStat);
            document.getElementById("iServicesStat").style.color = "red";
          }
          else if(internetStat == "maintenance"){
            document.getElementById("iServicesStat").innerHTML = "In " + String(internetStat);
            document.getElementById("iServicesStat").style.color = "orange";
          }

        } else {
          console.log("no data available internet");
        }
      });

      get(child(dbRef, `serviceStatus/mysis`)).then((snapshot) => {
        if (snapshot.exists()) {
          const mysisStat = snapshot.val();
          console.log(mysisStat);

          if(mysisStat == "Operational"){
            document.getElementById("mysisStat").innerHTML = String(mysisStat);
            document.getElementById("mysisStat").style.color = "green";
          }
          if(mysisStat == "Down"){
            document.getElementById("mysisStat").innerHTML = String(mysisStat);
            document.getElementById("mysisStat").style.color = "red";
          }
          else if(mysisStat == "maintenance"){
            document.getElementById("mysisStat").innerHTML = "In " + String(mysisStat);
            document.getElementById("mysisStat").style.color = "orange";
          }
         
        } else {
          console.log("no data available mysis");
        }
      });
      
      get(child(dbRef, `serviceStatus/wifi`)).then((snapshot) => {
        if (snapshot.exists()) {
          const wifiStat = snapshot.val();
          console.log(wifiStat);

          if(wifiStat == "Operational"){
            document.getElementById("wifiStat").innerHTML = String(wifiStat);
            document.getElementById("wifiStat").style.color = "green";
          }
          if(wifiStat == "Down"){
            document.getElementById("wifiStat").innerHTML = String(wifiStat);
            document.getElementById("wifiStat").style.color = "red";
          }
          else if(wifiStat == "maintenance"){
            document.getElementById("wifiStat").innerHTML = "In " + String(wifiStat);
            document.getElementById("wifiStat").style.color = "orange";
          }
                  
        } else {
          console.log("no data available wifi");
        }
      });

      get(child(dbRef, `serviceStatus/lastUpdated`)).then((snapshot) => {
        if (snapshot.exists()) {
          const updatedDate = snapshot.val();
          console.log(updatedDate);
          document.getElementById("dateModified").innerHTML = "Last Modified: " + String(updatedDate);          
        } else {
          console.log("no data available wifi");
        }
      });

  } else {
    // User not logged in or has just logged out.
    console.log("User not logged in");
  }
});

const checkAuthStat = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //if users are signed in then.....
      console.log("user is signed in and is authenticated");
    } else {
      console.log("user is NOT signed in");
    }
  });
};

checkAuthStat();
window.addEventListener("load", (event) => {
  console.log(userID);
});