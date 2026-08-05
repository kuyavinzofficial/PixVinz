// ======================================
// PuzzleMania Script v1.0
// ======================================

let totalLevels = 10;


// ==============================
// Main Menu
// ==============================

function startGame(){

    playClick();

    let nextLevel = 1;

    for(let i = 1; i <= totalLevels; i++){

        if(localStorage.getItem("level"+i) === "completed"){

            nextLevel = i + 1;

        }

    }

    if(nextLevel > totalLevels){

        nextLevel = totalLevels;

    }

    localStorage.setItem(
        "level",
        nextLevel
    );

    window.location = "game.html";

}


function openLevels(){

    playClick();

    window.location = "levels.html";

}


function backHome(){

    playClick();

    window.location = "index.html";

}



// ==============================
// Load Levels
// ==============================

function loadLevels(){

    let container =
    document.getElementById("levelContainer");

    if(!container) return;


    container.innerHTML = "";


    let coins =
    Number(localStorage.getItem("coins")) || 0;


    document.getElementById("coins").innerHTML =
    coins;



    for(let i=1;i<=totalLevels;i++){

        let button =
        document.createElement("button");


        button.className =
        "level-card";


        let unlocked =
        i===1 ||
        localStorage.getItem("level"+(i-1))
        ==="completed";


        let completed =
        localStorage.getItem("level"+i)
        ==="completed";


        if(completed){

            button.classList.add("completed");

            button.innerHTML =
            "⭐ Level " + i;

        }

        else if(unlocked){

            button.classList.add("unlocked");

            button.innerHTML =
            "Level " + i;

            button.onclick = function(){

                playClick();

                playLevel(i);

            };

        }

        else{

            button.classList.add("locked");

            button.innerHTML =
            "🔒 Level " + i;

        }


        container.appendChild(button);

    }

}



// ==============================
// Play Level
// ==============================

function playLevel(level){

    localStorage.setItem(
        "level",
        level
    );

    window.location =
    "game.html";

}



// ==============================
// Auto Load
// ==============================

if(window.location.pathname.includes("levels")){

    loadLevels();

}
