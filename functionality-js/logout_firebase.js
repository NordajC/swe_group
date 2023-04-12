// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const auth = getAuth();

// Checks if user exists, is signed in, and authenticated
const checkAuthStat = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      // If users are signed in
      console.log("User is signed in and is authenticated");
    }
    else {
      console.log("User is NOT signed in");
    }
  })
}
checkAuthStat();

//sign out
const userSignOut = async () => {
  await signOut(auth);
}

// If user clicks on log out button
const logOut = document.getElementById("logOut");
logOut.addEventListener("click", (e) => {
  userSignOut();
  checkAuthStat();
  alert("logout");
  window.location.href = "../HTML/logout.html";
});

// Checks if user logs in when the window is loaded
window.addEventListener("load", (event) => {
  checkAuthStat();
});

