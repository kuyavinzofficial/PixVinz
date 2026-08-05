function startGame(){

    alert("Puzzle Game Loading...");

}


function openLevels(){

    window.location="levels.html";

}



function backHome(){

    window.location="index.html";

}



function playLevel(level){

localStorage.setItem("level",level);

window.location="game.html";

}
