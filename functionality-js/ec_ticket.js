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

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZiskzFA7Lyb9m1w8vPiXrCifgV8VhoSg",
    authDomain: "test-29549.firebaseapp.com",
    databaseURL: "https://test-29549-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-29549",
    storageBucket: "test-29549.appspot.com",
    messagingSenderId: "864209838742",
    appId: "1:864209838742:web:26d5ee1b5cf49944f558b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);
const auth = getAuth();
const user = auth.currentUser;
var userID;
//Enter path
//var ecForm = firebase.database().ref(/path");

// var userRecord = FirebaseAuth.getInstance().getUser(uid);
// // See the UserRecord reference doc for the contents of userRecord.
// System.out.println("Successfully fetched user data: " + userRecord.getUid());

// get(child(dbRef, `user/${user.uid}/userID`))
//     .then((snapshot) => {
//         if (snapshot.exists()) {
//             userID = snapshot.val();
//         } else {
//             console.log("No data available");
//         }
//     })

auth.onAuthStateChanged((user) => {
    if (user) {
    // User logged in already or has just logged in.
    //   console.log(user.uid);
    //   userID = user.uid;
    //   console.log(userID);

    let submit_button = document.getElementById('submit-button');

    submit_button.addEventListener("click", function () {

        let ecType = document.getElementById("ecType").value;

        let nature = document.getElementById("nature").value;

        let summary = document.getElementById("summary").value;

        let assessments = document.getElementById("assessments").value;

        let date = document.getElementById("date").value;

        let evidence = document.getElementById("evidence-file").value;

        var data = {

            //Student ID: userID;

            ecType: ecType

        }

    })

    } else {
      // User not logged in or has just logged out.
    }
  });





const checkAuthStat = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            //if users are signed in then.....
            console.log("user is signed in and is authenticated");
        }
        else {
            console.log("user is NOT signed in");
        }
    })
}



checkAuthStat();