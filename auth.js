// ======================================
// PixVZinz
// AUTHENTICATION SYSTEM
// ======================================
//
// Handles:
// - Sign Up
// - Log In
// - Log Out
// - Login / Signup screen switching
// - Current player session
// - Welcome username
//
// Storage:
// - pixvz_user
// - pixvz_password
// - pixvz_loggedIn
//
// ======================================


// ======================================
// AUTH ELEMENTS
// ======================================

const loginScreen =
    document.getElementById("loginScreen");

const signupScreen =
    document.getElementById("signupScreen");

const loginUsername =
    document.getElementById("loginUsername");

const loginPassword =
    document.getElementById("loginPassword");

const signupUsername =
    document.getElementById("signupUsername");

const signupPassword =
    document.getElementById("signupPassword");

const signupConfirmPassword =
    document.getElementById(
        "signupConfirmPassword"
    );

const loginBtn =
    document.getElementById("loginBtn");

const signupBtn =
    document.getElementById("signupBtn");

const showSignupBtn =
    document.getElementById(
        "showSignupBtn"
    );

const showLoginBtn =
    document.getElementById(
        "showLoginBtn"
    );

const logoutBtn =
    document.getElementById("logoutBtn");

const authMessage =
    document.getElementById("authMessage");

const authContainer =
    document.getElementById(
        "authContainer"
    );

const mainMenu =
    document.getElementById("mainMenu");

const welcomeText =
    document.getElementById(
        "welcomeText"
    );

const usernameDisplay =
    document.getElementById(
        "usernameDisplay"
    );


// ======================================
// STORAGE KEYS
// ======================================

const AUTH_USERNAME_KEY =
    "pixvz_user";

const AUTH_PASSWORD_KEY =
    "pixvz_password";

const AUTH_LOGGED_IN_KEY =
    "pixvz_loggedIn";


// ======================================
// SHOW MESSAGE
// ======================================

function showAuthMessage(
    message,
    isError = true
){

    if(!authMessage){

        return;

    }


    authMessage.textContent =
        message;


    authMessage.style.display =
        "block";


    if(isError){

        authMessage.classList.add(
            "error"
        );

    }
    else{

        authMessage.classList.remove(
            "error"
        );

    }

}


// ======================================
// CLEAR MESSAGE
// ======================================

function clearAuthMessage(){

    if(!authMessage){

        return;

    }


    authMessage.textContent = "";

    authMessage.classList.remove(
        "error"
    );

}


// ======================================
// SHOW LOGIN
// ======================================

function showLogin(){

    if(loginScreen){

        loginScreen.style.display =
            "block";

    }


    if(signupScreen){

        signupScreen.style.display =
            "none";

    }


    clearAuthMessage();

}


// ======================================
// SHOW SIGNUP
// ======================================

function showSignup(){

    if(loginScreen){

        loginScreen.style.display =
            "none";

    }


    if(signupScreen){

        signupScreen.style.display =
            "block";

    }


    clearAuthMessage();

}


// ======================================
// GET SAVED USERNAME
// ======================================

function getSavedUsername(){

    return localStorage.getItem(
        AUTH_USERNAME_KEY
    ) || "";

}


// ======================================
// CHECK IF ACCOUNT EXISTS
// ======================================

function accountExists(){

    return(
        localStorage.getItem(
            AUTH_USERNAME_KEY
        ) !== null &&
        localStorage.getItem(
            AUTH_PASSWORD_KEY
        ) !== null
    );

}


// ======================================
// CHECK LOGIN STATUS
// ======================================

function isLoggedIn(){

    return(
        localStorage.getItem(
            AUTH_LOGGED_IN_KEY
        ) === "true"
    );

}


// ======================================
// SIGN UP
// ======================================

function signup(){

    if(
        !signupUsername ||
        !signupPassword ||
        !signupConfirmPassword
    ){

        return;

    }


    const username =
        signupUsername.value.trim();

    const password =
        signupPassword.value;

    const confirmPassword =
        signupConfirmPassword.value;


    // ------------------------------
    // Username
    // ------------------------------

    if(username === ""){

        showAuthMessage(
            "Please choose a username."
        );

        signupUsername.focus();

        return;

    }


    // ------------------------------
    // Username length
    // ------------------------------

    if(username.length < 3){

        showAuthMessage(
            "Username must be at least 3 characters."
        );

        signupUsername.focus();

        return;

    }


    // ------------------------------
    // Password
    // ------------------------------

    if(password === ""){

        showAuthMessage(
            "Please create a password."
        );

        signupPassword.focus();

        return;

    }


    // ------------------------------
    // Password length
    // ------------------------------

    if(password.length < 4){

        showAuthMessage(
            "Password must be at least 4 characters."
        );

        signupPassword.focus();

        return;

    }


    // ------------------------------
    // Confirm password
    // ------------------------------

    if(password !== confirmPassword){

        showAuthMessage(
            "Passwords do not match."
        );

        signupConfirmPassword.focus();

        return;

    }


    // ------------------------------
    // Existing account
    // ------------------------------

    if(accountExists()){

        showAuthMessage(
            "An account already exists on this device."
        );

        return;

    }


    // ------------------------------
    // Save account
    // ------------------------------

    localStorage.setItem(
        AUTH_USERNAME_KEY,
        username
    );


    localStorage.setItem(
        AUTH_PASSWORD_KEY,
        password
    );


    // ------------------------------
    // Log user in
    // ------------------------------

    localStorage.setItem(
        AUTH_LOGGED_IN_KEY,
        "true"
    );


    // ------------------------------
    // Clear signup fields
    // ------------------------------

    signupUsername.value = "";

    signupPassword.value = "";

    signupConfirmPassword.value = "";


    // ------------------------------
    // Open main menu
    // ------------------------------

    showMainMenu(username);

}


