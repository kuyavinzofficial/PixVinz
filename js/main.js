// ======================================
// PuzzleMania
// MAIN GAME STARTUP & INITIALIZATION
// ======================================

document.addEventListener("DOMContentLoaded", function () {
    // ------------------------------
    // DOM Element Selections
    // ------------------------------
    const victoryScreen = document.getElementById("victoryScreen");
    const nextBtn = document.getElementById("nextBtn");
    const retryBtn = document.getElementById("retryBtn");
    const homeBtn = document.getElementById("homeBtn");

    // Hide Victory Screen on Initial Load
    if (victoryScreen) {
        victoryScreen.classList.add("hidden");
    }

    // ------------------------------
    // NEXT LEVEL BUTTON
    // ------------------------------
    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            if (typeof playClick === "function") playClick();
            else if (typeof playSound === "function") playSound("click");

            const currentLevel = Number(localStorage.getItem("level")) || 1;
            const next = currentLevel + 1;
            const maxLevels = (typeof images !== "undefined" && Array.isArray(images)) ? images.length : 60;

            if (next <= maxLevels) {
                localStorage.setItem("level", next);
                location.reload();
            } else {
                if (typeof backHome === "function") {
                    backHome();
                } else {
                    window.location.href = "index.html";
                }
            }
        });
    }

    // ------------------------------
    // RETRY BUTTON
    // ------------------------------
    if (retryBtn) {
        retryBtn.addEventListener("click", function () {
            if (typeof playClick === "function") playClick();
            else if (typeof playSound === "function") playSound("click");

            if (typeof restartLevel === "function") {
                restartLevel();
            }
        });
    }

    // ------------------------------
    // HOME BUTTON
    // ------------------------------
    if (homeBtn) {
        homeBtn.addEventListener("click", function () {
            if (typeof playClick === "function") playClick();
            else if (typeof playSound === "function") playSound("click");

            if (typeof backHome === "function") {
                backHome();
            } else {
                window.location.href = "index.html";
            }
        });
    }

    // ------------------------------
    // START PUZZLE & AUDIO
    // ------------------------------
    if (typeof setup === "function") {
        setup();
    } else if (typeof initGame === "function") {
        initGame();
    }

    if (typeof startMusic === "function") {
        startMusic();
    }
});
