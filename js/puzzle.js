// ======================================
// PixVZinz
// PUZZLE CONTROL SYSTEM
// ======================================
//
// Handles:
// - Piece selection
// - Piece swapping
// - Move counting
// - Victory detection
// - Starting the timer
// - Calling the victory system
//
// Board drawing is handled by board.js
// Timer is handled by timer.js
// ======================================


// ======================================
// GAME VARIABLES
// ======================================

let pieces = [];

let moves = 0;

let selectedPiece = null;

let puzzleFinished = false;


// ======================================
// SETUP
// ======================================

function setup(){

    console.log(
        "PixVZinz: Setting up level " + level
    );


    // Reset game state

    pieces = [];

    moves = 0;

    selectedPiece = null;

    puzzleFinished = false;


    // Update level title

    const levelTitle =
        document.getElementById("levelTitle");


    if(levelTitle){

        levelTitle.textContent =
            "Level " + level;

    }


    // Create puzzle pieces

    createPieces();


    // Shuffle puzzle

    shufflePuzzle();

}



// ======================================
// CREATE PIECES
// ======================================

function createPieces(){

    pieces = [];


    const totalPieces =
        size * size;


    for(
        let i = 0;
        i < totalPieces;
        i++
    ){

        pieces.push(i);

    }

}



// ======================================
// RESET GAME STATS
// ======================================

function resetStats(){

    moves = 0;

    selectedPiece = null;

    puzzleFinished = false;


    // ------------------------------
    // Moves
    // ------------------------------

    const moveDisplay =
        document.getElementById("moves");


    if(moveDisplay){

        moveDisplay.textContent =
            "0";

    }


    // ------------------------------
    // Stars
    // ------------------------------

    const starsDisplay =
        document.getElementById("stars");


    if(starsDisplay){

        starsDisplay.textContent =
            "⭐⭐⭐";

    }


    // ------------------------------
    // Timer
    // ------------------------------

    if(
        typeof resetTimer === "function"
    ){

        resetTimer();

    }

}



// ======================================
// SHUFFLE PUZZLE
// ======================================

function shufflePuzzle(){

    // ------------------------------
    // Fresh puzzle
    // ------------------------------

    createPieces();


    // ------------------------------
    // Shuffle pieces
    // ------------------------------

    for(
        let i = pieces.length - 1;
        i > 0;
        i--
    ){

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            pieces[i],
            pieces[j]
        ] =
        [
            pieces[j],
            pieces[i]
        ];

    }


    // ------------------------------
    // Make sure puzzle isn't
    // already solved
    // ------------------------------

    if(isSolved()){

        if(pieces.length > 1){

            [
                pieces[0],
                pieces[1]
            ] =
            [
                pieces[1],
                pieces[0]
            ];

        }

    }


    // ------------------------------
    // Reset statistics
    // ------------------------------

    resetStats();


    // ------------------------------
    // Draw puzzle
    // ------------------------------

    if(
        typeof drawPuzzle === "function"
    ){

        drawPuzzle();

    }


    // ------------------------------
    // Start timer
    // ------------------------------

    if(
        typeof startTimer === "function"
    ){

        startTimer();

    }


    // ------------------------------
    // Shuffle sound
    // ------------------------------

    if(
        typeof playShuffle === "function"
    ){

        playShuffle();

    }

}



// ======================================
// SELECT PIECE
// ======================================

function selectPiece(index){

    // Do nothing after victory

    if(puzzleFinished){

        return;

    }


    const allPieces =
        document.querySelectorAll(".piece");


    // ------------------------------
    // First piece
    // ------------------------------

    if(selectedPiece === null){

        selectedPiece = index;


        if(allPieces[index]){

            allPieces[index]
                .classList.add("selected");

        }


        if(
            typeof playSelect === "function"
        ){

            playSelect();

        }


        return;

    }


    // ------------------------------
    // Second piece
    // ------------------------------

    swapPieces(
        selectedPiece,
        index
    );

}



// ======================================
// SWAP PIECES
// ======================================

