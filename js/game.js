
// ======================================
// PuzzleMania
// GAME CONTROL SYSTEM
// ======================================
//
// Handles:
//
// - Piece selection
// - Piece swapping
// - Move counting
// - Victory detection
// - Star calculation
// - Coin rewards
// - Best records
// - Level completion
// - Level unlocking
// - Victory screen
//
// Board drawing belongs to board.js
// Timer belongs to timer.js
// Audio belongs to audio.js
// ======================================

// ======================================
// PixVZinz
// ONE-TIME COIN SYSTEM MIGRATION
// ======================================

function migrateOldCoins(){

    // Already migrated?
    if(
        localStorage.getItem(
            "pixVZinzCoinMigration"
        ) === "done"
    ){

        return;

    }


    let correctedCoins = 0;


    // Check completed levels
    for(
        let i = 1;
        i <= images.length;
        i++
    ){

        // Only completed levels count
        if(
            localStorage.getItem(
                "level" + i
            ) !== "completed"
        ){

            continue;

        }


        // Get player's best stars
        let stars =
            Number(
                localStorage.getItem(
                    "level" + i + "BestStars"
                )
            ) || 0;


        // Current coin system
        if(stars >= 3){

            correctedCoins += 15;

        }
        else if(stars === 2){

            correctedCoins += 10;

        }
        else if(stars === 1){

            correctedCoins += 5;

        }

    }


    // Update total coins
    localStorage.setItem(
        "coins",
        correctedCoins
    );


    // Mark migration complete
    localStorage.setItem(
        "pixVZinzCoinMigration",
        "done"
    );

}


// Run migration once
migrateOldCoins();


// ======================================
// PIECE SELECTION
// ======================================

function selectPiece(index){

    const allPieces =
        document.querySelectorAll(".piece");


    // ------------------------------
    // First piece selected
    // ------------------------------

    if(selectedPiece === null){

        selectedPiece = index;


        if(allPieces[index]){

            allPieces[index]
                .classList.add("selected");

        }


        if(typeof playSelect === "function"){

            playSelect();

        }

    }

    // ------------------------------
    // Second piece selected
    // ------------------------------

    else{

        swapPieces(
            selectedPiece,
            index
        );

    }

}


// ======================================
// SWAP PIECES
// ======================================

function swapPieces(first, second){

    const allPieces =
        document.querySelectorAll(".piece");


    // ------------------------------
    // Remove selection
    // ------------------------------

    if(allPieces[first]){

        allPieces[first]
            .classList.remove("selected");

    }


    // ------------------------------
    // Same piece selected
    // ------------------------------

    if(first === second){

        selectedPiece = null;

        return;

    }


    // ------------------------------
    // Swap pieces
    // ------------------------------

    const temp =
        pieces[first];


    pieces[first] =
        pieces[second];


    pieces[second] =
        temp;


    selectedPiece = null;


    // ------------------------------
    // Increase moves
    // ------------------------------

    moves++;


    const moveDisplay =
        document.getElementById("moves");


    if(moveDisplay){

        moveDisplay.textContent =
            moves;

    }


    // ------------------------------
    // Exchange sound
    // ------------------------------

    if(typeof playExchange === "function"){

        playExchange();

    }


    // ------------------------------
    // Redraw board
    // ------------------------------

    if(typeof drawPuzzle === "function"){

        drawPuzzle();

    }


    // ------------------------------
    // Check victory
    // ------------------------------

    checkWin();

}


// ======================================
// CHECK PLAYER MOVE
// ======================================

function checkMove(){

    return;

}


// ======================================
// CHECK IF PUZZLE IS SOLVED
// ======================================

function isSolved(){

    if(!pieces || pieces.length === 0){

        return false;

    }


    for(
        let i = 0;
        i < pieces.length;
        i++
    ){

        if(pieces[i] !== i){

            return false;

        }

    }


    return true;

}


// ======================================
// CHECK WIN
// ======================================

