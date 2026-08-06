
// ------------------------------
// CURRENT LEVEL
// ------------------------------

let level =
    Number(localStorage.getItem("level")) || 1;


// ------------------------------
// DIFFICULTY
// ------------------------------

let size;

if(level <= 5){

    size = 3;

}
else if(level <= 10){

    size = 4;

}
else if(level <= 15){

    size = 5;

}
else{

    size = 6;

}


// ------------------------------
// LEVEL IMAGES
// ------------------------------

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


// ------------------------------
// GAME VARIABLES
// ------------------------------

let pieces = [];

let moves = 0;

let seconds = 0;

let timer = null;

let selectedPiece = null;


// ------------------------------
// VICTORY SCREEN
// ------------------------------

let victoryScreen;

let finalTime;

let finalMoves;

let rewardCoins;

let starsDisplay;

let nextBtn;

let retryBtn;

let homeBtn;


// ------------------------------
// SETUP
// ------------------------------

function setup(){

    document.getElementById("levelTitle").textContent =
        "Level " + level;

    createPieces();

    shufflePuzzle();

}


// ------------------------------
// TIMER
// ------------------------------

function startTimer(){

    clearInterval(timer);

    timer = setInterval(function(){

        seconds++;

        document.getElementById("timer").textContent =
            seconds;

    },1000);

}


// ------------------------------
// CREATE PIECES
// ------------------------------

function createPieces(){

    pieces = [];

    for(let i=0;i<size*size;i++){

        pieces.push(i);

    }

}


// ------------------------------
// RESET STATS
// ------------------------------

function resetStats(){

    moves = 0;

    seconds = 0;

    selectedPiece = null;

    document.getElementById("moves").textContent = "0";

    document.getElementById("timer").textContent = "0";

    document.getElementById("stars").textContent = "⭐⭐⭐";

}


// ------------------------------
// SHUFFLE
// ------------------------------

function shufflePuzzle(){

    createPieces();

    for(let i = pieces.length-1;i>0;i--){

        const j =
        Math.floor(Math.random()*(i+1));

        [pieces[i],pieces[j]] =
        [pieces[j],pieces[i]];

    }

    // Prevent solved puzzle

    let solved = true;

    for(let i=0;i<pieces.length;i++){

        if(pieces[i] !== i){

            solved = false;

            break;

        }

    }

    if(solved){

        [pieces[0],pieces[1]] =
        [pieces[1],pieces[0]];

    }

    resetStats();

    startTimer();

    drawPuzzle();

    if(typeof playShuffle==="function"){

        playShuffle();

    }

}
// ======================================
// DRAW PUZZLE
// ======================================

function drawPuzzle(){

    const board =
    document.getElementById("puzzleBoard");


    board.innerHTML = "";


    board.style.display = "grid";


    board.style.gridTemplateColumns =
        `repeat(${size},1fr)`;


    pieces.forEach(function(piece,index){


        const tile =
        document.createElement("div");


        tile.className = "piece";


        const row =
        Math.floor(piece / size);


        const col =
        piece % size;



        tile.style.backgroundImage =
        `url("${images[level-1]}")`;


        tile.style.backgroundSize =
        `${size*100}% ${size*100}%`;


        tile.style.backgroundPosition =
        `${col*100/(size-1)}% ${row*100/(size-1)}%`;



        tile.onclick = function(){

            selectPiece(index);

        };


        board.appendChild(tile);


    });


}



// ======================================
// SELECT PIECE
// ======================================

