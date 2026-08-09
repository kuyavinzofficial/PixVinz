// ======================================
// PuzzleMania
// MAIN GAME CONTROLLER (script.js)
// ======================================

// Global Game State
var level = Number(localStorage.getItem("level")) || 1;
var size = 3; // 3x3 grid default
var pieces = [];
var selectedPiece = null;
var moves = 0;
var seconds = 0;
var timer = null;

// Default Level Images Array (if not provided dynamically)
if (typeof images === "undefined") {
    var images = Array.from({ length: 60 }, (_, i) => `images/level${i + 1}.jpg`);
}

// ======================================
// ONE-TIME COIN SYSTEM MIGRATION
// ======================================

function migrateOldCoins() {
    if (localStorage.getItem("pixVZinzCoinMigration") === "done") return;

    let correctedCoins = 0;
    const totalCount = images.length || 60;

    for (let i = 1; i <= totalCount; i++) {
        if (localStorage.getItem("level" + i) !== "completed") continue;

        let stars = Number(localStorage.getItem("level" + i + "BestStars")) || 0;

        if (stars >= 3) correctedCoins += 15;
        else if (stars === 2) correctedCoins += 10;
        else if (stars === 1) correctedCoins += 5;
    }

    localStorage.setItem("coins", correctedCoins);
    localStorage.setItem("pixVZinzCoinMigration", "done");
}

// Execute migration
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", migrateOldCoins);
} else {
    migrateOldCoins();
}

// ======================================
// PUZZLE INITIALIZATION & SHUFFLE
// ======================================

function initGame() {
    level = Number(localStorage.getItem("level")) || 1;
    moves = 0;
    seconds = 0;
    selectedPiece = null;

    const movesDisplay = document.getElementById("moves");
    const timerDisplay = document.getElementById("timer");
    const levelTitle = document.getElementById("levelTitle");

    if (movesDisplay) movesDisplay.textContent = moves;
    if (timerDisplay) timerDisplay.textContent = "0s";
    if (levelTitle) levelTitle.textContent = "Level " + level;

    // Build solved array [0, 1, 2, ..., size*size - 1]
    pieces = Array.from({ length: size * size }, (_, i) => i);

    shufflePuzzle();
    startTimer();

    if (typeof startMusic === "function") {
        startMusic();
    }
}

function shufflePuzzle() {
    const total = size * size;
    
    // Fisher-Yates Shuffle
    do {
        for (let i = total - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = pieces[i];
            pieces[i] = pieces[j];
            pieces[j] = temp;
        }
    } while (typeof isSolved === "function" && isSolved()); // Ensure it starts unsolvable

    moves = 0;
    seconds = 0;
    selectedPiece = null;

    const movesDisplay = document.getElementById("moves");
    if (movesDisplay) movesDisplay.textContent = moves;

    if (typeof playSound === "function") {
        playSound("shuffle");
    }

    if (typeof drawPuzzle === "function") {
        drawPuzzle();
    }
}

// ======================================
// TIMER SYSTEM
// ======================================

function startTimer() {
    stopTimer();
    seconds = 0;

    timer = setInterval(function () {
        seconds++;
        const timerDisplay = document.getElementById("timer");
        if (timerDisplay) {
            timerDisplay.textContent = seconds + "s";
        }
    }, 1000);
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

// ======================================
// AUTO LAUNCH ON PAGE LOAD
// ======================================

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("puzzleBoard")) {
        initGame();
    }
});
