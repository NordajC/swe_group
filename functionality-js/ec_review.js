import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
    getDatabase,
    ref,
    child,
    get,
    onValue,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
    getAuth,
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
const auth = getAuth();

//check if user is logged in and enables functionality if they are logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        // User logged in already or has just logged in.
        let userID = user.uid;

        //reference database on firebase
        const dbRef = ref(db, `ecTicket`);

        //if the webpage is loaded then run the following functions
        if (document.readyState === "complete") {

            //goes through all data entries from ecTickets and gets the child data and key
            onValue(dbRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();

                    // displays data if the ecTicket has not been opened
                    if (childData.adminResponse == "") {
                        let studentID = childData.StudentID;

                        //gets userID 
                        get(child(ref(db), `user/${studentID}/userID`)).then((snapshot) => {
                            if (snapshot.exists()) {
                                const userID = snapshot.val();

                                var entry =
                                "<div class='card'><div class='card-header'><h2 class='mb-0'>"
                                + childKey +
                                "</h2></div><div class='card-body'><div class='row'><div class='col-sm-6'><h3>Student ID:</h3>"
                                + userID + "</div><div class='col-sm-6'><h3>Date Created:</h3><p>" + childData.dateCreated + "</p></div></div><div class='row'><div class='col-sm-6'><h3>EC Claim Type:</h3><p>" + childData.ecType +
                                "</p></div><div class='col-sm-6'><h3>Nature:</h3><p>" + childData.ecNature + "</p></div></div><div class='row'><div class='col-sm-6'><h3>Summary:</h3><p>" + childData.ecSummary + "</p></div><div class='col-sm-6'><h3>Assessments:</h3><p>" + childData.ecAssessment + "</p></div></div><div class='row'><div class='col-sm-6'><h3>Date Extend Request:</h3><p>" + childData.ecReqDate + "</p></div><div class='col-sm-6'><h3>Evidence:</h3><p>" + childData.ecEvidence + `</p></div></div><div class='row'></div><div class='row mt-3'><div class='col-sm-6'><button class='btn btn-primary' onclick="location.href='../HTML/respond_to_ec.html?id=${childKey}';">respond to report</button>`;

                                //display data onto html page
                                $(entry).appendTo("#container");
                                
                            } else {
                                console.log("no data available");
                            }
                        });
                    }
                    else {

                    }
                });
            }, {
                onlyOnce: true
            });

        };

    } else {
        // User not logged in or has just logged out.
        console.log("User not logged in");
    }
});

