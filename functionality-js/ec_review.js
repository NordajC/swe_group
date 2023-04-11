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
                        "<div class='card'><div class='card-header'><h2 class='mb-0'>" 
                        + childKey + 
                        "</h2></div><div class='card-body'><div class='row'><div class='col-sm-6'><h3>Student ID:</h3>" 
                        + childData.StudentID + "/p></div><div class='col-sm-6'><h3>Date Created:</h3><p>" + childData.dateCreated + "</p></div></div><div class='row'><div class='col-sm-6'><h3>EC Claim Type:</h3><p>" + childData.ecType + 
                        "</p></div><div class='col-sm-6'><h3>Nature:</h3><p>" +childData.ecNature + "</p></div></div><div class='row'><div class='col-sm-6'><h3>Summary:</h3><p>" +childData.ecSummary +"</p></div><div class='col-sm-6'><h3>Assessments:</h3><p>" +childData.ecAssessments + "</p></div></div><div class='row'><div class='col-sm-6'><h3>Date Extend Request:</h3><p>" +childData.ecReqDate + "</p></div><div class='col-sm-6'><h3>Evidence:</h3><p>" +childData.ecEvidence + `</p></div></div><div class='row'></div><div class='row mt-3'><div class='col-sm-6'><button class='btn btn-primary' onclick="location.href='../HTML/respond_to_ec.html?id=${childKey}';">respond to report</button>`;


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

