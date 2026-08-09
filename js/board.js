// ======================================
// PixVZinz
// PUZZLE BOARD SYSTEM
// ======================================
//
// Handles:
// - Creating the puzzle board
// - Drawing puzzle pieces
// - Displaying the correct image
// - Mobile-friendly piece selection
// ======================================


// ======================================
// DRAW PUZZLE
// ======================================

function drawPuzzle(){

    const board =
        document.getElementById("puzzleBoard");


    // Safety check
    if(!board){

        console.error(
            "PixVZinz: #puzzleBoard not found."
        );

        return;

    }


    // Clear existing pieces
    board.innerHTML = "";


    // Set grid size
    board.style.gridTemplateColumns =
        `repeat(${size}, 1fr)`;

    board.style.gridTemplateRows =
        `repeat(${size}, 1fr)`;


    // Current puzzle image
    const image =
        images[level - 1];


    if(!image){

        console.error(
            "PixVZinz: Image not found for level " +
            level
        );

        return;

    }


    // ======================================
    // CREATE PIECES
    // ======================================

    for(
        let position = 0;
        position < pieces.length;
        position++
    ){

        const piece =
            document.createElement("div");


        piece.className =
            "piece";


        // Store position
        piece.dataset.index =
            position;


        // Piece's original image position
        const originalIndex =
            pieces[position];


        // Calculate original row/column
        const originalRow =
            Math.floor(
                originalIndex / size
            );


        const originalColumn =
            originalIndex % size;


        // ======================================
        // PIECE IMAGE
        // ======================================

        piece.style.backgroundImage =
            `url("${image}")`;


        piece.style.backgroundSize =
            `${size * 100}% ${size * 100}%`;


        piece.style.backgroundPosition =
            `${getBackgroundPosition(
                originalColumn,
                originalRow
            )}`;


        piece.style.backgroundRepeat =
            "no-repeat";


        // ======================================
        // MOBILE TOUCH
        // ======================================

        piece.addEventListener(
            "click",
            function(){

                selectPiece(position);

            }
        );


        piece.addEventListener(
            "touchend",
            function(event){

                event.preventDefault();

                selectPiece(position);

            },
            {
                passive:false
            }
        );


        // ======================================
        // ADD PIECE
        // ======================================

        board.appendChild(piece);

    }

}


// ======================================
// BACKGROUND POSITION
// ======================================

function getBackgroundPosition(
    column,
    row
){

    const percentageX =
        size === 1
            ? 0
            : (column / (size - 1)) * 100;


    const percentageY =
        size === 1
            ? 0
            : (row / (size - 1)) * 100;


    return (
        percentageX +
        "% " +
        percentageY +
        "%"
    );

}


// ======================================
// REFRESH BOARD
// ======================================

function refreshBoard(){

    if(
        typeof drawPuzzle === "function"
    ){

        drawPuzzle();

    }

}
