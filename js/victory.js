/* ======================================
PixVZinz
VICTORY SYSTEM
==============

Handles:

* Victory screen
* Final time
* Final moves
* Stars
* Coin reward display
* Completed image
* Best records
* Next level
* Retry
* Home

Records:
js/records.js

Audio:
audio.js
====================================== */

// ======================================
// SHOW VICTORY SCREEN
// ======================================

function showVictory(
stars,
reward
){


console.log(
    "PixVZinz: Victory detected."
);


// ==================================
// GET VICTORY SCREEN
// ==================================

const victoryScreen =
    document.getElementById(
        "victoryScreen"
    );


if(!victoryScreen){

    console.error(
        "PixVZinz: #victoryScreen not found."
    );

    return;

}


// ==================================
// GET ELEMENTS
// ==================================

const finalTime =
    document.getElementById(
        "finalTime"
    );


const finalMoves =
    document.getElementById(
        "finalMoves"
    );


const rewardCoins =
    document.getElementById(
        "rewardCoins"
    );


const starsDisplay =
    document.getElementById(
        "starsDisplay"
    );


const completedImage =
    document.getElementById(
        "completedImage"
    );


// ==================================
// FINAL TIME
// ==================================

if(finalTime){

    if(
        typeof formatTime ===
        "function"
    ){

        finalTime.textContent =
            formatTime(seconds);

    }
    else{

        finalTime.textContent =
            seconds + "s";

    }

}


// ==================================
// FINAL MOVES
// ==================================

if(finalMoves){

    finalMoves.textContent =
        moves;

}


// ==================================
// COIN REWARD
// ==================================

if(rewardCoins){

    rewardCoins.textContent =
        reward;

}


// ==================================
// STARS
// ==================================

if(starsDisplay){

    starsDisplay.textContent =
        stars;

}


// ==================================
// COMPLETED IMAGE
// ==================================

if(
    completedImage &&
    typeof images !==
    "undefined" &&
    images[level - 1]
){

    completedImage.src =
        images[level - 1];

    completedImage.style.display =
        "block";

}


// ==================================
// UPDATE BEST RECORD
// ==================================

updateVictoryBestRecord();


// ==================================
// SHOW SCREEN
// ==================================

victoryScreen.classList.remove(
    "hidden"
);


victoryScreen.style.display =
    "flex";


victoryScreen.style.pointerEvents =
    "auto";


victoryScreen.style.touchAction =
    "auto";


// ==================================
// VICTORY SOUND
// ==================================

if(
    typeof playVictorySound ===
    "function"
){

    playVictorySound(level);

}


console.log(
    "PixVZinz: Victory screen displayed."
);
```

}

// ======================================
// UPDATE BEST RECORD
// ======================================

function updateVictoryBestRecord(){

```
const victoryBox =
    document.querySelector(
        ".victory-box"
    );


if(!victoryBox){

    return;

}


let bestRecord =
    document.getElementById(
        "bestRecord"
    );


// ==================================
// CREATE RECORD AREA
// ==================================

if(!bestRecord){

    bestRecord =
        document.createElement(
            "div"
        );


    bestRecord.id =
        "bestRecord";


    victoryBox.appendChild(
        bestRecord
    );

}


// ==================================
// GET RECORDS
// ==================================

const bestTime =
    typeof getBestTime ===
    "function"

    ? getBestTime(level)

    : 0;


const bestMoves =
    typeof getBestMoves ===
    "function"

    ? getBestMoves(level)

    : 0;


const bestStars =
    typeof getBestStars ===
    "function"

    ? getBestStars(level)

    : 0;


// ==================================
// STAR TEXT
// ==================================

let bestStarText =
    "—";


if(
    typeof getStarText ===
    "function"
){

    bestStarText =
        getStarText(
            bestStars
        );

}
else if(bestStars >= 3){

    bestStarText =
        "⭐⭐⭐";

}
else if(bestStars === 2){

    bestStarText =
        "⭐⭐";

}
else if(bestStars === 1){

    bestStarText =
        "⭐";

}


// ==================================
// BEST TIME TEXT
// ==================================

let bestTimeText =
    bestTime || 0;


if(
    typeof formatTime ===
    "function"
){

    bestTimeText =
        formatTime(
            bestTime
        );

}


// ==================================
// DISPLAY RECORD
// ==================================

bestRecord.innerHTML = `

    <hr>

    <h3>🏆 Best Record</h3>

    <p>${bestStarText}</p>

    <p>⏱ ${bestTimeText}</p>

    <p>🔄 ${bestMoves || 0} moves</p>

`;
```

}

// ======================================
// HIDE VICTORY SCREEN
// ======================================

function hideVictory(){

```
const victoryScreen =
    document.getElementById(
        "victoryScreen"
    );


if(!victoryScreen){

    return;

}


victoryScreen.classList.add(
    "hidden"
);


victoryScreen.style.display =
    "none";


victoryScreen.style.pointerEvents =
    "none";
```

}

// ======================================
// RETRY CURRENT LEVEL
// ======================================

function restartLevel(){

```
console.log(
    "PixVZinz: Restarting level."
);


// ------------------------------
// Hide victory screen
// ------------------------------

hideVictory();


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
// Stop victory sounds
// ------------------------------

if(
    typeof stopVictorySounds ===
    "function"
){

    stopVictorySounds();

}


// ------------------------------
// Reset state
// ------------------------------

selectedPiece =
    null;

moves =
    0;

gameFinished =
    false;


// ------------------------------
// Shuffle again
// ------------------------------

if(
    typeof shufflePuzzle ===
    "function"
){

    shufflePuzzle();

}
```

}

// ======================================
// NEXT LEVEL
// ======================================

function nextLevel(){

```
console.log(
    "PixVZinz: Loading next level."
);


// ------------------------------
// Stop victory sound
// ------------------------------

if(
    typeof stopVictorySounds ===
    "function"
){

    stopVictorySounds();

}


// ------------------------------
// Final level
// ------------------------------

if(
    level >= totalLevels
){

    backHome();

    return;

}


// ------------------------------
// Next level
// ------------------------------

const next =
    level + 1;


localStorage.setItem(
    "level",
    next
);


// ------------------------------
// Reload game
// ------------------------------

window.location.reload();
```

}

// ======================================
// BACK HOME
// ======================================

function backHome(){

```
// ------------------------------
// Stop victory sound
// ------------------------------

if(
    typeof stopVictorySounds ===
    "function"
){

    stopVictorySounds();

}


// ------------------------------
// Stop all audio
// ------------------------------

if(
    typeof stopAllAudio ===
    "function"
){

    stopAllAudio();

}


// ------------------------------
// Return home
// ------------------------------

window.location.href =
    "index.html";
```

}

// ======================================
// VICTORY BUTTONS
// ======================================

function setupVictoryButtons(){

```
const nextBtn =
    document.getElementById(
        "nextBtn"
    );


const retryBtn =
    document.getElementById(
        "retryBtn"
    );


const homeBtn =
    document.getElementById(
        "homeBtn"
    );


// ==================================
// NEXT
// ==================================

if(nextBtn){

    nextBtn.onclick =
        function(){

            if(
                typeof playClick ===
                "function"
            ){

                playClick();

            }


            nextLevel();

        };

}


// ==================================
// RETRY
// ==================================

if(retryBtn){

    retryBtn.onclick =
        function(){

            if(
                typeof playClick ===
                "function"
            ){

                playClick();

            }


            restartLevel();

        };

}


// ==================================
// HOME
// ==================================

if(homeBtn){

    homeBtn.onclick =
        function(){

            if(
                typeof playClick ===
                "function"
            ){

                playClick();

            }


            backHome();

        };

}
```

}

// ======================================
// INITIALIZE VICTORY BUTTONS
// ======================================

document.addEventListener(
"DOMContentLoaded",
function(){


    setupVictoryButtons();

}


);
