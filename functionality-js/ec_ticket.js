// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getDatabase,
    ref,
    child,
    get,
    push
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


auth.onAuthStateChanged((user) => {
    if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
        let userID = user.uid;
        console.log(userID);

        let submit_button = document.getElementById("submit-button");
        submit_button.addEventListener("click", (e) => {

            e.preventDefault(); // prevent default form submission behavior

            let state = "Unseen";

            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            if(day<10) {
                day='0'+day;
            } 

            if(month<10) {
                month='0'+month;
            }

            let dateCreated = `${year}-${month}-${day}`;

            let ecType = document.getElementById("claim-type").value;

            if (ecType == "standard-claim") {
                var subject2 = "Standard Claim";
            }
            else {
                var subject2 = "Self-Certification";
            }

            let subject = subject2;

            let nature = document.getElementById("nature").value;

            let summary = document.getElementById("summary").value;

            let assessment = document.getElementById("assessment").value;

            let reqDate = document.getElementById("reqDate").value;

            let evidence = document.getElementById("evidence-file").value;

            let tickCheckbox = document.getElementById("tick-checkbox");

            if (ecType == "" || nature == "Choose nature/category" || summary == "" || assessment == "Choose Assessment" || reqDate == "" || tickCheckbox.checked == false) {
                alert("Error: Fill all fields.")
            }

            else {
                var data = {
                    StudentID: userID,
                    dateCreated: dateCreated,
                    ecType: ecType,
                    ecNature: nature,
                    ecSummary: summary,
                    ecAssessments: assessment,
                    ecReqDate: reqDate,
                    ecEvidence: evidence,
                    state: state,
                    subject: subject,
                };
    
                var refEC = child(dbRef, "ecTicket");
    
                //push object
                push(refEC, data, (error) => {
                    if (error) {
                        console.error("Error saving data:", error);
                        // handle error here, e.g. display an error message to the user
                    } else {
                        console.log("Data saved successfully");
                        // do something here, e.g. show a success message to the user
                    }
                });
    
                // Redirect user to successful submission page
                window.location.href = "submitpage.html";
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
