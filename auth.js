// ======================================
// PuzzleMania Authentication System
// Version 2.0
// ======================================


// ------------------------------
// CREATE ACCOUNT
// ------------------------------

function signup(){

    const displayName =
        document.getElementById("displayName").value.trim();

    const username =
        document.getElementById("signupUsername").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check empty fields

    if(
        displayName === "" ||
        username === "" ||
        password === "" ||
        confirmPassword === ""
    ){

        alert("Please complete all fields.");

        return;

    }


    // Passwords must match

    if(password !== confirmPassword){

        alert("Passwords do not match.");

        return;

    }


    // Username already exists

    if(localStorage.getItem("user_" + username)){

        alert("Username already exists.");

        return;

    }


    // Create player

    const user = {

        displayName: displayName,

        username: username,

        password: password,

        coins: 0,

        unlockedLevel: 1,

        totalStars: 0,

        createdAt: Date.now()

    };


    localStorage.setItem(
        "user_" + username,
        JSON.stringify(user)
    );


    // Automatically log in

    localStorage.setItem(
        "currentUser",
        username
    );


    alert("Account created successfully!");


    window.location = "index.html";

}



// ------------------------------
// LOGIN
// ------------------------------

function login(){

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if(username === "" || password === ""){

        alert("Please enter your username and password.");

        return;

    }


    const data =
        localStorage.getItem("user_" + username);


    if(!data){

        alert("Account not found.");

        return;

    }


    const user =
        JSON.parse(data);


    if(user.password !== password){

        alert("Incorrect password.");

        return;

    }


    localStorage.setItem(
        "currentUser",
        username
    );


    window.location = "index.html";

}



// ------------------------------
// LOGOUT
// ------------------------------

function logout(){

    if(confirm("Logout from PuzzleMania?")){

        localStorage.removeItem(
            "currentUser"
        );

        window.location =
        "login.html";

    }

}



// ------------------------------
// GET CURRENT USER
// ------------------------------

function getCurrentUser(){

    const username =
        localStorage.getItem(
            "currentUser"
        );

    if(!username){

        return null;

    }


    const data =
        localStorage.getItem(
            "user_" + username
        );

    if(!data){

        return null;

    }


    return JSON.parse(data);

}



// ------------------------------
// SAVE CURRENT USER
// ------------------------------

function saveCurrentUser(user){

    localStorage.setItem(

        "user_" + user.username,

        JSON.stringify(user)

    );

}



// ------------------------------
// REQUIRE LOGIN
// ------------------------------

function requireLogin(){

    const username =
        localStorage.getItem(
            "currentUser"
        );

    if(!username){

        window.location =
        "login.html";

    }

}
