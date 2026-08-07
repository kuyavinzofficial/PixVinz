// ======================================
// PuzzleMania
// GAME CONTROL SYSTEM
// ======================================


// ======================================
// PIECE SELECTION
// ======================================

function selectPiece(index){


    const allPieces =
    document.querySelectorAll(".piece");



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



    if(allPieces[first]){

        allPieces[first]
        .classList.remove("selected");

    }



    if(first === second){


        selectedPiece = null;

        return;


    }



    let temp =
    pieces[first];


    pieces[first] =
    pieces[second];


    pieces[second] =
    temp;



    selectedPiece = null;



    moves++;



    let moveDisplay =
    document.getElementById("moves");


    if(moveDisplay){

        moveDisplay.textContent =
        moves;

    }



    if(typeof playExchange === "function"){

        playExchange();

    }



    drawPuzzle();



    checkWin();


}



// ======================================
// CHECK MOVE PLACEHOLDER
// ======================================

function checkMove(){

    return;

}
