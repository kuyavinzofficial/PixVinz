let level = Number(localStorage.getItem("level")) || 1;

let size;

let moves = 0;
let seconds = 0;

let timer;

let selectedPiece = null;


let images = [

    "images/level1.jpeg",
    "images/level2.jpeg",
    "images/level3.jpeg",
    "images/level4.jpeg",
    "images/level5.jpeg",
    "images/level6.jpeg",
    "images/level7.jpeg",
    "images/level8.jpeg",
    "images/level9.jpeg",
    "images/level10.jpeg"

];


let pieces = [];


// Setup level difficulty

function setup(){


    size =
    level <= 2 ? 3 :
    level <= 4 ? 4 :
    level <= 6 ? 5 :
    level <= 8 ? 6 :
    level === 9 ? 7 :
    8;



    document.getElementById("levelTitle").innerHTML =
    "Level " + level;



    startTimer();


    createPuzzle();


}



// Timer

function startTimer(){

    timer=setInterval(()=>{

        seconds++;

        document.getElementById("timer").innerHTML =
        seconds;


    },1000);

}



// Create pieces

function createPuzzle(){


    let total=size*size;


    pieces=[];


    for(let i=0;i<total;i++){

        pieces.push(i);

    }


    shufflePuzzle();


}



// Draw puzzle

function drawPuzzle(){


    let board =
    document.getElementById("puzzleBoard");


    board.innerHTML="";


    // Fixed size

    board.style.width="350px";

    board.style.height="350px";

    board.style.maxWidth="90vw";

    board.style.maxHeight="90vw";


    board.style.gridTemplateColumns =
    `repeat(${size},1fr)`;



    pieces.forEach((piece,index)=>{


        let div =
        document.createElement("div");


        div.className="piece";



        let row =
        Math.floor(piece/size);


        let col =
        piece%size;



        div.style.backgroundImage =
        `url("${images[level-1]}")`;



        div.style.backgroundSize =
        `${size*100}% ${size*100}%`;



        div.style.backgroundPosition =
        `${(col/(size-1))*100}% ${(row/(size-1))*100}%`;



        div.onclick=function(){

            selectPiece(index);

        };



        board.appendChild(div);


    });



}



// Tap system

function selectPiece(index){



    let allPieces =
    document.querySelectorAll(".piece");



    if(selectedPiece === null){


        selectedPiece=index;


        allPieces[index]
        .classList.add("selected");


    }

    else{


        swapPieces(
            selectedPiece,
            index
        );
playSelect();

        allPieces[selectedPiece]
        .classList.remove("selected");


        selectedPiece=null;


    }


}



// Swap

function swapPieces(a,b){


    if(a===b){

        return;

    }
playExchange();

    let temp=pieces[a];


    pieces[a]=pieces[b];


    pieces[b]=temp;



    moves++;


    document.getElementById("moves")
    .innerHTML=moves;



    drawPuzzle();


    checkWin();


}



// Shuffle
playShuffle();
function shufflePuzzle(){


    pieces.sort(()=>Math.random()-0.5);


    drawPuzzle();


}



// Check solved

function checkWin(){


    for(let i=0;i<pieces.length;i++){


        if(pieces[i]!==i){

            return;

        }

    }



    clearInterval(timer);



    let stars;


    if(seconds<60 && moves<50){

        stars="⭐⭐⭐";

    }

    else if(seconds<120){

        stars="⭐⭐";

    }

    else{

        stars="⭐";

    }



    document.getElementById("stars")
    .innerHTML=stars;



    localStorage.setItem(
        "level"+level,
        "completed"
    );



    let coins =
    Number(localStorage.getItem("coins")) || 0;


    coins += level*10;


    localStorage.setItem(
        "coins",
        coins
    );



    playVictorySound();


setTimeout(()=>{

    playVictory(level);

alert("🎉 Level Complete!\n"+stars);



function backHome(){function playVictorySound(){

    let sound = new Audio(
        "sounds/victory"+level+".mp3"
    );


    sound.play();

}

    window.location="index.html";

}



setup();startMusic();
