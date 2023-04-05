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
  signOut,
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
const current_user = auth.currentUser;

auth.onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    console.log(user.uid);
    let userID = user.uid;
    console.log(userID);

    get(child(dbRef, `user/${user.uid}/userID`)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentUserID = snapshot.val();
        console.log(currentUserID);
        document.getElementById('myID').innerHTML = currentUserID;
      } else {
        console.log("not logged in ");
      }
    });

    get(child(dbRef, `user/${user.uid}/name`)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentUserName = snapshot.val();
        console.log(currentUserName);
        document.getElementById('myName').innerHTML = currentUserName;
      } else {
        console.log("not logged in ");
      }
    });

    get(child(dbRef, `user/${user.uid}/email`)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentUserEmail = snapshot.val();
        console.log(currentUserEmail);
        document.getElementById('myEmail').innerHTML = currentUserEmail;
      } else {
        console.log("not logged in ");
      }
    });

    get(child(dbRef, `user/${user.uid}/surname`)).then((snapshot) => {
      if (snapshot.exists()) {
        const currentUserSurname = snapshot.val();
        console.log(currentUserSurname);
        document.getElementById('mySur').innerHTML = currentUserSurname;
      } else {
        console.log("not logged in ");
      }
    });
  } else {
    // User not logged in or has just logged out.
    console.log("User not logged in");
  }
});

get(child(dbRef, `user/${user.uid}/type`)).then((snapshot) => {});
