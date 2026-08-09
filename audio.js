// ==============================
// PixVinz Audio Manager
// ==============================


// ==============================
// User Audio Settings
// ==============================

let musicEnabled =
    localStorage.getItem("music") !== "off";

let soundEnabled =
    localStorage.getItem("sound") !== "off";


// ==============================
// MAIN BACKGROUND MUSIC
// ==============================
// Used on:
// - Loading page
// - Main menu
// - Level selection
//
// File:
// sounds/main.mp3
// ==============================

const mainMusic =
    new Audio("sounds/main.mp3");

mainMusic.loop = true;

mainMusic.volume = 0.3;


// ==============================
// PUZZLE BOARD MUSIC
// ==============================
// Used only while playing
// the actual puzzle.
//
// File:
// sounds/bgmusic.mp3
// ==============================

const bgMusic =
    new Audio("sounds/bgmusic.mp3");

bgMusic.loop = true;

bgMusic.volume = 0.3;


// ==============================
// SOUND EFFECTS
// ==============================

const clickSound =
    new Audio("sounds/click.mp3");

clickSound.volume = 0.7;


const selectSound =
    new Audio("sounds/select.mp3");

selectSound.volume = 0.7;


const exchangeSound =
    new Audio("sounds/exchange.mp3");

exchangeSound.volume = 0.7;


const shuffleSound =
    new Audio("sounds/shuffle.mp3");

shuffleSound.volume = 0.7;


// ==============================
// MAIN MUSIC
// ==============================

function startMainMusic(){

    if(!musicEnabled) return;


    // Stop puzzle music

    bgMusic.pause();

    bgMusic.currentTime = 0;


    // Start main menu music

    if(mainMusic.paused){

        mainMusic.play().catch(() => {});

    }

}


function stopMainMusic(){

    mainMusic.pause();

    mainMusic.currentTime = 0;

}
// ======================================
// AUTO START MAIN MUSIC
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        startMainMusic();

    }
);

// ==============================
// PUZZLE MUSIC
// ==============================

function startMusic(){

    if(!musicEnabled) return;

    // Stop main menu music

    mainMusic.pause();

    mainMusic.currentTime = 0;


    // Start puzzle music

    bgMusic.play().catch(() => {});

}


function stopMusic(){

    bgMusic.pause();

    bgMusic.currentTime = 0;

}


// ==============================
// MUSIC TOGGLE
// ==============================

function toggleMusic(){

    musicEnabled = !musicEnabled;


    localStorage.setItem(
        "music",
        musicEnabled ? "on" : "off"
    );


    if(!musicEnabled){

        stopMainMusic();

        stopMusic();

    }

}


// ==============================
// SOUND EFFECTS
// ==============================

function playClick(){

    if(!soundEnabled) return;


    clickSound.currentTime = 0;

    clickSound.play().catch(() => {});

}


function playSelect(){

    if(!soundEnabled) return;


    selectSound.currentTime = 0;

    selectSound.play().catch(() => {});

}


function playExchange(){

    if(!soundEnabled) return;


    exchangeSound.currentTime = 0;

    exchangeSound.play().catch(() => {});

}


function playShuffle(){

    if(!soundEnabled) return;


    shuffleSound.currentTime = 0;

    shuffleSound.play().catch(() => {});

}


function playVictory(level){

    if(!soundEnabled) return;


    const victory =
        new Audio(
            "sounds/victory" +
            level +
            ".mp3"
        );


    victory.volume = 0.8;


    victory.play().catch(() => {});

}


// ==============================
// SETTINGS
// ==============================

function setMusic(enabled){

    musicEnabled = enabled;


    localStorage.setItem(
        "music",
        enabled ? "on" : "off"
    );


    if(!enabled){

        stopMainMusic();

        stopMusic();

    }

}


// ==============================
// SET SOUND
// ==============================

function setSound(enabled){

    soundEnabled = enabled;


    localStorage.setItem(
        "sound",
        enabled ? "on" : "off"
    );

}


// ==============================
// AUTO CLICK SOUNDS
// ==============================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ------------------------------
        // All buttons
        // ------------------------------

        document
        .querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "click",
                playClick
            );

        });


        // ------------------------------
        // Level cards
        // ------------------------------

        document
        .querySelectorAll(".level-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                playClick
            );

        });


    }
);
