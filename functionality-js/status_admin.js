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
          document.getElementById("campus").value = String(campusStat);
        } else {
          console.log("no data available campus");
        }
      });

      get(child(dbRef, `serviceStatus/eLearning`)).then((snapshot) => {
        if (snapshot.exists()) {
          const eLearningStat = snapshot.val();
          console.log(eLearningStat);
          document.getElementById("eLearning").value = String(eLearningStat);
        } else {
          console.log("no data available eLearning");
        }
      });

      get(child(dbRef, `serviceStatus/emailServices`)).then((snapshot) => {
        if (snapshot.exists()) {
          const emailStat = snapshot.val();
          console.log(emailStat);
          document.getElementById("email").value = String(emailStat);
        } else {
          console.log("no data available email");
        }
      });

      get(child(dbRef, `serviceStatus/internetServices`)).then((snapshot) => {
        if (snapshot.exists()) {
          const internetStat = snapshot.val();
          console.log(internetStat);
          document.getElementById("internet").value = String(internetStat);
        } else {
          console.log("no data available internet");
        }
      });

      get(child(dbRef, `serviceStatus/mysis`)).then((snapshot) => {
        if (snapshot.exists()) {
          const mysisStat = snapshot.val();
          console.log(mysisStat);
          document.getElementById("mysis").value = String(mysisStat);          
        } else {
          console.log("no data available mysis");
        }
      });
      
      get(child(dbRef, `serviceStatus/wifi`)).then((snapshot) => {
        if (snapshot.exists()) {
          const wifiStat = snapshot.val();
          console.log(wifiStat);
          document.getElementById("wifi").value = String(wifiStat);          
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

    // console.log(issueDesc);

    let submit_button = document.getElementById("submit-button");
    submit_button.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default form submission behavior

      let campus = document.getElementById("campus").value;
      let eLearning = document.getElementById("eLearning").value;
      let email = document.getElementById("email").value;
      let internetServices = document.getElementById("internet").value;
      let mysis = document.getElementById("mysis").value;
      let wifi = document.getElementById("wifi").value;
      
        var currentdate = new Date();
        var datetime =
          currentdate.getDate() +
          "/" +
          (currentdate.getMonth() + 1) +
          "/" +
          currentdate.getFullYear() +
          " " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes();

        var data = {
          campus: campus,
          eLearning: eLearning,
          emailServices: email,
          internetServices: internetServices,
          lastUpdated: datetime,
          mysis: mysis,
          wifi: wifi,
        };

        var refTicket = child(dbRef, "serviceStatus");

        //set object
        set(refTicket, data, (error) => {
          if (error) {
            console.error("Error saving data:", error);
            // handle error here, e.g. display an error message to the user
          } else {
            console.log("Data saved successfully");
            // do something here, e.g. show a success message to the user
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