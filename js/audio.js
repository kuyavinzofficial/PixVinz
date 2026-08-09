// ======================================
// PixVinz Audio Manager
// Unified Sound & Music Controller
// ======================================

// User Settings State
let musicEnabled = localStorage.getItem("music") !== "off";
let soundEnabled = localStorage.getItem("sound") !== "off";

// Background Music Objects
const mainMusic = new Audio("sounds/main.mp3");
mainMusic.loop = true;
mainMusic.volume = 0.6;

const bgMusic = new Audio("sounds/bgmusic.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;

// Sound Effects Cache
const soundEffects = {
    click: new Audio("sounds/click.mp3"),
    select: new Audio("sounds/select.mp3"),
    exchange: new Audio("sounds/exchange.mp3"),
    shuffle: new Audio("sounds/shuffle.mp3")
};

// Set default volumes for SFX
Object.values(soundEffects).forEach(sound => {
    sound.volume = 0.7;
});

// ======================================
// MUSIC CONTROLLERS
// ======================================

function startMainMusic() {
    if (!musicEnabled) return;

    bgMusic.pause();
    bgMusic.currentTime = 0;

    if (mainMusic.paused) {
        mainMusic.play().catch(() => {
            // Unlocks audio if blocked by browser autoplay rules
            const unlockAudio = () => {
                if (musicEnabled && mainMusic.paused) {
                    mainMusic.play().catch(() => {});
                }
                document.removeEventListener("click", unlockAudio);
                document.removeEventListener("touchstart", unlockAudio);
            };
            document.addEventListener("click", unlockAudio, { once: true });
            document.addEventListener("touchstart", unlockAudio, { once: true });
        });
    }
}

function stopMainMusic() {
    mainMusic.pause();
    mainMusic.currentTime = 0;
}

function startMusic() {
    if (!musicEnabled) return;

    mainMusic.pause();
    mainMusic.currentTime = 0;

    if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
    }
}

function stopMusic() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
}

function toggleMusic() {
    setMusic(!musicEnabled);
}

function setMusic(enabled) {
    musicEnabled = enabled;
    localStorage.setItem("music", enabled ? "on" : "off");

    if (!enabled) {
        stopMainMusic();
        stopMusic();
    }
}

function setSound(enabled) {
    soundEnabled = enabled;
    localStorage.setItem("sound", enabled ? "on" : "off");
}

// ======================================
// SOUND EFFECT PLAYERS
// ======================================

function playSoundEffect(audioObj) {
    if (!soundEnabled || !audioObj) return;
    audioObj.currentTime = 0;
    audioObj.play().catch(() => {});
}

function playClick() { playSoundEffect(soundEffects.click); }
function playSelect() { playSoundEffect(soundEffects.select); }
function playExchange() { playSoundEffect(soundEffects.exchange); }
function playShuffle() { playSoundEffect(soundEffects.shuffle); }

function playVictory(level) {
    if (!soundEnabled) return;

    const lvl = level || 1;
    const victory = new Audio(`sounds/victory${lvl}.mp3`);
    victory.volume = 1.0; // Clamped to valid maximum limit (0.0 - 1.0)
    
    victory.play().catch(() => {
        // Fallback sound if level-specific sound is missing
        playSoundEffect(soundEffects.select);
    });
}

// Unified dispatcher matching script.js / board.js / victory.js calls
function playSound(type) {
    if (!soundEnabled) return;

    switch (type) {
        case "click": playClick(); break;
        case "select": playSelect(); break;
        case "exchange": playExchange(); break;
        case "shuffle": playShuffle(); break;
        case "win":
        case "victory": playVictory(); break;
        default: break;
    }
}

// ======================================
// EVENT DELEGATION & AUTO INITIALIZATION
// ======================================

document.addEventListener("DOMContentLoaded", function () {
    // Attempt starting background music
    startMainMusic();

    // Event Delegation: Plays click sound for static and dynamically injected buttons
    document.addEventListener("click", function (e) {
        const target = e.target.closest("button, .level-card, .clickable");
        if (target) {
            playClick();
        }
    });
});
