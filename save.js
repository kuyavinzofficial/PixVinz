// ======================================
// PixVZinz
// SAVE SYSTEM
// ======================================
//
// Handles:
// - Player coins
// - Current/unlocked level
// - Level completion
// - Best stars
// - Best time
// - Best moves
// - Level coin rewards
//
// Authentication is handled by:
// auth.js
//
// ======================================


// ======================================
// STORAGE KEYS
// ======================================

const SAVE_COINS_KEY =
    "coins";

const SAVE_LEVEL_KEY =
    "level";


// ======================================
// COINS
// ======================================

// Get total player coins

function getCoins(){

    return Number(
        localStorage.getItem(
            SAVE_COINS_KEY
        )
    ) || 0;

}


// Save total player coins

function setCoins(amount){

    amount =
        Math.max(
            0,
            Number(amount) || 0
        );


    localStorage.setItem(
        SAVE_COINS_KEY,
        String(amount)
    );


    updateCoinDisplay();

}


// Add coins

function addCoins(amount){

    amount =
        Math.max(
            0,
            Number(amount) || 0
        );


    const current =
        getCoins();


    setCoins(
        current + amount
    );


    return amount;

}


// Remove coins

function removeCoins(amount){

    amount =
        Math.max(
            0,
            Number(amount) || 0
        );


    const current =
        getCoins();


    if(amount > current){

        return false;

    }


    setCoins(
        current - amount
    );


    return true;

}


// Update coin display

function updateCoinDisplay(){

    const coinDisplay =
        document.getElementById(
            "coinDisplay"
        );


    if(!coinDisplay){

        return;

    }


    coinDisplay.textContent =
        getCoins();

}


// ======================================
// CURRENT / UNLOCKED LEVEL
// ======================================

// Get highest unlocked level

function getUnlockedLevel(){

    let unlocked =
        Number(
            localStorage.getItem(
                SAVE_LEVEL_KEY
            )
        ) || 1;


    if(unlocked < 1){

        unlocked = 1;

    }


    if(
        typeof totalLevels !==
        "undefined" &&
        unlocked > totalLevels
    ){

        unlocked =
            totalLevels;

    }


    return unlocked;

}


// Save unlocked level

function setUnlockedLevel(
    levelNumber
){

    levelNumber =
        Number(levelNumber);


    if(
        !Number.isFinite(
            levelNumber
        )
    ){

        return;

    }


    levelNumber =
        Math.floor(
            levelNumber
        );


    levelNumber =
        Math.max(
            1,
            levelNumber
        );


    const current =
        getUnlockedLevel();


    // Never move progress backwards

    if(
        levelNumber <= current
    ){

        return;

    }


    if(
        typeof totalLevels !==
        "undefined"
    ){

        levelNumber =
            Math.min(
                levelNumber,
                totalLevels
            );

    }


    localStorage.setItem(
        SAVE_LEVEL_KEY,
        String(levelNumber)
    );

}


// ======================================
// LEVEL COMPLETION
// ======================================

// Get completion status

function isLevelCompleted(
    levelNumber
){

    return(
        localStorage.getItem(
            "level" +
            levelNumber
        ) === "completed"
    );

}


// Save level completion

function saveLevelCompletion(
    levelNumber
){

    levelNumber =
        Number(levelNumber);


    if(
        !Number.isFinite(
            levelNumber
        )
    ){

        return;

    }


    localStorage.setItem(
        "level" +
        levelNumber,
        "completed"
    );


    // Unlock next level

    const nextLevel =
        levelNumber + 1;


    setUnlockedLevel(
        nextLevel
    );

}


// ======================================
// BEST STARS
// ======================================

function getBestStars(
    levelNumber
){

    return Number(
        localStorage.getItem(
            "level" +
            levelNumber +
            "BestStars"
        )
    ) || 0;

}


function saveBestStars(
    levelNumber,
    stars
){

    levelNumber =
        Number(levelNumber);


    stars =
        Number(stars);


    if(
        !Number.isFinite(
            levelNumber
        ) ||
        !Number.isFinite(
            stars
        )
    ){

        return false;

    }


    const previous =
        getBestStars(
            levelNumber
        );


    if(stars > previous){

        localStorage.setItem(
            "level" +
            levelNumber +
            "BestStars",
            String(stars)
        );


        return true;

    }


    return false;

}


// ======================================
// BEST TIME
// ======================================

function getBestTime(
    levelNumber
){

    return Number(
        localStorage.getItem(
            "level" +
            levelNumber +
            "BestTime"
        )
    ) || 0;

}


function saveBestTime(
    levelNumber,
    time
){

    levelNumber =
        Number(levelNumber);


    time =
        Number(time);


    if(
        !Number.isFinite(
            levelNumber
        ) ||
        !Number.isFinite(
            time
        )
    ){

        return false;

    }


    const previous =
        getBestTime(
            levelNumber
        );


    if(
        previous === 0 ||
        time < previous
    ){

        localStorage.setItem(
            "level" +
            levelNumber +
            "BestTime",
            String(time)
        );


        return true;

    }


    return false;

}


