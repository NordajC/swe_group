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
const user = auth.currentUser;
var userID;

auth.onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    console.log(user.uid);
    let userID = user.uid;
    console.log(userID);

    
      let name = document.getElementById("userName");
      let surname = document.getElementById("userSur");
      let pageUserID = document.getElementById("userID");
      let userEmail = document.getElementById("userEmail");
      let userYOS = document.getElementById("userYOS");

      console.log("test");
      get(child(dbRef, `user/${user.uid}/userID`)).then((snapshot) => {
        if (snapshot.exists()) {
          const currentUserID = snapshot.val();
          console.log(currentUserID);
          pageUserID.innerHTML = currentUserID;
        } else {
          pageUserID.innerHTML = "no data available";
        }
      });

      get(child(dbRef, `user/${user.uid}/name`)).then((snapshot) => {
        if (snapshot.exists()) {
          const currentUserName = snapshot.val();
          console.log(currentUserName);
          name.innerHTML = currentUserName;
        } else {
          name.innerHTML = "no data available";
        }
      });

      get(child(dbRef, `user/${user.uid}/surname`)).then((snapshot) => {
        if (snapshot.exists()) {
          const currentUserSur = snapshot.val();
          console.log(currentUserSur);
          surname.innerHTML = currentUserSur;
        } else {
          surname.innerHTML = "no data available";
        }
      });

      get(child(dbRef, `user/${user.uid}/email`)).then((snapshot) => {
        if (snapshot.exists()) {
          const currentUserEmail = snapshot.val();
          console.log(currentUserEmail);
          userEmail.innerHTML = currentUserEmail;
        } else {
          userEmail.innerHTML = "no data available";
        }
      });

      get(child(dbRef, `user/${user.uid}/YOS`)).then((snapshot) => {
        if (snapshot.exists()) {
          const currentUserYOS = snapshot.val();
          console.log(currentUserYOS);
          userYOS.innerHTML = currentUserYOS;          
          if(currentUserYOS == ""){
            userYOS.innerHTML = "no data available";
          }
        } else {
          userYOS.innerHTML = "no data available"
        }
      });
    

    // console.log(issueDesc);

    let submit_button = document.getElementById("submit-button");
    submit_button.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default form submission behavior

      let feedbackOn = document.getElementById("feedbackOn").value;
      let feedback = document.getElementById("feedback").value;

      if (feedbackOn == "" || feedback == "") {
        alert("Please ensure that all the fields have been filled.");
      } else {
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

        var data = {
          StudentID: userID,
          feedbackSubject: feedbackOn,
          feedback: feedback,
          feedbackDate: feedbackDate,
        };

        var refTicket = child(dbRef, "feedback");

        //push object
        push(refTicket, data, (error) => {
          if (error) {
            console.error("Error saving data:", error);
            // handle error here, e.g. display an error message to the user
          } else {
            console.log("Data saved successfully");
            // do something here, e.g. show a success message to the user
          }
        });
        console.log("ticket submitted");

        window.location.href = "../HTML/submitpage.html";
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