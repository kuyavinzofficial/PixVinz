// ======================================
// PuzzleMania
// RECORD & LEVEL SYSTEM
// ======================================

const MAX_LEVELS = 60;

// ======================================
// LEVEL VALIDATION & IMAGE GETTER
// ======================================

function validateLevel() {
    if (typeof level === "undefined" || level < 1) level = 1;
    if (level > MAX_LEVELS) level = MAX_LEVELS;

    localStorage.setItem("level", level);
}

function getCurrentImage() {
    if (typeof images !== "undefined" && images[level - 1]) {
        return images[level - 1];
    }
    return `images/level${level || 1}.jpg`;
}

// ======================================
// SOLVED PUZZLE CHECK
// ======================================

function isSolved() {
    if (!pieces || pieces.length === 0) return false;

    for (let i = 0; i < pieces.length; i++) {
        if (Number(pieces[i]) !== i) {
            return false;
        }
    }

    return true;
}

// ======================================
// MAIN WIN EVALUATION
// ======================================

function checkWin() {
    if (!isSolved()) return;

    // 1. Stop Timer
    if (typeof stopTimer === "function") {
        stopTimer();
    } else if (typeof timer !== "undefined") {
        clearInterval(timer);
    }

    const currentLevel = typeof level !== "undefined" ? level : 1;
    const currentSeconds = typeof seconds !== "undefined" ? seconds : 0;
    const currentMoves = typeof moves !== "undefined" ? moves : 0;

    // 2. Calculate Stars
    let stars = 1;
    if (currentSeconds < 60 && currentMoves < 50) {
        stars = 3;
    } else if (currentSeconds < 120 && currentMoves < 100) {
        stars = 2;
    }

    let starText = "⭐".repeat(stars);

    // 3. Update UI Stars Display
    const starDisplay = document.getElementById("stars");
    if (starDisplay) {
        starDisplay.textContent = starText;
    }

    // 4. Update Level Completion State
    localStorage.setItem("level" + currentLevel, "completed");

    // 5. Unlock Next Level
    const unlocked = Number(localStorage.getItem("level")) || 1;
    if (currentLevel + 1 > unlocked && currentLevel < MAX_LEVELS) {
        localStorage.setItem("level", currentLevel + 1);
    }

    // 6. Update Best Records
    const bestStarsKey = "level" + currentLevel + "BestStars";
    const bestTimeKey = "level" + currentLevel + "BestTime";
    const bestMovesKey = "level" + currentLevel + "BestMoves";

    const prevBestStars = Number(localStorage.getItem(bestStarsKey)) || 0;
    if (stars > prevBestStars) {
        localStorage.setItem(bestStarsKey, stars);
    }

    const prevBestTime = Number(localStorage.getItem(bestTimeKey)) || 0;
    if (prevBestTime === 0 || currentSeconds < prevBestTime) {
        localStorage.setItem(bestTimeKey, currentSeconds);
    }

    const prevBestMoves = Number(localStorage.getItem(bestMovesKey)) || 0;
    if (prevBestMoves === 0 || currentMoves < prevBestMoves) {
        localStorage.setItem(bestMovesKey, currentMoves);
    }

    // 7. Calculate Coin Reward
    let coins = Number(localStorage.getItem("coins")) || 0;
    const reward = currentLevel * 20;
    coins += reward;
    localStorage.setItem("coins", coins);

    // 8. Trigger Audio
    if (typeof playSound === "function") {
        playSound("win");
    }
    if (typeof playVictory === "function") {
        playVictory(currentLevel);
    }

    // 9. Display Victory Modal
    if (typeof showVictory === "function") {
        showVictory(starText, reward);
    }
}

// ======================================
// RECORD HELPERS & STATS
// ======================================

function getBestTime(levelNumber) {
    return Number(localStorage.getItem("level" + levelNumber + "BestTime")) || 0;
}

function getBestMoves(levelNumber) {
    return Number(localStorage.getItem("level" + levelNumber + "BestMoves")) || 0;
}

function getBestStars(levelNumber) {
    return Number(localStorage.getItem("level" + levelNumber + "BestStars")) || 0;
}

