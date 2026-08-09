// ======================================
// PixVZinz
// TIMER SYSTEM
// ======================================
//
// Handles:
// - Starting the timer
// - Stopping the timer
// - Resetting the timer
// - Updating the timer display
// ======================================


// ======================================
// TIMER VARIABLES
// ======================================

let timer = null;

let seconds = 0;


// ======================================
// START TIMER
// ======================================

function startTimer(){

    // Prevent multiple timers
    clearInterval(timer);

    timer = setInterval(function(){

        seconds++;

        updateTimer();

    }, 1000);

}


// ======================================
// STOP TIMER
// ======================================

function stopTimer(){

    if(timer !== null){

        clearInterval(timer);

    }

    timer = null;

}


// ======================================
// RESET TIMER
// ======================================

function resetTimer(){

    seconds = 0;

    updateTimer();

}


// ======================================
// UPDATE TIMER DISPLAY
// ======================================

function updateTimer(){

    const display =
        document.getElementById("timer");


    if(display){

        display.textContent =
            seconds;

    }

}


// ======================================
// GET CURRENT TIME
// ======================================

function getCurrentTime(){

    return seconds;

}


// ======================================
// FORMAT TIME
// ======================================

function formatTime(value){

    const minutes =
        Math.floor(value / 60);

    const remainingSeconds =
        value % 60;


    if(minutes > 0){

        return (
            minutes +
            ":" +
            String(remainingSeconds)
                .padStart(2, "0")
        );

    }


    return value + "s";

}
