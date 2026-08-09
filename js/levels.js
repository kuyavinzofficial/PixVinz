// ======================================
// PuzzleMania
// LEVEL CONFIGURATION & PROGRESSION
// ======================================

// Dynamic 60-Level Image Registry (.jpeg)
var images = Array.from({ length: 60 }, (_, i) => `images/level${i + 1}.jpeg`);

// Safe Level Index Retrieval
var level = Number(localStorage.getItem("level")) || 1;

// Validate Level Bounds
if (level < 1) level = 1;
if (level > images.length) level = images.length;
localStorage.setItem("level", level);

// ======================================
// GRID DIFFICULTY PROPORTIONS
// ======================================

function getGridSize(lvl) {
    if (lvl <= 10) return 3;      // Levels 1-10: 3x3
    if (lvl <= 20) return 4;      // Levels 11-20: 4x4
    if (lvl <= 35) return 5;      // Levels 21-35: 5x5
    if (lvl <= 50) return 6;      // Levels 36-50: 6x6
    return 7;                     // Levels 51-60: 7x7
}

var size = getGridSize(level);

// ======================================
// HELPERS & NAVIGATION
// ======================================

function getCurrentImage() {
    const index = level - 1;
    return images[index] ? images[index] : images[0];
}

function nextLevel() {
    if (level < images.length) {
        level++;
        localStorage.setItem("level", level);
        location.reload();
    } else {
        window.location.href = "index.html";
    }
}

function resetLevel() {
    level = 1;
    localStorage.setItem("level", level);
    location.reload();
}
