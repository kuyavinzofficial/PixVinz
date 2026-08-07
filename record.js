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
// RESET CURRENT DISPLAY
// ======================================

function resetBoardDisplay(){

    document.getElementById("moves")
    .textContent = moves;

    document.getElementById("timer")
    .textContent = seconds;

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

    level = newLevel;

    localStorage.setItem(
        "level",
        level
    );

    location.reload();

}
