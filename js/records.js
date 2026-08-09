// ======================================
// PixVZinz
// RECORDS SYSTEM
// ======================================
//
// Handles:
// - Best time
// - Best moves
// - Best stars
// - Level completion records
// - Reading saved records
// ======================================


// ======================================
// SAVE BEST TIME
// ======================================

function saveBestTime(levelNumber, time){

    const key =
        "level" +
        levelNumber +
        "BestTime";


    const previous =
        Number(
            localStorage.getItem(key)
        ) || 0;


    // Save if there is no record
    // or the new time is better

    if(
        previous === 0 ||
        time < previous
    ){

        localStorage.setItem(
            key,
            time
        );

        return true;

    }


    return false;

}


// ======================================
// SAVE BEST MOVES
// ======================================

function saveBestMoves(
    levelNumber,
    moveCount
){

    const key =
        "level" +
        levelNumber +
        "BestMoves";


    const previous =
        Number(
            localStorage.getItem(key)
        ) || 0;


    // Save if there is no record
    // or the new result uses fewer moves

    if(
        previous === 0 ||
        moveCount < previous
    ){

        localStorage.setItem(
            key,
            moveCount
        );

        return true;

    }


    return false;

}


// ======================================
// SAVE BEST STARS
// ======================================

function saveBestStars(
    levelNumber,
    starCount
){

    const key =
        "level" +
        levelNumber +
        "BestStars";


    const previous =
        Number(
            localStorage.getItem(key)
        ) || 0;


    // Save only when the new result
    // has more stars

    if(
        starCount > previous
    ){

        localStorage.setItem(
            key,
            starCount
        );

        return true;

    }


    return false;

}


// ======================================
// GET BEST TIME
// ======================================

function getBestTime(levelNumber){

    return Number(
        localStorage.getItem(
            "level" +
            levelNumber +
            "BestTime"
        )
    ) || 0;

}


// ======================================
// GET BEST MOVES
// ======================================

function getBestMoves(levelNumber){

    return Number(
        localStorage.getItem(
            "level" +
            levelNumber +
            "BestMoves"
        )
    ) || 0;

}


// ======================================
// GET BEST STARS
// ======================================

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
// CHECK LEVEL COMPLETION
// ======================================

function isLevelCompleted(levelNumber){

    return(
        localStorage.getItem(
            "level" +
            levelNumber
        ) === "completed"
    );

}


// ======================================
// SAVE LEVEL COMPLETION
// ======================================

function saveLevelCompletion(
    levelNumber
){

    localStorage.setItem(
        "level" +
        levelNumber,
        "completed"
    );

}


// ======================================
// GET LEVEL RECORD
// ======================================

function getLevelRecord(levelNumber){

    return {

        completed:
            isLevelCompleted(
                levelNumber
            ),

        bestTime:
            getBestTime(
                levelNumber
            ),

        bestMoves:
            getBestMoves(
                levelNumber
            ),

        bestStars:
            getBestStars(
                levelNumber
            )

    };

}


// ======================================
// GET STAR TEXT
// ======================================

function getStarText(starCount){

    if(starCount >= 3){

        return "⭐⭐⭐";

    }


    if(starCount === 2){

        return "⭐⭐";

    }


    if(starCount === 1){

        return "⭐";

    }


    return "";

}


// ======================================
// GET ALL COMPLETED LEVELS
// ======================================

function getCompletedLevels(){

    const completed = [];


    for(
        let i = 1;
        i <= totalLevels;
        i++
    ){

        if(
            isLevelCompleted(i)
        ){

            completed.push(i);

        }

    }


    return completed;

}


// ======================================
// GET HIGHEST UNLOCKED LEVEL
// ======================================

function getHighestUnlockedLevel(){

    let highest = 1;


    for(
        let i = 1;
        i <= totalLevels;
        i++
    ){

        if(
            isLevelCompleted(i)
        ){

            highest = i + 1;

        }

    }


    if(highest > totalLevels){

        highest = totalLevels;

    }


    return highest;

}