function checkWin(){

    // ------------------------------
    // Puzzle not solved
    // ------------------------------

    if(!isSolved()){

        return;

    }


    // ------------------------------
    // Stop timer
    // ------------------------------

    if(typeof stopTimer === "function"){

        stopTimer();

    }
    else{

        clearInterval(timer);

    }


    // ======================================
    // CALCULATE STARS
    // ======================================
    //
    // Levels 1-30:
    //
    // ⭐⭐⭐ = 30 seconds or less
    //          AND 30 moves or less
    //
    // ⭐⭐   = 60 seconds or less
    //          AND 60 moves or less
    //
    // ⭐     = everything else
    //
    // ======================================

    let stars = 1;


    if(level <= 30){

        if(
            seconds <= 30 &&
            moves <= 30
        ){

            stars = 3;

        }
        else if(
            seconds <= 60 &&
            moves <= 60
        ){

            stars = 2;

        }
        else{

            stars = 1;

        }

    }


    // ======================================
    // STAR TEXT
    // ======================================

    let starText = "⭐";


    if(stars === 2){

        starText = "⭐⭐";

    }


    if(stars === 3){

        starText = "⭐⭐⭐";

    }


    // ------------------------------
    // Update game star display
    // ------------------------------

    const starsElement =
        document.getElementById("stars");


    if(starsElement){

        starsElement.textContent =
            starText;

    }


    // ======================================
    // SAVE LEVEL COMPLETION
    // ======================================

    localStorage.setItem(
        "level" + level,
        "completed"
    );


    // ======================================
    // SAVE BEST STARS
    // ======================================

    const previousBestStars =
        Number(
            localStorage.getItem(
                "level" + level + "BestStars"
            )
        ) || 0;


    if(stars > previousBestStars){

        localStorage.setItem(
            "level" + level + "BestStars",
            stars
        );

    }


    // ======================================
    // SAVE BEST TIME
    // ======================================

    const previousBestTime =
        Number(
            localStorage.getItem(
                "level" + level + "BestTime"
            )
        ) || 0;


    if(
        previousBestTime === 0 ||
        seconds < previousBestTime
    ){

        localStorage.setItem(
            "level" + level + "BestTime",
            seconds
        );

    }


    // ======================================
    // SAVE BEST MOVES
    // ======================================

    const previousBestMoves =
        Number(
            localStorage.getItem(
                "level" + level + "BestMoves"
            )
        ) || 0;


    if(
        previousBestMoves === 0 ||
        moves < previousBestMoves
    ){

        localStorage.setItem(
            "level" + level + "BestMoves",
            moves
        );

    }


    // ======================================
    // COIN REWARD SYSTEM
    // ======================================
    //
    // ⭐   = 5 coins
    // ⭐⭐  = 10 coins
    // ⭐⭐⭐ = 15 coins
    //
    // Maximum accumulated coins per level:
    // 15 coins
    //
    // The player can replay the level
    // while the level has earned less
    // than 15 coins.
    //
    // ======================================

    let reward = 0;


    // This coin system applies to
    // Levels 1 through 30.

    if(level <= 30){

        // ------------------------------
        // Star value
        // ------------------------------

        const starReward =
            stars * 5;


        // ------------------------------
        // Coins already earned from
        // this specific level
        // ------------------------------

        let levelCoins =
            Number(
                localStorage.getItem(
                    "level" + level + "Coins"
                )
            ) || 0;


        // ------------------------------
        // Maximum remaining coins
        // ------------------------------

        const remainingCoins =
            15 - levelCoins;


        // ------------------------------
        // Calculate actual reward
        // ------------------------------

        if(remainingCoins > 0){

            reward =
                Math.min(
                    starReward,
                    remainingCoins
                );

        }
        else{

            reward = 0;

        }


        // ------------------------------
        // Save accumulated level coins
        // ------------------------------

        levelCoins += reward;


        localStorage.setItem(
            "level" + level + "Coins",
            levelCoins
        );


        // ------------------------------
        // Add coins to player's
        // total balance
        // ------------------------------

        if(reward > 0){

            let totalCoins =
                Number(
                    localStorage.getItem("coins")
                ) || 0;


            totalCoins += reward;


            localStorage.setItem(
                "coins",
                totalCoins
            );

        }

    }


    // ======================================
    // UNLOCK NEXT LEVEL
    // ======================================

    let unlockedLevel =
        Number(
            localStorage.getItem("level")
        ) || 1;


    if(
        level + 1 > unlockedLevel &&
        level < images.length
    ){

        localStorage.setItem(
            "level",
            level + 1
        );

    }


// ======================================
// VICTORY SOUNDS
// ======================================

if(typeof playVictorySound === "function"){

    playVictorySound();

}


if(typeof playVictory === "function"){

    playVictory(level);

}


// ======================================
// SHOW VICTORY SCREEN
// ======================================

console.log("PuzzleMania: checkWin reached victory section.");

console.log(
    "showVictory type:",
    typeof showVictory
);

console.log(
    "victoryScreen:",
    document.getElementById("victoryScreen")
);


if(typeof showVictory === "function"){

    console.log(
        "PuzzleMania: calling showVictory..."
    );


    showVictory(
        starText,
        reward
    );


    console.log(
        "PuzzleMania: showVictory finished."
    );

}
else{

    console.error(
        "PuzzleMania ERROR: showVictory is not available."
    );

}


// ======================================
// RESTART CURRENT LEVEL
// ======================================

function restartLevel(){

    // ------------------------------
    // Hide victory screen
    // ------------------------------

    if(
        typeof victoryScreen !== "undefined" &&
        victoryScreen
    ){

        victoryScreen
            .classList.add("hidden");

    }


    // ------------------------------
    // Stop current timer
    // ------------------------------

    if(typeof stopTimer === "function"){

        stopTimer();

    }
    else{

        clearInterval(timer);

    }


    // ------------------------------
    // Shuffle again
    // ------------------------------

    if(typeof shufflePuzzle === "function"){

        shufflePuzzle();

    }

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
