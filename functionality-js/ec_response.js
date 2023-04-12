import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
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

// Checks if user is logged in and enables functionality if they are logged in
auth.onAuthStateChanged((user) => {
  if (user) { // User logged in already or has just logged in.

    const dbRef = ref(db);

    // If the document has completed loading
    if (document.readyState === "complete") {
      let query = location.search; // get parameters from URL
      // exclude '?id=' to get the ecID
      let array = query.split("?id=");
      let ecID = array[1];
      console.log("query: " + query);
      console.log(ecID);

      // Get StudentID
      get(child(dbRef, `ecTicket/${ecID}/StudentID`)).then((snapshot) => {
        if (snapshot.exists()) {
          const StudentID = snapshot.val();
          console.log(StudentID);
          document.getElementById("StudentID").innerHTML = StudentID;

          // Get student's visible userID
          get(child(dbRef, `user/${StudentID}/userID`)).then((snapshot) => {
            if (snapshot.exists()) {
              const userID = snapshot.val();
              document.getElementById('userID').innerHTML = userID;
            } else {
              console.log("no data available");
            }
          });

          // Get student's name
          get(child(dbRef, `user/${StudentID}/name`)).then((snapshot) => {
            if (snapshot.exists()) {
              const studentName = snapshot.val();
              console.log(studentName);
              document.getElementById('firstname').innerHTML = studentName;
            } else {
              console.log("no data available");
            }
          });

          // Get student's surname
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

      // Get date of when EC Ticket was created
      get(child(dbRef, `ecTicket/${ecID}/dateCreated`)).then((snapshot) => {
        if (snapshot.exists()) {
          const dateCreated = snapshot.val();
          console.log(dateCreated);
          document.getElementById("dateCreated").innerHTML = dateCreated;
        } else {
          console.log("no data available");
        }
      });

      // Get EC Type
      get(child(dbRef, `ecTicket/${ecID}/ecType`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecType = snapshot.val();
          console.log(ecType);
          document.getElementById("ecType").innerHTML = ecType;
        } else {
          console.log("no data available");
        }
      });

      // Get the nature/circumstance of EC
      get(child(dbRef, `ecTicket/${ecID}/ecNature`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecNature = snapshot.val();
          console.log(ecNature);
          document.getElementById("ecNature").innerHTML = ecNature;
        } else {
          console.log("no data available");
        }
      });

      // Get EC summary
      get(child(dbRef, `ecTicket/${ecID}/ecSummary`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecSummary = snapshot.val();
          console.log(ecSummary);
          document.getElementById("ecSummary").innerHTML = ecSummary;
        } else {
          console.log("no data available");
        }
      });

      // Get EC Assessment
      get(child(dbRef, `ecTicket/${ecID}/ecAssessment`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecAssessment = snapshot.val();
          console.log(ecAssessment);
          document.getElementById("ecAssessment").innerHTML = ecAssessment;
        } else {
          console.log("no data available");
        }
      });

      // Get requested date of assessment
      get(child(dbRef, `ecTicket/${ecID}/ecReqDate`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecReqDate = snapshot.val();
          console.log(ecReqDate);
          document.getElementById("ecReqDate").innerHTML = ecReqDate;
        } else {
          console.log("no data available");
        }
      });

      // Get EC evidence
      get(child(dbRef, `ecTicket/${ecID}/ecEvidence`)).then((snapshot) => {
        if (snapshot.exists()) {
          const ecEvidence = snapshot.val();
          console.log(ecEvidence);
          document.getElementById("ecEvidence").innerHTML = ecEvidence;
        } else {
          console.log("no data available");
        }
      });

      // When the EC admin clicks the submit button
      let submit_button = document.getElementById("submit-button");
      submit_button.addEventListener("click", (e) => {

        // Get data input from the form
        let ECresponse = document.getElementById("ECresponse").value;
        let s_ID = document.getElementById("StudentID").innerHTML;
        let d_Created = document.getElementById("dateCreated").innerHTML;
        let ec_type = document.getElementById("ecType").innerHTML;
        let nature = document.getElementById("ecNature").innerHTML;
        let summary = document.getElementById("ecSummary").innerHTML;
        let assessment = document.getElementById("ecAssessment").innerHTML;
        let reqDate = document.getElementById("ecReqDate").innerHTML;
        let evidence = document.getElementById("ecEvidence").innerHTML;

        // Format date
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

        if (ECresponse == "") { // Checks if EC admin fills in field to respond
          alert("Please select a response");
        } else {

          // Set data variables to input
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

          // Update and make changes to the tickets
          var refEC = child(dbRef, `ecTicket/${ecID}`);
          set(refEC, data, (error) => {
            if (error) {
              console.error("Error saving data:", error);
            } else {
              console.log("Data saved successfully");
            }
          });
          alert("Response submitted");
          window.location.href = "open_EC.html"; // relocate user back
        }
      });
    }
  } else {
    // User not logged in or has just logged out.
    console.log("User not logged in");
  }
});
