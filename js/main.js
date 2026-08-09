// ======================================
// PixVZinz
// MAIN GAME STARTUP
// ======================================
//
// Handles:
// - Starting the game
// - Connecting victory buttons
// - Starting the puzzle
// - Starting puzzle background music
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

                // Stop current audio

                if(typeof stopAllAudio === "function"){

                    stopAllAudio();

                }


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

            if(typeof stopAllAudio === "function"){

                stopAllAudio();

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

            if(typeof stopAllAudio === "function"){

                stopAllAudio();

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
    // PUZZLE MUSIC
    // ==================================
    //
    // The puzzle page uses bgmusic.mp3.
    //
    // main.mp3 is NOT started here.
    //
    // ==================================

    if(typeof playPuzzleMusic === "function"){

        playPuzzleMusic();

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
