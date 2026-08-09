// ======================================
// PixVZinz
// AUTHENTICATION SYSTEM
// ======================================
//
// Handles only:
// - Sign up
// - Log in
// - Logout
// - Current logged-in user
// - Showing login / signup screens
// - Protecting the main menu
//
// Does NOT handle:
// - Audio          → audio.js
// - Main menu      → script.js
// - Save system    → save.js
// - Puzzle         → js/puzzle.js
// ======================================


// ======================================
// STORAGE KEYS
// ======================================

const AUTH_USERS_KEY =
    "pixvz_users";

const CURRENT_USER_KEY =
    "pixvz_currentUser";


// ======================================
// GET USERS
// ======================================

function getUsers(){

    try{

        return JSON.parse(
            localStorage.getItem(
                AUTH_USERS_KEY
            )
        ) || {};

    }
    catch(error){

        console.error(
            "PixVZinz: Could not read users.",
            error
        );

        return {};

    }

}


// ======================================
// SAVE USERS
// ======================================

function saveUsers(users){

    localStorage.setItem(
        AUTH_USERS_KEY,
        JSON.stringify(users)
    );

}


// ======================================
// GET CURRENT USER
// ======================================

function getCurrentUser(){

    return localStorage.getItem(
        CURRENT_USER_KEY
    );

}


// ======================================
// SET CURRENT USER
// ======================================

function setCurrentUser(username){

    localStorage.setItem(
        CURRENT_USER_KEY,
        username
    );

}


// ======================================
// CLEAR CURRENT USER
// ======================================

function clearCurrentUser(){

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

}


// ======================================
// AUTH MESSAGE
// ======================================

function showAuthMessage(message){

    const messageElement =
        document.getElementById(
            "authMessage"
        );


    if(messageElement){

        messageElement.textContent =
            message;

    }

}


// ======================================
// SHOW LOGIN
// ======================================

function showLogin(){

    const loginScreen =
        document.getElementById(
            "loginScreen"
        );

    const signupScreen =
        document.getElementById(
            "signupScreen"
        );


    if(loginScreen){

        loginScreen.style.display =
            "block";

    }


    if(signupScreen){

        signupScreen.style.display =
            "none";

    }


    showAuthMessage("");

}


// ======================================
// SHOW SIGNUP
// ======================================

function showSignup(){

    const loginScreen =
        document.getElementById(
            "loginScreen"
        );

    const signupScreen =
        document.getElementById(
            "signupScreen"
        );


    if(loginScreen){

        loginScreen.style.display =
            "none";

    }


    if(signupScreen){

        signupScreen.style.display =
            "block";

    }


    showAuthMessage("");

}


// ======================================
// SIGN UP
// ======================================

function signupUser(){

    const usernameInput =
        document.getElementById(
            "signupUsername"
        );

    const passwordInput =
        document.getElementById(
            "signupPassword"
        );

    const confirmInput =
        document.getElementById(
            "signupConfirmPassword"
        );


    if(
        !usernameInput ||
        !passwordInput ||
        !confirmInput
    ){

        return;

    }


    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmInput.value;


    // ------------------------------
    // Validate username
    // ------------------------------

    if(!username){

        showAuthMessage(
            "Please enter a username."
        );

        return;

    }


    // ------------------------------
    // Validate password
    // ------------------------------

    if(!password){

        showAuthMessage(
            "Please enter a password."
        );

        return;

    }


    // ------------------------------
    // Confirm password
    // ------------------------------

    if(
        password !==
        confirmPassword
    ){

        showAuthMessage(
            "Passwords do not match."
        );

        return;

    }


    // ------------------------------
    // Get users
    // ------------------------------

    const users =
        getUsers();


    // ------------------------------
    // Username exists
    // ------------------------------

    if(
        users[username]
    ){

        showAuthMessage(
            "Username already exists."
        );

        return;

    }


    // ------------------------------
    // Create account
    // ------------------------------

    users[username] = {

        password:
            password,

        created:
            Date.now()

    };


    saveUsers(users);


    // ------------------------------
    // Log user in
    // ------------------------------

    setCurrentUser(username);


    showAuthMessage(
        "Account created successfully!"
    );


    // ------------------------------
    // Open main menu
    // ------------------------------

    setTimeout(
        function(){

            window.location.href =
                "index.html";

        },
        400
    );

}


