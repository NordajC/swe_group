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
databaseURL:"https://test-29549-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "test-29549",
storageBucket: "test-29549.appspot.com",
messagingSenderId: "864209838742",
appId: "1:864209838742:web:26d5ee1b5cf49944f558b7",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get Firebase database and auth instances 
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
          console.log("no data available");
        }
      });



//const userID = current_user;

const reportTicketPath = 'reportTicket';
const ticketsRef = ref(db, reportTicketPath);


get(ticketsRef).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.userID === userID) {
          const row = document.createElement("tr");
          const column1 = document.createElement("td");
          const column2 = document.createElement("td");
          const column3 = document.createElement("td");
  
          column1.innerHTML = childData.column1;
          column2.innerHTML = childData.column2;
          column3.innerHTML = childData.column3;
  
          row.appendChild(column1);
          row.appendChild(column2);
          row.appendChild(column3);
          document.getElementById("table-body").appendChild(row);
        }
      });
    } 
    else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
});
