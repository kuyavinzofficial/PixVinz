// ======================================
// PuzzleMania
// GAME CONTROL SYSTEM
// ======================================

// Global Game Control State
if (typeof selectedPiece === "undefined") var selectedPiece = null;
if (typeof moves === "undefined") var moves = 0;

// ======================================
// PixVZinz ONE-TIME COIN MIGRATION
// ======================================

function migrateOldCoins() {
    if (localStorage.getItem("pixVZinzCoinMigration") === "done") return;

    let correctedCoins = 0;
    const maxLevels = (typeof images !== "undefined" && Array.isArray(images)) ? images.length : 60;

    for (let i = 1; i <= maxLevels; i++) {
        if (localStorage.getItem("level" + i) !== "completed") continue;

        let stars = Number(localStorage.getItem("level" + i + "BestStars")) || 0;

        if (stars >= 3) correctedCoins += 15;
        else if (stars === 2) correctedCoins += 10;
        else if (stars === 1) correctedCoins += 5;
    }

    localStorage.setItem("coins", correctedCoins);
    localStorage.setItem("pixVZinzCoinMigration", "done");
}

// Run migration safely on boot
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", migrateOldCoins);
} else {
    migrateOldCoins();
}

// ======================================
// UTILITY & STUB HANDLERS
// ======================================

function checkMove() {
    // Reserved for move validation logic
    return;
}
