// ======================================
// PuzzleMania
// HELPER FUNCTIONS & CONTROLS
// ======================================

// Prevent Accidental Double Taps
let inputLocked = false;

function lockInput(duration = 200) {
    inputLocked = true;
    setTimeout(() => {
        inputLocked = false;
    }, duration);
}

// Safe Debounced Select Wrapper
function safeSelectPiece(index) {
    if (inputLocked) return;
    lockInput(200);

    if (typeof selectPiece === "function") {
        selectPiece(index);
    }
}

// Monkey-patch selectPiece safely if already initialized
if (typeof selectPiece === "function") {
    const originalSelectPiece = selectPiece;
    window.selectPiece = function (index) {
        if (inputLocked) return;
        lockInput(200);
        originalSelectPiece(index);
    };
}

// ======================================
// KEYBOARD SHORTCUTS
// ======================================

document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();

    switch (key) {
        case "r":
            if (typeof restartLevel === "function") restartLevel();
            break;

        case "s":
            if (typeof shufflePuzzle === "function") shufflePuzzle();
            break;

        case "escape":
            const victoryScreenEl = document.getElementById("victoryScreen");
            if (victoryScreenEl) {
                victoryScreenEl.classList.add("hidden");
            }
            break;

        default:
            break;
    }
});

// ======================================
// TOUCH & SWIPE EVENT TRACKING
// ======================================

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", function (e) {
    if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }
});

document.addEventListener("touchend", function (e) {
    if (e.changedTouches.length > 0) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = endX - touchStartX;
        const diffY = endY - touchStartY;

        // Reserved for future swipe gesture interactions
    }
});
