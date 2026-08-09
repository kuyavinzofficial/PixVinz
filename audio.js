// ======================================
// PixVZinz
// AUDIO SYSTEM
// ======================================
//
// MAIN MUSIC
// - main.mp3
//   • Loading / splash
//   • Main menu
//   • Level screens
//
// PUZZLE MUSIC
// - bgmusic.mp3
//   • Puzzle board only
//
// BUTTON
// - click.mp3
//   • All buttons
//
// PUZZLE SOUNDS
// - select.mp3
// - exchange.mp3
// - shuffle.mp3
//
// VICTORY
// - victory1.mp3 → victory10.mp3
//
// ======================================


// ======================================
// MUSIC
// ======================================

const mainMusic =
    new Audio("sound/main.mp3");

const puzzleMusic =
    new Audio("sound/bgmusic.mp3");


// ======================================
// SOUND EFFECTS
// ======================================

const clickSound =
    new Audio("sound/click.mp3");

const selectSound =
    new Audio("sound/select.mp3");

const exchangeSound =
    new Audio("sound/exchange.mp3");

const shuffleSound =
    new Audio("sound/shuffle.mp3");


// ======================================
// VICTORY SOUNDS
// ======================================

const victorySounds = [];

for(let i = 1; i <= 10; i++){

    victorySounds.push(
        new Audio(
            "sound/victory" + i + ".mp3"
        )
    );

}


// ======================================
// VOLUME
// ======================================

mainMusic.volume = 0.45;

puzzleMusic.volume = 0.35;

clickSound.volume = 0.65;

selectSound.volume = 0.60;

exchangeSound.volume = 0.60;

shuffleSound.volume = 0.60;

victorySounds.forEach(function(sound){

    sound.volume = 0.75;

});


// ======================================
// LOOP
// ======================================

mainMusic.loop = true;

puzzleMusic.loop = true;


// ======================================
// PLAY MAIN MUSIC
// ======================================
//
// Used by:
// - Splash
// - Login
// - Main menu
// - Level screens
//
// ======================================

function playMainMusic(){

    // Stop puzzle music

    puzzleMusic.pause();

    puzzleMusic.currentTime = 0;


    // Start main music

    mainMusic.play().catch(function(){

        console.log(
            "PixVZinz: Main music waiting for interaction."
        );

    });

}


// ======================================
// START MUSIC
// ======================================
//
// Compatibility function for existing
// game code.
//
// ======================================

function startMusic(){

    playMainMusic();

}


// ======================================
// STOP MAIN MUSIC
// ======================================

function stopMainMusic(){

    mainMusic.pause();

    mainMusic.currentTime = 0;

}


// ======================================
// PLAY PUZZLE MUSIC
// ======================================
//
// Used only while the puzzle board
// is active.
//
// ======================================

function playPuzzleMusic(){

    // Stop main music

    mainMusic.pause();

    mainMusic.currentTime = 0;


    // Start puzzle music

    puzzleMusic.play().catch(function(){

        console.log(
            "PixVZinz: Puzzle music waiting for interaction."
        );

    });

}


// ======================================
// STOP PUZZLE MUSIC
// ======================================

function stopPuzzleMusic(){

    puzzleMusic.pause();

    puzzleMusic.currentTime = 0;

}


// ======================================
// BUTTON CLICK
// ======================================

function playClick(){

    clickSound.currentTime = 0;

    clickSound.play().catch(function(){

        console.log(
            "PixVZinz: Click sound blocked."
        );

    });

}


// ======================================
// TILE SELECT
// ======================================

function playSelect(){

    selectSound.currentTime = 0;

    selectSound.play().catch(function(){

        console.log(
            "PixVZinz: Select sound blocked."
        );

    });

}


// ======================================
// TILE EXCHANGE
// ======================================

function playExchange(){

    exchangeSound.currentTime = 0;

    exchangeSound.play().catch(function(){

        console.log(
            "PixVZinz: Exchange sound blocked."
        );

    });

}


// ======================================
// PUZZLE SHUFFLE
// ======================================

function playShuffle(){

    shuffleSound.currentTime = 0;

    shuffleSound.play().catch(function(){

        console.log(
            "PixVZinz: Shuffle sound blocked."
        );

    });

}


// ======================================
// VICTORY SOUND
// ======================================
//
// Level 1  → victory1.mp3
// Level 2  → victory2.mp3
// ...
// Level 10 → victory10.mp3
// Level 11 → victory1.mp3
// ...
//
// ======================================

function playVictory(levelNumber){

    // Safety

    if(
        typeof levelNumber !== "number" ||
        levelNumber < 1
    ){

        levelNumber = 1;

    }


    // Convert level to 0-9

    const index =
        (levelNumber - 1) % 10;


    const victorySound =
        victorySounds[index];


    if(!victorySound){

        return;

    }


    // Stop puzzle music

    puzzleMusic.pause();

    puzzleMusic.currentTime = 0;


    // Stop any previous victory sound

    stopVictorySounds();


    // Reset selected victory sound

    victorySound.currentTime = 0;


    // Play victory sound

    victorySound.play().catch(function(){

        console.log(
            "PixVZinz: Victory sound waiting for interaction."
        );

    });

}


// ======================================
// COMPATIBILITY ALIAS
// ======================================
//
// Keeps compatibility with any code
// that may still call playVictorySound().
//
// ======================================

function playVictorySound(levelNumber){

    playVictory(levelNumber);

}


// ======================================
// STOP ALL VICTORY SOUNDS
// ======================================

function stopVictorySounds(){

    victorySounds.forEach(function(sound){

        sound.pause();

        sound.currentTime = 0;

    });

}


// ======================================
// STOP ALL AUDIO
// ======================================

function stopAllAudio(){

    // Main music

    mainMusic.pause();

    mainMusic.currentTime = 0;


    // Puzzle music

    puzzleMusic.pause();

    puzzleMusic.currentTime = 0;


    // Victory sounds

    stopVictorySounds();

}


// ======================================
// AUTOMATIC BUTTON SOUND
// ======================================
//
// Every button automatically plays
// click.mp3.
//
// Therefore individual button
// handlers do NOT need to call
// playClick() themselves.
//
// ======================================

document.addEventListener(
    "click",
    function(event){

        const button =
            event.target.closest("button");


        if(!button){

            return;

        }


        playClick();

    }
);


// ======================================
// INITIAL STATE
// ======================================

stopAllAudio();


// ======================================
// END OF AUDIO SYSTEM
// ======================================

