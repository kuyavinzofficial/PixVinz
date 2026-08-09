// ======================================
// PixVZinz
// MAIN MENU SYSTEM
// ======================================
//
// Handles only:
// - Opening the main menu
// - Splash screen
// - Play Game button
// - Levels button
// - Settings popup
// - About popup
// - Logout button
// - Main menu music
//
// Does NOT handle:
// - Login / signup        → auth.js
// - Save data             → save.js
// - Audio functions       → audio.js
// - Puzzle                → puzzle.js
// - Board                 → board.js
// - Timer                 → timer.js
// - Victory               → victory.js
// ======================================


// ======================================
// WAIT FOR PAGE LOAD
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        console.log(
            "PixVZinz: Main menu loaded."
        );


        // ==================================
        // SPLASH SCREEN
        // ==================================

        const splash =
            document.getElementById(
                "puzzleSplash"
            );


        if(splash){

            setTimeout(
                function(){

                    splash.classList.add(
                        "hidden"
                    );

                    splash.style.display =
                        "none";

                },
                1800
            );

        }


        // ==================================
        // MAIN MENU
        // ==================================

        const mainMenu =
            document.getElementById(
                "mainMenu"
            );


        // ==================================
        // PLAY GAME
        // ==================================

        const startGameBtn =
            document.getElementById(
                "startGameBtn"
            );


        if(startGameBtn){

            startGameBtn.onclick =
                function(){

                    console.log(
                        "PixVZinz: Starting game."
                    );


                    window.location.href =
                        "game.html";

                };

        }


        // ==================================
        // LEVELS
        // ==================================

        const levelsBtn =
            document.getElementById(
                "levelsBtn"
            );


        if(levelsBtn){

            levelsBtn.onclick =
                function(){

                    console.log(
                        "PixVZinz: Opening levels."
                    );


                    window.location.href =
                        "levels.html";

                };

        }


        // ==================================
        // SETTINGS
        // ==================================

        const settingsBtn =
            document.getElementById(
                "settingsBtn"
            );


        const settingsPopup =
            document.getElementById(
                "settingsPopup"
            );


        const closeSettingsBtn =
            document.getElementById(
                "closeSettingsBtn"
            );


        if(
            settingsBtn &&
            settingsPopup
        ){

            settingsBtn.onclick =
                function(){

                    settingsPopup.style.display =
                        "flex";

                };

        }


        if(
            closeSettingsBtn &&
            settingsPopup
        ){

            closeSettingsBtn.onclick =
                function(){

                    settingsPopup.style.display =
                        "none";

                };

        }


        // ==================================
        // CLOSE SETTINGS WHEN
        // CLICKING OUTSIDE THE BOX
        // ==================================

        if(settingsPopup){

            settingsPopup.addEventListener(
                "click",
                function(event){

                    if(
                        event.target ===
                        settingsPopup
                    ){

                        settingsPopup.style.display =
                            "none";

                    }

                }
            );

        }


        // ==================================
        // ABOUT
        // ==================================

        const aboutBtn =
            document.getElementById(
                "aboutBtn"
            );


        const aboutBox =
            document.getElementById(
                "aboutBox"
            );


        const closeAboutBtn =
            document.getElementById(
                "closeAboutBtn"
            );


        if(
            aboutBtn &&
            aboutBox
        ){

            aboutBtn.onclick =
                function(){

                    aboutBox.style.display =
                        "flex";

                };

        }


        if(
            closeAboutBtn &&
            aboutBox
        ){

            closeAboutBtn.onclick =
                function(){

                    aboutBox.style.display =
                        "none";

                };

        }


        // ==================================
        // CLOSE ABOUT WHEN
        // CLICKING OUTSIDE
        // ==================================

        if(aboutBox){

            aboutBox.addEventListener(
                "click",
                function(event){

                    if(
                        event.target ===
                        aboutBox
                    ){

                        aboutBox.style.display =
                            "none";

                    }

                }
            );

        }


        // ==================================
        // LOGOUT
        // ==================================

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        if(logoutBtn){

            logoutBtn.onclick =
                function(){

                    console.log(
                        "PixVZinz: Logging out."
                    );


                    // auth.js is responsible
                    // for the actual logout.

                    if(
                        typeof logoutUser ===
                        "function"
                    ){

                        logoutUser();

                    }
                    else{

                        // Safe fallback

                        localStorage.removeItem(
                            "loggedInUser"
                        );

                        localStorage.removeItem(
                            "currentUser"
                        );

                        window.location.href =
                            "index.html";

                    }

                };

        }


        // ==================================
        // MAIN MUSIC
        // ==================================

        if(
            typeof playMainMusic ===
            "function"
        ){

            playMainMusic();

        }


        console.log(
            "PixVZinz: Main menu ready."
        );

    }
);
