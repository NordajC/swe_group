// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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
const db = getDatabase(app);
const dbRef = ref(db);
const auth = getAuth();

// Run userLogIn when the user submits to try and log-in
const login = document.getElementById("submitLogin");
login.addEventListener("click", (e) => {
  userLogIn();
});


// User login function
const userLogIn = async () => {
  //gets value from user input in form
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  //sign in with user using firebase function
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // alerts user if they have signed in
      alert("user logged in successfully");

      //check user type and redirect user to the correct view
      get(child(dbRef, `user/${user.uid}/type`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userType = snapshot.val();
            // Redirect user depending on the user type
            if (userType == "ec") {
              alert("user is an ec admin");
              window.location.href = "../HTML/ec_admin_homepage.html";
            } else if (userType == "eecs") {
              alert("user is an eecs admin");
              window.location.href = "../HTML/eecs_admin_homepage.html";
            } else if (userType == "student") {
              alert("user is a student");
              window.location.href = "../HTML/student_homepage.html";
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

//checks if user exists, is signed in, and authenticated
const checkAuthStat = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      //  User is signed in
      console.log("user is signed in and is authenticated");
    }
    else {
      console.log("user is NOT signed in");
    }
  })
}

window.addEventListener("load", (event) => {
  checkAuthStat();
});

checkAuthStat();