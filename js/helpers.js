// ======================================
// PuzzleMania
// HELPER FUNCTIONS
// ======================================

// ======================================
// PREVENT DOUBLE CLICK ISSUES
// ======================================

let inputLocked = false;

function lockInput(){

    inputLocked = true;

    setTimeout(function(){

        inputLocked = false;

    },200);

}



// ======================================
// UPDATED SELECT CHECK
// ======================================

const oldSelectPiece = selectPiece;

selectPiece = function(index){

    if(inputLocked){

        return;

    }

    lockInput();

    oldSelectPiece(index);

};



// ======================================
// KEYBOARD SHORTCUTS
// ======================================

document.addEventListener(
"keydown",
function(event){

    let key =
    event.key.toLowerCase();

    switch(key){

        case "r":

            restartLevel();

            break;

        case "s":

            shufflePuzzle();

            break;

        case "escape":

            if(victoryScreen){

                victoryScreen
                .classList.add("hidden");

            }

            break;

    }

});



// ======================================
// MOBILE SWIPE PREPARATION
// ======================================

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener(
"touchstart",
function(e){

    if(e.touches.length > 0){

        touchStartX =
        e.touches[0].clientX;

        touchStartY =
        e.touches[0].clientY;

    }

});

document.addEventListener(
"touchend",
function(e){

    if(e.changedTouches.length > 0){

        let endX =
        e.changedTouches[0].clientX;

        let endY =
        e.changedTouches[0].clientY;

        let diffX =
        endX - touchStartX;

        let diffY =
        endY - touchStartY;

        // Reserved for future swipe controls

    }

});