// ======================================
// LOGIN
// ======================================

function loginUser(){

    const usernameInput =
        document.getElementById(
            "loginUsername"
        );

    const passwordInput =
        document.getElementById(
            "loginPassword"
        );


    if(
        !usernameInput ||
        !passwordInput
    ){

        return;

    }


    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value;


    // ------------------------------
    // Validate fields
    // ------------------------------

    if(
        !username ||
        !password
    ){

        showAuthMessage(
            "Please enter your username and password."
        );

        return;

    }


    // ------------------------------
    // Get users
    // ------------------------------

    const users =
        getUsers();


    const user =
        users[username];


    // ------------------------------
    // Validate account
    // ------------------------------

    if(
        !user ||
        user.password !== password
    ){

        showAuthMessage(
            "Incorrect username or password."
        );

        return;

    }


    // ------------------------------
    // Save session
    // ------------------------------

    setCurrentUser(username);


    showAuthMessage(
        "Login successful!"
    );


    // ------------------------------
    // Open main menu
    // ------------------------------

    setTimeout(
        function(){

            window.location.href =
                "index.html";

        },
        300
    );

}


// ======================================
// LOGOUT
// ======================================

function logoutUser(){

    clearCurrentUser();


    // Return to login screen

    window.location.href =
        "index.html";

}


// ======================================
// SHOW MAIN MENU
// ======================================

function showMainMenu(){

    const authContainer =
        document.getElementById(
            "authContainer"
        );

    const mainMenu =
        document.getElementById(
            "mainMenu"
        );


    if(authContainer){

        authContainer.style.display =
            "none";

    }


    if(mainMenu){

        mainMenu.style.display =
            "block";

    }


    // ------------------------------
    // Username display
    // ------------------------------

    const usernameDisplay =
        document.getElementById(
            "usernameDisplay"
        );

    const welcomeText =
        document.getElementById(
            "welcomeText"
        );


    const username =
        getCurrentUser();


    if(usernameDisplay){

        usernameDisplay.textContent =
            username || "";

    }


    if(welcomeText){

        welcomeText.textContent =
            "Welcome!";

    }


    // ------------------------------
    // Coin display
    // ------------------------------

    if(
        typeof updateCoinDisplay ===
        "function"
    ){

        updateCoinDisplay();

    }

}


// ======================================
// SHOW AUTH SCREEN
// ======================================

function showAuthScreen(){

    const authContainer =
        document.getElementById(
            "authContainer"
        );

    const mainMenu =
        document.getElementById(
            "mainMenu"
        );


    if(authContainer){

        authContainer.style.display =
            "block";

    }


    if(mainMenu){

        mainMenu.style.display =
            "none";

    }

}


// ======================================
// INITIALIZE AUTH
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        // ------------------------------
        // Buttons
        // ------------------------------

        const loginBtn =
            document.getElementById(
                "loginBtn"
            );


        const signupBtn =
            document.getElementById(
                "signupBtn"
            );


        const showSignupBtn =
            document.getElementById(
                "showSignupBtn"
            );


        const showLoginBtn =
            document.getElementById(
                "showLoginBtn"
            );


        // ------------------------------
        // Login button
        // ------------------------------

        if(loginBtn){

            loginBtn.onclick =
                function(){

                    loginUser();

                };

        }


        // ------------------------------
        // Signup button
        // ------------------------------

        if(signupBtn){

            signupBtn.onclick =
                function(){

                    signupUser();

                };

        }


        // ------------------------------
        // Show signup
        // ------------------------------

        if(showSignupBtn){

            showSignupBtn.onclick =
                function(){

                    showSignup();

                };

        }


        // ------------------------------
        // Show login
        // ------------------------------

        if(showLoginBtn){

            showLoginBtn.onclick =
                function(){

                    showLogin();

                };

        }


        // ------------------------------
        // Check session
        // ------------------------------

        if(getCurrentUser()){

            showMainMenu();

        }
        else{

            showAuthScreen();

        }


        console.log(
            "PixVZinz: Authentication ready."
        );

    }
);
