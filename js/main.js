// ======================================
// PixVZinz
// MAIN GAME STARTUP
// ======================================
//
// Handles:
// - Starting the game
// - Connecting victory buttons
// - Starting the puzzle
// - Starting background music
// - Hiding the victory screen initially
//
// ======================================


// ======================================
// WAIT FOR PAGE TO LOAD
// ======================================

window.addEventListener("load", function(){

    console.log("PixVZinz: Game loaded.");



    // ==================================
    // VICTORY SCREEN
    // ==================================

    const victoryScreen =
        document.getElementById("victoryScreen");


    if(victoryScreen){

        victoryScreen.classList.add("hidden");

        victoryScreen.style.display = "none";

    }



    // ==================================
    // NEXT LEVEL BUTTON
    // ==================================

    const nextBtn =
        document.getElementById("nextBtn");


    if(nextBtn){

        nextBtn.onclick = function(){

            // Button sound
            if(typeof playClick === "function"){

                playClick();

            }


            // Current level
            const currentLevel =
                Number(level) || 1;


            // Next level
            const nextLevel =
                currentLevel + 1;


            // Make sure the next level exists
            if(
                typeof images !== "undefined" &&
                nextLevel <= images.length
            ){

                // Save next level
                localStorage.setItem(
                    "level",
                    nextLevel
                );


                // Reload game
                window.location.reload();

            }
            else{

                // No more levels
                backHome();

            }

        };

    }



    // ==================================
    // RETRY BUTTON
    // ==================================

    const retryBtn =
        document.getElementById("retryBtn");


    if(retryBtn){

        retryBtn.onclick = function(){

            if(typeof playClick === "function"){

                playClick();

            }


            if(typeof restartLevel === "function"){

                restartLevel();

            }

        };

    }



    // ==================================
    // HOME BUTTON
    // ==================================

    const homeBtn =
        document.getElementById("homeBtn");


    if(homeBtn){

        homeBtn.onclick = function(){

            if(typeof playClick === "function"){

                playClick();

            }


            backHome();

        };

    }



    // ==================================
    // START PUZZLE
    // ==================================

    if(typeof setup === "function"){

        setup();

    }
    else{

        console.error(
            "PixVZinz: setup() was not found."
        );

    }



    // ==================================
    // BACKGROUND MUSIC
    // ==================================

    if(typeof startMusic === "function"){

        startMusic();

    }



    console.log(
        "PixVZinz: Game startup complete."
    );

});



// ======================================
// BACK TO HOME
// ======================================

function backHome(){

    window.location.href =
        "index.html";

}
