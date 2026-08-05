// ==============================
// PuzzleMania Audio Manager
// ==============================

// Background Music
const bgMusic = new Audio("sounds/bgmusic.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;

// Sound Effects
const clickSound = new Audio("sounds/click.mp3");
clickSound.volume = 0.7;

const selectSound = new Audio("sounds/select.mp3");
selectSound.volume = 0.7;

const exchangeSound = new Audio("sounds/exchange.mp3");
exchangeSound.volume = 0.7;

const shuffleSound = new Audio("sounds/shuffle.mp3");
shuffleSound.volume = 0.7;

// ---------------------------
// Background Music
// ---------------------------

function startMusic() {
    bgMusic.play().catch(() => {});
}

function stopMusic() {
    bgMusic.pause();
}

function toggleMusic() {
    if (bgMusic.paused) {
        startMusic();
    } else {
        stopMusic();
    }
}

// ---------------------------
// Sound Effects
// ---------------------------

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function playSelect() {
    selectSound.currentTime = 0;
    selectSound.play();
}

function playExchange() {
    exchangeSound.currentTime = 0;
    exchangeSound.play();
}

function playShuffle() {
    shuffleSound.currentTime = 0;
    shuffleSound.play();
}

function playVictory(level) {
    const victory = new Audio("sounds/victory" + level + ".mp3");
    victory.volume = 0.8;
    victory.play();
}
