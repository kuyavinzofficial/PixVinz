// ======================================
// PuzzleMania
// BOARD SYSTEM
// ======================================

// ------------------------------
// CREATE PIECES
// ------------------------------

function createPieces(){

    pieces = [];

    for(let i = 0; i < size * size; i++){

        pieces.push(i);

    }

}

// ------------------------------
// SHUFFLE
// ------------------------------

function shufflePuzzle(){

    createPieces();

    for(let i = pieces.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

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

    startTimer();

    drawPuzzle();

    if(typeof playShuffle === "function"){

        playShuffle();

    }

}

// ======================================
// DRAW PUZZLE
// ======================================

function drawPuzzle(){

    const board =
    document.getElementById("puzzleBoard");

    board.innerHTML = "";

    board.style.display = "grid";

    board.style.gridTemplateColumns =
    `repeat(${size},1fr)`;

    pieces.forEach(function(piece,index){

        const tile =
        document.createElement("div");

        tile.className = "piece";

        const row =
        Math.floor(piece / size);

        const col =
        piece % size;

        tile.style.backgroundImage =
        `url("${images[level-1]}")`;

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

// ======================================
// SELECT PIECE
// ======================================

function selectPiece(index){

    const allPieces =
    document.querySelectorAll(".piece");

    if(selectedPiece === null){

        selectedPiece = index;

        allPieces[index]
        .classList.add("selected");

        if(typeof playSelect === "function"){

            playSelect();

        }

    }
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

function swapPieces(first,second){

    const allPieces =
    document.querySelectorAll(".piece");

    allPieces[first]
    .classList.remove("selected");

    if(first === second){

        selectedPiece = null;

        return;

    }

    const temp =
    pieces[first];

    pieces[first] =
    pieces[second];

    pieces[second] =
    temp;

    selectedPiece = null;

    moves++;

    document.getElementById("moves")
    .textContent = moves;

    if(typeof playExchange === "function"){

        playExchange();

    }

    drawPuzzle();

    checkWin();

}

// ======================================
// CHECK IF SOLVED
// ======================================

function isSolved(){

    for(let i = 0; i < pieces.length; i++){

        if(pieces[i] !== i){

            return false;

        }

    }

    return true;

}
