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

            // var table = document.getElementById("report_table");

            if (document.readyState === "complete") {

                // $("#container").remove();

                

                onValue(dbRef, (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const childKey = childSnapshot.key;
                        const childData = childSnapshot.val();

                        // console.log(childKey);
                        // console.log(childData.dateCreated);
                        console.log(childData.adminResponse);

                        if (childData.adminResponse == "" ){
                          var entry = 
                        "<div class='container' style='width: 100%; border: 1px solid black;' id='container'><h2>" 
                        + childKey + 
                        "</h2><h3 style='display: inline-block;'>Student id: </h3><p style='display: inline-block;'>" 
                        + childData.StudentID + "</p><br><h3 style='display: inline-block;'>Student Name </h3><p style='display: inline-block;' id='studentName'></p><br><h3 style='display: inline-block;'>Date Created</h3><p style='display: inline-block;'>" + childData.dateCreated + "</p><br><h3 style='display: inline-block;'>EC Claim Type: </h3><p style='display: inline-block;'>" + childData.ecType + 
                        "</p><br><h3 style='display: inline-block;'>Nature: </h3><p style='display: inline-block;'>" +childData.ecNature + "</p><br><h3 style='display: inline-block;'>Summary: </h3><p style='display: inline-block;'>" +childData.ecSummary +"</p><br><h3 style='display: inline-block;'>Assessments</h3><p style='display: inline-block;'>" +childData.ecAssessments + "</p><br><h3 style='display: inline-block;'>Date Extend Request </h3><p style='display: inline-block;'>" +childData.ecReqDate + "</p><br><h3 style='display: inline-block;'>Evidence: </h3><p style='display: inline-block;'>" +childData.ecEvidence + `</p><br><button onclick="location.href='../HTML/review_ECapplication.html?id=${childKey}';">respond to report</button></td></tr>`;


                        $(entry).appendTo("#container");
                        }
                        else{
                          console.log("responded");
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

