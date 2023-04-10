import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
  set,
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
const auth = getAuth();

auth.onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    console.log(user.uid);
    let userID = user.uid;
    console.log(userID);

    const ticketID = auth.currentUser.uid;
    const dbRef = ref(db, `ecTicket`);


    if (document.readyState === "complete") {
        let query = location.search;
        let array = query.split("?id=");
        let ecID = array[1];
        console.log("query: " + query);
        console.log(ecID);
      
        get(child(dbRef, `${ecID}/StudentID`)).then((snapshot) => {
            if (snapshot.exists()) {
              const StudentID = snapshot.val();
              console.log(StudentID);
              document.getElementById('StudentID').innerHTML = StudentID;
            } else {
              console.log("no data available");
            }
          });
          
          get(child(dbRef, `${ecID}/dateCreated`)).then((snapshot) => {
            if (snapshot.exists()) {
              const dateCreated = snapshot.val();
              console.log(dateCreated);
              document.getElementById('dateCreated').innerHTML = dateCreated;
            } else {
              console.log("no data available");
            }
          });
      
          get(child(dbRef, `${ecID}/ecType`)).then((snapshot) => {
            if (snapshot.exists()) {
              const ecType = snapshot.val();
              console.log(ecType);
              document.getElementById('ecType').innerHTML = ecType;
            } else {
              console.log("no data available");
            }
          });

          get(child(dbRef, `${ecID}/ecNature`)).then((snapshot) => {
            if (snapshot.exists()) {
              const ecNature = snapshot.val();
              console.log(ecNature);
              document.getElementById('ecNature').innerHTML = ecNature;
            } else {
              console.log("no data available");
            }
          });

          get(child(dbRef, `${ecID}/ecSummary`)).then((snapshot) => {
            if (snapshot.exists()) {
              const ecSummary = snapshot.val();
              console.log(ecSummary);
              document.getElementById('ecSummary').innerHTML = ecSummary;
            } else {
              console.log("no data available");
            }
          });

          get(child(dbRef, `${ecID}/ecAssessment`)).then((snapshot) => {
            if (snapshot.exists()) {
              const ecAssessments = snapshot.val();
              console.log(ecAssessments);
              document.getElementById('ecAssessments').innerHTML = ecAssessments;
            } else {
              console.log("no data available");
            }
          });
          get(child(dbRef, `${ecID}/ecReqDate`)).then((snapshot) => {
            if (snapshot.exists()) {
              const ecReqDate = snapshot.val();
              console.log(ecReqDate);
              document.getElementById('ecReqDate').innerHTML = ecReqDate;
            } else {
              console.log("no data available");
            }
          });
          get(child(dbRef, `${ecID}/ecEvidence`)).then((snapshot) => {
            if (snapshot.exists()) {
              const ecEvidence = snapshot.val();
              console.log(ecEvidence);
              document.getElementById('ecEvidence').innerHTML = ecEvidence;
            } else {
              console.log("no data available");
            }
          });

          let submit_button = document.getElementById("submit-button");
        submit_button.addEventListener("click", (e) => {
            let ECresponse = document.getElementById('ECresponse').value;

            if(ECresponse == ""){
                alert("Please select a response")
            }
            else{
                var data = {
                    adminResponse: ECresponse,
                };

                var refEC = child(dbRef, `${ecID}/adminResponse`);
                set(refEC, data, (error) => {
                    if (error) {
                      console.error("Error saving data:", error);
                      // handle error here, e.g. display an error message to the user
                    } else {
                      console.log("Data saved successfully");
                      // do something here, e.g. show a success message to the user
                    }
                  });
                  console.log("response submitted");
            }
        });

    }
  } else {
    // User not logged in or has just logged out.
    console.log("User not logged in");
  }
});
