/* ======================================
PixVZinz
GAME CONTROL SYSTEM
===================

Handles:

* Creating puzzle pieces
* Shuffling pieces
* Selecting pieces
* Swapping pieces
* Move counting
* Victory detection

Board:
js/board.js

Timer:
js/timer.js

Records:
js/records.js

Victory screen:
js/victory.js

Audio:
audio.js
====================================== */

// ======================================
// GAME VARIABLES
// ======================================

let pieces = [];

let moves = 0;

let selectedPiece = null;

let gameFinished = false;

// ======================================
// CREATE PUZZLE PIECES
// ======================================

function createPieces(){

pieces = [];


for(
    let i = 0;
    i < size * size;
    i++
){

    pieces.push(i);

}
```

}

// ======================================
// RESET GAME STATS
// ======================================

function resetStats(){

```
moves = 0;

selectedPiece = null;

gameFinished = false;


// ------------------------------
// Reset moves
// ------------------------------

const moveDisplay =
    document.getElementById(
        "moves"
    );


if(moveDisplay){

    moveDisplay.textContent =
        "0";

}


// ------------------------------
// Reset stars
// ------------------------------

const starsDisplay =
    document.getElementById(
        "stars"
    );


if(starsDisplay){

    starsDisplay.textContent =
        "⭐⭐⭐";

}


// ------------------------------
// Reset timer
// ------------------------------

if(
    typeof resetTimer ===
    "function"
){

    resetTimer();

}
```

}

// ======================================
// SETUP GAME
// ======================================

function setup(){

```
console.log(
    "PixVZinz: Setting up level " +
    level
);


// Reset game state

pieces = [];

moves = 0;

selectedPiece = null;

gameFinished = false;


// ------------------------------
// Update level title
// ------------------------------

const levelTitle =
    document.getElementById(
        "levelTitle"
    );


if(levelTitle){

    levelTitle.textContent =
        "Level " + level;

}


// ------------------------------
// Create and shuffle puzzle
// ------------------------------

shufflePuzzle();
```

}

// ======================================
// SHUFFLE PUZZLE
// ======================================

function shufflePuzzle(){

```
// ------------------------------
// Create fresh pieces
// ------------------------------

createPieces();


// ------------------------------
// Shuffle pieces
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


    [
        pieces[i],
        pieces[j]
    ] = [
        pieces[j],
        pieces[i]
    ];

}


// ------------------------------
// Prevent solved puzzle
// ------------------------------

if(
    isSolved() &&
    pieces.length > 1
){

    [
        pieces[0],
        pieces[1]
    ] = [
        pieces[1],
        pieces[0]
    ];

}


// ------------------------------
// Reset statistics
// ------------------------------

resetStats();


// ------------------------------
// Draw board
// ------------------------------

if(
    typeof drawPuzzle ===
    "function"
){

    drawPuzzle();

}


// ------------------------------
// Start timer
// ------------------------------

if(
    typeof startTimer ===
    "function"
){

    startTimer();

}


// ------------------------------
// Shuffle sound
// ------------------------------

if(
    typeof playShuffle ===
    "function"
){

    playShuffle();

}
```

}

// ======================================
// SELECT PIECE
// ======================================

function selectPiece(index){

```
// Do nothing after victory

if(gameFinished){

    return;

}


// Safety check

if(
    index < 0 ||
    index >= pieces.length
){

    return;

}


const allPieces =
    document.querySelectorAll(
        ".piece"
    );


// ==================================
// FIRST PIECE
// ==================================

if(selectedPiece === null){

    selectedPiece =
        index;


    if(allPieces[index]){

        allPieces[index]
            .classList.add(
                "selected"
            );

    }


    if(
        typeof playSelect ===
        "function"
    ){

        playSelect();

    }


    return;

}


// ==================================
// SECOND PIECE
// ==================================

swapPieces(
    selectedPiece,
    index
);
```

}

// ======================================
// SWAP PIECES
// ======================================

function swapPieces(
first,
second
){

```
// ------------------------------
// Safety
// ------------------------------

if(gameFinished){

    return;

}


if(
    first < 0 ||
    second < 0 ||
    first >= pieces.length ||
    second >= pieces.length
){

    selectedPiece = null;

    return;

}


const allPieces =
    document.querySelectorAll(
        ".piece"
    );


// ------------------------------
// Remove selection
// ------------------------------

if(allPieces[first]){

    allPieces[first]
        .classList.remove(
            "selected"
        );

}


