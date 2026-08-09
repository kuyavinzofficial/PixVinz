// ======================================
// PixVZinz
// CORE PUZZLE CONTROLLER
// ======================================
//
// Handles:
// - Game setup
// - Piece creation
// - Puzzle shuffling
// - Game statistics reset
// - Timer startup
// - Board drawing
// - Shuffle sound
//
// Piece movement and victory detection
// are handled by the game-control system.
// ======================================


// ======================================
// GAME VARIABLES
// ======================================

let pieces = [];

let moves = 0;

let selectedPiece = null;


// ======================================
// SETUP
// ======================================

function setup(){

    // ------------------------------
    // Level Title
    // ------------------------------

    const levelTitle =
        document.getElementById("levelTitle");


    if(levelTitle){

        levelTitle.textContent =
            "Level " + level;

    }


    // ------------------------------
    // Create Puzzle
    // ------------------------------

    createPieces();


    // ------------------------------
    // Shuffle Puzzle
    // ------------------------------

    shufflePuzzle();

}


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
// RESET GAME STATISTICS
// ======================================

function resetStats(){

    moves = 0;

    selectedPiece = null;


    // ------------------------------
    // Reset Moves Display
    // ------------------------------

    const moveDisplay =
        document.getElementById("moves");


    if(moveDisplay){

        moveDisplay.textContent = "0";

    }


    // ------------------------------
    // Reset Timer
    // ------------------------------

    if(typeof resetTimer === "function"){

        resetTimer();

    }


    // ------------------------------
    // Reset Stars Display
    // ------------------------------

    const stars =
        document.getElementById("stars");


    if(stars){

        stars.textContent = "⭐⭐⭐";

    }

}


// ======================================
// SHUFFLE PUZZLE
// ======================================

function shufflePuzzle(){

    // ------------------------------
    // Create Fresh Pieces
    // ------------------------------

    createPieces();


    // ------------------------------
    // Shuffle Pieces
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
    // Prevent Already-Solved Puzzle
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


    // ------------------------------
    // If accidentally solved,
    // swap the first two pieces
    // ------------------------------

    if(
        solved &&
        pieces.length > 1
    ){

        [
            pieces[0],
            pieces[1]
        ] =
        [
            pieces[1],
            pieces[0]
        ];

    }


    // ------------------------------
    // Reset Statistics
    // ------------------------------

    resetStats();


    // ------------------------------
    // Start Timer
    // ------------------------------

    if(typeof startTimer === "function"){

        startTimer();

    }


    // ------------------------------
    // Draw Puzzle Board
    // ------------------------------

    if(typeof drawPuzzle === "function"){

        drawPuzzle();

    }


    // ------------------------------
    // Shuffle Sound
    // ------------------------------

    if(typeof playShuffle === "function"){

        playShuffle();

    }

}
