
// ======================================
// PuzzleMania
// CORE PUZZLE CONTROLLER
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

    let levelTitle =
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
// CREATE PIECES
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


    // ------------------------------
    // Reset Moves
    // ------------------------------

    let moveDisplay =
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
    // Reset Stars
    // ------------------------------

    let stars =
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


        [pieces[i], pieces[j]] =
        [pieces[j], pieces[i]];

    }


    // ------------------------------
    // Prevent Solved Puzzle
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

        [pieces[0], pieces[1]] =
        [pieces[1], pieces[0]];

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
    // Draw Puzzle
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


