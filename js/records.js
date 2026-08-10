// ======================================
// PuzzleMania
// TIMER SYSTEM
// ======================================


// ======================================
// START TIMER
// ======================================

function startTimer(){

    clearInterval(timer);


    timer = setInterval(function(){


        seconds++;


        updateTimer();


    },1000);

}



// ======================================
// STOP TIMER
// ======================================

function stopTimer(){

    clearInterval(timer);

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

    let display =
    document.getElementById("timer");


    if(display){

        display.textContent =
        seconds;

    }

}
