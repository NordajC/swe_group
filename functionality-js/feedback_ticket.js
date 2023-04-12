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
  if (user) { // User logged in already or has just logged in.

    // Define variables to display in HTML document
    let userID = user.uid;
    let name = document.getElementById("userName");
    let surname = document.getElementById("userSur");
    let pageUserID = document.getElementById("userID");
    let userEmail = document.getElementById("userEmail");
    let userYOS = document.getElementById("userYOS");

    // Get userID
    get(child(dbRef, `user/${userID}/userID`)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentUserID = snapshot.val();
        pageUserID.innerHTML = currentUserID;
      } else {
        pageUserID.innerHTML = "no data available";
      }
    });

    // Get user name
    get(child(dbRef, `user/${userID}/name`)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentUserName = snapshot.val();
        name.innerHTML = currentUserName;
      } else {
        name.innerHTML = "no data available";
      }
    });

    // Get user surname
    get(child(dbRef, `user/${userID}/surname`)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentUserSur = snapshot.val();
        surname.innerHTML = currentUserSur;
      } else {
        surname.innerHTML = "no data available";
      }
    });

    // Get user email
    get(child(dbRef, `user/${userID}/email`)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentUserEmail = snapshot.val();
        userEmail.innerHTML = currentUserEmail;
      } else {
        userEmail.innerHTML = "no data available";
      }
    });

    // Get Year of Study
    get(child(dbRef, `user/${userID}/YOS`)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentUserYOS = snapshot.val();
        userYOS.innerHTML = currentUserYOS;
        if (currentUserYOS == "") {
          userYOS.innerHTML = "no data available";
        }
      } else {
        userYOS.innerHTML = "no data available"
      }
    });

    // When user submits feedback
    let submit_button = document.getElementById("submit-button");
    submit_button.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default form submission behavior

      let feedbackOn = document.getElementById("feedbackOn").value;
      let feedback = document.getElementById("feedback").value;

      // Checks if feedback form is empty
      if (feedbackOn == "" || feedback == "") {
        alert("Please ensure that all the fields have been filled.");
      } else {

        // Format date
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10) {
          day = '0' + day;
        }
        if (month < 10) {
          month = '0' + month;
        }
        let feedbackDate = `${day}/${month}/${year}`;

        // Set data variables to input
        var data = {
          StudentID: userID,
          feedbackSubject: feedbackOn,
          feedback: feedback,
          feedbackDate: feedbackDate,
        };

        // Push object into feedback
        var refTicket = child(dbRef, "feedback");
        push(refTicket, data, (error) => {
          if (error) {
            console.error("Error saving data:", error);
          } else {
            console.log("Data saved successfully");
          }
        });

        window.location.href = "../HTML/submitpage.html"; // Redirect user to successful submission page
      }
    });
  } else {
    // User not logged in or has just logged out.
    console.log("User not logged in");
  }
});