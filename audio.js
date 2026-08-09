// ======================================
// PixVZinz
// AUDIO SYSTEM
// ======================================
//
// Handles:
//
// MAIN MUSIC
// - main.mp3
//   • Loading / splash screen
//   • Main menu
//   • Levels screen
//
// PUZZLE MUSIC
// - bgmusic.mp3
//   • Puzzle board / game screen
//
// BUTTON
// - click.mp3
//   • All buttons
//
// PUZZLE SOUNDS
// - select.mp3
//   • Selecting a puzzle tile
//
// - exchange.mp3
//   • Exchanging two puzzle tiles
//
// - shuffle.mp3
//   • Shuffling the puzzle
//
// VICTORY
// - victory1.mp3 → victory10.mp3
//   • Victory sounds cycle every 10 levels
//
// Example:
//
// Level 1  → victory1.mp3
// Level 2  → victory2.mp3
// ...
// Level 10 → victory10.mp3
// Level 11 → victory1.mp3
// Level 12 → victory2.mp3
//
// Level 20 → victory10.mp3
// Level 21 → victory1.mp3
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
// VOLUME SETTINGS
// ======================================

mainMusic.volume = 0.45;

puzzleMusic.volume = 0.35;

clickSound.volume = 0.65;

selectSound.volume = 0.60;

exchangeSound.volume = 0.60;

shuffleSound.volume = 0.60;


// Victory volume

victorySounds.forEach(
    function(sound){

        sound.volume = 0.75;

    }
);


// ======================================
// LOOP SETTINGS
// ======================================

// Main music loops continuously
// on splash/menu/levels.

mainMusic.loop = true;


// Puzzle music loops continuously
// during every puzzle.

puzzleMusic.loop = true;


// ======================================
// PLAY MAIN MUSIC
// ======================================
//
// Used by:
// - Splash/loading
// - Main menu
// - Levels
//
// ======================================

function playMainMusic(){

    // Stop puzzle music

    puzzleMusic.pause();

    puzzleMusic.currentTime = 0;


    // Start main music

    mainMusic.play().catch(
        function(){

            console.log(
                "PixVZinz: Main music waiting for interaction."
            );

        }
    );

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
// Used only on game.html.
//
// ======================================

function playPuzzleMusic(){

    // Stop main music

    mainMusic.pause();

    mainMusic.currentTime = 0;


    // Start puzzle music

    puzzleMusic.play().catch(
        function(){

            console.log(
                "PixVZinz: Puzzle music waiting for interaction."
            );

        }
    );

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
//
// Used for every button.
//
// ======================================

function playClick(){

    clickSound.currentTime = 0;

    clickSound.play().catch(
        function(){

            console.log(
                "PixVZinz: Click sound blocked."
            );

        }
    );

}


// ======================================
// TILE SELECT
// ======================================
//
// Used when the player selects
// a puzzle tile.
//
// ======================================

function playSelect(){

    selectSound.currentTime = 0;

    selectSound.play().catch(
        function(){

            console.log(
                "PixVZinz: Select sound blocked."
            );

        }
    );

}


// ======================================
// TILE EXCHANGE
// ======================================
//
// Used when two puzzle tiles
// exchange positions.
//
// ======================================

function playExchange(){

    exchangeSound.currentTime = 0;

    exchangeSound.play().catch(
        function(){

            console.log(
                "PixVZinz: Exchange sound blocked."
            );

        }
    );

}


// ======================================
// PUZZLE SHUFFLE
// ======================================
//
// Used whenever a puzzle is shuffled.
//
// ======================================

function playShuffle(){

    shuffleSound.currentTime = 0;

    shuffleSound.play().catch(
        function(){

            console.log(
                "PixVZinz: Shuffle sound blocked."
            );

        }
    );

}


// ======================================
// VICTORY SOUND
// ======================================
//
// Cycles through victory1.mp3
// through victory10.mp3.
//
// The cycle repeats forever.
//
// ======================================

function playVictorySound(levelNumber){

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


    // Stop puzzle background music

    puzzleMusic.pause();


    // Reset victory sound

    victorySound.currentTime = 0;


    // Play victory sound

    victorySound.play().catch(
        function(){

            console.log(
                "PixVZinz: Victory sound waiting for interaction."
            );

        }
    );

}


// ======================================
// STOP ALL VICTORY SOUNDS
// ======================================

function stopVictorySounds(){

    victorySounds.forEach(
        function(sound){

            sound.pause();

            sound.currentTime = 0;

        }
    );

}


// ======================================
// STOP ALL AUDIO
// ======================================
//
// Useful when changing pages.
//
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
// Every HTML <button> automatically
// plays click.mp3.
//
// This prevents us from having to
// manually add playClick() to every
// button.
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
//
// Start with all audio stopped.
//
// Individual pages will start the
// appropriate music.
//
// ======================================

stopAllAudio();


// ======================================
// END OF AUDIO SYSTEM
// ======================================