// ======================================
// LOGIN
// ======================================

function login(){

    if(
        !loginUsername ||
        !loginPassword
    ){

        return;

    }


    const username =
        loginUsername.value.trim();

    const password =
        loginPassword.value;


    // ------------------------------
    // Empty username
    // ------------------------------

    if(username === ""){

        showAuthMessage(
            "Please enter your username."
        );

        loginUsername.focus();

        return;

    }


    // ------------------------------
    // Empty password
    // ------------------------------

    if(password === ""){

        showAuthMessage(
            "Please enter your password."
        );

        loginPassword.focus();

        return;

    }


    // ------------------------------
    // Check account
    // ------------------------------

    if(!accountExists()){

        showAuthMessage(
            "No account found. Please create an account first."
        );

        return;

    }


    const savedUsername =
        getSavedUsername();

    const savedPassword =
        localStorage.getItem(
            AUTH_PASSWORD_KEY
        ) || "";


    // ------------------------------
    // Validate credentials
    // ------------------------------

    if(
        username !== savedUsername ||
        password !== savedPassword
    ){

        showAuthMessage(
            "Incorrect username or password."
        );

        return;

    }


    // ------------------------------
    // Save login state
    // ------------------------------

    localStorage.setItem(
        AUTH_LOGGED_IN_KEY,
        "true"
    );


    // ------------------------------
    // Clear fields
    // ------------------------------

    loginUsername.value = "";

    loginPassword.value = "";


    // ------------------------------
    // Open main menu
    // ------------------------------

    showMainMenu(
        savedUsername
    );

}


// ======================================
// SHOW MAIN MENU
// ======================================

function showMainMenu(username){

    if(authContainer){

        authContainer.style.display =
            "none";

    }


    if(mainMenu){

        mainMenu.style.display =
            "block";

    }


    if(welcomeText){

        welcomeText.textContent =
            "Welcome!";

    }


    if(usernameDisplay){

        usernameDisplay.textContent =
            username;

    }


    clearAuthMessage();


    // Update coins if available

    if(
        typeof updateCoinDisplay ===
        "function"
    ){

        updateCoinDisplay();

    }


    // Main menu music

    if(
        typeof playMainMusic ===
        "function"
    ){

        playMainMusic();

    }

}


// ======================================
// SHOW LOGIN SCREEN
// ======================================

function showLoginScreen(){

    if(mainMenu){

        mainMenu.style.display =
            "none";

    }


    if(authContainer){

        authContainer.style.display =
            "block";

    }


    showLogin();

}


// ======================================
// LOG OUT
// ======================================

function logout(){

    localStorage.setItem(
        AUTH_LOGGED_IN_KEY,
        "false"
    );


    if(
        typeof stopAllAudio ===
        "function"
    ){

        stopAllAudio();

    }


    if(loginUsername){

        loginUsername.value = "";

    }


    if(loginPassword){

        loginPassword.value = "";

    }


    showLoginScreen();

}


// ======================================
// LOGIN BUTTON
// ======================================

if(loginBtn){

    loginBtn.addEventListener(
        "click",
        function(){

            login();

        }
    );

}


// ======================================
// SIGNUP BUTTON
// ======================================

if(signupBtn){

    signupBtn.addEventListener(
        "click",
        function(){

            signup();

        }
    );

}


// ======================================
// SHOW SIGNUP BUTTON
// ======================================

if(showSignupBtn){

    showSignupBtn.addEventListener(
        "click",
        function(){

            showSignup();

        }
    );

}


// ======================================
// SHOW LOGIN BUTTON
// ======================================

if(showLoginBtn){

    showLoginBtn.addEventListener(
        "click",
        function(){

            showLogin();

        }
    );

}


// ======================================
// LOGOUT BUTTON
// ======================================

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        function(){

            logout();

        }
    );

}


// ======================================
// ENTER KEY
// ======================================

if(loginPassword){

    loginPassword.addEventListener(
        "keydown",
        function(event){

            if(event.key === "Enter"){

                login();

            }

        }
    );

}


if(signupConfirmPassword){

    signupConfirmPassword.addEventListener(
        "keydown",
        function(event){

            if(event.key === "Enter"){

                signup();

            }

        }
    );

}


// ======================================
// INITIAL AUTH STATE
// ======================================

function initializeAuth(){

    if(isLoggedIn()){

        const username =
            getSavedUsername();


        if(username){

            showMainMenu(
                username
            );

            return;

        }

    }


    // Default:
    // Show login screen

    if(mainMenu){

        mainMenu.style.display =
            "none";

    }


    if(authContainer){

        authContainer.style.display =
            "block";

    }


    showLogin();

}


// ======================================
// INITIALIZE
// ======================================

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initializeAuth
    );

}
else{

    initializeAuth();

}


// ======================================
// END OF AUTH SYSTEM
// ======================================
