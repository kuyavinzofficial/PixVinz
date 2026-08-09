// ======================================
// PuzzleMania
// VICTORY SYSTEM
// ======================================

// ======================================
// VICTORY SCREEN
// ======================================

function showVictory(stars, reward) {
    const victoryScreen = document.getElementById("victoryScreen");
    if (!victoryScreen) return;

    // Play Victory Sound Effect
    if (typeof playSound === "function") {
        playSound("win");
    }

    // DOM References
    const finalTime = document.getElementById("finalTime");
    const finalMoves = document.getElementById("finalMoves");
    const rewardCoins = document.getElementById("rewardCoins");
    const starsDisplay = document.getElementById("starsDisplay");
    const completedImage = document.getElementById("completedImage");

    if (finalTime) finalTime.textContent = (typeof seconds !== "undefined" ? seconds : 0) + "s";
    if (finalMoves) finalMoves.textContent = typeof moves !== "undefined" ? moves : 0;
    if (rewardCoins) rewardCoins.textContent = reward;
    if (starsDisplay) starsDisplay.textContent = stars;

    // Show Completed Image Preview
    if (completedImage) {
        const imgSrc = (typeof images !== "undefined" && images[level - 1])
            ? images[level - 1]
            : `images/level${level}.jpg`;
        completedImage.src = imgSrc;
    }

    // Best Record Section Setup
    let victoryBox = document.querySelector(".victory-box");
    let bestRecord = document.getElementById("bestRecord");

    if (!bestRecord && victoryBox) {
        bestRecord = document.createElement("div");
        bestRecord.id = "bestRecord";
        victoryBox.appendChild(bestRecord);
    }

    if (bestRecord) {
        const currentLevel = typeof level !== "undefined" ? level : 1;
        const bestTime = localStorage.getItem("level" + currentLevel + "BestTime") || "--";
        const bestMoves = localStorage.getItem("level" + currentLevel + "BestMoves") || "--";
        const bestStars = Number(localStorage.getItem("level" + currentLevel + "BestStars")) || 1;

        let bestStarText = "⭐";
        if (bestStars === 2) bestStarText = "⭐⭐";
        if (bestStars === 3) bestStarText = "⭐⭐⭐";

        bestRecord.innerHTML = `
            <h3>🏆 Best Record</h3>
            <p>${bestStarText}</p>
            <p>⏱ ${bestTime}s</p>
            <p>🔄 ${bestMoves} moves</p>
        `;
    }

    victoryScreen.classList.remove("hidden");
}

// ======================================
// BACK TO HOME
// ======================================

function backHome() {
    if (typeof playClick === "function") {
        playClick();
    }
    window.location.href = "index.html";
}

// ======================================
// RESTART CURRENT LEVEL
// ======================================

function restartLevel() {
    const victoryScreen = document.getElementById("victoryScreen");
    if (victoryScreen) {
        victoryScreen.classList.add("hidden");
    }

    if (typeof timer !== "undefined") {
        clearInterval(timer);
    }

    if (typeof shufflePuzzle === "function") {
        shufflePuzzle();
    } else if (typeof drawPuzzle === "function") {
        drawPuzzle();
    }
}
