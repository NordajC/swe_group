// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
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

//checks if user is logged in and enables functionality
auth.onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    let userID = user.uid;

    //listens for submit button click and create a new data entry based on user input upon clicking
    let submit_button = document.getElementById("submit-button");
    submit_button.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default form submission behavior

      //reads user input
      let issueSubject = document.getElementById("issue-subject").value;
      let issueDesc = document.getElementById("issue-description").value;
      let tickCheckbox = document.getElementById("tick-checkbox");

      //in fields aren't filled then alert user to fill the fields in else submit issue ticket
      if (
        issueSubject == "" ||
        issueDesc == "" ||
        tickCheckbox.checked == false
      ) {
        alert("Please ensure that all the fields have been filled.");
      } else {

        //gets current date
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

        let datetime = `${day}/${month}/${year}`;

        var data = {
          StudentID: userID,
          issueSubject: issueSubject,
          issueDesc: issueDesc,
          status: "Open",
          dateCreated: datetime,
        };

        //reference reportTicket in the database
        var refTicket = child(dbRef, "reportTicket");

        //push object
        push(refTicket, data, (error) => {
          if (error) {
            console.error("Error saving data:", error);
          } else {
            console.log("Data saved successfully");
          }
        });
        //after ticket has been submitted it re routes user to the submit page
        window.location.href = "../HTML/submitpage.html";
      }
    });
  } else {
    // User not logged in or has just logged out.
    console.log("User not logged in");
  }
});

