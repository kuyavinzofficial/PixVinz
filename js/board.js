// ======================================
// PuzzleMania
// BOARD SYSTEM
// ======================================

let selectedIndex = null;

// ======================================
// DRAW PUZZLE
// ======================================

function drawPuzzle() {
    const board = document.getElementById("puzzleBoard");

    if (!board) return;

    board.innerHTML = "";
    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    const imgUrl = (typeof images !== "undefined" && images[level - 1]) 
        ? images[level - 1] 
        : `images/level${level}.jpg`;

    pieces.forEach(function (piece, index) {
        const tile = document.createElement("div");
        tile.className = "piece";

        if (index === selectedIndex) {
            tile.classList.add("selected");
        }

        const row = Math.floor(piece / size);
        const col = piece % size;

        // Calculate background positioning safely
        const posX = size > 1 ? (col * 100) / (size - 1) : 0;
        const posY = size > 1 ? (row * 100) / (size - 1) : 0;

        // Current level image
        tile.style.backgroundImage = `url("${imgUrl}")`;

        // Image scaling
        tile.style.backgroundSize = `${size * 100}% ${size * 100}%`;

        // Image position
        tile.style.backgroundPosition = `${posX}% ${posY}%`;

        // Click event
        tile.onclick = function () {
            selectPiece(index);
        };

        board.appendChild(tile);
    });
}

// ======================================
// PIECE SELECTION & SWAPPING
// ======================================

function selectPiece(index) {
    if (typeof playSound === "function") {
        playSound("click");
    }

    if (selectedIndex === null) {
        selectedIndex = index;
        drawPuzzle();
    } else if (selectedIndex === index) {
        selectedIndex = null;
        drawPuzzle();
    } else {
        swapPieces(selectedIndex, index);
        selectedIndex = null;
        moves++;

        const movesDisplay = document.getElementById("moves");
        if (movesDisplay) {
            movesDisplay.textContent = moves;
        }

        drawPuzzle();
        checkWin();
    }
}

function swapPieces(i, j) {
    const temp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = temp;
}

// ======================================
// WIN CHECK
// ======================================

function checkWin() {
    const isSolved = pieces.every((val, index) => val === index);

    if (isSolved) {
        if (typeof stopTimer === "function") {
            stopTimer();
        }
        if (typeof handleVictory === "function") {
            setTimeout(handleVictory, 300);
        }
    }
}
