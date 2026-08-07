// ------------------------------
// PIECE SELECTION
// ------------------------------

function selectPiece(piece){

    if(selectedPiece === null){

        selectedPiece = piece;

        piece.classList.add("selected");

    }
    else{

        swapPieces(selectedPiece, piece);

        selectedPiece.classList.remove("selected");

        selectedPiece = null;

    }

}


// ------------------------------
// SWAP PIECES
// ------------------------------

function swapPieces(first, second){

    let firstIndex = Number(first.dataset.index);
    let secondIndex = Number(second.dataset.index);


    let temp = board[firstIndex];

    board[firstIndex] = board[secondIndex];

    board[secondIndex] = temp;


    moves++;

    updateMoves();


    drawBoard();


    checkVictory();

}


// ------------------------------
// UPDATE MOVES
// ------------------------------

function updateMoves(){

    let moveDisplay =
        document.getElementById("moves");


    if(moveDisplay){

        moveDisplay.innerText =
            "Moves: " + moves;

    }

}


// ------------------------------
// CHECK PLAYER MOVE
// ------------------------------

function checkMove(){

    return;

}
