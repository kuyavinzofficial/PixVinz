// ======================================
// PuzzleMania
// CORE PUZZLE CONTROLLER
// ======================================


// ======================================
// GAME VARIABLES
// ======================================

let pieces = [];

let moves = 0;

let seconds = 0;

let timer = null;

let selectedPiece = null;



// ======================================
// SETUP
// ======================================

function setup(){

    let levelTitle =
    document.getElementById("levelTitle");


    if(levelTitle){

        levelTitle.textContent =
        "Level " + level;

    }


    createPieces();

    shufflePuzzle();

}



// ======================================
// CREATE PIECES
// ======================================

function createPieces(){

    pieces = [];


    for(let i = 0; i < size * size; i++){

        pieces.push(i);

    }

}



// ======================================
// RESET STATS
// ======================================

function resetStats(){

    moves = 0;

    seconds = 0;

    selectedPiece = null;



    let moveDisplay =
    document.getElementById("moves");


    if(moveDisplay){

        moveDisplay.textContent = "0";

    }



    let timerDisplay =
    document.getElementById("timer");


    if(timerDisplay){

        timerDisplay.textContent = "0";

    }



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

    createPieces();



    for(let i = pieces.length - 1; i > 0; i--){

        const j =
        Math.floor(Math.random() * (i + 1));


        [pieces[i], pieces[j]] =
        [pieces[j], pieces[i]];

    }



    // Prevent solved puzzle

    let solved = true;


    for(let i = 0; i < pieces.length; i++){

        if(pieces[i] !== i){

            solved = false;

            break;

        }

    }



    if(solved){

        [pieces[0], pieces[1]] =
        [pieces[1], pieces[0]];

    }



    resetStats();


    if(typeof startTimer === "function"){

        startTimer();

    }



    if(typeof drawPuzzle === "function"){

        drawPuzzle();

    }



    if(typeof playShuffle === "function"){

        playShuffle();

    }

       }