// ======================================
// BEST MOVES
// ======================================

function getBestMoves(
    levelNumber
){

    return Number(
        localStorage.getItem(
            "level" +
            levelNumber +
            "BestMoves"
        )
    ) || 0;

}


function saveBestMoves(
    levelNumber,
    moves
){

    levelNumber =
        Number(levelNumber);


    moves =
        Number(moves);


    if(
        !Number.isFinite(
            levelNumber
        ) ||
        !Number.isFinite(
            moves
        )
    ){

        return false;

    }


    const previous =
        getBestMoves(
            levelNumber
        );


    if(
        previous === 0 ||
        moves < previous
    ){

        localStorage.setItem(
            "level" +
            levelNumber +
            "BestMoves",
            String(moves)
        );


        return true;

    }


    return false;

}


// ======================================
// LEVEL COINS
// ======================================
//
// Each level can earn a maximum
// of 15 coins.
//
// Stars:
// 1 star = 5 coins
// 2 stars = 10 coins
// 3 stars = 15 coins
//
// ======================================

function getLevelCoins(
    levelNumber
){

    return Number(
        localStorage.getItem(
            "level" +
            levelNumber +
            "Coins"
        )
    ) || 0;

}


// Add level reward safely

function awardLevelCoins(
    levelNumber,
    stars
){

    levelNumber =
        Number(levelNumber);


    stars =
        Number(stars);


    if(
        !Number.isFinite(
            levelNumber
        ) ||
        !Number.isFinite(
            stars
        )
    ){

        return 0;

    }


    // Only levels 1-30 use
    // the current coin reward system.

    if(levelNumber < 1){

        return 0;

    }


    if(levelNumber > 30){

        return 0;

    }


    stars =
        Math.max(
            0,
            Math.min(
                3,
                Math.floor(stars)
            )
        );


    const earnedBefore =
        getLevelCoins(
            levelNumber
        );


    const possibleReward =
        stars * 5;


    const remaining =
        Math.max(
            0,
            15 - earnedBefore
        );


    const reward =
        Math.min(
            possibleReward,
            remaining
        );


    if(reward <= 0){

        return 0;

    }


    const newLevelCoins =
        earnedBefore + reward;


    localStorage.setItem(
        "level" +
        levelNumber +
        "Coins",
        String(newLevelCoins)
    );


    addCoins(
        reward
    );


    return reward;

}


// ======================================
// LEVEL RECORD
// ======================================

function getLevelRecord(
    levelNumber
){

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
            ),

        coins:
            getLevelCoins(
                levelNumber
            )

    };

}


// ======================================
// GET COMPLETED LEVELS
// ======================================

function getCompletedLevels(){

    const completed = [];


    const maximum =
        typeof totalLevels !==
        "undefined"
            ? totalLevels
            : 200;


    for(
        let i = 1;
        i <= maximum;
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
// GET HIGHEST COMPLETED LEVEL
// ======================================

function getHighestCompletedLevel(){

    let highest = 0;


    const maximum =
        typeof totalLevels !==
        "undefined"
            ? totalLevels
            : 200;


    for(
        let i = 1;
        i <= maximum;
        i++
    ){

        if(
            isLevelCompleted(i)
        ){

            highest = i;

        }

    }


    return highest;

}


// ======================================
// GET HIGHEST UNLOCKED LEVEL
// ======================================

function getHighestUnlockedLevel(){

    return getUnlockedLevel();

}


// ======================================
// RESET GAME PROGRESS
// ======================================
//
// Does NOT delete the account.
// Does NOT delete username/password.
//
// ======================================

function resetGameProgress(){

    const maximum =
        typeof totalLevels !==
        "undefined"
            ? totalLevels
            : 200;


    for(
        let i = 1;
        i <= maximum;
        i++
    ){

        localStorage.removeItem(
            "level" + i
        );

        localStorage.removeItem(
            "level" +
            i +
            "BestStars"
        );

        localStorage.removeItem(
            "level" +
            i +
            "BestTime"
        );

        localStorage.removeItem(
            "level" +
            i +
            "BestMoves"
        );

        localStorage.removeItem(
            "level" +
            i +
            "Coins"
        );

    }


    localStorage.setItem(
        SAVE_LEVEL_KEY,
        "1"
    );


    localStorage.setItem(
        SAVE_COINS_KEY,
        "0"
    );


    updateCoinDisplay();

}


// ======================================
// INITIALIZE SAVE SYSTEM
// ======================================

function initializeSaveSystem(){

    if(
        localStorage.getItem(
            SAVE_COINS_KEY
        ) === null
    ){

        localStorage.setItem(
            SAVE_COINS_KEY,
            "0"
        );

    }


    if(
        localStorage.getItem(
            SAVE_LEVEL_KEY
        ) === null
    ){

        localStorage.setItem(
            SAVE_LEVEL_KEY,
            "1"
        );

    }


    updateCoinDisplay();

}


// ======================================
// INITIALIZE
// ======================================

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initializeSaveSystem
    );

}
else{

    initializeSaveSystem();

}


// ======================================
// END OF SAVE SYSTEM
// ======================================
