// ======================================
// PixVinz
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
function setup() {
    let levelTitle = document.getElementById("levelTitle");
    if (levelTitle && typeof level !== "undefined") {
        levelTitle.textContent = "Level " + level;
    }

    createPieces();
    shufflePuzzle();
}

// ======================================
// CREATE PIECES
// ======================================
function createPieces() {
    pieces = [];
    let totalPieces = typeof size !== "undefined" ? size * size : 9;
    
    for (let i = 0; i < totalPieces; i++) {
        pieces.push(i);
    }
}

// ======================================
// RESET GAME STATS
// ======================================
function resetStats() {
    moves = 0;
    selectedPiece = null;

    let moveDisplay = document.getElementById("moves");
    if (moveDisplay) {
        moveDisplay.textContent = "0";
    }

    if (typeof resetTimer === "function") {
        resetTimer();
    }

    let stars = document.getElementById("stars");
    if (stars) {
        stars.textContent = "⭐⭐⭐";
    }
}

// ======================================
// SHUFFLE PUZZLE
// ======================================
function shufflePuzzle() {
    createPieces();

    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }

    // Prevent puzzle from instantly spawning solved
    let solved = true;
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i] !== i) {
            solved = false;
            break;
        }
    }

    if (solved && pieces.length > 1) {
        [pieces[0], pieces[1]] = [pieces[1], pieces[0]];
    }

    resetStats();

    if (typeof startTimer === "function") {
        startTimer();
    }

    if (typeof drawPuzzle === "function") {
        drawPuzzle();
    }

    if (typeof playShuffle === "function") {
        playShuffle();
    }
}

// ======================================
// PIECE SELECTION & SWAP ENGINE
// ======================================
function selectPiece(index) {
    // If no piece is currently selected, select this one
    if (selectedPiece === null) {
        selectedPiece = index;
        if (typeof playClick === "function") playClick();
        if (typeof drawPuzzle === "function") drawPuzzle();
        return;
    }

    // If clicking the same piece twice, deselect it
    if (selectedPiece === index) {
        selectedPiece = null;
        if (typeof drawPuzzle === "function") drawPuzzle();
        return;
    }

    // Swap pieces in array
    swapPieces(selectedPiece, index);
    selectedPiece = null;
}

function swapPieces(indexA, indexB) {
    [pieces[indexA], pieces[indexB]] = [pieces[indexB], pieces[indexA]];

    // Increment moves count
    moves++;
    let moveDisplay = document.getElementById("moves");
    if (moveDisplay) {
        moveDisplay.textContent = moves;
    }

    if (typeof playExchange === "function") {
        playExchange();
    } else if (typeof playClick === "function") {
        playClick();
    }

    // Redraw board with new positions
    if (typeof drawPuzzle === "function") {
        drawPuzzle();
    }

    // Check if the puzzle is completed
    checkWin();
}

// ======================================
// CHECK WIN CONDITION (VICTORY TRIGGER)
// ======================================
function checkWin() {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i] !== i) {
            return; // Exit early if any piece is out of place
        }
    }

    // Stop timer
    if (typeof stopTimer === "function") {
        stopTimer();
    }

    // Trigger Victory Screen function
    if (typeof showVictory === "function") {
        showVictory();
    } else if (typeof showVictoryScreen === "function") {
        showVictoryScreen();
    }
}
