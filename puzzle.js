// ======================================
// PuzzleMania - puzzle.js
// Part 1/4
// ======================================

// ----------------------------
// Current Level
// ----------------------------

let level = Number(localStorage.getItem("level")) || 1;

// ----------------------------
// Difficulty
// ----------------------------

let size;

if (level <= 5) {

    size = 3;

} else if (level <= 10) {

    size = 4;

} else if (level <= 15) {

    size = 5;

} else {

    size = 6;

}

// ----------------------------
// Images
// ----------------------------

const images = [

    "images/level1.jpeg",
    "images/level2.jpeg",
    "images/level3.jpeg",
    "images/level4.jpeg",
    "images/level5.jpeg",

    "images/level6.jpeg",
    "images/level7.jpeg",
    "images/level8.jpeg",
    "images/level9.jpeg",
    "images/level10.jpeg",

    "images/level11.jpeg",
    "images/level12.jpeg",
    "images/level13.jpeg",
    "images/level14.jpeg",
    "images/level15.jpeg",

    "images/level16.jpeg",
    "images/level17.jpeg",
    "images/level18.jpeg",
    "images/level19.jpeg",
    "images/level20.jpeg"

];

// ----------------------------
// Variables
// ----------------------------

let pieces = [];
let moves = 0;
let seconds = 0;
let timer = null;
let selectedPiece = null;

// Victory Screen

let victoryScreen;
let finalTime;
let finalMoves;
let rewardCoins;
let starsDisplay;

let nextBtn;
let retryBtn;
let homeBtn;

// ----------------------------
// Setup
// ----------------------------

function setup() {

    document.getElementById("levelTitle").textContent =
        "Level " + level;

    createPieces();

    shufflePuzzle();

}

// ----------------------------
// Timer
// ----------------------------

function startTimer() {

    clearInterval(timer);

    timer = setInterval(function () {

        seconds++;

        document.getElementById("timer").textContent =
            seconds;

    }, 1000);

}

// ----------------------------
// Create Pieces
// ----------------------------

function createPieces() {

    pieces = [];

    for (let i = 0; i < size * size; i++) {

        pieces.push(i);

    }

}

// ----------------------------
// Shuffle Puzzle
// ----------------------------

function shufflePuzzle() {

    createPieces();

    for (let i = pieces.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [pieces[i], pieces[j]] =
        [pieces[j], pieces[i]];

    }

    // Prevent solved puzzle

    let solved = true;

    for (let i = 0; i < pieces.length; i++) {

        if (pieces[i] !== i) {

            solved = false;
            break;

        }

    }

    if (solved) {

        [pieces[0], pieces[1]] =
        [pieces[1], pieces[0]];

    }

    moves = 0;
    seconds = 0;
    selectedPiece = null;

    document.getElementById("moves").textContent = "0";
    document.getElementById("timer").textContent = "0";
    document.getElementById("stars").textContent = "⭐⭐⭐";

    startTimer();

    drawPuzzle();

    if (typeof playShuffle === "function") {

        playShuffle();

    }

}

// ----------------------------
// Draw Puzzle
// ----------------------------

function drawPuzzle() {

    const board =
        document.getElementById("puzzleBoard");

    board.innerHTML = "";

    board.style.display = "grid";

    board.style.gridTemplateColumns =
        `repeat(${size},1fr)`;

    pieces.forEach(function(piece, index){

        const tile =
            document.createElement("div");

        tile.className = "piece";

        const row =
            Math.floor(piece / size);

        const col =
            piece % size;

        tile.style.backgroundImage =
            `url("${images[level - 1]}")`;

        tile.style.backgroundSize =
            `${size * 100}% ${size * 100}%`;

        tile.style.backgroundPosition =
            `${col * 100 / (size - 1)}% ${row * 100 / (size - 1)}%`;

        tile.onclick = function(){

            selectPiece(index);

        };

        board.appendChild(tile);

    });

        }
// ======================================
// PuzzleMania - puzzle.js
// Part 2/4
// ======================================

// ----------------------------
// Select Piece
// ----------------------------

function selectPiece(index) {

    const allPieces = document.querySelectorAll(".piece");

    if (selectedPiece === null) {

        selectedPiece = index;

        allPieces[index].classList.add("selected");

        if (typeof playSelect === "function") {

            playSelect();

        }

    } else {

        swapPieces(selectedPiece, index);

    }

}

// ----------------------------
// Swap Pieces
// ----------------------------

