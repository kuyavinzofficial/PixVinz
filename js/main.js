// ======================================
// PuzzleMania
// MAIN GAME STARTUP
// ======================================


// ======================================
// START GAME
// ======================================

window.addEventListener("load", function(){


// ------------------------------
// Victory Elements
// ------------------------------

victoryScreen =
document.getElementById("victoryScreen");


finalTime =
document.getElementById("finalTime");


finalMoves =
document.getElementById("finalMoves");


rewardCoins =
document.getElementById("rewardCoins");


starsDisplay =
document.getElementById("starsDisplay");



nextBtn =
document.getElementById("nextBtn");


retryBtn =
document.getElementById("retryBtn");


homeBtn =
document.getElementById("homeBtn");




// ------------------------------
// Hide Victory Screen
// ------------------------------

if(victoryScreen){

    victoryScreen.classList.add("hidden");

}




// ------------------------------
// NEXT BUTTON
// ------------------------------

if(nextBtn){

    nextBtn.onclick = function(){


        if(typeof playClick === "function"){

            playClick();

        }



        let next =
        level + 1;



        if(next <= images.length){


            localStorage.setItem(
                "level",
                next
            );


            location.reload();


        }
        else{


            backHome();


        }


    };

}




// ------------------------------
// RETRY BUTTON
// ------------------------------

if(retryBtn){

    retryBtn.onclick = function(){


        if(typeof playClick === "function"){

            playClick();

        }


        restartLevel();


    };

}




// ------------------------------
// HOME BUTTON
// ------------------------------

if(homeBtn){

    homeBtn.onclick = function(){


        backHome();


    };

}




// ------------------------------
// START PUZZLE
// ------------------------------

if(typeof setup === "function"){

    setup();

}




// ------------------------------
// BACKGROUND MUSIC
// ------------------------------

if(typeof startMusic === "function"){

    startMusic();

}



});
```
