

// ------------------------------
// Total Levels
// ------------------------------

const totalLevels = 20;

// ------------------------------
// Main Menu
// ------------------------------

function startGame() {

    playClick();

    let nextLevel = 1;

    // Find the highest unlocked level
    for (let i = 1; i <= totalLevels; i++) {

        if (localStorage.getItem("level" + i) === "completed") {

            nextLevel = i + 1;

        }

    }

    if (nextLevel > totalLevels) {

        nextLevel = totalLevels;

    }

    localStorage.setItem("level", nextLevel);

    window.location.href = "game.html";

}

// ------------------------------
// Open Levels
// ------------------------------

function openLevels() {

    playClick();

    window.location.href = "levels.html";

}

// ------------------------------
// Back Home
// ------------------------------

function backHome() {

    playClick();

    window.location.href = "index.html";

}

// ------------------------------
// Play Selected Level
// ------------------------------

function playLevel(level) {

    localStorage.setItem("level", level);

    window.location.href = "game.html";

}
// ======================================
// Load Levels
// ======================================

function loadLevels() {

    const container = document.getElementById("levelContainer");

    if (!container) return;

    container.innerHTML = "";

    // ----------------------------
    // Coins
    // ----------------------------

    const coins = Number(localStorage.getItem("coins")) || 0;

    const coinsLabel = document.getElementById("coins");

    if (coinsLabel) {

        coinsLabel.textContent = coins;

    }

    // ----------------------------
    // Create Level Cards
    // ----------------------------

    for (let i = 1; i <= totalLevels; i++) {

        const button = document.createElement("button");

        button.className = "level-card";

        const completed =
            localStorage.getItem("level" + i) === "completed";

        const unlocked =
            i === 1 ||
            localStorage.getItem("level" + (i - 1)) === "completed";

        // ----------------------------
        // Completed Level
        // ----------------------------

        if (completed) {

            button.classList.add("completed");

            const bestTime =
                localStorage.getItem("level" + i + "BestTime") || "--";

            const bestMoves =
                localStorage.getItem("level" + i + "BestMoves") || "--";

            const starValue =
                Number(localStorage.getItem("level" + i + "BestStars")) || 0;

            let stars = "";

            switch (starValue) {

                case 3:
                    stars = "⭐⭐⭐";
                    break;

                case 2:
                    stars = "⭐⭐";
                    break;

                case 1:
                    stars = "⭐";
                    break;

                default:
                    stars = "⭐";
                    break;

            }

            button.innerHTML =
                "<strong>⭐ Level " + i + "</strong><br>" +
                stars + "<br>" +
                "⏱ " + bestTime + "s<br>" +
                "🔄 " + bestMoves + " Moves";

            button.onclick = function () {

                playClick();

                playLevel(i);

            };

        }

        // ----------------------------
        // Unlocked but not completed
        // ----------------------------

        else if (unlocked) {

            button.classList.add("unlocked");

            button.innerHTML =
                "<strong>Level " + i + "</strong><br>" +
                "▶ Play";

            button.onclick = function () {

                playClick();

                playLevel(i);

            };

        }

        // ----------------------------
        // Locked
        // ----------------------------

        else {

            button.classList.add("locked");

            button.innerHTML =
                "🔒<br>Level " + i;

        }

        container.appendChild(button);

    }

}
// ======================================
// Auto Load
// ======================================

window.addEventListener("DOMContentLoaded", function () {

    // Automatically load the level cards
    if (window.location.pathname.includes("levels")) {

        loadLevels();

    }

    // Update coins on any page that has a coins label
    const coinsLabel = document.getElementById("coins");

    if (coinsLabel) {

        coinsLabel.textContent =
            Number(localStorage.getItem("coins")) || 0;

    }

});
function resetProgress() {

    const answer = confirm(
        "Reset all game progress?\n\n" +
        "This will erase:\n\n" +
        "• All unlocked levels\n" +
        "• Coins\n" +
        "• Completed levels\n" +
        "• Best Times\n" +
        "• Best Moves\n" +
        "• Best Stars\n\n" +
        "This cannot be undone."
    );

    if (!answer) return;

    // Clear everything
    localStorage.clear();

    // Restore default settings
    localStorage.setItem("level", 1);
    localStorage.setItem("coins", 0);

    alert("Progress has been reset!");

    window.location.href = "index.html";

        }