// ------------------------------
// Same piece
// ------------------------------

if(first === second){

    selectedPiece = null;

    return;

}


// ------------------------------
// Swap
// ------------------------------

[
    pieces[first],
    pieces[second]
] = [
    pieces[second],
    pieces[first]
];


selectedPiece = null;


// ------------------------------
// Increase moves
// ------------------------------

moves++;


const moveDisplay =
    document.getElementById(
        "moves"
    );


if(moveDisplay){

    moveDisplay.textContent =
        moves;

}


// ------------------------------
// Exchange sound
// ------------------------------

if(
    typeof playExchange ===
    "function"
){

    playExchange();

}


// ------------------------------
// Redraw board
// ------------------------------

if(
    typeof drawPuzzle ===
    "function"
){

    drawPuzzle();

}


// ------------------------------
// Check victory
// ------------------------------

checkWin();
```

}

// ======================================
// CHECK IF PUZZLE IS SOLVED
// ======================================

function isSolved(){

```
if(
    !pieces ||
    pieces.length === 0
){

    return false;

}


for(
    let i = 0;
    i < pieces.length;
    i++
){

    if(pieces[i] !== i){

        return false;

    }

}


return true;
```

}

// ======================================
// CHECK WIN
// ======================================

function checkWin(){

```
// ------------------------------
// Already finished
// ------------------------------

if(gameFinished){

    return;

}


// ------------------------------
// Not solved
// ------------------------------

if(!isSolved()){

    return;

}


// ------------------------------
// Mark finished
// ------------------------------

gameFinished = true;


// ------------------------------
// Stop timer
// ------------------------------

if(
    typeof stopTimer ===
    "function"
){

    stopTimer();

}


// ------------------------------
// Calculate stars
// ------------------------------

let stars = 1;


if(
    seconds <= 30 &&
    moves <= 30
){

    stars = 3;

}
else if(
    seconds <= 60 &&
    moves <= 60
){

    stars = 2;

}


// ------------------------------
// Star text
// ------------------------------

let starText =
    "⭐";


if(stars === 2){

    starText =
        "⭐⭐";

}


if(stars === 3){

    starText =
        "⭐⭐⭐";

}


// ------------------------------
// Update stars display
// ------------------------------

const starsElement =
    document.getElementById(
        "stars"
    );


if(starsElement){

    starsElement.textContent =
        starText;

}


// ==================================
// SAVE RECORDS
// ==================================
//
// Records are handled by
// records.js.
//

if(
    typeof saveLevelCompletion ===
    "function"
){

    saveLevelCompletion(
        level
    );

}
else{

    // Safe fallback

    localStorage.setItem(
        "level" + level,
        "completed"
    );

}


if(
    typeof saveBestStars ===
    "function"
){

    saveBestStars(
        level,
        stars
    );

}


if(
    typeof saveBestTime ===
    "function"
){

    saveBestTime(
        level,
        seconds
    );

}


if(
    typeof saveBestMoves ===
    "function"
){

    saveBestMoves(
        level,
        moves
    );

}


// ==================================
// COIN REWARD
// ==================================

let reward = 0;


if(level <= 30){

    const starReward =
        stars * 5;


    let levelCoins =
        Number(
            localStorage.getItem(
                "level" +
                level +
                "Coins"
            )
        ) || 0;


    const remainingCoins =
        Math.max(
            0,
            15 - levelCoins
        );


    reward =
        Math.min(
            starReward,
            remainingCoins
        );


    levelCoins += reward;


    localStorage.setItem(
        "level" +
        level +
        "Coins",
        levelCoins
    );


    if(reward > 0){

        const totalCoins =
            Number(
                localStorage.getItem(
                    "coins"
                )
            ) || 0;


        localStorage.setItem(
            "coins",
            totalCoins + reward
        );

    }

}


// ==================================
// UNLOCK NEXT LEVEL
// ==================================

const unlockedLevel =
    Number(
        localStorage.getItem(
            "level"
        )
    ) || 1;


if(
    level < totalLevels &&
    level + 1 > unlockedLevel
){

    localStorage.setItem(
        "level",
        level + 1
    );

}


// ==================================
// SHOW VICTORY
// ==================================
//
// Victory screen and victory audio
// are handled by victory.js/audio.js.
//

if(
    typeof showVictory ===
    "function"
){

    showVictory(
        starText,
        reward
    );

}
else{

    console.error(
        "PixVZinz: showVictory() is not available."
    );

}

}
