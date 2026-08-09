// ======================================
// PixVZinz
// VICTORY SYSTEM
// ======================================
//
// Handles:
// - Victory screen
// - Final time
// - Final moves
// - Stars
// - Coin reward
// - Completed image
// - Best records
// - Next level
// - Retry
// - Home
// ======================================


// ======================================
// SHOW VICTORY SCREEN
// ======================================

function showVictory(stars, reward){

    console.log(
        "PixVZinz: Victory detected."
    );


    // ======================================
    // GET VICTORY SCREEN
    // ======================================

    const victoryScreen =
        document.getElementById(
            "victoryScreen"
        );


    if(!victoryScreen){

        console.error(
            "PixVZinz: #victoryScreen not found."
        );

        return;

    }


    // ======================================
    // GET ELEMENTS
    // ======================================

    const finalTime =
        document.getElementById(
            "finalTime"
        );


    const finalMoves =
        document.getElementById(
            "finalMoves"
        );


    const rewardCoins =
        document.getElementById(
            "rewardCoins"
        );


    const starsDisplay =
        document.getElementById(
            "starsDisplay"
        );


    const completedImage =
        document.getElementById(
            "completedImage"
        );


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
    // REWARD
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

        completedImage.style.display =
            "block";

    }


    // ======================================
    // BEST RECORD
    // ======================================

    updateVictoryBestRecord();


    // ======================================
    // SHOW VICTORY SCREEN
    // ======================================

    victoryScreen.classList.remove(
        "hidden"
    );


    victoryScreen.style.display =
        "flex";

    victoryScreen.style.pointerEvents =
        "auto";


    // ======================================
    // PREVENT GAME INTERACTION
    // ======================================

    victoryScreen.style.touchAction =
        "auto";


    // ======================================
    // VICTORY SOUND
    // ======================================

    if(
        typeof playVictorySound ===
        "function"
    ){

        playVictorySound();

    }


    console.log(
        "PixVZinz: Victory screen displayed."
    );

}


// ======================================
// UPDATE BEST RECORD
// ======================================

function updateVictoryBestRecord(){

    const victoryBox =
        document.querySelector(
            ".victory-box"
        );


    if(!victoryBox){

        return;

    }


    let bestRecord =
        document.getElementById(
            "bestRecord"
        );


    // ======================================
    // CREATE RECORD AREA IF MISSING
    // ======================================

    if(!bestRecord){

        bestRecord =
            document.createElement(
                "div"
            );


        bestRecord.id =
            "bestRecord";


        victoryBox.appendChild(
            bestRecord
        );

    }


    // ======================================
    // GET SAVED RECORDS
    // ======================================

    const bestTime =
        typeof getBestTime ===
        "function"

        ? getBestTime(level)

        : Number(
            localStorage.getItem(
                "level" +
                level +
                "BestTime"
            )
        ) || 0;


    const bestMoves =
        typeof getBestMoves ===
        "function"

        ? getBestMoves(level)

        : Number(
            localStorage.getItem(
                "level" +
                level +
                "BestMoves"
            )
        ) || 0;


    const bestStars =
        typeof getBestStars ===
        "function"

        ? getBestStars(level)

        : Number(
            localStorage.getItem(
                "level" +
                level +
                "BestStars"
            )
        ) || 0;


    // ======================================
    // STAR TEXT
    // ======================================

    let bestStarText =
        "—";


    if(bestStars >= 3){

        bestStarText =
            "⭐⭐⭐";

    }
    else if(bestStars === 2){

        bestStarText =
            "⭐⭐";

    }
    else if(bestStars === 1){

        bestStarText =
            "⭐";

    }


    // ======================================
    // DISPLAY
    // ======================================

    bestRecord.innerHTML = `

        <hr>

        <h3>🏆 Best Record</h3>

        <p>${bestStarText}</p>

        <p>⏱ ${bestTime || 0}s</p>

        <p>🔄 ${bestMoves || 0} moves</p>

    `;

}


// ======================================
// HIDE VICTORY SCREEN
// ======================================

function hideVictory(){

    const victoryScreen =
        document.getElementById(
            "victoryScreen"
        );


    if(!victoryScreen){

        return;

    }


    victoryScreen.classList.add(
        "hidden"
    );


    victoryScreen.style.display =
        "none";


    victoryScreen.style.pointerEvents =
        "none";

}


// ======================================
// RETRY CURRENT LEVEL
// ======================================

function restartLevel(){

    console.log(
        "PixVZinz: Restarting level."
    );


    // ------------------------------
    // Hide victory screen
    // ------------------------------

    hideVictory();


    // ------------------------------
    // Stop timer
    // ------------------------------

    if(
        typeof stopTimer ===
        "function"
    ){

        stopTimer();

    }


    // ------------------------------
    // Reset game state
    // ------------------------------

    selectedPiece =
        null;

    moves =
        0;

    gameFinished =
        false;


    // ------------------------------
    // Shuffle puzzle
    // ------------------------------

    if(
        typeof shufflePuzzle ===
        "function"
    ){

        shufflePuzzle();

    }

}


// ======================================
// NEXT LEVEL
// ======================================

function nextLevel(){

    console.log(
        "PixVZinz: Loading next level."
    );


    // ------------------------------
    // Play click sound
    // ------------------------------

    if(
        typeof playClick ===
        "function"
    ){

        playClick();

    }


    // ------------------------------
    // Check final level
    // ------------------------------

    if(level >= totalLevels){

        backHome();

        return;

    }


    // ------------------------------
    // Move to next level
    // ------------------------------

    const next =
        level + 1;


    localStorage.setItem(
        "level",
        next
    );


    // ------------------------------
    // Reload game
    // ------------------------------

    window.location.reload();

}


// ======================================
// BACK HOME
// ======================================

function backHome(){

    if(
        typeof playClick ===
        "function"
    ){

        playClick();

    }


    window.location.href =
        "index.html";

}


// ======================================
// VICTORY BUTTON EVENTS
// ======================================

function setupVictoryButtons(){

    const nextBtn =
        document.getElementById(
            "nextBtn"
        );


    const retryBtn =
        document.getElementById(
            "retryBtn"
        );


    const homeBtn =
        document.getElementById(
            "homeBtn"
        );


    // ======================================
    // NEXT
    // ======================================

    if(nextBtn){

        nextBtn.onclick =
            function(){

                nextLevel();

            };

    }


    // ======================================
    // RETRY
    // ======================================

    if(retryBtn){

        retryBtn.onclick =
            function(){

                restartLevel();

            };

    }


    // ======================================
    // HOME
    // ======================================

    if(homeBtn){

        homeBtn.onclick =
            function(){

                backHome();

            };

    }

}


// ======================================
// INITIALIZE VICTORY SYSTEM
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        setupVictoryButtons();

    }
);