function swapPieces(first, second) {

    const allPieces =
        document.querySelectorAll(".piece");

    allPieces[first].classList.remove("selected");

    if (first === second) {

        selectedPiece = null;
        return;

    }

    const temp = pieces[first];

    pieces[first] = pieces[second];
    pieces[second] = temp;

    selectedPiece = null;

    moves++;

    document.getElementById("moves").textContent =
        moves;

    if (typeof playExchange === "function") {

        playExchange();

    }

    drawPuzzle();

    checkWin();

}

// ----------------------------
// Check Win
// ----------------------------

function checkWin() {

    // Is puzzle solved?

    for (let i = 0; i < pieces.length; i++) {

        if (pieces[i] !== i) {

            return;

        }

    }

    clearInterval(timer);

    // ----------------------------
    // Stars
    // ----------------------------

    let stars = "⭐";

    if (seconds < 60 && moves < 50) {

        stars = "⭐⭐⭐";

    }
    else if (seconds < 120 && moves < 100) {

        stars = "⭐⭐";

    }

    document.getElementById("stars").textContent =
        stars;

    // ----------------------------
    // Save completion
    // ----------------------------

    localStorage.setItem(
        "level" + level,
        "completed"
    );

    // ----------------------------
    // Unlock next level
    // ----------------------------

    if (level < 20) {

        let unlocked =
            Number(localStorage.getItem("level")) || 1;

        if (level + 1 > unlocked) {

            localStorage.setItem(
                "level",
                level + 1
            );

        }

    }

    // ----------------------------
    // Coins
    // ----------------------------

    let coins =
        Number(localStorage.getItem("coins")) || 0;

    const reward = level * 20;

    coins += reward;

    localStorage.setItem(
        "coins",
        coins
    );

    // ----------------------------
    // Sounds
    // ----------------------------

    if (typeof playVictorySound === "function") {

        playVictorySound();

    }

    if (typeof playVictory === "function") {

        playVictory(level);

    }

    // ----------------------------
    // Show Victory Screen
    // ----------------------------

    showVictory(stars, reward);

        }
// ======================================
// PuzzleMania - puzzle.js
// Part 3/4
// ======================================

// ----------------------------
// Victory Screen
// ----------------------------

function showVictory(stars, reward) {

    finalTime.textContent = seconds + "s";

    finalMoves.textContent = moves;

    rewardCoins.textContent = reward;

    starsDisplay.textContent = stars;

    victoryScreen.classList.remove("hidden");

}

// ----------------------------
// Back to Menu
// ----------------------------

function backHome() {

    window.location.href = "index.html";

}

// ----------------------------
// Restart Current Level
// ----------------------------

function restartLevel() {

    victoryScreen.classList.add("hidden");

    clearInterval(timer);

    moves = 0;
    seconds = 0;
    selectedPiece = null;

    document.getElementById("moves").textContent = "0";
    document.getElementById("timer").textContent = "0";
    document.getElementById("stars").textContent = "⭐⭐⭐";

    shufflePuzzle();

}

// ----------------------------
// Start Game
// ----------------------------

window.onload = function () {

    victoryScreen =
        document.getElementById("victoryScreen");

    finalTime =
        document.getElementById("finalTime");

    finalMoves =
        document.getElementById("finalMoves");

    rewardCoins =
        document.getElementById("rewardCoins");

    starsDisplay =
        document.getElementById("starsDisplay");

    nextBtn =
        document.getElementById("nextBtn");

    retryBtn =
        document.getElementById("retryBtn");

    homeBtn =
        document.getElementById("homeBtn");

    // ----------------------------
    // Button Events
    // ----------------------------

    nextBtn.onclick = function () {

        if (level < 20) {

            level++;

            localStorage.setItem("level", level);

            window.location.reload();

        } else {

            backHome();

        }

    };

    retryBtn.onclick = function () {

        restartLevel();

    };

    homeBtn.onclick = function () {

        backHome();

    };

    setup();

    if (typeof startMusic === "function") {

        startMusic();

    }

};
// ======================================
// PuzzleMania - puzzle.js
// Part 4/4
// ======================================

// ----------------------------
// Keyboard Shortcuts (Optional)
// ----------------------------

document.addEventListener("keydown", function (event) {

    switch (event.key.toLowerCase()) {

        case "r":

            restartLevel();
            break;

        case "s":

            shufflePuzzle();
            break;

    }

});
