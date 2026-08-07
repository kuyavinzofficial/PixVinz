// ------------------------------
// TIMER
// ------------------------------

function startTimer(){

    timer = setInterval(()=>{

        seconds++;

        updateTimer();

    },1000);

}


function stopTimer(){

    clearInterval(timer);

}


function resetTimer(){

    seconds = 0;

    updateTimer();

}


function updateTimer(){

    let display =
        document.getElementById("timer");


    if(display){

        display.innerText =
            "Time: " + seconds;

    }

}