function getTotalStars() {
    let total = 0;
    for (let i = 1; i <= MAX_LEVELS; i++) {
        total += getBestStars(i);
    }
    return total;
}

function getCompletedLevels() {
    let completed = 0;
    for (let i = 1; i <= MAX_LEVELS; i++) {
        if (localStorage.getItem("level" + i) === "completed") {
            completed++;
        }
    }
    return completed;
}

function getTotalCoins() {
    return Number(localStorage.getItem("coins")) || 0;
}

// ======================================
// UI & LEVEL CONTROLS
// ======================================

function resetBoardDisplay() {
    const movesDisplay = document.getElementById("moves");
    const timerDisplay = document.getElementById("timer");

    if (movesDisplay) movesDisplay.textContent = typeof moves !== "undefined" ? moves : 0;
    if (timerDisplay) timerDisplay.textContent = typeof seconds !== "undefined" ? seconds : 0;
}

function changeLevel(newLevel) {
    if (newLevel < 1 || newLevel > MAX_LEVELS) return;

    level = newLevel;
    localStorage.setItem("level", level);
    location.reload();
}

// ======================================
// PuzzleMania
// RECORDS & WIN DETECTION
// ======================================

function isSolved() {
    if (typeof pieces === "undefined" || !pieces || pieces.length === 0) {
        return false;
    }
    for (let i = 0; i < pieces.length; i++) {
        if (Number(pieces[i]) !== i) {
            return false;
        }
    }
    return true;
}

function checkWin() {
    if (!isSolved()) return;

    // Stop timer
    if (typeof stopTimer === "function") {
        stopTimer();
    } else if (typeof timer !== "undefined") {
        clearInterval(timer);
    }

    // Star calculation
    let currentLevel = typeof level !== "undefined" ? level : 1;
    let currentSecs = typeof seconds !== "undefined" ? seconds : 0;
    let currentMoves = typeof moves !== "undefined" ? moves : 0;
    let stars = 1;

    if (currentLevel <= 30) {
        if (currentSecs <= 30 && currentMoves <= 30) {
            stars = 3;
        } else if (currentSecs <= 60 && currentMoves <= 60) {
            stars = 2;
        }
    }

    let starText = "⭐".repeat(stars);

    // Save level completion & best records
    localStorage.setItem("level" + currentLevel, "completed");

    let prevBestStars = Number(localStorage.getItem("level" + currentLevel + "BestStars")) || 0;
    if (stars > prevBestStars) {
        localStorage.setItem("level" + currentLevel + "BestStars", stars);
    }

    let prevBestTime = Number(localStorage.getItem("level" + currentLevel + "BestTime")) || 0;
    if (prevBestTime === 0 || currentSecs < prevBestTime) {
        localStorage.setItem("level" + currentLevel + "BestTime", currentSecs);
    }

    let prevBestMoves = Number(localStorage.getItem("level" + currentLevel + "BestMoves")) || 0;
    if (prevBestMoves === 0 || currentMoves < prevBestMoves) {
        localStorage.setItem("level" + currentLevel + "BestMoves", currentMoves);
    }

    // Coin rewards (max 15 per level)
    let reward = stars * 5;
    let levelCoins = Number(localStorage.getItem("level" + currentLevel + "Coins")) || 0;
    let remainingCoins = Math.max(0, 15 - levelCoins);
    reward = Math.min(reward, remainingCoins);

    if (reward > 0) {
        localStorage.setItem("level" + currentLevel + "Coins", levelCoins + reward);
        let totalCoins = Number(localStorage.getItem("coins")) || 0;
        localStorage.setItem("coins", totalCoins + reward);
    }

    // Unlock next level
    let unlockedLevel = Number(localStorage.getItem("level")) || 1;
    let maxLevels = (typeof images !== "undefined" && Array.isArray(images)) ? images.length : 60;
    if (currentLevel + 1 > unlockedLevel && currentLevel < maxLevels) {
        localStorage.setItem("level", currentLevel + 1);
    }

    // Play victory audio
    if (typeof playVictorySound === "function") playVictorySound();

    // Trigger Victory Screen Overlay
    if (typeof showVictory === "function") {
        showVictory(starText, reward);
    }
}
