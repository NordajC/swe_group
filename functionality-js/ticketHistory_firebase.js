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

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get Firebase database and auth instances
const db = getDatabase(app);
//const dbRef = ref(db);
const auth = getAuth();
const current_user = auth.currentUser;

auth.onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    console.log(user.uid);
    let userID = user.uid;
    console.log(userID);

    //const userID = current_user;

    const ticketID = auth.currentUser.uid;
    const dbRef = ref(db, `issueTicket`);
    
    var tbody = document.getElementById("ticket_table");

    if (document.readyState === "complete") {
            
        $("ticket_table td").remove();

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;    
                const childData = childSnapshot.val();

                if (childKey == userID){
                    var entry = "<tr><td>" + childKey + "</td><td>" + childData.issueSubject + "</td><td>" + childData.issueStatus + "</td><td>"  + childData.ticektSubmissionDate + "</td></tr>";
                    
                    $(entry).appendTo("#ticket_table");

                } else{
                    console.log("Not users data")
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










    /* get(ticketsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
            console.log("data exists")
          snapshot.forEach((childSnapshot) => {
            console.log("child snapshot exists")
            const childData = childSnapshot.val();
            if (childData.userID === userID) {
                console.log("userID data exists")
              const row = document.createElement("tr");
              const column1 = document.createElement("td");
              const column2 = document.createElement("td");
              const column3 = document.createElement("td");
              const column4 = document.createElement("td");
              const column5 = document.createElement("td");

              column1.innerHTML = childData.column1;
              column2.innerHTML = childData.column2;
              column3.innerHTML = childData.column3;

              row.appendChild(column1);
              row.appendChild(column2);
              row.appendChild(column3);
              row.appendChild(column4);
              row.appendChild(column5);
              document.getElementById("table-body").appendChild(row);
            }
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      }); */
 