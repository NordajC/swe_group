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

    


    // console.log(issueDesc);

    
      let submit_button = document.getElementById("submit-button");
      submit_button.addEventListener("click", (e) => {
        e.preventDefault(); // prevent default form submission behavior

        let issueSubject = document.getElementById("issue-subject").value;
        let issueDesc = document.getElementById("issue-description").value;
        let issueLoc = document.getElementById("building").value;
        let issueFloor = document.getElementById("floor").value;
        let tickCheckbox = document.getElementById("tick-checkbox");

        if(issueSubject == "" || issueDesc == "" || issueLoc == "" || issueFloor == "" || tickCheckbox.checked == false){
          alert("Please ensure that all the fields have been filled.");
        }
        else{

          var currentdate = new Date(); 
          var datetime =  currentdate.getDate() + "/"
                          + (currentdate.getMonth()+1)  + "/" 
                          + currentdate.getFullYear() + " "  
                          + currentdate.getHours() + ":"  
                          + currentdate.getMinutes();

          var data = {
            StudentID: userID,
            issueSubject: issueSubject,
            issueDesc: issueDesc,
            issueLoc: issueLoc,
            issueFloor: issueFloor,
            ticektSubmissionDate: datetime,
          };

          var refTicket = child(dbRef, "issueTicket");

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

        } 

        //redirect
        window.location.href = "../HTML/submitpage.html";
        
      });
    
  } else{
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

