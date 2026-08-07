// ======================================
// PuzzleMania
// VICTORY SYSTEM
// ======================================

// ======================================
// VICTORY SCREEN
// ======================================

function showVictory(stars, reward){

    if(!victoryScreen){

        return;

    }

    finalTime.textContent =
        seconds + "s";

    finalMoves.textContent =
        moves;

    rewardCoins.textContent =
        reward;

    starsDisplay.textContent =
        stars;

    // Add best record display

    let bestRecord =
    document.getElementById("bestRecord");

    if(!bestRecord){

        bestRecord =
        document.createElement("div");

        bestRecord.id =
        "bestRecord";

        bestRecord.style.marginTop =
        "20px";

        document.querySelector(".victory-box")
        .appendChild(bestRecord);

    }

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

    let bestStarText = "⭐";

    if(bestStars === 2){

        bestStarText = "⭐⭐";

    }

    if(bestStars === 3){

        bestStarText = "⭐⭐⭐";

    }

    bestRecord.innerHTML = `

        <hr>

        <h3>🏆 Best Record</h3>

        <p>${bestStarText}</p>

        <p>⏱ ${bestTime}s</p>

        <p>🔄 ${bestMoves} moves</p>

    `;

    victoryScreen
    .classList.remove("hidden");

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

    if(victoryScreen){

        victoryScreen
        .classList.add("hidden");

    }

    clearInterval(timer);

    shufflePuzzle();

}
