// ======================================
// PuzzleMania
// RECORD SYSTEM
// ======================================


// ======================================
// LEVEL VALIDATION
// ======================================

function validateLevel(){

    if(level < 1){

        level = 1;

    }


    if(level > 60){

        level = 60;

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
// CHECK IF PUZZLE IS SOLVED
// ======================================

function isSolved(){

    if(!pieces || pieces.length === 0){

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

}



// ======================================
// CHECK WIN
// ======================================

function checkWin(){

    // ------------------------------
    // Make sure puzzle is solved
    // ------------------------------

    if(!isSolved()){

        return;

    }


    // ------------------------------
    // Stop Timer
    // ------------------------------

    if(typeof stopTimer === "function"){

        stopTimer();

    }
    else{

        clearInterval(timer);

    }


    // ------------------------------
    // Calculate Stars
    // ------------------------------

    let stars = 1;


    if(
        seconds < 60 &&
        moves < 50
    ){

        stars = 3;

    }
    else if(
        seconds < 120 &&
        moves < 100
    ){

        stars = 2;

    }


    // ------------------------------
    // Star Text
    // ------------------------------

    let starText = "⭐";


    if(stars === 2){

        starText = "⭐⭐";

    }


    if(stars === 3){

        starText = "⭐⭐⭐";

    }


    // ------------------------------
    // Update Star Display
    // ------------------------------

    const starDisplay =
        document.getElementById("stars");


    if(starDisplay){

        starDisplay.textContent =
            starText;

    }


    // ------------------------------
    // Mark Level Completed
    // ------------------------------

    localStorage.setItem(
        "level" + level,
        "completed"
    );


    // ------------------------------
    // Unlock Next Level
    // ------------------------------

    let unlocked =
        Number(
            localStorage.getItem("level")
        ) || 1;


    if(
        level + 1 > unlocked &&
        level < 60
    ){

        localStorage.setItem(
            "level",
            level + 1
        );

    }


    // ------------------------------
    // BEST STARS
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
    // BEST TIME
    // ------------------------------

    let bestTime =
        Number(
            localStorage.getItem(
                "level" + level + "BestTime"
            )
        ) || 0;


    if(
        bestTime === 0 ||
        seconds < bestTime
    ){

        localStorage.setItem(
            "level" + level + "BestTime",
            seconds
        );

    }


    // ------------------------------
    // BEST MOVES
    // ------------------------------

    let bestMoves =
        Number(
            localStorage.getItem(
                "level" + level + "BestMoves"
            )
        ) || 0;


    if(
        bestMoves === 0 ||
        moves < bestMoves
    ){

        localStorage.setItem(
            "level" + level + "BestMoves",
            moves
        );

    }


    // ------------------------------
    // COIN REWARD
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


    // ------------------------------
    // VICTORY SOUNDS
    // ------------------------------

    if(typeof playVictorySound === "function"){

        playVictorySound();

    }


    if(typeof playVictory === "function"){

        playVictory(level);

    }


    // ------------------------------
    // SHOW VICTORY SCREEN
    // ------------------------------

    if(typeof showVictory === "function"){

        showVictory(
            starText,
            reward
        );

    }

}



// ======================================
// RECORD HELPERS
// ======================================


// Get best time of a level

function getBestTime(levelNumber){

    return Number(

        localStorage.getItem(
            "level" +
            levelNumber +
            "BestTime"
        )

    ) || 0;

}



// Get best moves of a level

function getBestMoves(levelNumber){

    return Number(

        localStorage.getItem(
            "level" +
            levelNumber +
            "BestMoves"
        )

    ) || 0;

}



// Get best stars of a level

function getBestStars(levelNumber){

    return Number(

        localStorage.getItem(
            "level" +
            levelNumber +
            "BestStars"
        )

    ) || 0;

}



// ======================================
// TOTAL PLAYER STATISTICS
// ======================================

function getTotalStars(){

    let total = 0;


    for(
        let i = 1;
        i <= 60;
        i++
    ){

        total +=
            getBestStars(i);

    }


    return total;

}



// ======================================
// COMPLETED LEVELS
// ======================================

function getCompletedLevels(){

    let completed = 0;


    for(
        let i = 1;
        i <= 60;
        i++
    ){

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



// ======================================
// TOTAL COINS
// ======================================

function getTotalCoins(){

    return Number(

        localStorage.getItem(
            "coins"
        )

    ) || 0;

}



// ======================================
// RESET CURRENT DISPLAY
// ======================================

function resetBoardDisplay(){

    let movesDisplay =
        document.getElementById("moves");


    let timerDisplay =
        document.getElementById("timer");


    if(movesDisplay){

        movesDisplay.textContent =
            moves;

    }


    if(timerDisplay){

        timerDisplay.textContent =
            seconds;

    }

}



// ======================================
// CHANGE LEVEL
// ======================================

function changeLevel(newLevel){

    if(newLevel < 1){

        return;

    }


    if(newLevel > images.length){

        return;

    }


    level =
        newLevel;


    localStorage.setItem(
        "level",
        level
    );


    location.reload();

}
