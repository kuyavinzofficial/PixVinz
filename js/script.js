// ======================================
// PuzzleMania Script v2.1
// Level System + Records
// ======================================

const totalLevels = 60;

// Fallback Sound Helper
function playClick() {
    if (typeof playSound === "function") {
        playSound("click");
    }
}

// User Helper
function getCurrentUser() {
    const username = localStorage.getItem("currentUser");
    if (!username) return null;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(u => u.username === username) || null;
}

// ==============================
// Main Menu & Navigation
// ==============================

function startGame() {
    playClick();
    let nextLevel = 1;

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

function openLevels() {
    playClick();
    window.location.href = "levels.html";
}

function backHome() {
    playClick();
    window.location.href = "index.html";
}

function playLevel(level) {
    playClick();
    localStorage.setItem("level", level);
    window.location.href = "game.html";
}

// ==============================
// Load Levels
// ==============================

function loadLevels() {
    const container = document.getElementById("levelContainer");
    if (!container) return;

    container.innerHTML = "";

    const coins = Number(localStorage.getItem("coins")) || 0;
    const coinDisplay = document.getElementById("coins");
    if (coinDisplay) {
        coinDisplay.textContent = coins;
    }

    for (let i = 1; i <= totalLevels; i++) {
        const button = document.createElement("button");
        button.className = "level-card";

        const completed = localStorage.getItem("level" + i) === "completed";
        const unlocked = i === 1 || localStorage.getItem("level" + (i - 1)) === "completed";
        const bestTime = localStorage.getItem("level" + i + "BestTime") || "--";
        const bestMoves = localStorage.getItem("level" + i + "BestMoves") || "--";
        const bestStars = Number(localStorage.getItem("level" + i + "BestStars")) || 0;

        let stars = "";
        if (bestStars === 3) stars = "⭐⭐⭐";
        else if (bestStars === 2) stars = "⭐⭐";
        else if (bestStars === 1) stars = "⭐";

        if (completed) {
            button.classList.add("completed");
            button.innerHTML = `
                ⭐ Level ${i}<br>
                ${stars}<br>
                ⏱ ${bestTime}s<br>
                🔄 ${bestMoves} Moves
            `;
            button.onclick = () => playLevel(i);
        } else if (unlocked) {
            button.classList.add("unlocked");
            button.innerHTML = `
                Level ${i}<br>
                ▶ Play
            `;
            button.onclick = () => playLevel(i);
        } else {
            button.classList.add("locked");
            button.innerHTML = `
                🔒<br>
                Level ${i}
            `;
        }

        container.appendChild(button);
    }
}

// ==============================
// Progress Management
// ==============================

function resetProgress() {
    const answer = confirm(
        "Reset all progress?\n\n" +
        "This removes:\n" +
        "• Levels\n" +
        "• Coins\n" +
        "• Records\n" +
        "• Stars"
    );

    if (!answer) return;

    localStorage.clear();
    localStorage.setItem("level", 1);
    localStorage.setItem("coins", 0);

    alert("Progress Reset!");
    window.location.href = "index.html";
}

// ======================================
// Settings System
// ======================================

function openSettings() {
    const popup = document.getElementById("settingsPopup");
    if (!popup) return;
    popup.style.display = "flex";
    loadSettings();
}

function closeSettings() {
    const popup = document.getElementById("settingsPopup");
    if (!popup) return;
    popup.style.display = "none";
}

function loadSettings() {
    const music = document.getElementById("musicToggle");
    const sound = document.getElementById("soundToggle");
    const animation = document.getElementById("animationToggle");

    if (music) music.checked = localStorage.getItem("music") !== "off";
    if (sound) sound.checked = localStorage.getItem("sound") !== "off";
    if (animation) animation.checked = localStorage.getItem("animation") !== "off";
}

document.addEventListener("change", function (e) {
    if (e.target.id === "musicToggle") {
        localStorage.setItem("music", e.target.checked ? "on" : "off");
    }
    if (e.target.id === "soundToggle") {
        localStorage.setItem("sound", e.target.checked ? "on" : "off");
    }
    if (e.target.id === "animationToggle") {
        localStorage.setItem("animation", e.target.checked ? "on" : "off");
    }
});

// ======================================
// About Modal
// ======================================

function showAbout() {
    if (document.getElementById("aboutBox")) return;

    const aboutBox = document.createElement("div");
    aboutBox.id = "aboutBox";
    aboutBox.innerHTML = `
        <div class="about-content">
            <button class="about-close" onclick="closeAbout()">×</button>
            <video class="about-logo" autoplay muted loop playsinline>
                <source src="images/logo.webm" type="video/webm">
            </video>
            <p>Version 2.0</p>
            <p>Developer:<br>Kuya Vinz Official</p>
            <p>Made with HTML, CSS & JavaScript</p>
            <p>© 2026</p>
        </div>
    `;

    document.body.appendChild(aboutBox);

    const logo = aboutBox.querySelector(".about-logo");
    if (logo) {
        logo.play().catch(() => {});
    }
}

function closeAbout() {
    const aboutBox = document.getElementById("aboutBox");
    if (aboutBox) {
        aboutBox.remove();
    }
}

// ======================================
// Authentication & Profile Setup
// ======================================

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    }
}

// DOM Initialization
window.addEventListener("DOMContentLoaded", function () {
    // Check level page initialization
    if (window.location.pathname.includes("levels")) {
        loadLevels();
    }

    // Display coin count
    const coinsDisplay = document.getElementById("coins");
    if (coinsDisplay) {
        coinsDisplay.textContent = Number(localStorage.getItem("coins")) || 0;
    }

    // Auth & Profile Verification
    const isLoginPage = window.location.pathname.includes("login");
    const user = getCurrentUser();

    if (!user && !isLoginPage) {
        window.location.href = "login.html";
        return;
    }

    if (user) {
        const welcome = document.getElementById("welcomeText");
        const usernameDisplay = document.getElementById("usernameDisplay");

        if (welcome) {
            welcome.textContent = "Welcome, " + (user.displayName || user.username) + "!";
        }
        if (usernameDisplay) {
            usernameDisplay.textContent = "@" + user.username;
        }
    }
});
