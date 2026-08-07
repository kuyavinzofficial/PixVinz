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
    // Create And Shuffle Puzzle
    // ------------------------------

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
// CHECK WIN
// ======================================

function checkWin(){


    if(!isSolved()){

        return;

    }



    // Stop Timer

    clearInterval(timer);


}

// ======================================
// RESET GAME STATS
// ======================================

function resetStats(){

    moves = 0;

    selectedPiece = null;


    // ------------------------------
    // Reset Moves Display
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
    else{

        let timerDisplay =
            document.getElementById("timer");


        if(timerDisplay){

            timerDisplay.textContent = "0";

        }

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
    // Create Fresh Puzzle
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


    if(solved && pieces.length > 1){

        [pieces[0], pieces[1]] =
        [pieces[1], pieces[0]];

    }


    // ------------------------------
    // Reset Stats
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

    function drawPuzzle(){

    const board =
    document.getElementById("puzzleBoard");


    board.innerHTML = "";


    board.style.display = "grid";


    board.style.gridTemplateColumns =
    `repeat(${size}, minmax(0,1fr))`;

    pieces.forEach(function(piece,index){


        const tile =
        document.createElement("div");


        tile.className = "piece";


        const row =
        Math.floor(piece / size);


        const col =
        piece % size;



        tile.style.backgroundImage =
        `url("${getCurrentImage()}")`;


        tile.style.backgroundSize =
       `${size*100}% ${size*100}%`;


        tile.style.backgroundPosition =
        `${col*100/(size-1)}% ${row*100/(size-1)}%`;



        tile.onclick = function(){

            selectPiece(index);

        };


        board.appendChild(tile);


    });


}

    // ------------------------------
    // Shuffle Sound
    // ------------------------------

    if(typeof playShuffle === "function"){

        playShuffle();

    }

}
```
