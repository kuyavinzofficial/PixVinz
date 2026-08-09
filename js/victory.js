// ======================================
// PixVinz
// VICTORY SYSTEM
// ======================================


// ======================================
// VICTORY SCREEN
// ======================================

function showVictory(stars, reward){

    // ------------------------------
    // GET VICTORY ELEMENTS
    // ------------------------------

    const victoryScreen =
        document.getElementById("victoryScreen");

    const finalTime =
        document.getElementById("finalTime");

    const finalMoves =
        document.getElementById("finalMoves");

    const rewardCoins =
        document.getElementById("rewardCoins");

    const starsDisplay =
        document.getElementById("starsDisplay");


    // ------------------------------
    // SAFETY CHECK
    // ------------------------------

    if(!victoryScreen){

        return;

    }


    // ------------------------------
    // FINAL RESULTS
    // ------------------------------

    if(finalTime){

        finalTime.textContent =
            seconds + "s";

    }


    if(finalMoves){

        finalMoves.textContent =
            moves;

    }


    if(rewardCoins){

        rewardCoins.textContent =
            reward;

    }


    if(starsDisplay){

        starsDisplay.textContent =
            stars;

    }


    // ------------------------------
    // SHOW COMPLETED PUZZLE IMAGE
    // ------------------------------

    const completedImage =
        document.getElementById("completedImage");


    if(
        completedImage &&
        typeof images !== "undefined" &&
        images[level - 1]
    ){

        completedImage.src =
            images[level - 1];

    }


    // ------------------------------
    // BEST RECORD
    // ------------------------------

    let bestRecord =
        document.getElementById("bestRecord");


    if(!bestRecord){

        bestRecord =
            document.createElement("div");


        bestRecord.id =
            "bestRecord";


        bestRecord.style.marginTop =
            "20px";


        const victoryBox =
            document.querySelector(".victory-box");


        if(victoryBox){

            victoryBox.appendChild(
                bestRecord
            );

        }

    }


    // ------------------------------
    // GET BEST RECORDS
    // ------------------------------

    const bestTime =
        localStorage.getItem(
            "level" + level + "BestTime"
        );


    const bestMoves =
        localStorage.getItem(
            "level" + level + "BestMoves"
        );


    const bestStars =
        Number(
            localStorage.getItem(
                "level" + level + "BestStars"
            )
        ) || 1;


    // ------------------------------
    // BEST STAR DISPLAY
    // ------------------------------

    let bestStarText =
        "⭐";


    if(bestStars === 2){

        bestStarText =
            "⭐⭐";

    }


    if(bestStars >= 3){

        bestStarText =
            "⭐⭐⭐";

    }


    // ------------------------------
    // DISPLAY BEST RECORD
    // ------------------------------

    if(bestRecord){

        bestRecord.innerHTML = `

            <hr>

            <h3>🏆 Best Record</h3>

            <p>${bestStarText}</p>

            <p>⏱ ${bestTime || 0}s</p>

            <p>🔄 ${bestMoves || 0} moves</p>

        `;

    }


    // ------------------------------
    // SHOW VICTORY SCREEN
    // ------------------------------

    victoryScreen.classList.remove(
        "hidden"
    );

}



// ======================================
// BACK TO HOME
// ======================================

function backHome(){

    if(typeof playClick === "function"){

        playClick();

    }


    window.location =
        "index.html";

}



// ======================================
// RESTART CURRENT LEVEL
// ======================================

function restartLevel(){

    // ------------------------------
    // HIDE VICTORY SCREEN
    // ------------------------------

    const victoryScreen =
        document.getElementById(
            "victoryScreen"
        );


    if(victoryScreen){

        victoryScreen.classList.add(
            "hidden"
        );

    }


    // ------------------------------
    // STOP CURRENT TIMER
    // ------------------------------

    if(typeof stopTimer === "function"){

        stopTimer();

    }
    else if(typeof timer !== "undefined"){

        clearInterval(timer);

    }


    // ------------------------------
    // SHUFFLE AGAIN
    // ------------------------------

    if(typeof shufflePuzzle === "function"){

        shufflePuzzle();

    }

}
