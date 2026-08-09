/* ======================================
PixVZinz
MAIN GAME STARTUP
=================

Handles:

* Starting the game
* Hiding the victory screen
* Starting the puzzle
* Starting puzzle background music

Victory buttons are handled by:
js/victory.js

Audio is handled by:
audio.js
====================================== */

// ======================================
// WAIT FOR PAGE TO LOAD
// ======================================

window.addEventListener(
"load",
function(){

```
    console.log(
        "PixVZinz: Game loaded."
    );


    // ==================================
    // HIDE VICTORY SCREEN
    // ==================================

    const victoryScreen =
        document.getElementById(
            "victoryScreen"
        );


    if(victoryScreen){

        victoryScreen.classList.add(
            "hidden"
        );

        victoryScreen.style.display =
            "none";

        victoryScreen.style.pointerEvents =
            "none";

    }


    // ==================================
    // START PUZZLE
    // ==================================

    if(
        typeof setup ===
        "function"
    ){

        setup();

    }
    else{

        console.error(
            "PixVZinz: setup() was not found."
        );

    }


    // ==================================
    // START PUZZLE MUSIC
    // ==================================
    //
    // bgmusic.mp3 plays only while
    // the puzzle board is active.
    //

    if(
        typeof playPuzzleMusic ===
        "function"
    ){

        playPuzzleMusic();

    }


    console.log(
        "PixVZinz: Game startup complete."
    );

}
```

);
