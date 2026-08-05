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
// ==============================
// SETTINGS
// ==============================

function openSettings(){

    const popup =
    document.getElementById("settingsPopup");

    if(!popup) return;

    popup.style.display = "flex";

    loadSettings();

}

function closeSettings(){

    const popup =
    document.getElementById("settingsPopup");

    if(!popup) return;

    popup.style.display = "none";

}

function loadSettings(){

    const music =
    document.getElementById("musicToggle");

    const sound =
    document.getElementById("soundToggle");

    const animation =
    document.getElementById("animationToggle");

    if(music){

        music.checked =
        localStorage.getItem("music") !== "off";

    }

    if(sound){

        sound.checked =
        localStorage.getItem("sound") !== "off";

    }

    if(animation){

        animation.checked =
        localStorage.getItem("animation") !== "off";

    }

}

document.addEventListener("change",function(e){

    if(e.target.id==="musicToggle"){

        localStorage.setItem(
            "music",
            e.target.checked ? "on":"off"
        );

    }

    if(e.target.id==="soundToggle"){

        localStorage.setItem(
            "sound",
            e.target.checked ? "on":"off"
        );

    }

    if(e.target.id==="animationToggle"){

        localStorage.setItem(
            "animation",
            e.target.checked ? "on":"off"
        );

    }

});

function resetProgress(){

    const answer = confirm(
        "Are you sure?\n\nThis will erase:\n\n• Levels\n• Coins\n• Stars\n• Records"
    );

    if(!answer) return;

    localStorage.clear();

    alert("Progress has been reset!");

    location.reload();

}

function showAbout(){

    alert(
`🧩 PuzzleMania

Version 2.0

Developer:
Kuya Vinz Official

Made with HTML, CSS & JavaScript

© 2026`
    );

}
}