function selectPiece(index){


    const allPieces =
    document.querySelectorAll(".piece");



    if(selectedPiece === null){


        selectedPiece = index;


        allPieces[index]
        .classList.add("selected");



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

function swapPieces(first,second){


    const allPieces =
    document.querySelectorAll(".piece");



    allPieces[first]
    .classList.remove("selected");



    if(first === second){


        selectedPiece = null;

        return;


    }



    const temp =
    pieces[first];


    pieces[first] =
    pieces[second];


    pieces[second] =
    temp;



    selectedPiece = null;


    moves++;


    document.getElementById("moves")
    .textContent = moves;



    if(typeof playExchange === "function"){

        playExchange();

    }



    drawPuzzle();



    checkWin();


}



// ======================================
// CHECK IF PUZZLE IS COMPLETE
// ======================================

function isSolved(){


    for(let i=0;i<pieces.length;i++){


        if(pieces[i] !== i){


            return false;


        }


    }


    return true;


         }
// ======================================
// CHECK WIN
// ======================================

function checkWin(){


    if(!isSolved()){

        return;

    }



    // Stop Timer

    clearInterval(timer);



    // ------------------------------
    // Calculate Stars
    // ------------------------------

    let stars = 1;


    if(seconds < 60 && moves < 50){

        stars = 3;

    }
    else if(seconds < 120 && moves < 100){

        stars = 2;

    }



    let starText = "⭐";


    if(stars === 2){

        starText = "⭐⭐";

    }


    if(stars === 3){

        starText = "⭐⭐⭐";

    }



    document.getElementById("stars")
    .textContent = starText;



    // ------------------------------
    // Save Completion
    // ------------------------------

    localStorage.setItem(
        "level" + level,
        "completed"
    );



    // ------------------------------
    // Unlock Next Level
    // ------------------------------

    let unlocked =
    Number(localStorage.getItem("level")) || 1;



    if(level + 1 > unlocked && level < 20){


        localStorage.setItem(
            "level",
            level + 1
        );


    }



    // ------------------------------
    // Save Best Stars
    // ------------------------------

    let bestStars =
    Number(
        localStorage.getItem(
            "level" + level + "BestStars"
        )
    ) || 0;



    if(stars > bestStars){


        localStorage.setItem(
            "level" + level + "BestStars",
            stars
        );


    }



    // ------------------------------
    // Save Best Time
    // ------------------------------

    let bestTime =
    Number(
        localStorage.getItem(
            "level" + level + "BestTime"
        )
    ) || 0;



    if(bestTime === 0 || seconds < bestTime){


        localStorage.setItem(
            "level" + level + "BestTime",
            seconds
        );


    }



    // ------------------------------
    // Save Best Moves
    // ------------------------------

    let bestMoves =
    Number(
        localStorage.getItem(
            "level" + level + "BestMoves"
        )
    ) || 0;



    if(bestMoves === 0 || moves < bestMoves){


        localStorage.setItem(
            "level" + level + "BestMoves",
            moves
        );


    }



    // ------------------------------
    // Give Coins
    // ------------------------------

    let coins =
    Number(
        localStorage.getItem("coins")
    ) || 0;



    let reward =
    level * 20;



    coins += reward;



    localStorage.setItem(
        "coins",
        coins
    );
// ----------------------------
// Save Best Records
// ----------------------------


// Save best time

let oldTime =
    Number(
        localStorage.getItem(
            "level" + level + "BestTime"
        )
    ) || 999999;


if(seconds < oldTime){

    localStorage.setItem(
        "level" + level + "BestTime",
        seconds
    );

}



// Save best moves

let oldMoves =
    Number(
        localStorage.getItem(
            "level" + level + "BestMoves"
        )
    ) || 999999;


if(moves < oldMoves){

    localStorage.setItem(
        "level" + level + "BestMoves",
        moves
    );

}



// Save best stars

let oldStars =
    Number(
        localStorage.getItem(
            "level" + level + "BestStars"
        )
    ) || 0;


let currentStars =
    stars.length;


if(currentStars > oldStars){

    localStorage.setItem(
        "level" + level + "BestStars",
        currentStars
    );

            }


    // ------------------------------
    // Sounds
    // ------------------------------

    if(typeof playVictorySound === "function"){

        playVictorySound();

    }



    if(typeof playVictory === "function"){

        playVictory(level);

    }



    // ------------------------------
    // Show Result
    // ------------------------------

    showVictory(
        starText,
        reward
    );


}
// ======================================
// VICTORY SCREEN
// ======================================

function showVictory(stars, reward){


    if(!victoryScreen){

        return;

    }



    finalTime.textContent =
        seconds + "s";


    finalMoves.textContent =
        moves;


    rewardCoins.textContent =
        reward;


    starsDisplay.textContent =
        stars;



    // Add best record display

    let bestRecord =
    document.getElementById("bestRecord");



    if(!bestRecord){


        bestRecord =
        document.createElement("div");


        bestRecord.id =
        "bestRecord";


        bestRecord.style.marginTop =
        "20px";


        document.querySelector(".victory-box")
        .appendChild(bestRecord);


    }



    const bestTime =
    localStorage.getItem(
        "level" + level + "BestTime"
    );


    const bestMoves =
    localStorage.getItem(
        "level" + level + "BestMoves"
    );


    const bestStars =
    Number(
        localStorage.getItem(
            "level" + level + "BestStars"
        )
    ) || 1;



    let bestStarText = "⭐";


    if(bestStars === 2){

        bestStarText = "⭐⭐";

    }


    if(bestStars === 3){

        bestStarText = "⭐⭐⭐";

    }



    bestRecord.innerHTML = `

        <hr>

        <h3>🏆 Best Record</h3>

        <p>${bestStarText}</p>

        <p>⏱ ${bestTime}s</p>

        <p>🔄 ${bestMoves} moves</p>

    `;



    victoryScreen
    .classList.remove("hidden");


}



// ======================================
// BACK TO HOME
// ======================================

function backHome(){


    if(typeof playClick === "function"){

        playClick();

    }



    window.location =
    "index.html";


}



// ======================================
// RESTART CURRENT LEVEL
// ======================================

function restartLevel(){


    if(victoryScreen){

        victoryScreen
        .classList.add("hidden");

    }



    clearInterval(timer);



    shufflePuzzle();


}
// ======================================
// START GAME
// ======================================

window.onload = function(){



    // ------------------------------
    // Victory Elements
    // ------------------------------

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



    // ------------------------------
    // Hide Victory At Start
    // ------------------------------

    if(victoryScreen){

        victoryScreen
        .classList.add("hidden");

    }



    // ------------------------------
    // NEXT LEVEL BUTTON
    // ------------------------------

    if(nextBtn){


        nextBtn.onclick = function(){


            if(typeof playClick === "function"){

                playClick();

            }



            let unlocked =
            Number(
                localStorage.getItem("level")
            ) || 1;



            // Only allow unlocked levels

            if(level < unlocked){


                level++;


                localStorage.setItem(
                    "level",
                    level
                );


                window.location.reload();


            }
            else if(level === unlocked && level < 20){


                level++;


                localStorage.setItem(
                    "level",
                    level
                );


                window.location.reload();


            }
            else{


                backHome();


            }


        };


    }




    // ------------------------------
    // RETRY BUTTON
    // ------------------------------

    if(retryBtn){


        retryBtn.onclick = function(){


            if(typeof playClick === "function"){

                playClick();

            }


            restartLevel();


        };


    }




    // ------------------------------
    // HOME BUTTON
    // ------------------------------

    if(homeBtn){


        homeBtn.onclick = function(){


            backHome();


        };


    }




    // ------------------------------
    // Start Puzzle
    // ------------------------------

    setup();



    // ------------------------------
    // Background Music
    // ------------------------------

    if(typeof startMusic === "function"){

        startMusic();

    }


};
// ======================================
// LEVEL VALIDATION
// ======================================

function validateLevel(){


    if(level < 1){

        level = 1;

    }



    if(level > 20){

        level = 20;

    }



    localStorage.setItem(
        "level",
        level
    );


}



// ======================================
// SAFE LEVEL IMAGE CHECK
// ======================================

function getCurrentImage(){


    if(images[level - 1]){

        return images[level - 1];

    }


    return images[0];


}



// ======================================
// PREVENT DOUBLE CLICK ISSUES
// ======================================

let inputLocked = false;



function lockInput(){


    inputLocked = true;


    setTimeout(function(){


        inputLocked = false;


    },200);


}



// ======================================
// UPDATED SELECT CHECK
// ======================================

const oldSelectPiece = selectPiece;



selectPiece = function(index){


    if(inputLocked){

        return;

    }



    lockInput();



    oldSelectPiece(index);


};



// ======================================
// KEYBOARD SHORTCUTS
// ======================================

document.addEventListener(
"keydown",
function(event){


    let key =
    event.key.toLowerCase();



    switch(key){


        case "r":

            restartLevel();

            break;



        case "s":

            shufflePuzzle();

            break;



        case "escape":


            if(victoryScreen){

                victoryScreen
                .classList.add("hidden");

            }


            break;


    }



});



// ======================================
// CHECK PAGE BEFORE RUNNING
// ======================================

validateLevel();
// ======================================
// RECORD HELPERS
// ======================================


// Get best time of a level

function getBestTime(levelNumber){


    return Number(

        localStorage.getItem(
            "level" + levelNumber + "BestTime"
        )

    ) || 0;


}



// Get best moves of a level

function getBestMoves(levelNumber){


    return Number(

        localStorage.getItem(
            "level" + levelNumber + "BestMoves"
        )

    ) || 0;


}



// Get best stars of a level

function getBestStars(levelNumber){


    return Number(

        localStorage.getItem(
            "level" + levelNumber + "BestStars"
        )

    ) || 0;


}



// ======================================
// TOTAL PLAYER STATISTICS
// ======================================

function getTotalStars(){


    let total = 0;



    for(let i = 1; i <= 20; i++){


        total += getBestStars(i);


    }



    return total;


}





function getCompletedLevels(){


    let completed = 0;



    for(let i = 1; i <= 20; i++){


        if(

            localStorage.getItem(
                "level" + i
            ) === "completed"

        ){


            completed++;


        }


    }



    return completed;


}





function getTotalCoins(){


    return Number(

        localStorage.getItem(
            "coins"
        )

    ) || 0;


}




// ======================================
// RESET CURRENT LEVEL DISPLAY
// ======================================

function resetBoardDisplay(){


    document.getElementById("moves")
    .textContent = moves;



    document.getElementById("timer")
    .textContent = seconds;



}




// ======================================
// FUTURE LEVEL SUPPORT
// ======================================

function changeLevel(newLevel){


    if(newLevel < 1){

        return;

    }



    if(newLevel > images.length){

        return;

    }



    level = newLevel;



    localStorage.setItem(
        "level",
        level
    );



    location.reload();


            }
// ======================================
// FINAL INITIALIZATION SAFETY
// ======================================


// Make sure game starts correctly

window.addEventListener("load", function(){


    // Setup victory screen

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



    // Next level button

    if(nextBtn){


        nextBtn.onclick = function(){


            let next = level + 1;



            if(next <= images.length){


                localStorage.setItem(
                    "level",
                    next
                );


                location.reload();


            }

            else{


                backHome();


            }


        };


    }




    // Retry button

    if(retryBtn){


        retryBtn.onclick = function(){


            restartLevel();


        };


    }




    // Home button

    if(homeBtn){


        homeBtn.onclick = function(){


            backHome();


        };


    }




    setup();



    if(typeof startMusic === "function"){


        startMusic();


    }



});




// ======================================
// KEYBOARD CONTROLS
// ======================================

document.addEventListener(
"keydown",
function(event){


    let key =
    event.key.toLowerCase();



    if(key === "r"){


        restartLevel();


    }



    if(key === "s"){


        shufflePuzzle();


    }


});




// ======================================
// MOBILE SWIPE SUPPORT PREPARATION
// ======================================

let touchStartX = 0;
let touchStartY = 0;



document.addEventListener(
"touchstart",
function(e){


    if(e.touches.length > 0){


        touchStartX =
        e.touches[0].clientX;


        touchStartY =
        e.touches[0].clientY;


    }


});



document.addEventListener(
"touchend",
function(e){


    if(e.changedTouches.length > 0){


        let endX =
        e.changedTouches[0].clientX;


        let endY =
        e.changedTouches[0].clientY;



        let diffX =
        endX - touchStartX;



        let diffY =
        endY - touchStartY;



        // reserved for future swipe controls


    }


});


