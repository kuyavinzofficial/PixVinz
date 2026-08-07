// ======================================
// PuzzleMania
// GAME DATA
// ======================================

// ------------------------------
// CURRENT LEVEL
// ------------------------------

let level =
    Number(localStorage.getItem("level")) || 1;


// ------------------------------
// DIFFICULTY
// ------------------------------

let size;

if(level <= 10){

    size = 3;

}
else if(level <= 20){

    size = 4;

}
else if(level <= 35){

    size = 5;

}
else if(level <= 50){

    size = 6;

}
else{

    size = 7;

}


// ------------------------------
// LEVEL IMAGES
// ------------------------------

const images = [

    "images/level1.jpeg",
    "images/level2.jpeg",
    "images/level3.jpeg",
    "images/level4.jpeg",
    "images/level5.jpeg",

    "images/level6.jpeg",
    "images/level7.jpeg",
    "images/level8.jpeg",
    "images/level9.jpeg",
    "images/level10.jpeg",

    "images/level11.jpeg",
    "images/level12.jpeg",
    "images/level13.jpeg",
    "images/level14.jpeg",
    "images/level15.jpeg",

    "images/level16.jpeg",
    "images/level17.jpeg",
    "images/level18.jpeg",
    "images/level19.jpeg",
    "images/level20.jpeg",

    "images/level21.jpeg",
    "images/level22.jpeg",
    "images/level23.jpeg",
    "images/level24.jpeg",
    "images/level25.jpeg",

    "images/level26.jpeg",
    "images/level27.jpeg",
    "images/level28.jpeg",
    "images/level29.jpeg",
    "images/level30.jpeg",

    "images/level31.jpeg",
    "images/level32.jpeg",
    "images/level33.jpeg",
    "images/level34.jpeg",
    "images/level35.jpeg",

    "images/level36.jpeg",
    "images/level37.jpeg",
    "images/level38.jpeg",
    "images/level39.jpeg",
    "images/level40.jpeg",

    "images/level41.jpeg",
    "images/level42.jpeg",
    "images/level43.jpeg",
    "images/level44.jpeg",
    "images/level45.jpeg",

    "images/level46.jpeg",
    "images/level47.jpeg",
    "images/level48.jpeg",
    "images/level49.jpeg",
    "images/level50.jpeg",

    "images/level51.jpeg",
    "images/level52.jpeg",
    "images/level53.jpeg",
    "images/level54.jpeg",
    "images/level55.jpeg",

    "images/level56.jpeg",
    "images/level57.jpeg",
    "images/level58.jpeg",
    "images/level59.jpeg",
    "images/level60.jpeg"

];


// ------------------------------
// GAME VARIABLES
// ------------------------------

let pieces = [];

let moves = 0;

let seconds = 0;

let timer = null;

let selectedPiece = null;


// ------------------------------
// VICTORY ELEMENTS
// ------------------------------

let victoryScreen;

let finalTime;

let finalMoves;

let rewardCoins;

let starsDisplay;

let completedImage;

let nextBtn;

let retryBtn;

let homeBtn;
