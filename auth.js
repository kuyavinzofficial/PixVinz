// ======================================
// PuzzleMania Authentication
// ======================================

// Create Account
function signup(){

    const username =
        document.getElementById("signupUsername").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    if(username === "" || password === ""){

        alert("Please complete all fields.");

        return;

    }

    if(localStorage.getItem("user_" + username)){

        alert("Username already exists.");

        return;

    }

    const user = {

        username: username,

        password: password,

        coins: 0,

        unlockedLevel: 1

    };

    localStorage.setItem(
        "user_" + username,
        JSON.stringify(user)
    );

    alert("Account created successfully!");

    window.location = "index.html";

}



// Login
function login(){

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const data =
        localStorage.getItem("user_" + username);

    if(!data){

        alert("Account not found.");

        return;

    }

    const user = JSON.parse(data);

    if(user.password !== password){

        alert("Incorrect password.");

        return;

    }

    localStorage.setItem(
        "currentUser",
        username
    );

    window.location = "menu.html";

}



// Logout
function logout(){

    localStorage.removeItem("currentUser");

    window.location = "index.html";

}
