// ======================================
// PuzzleMania
// BOARD SYSTEM
// ======================================


// ======================================
// DRAW PUZZLE
// ======================================

function drawPuzzle(){

    const board =
    document.getElementById("puzzleBoard");


    if(!board){

        return;

    }


    board.innerHTML = "";


    board.style.display = "grid";


    board.style.gridTemplateColumns =
    `repeat(${size},1fr)`;



    pieces.forEach(function(piece,index){


        const tile =
        document.createElement("div");


        tile.className =
        "piece";



        const row =
        Math.floor(piece / size);


        const col =
        piece % size;



        // Current level image

        tile.style.backgroundImage =
        `url("${images[level - 1]}")`;



        // Image scaling

        tile.style.backgroundSize =
        `${size * 100}% ${size * 100}%`;



        // Image position

        tile.style.backgroundPosition =
        `${col * 100 / (size - 1)}% ${row * 100 / (size - 1)}%`;



        // Click event

        tile.onclick = function(){

            selectPiece(index);

        };



        board.appendChild(tile);


    });

}
