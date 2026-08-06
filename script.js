// ======================================
// PuzzleMania Script v2.1
// Level System + Records
// ======================================

const totalLevels = 20;


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

    localStorage.setItem("level", nextLevel);

    window.location.href="game.html";

}



// ==============================
// Navigation
// ==============================

function openLevels(){

    playClick();

    window.location.href="levels.html";

}


function backHome(){

    playClick();

    window.location.href="index.html";

}



function playLevel(level){

    playClick();

    localStorage.setItem(
        "level",
        level
    );

    window.location.href="game.html";

}



// ==============================
// Load Levels
// ==============================

function loadLevels(){

    const container =
    document.getElementById("levelContainer");


    if(!container) return;


    container.innerHTML="";


    const coins =
    Number(localStorage.getItem("coins")) || 0;


    const coinDisplay =
    document.getElementById("coins");


    if(coinDisplay){

        coinDisplay.textContent = coins;

    }



    for(let i=1;i<=totalLevels;i++){


        const button =
        document.createElement("button");


        button.className="level-card";



        const completed =
        localStorage.getItem(
            "level"+i
        )==="completed";



        const unlocked =
        i===1 ||
        localStorage.getItem(
            "level"+(i-1)
        )==="completed";



        const bestTime =
        localStorage.getItem(
            "level"+i+"BestTime"
        ) || "--";



        const bestMoves =
        localStorage.getItem(
            "level"+i+"BestMoves"
        ) || "--";



        const bestStars =
        Number(
            localStorage.getItem(
                "level"+i+"BestStars"
            )
        ) || 0;



        let stars="";


        if(bestStars===3){

            stars="⭐⭐⭐";

        }
        else if(bestStars===2){

            stars="⭐⭐";

        }
        else if(bestStars===1){

            stars="⭐";

        }



        // COMPLETED

        if(completed){


            button.classList.add(
                "completed"
            );


            button.innerHTML=

            `
            ⭐ Level ${i}<br>
            ${stars}<br>
            ⏱ ${bestTime}s<br>
            🔄 ${bestMoves} Moves
            `;


            button.onclick=function(){

                playLevel(i);

            };


        }



        // UNLOCKED

        else if(unlocked){


            button.classList.add(
                "unlocked"
            );


            button.innerHTML=

            `
            Level ${i}<br>
            ▶ Play
            `;


            button.onclick=function(){

                playLevel(i);

            };


        }



        // LOCKED

        else{


            button.classList.add(
                "locked"
            );


            button.innerHTML=

            `
            🔒<br>
            Level ${i}
            `;


        }


        container.appendChild(button);


    }


}



// ==============================
// Auto Load
// ==============================

window.addEventListener(
"DOMContentLoaded",
function(){


    if(
    window.location.pathname.includes("levels")
    ){

        loadLevels();

    }


    const coins =
    document.getElementById("coins");


    if(coins){

        coins.textContent =
        Number(localStorage.getItem("coins")) || 0;

    }


});




// ==============================
// Reset Progress
// ==============================

function resetProgress(){


    const answer =
    confirm(
    "Reset all progress?\n\n"+
    "This removes:\n"+
    "• Levels\n"+
    "• Coins\n"+
    "• Records\n"+
    "• Stars"
    );


    if(!answer)return;


    localStorage.clear();


    localStorage.setItem(
        "level",
        1
    );


    localStorage.setItem(
        "coins",
        0
    );


    alert(
        "Progress Reset!"
    );


    window.location.href="index.html";


}
