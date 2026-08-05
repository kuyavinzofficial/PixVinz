// ==============================
// PuzzleMania Audio Manager
// ==============================
// ==============================
// User Audio Settings
// ==============================

let musicEnabled =
    localStorage.getItem("music") !== "off";

let soundEnabled =
    localStorage.getItem("sound") !== "off";
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

    if(!musicEnabled) return;

    bgMusic.play().catch(() => {});

}

function stopMusic() {
    bgMusic.pause();
}

function toggleMusic(){

    musicEnabled = !musicEnabled;

    localStorage.setItem(
        "music",
        musicEnabled ? "on" : "off"
    );

    if(musicEnabled){

        startMusic();

    }

    else{

        stopMusic();

    }

}

// ---------------------------
// Sound Effects
// ---------------------------

function playClick(){

    if(!soundEnabled) return;

    clickSound.currentTime = 0;

    clickSound.play();

}
function playSelect(){

    if(!soundEnabled) return;

    selectSound.currentTime = 0;
    selectSound.play();

}

function playExchange(){

    if(!soundEnabled) return;

    exchangeSound.currentTime = 0;
    exchangeSound.play();

}

function playShuffle(){

    if(!soundEnabled) return;

    shuffleSound.currentTime = 0;
    shuffleSound.play();

}

function playVictory(level){

    if(!soundEnabled) return;

    const victory = new Audio("sounds/victory" + level + ".mp3");

    victory.volume = 0.8;

    victory.play();

}
function setMusic(enabled){

    musicEnabled = enabled;

    localStorage.setItem(
        "music",
        enabled ? "on" : "off"
    );

    if(enabled){

        startMusic();

    }

    else{

        stopMusic();

    }

}

function setSound(enabled){

    soundEnabled = enabled;

    localStorage.setItem(
        "sound",
        enabled ? "on" : "off"
    );

}