function swapPieces(first, second){

    // Prevent interaction after win

    if(puzzleFinished){

        return;

    }


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
    // Same piece
    // ------------------------------

    if(first === second){

        selectedPiece = null;

        return;

    }


    // ------------------------------
    // Swap
    // ------------------------------

    const temp =
        pieces[first];


    pieces[first] =
        pieces[second];


    pieces[second] =
        temp;


    // ------------------------------
    // Clear selection
    // ------------------------------

    selectedPiece = null;


    // ------------------------------
    // Count move
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

    if(
        typeof playExchange === "function"
    ){

        playExchange();

    }


    // ------------------------------
    // Redraw board
    // ------------------------------

    if(
        typeof drawPuzzle === "function"
    ){

        drawPuzzle();

    }


    // ------------------------------
    // Check victory
    // ------------------------------

    checkWin();

}



// ======================================
// CHECK IF PUZZLE IS SOLVED
// ======================================

function isSolved(){

    if(
        !pieces ||
        pieces.length === 0
    ){

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
    // Already finished
    // ------------------------------

    if(puzzleFinished){

        return;

    }


    // ------------------------------
    // Not solved
    // ------------------------------

    if(!isSolved()){

        return;

    }


    // ------------------------------
    // Mark finished immediately
    // ------------------------------

    puzzleFinished = true;


    // ------------------------------
    // Stop timer
    // ------------------------------

    if(
        typeof stopTimer === "function"
    ){

        stopTimer();

    }


    // ------------------------------
    // Calculate stars
    // ------------------------------

    let stars = 1;


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


    // ------------------------------
    // Star text
    // ------------------------------

    let starText =
        "⭐";


    if(stars === 2){

        starText =
            "⭐⭐";

    }


    if(stars === 3){

        starText =
            "⭐⭐⭐";

    }


    // ------------------------------
    // Update game stars
    // ------------------------------

    const starsElement =
        document.getElementById("stars");


    if(starsElement){

        starsElement.textContent =
            starText;

    }


    // ==================================
    // SAVE COMPLETION
    // ==================================

    localStorage.setItem(
        "level" + level,
        "completed"
    );


    // ==================================
    // BEST STARS
    // ==================================

    const oldStars =
        Number(
            localStorage.getItem(
                "level" +
                level +
                "BestStars"
            )
        ) || 0;


    if(stars > oldStars){

        localStorage.setItem(
            "level" +
            level +
            "BestStars",
            stars
        );

    }


    // ==================================
    // BEST TIME
    // ==================================

    const oldTime =
        Number(
            localStorage.getItem(
                "level" +
                level +
                "BestTime"
            )
        ) || 0;


    if(
        oldTime === 0 ||
        seconds < oldTime
    ){

        localStorage.setItem(
            "level" +
            level +
            "BestTime",
            seconds
        );

    }


    // ==================================
    // BEST MOVES
    // ==================================

    const oldMoves =
        Number(
            localStorage.getItem(
                "level" +
                level +
                "BestMoves"
            )
        ) || 0;


    if(
        oldMoves === 0 ||
        moves < oldMoves
    ){

        localStorage.setItem(
            "level" +
            level +
            "BestMoves",
            moves
        );

    }


    // ==================================
    // COIN REWARD
    // ==================================

    let reward = 0;


    if(level <= 30){

        const earnedBefore =
            Number(
                localStorage.getItem(
                    "level" +
                    level +
                    "Coins"
                )
            ) || 0;


        const possibleReward =
            stars * 5;


        const remaining =
            Math.max(
                0,
                15 - earnedBefore
            );


        reward =
            Math.min(
                possibleReward,
                remaining
            );


        const newLevelCoins =
            earnedBefore + reward;


        localStorage.setItem(
            "level" +
            level +
            "Coins",
            newLevelCoins
        );


        if(reward > 0){

            const totalCoins =
                Number(
                    localStorage.getItem(
                        "coins"
                    )
                ) || 0;


            localStorage.setItem(
                "coins",
                totalCoins + reward
            );

        }

    }


    // ==================================
    // UNLOCK NEXT LEVEL
    // ==================================

    const currentUnlocked =
        Number(
            localStorage.getItem("level")
        ) || 1;


    if(
        level < images.length &&
        level + 1 > currentUnlocked
    ){

        localStorage.setItem(
            "level",
            level + 1
        );

    }


    // ==================================
    // VICTORY SOUND
    // ==================================

    if(
        typeof playVictory === "function"
    ){

        playVictory(level);

    }


    // ==================================
    // SHOW VICTORY SCREEN
    // ==================================

    if(
        typeof showVictory === "function"
    ){

        showVictory(
            starText,
            reward
        );

    }
    else{

        console.error(
            "PixVZinz: showVictory() was not found."
        );

    }

}
