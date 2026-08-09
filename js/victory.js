// ======================================
// PuzzleMania
// VICTORY SYSTEM
// ======================================
//
// Handles:
// - Victory screen
// - Final time
// - Final moves
// - Star display
// - Coin reward
// - Completed image
// - Best record
// - Restart
// - Home
// ======================================


// ======================================
// SHOW VICTORY SCREEN
// ======================================

function showVictory(stars, reward){

    console.log("PuzzleMania: showVictory() called");


    // ------------------------------
    // Get victory screen
    // ------------------------------

    const victoryScreen =
        document.getElementById("victoryScreen");


    // ------------------------------
    // Safety check
    // ------------------------------

    if(!victoryScreen){

        console.error(
            "PuzzleMania: #victoryScreen not found."
        );

        return;

    }


    // ======================================
    // SHOW SCREEN IMMEDIATELY
    // ======================================

    victoryScreen.classList.remove("hidden");

    victoryScreen.style.setProperty(
        "display",
        "flex",
        "important"
    );

    victoryScreen.style.pointerEvents =
        "auto";


    // ======================================
    // GET VICTORY ELEMENTS
    // ======================================

    const finalTime =
        document.getElementById("finalTime");

    const finalMoves =
        document.getElementById("finalMoves");

    const rewardCoins =
        document.getElementById("rewardCoins");

    const starsDisplay =
        document.getElementById("starsDisplay");

    const completedImage =
        document.getElementById("completedImage");


    // ======================================
    // FINAL TIME
    // ======================================

    if(finalTime){

        finalTime.textContent =
            seconds + "s";

    }


    // ======================================
    // FINAL MOVES
    // ======================================

    if(finalMoves){

        finalMoves.textContent =
            moves;

    }


    // ======================================
    // COIN REWARD
    // ======================================

    if(rewardCoins){

        rewardCoins.textContent =
            reward;

    }


    // ======================================
    // STARS
    // ======================================

    if(starsDisplay){

        starsDisplay.textContent =
            stars;

    }


    // ======================================
    // COMPLETED IMAGE
    // ======================================

    if(
        completedImage &&
        typeof images !== "undefined" &&
        images[level - 1]
    ){

        completedImage.src =
            images[level - 1];

    }


    // ======================================
    // BEST RECORD
    // ======================================

    let bestRecord =
        document.getElementById("bestRecord");


    if(!bestRecord){

        bestRecord =
            document.createElement("div");


        bestRecord.id =
            "bestRecord";


        const victoryBox =
            document.querySelector(
                ".victory-box"
            );


        if(victoryBox){

            victoryBox.appendChild(
                bestRecord
            );

        }

    }


    // ======================================
    // GET BEST RECORDS
    // ======================================

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


    // ======================================
    // BEST STAR TEXT
    // ======================================

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


    // ======================================
    // DISPLAY BEST RECORD
    // ======================================

    if(bestRecord){

        bestRecord.innerHTML = `

            <hr>

            <h3>🏆 Best Record</h3>

            <p>${bestStarText}</p>

            <p>⏱ ${bestTime || 0}s</p>

            <p>🔄 ${bestMoves || 0} moves</p>

        `;

    }


    // ======================================
    // FINAL CONFIRMATION
    // ======================================

    console.log(
        "PuzzleMania: Victory screen displayed."
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
    // Get victory screen
    // ------------------------------

    const victoryScreen =
        document.getElementById(
            "victoryScreen"
        );


    // ------------------------------
    // Hide victory screen
    // ------------------------------

    if(victoryScreen){

        victoryScreen.classList.add(
            "hidden"
        );

        victoryScreen.style.display =
            "none";

    }


    // ------------------------------
    // Reset selected piece
    // ------------------------------

    if(typeof selectedPiece !== "undefined"){

        selectedPiece = null;

    }


    // ------------------------------
    // Stop timer
    // ------------------------------

    if(typeof stopTimer === "function"){

        stopTimer();

    }
    else if(
        typeof timer !== "undefined"
    ){

        clearInterval(timer);

    }


    // ------------------------------
    // Shuffle current puzzle
    // ------------------------------

    if(typeof shufflePuzzle === "function"){

        shufflePuzzle();

    }

}
