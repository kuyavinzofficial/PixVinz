// ======================================
// PixVZinz
// GAME CONTROL SYSTEM
// ======================================
//
// Handles:
// - Piece selection
// - Piece swapping
// - Move counting
// - Victory detection
//
// Board drawing:
// js/board.js
//
// Timer:
// js/timer.js
//
// Victory screen:
// js/victory.js
// ======================================


// ======================================
// GAME VARIABLES
// ======================================

let pieces = [];

let moves = 0;

let selectedPiece = null;

let gameFinished = false;


// ======================================
// CREATE PUZZLE PIECES
// ======================================

function createPieces(){

    pieces = [];


    for(
        let i = 0;
        i < size * size;
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

    gameFinished = false;


    // ------------------------------
    // Reset moves display
    // ------------------------------

    const moveDisplay =
        document.getElementById("moves");


    if(moveDisplay){

        moveDisplay.textContent =
            "0";

    }


    // ------------------------------
    // Reset timer
    // ------------------------------

    if(
        typeof resetTimer === "function"
    ){

        resetTimer();

    }


    // ------------------------------
    // Reset stars
    // ------------------------------

    const starsDisplay =
        document.getElementById("stars");


    if(starsDisplay){

        starsDisplay.textContent =
            "⭐⭐⭐";

    }

}


// ======================================
// SHUFFLE PUZZLE
// ======================================

function shufflePuzzle(){

    // ------------------------------
    // Create fresh pieces
    // ------------------------------

    createPieces();


    // ------------------------------
    // Shuffle
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
        ] = [
            pieces[j],
            pieces[i]
        ];

    }


    // ------------------------------
    // Prevent solved puzzle
    // ------------------------------

    let solved = true;


    for(
        let i = 0;
        i < pieces.length;
        i++
    ){

        if(pieces[i] !== i){

            solved = false;

            break;

        }

    }


    if(
        solved &&
        pieces.length > 1
    ){

        [
            pieces[0],
            pieces[1]
        ] = [
            pieces[1],
            pieces[0]
        ];

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
    if(gameFinished){

        return;

    }


    // Safety check
    if(
        index < 0 ||
        index >= pieces.length
    ){

        return;

    }


    const allPieces =
        document.querySelectorAll(
            ".piece"
        );


    // ======================================
    // FIRST PIECE
    // ======================================

    if(selectedPiece === null){

        selectedPiece =
            index;


        if(allPieces[index]){

            allPieces[index]
                .classList.add(
                    "selected"
                );

        }


        // Selection sound
        if(
            typeof playSelect === "function"
        ){

            playSelect();

        }


        return;

    }


    // ======================================
    // SECOND PIECE
    // ======================================

    swapPieces(
        selectedPiece,
        index
    );

}


// ======================================
// SWAP PIECES
// ======================================

function swapPieces(
    first,
    second
){

    // ------------------------------
    // Safety
    // ------------------------------

    if(gameFinished){

        return;

    }


    if(
        first < 0 ||
        second < 0 ||
        first >= pieces.length ||
        second >= pieces.length
    ){

        selectedPiece = null;

        return;

    }


    const allPieces =
        document.querySelectorAll(
            ".piece"
        );


    // ------------------------------
    // Remove selection
    // ------------------------------

    if(allPieces[first]){

        allPieces[first]
            .classList.remove(
                "selected"
            );

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

    [
        pieces[first],
        pieces[second]
    ] = [
        pieces[second],
        pieces[first]
    ];


    selectedPiece = null;


    // ------------------------------
    // Increase moves
    // ------------------------------

    moves++;


    const moveDisplay =
        document.getElementById(
            "moves"
        );


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

    if(gameFinished){

        return;

    }


    // ------------------------------
    // Not solved
    // ------------------------------

    if(!isSolved()){

        return;

    }


    // ------------------------------
    // Mark finished
    // ------------------------------

    gameFinished = true;


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
        document.getElementById(
            "stars"
        );


    if(starsElement){

        starsElement.textContent =
            starText;

    }


    // ------------------------------
    // Save completion
    // ------------------------------

    localStorage.setItem(
        "level" + level,
        "completed"
    );


    // ------------------------------
    // Save best stars
    // ------------------------------

    const previousBestStars =
        Number(
            localStorage.getItem(
                "level" +
                level +
                "BestStars"
            )
        ) || 0;


    if(
        stars > previousBestStars
    ){

        localStorage.setItem(
            "level" +
            level +
            "BestStars",
            stars
        );

    }


    // ------------------------------
    // Save best time
    // ------------------------------

    const previousBestTime =
        Number(
            localStorage.getItem(
                "level" +
                level +
                "BestTime"
            )
        ) || 0;


    if(
        previousBestTime === 0 ||
        seconds < previousBestTime
    ){

        localStorage.setItem(
            "level" +
            level +
            "BestTime",
            seconds
        );

    }


    // ------------------------------
    // Save best moves
    // ------------------------------

    const previousBestMoves =
        Number(
            localStorage.getItem(
                "level" +
                level +
                "BestMoves"
            )
        ) || 0;


    if(
        previousBestMoves === 0 ||
        moves < previousBestMoves
    ){

        localStorage.setItem(
            "level" +
            level +
            "BestMoves",
            moves
        );

    }


    // ======================================
    // COIN REWARD
    // ======================================

    let reward = 0;


    if(level <= 30){

        const starReward =
            stars * 5;


        let levelCoins =
            Number(
                localStorage.getItem(
                    "level" +
                    level +
                    "Coins"
                )
            ) || 0;


        const remainingCoins =
            15 - levelCoins;


        if(remainingCoins > 0){

            reward =
                Math.min(
                    starReward,
                    remainingCoins
                );

        }


        levelCoins += reward;


        localStorage.setItem(
            "level" +
            level +
            "Coins",
            levelCoins
        );


        if(reward > 0){

            let totalCoins =
                Number(
                    localStorage.getItem(
                        "coins"
                    )
                ) || 0;


            totalCoins += reward;


            localStorage.setItem(
                "coins",
                totalCoins
            );

        }

    }


    // ======================================
    // VICTORY SOUND
    // ======================================

    if(
        typeof playVictorySound ===
        "function"
    ){

        playVictorySound();

    }
    else if(
        typeof playVictory ===
        "function"
    ){

        playVictory();

    }


    // ======================================
    // SHOW VICTORY SCREEN
    // ======================================

    if(
        typeof showVictory ===
        "function"
    ){

        showVictory(
            starText,
            reward
        );

    }
    else{

        console.error(
            "PixVZinz: showVictory() is not available."
        );

    }


    // ======================================
    // UNLOCK NEXT LEVEL
    // ======================================

    const unlockedLevel =
        Number(
            localStorage.getItem(
                "level"
            )
        ) || 1;


    if(
        level + 1 > unlockedLevel &&
        level < totalLevels
    ){

        localStorage.setItem(
            "level",
            level + 1
        );

    }

}

