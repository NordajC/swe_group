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
    const dbRef = ref(db);

    if (document.readyState === "complete") {
      let query = location.search;
      let array = query.split("?id=");
      let ecID = array[1];
      console.log("query: " + query);
      console.log(ecID);

      get(child(dbRef, `ecTicket/${ecID}/StudentID`)).then((snapshot) => {
        if (snapshot.exists()) {
          const StudentID = snapshot.val();
          console.log(StudentID);
          document.getElementById("StudentID").innerHTML = StudentID;

          get(child(dbRef, `user/${StudentID}/userID`)).then((snapshot) => {
              if (snapshot.exists()) {
                  const userID = snapshot.val();
                  document.getElementById('userID').innerHTML = userID;
              } else {
                  console.log("no data available");
              }
          });

          get(child(dbRef, `user/${StudentID}/name`)).then((snapshot) => {
              if (snapshot.exists()) {
                  const studentName = snapshot.val();
                  console.log(studentName);
                  document.getElementById('firstname').innerHTML = studentName;
              } else {
                  console.log("no data available");
              }
          });

        get(child(dbRef, `user/${StudentID}/surname`)).then((snapshot) => {
              if (snapshot.exists()) {
                  const studentSurname = snapshot.val();
                  console.log(studentSurname);
                  document.getElementById('surname').innerHTML = studentSurname;
              } else {
                  console.log("no data available");
              }
          });

        } else {
          console.log("no data available");
        }
      });

      get(child(dbRef, `ecTicket/${ecID}/dateCreated`)).then((snapshot) => {
        if (snapshot.exists()) {
          const dateCreated = snapshot.val();
          console.log(dateCreated);
          document.getElementById("dateCreated").innerHTML = dateCreated;
        } else {
          console.log("no data available");
        }
      });

      get(child(dbRef, `ecTicket/${ecID}/ecType`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecType = snapshot.val();
          console.log(ecType);
          document.getElementById("ecType").innerHTML = ecType;
        } else {
          console.log("no data available");
        }
      });

      get(child(dbRef, `ecTicket/${ecID}/ecNature`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecNature = snapshot.val();
          console.log(ecNature);
          document.getElementById("ecNature").innerHTML = ecNature;
        } else {
          console.log("no data available");
        }
      });

      get(child(dbRef, `ecTicket/${ecID}/ecSummary`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecSummary = snapshot.val();
          console.log(ecSummary);
          document.getElementById("ecSummary").innerHTML = ecSummary;
        } else {
          console.log("no data available");
        }
      });

      get(child(dbRef, `ecTicket/${ecID}/ecAssessment`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecAssessment = snapshot.val();
          console.log(ecAssessment);
          document.getElementById("ecAssessment").innerHTML = ecAssessment;
        } else {
          console.log("no data available");
        }
      });
      get(child(dbRef, `ecTicket/${ecID}/ecReqDate`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecReqDate = snapshot.val();
          console.log(ecReqDate);
          document.getElementById("ecReqDate").innerHTML = ecReqDate;
        } else {
          console.log("no data available");
        }
      });
      get(child(dbRef, `ecTicket/${ecID}/ecEvidence`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecEvidence = snapshot.val();
          console.log(ecEvidence);
          document.getElementById("ecEvidence").innerHTML = ecEvidence;
        } else {
          console.log("no data available");
        }
      });

      let submit_button = document.getElementById("submit-button");
      submit_button.addEventListener("click", (e) => {
        let ECresponse = document.getElementById("ECresponse").value;
        let s_ID = document.getElementById("StudentID").innerHTML;
        let d_Created = document.getElementById("dateCreated").innerHTML;
        let ec_type = document.getElementById("ecType").innerHTML;
        let nature = document.getElementById("ecNature").innerHTML;
        let summary = document.getElementById("ecSummary").innerHTML;
        let assessment = document.getElementById("ecAssessment").innerHTML;
        let reqDate = document.getElementById("ecReqDate").innerHTML;
        let evidence = document.getElementById("ecEvidence").innerHTML;

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (day < 10) {
          day = "0" + day;
        }

        if (month < 10) {
          month = "0" + month;
        }

        let dateResponded = `${day}/${month}/${year}`;

        if (ECresponse == "") {
          alert("Please select a response");
        } else {
          var data = {
            StudentID: s_ID,
            adminResponse: ECresponse,
            dateCreated: d_Created,
            ecAssessment: assessment,
            ecEvidence: evidence,
            ecNature: nature,
            ecReqDate: reqDate,
            ecSummary: summary,
            ecType: ec_type,
            status: "Closed",
            responseDate: dateResponded,
          };

          var refEC = child(dbRef, `ecTicket/${ecID}`);
          set(refEC, data, (error) => {
            if (error) {
              console.error("Error saving data:", error);
              // handle error here, e.g. display an error message to the user
            } else {
              console.log("Data saved successfully");
              // do something here, e.g. show a success message to the user
            }
          });
          alert("response submitted");
          window.location.href = "open_EC.html";
        }
      });
    }
  } else {
    // User not logged in or has just logged out.
    console.log("User not logged in");
  }
});
